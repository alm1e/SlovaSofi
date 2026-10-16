const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const window = {};
vm.runInNewContext(fs.readFileSync(path.join(__dirname, "calendar-utils.js"), "utf8"), { window, Date });
const occurrences = window.SlovaCalendar.occurrences;

function event(recurrence, repeatDays = []) {
    return {
        id: recurrence,
        starts_at: "2026-10-16T10:00:00",
        recurrence,
        repeat_until: "2026-10-23",
        repeat_days: repeatDays
    };
}

const from = new Date("2026-10-16T00:00:00");
const to = new Date("2026-10-23T23:59:59");
const dates = (recurrence, days) => Array.from(occurrences([event(recurrence, days)], from, to), (item) =>
    `${item.occurrenceAt.getFullYear()}-${item.occurrenceAt.getMonth() + 1}-${item.occurrenceAt.getDate()}`);

test("daily and every-other-day schedules expand from their start date", () => {
    assert.deepEqual(dates("daily"), ["2026-10-16", "2026-10-17", "2026-10-18", "2026-10-19", "2026-10-20", "2026-10-21", "2026-10-22", "2026-10-23"]);
    assert.deepEqual(dates("every_other_day"), ["2026-10-16", "2026-10-18", "2026-10-20", "2026-10-22"]);
});

test("weekly schedules retain the original weekday", () => {
    assert.deepEqual(dates("weekly"), ["2026-10-16", "2026-10-23"]);
});

test("custom weekday schedules include only selected days and keep the original time", () => {
    const results = occurrences([event("custom", [1, 3, 5])], from, to);
    assert.deepEqual(Array.from(results, (item) => item.occurrenceAt.getDate()), [16, 19, 21, 23]);
    assert.ok(results.every((item) => item.occurrenceAt.getHours() === 10));
});

test("one-time and legacy events remain a single occurrence", () => {
    assert.equal(dates("none").length, 1);
    const legacy = { ...event("weekly"), recurrence: "none", repeat_until: null };
    assert.equal(occurrences([legacy], from, to).length, 1);
});

test("occurrences respect the requested display range", () => {
    const later = new Date("2026-10-20T00:00:00");
    assert.deepEqual(Array.from(occurrences([event("daily")], later, to), (item) => item.occurrenceAt.getDate()), [20, 21, 22, 23]);
});
