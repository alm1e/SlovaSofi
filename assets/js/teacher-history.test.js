const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const test=require('node:test');
function ui(){const window={};vm.runInNewContext(fs.readFileSync(`${__dirname}/teacher-history.js`,'utf8'),{window,SlovaI18n:{locales:x=>x}});return window.SlovaHistoryUI;}
test('historical lesson markup escapes authored HTML and answer keys',()=>{
 const html=ui().snapshotMarkup({title:'<img src=x onerror=alert(1)>',unit:'A1',activities:{format:'sections-v1',sections:[{title:'<script>bad</script>',activities:[{prompt:'<svg onload=bad()>',content:'<img src=x>',answer:'<script>answer</script>',questions:[{content:'child question'}]}]}],homeworkSections:[{title:'Homework',activities:[]}]}},'ru');
 assert(!/<(?:img|script|svg)\b/i.test(html));assert(html.includes('&lt;img'));assert(html.includes('child question'));assert(html.includes('Домашняя работа'));
});
test('legacy snapshots and malformed section fields remain readable',()=>{
 assert(ui().snapshotMarkup({title:'Old',unit:'A1',activities:[{content:'Legacy lesson'}]},'en').includes('Legacy lesson'));
 assert.doesNotThrow(()=>ui().snapshotMarkup({activities:{sections:'bad',homeworkSections:null}},'en'));
});
test('audit labels distinguish restores, roles and archive operations and unknown languages have a fallback',()=>{
 const history=ui();assert(history.actionLabel('lesson.restored','ru').includes('восстановлена'));assert(history.actionLabel('class.archived','ru').includes('архив'));assert(history.actionLabel('staff.role_changed','ru').includes('Роль'));assert.equal(history.actorLabel({actor_id:null},'en'),'System');assert(history.text('unknown','audit'));
});
test('history API requests are bounded and use stable pagination and optimistic restore parameters',async()=>{
 const calls=[],window={};vm.runInNewContext(fs.readFileSync(`${__dirname}/teacher-data.js`,'utf8'),{window});
 const client={from(table){calls.push(['table',table]);const q={select(fields){calls.push(['select',fields]);return q},order(...args){calls.push(['order',...args]);return q},limit(n){calls.push(['limit',n]);return q},eq(...args){calls.push(['eq',...args]);return q},lt(...args){calls.push(['lt',...args]);return q},then(resolve,reject){return Promise.resolve({data:[],error:null}).then(resolve,reject)}};return q},async rpc(name,args){calls.push(['rpc',name,args]);return {data:'new-revision',error:null}}};
 await window.teacherWorkspaceApi.listAuditLog(client,'class','100');assert(calls.some(call=>call[0]==='limit'&&call[1]===50));assert(calls.some(call=>call[0]==='eq'&&call[1]==='class_id'&&call[2]==='class'));assert(calls.some(call=>call[0]==='lt'&&call[1]==='id'&&call[2]==='100'));
 calls.length=0;await window.teacherWorkspaceApi.listLessonVersions(client,'lesson',5);assert(calls.some(call=>call[0]==='lt'&&call[1]==='version_no'&&call[2]===5));assert(!calls.find(call=>call[0]==='select')[1].includes('snapshot'));
 await window.teacherWorkspaceApi.restoreLessonVersion(client,'version','expected');assert.deepEqual(JSON.parse(JSON.stringify(calls.at(-1))),['rpc','restore_lesson_version',{target_version_id:'version',expected_updated_at:'expected'}]);
});
