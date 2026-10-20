const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

function loadApi() {
    const window = {};
    vm.runInNewContext(fs.readFileSync(path.join(__dirname, "teacher-data.js"), "utf8"), {
        window,
        crypto: { randomUUID: () => "generated-id" },
        console,
        Date,
        Map,
        Set,
        Promise,
        Error,
        structuredClone
    });
    return window.teacherWorkspaceApi;
}

function progressClient(rows, recordingFiles = []) {
    const filtersSeen = [];
    const recordingsRemoved = [];
    let recordingListCalls = 0;
    return {
        filtersSeen,
        recordingsRemoved,
        get recordingListCalls() { return recordingListCalls; },
        from(table) {
            if (table === "class_students") {
                return {
                    select(columns) {
                        assert.equal(columns, "linked_user_id");
                        const filters = [];
                        const query = {
                            eq(column, value) {
                                filters.push([column, value]);
                                return query;
                            },
                            maybeSingle() {
                                const studentId = filters.find(([column]) => column === "id")?.[1];
                                return Promise.resolve({
                                    data: studentId === "student-1" ? { linked_user_id: "user-1" } : null,
                                    error: null
                                });
                            }
                        };
                        return query;
                    }
                };
            }
            assert.equal(table, "student_lesson_progress");
            return {
                delete(options) {
                    assert.equal(options?.count, "exact");
                    const filters = [];
                    const query = {
                        eq(column, value) {
                            filters.push([column, value]);
                            return query;
                        },
                        then(resolve, reject) {
                            filtersSeen.push(...filters);
                            const removed = rows.filter((row) =>
                                filters.every(([key, value]) => row[key] === value));
                            for (const row of removed) rows.splice(rows.indexOf(row), 1);
                            return Promise.resolve({ count: removed.length, error: null }).then(resolve, reject);
                        }
                    };
                    return query;
                }
            };
        },
        storage: {
            from(bucket) {
                assert.equal(bucket, "lesson-recordings");
                return {
                    list(prefix, options) {
                        assert.equal(prefix, "user-1/lesson-1");
                        assert.equal(options.limit, 100);
                        assert.equal(options.offset, 0);
                        recordingListCalls += 1;
                        return Promise.resolve({ data: recordingFiles.slice(options.offset, options.offset + options.limit), error: null });
                    },
                    remove(paths) {
                        recordingsRemoved.push(...paths);
                        paths.forEach((path) => {
                            const filename = path.split("/").at(-1);
                            const index = recordingFiles.findIndex((file) => file.name === filename);
                            if (index >= 0) recordingFiles.splice(index, 1);
                        });
                        return Promise.resolve({ error: null });
                    }
                };
            }
        }
    };
}

function reviewClient(row) {
    const updates = [];
    return {
        updates,
        from(table) {
            assert.equal(table, "student_lesson_progress");
            return {
                select(columns) {
                    assert.equal(columns, "answers");
                    const filters = [];
                    const query = {
                        eq(column, value) {
                            filters.push([column, value]);
                            return query;
                        },
                        maybeSingle() {
                            const matches = filters.every(([key, value]) => row[key] === value);
                            return Promise.resolve({ data: matches ? { answers: structuredClone(row.answers) } : null, error: null });
                        }
                    };
                    return query;
                },
                update(payload) {
                    const filters = [];
                    const query = {
                        eq(column, value) {
                            filters.push([column, value]);
                            return query;
                        },
                        then(resolve, reject) {
                            updates.push({ payload, filters: [...filters] });
                            const matches = filters.every(([key, value]) => row[key] === value);
                            if (matches) row.answers = structuredClone(payload.answers);
                            return Promise.resolve({ error: null }).then(resolve, reject);
                        }
                    };
                    return query;
                }
            };
        }
    };
}

test("resetLessonProgress deletes only the matching student's lesson record", async () => {
    const rows = [
        { student_id: "student-1", class_id: "class-1", lesson_id: "lesson-1", answers: { a0: { response: "saved" } } },
        { student_id: "student-2", class_id: "class-1", lesson_id: "lesson-1", answers: { a0: { response: "keep" } } }
    ];
    const client = progressClient(rows, [{ name: "bactivity-recording.webm" }]);
    await loadApi().resetLessonProgress(client, "class-1", "lesson-1", "student-1");

    assert.deepEqual(rows.map(({ student_id }) => student_id), ["student-2"]);
    assert.deepEqual(client.filtersSeen, [
        ["class_id", "class-1"],
        ["lesson_id", "lesson-1"],
        ["student_id", "student-1"]
    ]);
    assert.deepEqual(client.recordingsRemoved, ["user-1/lesson-1/bactivity-recording.webm"]);
});

test("resetLessonProgress reports when no authorized progress row was deleted", async () => {
    const rows = [];
    const client = progressClient(rows);
    await assert.rejects(
        loadApi().resetLessonProgress(client, "class-1", "lesson-1", "student-1"),
        /запись не найдена или недостаточно прав/
    );
});

test("resetLessonProgress removes recordings in batches without skipping files", async () => {
    const rows = [{ student_id: "student-1", class_id: "class-1", lesson_id: "lesson-1", answers: {} }];
    const recordingFiles = Array.from({ length: 101 }, (_, index) => ({ name: `recording-${index}.webm` }));
    const client = progressClient(rows, recordingFiles);
    await loadApi().resetLessonProgress(client, "class-1", "lesson-1", "student-1");

    assert.equal(client.recordingsRemoved.length, 101);
    assert.equal(client.recordingListCalls, 3);
    assert.equal(recordingFiles.length, 0);
});

test("saveLessonAnswerReview stores teacher feedback/correction/score for an answer key", async () => {
    const row = {
        student_id: "student-1",
        class_id: "class-1",
        lesson_id: "lesson-1",
        answers: {
            "a0": { response: "draft", correct: null, submitted_at: "2026-01-01T00:00:00.000Z" }
        }
    };
    const client = reviewClient(row);
    const result = await loadApi().saveLessonAnswerReview(
        client,
        "class-1",
        "lesson-1",
        "student-1",
        "a0",
        { feedback: "Пояснение", correction: "Исправленный вариант", score: "8/10" }
    );
    assert.equal(result.a0.teacher_feedback, "Пояснение");
    assert.equal(result.a0.teacher_correction, "Исправленный вариант");
    assert.equal(result.a0.teacher_score, "8/10");
    assert.equal(result.a0.feedback, "Пояснение");
    assert.equal(client.updates.length, 1);
});
