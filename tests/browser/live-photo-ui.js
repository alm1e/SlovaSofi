(async()=>{
    const results=[],check=(name,ok)=>results.push(`${ok?'PASS':'FAIL'} ${name}`);
    try{
        currentLanguage='ru';currentUser=null;
        const url='https://school.example/photo.png',blockId='00000000-0000-4000-8000-000000000099';
        const recordingPath=Array(4).fill(blockId).join('/')+'.webm';
        data.classes=[{id:'qa-class',name:'Photo class',course:'Slovak A1',students:['Learner'],studentRecords:[{id:'qa-member',display_name:'Learner'}]}];
        data.lessons=[{id:'qa-lesson',title:'Photo answers',unit:'A1',classIds:['qa-class'],sections:[{id:'qa-section',title:'Photo',activities:[
            {id:blockId,type:'image',prompt:'Фото с ответом',content:url,settings:{photoInteractive:true}},
            {type:'image',prompt:'Обычное фото',content:url,settings:{}},
            {type:'pronunciation-recording',prompt:'Запись',content:'Ahoj!'}
        ]}],homeworkSections:[]}];
        openLessonPreview('qa-lesson');
        const note={type:'input',id:'word',x:200,y:200,w:100,h:40,text:'áno'};
        const [,plainPhoto,recording]=normalizeLessonSections(data.lessons[0])[0].activities;
        liveProgressRows=new Map([['qa-member',{student_id:'qa-member',class_id:'qa-class',lesson_id:'qa-lesson',answers:{
            ['b'+blockId]:{response:JSON.stringify({[url]:[note]}),correct:null,draft:true},
            [activityProgressKey(plainPhoto,1)]:{response:JSON.stringify({[url]:[note]}),correct:null,draft:true},
            [activityProgressKey(recording,2)]:{response:recordingPath,correct:null,draft:true}
        }}]]);
        render();
        const panel=pageContent.querySelector('[data-live-photo-answer]'),editor=panel.querySelector('.photo-editor'),img=editor.querySelector('img');
        const staticCard=pageContent.querySelector('[data-preview-activity="1"]');
        check('ordinary photo shows only the gallery even with a legacy answer',Boolean(staticCard.querySelector('[data-gallery-zoom]')&&!staticCard.querySelector('.live-answer-inline, [data-photo-tool]')));
        const progressBar=pageContent.querySelector('.live-student-tab [role="progressbar"]');
        check('completion counts the interactive photo and recording only',progressBar?.getAttribute('aria-valuenow')==='2'&&progressBar.getAttribute('aria-valuemax')==='2');
        check('one primary photo without a collapsed teacher notes panel',panel.querySelectorAll('.photo-editor').length===1&&!pageContent.querySelector('.photo-teacher-notes'));
        check('teacher can type directly on the primary photo',Boolean(editor.querySelector('[data-photo-tool="input"]')&&editor.querySelector('[data-photo-editable]')));
        check('student words remain separate from saved teacher annotations',!JSON.stringify(window.SlovaPhotoEditor.value(panel)).includes('áno'));

        const playButton=pageContent.querySelector('[data-play-recording]'),playbackPanel=playButton.closest('.live-answer-inline');
        const signedPaths=[];
        window.supabaseClient={storage:{from:()=>({createSignedUrl:async path=>{signedPaths.push(path);return {data:{signedUrl:'http://127.0.0.1:1/test.webm'}};}})}};
        playButton.click();
        await new Promise(requestAnimationFrame);
        const player=playbackPanel.querySelector('audio');
        check('playback loads the chosen recording into the card',signedPaths[0]===recordingPath&&Boolean(player?.controls));
        img.src='tall.svg';await img.decode();await new Promise(requestAnimationFrame);
        for(const theme of ['light','dark']){
            document.documentElement.dataset.theme=theme;await new Promise(requestAnimationFrame);
            const card=panel.closest('[data-preview-activity]'),style=getComputedStyle(card),available=card.clientWidth-parseFloat(style.paddingLeft)-parseFloat(style.paddingRight);
            const imageBox=img.getBoundingClientRect(),editorBox=editor.getBoundingClientRect(),canvasBox=editor.querySelector('canvas').getBoundingClientRect();
            check(`${theme}: photo spans the lesson card (${Math.round(imageBox.width)} / ${Math.round(available)} px)`,imageBox.width>=available*.9);
            check(`${theme}: answer photo occupies a full grid row`,getComputedStyle(editor.closest('[data-photo-live-index]')||editor).gridColumnStart==='1'&&getComputedStyle(editor.closest('[data-photo-live-index]')||editor).gridColumnEnd==='-1');
            check(`${theme}: image retains its full portrait proportions`,Math.abs(imageBox.height/imageBox.width-2)<.01);
            check(`${theme}: annotation canvas stays aligned`,Math.abs(imageBox.left-canvasBox.left)<1&&Math.abs(imageBox.top-canvasBox.top)<1&&Math.abs(imageBox.width-canvasBox.width)<1&&Math.abs(imageBox.height-canvasBox.height)<1);
            check(`${theme}: avatar remains small while the photo fills the row`,panel.querySelector('.live-answer-avatar').getBoundingClientRect().width===28&&editorBox.width>150);
            check(`${theme}: saved answer remains attached to the image`,editor.querySelector('[data-photo-field-answer]').value==='áno');
            const playBox=playButton.getBoundingClientRect(),recordingBox=playbackPanel.getBoundingClientRect(),playerBox=player.getBoundingClientRect();
            check(`${theme}: playback button and audio controls fit the answer card`,getComputedStyle(playButton).gridColumnStart==='2'
                &&playBox.left>=recordingBox.left+28&&playBox.right<=recordingBox.right+1&&playButton.scrollWidth<=playButton.clientWidth
                &&playerBox.left>=recordingBox.left&&playerBox.right<=recordingBox.right+1);
            check(`${theme}: no horizontal page overflow`,document.documentElement.scrollWidth<=innerWidth+2);
        }
        const resetCalls=[],messages=[],confirm=window.confirm;
        const resetButton=pageContent.querySelector('[data-reset-lesson-progress]');
        window.teacherWorkspaceApi={resetLessonProgress:async (_client,...args)=>{resetCalls.push(args);}};
        try{
            window.confirm=message=>{messages.push(message);return false;};resetButton.click();
            check('cancel keeps saved answers and names the student and lesson',!resetCalls.length&&liveProgressRows.has('qa-member')&&messages[0]?.includes('Learner')&&messages[0].includes('Photo answers'));
            window.confirm=()=>true;resetButton.click();await new Promise(requestAnimationFrame);
            check('confirmation resets only the selected student, class, and lesson',JSON.stringify(resetCalls)===JSON.stringify([['qa-class','qa-lesson','qa-member']]));
        }finally{window.confirm=confirm;}
    }catch(error){check('live photo exception: '+error.message,false);}
    const report=document.createElement('pre');report.id='qa-report';report.style='white-space:pre-wrap';report.textContent=results.join('\n')+'\nTOTAL '+results.length+'; FAIL '+results.filter(line=>line.startsWith('FAIL')).length;document.body.append(report);
})();
