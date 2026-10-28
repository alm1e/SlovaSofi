const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
require('./fill-blanks.js');require('./table.js');const format=require('./exercise-format.js'),ready=require('./lesson-readiness.js');
test('cards accept bracket translations and preserve legacy formats and per-line answers',()=>{
    assert.deepEqual(format.cards('auto [машина]\ndom [дом]'),[{front:'auto',back:'машина'},{front:'dom',back:'дом'}]);
    assert.deepEqual(format.cards('auto | car\ndom: house'),[{front:'auto',back:'car'},{front:'dom',back:'house'}]);
    assert.deepEqual(format.cards('auto\ndom','car / house'),[{front:'auto',back:'car'},{front:'dom',back:'house'}]);
    assert.equal(ready.incomplete({type:'flashcards',content:'auto [машина]\ndom [дом]'}),false);
    assert.equal(ready.incomplete({type:'flashcards',content:'auto\ndom'}),true);
});
test('every answer field stays removed, including legacy blanks',()=>{
    assert.equal(format.answerFieldNeeded({type:'table',content:'Anna / [Bratislava] / [Košice]'}),false);
    assert.equal(format.answerFieldNeeded({type:'table',content:'Anna / [] / ___'}),false);
    assert.equal(format.answerFieldNeeded({type:'fill-blank',content:'Ja [bývam] tu.'}),false);
    assert.equal(format.answerFieldNeeded({type:'fill-blank',content:'Ja ___ tu.'}),false);
    assert.equal(format.answerFieldNeeded({type:'one-of-many',content:'Ja [bývam/bývaš] tu.'}),false);
    for(const type of ['drag-words','order-items','sentence-order','flashcards'])assert.equal(format.answerFieldNeeded({type,content:'one\ntwo'}),false);
});
test('source text defines sequence answers, including multiword tokens and numbered sentences',()=>{
    const activity={type:'drag-words',content:'Ja každý_deň čítam knihu.',answer:'incorrect'};
    format.contentEdited(activity);assert.equal(activity.answer,'Ja / každý deň / čítam / knihu.');assert.equal(activity.settings.answerFromContent,true);
    for(const type of ['order-items','sentence-order']){
        assert.equal(format.sequenceAnswer(type,'1. First sentence.\n\n2. Second sentence.'),'1 / 2');
        assert.equal(ready.incomplete({type,content:'First.\nSecond.'}),false);
    }
});

test('dropdown choices shuffle without mutating the answer source or fixing its displayed position',()=>{
    const source=['correct','wrong1','wrong2'],positions=new Set();let state=12345;
    const random=()=>{state=(state*1664525+1013904223)>>>0;return state/4294967296;};
    for(let i=0;i<60;i++){const shuffled=format.shuffleChoices(source,random);positions.add(shuffled.indexOf('correct'));assert.deepEqual([...shuffled].sort(),[...source].sort());}
    assert.deepEqual([...positions].sort(),[0,1,2]);assert.deepEqual(source,['correct','wrong1','wrong2']);
});
test('inline dropdown retains sentence context, local options and first-option answer per gap',()=>{
    assert.deepEqual(format.dropdown('Ja [bývam/bývaš] v [Bratislave/Košiciach].'),{content:'Ja ___ v ___.',choices:[['bývam','bývaš'],['Bratislave','Košiciach']],answers:['bývam','Bratislave']});
    assert.equal(format.dropdown('A [word] and []'),null);
    assert.equal(ready.incomplete({type:'one-of-many',content:'Ja [som/si] tu.'}),false);
});

