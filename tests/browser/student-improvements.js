    window.qaRunStudentImprovements=async()=>{
        qaButton.remove();
        const results=[];const assert=(ok,message)=>{if(!ok)throw Error(message);};
        const run=async(name,fn)=>{try{await fn();results.push('PASS '+name);}catch(error){results.push('FAIL '+name+': '+error.message);}};
        await run('Student sections are visible on desktop and accessible from the normal drawer on mobile',()=>{
            qaReset();const button=pageContent.querySelector('[data-toggle-student-sections]'),panel=pageContent.querySelector('.student-sections-panel');
            if(innerWidth<=700){
                button.click();assert(panel.classList.contains('is-open'),'Drawer not open');
                pageContent.querySelector('[data-close-student-sections]').click();assert(!panel.classList.contains('is-open'),'Drawer not closed');
            }else{
                const main=pageContent.querySelector('.student-workspace-main').getBoundingClientRect();
                assert(panel.getBoundingClientRect().left>=main.right,'Sections not beside the lesson');
            }
            assert(!pageContent.querySelector('[data-tools-sections], [data-tools-present]'),'Extra workspace controls');
        });
        await run('Saved status explicitly confirms server storage',()=>{qaReset();updateSaveStatus('saved');const status=pageContent.querySelector('[data-draft-save-status]');assert(/сервер|server/.test(status.textContent),'Ambiguous saved status');assert(status.dataset.saveState==='saved','Wrong status');});
        await run('Pending answer distinguishes local backup from failure',()=>{qaReset('open-answer');backupFailed=false;updateSaveStatus('error');const status=pageContent.querySelector('[data-draft-save-status]');assert(/устройств|device/.test(status.textContent),'Local backup missing');assert(status.querySelector('[data-retry-answer-save]'),'No retry');backupFailed=true;updateSaveStatus('error');assert(/недоступна|unavailable/.test(status.textContent),'Backup failure missing');backupFailed=false;updateSaveStatus('saved');});
        await run('No student horizontal overflow and section toggle fits',()=>{qaReset('open-answer');const width=document.documentElement.clientWidth;assert(document.documentElement.scrollWidth<=width+1,'Page overflow');const toggle=pageContent.querySelector('[data-toggle-student-sections]');if(innerWidth<=700)assert(toggle.getBoundingClientRect().height>=44,'Small touch control');});
        draftSaveTimers.forEach(clearTimeout);draftSaveTimers.clear();pendingDrafts.clear();return results;
    };
