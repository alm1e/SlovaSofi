const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const test = require("node:test");
const student = fs.readFileSync(`${__dirname}/student.js`, "utf8");
const teacher = fs.readFileSync(`${__dirname}/teacher.js`, "utf8");
function readFunction(source, name, indent = "") {
    const marker = source.includes(`async function ${name}(`) ? `async function ${name}(` : `function ${name}(`;
    const start = source.indexOf(marker);
    assert.notEqual(start, -1);
    return source.slice(start, source.indexOf(`\n${indent}}`, start) + indent.length + 2);
}
function studentContext() {
    const element = { dataset: { activityIndex: "0" }, response: ["answer"], querySelector: (selector) => selector === "[data-answer-kind]" ? {} : null, closest: () => null };
    const calls = [], results = [];
    const items = new Map(), window = {};
    vm.runInNewContext(fs.readFileSync(`${__dirname}/student-drafts.js`, "utf8"), { window });
    const draftStore = window.SlovaStudentDrafts.create({ get length() { return items.size; }, key: index => [...items.keys()][index], getItem: key => items.get(key) || null, setItem: (key,value) => items.set(key,value), removeItem: key => items.delete(key) });
    const ctx = vm.createContext({
        structuredClone, console, Event, Map, JSON, window: {}, homeworkTasks: [], draftStore, saveState: "saved", backupFailed: false, savingAnswers: 0,
        openedLesson: { id: "lesson", activities: [{ type: "fill-blank", gradable: true }] },
        selectedLessonId: "lesson", user: { id: "student" },
        activitiesFor: (lesson) => lesson.activities,
        lessonWriteIdentity: () => ({ activityId: "block-id", lessonRevision: "revision" }),
        draftSaveQueue: Promise.resolve(), pendingDrafts: new Map(), draftSaveTimers: new Map(),
        pageContent: { querySelectorAll: () => [element], querySelector: () => null },
        responseForActivity: (item) => item.response, updateLessonProgress() {},
        setDraftFeedback: (...args) => results.push({ feedback: args }),
        applyAnswerResult: (item, result) => results.push({ item, result }),
        invokeLessonApi: async (payload) => { calls.push(payload); return { correct: true, answers: {}, completed: false }; },
        text: (key) => key,
        setTimeout: (callback, delay) => { ctx.timer = { callback, delay }; return 1; },
        clearTimeout() {}
    });
    vm.runInContext(["hasAnswerResponse", "shouldAutoCheckAnswer", "backupAnswer", "updateSaveStatus", "saveFindErrorEvent", "queueDraftSave", "activityDraftKey", "scheduleDraftSave"].map((name) => readFunction(student, name, "    ")).join("\n"), ctx);
    return { ctx, element, calls, results };
}
test("automatic checks use server grading; empty answers, media, flashcards and recordings remain drafts", async () => {
    const { ctx, element, calls, results } = studentContext();
    await ctx.queueDraftSave("lesson", "0", 0, null, element.response);
    assert.equal(calls[0].action, "submit");
    assert.equal(calls[0].activityId, "block-id");
    assert.equal(results[0].result.correct, true);
    for (const activity of [{ type: "pronunciation-recording", reviewRequired: true }, { type: "find-error", gradable: true }, { type: "flashcards" }, { type: "audio" }]) {
        ctx.openedLesson.activities = [activity];
        await ctx.queueDraftSave("lesson", "0", 0, null, element.response);
        assert.equal(calls.at(-1).action, "save-draft");
    }
    ctx.openedLesson.activities = [{ type: "fill-blank", gradable: true }];
    element.response = [""];
    await ctx.queueDraftSave("lesson", "0", 0, null, element.response);
    assert.equal(calls.at(-1).action, "save-draft");
    assert.equal(ctx.shouldAutoCheckAnswer({ type: "open-answer", reviewRequired: true }, { text: "Written answer", attachments: [] }), true);
});
test("group questions are checked individually with their stable question identity", async () => {
    const { ctx, calls } = studentContext();
    ctx.openedLesson.activities = [{ type: "listening-questions", questions: [{ type: "multiple-choice", questionId: "q1", gradable: true }] }];
    await ctx.queueDraftSave("lesson", "0:q1", 0, "q1", "option");
    assert.equal(calls[0].action, "submit");
    assert.equal(calls[0].questionId, "q1");
});
test("an older response never repaints newer input or deletes its pending draft", async () => {
    const { ctx, element, results } = studentContext();
    let release;
    ctx.invokeLessonApi = () => new Promise((resolve) => { release = resolve; });
    const saved = ctx.queueDraftSave("lesson", "0", 0, null, ["old"]);
    await new Promise(setImmediate);
    element.response = ["new"];
    ctx.pendingDrafts.set("0", { response: ["new"] });
    release({ correct: false, answers: {}, completed: false });
    await saved;
    assert.equal(results.length, 0);
    assert.deepEqual(ctx.pendingDrafts.get("0").response, ["new"]);
});
test("automatic submissions remain serialized so concurrent edits cannot overwrite other answers", async () => {
    const { ctx } = studentContext();
    const started = [];
    let release;
    ctx.invokeLessonApi = async (payload) => {
        started.push(payload.response);
        if (started.length === 1) await new Promise((resolve) => { release = resolve; });
        return { correct: true, answers: {}, completed: false };
    };
    const first = ctx.queueDraftSave("lesson", "0", 0, null, ["first"]);
    const second = ctx.queueDraftSave("lesson", "0", 0, null, ["second"]);
    await new Promise(setImmediate);
    assert.equal(started.length, 1);
    release();
    await Promise.all([first, second]);
    assert.deepEqual(JSON.parse(JSON.stringify(started)), [["first"], ["second"]]);
});
test("live feedback grades filled fields, leaves empty fields neutral, and clears results for drafts", () => {
    const ctx = vm.createContext({ Event, text: (key) => key });
    vm.runInContext(readFunction(student, "applyAnswerResult", "    "), ctx);
    const field = (value) => ({
        value, classes: new Set(), attributes: {},
        classList: { toggle(name, enabled) { enabled ? this.owner.classes.add(name) : this.owner.classes.delete(name); } },
        setAttribute(name, value) { this.attributes[name] = value; }
    });
    const fields = [field("answer"), field("")];
    fields.forEach((input) => { input.classList.owner = input; });
    const feedback = {};
    const element = {
        querySelectorAll: (selector) => selector === "[data-match-answer]" ? [] : fields,
        querySelector: (selector) => selector === "[data-answer-feedback]" ? feedback : null
    };
    ctx.applyAnswerResult(element, { correct: false, blankResults: [true, false] });
    assert.equal(fields[0].classes.has("blank-correct"), true);
    assert.equal(fields[1].classes.size, 0);
    assert.equal(feedback.textContent, "");
    fields[1].value = "wrong";
    ctx.applyAnswerResult(element, { correct: false, blankResults: [true, false] });
    assert.equal(fields[1].classes.has("blank-incorrect"), true);
    assert.equal(feedback.textContent, "incorrect");
    ctx.applyAnswerResult(element, { draft: true });
    assert.equal(fields[0].classes.size, 0);
    assert.equal(fields[1].classes.size, 0);
    assert.equal(feedback.className, "student-answer-feedback");
});
test("typing is debounced while selection and reorder changes can check without delay", () => {
    const { ctx, element } = studentContext();
    ctx.scheduleDraftSave(element);
    assert.equal(ctx.timer.delay, 500);
    ctx.scheduleDraftSave(element, true);
    assert.equal(ctx.timer.delay, 0);
    assert.equal(ctx.pendingDrafts.size, 1);
});
test("failed server checking retains the answer for retry and reports a visible error", async () => {
    const { ctx, results } = studentContext();
    ctx.pendingDrafts.set("0", { response: ["answer"] });
    ctx.invokeLessonApi = async () => { throw Error("offline"); };
    await assert.rejects(ctx.queueDraftSave("lesson", "0", 0, null, ["answer"]), /offline/);
    assert.equal(ctx.pendingDrafts.size, 1);
    assert.equal(ctx.draftStore.list("student", "lesson").length, 1);
    assert.equal(ctx.saveState, "error");
    assert.equal(results[0].feedback.at(-1), true);
});
test("preview checks debounce typing and immediately check changes, moves and drops", () => {
    const handlers = {}, checks = [];
    const card = { dataset: {}, isConnected: true, addEventListener: (name, callback) => { handlers[name] = callback; } };
    const ctx = vm.createContext({
        checkPreviewActivity: (item) => checks.push(item), clearTimeout() {},
        setTimeout: (callback, delay) => { ctx.timer = { callback, delay }; return 1; },
        queueMicrotask: (callback) => callback()
    });
    vm.runInContext(readFunction(teacher, "bindPreviewAutoCheck"), ctx);
    const container = { querySelectorAll: () => [card] };
    ctx.bindPreviewAutoCheck(container);
    handlers.input({ target: { matches: () => true } });
    assert.equal(checks.length, 0);
    assert.equal(ctx.timer.delay, 500);
    ctx.timer.callback();
    handlers.change({ target: { matches: () => true } });
    handlers.click({ target: { closest: () => true } });
    handlers.drop();
    assert.equal(checks.length, 4);
    card.isConnected = false;
    handlers.change({ target: { matches: () => true } });
    assert.equal(checks.length, 4);
});
test("grading buttons are absent from teacher previews and student markup; recording save stays explicit", () => {
    assert.doesNotMatch(readFunction(teacher, "renderPreviewActivity"), /data-check-activity/);
    assert.doesNotMatch(readFunction(student, "renderActivity", "    "), /data-submit-activity-group/);
    assert.match(student, /activity.type === "pronunciation-recording"\s*\n\s*\? `<button[^>]+data-submit-answer/);
});

test("failed error-finding events retain a draft without replaying the grading event", async () => {
    const { ctx, element, calls } = studentContext();
    ctx.openedLesson.activities = [{ type: "find-error", gradable: true }];
    element.response = { selected: [0], corrections: { 0: "correction" } };
    ctx.invokeLessonApi = async () => { throw Error("offline"); };
    await assert.rejects(ctx.saveFindErrorEvent({ closest: () => element }, { type: "check", index: 0 }), /offline/);
    assert.equal(ctx.pendingDrafts.size, 1);
    assert.equal(ctx.draftStore.list("student", "lesson").length, 1);
    ctx.invokeLessonApi = async payload => { calls.push(payload); return { answers: {}, completed: false }; };
    await ctx.queueDraftSave("lesson", "0", 0, null, element.response);
    assert.equal(calls[0].action, "save-draft");
    assert.equal(ctx.pendingDrafts.size, 0);
    assert.equal(ctx.draftStore.list("student", "lesson").length, 0);
});

test('photo autosave requires the exact acknowledged response before clearing local recovery',async()=>{
 const {ctx,element}=studentContext();ctx.language='ru';ctx.openedLesson.activities=[{type:'image',id:'photo',index:0}];ctx.activityProgressKey=()=> 'photo-key';ctx.legacyActivityProgressKey=()=>null;
 element.response=JSON.stringify({'https://example.test/photo.png':[{type:'input',id:'gap',x:100,y:200,w:80,h:35,text:'á'}]});
 ctx.invokeLessonApi=async()=>({answers:{},completed:false});await assert.rejects(()=>ctx.queueDraftSave('lesson','0',0,null,element.response),/не подтвердил/);
 assert.equal(ctx.pendingDrafts.size,1);assert.equal(ctx.draftStore.list('student','lesson').length,1);assert.equal(ctx.saveState,'error');
 ctx.invokeLessonApi=async payload=>({answers:{'photo-key':{response:payload.response,correct:null,draft:true}},completed:false});await ctx.queueDraftSave('lesson','0',0,null,element.response);
 assert.equal(ctx.pendingDrafts.size,0);assert.equal(ctx.draftStore.list('student','lesson').length,0);assert.equal(ctx.saveState,'saved');
});
test('Realtime snapshots buffer photo changes and reconnect reloads missed answers without accepting stale reads',async()=>{
 const reads=[],listeners={};let renders=0;
 const api={subscribeLessonProgress(client,id,event,status){listeners.event=event;listeners.status=status;return {};},loadLessonProgress(){return new Promise((resolve,reject)=>reads.push({resolve,reject}));}};
 const ctx=vm.createContext({console,Map,liveProgressGeneration:0,liveProgressChannel:null,liveProgressKey:'',liveProgressRows:new Map(),liveProgressStatus:'idle',liveProgressError:'',currentUser:{id:'teacher'},window:{supabaseClient:{removeChannel:async()=> 'ok'},teacherWorkspaceApi:api},lessonSectionText:key=>key,render:()=>renders++});
 vm.runInContext(['stopLiveProgressSubscription','applyLiveProgressEvent','ensureLiveProgressSubscription'].map(name=>readFunction(teacher,name)).join('\n'),ctx);
 ctx.ensureLiveProgressSubscription({id:'lesson'},{id:'class'});assert.equal(reads.length,1);listeners.status('SUBSCRIBED');assert.equal(reads.length,2);
 const row={student_id:'learner',class_id:'class',answers:{photo:{response:'first word'}}};listeners.event({eventType:'UPDATE',new:row});reads[1].resolve([]);await Promise.resolve();await Promise.resolve();assert.equal(ctx.liveProgressRows.get('learner').answers.photo.response,'first word');
 reads[0].resolve([]);await Promise.resolve();assert.equal(ctx.liveProgressRows.size,1);
 listeners.status('CHANNEL_ERROR');listeners.status('SUBSCRIBED');assert.equal(reads.length,3);reads[2].resolve([{...row,answers:{photo:{response:'second word'}}}]);await Promise.resolve();await Promise.resolve();assert.equal(ctx.liveProgressRows.get('learner').answers.photo.response,'second word');assert.equal(ctx.liveProgressStatus,'ready');
 ctx.stopLiveProgressSubscription();listeners.event({eventType:'UPDATE',new:row});assert.equal(ctx.liveProgressRows.size,0);assert.ok(renders>0);
});

test('a delete from another lesson cannot erase the currently monitored photo answer',()=>{
 const rows=new Map([['learner',{student_id:'learner',class_id:'class',lesson_id:'current',answers:{photo:'saved'}}]]),ctx=vm.createContext({});vm.runInContext(readFunction(teacher,'applyLiveProgressEvent'),ctx);
 ctx.applyLiveProgressEvent(rows,{eventType:'DELETE',old:{student_id:'learner',lesson_id:'other'}},'class','current');assert.equal(rows.size,1);
 ctx.applyLiveProgressEvent(rows,{eventType:'DELETE',old:{student_id:'learner',lesson_id:'current'}},'class','current');assert.equal(rows.size,0);
});

test('realtime updates patch only live answer panels, without rendering the workspace', () => {
    const calls=[];
    const panel={closest:()=>null,dataset:{liveProgressIndex:'0',livePhotoIndexValue:'0',liveQuestionIndex:'',liveQuestionId:''}};
    const fresh={querySelector:()=>null,querySelectorAll:()=>[]};
    const ctx={data:{lessons:[{id:'lesson'}],classes:[{id:'class'}]},workspaceLessonId:'lesson',lessonWorkspaceMode:'preview',lessonWorkspaceTab:'lesson',activeLessonSectionId:'section',monitorClassId:'class',selectedLiveStudentId:'student',
        normalizeLessonSections:()=>[{id:'section',activities:[{type:'open-answer'}]}],liveStudentsForGroup:()=>[{id:'student'}],liveProgressRows:new Map(),
        window:{scrollX:0,scrollY:700,SlovaLiveDOM:{patch:(old,next)=>calls.push([old,next])},scrollTo:position=>calls.push(position)},
        document:{createElement:()=>({set innerHTML(value){this.html=value;},content:{...fresh,firstElementChild:{updated:true}}})},
        pageContent:{querySelectorAll:selector=>selector==='[data-live-progress-index]'?[panel]:[],querySelector:()=>null},
        renderLiveAnswerPanel:()=>'<div>new answer</div>',renderLiveMonitor:()=>'<section></section>',lessonProgressIndexes:()=>new Map(),bindLiveAnswerActions(){},
        render(){throw Error('Full workspace render must not run');}
    };
    vm.runInNewContext(readFunction(teacher,'refreshLiveProgressView')+'\nrefreshLiveProgressView();',ctx);
    assert.equal(calls[0][0],panel);
    assert.equal(calls.at(-1).top,700);
});
