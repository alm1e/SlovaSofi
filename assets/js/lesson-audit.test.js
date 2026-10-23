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
