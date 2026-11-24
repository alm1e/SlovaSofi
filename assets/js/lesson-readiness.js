(function(root){
    const labels={ru:['Задание не готово: добавьте содержимое и правильные ответы.','Сначала завершите отмеченные задания.'],ua:['Завдання не готове: додайте вміст і правильні відповіді.','Спочатку завершіть позначені завдання.'],en:['Activity incomplete: add content and correct answers.','Complete the marked activities first.'],sk:['Úloha nie je hotová: pridajte obsah a správne odpovede.','Najprv dokončite označené úlohy.'],kk:['Тапсырма дайын емес: мазмұн мен дұрыс жауаптарды қосыңыз.','Алдымен белгіленген тапсырмаларды аяқтаңыз.']};
    function incomplete(activity){
        if(root.SlovaExerciseFormat)activity=root.SlovaExerciseFormat.prepare(activity);
        const settings=activity.settings||{},content=String(activity.content||'').trim(),answer=String(activity.answer||'').trim();
        if(activity.questions?.length)return (activity.type==='listening-questions'&&!content)||activity.questions.some(question=>incomplete({...question,type:activity.type==='listening-questions'?'multiple-choice':activity.type,settings}));
        if(activity.type==='find-error')return root.SlovaExerciseFormat?.findErrors?!content||!root.SlovaExerciseFormat.findErrors.spec(activity).expected.size:!content||!Array.isArray(settings.errors)||!settings.errors.some(error=>Number.isInteger(Number(error.index))&&Number(error.index)>=0&&String(error.correction||'').trim());
        if(activity.type==='fill-blank'){const blanks=root.SlovaFillBlanks.parse(content,answer,settings);return !blanks.groups.length||blanks.groups.some(group=>!group.length);}
        if(activity.type==='table'){const table=root.SlovaTable.parse(content,answer,settings);return !table.blankCount||table.groups.some(group=>!group.length);}
        if(['drag-words','order-items','sentence-order'].includes(activity.type))return !content&&!answer&&!settings.items?.length&&!settings.acceptedOrders?.length;
        if(activity.type==='true-false')return (!content&&!String(activity.prompt||'').trim())||!answer;
        if(activity.type==='one-of-many'&&root.SlovaExerciseFormat?.dropdown(content))return false;
        if(['multiple-choice','one-of-many'].includes(activity.type))return !content&&!settings.options?.length||!answer&&!settings.options?.some(option=>option.correct);
        if(activity.type==='vocabulary')return !content&&!settings.words?.length&&!activity.cards?.length;
        if(activity.type==='flashcards'){const cards=root.SlovaExerciseFormat?.cardsFor(activity);return cards?!cards.length||cards.some(card=>!card.front||!card.back):!content&&!activity.cards?.length;}
        if(activity.type==='columns'){
            if(settings.columnsInvalid)return true;
            if(settings.cards?.length)return settings.cards.length>100||settings.cards.some(card=>!String(card?.text||'').trim()||!String(card?.category||'').trim());
            const parsed=root.SlovaExerciseFormat?.parseColumns(content);return parsed?!parsed.cards.length||parsed.cards.length>100||!!parsed.invalidLines.length:!content;
        }
        if(activity.type==='match')return !content&&!settings.pairs?.length;
        if(activity.type==='text')return !content&&!String(activity.prompt||'').trim();
        return !content&&activity.type!=='pronunciation-recording'&&activity.type!=='open-answer';
    }
    function issues(activity, language='en') {
        const copy={
            ru:{content:'Добавьте текст задания.',media:'Добавьте ссылку на изображение, аудио или видео.',url:'Используйте корректную ссылку http:// или https://.',answer:'Укажите правильные ответы.',options:'Добавьте не менее двух вариантов ответа и отметьте правильный.',words:'Добавьте слова и переводы.',markers:'Добавьте метки на изображении.',empty:'Добавьте содержимое и заполните ответы.'},
            ua:{content:'Додайте текст завдання.',media:'Додайте посилання на зображення, аудіо чи відео.',url:'Вкажіть коректне посилання http:// або https://.',answer:'Вкажіть правильні відповіді.',options:'Додайте щонайменше два варіанти й позначте правильний.',words:'Додайте слова та переклади.',markers:'Додайте мітки на зображенні.',empty:'Додайте вміст і відповіді.'},
            en:{content:'Add activity text.',media:'Add an image, audio or video URL.',url:'Use a valid http:// or https:// URL.',answer:'Set the correct answers.',options:'Add at least two options and mark the correct answer.',words:'Add words and translations.',markers:'Add image markers.',empty:'Add content and complete the answers.'}
        };
        const t=copy[language]||copy.en, result=[],type=activity.type,content=String(activity.content||'').trim();
        if(activity.questions?.length){
            if(type==='listening-questions'&&!content)result.push(t.media);
            activity.questions.forEach((question,index)=>issues({...question,type:type==='listening-questions'?'multiple-choice':type,settings:{...activity.settings,...question.settings}},language).forEach(message=>result.push(`${index+1}. ${message}`)));
            return result;
        }
        if(['image','interactive-image','audio','video','listening-questions'].includes(type)){
            if(!content)result.push(t.media);
            else content.split(/\r?\n/).forEach(line=>{const value=line.match(/^!\[[^\]]*\]\((.*)\)$/)?.[1]||line;try{const url=new URL(value);if(!['http:','https:'].includes(url.protocol))throw Error();}catch{result.push(t.url);}});
            if(type==='interactive-image'&&!(activity.settings?.hotspots||[]).some(spot=>String(spot.word||'').trim()))result.push(t.markers);
        }
        const prepared=root.SlovaExerciseFormat?.prepare(activity)||activity;
        if(['multiple-choice','one-of-many'].includes(type)&&!root.SlovaExerciseFormat?.dropdown?.(content)){
            const options=prepared.settings?.options||content.split(/\r?\n/).filter(Boolean).map(text=>({text}));
            if(options.length<2||options.some(option=>!String(typeof option==='string'?option:option.text||'').trim())||(!String(prepared.answer||'').trim()&&!options.some(option=>option.correct)))result.push(t.options);
        }
        if(['vocabulary','phrase-list'].includes(type)&&Array.isArray(activity.settings?.words)&&(!activity.settings.words.length||activity.settings.words.some(word=>!String(word.word||'').trim()||!String(word.translation||'').trim())))result.push(t.words);
        if(type==='match'&&content&&content.split(/\r?\n/).some(line=>line.trim()&&!/^.+?\s*(?:=|\[).+/.test(line)))result.push(t.answer);
        if(incomplete(activity)&&!result.length){
            result.push(['vocabulary','phrase-list'].includes(type)?t.words:['multiple-choice','one-of-many'].includes(type)?t.options:['fill-blank','table','find-error','true-false'].includes(type)?t.answer:type==='text'?t.content:t.empty);
        }
        return [...new Set(result)];
    }
    function message(language){return(labels[language]||labels.en)[0];}
    function blocked(language){return(labels[language]||labels.en)[1];}
    root.SlovaLessonReadiness={incomplete,message,blocked,issues};
    if(typeof module!=='undefined')module.exports=root.SlovaLessonReadiness;
})(typeof window!=='undefined'?window:globalThis);
