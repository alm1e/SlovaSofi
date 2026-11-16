(function(root){
    'use strict';
    // Detect compact dark dots in horizontal runs; no text or image leaves the browser.
    function detect(image){
        const {width:w,height:h,data}=image;
        if(!Number.isInteger(w)||!Number.isInteger(h)||w<1||h<1||w*h>1800000||data.length!==w*h*4)return [];
        const pixels=new Uint8Array(w*h),queue=new Int32Array(w*h),components=[];
        for(let i=0;i<pixels.length;i++){const p=i*4,r=data[p],g=data[p+1],b=data[p+2];pixels[i]=data[p+3]>180&&Math.max(r,g,b)<145&&Math.max(r,g,b)-Math.min(r,g,b)<70?1:0;}
        for(let start=0;start<pixels.length;start++){
            if(pixels[start]!==1)continue;
            let head=0,tail=1,minX=w,minY=h,maxX=0,maxY=0;queue[0]=start;pixels[start]=2;
            while(head<tail){
                const i=queue[head++],x=i%w,y=Math.floor(i/w);minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y);
                for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){
                    const nx=x+dx,ny=y+dy;if(nx<0||nx>=w||ny<0||ny>=h)continue;
                    const next=ny*w+nx;if(pixels[next]===1){pixels[next]=2;queue[tail++]=next;}
                }
            }
            if(tail>=2)components.push({x:minX,y:minY,w:maxX-minX+1,h:maxY-minY+1,area:tail});
            if(components.length>30000)return [];
        }
        const maxDot=Math.max(5,Math.min(16,w*.015));
        const dots=components.filter(c=>c.w<=maxDot&&c.h<=maxDot&&c.w/c.h>.45&&c.w/c.h<2.1&&c.area/(c.w*c.h)>.35);
        const rows=[];
        for(const dot of dots.sort((a,b)=>a.y+a.h/2-b.y-b.h/2)){
            const cy=dot.y+dot.h/2,row=rows.findLast(r=>Math.abs(r.cy-cy)<=Math.max(2,dot.h*.6));
            if(row)row.items.push(dot);else rows.push({cy,items:[dot]});
        }
        const gaps=[];
        function finish(run){
            if(run.length<2||run.length>30)return;
            const first=run[0],last=run.at(-1),dotH=Math.max(...run.map(d=>d.h)),x=first.x,right=last.x+last.w,bottom=Math.max(...run.map(d=>d.y+d.h));
            const neighbours=components.filter(c=>c.h>=dotH*2.7&&c.h<=dotH*20&&c.w>dotH*.7&&Math.abs(c.y+c.h-bottom)<Math.max(dotH*2.5,c.h*.25)&&((c.x+c.w<=x&&x-c.x-c.w<Math.max(60,c.h*4))||(c.x>=right&&c.x-right<Math.max(60,c.h*4))));
            if(!neighbours.length)return;
            neighbours.sort((a,b)=>Math.min(Math.abs(a.x+a.w-x),Math.abs(a.x-right))-Math.min(Math.abs(b.x+b.w-x),Math.abs(b.x-right)));
            const letterH=neighbours.slice(0,4).map(c=>c.h).sort((a,b)=>a-b),font=Math.max(letterH[Math.floor(letterH.length/2)]*1.35,dotH*7.5);
            const top=Math.max(0,bottom-font*.88),height=Math.min(h-top,font*1.15),left=Math.max(0,x-1),width=Math.min(w-left,right-x+2);
            const samples=[];
            for(const sy of [first.y-3,bottom+3])for(const sx of [x,(x+right)/2,right]){const p=(Math.max(0,Math.min(h-1,Math.round(sy)))*w+Math.max(0,Math.min(w-1,Math.round(sx))))*4;samples.push([data[p],data[p+1],data[p+2]]);}
            samples.sort((a,b)=>a.reduce((s,n)=>s+n,0)-b.reduce((s,n)=>s+n,0));const color='#'+samples[Math.floor(samples.length*.66)].map(n=>n.toString(16).padStart(2,'0')).join('');
            const norm=(n,size)=>Math.round(n/size*10000)/10;
            const gap={x:norm(left,w),y:norm(top,h),w:Math.max(20,Math.min(500,norm(width,w))),h:Math.max(10,Math.min(200,norm(height,h))),font:Math.max(6,Math.min(100,norm(font,w))),mask:{x:norm(Math.max(0,x-1),w),y:norm(Math.max(0,Math.min(...run.map(d=>d.y))-1),h),w:norm(Math.min(w-x+1,right-x+2),w),h:norm(Math.min(dotH+2,h-Math.max(0,Math.min(...run.map(d=>d.y))-1)),h),color}};
            gap.w=Math.min(gap.w,1000-gap.x);gap.h=Math.min(gap.h,1000-gap.y);
            if(gap.w>=20&&gap.h>=10&&gap.mask.w<=500&&gap.mask.h<=200)gaps.push(gap);
        }
        for(const row of rows){
            let run=[];
            for(const dot of row.items.sort((a,b)=>a.x-b.x)){
                const prev=run.at(-1),step=prev?dot.x-prev.x:0;
                if(prev&&(step<Math.max(prev.w,dot.w)*1.3||step>Math.max(prev.w,dot.w)*6||Math.max(prev.h,dot.h)/Math.min(prev.h,dot.h)>2.2)) {finish(run);run=[];}
                run.push(dot);
            }
            finish(run);
        }
        return gaps.sort((a,b)=>a.y-b.y||a.x-b.x).slice(0,100);
    }
    root.SlovaPhotoGapDetector={detect};
    if(typeof module!=='undefined')module.exports=root.SlovaPhotoGapDetector;
})(typeof window!=='undefined'?window:globalThis);
