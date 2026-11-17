const {PGlite}=require('@electric-sql/pglite'),fs=require('node:fs'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.resolve(__dirname,'..'),id=n=>`00000000-0000-4000-8000-${String(n).padStart(12,'0')}`;
(async()=>{
 const db=new PGlite();await db.exec(`create role anon;create role authenticated;create role service_role bypassrls;create schema auth;create schema storage;
 create function auth.uid() returns uuid language sql as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
 create function public.is_platform_admin() returns boolean language sql as $$select auth.uid()='${id(1)}'::uuid$$;
 create function public.can_edit_lessons() returns boolean language sql as $$select auth.uid() in ('${id(1)}'::uuid,'${id(2)}'::uuid)$$;
 create table auth.users(id uuid primary key);insert into auth.users values('${id(1)}'),('${id(2)}');
 create table storage.objects(id uuid primary key,bucket_id text,name text,created_at timestamptz default now());
 create table teacher_lessons(id uuid primary key default gen_random_uuid(),activities jsonb);
 create table lesson_versions(id uuid primary key default gen_random_uuid(),snapshot jsonb);
 create table student_lesson_progress(id uuid primary key default gen_random_uuid(),answers jsonb);
 create table teacher_workspace_settings(id uuid primary key default gen_random_uuid(),settings jsonb);
 create table calendar_events(id uuid primary key default gen_random_uuid(),title text);
 create table homework_tasks(id uuid primary key default gen_random_uuid(),instructions text);
 create table school_audit_log(id uuid primary key default gen_random_uuid(),details jsonb);
 grant usage on schema public,auth to authenticated,anon,service_role;grant execute on function auth.uid() to authenticated,anon,service_role;`);
 await db.exec(fs.readFileSync(path.join(root,'supabase/migrations/20261121_unused_lesson_images.sql'),'utf8'));
 const scalar=async(sql,params=[])=>Object.values((await db.query(sql,params)).rows[0])[0];
 const token=await scalar('select cron_token from lesson_image_cleanup_settings');
 const name=n=>`${id(2)}/${id(n)}.png`;
 for(let n=10;n<=20;n++)await db.query("insert into storage.objects values($1,'lesson-images',$2,now()-interval '90 days')",[id(n),name(n)]);
 await db.query("insert into storage.objects values($1,'lesson-images',$2,now()-interval '1 day')",[id(21),name(21)]);
 await db.query("insert into storage.objects values($1,'student-recordings',$2,now()-interval '90 days')",[id(22),name(22)]);
 await db.query("insert into storage.objects values($1,'lesson-images','unmanaged.png',now()-interval '90 days')",[id(23)]);
 for(const [table,column,n] of [['teacher_lessons','activities',10],['lesson_versions','snapshot',11],['student_lesson_progress','answers',12],['teacher_workspace_settings','settings',13],['calendar_events','title',14],['homework_tasks','instructions',15],['school_audit_log','details',16]]){
  const value=n===14||n===15?name(n):JSON.stringify({content:`https://test.supabase.co/storage/v1/object/public/lesson-images/${name(n)}`});await db.query(`insert into ${table}(${column}) values($1)`,[value]);
 }
 await db.exec(`set role authenticated;select set_config('request.jwt.claim.sub','${id(2)}',false);`);
 await db.query('select protect_lesson_image_draft($1,$2)',['new-lesson',[id(17)]]);
 await assert.rejects(()=>db.query('select begin_lesson_image_cleanup($1)',[token]),/permission denied/);
 await db.exec('reset role');
 const begin=async(dry=false)=>scalar('select begin_lesson_image_cleanup($1,$2,$3)',[token,dry,[id(18)]]);
 const end=async run=>db.query('select finish_lesson_image_cleanup($1,null,$2)',[run.run_id,JSON.stringify({tested:true})]);
 await assert.rejects(()=>db.query('select begin_lesson_image_cleanup($1)', ['a'.repeat(64)]),/unauthorized/);
 let run=await begin();assert.equal(run.dry_run,true);assert.equal(run.pending_count,2);assert.equal(run.objects.length,0);
 await assert.rejects(begin,/cleanup_busy/);await end(run);
 await db.exec("update lesson_image_cleanup_candidates set first_seen_at=now()-interval '15 days'");
 run=await begin();assert.equal(run.objects.length,2);await assert.rejects(()=>db.query('select claim_lesson_image_cleanup($1,$2)',[run.run_id,id(19)]),/not_enabled/);await end(run);
 await db.exec('update lesson_image_cleanup_settings set enabled=true');
 // An image becomes referenced between the preview and deletion claim.
 await db.query('insert into teacher_lessons(activities) values($1)',[JSON.stringify({url:name(19)})]);
 run=await begin();assert.equal(run.objects.length,1);assert.equal(run.objects[0].id,id(20));
 assert.equal(await scalar('select claim_lesson_image_cleanup($1,$2)',[run.run_id,id(20)]),name(20));
 await assert.rejects(()=>db.query('insert into teacher_lessons(activities) values($1)',[JSON.stringify({url:name(20)})]),/image_unavailable/);
 await assert.rejects(()=>db.query('update storage.objects set created_at=now() where id=$1',[id(20)]),/image_unavailable/);
 await assert.rejects(()=>db.query('select finish_lesson_image_cleanup($1,$2)',[run.run_id,id(20)]),/not_confirmed/);
 // Only the test harness emulates Storage API removing metadata. Production never does this via SQL.
 await db.query('delete from storage.objects where id=$1',[id(20)]);await db.query('select finish_lesson_image_cleanup($1,$2)',[run.run_id,id(20)]);await end(run);
 await assert.rejects(()=>db.query('insert into lesson_versions(snapshot) values($1)',[JSON.stringify({url:name(20)})]),/image_unavailable/);
 assert.equal(await scalar('select count(*) from storage.objects'),13);
 await db.exec(`set role authenticated;select set_config('request.jwt.claim.sub','${id(2)}',false);`);assert.equal(await scalar('select count(*) from lesson_image_cleanup_runs'),0);
 await db.query('select protect_lesson_image_draft($1,$2)',['new-lesson',[]]);await db.exec('reset role');assert.equal(await scalar('select count(*) from lesson_image_cleanup_drafts'),0);
 // Verify scheduling SQL with isolated HTTP/Cron stubs (extensions are installed in Dashboard).
 await db.exec(`create schema net;create schema cron;
 create table test_http(url text,headers jsonb,body jsonb,timeout_ms int);
 create function net.http_post(url text,headers jsonb,body jsonb,timeout_milliseconds int) returns bigint language plpgsql as $$ begin insert into public.test_http values(url,headers,body,timeout_milliseconds);return 123;end $$;
 create function cron.schedule(text,text,text) returns bigint language sql as $$select 1::bigint$$;`);
 const schedule=fs.readFileSync(path.join(root,'supabase/migrations/20261122_schedule_lesson_image_cleanup.sql'),'utf8').replace(/do \$\$ begin[\s\S]*?end \$\$;/,'');await db.exec(schedule);
 await db.exec('update lesson_image_cleanup_settings set enabled=false');assert.equal(await scalar('select run_scheduled_lesson_image_cleanup()'),123);
 const queued=(await db.query('select * from test_http')).rows[0];assert.equal(queued.body.dry_run,true);assert.ok(queued.url.endsWith('/functions/v1/cleanup-images'));assert.equal(queued.headers['x-cleanup-token'],token);
 await db.exec('set role authenticated');await assert.rejects(()=>db.query('select run_scheduled_lesson_image_cleanup()'),/permission denied/);await db.exec('reset role');
 console.log('PASS: references in 7 sources + drafts + website, age/quarantine, auth/RLS, dry-run, disabled gate, lease, recheck, tombstones, replacement guard and deletion confirmation. No school data accessed.');await db.close();
})().catch(error=>{console.error(error);process.exitCode=1;});
