const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../../assets/js/teacher.js'),'utf8');
function browser(rpc){const values=new Map(),context=vm.createContext({currentUser:{id:'teacher'},currentLanguage:'ru',crypto:require('node:crypto').webcrypto,lessonDraftStorageKey:()=> 'draft:teacher',localStorage:{getItem:key=>values.get(key)||null,setItem:(key,value)=>values.set(key,value)},window:{supabaseClient:{rpc}},Promise});vm.runInContext(source.slice(source.indexOf('let lessonImageDraftProtectionQueue ='),source.indexOf('\nfunction clearNewLessonDraft()')),context);return context;}
const owner='00000000-0000-4000-8000-000000000001',image='00000000-0000-4000-8000-000000000002',snapshot={url:`https://db.example/storage/v1/object/public/lesson-images/${owner}/${image}.png`};
test('different browsers protect separate drafts and clearing one cannot erase the other',async()=>{
 const calls=[],rpc=async(name,args)=>{calls.push({name,args});return {error:null};},a=browser(rpc),b=browser(rpc);
 await a.protectNewLessonDraftImages(snapshot);await b.protectNewLessonDraftImages(snapshot);await a.protectNewLessonDraftImages({});assert.notEqual(calls[0].args.draft_key,calls[1].args.draft_key);assert.equal(calls[2].args.draft_key,calls[0].args.draft_key);assert.equal(calls[2].args.image_ids.length,0);assert.equal(calls[1].args.image_ids[0],image);
});
test('writes remain ordered; a failed protection is reported and does not poison the next save',async()=>{
 let active=0,max=0,count=0;const context=browser(async()=>{active++;max=Math.max(max,active);await new Promise(resolve=>setTimeout(resolve,2));active--;return {error:count++===0?{message:'offline'}:null};});
 const first=context.protectNewLessonDraftImages(snapshot),second=context.protectNewLessonDraftImages({});await assert.rejects(first,/защитить/);await second;assert.equal(max,1);assert.equal(count,2);
});
