    const qaRequests = [];
    language = 'ru';
    user = {id:'qa-student',email:'qa@example.invalid',user_metadata:{full_name:'Тестовый ученик'}};
    dashboardStatus = 'ready';
    const qaActivities = [
        {type:'text',content:'## Заголовок\nТекст без кода'},
        {type:'drag-words',tokens:['Ja','som'],content:'Ja som'},
        {type:'fill-blank',content:'Ja ___',blankCount:1,hints:['Подсказка'],wordBank:['som']},
        {type:'multiple-choice',options:['dom','škola']},
        {type:'one-of-many',options:['dom','škola']},
        {type:'true-false',content:'Да или нет'},
        {type:'order-items',items:['dom','škola']},
        {type:'sentence-order',items:['Ja','som']},
        {type:'match',pairs:['dom','škola'],options:['дім','школа']},
        {type:'columns',items:['dom','ísť'],categories:['Іменник','Дієслово']},
        {type:'table',rows:[['Слово','{{blank:0}}']]},
        {type:'open-answer',content:'Напишите о себе'},
        {type:'flashcards',cards:[{cardIndex:0,front:'dom',back:'дім'}]},
        {type:'vocabulary',cards:[{cardIndex:0,front:'dom',back:'дім'}]},
        {type:'find-error',content:'Ja bývať v Bratislave.'},
        {type:'audio',content:'http://127.0.0.1:1/qa.wav'},
        {type:'video',content:'http://127.0.0.1:1/qa.mp4'},
        {type:'image',content:'https://example.invalid/image.png'},
        {type:'interactive-image',content:'https://example.invalid/image.png',hotspots:[{x:30,y:40,word:'dom',translation:'дім'}]},
        {type:'pronunciation-recording',content:'Прочитайте текст'},
        {type:'listening-questions',content:'http://127.0.0.1:1/qa.wav',options:['dom','škola']}
    ].map((activity,index)=>({...activity,id:'qa-'+index,index,prompt:activity.type,gradable:!['text','audio','video','image','interactive-image','pronunciation-recording','flashcards','vocabulary'].includes(activity.type),reviewRequired:activity.type==='open-answer'}));
    const qaLesson = {id:'qa-lesson',title:'QA · Кабинет ученика',unit:'A1',className:'Тестовый класс',progress:{},sections:[{id:'intro',title:'Урок',activities:[]},{id:'second',title:'Второй раздел',activities:[]},{id:'homework',title:'Домашняя работа',homework:true,activities:[qaActivities.find(a=>a.type==='open-answer')]}]};
    const qaReset = (type='text') => {
        draftSaveTimers.forEach(clearTimeout);draftSaveTimers.clear();pendingDrafts.clear();
        openedLesson=structuredClone(qaLesson);openedLesson.sections[0].activities=[structuredClone(qaActivities.find(a=>a.type===type))];
        openedLesson.sections[0].activities[0].index=0;openedLesson.sections[2].activities[0].index=1;
        lessons=[openedLesson];classes=[];selectedLessonId=openedLesson.id;activeView='lessons';studentWorkspaceTab='lesson';activeStudentSectionId='intro';render();
        return pageContent.querySelector('[data-activity-index]');
    };
    qaReset();
    const qaButton=document.createElement('button');qaButton.textContent='Запустить QA ученика';qaButton.style='position:fixed;top:0;right:0;z-index:99999';document.body.append(qaButton);
    qaButton.onclick=async()=>{
        qaButton.remove();const results=[];
        const assert=(condition,message)=>{if(!condition)throw Error(message);};
        const run=async(name,fn)=>{try{await fn();results.push('PASS '+name);}catch(e){results.push('FAIL '+name+' — '+e.message);}};
        for(const activity of qaActivities)await run('Ученик: '+activity.type,()=>{qaReset(activity.type);assert(pageContent.textContent.includes(qaLesson.title),'Не отрисован урок');});
        await run('Свободный ответ отправляется',async()=>{const card=qaReset('open-answer');card.querySelector('[data-open-answer]').value='Volám sa Sofia.';const count=qaRequests.length;await submitActivity(card);assert(qaRequests.slice(count).some(r=>r.action==='submit'&&r.response.text==='Volám sa Sofia.'),'Ответ не отправился');});
        await run('Пустой свободный ответ не отправляется',async()=>{const card=qaReset('open-answer');const count=qaRequests.length;await submitActivity(card);assert(!qaRequests.slice(count).some(r=>r.action==='submit'),'Отправлен пустой ответ');});
        await run('Удаление нового вложения',()=>{const card=qaReset('open-answer');card.querySelector('[data-add-open-attachment]').click();assert(card.querySelector('[data-open-attachment]'),'Вложение не добавлено');card.querySelector('[data-remove-open-attachment]').click();assert(!card.querySelector('[data-open-attachment]'),'Вложение не удалилось');});
        await run('Перенос и возврат слова',()=>{const card=qaReset('drag-words');card.querySelector('[data-word-token]').click();assert(card.querySelector('[data-remove-word]'),'Слово не перенеслось');card.querySelector('[data-remove-word]').click();assert(!card.querySelector('[data-remove-word]'),'Слово не вернулось');});
        await run('Перестановка элементов',()=>{const card=qaReset('order-items');card.querySelector('[data-move-item="1"]').click();assert(card.querySelector('[data-order-item]').dataset.orderItem==='škola','Порядок не изменился');});
        await run('Подсказка',()=>{const card=qaReset('fill-blank');card.querySelector('[data-show-hint]').click();assert(!card.querySelector('[data-hint-content]').hidden,'Подсказка скрыта');});
        await run('Слово в пропуск',()=>{const card=qaReset('fill-blank');card.querySelector('[data-word-bank-answer]').click();assert(card.querySelector('[data-blank-answer]').value==='som','Слово не вставилось');});
        await run('Подбор пары',()=>{const card=qaReset('match');card.querySelector('.pair-slot').click();card.querySelector('.pair-chip').click();assert(card.querySelector('[data-match-answer]').value,'Пара не выбрана');});
        await run('Переворот карточки',()=>{const card=qaReset('flashcards');card.querySelector('[data-front]').click();assert(card.querySelector('.student-flashcard-face').textContent==='дім','Карточка не перевернулась');});
        await run('Метка на изображении',()=>{const card=qaReset('interactive-image');card.querySelector('[data-hotspot-index]').click();assert(card.querySelector('[data-hotspot-detail]').textContent.includes('дім'),'Метка не открылась');});
        await run('Скорость аудио до других действий',()=>{const card=qaReset('audio');const select=card.querySelector('[data-media-speed]');select.value='1.5';select.dispatchEvent(new Event('change',{bubbles:true}));assert(card.querySelector('audio').playbackRate===1.5,'Скорость не изменилась');});
        await run('Перемотка аудио',()=>{const card=qaReset('audio');const media=card.querySelector('audio');let time=10;Object.defineProperty(media,'currentTime',{get:()=>time,set:v=>{time=v;}});Object.defineProperty(media,'duration',{value:60});card.querySelector('[data-media-seek="5"]').click();assert(time===15,'Позиция '+time);});
        await run('Повтор аудио A/B и сброс',()=>{const card=qaReset('audio');const media=card.querySelector('audio');let time=2;Object.defineProperty(media,'currentTime',{get:()=>time,set:v=>{time=v;}});card.querySelector('[data-media-loop="a"]').click();time=8;card.querySelector('[data-media-loop="b"]').click();assert(media.dataset.loopStart==='2'&&media.dataset.loopEnd==='8','Не заданы границы');card.querySelector('[data-media-loop="clear"]').click();assert(!media.dataset.loopStart&&!media.dataset.loopEnd,'Повтор не сброшен');});
        await run('Домашняя работа и возврат',async()=>{qaReset();pageContent.querySelector('[data-student-workspace-tab="homework"]').click();for(let i=0;i<10;i++)await Promise.resolve();assert(studentWorkspaceTab==='homework','Домашняя работа не открылась');pageContent.querySelector('[data-student-workspace-tab="lesson"]').click();for(let i=0;i<10;i++)await Promise.resolve();assert(studentWorkspaceTab==='lesson','Нет возврата');});
        draftSaveTimers.forEach(clearTimeout);draftSaveTimers.clear();pendingDrafts.clear();await draftSaveQueue;
        const report=document.createElement('div');report.style='position:fixed;inset:20px;z-index:99999;background:#0f191e;color:#dff5e7;overflow:auto;padding:20px;font-size:16px';for(const line of [...results,'TOTAL '+results.length+'; FAIL '+results.filter(x=>x.startsWith('FAIL')).length]){const p=document.createElement('p');p.textContent=line;report.append(p);}document.body.append(report);
    };
