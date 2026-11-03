const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const test = require("node:test");
const source = fs.readFileSync(`${__dirname}/teacher.js`, "utf8");
function readFunction(name) {
    const start = source.indexOf(`function ${name}(`);
    assert.notEqual(start, -1);
    return source.slice(start, source.indexOf("\n}", start) + 2);
}
function context() {
    const ctx = vm.createContext({
        LESSON_UNITS: ["A1", "A2", "B1", "B2"],
        data: { categories: ["Conversation", "conversation", "Empty category"], lessons: [{ unit: "Legacy category", title: "Test" }], classes: [] },
        lessonFormDraft: { unit: "Recovered draft category" },
        currentLanguage: "en", hasPermission: () => true,
        activeClassFilter: "", searchQuery: "", selectedLessonUnit: "",
        t: (key) => key, lessonText: (key, values) => values ? `${key}: ${values.level}` : key,
        countLabel: (count) => String(count), lessonClassNames: () => "", lessonClassIds: () => [],
        emptyMessage: () => "", inferLessonUnit: () => "A1",
        lessonIcon: () => "", lessonActivities: () => [], previewText: (key) => key, assignmentText: (key) => key
    });
    vm.runInContext(["escapeHtml", "lessonCategories", "categoryText", "renderLessons", "loadNewLessonDraft"].map(readFunction).join("\n"), ctx);
    return ctx;
}
test("categories include defaults, saved empty categories, existing lessons and recovered drafts without duplicates", () => {
    const ctx = context();
    assert.deepEqual(Array.from(ctx.lessonCategories()), ["A1", "A2", "B1", "B2", "Conversation", "Empty category", "Legacy category", "Recovered draft category"]);
    assert.match(ctx.renderLessons(), /data-action="new-category"/);
    assert.match(ctx.renderLessons(), /data-unit-open="Empty category"/);
    ctx.hasPermission = () => false;
    assert.doesNotMatch(ctx.renderLessons(), /data-action="new-category"/);
});
test("custom category names are escaped in cards, headings, breadcrumbs and attributes", () => {
    const ctx = context();
    const name = '<img src=x onerror="bad"> & conversation';
    ctx.data.categories = [name];
    assert.doesNotMatch(ctx.renderLessons(), /<img|unit-card-<|data-unit-open="<img/);
    ctx.selectedLessonUnit = name;
    const html = ctx.renderLessons();
    assert.doesNotMatch(html, /<img|course-hero-<img/);
    assert.match(html, /&lt;img/);
    assert.match(html, /course-hero-custom/);
});
test("local new lesson drafts retain custom categories rather than falling back to A1", () => {
    const ctx = context();
    ctx.lessonDraftStorageKey = () => "draft";
    ctx.localStorage = { getItem: () => JSON.stringify({ title: "Test", unit: "Conversation", sections: [{ activities: [] }] }) };
    assert.equal(ctx.loadNewLessonDraft().unit, "Conversation");
});
test("category creation persists only the normalized name and propagates database errors", async () => {
    const window = {};
    vm.runInNewContext(fs.readFileSync(`${__dirname}/teacher-data.js`, "utf8"), { window });
    let inserted;
    const client = { from(table) {
        assert.equal(table, "lesson_categories");
        return { async insert(row) { inserted = row; return { error: null }; } };
    } };
    assert.equal(await window.teacherWorkspaceApi.createLessonCategory(client, "  Exam   preparation  "), "Exam preparation");
    assert.deepEqual(JSON.parse(JSON.stringify(inserted)), { name: "Exam preparation" });
    await assert.rejects(window.teacherWorkspaceApi.createLessonCategory(client, " ".repeat(3)));
    await assert.rejects(window.teacherWorkspaceApi.createLessonCategory(client, "x".repeat(81)));
    client.from = () => ({ insert: async () => ({ error: { message: "permission denied" } }) });
    await assert.rejects(window.teacherWorkspaceApi.createLessonCategory(client, "Test"), /permission denied/);
});
