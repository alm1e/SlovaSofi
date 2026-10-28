const test=require('node:test'),assert=require('node:assert/strict');
const format=require('./exercise-format.js'),errors=format.findErrors;
const activity={type:'find-error',content:'Ja [bývať/bývam] v Bratislave.\nOna [ma/má] knihu.'};
const event=(kind,index,value,id=`${kind}-${index}-${value||''}`)=>({id,kind,index,...(value===undefined?{}:{value})});

test('word selection records true and false targets independently, including index zero',()=>{
    let state=errors.event(activity,null,event('select',0));
    assert.equal(state.selected[0],false);assert.equal(errors.stats(state).mistakes,1);
    state=errors.event(activity,state,event('select',1));state=errors.event(activity,state,event('select',5));
    assert.equal(state.selected[1],true);assert.equal(state.selected[5],true);assert.equal(state.total,2);assert.equal(state.complete,false);
    assert.deepEqual(Object.keys(state.fixes),['1','5']);assert.equal(state.fixes[1].correct,null);
    assert.deepEqual(errors.event(activity,state,event('select',0)),state);
});

test('Enter-equivalent checks affect one word, retain correct neighbours and preserve mistake counts after success',()=>{
    let state=errors.event(activity,null,event('select',0));state=errors.event(activity,state,event('select',1));state=errors.event(activity,state,event('select',5));
    state=errors.event(activity,state,event('correction',1,'bývam'));assert.equal(state.fixes[1].correct,true);assert.equal(state.fixes[5].correct,null);assert.equal(state.complete,false);
    state=errors.event(activity,state,event('correction',5,'wrong'));assert.equal(state.fixes[1].correct,true);assert.equal(state.fixes[5].correct,false);assert.equal(errors.stats(state).mistakes,2);
    state=errors.event(activity,state,event('correction',5,'má'));assert.equal(state.complete,true);assert.equal(state.fixes[5].attempts,2);assert.equal(state.fixes[5].wrongAttempts,1);assert.equal(state.selected[0],false);assert.equal(errors.stats(state).mistakes,2);
    const reloaded=errors.state(activity,JSON.stringify(state));assert.deepEqual(reloaded,state);
});

test('repeated misspellings in separate sentences have separate positions and corrections',()=>{
    const a={type:'find-error',content:'Ja [bývať/bývam].\nTy [bývať/bývaš].'};
    assert.deepEqual([...errors.spec(a).expected.keys()],[1,3]);
    let state=errors.event(a,null,event('select',1));state=errors.event(a,state,event('select',3));state=errors.event(a,state,event('correction',1,'bývam'));
    assert.equal(state.fixes[3].correct,null);assert.equal(state.complete,false);
    state=errors.event(a,state,event('correction',3,'bývaš'));assert.equal(state.complete,true);
});

test('drafts persist typed text but cannot invent selections, verification or attempts',()=>{
    let state=errors.event(activity,null,event('select',1));
    state=errors.draft(activity,state,{version:2,selected:{1:true,5:true},fixes:{1:{correct:true,attempts:99}},complete:true,drafts:{1:'bývam',5:'má'}});
    assert.equal(state.fixes[1].text,'bývam');assert.equal(state.fixes[1].correct,null);assert.equal(state.fixes[1].attempts,0);assert.equal(state.selected[5],undefined);assert.equal(state.complete,false);
    state=errors.event(activity,state,event('correction',1,'bývam'));
    state=errors.draft(activity,state,{drafts:{1:'different'}});assert.equal(state.fixes[1].correct,null);assert.equal(state.fixes[1].checkedCorrect,true);
    state=errors.draft(activity,state,{drafts:{1:' bývam '}});assert.equal(state.fixes[1].correct,true);assert.equal(state.fixes[1].attempts,1);
});

test('duplicate event IDs are idempotent and invalid corrections cannot target unchecked or correct words',()=>{
    let state=errors.event(activity,null,event('select',1));const attempt=event('correction',1,'wrong','same-request');state=errors.event(activity,state,attempt);
    assert.deepEqual(errors.event(activity,state,attempt),state);assert.equal(state.fixes[1].wrongAttempts,1);
    for(const index of [-1,10000,'',null])assert.throws(()=>errors.event(activity,state,event('select',index)));
    assert.throws(()=>errors.event(activity,state,event('correction',5,'má')));
    const wrongClick=errors.event(activity,state,event('select',0));assert.throws(()=>errors.event(activity,wrongClick,event('correction',0,'anything')));
});

test('legacy progress migrates as a partial result and draft text is not treated as checked',()=>{
    const checked=errors.state(activity,JSON.stringify({index:1,correction:'bývam'}),{correct:true});assert.equal(checked.fixes[1].correct,true);assert.equal(checked.complete,false);assert.equal(checked.selected[5],undefined);
    const draft=errors.state(activity,{index:'1',correction:'bývam'},{correct:null,draft:true});assert.equal(draft.fixes[1].correct,null);assert.equal(draft.fixes[1].attempts,0);
    assert.equal(errors.state(activity,{index:'0',correction:''},{draft:true}).selected[0],false);
});

test('normalization supports diacritics and case rules without exposing expected answers in state',()=>{
    const a={type:'find-error',content:'Ona [ma/má].'};let state=errors.event(a,null,event('select',1));
    assert.doesNotMatch(JSON.stringify(state),/má/);
    state=errors.event(a,state,event('correction',1,'MA\u0301'));assert.equal(state.complete,true);
    const sensitive={...a,settings:{caseSensitive:true}};let checked=errors.event(sensitive,null,event('select',1));checked=errors.event(sensitive,checked,event('correction',1,'MÁ'));assert.equal(checked.complete,false);
});

test('history is bounded while per-word mistake totals survive every retry and reload',()=>{
    let state=errors.event(activity,null,event('select',1));
    for(let i=0;i<130;i++)state=errors.event(activity,state,event('correction',1,'wrong',`attempt-${i}`));
    assert.equal(state.events.length,100);assert.equal(state.fixes[1].wrongAttempts,130);assert.equal(errors.stats(errors.state(activity,JSON.stringify(state))).mistakes,130);
    assert.equal(errors.spec({type:'find-error',content:'Words',settings:{errors:[null,{}, {index:99,correction:'x'}]}}).expected.size,0);
});
