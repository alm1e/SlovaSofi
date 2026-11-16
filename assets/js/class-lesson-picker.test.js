const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const test = require("node:test");
const source = fs.readFileSync(`${__dirname}/teacher.js`, "utf8");
function fn(name) { const start=source.indexOf(`function ${name}(`); return source.slice(start,source.indexOf("\n}",start)+2); }
function context() {
    const ctx=vm.createContext({data:{lessons:[{id:"assigned",title:"Intro",unit:"A1",classIds:["class"],sections:[{title:"Text",activities:[{content:"Ready"}]}]},{id:"new",title:"Body",unit:"B1",classIds:["other"],sections:[{title:"Text",activities:[{content:"Ready"}]}]},{id:"draft",title:"Draft",unit:"A1",classIds:[],sections:[{title:"Text",activities:[{incomplete:true}]}]}]},lessonClassIds:lesson=>lesson.classIds,normalizeLessonSections:lesson=>lesson.sections,normalizeHomeworkSections:()=>[],window:{SlovaLessonReadiness:{incomplete:activity=>Boolean(activity.incomplete)}}});
    vm.runInContext(fn("lessonAssignmentIncomplete")+fn("classLessonPickerItems"),ctx);return ctx;
}
test("picker searches the entire shared library, including lessons not assigned to this class",()=>{
    const ctx=context();assert.equal(ctx.classLessonPickerItems("class").length,3);
    assert.equal(ctx.classLessonPickerItems("class","body")[0].lesson.id,"new");
    assert.equal(ctx.classLessonPickerItems("class","","A1").length,2);
    assert.equal(ctx.classLessonPickerItems("class","body","A1").length,0);
});
test("picker identifies existing assignments and unfinished lessons without modifying them",()=>{
    const ctx=context(),before=JSON.stringify(ctx.data);const rows=ctx.classLessonPickerItems("class");
    assert.equal(rows.find(row=>row.lesson.id==="assigned").assigned,true);
    assert.equal(rows.find(row=>row.lesson.id==="new").assigned,false);
    assert.equal(rows.find(row=>row.lesson.id==="draft").incomplete,true);
    assert.equal(JSON.stringify(ctx.data),before);
});
test("adding lessons only upserts new assignment rows and never rewrites classes, rosters or progress",async()=>{
    const window={},calls=[];vm.runInNewContext(fs.readFileSync(`${__dirname}/teacher-data.js`,"utf8"),{window});
    const client={from:table=>({upsert:async(rows,options)=>{calls.push({table,rows,options});return {error:null};}})};
    await window.teacherWorkspaceApi.assignLessonsToClass(client,"class","owner",["first","second","first"]);
    assert.equal(calls.length,1);assert.equal(calls[0].table,"class_lesson_assignments");
    assert.deepEqual(JSON.parse(JSON.stringify(calls[0].rows)),[{class_id:"class",teacher_id:"owner",lesson_id:"first"},{class_id:"class",teacher_id:"owner",lesson_id:"second"}]);
    assert.equal(calls[0].options.ignoreDuplicates,true);
    await window.teacherWorkspaceApi.assignLessonsToClass(client,"class","owner",[]);assert.equal(calls.length,1);
});
test("assignment permission errors propagate to the picker instead of reporting success",async()=>{
    const window={};vm.runInNewContext(fs.readFileSync(`${__dirname}/teacher-data.js`,"utf8"),{window});
    await assert.rejects(window.teacherWorkspaceApi.assignLessonsToClass({from:()=>({upsert:async()=>({error:{message:"Permission denied"}})})},"class","owner",["lesson"]),/Permission denied/);
});
test("director cannot open the assignment picker even through a direct action",()=>{
    const ctx=vm.createContext({hasPermission:()=>false});vm.runInContext(fn("openClassLessonPicker"),ctx);
    assert.doesNotThrow(()=>ctx.openClassLessonPicker("class"));
});
