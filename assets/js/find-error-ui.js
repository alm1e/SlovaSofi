(function(root){
    'use strict';
    let sequence=0;
    const widgets=new WeakMap(),core=()=>root.SlovaExerciseFormat.findErrors;
    const labels={
        ru:['Нажимайте на ошибочные слова. Исправляйте каждое слово ниже и нажимайте Enter.','Исправления','Исправлено','Ошибок','Проверить','Верно','Попробуйте ещё раз','Это слово написано правильно. Клик сохранён как ошибка.','Введите исправление.','Сохранено','Не удалось сохранить. Повторите попытку.','Нажмите на ошибочное слово в тексте — здесь появится поле исправления.'],
        ua:['Натискайте на помилкові слова. Виправляйте кожне слово нижче й натискайте Enter.','Виправлення','Виправлено','Помилок','Перевірити','Правильно','Спробуйте ще раз','Це слово написане правильно. Натискання збережено як помилку.','Введіть виправлення.','Збережено','Не вдалося зберегти. Спробуйте ще раз.','Натисніть на помилкове слово в тексті — тут з’явиться поле виправлення.'],
        en:['Select incorrect words. Correct each word below and press Enter.','Corrections','Corrected','Mistakes','Check','Correct','Try again','This word is correct. The click was recorded as a mistake.','Enter a correction.','Saved','Could not save. Please retry.','Select an incorrect word in the text to add a correction field here.'],
        sk:['Kliknite na chybné slová. Každé slovo opravte nižšie a stlačte Enter.','Opravy','Opravené','Chyby','Skontrolovať','Správne','Skúste znova','Toto slovo je správne. Kliknutie sa uložilo ako chyba.','Zadajte opravu.','Uložené','Nepodarilo sa uložiť. Skúste znova.','Kliknite na chybné slovo v texte a tu sa zobrazí pole na opravu.'],
        kk:['Қате сөздерді басыңыз. Төменде әр сөзді түзетіп, Enter басыңыз.','Түзетулер','Түзетілді','Қателер','Тексеру','Дұрыс','Қайта көріңіз','Бұл сөз дұрыс жазылған. Басу қате ретінде сақталды.','Түзетуді енгізіңіз.','Сақталды','Сақтау мүмкін болмады. Қайталап көріңіз.','Мәтіндегі қате сөзді басыңыз, осында түзету өрісі пайда болады.']
    };
    const escape=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[char]);
    const empty=total=>({version:2,total,selected:{},fixes:{},events:[],complete:false});
    function view(response,total=0){const state=core().parse(response);return state?.version===2?state:empty(total);}
    function row(index,word,text,copy,prefix){return `<div class="find-correction-row" data-find-row="${index}"><label class="find-correction-label" for="${prefix}-${index}">${escape(word)}</label><input id="${prefix}-${index}" class="find-correction-input" data-find-input="${index}" value="${escape(text)}" maxlength="500" enterkeyhint="done" autocomplete="off" aria-label="${escape(copy[1]+': '+word)}"><button type="button" class="button secondary small" data-find-check="${index}">${escape(copy[4])}</button><span class="find-correction-result" data-find-result aria-live="polite"></span></div>`;}
    function render(content,response,language='en',total=0){
        const prefix=`find-${++sequence}`,copy=labels[language]||labels.en,state=view(response,total),words=String(content||'').match(/\S+/g)||[];let index=0;
        const prose=(String(content||'').match(/\S+|\s+/g)||[]).map(word=>/^\s+$/.test(word)?escape(word):`<button type="button" class="find-word" data-find-word="${index++}" aria-pressed="false">${escape(word)}</button>`).join('');
        return `<section class="find-errors" data-find-errors data-find-language="${escape(language)}" data-find-prefix="${prefix}" data-find-content="${escape(content)}" data-find-state="${escape(JSON.stringify(state))}"><p class="find-instruction">${escape(copy[0])}</p><div class="find-error-text">${prose}</div><div class="find-progress" data-find-progress role="status" aria-live="polite"></div><h4>${escape(copy[1])}</h4><p class="find-empty" data-find-empty>${escape(copy[11])}</p><div class="find-corrections" data-find-corrections>${Object.keys(state.selected||{}).filter(key=>state.selected[key]===true&&words[Number(key)]).sort((a,b)=>Number(a)-Number(b)).map(key=>row(key,words[Number(key)],state.fixes?.[key]?.text||'',copy,prefix)).join('')}</div><p class="find-message" data-find-message role="status" aria-live="polite"></p></section>`;
    }
    function status(widget){const stats=core().stats(widget.state);widget.root.querySelector('[data-find-progress]').textContent=`${widget.copy[2]}: ${stats.corrected} / ${widget.state.total||0} · ${widget.copy[3]}: ${stats.mistakes}`;}
    function syncRow(widget,index){
        const row=widget.root.querySelector(`[data-find-row="${index}"]`);if(!row)return;const fix=widget.state.fixes[index]||{},input=row.querySelector('[data-find-input]'),result=row.querySelector('[data-find-result]');
        if(!widget.dirty.has(String(index)))input.value=fix.text||'';
        input.readOnly=widget.pending.has(Number(index));row.querySelector('[data-find-check]').disabled=widget.pending.has(Number(index));
        input.classList.toggle('blank-correct',fix.correct===true);input.classList.toggle('blank-incorrect',fix.correct===false);input.setAttribute('aria-invalid',String(fix.correct===false));
        result.textContent=fix.correct===true?widget.copy[5]:fix.correct===false?widget.copy[6]:'';result.className=`find-correction-result ${fix.correct===true?'is-correct':fix.correct===false?'is-incorrect':''}`;
    }
    function patch(widget,state){
        widget.state=structuredClone(state);
        widget.dirty.forEach((value,index)=>{if(widget.state.fixes[index]){const fix=widget.state.fixes[index];fix.text=value;fix.correct=fix.checkedText===value?fix.checkedCorrect:null;}});
        const list=widget.root.querySelector('[data-find-corrections]');
        widget.root.querySelectorAll('[data-find-word]').forEach(button=>{const index=Number(button.dataset.findWord),selected=widget.state.selected[index];button.classList.toggle('is-found',selected===true);button.classList.toggle('is-mistake',selected===false);button.classList.toggle('is-fixed',widget.state.fixes[index]?.correct===true);button.disabled=widget.pending.has(index);button.setAttribute('aria-pressed',String(selected!==undefined));button.title=selected===false?widget.copy[7]:'';});
        const indices=Object.keys(widget.state.selected).filter(key=>widget.state.selected[key]===true).map(Number).sort((a,b)=>a-b);
        for(const index of indices){if(!widget.root.querySelector(`[data-find-row="${index}"]`)){
            const holder=document.createElement('div');holder.innerHTML=row(index,widget.words[index],widget.state.fixes[index]?.text||'',widget.copy,widget.root.dataset.findPrefix);
            const next=[...list.querySelectorAll('[data-find-row]')].find(item=>Number(item.dataset.findRow)>index);list.insertBefore(holder.firstElementChild,next||null);
        }syncRow(widget,index);}
        widget.root.querySelector('[data-find-empty]').hidden=indices.length>0;status(widget);
    }
    function setState(element,state,draft){const widget=widgets.get(element);if(!widget)return;const sent=core().parse(draft)?.drafts||{};Object.entries(sent).forEach(([index,value])=>{if(widget.dirty.get(index)===value)widget.dirty.delete(index);});patch(widget,state);}
    function draft(element){const widget=widgets.get(element),drafts={};element?.querySelectorAll('[data-find-input]').forEach(input=>{drafts[input.dataset.findInput]=input.value;});return JSON.stringify({version:2,drafts});}
    function getState(element){return widgets.get(element)?.state||view(element?.dataset.findState);}
    async function act(widget,kind,index){
        if(widget.pending.has(index))return;
        const input=widget.root.querySelector(`[data-find-input="${index}"]`),value=input?.value.trim()||'';
        if(kind==='select'&&Object.prototype.hasOwnProperty.call(widget.state.selected,index)){if(widget.state.selected[index]===true)input?.focus({preventScroll:true});return;}
        if(kind==='correction'&&!value){const row=widget.root.querySelector(`[data-find-row="${index}"]`);if(row)row.querySelector('[data-find-result]').textContent=widget.copy[8];input?.focus();return;}
        widget.pending.add(index);patch(widget,widget.state);
        try{
            const result=await widget.hooks.send({id:crypto.randomUUID(),kind,index,...(kind==='correction'?{value}:{})},widget.root);
            if(kind==='correction'&&widget.dirty.get(String(index))?.trim()===value)widget.dirty.delete(String(index));
            widget.pending.delete(index);patch(widget,result.errorState||result);
            widget.root.querySelector('[data-find-message]').textContent=kind==='select'&&widget.state.selected[index]===false?widget.copy[7]:widget.copy[9];
            if(kind==='select'&&widget.state.selected[index]===true)widget.root.querySelector(`[data-find-input="${index}"]`)?.focus({preventScroll:true});
            if(kind==='correction'&&widget.state.fixes[index]?.correct===true){const next=[...widget.root.querySelectorAll('[data-find-input]')].find(field=>Number(field.dataset.findInput)>index&&widget.state.fixes[field.dataset.findInput]?.correct!==true);next?.focus({preventScroll:true});next?.scrollIntoView({block:'nearest'});}
        }catch(error){widget.pending.delete(index);patch(widget,widget.state);widget.root.querySelector('[data-find-message]').textContent=error?.message||widget.copy[10];}
    }
    function bind(container,hooks){container.querySelectorAll('[data-find-errors]').forEach(element=>{
        if(widgets.has(element))return;const language=element.dataset.findLanguage,widget={root:element,state:view(element.dataset.findState),copy:labels[language]||labels.en,words:element.dataset.findContent.match(/\S+/g)||[],pending:new Set(),dirty:new Map(),hooks};widgets.set(element,widget);delete element.dataset.findState;patch(widget,widget.state);
        element.addEventListener('click',event=>{const word=event.target.closest('[data-find-word]'),check=event.target.closest('[data-find-check]');if(word)act(widget,'select',Number(word.dataset.findWord));if(check)act(widget,'correction',Number(check.dataset.findCheck));});
        element.addEventListener('keydown',event=>{if(event.key==='Enter'&&!event.isComposing&&event.target.matches('[data-find-input]')){event.preventDefault();event.stopPropagation();act(widget,'correction',Number(event.target.dataset.findInput));}});
        element.addEventListener('input',event=>{const input=event.target;if(!input.matches('[data-find-input]'))return;const index=input.dataset.findInput,fix=widget.state.fixes[index];widget.dirty.set(index,input.value);fix.text=input.value;fix.correct=fix.checkedText===input.value?fix.checkedCorrect:null;syncRow(widget,index);status(widget);});
    });}
    function summary(content,response,language){const state=view(response),copy=labels[language]||labels.en,words=String(content||'').match(/\S+/g)||[];return Object.keys(state.selected).sort((a,b)=>Number(a)-Number(b)).map(index=>state.selected[index]===false?`${words[index]} ×`:`${words[index]} → ${state.fixes[index]?.text||'…'} ${state.fixes[index]?.correct===true?'✓':state.fixes[index]?.correct===false?'×':'…'}`).concat(`${copy[3]}: ${core().stats(state).mistakes}`).join('\n');}
    root.SlovaFindErrorUI={render,bind,setState,draft,getState,summary};
})(window);
