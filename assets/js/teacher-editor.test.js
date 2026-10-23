const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const test = require("node:test");

const source = fs.readFileSync(path.join(__dirname, "teacher.js"), "utf8");

function createEditorContext() {
    const context = vm.createContext({
        URL, crypto: require("node:crypto").webcrypto,
        window: { location: { href: "https://example.test/teacher.html" }, addEventListener() {} },
        location: { href: "https://example.test/teacher.html" },
        document: { addEventListener() {} },
        localStorage: { getItem: () => "en" },
        currentLanguage: "en", t: (key) => key,
        liveStudentText: (key) => key,
        lessonSectionText: (key) => key,
        lessonDraft: { sections: [] },
        expandedActivityBlocks: { has: () => true },
        imageUploadMessages: { en: { chooseFile: "Choose file", galleryHint: "Gallery" } }
    });
    vm.runInContext(fs.readFileSync(`${__dirname}/locales.js`, "utf8"), context);
    context.imageUploadMessages = context.SlovaI18n.locales(context.imageUploadMessages);
    vm.runInContext(fs.readFileSync(`${__dirname}/lesson-notes.js`, "utf8"), context);
    vm.runInContext(fs.readFileSync(path.join(__dirname, "activity-ui.js"), "utf8"), context);
    vm.runInContext(fs.readFileSync(path.join(__dirname, "fill-blanks.js"), "utf8"), context);
    vm.runInContext(fs.readFileSync(path.join(__dirname, "blank-cards.js"), "utf8"), context);
    vm.runInContext(fs.readFileSync(path.join(__dirname, "table.js"), "utf8"), context);
    vm.runInContext(fs.readFileSync(path.join(__dirname, "phrase-list.js"), "utf8"), context);
    vm.runInContext(fs.readFileSync(path.join(__dirname, "image-gallery.js"), "utf8"), context);
    vm.runInContext(fs.readFileSync(path.join(__dirname, "lesson-import-ui.js"), "utf8"), context);
    const liveTypesStart = source.indexOf("const liveAnswerActivityTypes =");
    vm.runInContext(source.slice(liveTypesStart, source.indexOf("\n]);", liveTypesStart) + 4), context);
    for (const name of ["activityTypes", "activityQuestionLabels", "previewLabels", "previewGroupCheckLabels"]) {
        const start = source.indexOf(`const ${name} =`);
        const end = source.indexOf(name === "activityTypes" ? "\n];" : name === "previewGroupCheckLabels" ? ";" : "\n});", start);
        vm.runInContext(source.slice(start, end + (name === "previewGroupCheckLabels" ? 1 : name === "activityTypes" ? 3 : 4)), context);
    }
    vm.runInContext("const MAX_ACTIVITY_QUESTIONS = 100; this.types = activityTypes;", context);
    for (const name of [
        "renderTrueFalseEditor", "moveTrueFalseQuestion", "escapeHtml", "activityQuestionText", "createActivityQuestionId", "ensureActivityQuestionIds",
        "addActivityQuestion", "renderActivityQuestionEditor", "activitySummary", "activityEditorMeta",
        "duplicateBlockButton", "previewText", "previewTokens", "previewLines", "previewMediaUrl",
        "previewFlashcardSideMarkup", "previewVideoEmbedUrl", "renderPreviewActivity", "checkPreviewActivity",
        "renderSupplementaryPreview", "renderActivityBlocks", "activityEditorIcon", "renderBuilderPreview",
        "previewRichContent", "contentHint", "answerHint", "contentPlaceholder", "answerPlaceholder",
        "richTextToolbar", "activitySettingsPlaceholder", "activityMetadataEditor", "activitySettingsField", "updateActivitySettings"
    ]) {
        const start = source.indexOf(`function ${name}(`);
        assert.notEqual(start, -1, `Missing function ${name}`);
        const end = source.indexOf("\n}", start) + 2;
        vm.runInContext(source.slice(start, end), context);
    }
    return context;
}

