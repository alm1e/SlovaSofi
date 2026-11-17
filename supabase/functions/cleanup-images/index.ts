import "./site-image-ids.js";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const reply=(status:number,data:unknown)=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
Deno.serve(async(request:Request)=>{
    if(request.method!=='POST')return reply(405,{error:'POST required'});
    const token=request.headers.get('x-cleanup-token')||'';
    if(!/^[a-f0-9]{64}$/.test(token))return reply(401,{error:'Unauthorized'});
    let payload:{dry_run?:boolean};
    try{if(Number(request.headers.get('content-length')||0)>1024)return reply(413,{error:'Request too large'});const text=await request.text();if(text.length>1024)return reply(413,{error:'Request too large'});payload=text?JSON.parse(text):{};if(!payload||typeof payload!=='object'||Array.isArray(payload)||payload.dry_run!==undefined&&typeof payload.dry_run!=='boolean')throw Error();}catch{return reply(400,{error:'Invalid request'});}
    const client=createClient(Deno.env.get('SUPABASE_URL')!,Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,{auth:{persistSession:false,autoRefreshToken:false}});
    const {data:plan,error}=await client.rpc('begin_lesson_image_cleanup',{token,requested_dry_run:payload.dry_run!==false,protected_ids:(globalThis as unknown as {SlovaCleanupSiteImages:string[]}).SlovaCleanupSiteImages});
    if(error)return reply(error.message.includes('unauthorized')?401:error.message.includes('cleanup_busy')?409:500,{error:'Cleanup could not start'});
    const result={dry_run:plan.dry_run,pending_count:plan.pending_count,eligible:plan.objects.length,deleted:0,skipped:0,failed:0,objects:[] as {id:string;name:string;status:string}[]};
    try{
        if(plan.dry_run){for(const object of plan.objects)result.objects.push({...object,status:'preview'});}
        else for(const object of plan.objects){
            const {data:name,error:claimError}=await client.rpc('claim_lesson_image_cleanup',{run_id:plan.run_id,target_object:object.id});
            if(claimError){result.failed++;result.objects.push({...object,status:'claim_failed'});break;}
            if(!name){result.skipped++;continue;}
            // SQL never deletes storage.objects: the Storage API removes file bytes too.
            const {error:removeError}=await client.storage.from('lesson-images').remove([name]);
            if(removeError){result.failed++;result.objects.push({...object,status:'storage_failed'});continue;}
            const {error:finishError}=await client.rpc('finish_lesson_image_cleanup',{run_id:plan.run_id,target_object:object.id});
            if(finishError){result.failed++;result.objects.push({...object,status:'unconfirmed'});continue;}
            result.deleted++;result.objects.push({...object,status:'deleted'});
        }
    }catch{result.failed++;}
    const {error:finishError}=await client.rpc('finish_lesson_image_cleanup',{run_id:plan.run_id,summary:result});
    return reply(finishError||result.failed?500:200,finishError?{...result,error:'Run report could not be saved'}:result);
});
