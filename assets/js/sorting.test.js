const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const test = require('node:test');

// A small DOM surface to exercise the actual sorting event handlers and stored selects.
class Element {
    constructor(tag='div') {
        this.tag=tag; this.children=[]; this.handlers={}; this.attributes={}; this.dataset={};this.style={};
        const classes=new Set();
        this.classList={add:(...xs)=>xs.forEach(x=>classes.add(x)),remove:x=>classes.delete(x),contains:x=>classes.has(x),toggle:(x,on)=>on?classes.add(x):classes.delete(x)};
    }
    set className(value) { this._className=value; value.split(' ').forEach(x=>this.classList.add(x)); }
    get className() {return this._className || '';}
    set textContent(value) {this.text=String(value);}
    get textContent() {return (this.text||'')+this.children.map(x=>x.textContent).join('');}
    setAttribute(key,value) {this.attributes[key]=String(value);}
    getAttribute(key) {return this.attributes[key];}
    hasAttribute(key) {return key in this.attributes;}
    append(...children) {for(const child of children) {if(child.parentElement) child.parentElement.children=child.parentElement.children.filter(x=>x!==child); child.parentElement=this;this.children.push(child);}}
    addEventListener(type,fn) {(this.handlers[type] ||= []).push(fn);}
    dispatchEvent(event) {(this.handlers[event.type]||[]).forEach(fn=>fn(event));}
    click() {this.dispatchEvent({type:'click'});}
    focus() {this.focused=true;}
    contains(node) {return node===this || this.children.some(child=>child.contains(node));}
    cloneNode() {const result=new Element(this.tag);result.textContent=this.textContent;return result;}
}
function setup(saved=['','',''],matching=false) {
    const board=new Element();if(!matching)board.setAttribute('data-pair-reuse','');
    const rows=['jablko','mrkva','jablko'].map((word,index)=>{
        const row=new Element(), span=new Element('span'),select=new Element('select');span.textContent=word;
        select.options=[{value:'',textContent:'Choose'},{value:'Ovocie',textContent:'Ovocie'},{value:'Zelenina',textContent:'Zelenina'}];select.value=saved[index];
        row.select=select;row.querySelector=selector=>selector==='select'?select:span;row.append(span,select);return row;
    });
    board.append(...rows);board.querySelectorAll=()=>rows;
    const root={querySelectorAll:()=>[board]},window={};
    const context=vm.createContext({window,document:{createElement:tag=>new Element(tag)},localStorage:{getItem:()=> 'ru'},Event:class{constructor(type){this.type=type;}}});
    vm.runInContext(fs.readFileSync(`${__dirname}/activity-ui.js`,'utf8'),context);
    window.SlovaActivityUI.enhancePairing(root);
    const bank=board.children.find(x=>x.classList.contains('sorting-bank'));
    const grid=board.children.find(x=>x.classList.contains(matching?'matching-grid':'sorting-categories'));
    const chips=()=>[...bank.children,...grid.children.flatMap(zone=>zone.children)].filter(x=>x.classList.contains('sorting-chip'));
    return {board,rows,bank,grid,chips};
}
test('sorting supports selecting, moving between categories and returning to the bank',()=>{
    const {rows,bank,grid,chips}=setup();
    assert.equal(chips().length,3);
    assert.ok(rows.every(row=>row.hidden));
    const carrot=chips().find(chip=>chip.textContent==='mrkva');
    carrot.click();grid.children[1].children[0].click();
    assert.equal(rows[1].select.value,'Zelenina');
    assert.equal(carrot.parentElement,grid.children[1]);
    carrot.click();grid.children[0].children[0].click();
    assert.equal(rows[1].select.value,'Ovocie');
    carrot.click();bank.children[0].click();
    assert.equal(rows[1].select.value,'');
    assert.equal(carrot.parentElement,bank);
});

test('matching uses two card columns, restores links and replaces pairs without reusing a choice',()=>{
    const {board,rows,grid}=setup(['Ovocie','',''],true);
    const left=grid.children.filter(node=>node.classList.contains('matching-left'));
    const right=grid.children.filter(node=>node.classList.contains('matching-right'));
    const fruit=right.find(node=>node.textContent==='Ovocie');
    const vegetable=right.find(node=>node.textContent==='Zelenina');
    assert.equal(left.length,3);assert.equal(right.length,2);
    assert.equal(fruit.style.gridRow,'1');
    left[1].click();fruit.click();
    assert.equal(rows[0].select.value,'');assert.equal(rows[1].select.value,'Ovocie');
    assert.equal(fruit.style.gridRow,'2');
    vegetable.click();left[0].click();assert.equal(rows[0].select.value,'Zelenina');
    rows[1].dataset.pairResult='true';board.dispatchEvent({type:'pair-refresh'});
    assert.equal(left[1].classList.contains('is-correct'),true);assert.equal(fruit.classList.contains('is-correct'),true);
    left[1].click();left[1].click();
    assert.equal(rows[1].select.value,'');assert.equal(left[1].classList.contains('is-correct'),false);
});
test('matching drag works in both directions and retains response order',()=>{
    const {rows,grid}=setup(['','',''],true);
    const left=grid.children.filter(node=>node.classList.contains('matching-left'));
    const right=grid.children.filter(node=>node.classList.contains('matching-right'));
    const fruit=right.find(node=>node.textContent==='Ovocie');
    const vegetable=right.find(node=>node.textContent==='Zelenina');
    left[2].dispatchEvent({type:'dragstart',dataTransfer:{setData(){}}});
    fruit.dispatchEvent({type:'drop',preventDefault(){}});
    assert.equal(rows[2].select.value,'Ovocie');
    vegetable.dispatchEvent({type:'dragstart',dataTransfer:{setData(){}}});
    left[0].dispatchEvent({type:'drop',preventDefault(){}});
    assert.equal(rows[0].select.value,'Zelenina');assert.equal(rows[2].select.value,'Ovocie');
});
test('sorting restores saved answers and preserves separate identities for repeated words',()=>{
    const {rows,bank,grid,chips}=setup(['Ovocie','','Zelenina']);
    assert.equal(grid.children[0].children.filter(x=>x.classList.contains('sorting-chip')).length,1);
    assert.equal(grid.children[1].children.filter(x=>x.classList.contains('sorting-chip')).length,1);
    assert.equal(chips().length,3);
    let changes=0;rows[0].select.addEventListener('change',()=>changes++);
    const apple=grid.children[0].children.find(x=>x.classList.contains('sorting-chip'));
    apple.click();bank.children[0].click();
    assert.equal(changes,1);
    assert.equal(rows[0].select.value,'');assert.equal(rows[2].select.value,'Zelenina');
});
test('drag and drop updates the same response select and rejects drops without a local drag',()=>{
    const {rows,grid,chips}=setup();
    const carrot=chips().find(chip=>chip.textContent==='mrkva');
    const transfer={setData(){}};
    carrot.dispatchEvent({type:'dragstart',dataTransfer:transfer});
    grid.children[1].dispatchEvent({type:'drop',preventDefault(){}});
    assert.equal(rows[1].select.value,'Zelenina');
    assert.equal(carrot.parentElement,grid.children[1]);
    grid.children[0].dispatchEvent({type:'drop',preventDefault(){}});
    assert.equal(rows[1].select.value,'Zelenina');
});
