const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const test = require("node:test");

function context() {
    let state = { route: { view: "overview", unit: "", lesson: "" }, search: "" };
    const listeners = {}, entries = [], errors = [];
    const history = {
        state: { unrelated: true },
        replaceState(next) { this.state = next; entries.push(["replace", next]); },
        pushState(next) { this.state = next; entries.push(["push", next]); }
    };
    const window = { addEventListener: (name, callback) => { listeners[name] = callback; } };
    vm.runInNewContext(fs.readFileSync(`${__dirname}/navigation-history.js`, "utf8"), { window, history });
    const controller = window.SlovaPageHistory.create({
        key: "test",
        read: () => structuredClone(state),
        restore: async (target) => { state = target; controller.sync(); },
        onError: (error) => errors.push(error)
    });
    return { controller, history, entries, errors, listeners, window,
        set: (next) => { state = next; }, get: () => state };
}
test("browser history records category and lesson transitions, not every search or rerender", async () => {
    const ctx = context();
    ctx.controller.sync();
    const home = ctx.history.state;
    assert.equal(home.unrelated, true);
    ctx.set({ route: { view: "lessons", unit: "", lesson: "" }, search: "" });
    ctx.controller.sync();
    ctx.set({ route: { view: "lessons", unit: "A2", lesson: "" }, search: "children" });
    ctx.controller.sync();
    const category = ctx.history.state;
    ctx.set({ route: { view: "lessons", unit: "A2", lesson: "" }, search: "lecture 1" });
    ctx.controller.sync();
    ctx.set({ route: { view: "lessons", unit: "A2", lesson: "lecture-1" }, search: "lecture 1" });
    ctx.controller.sync();
    const lesson = ctx.history.state;
    assert.equal(ctx.entries.filter(([type]) => type === "push").length, 3);
    await ctx.listeners.popstate({ state: category });
    assert.equal(ctx.get().route.unit, "A2");
    assert.equal(ctx.get().route.lesson, "");
    assert.equal(ctx.get().search, "children");
    assert.equal(ctx.entries.filter(([type]) => type === "push").length, 3);
    await ctx.listeners.popstate({ state: lesson });
    assert.equal(ctx.get().route.lesson, "lecture-1");
    await ctx.listeners.popstate({ state: home });
    assert.equal(ctx.get().route.view, "overview");
});
test("foreign history entries are ignored and restore errors are surfaced", async () => {
    const ctx = context();
    ctx.controller.sync();
    await ctx.listeners.popstate({ state: null });
    assert.equal(ctx.entries.length, 1);
    const error = Error("Could not save");
    const controller = ctx.window.SlovaPageHistory.create({
        key: "failed", read: () => ctx.get(), restore: async () => { throw error; },
        onError: (caught) => ctx.errors.push(caught)
    });
    controller.sync();
    await ctx.listeners.popstate({ state: { failed: { route: { view: "lessons" } } } });
    assert.equal(ctx.errors[0], error);
    assert.equal(ctx.entries.at(-1)[0], "push");
});
test("rapid back presses restore the latest destination after an in-flight save", async () => {
    const ctx = context();
    let release, count = 0;
    const controller = ctx.window.SlovaPageHistory.create({
        key: "rapid", read: () => ctx.get(),
        restore: async (target) => {
            if (++count === 1) await new Promise(resolve => { release = resolve; });
            ctx.set(target);
        },
        onError: (error) => { throw error; }
    });
    controller.sync();
    const first = ctx.listeners.popstate({ state: { rapid: { route: { view: "lessons", unit: "A2" } } } });
    await ctx.listeners.popstate({ state: { rapid: { route: { view: "classes" } } } });
    release();
    await first;
    assert.equal(ctx.get().route.view, "classes");
});
