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
function deletionContext() {
    const ctx = context();
    const button = { dataset: { id: "Empty category" }, disabled: false, isConnected: true };
    ctx.selectedLessonUnit = "Empty category";
    ctx.lessonFormDraft.unit = "Empty category";
    ctx.pageContent = { querySelectorAll: () => [button] };
    ctx.calls = [];
    ctx.messages = [];
    ctx.confirmations = [];
    ctx.console = { error: (...args) => { ctx.loggedError = args; } };
    ctx.showToast = (message) => ctx.messages.push(message);
    ctx.render = () => { ctx.rendered = true; };
    ctx.window = {
        confirm: (message) => { ctx.confirmations.push(message); return true; },
        teacherWorkspaceApi: { deleteLessonCategory: async (client, name) => { ctx.calls.push(name); } }
    };
    vm.runInContext(`async ${readFunction("deleteLessonCategory")}`, ctx);
    ctx.button = button;
    return ctx;
}
test("category deletion controls are available only for saved custom categories and lesson editors", () => {
    const ctx = context();
    ctx.selectedLessonUnit = "Empty category";
    assert.match(ctx.renderLessons(), /data-action="delete-category" data-id="Empty category"/);
    ctx.selectedLessonUnit = "A1";
    assert.doesNotMatch(ctx.renderLessons(), /data-action="delete-category"/);
    ctx.selectedLessonUnit = "Recovered draft category";
    assert.doesNotMatch(ctx.renderLessons(), /data-action="delete-category"/);
    ctx.selectedLessonUnit = "Empty category";
    ctx.hasPermission = () => false;
    assert.doesNotMatch(ctx.renderLessons(), /data-action="delete-category"/);
});
test("deletion requires confirmation and leaves the category untouched on cancellation", async () => {
    const ctx = deletionContext();
    ctx.window.confirm = (message) => { ctx.confirmations.push(message); return false; };
    await ctx.deleteLessonCategory("Empty category");
    assert.match(ctx.confirmations[0], /Empty category.*cannot be undone/);
    assert.equal(ctx.calls.length, 0);
    assert.ok(ctx.data.categories.includes("Empty category"));
    assert.equal(ctx.rendered, undefined);
});
test("confirmed deletion persists before updating the view and removes a stale draft category", async () => {
    const ctx = deletionContext();
    let release;
    ctx.window.teacherWorkspaceApi.deleteLessonCategory = () => new Promise(resolve => { release = resolve; });
    const saving = ctx.deleteLessonCategory("Empty category");
    assert.equal(ctx.button.disabled, true);
    assert.ok(ctx.data.categories.includes("Empty category"));
    await ctx.deleteLessonCategory("Empty category");
    assert.equal(ctx.confirmations.length, 1);
    release();
    await saving;
    assert.equal(ctx.data.categories.includes("Empty category"), false);
    assert.equal(ctx.lessonCategories().includes("Empty category"), false);
    assert.equal(ctx.selectedLessonUnit, "");
    assert.equal(ctx.rendered, true);
    assert.equal(ctx.button.disabled, false);
    assert.equal(ctx.messages.at(-1), "Category deleted");
});
test("lessons hidden by filters still prevent deletion, and protected categories cannot be deleted", async () => {
    const ctx = deletionContext();
    ctx.data.lessons.push({ unit: "empty CATEGORY", title: "Hidden lesson" });
    ctx.searchQuery = "does not match";
    ctx.activeClassFilter = "other-class";
    await ctx.deleteLessonCategory("Empty category");
    assert.equal(ctx.confirmations.length, 0);
    assert.match(ctx.messages[0], /contains lessons/);
    assert.equal(ctx.calls.length, 0);
    await ctx.deleteLessonCategory("A1");
    ctx.hasPermission = () => false;
    await ctx.deleteLessonCategory("Conversation");
    assert.equal(ctx.calls.length, 0);
});
test("server rejection preserves the category and displays a translated error", async () => {
    const ctx = deletionContext();
    ctx.window.teacherWorkspaceApi.deleteLessonCategory = async () => {
        const error = new Error("category_not_empty");
        error.code = "CATEGORY_NOT_EMPTY";
        throw error;
    };
    await ctx.deleteLessonCategory("Empty category");
    assert.ok(ctx.data.categories.includes("Empty category"));
    assert.equal(ctx.selectedLessonUnit, "Empty category");
    assert.equal(ctx.button.disabled, false);
    assert.match(ctx.messages[0], /contains lessons/);
    assert.ok(ctx.loggedError);
});
test("deletion API calls the guarded RPC and propagates failures rather than reporting success", async () => {
    const window = {};
    vm.runInNewContext(fs.readFileSync(`${__dirname}/teacher-data.js`, "utf8"), { window });
    const client = { rpc: async (name, args) => {
        assert.equal(name, "delete_lesson_category");
        assert.equal(args.category_name, "Empty category");
        return { error: null };
    } };
    await window.teacherWorkspaceApi.deleteLessonCategory(client, "Empty category");
    client.rpc = async () => ({ error: { message: "category_not_empty" } });
    await assert.rejects(window.teacherWorkspaceApi.deleteLessonCategory(client, "Empty category"), error => error.code === "CATEGORY_NOT_EMPTY");
    client.rpc = async () => ({ error: { message: "permission denied" } });
    await assert.rejects(window.teacherWorkspaceApi.deleteLessonCategory(client, "Empty category"), /permission denied/);
});
