(function(root){
    'use strict';
    const MAX_BYTES=60000;
    function validate(value){
        if(typeof value==='string'){if(value.length>MAX_BYTES)throw Error('Drawing is too large');try{value=JSON.parse(value);}catch{throw Error('Invalid drawing');}}
        if(!value||typeof value!=='object'||Array.isArray(value))throw Error('Invalid drawing');
        const result=Object.create(null);let count=0,points=0;
        const coordinate=n=>typeof n==='number'&&Number.isFinite(n)&&n>=0&&n<=1000;
        const entries=Object.entries(value);if(entries.length>20)throw Error('Too many images');
        for(const [url,ops] of entries){
            if(!/^https?:\/\//i.test(url)||url.length>2000||!Array.isArray(ops))throw Error('Invalid image');
            const ids=new Set();
            result[url]=ops.map(op=>{
                if(++count>100||!op)throw Error('Too many drawing elements');
                if(op.type==='field'||op.type==='field-answer'||op.type==='input'){
                    if(typeof op.id!=='string'||! /^[A-Za-z0-9-]{1,64}$/.test(op.id)||ids.has(op.id))throw Error('Invalid field identity');
                    ids.add(op.id);
                    if(op.type==='field-answer'){
                        if(typeof op.text!=='string'||op.text.length>200)throw Error('Invalid field answer');
                        return {type:'field-answer',id:op.id,text:op.text};
                    }
                    if(!coordinate(op.x)||!coordinate(op.y)||!Number.isFinite(op.w)||op.w<20||op.w>500||!Number.isFinite(op.h)||op.h<10||op.h>200||op.x+op.w>1000.1||op.y+op.h>1000.1)throw Error('Invalid field geometry');
                    if(op.type==='input'&&(typeof op.text!=='string'||op.text.length>200))throw Error('Invalid inline text');
                    const extra={};
                    if(op.type==='input'&&op.font!==undefined){if(!Number.isFinite(op.font)||op.font<6||op.font>100)throw Error('Invalid font');extra.font=op.font;}
                    if(op.type==='input'&&op.mask!==undefined){
                        const m=op.mask;if(!m||!coordinate(m.x)||!coordinate(m.y)||!Number.isFinite(m.w)||!Number.isFinite(m.h)||m.w<=0||m.w>500||m.h<=0||m.h>200||m.x+m.w>1000.2||m.y+m.h>1000.2||!/^#[0-9a-f]{6}$/i.test(m.color))throw Error('Invalid gap mask');
                        extra.mask={x:m.x,y:m.y,w:m.w,h:m.h,color:m.color};
                    }
                    return {type:op.type,id:op.id,x:op.x,y:op.y,w:op.w,h:op.h,...(op.type==='input'?{text:op.text}:{}),...extra};
                }
                if(!/^#[0-9a-f]{6}$/i.test(op.color)||![2,4,8].includes(op.width))throw Error('Invalid drawing tool');
                if(op.type==='text'){
                    if(!coordinate(op.x)||!coordinate(op.y)||typeof op.text!=='string'||!op.text.trim()||op.text.length>200)throw Error('Invalid text');
                    return {type:'text',color:op.color,width:op.width,x:op.x,y:op.y,text:op.text};
                }
                if(op.type!=='pen'||!Array.isArray(op.points)||!op.points.length||op.points.length>500)throw Error('Invalid stroke');
                points+=op.points.length;if(points>3000)throw Error('Too many drawing points');
                return {type:'pen',color:op.color,width:op.width,points:op.points.map(p=>{if(!Array.isArray(p)||p.length!==2||!p.every(coordinate))throw Error('Invalid point');return [p[0],p[1]];})};
            });
        }
        if(JSON.stringify(result).length>MAX_BYTES)throw Error('Drawing is too large');return result;
    }
    function read(value){try{return validate(value||{});}catch{return {};}}
    function hasContent(value){return Object.values(read(value)).some(ops=>ops.some(op=>op.type==='pen'?op.points.length>0:typeof op.text==='string'&&op.text.trim().length>0));}
    root.SlovaPhotoAnnotations={validate,read,hasContent,MAX_BYTES};
    if(typeof module!=='undefined')module.exports=root.SlovaPhotoAnnotations;
})(typeof window!=='undefined'?window:globalThis);
