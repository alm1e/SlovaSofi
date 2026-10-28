const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
require('./fill-blanks.js');require('./table.js');const format=require('./exercise-format.js');
function setup(activity={type:'fill-blank',content:'',settings:{}}){
    const doc={activeElement:null},decode=value=>String(value).replace(/&(?:amp|lt|gt|quot|#39);/g,text=>({'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&#39;':"'"}[text]));
    class Element{
        constructor(tag='div',attrs={}){this.tagName=tag.toUpperCase();this.attributes={};this.dataset={};this.children=[];this.handlers={};this.value='';this.checked=false;this.disabled=false;this.hidden=false;this.isConnected=true;Object.entries(attrs).forEach(([key,value])=>this.setAttribute(key,value));}
        setAttribute(key,value){this.attributes[key]=String(value);if(key.startsWith('data-'))this.dataset[key.slice(5).replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]=String(value);if(key==='value')this.value=decode(value);if(key==='checked')this.checked=true;if(key==='hidden')this.hidden=true;}
        getAttribute(key){return this.attributes[key]??null;}
        hasAttribute(key){return key in this.attributes;}
        removeAttribute(key){delete this.attributes[key];}
        append(child){this.children.push(child);child.parent=this;}
        matches(selector){return selector.split(',').some(part=>{const tag=part.trim().match(/^[a-z]+/i)?.[0];return (!tag||this.tagName===tag.toUpperCase())&&[...part.matchAll(/\[([^=\]]+)(?:="([^"]*)")?\]/g)].every(([,key,value])=>this.hasAttribute(key)&&(value===undefined||this.getAttribute(key)===value));});}
        closest(selector){for(let item=this;item;item=item.parent)if(item.matches(selector))return item;return null;}
        querySelectorAll(selector){return this.children.flatMap(child=>[...(child.matches(selector)?[child]:[]),...child.querySelectorAll(selector)]);}
        querySelector(selector){return this.querySelectorAll(selector)[0]||null;}
        addEventListener(name,handler){(this.handlers[name]??=[]).push(handler);}
        setCustomValidity(message){this.validityMessage=message;}
        focus(){doc.activeElement=this;}
        set innerHTML(html){this.children=[];const stack=[this];for(const match of html.matchAll(/<\/?([a-z][\w-]*)([^>]*)>/gi)){const tag=match[1].toLowerCase();if(match[0].startsWith('</')){if(stack.length>1)stack.pop();continue;}const child=new Element(tag);for(const attr of match[2].matchAll(/([\w-]+)(?:="([^"]*)")?/g))child.setAttribute(attr[1],decode(attr[2]??''));stack.at(-1).append(child);if(!['input','img','br','hr'].includes(tag))stack.push(child);}}
    }
    const objectUrls=[],revoked=[];class TestURL extends URL{static createObjectURL(file){objectUrls.push(file);return 'blob:local-preview';}static revokeObjectURL(value){revoked.push(value);}}
    const context=vm.createContext({window:{SlovaExerciseFormat:format,SlovaFillBlanks:globalThis.SlovaFillBlanks},URL:TestURL});vm.runInContext(fs.readFileSync(`${__dirname}/picture-gap-editor.js`,'utf8'),context);const ui=context.window.SlovaPictureGapEditor;
    const container=new Element();container.innerHTML=ui.render(activity,'en','<textarea data-field="content"></textarea>');
    const editor=container.querySelector('[data-picture-gap-editor]'),source=editor.querySelector('textarea');source.value=format.editorContent({...activity,type:'fill-blank'});
    let failUpload=false,uploadHook=null,uploads=0;const changes=[];
    ui.bind(container,{settings:()=>activity.settings||{},change(element,update){changes.push(update);if(update.content!==undefined){format.applyContent(activity,update.content);source.value=update.content;}activity.settings={...activity.settings,...update.settings};},async upload(file){uploads++;if(failUpload){failUpload=false;throw Error('Upload failed');}return uploadHook?uploadHook(file):'https://test.invalid/uploaded.png';}});
    const find=selector=>editor.querySelector(selector);
    const fire=(type,target,at=target,extra={})=>{const event={target,currentTarget:at,preventDefault(){this.prevented=true;},...extra};const promises=(at.handlers[type]||[]).map(handler=>handler(event));event.currentTarget=null;return Promise.all(promises);};
    return {ui,activity,editor,source,find,fire,changes,doc,objectUrls,revoked,get uploads(){return uploads;},failNextUpload(){failUpload=true;},uploadWith(callback){uploadHook=callback;}};
}
test('picture mode adds a visible URL card, types an answer without losing the field, and preserves the rest of the task',async()=>{
    const s=setup({type:'fill-blank',content:'Ja [bývam] tu.',settings:{hints:['Keep']}});
    await s.fire('click',s.find('[data-picture-layout="cards"]'));assert.equal(s.activity.settings.useWordBank,true);assert.equal(s.find('[data-picture-source]').hidden,true);
    s.find('[data-picture-url]').value='https://test.invalid/flag.png';s.find('[data-picture-new-answer]').value='Nemecko/Germany';
    await s.fire('click',s.find('[data-picture-add]'));assert.equal(s.find('[data-picture-add]').disabled,false);assert.equal(s.ui.scan(s.source.value).cards.length,1);assert.match(s.source.value,/Ja \[bývam\] tu/);
    const input=s.find('[data-picture-answer]');input.focus();input.value='Nemecko/Deutschland';await s.fire('input',input,s.find('[data-picture-list]'));
    assert.equal(s.find('[data-picture-answer]'),input);assert.equal(s.doc.activeElement,input);assert.equal(s.ui.scan(s.source.value).cards[0].answer,'Nemecko/Deutschland');
    assert.equal(s.activity.settings.hints[0],'Keep');
    input.value='[invalid]';await s.fire('input',input,s.find('[data-picture-list]'));assert.ok(input.validityMessage);assert.equal(s.ui.scan(s.source.value).cards[0].answer,'Nemecko/Deutschland');
    await s.fire('click',s.find('[data-picture-source-toggle]'));assert.equal(s.find('[data-picture-source]').hidden,false);
});
test('file selection previews locally, upload failures retain the draft, and a retry succeeds with normal DOM event lifetimes',async()=>{
    const s=setup();await s.fire('click',s.find('[data-picture-layout="cards"]'));
    const file={type:'image/png',name:'flag.png'},picker=s.find('[data-picture-file]');picker.files=[file];await s.fire('change',picker);
    assert.equal(s.find('[data-picture-new-preview]').src,'blob:local-preview');assert.equal(s.find('[data-picture-new-preview]').hidden,false);
    s.find('[data-picture-new-answer]').value='Slovensko';s.failNextUpload();await s.fire('click',s.find('[data-picture-add]'));
    assert.equal(s.activity.content,'');assert.equal(s.find('[data-picture-new-answer]').value,'Slovensko');assert.match(s.find('[data-picture-message]').textContent,/Upload failed/);assert.equal(s.find('[data-picture-add]').disabled,false);
    await s.fire('click',s.find('[data-picture-add]'));assert.equal(s.uploads,2);assert.match(s.source.value,/uploaded.png/);assert.equal(s.find('[data-picture-new-answer]').value,'');assert.ok(s.revoked.includes('blob:local-preview'));
});
test('mode changes retain authored data, and remove/reorder target only the intended cards',async()=>{
    const s=setup({type:'fill-blank',content:'Heading\n![A](https://test.invalid/a.png) [A]\n![B](https://test.invalid/b.png) [B]',settings:{useWordBank:false}});
    const before=s.source.value;await s.fire('click',s.find('[data-picture-layout="text"]'));assert.equal(s.source.value,before);assert.equal(s.find('[data-picture-visual]').hidden,true);
    await s.fire('click',s.find('[data-picture-layout="cards"]'));assert.equal(s.find('[data-picture-bank]').checked,false);assert.equal(s.activity.settings.useWordBank,false);
    await s.fire('click',s.find('[data-picture-move="1"]'),s.find('[data-picture-list]'));assert.deepEqual(Array.from(s.ui.scan(s.source.value).cards,card=>card.answer),['B','A']);
    await s.fire('click',s.find('[data-picture-remove]'),s.find('[data-picture-list]'));assert.equal(s.ui.scan(s.source.value).cards[0].answer,'A');assert.ok(s.source.value.startsWith('Heading'));
});

test('replacing a picture preserves the current answer, and a late upload cannot replace another card after a source edit',async()=>{
    const s=setup({type:'fill-blank',content:'![A](https://test.invalid/a.png) [A]\n![B](https://test.invalid/b.png) [B]',settings:{}});
    let resolve;s.uploadWith(()=>new Promise(done=>{resolve=done;}));
    const picker=s.find('[data-picture-replace]');picker.files=[{type:'image/png'}];const pending=s.fire('change',picker,s.find('[data-picture-list]'));
    const input=s.find('[data-picture-answer]');input.value='Updated';await s.fire('input',input,s.find('[data-picture-list]'));
    resolve('https://test.invalid/replaced.png');await pending;assert.equal(s.ui.scan(s.source.value).cards[0].answer,'Updated');assert.equal(s.ui.scan(s.source.value).cards[0].url,'https://test.invalid/replaced.png');
    const next=s.find('[data-picture-replace]');next.files=[{type:'image/png'}];const late=s.fire('change',next,s.find('[data-picture-list]'));
    s.source.value='![B](https://test.invalid/b.png) [B]';resolve('https://test.invalid/late.png');await late;
    assert.doesNotMatch(s.source.value,/late.png/);assert.match(s.find('[data-picture-card-error]').textContent,/changed during upload/);
});
