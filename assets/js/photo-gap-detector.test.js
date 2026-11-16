const test=require('node:test'),assert=require('node:assert/strict'),{detect}=require('./photo-gap-detector.js');
function image(w=400,h=180){const data=new Uint8ClampedArray(w*h*4);for(let i=0;i<data.length;i+=4){data[i]=205;data[i+1]=202;data[i+2]=210;data[i+3]=255;}return {width:w,height:h,data};}
function rect(img,x,y,w,h,color=[25,25,25]){for(let j=y;j<y+h;j++)for(let i=x;i<x+w;i++){const p=(j*img.width+i)*4;img.data.set([...color,255],p);}}
test('detects short and long dotted gaps beside text and samples the actual coloured paper',()=>{
 const img=image();rect(img,20,30,12,20);[44,52,60].forEach(x=>rect(img,x,47,3,3));rect(img,77,30,12,20);
 rect(img,180,90,12,22);[205,213,221,229,237,245].forEach(x=>rect(img,x,109,3,3));
 const gaps=detect(img);assert.equal(gaps.length,2);assert.ok(gaps[0].x<115&&gaps[0].x+gaps[0].w>150);assert.equal(gaps[0].mask.color,'#cdcad2');assert.ok(gaps[1].w>gaps[0].w);assert.ok(gaps.every(g=>g.font>6));
});
test('ignores blank images, coloured artwork, isolated punctuation and dots above letter stems',()=>{
 assert.deepEqual(detect(image()),[]);let img=image();rect(img,20,30,12,20);rect(img,45,47,3,3);assert.deepEqual(detect(img),[]);
 img=image();[44,52,60].forEach(x=>rect(img,x,47,3,3,[20,70,200]));rect(img,20,30,12,20);assert.deepEqual(detect(img),[]);
 img=image();[44,52,60].forEach(x=>{rect(img,x,20,3,3);rect(img,x,28,3,20);});assert.deepEqual(detect(img),[]);
});
test('bounds processing for malformed and excessive pixel buffers',()=>{
 assert.deepEqual(detect({width:10000,height:10000,data:[]}),[]);assert.deepEqual(detect({width:10,height:10,data:[]}),[]);
});
