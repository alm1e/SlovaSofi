const assert=require('node:assert/strict'),test=require('node:test');
globalThis.SlovaFillBlanks=require('./fill-blanks.js');globalThis.SlovaTable=require('./table.js');
const ready=require('./lesson-readiness.js');
test('readiness detects incomplete content without blocking valid embedded or grouped answers',()=>{
    assert.equal(ready.incomplete({type:'find-error',content:'Ja bývať'}),true);
    assert.equal(ready.incomplete({type:'find-error',content:'Ja bývať',settings:{errors:[{index:1,correction:'bývam'}]}}),false);
    assert.equal(ready.incomplete({type:'fill-blank',content:'Ja [som]'}),false);
    assert.equal(ready.incomplete({type:'fill-blank',content:'Ja []'}),true);
    assert.equal(ready.incomplete({type:'table',content:'City / [Bratislava]'}),false);
    assert.equal(ready.incomplete({type:'drag-words',content:'',answer:'Ja / som'}),false);
    assert.equal(ready.incomplete({type:'flashcards',content:'',cards:[{front:'a',back:'b'}]}),false);
    assert.equal(ready.incomplete({type:'listening-questions',content:'https://example.com/a.mp3',questions:[{content:'a\nb',answer:'a'}]}),false);
    assert.equal(ready.incomplete({type:'columns',content:''}),true);
    for(const language of ['ua','ru','en','sk','kk'])assert.ok(ready.message(language)&&ready.blocked(language));
});
