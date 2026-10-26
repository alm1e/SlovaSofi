const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const {stripTypeScriptTypes} = require('node:module');
const test = require('node:test');
const blanks = require('./fill-blanks.js');
function ui() {
    const context = vm.createContext({SlovaExerciseFormat:require("./exercise-format.js"),window:{},localStorage:{getItem:()=> 'ru'}});
    for (const file of ['locales.js','lesson-notes.js','activity-ui.js']) vm.runInContext(fs.readFileSync(`${__dirname}/${file}`,'utf8'),context);
    return context.window;
}
test('existing and new notes have safe colors, audience labels and collapse controls', () => {
    const window = ui();
    const rendered = window.SlovaActivityUI.renderNote('[info]\n1. **Strom** — дерево', 'Слова', {noteColor:'#bb3488',studentVisible:false,noteCollapsed:true});
    assert.match(rendered, /--note-color:#bb3488/);
    assert.match(rendered, /Только для учителя/);
    assert.match(rendered, /<strong>Strom<\/strong>/);
    assert.doesNotMatch(rendered, / open/);
    const unsafe = window.SlovaActivityUI.renderNote('<img src=x onerror=alert(1)>','<script>x</script>',{note:true,noteColor:'red;display:none'});
    assert.match(unsafe,/--note-color:#e4ae16/);
    assert.doesNotMatch(unsafe,/<script|<img|display:none/);
    assert.match(unsafe,/ open/);
    for (const lang of ['ua','ru','en','sk','kk']) assert.match(window.SlovaLessonNotes.controls({type:'text',settings:{note:true}},lang),/data-note-setting="studentVisible"/);
});
test('formatted blank exercises keep lists, bold text, inline endings and answer order', () => {
    const window = ui();
    const parsed = blanks.parse('1. **nemoderné** auto, teraz [moderné] auto.\n2. širok[á] stolička ___', 'je');
    const html = window.SlovaActivityUI.renderBlankText(parsed.parts,parsed.answers.map((_,i)=>`<input data-gap="${i}">`));
    assert.match(html,/<ol>/);
    assert.match(html,/<strong>nemoderné<\/strong>/);
    assert.match(html,/širok<input data-gap="1">/);
    assert.equal((html.match(/<input/g)||[]).length,3);
    assert.doesNotMatch(html,/(?<!ne)moderné/);
    assert.deepEqual(blanks.check('1. [moderné]\n2. širok[á] ___','je',{},['moderné','á','je']),[true,true,true]);
    assert.equal(blanks.parse('**text** [u]word[/u] [answer]').groups.length,1);
});
for (const relative of ['../../supabase/functions/student-lessons/index.ts','../../artifacts/student-lessons-notes.ts']) {
    test(`student payload excludes private notes and preserves following answer indexes: ${relative}`, () => {
        let source = fs.readFileSync(`${__dirname}/${relative}`,'utf8').replace(/^import .*;\r?\n/gm,'');
        const context = vm.createContext({SlovaExerciseFormat:require("./exercise-format.js"),Deno:{serve(){}},URL,SlovaFillBlanks:blanks});
        vm.runInContext(stripTypeScriptTypes(source),context);
        const activities = [{type:'text',prompt:'SECRET',content:'PRIVATE',settings:{note:true,studentVisible:false}}, {type:'text',prompt:'Visible',content:'WORDS',settings:{note:true,noteColor:'#123456',noteCollapsed:true}}, {type:'fill-blank',content:'[moderné]',answer:''}];
        const sections = context.sectionsWithSafeActivities(activities);
        const serialized = JSON.stringify(sections);
        assert.doesNotMatch(serialized,/SECRET|PRIVATE|moderné/);
        assert.equal(sections[0].activities[0].settings.noteColor,'#123456');
        assert.equal(sections[0].activities[0].settings.noteCollapsed,true);
        assert.equal(sections[0].activities[1].index,2);
        assert.equal(sections[0].activities[1].blankCount,1);
        assert.equal(JSON.stringify(context.safeActivity(activities[0])),'{}');
    });
}
