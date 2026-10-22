const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const test = require('node:test');
const path = require('node:path');
const read = file => fs.readFileSync(path.join(__dirname, file), 'utf8');
function context() {
    const ctx = vm.createContext({});
    vm.runInContext(read('locales.js'), ctx);
    return ctx;
}
test('both new dictionaries cover existing UI messages and preserve interpolation tokens', () => {
    const ctx = context();
    const source = JSON.parse(fs.readFileSync(path.join(__dirname, '../../tools/locale-source.json'), 'utf8'));
    for (const language of ['sk', 'kk']) for (const text of source) {
        const translated = ctx.SlovaI18n.translate(text, language);
        assert.equal(typeof translated, 'string');
        assert.ok(translated.length);
        assert.deepEqual(translated.match(/\{\w+\}/g), text.match(/\{\w+\}/g), `${language}: ${text}`);
        if (!['Sofia', 'Victoria', 'https://...', 'https://example.com/listening.mp3', 'https://example.com/room.jpg', 'Ja bývať v Bratislave.', 'Online', 'Offline', 'Video', 'min'].includes(text)) assert.notEqual(translated, text, `${language}: untranslated ${text}`);
    }
});
test('teacher catalog includes later-added editor and calendar labels in both languages', () => {
    const ctx = context();
    const source = read('teacher.js');
    vm.runInContext(source.slice(0, source.indexOf('let currentLanguage =')) + ';this.catalog = translations;', ctx);
    assert.equal(ctx.catalog.sk['nav.classes'], 'Triedy');
    assert.equal(ctx.catalog.kk['nav.classes'], 'Сыныптар');
    assert.equal(ctx.catalog.sk['activity.vocabulary'], 'Slovník lekcie');
    assert.equal(ctx.catalog.kk['calendar.monday'], 'Дүйсенбі');
    for (const language of ['sk','kk']) assert.deepEqual(Object.keys(ctx.catalog[language]), Object.keys(ctx.catalog.en));
});
test('all pages load shared locales before dependent scripts and expose five distinct choices', () => {
    const root = path.join(__dirname, '../..');
    for (const file of ['index.html','login.html','register.html','teacher-setup.html','teacher.html','student.html','reset-password.html']) {
        const html = fs.readFileSync(path.join(root,file),'utf8');
        assert.ok(html.indexOf('assets/js/locales.js') >= 0, file);
        for (const script of ['theme.js','teacher.js','student.js','auth.js','reset-password.js']) if (html.includes(`assets/js/${script}`)) assert.ok(html.indexOf('assets/js/locales.js') < html.indexOf(`assets/js/${script}`), `${file}: ${script}`);
        if (html.includes('data-lang=')) for (const lang of ['ua','ru','en','sk','kk']) assert.match(html, new RegExp(`data-lang="${lang}"`), file);
        assert.doesNotMatch(html, /data-lang="(?:sk|kk)"[^>]*(?:aria-label="English"|changeLanguage\('en'\))/);
    }
});
test('student and authentication catalogs translate without touching authored lesson text', () => {
    const ctx = context();
    const student = read('student.js');
    vm.runInContext(student.slice(student.indexOf('const copy ='), student.indexOf('const languageChoices =')) + ';this.copy = copy;', ctx);
    assert.equal(ctx.copy.sk.checkAnswers,'Skontrolovať odpovede');
    assert.equal(ctx.copy.kk.checkAnswers,'Жауаптарды тексеру');
    assert.equal(ctx.copy.kk.true,'Шын');
    assert.equal(ctx.copy.sk.true,'Pravda');
    const table = ctx.SlovaI18n.locales({ en: { heading:'Courses' }, ru: {} });
    assert.equal(table.sk.heading,'Kurzy');
    assert.equal(table.en.heading,'Courses');
    assert.equal(ctx.SlovaI18n.translate('široká stolička', 'kk'), 'široká stolička');
});
