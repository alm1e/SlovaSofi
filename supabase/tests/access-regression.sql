-- Run as postgres. All synthetic fixtures are rolled back; no emails are sent.
begin;
set local statement_timeout = '30s';
do $$
declare
    teacher uuid := gen_random_uuid();
    other_teacher uuid := gen_random_uuid();
    student uuid := gen_random_uuid();
    outsider uuid := gen_random_uuid();
    administrator uuid := gen_random_uuid();
    class_a uuid := gen_random_uuid();
    class_b uuid := gen_random_uuid();
    member uuid := gen_random_uuid();
    lesson uuid := gen_random_uuid();
    affected integer;
begin
    insert into auth.users(id, raw_user_meta_data)
    select id, '{"role":"admin","first_name":"Regression"}'::jsonb
    from unnest(array[teacher,other_teacher,student,outsider,administrator]) id;
    if (select count(*) from public.profiles where id = any(array[teacher,other_teacher,student,outsider,administrator]) and role='student') <> 5 then
        raise exception 'Signup trigger or default role failed';
    end if;
    update public.profiles set role='teacher' where id in (teacher,other_teacher);
    update public.profiles set role='admin' where id=administrator;
    insert into public.teacher_classes(id,teacher_id,name,course)
    values(class_a,teacher,'Regression A','A1'),(class_b,other_teacher,'Regression B','A1');
    insert into public.class_students(id,class_id,teacher_id,display_name,linked_user_id)
    values(member,class_a,teacher,'Regression student',student);
    insert into public.teacher_lessons(id,teacher_id,title,unit,activities)
    values(lesson,teacher,'Regression lesson','A1','[]');
    insert into public.class_lesson_assignments(class_id,lesson_id,teacher_id)
    values(class_a,lesson,teacher),(class_b,lesson,other_teacher);
    insert into public.student_lesson_progress(student_id,class_id,lesson_id,answers)
    values(member,class_a,lesson,'{"a0":{"response":"preserved"}}');
    -- Deliberately leave an editor grant on a student to test stale grants.
    insert into public.teacher_lesson_editors(user_id) values(student);
    perform set_config('request.jwt.claim.sub',student::text,true);
    set local role authenticated;
    if public.can_edit_lessons() then raise exception 'Student editor escalation'; end if;
    if (select count(*) from public.teacher_classes where id in(class_a,class_b)) <> 1 then raise exception 'Student class isolation'; end if;
    if (select count(*) from public.class_lesson_assignments where lesson_id=lesson) <> 1 then raise exception 'Student assignment isolation'; end if;
    if exists(select 1 from public.teacher_lessons where id=lesson) then raise exception 'Answer key exposure'; end if;
    begin
        insert into public.teacher_classes(teacher_id,name,course) values(student,'Forbidden','A1');
        raise exception 'Student created class';
    exception when insufficient_privilege then null; end;
    begin
        update public.profiles set role='admin' where id=student;
        raise exception 'Student changed role';
    exception when insufficient_privilege then null; end;
    update public.class_students set display_name='Forbidden' where id=member;
    get diagnostics affected = row_count;
    if affected <> 0 then raise exception 'Student changed roster'; end if;
    delete from public.class_lesson_assignments where class_id=class_a;
    get diagnostics affected = row_count;
    if affected <> 0 then raise exception 'Student deleted assignment'; end if;
    update public.student_lesson_progress set answers='{}' where student_id=member;
    get diagnostics affected = row_count;
    if affected <> 0 then raise exception 'Student forged progress'; end if;
    perform set_config('request.jwt.claim.sub',outsider::text,true);
    if exists(select 1 from public.teacher_classes where id in(class_a,class_b)) then raise exception 'Unassigned student saw class'; end if;
    perform set_config('request.jwt.claim.sub',teacher::text,true);
    if public.can_edit_lessons() then raise exception 'Ordinary teacher became editor'; end if;
    if (select count(*) from public.teacher_classes where id in(class_a,class_b)) <> 1 then raise exception 'Teacher isolation'; end if;
    update public.class_students set display_name='Renamed student' where id=member;
    get diagnostics affected = row_count;
    if affected <> 1 then raise exception 'Teacher rename failed'; end if;
    if not exists(select 1 from public.student_lesson_progress where student_id=member and answers->'a0'->>'response'='preserved') then raise exception 'Rename lost progress'; end if;
    reset role;
    insert into public.teacher_lesson_editors(user_id) values(teacher);
    set local role authenticated;
    if not public.can_edit_lessons() then raise exception 'Teacher editor denied'; end if;
    update public.teacher_lessons set title='Editor change' where id=lesson;
    get diagnostics affected = row_count;
    if affected <> 1 then raise exception 'Editor cannot save lesson'; end if;
    perform set_config('request.jwt.claim.sub',administrator::text,true);
    if (select count(*) from public.teacher_classes where id in(class_a,class_b)) <> 2 then raise exception 'Admin access failed'; end if;
    reset role;
    if has_function_privilege('anon','public.create_student_profile()','EXECUTE')
        or has_function_privilege('authenticated','public.create_student_profile()','EXECUTE') then raise exception 'Trigger execute still public'; end if;
end $$;
rollback;
