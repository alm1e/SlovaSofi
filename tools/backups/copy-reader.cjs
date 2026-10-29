'use strict';
const fs=require('node:fs'),readline=require('node:readline');
const REQUIRED_TABLES=['auth.users','auth.identities','storage.buckets','storage.objects',...['profiles','teacher_classes','class_students','teacher_lessons','class_lesson_assignments','student_lesson_progress','teacher_workspace_settings','teacher_lesson_editors','teacher_student_directory','calendar_events'].map(name=>`public.${name}`)];

function decodeCopy(value){
    if(value==='\\N')return null;
    return value.replace(/\\(?:([0-7]{1,3})|x([0-9a-f]{1,2})|(.))/gi,(_,octal,hex,char)=>octal?String.fromCharCode(parseInt(octal,8)):hex?String.fromCharCode(parseInt(hex,16)):({b:'\b',f:'\f',n:'\n',r:'\r',t:'\t',v:'\v'}[char]??char));
}
async function readInventory(filename){
    const counts={},objects=[],buckets=[];let table=null,columns=[];
    const lines=readline.createInterface({input:fs.createReadStream(filename),crlfDelay:Infinity});
    for await(const line of lines){
        if(table){
            if(line==='\\.'){table=null;continue;}
            const fields=line.split('\t');if(fields.length!==columns.length)throw Error(`Invalid COPY record in ${table}`);
            counts[table]++;
            if(table==='storage.objects'||table==='storage.buckets'){
                const row=Object.fromEntries(columns.map((name,index)=>[name,decodeCopy(fields[index])]));
                if(table==='storage.objects'){
                    if(!row.bucket_id||!row.name||row.name.split('/').some(segment=>segment==='.'||segment==='..'))throw Error('Invalid Storage object identity');
                    let metadata;try{metadata=JSON.parse(row.metadata||'{}');}catch{throw Error('Invalid Storage metadata');}
                    const size=Number(metadata?.size);if(!Number.isSafeInteger(size)||size<0)throw Error('Storage object has no valid size');
                    objects.push({id:row.id,bucket:row.bucket_id,name:row.name,size,metadata,version:row.version||null,updatedAt:row.updated_at||null});
                }else buckets.push({id:row.id,public:row.public==='t',fileSizeLimit:row.file_size_limit});
            }
            continue;
        }
        const match=line.match(/^COPY ((?:"?[a-z_][\w]*"?)\.(?:"?[a-z_][\w]*"?)) \((.+)\) FROM stdin;$/i);
        if(match){table=match[1].replace(/"/g,'');columns=match[2].split(',').map(value=>value.trim().replace(/^"|"$/g,''));if(table in counts)throw Error('Duplicate COPY section');counts[table]=0;}
    }
    if(table)throw Error('Truncated COPY section');
    for(const name of REQUIRED_TABLES)if(!(name in counts))throw Error(`Backup is missing ${name}; school, Auth and Storage data must be included`);
    const seen=new Set();for(const object of objects){const key=JSON.stringify([object.bucket,object.name]);if(seen.has(key))throw Error('Duplicate Storage object');seen.add(key);if(!buckets.some(bucket=>bucket.id===object.bucket))throw Error('Unknown Storage bucket');}
    return {counts,objects,buckets};
}
module.exports={decodeCopy,readInventory};
