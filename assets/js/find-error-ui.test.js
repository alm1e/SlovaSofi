const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const format=require('./exercise-format.js'),errors=format.findErrors;
const activity={type:'find-error',content:'Ja [bývať/bývam] v Bratislave.\nOna [ma/má] knihu.'};
const tick=()=>new Promise(resolve=>setImmediate(resolve));
function setup(){
    const doc={activeElement:null};
    const camel=value=>value.replace(/-([a-z])/g,(_,c)=>c.toUpperCase());
    class Element{
        constructor(tag='div',attributes={}){this.tag=tag;this.children=[];this.dataset={};this.attributes={};this.handlers={};this.value='';this.classes=new Set();this.classList={toggle:(name,on)=>on?this.classes.add(name):this.classes.delete(name),contains:name=>this.classes.has(name)};Object.entries(attributes).forEach(([k,v])=>this.setAttribute(k,v));}
        set className(value){this._className=value;this.classes=new Set(String(value).split(/\s+/));}
        get className(){return this._className||'';}
        setAttribute(name,value){this.attributes[name]=String(value);if(name.startsWith('data-'))this.dataset[camel(name.slice(5))]=String(value);}
        getAttribute(name){return this.attributes[name]??null;}
        append(...items){items.forEach(item=>{this.children.push(item);item.parent=this;});}
        insertBefore(item,next){const index=this.children.indexOf(next);if(index<0)this.append(item);else{this.children.splice(index,0,item);item.parent=this;}}
        addEventListener(name,fn){this.handlers[name]=fn;}
        matches(selector){const match=selector.match(/^\[([^=\]]+)(?:="([^\"]*)")?\]$/);return !!match&&this.attributes[match[1]]!==undefined&&(match[2]===undefined||this.attributes[match[1]]===match[2]);}
        closest(selector){for(let item=this;item;item=item.parent)if(item.matches(selector))return item;return null;}
        querySelectorAll(selector){return this.children.flatMap(item=>[...(item.matches(selector)?[item]:[]),...item.querySelectorAll(selector)]);}
        querySelector(selector){return this.querySelectorAll(selector)[0]||null;}
        focus(){doc.activeElement=this;}
        scrollIntoView(options){this.scrolled=options;}
        get firstElementChild(){return this.children[0];}
        set innerHTML(value){const index=value.match(/data-find-row="(\d+)"/)?.[1];assert.notEqual(index,undefined);const row=new Element('div',{'data-find-row':index}),input=new Element('input',{'data-find-input':index});input.value=value.match(/ value="([^\"]*)"/)?.[1]||'';row.append(input,new Element('button',{'data-find-check':index}),new Element('span',{'data-find-result':''}));this.children=[row];row.parent=this;}
    }
    doc.createElement=tag=>new Element(tag);
    const context=vm.createContext({window:{SlovaExerciseFormat:format},document:doc,structuredClone,crypto:require('node:crypto').webcrypto});vm.runInContext(fs.readFileSync(`${__dirname}/find-error-ui.js`,'utf8'),context);
    const ui=context.window.SlovaFindErrorUI,source=format.prepare(activity).content;
    const root=new Element('section',{'data-find-errors':'','data-find-language':'en','data-find-content':source,'data-find-prefix':'test','data-find-state':JSON.stringify(errors.state(activity,null))});
    const words=(source.match(/\S+/g)||[]).map((word,index)=>new Element('button',{'data-find-word':index}));root.append(...words);
    root.append(new Element('div',{'data-find-progress':''}),new Element('p',{'data-find-empty':''}),new Element('div',{'data-find-corrections':''}),new Element('p',{'data-find-message':''}));
    const container=new Element();container.append(root);let state=errors.state(activity,null),fail=false;const sent=[];
    ui.bind(container,{send(event){sent.push(event);if(fail){fail=false;throw Error('Network unavailable');}state=errors.event(activity,state,event);return Promise.resolve({errorState:state});}});
    const fire=(name,target,extra={})=>{const event={target,key:'',preventDefault(){this.prevented=true;},stopPropagation(){this.stopped=true;},...extra};root.handlers[name](event);return event;};
    const input=index=>root.querySelector(`[data-find-input="${index}"]`);
    return{ui,root,words,doc,sent,fire,input,failNext(){fail=true;}};
}

