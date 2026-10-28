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
    const ctx=vm.createContext({SlovaExerciseFormat:require("./exercise-format.js"),URL,Request,Response,crypto:require('node:crypto').webcrypto,createClient:()=>client,console,SlovaTable:require('./table.js'),SlovaFillBlanks:require('./fill-blanks.js'),Deno:{env:{get:key=>({APP_URL:'https://school.example',SUPABASE_URL:'https://db.example',SUPABASE_ANON_KEY:'test',SUPABASE_SERVICE_ROLE_KEY:'test'})[key]},serve:fn=>{handler=fn;}}});
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

test('simple authoring grades source sequences, bracket dropdowns, tables and translated cards without separate answers',async()=>{
    const activities=[
        {id:id(1),type:'drag-words',prompt:'Build',content:'Ja každý_deň čítam knihu.',answer:''},
        {id:id(2),type:'sentence-order',prompt:'Order',content:'Ráno vstávam.\nPotom raňajkujem.\nIdem do školy.',answer:''},
        {id:id(3),type:'one-of-many',prompt:'Choose',content:'Ja [bývam/bývaš] v [Bratislave/Košiciach].',answer:''},
        {id:id(4),type:'table',prompt:'Table',content:'Meno / Mesto\nAnna / [Bratislava/Košice]',answer:''},
        {id:id(5),type:'flashcards',prompt:'Cards',content:'auto [машина]\ndom [дом]',answer:''}
    ];
    const e=engine(activities),loaded=await e.request({action:'load'}),publicItems=loaded.body.lesson.sections[0].activities;
    assert.equal(loaded.status,200);assert.equal(publicItems[0].gradable,true);
    assert.notDeepEqual(publicItems[0].tokens,['Ja','každý deň','čítam','knihu.']);
    assert.notDeepEqual(publicItems[1].items.map(item=>item.text),activities[1].content.split('\n'));
    assert.equal(publicItems[2].options[0].text,'Ja ___ v ___.');
    assert.equal(publicItems[2].choicesByBlank.length,2);assert.equal('answers' in publicItems[2],false);
    assert.equal((await e.write(0,['Ja','každý deň','čítam','knihu.'])).body.correct,true);
    assert.equal((await e.write(0,['knihu.','Ja','každý deň','čítam'])).body.correct,false);
    assert.equal((await e.write(1,activities[1].content.split('\n'))).body.correct,true);
    assert.equal((await e.write(2,['bývam','Bratislave'])).body.correct,true);
    assert.equal((await e.write(2,['bývaš','Bratislave'])).body.correct,false);
    assert.equal((await e.write(3,['Košice'])).body.correct,true);
    assert.equal(publicItems[4].cards.length,2);assert.ok(publicItems[4].cards.some(card=>card.front==='auto'&&card.back==='машина'));
    assert.equal((await e.write(4,['know','repeat'],'save-draft')).status,200);
});

