window.qaRunLessonImprovements=async function(){
 const results=[];const assert=(ok,message)=>{if(!ok)throw Error(message);};
 const run=async(name,fn)=>{try{await fn();results.push('PASS '+name);}catch(e){results.push('FAIL '+name+': '+e.message);}};
 const original=structuredClone(data);
 const reset=(activity={type:'text',prompt:'Text',content:'## Heading\nSome text'})=>{
   clearTimeout(lessonDraftAutosaveTimer);lessonUndoHistory=null;lessonUndoKey='';liveMonitorOpen=false;
   data=structuredClone(original);data.lessons[0].sections=[{id:'qa-intro',title:'Introduction',activities:[{...activity,id:'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'},{type:'text',id:'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',content:'Second activity'}]}];
   data.lessons[0].classIds=['qa-class'];openLessonEditor(data.lessons[0],'qa-intro',0);return pageContent;
 };
 await run('Lesson sections and homework are directly reachable from the same panel in both modes',()=>{
   reset();
   const lesson=data.lessons[0];
   lesson.sections.push({id:'qa-next',title:'Next section',activities:[{type:'text',content:'Second section content'}]});
   openLessonPreview(lesson.id);
   for(const mode of ['preview','edit']){
     pageContent.querySelector(`[data-workspace-mode="${mode}"]`).click();
     const panel=pageContent.querySelector('.lesson-sections-panel'),main=pageContent.querySelector('.lesson-workspace-main');
     const p=panel.getBoundingClientRect(),m=main.getBoundingClientRect();
     assert(panel.closest('.lesson-workspace-rail')&&p.width>0&&p.height>0,'Sections not visible');
     assert(innerWidth<=700?p.bottom<=m.top:p.left>=m.right,'Sections not in the expected position');
     assert(!pageContent.querySelector('[data-tools-sections]'),'Duplicate sections button');
     pageContent.querySelector('[data-select-section="qa-next"]').click();
     assert(pageContent.querySelector('[aria-current="location"]')?.dataset.selectSection==='qa-next','Selected section not marked');
     assert(pageContent.querySelector('.lesson-workspace-main').textContent.includes('Second section content'),'Section did not render');
     pageContent.querySelector('[data-select-section="qa-homework"]').click();
     assert(lessonWorkspaceTab==='homework'&&pageContent.querySelector('[aria-current="location"]')?.dataset.selectSection==='qa-homework','Homework not reachable');
     assert(pageContent.querySelector('[data-select-section="qa-intro"]'),'Lesson navigation disappeared on homework');
   }
 });
 await run('Right rail stays in reach while the lesson scrolls',()=>{
   reset();
   openLessonPreview(data.lessons[0].id);
   const rail=pageContent.querySelector('.lesson-workspace-rail');
   const monitor=rail.querySelector('#lessonLiveAnswers'),toggle=rail.querySelector('[data-toggle-live-monitor]');
   if(innerWidth<=700){
     assert(toggle.getClientRects().length&&!monitor.getClientRects().length,'Phone answers disclosure has wrong default');
     toggle.click();
     assert(monitor.getClientRects().length&&toggle.getAttribute('aria-expanded')==='true','Phone answers did not open');
     toggle.focus();toggle.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
     assert(!monitor.getClientRects().length&&document.activeElement===toggle,'Escape did not close phone answers');
   }else{
     assert(monitor.getClientRects().length&&!toggle.getClientRects().length,'Desktop answers are not visible');
     pageContent.querySelector('.lesson-workspace-main').style.minHeight='210vh';
     window.scrollTo({top:350,behavior:'instant'});
     const topbar=document.querySelector('.topbar').getBoundingClientRect();
     const box=rail.getBoundingClientRect();
     assert(box.top>=topbar.bottom-1&&box.top<=topbar.bottom+20&&box.bottom<=innerHeight+1,'Sticky rail overlaps the header or loses controls');
     window.scrollTo({top:0,behavior:'instant'});
   }
 });
 await run('Undo and redo restore a deleted activity',()=>{
   reset();pageContent.querySelector('[data-remove-block]').click();assert(draftSections[0].activities.length===1,'Not deleted');
   pageContent.querySelector('[data-tools-undo]').click();assert(draftSections[0].activities.length===2,'Undo failed');pageContent.querySelector('[data-tools-redo]').click();assert(draftSections[0].activities.length===1,'Redo failed');
 });
 await run('Opening a lesson shows its title, sections and every activity',()=>{
   reset();openLessonPreview(data.lessons[0].id);
   assert(window.scrollY===0,'Lesson skipped its heading');
   assert(!pageContent.querySelector('[data-tools-present]'),'Presentation control remains');
   const cards=[...pageContent.querySelectorAll('.lesson-preview-list > .preview-activity')];
   assert(cards.length===2&&cards.every(card=>card.getClientRects().length),'Some activities are hidden');
 });
 await run('The pencil on activity 21 edits only that photo and keeps its position',async()=>{
   reset();
   const lesson=data.lessons[0], photoUrl='https://example.invalid/workspace-photo.png';
   lesson.sections[0].activities=[
     ...Array.from({length:19},(_,index)=>({type:'text',content:'Activity '+(index+1)})),
     {type:'open-answer',prompt:'Keep the practice answer'},
     {type:'image',prompt:'Original photo',content:photoUrl},
     {type:'text',prompt:'Keep this last activity',content:'Last activity'}
   ];
   openLessonPreview(lesson.id);
   const list=pageContent.querySelector('.lesson-preview-list');
   const practice=list.querySelector('[data-preview-activity="19"] [data-open-answer]');
   practice.value='Unsaved practice answer';
   const pencil=list.querySelector('[data-edit-preview-block="20"]');
   pencil.scrollIntoView({block:'center',behavior:'instant'});
   const card=list.querySelector('[data-preview-activity="20"]');
   const position=card.getBoundingClientRect().top;
   const pencilBox=pencil.getBoundingClientRect(),cardBox=card.getBoundingClientRect();
   assert(pencilBox.width>=44&&pencilBox.left>cardBox.left+cardBox.width/2&&pencilBox.right<=cardBox.right,'Pencil does not fit on the top right');
   pencil.click();
   const editor=list.querySelector('[data-inline-block-editor][data-block-index="20"]');
   assert(editor&&lessonWorkspaceMode==='preview','Pencil did not open the block in place');
   assert(Math.abs(editor.getBoundingClientRect().top-position)<=2,'Page jumped when opening the editor');
   assert(list.querySelector('[data-open-answer]')===practice&&practice.value==='Unsaved practice answer','Another exercise changed');
   assert(editor.querySelector('[data-pick-image]'),'Photo upload missing');
   const updatePrompt=value=>{
     const prompt=list.querySelector('[data-inline-block-editor] [data-field="prompt"]');
     prompt.value=value;prompt.dispatchEvent(new Event('input',{bubbles:true}));
   };
   updatePrompt('Cancel this edit');
   editor.querySelector('[data-photo-interactive-toggle]').click();
   editor.querySelector('[data-cancel-inline-activity]').click();
   assert(lesson.sections[0].activities[20].prompt==='Original photo'&&!lesson.sections[0].activities[20].settings?.photoInteractive,'Cancel changed the lesson');
   const restoredPencil=list.querySelector('[data-edit-preview-block="20"]');
   assert(document.activeElement===restoredPencil,'Cancel did not return focus to the pencil');
   restoredPencil.click();
   updatePrompt('Edited photo');
   const photoPanel=list.querySelector('[data-inline-block-editor] [data-builder-preview]');
   const image=photoPanel.querySelector('img');
   image.src='wide.svg';await image.decode();
   const write=photoPanel.querySelector('[data-photo-tool="input"]');
   assert(write.getClientRects().length&&!list.querySelector('[data-photo-interactive-toggle]').checked,'Teacher writing is unavailable until student answers are enabled');
   write.click();
   const canvas=photoPanel.querySelector('canvas'),box=canvas.getBoundingClientRect();
   canvas.dispatchEvent(new PointerEvent('pointerdown',{button:0,clientX:box.left+box.width*.4,clientY:box.top+box.height*.5,pointerId:1}));
   const annotation=photoPanel.querySelector('[data-photo-field-answer]');
   annotation.value='Ahoj';annotation.dispatchEvent(new InputEvent('input',{bubbles:true}));
   list.querySelector('[data-photo-interactive-toggle]').click();
   list.querySelector('[data-save-inline-activity]').click();
   await new Promise(requestAnimationFrame);
   const updated=lesson.sections[0].activities[20];
   assert(updated.prompt==='Edited photo'&&updated.settings.photoInteractive&&updated.content===photoUrl,'Wrong photo content saved');
   assert(updated.settings.imageAnnotations[photoUrl][0].text==='Ahoj','Inline photo annotation was not saved');
   assert(!list.querySelector('[data-inline-block-editor]')&&list.querySelector('[data-preview-activity="20"] h3').textContent.includes('Edited photo'),'Saved photo did not reappear');
   const restored=list.querySelector('[data-preview-activity="20"]');
   const restoredBox=restored.getBoundingClientRect();
   assert(restoredBox.top<innerHeight&&restoredBox.bottom>document.querySelector('.topbar').getBoundingClientRect().bottom
     &&document.activeElement===restored.querySelector('[data-edit-preview-block]'),'Saving did not return to the same activity');
   assert(practice.isConnected&&practice.value==='Unsaved practice answer','Saving recreated another activity');
 });
 await run('Inline homework edit keeps its draft after a failed save and can retry',async()=>{
   reset();
   const lesson=data.lessons[0];
   lesson.homeworkSections[0].activities=[{type:'multiple-choice',prompt:'Homework question',content:'[dom]\nauto'}];
   openLessonPreview(lesson.id);
   pageContent.querySelector('[data-select-section="qa-homework"]').click();
   pageContent.querySelector('[data-edit-preview-block="0"]').click();
   assert(pageContent.querySelector('[data-inline-block-editor] [data-visual-settings]'),'Graphical editor missing');
   pageContent.querySelector('[data-inline-block-editor] [data-add-question]').click();
   assert(pageContent.querySelectorAll('[data-inline-block-editor] .activity-question-editor-item').length===2,'Question did not get added in place');
   const prompt=pageContent.querySelector('[data-inline-block-editor] [data-field="prompt"]');
   prompt.value='Edited homework';prompt.dispatchEvent(new Event('input',{bubbles:true}));
   const write=persistWorkspaceChange;
   try {
     persistWorkspaceChange=async previous=>{data=previous;render();return false;};
     pageContent.querySelector('[data-save-inline-activity]').click();
     await new Promise(requestAnimationFrame);
     assert(pageContent.querySelector('[data-inline-block-editor] [data-field="prompt"]').value==='Edited homework','Failed save lost the draft');
     assert(!pageContent.querySelector('[data-save-inline-activity]').disabled,'Retry is disabled');
     assert(data.lessons[0].homeworkSections[0].activities[0].prompt==='Homework question','Failed write changed the stored lesson');
   } finally {persistWorkspaceChange=write;}
   pageContent.querySelector('[data-save-inline-activity]').click();
   await new Promise(requestAnimationFrame);
   const saved=data.lessons[0].homeworkSections[0].activities[0];
   assert(saved.prompt==='Edited homework'&&saved.questions.length===2,'Homework did not save on retry');
   assert(data.lessons[0].sections[0].activities[0].prompt==='Text','Homework edit changed the main section');
 });
 await run('The pencil resumes the correct card when the full editor already has a draft',()=>{
   reset();
   draftSections[0].activities[1].prompt='Existing draft';
   switchLessonWorkspaceMode('preview');
   pageContent.querySelector('[data-edit-preview-block="1"]').click();
   const editor=pageContent.querySelector('#activityBlocks [data-block-index="1"].is-expanded');
   assert(editor&&editor.querySelector('[data-field="prompt"]').value==='Existing draft','Existing editor draft was discarded or wrong card expanded');
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
