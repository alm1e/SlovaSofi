const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const test = require('node:test');
function setup(saved = {}) {
    const context = vm.createContext({ URL, window: { addEventListener() {} }, document: { addEventListener() {} }, localStorage: { getItem: key => saved[key] || null } });
    vm.runInContext(fs.readFileSync(`${__dirname}/locales.js`, "utf8"), context);
    vm.runInContext(fs.readFileSync(`${__dirname}/phrase-list.js`, 'utf8'), context);
    return context.window.SlovaPhraseList;
}
test('phrase rows preserve Slovak accents, reject incomplete rows and unsafe audio', () => {
    const list = setup();
    const words = list.parse('Ďakujem | Дякую | https://example.com/audio.mp3\nMissing translation\nProsím | Будь ласка | javascript:alert(1)');
    assert.equal(words.length, 2);
    assert.equal(words[0].word, 'Ďakujem');
    assert.equal(words[0].audio, 'https://example.com/audio.mp3');
    assert.equal(words[1].audio, '');
    assert.equal(list.parse('a | b\n'.repeat(101)).length, 100);
});
test('phrase rendering escapes words, translations and attributes', () => {
    const html = setup().render([{word:'<img src=x onerror=alert(1)>', translation:'"<script>x</script>', audio:'javascript:alert(1)'}], 'ru');
    assert.doesNotMatch(html, /<img|<script|javascript:/);
    assert.match(html, /&lt;img/);
    assert.match(html, /data-phrase-all disabled/);
});

test('multiline examples display separately and do not contaminate saved translations', () => {
    const phrases=setup(), words=phrases.parse('Ďakujem / Дякую <Ďakujem za pomoc.\nĎakujem pekne.>\nProsím / Будь ласка');
    assert.equal(words.length,2);
    assert.equal(words[0].translation,'Дякую');
    assert.equal(words[0].example,'Ďakujem za pomoc.\nĎakujem pekne.');
    const html=phrases.render(words,'en');
    assert.match(html,/class="phrase-example">Ďakujem za pomoc.<br>Ďakujem pekne./);
    assert.match(html,/data-phrase-translation="Дякую"/);
});
test('saved vocabulary is scoped to the signed-in user and survives rendering', () => {
    const list = setup({'slovasofi:vocabulary:alice': JSON.stringify([{word:'Ďakujem',translation:'Дякую'}])});
    const words = list.parse('Ďakujem | Дякую');
    assert.match(list.render(words,'ru','alice'), /data-phrase-all disabled/);
    assert.doesNotMatch(list.render(words,'ru','bob'), /data-phrase-all disabled/);
    assert.match(list.render(words,'ru','bob'), /data-phrase-saved/);
});

test('slash separator preserves phrase variants and audio URL paths', () => {
    const list = setup();
    const words = list.parse('Nech sa páči / Páči sa. / Будь ласка / https://example.com/audio/sk/please.mp3\nĎakujem/Дякую');
    assert.equal(words[0].word, 'Nech sa páči / Páči sa.');
    assert.equal(words[0].translation, 'Будь ласка');
    assert.equal(words[0].audio, 'https://example.com/audio/sk/please.mp3');
    assert.equal(words[1].translation, 'Дякую');
});

test('legacy vocabulary words and audio remain editable without JSON', () => {
    const list = setup();
    const activity = { settings: { words: [{word:'Ďakujem',translation:'Дякую',audio:'https://example.com/sk/thanks.mp3'}] } };
    assert.equal(list.wordsFor(activity).length, 1);
    assert.equal(list.editorContent(activity), 'Ďakujem / Дякую / https://example.com/sk/thanks.mp3');
    assert.equal(list.parse(list.editorContent(activity))[0].audio, activity.settings.words[0].audio);
    assert.equal(list.wordsFor({content:'',settings:{...activity.settings,vocabularyFormat:'slash'}}).length, 0);
    assert.equal(list.wordsFor({cards:[{front:'dom',back:'house'}]})[0].word, 'dom');
});
