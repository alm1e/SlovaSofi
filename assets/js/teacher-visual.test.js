const fs = require('node:fs');
const vm = require('node:vm');
const test = require('node:test');
const assert = require('node:assert/strict');
const source = fs.readFileSync(`${__dirname}/teacher.js`, 'utf8');
function readFunction(name) {
    const start = source.indexOf(`function ${name}(`);
    return source.slice(start, source.indexOf('\n}', start) + 2);
}
test('every activity has distinct artwork, including the five newer types', () => {
    const context = vm.createContext({});
    vm.runInContext(readFunction('activityIllustration'), context);
    const typesStart = source.indexOf('const activityTypes =');
    vm.runInContext(source.slice(typesStart, source.indexOf('\n];', typesStart) + 3) + ';this.types = activityTypes;', context);
    assert.equal(new Set(context.types.map(({ id }) => context.activityIllustration(id))).size, 21);
});
test('administrators remain visible with presence but without teacher permission controls', () => {
    const context = vm.createContext({
        workspaceAccess: { staff: [{ id: 'admin', name: 'School founder', role: 'admin', permissions: {} }, { id: 'teacher', name: 'Teacher', role: 'teacher', permissions: {} }] },
        staffText: key => key, currentLanguage: 'en', roleLabels: { admin: { en: 'Administrator' } },
        permissionLabels: [], presenceBadge: id => `presence:${id}`, initialsFor: name => name[0]
    });
    vm.runInContext(readFunction('escapeHtml') + readFunction('renderStaff'), context);
    const html = context.renderStaff();
    assert.match(html, /Administrator/);
    assert.match(html, /presence:admin/);
    assert.doesNotMatch(html, /data-action="remove-teacher" data-id="admin"/);
    assert.match(html, /data-action="edit-teacher" data-id="teacher"/);
});
