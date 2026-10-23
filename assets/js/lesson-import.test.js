const assert = require('node:assert/strict');
const test = require('node:test');
const fs = require('node:fs');
const vm = require('node:vm');
require('./fill-blanks.js'); require('./table.js');
const importer = require('./lesson-import.js');
const context = vm.createContext({window:{}});
vm.runInContext(fs.readFileSync(`${__dirname}/lesson-import-ui.js`, 'utf8'), context);
const ui = context.window.SlovaLessonImportUI;

test('generated prompt examples import all supported kinds in each interface language', () => {
    const types = Object.keys(importer.kinds).filter(kind => !['HiddenText','TeacherNote','Note','DragWords'].includes(kind)).map(kind => ({id:importer.kinds[kind],nameKey:kind}));
    for (const language of ['ru','ua','en','sk','kk']) {
        const names = ui.namesFor(language, types, name => name);
        const aliases = Object.fromEntries(Object.entries(names).map(([type,name]) => [name,type]));
        const result = importer.parse(ui.template(names), {aliases});
        assert.deepEqual(result.errors, [], language);
        assert.equal(result.activities.length, 17);
        const ids = result.activities.flatMap(activity => [activity.id, ...(activity.questions || []).map(q=>q.id)]);
        assert.equal(new Set(ids).size, ids.length);
        assert.equal(result.activities.find(a=>a.settings.studentVisible===false).type, 'text');
    }
});
test('English DragWords is a gap bank and Unscramble is the existing sentence activity', () => {
    const result = importer.parse('#DragWords: Bank\n~sleep, read\nI [wake] up.\n\n#Unscramble: Sentence\nI go to school every_day. <Where?>');
    assert.deepEqual(result.errors, []);
    assert.equal(result.activities[0].type, 'fill-blank');
    assert.deepEqual(result.activities[0].settings.wordBank, ['sleep','read']);
    assert.equal(result.activities[1].type, 'drag-words');
    assert.equal(result.activities[1].questions[0].answer, 'I / go / to / school / every day.');
    const ambiguous=importer.parse('#DragWords: Bank\nI [wake] up.',{aliases:{'Drag words':'drag-words'}});
    assert.equal(ambiguous.activities[0].type,'fill-blank');
    assert.equal(importer.parse('#Recording: X\nText',{aliases:{Recording:'pronunciation-recording'}}).errors[0].code,'type');
});
test('inline alternatives, local dropdown choices and custom true/false labels preserve answers', () => {
    const result = importer.parse('#GapFill: Gaps\nWe [have/\'ve] breakfast.\n#DropDown: Choose\nShe [eats/eat] fruit.\nWe [have/has] bread.\n#TrueFalse: Evaluate | Right / Wrong / Depends\nA. | Right\nB. / Wrong\nC. | Depends');
    assert.deepEqual(result.errors, []);
    assert.deepEqual(globalThis.SlovaFillBlanks.parse(result.activities[0].content).groups, [['have',"'ve"]]);
    assert.equal(result.activities[1].settings.randomizeOptions, false);
    assert.deepEqual(result.activities[1].questions.map(q=>q.answer), ['eats','have']);
    assert.deepEqual(result.activities[2].questions.map(q=>q.answer), ['true','false','not-stated']);
    assert.deepEqual(result.activities[2].settings.choiceLabels,['Right','Wrong','Depends']);
});
test('descriptions and helper text stay separate; private and collapsed notes retain their audience', () => {
    const result = importer.parse('#Writing: Write\n+Description\n++Helper\nUse five words.\n?Why?\n#TeacherNote: Private\nSecret\n#HiddenText: Hint\n=Show hint\nAnswer');
    assert.deepEqual(result.errors, []);
    assert.equal(result.activities[0].settings.description,'Description');
    assert.equal(result.activities[0].settings.helperText,'Helper');
    assert.equal(result.activities[0].content,'Use five words.\n• Why?');
    assert.equal(result.activities[1].settings.studentVisible,false);
    assert.equal(result.activities[2].settings.noteCollapsed,true);
    assert.equal(result.activities[2].prompt,'Show hint');
});
test('table slashes do not split bracket alternatives; CSV headers are compatible', () => {
    for (const source of ['#Table: Verbs\nInfinitive / Past\ndream / [dreamt/dreamed]', '#Table: Verbs | Infinitive, Past\ndream, [dreamt/dreamed]']) {
        const result=importer.parse(source); assert.deepEqual(result.errors,[]);
        assert.deepEqual(globalThis.SlovaTable.parse(result.activities[0].content).groups,[['dreamt','dreamed']]);
    }
});
test('invalid and unsupported syntax reports original block lines without inventing answers', () => {
    const result=importer.parse('```makefile\n#Text: Good\nHello\n#Unknown: Nope\nNo\n#GapFill: Missing\nI ___ here.\n#SortSentences: Order\nOne.\n~Two.\n#Image: Bad\njavascript:alert(1)\n```');
    assert.equal(result.activities.length,1);
    assert.deepEqual(result.errors.map(e=>[e.code,e.line]),[['type',3],['gaps',5],['distractors',7],['url',10]]);
    assert.ok(importer.parse('#GapFill: Missing\n[]').errors.length);
    assert.ok(importer.parse('#Table: Invalid\nA / B\nx / [y] / z').errors.length);
    assert.ok(importer.parse('#FlipCards: Bad\nQuestion <unfinished').errors.length);
});
test('multiline vocabulary examples and flip-card backs retain text and diacritics', () => {
    const result=importer.parse('#Vocabulary: Words\nĎakujem — Дякую <First.\nSecond.>\nProsím / Будь ласка\n#FlipCards: Cards\nQuestion? <First.\nSecond.>');
    assert.deepEqual(result.errors,[]);
    assert.match(result.activities[0].content,/Ďakujem \/ Дякую <First.\nSecond.>/);
    assert.equal(result.activities[1].content,'Question? | First. Second.');
});
test('input size and activity limits prevent server-side truncation', () => {
    assert.equal(importer.parse('x'.repeat(200001)).errors[0].code,'size');
    assert.equal(importer.parse('#Text: Large\n'+'x'.repeat(20001)).errors[0].code,'size');
    assert.equal(importer.parse(Array.from({length:101},()=> '#Text: X\nY').join('\n')).errors[0].code,'limit');
});

