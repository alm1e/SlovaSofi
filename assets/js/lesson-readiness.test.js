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
    assert.equal(ready.incomplete({type:'text',prompt:'Prečítaj príbeh',content:''}),false);
    assert.equal(ready.incomplete({type:'text',prompt:' ',content:' '}),true);
    for(const language of ['ua','ru','en','sk','kk'])assert.ok(ready.message(language)&&ready.blocked(language));
});

test('readiness explains missing media and markers instead of a generic error',()=>{
 const api=require('./lesson-readiness.js');
 assert.ok(api.issues({type:'audio',content:''},'ru').some(text=>text.includes('ссылку')));
 assert.ok(api.issues({type:'interactive-image',content:'https://example.com/photo.jpg'},'ru').some(text=>text.includes('метки')));
 assert.ok(api.issues({type:'video',content:'javascript:alert(1)'},'en').some(text=>text.includes('http')));
});
