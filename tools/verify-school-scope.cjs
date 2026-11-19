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
 const names = ['20261014_teacher_workspace.sql','20261015_student_invites.sql','20261016_teacher_workspace_members.sql','20261017_remove_legacy_teacher_materials.sql','20261018_teacher_roles_and_isolation.sql','20261019_teacher_student_directory.sql','20261021_lock_student_direct_access.sql','20261022_revoke_anon_teacher_workspace_rpc_execute.sql','20261023_teacher_role_rls_and_fk_indexes.sql','20261024_calendar_events.sql','20261027_lesson_images_storage.sql','20261028_lesson_media_storage.sql','20261029_student_pronunciation_recordings.sql','20261031_workspace_editors_reset_lesson_progress.sql','20261103_lesson_categories.sql','20261104_delete_lesson_category.sql'];
 for (const name of names) await db.exec(fs.readFileSync(path.join(root,'supabase/migrations',name),'utf8'));
 const uid = n => `00000000-0000-4000-8000-${String(n).padStart(12,'0')}`;
 await db.exec(`insert into teacher_classes(id,teacher_id,name) values ('${uid(11)}','${uid(2)}','Legacy personal');`);
 await db.exec(fs.readFileSync(migrationPath,'utf8'));
 await db.exec(fs.readFileSync(path.join(root,'supabase/migrations/20261117_director_lesson_editing.sql'),'utf8'));
 await db.exec(fs.readFileSync(path.join(root,'supabase/migrations/20261118_class_archive.sql'),'utf8'));
 await db.exec(fs.readFileSync(path.join(root,'supabase/migrations/20261119_audit_and_lesson_versions.sql'),'utf8'));
 await db.exec(fs.readFileSync(path.join(root,'supabase/migrations/20261120_homework_deadlines.sql'),'utf8'));
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
  assert.equal((await rows('select public.can_edit_lessons() as allowed'))[0].allowed,true,'Director can edit shared lessons');
  const {permissions}=(await rows('select public.teacher_workspace_context() as context'))[0].context;
  assert.equal(permissions.edit_lessons,true);
  await db.exec(`insert into storage.objects(bucket_id,name) values ('lesson-images','director/example.png'),('lesson-media','director/example.mp3')`);
  await assert.rejects(()=>db.exec(`insert into storage.objects(bucket_id,name) values ('student-recordings','${uid(4)}/${uid(13)}/${uid(21)}/forged.webm')`),/row-level security/i);

  await db.exec(`update teacher_lessons set title='Director edited existing lesson' where id='${uid(21)}'`);
  assert.equal((await rows(`select title from teacher_lessons where id='${uid(21)}'`))[0].title,'Director edited existing lesson');
  await db.exec(`insert into teacher_lessons(id,teacher_id,title,unit) values ('${uid(22)}','${uid(4)}','Director new lesson','A1')`);
  await db.exec(`insert into lesson_categories(name) values ('Director category')`);
  assert.equal(permissions.view_classes_students,true); assert.equal(permissions.view_lessons,true);
  for(const key of ['manage_classes_students','view_assign_lessons','manage_teachers']) assert.equal(permissions[key],false,key);
  assert.equal((await rows(`update teacher_classes set name='forged' returning *`)).length,0);
  assert.equal((await rows(`update teacher_classes set archived_at=now() returning *`)).length,0,'Director cannot archive classes');
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
  const before = await rows(`select c.id,s.id as student_id,p.answers,a.lesson_id from teacher_classes c join class_students s on s.class_id=c.id join class_lesson_assignments a on a.class_id=c.id join student_lesson_progress p on p.student_id=s.id where c.id='${uid(12)}'`);
  await db.exec(`update teacher_classes set archived_at=now() where id='${uid(12)}'`);
  assert((await rows(`select archived_at from teacher_classes where id='${uid(12)}'`))[0].archived_at);
  assert.deepEqual(await rows(`select c.id,s.id as student_id,p.answers,a.lesson_id from teacher_classes c join class_students s on s.class_id=c.id join class_lesson_assignments a on a.class_id=c.id join student_lesson_progress p on p.student_id=s.id where c.id='${uid(12)}'`),before,'Archive preserves students, assignments and answers');
  assert.equal((await rows(`update teacher_classes set archived_at=now() where id='${uid(13)}' returning *`)).length,0,'Teacher cannot archive another teacher class');
  await db.exec(`update teacher_classes set archived_at=null where id='${uid(12)}'`);
  assert.equal((await rows(`select archived_at from teacher_classes where id='${uid(12)}'`))[0].archived_at,null);

 });
 await asUser(1,async()=>{
  assert.equal((await rows('select * from teacher_classes')).length,6,'Admin sees all');
  await db.exec(`update teacher_classes set class_scope='school' where id='${uid(11)}'`);
 });
 await asUser(5,async()=>{
  assert.equal((await rows('select * from teacher_classes')).length,2,'Student memberships preserved');
  assert.equal((await rows(`select * from teacher_classes where id='${uid(13)}'`)).length,0,'Student cannot read unrelated class');
 });
 // Version history and audit trail use real PostgreSQL permissions and triggers.
 await asUser(2,async()=>{
  const oldest=(await rows(`select * from lesson_versions where lesson_id='${uid(21)}' order by version_no limit 1`))[0];
  assert(oldest,'Initial lesson snapshot');
  await db.exec(`update teacher_lessons set title='Teacher revised lesson' where id='${uid(21)}'`);
  const before=(await rows(`select count(*)::int as n from lesson_versions where lesson_id='${uid(21)}'`))[0].n;
  const revision=(await rows(`select updated_at from teacher_lessons where id='${uid(21)}'`))[0].updated_at;
  const logsBefore=(await rows(`select count(*)::int as n from school_audit_log where action like 'lesson.%'`))[0].n;
  await db.exec(`update teacher_lessons set updated_at=now() where id='${uid(21)}'`);
  assert.equal((await rows(`select count(*)::int as n from lesson_versions where lesson_id='${uid(21)}'`))[0].n,before,'No-op autosave creates no version');
  assert.deepEqual((await rows(`select updated_at from teacher_lessons where id='${uid(21)}'`))[0].updated_at,revision,'No-op autosave preserves revision');
  assert.equal((await rows(`select count(*)::int as n from school_audit_log where action like 'lesson.%'`))[0].n,logsBefore,'No-op autosave creates no audit noise');
  const progressBefore=await rows(`select * from student_lesson_progress where lesson_id='${uid(21)}' order by student_id`);
  const assignmentsBefore=await rows(`select * from class_lesson_assignments where lesson_id='${uid(21)}' order by class_id`);
  await db.query('select public.restore_lesson_version($1,$2)',[oldest.id,revision]);
  assert.equal((await rows(`select title from teacher_lessons where id='${uid(21)}'`))[0].title,oldest.snapshot.title);
  assert.equal((await rows(`select count(*)::int as n from lesson_versions where lesson_id='${uid(21)}'`))[0].n,before+1,'Restore creates a new version');
  assert.deepEqual(await rows(`select * from student_lesson_progress where lesson_id='${uid(21)}' order by student_id`),progressBefore,'Restore preserves student answers');
  assert.deepEqual(await rows(`select * from class_lesson_assignments where lesson_id='${uid(21)}' order by class_id`),assignmentsBefore,'Restore preserves assignments');
  await assert.rejects(()=>db.query('select public.restore_lesson_version($1,$2)',[oldest.id,revision]),/lesson_changed/,'Concurrent revision cannot be overwritten');
  assert((await rows(`select actor_id from school_audit_log where action='lesson.restored' order by id desc limit 1`))[0].actor_id===uid(2),'Verified restore actor');
  assert.equal((await rows(`select * from school_audit_log where class_id='${uid(13)}'`)).length,0,'Teacher cannot read another teacher private class log');
  await assert.rejects(()=>db.exec("insert into school_audit_log(action) values ('forged')"),/permission denied/i);
  await assert.rejects(()=>db.exec('delete from lesson_versions'),/permission denied/i);
  await assert.rejects(()=>db.query('select public.set_staff_access($1,$2,$3)',[uid(2),'director',false]),/staff_access_forbidden/);
 });
 await asUser(4,async()=>{
  assert.equal((await rows(`select * from school_audit_log where class_id='${uid(13)}'`)).length,0,'Director cannot see private class history');
  assert((await rows(`select * from lesson_versions where lesson_id='${uid(21)}'`)).length>1,'Director sees shared lesson history');
  assert.equal((await rows("select * from school_audit_log where action like 'staff.%'")).length,0,'Director cannot read staff security history');
 });
 await asUser(5,async()=>{
  assert.equal((await rows('select * from lesson_versions')).length,0,'Student cannot read historical answer keys');
  assert.equal((await rows('select * from school_audit_log')).length,0,'Student cannot read audit logs');
  await assert.rejects(()=>db.query('select public.restore_lesson_version($1,$2)',[uid(21),new Date()]),/restore_forbidden/);
 });
 await asUser(1,async()=>{
  await db.query('select public.set_staff_access($1,$2,$3)',[uid(3),'director',false]);
  const event=(await rows("select * from school_audit_log where action='staff.role_changed' order by id desc limit 1"))[0];
  assert.equal(event.actor_id,uid(1),'Staff role audit uses administrator identity');
  assert.equal(event.details.to,'director');
  await db.query('select public.set_staff_access($1,$2,$3)',[uid(3),'teacher',false]);
 });
 await asUser(1,async()=>{
  await db.query('select public.set_staff_access($1,$2,$3)',[uid(3),'teacher',true]);
  assert.equal((await rows(`select actor_id from school_audit_log where action='staff.editor_granted' order by id desc limit 1`))[0].actor_id,uid(1));
  await db.query('select public.set_staff_access($1,$2,$3)',[uid(3),'teacher',false]);
  assert.equal((await rows(`select actor_id from school_audit_log where action='staff.editor_revoked' order by id desc limit 1`))[0].actor_id,uid(1));
  const versionsBefore=(await rows(`select count(*)::int as n from lesson_versions where lesson_id='${uid(22)}'`))[0].n;
  await db.exec(`delete from teacher_lessons where id='${uid(22)}'`);
  assert.equal((await rows(`select count(*)::int as n from lesson_versions where lesson_id='${uid(22)}'`))[0].n,versionsBefore,'Deleting a lesson preserves its history');
  assert((await rows(`select * from school_audit_log where action='lesson.deleted' and entity_id='${uid(22)}'`)).length>0);
 });
 await asUser(3,async()=>{
  await assert.rejects(()=>db.query('select public.restore_lesson_version($1,$2)',[uid(21),new Date()]),/restore_forbidden/,'Teacher without editor permission cannot restore');
 });
 await db.exec("select set_config('request.jwt.claim.sub','',false)");
  await db.exec(`insert into auth.users(id,email) values ('${uid(6)}','peer@example.test');insert into profiles(id,role) values ('${uid(6)}','student');insert into class_students(id,class_id,teacher_id,display_name,linked_user_id) values ('${uid(34)}','${uid(12)}','${uid(2)}','Z Peer','${uid(6)}')`);
 await asUser(1,async()=>{
  await db.exec(`insert into teacher_lessons(id,teacher_id,title,unit,activities) values ('${uid(23)}','${uid(2)}','Homework lesson','A1','{"format":"sections-v1","sections":[{"title":"Lesson","activities":[{"id":"${uid(25)}","type":"open-answer","content":"Practice"}]}],"homeworkSections":[{"title":"Homework","activities":[{"id":"${uid(24)}","type":"open-answer","content":"Write"}]}]}'::jsonb)`);
  await db.exec(`insert into class_lesson_assignments(class_id,lesson_id,teacher_id) values ('${uid(12)}','${uid(23)}','${uid(2)}'),('${uid(13)}','${uid(23)}','${uid(3)}')`);
  await db.exec(`insert into homework_tasks(id,class_id,lesson_id,due_at) values ('${uid(61)}','${uid(12)}','${uid(23)}',now()+interval '7 days'),('${uid(62)}','${uid(13)}','${uid(23)}',now()+interval '7 days')`);
 });
 await asUser(5,async()=>{
  const tasks=(await rows('select public.list_homework() as tasks'))[0].tasks;
  assert.equal(tasks.length,1,'Student only sees assigned homework');
  assert.equal(tasks[0].submissions.length,1,'Student only sees own status');
  assert.equal(tasks[0].submissions[0].state,'not_started');
  await db.query('select public.start_homework($1)',[uid(61)]);
  assert.equal((await rows('select public.list_homework() as tasks'))[0].tasks[0].submissions[0].state,'in_progress');
  await db.query('select public.submit_homework($1)',[uid(61)]);
  assert.equal((await rows('select public.list_homework() as tasks'))[0].tasks[0].submissions[0].state,'submitted');
  const firstSubmitted=(await rows('select public.list_homework() as tasks'))[0].tasks[0].submissions[0].submitted_at;
  await db.query('select public.submit_homework($1)',[uid(61)]);
  assert.equal((await rows('select public.list_homework() as tasks'))[0].tasks[0].submissions[0].submitted_at,firstSubmitted,'A retry does not manufacture a new submission');
  await assert.rejects(()=>db.exec("update homework_submissions set state='reviewed'"),/permission denied/);
  await assert.rejects(()=>db.query('select public.start_homework($1)',[uid(62)]),/homework_forbidden/);
 });
 let submittedAt;
 await asUser(2,async()=>{
  const tasks=(await rows('select public.list_homework() as tasks'))[0].tasks;
  const submitted=tasks.find(task=>task.id===uid(61)).submissions[0];submittedAt=submitted.submitted_at;
  await db.query('select public.review_homework($1,$2,$3,$4)',[uid(61),uid(32),submittedAt,'Good work']);
  assert.equal((await rows('select public.list_homework() as tasks'))[0].tasks[0].submissions[0].state,'reviewed');
  assert.equal((await rows(`update homework_tasks set instructions='forged' where id='${uid(62)}' returning *`)).length,0,'Teacher cannot edit another teacher homework');
 });
 await asUser(4,async()=>{
  assert.equal((await rows('select public.list_homework() as tasks'))[0].tasks.length,1,'Director cannot see private homework');
  await assert.rejects(()=>db.query('select public.review_homework($1,$2,$3,$4)',[uid(61),uid(32),submittedAt,'forged']),/review_forbidden/);
 });
 // Lecture-only progress changes must not invalidate reviewed homework.
 await db.exec(`insert into student_lesson_progress(student_id,class_id,lesson_id,answers) values ('${uid(32)}','${uid(12)}','${uid(23)}','{"b${uid(25)}":{"response":"Lecture practice"}}')`);
 await asUser(5,async()=>{
  assert.equal((await rows('select public.list_homework() as tasks'))[0].tasks[0].submissions[0].state,'reviewed','Lecture answers do not invalidate reviewed homework');
 });
 // Simulate a student API answer write, which uses the service/owner connection.
 await db.exec(`update student_lesson_progress set answers=answers||'{"b${uid(24)}":{"response":"Changed after review"}}'::jsonb,updated_at=clock_timestamp() where student_id='${uid(32)}' and lesson_id='${uid(23)}'`);
 await asUser(5,async()=>{
  const task=(await rows('select public.list_homework() as tasks'))[0].tasks[0];
  assert.equal(task.submissions[0].state,'in_progress','Changed responses invalidate reviewed status');
  assert.equal(task.submissions[0].feedback,'Good work','Prior teacher feedback is preserved');
  await db.query('select public.submit_homework($1)',[uid(61)]);
 });
 await asUser(2,async()=>{
  await assert.rejects(()=>db.query('select public.review_homework($1,$2,$3,$4)',[uid(61),uid(32),submittedAt,'Stale review']),/submission_changed/);
 });
 await db.exec("select set_config('request.jwt.claim.sub','',false)");
 await db.exec(fs.readFileSync(path.join(root,'supabase/migrations/20261124_student_scope.sql'),'utf8'));
 assert.equal((await rows(`select student_scope from profiles where id='${uid(5)}'`))[0].student_scope,'school','Existing students default to school');
 await db.exec(`insert into auth.users(id,email) values('${uid(306)}','personal@example.test'); insert into profiles(id,role,first_name) values('${uid(306)}','student','Personal');
 insert into teacher_classes(id,teacher_id,name,class_scope) values('${uid(316)}','${uid(2)}','Personal pupil class','private');
 insert into class_students(id,class_id,teacher_id,display_name,linked_user_id) values('${uid(336)}','${uid(316)}','${uid(2)}','Personal','${uid(306)}');
 insert into class_lesson_assignments(class_id,lesson_id,teacher_id) values('${uid(316)}','${uid(21)}','${uid(2)}');
 insert into student_lesson_progress(student_id,class_id,lesson_id,answers) values('${uid(336)}','${uid(316)}','${uid(21)}','{"a0":{"response":"personal answer"}}');`);
 assert.equal((await rows(`select student_scope from profiles where id='${uid(306)}'`))[0].student_scope,'school','New pupils default to school');
 await asUser(1,async()=>{
  await db.query('select public.set_student_scope($1,$2,$3)',[uid(306),'private',uid(2)]);
  assert.equal((await rows('select * from public.student_directory()')).filter(p=>p.id===uid(306)).length,1,'Admin sees private student');
  await assert.rejects(()=>db.query('select public.set_student_scope($1,$2,$3)',[uid(5),'private',uid(2)]),/Сначала перенесите/);
 });
 await asUser(4,async()=>{
  assert.equal((await rows(`select * from profiles where id='${uid(306)}'`)).length,0,'Director cannot read private student profile');
  assert.equal((await rows('select * from public.student_directory()')).filter(p=>p.id===uid(306)).length,0,'Director cannot list private student');
  assert.equal((await rows(`select * from class_students where linked_user_id='${uid(306)}'`)).length,0,'Director cannot read private roster');
  assert.equal((await rows(`delete from teacher_classes where id='${uid(316)}' returning id`)).length,0,'Director cannot delete class');
 });
 await asUser(3,async()=>{
  assert.equal((await rows('select * from public.student_directory()')).filter(p=>p.id===uid(306)).length,0,'Other teacher cannot list private student');
  await assert.rejects(()=>db.query('select public.set_student_scope($1,$2,$3)',[uid(306),'school',null]),/Только администратор/);
 });
 await asUser(2,async()=>{
  assert.equal((await rows('select * from public.student_directory()')).filter(p=>p.id===uid(306)).length,1,'Assigned teacher sees private student');
  await assert.rejects(()=>rows(`select * from teacher_student_directory where teacher_id='${uid(2)}' and student_user_id='${uid(306)}'`),/permission denied/);
  await assert.rejects(()=>db.exec(`insert into class_students(class_id,teacher_id,display_name,linked_user_id) values('${uid(12)}','${uid(2)}','Forbidden personal pupil','${uid(306)}')`),/Личного ученика/);
 });
 await asUser(1,async()=>{
  await assert.rejects(()=>db.exec(`update teacher_classes set class_scope='school' where id='${uid(316)}'`),/В классе есть личные ученики/);
 });
 await asUser(2,async()=>{
  assert.equal((await rows(`delete from teacher_classes where id='${uid(316)}' returning id`)).length,1,'Owner can delete class');
  assert.equal((await rows(`select * from class_students where id='${uid(336)}'`)).length,0,'Class deletion cascades roster');
  assert.equal((await rows(`select * from student_lesson_progress where student_id='${uid(336)}'`)).length,0,'Class deletion cascades its progress');
  assert.equal((await rows(`select * from teacher_lessons where id='${uid(21)}'`)).length,1,'Class deletion preserves library lesson');
 });
 assert.equal((await rows(`select * from profiles where id='${uid(306)}'`)).length,1,'Class deletion preserves account');
 console.log('PASS: Student school/private defaults, admin-only classification, director and other teacher privacy, owner access, incompatible memberships rejected without deleting progress, class delete authorization and account preservation.');
 console.log('PASS: Homework deadlines, submission/review workflow and isolation; version snapshots, restore/concurrency protection, immutable scoped audit log and actor attribution; shared lesson creation/editing and media uploads; PostgreSQL migration, existing-class privacy, default school / explicit personal, director read-only across classes/rosters/assignments/calendar/progress/recordings, stale-role isolation, teacher isolation, student membership and admin transfer.');
 await db.exec("select set_config('request.jwt.claim.sub','',false)");
 await db.exec(fs.readFileSync(path.join(root,'supabase/migrations/20261125_category_presentation.sql'),'utf8'));
 await db.exec(`insert into teacher_lessons(id,teacher_id,title,unit,activities) values('${uid(401)}','${uid(2)}','Note controls','A1','[{"id":"${uid(402)}","type":"text","content":"Note","settings":{"note":true}}]');`);
 const revision=(await rows(`select updated_at from teacher_lessons where id='${uid(401)}'`))[0].updated_at;
 await asUser(2,async()=>{
  await db.query('select set_category_cover($1,$2)',['A1','https://test.example/cover.png']);
  const order=(await rows("select id from teacher_lessons where unit='A1' order by id desc")).map(r=>r.id);
  await db.query('select set_category_order($1,$2,$3)',['A1',order,[]]);
  assert.deepEqual((await rows("select lesson_order from lesson_categories where name='A1'"))[0].lesson_order,order);
  await assert.rejects(()=>db.query('select set_category_order($1,$2,$3)',['A1',order,[]]),/Порядок уже изменён/);
  await db.query('select set_note_visibility($1,$2,$3)',[uid(401),uid(402),false]);
  assert.equal((await rows(`select note_visibility from teacher_lessons where id='${uid(401)}'`))[0].note_visibility[uid(402)],false);
  assert.deepEqual((await rows(`select updated_at from teacher_lessons where id='${uid(401)}'`))[0].updated_at,revision,'Eye toggle preserves pupil revision');
  await db.query('select set_note_visibility($1,$2,$3)',[uid(401),uid(402),true]);
  await assert.rejects(()=>db.query('select set_note_visibility($1,$2,$3)',[uid(401),uid(999),false]),/Заметка не найдена/);
 });
 await asUser(5,async()=>{
  await assert.rejects(()=>db.query('select set_category_cover($1,$2)',['A1','https://test.example/no.png']),/Нет права/);
  await assert.rejects(()=>db.query('select set_note_visibility($1,$2,$3)',[uid(401),uid(402),false]),/Нет права/);
 });
 console.log('PASS: Category cover, persisted order with concurrency checks, note eye permissions and unchanged student revision.');
 await db.exec("select set_config('request.jwt.claim.sub','',false)");
 await db.exec(fs.readFileSync(path.join(root,'supabase/migrations/20261126_class_teacher_names.sql'),'utf8'));
 await db.exec(`update auth.users set raw_user_meta_data='{"display_name":"Metadata teacher"}' where id='${uid(2)}'; update profiles set first_name='',last_name='' where id='${uid(2)}';`);
 await asUser(1,async()=>{assert.equal((await rows('select * from class_teacher_names()')).find(p=>p.id===uid(2)).display_name,'Metadata teacher');});
 await asUser(2,async()=>{const labels=await rows('select * from class_teacher_names()');assert.equal(labels.length,1);assert.equal(labels[0].id,uid(2));});
 await asUser(4,async()=>{const labels=await rows('select * from class_teacher_names()');assert(labels.some(p=>p.id===uid(2)));assert(!labels.some(p=>p.id===uid(3)),'Director cannot get private class owner label');});
 await asUser(5,async()=>{assert.equal((await rows('select * from class_teacher_names()')).length,0);});
 await db.exec(`update profiles set first_name='Profile',last_name='Teacher' where id='${uid(2)}';`);
 await asUser(1,async()=>{assert.equal((await rows('select * from class_teacher_names()')).find(p=>p.id===uid(2)).display_name,'Profile Teacher');});
 console.log('PASS: Class teacher labels use profile and account metadata; teacher/director/student boundaries preserved.');
 await db.exec("select set_config('request.jwt.claim.sub','',false)");
 await db.exec(fs.readFileSync(path.join(root,'supabase/migrations/20261127_director_school_management.sql'),'utf8'));
 await asUser(4,async()=>{
  const {permissions}=(await rows('select teacher_workspace_context() as context'))[0].context;
  for(const key of ['manage_classes_students','view_assign_lessons','edit_lessons'])assert.equal(permissions[key],true);
  assert.equal(permissions.manage_teachers,false);
  assert.equal((await rows(`update teacher_classes set name='School managed by director',archived_at=now() where id='${uid(12)}' returning teacher_id`))[0].teacher_id,uid(2),'School class keeps its actual teacher');
  await db.exec(`update teacher_classes set archived_at=null where id='${uid(12)}'`);
  assert.equal((await rows(`update teacher_classes set name='Forbidden' where id='${uid(13)}' returning id`)).length,0);
  assert.equal((await rows(`delete from teacher_classes where id='${uid(13)}' returning id`)).length,0);
  for(const table of ['class_students','class_lesson_assignments','student_lesson_progress','calendar_events'])assert.equal((await rows(`delete from ${table} where class_id='${uid(13)}' returning class_id`)).length,0,'Private class child writes denied: '+table);
  await assert.rejects(()=>db.exec(`insert into teacher_classes(teacher_id,name,class_scope) values('${uid(4)}','Forbidden private','private')`),/row-level security/);
  await assert.rejects(()=>db.exec(`update teacher_classes set class_scope='private' where id='${uid(12)}'`),/Only the administrator/);
  await db.exec(`insert into teacher_classes(id,teacher_id,name,class_scope) values('${uid(501)}','${uid(4)}','Director school class','school') returning id`);
  await db.exec(`insert into class_students(id,class_id,teacher_id,display_name,linked_user_id) values('${uid(502)}','${uid(501)}','${uid(4)}','School pupil','${uid(5)}')`);
  await db.exec(`insert into class_lesson_assignments(class_id,lesson_id,teacher_id) values('${uid(501)}','${uid(21)}','${uid(4)}')`);
  assert.equal((await rows(`update class_students set display_name='Director updated pupil' where id='${uid(32)}' returning id`)).length,1);
  assert.equal((await rows(`update student_lesson_progress set answers=answers||'{"director_review":true}'::jsonb where student_id='${uid(32)}' and lesson_id='${uid(21)}' returning student_id`)).length,1);
  assert.equal((await rows(`select can_manage_homework('${uid(12)}') as allowed`))[0].allowed,true);
  assert.equal((await rows(`select can_manage_homework('${uid(13)}') as allowed`))[0].allowed,false);
  assert.equal((await rows('select * from student_directory()')).filter(p=>p.id===uid(306)).length,0);
  await assert.rejects(()=>db.query('select set_student_scope($1,$2,$3)',[uid(5),'private',uid(4)]),/Только администратор/);
  assert.equal((await rows(`delete from teacher_classes where id='${uid(501)}' returning id`)).length,1);
 });
 console.log('PASS: Director school management, creation, archive/delete, pupil edits, assignments and reviews; private records and administrator-only actions remain protected.');
 await db.close();
})().catch(e=>{console.error(e);process.exit(1);});
