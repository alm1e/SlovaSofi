const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const context = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(require('node:path').join(__dirname, 'rich-editor.js'), 'utf8'), context);
const serialize = context.window.SlovaRichEditor.serialize;
const text = value => ({ nodeType: 3, textContent: value });
function element(tag, children, style = {}, attributes = {}) {
    const node = { nodeType: 1, tagName: tag.toUpperCase(), childNodes: children, style,
        classList: { contains: name => attributes.class === name },
        getAttribute: name => attributes[name] || null, ...attributes };
    children.forEach(child => { child.parentElement = node; });
    node.children = children.filter(child => child.nodeType === 1);
    return node;
}
test('visual formatting keeps sizes, colors and emphasis in the existing lesson format', () => {
    const node = element('span', [element('strong', [text('Slovenčina')])], {fontSize:'24px',color:'rgb(77, 171, 247)'});
    assert.equal(serialize(node), '[size=24][color=#4dabf7]**Slovenčina**[/color][/size]');
});
test('multiline formatting wraps each line so lesson rendering preserves it', () => {
    assert.equal(serialize(element('span',[text('one\ntwo')],{fontSize:'18px'})), '[size=18]one[/size]\n[size=18]two[/size]');
});
test('headings and ordered lists survive saving', () => {
    assert.equal(serialize(element('h2',[text('Heading')])), '## Heading\n');
    assert.equal(serialize(element('ol',[element('li',[text('First')]),element('li',[text('Second')])])), '1. First\n1. Second\n\n');
});
test('links only preserve HTTP and HTTPS targets', () => {
    assert.equal(serialize(element('a',[text('Site')],{}, {href:'https://example.com'})), '[Site](https://example.com)');
    assert.equal(serialize(element('a',[text('Unsafe')],{}, {href:'javascript:alert(1)'})), 'Unsafe');
});
test('browser style based bold and italic are preserved', () => {
    assert.equal(serialize(element('span',[text('Word')],{fontWeight:'700',fontStyle:'italic'})), '***Word***');
});
test('highlight, outline and alignment survive serialization', () => {
    assert.equal(serialize(element('p',[text('Word')],{textAlign:'center',backgroundColor:'rgb(255, 241, 156)'},{class:'activity-rich-outline'})), '[align=center][highlight=#fff19c][border]Word[/border][/highlight][/align]\n');
});

test('repeated formatting serializes only the effective size and color', () => {
    const node = element('span', [element('span', [text('Word')], {fontSize:'24px',color:'rgb(77, 171, 247)'})], {fontSize:'18px',color:'rgb(52, 114, 77)'});
    assert.equal(serialize(node), '[size=24][color=#4dabf7]Word[/color][/size]');
});

test('resetting a selected size overrides its formatted ancestor', () => {
    assert.equal(serialize(element('span', [element('span', [text('Word')], {fontSize:'16px'})], {fontSize:'24px'})), '[size=16]Word[/size]');
});
