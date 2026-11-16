const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const test = require("node:test");
const read = name => fs.readFileSync(path.join(__dirname, name), "utf8");
function storage() {
    const items = new Map();
    return { get length() { return items.size; }, key: index => [...items.keys()][index] ?? null,
        getItem: key => items.get(key) ?? null, setItem: (key,value) => items.set(key,value), removeItem: key => items.delete(key) };
}
function store(browserStorage = storage()) {
    const window = {}; vm.runInNewContext(read("student-drafts.js"), { window });
    return { drafts: window.SlovaStudentDrafts.create(browserStorage), browserStorage, factory: window.SlovaStudentDrafts };
}
const answer = { userId: "student-1", lessonId: "lesson", revision: "revision-1", activityId: "block-1", activityIndex: 0, questionId: null, response: "My answer" };
test("pending answers survive a new page instance and remain scoped to the signed-in user", () => {
    const { drafts, browserStorage, factory } = store(); drafts.put(answer);
    const nextPage = factory.create(browserStorage);
    assert.equal(nextPage.list("student-1", "lesson")[0].response, "My answer");
    assert.equal(nextPage.list("student-2", "lesson").length, 0);
    assert.equal(nextPage.list("student-1", "other-lesson").length, 0);
});
test("acknowledgement of an older request never deletes a newer answer", () => {
    const { drafts } = store(); const first = drafts.put(answer);
    const second = drafts.put({ ...answer, response: "New answer" });
    drafts.acknowledge(first); assert.equal(drafts.list(answer.userId,answer.lessonId)[0].response,"New answer");
    drafts.acknowledge(second); assert.equal(drafts.list(answer.userId,answer.lessonId).length,0);
});
test("changed lesson revisions and grouped questions keep separate recovery records", () => {
    const { drafts } = store(); drafts.put(answer);
    drafts.put({ ...answer, revision: "revision-2", response: "Revised answer" });
    drafts.put({ ...answer, questionId: "question-1", response: ["a","b"] });
    const records = drafts.list(answer.userId,answer.lessonId);
    assert.equal(records.length,3); assert.equal(records.filter(record => record.revision === "revision-1").length,2);
});
test("storage failures are reported instead of claiming a durable backup exists", () => {
    const { drafts } = store({ setItem() { throw Error("Quota exceeded"); }, length: 0 });
    assert.equal(drafts.put(answer),null); assert.equal(drafts.list(answer.userId,answer.lessonId).length,0);
});
test("damaged records do not hide valid backups, and logout only clears this account", () => {
    const { drafts, browserStorage } = store(); drafts.put(answer); drafts.put({ ...answer,userId:"student-2" });
    browserStorage.setItem("siteLanguage","ru"); browserStorage.setItem("slovasofi-pending-answer:v1:student-1:lesson:broken","invalid JSON");
    assert.equal(drafts.list(answer.userId,answer.lessonId).length,1); drafts.clearUser("student-1");
    assert.equal(drafts.list("student-1","lesson").length,0); assert.equal(drafts.list("student-2","lesson").length,1);
    assert.equal(browserStorage.getItem("siteLanguage"),"ru");
});
function navigation(flush) {
    let handler; const button = { dataset: { view: "classes" },disabled:false,addEventListener:(_name,callback)=>{handler=callback;} };
    const ctx = { document: { querySelectorAll:()=>[button],getElementById:()=>({classList:{remove(){}},setAttribute(){}}) },
        flushDraftSaves:flush,activeRecorders:new Map(),activeView:"lessons",selectedClassId:"class",selectedLessonUnit:"A1",selectedLessonId:"lesson",openedLesson:{id:"lesson"},studentSectionsOpen:true,sidebar:{classList:{remove(){}}},render(){ctx.rendered=true;},showToast(message){ctx.message=message;},text:key=>key };
    const source = read("student.js"), start = source.lastIndexOf('    document.querySelectorAll(".nav-item")');
    vm.createContext(ctx); vm.runInContext(source.slice(start,source.indexOf('    pageContent.addEventListener("click", async (event)',start)),ctx);
    return {ctx,button,click:()=>handler()};
}
test("sidebar waits for the save to finish before discarding the lesson context",async()=>{
    let finish; const pending = new Promise(resolve=>{finish=resolve;});
    const {ctx,button,click}=navigation(()=>pending); const clickResult=click();
    assert.equal(ctx.openedLesson.id,"lesson"); assert.equal(button.disabled,true); assert.equal(ctx.rendered,undefined);
    finish(); await clickResult; assert.equal(ctx.openedLesson,null);assert.equal(ctx.activeView,"classes");assert.equal(button.disabled,false);
});
test("failed navigation save preserves the lesson and enables another save attempt",async()=>{
    const {ctx,button,click}=navigation(async()=>{throw Error("Offline");}); await click();
    assert.equal(ctx.openedLesson.id,"lesson");assert.equal(ctx.activeView,"lessons");assert.equal(ctx.rendered,undefined);assert.equal(button.disabled,false);assert(ctx.message.includes("Offline"));
});
