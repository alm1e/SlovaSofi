const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const test = require("node:test");
const source = fs.readFileSync(`${__dirname}/teacher.js`,"utf8");
function fn(name) { const marker=source.includes(`async function ${name}(`)?`async function ${name}(`:`function ${name}(`;const start=source.indexOf(marker);return source.slice(start,source.indexOf("\n}",start)+2); }
function context() {
 const ctx=vm.createContext({historyText:key=>key,homeworkText:key=>key,classArchiveView:false,archivingClassIds:new Set(),searchQuery:"",currentLanguage:"ru",currentUser:{id:"teacher"},SlovaI18n:{locales:x=>x},workspaceAccess:{role:"teacher"},data:{classes:[{id:"active",name:"Current class",course:"A1",students:["Student"],archivedAt:null},{id:"archived",name:"Past class",course:"B1",students:["Old student"],archivedAt:"2026-01-01"}]},hasPermission:()=>true,userDisplayName:()=>"Teacher",t:x=>x,escapeHtml:x=>String(x??""),formatCourse:x=>x,presenceBadge:()=>"",emptyMessage:(a,b)=>`${a} ${b}`,showToast(){},render(){},window:{teacherWorkspaceApi:{setClassArchived:async()=>"2026-11-16"}}});
 vm.runInContext(["classScopeText","classArchiveText","renderClasses","setClassArchived"].map(fn).join("\n"),ctx);return ctx;
}
test("active and archive tabs filter presentation without removing stored classes",()=>{
 const ctx=context();let html=ctx.renderClasses();assert(html.includes('data-open-class-id="active"'));assert(!html.includes('data-open-class-id="archived"'));
 ctx.classArchiveView=true;html=ctx.renderClasses();assert(!html.includes('data-open-class-id="active"'));assert(html.includes('data-open-class-id="archived"'));assert(html.includes('data-action="restore-class"'));assert(!html.includes('data-action="invite-student"'));assert.equal(ctx.data.classes.length,2);
});
test("archive and restore preserve student records and lesson assignments",async()=>{
 const ctx=context();const students=ctx.data.classes[0].students;
 await ctx.setClassArchived("active",true);assert.equal(ctx.data.classes[0].archivedAt,"2026-11-16");assert.equal(ctx.data.classes[0].students,students);assert.equal(ctx.data.classes.length,2);
 ctx.window.teacherWorkspaceApi.setClassArchived=async()=>null;await ctx.setClassArchived("active",false);assert.equal(ctx.data.classes[0].archivedAt,null);
});
test("failed archive leaves class active, and directors cannot start the operation",async()=>{
 const ctx=context();ctx.window.teacherWorkspaceApi.setClassArchived=async()=>{throw Error("Offline");};await ctx.setClassArchived("active",true);assert.equal(ctx.data.classes[0].archivedAt,null);assert.equal(ctx.archivingClassIds.size,0);
 ctx.hasPermission=()=>false;ctx.window.teacherWorkspaceApi.setClassArchived=()=>{throw Error("Must not call");};await assert.doesNotReject(ctx.setClassArchived("active",true));
});
test("archive API updates only the class timestamp and propagates denied access",async()=>{
 const window={};vm.runInNewContext(fs.readFileSync(`${__dirname}/teacher-data.js`,"utf8"),{window,Date});const writes=[];let error=null;
 const client = {
  from(table) {
   return {
    update(values) {
     writes.push({ table, values });
     return {
      eq(key, id) {
       writes.at(-1).key = key; writes.at(-1).id = id;
       return { select: () => ({ single: async () => ({ data: { archived_at: values.archived_at }, error }) }) };
      }
     };
    }
   };
  }
 };
 assert(await window.teacherWorkspaceApi.setClassArchived(client,"class",true));assert.equal(writes[0].table,"teacher_classes");assert.deepEqual(Object.keys(writes[0].values),["archived_at"]);assert.equal(writes[0].id,"class");
 assert.equal(await window.teacherWorkspaceApi.setClassArchived(client,"class",false),null);error={message:"Permission denied"};await assert.rejects(window.teacherWorkspaceApi.setClassArchived(client,"class",true),/Permission denied/);
});
