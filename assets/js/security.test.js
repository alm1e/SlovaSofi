const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const test = require('node:test');
const path = require('node:path');
const read = name => fs.readFileSync(path.join(__dirname, name), 'utf8');

test('student role is rejected before any teacher workspace table is read', async () => {
    const window = {};
    vm.runInNewContext(read('teacher-data.js'), { window });
    const client = {
        rpc: async () => ({ data: { owner_id: 'student', role: 'student', permissions: {} } }),
        from: () => { throw Error('Must not read teacher tables'); }
    };
    await assert.rejects(window.teacherWorkspaceApi.loadWorkspace(client, 'student'),
        error => error.code === 'WORKSPACE_FORBIDDEN');
});

test('legacy workspace cleanup preserves authentication and unrelated preferences', () => {
    const source = read('teacher.js');
    const localStorage = { slovasofiTeacherSpace: 'legacy', 'slovasofiTeacherSpace:user:access': 'admin',
        'slovasofiTeacherSpace:user': 'private roster', 'sb-auth-token': 'session', siteLanguage: 'en' };
    Object.defineProperty(localStorage, 'removeItem', { value(key) { delete this[key]; } });
    vm.runInNewContext('const STORAGE_KEY="slovasofiTeacherSpace";'+
        source.slice(source.indexOf('function clearWorkspaceCache()'), source.indexOf('function loadData()'))+
        '\nclearWorkspaceCache();', { localStorage, console });
    assert.deepEqual(Object.keys(localStorage).sort(), ['sb-auth-token', 'siteLanguage']);
});

for (const outcome of ['offline', 'student']) {
    test(`teacher startup does not render cached data or permissions when ${outcome}`, async () => {
        const source = read('teacher.js');
        const renders = [], redirects = [];
        const failure = Object.assign(new Error(outcome), outcome === 'student' ? {code:'WORKSPACE_FORBIDDEN'} : {});
        const context = {
            window: { supabaseClient: { auth: { getSession: async () => ({ data: { session: { user: { id:'user' } } } }) } },
                teacherWorkspaceApi: { loadWorkspace: async () => { throw failure; } },
                location: { replace: url => redirects.push(url) } },
            data: { classes: ['cached private class'], lessons: [] }, workspaceAccess: { permissions: { manage_teachers: true } },
            updateUserIdentity() {}, clearWorkspaceCache() {}, translateStaticUI() {},
            render() { renders.push(JSON.parse(JSON.stringify({data: context.data, access:context.workspaceAccess}))); },
            location: { search: "", hash: "", href: "https://example.test/teacher.html" },
            URLSearchParams, URL,
            showToast() {}, t: value => value, console: {error() {}}
        };
        vm.createContext(context);
        vm.runInContext(source.slice(source.indexOf('async function loadCurrentUser()'),source.indexOf('function closePopover()')),context);
        await context.loadCurrentUser();
        assert.equal(renders.length, 1);
        assert.deepEqual(renders[0].data, {classes:[],lessons:[]});
        assert.deepEqual(renders[0].access.permissions, {});
        assert.deepEqual(redirects, outcome === 'student' ? ['student.html'] : []);
    });
}

test('lesson note renderer escapes stored HTML, event attributes and script tags', () => {
    const window = {};
    vm.runInNewContext(read('activity-ui.js'), {window});
    const html = window.SlovaActivityUI.renderNote('[info]\n<img src=x onerror=alert(1)>\n- **<script>alert(1)</script>**', '<svg onload=alert(1)>');
    assert.ok(!/<(?:img|script|svg)\b/i.test(html));
    assert.ok(html.includes('&lt;script&gt;'));
});

test('rich lesson text supports formatting while keeping raw HTML and unsafe links inert', () => {
    const window = {};
    vm.runInNewContext(read('activity-ui.js'), {window});
    const html = window.SlovaActivityUI.renderRichText('# Heading\n**bold** *italic* [unsafe](javascript:alert(1))\n![photo](https://example.test/photo.jpg)\n<script>alert(1)</script>');
    assert.ok(html.includes('<h1>Heading</h1>'));
    assert.ok(html.includes('<strong>bold</strong>'));
    assert.ok(html.includes('<em>italic</em>'));
    assert.ok(html.includes('<img src="https://example.test/photo.jpg"'));
    assert.ok(!/<script\b/i.test(html));
    assert.ok(!/href="javascript:/i.test(html));
});