test('clicks add independent fields, mark correct words red, and Enter checks only the focused correction',async()=>{
    const s=setup();s.fire('click',s.words[0]);await tick();assert.ok(s.words[0].classList.contains('is-mistake'));assert.equal(s.input(0),null);
    s.fire('click',s.words[1]);await tick();assert.ok(s.input(1));assert.equal(s.doc.activeElement,s.input(1));
    s.fire('click',s.words[5]);await tick();const first=s.input(1),second=s.input(5);
    first.value='bývam';s.fire('input',first);const enter=s.fire('keydown',first,{key:'Enter'});assert.ok(enter.prevented&&enter.stopped);await tick();
    assert.ok(first.classList.contains('blank-correct'));assert.equal(s.doc.activeElement,second);assert.equal(second.scrolled.block,'nearest');
    second.value='wrong';s.fire('input',second);s.fire('keydown',second,{key:'Enter'});await tick();assert.ok(second.classList.contains('blank-incorrect'));assert.ok(first.classList.contains('blank-correct'));assert.equal(first.value,'bývam');
    second.value='má';s.fire('input',second);s.fire('keydown',second,{key:'Enter'});await tick();assert.ok(second.classList.contains('blank-correct'));assert.equal(s.ui.getState(s.root).complete,true);
    assert.match(s.root.querySelector('[data-find-progress]').textContent,/Mistakes: 2/);assert.ok(s.words[0].classList.contains('is-mistake'));assert.equal(s.sent.filter(event=>event.kind==='correction').length,3);
});

test('draft serialization omits grading flags and stale save responses preserve newer typing and focus',async()=>{
    const s=setup();s.fire('click',s.words[1]);await tick();const field=s.input(1);
    field.value='newer typing';s.fire('input',field);field.focus();
    const draft=JSON.parse(s.ui.draft(s.root));assert.deepEqual(draft,{version:2,drafts:{1:'newer typing'}});
    const state=errors.state(activity,s.ui.getState(s.root));state.fixes[1].text='older';s.ui.setState(s.root,state,JSON.stringify({drafts:{1:'older'}}));
    assert.equal(s.input(1),field);assert.equal(field.value,'newer typing');assert.equal(s.doc.activeElement,field);
});

test('IME Enter does not submit and a failed check retains the correction for a mobile-button retry',async()=>{
    const s=setup();s.fire('click',s.words[1]);await tick();const field=s.input(1);field.value='bývam';s.fire('input',field);
    const before=s.sent.length;s.fire('keydown',field,{key:'Enter',isComposing:true});await tick();assert.equal(s.sent.length,before);
    s.failNext();s.fire('keydown',field,{key:'Enter'});await tick();assert.equal(field.value,'bývam');assert.equal(field.readOnly,false);assert.match(s.root.querySelector('[data-find-message]').textContent,/Network/);
    s.fire('click',s.root.querySelector('[data-find-check="1"]'));await tick();assert.ok(field.classList.contains('blank-correct'));
});

test('rendering escapes authored HTML and creates unique correction labels for multiple exercise blocks',()=>{
    const s=setup(),state=errors.event(activity,null,{id:'one',kind:'select',index:1});
    const first=s.ui.render('<script>alert(1)</script> [word]',state,'en',2),second=s.ui.render('Other text',state,'en',2);
    assert.doesNotMatch(first,/<script>/);assert.match(first,/&lt;script&gt;/);
    const id=first.match(/<input id="([^\"]+)"/)[1];assert.ok(first.includes(`for="${id}"`));assert.equal(second.includes(`id="${id}"`),false);
});
