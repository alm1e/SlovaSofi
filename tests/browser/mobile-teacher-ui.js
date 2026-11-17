(async()=>{
 const results=[],fixtures=MobileBlockFixtures.raw;
 currentLanguage='ru';currentUser=null;if(window.SlovaPhotoGapDetector)SlovaPhotoGapDetector.detect=()=>[];
 window.showMobileBlock=async(i,theme='dark',mode='preview')=>{
   const block=structuredClone(fixtures[i]);document.documentElement.dataset.theme=theme;
   data.classes=[];data.lessons=[{id:'mobile-lesson',title:'Мобильная проверка',unit:'A1',classIds:[],sections:[{id:'mobile-section',title:'Задания',activities:[block]}],homeworkSections:[]}];
   if(mode==='preview')openLessonPreview('mobile-lesson');else openLessonEditor(data.lessons[0],'mobile-section',0);
   const container=pageContent.querySelector(mode==='preview'?'.preview-activity':'.builder-block');if(!container)throw Error('block not rendered');
   await MobileBlockAudit.pictures(container);return container;
 };
 for(const theme of ['light','dark'])for(const mode of ['preview','edit'])for(let i=0;i<fixtures.length;i++){
  const name=`${theme} ${mode} ${fixtures[i].type} ${i}`;window.qaMobileProgress=name;
  try{const container=await showMobileBlock(i,theme,mode);const issues=MobileBlockAudit.measure(container);results.push((issues.length?'FAIL ':'PASS ')+name+(issues.length?' — '+issues.join('; '):''));}
  catch(error){results.push('FAIL '+name+' — '+error.message);}
 }
 clearTimeout(lessonDraftAutosaveTimer);MobileBlockAudit.report(results);
})();
