(async () => {
    const report = document.getElementById('qa-log');
    report.style = 'position:fixed;inset:15px;z-index:999999;background:white;color:#111;overflow:auto;padding:20px;font:16px monospace;white-space:pre-wrap';
    const results = [];
    const assert = (ok, message) => { if (!ok) throw Error(message); };
    const run = async (name, fn) => { try { await fn(); results.push('PASS ' + name); } catch (e) { results.push('FAIL ' + name + ': ' + e.message); } report.textContent = results.join('\n'); };
    const canvas = document.createElement('canvas'); canvas.width = 64; canvas.height = 48;
    const ctx = canvas.getContext('2d');ctx.fillStyle = '#337733';ctx.fillRect(0, 0, 64, 48);ctx.fillStyle = '#ff5577';ctx.fillRect(20, 10, 30, 20);
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    const photo = new File([blob], 'photo.png', { type: 'image/png' });
    const stored = [];
    currentUser = { id: 'qa-teacher' };
    window.supabaseClient = { storage: { from: () => ({
        async upload(path, file, options) { stored.push({ path, file, options }); return { error: null }; },
        getPublicUrl(path) { return { data: { publicUrl: 'https://example.invalid/storage/v1/object/public/lesson-images/' + path } }; }
    }) } };
    const wait = async predicate => { for (let i = 0; i < 100; i++) { if (predicate()) return; await new Promise(resolve => setTimeout(resolve, 20)); } throw Error('Timed out'); };
    const paste = (target, file) => { const transfer = new DataTransfer(); if (file) transfer.items.add(file); else transfer.setData('text/plain', 'ordinary text');const event = new ClipboardEvent('paste', { clipboardData: transfer, bubbles: true, cancelable: true });target.dispatchEvent(event);return event; };
    const reset = type => { data.lessons[0].sections[0].activities = [{id:'qa-image',type,content:type==='text'?'Existing text':'',settings:{gapLayout:'cards'}}];openLessonEditor(data.lessons[0], 'qa-intro', 0);return pageContent.querySelector('.builder-block'); };
    await run('Native image decoder and JPEG upload', async () => { await uploadLessonImage(photo);assert(stored.at(-1).file.type === 'image/jpeg', 'Wrong content type'); });
    await run('Missing MIME type from PC file picker', async () => { await uploadLessonImage(new File([blob], 'PHOTO.PNG'));assert(stored.at(-1).file.type === 'image/jpeg', 'Missing MIME rejected'); });
    const bitmap = window.createImageBitmap;
    await run('Fallback without createImageBitmap', async () => { try { window.createImageBitmap = undefined;await uploadLessonImage(photo); } finally { window.createImageBitmap = bitmap; } });
    await run('Fallback after createImageBitmap rejects', async () => { try { window.createImageBitmap = async () => { throw Error('Unsupported'); };await uploadLessonImage(photo); } finally { window.createImageBitmap = bitmap; } });
    await run('Image block: paste stores bytes and updates draft', async () => { const root = reset('image'), field = root.querySelector('textarea[data-field="content"]');const count = stored.length;assert(paste(field, photo).defaultPrevented, 'Native paste not cancelled');await wait(() => !field.disabled && stored.length > count);assert(draftSections[0].activities[0].content.includes('lesson-images/'), 'Draft not updated'); });
    await run('Image block: PC file selection', async () => { const root = reset('image'), field = root.querySelector('textarea[data-field="content"]'), input = root.querySelector('[data-image-file]');const transfer = new DataTransfer();transfer.items.add(new File([blob], 'pc.PNG'));input.files = transfer.files;const count = stored.length;input.dispatchEvent(new Event('change'));await wait(() => stored.length > count && !field.disabled);assert(field.value.includes('lesson-images/'), 'No stored image URL'); });
    await run('Text editor: pasted image is saved as Markdown', async () => { const root = reset('text'), editor = root.querySelector('.visual-rich-editor');editor.focus();const range = document.createRange();range.selectNodeContents(editor);range.collapse(false);getSelection().removeAllRanges();getSelection().addRange(range);assert(paste(editor, photo).defaultPrevented, 'Image paste not handled');await wait(() => editor.contentEditable === 'true' && root.querySelector('textarea').value.includes('!['));assert(draftSections[0].activities[0].content.includes('lesson-images/'), 'Draft missing image');assert(root.querySelector('textarea').value.includes('Existing text'), 'Text lost'); });
    await run('Text editor: ordinary paste remains plain text', async () => { const root = reset('text'), editor = root.querySelector('.visual-rich-editor');editor.focus();const range = document.createRange();range.selectNodeContents(editor);getSelection().removeAllRanges();getSelection().addRange(range);editor.dispatchEvent(new Event('keyup'));paste(editor);assert(root.querySelector('textarea').value === 'ordinary text', 'Plain text paste changed'); });
    await run('Picture card: copied image, answer and stored content', async () => { const root = reset('fill-blank'), drop = root.querySelector('[data-picture-drop]');assert(paste(drop, photo).defaultPrevented, 'Card paste not handled');assert(!root.querySelector('[data-picture-new-preview]').hidden, 'No preview');root.querySelector('[data-picture-new-answer]').value = 'Nemecko';root.querySelector('[data-picture-add]').click();await wait(() => root.querySelector('[data-picture-list] img'));assert(draftSections[0].activities[0].content.includes('[Nemecko]'), 'Answer not saved');assert(draftSections[0].activities[0].content.includes('lesson-images/'), 'Image not stored'); });
    await run('No unhandled JavaScript errors', () => assert(!window.qaErrors.length, window.qaErrors.join('; ')));
    clearTimeout(lessonDraftAutosaveTimer);
    report.textContent = navigator.userAgent + '\n\n' + results.join('\n') + '\n\nTOTAL ' + results.length + '; FAIL ' + results.filter(line => line.startsWith('FAIL')).length;
})();
