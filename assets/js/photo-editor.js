(function(root){
    'use strict';
    const core=root.SlovaPhotoAnnotations;
    const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const words={ru:['Рисовать','Текст','Цвет','Толщина','Отменить','Очистить мои пометки','Подпись (до 200 символов)','Нажмите на фото, чтобы поставить подпись.','Достигнут предел рисунка. Отмените лишние линии.','Фото не загрузилось. Проверьте ссылку или подключение.'],ua:['Малювати','Текст','Колір','Товщина','Скасувати','Очистити мої позначки','Підпис (до 200 символів)','Натисніть на фото, щоб додати підпис.','Досягнуто межі малюнка. Скасуйте зайві лінії.','Фото не завантажилось. Перевірте посилання або з’єднання.'],en:['Draw','Text','Colour','Width','Undo','Clear my annotations','Caption (up to 200 characters)','Click the photo to place the caption.','Drawing limit reached. Undo unnecessary lines.','Image could not load. Check the link or connection.']};
    const fieldWords={ru:['＋ Поле ответа','Ширина, %','Высота, %','Нажмите на пропуск на фото. Поле можно передвинуть и растянуть за угол.','Ответ','Удалить поле','Переместить поле','Изменить размер'],ua:['＋ Поле відповіді','Ширина, %','Висота, %','Натисніть на пропуск на фото. Поле можна пересунути та розтягнути за кут.','Відповідь','Видалити поле','Пересунути поле','Змінити розмір'],en:['＋ Answer field','Width, %','Height, %','Click a gap on the photo. Drag a field or resize its corner.','Answer','Delete field','Move field','Resize field']};
    function markup(images,base={},value={},editable=false,language='ru',options={}){
        const t=words[language]||words.en,f=fieldWords[language]||fieldWords.en;
        const template=core.read(base),responses=core.read(value);
        const visibleOps=url=>(responses[url]||[]).filter(op=>options.authorFields||(op.type!=='field'&&(op.type!=='field-answer'||(template[url]||[]).some(field=>field.type==='field'&&field.id===op.id))));
        return images.map(image=>`<div class="photo-editor" data-photo-editor data-photo-direct="${options.direct?'true':'false'}" data-photo-author="${options.authorFields?'true':'false'}" data-photo-url="${escape(image.url)}" data-photo-base="${escape(JSON.stringify(template[image.url]||[]))}" data-photo-value="${escape(JSON.stringify(visibleOps(image.url)))}">
            ${editable?`<div class="photo-tools">${options.direct?`<button type="button" class="button secondary small" data-photo-tool="input" aria-pressed="true">${language==='ru'?'Вписать':language==='ua'?'Вписати':'Type here'}</button>`:''}<button type="button" class="button secondary small" data-photo-tool="pen" aria-pressed="${options.direct?'false':'true'}">✎ ${t[0]}</button><button type="button" class="button secondary small" data-photo-tool="text" aria-pressed="false">T ${t[1]}</button>${options.authorFields?`<button type="button" class="button secondary small" data-photo-tool="field" aria-pressed="false">${f[0]}</button><label>${f[1]} <input type="number" min="2" max="50" step="0.5" value="8" data-photo-field-width></label><label>${f[2]} <input type="number" min="1" max="20" step="0.5" value="3.5" data-photo-field-height></label>`:''}<label>${t[2]} <input type="color" data-photo-color value="#e53935"></label><label>${t[3]} <select data-photo-width><option value="2">2</option><option value="4" selected>4</option><option value="8">8</option></select></label><button type="button" class="button secondary small" data-photo-undo>${t[4]}</button><button type="button" class="button secondary small" data-photo-clear>${t[5]}</button></div><input class="photo-caption" data-photo-caption maxlength="200" placeholder="${t[6]}" aria-label="${t[6]}" hidden><p class="photo-hint" data-photo-hint role="status"></p>`:''}
            <div class="photo-stage"><img src="${escape(image.url)}" alt="${escape(image.alt||'')}" draggable="false"><canvas ${editable?'data-photo-editable tabindex="0" aria-label="'+t[0]+'"':''}></canvas><div class="photo-fields" data-photo-fields></div></div><p data-photo-error hidden role="alert">${t[9]}</p></div>`).join('');
    }
    function value(container){const result={};container.querySelectorAll('[data-photo-editor]').forEach(el=>{result[el.dataset.photoUrl]=JSON.parse(el.dataset.photoValue||'[]');});return core.validate(result);}
    function bind(container,{change=()=>{},language='ru'}={}){
        const t=words[language]||words.en,f=fieldWords[language]||fieldWords.en;
        container.querySelectorAll('[data-photo-editor]').forEach(el=>{
            if(el.dataset.photoBound)return;el.dataset.photoBound='true';
            const canvas=el.querySelector('canvas'),img=el.querySelector('img'),ctx=canvas.getContext('2d');
            let ops=JSON.parse(el.dataset.photoValue||'[]'),base=JSON.parse(el.dataset.photoBase||'[]'),tool=el.dataset.photoDirect==='true'?'input':'pen',active=null,selected=null;
            const author=el.dataset.photoAuthor==='true',editable=canvas.hasAttribute('data-photo-editable'),history=[];
            const fieldsLayer=el.querySelector('[data-photo-fields]');
            let gaps=[],scanVersion=0;
            const gapHint=language==='ru'?['Нажмите на точки, чтобы вписать ответ.','Пропуски не найдены. Можно нажать на фото и вписать ответ вручную.','Не удалось распознать фото. Доступен ручной ввод.']:language==='ua'?['Натисніть на крапки, щоб вписати відповідь.','Пропусків не знайдено. Доступне ручне введення.','Не вдалося розпізнати фото. Доступне ручне введення.']:['Click the dots to type an answer.','No gaps found. Click the photo to type manually.','Could not analyse this image. Manual typing is available.'];
            const overlaps=(a,b)=>Math.abs(a.x+a.w/2-b.x-b.w/2)<Math.max(a.w,b.w)*.65&&Math.abs(a.y+a.h/2-b.y-b.h/2)<Math.max(a.h,b.h)*.65;
            async function scan(){
                if(!root.SlovaPhotoGapDetector||!img.naturalWidth)return;
                const version=++scanVersion;
                const read=source=>{const scale=Math.min(1,1200/source.naturalWidth,1400/source.naturalHeight);const temp=document.createElement('canvas');temp.width=Math.max(1,Math.round(source.naturalWidth*scale));temp.height=Math.max(1,Math.round(source.naturalHeight*scale));const c=temp.getContext('2d',{willReadFrequently:true});c.drawImage(source,0,0,temp.width,temp.height);return c.getImageData(0,0,temp.width,temp.height);};
                try{
                    let pixels;
                    try{pixels=read(img);}catch{
                        const probe=new Image();probe.crossOrigin='anonymous';
                        await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('Image timeout')),8000);probe.onload=()=>{clearTimeout(timer);resolve();};probe.onerror=()=>{clearTimeout(timer);reject(Error('Image access'));};probe.src=img.currentSrc||img.src;});pixels=read(probe);
                    }
                    const found=root.SlovaPhotoGapDetector.detect(pixels);if(version!==scanVersion||!el.isConnected)return;
                    gaps=found;el.dataset.photoDetection='ready';el.dataset.photoGapCount=String(gaps.length);renderFields();if(hint&&tool==='input')hint.textContent=gaps.length?gapHint[0]:gapHint[1];
                }catch{if(version===scanVersion){el.dataset.photoDetection='unavailable';if(hint&&tool==='input')hint.textContent=gapHint[2];}}
            }
            function insertInput(x,y,gap=null){
                const existing=gap?ops.find(op=>op.type==='input'&&overlaps(op,gap)):null;
                if(existing){fieldsLayer.querySelector(`[data-photo-field-answer="${existing.id}"]`)?.focus();return;}
                const {w,h}=fieldSize(),field={type:'input',id:crypto.randomUUID(),x:Math.max(0,Math.min(1000-w,x-w/2)),y:Math.max(0,Math.min(1000-h,y-h/2)),w,h,text:'',...(gap||{})};
                selected=field.id;commit([...ops,field]);fieldsLayer.querySelector(`[data-photo-field-answer="${field.id}"]`)?.focus();
            }
            function fieldSize(){return {w:Math.max(20,Math.min(500,(Number(el.querySelector('[data-photo-field-width]')?.value)||8)*10)),h:Math.max(10,Math.min(200,(Number(el.querySelector('[data-photo-field-height]')?.value)||3.5)*10))};}
            function selectField(field){
                selected=field.id;
                const widthControl=el.querySelector('[data-photo-field-width]');if(widthControl)widthControl.value=String(field.w/10);
                const heightControl=el.querySelector('[data-photo-field-height]');if(heightControl)heightControl.value=String(field.h/10);
                fieldsLayer.querySelectorAll('[data-photo-field-id]').forEach(node=>node.classList.toggle('is-selected',node.dataset.photoFieldId===selected));
            }
            function renderFields(){
                if(!fieldsLayer)return;
                const focused=fieldsLayer.contains(document.activeElement)?{id:document.activeElement.dataset.photoFieldAnswer,start:document.activeElement.selectionStart,end:document.activeElement.selectionEnd}:null;
                fieldsLayer.replaceChildren();
                const fields=(author?ops:base).filter(op=>op.type==='field').concat(base.filter(op=>op.type==='input'),ops.filter(op=>op.type==='input'));
                fields.forEach((field,index)=>{
                    const inline=field.type==='input',owned=inline&&ops.includes(field);
                    const box=document.createElement('div');box.className='photo-answer-field'+(inline?' is-inline':'')+(field.mask?' is-detected-gap':'');box.dataset.photoFieldId=field.id;
                    box.style.left=field.x/10+'%';box.style.top=field.y/10+'%';box.style.width=field.w/10+'%';box.style.height=field.h/10+'%';
                    const input=document.createElement('input');input.type='text';input.maxLength=200;input.autocomplete='off';input.spellcheck=false;
                    input.setAttribute('aria-label',f[4]+' '+(index+1));input.dataset.photoFieldAnswer=field.id;
                    input.value=inline?field.text:author?'':ops.find(op=>op.type==='field-answer'&&op.id===field.id)?.text||'';
                    if(inline&&field.font)input.style.setProperty('font-size',`${field.font/10}cqw`,'important');
                    input.readOnly=inline?(!owned||!editable):author||!editable;input.placeholder=author&&!inline?String(index+1):'';box.append(input);fieldsLayer.append(box);
                    if(editable&&(inline?owned:!author)){
                        const save=()=>{if(inline){commit(ops.map(op=>op.id===field.id?{...op,text:input.value}:op),false);return;}const next=ops.filter(op=>!(op.type==='field-answer'&&op.id===field.id));if(input.value)next.push({type:'field-answer',id:field.id,text:input.value});commit(next,false);};
                        input.addEventListener('input',e=>{e.stopPropagation();if(!e.isComposing)save();});
                        input.addEventListener('compositionend',save);
                        input.addEventListener('change',e=>e.stopPropagation());
                    }
                    if(editable&&(inline?owned:author)){
                        box.classList.add('is-author');if(field.id===selected)box.classList.add('is-selected');
                        const move=document.createElement('button');move.type='button';move.className='photo-field-move';move.textContent=String(index+1)+' ↔';move.setAttribute('aria-label',f[6]+' '+(index+1));
                        const resize=document.createElement('button');resize.type='button';resize.className='photo-field-resize';resize.textContent='↘';resize.setAttribute('aria-label',f[7]+' '+(index+1));
                        const remove=document.createElement('button');remove.type='button';remove.className='photo-field-remove';remove.textContent='×';remove.setAttribute('aria-label',f[5]+' '+(index+1));remove.addEventListener('click',()=>commit(ops.filter(op=>op.id!==field.id)));box.append(move,resize,remove);
                        input.addEventListener('pointerdown',()=>selectField(field));
                        for(const [handle,mode] of [[move,'move'],[resize,'resize']]){
                            handle.addEventListener('click',()=>selectField(field));
                            let drag=null;
                            handle.addEventListener('pointerdown',e=>{if(e.button!==0)return;e.preventDefault();selectField(field);drag={id:e.pointerId,start:point(e),field:{...field}};handle.setPointerCapture(e.pointerId);});
                            handle.addEventListener('pointermove',e=>{
                                if(!drag||drag.id!==e.pointerId)return;
                                const p=point(e),dx=p[0]-drag.start[0],dy=p[1]-drag.start[1];
                                const next=mode==='move'?{...drag.field,x:Math.max(0,Math.min(1000-field.w,drag.field.x+dx)),y:Math.max(0,Math.min(1000-field.h,drag.field.y+dy))}:{...drag.field,w:Math.max(20,Math.min(500,1000-field.x,drag.field.w+dx)),h:Math.max(10,Math.min(200,1000-field.y,drag.field.h+dy))};
                                drag.next=next;box.style.left=next.x/10+'%';box.style.top=next.y/10+'%';box.style.width=next.w/10+'%';box.style.height=next.h/10+'%';
                            });
                            const finish=e=>{if(!drag||drag.id!==e.pointerId)return;const next=drag.next;drag=null;if(next){commit(ops.map(op=>op.id===field.id?next:op));selectField(next);}};
                            handle.addEventListener('pointerup',finish);handle.addEventListener('pointercancel',finish);handle.addEventListener('lostpointercapture',finish);
                        }
                    }
                });
                if(editable&&tool==='input')gaps.forEach((gap,index)=>{
                    if(fields.some(field=>overlaps(field,gap)))return;
                    const target=document.createElement('button');target.type='button';target.className='photo-gap-target';target.dataset.photoGap=String(index);target.setAttribute('aria-label',f[4]+' '+(index+1));
                    Object.assign(target.style,{left:gap.x/10+'%',top:gap.y/10+'%',width:gap.w/10+'%',height:gap.h/10+'%'});
                    target.addEventListener('click',()=>insertInput(gap.x+gap.w/2,gap.y+gap.h/2,gap));fieldsLayer.append(target);
                });
                if(focused){const input=fieldsLayer.querySelector(`[data-photo-field-answer="${focused.id}"]`);input?.focus({preventScroll:true});if(input)input.setSelectionRange(focused.start,focused.end);}
            }
            const hint=el.querySelector('[data-photo-hint]');
            function draw(){
                const rect=img.getBoundingClientRect();if(!rect.width||!img.naturalWidth)return;
                canvas.width=Math.round(rect.width*2);canvas.height=Math.round(rect.height*2);
                const w=canvas.width,h=canvas.height;
                for(const op of [...base,...ops])if(op.type==='input'&&op.text&&op.mask){const m=op.mask;ctx.fillStyle=m.color;ctx.fillRect(m.x*w/1000,m.y*h/1000,m.w*w/1000,m.h*h/1000);}
                for(const op of [...base,...ops,...(active?[active]:[])]){
                    if(op.type==='field'||op.type==='field-answer'||op.type==='input')continue;
                    ctx.strokeStyle=ctx.fillStyle=op.color;ctx.lineWidth=op.width*w/1000;ctx.lineCap=ctx.lineJoin='round';
                    if(op.type==='text'){ctx.font=`${(18+op.width*2)*w/1000}px sans-serif`;ctx.fillText(op.text,op.x*w/1000,op.y*h/1000);}
                    else {ctx.beginPath();op.points.forEach((p,i)=>i?ctx.lineTo(p[0]*w/1000,p[1]*h/1000):ctx.moveTo(p[0]*w/1000,p[1]*h/1000));if(op.points.length===1){ctx.lineTo(op.points[0][0]*w/1000+.1,op.points[0][1]*h/1000);}ctx.stroke();}
                }
            }
            function commit(next,refreshFields=true,remember=true){
                try{core.validate({...value(container),[el.dataset.photoUrl]:next});}catch{if(hint)hint.textContent=t[8];draw();return;}
                if(remember){history.push(structuredClone(ops));if(history.length>20)history.shift();}
                ops=next;el.dataset.photoValue=JSON.stringify(ops);if(hint)hint.textContent='';draw();if(refreshFields)renderFields();change(value(container));el.dispatchEvent(new CustomEvent('photo-change',{bubbles:true}));
            }
            img.addEventListener('load',()=>{draw();scan();});img.addEventListener('error',()=>{el.querySelector('[data-photo-error]').hidden=false;});draw();renderFields();scan();
            const observer=new ResizeObserver(()=>{if(!el.isConnected){observer.disconnect();return;}draw();});observer.observe(img);
            if(!canvas.hasAttribute('data-photo-editable'))return;
            el.querySelectorAll('[data-photo-tool]').forEach(button=>button.addEventListener('click',()=>{
                tool=button.dataset.photoTool;el.querySelectorAll('[data-photo-tool]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
                el.querySelector('[data-photo-caption]').hidden=tool!=='text';if(hint)hint.textContent=tool==='text'?t[7]:tool==='field'?f[3]:tool==='input'&&gaps.length?gapHint[0]:'';renderFields();
            }));
            el.querySelector('[data-photo-undo]').addEventListener('click',()=>commit(history.length?history.pop():ops.slice(0,-1),true,false));
            el.querySelector('[data-photo-clear]').addEventListener('click',()=>commit([]));
            el.querySelectorAll('[data-photo-field-width],[data-photo-field-height]').forEach(control=>control.addEventListener('change',()=>{
                if(!author||!selected)return;const size=fieldSize();commit(ops.map(op=>op.type==='field'&&op.id===selected?{...op,w:Math.min(size.w,1000-op.x),h:Math.min(size.h,1000-op.y)}:op));
            }));
            function point(e){const r=canvas.getBoundingClientRect();return [e.clientX-r.left,e.clientY-r.top].map((n,i)=>Math.round(Math.max(0,Math.min(1000,n/(i?r.height:r.width)*1000))*10)/10);}
            canvas.addEventListener('pointerdown',e=>{
                if(e.button!==0||active||!img.naturalWidth)return;e.preventDefault();
                const [x,y]=point(e);
                if(tool==='input'){
                    const nearby=gaps.filter(gap=>Math.abs(x-gap.x-gap.w/2)<=gap.w/2+15&&Math.abs(y-gap.y-gap.h/2)<=gap.h/2+12).sort((a,b)=>Math.hypot(x-a.x-a.w/2,y-a.y-a.h/2)-Math.hypot(x-b.x-b.w/2,y-b.y-b.h/2))[0];
                    insertInput(x,y,nearby||null);return;
                }
                if(tool==='field'&&author){const size=fieldSize(),field={type:'field',id:crypto.randomUUID(),x:Math.max(0,Math.min(1000-size.w,x-size.w/2)),y:Math.max(0,Math.min(1000-size.h,y-size.h/2)),...size};selected=field.id;commit([...ops,field]);return;}
                const color=el.querySelector('[data-photo-color]').value,width=Number(el.querySelector('[data-photo-width]').value);
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
