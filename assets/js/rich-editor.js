(function () {
    // Keep the existing lesson format; only the editing surface is visual.
    function serialize(node, inherited = {}) {
        const hex = (color = '') => {
            if (/^#[\da-f]{6}$/i.test(color)) return color;
            const rgb = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            return rgb ? '#' + rgb.slice(1).map(n => Number(n).toString(16).padStart(2, '0')).join('') : '';
        };
        if (node.nodeType === 3) {
            let text = node.textContent;
            const wrap = (a, b) => { text = text.split('\n').map(line => line ? a + line + b : line).join('\n'); };
            if (inherited.bold) wrap('**', '**');
            if (inherited.italic) wrap('*', '*');
            if (inherited.underline) wrap('[u]', '[/u]');
            if (inherited.strike) wrap('[s]', '[/s]');
            if (inherited.border) wrap('[border]', '[/border]');
            if (inherited.color) wrap(`[color=${inherited.color}]`, '[/color]');
            if (inherited.highlight) wrap(`[highlight=${inherited.highlight}]`, '[/highlight]');
            if (inherited.size) wrap(`[size=${inherited.size}]`, '[/size]');
            return text;
        }
        if (node.nodeType !== 1) return '';
        const tag = node.tagName.toLowerCase();
        const styles = { ...inherited };
        const color = hex(node.style.color || node.getAttribute('color') || '');
        const highlight = hex(node.style.backgroundColor);
        const size = parseInt(node.style.fontSize, 10);
        if (color) styles.color = color;
        if (highlight) styles.highlight = highlight;
        if ([12,14,16,18,20,24,28,32,36].includes(size)) styles.size = size;
        if (['b','strong'].includes(tag) || /^(bold|[7-9]00)$/.test(node.style.fontWeight)) styles.bold = true;
        if (['i','em'].includes(tag) || node.style.fontStyle === 'italic') styles.italic = true;
        if (tag === 'u') styles.underline = true;
        if (['s','strike'].includes(tag)) styles.strike = true;
        if (node.classList.contains('activity-rich-outline')) styles.border = true;
        let text = [...node.childNodes].map(child => serialize(child, styles)).join('');
        if (tag === 'br') return '\n';
        if (tag === 'img') return /^https?:\/\//.test(node.src) ? `![${node.alt.replace(/[\[\]()]/g, '')}](${node.src})` : '';
        if (tag === 'a' && /^https?:\/\//.test(node.href)) text = `[${text}](${node.href})`;
        if (/^h[123]$/.test(tag)) text = '#'.repeat(Number(tag[1])) + ' ' + text;
        if (tag === 'blockquote') text = text.trim().split('\n').map(line => '> ' + line).join('\n');
        if (tag === 'li') text = (node.parentElement.tagName === 'OL' ? '1. ' : '- ') + text.trim();
        if (tag === 'tr') text = '| ' + [...node.children].map(cell => [...cell.childNodes].map(child => serialize(child, styles)).join('')).join(' | ') + ' |';
        if (['left','center','right'].includes(node.style.textAlign)) text = text.trim().split('\n').map(line => `[align=${node.style.textAlign}]${line}[/align]`).join('\n');
        return /^(p|div|h[123]|blockquote|li|ul|ol|tr)$/.test(tag) ? text + '\n' : text;
    }
    function attach(root, source, render) {
        const toolbar = root.querySelector('.rich-text-toolbar');
        if (!source || !toolbar) return null;
        const editor = document.createElement('div');
        editor.className = 'visual-rich-editor activity-rich-text';
        editor.contentEditable = 'true';
        editor.setAttribute('role', 'textbox');
        editor.setAttribute('aria-multiline', 'true');
        editor.setAttribute('aria-label', source.closest('.form-field').querySelector('label').textContent);
        source.hidden = true;
        source.after(editor);
        let last = null, range = null, note = '';
        const refresh = () => {
            if (last === source.value) return;
            last = source.value;
            note = source.value.match(/^\s*\[(info|star)\]\s*\n?/i)?.[0] || '';
            editor.innerHTML = render(source.value.slice(note.length));
        };
        refresh();
        const saveRange = () => {
            const selection = window.getSelection();
            if (selection.rangeCount && editor.contains(selection.anchorNode)) range = selection.getRangeAt(0).cloneRange();
        };
        const sync = () => {
            source.value = note + [...editor.childNodes].map(serialize).join('').trimEnd();
            last = source.value;
            source.dispatchEvent(new Event('input', { bubbles: true }));
            saveRange();
        };
        editor.addEventListener('input', sync);
        ['keyup','mouseup','focusout'].forEach(name => editor.addEventListener(name, saveRange));
        const restore = () => {
            editor.focus();
            const selection = window.getSelection();
            if (!range || !editor.contains(range.commonAncestorContainer)) {
                range = document.createRange(); range.selectNodeContents(editor); range.collapse(false);
            }
            selection.removeAllRanges(); selection.addRange(range);
        };
        const command = (name, value = null) => { restore(); document.execCommand(name, false, value); sync(); };
        const inline = (style, className = '') => {
            restore();
            const span = document.createElement('span');
            Object.assign(span.style, style); span.className = className;
            if (range.collapsed) {
                let block = range.startContainer.nodeType === 1 ? range.startContainer : range.startContainer.parentElement;
                while (block.parentElement && block.parentElement !== editor && !/^(P|DIV|H[123]|LI)$/.test(block.tagName)) block = block.parentElement;
                if (!editor.contains(block)) block = editor;
                range.selectNodeContents(block);
            }
            if (range.collapsed) return;
            span.append(range.extractContents()); range.insertNode(span);
            range.selectNodeContents(span); sync();
        };
        toolbar.addEventListener('mousedown', event => {
            saveRange();
            if (event.target.closest('[data-rich-format], [data-rich-color]')) event.preventDefault();
        });
        toolbar.addEventListener('click', event => {
            const button = event.target.closest('[data-rich-format], [data-rich-color]');
            if (!button) return;
            event.preventDefault(); event.stopImmediatePropagation();
            if (button.dataset.richColor) {
                command('foreColor', button.dataset.richColor);
                toolbar.querySelectorAll('[data-rich-color]').forEach(item => item.classList.toggle('is-selected', item === button));
                return;
            }
            const format = button.dataset.richFormat;
            const commands = { '**':'bold', '*':'italic', '[u]':'underline', '[s]':'strikeThrough', list:'insertUnorderedList', numbered:'insertOrderedList' };
            if (commands[format]) command(commands[format]);
            else if (format === 'quote') command('formatBlock', 'blockquote');
            else if (/^#/.test(format)) command('formatBlock', 'h' + format.trim().length);
            else if (format.startsWith('[align=')) command({left:'justifyLeft',center:'justifyCenter',right:'justifyRight'}[format.slice(7,-1)]);
            else if (format === '[border]') inline({}, 'activity-rich-outline');
            else if (format === '[info]') { note = note ? '' : '[info]\n'; sync(); }
            else if (format === 'link') {
                const value = window.prompt('URL (https://…)', 'https://');
                if (value === null) return;
                try { const url = new URL(value); if (!['https:', 'http:'].includes(url.protocol)) throw Error(); command('createLink', url.href); }
                catch { window.alert('URL: http:// / https://'); }
            }
        }, true);
        toolbar.addEventListener('change', event => {
            const input = event.target;
            if (!input.matches('[data-rich-style], [data-rich-size], [data-rich-highlight]')) return;
            event.stopImmediatePropagation();
            if (input.hasAttribute('data-rich-style')) command('formatBlock', input.value === 'normal' ? 'p' : input.value);
            if (input.hasAttribute('data-rich-size')) inline({ fontSize: input.value ? input.value + 'px' : '16px' });
            if (input.hasAttribute('data-rich-highlight')) command('hiliteColor', input.value);
        }, true);
        root.querySelector('[data-rich-add-item]')?.addEventListener('click', event => {
            event.stopImmediatePropagation(); command('insertUnorderedList');
        }, true);
        editor.addEventListener('paste', event => {
            event.preventDefault(); command('insertText', event.clipboardData.getData('text/plain'));
        });
        return { refresh };
    }
    window.SlovaRichEditor = { attach, serialize };
})();
