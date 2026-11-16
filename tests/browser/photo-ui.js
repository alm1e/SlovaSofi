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
 check('mobile editor does not overflow the viewport',document.documentElement.scrollWidth<=innerWidth+1);
 }catch(e){check('browser exception: '+e.message,false);}
 log.textContent+=`TOTAL ${total}; FAIL ${failed}\n`;
})();
