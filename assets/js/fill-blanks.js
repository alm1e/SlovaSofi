(function () {
    // Explicit answers belong to ___ only. Bracketed answers stay next to their text.
    function parse(content, answer = '', settings = {}) {
        const explicit = String(answer || '').split(/\s*\/\s*|\r?\n/).map(value => value.trim());
        const configured = Array.isArray(settings?.acceptedAnswers) ? settings.acceptedAnswers : [];
        const parts = [''], groups = [];
        let cursor = 0, plainIndex = 0;
        const source = String(content || '');
        const tokens = /\\\[|\\\]|___|\[([^\[\]\r\n]+)\]/g;
        for (const match of source.matchAll(tokens)) {
            parts[parts.length - 1] += source.slice(cursor, match.index);
            cursor = match.index + match[0].length;
            if (match[0].startsWith('\\')) { parts[parts.length - 1] += match[0].slice(1); continue; }
            const inline = match[1];
            let values;
            if (inline !== undefined) values = inline.split('/');
            else {
                values = Array.isArray(configured[plainIndex]) ? configured[plainIndex] : [explicit[plainIndex] || ''];
                plainIndex += 1;
            }
            groups.push(values.filter(value => typeof value === 'string').map(value => value.trim()).filter(Boolean));
            parts.push('');
        }
        parts[parts.length - 1] += source.slice(cursor);
        return { parts, content: parts.join('___'), groups, answers: groups.map(group => group[0] || '') };
    }
    function check(content, answer, settings, response) {
        const { groups } = parse(content, answer, settings);
        const normalize = value => {
            const text = String(value ?? '').normalize('NFC').trim().replace(/\s+/g, ' ');
            return settings?.caseSensitive ? text : text.toLocaleLowerCase();
        };
        const values = Array.isArray(response) ? response : [response];
        return groups.map((group, index) => group.some(value => normalize(value) === normalize(values[index])));
    }
    function insert(content, answer, settings, start, end) {
        const selected = String(content).slice(start, end).trim();
        const before = String(content).slice(0, start);
        const after = String(content).slice(end);
        if (!selected || /___|[\[\]\r\n]/.test(selected)
            || before.lastIndexOf('[') > before.lastIndexOf(']')
            || (before.endsWith('_') && selected.startsWith('_')) || (selected.endsWith('_') && after.startsWith('_'))) return null;
        // Bracket answers do not occupy slots in the external answer list.
        const plainIndex = (before.replace(/\[[^\[\]\r\n]*\]/g, '').match(/___/g) || []).length;
        const answers = String(answer || '').trim() ? String(answer).split(/\s*\/\s*|\r?\n/).map(value => value.trim()) : [];
        while (answers.length < plainIndex) answers.push('');
        answers.splice(plainIndex, 0, selected);
        const nextSettings = { ...settings };
        if (Array.isArray(settings?.acceptedAnswers)) {
            const groups = settings.acceptedAnswers.map(group => Array.isArray(group) ? [...group] : []);
            while (groups.length < plainIndex) groups.push([]);
            groups.splice(plainIndex, 0, [selected]); nextSettings.acceptedAnswers = groups;
        }
        return { content: before + '___' + after, answer: answers.join(' / '), settings: nextSettings };
    }
    const api = { parse, check, insert };
    globalThis.SlovaFillBlanks = api;
    if (typeof window !== 'undefined') window.SlovaFillBlanks = api;
    if (typeof module !== 'undefined') module.exports = api;
})();
