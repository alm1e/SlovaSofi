const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),test=require('node:test');
const {stripTypeScriptTypes}=require('node:module');
const blanks=require('./fill-blanks.js');
test('picture gaps keep Markdown images and external gap order, and build an optional bank',()=>{
    const content='![Image](https://example.com/us.png) [Amerika / USA]\n![Image](https://example.com/de.png) []\n___';
    const parsed=blanks.parse(content,'Nemecko / Kanada');
    assert.deepEqual(parsed.answers,['Amerika','Nemecko','Kanada']);
    const view=blanks.presentation(content,'Nemecko / Kanada',{wordBank:['Amerika','Čína']});
    assert.equal(view.gapLayout,'cards');assert.deepEqual(view.wordBank,['Amerika','Nemecko','Kanada','Čína']);
    assert.deepEqual(blanks.presentation(content,'Nemecko/Kanada',{useWordBank:false}).wordBank,[]);
    assert.equal(blanks.presentation(content,'',{gapLayout:'text'}).gapLayout,'text');
    assert.deepEqual(blanks.presentation('[a] [a]','',{useWordBank:true}).wordBank,['a','a']);
    assert.deepEqual(blanks.check(content,'Nemecko/Kanada',{},['USA','Nemecko','Kanada']),[true,true,true]);
    const inserted=blanks.insert('[] word','first',{},3,7);assert.equal(inserted.answer,'first / word');
});
for(const file of ['../../supabase/functions/student-lessons/index.ts','../../artifacts/student-lessons-gap-cards.ts']) {
    test(`picture bank is public but does not reveal answer-to-image mapping: ${file}`,()=>{
        const ctx=vm.createContext({SlovaExerciseFormat:require("./exercise-format.js"),URL,crypto:require('node:crypto').webcrypto,Deno:{serve(){}},SlovaTable:require('./table.js'),SlovaFillBlanks:blanks});
        const code=fs.readFileSync(`${__dirname}/${file}`,'utf8').replace(/^import .*;\r?\n/gm,'');vm.runInContext(stripTypeScriptTypes(code),ctx);
        const activity={type:'fill-blank',prompt:'Flags',content:'![Image](https://example.com/us.png) [Amerika]\n![Image](https://example.com/de.png) []',answer:'Nemecko',settings:{wordBank:['Čína']}};
        const safe=ctx.safeActivity(activity);
        assert.equal(safe.gapLayout,'cards');assert.equal(safe.blankCount,2);
        assert.doesNotMatch(safe.content,/Amerika|Nemecko/);
        assert.equal(Array.from(safe.wordBank).sort().join('/'),['Amerika','Nemecko','Čína'].sort().join('/'));
        assert.equal('answers' in safe,false);assert.equal('acceptedAnswers' in safe,false);
        assert.equal(ctx.isCorrect(activity,['Amerika','Nemecko']),true);
        assert.equal(ctx.isCorrect(activity,['Nemecko','Amerika']),false);
        const hidden=ctx.safeActivity({...activity,settings:{useWordBank:false}});assert.equal(hidden.wordBank.length,0);
    });
}
