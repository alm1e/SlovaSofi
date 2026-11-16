(async()=>{
 const log=document.createElement('pre');log.id='qa-report';log.style.whiteSpace='pre-wrap';document.body.append(log);let total=0,failed=0;
 const check=(name,ok)=>{total++;if(!ok)failed++;log.textContent+=`${ok?'PASS':'FAIL'} ${name}\n`;};
 try{
 const url='https://school.example/photo.png',pen={type:'pen',color:'#168653',width:4,points:[[100,100],[200,200]]};
 const host=document.querySelector('#photo-fixture');let changes=0;
 host.innerHTML=SlovaPhotoEditor.markup([{url,alt:'Photo'}],{[url]:[pen]},{},true,'ru');
 const image=host.querySelector('img');image.src='wide.svg';await image.decode();
 SlovaPhotoEditor.bind(host,{language:'ru',change:()=>changes++});
 const canvas=host.querySelector('canvas');
 const point=(type,x,y,id=1)=>{const r=canvas.getBoundingClientRect();canvas.dispatchEvent(new PointerEvent(type,{bubbles:true,pointerId:id,button:0,clientX:r.left+r.width*x,clientY:r.top+r.height*y}));};
 // Synthetic events cannot establish native pointer capture; exercise the same handlers with a capture stub.
 canvas.setPointerCapture=()=>{};
 point('pointerdown',.3,.3);point('pointermove',.6,.6);point('pointerup',.6,.6);
 check('a completed stroke is one saved change',changes===1&&SlovaPhotoEditor.value(host)[url].length===1);
 check('drawing stays aligned with the displayed image',Math.abs(canvas.getBoundingClientRect().height-image.getBoundingClientRect().height)<1);
 check('canvas contains rendered annotations',canvas.getContext('2d').getImageData(0,0,canvas.width,canvas.height).data.some((value,i)=>i%4===3&&value>0));
 host.querySelector('[data-photo-tool="text"]').click();host.querySelector('[data-photo-caption]').value='<b>слово</b>';point('pointerdown',.2,.8);
 check('text is saved literally and cannot become HTML',SlovaPhotoEditor.value(host)[url][1].text==='<b>слово</b>'&&!host.querySelector('b'));
 host.querySelector('[data-photo-undo]').click();check('undo removes only the latest element',SlovaPhotoEditor.value(host)[url].length===1);
 host.querySelector('[data-photo-clear]').click();check('clear preserves the teacher layer',SlovaPhotoEditor.value(host)[url].length===0&&JSON.parse(host.querySelector('[data-photo-editor]').dataset.photoBase).length===1);
 host.querySelector('[data-photo-tool="pen"]').click();point('pointerdown',.1,.4,2);point('pointermove',.2,.5,2);point('pointercancel',.2,.5,2);
 check('interrupted touch commits the visible stroke',SlovaPhotoEditor.value(host)[url].length===1);
 const saved=SlovaPhotoEditor.value(host);host.innerHTML=SlovaPhotoEditor.markup([{url}],{[url]:[pen]},saved,false,'ru');host.querySelector('img').src='wide.svg';await host.querySelector('img').decode();SlovaPhotoEditor.bind(host);
 check('reopening restores the saved drawing without editing controls',SlovaPhotoEditor.value(host)[url].length===1&&!host.querySelector('[data-photo-tool]'));
 host.innerHTML=SlovaPhotoEditor.markup([{url}],{},{},true,'ru',{authorFields:true});host.querySelector('img').src='wide.svg';await host.querySelector('img').decode();SlovaPhotoEditor.bind(host);
 host.querySelector('[data-photo-tool="field"]').click();const fieldCanvas=host.querySelector('canvas'),fr=fieldCanvas.getBoundingClientRect();fieldCanvas.dispatchEvent(new PointerEvent('pointerdown',{button:0,pointerId:4,clientX:fr.left+fr.width*.3,clientY:fr.top+fr.height*.3}));

 let field=SlovaPhotoEditor.value(host)[url][0];check('teacher places an answer field',field.type==='field'&&host.querySelector('[data-photo-field-answer]')?.readOnly);
 host.querySelector('[data-photo-field-width]').value='12';host.querySelector('[data-photo-field-width]').dispatchEvent(new Event('change'));field=SlovaPhotoEditor.value(host)[url][0];check('teacher adjusts field width',field.w===120);
 const dragHandle=(selector,dx,dy,id)=>{const handle=host.querySelector(selector);handle.setPointerCapture=()=>{};const bounds=handle.getBoundingClientRect();const x=bounds.left+bounds.width/2,y=bounds.top+bounds.height/2;for(const [type,cx,cy] of [['pointerdown',x,y],['pointermove',x+dx,y+dy],['pointerup',x+dx,y+dy]])handle.dispatchEvent(new PointerEvent(type,{button:0,pointerId:id,clientX:cx,clientY:cy}));};
 const oldX=field.x;dragHandle('.photo-field-move',10,10,5);field=SlovaPhotoEditor.value(host)[url][0];check('teacher moves a field without changing its identity',field.x>oldX);
 const oldW=field.w;dragHandle('.photo-field-resize',15,8,6);field=SlovaPhotoEditor.value(host)[url][0];check('teacher resizes a field with its corner',field.w>oldW);
 host.querySelector('[data-photo-undo]').click();field=SlovaPhotoEditor.value(host)[url][0];check('undo restores the previous field size',field.w===oldW);
 const template=SlovaPhotoEditor.value(host);
 host.innerHTML=SlovaPhotoEditor.markup([{url}],template,{},true,'ru');host.querySelector('img').src='wide.svg';await host.querySelector('img').decode();SlovaPhotoEditor.bind(host);
 const fieldInput=host.querySelector('[data-photo-field-answer]');fieldInput.value='á';fieldInput.dispatchEvent(new InputEvent('input',{bubbles:true}));
 check('student types directly inside the photo',!fieldInput.readOnly&&SlovaPhotoEditor.value(host)[url][0].text==='á');
 check('typing retains focus and input element',host.querySelector('[data-photo-field-answer]')===fieldInput);
 const stage=host.querySelector('.photo-stage').getBoundingClientRect(),box=fieldInput.getBoundingClientRect();check('field aligns proportionally with the photo',Math.abs((box.left-stage.left)/stage.width-field.x/1000)<.01&&Math.abs(box.width/stage.width-field.w/1000)<.01);
 const filled=SlovaPhotoEditor.value(host);host.innerHTML=SlovaPhotoEditor.markup([{url}],template,filled,false,'ru');host.querySelector('img').src='wide.svg';await host.querySelector('img').decode();SlovaPhotoEditor.bind(host);
 check('teacher sees the saved field answer',host.querySelector('[data-photo-field-answer]').value==='á'&&host.querySelector('[data-photo-field-answer]').readOnly);
 host.innerHTML=SlovaPhotoEditor.markup([{url}],template,filled,true,'ru');host.querySelector('img').src='wide.svg';await host.querySelector('img').decode();SlovaPhotoEditor.bind(host);host.querySelector('[data-photo-clear]').click();check('clear removes answers but keeps template fields',host.querySelector('[data-photo-field-answer]').value===''&&host.querySelectorAll('[data-photo-field-answer]').length===1);
 host.innerHTML=SlovaPhotoEditor.markup([{url}],{},filled,true,'ru');host.querySelector('img').src='wide.svg';await host.querySelector('img').decode();SlovaPhotoEditor.bind(host);check('removed template fields do not leave unsaveable orphan answers',SlovaPhotoEditor.value(host)[url].length===0);
 check('mobile editor does not overflow the viewport',document.documentElement.scrollWidth<=innerWidth+1);
 }catch(e){check('browser exception: '+e.message,false);}
 log.textContent+=`TOTAL ${total}; FAIL ${failed}\n`;
})();