test("all 21 activity types have an expanded editor and student preview", () => {
    const editor = createEditorContext();
    assert.equal(editor.types.length, 21);
    for (const { id } of editor.types) {
        const block = { type: id, prompt: "Instruction", content: "one = two\nthree = four", answer: "one" };
        const before = JSON.stringify(block);
        const markup = editor.renderActivityBlocks([block]);
        assert.match(markup, /builder-block has-preview is-expanded/);
        assert.match(markup, /class="builder-block-editor"/);
        assert.match(markup, /class="builder-block-preview"/);
        assert.match(markup, /class="builder-preview-body"/);
        assert.match(markup, /Practice answers here are not saved/);
        assert.equal(JSON.stringify(block), before, `${id}: preview changed draft`);
    }
});

test("collapsed blocks defer rendering their preview content", () => {
    const editor = createEditorContext();
    editor.expandedActivityBlocks.has = () => false;
    const markup = editor.renderActivityBlocks([{ type: "order-items", content: "one\ntwo" }]);
    assert.doesNotMatch(markup, /class="preview-order-list"/);
});

test("table preview uses slash columns, bracket answers and legacy gaps without changing the draft", () => {
    const editor = createEditorContext();
    const activity = {type:'table',prompt:'Fill',content:'Name / City\nAnna / [Bratislava]\nPeter / []\nEva / ___',answer:'Košice / Nitra'};
    const before = JSON.stringify(activity);
    const html = editor.renderActivityBlocks([activity]);
    for (const answer of ['Bratislava','Košice','Nitra']) assert.ok(html.includes(`placeholder="${answer}"`));
    assert.equal((html.match(/data-table-answer-index=/g)||[]).length,3);
    assert.ok(html.includes('data-preview-settings='));
    assert.equal(JSON.stringify(activity),before);
});

test("picture gap editor creates a word bank and keeps the teacher answer hints", () => {
    const editor=createEditorContext();
    const activity={type:'fill-blank',prompt:'Flags',content:'![Image](https://example.com/us.png) [Amerika]\n![Image](https://example.com/de.png) []',answer:'Nemecko',settings:{gapLayout:'cards',useWordBank:true,wordBank:['Kanada']}};
    const before=JSON.stringify(activity),html=editor.renderActivityBlocks([activity]);
    assert.match(html,/gap-card-grid/);assert.match(html,/data-gap-word="Amerika"/);assert.match(html,/data-gap-word="Nemecko"/);assert.match(html,/data-gap-word="Kanada"/);
    assert.match(html,/placeholder="Amerika"/);assert.match(html,/data-gap-card-file/);
    assert.equal(JSON.stringify(activity),before);
});

test("all activity editors render in Slovak and Kazakh while preserving authored content", () => {
    for (const language of ['sk', 'kk']) {
        const editor = createEditorContext();
        editor.currentLanguage = language;
        for (const { id } of editor.types) {
            const block = { type: id, prompt: 'Slovenské zadanie', content: 'one = two\nthree = four', answer: 'one' };
            const before = JSON.stringify(block);
            const html = editor.renderActivityBlocks([block]);
            assert.match(html, /Slovenské zadanie/);
            assert.doesNotMatch(html, /undefined/);
            assert.match(html, language === 'sk' ? /Skúšobné odpovede sa tu neukladajú/ : /Сынақ жауаптары мұнда сақталмайды/);
            assert.equal(JSON.stringify(block), before);
        }
    }
});

test("true/false uses compact answer selects for new and legacy statements", () => {
    const editor = createEditorContext();
    const single = {type:'true-false',prompt:'Choose',content:'Slon je malý',answer:'false'};
    const original = JSON.stringify(single);
    const html = editor.renderActivityBlocks([single]);
    assert.match(html, /class="tf-row"/);
    assert.match(html, /value="false" selected/);
    assert.match(html, /data-field="content" value="Slon je malý"/);
    assert.doesNotMatch(html, /<textarea data-field=|<input data-field="answer"/);
    assert.equal(JSON.stringify(single),original);
    const group = {type:'true-false',questions:[{id:'q1',prompt:'Strom je vysoký',content:'',answer:'true'},{id:'q2',prompt:'Context',content:'Slimák je rýchly',answer:'false'}]};
    const rows = editor.renderActivityQuestionEditor(group);
    assert.match(rows, /data-field="prompt" value="Strom je vysoký"/);
    assert.match(rows, /data-field="content" value="Slimák je rýchly"/);
    assert.match(rows, /<small>Context<\/small>/);
    const quick = editor.renderActivityQuestionEditor(group,true);
    assert.match(quick,/data-preview-question-field="answer"/);
    assert.match(editor.renderTrueFalseEditor(single,true),/data-preview-field="answer"/);
});

