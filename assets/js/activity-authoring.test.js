const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
require('./fill-blanks.js');require('./table.js');
const format=require('./exercise-format.js'),help=require('./activity-authoring.js'),ready=require('./lesson-readiness.js');
const source=fs.readFileSync(`${__dirname}/teacher.js`,'utf8'),types=[...source.slice(source.indexOf('const activityTypes ='),source.indexOf('const MAX_ACTIVITY_QUESTIONS')).matchAll(/id: "([^"]+)"/g)].map(match=>match[1]);

test('every supported creation type has native instructions, a practical example and student behavior in all five languages',()=>{
    assert.equal(types.length,21);
    for(const lang of ['ru','ua','en','sk','kk'])for(const type of [...types,'note']){
        const guide=help.get(type,lang);assert.ok(guide,`${type}/${lang}`);assert.equal(guide.steps.length,3);
        assert.ok(guide.steps.every(step=>step.length>15));assert.ok(guide.example&&guide.student&&guide.hint);
        if(lang!=='en')assert.notEqual(guide.hint,help.get(type,'en').hint);
        assert.doesNotMatch(guide.hint,/Отдельное поле|Окреме поле|answer field is only|JSON below|JSON нижче/);
        const html=help.render(type,lang);assert.match(html,/data-authoring-help/);assert.match(html,/<ol>/);
        assert.doesNotMatch(html,/<Toto je auto/);assert.doesNotMatch(guide.example,/https:\/\/example\./);
    }
});
test('insertable examples create ready activities using the real authoring parsers',()=>{
    for(const lang of ['ru','ua','en','sk','kk'])for(const type of types){
        const guide=help.get(type,lang);if(!guide.insertable)continue;
        const activity={type,prompt:'Keep my instruction',content:type==='listening-questions'?'https://test.invalid/audio.mp3':'',answer:'',settings:{helperText:'Keep my note'}};
        assert.equal(help.applyExample(activity,lang),true,`${type}/${lang}`);assert.equal(ready.incomplete(activity),false,`${type}/${lang}`);
        assert.equal(activity.prompt,'Keep my instruction');assert.equal(activity.settings.helperText,'Keep my note');
        if(type==='listening-questions'){assert.equal(activity.content,'https://test.invalid/audio.mp3');assert.equal(activity.questions.length,1);assert.ok(format.prepare({...activity.questions[0],type:'multiple-choice'}).answer);}
        if(type==='table')assert.equal(activity.settings.tableHeaders.join('/'),'Meno/Mesto/Jazyk');
    }
});
test('examples cannot replace authored, grouped, legacy or configured content',()=>{
    const fixtures=[{type:'fill-blank',content:'Existing text'},{type:'fill-blank',answer:'Legacy answer'},{type:'multiple-choice',settings:{options:[{text:'Saved',correct:true}]}},{type:'flashcards',cards:[{front:'a',back:'b'}]},{type:'listening-questions',content:'https://test.invalid/audio.mp3',questions:[{id:'q1',content:'Existing options'}]},{type:'true-false',questions:[{id:'q1',prompt:'Legacy statement',content:' ',answer:'true'}]}];
    for(const activity of fixtures){const before=JSON.stringify(activity);assert.equal(help.applyExample(activity,'ru'),false);assert.equal(JSON.stringify(activity),before);}
    assert.equal(help.applyExample({type:'image',content:''},'ru'),false);
});
test('examples preserve grouped item identities and private note visibility',()=>{
    const activity={type:'fill-blank',questions:[{id:'existing',prompt:'My question',content:'',answer:''}]};
    assert.equal(help.applyExample(activity,'en'),true);assert.equal(activity.questions[0].id,'existing');assert.equal(activity.questions[0].prompt,'My question');assert.match(activity.questions[0].content,/\[bývam\/žijem\]/);
    const note={type:'text',settings:{note:true,studentVisible:false,noteColor:'#123456'}};assert.equal(help.applyExample(note,'ru'),true);assert.equal(note.settings.studentVisible,false);assert.equal(note.settings.noteColor,'#123456');assert.match(help.render(note,'ru'),/data-authoring-help="note"/);
});
