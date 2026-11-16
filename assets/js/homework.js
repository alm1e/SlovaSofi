(() => {
    const esc = value => String(value ?? '').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
    const labels=SlovaI18n.locales({
        ua:{title:'Домашні завдання',assign:'Призначити домашню роботу',due:'Здати до',instructions:'Пояснення',lesson:'Урок',save:'Зберегти',close:'Закрити',empty:'Домашніх завдань поки немає.',noLessons:'Спочатку призначте класу урок із заповненим розділом домашньої роботи.',not_started:'Не розпочато',in_progress:'У роботі',submitted:'Здано',reviewed:'Перевірено',overdue:'Прострочено',open:'Відкрити домашню роботу',submit:'Надіслати на перевірку',review:'Перевірити',feedback:'Коментар викладача',mark:'Позначити перевіреною',answers:'Відкрити відповіді',edit:'Змінити термін',loading:'Завантаження…',error:'Не вдалося виконати дію. Спробуйте ще раз.',retry:'Повторити',changed:'Учень змінив або повторно надіслав роботу. Оновіть список перед перевіркою.',pending:'Очікують перевірки',sent:'Домашню роботу надіслано.',saved:'Збережено.',lateHint:'Після терміну роботу також можна надіслати.',emptyFeedback:'Без коментаря'},
        ru:{title:'Домашние задания',assign:'Назначить домашнюю работу',due:'Сдать до',instructions:'Пояснение',lesson:'Урок',save:'Сохранить',close:'Закрыть',empty:'Домашних заданий пока нет.',noLessons:'Сначала назначьте классу урок с заполненным разделом домашней работы.',not_started:'Не начато',in_progress:'В работе',submitted:'Сдано',reviewed:'Проверено',overdue:'Просрочено',open:'Открыть домашнюю работу',submit:'Отправить на проверку',review:'Проверить',feedback:'Комментарий учителя',mark:'Отметить проверенной',answers:'Открыть ответы',edit:'Изменить срок',loading:'Загрузка…',error:'Не удалось выполнить действие. Попробуйте ещё раз.',retry:'Повторить',changed:'Ученик изменил или повторно отправил работу. Обновите список перед проверкой.',pending:'Ожидают проверки',sent:'Домашняя работа отправлена.',saved:'Сохранено.',lateHint:'После срока работу тоже можно отправить.',emptyFeedback:'Без комментария'},
        en:{title:'Homework',assign:'Assign homework',due:'Due',instructions:'Instructions',lesson:'Lesson',save:'Save',close:'Close',empty:'No homework assigned yet.',noLessons:'First assign a lesson with a populated homework section to this class.',not_started:'Not started',in_progress:'In progress',submitted:'Submitted',reviewed:'Reviewed',overdue:'Overdue',open:'Open homework',submit:'Submit for review',review:'Review',feedback:'Teacher feedback',mark:'Mark reviewed',answers:'Open answers',edit:'Change deadline',loading:'Loading…',error:'Could not complete the action. Please try again.',retry:'Retry',changed:'The student changed or resubmitted this work. Refresh the list before reviewing.',pending:'Awaiting review',sent:'Homework submitted.',saved:'Saved.',lateHint:'Homework can still be submitted after the deadline.',emptyFeedback:'No comment'}
    });
    const text=(lang,key)=>(labels[lang]||labels.en)[key];
    const date=(value,lang)=>new Date(value).toLocaleString(({ua:'uk-UA',ru:'ru-RU',en:'en-GB',sk:'sk-SK',kk:'kk-KZ'})[lang]||'en-GB',{year:'numeric',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit',timeZoneName:'short'});
    const isOverdue=(task,state,now=Date.now())=>!['submitted','reviewed'].includes(state)&&new Date(task.due_at).getTime()<now;
    async function rpc(client,name,args){const {data,error}=await client.rpc(name,args);if(error)throw new Error(error.message);return data;}
    const api={
        list:(client,classId=null)=>rpc(client,'list_homework',{target_class_id:classId}),
        start:(client,id)=>rpc(client,'start_homework',{target_task_id:id}),
        submit:(client,id)=>rpc(client,'submit_homework',{target_task_id:id}),
        review:(client,id,studentId,submittedAt,feedback)=>rpc(client,'review_homework',{target_task_id:id,target_student_id:studentId,expected_submitted_at:submittedAt,review_feedback:feedback}),
        async save(client,task){
            const values={due_at:task.due_at,instructions:task.instructions};
            const query=task.id?client.from('homework_tasks').update(values).eq('id',task.id):client.from('homework_tasks').insert({...values,class_id:task.class_id,lesson_id:task.lesson_id});
            const {data,error}=await query.select('id').single();if(error)throw new Error(error.message);return data;
        }
    };
    function studentMarkup(tasks,language,insideLesson=false,error=false){
        const t=key=>text(language,key);
        if(insideLesson&&!tasks.length)return '';
        const cards=[...tasks].sort((a,b)=>Number(a.submissions?.[0]?.state==='reviewed')-Number(b.submissions?.[0]?.state==='reviewed')||new Date(a.due_at)-new Date(b.due_at)).map(task=>{
            const submission=task.submissions?.[0]||{},state=submission.state||'not_started';
            return `<article class="homework-card"><div><strong>${esc(task.lesson_title)}</strong><small>${esc(task.class_name)} · ${esc(task.unit)}</small><p>${t('due')}: ${esc(date(task.due_at,language))}</p><span class="homework-status" data-homework-state="${esc(state)}">${esc(t(state))}</span>${isOverdue(task,state)?` <span class="homework-overdue">${t('overdue')}</span>`:''}${task.instructions?`<p class="homework-instructions">${esc(task.instructions)}</p>`:''}${submission.feedback?`<p><strong>${t('feedback')}:</strong> ${esc(submission.feedback)}</p>`:''}</div><div class="student-activity-actions">${insideLesson?(['submitted','reviewed'].includes(state)?'':`<button type="button" class="button" data-homework-submit="${esc(task.id)}">${t('submit')}</button>`):`<button type="button" class="button secondary small" data-homework-open="${esc(task.id)}">${t('open')}</button>`}</div></article>`;
        }).join('');
        return `<section class="panel homework-panel"><h2>${t('title')}</h2>${error?`<p>${t('error')}</p><button type="button" class="button secondary small" data-homework-retry>${t('retry')}</button>`:cards||`<p class="hint">${t('empty')}</p>`}</section>`;
    }
    function localDateValue(value){const d=new Date(value);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}T${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;}
    async function openTeacher(context){
        const {client,language,openModal,modalCard}=context,t=key=>text(language,key);
        openModal(`<h2>${t('title')} · ${esc(context.className)}</h2><div data-homework-panel role="status">${t('loading')}</div><button type="button" class="button secondary" data-homework-refresh>${t('retry')}</button><button type="button" class="button secondary" data-close>${t('close')}</button>`,true);
        const panel=modalCard.querySelector('[data-homework-panel]');
        let tasks=[],busy=false;
        const showError=error=>{if(!panel.isConnected)return;const p=document.createElement('p');p.className='homework-error';p.textContent=error.message?.includes('submission_changed')?t('changed'):t('error');panel.append(p);};
        const refresh=async()=>{
            if(busy||!panel.isConnected)return;busy=true;
            try{tasks=await api.list(client,context.classId);if(panel.isConnected)showTasks();}catch(error){showError(error);}finally{busy=false;}
        };
        const showTasks=()=>{
            if(!panel.isConnected)return;
            const pending=tasks.reduce((count,task)=>count+(task.submissions||[]).filter(row=>row.state==='submitted').length,0);
            panel.innerHTML=`<p>${t('pending')}: ${pending}</p>${context.canAssign?`<button type="button" class="button" data-homework-new>${t('assign')}</button>`:''}${tasks.length?tasks.map(task=>`<article class="homework-card"><h3>${esc(task.lesson_title)}</h3><p>${t('due')}: ${esc(date(task.due_at,language))}</p>${task.instructions?`<p class="homework-instructions">${esc(task.instructions)}</p>`:''}${context.canAssign?`<button type="button" class="button secondary small" data-homework-edit="${esc(task.id)}">${t('edit')}</button>`:''}<div>${(task.submissions||[]).map(row=>`<div class="homework-student-row"><strong>${esc(row.student_name)}</strong><span>${esc(t(row.state))}${isOverdue(task,row.state)?` · ${t('overdue')}`:''}</span>${context.openAnswers?`<button type="button" class="button secondary small" data-homework-answers="${esc(task.id)}" data-student-id="${esc(row.student_id)}">${t('answers')}</button>`:''}${context.canReview&&row.state==='submitted'?`<button type="button" class="button small" data-homework-review="${esc(task.id)}" data-student-id="${esc(row.student_id)}">${t('review')}</button>`:''}${row.feedback?`<p>${t('feedback')}: ${esc(row.feedback)}</p>`:''}</div>`).join('')}</div></article>`).join(''):`<p>${t('empty')}</p>`}`;
            panel.querySelector('[data-homework-new]')?.addEventListener('click',()=>showEditor());
            panel.querySelectorAll('[data-homework-edit]').forEach(button=>button.addEventListener('click',()=>showEditor(tasks.find(task=>task.id===button.dataset.homeworkEdit))));
            panel.querySelectorAll('[data-homework-review]').forEach(button=>button.addEventListener('click',()=>showReview(button.dataset.homeworkReview,button.dataset.studentId)));
            panel.querySelectorAll('[data-homework-answers]').forEach(button=>button.addEventListener('click',()=>context.openAnswers(tasks.find(task=>task.id===button.dataset.homeworkAnswers).lesson_id,button.dataset.studentId)));
        };
        const showEditor=(task=null)=>{
            const options=context.lessons.filter(lesson=>context.hasHomework(lesson)&&(!tasks.some(item=>item.lesson_id===lesson.id)||lesson.id===task?.lesson_id));
            if(task&&!options.some(lesson=>lesson.id===task.lesson_id))options.push({id:task.lesson_id,title:task.lesson_title,unit:task.unit});
            if(!task&&!options.length){panel.insertAdjacentHTML('beforeend',`<p>${t('noLessons')}</p>`);return;}
            panel.innerHTML=`<form data-homework-form><label>${t('lesson')}<select name="lesson" required ${task?'disabled':''}>${options.map(lesson=>`<option value="${esc(lesson.id)}" ${lesson.id===task?.lesson_id?'selected':''}>${esc(lesson.title)} · ${esc(lesson.unit)}</option>`).join('')}</select></label><label>${t('due')}<input name="due" type="datetime-local" required value="${task?localDateValue(task.due_at):''}"></label><label>${t('instructions')}<textarea name="instructions" maxlength="5000">${esc(task?.instructions||'')}</textarea></label><p class="hint">${t('lateHint')}</p><button type="submit" class="button">${t('save')}</button><button type="button" class="button secondary" data-homework-back>${t('close')}</button></form>`;
            panel.querySelector('[data-homework-back]').addEventListener('click',showTasks);
            panel.querySelector('form').addEventListener('submit',async event=>{
                event.preventDefault();const form=event.currentTarget,button=form.querySelector('[type="submit"]');if(button.disabled)return;button.disabled=true;
                try{await api.save(client,{id:task?.id,class_id:context.classId,lesson_id:task?.lesson_id||form.elements.lesson.value,due_at:new Date(form.elements.due.value).toISOString(),instructions:form.elements.instructions.value.trim()});await refresh();}catch(error){showError(error);button.disabled=false;}
            });
        };
        const showReview=(id,studentId)=>{
            const task=tasks.find(item=>item.id===id),row=task.submissions.find(item=>item.student_id===studentId);
            panel.innerHTML=`<h3>${esc(row.student_name)} · ${esc(task.lesson_title)}</h3><form data-homework-review-form><label>${t('feedback')}<textarea name="feedback" maxlength="5000">${esc(row.feedback||'')}</textarea></label><button type="submit" class="button">${t('mark')}</button><button type="button" class="button secondary" data-homework-back>${t('close')}</button></form>`;
            panel.querySelector('[data-homework-back]').addEventListener('click',showTasks);
            panel.querySelector('form').addEventListener('submit',async event=>{
                event.preventDefault();const form=event.currentTarget,button=form.querySelector('[type="submit"]');if(button.disabled)return;button.disabled=true;
                try{await api.review(client,id,studentId,row.submitted_at,form.elements.feedback.value.trim());await refresh();}catch(error){showError(error);button.disabled=false;}
            });
        };
        modalCard.querySelector("[data-homework-refresh]")?.addEventListener("click",refresh);
        await refresh();
    }
    function markDirty(tasks, lessonId, classId) {
        return tasks.map(task => task.lesson_id === lessonId && task.class_id === classId
            ? { ...task, submissions: (task.submissions || []).map(row => ['not_started','submitted','reviewed'].includes(row.state) ? { ...row, state: 'in_progress' } : row) }
            : task);
    }
    const isHomeworkActivity = (lesson,index) => (lesson?.sections || []).some(section => section.homework && section.activities?.some(activity => activity.index === index));
    window.SlovaHomework={api,text,isOverdue,studentMarkup,localDateValue,markDirty,isHomeworkActivity,openTeacher};
})();