test("moving true/false statements preserves identity and correct answers", () => {
    const editor = createEditorContext();
    const first = {id:'existing-1',content:'One',answer:'true'};
    const second = {id:'existing-2',content:'Two',answer:'false'};
    const activity = {type:'true-false',questions:[first,second]};
    assert.equal(editor.moveTrueFalseQuestion(activity,0,1),true);
    assert.equal(activity.questions[1],first);
    assert.equal(activity.questions[0],second);
    assert.equal(editor.moveTrueFalseQuestion(activity,0,-1),false);
    assert.equal(activity.questions[0].answer,'false');
});

test("lesson vocabulary shows translations and audio without grading or technical settings", () => {
    const editor = createEditorContext();
    const html = editor.renderActivityBlocks([{ type: "vocabulary", content: "Ďakujem / Дякую\nProsím / Будь ласка" }]);
    assert.match(html, /phrase-row/);
    assert.match(html, /Ďakujem/);
    assert.match(html, /Дякую/);
    assert.match(html, /data-phrase-listen/);
    assert.doesNotMatch(html, /data-field="answer"|activity-advanced-settings|data-add-question/);
});

test("text groups remain editable while plain text has only the toolbar add action", () => {
    const editor = createEditorContext();
    assert.equal(editor.renderActivityQuestionEditor({ type: "text" }), "");
    const markup = editor.renderActivityBlocks([{ type: "text", questions: [{ id: "q1", content: "First" }] }]);
    assert.match(markup, /activity-question-editor-item/);
    assert.match(markup, /preview-question-list/);
    assert.match(markup, /First/);
});

test("listening question creation preserves its audio and renders radio options", () => {
    const editor = createEditorContext();
    const block = { type: "listening-questions", content: "https://example.test/audio.mp3" };
    assert.equal(editor.addActivityQuestion(block), 0);
    assert.equal(block.content, "https://example.test/audio.mp3");
    block.questions[0].content = "Yes\nNo";
    block.questions[0].answer = "Yes";
    const markup = editor.renderActivityBlocks([block]);
    assert.match(markup, /<audio[^>]+src="https:\/\/example.test\/audio.mp3"/);
    assert.match(markup, /type="radio"/);
    assert.match(markup, /textarea data-field="content"[^>]*>https:\/\/example.test\/audio.mp3/);
});

test("vocabulary, hotspots, error selection, and recording have dedicated previews", () => {
    const editor = createEditorContext();
    assert.match(editor.renderBuilderPreview({ type: "vocabulary", settings: { words: [{ word: "dom", translation: "house" }] } }, 0), /data-phrase-word="dom" data-phrase-translation="house"/);
    const image = editor.renderBuilderPreview({ type: "interactive-image", content: "https://example.test/image.png", settings: { hotspots: [{ x: 120, y: -5, word: "dom" }] } }, 0);
    assert.match(image, /left:100%;top:0%/);
    assert.match(image, /data-preview-hotspot="dom"/);
    assert.match(editor.renderBuilderPreview({ type: "find-error", content: "Incorrect word" }, 0), /data-preview-error-word/);
    const recording = editor.renderBuilderPreview({ type: "pronunciation-recording", content: "Read this" }, 0);
    assert.match(recording, /disabled>Record pronunciation/);
    assert.match(recording, /visual preview/);
});

test("preview updates reflect changed content, answers, and structured settings", () => {
    const editor = createEditorContext();
    const block = { type: "multiple-choice", content: "First\nSecond", answer: "First" };
    const first = editor.renderBuilderPreview(block, 0);
    block.content = "New\nOther";
    block.answer = "Other";
    const updated = editor.renderBuilderPreview(block, 0);
    assert.notEqual(first, updated);
    assert.match(updated, /data-preview-answer="Other"/);
    assert.match(updated, /<span>New<\/span>/);
    assert.doesNotMatch(updated, /<span>First<\/span>/);
    const vocabulary = { type: "vocabulary", settings: { words: [] } };
    const empty = editor.renderBuilderPreview(vocabulary, 0);
    vocabulary.settings.words.push({ word: "novy", translation: "new" });
    assert.notEqual(editor.renderBuilderPreview(vocabulary, 0), empty);
});

