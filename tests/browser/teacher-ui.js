(async function () {
 const out=document.getElementById('qa-log'); const results=[];
 const assert=(condition,message)=>{if(!condition)throw Error(message);};
 const original=structuredClone(data);
 const run=async(name,fn)=>{try{await fn();results.push('PASS '+name);}catch(e){results.push('FAIL '+name+' — '+e.message);}out.textContent=results.join('\n');};
 const reset=()=>{data=structuredClone(original);openLessonEditor(data.lessons[0], 'qa-intro',0);return pageContent.querySelector('.builder-block');};
 const select=(editor)=>{editor.focus();const r=document.createRange();r.selectNodeContents(editor);const s=getSelection();s.removeAllRanges();s.addRange(r);editor.dispatchEvent(new Event('keyup'));};
 const prepare=()=>{const root=reset();const source=root.querySelector('textarea[data-field="content"]');source.value='Проверка текста';source.dispatchEvent(new Event('input',{bubbles:true}));const editor=root.querySelector('.visual-rich-editor');select(editor);return {root,source,editor};};
 const click=(b)=>{b.dispatchEvent(new MouseEvent('mousedown',{bubbles:true,cancelable:true}));b.click();};
 const formats={'**':'**Проверка текста**','*':'*Проверка текста*','[u]':'[u]Проверка текста[/u]','[s]':'[s]Проверка текста[/s]',list:'- Проверка текста',numbered:'1. Проверка текста',quote:'> Проверка текста','[info]':'[info]\nПроверка текста','[border]':'[border]Проверка текста[/border]','# ':'# Проверка текста','## ':'## Проверка текста','### ':'### Проверка текста','[align=left]':'[align=left]Проверка текста[/align]','[align=center]':'[align=center]Проверка текста[/align]','[align=right]':'[align=right]Проверка текста[/align]'};
 for(const [format,expected] of Object.entries(formats))await run('Формат '+format,()=>{const {root,source,editor}=prepare();click([...root.querySelectorAll('[data-rich-format]')].find(b=>b.dataset.richFormat===format));assert(source.value.trim()===expected || (format==='[align=left]' && source.value.trim()==='Проверка текста'),'Сохранено: '+source.value);assert(!editor.textContent.includes('[size='),'Код в поле');});
 for(const size of [12,14,16,18,20,24,28,32,36])await run('Размер '+size,()=>{const {root,source}=prepare();const input=root.querySelector('[data-rich-size]');input.value=String(size);input.dispatchEvent(new Event('change',{bubbles:true}));assert(source.value==='[size='+size+']Проверка текста[/size]',source.value);});
 for(const color of ['#34724d','#f4d35e','#f4778b','#4dabf7','#a855f7'])await run('Цвет '+color,()=>{const {root,source}=prepare();click(root.querySelector('[data-rich-color="'+color+'"]'));assert(source.value==='[color='+color+']Проверка текста[/color]',source.value);});
 await run('Подсветка',()=>{const {root,source}=prepare();const input=root.querySelector('[data-rich-highlight]');input.value='#fff19c';input.dispatchEvent(new Event('change',{bubbles:true}));assert(source.value==='[highlight=#fff19c]Проверка текста[/highlight]',source.value);});
 await run('Ссылка',()=>{const {root,source}=prepare();const prompt=window.prompt;window.prompt=()=> 'https://example.com/';try{click(root.querySelector('[data-rich-format="link"]'));assert(source.value==='[Проверка текста](https://example.com/)',source.value);}finally{window.prompt=prompt;}});
 await run('Стиль обычный/заголовки',()=>{const {root,source}=prepare();const input=root.querySelector('[data-rich-style]');for(const style of ['h1','h2','h3','normal']){input.value=style;input.dispatchEvent(new Event('change',{bubbles:true}));assert(source.value.startsWith(style==='normal'?'Проверка':'#'.repeat(Number(style[1]))+' '),source.value);}});
 await run('Повторная смена размера без служебных тегов',()=>{const {root,source}=prepare();const input=root.querySelector('[data-rich-size]');for(const size of ['18','24']){input.value=size;input.dispatchEvent(new Event('change',{bubbles:true}));}const html=SlovaActivityUI.renderRichText(source.value);assert(!/\[\/?size/.test(html),'В предпросмотре остались теги: '+source.value);});
 await run('Размер обычного текста сбрасывается',()=>{const {root,source}=prepare();const input=root.querySelector('[data-rich-size]');input.value='24';input.dispatchEvent(new Event('change',{bubbles:true}));input.value='';input.dispatchEvent(new Event('change',{bubbles:true}));assert(!source.value.includes('[size=24]'),'Остался размер 24');});
 await run('Сохранение и повторное открытие',async()=>{const {root,source}=prepare();click(root.querySelector('[data-rich-color="#4dabf7"]'));const expected=source.value;pageContent.querySelector('#lessonTitle').value='QA сохранён';pageContent.querySelector('button[type="submit"]').click();await Promise.resolve();await Promise.resolve();assert(data.lessons[0].sections[0].activities[0].content===expected,'Не сохранено');openLessonEditor(data.lessons[0],'qa-intro',0);assert(pageContent.querySelector('.visual-rich-editor').textContent.trim()==='Проверка текста','Код после повторного открытия');});
 await run('Дублирование и удаление блока',()=>{reset();pageContent.querySelector('[data-duplicate-block]').click();assert(draftSections[0].activities.length===2,'Копия не появилась');pageContent.querySelector('[data-remove-block]').click();assert(draftSections[0].activities.length===1,'Блок не удалён');});
 for(const type of activityTypes)await run('Редактор/предпросмотр: '+type.id,()=>{data=structuredClone(original);const block=type.id==='text'?data.lessons[0].sections[0].activities[0]:data.lessons[0].sections[1].activities.find(b=>b.type===type.id);data.lessons[0].sections[0].activities=[structuredClone(block)];openLessonEditor(data.lessons[0],'qa-intro',0);assert(pageContent.querySelector('[data-builder-preview]'),'Нет предпросмотра');assert(pageContent.querySelector('[data-field="prompt"]'),'Нет инструкции');pageContent.querySelector('[data-toggle-block]').click();assert(!pageContent.querySelector('.builder-block.is-expanded'),'Не сворачивается');pageContent.querySelector('[data-toggle-block]').click();assert(pageContent.querySelector('.builder-block.is-expanded'),'Не открывается');});
 await run('Выбор нового блока',()=>{reset();pageContent.querySelector('[data-action="choose-activity"]')?.click();assert(!modalBackdrop.hidden,'Не открылся выбор заданий');closeModal();});
 await run('Назначение готового урока классу',async()=>{reset();exitLessonWorkspace();data.lessons[0].sections=[structuredClone(original.lessons[0].sections[0])];openLessonAssignment('qa-lesson');const check=modalCard.querySelector('input[type="checkbox"]');assert(check,'Нет выбора класса');check.checked=true;modalCard.querySelector('[type="submit"]').click();await Promise.resolve();await Promise.resolve();assert(lessonClassIds(data.lessons[0]).includes('qa-class'),'Не назначен');});
 await run('Поиск и уровни',()=>{lessonWorkspaceMode='';data=structuredClone(original);activeView='lessons';selectedLessonUnit='A1';searchQuery='несуществующий урок';render();assert(!pageContent.querySelector('.course-lesson-row'),'Поиск не фильтрует');searchQuery='';selectedLessonUnit='';render();assert(pageContent.querySelectorAll('[data-unit-open]').length===4,'Не все уровни');});
 await run('Домашняя работа',()=>{reset();openLessonEditor(data.lessons[0],'qa-homework',0,'homework');assert(lessonWorkspaceTab==='homework','Не открылась');assert(pageContent.textContent.includes('Напишите о себе'),'Нет задания');});
 await run('Пять языков и две темы',()=>{reset();for(const lang of ['ua','en','ru','sk','kk']){setLanguage(lang);assert(!pageContent.textContent.includes('undefined'),'Пустые переводы');}for(const theme of ['light','dark']){setTheme(theme);assert((document.documentElement.dataset.theme || 'light')===theme,'Тема не переключена');}});

 for(const width of [360,390,768,1024,1440]) await run('Ширина экрана '+width,async()=>{
 const frame=document.createElement('iframe');frame.style='position:fixed;top:0;left:0;z-index:99998;height:900px;border:0;width:'+width+'px';
 const loaded=new Promise(resolve=>frame.onload=resolve);frame.srcdoc=__QA_CHILD_HTML__;document.body.append(frame);await loaded;
 await new Promise(resolve=>frame.contentWindow.requestAnimationFrame(()=>frame.contentWindow.requestAnimationFrame(resolve)));
 try{const doc=frame.contentDocument;assert(doc.querySelector('.visual-rich-editor'),'Нет редактора');
 const overflow=doc.documentElement.scrollWidth>doc.documentElement.clientWidth+1;
 const controls=[...doc.querySelectorAll('.rich-toolbar-options button,.rich-toolbar-options select')];
 const outside=controls.filter(el=>{const r=el.getBoundingClientRect(),p=el.closest('.rich-toolbar-group').getBoundingClientRect();return r.width>0 && r.height>0 && (r.right>p.right+1 || r.left<p.left-1);});
 assert(!overflow && !outside.length,'Ширина страницы '+doc.documentElement.scrollWidth+' / '+doc.documentElement.clientWidth+'; элементов за границей: '+outside.length+'; '+[...doc.querySelectorAll('main *,header *,form *')].filter(el=>{const r=el.getBoundingClientRect();return r.width && r.right>width+1;}).slice(0,8).map(el=>el.tagName+'.'+el.className).join(', '));
 const body=doc.body, sidebar=doc.getElementById('sidebar'), menu=doc.getElementById('menuToggle'), main=doc.querySelector('.main-area');
 assert(body.classList.contains('lesson-focus'),'Не включён режим урока');
 if(width<=700){
 assert(sidebar.inert,'Мобильное меню не скрыто');
 assert(Math.abs(main.getBoundingClientRect().left)<1,'Слева осталось пустое место');
 menu.click();assert(sidebar.classList.contains('open')&&!sidebar.inert,'Меню не открылось');
 assert(Math.abs(main.getBoundingClientRect().left)<1,'Открытие меню сдвинуло урок');
 doc.dispatchEvent(new frame.contentWindow.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));assert(sidebar.inert&&!sidebar.classList.contains('open'),'Escape не закрыл меню');
 assert(doc.activeElement===menu,'Фокус не вернулся на кнопку');
 menu.click();doc.getElementById('sidebarBackdrop').click();assert(sidebar.inert,'Фон не закрыл меню');
 }else{
 assert(!sidebar.inert,'Панель значков недоступна');
 assert(Math.abs(main.getBoundingClientRect().left-76)<1,'Неверная ширина панели значков');
 sidebar.querySelector('.nav-item').focus();
 assert(sidebar.matches(':focus-within'),'Навигация не раскрывается с клавиатуры');
 assert(Math.abs(main.getBoundingClientRect().left-76)<1,'Раскрытие панели сдвинуло урок');
 }
 doc.querySelector('[data-workspace-back]').click();assert(!body.classList.contains('lesson-focus'),'Не вышел из режима урока');
 assert(sidebar.inert===(width<=700),'Не восстановилась обычная навигация');

 }finally{frame.remove();}
 });

 await run('Заголовок сохраняет вид после размера и выравнивания',()=>{const {root,source}=prepare();click(root.querySelector('[data-rich-format="## "]'));const input=root.querySelector('[data-rich-size]');input.value='24';input.dispatchEvent(new Event('change',{bubbles:true}));click(root.querySelector('[data-rich-format="[align=center]"]'));assert(SlovaActivityUI.renderRichText(source.value).includes('<h2>'),'Заголовок потерян: '+source.value);});
 await run('Вставка простого текста без потери выделения',()=>{const {editor,source}=prepare();const transfer=new DataTransfer();transfer.setData('text/plain','Новый текст');editor.dispatchEvent(new ClipboardEvent('paste',{clipboardData:transfer,bubbles:true,cancelable:true}));assert(source.value==='Новый текст',source.value);});
 await run('Добавить пункт',()=>{const {root,source}=prepare();root.querySelector('[data-rich-add-item]').click();assert(source.value.startsWith('- '),'Нет пункта списка');});
 await run('Добавление и удаление раздела',()=>{reset();pageContent.querySelector('[data-add-section="lesson"]').click();assert(draftSections.length===3,'Раздел не добавлен');const id=activeLessonSectionId;pageContent.querySelector('[data-delete-section="'+id+'"]').click();assert(draftSections.length===2,'Раздел не удалён');});
 await run('Перестановка разделов',()=>{reset();pageContent.querySelector('[data-move-section-from="qa-intro"][data-move-section="1"]').click();assert(draftSections[1].id==='qa-intro','Порядок не изменился');});
 await run('Переименование раздела и переход вперёд/назад',()=>{reset();const input=pageContent.querySelector('[data-section-title]');input.value='Новое название';input.dispatchEvent(new Event('input',{bubbles:true}));assert(pageContent.querySelector('[data-section-label="qa-intro"]').textContent==='Новое название','Название не изменилось');pageContent.querySelector('[data-section-step="1"]').click();assert(activeLessonSectionId==='qa-types','Нет перехода вперёд');pageContent.querySelector('[data-section-step="-1"]').click();assert(activeLessonSectionId==='qa-intro','Нет перехода назад');});
 await run('Копирование последнего элемента',()=>{reset();pageContent.querySelector('[data-copy-activity]').click();assert(draftSections[0].activities.length===2,'Нет копии');assert(draftSections[0].activities[0].id!==draftSections[0].activities[1].id,'Повторный ID');});
 await run('Переход редактирование/урок',()=>{reset();pageContent.querySelector('[data-workspace-mode="preview"]').click();assert(lessonWorkspaceMode==='preview','Нет предпросмотра');pageContent.querySelector('[data-workspace-mode="edit"]').click();assert(lessonWorkspaceMode==='edit','Нет редактирования');});
 for(const type of activityTypes.filter(type=>type.id!=='order-items'))await run('Добавление через выбор: '+type.id,()=>{reset();selectedActivityCategory='all';activitySearch='';openActivityPicker();modalCard.querySelector('[data-add-activity="'+type.id+'"]').click();assert(draftSections[0].activities.at(-1).type===type.id,'Не добавлен блок');assert(modalBackdrop.hidden,'Выбор не закрылся');});
 await run('Отмена назначения урока',()=>{reset();exitLessonWorkspace();openLessonAssignment('qa-lesson');modalCard.querySelector('[data-close]').click();assert(modalBackdrop.hidden,'Диалог не закрылся');assert(!lessonClassIds(data.lessons[0]).length,'Изменились назначения');});
 await run('Выход к списку уроков',()=>{reset();pageContent.querySelector('[data-workspace-back]').click();assert(!lessonWorkspaceMode,'Не вышел');assert(pageContent.querySelector('.course-lesson-row, [data-unit-open]'),'Нет списка');});

 await run('Галерея: одинаковый размер и полное фото',async()=>{const container=document.createElement('div');container.style='width:600px;max-width:100%';container.innerHTML=slovaGallery.html([{url:new URL('wide.svg',location.href).href,alt:'Широкое'},{url:new URL('tall.svg',location.href).href,alt:'Высокое'}]);document.body.append(container);try{const images=[...container.querySelectorAll('img')];await Promise.all(images.map(img=>img.decode()));const a=images[0].getBoundingClientRect(),b=images[1].getBoundingClientRect();assert(a.width===b.width&&a.height===b.height,'Разный размер карточек');assert(getComputedStyle(images[0]).objectFit==='contain','Изображение обрезается');container.querySelector('[data-gallery-step="1"]').click();assert(container.querySelector('[data-gallery]').dataset.galleryIndex==='1','Стрелка не работает');images[1].click();const box=document.querySelector('.slova-lightbox');assert(box&&!box.hidden,'Нет открытия');const image=box.querySelector('img');await image.decode();assert(image.src===images[1].src,'Потерян исходный файл');assert(getComputedStyle(image).objectFit==='contain','Фото обрезано при открытии');box.querySelector('[data-lightbox-step="-1"]').click();assert(box.querySelector('img').src===images[0].src,'Нет переключения');document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));assert(box.hidden,'Escape не закрыл');}finally{container.remove();}});
 await run('Добавление уроков из класса: поиск, уровни, сохранение и права директора',async()=>{
  const before={data,currentUser,workspaceAccess,api:window.teacherWorkspaceApi,client:window.supabaseClient};
  try {
   currentUser={id:'qa-owner'};workspaceAccess={role:'teacher',permissions:{view_assign_lessons:true,view_classes_students:true,manage_classes_students:true,edit_lessons:false}};
   const ready=(id,title,unit,classIds=[])=>({id,title,unit,classIds,teacherId:'qa-owner',sections:[{id:'section-'+id,title:'Text',activities:[{type:'text',content:'Ready lesson'}]}],homeworkSections:[]});
   data={classes:[{id:'picker-class',name:'Пустой класс',teacherId:'qa-owner',students:[]}],categories:[],lessons:[ready('existing','Уже назначен','A1'),ready('new','Новый урок','B1',['other-class']),{...ready('draft','Незавершённый','A1'),sections:[{title:'Blank',activities:[{type:'fill-blank',content:''}]}]}]};
   lessonWorkspaceMode='';handleAction('class-lessons','picker-class');
   assert(pageContent.querySelector('[data-action="add-class-lessons"]'),'Нет кнопки в пустом классе');
   data.lessons[0].classIds=['picker-class'];
   let fail=true;const writes=[];window.supabaseClient={};window.teacherWorkspaceApi={assignLessonsToClass:async(...args)=>{writes.push(args);if(fail)throw Error('Test offline');}};
   pageContent.querySelector('[data-action="add-class-lessons"]').click();
   const form=modalCard.querySelector('#classLessonPickerForm'),search=form.querySelector('[data-picker-search]'),level=form.querySelector('[data-picker-unit]');
   assert(form.querySelector('input[value="existing"]').disabled,'Уже назначенный урок доступен повторно');assert(form.querySelector('input[value="draft"]').disabled,'Незавершённый урок доступен');
   const choice=form.querySelector('input[value="new"]');choice.checked=true;choice.dispatchEvent(new Event('change',{bubbles:true}));
   level.value='A1';level.dispatchEvent(new Event('change',{bubbles:true}));assert(!form.querySelector('input[value="new"]'),'Фильтр уровня не сработал');
   level.value='';level.dispatchEvent(new Event('change',{bubbles:true}));search.value='Новый';search.dispatchEvent(new Event('input',{bubbles:true}));
   assert(form.querySelectorAll('[data-picker-list] input').length===1,'Поиск не ограничил список');assert(form.querySelector('input[value="new"]').checked,'Потерян выбор после фильтрации');
   form.requestSubmit();await new Promise(resolve=>setTimeout(resolve,30));assert(!modalBackdrop.hidden,'При ошибке окно закрылось');assert(!data.lessons[1].classIds.includes('picker-class'),'Ошибка показана как успешное назначение');
   fail=false;form.requestSubmit();await new Promise(resolve=>setTimeout(resolve,30));assert(modalBackdrop.hidden,'Окно не закрылось после сохранения');
   assert(data.lessons[1].classIds.includes('picker-class')&&data.lessons[1].classIds.includes('other-class'),'Потеряно прежнее назначение');assert(writes.at(-1)[3].join(',')==='new','Добавлены лишние уроки');
   workspaceAccess={role:'director',permissions:{view_lessons:true,view_classes_students:true,edit_lessons:true}};render();assert(!pageContent.querySelector('[data-action="add-class-lessons"]'),'Директор видит назначение уроков');
  } finally {closeModal();data=before.data;currentUser=before.currentUser;workspaceAccess=before.workspaceAccess;window.teacherWorkspaceApi=before.api;window.supabaseClient=before.client;activeClassFilter='';}
 });
 await run('Архив классов: перемещение, восстановление и запрет директору',async()=>{
  const before={data,currentUser,workspaceAccess,api:window.teacherWorkspaceApi,client:window.supabaseClient};
  try {
   currentUser={id:'qa-owner'};workspaceAccess={role:'teacher',permissions:{manage_classes_students:true,view_classes_students:true,view_assign_lessons:true}};
   data={classes:[{id:'archive-test',teacherId:'qa-owner',name:'Архивный тест',course:'A1',students:['Ученик'],studentRecords:[{id:'same-student',display_name:'Ученик'}],archivedAt:null}],lessons:[{id:'assigned',classIds:['archive-test']}],categories:[]};
   let calls=0;window.supabaseClient={};window.teacherWorkspaceApi={setClassArchived:async(client,id,archived)=>{calls++;return archived?'2026-11-16T12:00:00Z':null;}};
   classArchiveView=false;lessonWorkspaceMode='';activeView='classes';searchQuery='';render();
   pageContent.querySelector('[data-action="archive-class"]').click();await new Promise(resolve=>setTimeout(resolve,20));
   assert(!pageContent.querySelector('[data-open-class-id="archive-test"]'),'Архивный класс остался среди активных');
   pageContent.querySelector('[data-action="class-archive-view"][data-id="archive"]').click();assert(pageContent.querySelector('[data-open-class-id="archive-test"]'),'Архивный класс не появился');
   assert(data.classes[0].studentRecords[0].id==='same-student'&&data.lessons[0].classIds.includes('archive-test'),'Потеряны ученики или назначения');
   pageContent.querySelector('[data-action="restore-class"]').click();await new Promise(resolve=>setTimeout(resolve,20));
   pageContent.querySelector('[data-action="class-archive-view"][data-id="active"]').click();assert(pageContent.querySelector('[data-open-class-id="archive-test"]'),'Класс не восстановился');
   workspaceAccess={role:'director',permissions:{view_classes_students:true,view_lessons:true,edit_lessons:true}};render();assert(!pageContent.querySelector('[data-action="archive-class"]'),'Директор видит действие архивирования');assert(calls===2,'Лишние запросы сохранения');
  } finally {data=before.data;currentUser=before.currentUser;workspaceAccess=before.workspaceAccess;window.teacherWorkspaceApi=before.api;window.supabaseClient=before.client;classArchiveView=false;activeClassFilter='';}
 });
 await run('Одинаковые зелёные кнопки в светлой и тёмной теме',()=>{
  const container=document.createElement('section');container.innerHTML='<div class="toolbar"><button class="button">Основная</button><button class="button secondary">Категория</button><button class="button secondary small" aria-pressed="true">Активные</button><button class="button secondary small" aria-pressed="false">Архив</button><button class="button" disabled>Недоступно</button></div>';
  document.body.append(container);const previous=currentTheme;
  try {
   for(const theme of ['light','dark']){
    setTheme(theme);const buttons=[...container.querySelectorAll('button')],styles=buttons.map(button=>getComputedStyle(button));
    assert(styles.slice(0,4).every(style=>style.backgroundImage===styles[0].backgroundImage),'Цвета основных и вторичных кнопок различаются: '+theme);
    assert(styles.slice(0,4).every(style=>style.color==='rgb(255, 255, 255)'),'Нечитаемый текст: '+theme);
    assert(styles[0].backgroundImage.includes('19, 121, 79'),'Нет единого зелёного цвета: '+theme);
    assert(styles[2].boxShadow!==styles[3].boxShadow,'Не видна выбранная вкладка: '+theme);
    assert(Number(styles[4].opacity)<1&&styles[4].cursor==='not-allowed','Не видна блокировка кнопки: '+theme);
    buttons[1].focus();assert(getComputedStyle(buttons[1]).outlineStyle!=='none','Нет видимого фокуса: '+theme);
   }
  } finally {setTheme(previous);container.remove();}
 });
 await run('Зелёные кнопки публичного сайта и входа в двух темах',async()=>{
  const href=[...document.querySelectorAll('link[rel="stylesheet"]')].find(link=>link.href.includes('/assets/css/teacher.css')).href.replace('/teacher.css','/style.css');
  const frame=document.createElement('iframe');frame.style='position:fixed;left:-10000px;width:400px;height:200px';
  const loaded=new Promise(resolve=>{frame.onload=resolve;});frame.srcdoc='<link rel="stylesheet" href="'+href+'"><a class="btn-card-green-cta">Войти</a><a class="btn-custom-lg">Курсы</a>';document.body.append(frame);await loaded;
  try {for(const theme of ['light','dark']){frame.contentDocument.documentElement.dataset.theme=theme;for(const button of frame.contentDocument.querySelectorAll('a')){const style=frame.contentWindow.getComputedStyle(button);assert(style.backgroundImage.includes('19, 121, 79'),'Цвет публичной кнопки отличается: '+theme);assert(style.color==='rgb(255, 255, 255)','Нечитаемый текст публичной кнопки: '+theme);}}}finally{frame.remove();}
 });
 await run('Нет ошибок JavaScript при работе кнопок',()=>{assert(!window.qaErrors.length,window.qaErrors.join('; '));});
 clearTimeout(lessonDraftAutosaveTimer);
 lessonWorkspaceMode='';data=structuredClone(original);activeView='lessons';selectedLessonUnit='A1';searchQuery='';render();
 const report=document.createElement('div');report.id='qa-report';report.style='position:fixed;inset:20px;z-index:99999;background:#0f191e;color:#dff5e7;overflow:auto;padding:20px;white-space:pre-wrap;font-size:16px';report.textContent=results.join('\n')+'\nTOTAL '+results.length+'; FAIL '+results.filter(x=>x.startsWith('FAIL')).length;const lines=report.textContent.split('\n');report.textContent='';for(const line of lines){const p=document.createElement('p');p.textContent=line;p.style='margin:4px 0';report.append(p);}document.body.append(report);
})();
