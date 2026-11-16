const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');
const read = name => fs.readFileSync(path.join(__dirname,name),'utf8');
function api() {
 const window={}; vm.runInNewContext(read('teacher-data.js'),{window,console,crypto}); return window.teacherWorkspaceApi;
}
function clientFor(role) {
 const filters=[];
 const tables={teacher_workspace_settings:[{legacy_imported:true}],teacher_classes:[{id:'class',name:'School',course:'A1',class_scope:'school',teacher_id:'owner'}],teacher_lessons:[],class_students:[],class_lesson_assignments:[],lesson_categories:[],profiles:[{id:'owner',first_name:'Teacher',last_name:''}]};
 const client={rpc:async()=>({data:{owner_id:'user',role,permissions:{view_classes_students:true}},error:null}),from(table){
  const q={select(){return q},order(){return q},eq(key,value){filters.push([table,key,value]);return q},in(){return q},maybeSingle:async()=>({data:tables[table][0],error:null}),then(resolve,reject){return Promise.resolve({data:tables[table],error:null}).then(resolve,reject)}};return q;
 }};
 return {client,filters};
}
test('directors load RLS-visible school classes without filtering by their own teacher ID',async()=>{
 const {client,filters}=clientFor('director'); const result=await api().loadWorkspace(client,'user');
 assert.equal(result.role,'director'); assert.equal(result.data.classes[0].classScope,'school');
 assert(!filters.some(([table,key])=>table==='teacher_classes'&&key==='teacher_id'));
});
test('teacher workspace queries retain ownership filters',async()=>{
 const {client,filters}=clientFor('teacher'); await api().loadWorkspace(client,'user');
 for(const table of ['teacher_classes','class_students','class_lesson_assignments']) assert(filters.some(([name,key,value])=>name===table&&key==='teacher_id'&&value==='user'));
});
test('director library saves never synchronize classes even with stale permissions',async()=>{
 const calls=[];
 const client={from(table){calls.push(table);return {upsert:async()=>({error:null})}}};
 await api().saveWorkspace(client,'director',{classes:[{id:'school',students:[]}],lessons:[{id:'lesson',title:'Edited',unit:'A1',activities:[]}]},{role:'director',permissions:{manage_classes_students:true,edit_lessons:true,view_assign_lessons:true}});
 assert(calls.includes('teacher_lessons'));
 for(const table of ['teacher_classes','class_students','class_lesson_assignments']) assert(!calls.includes(table));
});
test('class persistence preserves personal scope and defaults new classes to school',async()=>{
 const written=[];
 const client = {
  from(table) {
   return {
    async upsert(rows) { if (table === 'teacher_classes') written.push(...rows); return { error: null }; },
    select() {
     return {
      eq() { return this; },
      then(resolve, reject) { return Promise.resolve({ data: [], error: null }).then(resolve, reject); }
     };
    }
   };
  }
 };
 await api().saveWorkspace(client,'teacher',{classes:[{id:'school',name:'School',students:[]},{id:'private',name:'Private',classScope:'private',students:[]}],lessons:[]},{role:'teacher',permissions:{manage_classes_students:true}});
 assert.equal(written[0].class_scope,'school');assert.equal(written[1].class_scope,'private');
});
function sourceFunction(name) {
 const source=read('teacher.js'),start=source.indexOf(`function ${name}(`),end=source.indexOf('\nfunction ',start+1);
 return source.slice(start,end<0?undefined:end);
}
test('director class cards show scope and lesson links without edit, invite or create buttons',()=>{
 const ctx={historyText:key=>key,SlovaI18n:{locales:x=>x},currentLanguage:'ru',classArchiveView:false,archivingClassIds:new Set(),workspaceAccess:{role:'director'},currentUser:{},data:{classes:[{id:'class',name:'School',classScope:'school',course:'A1',students:[],teacherName:'Teacher'}]},searchQuery:'',hasPermission:key=>['view_classes_students','view_lessons'].includes(key),userDisplayName:()=>'',escapeHtml:x=>String(x??''),formatCourse:x=>x,t:x=>x,presenceBadge:()=>'',emptyMessage:()=>''};
 vm.createContext(ctx);vm.runInContext(sourceFunction('classScopeText')+sourceFunction('classArchiveText')+sourceFunction('renderClasses'),ctx);const html=ctx.renderClasses();
 assert(html.includes('Класс школы'));assert(html.includes('data-action="class-lessons"'));
 for(const action of ['new-class','edit-class','delete-class','invite-student']) assert(!html.includes(`data-action="${action}"`));
});
test('the class editor selects school by default and locks scope changes for teachers',()=>{
 let html='';const form={querySelector:()=>null,addEventListener(){}};
 const ctx={SlovaI18n:{locales:x=>x},currentLanguage:'ru',workspaceAccess:{role:'teacher'},hasPermission:()=>true,escapeHtml:x=>String(x??''),t:x=>x,modalHeader:x=>x,openModal:x=>{html=x},modalCard:{querySelectorAll:()=>[],querySelector:selector=>selector==='#classForm'?form:null}};
 vm.createContext(ctx);vm.runInContext(sourceFunction('classScopeText')+sourceFunction('openClassEditor'),ctx);ctx.openClassEditor();
 assert(html.includes('value="school" selected'));assert(!html.includes('name="classScope" disabled'));
 ctx.openClassEditor({id:'existing',classScope:'private',students:[]});assert(html.includes('value="private" selected'));assert(html.includes('name="classScope" disabled'));
 ctx.workspaceAccess.role='admin';ctx.openClassEditor({id:'existing',classScope:'private',students:[]});assert(!html.includes('name="classScope" disabled'));
});
