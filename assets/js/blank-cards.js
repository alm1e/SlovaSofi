(function () {
    const copy = {
        ru:['Картинки с пропусками','Слова для перетаскивания','Дополнительные слова через /','Правильное слово','Ссылка на картинку','Добавить карточку','или загрузите изображение','Выберите слово и нажмите на поле или перетащите его. Слова можно вернуть в общий набор.','Введите слово и добавьте картинку.'],
        ua:['Малюнки з пропусками','Слова для перетягування','Додаткові слова через /','Правильне слово','Посилання на малюнок','Додати картку','або завантажте зображення','Виберіть слово та натисніть на поле або перетягніть його. Слова можна повернути до набору.','Введіть слово та додайте малюнок.'],
        en:['Picture gaps','Draggable word bank','Extra words separated by /','Correct word','Image URL','Add card','or upload an image','Select a word and a field, or drag it. Words can be returned to the bank.','Enter a word and add an image.'],
        sk:['Obrázky s medzerami','Slová na presúvanie','Ďalšie slová oddelené /','Správne slovo','Odkaz na obrázok','Pridať kartičku','alebo nahrajte obrázok','Vyberte slovo a pole alebo ho presuňte. Slová môžete vrátiť do ponuky.','Zadajte slovo a pridajte obrázok.'],
        kk:['Бос орындары бар суреттер','Сүйреуге арналған сөздер','Қосымша сөздер / арқылы','Дұрыс сөз','Сурет сілтемесі','Карточка қосу','немесе сурет жүктеңіз','Сөзді таңдап, өрісті басыңыз немесе сүйреңіз. Сөздерді жинаққа қайтаруға болады.','Сөзді енгізіп, сурет қосыңыз.']
    };
    const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
    function render(html,words,layout,language) {
        const labels=copy[language]||copy.ru,list=[...(words||[])];
        for(let i=list.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[list[i],list[j]]=[list[j],list[i]];}
        return `<div data-blank-board class="gap-board ${layout==='cards'?'gap-card-grid':''}">${list.length?`<p class="gap-help">${labels[7]}</p><div class="gap-word-bank" data-gap-bank>${list.map(word=>`<button type="button" draggable="true" data-gap-word="${esc(word)}">${esc(word)}</button>`).join('')}</div>`:''}<div class="gap-content">${html}</div></div>`;
    }
    function bind(root) {
        root.querySelectorAll('[data-blank-board]:not([data-gap-ready])').forEach(board=>{
            board.dataset.gapReady='true';
            const inputs=[...board.querySelectorAll('[data-blank-answer],[data-answer-index]')],tokens=[...board.querySelectorAll('[data-gap-word]')],bank=board.querySelector('[data-gap-bank]');
            let word=null,from=null,target=null,dragging=false;
            const change=input=>{input.classList.remove('blank-correct','blank-incorrect');input.setAttribute('aria-invalid','false');input.dispatchEvent(new Event('input',{bubbles:true}));};
            function refresh(){const used=new Map();inputs.forEach(input=>{if(input.value)used.set(input.value,(used.get(input.value)||0)+1);});tokens.forEach(token=>{const value=token.dataset.gapWord,count=used.get(value)||0;token.disabled=count>0;if(count>0)used.set(value,count-1);token.setAttribute('aria-pressed',String(word===value&&!token.disabled));});}
            function place(input){if(word===null)return;const previous=input.value;input.value=word;if(from&&from!==input){from.value=previous;change(from);}change(input);word=null;from=null;dragging=false;target=null;refresh();}
            tokens.forEach(token=>{
                token.addEventListener('click',()=>{if(token.disabled)return;word=token.dataset.gapWord;from=null;if(target)place(target);else refresh();});
                token.addEventListener('dragstart',event=>{word=token.dataset.gapWord;from=null;dragging=true;event.dataTransfer.setData('text/plain',word);});
                token.addEventListener('dragend',()=>{dragging=false;});
            });
            inputs.forEach(input=>{
                input.draggable=true;
                input.addEventListener('focus',()=>{target=input;});
                input.addEventListener('click',()=>{target=input;if(word!==null)place(input);});
                input.addEventListener('input',refresh);
                input.addEventListener('dragstart',event=>{if(!input.value){event.preventDefault();return;}from=input;word=input.value;dragging=true;event.dataTransfer.setData('text/plain',word);});
                input.addEventListener('dragend',()=>{dragging=false;});
                input.addEventListener('dragover',event=>{if(dragging)event.preventDefault();});
                input.addEventListener('drop',event=>{if(!dragging)return;event.preventDefault();place(input);});
            });
            bank?.addEventListener('dragover',event=>{if(dragging&&from)event.preventDefault();});
            bank?.addEventListener('drop',event=>{if(!dragging||!from)return;event.preventDefault();from.value='';change(from);word=null;from=null;dragging=false;refresh();});
            refresh();
        });
    }
    window.SlovaBlankCards={render,bind,copy};
})();
