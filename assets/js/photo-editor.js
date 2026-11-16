(function(root){
    'use strict';
    const core=root.SlovaPhotoAnnotations;
    const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const words={ru:['Рисовать','Текст','Цвет','Толщина','Отменить','Очистить мои пометки','Подпись (до 200 символов)','Нажмите на фото, чтобы поставить подпись.','Достигнут предел рисунка. Отмените лишние линии.','Фото не загрузилось. Проверьте ссылку или подключение.'],ua:['Малювати','Текст','Колір','Товщина','Скасувати','Очистити мої позначки','Підпис (до 200 символів)','Натисніть на фото, щоб додати підпис.','Досягнуто межі малюнка. Скасуйте зайві лінії.','Фото не завантажилось. Перевірте посилання або з’єднання.'],en:['Draw','Text','Colour','Width','Undo','Clear my annotations','Caption (up to 200 characters)','Click the photo to place the caption.','Drawing limit reached. Undo unnecessary lines.','Image could not load. Check the link or connection.']};
    function markup(images,base={},value={},editable=false,language='ru'){
        const t=words[language]||words.en;
        return images.map(image=>`<div class="photo-editor" data-photo-editor data-photo-url="${escape(image.url)}" data-photo-base="${escape(JSON.stringify(core.read(base)[image.url]||[]))}" data-photo-value="${escape(JSON.stringify(core.read(value)[image.url]||[]))}">
            ${editable?`<div class="photo-tools"><button type="button" class="button secondary small" data-photo-tool="pen" aria-pressed="true">✎ ${t[0]}</button><button type="button" class="button secondary small" data-photo-tool="text" aria-pressed="false">T ${t[1]}</button><label>${t[2]} <input type="color" data-photo-color value="#e53935"></label><label>${t[3]} <select data-photo-width><option value="2">2</option><option value="4" selected>4</option><option value="8">8</option></select></label><button type="button" class="button secondary small" data-photo-undo>${t[4]}</button><button type="button" class="button secondary small" data-photo-clear>${t[5]}</button></div><input class="photo-caption" data-photo-caption maxlength="200" placeholder="${t[6]}" aria-label="${t[6]}" hidden><p class="photo-hint" data-photo-hint role="status"></p>`:''}
            <div class="photo-stage"><img src="${escape(image.url)}" alt="${escape(image.alt||'')}" draggable="false"><canvas ${editable?'data-photo-editable tabindex="0" aria-label="'+t[0]+'"':''}></canvas></div><p data-photo-error hidden role="alert">${t[9]}</p></div>`).join('');
    }
    function value(container){const result={};container.querySelectorAll('[data-photo-editor]').forEach(el=>{result[el.dataset.photoUrl]=JSON.parse(el.dataset.photoValue||'[]');});return core.validate(result);}
    function bind(container,{change=()=>{},language='ru'}={}){
        const t=words[language]||words.en;
        container.querySelectorAll('[data-photo-editor]').forEach(el=>{
            if(el.dataset.photoBound)return;el.dataset.photoBound='true';
            const canvas=el.querySelector('canvas'),img=el.querySelector('img'),ctx=canvas.getContext('2d');
            let ops=JSON.parse(el.dataset.photoValue||'[]'),base=JSON.parse(el.dataset.photoBase||'[]'),tool='pen',active=null;
            const hint=el.querySelector('[data-photo-hint]');
            function draw(){
                const rect=img.getBoundingClientRect();if(!rect.width||!img.naturalWidth)return;
                canvas.width=Math.round(rect.width*2);canvas.height=Math.round(rect.height*2);
                const w=canvas.width,h=canvas.height;
                for(const op of [...base,...ops,...(active?[active]:[])]){
                    ctx.strokeStyle=ctx.fillStyle=op.color;ctx.lineWidth=op.width*w/1000;ctx.lineCap=ctx.lineJoin='round';
                    if(op.type==='text'){ctx.font=`${(18+op.width*2)*w/1000}px sans-serif`;ctx.fillText(op.text,op.x*w/1000,op.y*h/1000);}
                    else {ctx.beginPath();op.points.forEach((p,i)=>i?ctx.lineTo(p[0]*w/1000,p[1]*h/1000):ctx.moveTo(p[0]*w/1000,p[1]*h/1000));if(op.points.length===1){ctx.lineTo(op.points[0][0]*w/1000+.1,op.points[0][1]*h/1000);}ctx.stroke();}
                }
            }
            function commit(next){
                try{core.validate({...value(container),[el.dataset.photoUrl]:next});}catch{if(hint)hint.textContent=t[8];draw();return;}
                ops=next;el.dataset.photoValue=JSON.stringify(ops);if(hint)hint.textContent='';draw();change(value(container));el.dispatchEvent(new CustomEvent('photo-change',{bubbles:true}));
            }
            img.addEventListener('load',draw);img.addEventListener('error',()=>{el.querySelector('[data-photo-error]').hidden=false;});draw();
            const observer=new ResizeObserver(()=>{if(!el.isConnected){observer.disconnect();return;}draw();});observer.observe(img);
            if(!canvas.hasAttribute('data-photo-editable'))return;
            el.querySelectorAll('[data-photo-tool]').forEach(button=>button.addEventListener('click',()=>{
                tool=button.dataset.photoTool;el.querySelectorAll('[data-photo-tool]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
                el.querySelector('[data-photo-caption]').hidden=tool!=='text';if(hint)hint.textContent=tool==='text'?t[7]:'';
            }));
            el.querySelector('[data-photo-undo]').addEventListener('click',()=>commit(ops.slice(0,-1)));
            el.querySelector('[data-photo-clear]').addEventListener('click',()=>commit([]));
            function point(e){const r=canvas.getBoundingClientRect();return [e.clientX-r.left,e.clientY-r.top].map((n,i)=>Math.round(Math.max(0,Math.min(1000,n/(i?r.height:r.width)*1000))*10)/10);}
            canvas.addEventListener('pointerdown',e=>{
                if(e.button!==0||active||!img.naturalWidth)return;e.preventDefault();
                const [x,y]=point(e),color=el.querySelector('[data-photo-color]').value,width=Number(el.querySelector('[data-photo-width]').value);
                if(tool==='text'){const text=el.querySelector('[data-photo-caption]').value.trim();if(text)commit([...ops,{type:'text',color,width,x,y,text}]);else el.querySelector('[data-photo-caption]').focus();return;}
                canvas.setPointerCapture(e.pointerId);active={type:'pen',color,width,points:[[x,y]],pointerId:e.pointerId};draw();
            });
            canvas.addEventListener('pointermove',e=>{if(!active||active.pointerId!==e.pointerId)return;const p=point(e),last=active.points.at(-1);if(active.points.length<500&&Math.hypot(p[0]-last[0],p[1]-last[1])>=2){active.points.push(p);draw();}});
            function finish(e){if(!active||active.pointerId!==e.pointerId)return;const {pointerId,...op}=active;active=null;commit([...ops,op]);}
            canvas.addEventListener('pointerup',finish);canvas.addEventListener('pointercancel',finish);canvas.addEventListener('lostpointercapture',finish);
        });
    }
    root.SlovaPhotoEditor={markup,bind,value};
})(window);
