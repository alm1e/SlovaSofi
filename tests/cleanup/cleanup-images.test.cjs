const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),{stripTypeScriptTypes}=require('node:module');
const root=path.resolve(__dirname,'../..');
function engine({dry=true,failStorage=false,claim=null,finishFailure=false,beginError=null}={}){
 let handler;const calls=[],removed=[],object={id:'object-1',name:'owner/file.png'};
 const client={rpc:async(name,args)=>{calls.push({name,args});if(name==='begin_lesson_image_cleanup')return {data:{run_id:'run',dry_run:dry,pending_count:1,objects:[object]},error:beginError};if(name==='claim_lesson_image_cleanup')return {data:claim===null?object.name:claim,error:null};if(name==='finish_lesson_image_cleanup')return {data:null,error:finishFailure&&args.target_object?{message:'unconfirmed'}:null};throw Error(name);},storage:{from:bucket=>({remove:async names=>{removed.push({bucket,names});return {error:failStorage?{message:'SENSITIVE INTERNAL ERROR'}:null};}})}};
 const ctx=vm.createContext({SlovaCleanupSiteImages:[],createClient:()=>client,Request,Response,console,Deno:{env:{get:key=>key},serve:fn=>handler=fn}});
 vm.runInContext(stripTypeScriptTypes(fs.readFileSync(path.join(root,'supabase/functions/cleanup-images/index.ts'),'utf8').replace(/^import .*;\r?\n/gm,'')),ctx);
 const request=async(body={},headers={'x-cleanup-token':'a'.repeat(64)},method='POST')=>{const response=await handler(new Request('https://cleanup.example',{method,headers,body:method==='POST'?JSON.stringify(body):undefined}));return {status:response.status,body:await response.json()};};
 return {request,calls,removed};
}
test('rejects anonymous calls and malformed bodies before any database or storage operation',async()=>{
 const e=engine();assert.equal((await e.request({},{})).status,401);assert.equal((await e.request({dry_run:'false'})).status,400);assert.equal((await e.request({},undefined,'GET')).status,405);assert.equal(e.calls.length,0);assert.equal(e.removed.length,0);
});
test('dry-run never claims or deletes and records a bounded preview report',async()=>{
 const e=engine(),result=await e.request();assert.equal(result.status,200);assert.equal(result.body.dry_run,true);assert.equal(e.removed.length,0);assert.equal(e.calls.some(c=>c.name==='claim_lesson_image_cleanup'),false);assert.equal(e.calls[0].args.requested_dry_run,true);assert.equal(e.calls.at(-1).args.summary.objects[0].status,'preview');
});
test('requires explicit apply and a database claim, then confirms Storage deletion before recording success',async()=>{
 const e=engine({dry:false}),result=await e.request({dry_run:false});assert.equal(result.status,200);assert.equal(result.body.deleted,1);assert.equal(e.calls[0].args.requested_dry_run,false);assert.deepEqual(JSON.parse(JSON.stringify(e.removed)),[{bucket:'lesson-images',names:['owner/file.png']}]);assert.equal(e.calls.filter(c=>c.name==='finish_lesson_image_cleanup').length,2);
});
test('a failed Storage delete remains retryable and cannot be counted as success',async()=>{
 const e=engine({dry:false,failStorage:true}),r=await e.request({dry_run:false});assert.equal(r.status,500);assert.equal(r.body.deleted,0);assert.equal(r.body.failed,1);assert.equal(JSON.stringify(r.body).includes('SENSITIVE'),false);assert.equal(e.calls.some(c=>c.name==='finish_lesson_image_cleanup'&&c.args.target_object),false);
});
test('a failed confirmation is reported as unconfirmed; a referenced candidate is skipped',async()=>{
 const e=engine({dry:false,finishFailure:true}),r=await e.request({dry_run:false});assert.equal(r.status,500);assert.equal(r.body.deleted,0);assert.equal(r.body.objects[0].status,'unconfirmed');
 const skipped=engine({dry:false,claim:''}),s=await skipped.request({dry_run:false});assert.equal(s.body.skipped,1);assert.equal(skipped.removed.length,0);
});
test('unknown credentials and overlapping runs cannot reach Storage',async()=>{
 for(const [message,status] of [['unauthorized',401],['cleanup_busy',409]]){const e=engine({beginError:{message}});assert.equal((await e.request({dry_run:false})).status,status);assert.equal(e.removed.length,0);}
});
test('the published source image manifest is fresh and static names are protected',()=>{
 const {generate}=require('../../tools/image-cleanup-source.cjs');assert.equal(fs.readFileSync(path.join(root,'supabase/functions/cleanup-images/site-image-ids.js'),'utf8'),generate(root));
});
