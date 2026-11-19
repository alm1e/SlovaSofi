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
    const qaLesson = {id:'qa-lesson',revision:'qa-v1',title:'QA · Кабинет ученика',unit:'A1',className:'Тестовый класс',progress:{},sections:[{id:'intro',title:'Урок',activities:[]},{id:'second',title:'Второй раздел',activities:[]},{id:'homework',title:'Домашняя работа',homework:true,activities:[qaActivities.find(a=>a.type==='open-answer')]}]};
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
        await run('Заметка появляется и скрывается без перезагрузки страницы',async()=>{
            const originalInvoke=invokeLessonApi;
            try{qaReset('text');const note=openedLesson.sections[0].activities[0];note.id='00000000-0000-4000-8000-000000000801';note.content='LIVE NOTE';note.settings={note:true};openedLesson.hasNotes=true;openedLesson.noteVisibility={};render();const template=structuredClone(openedLesson);let visible=false;
                invokeLessonApi=async payload=>payload.action==='note-state'?{noteVisibility:{[note.id]:visible}}:{lesson:{...structuredClone(template),noteVisibility:{[note.id]:visible},sections:template.sections.map((s,i)=>i===0?{...s,activities:visible?s.activities:[]}:s)}};
                await syncLessonNotes();assert(!pageContent.textContent.includes('LIVE NOTE'),'Скрытая заметка осталась у ученика');visible=true;await syncLessonNotes();assert(pageContent.textContent.includes('LIVE NOTE'),'Заметка не появилась без перезагрузки');
            }finally{invokeLessonApi=originalInvoke;}
        });
        await run('Рисунок ученика отправляется через автосохранение и восстанавливается',async()=>{
            const card=qaReset('image'),url='https://example.invalid/image.png';const img=card.querySelector('img');img.src='wide.svg';await img.decode();
            card.querySelector('[data-photo-tool="text"]').click();card.querySelector('[data-photo-caption]').value='Мой ответ';const canvas=card.querySelector('canvas'),r=canvas.getBoundingClientRect();const before=qaRequests.length;
            canvas.dispatchEvent(new PointerEvent('pointerdown',{button:0,pointerId:1,clientX:r.left+10,clientY:r.top+20}));await flushDraftSaves();
            const write=qaRequests.slice(before).find(req=>req.action==='save-draft');assert(write&&JSON.parse(write.response)[url][0].text==='Мой ответ','Рисунок не отправлен на сохранение');
            openedLesson.progress[activityProgressKey(openedLesson.sections[0].activities[0],0)]={response:write.response,correct:null,draft:true};render();assert(pageContent.querySelector('[data-photo-editor]').dataset.photoValue.includes('Мой ответ'),'Сохранённый ответ потерян при отрисовке');
        });
        await run('Ученик нажимает прямо на фото и печатает без предварительной разметки',async()=>{
            const card=qaReset('image'),url='https://example.invalid/image.png';const img=card.querySelector('img');img.src='wide.svg';await img.decode();
            const canvas=card.querySelector('canvas'),r=canvas.getBoundingClientRect(),before=qaRequests.length;
            canvas.dispatchEvent(new PointerEvent('pointerdown',{button:0,pointerId:12,clientX:r.left+r.width*.3,clientY:r.top+r.height*.5}));
            const input=card.querySelector('[data-photo-field-answer]');assert(input&&document.activeElement===input,'Курсор не появился на фото');input.value='á';input.dispatchEvent(new InputEvent('input',{bubbles:true}));await flushDraftSaves();
            const write=qaRequests.slice(before).filter(req=>req.action==='save-draft').at(-1);assert(JSON.parse(write.response)[url][0].text==='á','Текст не сохранён');
            openedLesson.progress[activityProgressKey(openedLesson.sections[0].activities[0],0)]={response:write.response,correct:null,draft:true};render();assert(pageContent.querySelector('[data-photo-field-answer]').value==='á','Текст не восстановился');
        });
        await run('Неподтверждённое фото сохраняет локальный ответ и показывает ошибку рядом с ним',async()=>{
            const originalInvoke=invokeLessonApi;
            try{
                const card=qaReset('image');card.querySelector('img').src='wide.svg';await card.querySelector('img').decode();const canvas=card.querySelector('canvas'),r=canvas.getBoundingClientRect();invokeLessonApi=async()=>({answers:{},completed:false});canvas.dispatchEvent(new PointerEvent('pointerdown',{button:0,pointerId:41,clientX:r.left+r.width*.4,clientY:r.top+r.height*.4}));const input=card.querySelector('[data-photo-field-answer]');input.value='á';input.dispatchEvent(new InputEvent('input',{bubbles:true}));
                let failed=false;try{await flushDraftSaves();}catch{failed=true;}assert(failed&&pendingDrafts.size===1,'Неподтверждённый ответ выдан за сохранённый');assert(card.querySelector('[data-answer-feedback]').textContent.includes('не подтвердил'),'Нет сообщения возле фото');assert(!card.querySelector('[data-photo-retry-save]').hidden,'Нет повторного сохранения возле фото');assert(input.value==='á','Ошибка потеряла введённое слово');
                invokeLessonApi=originalInvoke;await retryPendingAnswers();assert(pendingDrafts.size===0&&card.querySelector('[data-photo-retry-save]').hidden,'Повторное сохранение не завершилось');
            }finally{invokeLessonApi=originalInvoke;}
        });
        await run('Свободный ответ отправляется',async()=>{const card=qaReset('open-answer');card.querySelector('[data-open-answer]').value='Volám sa Sofia.';const count=qaRequests.length;await submitActivity(card);assert(qaRequests.slice(count).some(r=>r.action==='submit'&&r.response.text==='Volám sa Sofia.'),'Ответ не отправился');});
        await run('Пустой свободный ответ не отправляется',async()=>{const card=qaReset('open-answer');const count=qaRequests.length;await submitActivity(card);assert(!qaRequests.slice(count).some(r=>r.action==='submit'),'Отправлен пустой ответ');});
        await run('Удаление нового вложения',()=>{const card=qaReset('open-answer');card.querySelector('[data-add-open-attachment]').click();assert(card.querySelector('[data-open-attachment]'),'Вложение не добавлено');card.querySelector('[data-remove-open-attachment]').click();assert(!card.querySelector('[data-open-attachment]'),'Вложение не удалилось');});
        await run('Перенос и возврат слова',()=>{const card=qaReset('drag-words');assert(card.querySelectorAll('.sequence-slot').length===2,'Нет пустых мест');card.querySelector('[data-word-token]').click();assert(card.querySelectorAll('.sequence-slot').length===1,'Место не заполнено');assert(card.querySelector('[data-remove-word]'),'Слово не перенеслось');card.querySelector('[data-remove-word]').click();assert(!card.querySelector('[data-remove-word]'),'Слово не вернулось');assert(card.querySelectorAll('.sequence-slot').length===2,'Пустое место не восстановилось');});
        await run('Перестановка элементов',()=>{const card=qaReset('order-items');card.querySelector('[data-move-item="1"]').click();assert(card.querySelector('[data-order-item]').dataset.orderItem==='škola','Порядок не изменился');});
        await run('Подсказка',()=>{const card=qaReset('fill-blank');card.querySelector('[data-show-hint]').click();assert(!card.querySelector('[data-hint-content]').hidden,'Подсказка скрыта');});
        await run('Слово в пропуск',()=>{const card=qaReset('fill-blank');card.querySelector('[data-gap-word]').click();card.querySelector('[data-blank-answer]').click();assert(card.querySelector('[data-blank-answer]').value==='som','Слово не вставилось');});
        await run('Подбор пары',()=>{const card=qaReset('match');card.querySelector('.matching-left').click();card.querySelector('.matching-right').click();assert(card.querySelector('[data-match-answer]').value,'Пара не выбрана');});
        await run('Переворот карточки',()=>{const card=qaReset('flashcards');card.querySelector('[data-front]').click();assert(card.querySelector('.student-flashcard-face').textContent==='дім','Карточка не перевернулась');});
        await run('Метка на изображении',()=>{const card=qaReset('interactive-image');card.querySelector('[data-hotspot-index]').click();assert(card.querySelector('[data-hotspot-detail]').textContent.includes('дім'),'Метка не открылась');});
        await run('Скорость аудио до других действий',()=>{const card=qaReset('audio');const select=card.querySelector('[data-media-speed]');select.value='1.5';select.dispatchEvent(new Event('change',{bubbles:true}));assert(card.querySelector('audio').playbackRate===1.5,'Скорость не изменилась');});
        await run('Перемотка аудио',()=>{const card=qaReset('audio');const media=card.querySelector('audio');let time=10;Object.defineProperty(media,'currentTime',{get:()=>time,set:v=>{time=v;}});Object.defineProperty(media,'duration',{value:60});card.querySelector('[data-media-seek="5"]').click();assert(time===15,'Позиция '+time);});
        await run('Повтор аудио A/B и сброс',()=>{const card=qaReset('audio');const media=card.querySelector('audio');let time=2;Object.defineProperty(media,'currentTime',{get:()=>time,set:v=>{time=v;}});card.querySelector('[data-media-loop="a"]').click();time=8;card.querySelector('[data-media-loop="b"]').click();assert(media.dataset.loopStart==='2'&&media.dataset.loopEnd==='8','Не заданы границы');card.querySelector('[data-media-loop="clear"]').click();assert(!media.dataset.loopStart&&!media.dataset.loopEnd,'Повтор не сброшен');});
        await run('Домашняя работа и возврат',async()=>{qaReset();pageContent.querySelector('[data-student-workspace-tab="homework"]').click();for(let i=0;i<10;i++)await Promise.resolve();assert(studentWorkspaceTab==='homework','Домашняя работа не открылась');pageContent.querySelector('[data-student-workspace-tab="lesson"]').click();for(let i=0;i<10;i++)await Promise.resolve();assert(studentWorkspaceTab==='lesson','Нет возврата');});
        await run('Навигация урока доступна на компьютере и открывается кнопкой на телефоне',async()=>{
            qaReset();
            const sidebar=document.getElementById('studentSidebar'),menu=document.getElementById('studentMenuToggle');
            const mobile=matchMedia('(max-width: 700px)').matches;
            assert(document.body.classList.contains('lesson-focus'),'Не включён режим урока');
            if(mobile){
                assert(sidebar.inert,'Закрытое мобильное меню доступно для фокуса');
                assert(getComputedStyle(menu).display!=='none','Нет кнопки мобильного меню');
                menu.click();assert(!sidebar.inert&&sidebar.classList.contains('open'),'Мобильное меню не открылось');
                assert(menu.getAttribute('aria-expanded')==='true','Не объявлено открытие меню');
                document.getElementById('studentSidebarBackdrop').click();
                assert(sidebar.inert&&!sidebar.classList.contains('open'),'Мобильное меню не закрылось');
            }else{
                assert(!sidebar.inert,'Левая панель заблокирована внутри урока');
                assert(getComputedStyle(sidebar).visibility==='visible','Панель не видна на компьютере');
                const link=sidebar.querySelector('[data-view="lessons"]');
                link.focus();assert(document.activeElement===link,'Пункт меню недоступен с клавиатуры');
                link.click();for(let i=0;i<10;i++)await Promise.resolve();assert(!selectedLessonId&&!openedLesson,'Клик по меню не выводит из урока');
                qaReset();
            }
            pageContent.querySelector('[data-back-to-lessons]').click();
            for(let i=0;i<10;i++)await Promise.resolve();
            assert(!document.body.classList.contains('lesson-focus'),'Не вышел из режима урока');
            assert(sidebar.inert===mobile,'Навигация не восстановилась');
        });
        await run('Домашняя работа ученика: срок, открытие нужного класса и сдача',async()=>{
            const beforeClient=window.supabaseClient;let state='not_started';const calls=[];
            const task={id:'qa-homework-task',class_id:'qa-class',lesson_id:'qa-lesson',lesson_title:'Домашняя работа QA',class_name:'Тестовый класс',unit:'A1',due_at:'2026-12-01T18:00:00Z',instructions:'Напишите ответ',submissions:[{student_id:'qa-member',state}]};
            try{
                window.supabaseClient={rpc:async(name,args)=>{calls.push({name,args});if(name==='list_homework')return{data:[{...task,submissions:[{student_id:'qa-member',state}]}],error:null};if(name==='start_homework')state='in_progress';if(name==='submit_homework')state='submitted';return{data:null,error:null};}};
                qaReset();homeworkTasks=[task];openedLesson=null;selectedLessonId='';activeView='lessons';render();
                assert(pageContent.textContent.includes('Сдать до'),'Нет срока');pageContent.querySelector('[data-homework-open]').click();await new Promise(resolve=>setTimeout(resolve,30));
                assert(qaRequests.some(request=>request.action==='load'&&request.classId==='qa-class'),'Не передан класс урока');assert(studentWorkspaceTab==='homework'&&activeStudentSectionId==='homework','Не открыт домашний раздел');assert(pageContent.querySelector('[data-homework-submit]'),'Нет отправки на проверку');
                const input=pageContent.querySelector('[data-open-answer]');input.value='My homework';input.dispatchEvent(new Event('input',{bubbles:true}));await flushDraftSaves();
                pageContent.querySelector('[data-homework-submit]').click();await new Promise(resolve=>setTimeout(resolve,30));assert(calls.some(call=>call.name==='submit_homework'&&call.args.target_task_id===task.id),'Работа не отправлена');assert(pageContent.textContent.includes('Сдано'),'Нет статуса сдачи');
            }finally{clearTimeout(homeworkRefreshTimer);homeworkTasks=[];window.supabaseClient=beforeClient;qaReset();}
        });
        draftSaveTimers.forEach(clearTimeout);draftSaveTimers.clear();pendingDrafts.clear();await draftSaveQueue.catch(error=>results.push("FAIL Очередь сохранения — "+error.message));
        const report=document.createElement('div');report.style='position:fixed;inset:20px;z-index:99999;background:#0f191e;color:#dff5e7;overflow:auto;padding:20px;font-size:16px';for(const line of [...results,'TOTAL '+results.length+'; FAIL '+results.filter(x=>x.startsWith('FAIL')).length]){const p=document.createElement('p');p.textContent=line;report.append(p);}document.body.append(report);
    };
