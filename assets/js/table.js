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
        const explicitHeaders=Array.isArray(settings?.tableHeaders);
        const inferred=!explicitHeaders&&rows.length>1&&rows[0].every(cell=>cell&&!/\{\{blank:/.test(cell));
        const headers=explicitHeaders?settings.tableHeaders.map(String):inferred?[...rows[0]]:[];
        const headerRow=!!(headers.length&&rows[0]&&headers.length===rows[0].length&&headers.every((cell,index)=>cell===rows[0][index]));
        return { rows, headers, headerRow, groups, answers:groups.map(group => group[0] || ''), blankCount:groups.length };
    }
    function checkResults(content, answer, settings, response) {
        const {groups} = parse(content,answer,settings);
        const values = Array.isArray(response) ? response : [response];
        const normalize = value => {
            const text = String(value ?? '').normalize('NFC').trim().replace(/\s+/g,' ');
            return settings?.caseSensitive ? text : text.toLocaleLowerCase();
        };
        return groups.map((group,index)=>index<values.length&&group.some(value=>normalize(value)===normalize(values[index])));
    }
    function check(content,answer,settings,response){const results=checkResults(content,answer,settings,response);return results.length>0&&Array.isArray(response)&&response.length===results.length&&results.every(Boolean);}
    function setHeaders(activity,value){
        const before=parse(activity.content,activity.answer,activity.settings);
        activity.settings={...activity.settings};
        if(before.headerRow){const lines=String(activity.content||'').split(/\r?\n/),first=lines.findIndex(line=>line.trim());lines.splice(first,1);activity.content=lines.join('\n');
            if(Array.isArray(activity.settings.hiddenCells))activity.settings.hiddenCells=activity.settings.hiddenCells.map(index=>index-before.rows[0].length).filter(index=>index>=0);
        }
        const names=String(value).split('/').map(name=>name.trim()).slice(0,50);
        activity.settings.tableHeaders=names.some(Boolean)?names:[];
    }
    const api = {parse, check, checkResults, setHeaders};
    globalThis.SlovaTable = api;
    if (typeof window !== 'undefined') window.SlovaTable = api;
    if (typeof module !== 'undefined') module.exports = api;
})();
