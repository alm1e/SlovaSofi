(function(root){
    const copies={
        ru: ['Отменить', 'Повторить', 'Проверить урок'],
        ua: ['Скасувати', 'Повторити', 'Перевірити урок'],
        en: ['Undo', 'Redo', 'Check lesson'],
        sk: ['Späť', 'Znova', 'Skontrolovať lekciu'],
        kk: ['Болдырмау', 'Қайталау', 'Сабақты тексеру']
    };
    function createHistory(limit=60){
        let states=[],position=-1,time=0;
        const encode=value=>JSON.stringify(value);
        const shape=value=>JSON.stringify([...(value.sections||[]),...(value.homeworkSections||[])].map(section=>[section.id,(section.activities||[]).map(activity=>[activity.id,activity.type,(activity.questions||[]).map(question=>question.id)])]));
        return {
            reset(value){states=[encode(value)];position=0;time=0;},
            record(value,now=Date.now()){
                const next=encode(value);if(states[position]===next)return;
                states=states.slice(0,position+1);
                if(position>0&&now-time<600&&shape(JSON.parse(states[position]))===shape(value))states[position]=next;
                else{states.push(next);position++;if(states.length>limit){states.shift();position--;}}
                time=now;
            },
            undo(){if(position<=0)return null;time=0;return JSON.parse(states[--position]);},
            redo(){if(position>=states.length-1)return null;time=0;return JSON.parse(states[++position]);},
            get canUndo(){return position>0;},get canRedo(){return position<states.length-1;}
        };
    }
    let context = null;
    function sync(options) {
        const {container, editing = false, history, undo, redo, validate, language = 'en'} = options;
        const bar = container?.querySelector('[data-lesson-tools]');
        context = bar && editing ? options : null;
        if (!bar) return;

        const [undoText, redoText, checkText] = copies[language] || copies.en;
        bar.innerHTML = `${editing && history ? `<button type="button" class="button secondary small" data-tools-undo ${history.canUndo ? '' : 'disabled'}>${undoText}</button><button type="button" class="button secondary small" data-tools-redo ${history.canRedo ? '' : 'disabled'}>${redoText}</button>` : ''}${validate ? `<button type="button" class="button secondary small" data-tools-validate>${checkText}</button>` : ''}`;
        bar.querySelector('[data-tools-undo]')?.addEventListener('click', undo);
        bar.querySelector('[data-tools-redo]')?.addEventListener('click', redo);
        bar.querySelector('[data-tools-validate]')?.addEventListener('click', validate);
    }

    if (typeof document !== 'undefined') document.addEventListener('keydown', event => {
        if (!context || event.target.closest?.('input,textarea,select,[contenteditable="true"]')) return;
        if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'z') {
            event.preventDefault();
            (event.shiftKey ? context.redo : context.undo)?.();
        }
    }, true);
    root.SlovaLessonTools={sync,createHistory};
    if(typeof module!=='undefined')module.exports=root.SlovaLessonTools;
})(typeof window!=='undefined'?window:globalThis);
