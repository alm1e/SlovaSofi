const test = require('node:test');
const assert = require('node:assert/strict');
const blanks = require('./fill-blanks.js');
test('legacy, bracket and mixed blanks preserve answer order and newlines', () => {
    const parsed = blanks.parse('širok[á] stolička\nJa ___ v [Bratislave]. ___', 'bývam / dnes');
    assert.equal(parsed.content, 'širok___ stolička\nJa ___ v ___. ___');
    assert.deepEqual(parsed.answers, ['á','bývam','Bratislave','dnes']);
    assert.deepEqual(blanks.parse('___ ___', 'a / b').answers, ['a','b']);
});
test('alternatives, diacritics and case-sensitive settings are checked consistently', () => {
    assert.deepEqual(blanks.check('[bývam / žijem] [á]', '', {}, ['ŽIJEM', 'a\u0301']), [true,true]);
    assert.deepEqual(blanks.check('[á]', '', {}, ['a']), [false]);
    assert.deepEqual(blanks.check('[Dom]', '', {caseSensitive:true}, ['dom']), [false]);
    assert.deepEqual(blanks.check('___ [á]', '', {acceptedAnswers:[['dom','byt']]}, ['byt','á']), [true,true]);
});
test('inserting before old blanks shifts external answers and configured alternatives', () => {
    const result = blanks.insert('Ja dnes ___ v [Bratislave].', 'bývam', {acceptedAnswers:[['bývam','žijem']]}, 3, 7);
    assert.equal(result.answer, 'dnes / bývam');
    assert.deepEqual(blanks.parse(result.content,result.answer,result.settings).groups, [['dnes'],['bývam','žijem'],['Bratislave']]);
    assert.equal(blanks.insert('širok[á]', '', {}, 6, 7), null);
});
test('escaped brackets stay literal and empty answers do not validate', () => {
    assert.deepEqual(blanks.parse('\\[пример\\] [á]').answers, ['á']);
    assert.deepEqual(blanks.check('___', '', {}, ['']), [false]);
    assert.equal(blanks.parse('[] [unfinished').groups.length, 1);
    assert.deepEqual(blanks.check('[]','',{},['']),[false]);
});
test('server sends only blank content and grading booleans to students', () => {
    const fs = require('node:fs'), vm = require('node:vm');
    const {stripTypeScriptTypes} = require('node:module');
    let code = fs.readFileSync(`${__dirname}/../../supabase/functions/student-lessons/index.ts`, 'utf8');
    code = code.replace(/^import .*;\r?\n/gm, '');
    const context = vm.createContext({SlovaExerciseFormat:require("./exercise-format.js"), SlovaFillBlanks:blanks, Deno:{serve(){}}, URL });
    vm.runInContext(stripTypeScriptTypes(code),context);
    const activity = {type:'fill-blank',prompt:'Complete',content:'širok[á] ___',answer:'stolička'};
    const safe = context.safeActivity(activity);
    assert.equal(safe.content, 'širok___ ___');
    assert.equal(safe.blankCount,2);
    assert.equal(safe.gradable,true);
    assert.equal(JSON.stringify(safe).includes('stolička'),false);
    assert.equal('acceptedAnswers' in safe,false);
    assert.equal(context.isCorrect(activity,['á','stolička']),true);
    assert.equal(context.isCorrect(activity,['a','stolička']),false);
    assert.equal(context.isCorrect(activity,['á','stolička','extra']),false);
});
