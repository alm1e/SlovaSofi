const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),test=require('node:test');
function moduleUnderTest(){const window={};vm.runInNewContext(fs.readFileSync(`${__dirname}/homework.js`,'utf8'),{window,SlovaI18n:{locales:x=>x}});return window.SlovaHomework;}
const task={id:'task',class_id:'class',lesson_id:'lesson',lesson_title:'Lesson',class_name:'Class',unit:'A1',due_at:'2026-01-01T12:00:00Z',instructions:'Read',submissions:[{student_id:'student',state:'not_started'}]};
test('overdue label applies only to unsent work, and reviewed work remains reviewed after its deadline',()=>{const h=moduleUnderTest(),now=Date.parse('2026-01-02');assert(h.isOverdue(task,'not_started',now));assert(h.isOverdue(task,'in_progress',now));assert(!h.isOverdue(task,'submitted',now));assert(!h.isOverdue(task,'reviewed',now));assert(!h.isOverdue({...task,due_at:'2027-01-01'},'not_started',now));});
test('homework text and teacher feedback cannot insert HTML into the student dashboard',()=>{const h=moduleUnderTest(),html=h.studentMarkup([{...task,lesson_title:'<img src=x onerror=bad()>',instructions:'<script>bad</script>',submissions:[{state:'reviewed',feedback:'<svg onload=bad()>'}]}],'ru');assert(!/<(?:img|script|svg)\b/i.test(html));assert(html.includes('&lt;img'));assert(html.includes('Комментарий'));assert(!html.includes('data-homework-submit'));});
test('student submits only from the open homework lesson, with a clear submitted/reviewed state',()=>{const h=moduleUnderTest();assert(h.studentMarkup([task],'en').includes('data-homework-open'));assert(!h.studentMarkup([task],'en').includes('data-homework-submit'));assert(h.studentMarkup([task],'en',true).includes('data-homework-submit'));assert(!h.studentMarkup([{...task,submissions:[{state:'submitted'}]}],'en',true).includes('data-homework-submit'));});
test('local response changes invalidate the matching class homework without modifying other classes or source objects',()=>{const h=moduleUnderTest(),source=[{...task,submissions:[{state:'reviewed'}]},{...task,id:'other',class_id:'another',submissions:[{state:'reviewed'}]}];const changed=h.markDirty(source,'lesson','class');assert.equal(changed[0].submissions[0].state,'in_progress');assert.equal(changed[1].submissions[0].state,'reviewed');assert.equal(source[0].submissions[0].state,'reviewed');assert(h.isHomeworkActivity({sections:[{homework:true,activities:[{index:2}]}]},2));assert(!h.isHomeworkActivity({sections:[{homework:false,activities:[{index:2}]}]},2));});
test('review RPC identifies the exact submission and deadline edits cannot move tasks to another class',async()=>{const h=moduleUnderTest(),calls=[];const client = {
 async rpc(name,args) { calls.push([name,args]); return {data:[],error:null}; },
 from(table) {
  return {
   update(values) {
    calls.push([table,values]);
    return {
     eq(key,id) {
      calls.push([key,id]);
      return { select:()=>({single:async()=>({data:{id:'task'},error:null})}) };
     }
    };
   }
  };
 }
};await h.api.review(client,'task','student','submission-revision','Feedback');assert.deepEqual(JSON.parse(JSON.stringify(calls[0])),['review_homework',{target_task_id:'task',target_student_id:'student',expected_submitted_at:'submission-revision',review_feedback:'Feedback'}]);await h.api.save(client,{id:'task',class_id:'forged',lesson_id:'forged',due_at:'2027-01-01',instructions:'Read'});assert.deepEqual(Object.keys(calls[1][1]),['due_at','instructions']);});
