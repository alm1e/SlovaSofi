(function(root){
    const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const copies={ru:['Настройки задания','Добавить строку','Удалить','Текст / слово','Перевод / ответ','Правильный','Подсказки (по одной в строке)','Учитывать регистр','Показать расшифровку','Расшифровка аудио','Нажмите на изображение, чтобы добавить метку','Метка','Произношение (URL аудио)'],ua:['Налаштування завдання','Додати рядок','Видалити','Текст / слово','Переклад / відповідь','Правильний','Підказки (кожна з нового рядка)','Враховувати регістр','Показати розшифрування','Розшифрування аудіо','Натисніть зображення, щоб додати мітку','Мітка','Вимова (URL аудіо)'],en:['Activity settings','Add row','Remove','Text / word','Translation / answer','Correct','Hints (one per line)','Case sensitive','Show transcript','Audio transcript','Click the image to add a marker','Marker','Pronunciation (audio URL)']};
    function bind(host,activity,changed,language='en'){
        if(host.querySelector('[data-visual-settings]'))return;
        const t=copies[language]||copies.en,type=activity.type;
        if(!['multiple-choice','one-of-many','match','vocabulary','phrase-list','flashcards','order-items','sentence-order','columns','fill-blank','table','open-answer','find-error','drag-words','audio','video','listening-questions','interactive-image'].includes(type))return;
        const panel=document.createElement('section');panel.dataset.visualSettings='';panel.className='visual-activity-settings';
        panel.innerHTML=`<h4>${t[0]}</h4>`;host.append(panel);
        const settings=()=>activity.settings||(activity.settings={});
        const emit=()=>changed();
        const field=(label,value,onInput,kind='text')=>{
            const wrapper=document.createElement('label');wrapper.className='form-field';const span=document.createElement('span');span.textContent=label;
            const input=document.createElement(kind==='textarea'?'textarea':'input');if(kind!=='textarea')input.type=kind;
            if(kind==='checkbox')input.checked=!!value;else input.value=value??'';
            input.addEventListener(kind==='checkbox'?'change':'input',()=>{onInput(kind==='checkbox'?input.checked:input.value);emit();});wrapper.append(span,input);return wrapper;
        };
        if(type==='listening-questions'){
            panel.append(field(language==='ru'?'Число прослушиваний (0 — без ограничения)':language==='ua'?'Кількість прослуховувань (0 — без обмежень)':'Listening limit (0 for unlimited)',settings().maxPlays||0,value=>settings().maxPlays=Math.max(0,Math.min(100,Math.floor(Number(value)||0))),'number'));
            panel.append(field(language==='ru'?'Показать расшифровку после ответов':language==='ua'?'Показати розшифрування після відповідей':'Show transcript after answers',settings().transcriptAfterSubmit===true,value=>settings().transcriptAfterSubmit=value,'checkbox'));
        }
        if(['fill-blank','table','open-answer','find-error','drag-words'].includes(type))panel.append(field(t[7],settings().caseSensitive,value=>settings().caseSensitive=value,'checkbox'));
        if(['audio','video','listening-questions'].includes(type)){
            panel.append(field(t[9],settings().transcript,value=>settings().transcript=value,'textarea'));
            panel.append(field(t[8],settings().hideTranscript===false,value=>settings().hideTranscript=!value,'checkbox'));
        }
        if(['fill-blank','table','open-answer','find-error'].includes(type))panel.append(field(t[6],(settings().hints||[]).join('\n'),value=>settings().hints=value.split('\n').map(s=>s.trim()).filter(Boolean),'textarea'));
        const kinds={ 'multiple-choice':'choice','one-of-many':'choice',match:'pairs',vocabulary:'words','phrase-list':'words',flashcards:'cards','order-items':'sequence','sentence-order':'sequence',columns:'columns' };
        const kind=kinds[type];
        // Inline dropdown sentences have their own editor; keep their sentence intact.
        if(kind && !(type==='one-of-many'&&root.SlovaExerciseFormat?.dropdown(activity.content))&&!activity.questions?.length){
            const prepared=root.SlovaExerciseFormat?.prepare(activity)||activity;
            let rows;
            if(kind==='choice')rows=prepared.settings?.options?.map(row=>({...row}))||String(prepared.content||'').split('\n').filter(Boolean).map(text=>({text,correct:String(prepared.answer||'').split(/\s*\/\s*/).includes(text)}));
            if(kind==='pairs')rows=prepared.settings?.pairs?.map(row=>({text:row.left||row.text||'',answer:row.right||row.answer||''}))||String(prepared.content||'').split('\n').filter(Boolean).map(line=>{const [text,...parts]=line.split('=');return {text:text.trim(),answer:parts.join('=').trim()};});
            if(kind==='words')rows=prepared.settings?.words?.map(row=>({...row,text:row.word,answer:row.translation,audio:row.audio||''}))||String(prepared.content||'').split('\n').filter(Boolean).map(line=>{const parts=line.split(/\s+[\/|]\s+/);return {text:parts[0],answer:parts.slice(1).join(' / ')};});
            if(kind==='cards')rows=(root.SlovaExerciseFormat?.cardsFor(activity)||[]).map(row=>({text:row.front,answer:row.back}));
            if(kind==='sequence')rows=String(prepared.content||'').split('\n').filter(Boolean).map(text=>({text}));
            if(kind==='columns')rows=(prepared.settings?.cards||root.SlovaExerciseFormat?.parseColumns(prepared.content)?.cards||[]).map(row=>({text:row.text,answer:row.category}));
            rows=rows||[];
            const list=document.createElement('div');panel.append(list);
            const save=()=>{
                const valid=rows.filter(row=>String(row.text||'').trim());
                if(kind==='choice'){
                    activity.content=rows.map(row=>row.correct?`[${row.text}]`:row.text).join('\n');
                    activity.answer=valid.filter(row=>row.correct).map(row=>row.text).join(' / ');
                    settings().options=valid.map(row=>({...row}));settings().multipleAnswers=valid.filter(row=>row.correct).length>1;
                }else if(kind==='words'){
                    settings().words=rows.map(row=>({...row,word:row.text||'',translation:row.answer||'',audio:row.audio||''}));activity.content='';
                }else if(kind==='cards'){
                    activity.content=rows.map(row=>`${row.text||''} [${row.answer||''}]`).join('\n');delete settings().cards;
                }else if(kind==='pairs'){
                    activity.content=rows.map(row=>`${row.text||''} = ${row.answer||''}`).join('\n');delete settings().pairs;
                }else if(kind==='columns'){
                    settings().cards=rows.map(row=>({text:row.text||'',category:row.answer||''}));settings().categories=[...new Set(valid.map(row=>row.answer).filter(Boolean))];activity.content=rows.map(row=>`${row.answer||''}: ${row.text||''}`).join('\n');
                }else{activity.content=rows.map(row=>row.text).join('\n');activity.answer=activity.content;settings().answerFromContent=true;}
                emit();
            };
            const draw=()=>{
                list.replaceChildren();rows.forEach((row,index)=>{
                    const item=document.createElement('div');item.className='visual-setting-row';
                    item.append(field(t[3],row.text,value=>{row.text=value;save();}));
                    if(!['choice','sequence'].includes(kind))item.append(field(t[4],row.answer,value=>{row.answer=value;save();}));
                    if(kind==='choice')item.append(field(t[5],row.correct,value=>{row.correct=value;save();},'checkbox'));
                    if(kind==='words')item.append(field(t[12],row.audio,value=>{row.audio=value;save();},'url'));
                    const remove=document.createElement('button');remove.type='button';remove.className='button secondary small';remove.textContent=t[2];remove.onclick=()=>{rows.splice(index,1);save();draw();};item.append(remove);list.append(item);
                });
            };
            const add=document.createElement('button');add.type='button';add.className='button secondary small';add.textContent=t[1];add.onclick=()=>{rows.push({text:'',answer:'',correct:false});draw();save();list.lastElementChild?.querySelector('input')?.focus();};panel.append(add);draw();
            const source=host.querySelector('textarea[data-field="content"]');if(source){source.hidden=true;source.previousElementSibling?.matches('label')&& (source.previousElementSibling.hidden=true);}
            const answer=host.querySelector('input[data-field="answer"]');if(answer)answer.closest('.form-field').hidden=true;
        }
        if(type==='interactive-image'){
            const image=document.createElement('img');image.className='settings-hotspot-image';
            const valid=root.slovaGallery?.parse(activity.content)?.[0];if(valid)image.src=valid.url;image.alt=t[10];image.tabIndex=0;image.setAttribute('role','button');image.setAttribute('aria-label',t[10]);
            const hint=document.createElement('p');hint.textContent=t[10];panel.append(hint,image);
            host.querySelector('textarea[data-field="content"]')?.addEventListener('input',()=>{const next=root.slovaGallery?.parse(activity.content)?.[0];if(next)image.src=next.url;else image.removeAttribute('src');});
            const list=document.createElement('div');panel.append(list);
            const spots=settings().hotspots||(settings().hotspots=[]);
            const draw=()=>{list.replaceChildren();spots.forEach((spot,index)=>{const row=document.createElement('div');row.className='visual-setting-row';row.append(field(`${t[11]} ${index+1}`,spot.word,value=>spot.word=value),field(t[4],spot.translation,value=>spot.translation=value));for(const axis of ['x','y'])row.append(field(axis+' %',spot[axis],value=>spot[axis]=Math.min(100,Math.max(0,Number(value)||0)),'number'));const remove=document.createElement('button');remove.type='button';remove.className='button secondary small';remove.textContent=t[2];remove.onclick=()=>{spots.splice(index,1);emit();draw();};row.append(remove);list.append(row);});};
            const add=(x=50,y=50)=>{spots.push({x,y,word:'',translation:''});draw();emit();list.lastElementChild?.querySelector('input')?.focus();};
            image.onclick=event=>{const rect=image.getBoundingClientRect();add((event.clientX-rect.left)/rect.width*100,(event.clientY-rect.top)/rect.height*100);};
            image.onkeydown=event=>{if(['Enter',' '].includes(event.key)){event.preventDefault();add();}};
            const button=document.createElement('button');button.type='button';button.className='button secondary small';button.textContent=t[1];button.onclick=()=>add();panel.append(button);draw();
        }
    }
    root.SlovaActivitySettingsUI={bind};
})(typeof window!=='undefined'?window:globalThis);
