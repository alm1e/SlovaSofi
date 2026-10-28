const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function setup(){
    const handlers={},doc={readyState:'loading',activeElement:null,addEventListener(name,fn){handlers[name]=fn;}};
    class Element{
        constructor(tag){this.tagName=tag.toUpperCase();this.nodeType=1;this.children=[];this.attributes={};this.dataset={};this.style={};this.handlers={};this.disabled=false;const classes=new Set();this.classList={add:value=>classes.add(value),contains:value=>classes.has(value)};}
        append(...items){items.forEach(item=>{item.remove();this.children.push(item);item.parentNode=this;});}
        insertBefore(item,before){item.remove();this.children.splice(this.children.indexOf(before),0,item);item.parentNode=this;}
        remove(){if(this.parentNode){this.parentNode.children=this.parentNode.children.filter(item=>item!==this);this.parentNode=null;}}
        replaceChildren(){this.children.forEach(item=>item.parentNode=null);this.children=[];}
        setAttribute(key,value){this.attributes[key]=String(value);}
        getAttribute(key){return this.attributes[key]??null;}
        addEventListener(name,fn){this.handlers[name]=fn;}
        dispatchEvent(event){this.events=(this.events||[]).concat(event.type);this.handlers[event.type]?.(event);}
        click(){this.handlers.click?.();}
        get isConnected(){return this===doc.body||!!this.parentNode?.isConnected;}
        get scrollHeight(){return this.children.length*44;}
        focus(){doc.activeElement=this;}
        contains(target){return this===target||this.children.some(item=>item.contains(target));}
        matches(selector){return selector==='select'?this.tagName==='SELECT':false;}
        closest(){return null;}
        querySelectorAll(selector){const items=this.children.flatMap(item=>[item,...item.querySelectorAll('*')]);if(selector==='*')return items;if(selector==='select')return items.filter(item=>item.tagName==='SELECT');return items.filter(item=>item.tagName==='BUTTON'&&(!selector.includes(':not(:disabled)')||!item.disabled)&&(!selector.includes('aria-selected="true"')||item.getAttribute('aria-selected')==='true'));}
        querySelector(selector){return this.querySelectorAll(selector)[0]||null;}
        getBoundingClientRect(){return{left:20,top:20,bottom:64,width:140};}
    }
    doc.createElement=tag=>new Element(tag);doc.body=new Element('body');doc.querySelectorAll=selector=>doc.body.querySelectorAll(selector);
    const select=new Element('select');select.options=[{textContent:'Choose',disabled:false},{textContent:'Bratislava',disabled:false},{textContent:'Košice',disabled:false}];select.selectedIndex=0;select.labels=[{textContent:'City'}];doc.body.append(select);
    let observer;const window={innerWidth:390,innerHeight:700,addEventListener(){}};
    const context=vm.createContext({window,document:doc,Event,MutationObserver:class{constructor(callback){this.callback=callback;observer=this;}observe(){}}});
    vm.runInContext(fs.readFileSync(`${__dirname}/select-ui.js`,'utf8'),context);handlers.DOMContentLoaded();
    return{window,doc,select,handlers,observer,get trigger(){return select.parentNode.children.find(item=>item.tagName==='BUTTON');}};
}
test('shared selects hide the native picker, use a body popup and preserve native form events',()=>{
    const s=setup();assert.ok(s.select.classList.contains('slova-select-native'));assert.equal(s.trigger.textContent,'Choose');assert.equal(s.trigger.getAttribute('aria-label'),'City');
    s.trigger.handlers.click();const menu=s.doc.body.children.find(item=>item.getAttribute('role')==='listbox');assert.ok(menu);assert.equal(menu.parentNode,s.doc.body);assert.equal(s.trigger.getAttribute('aria-expanded'),'true');
    menu.children[2].handlers.click();assert.equal(s.select.selectedIndex,2);assert.equal(s.trigger.textContent,'Košice');assert.deepEqual(s.select.events,['input','change']);assert.equal(menu.isConnected,false);
    const parent=s.select.parentNode;s.window.SlovaSelectUI.enhance(s.doc);assert.equal(s.select.parentNode,parent);
});
test('custom list supports keyboard selection, Escape, validation colors and disabled controls',()=>{
    const s=setup();let prevented=false;s.trigger.handlers.keydown({key:'ArrowDown',preventDefault(){prevented=true;},stopPropagation(){}});assert.ok(prevented);
    const menu=s.doc.body.children.find(item=>item.getAttribute('role')==='listbox');
    menu.handlers.keydown({key:'End',preventDefault(){},stopPropagation(){}});assert.equal(s.doc.activeElement,menu.children[2]);
    menu.handlers.keydown({key:' ',preventDefault(){},stopPropagation(){}});assert.equal(s.select.selectedIndex,2);s.trigger.handlers.click();
    menu.handlers.keydown({key:'Escape',preventDefault(){},stopPropagation(){}});assert.equal(menu.isConnected,false);assert.equal(s.doc.activeElement,s.trigger);
    s.select.classList.add('blank-incorrect');s.observer.callback([{target:s.select,addedNodes:[]}]);assert.equal(s.select.parentNode.dataset.validation,'incorrect');
    s.trigger.handlers.click();s.select.disabled=true;s.observer.callback([{target:s.select,addedNodes:[]}]);assert.equal(s.trigger.disabled,true);assert.equal(s.trigger.getAttribute('aria-expanded'),'false');
});
