const fs = require('fs');
const vm = require('vm');
const path = require('path');
const source = fs.readFileSync('assets/js/teacher.js', 'utf8');
const harness = fs.readFileSync('assets/js/teacher-editor.test.js', 'utf8').split('test("all 21')[0];
const ctx = vm.createContext({ require, URL, __dirname: path.resolve('assets/js') });
vm.runInContext(harness + '\nthis.editor = createEditorContext();', ctx);
const e = ctx.editor;
function extract(name) { const start = source.indexOf(`function ${name}(`); return source.slice(start, source.indexOf('\n}', start) + 2); }
const transStart = source.indexOf('const translations =');
vm.runInContext(source.slice(transStart, source.indexOf('\n};', transStart) + 3) + '\nthis.labels = translations.ru;', e);
e.currentLanguage = 'ru';
e.t = key => e.labels[key] || key;
e.lessonSectionText = key => ({ moveBlock: 'Переместить', editBlock: 'Редактировать', deleteBlock: 'Удалить', liveSubmitted: 'Отправлено', liveWait: 'Пока нет ответа' })[key] || key;
e.expandedActivityBlocks.has = () => false;
vm.runInContext(extract('activityIllustration') + extract('renderLiveAnswerPanel'), e);
e.liveProgressRows = new Map();
e.activityProgressKey = () => 'answer';
e.legacyActivityProgressKey = () => null;
e.formatLiveResponse = (_, value) => value || '';
const answers = [true, false, null].map((correct, i) => {
    e.liveProgressRows.set('demo', { answers: { answer: { response: ['Ja bývam v Bratislave.', 'Ja byvat v Bratislave.', 'Mám rád slovenčinu.'][i], correct } } });
    return e.renderLiveAnswerPanel({ id: 'demo', name: 'Анна · пример' }, { type: 'fill-blank' }, 0);
});
const blocks = [
    { type: 'multiple-choice', prompt: 'Выберите перевод слова dom.', content: 'дом\nшкола\nгород', answer: 'дом' },
    { type: 'order-items', prompt: 'Расставьте числа от одного до трёх.', content: 'jeden\ndva\ntri', answer: 'jeden / dva / tri' },
    { type: 'find-error', prompt: 'Найди ошибку в тексте.', content: 'Ja byvat v Bratislave.' }
];
const cards = e.types.map(type => `<div class="activity-choice"><span class="activity-illustration">${e.activityIllustration(type.id)}</span><span class="activity-choice-copy"><strong>${e.t(type.nameKey)}</strong><small>${e.t(type.descKey)}</small></span></div>`).join('');
const sections = ['Знакомство', 'Новые слова', 'Практика', 'Разговор', 'Итоги'];
const html = `<!doctype html><html lang="ru" data-theme="dark"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>SlovaSofi — обновлённые уроки</title><style>${fs.readFileSync('assets/css/teacher.css','utf8')}
body{padding:32px;max-width:1500px;margin:auto!important}.demo-header{display:flex;justify-content:space-between;gap:24px;align-items:center;margin-bottom:28px}.demo-header h1{margin:8px 0}.demo-note{color:var(--muted);margin:0 0 28px}.demo-cards{display:grid;gap:16px}.activity-grid{max-height:none!important;overflow:visible!important}.demo-title{margin:40px 0 20px}.demo-nav{padding:18px;background:var(--surface-soft);border-radius:16px}.demo-nav p{padding:10px;border-bottom:1px solid var(--line)}@media(max-width:800px){body{padding:16px}.demo-nav{display:none}}
</style><body class="platform"><header class="demo-header"><div><small>SLOVASOFI · ПРЕДПРОСМОТР</small><h1>Slovenčina každý deň</h1><span>A1 · Урок 3</span></div><button class="button secondary" onclick="document.documentElement.dataset.theme=document.documentElement.dataset.theme==='dark'?'light':'dark'">Светлая / тёмная тема</button></header><p class="demo-note">Обновлённые компоненты на демонстрационных данных. Статусы и ответы ниже — примеры.</p><div class="lesson-workspace-layout has-live-monitor"><aside class="demo-nav"><strong>Ответы учеников</strong><p>Анна · 3/5</p><p>Мария · 2/5</p></aside><main class="demo-cards">${blocks.map((block,i) => `<section>${e.renderActivityBlocks([block])}${answers[i]}</section>`).join('')}</main><aside class="lesson-sections-panel"><div class="lesson-section-progress"><div><span>Ответы ученика</span><strong>3/5</strong></div><progress value="3" max="5" aria-label="Ответы ученика"></progress></div><h2>Разделы урока</h2><nav class="lesson-sections-list">${sections.map((title,i)=>`<div class="lesson-section-row ${i===2?'active':''}"><span class="lesson-section-select"><span class="lesson-section-number">${i+1}</span><span class="lesson-section-label">${title}</span></span></div>`).join('')}</nav></aside></div><h2 class="demo-title">Добавление задания — 21 тип</h2><div class="activity-grid">${cards}</div></body></html>`;
fs.mkdirSync('artifacts', {recursive:true});
fs.writeFileSync('artifacts/lesson-ui-preview.html', html);
console.log('Created artifacts/lesson-ui-preview.html');
