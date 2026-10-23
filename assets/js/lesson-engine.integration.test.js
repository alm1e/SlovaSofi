const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),test=require('node:test');
const {stripTypeScriptTypes}=require('node:module');
const {migrateLessonProgress}=require('./progress-migration.js');
const id=n=>`${String(n).padStart(8,'0')}-1111-4111-8111-111111111111`;
function engine(activities){
    const userId=id(101),memberId=id(102),classId=id(103),lessonId=id(104),revision='2026-10-23T10:00:00Z';
    const lesson={id:lessonId,title:'Test',unit:'A1',activities,updated_at:revision};
    let saved=null,writes=0,handler;
    const tables=()=>({profiles:{role:'student'},class_students:[{id:memberId,class_id:classId,teacher_classes:{id:classId,name:'Class',teacher_id:id(105)}}],class_lesson_assignments:[{class_id:classId,lesson_id:lessonId,teacher_lessons:lesson}],student_lesson_progress:saved?[saved]:[],calendar_events:[]});
    const client={auth:{getUser:async()=>({data:{user:{id:userId}},error:null})},from(table){const chain={};for(const op of ['select','eq','in','gte','order'])chain[op]=()=>chain;chain.maybeSingle=async()=>({data:tables()[table],error:null});chain.then=(resolve,reject)=>Promise.resolve({data:tables()[table],error:null}).then(resolve,reject);chain.upsert=async row=>{saved=structuredClone(row);writes++;return{error:null};};return chain;}};
    const ctx=vm.createContext({URL,Request,Response,crypto:require('node:crypto').webcrypto,createClient:()=>client,console,SlovaTable:require('./table.js'),SlovaFillBlanks:require('./fill-blanks.js'),Deno:{env:{get:key=>({APP_URL:'https://school.example',SUPABASE_URL:'https://db.example',SUPABASE_ANON_KEY:'test',SUPABASE_SERVICE_ROLE_KEY:'test'})[key]},serve:fn=>{handler=fn;}}});
    const path=process.env.LESSON_ENGINE_TEST_SOURCE||`${__dirname}/../../supabase/functions/student-lessons/index.ts`;
    vm.runInContext(stripTypeScriptTypes(fs.readFileSync(path,'utf8').replace(/^import .*;\r?\n/gm,'')),ctx);
    async function request(payload){const response=await handler(new Request('https://db.example/functions/v1/student-lessons',{method:'POST',headers:{Origin:'https://school.example',Authorization:'Bearer test'},body:JSON.stringify({lessonId,...payload})}));return{status:response.status,body:await response.json()};}
    const write=(index,response,action='submit',extra={})=>request({action,activityIndex:index,activityId:activities[index].id,lessonRevision:revision,response,...extra});
    return{ctx,lesson,revision,userId,classId,lessonId,request,write,get saved(){return saved;},get writes(){return writes;}};
}
test('endpoint saves open answers with attachments and flashcard ratings, then restores them',async()=>{
    const a=[{id:id(1),type:'open-answer',prompt:'Write',content:'',answer:''},{id:id(2),type:'flashcards',prompt:'Cards',content:'dom: house',answer:''}];
    const e=engine(a),response={text:'Volám sa Anna',attachments:['https://example.com/file.pdf']};
    assert.equal((await e.write(0,response,'save-draft')).status,200);
    const submitted=await e.write(0,response);assert.equal(submitted.status,200);assert.equal(submitted.body.reviewRequired,true);
    assert.equal((await e.write(1,['know','repeat'],'save-draft')).status,200);
    const loaded=await e.request({action:'load'});assert.equal(loaded.status,200);assert.equal(loaded.body.lesson.revision,e.revision);
    assert.deepEqual(loaded.body.lesson.progress['b'+id(1)].response,response);
    assert.deepEqual(loaded.body.lesson.progress['b'+id(2)].response,['know','repeat']);
});
test('new activity types load and pronunciation recordings enforce ownership',async()=>{
    const a=['pronunciation-recording','listening-questions','find-error','interactive-image'].map((type,i)=>({id:id(i+1),type,prompt:type,content:'https://example.com/media',answer:'',settings:{errors:[{index:0,correction:'Ja'}],hotspots:[{x:25,y:50,word:'dom'}]}}));
    const e=engine(a),loaded=await e.request({action:'load'});
    assert.equal(loaded.body.lesson.sections[0].activities.length,4);
    const path=`${e.userId}/${e.classId}/${e.lessonId}/${id(201)}.webm`;
    assert.equal((await e.write(0,path,'save-draft')).status,200);
    assert.equal((await e.write(0,path)).body.reviewRequired,true);
    assert.equal((await e.write(0,`${id(999)}/${e.classId}/${e.lessonId}/${id(201)}.webm`)).status,400);
});
test('activity identity survives index changes and stale or legacy writes are rejected',async()=>{
    const a=[{id:id(1),type:'true-false',prompt:'First',content:'First',answer:'true'},{id:id(2),type:'true-false',prompt:'Second',content:'Second',answer:'false'}];
    const e=engine(a);
    const moved=await e.request({action:'submit',activityIndex:0,activityId:id(2),lessonRevision:e.revision,response:'false'});
    assert.equal(moved.status,200);assert.equal(moved.body.answers['b'+id(2)].correct,true);
    const writes=e.writes;
    for(const extra of [{lessonRevision:'old',activityId:id(1)},{lessonRevision:e.revision,activityId:id(999)},{lessonRevision:e.revision}])assert.equal((await e.request({action:'submit',activityIndex:0,response:'true',...extra})).status,409);
    assert.equal(e.writes,writes);
});
test('technical settings preserve locked words, multiple answers, and grouped listening questions',async()=>{
    const a=[{id:id(1),type:'drag-words',prompt:'Sentence',content:'Ja som',answer:'Ja / som',settings:{lockedWords:['Ja']}},{id:id(2),type:'multiple-choice',prompt:'Choose',content:'',answer:'',settings:{multipleAnswers:true,options:[{text:'dom',correct:true},{text:'škola',correct:true},{text:'auto',correct:false}]}},{id:id(3),type:'listening-questions',prompt:'Listen',content:'https://example.com/audio.mp3',answer:'',questions:[{id:'q1',prompt:'Choose',content:'dom\nauto',answer:'dom'}]}];
    const e=engine(a),loaded=await e.request({action:'load'});
    assert.deepEqual(loaded.body.lesson.sections[0].activities[0].settings.lockedWords,['Ja']);
    assert.equal((await e.write(0,['Ja','som'])).body.correct,true);
    assert.equal((await e.write(1,['dom','škola'])).body.correct,true);
    const grouped=await e.write(2,'dom','submit',{questionId:'q1'});assert.equal(grouped.status,200);assert.equal(grouped.body.correct,true);assert.ok(grouped.body.answers['b'+id(3)+'.qq1']);
});
test('migration accounts for skipped types and retains an older grouped base answer',()=>{
    const a=[{id:id(1),type:'text'},{id:id(2),type:'find-error'},{id:id(3),type:'fill-blank',questions:[{id:'q1'}]}];
    const old={response:'old',correct:true},specific={response:'new',correct:false};
    const snapshot={lessons:[{id:id(99),activities:a}],progress:[{lesson_id:id(99),answers:{a0:old,a1:old,'a1.qq1':specific}}]};
    const result=migrateLessonProgress(snapshot);
    assert.deepEqual(result.progress[0].answers['b'+id(3)+'.qq1'],specific);
    assert.deepEqual(result.progress[0].answers['legacy:a1'],old);
    assert.equal(result.lessons[0].activities[2].legacyProgressIndex,1);
    assert.equal(result.lessons[0].activities[1].legacyProgressIndex,undefined);
    assert.equal(snapshot.lessons[0].activities[0].legacyProgressIndex,undefined);
});
test('progress serialization preserves teacher reviews while saving another activity',()=>{
    const e=engine([]),review=e.ctx.publicProgress({a:{response:'x',correct:null,teacher_feedback:'Good',teacher_correction:'corrected',teacher_score:'8'}}).a;
    assert.equal(review.teacher_feedback,'Good');assert.equal(review.teacher_correction,'corrected');assert.equal(review.teacher_score,'8');
});