test('import UI requires a current successful preview and appends only on explicit action', () => {
    class Field {
        constructor(){this.value='';this.handlers={};this.disabled=false;}
        addEventListener(name, handler){this.handlers[name]=handler;}
        replaceChildren(){this.innerHTML='';}
        fire(name){this.handlers[name]?.({target:this});}
    }
    const fields = new Map();
    const modal = {querySelector(selector){if(!fields.has(selector))fields.set(selector,new Field());return fields.get(selector);}};
    context.window.SlovaLessonImport=importer;
    let appended=[];
    ui.open({language:'en',types:[],translate:x=>x,header:x=>x,openModal(){},modal,preview:a=>a.prompt,append:items=>appended.push(...items)});
    const source=modal.querySelector('#lessonImportSource'),check=modal.querySelector('[data-import-check]'),append=modal.querySelector('[data-import-append]');
    source.value='#Text: One\nFirst';source.fire('input');check.fire('click');
    assert.equal(append.disabled,false);assert.equal(appended.length,0);
    source.value='#Text: Two\nSecond';source.fire('input');append.fire('click');
    assert.equal(appended.length,0);assert.equal(append.disabled,true);
    check.fire('click');append.fire('click');assert.equal(appended.length,1);assert.equal(appended[0].prompt,'Two');
    source.value='#Unknown: Invalid\nX';source.fire('input');check.fire('click');append.fire('click');
    assert.equal(appended.length,1);assert.equal(append.disabled,true);
});
