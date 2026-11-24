window.qaRunLessonImprovements=async function(){
 const results=[];const assert=(ok,message)=>{if(!ok)throw Error(message);};
 const run=async(name,fn)=>{try{await fn();results.push('PASS '+name);}catch(e){results.push('FAIL '+name+': '+e.message);}};
 const original=structuredClone(data);
 const reset=(activity={type:'text',prompt:'Text',content:'## Heading\nSome text'})=>{
   clearTimeout(lessonDraftAutosaveTimer);lessonUndoHistory=null;lessonUndoKey='';
   data=structuredClone(original);data.lessons[0].sections=[{id:'qa-intro',title:'Introduction',activities:[{...activity,id:'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'},{type:'text',id:'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',content:'Second activity'}]}];
   data.lessons[0].classIds=['qa-class'];openLessonEditor(data.lessons[0],'qa-intro',0);return pageContent;
 };
 await run('Sections drawer opens and closes without narrowing lesson',()=>{
   reset();const layout=pageContent.querySelector('.lesson-workspace-layout'),width=layout.getBoundingClientRect().width;
   assert(getComputedStyle(pageContent.querySelector('.lesson-sections-panel')).display==='none','Panel initially visible');
   pageContent.querySelector('[data-tools-sections]').click();assert(getComputedStyle(pageContent.querySelector('.lesson-sections-panel')).display!=='none','Panel hidden after opening');
   assert(Math.abs(layout.getBoundingClientRect().width-width)<1,'Lesson width changed');pageContent.querySelector('[data-tools-close]').click();assert(!document.body.classList.contains('lesson-sections-open'),'Panel did not close');
 });
 await run('Undo and redo restore a deleted activity',()=>{
   reset();pageContent.querySelector('[data-remove-block]').click();assert(draftSections[0].activities.length===1,'Not deleted');
   pageContent.querySelector('[data-tools-undo]').click();assert(draftSections[0].activities.length===2,'Undo failed');pageContent.querySelector('[data-tools-redo]').click();assert(draftSections[0].activities.length===1,'Redo failed');
 });
 await run('Presentation and arrow keys show one activity',()=>{
   reset();switchLessonWorkspaceMode('preview');pageContent.querySelector('[data-tools-present]').click();
   assert(document.body.classList.contains('lesson-presenting'),'Not presenting');const cards=[...pageContent.querySelectorAll('.lesson-preview-list > .preview-activity')];assert(cards.length===2,'Two cards expected');assert(cards[1].classList.contains('presentation-hidden'),'Second card visible');
   document.body.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}));assert(cards[0].classList.contains('presentation-hidden')&&!cards[1].classList.contains('presentation-hidden'),'Arrow failed');
   document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));assert(!document.body.classList.contains('lesson-presenting'),'Escape failed');
 });
 await run('Readiness explains the problem and opens its block',()=>{
   reset({type:'audio',content:''});pageContent.querySelector('[data-tools-validate]').click();assert(modalCard.querySelector('[data-readiness-go]'),'No issue link');modalCard.querySelector('[data-readiness-go]').click();assert(modalBackdrop.hidden,'Issue dialog still open');assert(pageContent.querySelector('.builder-block.is-expanded'),'Problem not expanded');
 });
 for(const type of ['multiple-choice','match','vocabulary','flashcards','columns','order-items'])await run('Graphical rows '+type,()=>{
   reset({type,content:'',settings:{}});const panel=pageContent.querySelector('[data-visual-settings]');assert(panel,'No settings panel');
   [...panel.querySelectorAll('button')].find(button=>/Добавить|Add row/.test(button.textContent))?.click();
   const row=panel.querySelector('.visual-setting-row');assert(row,'No row');const inputs=[...row.querySelectorAll('input')].filter(input=>input.type!=='checkbox');
   inputs[0].value='dom';inputs[0].dispatchEvent(new Event('input',{bubbles:true}));if(inputs[1]){inputs[1].value='house';inputs[1].dispatchEvent(new Event('input',{bubbles:true}));}
   const check=row.querySelector('[type="checkbox"]');if(check){check.checked=true;check.dispatchEvent(new Event('change',{bubbles:true}));}
   assert(JSON.stringify(draftSections[0].activities[0]).includes('dom'),'Change not stored');assert(pageContent.querySelector('[data-tools-undo]')?.disabled===false,'Graphical edit missing from history');
   row.querySelector('button').click();assert(!panel.querySelector('.visual-setting-row'),'Row not removed');
 });
 await run('Image markers can be added and edited without JSON',()=>{
   reset({type:'interactive-image',content:new URL('wide.svg',document.baseURI).href,settings:{}});
   const panel=pageContent.querySelector('[data-visual-settings]');[...panel.querySelectorAll('button')].find(b=>/Добавить|Add row/.test(b.textContent)).click();
   const input=panel.querySelector('.visual-setting-row input');input.value='dom';input.dispatchEvent(new Event('input',{bubbles:true}));assert(draftSections[0].activities[0].settings.hotspots[0].word==='dom','Marker not stored');
 });
 await run('Realtime updates keep lesson, input, media and scroll DOM intact',()=>{
   reset({type:'open-answer',prompt:'Answer',content:'Describe your day'});switchLessonWorkspaceMode('preview');
   monitorClassId='qa-class';selectedLiveStudentId='student-0';render();
   const workspace=pageContent.querySelector('.lesson-workspace'),panel=pageContent.querySelector('[data-live-progress-index]');assert(panel,'No live answer panel');
   const input=panel.querySelector('[data-live-review-feedback]');input.closest('details').open=true;input.value='Unsaved review';input.focus({preventScroll:true});
   const audio=document.createElement('audio');panel.querySelector('[data-recording-player]').append(audio);
   const activity=data.lessons[0].sections[0].activities[0],key=activityProgressKey(activity,0);
   liveProgressRows.set('student-0',{student_id:'student-0',class_id:'qa-class',lesson_id:data.lessons[0].id,answers:{[key]:{response:'New student answer',draft:true}}});
   const y=window.scrollY;refreshLiveProgressView();assert(pageContent.querySelector('.lesson-workspace')===workspace,'Workspace replaced');assert(panel.querySelector('[data-live-review-feedback]')===input&&input.value==='Unsaved review','Review replaced');assert(document.activeElement===input,'Focus lost');assert(panel.querySelector('audio')===audio,'Audio replaced');assert(window.scrollY===y,'Scroll changed');assert(panel.textContent.includes('New student answer'),'Live response not updated');
 });
 await run('Grouped realtime answers retain stable block and question identity',()=>{
   reset({type:'multiple-choice',content:'',questions:[{id:'first',content:'[dom]\nškola',answer:'dom'}]});switchLessonWorkspaceMode('preview');monitorClassId='qa-class';selectedLiveStudentId='student-0';render();
   const activity=data.lessons[0].sections[0].activities[0];const qid=activityQuestionProgressId(activity.questions[0],0,activity.questions);const key=`${activityProgressKey(activity,0)}.q${qid}`;
   liveProgressRows.set('student-0',{student_id:'student-0',class_id:'qa-class',lesson_id:data.lessons[0].id,answers:{[key]:{response:'dom',correct:true,draft:false}}});refreshLiveProgressView();
   const panel=pageContent.querySelector('[data-live-question-id]');assert(panel.querySelector('.live-answer-response').textContent==='dom','Grouped answer missing');assert(panel.classList.contains('is-correct'),'Grouped grade missing');
 });
 await run('Graphical choices survive explicit lesson save and reopening',async()=>{
   reset({type:'multiple-choice',content:'[dom]\nškola',answer:'dom'});const panel=pageContent.querySelector('[data-visual-settings]'),input=panel.querySelector('.visual-setting-row input');input.value='auto';input.dispatchEvent(new Event('input',{bubbles:true}));
   const form=pageContent.querySelector('#lessonForm');await saveLesson({preventDefault(){},currentTarget:form});const saved=data.lessons[0];assert(saved.sections[0].activities[0].content.includes('auto'),'Saved choice missing');openLessonEditor(saved,'qa-intro',0);assert(pageContent.querySelector('[data-visual-settings] .visual-setting-row input').value==='auto','Saved choice not restored');
 });
 await run('No horizontal overflow or controls outside viewport',()=>{
   reset();const width=document.documentElement.clientWidth;assert(document.documentElement.scrollWidth<=width+1,'Document overflows '+document.documentElement.scrollWidth+'/'+width);
   const controls=[...pageContent.querySelectorAll('.lesson-tools button,.visual-setting-row input,.rich-toolbar-options button')].filter(el=>el.getBoundingClientRect().width);
   assert(controls.every(el=>{const rect=el.getBoundingClientRect();return rect.left>=-1&&rect.right<=width+1;}),'Control outside viewport');
 });
 clearTimeout(lessonDraftAutosaveTimer);return results;
};