test('category tasks expose the choices without exposing the correct category for each word',()=>{
    const e=engine([]),safe=e.ctx.safeActivity({type:'columns',content:'Fruit: apple\nVegetable: carrot',prompt:'Sort',answer:''});
    assert.equal(safe.items.length,2);assert.equal('category' in safe.items[0],false);assert.equal(safe.categories.length,2);
});

test('imported lessons load and grade through the real engine without leaking private notes or gap answers',async()=>{
    require('./table.js'); require('./fill-blanks.js');
    const {parse}=require('./lesson-import.js');
    const result=parse('#TeacherNote: Secret\nNever send this to a student.\n#GapFill: Gaps\n+Description\n++Helper\nJa [bývam/žijem] tu.\n#DropDown: Choose\nOna [má/majú] knihu.\n#MultipleChoice: Fruit\n?Choose fruit\n*apple\n*pear\ncarrot\n#TrueFalse: Evaluate | Right / Wrong / Depends\nA. / Depends\n#Unscramble: Sentence\nI go to school.\n#Table: Table\nA / B\nx / [y/z]');
    assert.deepEqual(result.errors,[]);
    const activities=result.activities,e=engine(activities),loaded=await e.request({action:'load'});
    assert.equal(loaded.status,200);
    const publicActivities=loaded.body.lesson.sections[0].activities;
    assert.equal(publicActivities.length,6);
    assert.doesNotMatch(JSON.stringify(loaded.body),/Never send|bývam|žijem/);
    assert.equal(publicActivities[0].settings.description,'Description');
    assert.equal(publicActivities[0].settings.helperText,'Helper');
    assert.equal(publicActivities[1].questions[0].options[0].text,'Ona ___ knihu.');
    assert.deepEqual(publicActivities[3].questions[0].choiceLabels,['Right','Wrong','Depends']);
    assert.equal((await e.write(1,['žijem'])).body.correct,true);
    assert.equal((await e.write(2,['má'],'submit',{questionId:activities[2].questions[0].id})).body.correct,true);
    assert.equal((await e.write(3,['apple','pear'])).body.correct,true);
    assert.equal((await e.write(3,['apple','carrot'])).body.correct,false);
    assert.equal((await e.write(4,'not-stated','submit',{questionId:activities[4].questions[0].id})).body.correct,true);
    assert.equal((await e.write(5,['I','go','to','school.'],'submit',{questionId:activities[5].questions[0].id})).body.correct,true);
    assert.equal((await e.write(6,['z'])).body.correct,true);
});

test('a late legacy write during rollout is merged by timestamp without affecting newly supported types',()=>{
    const e=engine([]),activities=[{id:id(1),legacyProgressIndex:0,type:'true-false',content:'',answer:'true',prompt:''},{id:id(2),type:'find-error',content:'',answer:'',prompt:''}];
    const result=e.ctx.canonicalProgress(activities,{['b'+id(1)]:{response:'old',correct:false,submitted_at:'2026-10-23T10:00:00Z'},a0:{response:'new',correct:true,submitted_at:'2026-10-23T10:01:00Z'}});
    assert.equal(result['b'+id(1)].response,'new');assert.equal(result.a0,undefined);assert.equal(result['b'+id(2)],undefined);
});
