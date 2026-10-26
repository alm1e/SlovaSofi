(function(root){
    const copy={ru:['Предыдущая карточка','Следующая карточка','Карточки для повторения закончились.','Карточки'],ua:['Попередня картка','Наступна картка','Картки для повторення закінчилися.','Картки'],en:['Previous card','Next card','No cards left to review.','Flashcards'],sk:['Predchádzajúca kartička','Nasledujúca kartička','Žiadne ďalšie kartičky na opakovanie.','Kartičky'],kk:['Алдыңғы карточка','Келесі карточка','Қайталауға карточка қалмады.','Карточкалар']};
    function render(content,language){const text=copy[language]||copy.en;return `<div class="flashcard-deck" data-flashcard-deck tabindex="0" role="group" aria-label="${text[3]}"><div class="flashcard-deck-stage">${content}</div><p data-deck-empty hidden>${text[2]}</p><div class="flashcard-deck-controls"><button type="button" class="button secondary small" data-deck-step="-1" aria-label="${text[0]}">←</button><span data-deck-count role="status" aria-live="polite"></span><button type="button" class="button secondary small" data-deck-step="1" aria-label="${text[1]}">→</button></div></div>`;}
    function refresh(deck,step=0){
        const cards=[...deck.querySelectorAll('[data-flashcard-card], .preview-flashcard')];
        const hard=deck.closest('[data-activity-index]')?.querySelector('[data-flashcards-hard-only]')?.getAttribute('aria-pressed')==='true';
        const available=cards.filter(card=>!hard||card.dataset.rating!=='know');
        const current=cards.find(card=>card.dataset.deckCurrent==='true');
        let index=Math.max(0,available.indexOf(current));
        index=Math.min(Math.max(0,index+step),Math.max(0,available.length-1));
        cards.forEach(card=>{card.hidden=card!==available[index];card.dataset.deckCurrent=String(!card.hidden);});
        deck.querySelector('[data-deck-count]').textContent=available.length?`${index+1} / ${available.length}`:'0 / 0';
        deck.querySelector('[data-deck-empty]').hidden=available.length>0;
        deck.querySelector('[data-deck-step="-1"]').disabled=!available.length||index===0;
        deck.querySelector('[data-deck-step="1"]').disabled=!available.length||index===available.length-1;
    }
    function bind(rootElement){rootElement.querySelectorAll('[data-flashcard-deck]').forEach(deck=>{
        if(deck.dataset.deckBound)return;deck.dataset.deckBound='true';
        deck.querySelectorAll('[data-deck-step]').forEach(button=>button.addEventListener('click',()=>refresh(deck,Number(button.dataset.deckStep))));
        deck.addEventListener('keydown',event=>{if(event.altKey||event.ctrlKey||event.metaKey||!['ArrowLeft','ArrowRight'].includes(event.key)||event.target.closest('input,textarea,select'))return;event.preventDefault();event.stopPropagation();refresh(deck,event.key==='ArrowRight'?1:-1);deck.focus?.({preventScroll:true});});
        let start;
        deck.addEventListener('pointerdown',event=>{if(event.pointerType==='touch')start={x:event.clientX,y:event.clientY};});
        deck.addEventListener('pointerup',event=>{if(!start)return;const dx=event.clientX-start.x,dy=event.clientY-start.y;start=null;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.5)refresh(deck,dx<0?1:-1);});
        deck.addEventListener('pointercancel',()=>{start=null;});refresh(deck);
    });}
    root.SlovaFlashcardDeck={render,bind,refresh};
})(window);
