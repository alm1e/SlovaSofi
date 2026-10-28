(function(root){
    'use strict';
    const widgets=new WeakMap();let opened=null,sequence=0;
    function close(focus=false){if(!opened)return;const widget=opened;opened=null;widget.list.remove();widget.trigger.setAttribute('aria-expanded','false');if(focus&&widget.trigger.isConnected)widget.trigger.focus({preventScroll:true});}
    function sync(widget){
        const {select,trigger,wrapper}=widget;
        trigger.textContent=select.options[select.selectedIndex]?.textContent||'—';trigger.disabled=select.disabled;
        trigger.setAttribute('aria-invalid',select.getAttribute('aria-invalid')||'false');
        wrapper.dataset.validation=select.classList.contains('blank-incorrect')?'incorrect':select.classList.contains('blank-correct')?'correct':'';
        if(opened===widget&&(!select.isConnected||select.disabled))close();
    }
    function position(widget){
        const rect=widget.trigger.getBoundingClientRect(),height=Math.min(widget.list.scrollHeight,280),width=Math.min(Math.max(rect.width,160),root.innerWidth-16);
        const below=root.innerHeight-rect.bottom-8,top=below>=height||rect.top<height?Math.min(rect.bottom+4,root.innerHeight-48):Math.max(8,rect.top-height-4);
        Object.assign(widget.list.style,{left:`${Math.max(8,Math.min(rect.left,root.innerWidth-width-8))}px`,top:`${top}px`,width:`${width}px`,maxHeight:`${Math.max(44,Math.min(280,top>rect.top?root.innerHeight-top-8:height))}px`});
    }
    function show(widget){
        if(widget.select.disabled)return;sync(widget);if(opened===widget){close();return;}close();opened=widget;
        const {select,list,trigger}=widget;list.replaceChildren();
        Array.from(select.options).forEach((option,index)=>{
            const button=document.createElement('button');button.type='button';button.className='slova-select-option';button.setAttribute('role','option');button.setAttribute('aria-selected',String(index===select.selectedIndex));button.tabIndex=-1;button.disabled=option.disabled||option.parentElement?.disabled===true;button.textContent=option.textContent;
            button.addEventListener('click',()=>{if(select.disabled||button.disabled)return;select.selectedIndex=index;close();sync(widget);select.dispatchEvent(new Event('input',{bubbles:true}));select.dispatchEvent(new Event('change',{bubbles:true}));if(trigger.isConnected&&!select.matches('[data-rich-style],[data-rich-size]'))trigger.focus({preventScroll:true});});list.append(button);
        });
        document.body.append(list);trigger.setAttribute('aria-expanded','true');position(widget);
        (list.querySelector('[aria-selected="true"]:not(:disabled)')||list.querySelector('button:not(:disabled)'))?.focus({preventScroll:true});
    }
    function enhance(element=document){
        const selects=[...(element.matches?.('select')?[element]:[]),...element.querySelectorAll('select')];
        selects.forEach(select=>{
            if(widgets.has(select)){sync(widgets.get(select));return;}
            // Pairing and category games keep hidden selects as their response store.
            if(select.multiple||select.closest('[data-pair-row]'))return;
            const wrapper=document.createElement('span'),trigger=document.createElement('button'),list=document.createElement('div');
            wrapper.className='slova-select';trigger.type='button';trigger.className='slova-select-trigger';trigger.setAttribute('role','combobox');trigger.setAttribute('aria-haspopup','listbox');trigger.setAttribute('aria-expanded','false');
            list.className='slova-select-list';list.id=`slova-options-${++sequence}`;list.setAttribute('role','listbox');trigger.setAttribute('aria-controls',list.id);
            const name=select.getAttribute('aria-label')||select.labels?.[0]?.textContent?.trim();if(name){trigger.setAttribute('aria-label',name);list.setAttribute('aria-label',name);}
            select.parentNode.insertBefore(wrapper,select);wrapper.append(select,trigger);select.classList.add('slova-select-native');select.tabIndex=-1;select.setAttribute('aria-hidden','true');
            const widget={select,wrapper,trigger,list};widgets.set(select,widget);sync(widget);
            trigger.addEventListener('click',()=>show(widget));select.addEventListener('input',()=>sync(widget));select.addEventListener('change',()=>sync(widget));
            trigger.addEventListener('keydown',event=>{if(['ArrowLeft','ArrowRight'].includes(event.key)){event.stopPropagation();return;}if(['ArrowDown','ArrowUp','Enter',' '].includes(event.key)){event.preventDefault();event.stopPropagation();show(widget);}});
            list.addEventListener('keydown',event=>{
                const options=[...list.querySelectorAll('button:not(:disabled)')],index=options.indexOf(document.activeElement);let target=index;
                if(['ArrowLeft','ArrowRight'].includes(event.key)){event.preventDefault();event.stopPropagation();return;}
                if(['Enter',' '].includes(event.key)){event.preventDefault();event.stopPropagation();document.activeElement?.click();return;}
                if(event.key==='Escape'){event.preventDefault();event.stopPropagation();close(true);return;}
                if(event.key==='Tab'){close(true);return;}
                if(event.key==='ArrowDown')target=Math.min(index+1,options.length-1);else if(event.key==='ArrowUp')target=Math.max(0,index-1);else if(event.key==='Home')target=0;else if(event.key==='End')target=options.length-1;
                else if(event.key.length===1&&!event.ctrlKey&&!event.metaKey){const next=options.findIndex((option,i)=>i>index&&option.textContent.toLocaleLowerCase().startsWith(event.key.toLocaleLowerCase()));target=next>=0?next:options.findIndex(option=>option.textContent.toLocaleLowerCase().startsWith(event.key.toLocaleLowerCase()));}else return;
                event.preventDefault();event.stopPropagation();options[target]?.focus();
            });
        });
    }
    function start(){
        enhance();
        new MutationObserver(records=>{for(const record of records){if(record.target.matches?.('select')){const widget=widgets.get(record.target);if(widget)sync(widget);}for(const node of record.addedNodes||[])if(node.nodeType===1)enhance(node);}if(opened&&!opened.select.isConnected)close();}).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['disabled','class','aria-invalid']});
        document.addEventListener('pointerdown',event=>{if(opened&&!opened.wrapper.contains(event.target)&&!opened.list.contains(event.target))close();});
        document.addEventListener('focusin',event=>{if(opened&&!opened.wrapper.contains(event.target)&&!opened.list.contains(event.target))close();});
        root.addEventListener('resize',()=>{if(opened)position(opened);});root.visualViewport?.addEventListener('resize',()=>{if(opened)position(opened);});document.addEventListener('scroll',event=>{if(opened&&!opened.list.contains(event.target))close();},true);
    }
    root.SlovaSelectUI={enhance,close};
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})(window);