test('bracket answers normalize every graded format without changing the authored source',()=>{
    const examples=[
        [{type:'multiple-choice',content:'[apple]\n[pear]\ncarrot'},a=>{assert.equal(a.answer,'apple / pear');assert.equal(a.settings.multipleAnswers,true);assert.equal(a.content,'apple\npear\ncarrot');}],
        [{type:'true-false',content:'Slon je malý [false]'},a=>{assert.equal(a.content,'Slon je malý');assert.equal(a.answer,'false');}],
        [{type:'match',content:'auto [машина]\ndom [дом]'},a=>assert.equal(a.content,'auto = машина\ndom = дом')],
        [{type:'columns',content:'jablko [Ovocie]\nmrkva [Zelenina]'},a=>assert.equal(a.content,'Ovocie: jablko\nZelenina: mrkva')],
        [{type:'vocabulary',content:'auto [машина] / https://example.com/car.mp3 <An example.>'},a=>assert.equal(a.content,'auto / машина / https://example.com/car.mp3 <An example.>')],
        [{type:'find-error',content:'Ja [bývať/bývam] v Bratislave.'},a=>{assert.equal(a.content,'Ja bývať v Bratislave.');assert.deepEqual(a.settings.errors,[{index:1,correction:'bývam'}]);}],
        [{type:'open-answer',content:'Kde bývaš? [Bývam v Bratislave.]'},a=>{assert.equal(a.content,'Kde bývaš?');assert.equal(a.answer,'Bývam v Bratislave.');}],
        [{type:'drag-words',content:'[Ja bývam v Bratislave.]'},a=>{assert.equal(a.content,'Ja bývam v Bratislave.');assert.equal(a.answer,'Ja / bývam / v / Bratislave.');}]
    ];
    for(const [activity,verify] of examples){const before=JSON.stringify(activity);verify(format.prepare(activity));assert.equal(JSON.stringify(activity),before);}
});

test('legacy answers become editable brackets and round-trip through the same grading model',()=>{
    const examples=[
        [{type:'fill-blank',content:'Ja ___ tu.',answer:'bývam'},'Ja [bývam] tu.'],
        [{type:'table',content:'Anna / ___',answer:'Bratislava'},'Anna / [Bratislava]'],
        [{type:'multiple-choice',content:'Bratislava\nKošice',answer:'Bratislava'},'[Bratislava]\nKošice'],
        [{type:'true-false',content:'A claim',answer:'true'},'A claim [true]'],
        [{type:'flashcards',content:'auto\ndom',answer:'car / house'},'auto [car]\ndom [house]'],
        [{type:'match',content:'auto = car'},'auto [car]'],
        [{type:'columns',content:'Fruit: apple'},'Fruit: [apple]']
    ];
    for(const [activity,expected] of examples)assert.equal(format.editorContent(activity),expected);
    const activity={type:'multiple-choice',content:'apple\npear',answer:'apple',settings:{options:[{text:'apple',correct:true}]}};
    format.applyContent(activity,'apple\npear');assert.equal(ready.incomplete(activity),true);
    format.applyContent(activity,'apple\n[pear]');assert.equal(format.prepare(activity).answer,'pear');assert.equal(ready.incomplete(activity),false);
});

test('editing a grouped answer cannot resurrect a removed legacy solution or erase another item',()=>{
    const first={id:'q1',content:'apple\npear',answer:''},second={id:'q2',content:'apple\npear',answer:''};
    const group={type:'listening-questions',questions:[first,second],settings:{options:[{text:'apple',correct:true},{text:'pear',correct:false}]}};
    format.applyQuestionContent(group,first,'apple\npear');
    assert.equal(ready.incomplete({...first,type:'multiple-choice',settings:group.settings}),true);
    assert.equal(second.content,'[apple]\npear');
    assert.equal(format.prepare({...second,type:'multiple-choice',settings:group.settings}).answer,'apple');
    format.applyQuestionContent(group,first,'apple\n[pear]');
    assert.equal(format.prepare({...first,type:'multiple-choice',settings:group.settings}).answer,'pear');
});

test('one category line expands into separate draggable words and preserves the original text',()=>{
    const activity={type:'columns',content:'Ovocie: [mlieko/papier/škola]'},before=JSON.stringify(activity);
    const prepared=format.prepare(activity);
    assert.deepEqual(prepared.settings.cards,[{text:'mlieko',category:'Ovocie'},{text:'papier',category:'Ovocie'},{text:'škola',category:'Ovocie'}]);
    assert.deepEqual(prepared.settings.categories,['Ovocie']);assert.equal(prepared.content,'Ovocie: mlieko\nOvocie: papier\nOvocie: škola');
    assert.equal(ready.incomplete(activity),false);assert.equal(JSON.stringify(activity),before);
    assert.deepEqual(format.prepare(prepared),prepared);
});

test('category lists mix with legacy entries, merge category names and retain repeated words',()=>{
    const activity={type:'columns',content:'Ovocie: [jablko / hruška / jablko]\nmrkva [Zelenina]\nZelenina: uhorka'};
    const parsed=format.prepare(activity);assert.equal(parsed.settings.cards.length,5);assert.deepEqual(parsed.settings.categories,['Ovocie','Zelenina']);
    assert.equal(format.editorContent(parsed),'Ovocie: [jablko/hruška/jablko]\nZelenina: [mrkva/uhorka]');
    assert.deepEqual(format.prepare({type:'columns',content:format.editorContent(parsed)}).settings.cards,parsed.settings.cards);
    const literal={type:'columns',content:'Expressions: and/or'};
    assert.equal(format.editorContent(literal),'Expressions: [and\\/or]');
    assert.equal(format.prepare({...literal,content:format.editorContent(literal)}).settings.cards[0].text,'and/or');
});

