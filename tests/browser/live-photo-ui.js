(async()=>{
    const results=[],check=(name,ok)=>results.push(`${ok?'PASS':'FAIL'} ${name}`);
    try{
        currentLanguage='ru';currentUser=null;
        const url='https://school.example/photo.png',blockId='00000000-0000-4000-8000-000000000099';
        data.classes=[{id:'qa-class',name:'Photo class',course:'Slovak A1',students:['Learner'],studentRecords:[{id:'qa-member',display_name:'Learner'}]}];
        data.lessons=[{id:'qa-lesson',title:'Photo answers',unit:'A1',classIds:['qa-class'],sections:[{id:'qa-section',title:'Photo',activities:[{id:blockId,type:'image',prompt:'Фото с ответом',content:url,settings:{}}]}],homeworkSections:[]}];
        openLessonPreview('qa-lesson');
        const note={type:'input',id:'word',x:200,y:200,w:100,h:40,text:'áno'};
        liveProgressRows=new Map([['qa-member',{student_id:'qa-member',class_id:'qa-class',lesson_id:'qa-lesson',answers:{['b'+blockId]:{response:JSON.stringify({[url]:[note]}),correct:null,draft:true}}}]]);
        render();
        const panel=pageContent.querySelector('[data-live-photo-answer]'),editor=panel.querySelector('.photo-editor'),img=editor.querySelector('img');
        img.src='tall.svg';await img.decode();await new Promise(requestAnimationFrame);
        for(const theme of ['light','dark']){
            document.documentElement.dataset.theme=theme;await new Promise(requestAnimationFrame);
            const card=panel.closest('[data-preview-activity]'),style=getComputedStyle(card),available=card.clientWidth-parseFloat(style.paddingLeft)-parseFloat(style.paddingRight);
            const imageBox=img.getBoundingClientRect(),editorBox=editor.getBoundingClientRect(),canvasBox=editor.querySelector('canvas').getBoundingClientRect();
            check(`${theme}: photo spans the lesson card (${Math.round(imageBox.width)} / ${Math.round(available)} px)`,imageBox.width>=available*.9);
            check(`${theme}: answer photo occupies a full grid row`,getComputedStyle(editor).gridColumnStart==='1'&&getComputedStyle(editor).gridColumnEnd==='-1');
            check(`${theme}: image retains its full portrait proportions`,Math.abs(imageBox.height/imageBox.width-2)<.01);
            check(`${theme}: annotation canvas stays aligned`,Math.abs(imageBox.left-canvasBox.left)<1&&Math.abs(imageBox.top-canvasBox.top)<1&&Math.abs(imageBox.width-canvasBox.width)<1&&Math.abs(imageBox.height-canvasBox.height)<1);
            check(`${theme}: avatar remains small while the photo fills the row`,panel.querySelector('.live-answer-avatar').getBoundingClientRect().width===28&&editorBox.width>150);
            check(`${theme}: saved answer remains attached to the image`,editor.querySelector('[data-photo-field-answer]').value==='áno');
            check(`${theme}: no horizontal page overflow`,document.documentElement.scrollWidth<=innerWidth+2);
        }
    }catch(error){check('live photo exception: '+error.message,false);}
    const report=document.createElement('pre');report.id='qa-report';report.style='white-space:pre-wrap';report.textContent=results.join('\n')+'\nTOTAL '+results.length+'; FAIL '+results.filter(line=>line.startsWith('FAIL')).length;document.body.append(report);
})();
