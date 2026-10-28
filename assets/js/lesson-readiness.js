(function(root){
    const labels={ru:['Задание не готово: добавьте содержимое и правильные ответы.','Сначала завершите отмеченные задания.'],ua:['Завдання не готове: додайте вміст і правильні відповіді.','Спочатку завершіть позначені завдання.'],en:['Activity incomplete: add content and correct answers.','Complete the marked activities first.'],sk:['Úloha nie je hotová: pridajte obsah a správne odpovede.','Najprv dokončite označené úlohy.'],kk:['Тапсырма дайын емес: мазмұн мен дұрыс жауаптарды қосыңыз.','Алдымен белгіленген тапсырмаларды аяқтаңыз.']};
    function incomplete(activity){
        if(root.SlovaExerciseFormat)activity=root.SlovaExerciseFormat.prepare(activity);
        const settings=activity.settings||{},content=String(activity.content||'').trim(),answer=String(activity.answer||'').trim();
        if(activity.questions?.length)return (activity.type==='listening-questions'&&!content)||activity.questions.some(question=>incomplete({...question,type:activity.type==='listening-questions'?'multiple-choice':activity.type,settings}));
        if(activity.type==='find-error')return !content||!Array.isArray(settings.errors)||!settings.errors.some(error=>Number.isInteger(Number(error.index))&&Number(error.index)>=0&&String(error.correction||'').trim());
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
        return !content&&activity.type!=='pronunciation-recording'&&activity.type!=='open-answer';
    }
    function message(language){return(labels[language]||labels.en)[0];}
    function blocked(language){return(labels[language]||labels.en)[1];}
    root.SlovaLessonReadiness={incomplete,message,blocked};
    if(typeof module!=='undefined')module.exports=root.SlovaLessonReadiness;
})(typeof window!=='undefined'?window:globalThis);