test('unfinished category lists and oversized banks are incomplete without reviving stale categories',()=>{
    for(const content of ['Ovocie: []','Ovocie: [','Ovocie: [jablko]\nZelenina: ['])assert.equal(ready.incomplete({type:'columns',content}),true);
    const activity={type:'columns',content:'Ovocie: []',settings:{columnsInvalid:true,categories:['Old']}};
    format.applyContent(activity,'Ovocie: [jablko/hruška]');assert.equal(ready.incomplete(activity),false);assert.deepEqual(format.prepare(activity).settings.categories,['Ovocie']);
    format.applyContent(activity,'New: word');assert.equal(ready.incomplete(activity),false);assert.equal('categories' in activity.settings,false);
    assert.equal(ready.incomplete({type:'columns',content:`Category: [${Array.from({length:101},(_,i)=>'word'+i).join('/')}]`}),true);
});

function deckHarness(){
    const ctx=vm.createContext({window:{}});vm.runInContext(fs.readFileSync(`${__dirname}/flashcard-deck.js`,'utf8'),ctx);
    const cards=Array.from({length:3},()=>({dataset:{rating:''},hidden:false})),previous={dataset:{deckStep:'-1'},handlers:{},addEventListener(k,f){this.handlers[k]=f;}},next={...previous,dataset:{deckStep:'1'},handlers:{}},count={},empty={},toggle={value:'false',getAttribute(){return this.value;}};
    const deck={dataset:{},handlers:{},focus(){this.focused=true;},addEventListener(k,f){this.handlers[k]=f;},closest(){return{querySelector:()=>toggle};},querySelectorAll(selector){return selector==='[data-deck-step]'?[previous,next]:cards;},querySelector(selector){return selector==='[data-deck-count]'?count:selector==='[data-deck-empty]'?empty:selector.includes('"-1"')?previous:next;}};
    ctx.window.SlovaFlashcardDeck.bind({querySelectorAll:()=>[deck]});
    return{api:ctx.window.SlovaFlashcardDeck,cards,previous,next,count,empty,toggle,deck};
}
test('deck shows one card and arrows navigate without changing card identities',()=>{
    const d=deckHarness();assert.deepEqual(d.cards.map(card=>card.hidden),[false,true,true]);assert.equal(d.count.textContent,'1 / 3');assert.equal(d.previous.disabled,true);
    d.next.handlers.click();assert.deepEqual(d.cards.map(card=>card.hidden),[true,false,true]);assert.equal(d.count.textContent,'2 / 3');
    d.next.handlers.click();assert.equal(d.next.disabled,true);d.previous.handlers.click();assert.equal(d.count.textContent,'2 / 3');
});
test('deck filtering preserves ratings and handles no remaining cards',()=>{
    const d=deckHarness();d.cards[0].dataset.rating='know';d.toggle.value='true';d.api.refresh(d.deck);assert.deepEqual(d.cards.map(card=>card.hidden),[true,false,true]);assert.equal(d.count.textContent,'1 / 2');
    d.cards.forEach(card=>card.dataset.rating='know');d.api.refresh(d.deck);assert.equal(d.count.textContent,'0 / 0');assert.equal(d.empty.hidden,false);assert.equal(d.next.disabled,true);
    d.toggle.value='false';d.api.refresh(d.deck);assert.equal(d.count.textContent,'1 / 3');assert.equal(d.cards[0].dataset.rating,'know');
});
test('deck swipes and arrow keys remain inside the cards instead of switching lesson sections',()=>{
    const d=deckHarness();d.deck.handlers.pointerdown({pointerType:'touch',clientX:200,clientY:20});d.deck.handlers.pointerup({clientX:80,clientY:25});assert.equal(d.count.textContent,'2 / 3');
    let prevented=false,stopped=false;d.deck.handlers.keydown({key:'ArrowRight',target:{closest:()=>false},preventDefault(){prevented=true;},stopPropagation(){stopped=true;}});assert.ok(prevented&&stopped&&d.deck.focused);assert.equal(d.count.textContent,'3 / 3');
});