test('all bracket solutions grade on the server and stay out of student statements and prompts',async()=>{
    const activities=[
        {id:id(1),type:'multiple-choice',prompt:'Choose',content:'[apple]\n[pear]\ncarrot',answer:''},
        {id:id(2),type:'true-false',prompt:'Evaluate',content:'A statement [false]',answer:''},
        {id:id(3),type:'match',prompt:'Match',content:'auto [car]\ndom [house]',answer:''},
        {id:id(4),type:'columns',prompt:'Sort',content:'apple [Fruit]\ncarrot [Vegetable]',answer:''},
        {id:id(5),type:'find-error',prompt:'Correct',content:'Ja [bývať/bývam] tu.',answer:''},
        {id:id(6),type:'open-answer',prompt:'Write',content:'Where? [Private sample answer]',answer:''},
        {id:id(7),type:'multiple-choice',prompt:'Grouped',content:'',answer:'',questions:[{id:'q1',prompt:'Fruit',content:'[apple]\n[pear]\ncarrot',answer:''},{id:'q2',prompt:'City',content:'[Bratislava]\nLondon',answer:''}]}
    ];
    const e=engine(activities),loaded=await e.request({action:'load'}),items=loaded.body.lesson.sections[0].activities;
    assert.equal(loaded.status,200);assert.equal(items[0].multipleAnswers,true);assert.equal(items[1].content,'A statement');
    assert.equal(items[4].content,'Ja bývať tu.');assert.equal(items[5].content,'Where?');
    assert.doesNotMatch(JSON.stringify(loaded.body),/Private sample answer|\[false\]|bývam/);
    assert.equal((await e.write(0,['apple','pear'])).body.correct,true);
    assert.equal((await e.write(0,['apple','carrot'])).body.correct,false);
    assert.equal((await e.write(1,'false')).body.correct,true);
    assert.equal((await e.write(2,['car','house'])).body.correct,true);
    assert.equal((await e.write(3,['Fruit','Vegetable'])).body.correct,true);
    assert.equal((await e.write(4,JSON.stringify({index:1,correction:'bývam'}))).body.correct,true);
    assert.equal(items[6].questions[0].multipleAnswers,true);
    assert.equal((await e.write(6,['apple','pear'],'submit',{questionId:'q1'})).body.correct,true);
    assert.equal((await e.write(6,'Bratislava','submit',{questionId:'q2'})).body.correct,true);
});

test('table headers and independent cell feedback survive submit and reload without exposing expected answers',async()=>{
    const activity={id:id(1),type:'table',prompt:'Fill',content:'Anna / [Bratislava]\nPeter / [Košice]',answer:'',settings:{tableHeaders:['Name','City']}};
    const e=engine([activity]),loaded=await e.request({action:'load'}),table=loaded.body.lesson.sections[0].activities[0];
    assert.deepEqual(table.headers,['Name','City']);assert.equal(table.headerRow,false);assert.doesNotMatch(JSON.stringify(table),/Bratislava|Košice/);
    const partial=await e.write(0,['Bratislava','wrong']);assert.equal(partial.status,200);assert.equal(partial.body.correct,false);assert.deepEqual(partial.body.blankResults,[true,false]);
    const reloaded=await e.request({action:'load'});assert.deepEqual(reloaded.body.lesson.progress['b'+id(1)].blankResults,[true,false]);
    const complete=await e.write(0,['Bratislava','Košice']);assert.equal(complete.body.correct,true);assert.deepEqual(complete.body.blankResults,[true,true]);assert.equal(complete.body.completed,true);
});

test('category lists reach students as individual cards and grade every placement after reloading',async()=>{
    const activity={id:id(1),type:'columns',prompt:'Sort',content:'Ovocie: [jablko/hruška/banán]\nZelenina: [mrkva/uhorka]',answer:''};
    const e=engine([activity]),loaded=await e.request({action:'load'}),safe=loaded.body.lesson.sections[0].activities[0];
    assert.equal(safe.items.length,5);assert.deepEqual(safe.items.map(item=>item.text),['jablko','hruška','banán','mrkva','uhorka']);assert.deepEqual(safe.categories,['Ovocie','Zelenina']);
    assert.equal(safe.items.some(item=>'category' in item),false);assert.equal(safe.gradable,true);
    const wrong=await e.write(0,['Ovocie','Zelenina','Ovocie','Zelenina','Zelenina']);assert.equal(wrong.body.correct,false);
    const answers=['Ovocie','Ovocie','Ovocie','Zelenina','Zelenina'];assert.equal((await e.write(0,answers)).body.correct,true);
    const reloaded=await e.request({action:'load'});assert.deepEqual(reloaded.body.lesson.progress['b'+id(1)].response,answers);
});

