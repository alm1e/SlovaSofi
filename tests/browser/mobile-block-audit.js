(function(root){
 const visible=el=>{const style=getComputedStyle(el);return el.getClientRects().length&&style.display!=='none'&&style.visibility!=='hidden'&&style.opacity!=='0';};
 function measure(container){
  const issues=[];
  if(document.documentElement.scrollWidth>innerWidth+2)issues.push('page width '+document.documentElement.scrollWidth+' > '+innerWidth);
  const bounds=container.getBoundingClientRect();
  for(const element of container.querySelectorAll('*')){
   if(!visible(element))continue;
   if(element.closest('.slova-gallery,.flashcard-deck,.student-table-wrap,.preview-table-wrap,.visual-rich-table-wrap'))continue;
   const rect=element.getBoundingClientRect(),style=getComputedStyle(element);
   if(rect.width<2||rect.height<2||style.position==='fixed')continue;
   if(rect.left<bounds.left-3||rect.right>Math.min(bounds.right,innerWidth)+3)issues.push(element.tagName.toLowerCase()+'.'+String(element.className).split(' ').join('.')+' bounds '+Math.round(rect.left)+'..'+Math.round(rect.right)+' outside '+Math.round(bounds.left)+'..'+Math.round(bounds.right));
   if(element.matches('button,label,p,li,h3')&&element.scrollWidth>element.clientWidth+3&&style.overflowX==='visible')issues.push(element.tagName.toLowerCase()+'.'+String(element.className)+' text clips '+element.scrollWidth+'/'+element.clientWidth+' in '+element.parentElement.className+' ['+element.textContent.trim().slice(0,65)+'] '+element.innerHTML.slice(0,120));
  }
  return [...new Set(issues)].slice(0,5);
 }
 async function pictures(container){
  const images=[...container.querySelectorAll('img')].filter(image=>!image.closest('[hidden]'));
  // Audit off-screen cards too: production thumbnails use lazy loading.
  for(const image of images){image.loading='eager';image.src=image.closest('[data-photo-editor],.preview-hotspot-image,.student-hotspot-image')?'tall.svg':'wide.svg';}
  await Promise.all(images.map(image=>new Promise((resolve,reject)=>{
   const timer=setTimeout(()=>reject(Error('Local image decode timed out')),1500);
   image.decode().then(()=>{clearTimeout(timer);if(!image.naturalWidth)reject(Error('Local image did not load'));else resolve();},error=>{clearTimeout(timer);reject(error);});
  })));
  await new Promise(requestAnimationFrame);
 }
 function report(results){const el=document.createElement('pre');el.id='qa-report';el.style='white-space:pre-wrap';el.textContent=results.join('\n')+'\nTOTAL '+results.length+'; FAIL '+results.filter(line=>line.startsWith('FAIL')).length;document.body.append(el);}
 root.MobileBlockAudit={measure,pictures,report};
})(window);
