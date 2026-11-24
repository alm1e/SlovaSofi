(function(root){
    const copies={
        ru:['Разделы','Закрыть разделы','Провести урок','Завершить показ','Предыдущее задание','Следующее задание','Отменить','Повторить','Проверить урок','Задание'],
        ua:['Розділи','Закрити розділи','Провести урок','Завершити показ','Попереднє завдання','Наступне завдання','Скасувати','Повторити','Перевірити урок','Завдання'],
        en:['Sections','Close sections','Teach lesson','End presentation','Previous activity','Next activity','Undo','Redo','Check lesson','Activity'],
        sk:['Sekcie','Zavrieť sekcie','Viesť hodinu','Ukončiť prezentáciu','Predchádzajúca úloha','Nasledujúca úloha','Späť','Znova','Skontrolovať lekciu','Úloha'],
        kk:['Бөлімдер','Бөлімдерді жабу','Сабақ өткізу','Көрсетуді аяқтау','Алдыңғы тапсырма','Келесі тапсырма','Болдырмау','Қайталау','Сабақты тексеру','Тапсырма']
    };
    function createHistory(limit=60){
        let states=[],position=-1,time=0;
        const encode=value=>JSON.stringify(value);
        const shape=value=>JSON.stringify([...(value.sections||[]),...(value.homeworkSections||[])].map(section=>[section.id,(section.activities||[]).map(activity=>[activity.id,activity.type,(activity.questions||[]).map(question=>question.id)])]));
        return {
            reset(value){states=[encode(value)];position=0;time=0;},
            record(value,now=Date.now()){
                const next=encode(value);if(states[position]===next)return;
                states=states.slice(0,position+1);
                if(position>0&&now-time<600&&shape(JSON.parse(states[position]))===shape(value))states[position]=next;
                else{states.push(next);position++;if(states.length>limit){states.shift();position--;}}
                time=now;
            },
            undo(){if(position<=0)return null;time=0;return JSON.parse(states[--position]);},
            redo(){if(position>=states.length-1)return null;time=0;return JSON.parse(states[++position]);},
            get canUndo(){return position>0;},get canRedo(){return position<states.length-1;}
        };
    }
    let showing=false, index=0, context=null;
    function sync(options){
        context=options;
        const {container,editing=false,history,undo,redo,validate,language='en'}=options;
        if(!container)return;
        const t=copies[language]||copies.en;
        const lesson=container.querySelector('.lesson-workspace, .student-workspace-layout');
        if(!lesson){document.body.classList.remove('lesson-presenting','lesson-sections-open');showing=false;index=0;return;}
        if(editing)showing=false;
        let bar=container.querySelector('[data-lesson-tools]');
        if(!bar){bar=document.createElement('div');bar.dataset.lessonTools='';bar.className='lesson-tools';container.prepend(bar);}
        const panel=container.querySelector('.lesson-sections-panel, .student-sections-panel');
        if(panel){panel.id=panel.id||'lesson-sections-panel';panel.setAttribute('aria-label',t[0]);}
        bar.innerHTML=`<button type="button" class="button secondary small" data-tools-sections aria-controls="${panel?.id||''}" aria-expanded="${document.body.classList.contains('lesson-sections-open')}">${t[0]}</button>${!editing?`<button type="button" class="button secondary small" data-tools-present aria-pressed="${showing}">${t[showing?3:2]}</button>`:''}${editing&&history?`<button type="button" class="button secondary small" data-tools-undo ${history.canUndo?'':'disabled'}>${t[6]}</button><button type="button" class="button secondary small" data-tools-redo ${history.canRedo?'':'disabled'}>${t[7]}</button>`:''}${validate?`<button type="button" class="button secondary small" data-tools-validate>${t[8]}</button>`:''}<div class="lesson-presentation-controls" ${showing?'':'hidden'}><button type="button" class="button secondary small" data-tools-step="-1" aria-label="${t[4]}">←</button><span data-tools-count role="status"></span><button type="button" class="button secondary small" data-tools-step="1" aria-label="${t[5]}">→</button></div>`;
        bar.querySelector('[data-tools-sections]').onclick=()=>{
            const open=document.body.classList.toggle('lesson-sections-open');
            bar.querySelector('[data-tools-sections]').setAttribute('aria-expanded',String(open));
            if(open)panel?.querySelector('button')?.focus({preventScroll:true});
        };
        let close=panel?.querySelector('[data-tools-close]');
        if(panel&&!close){close=document.createElement('button');close.type='button';close.className='button secondary small';close.dataset.toolsClose='';panel.prepend(close);}
        if(close){close.textContent=t[1];close.onclick=()=>{document.body.classList.remove('lesson-sections-open');bar.querySelector('[data-tools-sections]').setAttribute('aria-expanded','false');bar.querySelector('[data-tools-sections]').focus({preventScroll:true});};}
        bar.querySelector('[data-tools-present]')?.addEventListener('click',()=>{showing=!showing;index=0;sync(context);});
        bar.querySelector('[data-tools-undo]')?.addEventListener('click',undo);
        bar.querySelector('[data-tools-redo]')?.addEventListener('click',redo);
        bar.querySelector('[data-tools-validate]')?.addEventListener('click',validate);
        bar.querySelectorAll('[data-tools-step]').forEach(button=>button.onclick=()=>step(Number(button.dataset.toolsStep)));
        apply();
    }
    function items(){return [...(context?.container.querySelectorAll('.lesson-preview-list > .preview-activity, .lesson-preview-list > .activity-note, .student-activity-list > *')||[])];}
    function apply(){
        document.body.classList.toggle('lesson-presenting',showing);
        const list=items();index=Math.max(0,Math.min(index,list.length-1));
        list.forEach((item,i)=>{item.classList.toggle('presentation-hidden',showing&&i!==index);});
        const count=context?.container.querySelector('[data-tools-count]');if(count)count.textContent=list.length?`${index+1} / ${list.length}`:'0 / 0';
        context?.container.querySelectorAll('[data-tools-step]').forEach(button=>button.disabled=!list.length||(Number(button.dataset.toolsStep)<0?index===0:index===list.length-1));
    }
    function step(direction){index+=direction;apply();}
    if(typeof document!=='undefined')document.addEventListener('keydown',event=>{
        if(event.key==='Escape'){
            if(document.body.classList.contains('lesson-sections-open')){event.preventDefault();context?.container.querySelector('[data-tools-close]')?.click();return;}
            if(showing){event.preventDefault();showing=false;sync(context);}return;
        }
        if(event.target.closest('input,textarea,select,[contenteditable="true"]'))return;
        if(showing&&['ArrowLeft','ArrowRight'].includes(event.key)){event.preventDefault();event.stopImmediatePropagation();step(event.key==='ArrowRight'?1:-1);}
        if(context?.editing&&(event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='z'){event.preventDefault();(event.shiftKey?context.redo:context.undo)?.();}
    },true);
    root.SlovaLessonTools={sync,createHistory};
    if(typeof module!=='undefined')module.exports=root.SlovaLessonTools;
})(typeof window!=='undefined'?window:globalThis);
