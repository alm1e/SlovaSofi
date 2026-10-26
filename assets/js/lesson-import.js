(function (root) {
    'use strict';
    const kinds = {
        Text: 'text', Vocabulary: 'vocabulary', GapFill: 'fill-blank', DropDown: 'one-of-many',
        DragWords: 'word-bank', MultipleChoice: 'multiple-choice', TrueFalse: 'true-false',
        Table: 'table', Matching: 'match', Unscramble: 'drag-words', SortSentences: 'sentence-order',
        ColumnSort: 'columns', FlipCards: 'flashcards', Writing: 'open-answer',
        HiddenText: 'hidden-text', TeacherNote: 'teacher-note', Note: 'note',
        Image: 'image', Audio: 'audio', Video: 'video'
    };
    const key = value => String(value).normalize('NFC').trim().toLocaleLowerCase().replace(/[\s_–—-]+/g, '');
    const aliases = {
        'Заголовок и текст': 'text', 'Заголовок і текст': 'text',
        'Словарь урока': 'vocabulary', 'Словник уроку': 'vocabulary',
        'Заполнить пропуски': 'fill-blank', 'Заповнити пропуски': 'fill-blank',
        'Слова в пропуски': 'word-bank', 'Слова у пропуски': 'word-bank',
        'Заметка учителя': 'teacher-note', 'Нотатка викладача': 'teacher-note',
        'Скрытый текст': 'hidden-text', 'Прихований текст': 'hidden-text',
        'Заметка': 'note', 'Нотатка': 'note'
    };
    const issue = (code, line, detail = '') => ({ code, line, detail });
    function pair(value) {
        const match = value.match(/^(.*?)\s+(?:—|–|\/)\s+([\s\S]+)$/);
        return match && match[1].trim() && match[2].trim() ? [match[1].trim(), match[2].trim()] : null;
    }
    function records(content) {
        const result = [];
        let pending = '';
        for (const line of content.split('\n')) {
            pending += (pending ? '\n' : '') + line;
            if (pending.includes('<') && !pending.includes('>')) continue;
            if (pending.trim()) result.push(pending.trim());
            pending = '';
        }
        if (pending.trim()) throw Error('angle');
        return result.map(value => {
            const match = value.match(/^(.*?)\s*<([\s\S]*)>\s*$/);
            if (/[<>]/.test(value) && !match) throw Error('angle');
            return match ? { text: match[1].trim(), extra: match[2].trim() } : { text: value, extra: '' };
        });
    }
    function splitCells(value, delimiter) {
        let depth = 0, cell = '', result = [];
        for (const char of value) {
            if (char === '[') depth++;
            if (char === ']') depth--;
            if (char === delimiter && depth === 0) { result.push(cell.trim()); cell = ''; }
            else cell += char;
        }
        result.push(cell.trim());
        return result;
    }
    function parse(source, options = {}) {
        const errors = [], warnings = [], activities = [], locations = [];
        const registry = new Map();
        Object.values(kinds).forEach(type => registry.set(key(type), type));
        Object.entries(kinds).forEach(([name, type]) => registry.set(key(name), type));
        Object.entries({ ...aliases, ...options.aliases }).forEach(([name, type]) => registry.set(key(name), type));
        const makeId = options.makeId || (() => root.crypto.randomUUID());
        let input = String(source || '').replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
        if (input.length > 200000) return { activities, errors: [issue('size', 1)], warnings, locations };
        input = input.replace(/^\s*```[^\n]*\n/, '').replace(/\n```\s*$/, '');
        const blocks = [];
        let block;
        input.split('\n').forEach((line, index) => {
            const header = line.match(/^#([^:#]+):\s*(.*)$/);
            if (header) {
                block = { name: header[1].trim(), title: header[2], line: index + 1, lines: [] };
                blocks.push(block);
            } else if (block) block.lines.push(line.replace(/^\\#/, '#'));
            else if (line.trim()) errors.push(issue('header', index + 1));
        });
        if (!blocks.length) errors.push(issue('empty', 1));
        if (blocks.length > 100) errors.push(issue('limit', blocks[100].line));
        for (const raw of blocks.slice(0, 100)) {
            const type = Object.prototype.hasOwnProperty.call(kinds, raw.name) ? kinds[raw.name] : registry.get(key(raw.name));
            if (!type || !Object.values(kinds).includes(type)) { errors.push(issue('type', raw.line, raw.name)); continue; }
            const title = raw.title.split(/\s+\|\s+/), settings = {};
            const body = [];
            for (const line of raw.lines) {
                if (line.startsWith('++')) settings.helperText = [settings.helperText, line.slice(2).trim()].filter(Boolean).join('\n');
                else if (line.startsWith('+')) settings.description = [settings.description, line.slice(1).trim()].filter(Boolean).join('\n');
                else body.push(line);
            }
            let content = body.join('\n').trim();
            const activity = { id: makeId(), type, prompt: title[0].trim() || options.titles?.[type] || raw.name, content, answer: '', settings };
            const question = (prompt, content, answer) => ({ id: makeId(), prompt, content, answer });
            const lines = () => content.split('\n').map(line => line.trim()).filter(Boolean);
            try {
                if (!content) throw Error('body');
                if (type === 'text') {
                    if (title[1]) {
                        if (!['tip', 'note', 'совет', 'порада'].includes(title[1].toLowerCase())) throw Error('metadata');
                        Object.assign(settings, { note: true, noteColor: '#e4ae16', studentVisible: true });
                    }
                } else if (['hidden-text', 'teacher-note', 'note'].includes(type)) {
                    activity.type = 'text';
                    Object.assign(settings, { note: true, noteColor: '#e4ae16', studentVisible: type !== 'teacher-note', noteCollapsed: type === 'hidden-text' });
                    if (type === 'hidden-text' && /^=/.test(content)) {
                        const [caption, ...rest] = content.split('\n');
                        activity.prompt = caption.slice(1).trim() || activity.prompt;
                        activity.content = rest.join('\n').trim();
                        if (!activity.content) throw Error('body');
                    }
                } else if (type === 'vocabulary') {
                    activity.content = records(content).map(record => {
                        const parts = pair(record.text);
                        if (!parts) throw Error('pair');
                        return `${parts[0]} / ${parts[1]}${record.extra ? ` <${record.extra}>` : ''}`;
                    }).join('\n');
                } else if (type === 'fill-blank' || type === 'word-bank') {
                    if (type === 'word-bank') {
                        activity.type = 'fill-blank'; settings.useWordBank = true;
                        settings.wordBank = lines().filter(line => line.startsWith('~')).flatMap(line => line.slice(1).split(/[,/]/)).map(word => word.trim()).filter(Boolean);
                        if (settings.wordBank.length > 100 || settings.wordBank.some(word => word.length > 2000)) throw Error('size');
                        activity.content = content.split('\n').filter(line => !line.trim().startsWith('~')).join('\n').trim();
                    }
                    const blanks = root.SlovaFillBlanks.parse(activity.content, '', settings);
                    if (!blanks.groups.length || blanks.groups.some(group => !group.length)) throw Error('gaps');
                } else if (type === 'one-of-many') {
                    settings.randomizeOptions = false;
                    // One native question per sentence; its options remain local to that sentence.
                    activity.questions = lines().map(line => {
                        const matches = [...line.matchAll(/\[([^\[\]]+)\]/g)];
                        if (matches.length !== 1) throw Error('dropdown');
                        const choices = matches[0][1].split('/').map(word => word.trim());
                        if (choices.length < 2 || choices.some(word => !word) || new Set(choices).size !== choices.length) throw Error('dropdown');
                        return question('', [line.replace(matches[0][0], '___'), ...choices].join('\n'), choices[0]);
                    });
                    activity.content = '';
                } else if (type === 'multiple-choice') {
                    const rows = lines();
                    const firstOption = rows.findIndex(line => line.startsWith('*'));
                    if (firstOption < 0) throw Error('choice');
                    const questionText = firstOption > 0 ? rows.shift() : '';
                    // A question is introduced by '?' so unmarked wrong options can appear first.
                    const explicit = lines().filter(line => line.startsWith('?'));
                    const optionLines = explicit.length ? lines().filter(line => !line.startsWith('?')) : rows;
                    const optionsList = optionLines.map(line => ({ text: line.replace(/^\*/, '').trim(), correct: line.startsWith('*') }));
                    if (optionsList.length < 2 || optionsList.some(option => !option.text) || new Set(optionsList.map(option => option.text)).size !== optionsList.length) throw Error('choice');
                    if (optionsList.length > 100 || optionsList.some(option => option.text.length > 500)) throw Error('size');
                    const correct = optionsList.filter(option => option.correct);
                    activity.content = optionsList.map(option => option.text).join('\n');
                    settings.options = optionsList;
                    settings.multipleAnswers = correct.length > 1;
                    if (!settings.description && (explicit.length || questionText)) settings.description = explicit.length ? explicit.map(line => line.slice(1)).join('\n') : questionText;
                    activity.answer = correct.map(option => option.text).join(' / ');
                } else if (type === 'true-false') {
                    const labels = title[1] ? title.slice(1).join(' | ').split('/').map(label => label.trim()) : ['true', 'false'];
                    if (labels.length < 2 || labels.length > 3 || labels.some(label => !label || label.length > 500) || new Set(labels.map(key)).size !== labels.length) throw Error('boolean');
                    settings.choiceLabels = labels;
                    settings.allowNotStated = labels.length === 3;
                    activity.questions = lines().map(line => {
                        const parts = line.split(/\s+\|\s+|\s+\/\s+(?=[^/]+$)/);
                        if (parts.length < 2) throw Error('boolean');
                        const answer = parts.pop().trim(), statement = parts.join(' / ').trim();
                        let index = labels.findIndex(label => key(label) === key(answer));
                        if (index < 0 && /^(true|правда|верно|так|да)$/i.test(answer)) index = 0;
                        if (index < 0 && /^(false|неправда|неверно|ні|нет)$/i.test(answer)) index = 1;
                        if (index < 0 || !statement) throw Error('boolean');
                        return question('', statement, ['true', 'false', 'not-stated'][index]);
                    });
                    activity.content = '';
                } else if (type === 'table') {
                    const firstRow = title[1] || lines()[0];
                    const delimiter = splitCells(firstRow, '/').length > 1 ? '/' : ',';
                    const rows = lines().map(line => splitCells(line, delimiter));
                    if (title[1]) rows.unshift(splitCells(title.slice(1).join(' | '), delimiter));
                    if (rows[0].length < 2 || rows.some(row => row.length !== rows[0].length)) throw Error('table');
                    activity.content = rows.map(row => row.join(' / ')).join('\n');
                    const table = root.SlovaTable.parse(activity.content, '', settings);
                    if (!table.blankCount || table.groups.some(group => !group.length)) throw Error('gaps');
                } else if (type === 'match') {
                    activity.content = lines().map(line => {
                        const parts = pair(line); if (!parts || parts.some(part => part.includes('='))) throw Error('pair');
                        return parts.join(' = ');
                    }).join('\n');
                    const pairs = activity.content.split('\n').map(line => line.split(' = '));
                    if (new Set(pairs.map(parts => parts[1])).size !== pairs.length) throw Error('duplicate');
                } else if (type === 'drag-words') {
                    activity.questions = records(content).map(record => {
                        const tokens = record.text.split(/\s+/).filter(Boolean).map(word => word.replace(/_/g, ' '));
                        if (tokens.length < 2 || tokens.some(word => word.includes('/'))) throw Error('words');
                        return question(record.extra, record.text, tokens.join(' / '));
                    });
                    activity.content = '';
                } else if (type === 'sentence-order') {
                    if (lines().some(line => line.startsWith('~'))) throw Error('distractors');
                    if (lines().length < 2) throw Error('words');
                    activity.answer = lines().map((_, index) => index + 1).join(' / ');
                } else if (type === 'columns') {
                    const groups = content.split(/\n\s*\n/).map(group => group.split('\n').map(line => line.trim()).filter(Boolean));
                    if (groups.length < 2 || groups.some(group => group.length < 2 || group.some(line => line.includes(':')))) throw Error('columns');
                    activity.content = groups.flatMap(([category, ...words]) => words.map(word => `${category}: ${word}`)).join('\n');
                } else if (type === 'flashcards') {
                    activity.content = records(content).map(record => {
                        if(!record.extra){const bracket=record.text.match(/^(.+?)\s+\[(.+)\]$/);if(bracket){record.text=bracket[1];record.extra=bracket[2];}}
                        if (!record.text || !record.extra || /[|]/.test(record.text + record.extra)) throw Error('cards');
                        return `${record.text} | ${record.extra.replace(/\n/g, ' ')}`;
                    }).join('\n');
                } else if (type === 'open-answer') {
                    activity.content = content.split('\n').map(line => line.replace(/^\?/, '• ')).join('\n');
                } else if (['image', 'video', 'audio'].includes(type)) {
                    let url;
                    try { url = new URL(content); } catch { throw Error('url'); }
                    if (!['https:', 'http:'].includes(url.protocol)) throw Error('url');
                }
                if (activity.questions?.length > 100 || recordsSafeLength(activity) > 100) throw Error('limit');
                if (activity.prompt.length > 500 || activity.content.length > 20000 || activity.answer.length > 2000 || Object.values(settings).some(value => typeof value === 'string' && value.length > 2000) || activity.questions?.some(q => q.prompt.length > 500 || q.content.length > 20000 || q.answer.length > 2000)) throw Error('size');
                if (title.length > 1 && !['text', 'true-false', 'table'].includes(type)) throw Error('metadata');
                activities.push(activity); locations.push(raw.line);
            } catch (error) { errors.push(issue(error.message === 'Invalid URL' ? 'url' : error.message, raw.line, raw.name)); }
        }
        return { activities, errors, warnings, locations };
    }
    function recordsSafeLength(activity) {
        return ['vocabulary', 'flashcards', 'columns', 'match'].includes(activity.type) ? activity.content.split('\n').length : 0;
    }
    root.SlovaLessonImport = { parse, kinds, records, splitCells };
    if (typeof module !== 'undefined') module.exports = root.SlovaLessonImport;
})(typeof window !== 'undefined' ? window : globalThis);
