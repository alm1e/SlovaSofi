(function () {
    // Delimiters inside [answers / alternatives] belong to the answer, not the grid.
    function splitRow(line) {
        const outside = [];
        let depth = 0;
        for (let i = 0; i < line.length; i++) {
            if (line[i] === '\\') { i++; continue; }
            if (line[i] === '[') depth++;
            if (line[i] === ']') depth = Math.max(0, depth - 1);
            if (!depth && ['|', '/', '\t'].includes(line[i])) outside.push([i,line[i]]);
        }
        const delimiter = outside.some(([,char]) => char === '|') ? '|' : outside.some(([,char]) => char === '\t') ? '\t' : '/';
        const cells = [], cuts = outside.filter(([,char]) => char === delimiter);
        let start = 0;
        for (const [index] of cuts) { cells.push(line.slice(start,index)); start = index + 1; }
        cells.push(line.slice(start));
        return cells.map(cell => cell.trim().replace(/\\([/|])/g,'$1'));
    }
    function parse(content, answer = '', settings = {}) {
        const sourceRows = String(content || '').split(/\r?\n/).filter(line => line.trim()).map(splitRow);
        const width = Math.max(0,...sourceRows.map(row => row.length));
        const explicit = String(answer || '').split(/\s*\/\s*|\r?\n/).map(value => value.trim());
        const groups = [];
        let plainIndex = 0, cellIndex = 0;
        const rows = sourceRows.map(row => Array.from({length:width}, (_,column) => {
            let cell = row[column] || '';
            const index = cellIndex++;
            if (Array.isArray(settings?.hiddenCells) && settings.hiddenCells.includes(index) && !/___|\[[^\]]*\]/.test(cell)) cell = '___';
            return cell.replace(/___|\[([^\[\]\r\n]*)\]/g, (_, inline) => {
                const gapIndex = groups.length;
                let values;
                if (inline?.trim()) values = inline.split('/');
                else {
                    const configured = settings?.acceptedAnswers?.[gapIndex];
                    values = Array.isArray(configured) ? configured : [explicit[plainIndex] || ''];
                    plainIndex++;
                }
                groups.push(values.filter(value => typeof value === 'string').map(value => value.trim()).filter(Boolean));
                return `{{blank:${gapIndex}}}`;
            });
        }));
        return { rows, groups, answers:groups.map(group => group[0] || ''), blankCount:groups.length };
    }
    function check(content, answer, settings, response) {
        const {groups} = parse(content,answer,settings);
        const values = Array.isArray(response) ? response : [response];
        const normalize = value => {
            const text = String(value ?? '').normalize('NFC').trim().replace(/\s+/g,' ');
            return settings?.caseSensitive ? text : text.toLocaleLowerCase();
        };
        return groups.length > 0 && groups.length === values.length && groups.every((group,index) => group.some(value => normalize(value) === normalize(values[index])));
    }
    const api = {parse, check};
    globalThis.SlovaTable = api;
    if (typeof window !== 'undefined') window.SlovaTable = api;
    if (typeof module !== 'undefined') module.exports = api;
})();
