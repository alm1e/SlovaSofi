    language='ru';user={id:'mobile-student',email:'test@example.invalid',user_metadata:{}};dashboardStatus='ready';
    if(window.SlovaPhotoGapDetector)SlovaPhotoGapDetector.detect=()=>[];
    (async()=>{
        const results=[];
        window.showMobileBlock=async(i,theme='dark')=>{
            const activity=structuredClone(MobileBlockFixtures.safe[i]);document.documentElement.dataset.theme=theme;
            draftSaveTimers.forEach(clearTimeout);draftSaveTimers.clear();pendingDrafts.clear();
            openedLesson={id:'mobile-lesson',revision:'mobile-revision',title:'Мобильная проверка',unit:'A1',progress:{},sections:[{id:'mobile-section',title:'Все типы блоков',activities:[activity]}]};
            lessons=[openedLesson];classes=[];selectedLessonId=openedLesson.id;activeView='lessons';studentWorkspaceTab='lesson';activeStudentSectionId='mobile-section';render();
            const container=pageContent.querySelector('[data-student-section]');await MobileBlockAudit.pictures(container);return container;
        };
        for(const theme of ['light','dark'])for(let i=0;i<MobileBlockFixtures.safe.length;i++){
            const name=theme+' '+MobileBlockFixtures.safe[i].type+' '+i;window.qaMobileProgress=name;
            try{const container=await showMobileBlock(i,theme);const issues=MobileBlockAudit.measure(container);results.push((issues.length?'FAIL ':'PASS ')+name+(issues.length?' — '+issues.join('; '):''));}
            catch(error){results.push('FAIL '+name+' — '+error.message);}
        }
        if(innerWidth<=700){
            try{
                pageContent.querySelector('[data-toggle-student-sections]').click();
                const drawer=pageContent.querySelector('.student-sections-panel'),r=drawer.getBoundingClientRect();
                if(r.left<0||r.right>innerWidth+1)throw Error('drawer exceeds viewport');
                pageContent.querySelector('[data-close-student-sections]').click();
                if(document.documentElement.scrollWidth>innerWidth+2)throw Error('closed drawer widens page');
                results.push('PASS mobile section drawer opens and closes within viewport');
            }catch(error){results.push('FAIL mobile section drawer: '+error.message);}
        }
        MobileBlockAudit.report(results);
    })();
