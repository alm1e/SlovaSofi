const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const {stripTypeScriptTypes} = require('node:module');
const test = require('node:test');
const table = require('./table.js');
const blanks = require('./fill-blanks.js');
test('slash columns and mixed gap formats preserve the order of external answers', () => {
    const parsed=table.parse('Meno / Mesto / Jazyk\nAnna / [Bratislava] / []\nPeter / ___ / [slovenčina / slovenský jazyk]','angličtina / Košice');
    assert.equal(parsed.rows.length,3);
    assert.equal(parsed.rows[2].length,3);
    assert.deepEqual(parsed.answers,['Bratislava','angličtina','Košice','slovenčina']);
    assert.equal(table.check('Meno / [Bratislava] / []','slovenčina',{},['bratislava','slovenčina']),true);
    assert.equal(table.check('[slovenčina / slovenský jazyk]','',{},['slovenský jazyk']),true);
    assert.equal(table.check('[] / ___','a / b',{},['a','b','extra']),false);
    assert.equal(table.check('[]','',{},['']),false);
});
test('legacy pipes, tabs, trailing cells and answer configuration remain supported', () => {
    assert.deepEqual(table.parse('a|b|\n___|[]|[c]','a/b').rows[0],['a','b','']);
    assert.deepEqual(table.parse('a\tb\n___\t___','a/b').answers,['a','b']);
    assert.equal(table.parse('a / b\nc').rows[1].length,2);
    assert.equal(table.check('___|___','a/b',{acceptedAnswers:{0:['A1'],1:['B1']}},['A1','B1']),true);
    assert.equal(table.check('a|b','x',{hiddenCells:[1]},['x']),true);
    assert.deepEqual(table.parse('a\\/b / [x / y]').rows[0],['a/b','{{blank:0}}']);
});
for(const relative of ['../../supabase/functions/student-lessons/index.ts','../../artifacts/student-lessons-table.ts']) {
    test(`table API keeps embedded answers private and grades all formats: ${relative}`, () => {
        const source=fs.readFileSync(`${__dirname}/${relative}`,'utf8').replace(/^import .*;\r?\n/gm,'');
        const ctx=vm.createContext({URL,Deno:{serve(){}},SlovaTable:table,SlovaFillBlanks:blanks});
        vm.runInContext(stripTypeScriptTypes(source),ctx);
        const activity={type:'table',prompt:'Fill',content:'Name / City\nAnna / [Bratislava]\nPeter / []',answer:'Košice'};
        const safe=ctx.safeActivity(activity);
        assert.equal(safe.blankCount,2);
        assert.equal(safe.gradable,true);
        assert.doesNotMatch(JSON.stringify(safe),/Bratislava|Košice/);
        assert.equal(ctx.isCorrect(activity,['bratislava','Košice']),true);
        assert.equal(ctx.isCorrect(activity,['Košice','Bratislava']),false);
        const embedded={...activity,content:'[Bratislava]',answer:''};
        assert.equal(ctx.isGradable(embedded),true);
        assert.equal(ctx.isCorrect(embedded,['Bratislava']),true);
        const payload=ctx.sectionsWithSafeActivities([activity]);
        assert.equal(payload[0].activities[0].blankCount,2);
        assert.doesNotMatch(JSON.stringify(payload),/Bratislava|Košice/);
    });
}
