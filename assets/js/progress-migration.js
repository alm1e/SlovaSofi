// One-time migration uses the legacy server's supported types and order, never the new order.
const legacyTypes = new Set(['drag-words','fill-blank','multiple-choice','one-of-many','order-items','sentence-order','true-false','table','match','columns','open-answer','flashcards','text','image','audio','video','phrase-list','vocabulary']);
function migrateLessonProgress(snapshot) {
    const lessons=structuredClone(snapshot.lessons), progress=structuredClone(snapshot.progress), mappings=new Map();
    let renamed=0;
    for(const lesson of lessons){
        const value=lesson.activities;
        const sections=value?.format==='sections-v1' ? [...(value.sections||[]),...(value.homeworkSections||[])] : [{activities:Array.isArray(value)?value:[]}];
        const mapping=new Map();let index=0;
        for(const section of sections)for(const block of section.activities||[]){
            if(!block||typeof block!=='object')continue;
            delete block.legacyProgressIndex;
            if(!legacyTypes.has(block.type))continue;
            if(!/^[\da-f]{8}-[\da-f]{4}-[1-8][\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i.test(block.id||''))throw Error('A legacy activity has no stable ID');
            block.legacyProgressIndex=index;mapping.set(index,block);index++;
        }
        mappings.set(lesson.id,mapping);
    }
    for(const row of progress){
        const mapping=mappings.get(row.lesson_id);if(!mapping)throw Error('Progress references an unknown lesson');
        const next={};
        for(const [key,value]of Object.entries(row.answers||{})){
            const match=key.match(/^a(\d+)(\.q.+)?$/);let target=key;
            if(match){
                const block=mapping.get(Number(match[1]));if(!block)throw Error('Unmapped legacy answer: '+key);
                let suffix=match[2]||'';
                if(!suffix&&block.questions?.length){const id=String(block.questions[0].id||'');suffix='.q'+(/^[A-Za-z0-9_-]{1,100}$/.test(id)?id:'legacy-0');}
                target=match[2]===undefined && suffix && Object.hasOwn(row.answers,`a${match[1]}${suffix}`) ? 'legacy:'+key : 'b'+block.id+suffix;
                renamed++;
            }
            if(Object.hasOwn(next,target)&&JSON.stringify(next[target])!==JSON.stringify(value))throw Error('Conflicting answer aliases');
            if(Object.hasOwn(row.answers,target)&&target!==key&&JSON.stringify(row.answers[target])!==JSON.stringify(value))throw Error('Conflicting stable answer');
            next[target]=value;
        }
        row.answers=next;
    }
    return {lessons,progress,renamed};
}
if(typeof module!=='undefined')module.exports={migrateLessonProgress};
