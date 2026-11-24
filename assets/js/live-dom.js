(function (root) {
    // Patch server-owned text without replacing media, focused inputs or teacher drafts.
    function key(node) {
        if (node.nodeType !== 1) return '';
        return node.id || [...node.attributes].filter(a => a.name.startsWith('data-') && !/status|response|bound/i.test(a.name)).map(a => a.name + '=' + a.value).join('|') || node.tagName + '.' + [...node.classList].filter(c => !c.startsWith('is-')).join('.');
    }
    function patch(target, source, inserted = []) {
        if (target.nodeType === 3) { if (target.data !== source.data) target.data = source.data; return inserted; }
        if (target.nodeType !== 1) return inserted;
        // These DOM nodes are owned by the teacher or browser, not realtime responses.
        if (target.matches('[data-photo-live-index]')) {
            target.querySelectorAll('[data-photo-editor]').forEach(editor=>{const replacement=[...source.querySelectorAll('[data-photo-editor]')].find(item=>item.dataset.photoUrl===editor.dataset.photoUrl);if(replacement&&replacement.dataset.photoBase!==editor.dataset.photoBase){editor.dataset.photoBase=replacement.dataset.photoBase;editor.dispatchEvent(new Event('photo-base-update'));}});
            return inserted;
        }
        if (target.matches('input,textarea,select,[contenteditable="true"],audio,video,[data-recording-player],.live-answer-review,[data-photo-live-index]')) return inserted;
        for (const attr of [...target.attributes]) if (!source.hasAttribute(attr.name) && !/bound/i.test(attr.name)) target.removeAttribute(attr.name);
        for (const attr of [...source.attributes]) if (target.getAttribute(attr.name) !== attr.value) target.setAttribute(attr.name, attr.value);
        const old = [...target.childNodes];
        let cursor = target.firstChild;
        for (const next of [...source.childNodes]) {
            const match = old.find(node => node.nodeType === next.nodeType && (node.nodeType !== 1 || key(node) === key(next)));
            if (match) {
                old.splice(old.indexOf(match), 1);
                if (match !== cursor) target.insertBefore(match, cursor);
                patch(match, next, inserted);
                cursor = match.nextSibling;
            } else {
                const clone = next.cloneNode(true);
                target.insertBefore(clone, cursor);
                if (clone.nodeType === 1) inserted.push(clone);
            }
        }
        old.forEach(node => node.remove());
        return inserted;
    }
    root.SlovaLiveDOM = { patch };
    if (typeof module !== 'undefined') module.exports = root.SlovaLiveDOM;
})(typeof window !== 'undefined' ? window : globalThis);