test('error-finding events grade each word, record misclicks and retries, and reload complete independent results',async()=>{
    const activity={id:id(1),type:'find-error',prompt:'Read',content:'Ja [bad/CORRECTONE] tu.\nTy [bad/CORRECTTWO] tu.',answer:''},e=engine([activity]);
    const send=(kind,index,value,eventId=`${kind}-${index}-${value||''}`)=>e.write(0,undefined,'find-error-event',{errorEvent:{id:eventId,kind,index,...(value?{value}:{})}});
    const loaded=await e.request({action:'load'});assert.equal(loaded.body.lesson.sections[0].activities[0].errorCount,2);assert.doesNotMatch(JSON.stringify(loaded.body),/CORRECTONE|CORRECTTWO/);
    const misclick=await send('select',0);assert.equal(misclick.status,200);assert.equal(misclick.body.errorState.selected[0],false);
    const found=await send('select',1);assert.equal(found.body.errorState.selected[1],true);assert.doesNotMatch(JSON.stringify(found.body),/CORRECTONE|CORRECTTWO/);
    const first=await send('correction',1,'CORRECTONE');assert.equal(first.body.errorState.fixes[1].correct,true);assert.equal(first.body.correct,false);
    const before=e.writes;assert.equal((await send('correction',4,'CORRECTTWO')).status,400);assert.equal(e.writes,before);
    await send('select',4);const wrong=await send('correction',4,'wrong','retry-id');assert.equal(wrong.body.errorState.fixes[1].correct,true);assert.equal(wrong.body.errorState.fixes[4].correct,false);
    const retried=await send('correction',4,'wrong','retry-id');assert.equal(retried.body.errorState.fixes[4].wrongAttempts,1);
    const done=await send('correction',4,'CORRECTTWO');assert.equal(done.body.correct,true);assert.equal(done.body.completed,true);assert.equal(done.body.errorState.selected[0],false);assert.equal(done.body.errorState.fixes[4].attempts,2);
    const reloaded=await e.request({action:'load'}),state=JSON.parse(reloaded.body.lesson.progress['b'+id(1)].response);assert.equal(state.fixes[1].correct,true);assert.equal(state.fixes[4].correct,true);assert.equal(state.selected[0],false);assert.equal(state.fixes[4].wrongAttempts,1);
});

test('error drafts cannot forge selections or checks and event writes enforce activity identity and revision',async()=>{
    const activity={id:id(1),type:'find-error',prompt:'Read',content:'Ja [bad/good] tu.',answer:''},e=engine([activity]);
    const select={id:'select',kind:'select',index:1};await e.write(0,undefined,'find-error-event',{errorEvent:select});
    const draft=await e.write(0,JSON.stringify({version:2,selected:{0:true,1:true},complete:true,fixes:{1:{text:'good',checkedText:'good',correct:true}},drafts:{1:'good'}}),'save-draft');
    assert.equal(draft.status,200);assert.equal(draft.body.errorState.complete,false);assert.equal(draft.body.errorState.fixes[1].text,'good');assert.equal(draft.body.errorState.fixes[1].correct,null);assert.equal(draft.body.errorState.selected[0],undefined);
    const before=e.writes;assert.equal((await e.write(0,JSON.stringify({version:2,complete:true}))).status,400);
    assert.equal((await e.write(0,undefined,'find-error-event',{lessonRevision:'old',errorEvent:select})).status,409);assert.equal(e.writes,before);
    const other=engine([{id:id(1),type:'open-answer',content:'Write',prompt:'Write',answer:''}]);assert.equal((await other.write(0,undefined,'find-error-event',{errorEvent:select})).status,400);
});

test('legacy single-word answers migrate as partial work when a text contains multiple errors',async()=>{
    const activity={id:id(1),type:'find-error',prompt:'Read',content:'Ja [bad/good] tu.\nTy [bad/better] tu.',answer:''},e=engine([activity]);
    const legacy=await e.write(0,JSON.stringify({index:1,correction:'good'}));assert.equal(legacy.body.correct,false);
    e.saved.answers['b'+id(1)]={...e.saved.answers['b'+id(1)],response:JSON.stringify({index:1,correction:'good'}),correct:true};e.saved.completed_at='2026-10-23T12:00:00Z';
    const loaded=await e.request({action:'load'}),entry=loaded.body.lesson.progress['b'+id(1)],state=JSON.parse(entry.response);assert.equal(entry.correct,false);assert.equal(state.fixes[1].correct,true);assert.equal(state.selected[4],undefined);assert.equal(loaded.body.lesson.completed,false);
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
