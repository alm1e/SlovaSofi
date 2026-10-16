const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

function createClient(seed) {
    const tables = structuredClone(seed);
    const deletedStudentIds = [];

    return {
        tables,
        deletedStudentIds,
        from(table) {
            return {
                select() {
                    const filters = [];
                    const query = {
                        eq(column, value) {
                            filters.push([column, value]);
                            return query;
                        },
                        then(resolve, reject) {
                            const rows = tables[table].filter((row) => filters.every(([column, value]) => row[column] === value));
                            return Promise.resolve({ data: rows, error: null }).then(resolve, reject);
                        }
                    };
                    return query;
                },
                async upsert(rows) {
                    for (const row of Array.isArray(rows) ? rows : [rows]) {
                        const key = row.id ? "id" : "user_id";
                        const index = tables[table].findIndex((current) => current[key] === row[key]);
                        if (index < 0) tables[table].push({ ...row });
                        else tables[table][index] = { ...tables[table][index], ...row };
                    }
                    return { error: null };
                },
                delete() {
                    return {
                        async in(column, ids) {
                            if (table === "class_students") deletedStudentIds.push(...ids);
                            tables[table] = tables[table].filter((row) => !ids.includes(row[column]));
                            return { error: null };
                        }
                    };
                }
            };
        }
    };
}

test("renaming a class student preserves their linked account and progress identity", async () => {
    const progress = {
        student_id: "student-row-1",
        class_id: "class-1",
        lesson_id: "lesson-1",
        answers: { a0: { response: "saved answer" } }
    };
    const client = createClient({
        teacher_classes: [{ id: "class-1", teacher_id: "teacher-1", name: "A1", course: "A1" }],
        class_students: [{
            id: "student-row-1",
            class_id: "class-1",
            teacher_id: "teacher-1",
            display_name: "Old name",
            email: "student@example.test",
            linked_user_id: "auth-user-1"
        }],
        teacher_workspace_settings: [],
        student_lesson_progress: [progress]
    });
    const window = {};
    vm.runInNewContext(fs.readFileSync(path.join(__dirname, "teacher-data.js"), "utf8"), {
        window,
        crypto: { randomUUID: () => "unexpected-new-id" },
        console,
        Date,
        Map,
        Set,
        Promise,
        Error
    });

    await window.teacherWorkspaceApi.saveWorkspace(client, "teacher-1", {
        classes: [{
            id: "class-1",
            teacherId: "teacher-1",
            students: ["New name"],
            studentRecords: [{ id: "student-row-1", display_name: "New name" }]
        }],
        lessons: []
    }, {
        role: "teacher",
        permissions: {
            manage_classes_students: true,
            edit_lessons: false,
            view_assign_lessons: false
        }
    });

    assert.equal(client.tables.class_students.length, 1);
    assert.equal(client.tables.class_students[0].id, "student-row-1");
    assert.equal(client.tables.class_students[0].display_name, "New name");
    assert.equal(client.tables.class_students[0].linked_user_id, "auth-user-1");
    assert.deepEqual(client.deletedStudentIds, []);
    assert.deepEqual(client.tables.student_lesson_progress[0].answers, progress.answers);
});
