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

function progressClient(rows) {
    const filtersSeen = [];
    return {
        filtersSeen,
        from(table) {
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
    const client = progressClient(rows);
    await loadApi().resetLessonProgress(client, "class-1", "lesson-1", "student-1");

    assert.deepEqual(rows.map(({ student_id }) => student_id), ["student-2"]);
    assert.deepEqual(client.filtersSeen, [
        ["class_id", "class-1"],
        ["lesson_id", "lesson-1"],
        ["student_id", "student-1"]
    ]);
});

test("resetLessonProgress reports when no authorized progress row was deleted", async () => {
    const rows = [];
    const client = progressClient(rows);
    await assert.rejects(
        loadApi().resetLessonProgress(client, "class-1", "lesson-1", "student-1"),
        /запись не найдена или недостаточно прав/
    );
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
