const { PGlite } = require('@electric-sql/pglite');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const path = require('node:path');
const root = process.argv[2] || path.resolve(__dirname, '..');
const migrationPath = process.argv[3] || path.join(root,'supabase/migrations/20261116_school_class_scope.sql');
(async () => {
 const db = new PGlite();
 await db.exec(`
 create role anon; create role authenticated; create role service_role bypassrls;
 create schema auth; create schema storage;
 create table auth.users(id uuid primary key, email text, raw_user_meta_data jsonb default '{}');
 create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
 grant usage on schema auth, public, storage to authenticated, anon, service_role;
 grant execute on function auth.uid() to authenticated, anon, service_role;
 create table public.profiles(id uuid primary key references auth.users(id), first_name text default '',last_name text default '',phone text,role text not null default 'student' check(role in ('student','teacher','admin')));
 alter table public.profiles enable row level security;
 grant select,update on public.profiles to authenticated;
 create function public.create_student_profile() returns trigger language plpgsql as $$ begin return new; end $$;
 create table storage.buckets(id text primary key,name text, public boolean,file_size_limit bigint,allowed_mime_types text[]);
 create table storage.objects(id uuid primary key default gen_random_uuid(),bucket_id text,name text);
 alter table storage.objects enable row level security;
 grant select,insert,update,delete on storage.objects to authenticated;
 create function storage.foldername(text) returns text[] language sql immutable as $$ select string_to_array($1,'/') $$;
 insert into auth.users(id,email) values
 ('00000000-0000-4000-8000-000000000001','akhumanoid@gmail.com'),
 ('00000000-0000-4000-8000-000000000002','vikishim11@gmail.com'),
 ('00000000-0000-4000-8000-000000000003','teacher2@example.test'),
 ('00000000-0000-4000-8000-000000000004','director@example.test'),
 ('00000000-0000-4000-8000-000000000005','student@example.test');
 insert into profiles(id,role) select id,case when email='akhumanoid@gmail.com' then 'admin' when email='student@example.test' then 'student' else 'teacher' end from auth.users;
 `);
 const names = ['20261014_teacher_workspace.sql','20261015_student_invites.sql','20261016_teacher_workspace_members.sql','20261017_remove_legacy_teacher_materials.sql','20261018_teacher_roles_and_isolation.sql','20261019_teacher_student_directory.sql','20261021_lock_student_direct_access.sql','20261022_revoke_anon_teacher_workspace_rpc_execute.sql','20261023_teacher_role_rls_and_fk_indexes.sql','20261024_calendar_events.sql','20261029_student_pronunciation_recordings.sql','20261031_workspace_editors_reset_lesson_progress.sql','20261103_lesson_categories.sql','20261104_delete_lesson_category.sql'];
 for (const name of names) await db.exec(fs.readFileSync(path.join(root,'supabase/migrations',name),'utf8'));
 const uid = n => `00000000-0000-4000-8000-${String(n).padStart(12,'0')}`;
 await db.exec(`insert into teacher_classes(id,teacher_id,name) values ('${uid(11)}','${uid(2)}','Legacy personal');`);
 await db.exec(fs.readFileSync(migrationPath,'utf8'));
 assert.equal((await db.query(`select class_scope from teacher_classes where id='${uid(11)}'`)).rows[0].class_scope,'private');
 await db.exec(`
 update profiles set role='director' where id='${uid(4)}';
 insert into teacher_lesson_editors(user_id) values ('${uid(4)}');
 insert into teacher_classes(id,teacher_id,name,class_scope) values
 ('${uid(12)}','${uid(2)}','School','school'),('${uid(13)}','${uid(3)}','Other personal','private'),('${uid(14)}','${uid(4)}','Director former class','private');
 insert into teacher_lessons(id,teacher_id,title,unit) values ('${uid(21)}','${uid(2)}','Lesson','A1');
 insert into class_students(id,class_id,teacher_id,display_name,linked_user_id) values
 ('${uid(31)}','${uid(11)}','${uid(2)}','Private student','${uid(5)}'),
 ('${uid(32)}','${uid(12)}','${uid(2)}','School student','${uid(5)}'),
 ('${uid(33)}','${uid(13)}','${uid(3)}','Other student','${uid(4)}');
 insert into class_lesson_assignments(class_id,lesson_id,teacher_id) select id,'${uid(21)}',teacher_id from teacher_classes;
 insert into student_lesson_progress(student_id,class_id,lesson_id) select id,class_id,'${uid(21)}' from class_students;
 insert into calendar_events(teacher_id,class_id,title,starts_at) select teacher_id,id,name,now() from teacher_classes;
 insert into storage.objects(bucket_id,name) values ('student-recordings','${uid(5)}/${uid(11)}/${uid(21)}/private.webm'),('student-recordings','${uid(5)}/${uid(12)}/${uid(21)}/school.webm'),('student-recordings','${uid(4)}/${uid(13)}/${uid(21)}/old.webm');
 `);
 async function asUser(n, fn) {
  await db.exec(`set role authenticated; select set_config('request.jwt.claim.sub','${uid(n)}',false)`);
  try { await fn(); } finally { await db.exec('reset role'); }
 }
 const rows = async sql => (await db.query(sql)).rows;
 await asUser(4,async()=>{
  for (const table of ['teacher_classes','class_students','class_lesson_assignments','student_lesson_progress','calendar_events']) {
   assert.equal((await rows(`select * from ${table}`)).length,1,`Director school-only SELECT: ${table}`);
   const key=table==='teacher_classes'?'id':'class_id';
   assert.equal((await rows(`select * from ${table} where ${key}='${uid(11)}'`)).length,0,`Direct ID private read denied: ${table}`);
   assert.equal((await rows(`delete from ${table} returning *`)).length,0,`Director DELETE denied: ${table}`);
  }
  assert.equal((await rows('select * from storage.objects')).length,1,'Recording privacy');
  assert.equal((await rows('select public.can_edit_lessons() as allowed'))[0].allowed,false,'Stale editor grant ignored');
  const {permissions}=(await rows('select public.teacher_workspace_context() as context'))[0].context;
  assert.equal(permissions.view_classes_students,true); assert.equal(permissions.view_lessons,true);
  for(const key of ['manage_classes_students','view_assign_lessons','edit_lessons','manage_teachers']) assert.equal(permissions[key],false,key);
  assert.equal((await rows(`update teacher_classes set name='forged' returning *`)).length,0);
  assert.equal((await rows(`update student_lesson_progress set answers='{"forged":true}' returning *`)).length,0);
  await assert.rejects(()=>db.exec(`insert into teacher_classes(teacher_id,name) values ('${uid(4)}','forged')`),/row-level security/i);
  await assert.rejects(()=>db.exec(`update profiles set role='admin' where id='${uid(4)}'`),/row-level security/i);
 });
 await asUser(2,async()=>{
  assert.equal((await rows('select * from teacher_classes')).length,2,'Teacher own school and private classes');
  assert.equal((await rows(`select * from teacher_classes where id='${uid(13)}'`)).length,0,'Other teacher private denied');
  await db.exec(`insert into teacher_classes(id,teacher_id,name) values ('${uid(15)}','${uid(2)}','Default school')`);
  assert.equal((await rows(`select class_scope from teacher_classes where id='${uid(15)}'`))[0].class_scope,'school');
  await db.exec(`insert into teacher_classes(id,teacher_id,name,class_scope) values ('${uid(16)}','${uid(2)}','Explicit personal','private')`);
  await assert.rejects(()=>db.exec(`update teacher_classes set class_scope='private' where id='${uid(12)}'`),/Only the administrator/);
  await db.exec(`update teacher_classes set name='Edited personal' where id='${uid(11)}'`);
 });
 await asUser(1,async()=>{
  assert.equal((await rows('select * from teacher_classes')).length,6,'Admin sees all');
  await db.exec(`update teacher_classes set class_scope='school' where id='${uid(11)}'`);
 });
 await asUser(5,async()=>{
  assert.equal((await rows('select * from teacher_classes')).length,2,'Student memberships preserved');
  assert.equal((await rows(`select * from teacher_classes where id='${uid(13)}'`)).length,0,'Student cannot read unrelated class');
 });
 console.log('PASS: PostgreSQL migration, existing-class privacy, default school / explicit personal, director read-only across classes/rosters/assignments/calendar/progress/recordings, stale-role isolation, teacher isolation, student membership and admin transfer.');
 await db.close();
})().catch(e=>{console.error(e);process.exit(1);});
