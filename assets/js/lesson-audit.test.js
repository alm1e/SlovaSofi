const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),test=require('node:test');
const blanks=require('./fill-blanks.js');
const source=fs.readFileSync(`${__dirname}/student.js`,'utf8');
function fn(name){const start=source.indexOf(`    function ${name}(`),end=source.indexOf('\n    }',start);return source.slice(start,end+6);}
test('single-letter bracket answers remain usable alongside formatting and image URLs',()=>{
    assert.deepEqual(blanks.parse('idem [s] kamarátom a [u] nich').answers,['s','u']);
    const parsed=blanks.parse('[s]text[/s] ![image](https://example.com/a___b.png) [som]');
    assert.deepEqual(parsed.answers,['som']);assert.ok(parsed.parts[0].includes('a___b.png'));assert.ok(parsed.content.includes('a%5F%5F%5Fb.png'));
    assert.ok(parsed.content.includes('[s]text[/s]'));
});
test('sentence responses include locked tokens in DOM order',()=>{
    const ctx=vm.createContext({});vm.runInContext(fn('responseForActivity'),ctx);
    let selector;
    const result=ctx.responseForActivity({querySelector:()=>({dataset:{answerKind:'words'}}),querySelectorAll:value=>{selector=value;return [{dataset:{lockedWord:'Ja'}},{dataset:{removeWord:'bývam'}},{dataset:{lockedWord:'v'}},{dataset:{removeWord:'Bratislave'}}];}});
    assert.equal(Array.from(result).join(' '),'Ja bývam v Bratislave');assert.ok(selector.includes('data-locked-word'));
    assert.ok(source.includes('data-locked-word="${escapeHtml(word)}"'));
});
test('find-error draft restores the first word and correction without treating empty selection as zero',()=>{
    const ctx=vm.createContext({});vm.runInContext(fn('restoreFindErrorDraft'),ctx);
    assert.equal(ctx.restoreFindErrorDraft('{"index":"0","correction":"Ja"}').index,'0');
    assert.equal(ctx.restoreFindErrorDraft('{"index":1,"correction":"bývam"}').correction,'bývam');
    for(const response of ['invalid',null,'{"index":""}','{"index":-1}'])assert.equal(ctx.restoreFindErrorDraft(response).index,'');
});

test('student write identity uses the displayed block ID and revision rather than its array position',()=>{
    const ctx=vm.createContext({activitiesFor:lesson=>lesson.sections.flatMap(section=>section.activities),text:()=> 'reload'});
    vm.runInContext(fn('lessonWriteIdentity'),ctx);
    const lesson={id:'lesson',revision:'v2',sections:[{activities:[{id:'first',index:0},{id:'third',index:2}]}]};
    const result=ctx.lessonWriteIdentity(lesson,2,'lesson');assert.equal(result.activityId,'third');assert.equal(result.lessonRevision,'v2');
    assert.throws(()=>ctx.lessonWriteIdentity(lesson,1,'lesson'),/reload/);
    assert.throws(()=>ctx.lessonWriteIdentity(lesson,0,'other'),/reload/);
});

test('error-finding student items retain draft controls without offering a whole-text submit button',()=>{
    const ctx=vm.createContext({language:'en',escapeHtml:value=>String(value??''),text:key=>key,questionItemLabel:index=>`Question ${index+1}`,window:{SlovaActivityUI:{renderMetadata:()=>''}}});
    ctx.window.SlovaExerciseFormat=require('./exercise-format.js');
    vm.runInContext(fs.readFileSync(`${__dirname}/find-error-ui.js`,'utf8'),ctx);
    vm.runInContext(fn('renderActivityItem'),ctx);
    for(const questionIndex of [null,0]){
        const html=ctx.renderActivityItem({type:'find-error',prompt:'Read',content:'Ja bad tu.',errorCount:1,gradable:true},2,questionIndex);
        assert.match(html,/data-find-errors/);assert.match(html,/data-answer-kind="find-error-v2"/);
        assert.doesNotMatch(html,/data-submit-answer/);
    }
});

test('independent word checks share the draft queue and capture the displayed lesson identity before navigation',async()=>{
    const calls=[],updates=[],resolvers=[];
    const lesson={id:'lesson',revision:'v2',sections:[{activities:[{id:'block',index:2}]}]};
    const ctx=vm.createContext({
        openedLesson:lesson,draftSaveQueue:Promise.reject(new Error('Previous draft failed')),
        activitiesFor:lesson=>lesson.sections.flatMap(section=>section.activities),text:key=>key,
        invokeLessonApi:payload=>{calls.push(payload);return new Promise(resolve=>resolvers.push(resolve));},
        updateLessonProgress:(...args)=>updates.push(args)
    });
    vm.runInContext(fn('lessonWriteIdentity')+fn('saveFindErrorEvent'),ctx);
    const root={closest:()=>({dataset:{activityIndex:'2',questionId:'q2'}})};
    const first=ctx.saveFindErrorEvent(root,{id:'one',kind:'select',index:1});
    const second=ctx.saveFindErrorEvent(root,{id:'two',kind:'correction',index:1,value:'good'});
    ctx.openedLesson={id:'other',revision:'v3'};
    await new Promise(resolve=>setImmediate(resolve));assert.equal(calls.length,1);
    resolvers[0]({answers:{first:true},completed:false});await first;
    await new Promise(resolve=>setImmediate(resolve));assert.equal(calls.length,2);
    assert.equal(calls[1].lessonId,'lesson');assert.equal(calls[1].activityId,'block');assert.equal(calls[1].lessonRevision,'v2');assert.equal(calls[1].questionId,'q2');
    resolvers[1]({answers:{first:true,second:true},completed:true});await second;
    assert.equal(updates.length,2);assert.equal(updates[1][0],'lesson');assert.equal(updates[1][2],true);
});