test("structured preview values are escaped and unsafe image/audio schemes are rejected", () => {
    const editor = createEditorContext();
    const html = editor.renderBuilderPreview({ type: "vocabulary", settings: { words: [{ word: '<img src=x onerror="alert(1)">', translation: "<script>bad</script>", audio: "javascript:alert(1)" }] } }, 0);
    assert.doesNotMatch(html, /<img|<script|javascript:/);
    assert.match(html, /&lt;img/);
    const image = editor.renderBuilderPreview({ type: "interactive-image", content: "javascript:alert(1)" }, 0);
    assert.doesNotMatch(image, /<img/);
});

test("technical settings preserve their values and explain when JSON is needed", () => {
    const editor = createEditorContext();
    const settings = { words: [{ word: "dom", translation: "house" }] };
    const block = { type: "interactive-image", settings };
    const markup = editor.activitySettingsField(block);
    assert.match(markup, /Advanced settings/);
    assert.match(markup, /Technical settings \(JSON\)/);
    assert.match(markup, /Vocabulary words/);
    assert.match(markup, /&quot;dom&quot;/);
    assert.equal(block.settings, settings);
});

test("invalid JSON keeps the last valid settings and displays a field error", () => {
    const editor = createEditorContext();
    const block = { type: "fill-blank", settings: { hints: ["original"] } };
    const error = { textContent: "" };
    let validity = "";
    const input = {
        value: "{bad",
        setCustomValidity: (message) => { validity = message; },
        closest: () => ({ querySelector: () => error })
    };
    const original = block.settings;
    for (const invalid of ["{bad", "[]", "null", '"text"']) {
        input.value = invalid;
        assert.equal(editor.updateActivitySettings(block, input), false);
        assert.equal(block.settings, original);
        assert.ok(error.textContent);
        assert.ok(validity);
    }
    input.value = '{"hints":["updated"]}';
    assert.equal(editor.updateActivitySettings(block, input), true);
    assert.equal(JSON.stringify(block.settings), '{"hints":["updated"]}');
    assert.equal(validity, "");
    assert.equal(error.textContent, "");
});

test('imported multi-answer choices and custom third true/false label remain usable in previews', () => {
    const editor=createEditorContext();
    const html=editor.renderPreviewActivity({type:'multiple-choice',prompt:'Fruit',content:'apple\npear\ncarrot',answer:'apple / pear',settings:{multipleAnswers:true,options:[{text:'apple',correct:true},{text:'pear',correct:true},{text:'carrot',correct:false}]}},0);
    assert.equal((html.match(/type="checkbox"/g)||[]).length,3);
    assert.equal((html.match(/preview-option is-correct-option/g)||[]).length,2);
    const boolean={type:'true-false',prompt:'Evaluate',content:'A statement',answer:'not-stated',settings:{allowNotStated:true,choiceLabels:['Right','Wrong','Depends']}};
    const preview=editor.renderPreviewActivity(boolean,0);
    assert.match(preview,/is-correct-option[^]*value="2"[^]*Depends/);
    assert.match(editor.renderTrueFalseEditor(boolean),/value="not-stated" selected>Depends/);
    const result={},choices=[true,true,false].map(correct=>({correct,checked:correct,classList:{contains(){return this.owner.correct;}}}));
    choices.forEach(option=>{option.classList.owner=option;option.querySelector=()=>option;});
    const card={dataset:{previewAnswer:'apple / pear',previewType:'multiple-choice'},classList:{contains:()=>false},querySelector:selector=>selector==='[data-preview-result]'?result:null,querySelectorAll:()=>choices};
    editor.checkPreviewActivity(card);assert.match(result.className,/correct/);assert.doesNotMatch(result.className,/incorrect/);
    choices[1].checked=false;editor.checkPreviewActivity(card);assert.match(result.className,/incorrect/);
});

test('metadata remains editable and is escaped in student-style previews', () => {
    const editor=createEditorContext(),activity={type:'fill-blank',prompt:'Fill',content:'I [am] here.',settings:{description:'<img src=x onerror=alert(1)>',helperText:'Hint'}};
    const html=editor.renderActivityBlocks([activity]);
    assert.match(html,/data-activity-meta="description"/);
    assert.match(html,/activity-description">&lt;img/);
    assert.doesNotMatch(html,/<img src=x/);
    assert.match(html,/class="activity-helper">Hint/);
});
