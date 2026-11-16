begin;
set local lock_timeout = '5s';
create table public.homework_tasks (
    id uuid primary key default gen_random_uuid(),
    class_id uuid not null,
    lesson_id uuid not null,
    due_at timestamptz not null check(isfinite(due_at)),
    instructions text not null default '' check(char_length(instructions)<=5000),
    created_by uuid default auth.uid(),
    created_at timestamptz not null default clock_timestamp(),
    unique(class_id,lesson_id), unique(id,class_id),
    foreign key(class_id,lesson_id) references public.class_lesson_assignments(class_id,lesson_id) on delete cascade
);
create table public.homework_submissions (
    task_id uuid not null,
    class_id uuid not null,
    student_id uuid not null,
    state text not null check(state in ('in_progress','submitted','reviewed')),
    submitted_at timestamptz,
    response_fingerprint text,
    reviewed_at timestamptz,
    reviewed_by uuid,
    feedback text not null default '' check(char_length(feedback)<=5000),
    primary key(task_id,student_id),
    foreign key(task_id,class_id) references public.homework_tasks(id,class_id) on delete cascade,
    foreign key(student_id,class_id) references public.class_students(id,class_id) on delete cascade
);
create index homework_tasks_due_idx on public.homework_tasks(class_id,due_at);
create index homework_submissions_student_idx on public.homework_submissions(student_id,task_id);
alter table public.homework_tasks enable row level security;
alter table public.homework_submissions enable row level security;
revoke all on public.homework_tasks,public.homework_submissions from public,anon,authenticated;
grant select,insert on public.homework_tasks to authenticated;
grant update(due_at,instructions) on public.homework_tasks to authenticated;
grant select on public.homework_submissions to authenticated;

create function public.can_manage_homework(target_class uuid)
returns boolean language sql stable security definer set search_path=''
as $$ select exists(select 1 from public.teacher_classes c where c.id=target_class and
    (public.is_platform_admin() or (public.current_profile_role()='teacher' and c.teacher_id=auth.uid()))) $$;
create function public.can_read_homework(target_class uuid)
returns boolean language sql stable security definer set search_path=''
as $$ select public.can_manage_homework(target_class) or public.director_can_read_class(target_class)
    or (public.current_profile_role()='student' and exists(select 1 from public.class_students s where s.class_id=target_class and s.linked_user_id=auth.uid())) $$;
revoke all on function public.can_manage_homework(uuid), public.can_read_homework(uuid) from public,anon;
grant execute on function public.can_manage_homework(uuid), public.can_read_homework(uuid) to authenticated;
create policy "Users read assigned homework tasks" on public.homework_tasks for select to authenticated using(public.can_read_homework(class_id));
create policy "Teachers assign homework" on public.homework_tasks for insert to authenticated
with check(public.can_manage_homework(class_id) and created_by=auth.uid());
create policy "Teachers update homework deadlines" on public.homework_tasks for update to authenticated
using(public.can_manage_homework(class_id)) with check(public.can_manage_homework(class_id));
create policy "Users read authorized homework submissions" on public.homework_submissions for select to authenticated
using(public.can_manage_homework(class_id) or public.director_can_read_class(class_id)
    or (public.current_profile_role()='student' and exists(select 1 from public.class_students s where s.id=student_id and s.linked_user_id=auth.uid())));

create function public.validate_homework_task()
returns trigger language plpgsql security definer set search_path=''
as $$
begin
    if exists(select 1 from public.teacher_classes where id=new.class_id and archived_at is not null) then raise exception 'class_archived'; end if;
    if not exists(
        select 1 from public.teacher_lessons l,
        lateral jsonb_array_elements(case when jsonb_typeof(l.activities->'homeworkSections')='array' then l.activities->'homeworkSections' else '[]'::jsonb end) section
        where l.id=new.lesson_id and case when jsonb_typeof(section->'activities')='array' then jsonb_array_length(section->'activities') else 0 end>0
    ) then raise exception 'homework_sections_required'; end if;
    return new;
end
$$;
create trigger validate_homework_task before insert on public.homework_tasks for each row execute function public.validate_homework_task();

-- Only homework responses participate; lecture practice and teacher feedback do not
-- invalidate a reviewed homework submission. No answer content is returned to clients.
create function public.homework_response_fingerprint(target_lesson uuid, saved_answers jsonb)
returns text language sql stable security definer set search_path=''
as $$
with source as (select activities from public.teacher_lessons where id=target_lesson),
normal_sections as (
    select section from source, lateral jsonb_array_elements(case when jsonb_typeof(activities->'sections')='array' then activities->'sections' else '[]'::jsonb end) section
), offset_count as (
    select coalesce(sum(case when jsonb_typeof(section->'activities')='array' then jsonb_array_length(section->'activities') else 0 end),0)::bigint as n from normal_sections
), homework_sections as (
    select section,section_number from source,
    lateral jsonb_array_elements(case when jsonb_typeof(activities->'homeworkSections')='array' then activities->'homeworkSections' else '[]'::jsonb end) with ordinality h(section,section_number)
), homework_activities as (
    select activity, (row_number() over(order by section_number,activity_number)-1+(select n from offset_count))::text as legacy_index
    from homework_sections,
    lateral jsonb_array_elements(case when jsonb_typeof(section->'activities')='array' then section->'activities' else '[]'::jsonb end) with ordinality a(activity,activity_number)
), identities as (
    select case when activity->>'id' ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$' then 'b'||(activity->>'id') else 'a'||legacy_index end as key,
        'a'||case when activity->>'legacyProgressIndex' ~ '^[0-9]+$' then activity->>'legacyProgressIndex' else legacy_index end as legacy_key from homework_activities
), responses as (
    select e.key,e.value->'response' as response from jsonb_each(coalesce(saved_answers,'{}'::jsonb)) e
    where exists(select 1 from identities i where e.key=i.key or e.key=i.legacy_key
        or left(e.key,length(i.key)+2)=i.key||'.q' or left(e.key,length(i.legacy_key)+2)=i.legacy_key||'.q')
)
select encode(sha256(convert_to(coalesce(jsonb_object_agg(key,response)::text,'{}'),'UTF8')),'hex') from responses
$$;
create function public.homework_effective_state(saved_state text, submitted_fingerprint text, current_fingerprint text)
returns text language sql immutable set search_path=''
as $$ select case when saved_state in ('submitted','reviewed') and submitted_fingerprint is distinct from current_fingerprint then 'in_progress'
    when saved_state is null and current_fingerprint<>encode(sha256(convert_to('{}','UTF8')),'hex') then 'in_progress' else coalesce(saved_state,'not_started') end $$;

create function public.list_homework(target_class_id uuid default null)
returns jsonb language sql stable security definer set search_path=''
as $$
select coalesce(jsonb_agg(task order by due_at),'[]'::jsonb) from (
    select t.id,t.class_id,t.lesson_id,t.due_at,t.instructions,c.name as class_name,l.title as lesson_title,l.unit,
        coalesce((select jsonb_agg(jsonb_build_object(
            'student_id',s.id,'student_name',s.display_name,
            'state',public.homework_effective_state(h.state,h.response_fingerprint,public.homework_response_fingerprint(t.lesson_id,p.answers)),
            'submitted_at',h.submitted_at,'reviewed_at',h.reviewed_at,'feedback',h.feedback
        ) order by s.display_name)
        from public.class_students s
        left join public.homework_submissions h on h.student_id=s.id and h.task_id=t.id
        left join public.student_lesson_progress p on p.student_id=s.id and p.class_id=t.class_id and p.lesson_id=t.lesson_id
        where s.class_id=t.class_id and (public.current_profile_role()<>'student' or s.linked_user_id=auth.uid())),'[]'::jsonb) as submissions
    from public.homework_tasks t join public.teacher_classes c on c.id=t.class_id join public.teacher_lessons l on l.id=t.lesson_id
    where public.can_read_homework(t.class_id) and (target_class_id is null or t.class_id=target_class_id)
) task
$$;

create function public.start_homework(target_task_id uuid)
returns void language plpgsql security definer set search_path=''
as $$
declare target public.homework_tasks; member_id uuid;
begin
    if public.current_profile_role() is distinct from 'student' or auth.uid() is null then raise exception 'student_required' using errcode='42501'; end if;
    select * into target from public.homework_tasks where id=target_task_id;
    select id into member_id from public.class_students where class_id=target.class_id and linked_user_id=auth.uid();
    if member_id is null then raise exception 'homework_forbidden' using errcode='42501'; end if;
    insert into public.homework_submissions(task_id,class_id,student_id,state) values(target.id,target.class_id,member_id,'in_progress') on conflict do nothing;
end
$$;
create function public.submit_homework(target_task_id uuid)
returns void language plpgsql security definer set search_path=''
as $$
declare target public.homework_tasks; member_id uuid; saved_answers jsonb; fingerprint text;
begin
    if public.current_profile_role() is distinct from 'student' or auth.uid() is null then raise exception 'student_required' using errcode='42501'; end if;
    select * into target from public.homework_tasks where id=target_task_id;
    select id into member_id from public.class_students where class_id=target.class_id and linked_user_id=auth.uid();
    if member_id is null then raise exception 'homework_forbidden' using errcode='42501'; end if;
    select answers into saved_answers from public.student_lesson_progress where student_id=member_id and lesson_id=target.lesson_id and class_id=target.class_id for update;
    fingerprint := public.homework_response_fingerprint(target.lesson_id,saved_answers);
    perform 1 from public.homework_submissions where task_id=target_task_id and student_id=member_id
        and state in ('submitted','reviewed') and response_fingerprint is not distinct from fingerprint for update;
    if found then return; end if;
    insert into public.homework_submissions(task_id,class_id,student_id,state,submitted_at,response_fingerprint)
    values(target.id,target.class_id,member_id,'submitted',clock_timestamp(),fingerprint)
    on conflict(task_id,student_id) do update set state='submitted',submitted_at=excluded.submitted_at,response_fingerprint=excluded.response_fingerprint,reviewed_at=null,reviewed_by=null;
end
$$;
create function public.review_homework(target_task_id uuid,target_student_id uuid,expected_submitted_at timestamptz,review_feedback text)
returns void language plpgsql security definer set search_path=''
as $$
declare target public.homework_tasks; submission public.homework_submissions; fingerprint text;
begin
    select * into target from public.homework_tasks where id=target_task_id;
    if not public.can_manage_homework(target.class_id) then raise exception 'review_forbidden' using errcode='42501'; end if;
    if review_feedback is null or char_length(review_feedback)>5000 then raise exception 'invalid_feedback'; end if;
    select * into submission from public.homework_submissions where task_id=target_task_id and student_id=target_student_id for update;
    if not found then raise exception 'submission_not_found'; end if;
    select public.homework_response_fingerprint(target.lesson_id,answers) into fingerprint from public.student_lesson_progress where student_id=target_student_id and class_id=target.class_id and lesson_id=target.lesson_id;
    if not found then fingerprint := public.homework_response_fingerprint(target.lesson_id,null); end if;
    if submission.state<>'submitted' or submission.submitted_at is distinct from expected_submitted_at or submission.response_fingerprint is distinct from fingerprint then raise exception 'submission_changed'; end if;
    update public.homework_submissions set state='reviewed',feedback=btrim(review_feedback),reviewed_at=clock_timestamp(),reviewed_by=auth.uid()
    where task_id=target_task_id and student_id=target_student_id;
end
$$;
create function public.record_homework_action()
returns trigger language plpgsql security definer set search_path=''
as $$
declare row_data jsonb; target_class uuid; owner_id uuid; label text; event text;
begin
    if tg_op='UPDATE' and to_jsonb(new)=to_jsonb(old) then return new; end if;
    row_data := case when tg_op='DELETE' then to_jsonb(old) else to_jsonb(new) end;
    target_class := (row_data->>'class_id')::uuid;
    select c.teacher_id,c.name into owner_id,label from public.teacher_classes c where c.id=target_class;
    event := case when tg_table_name='homework_tasks' then case tg_op when 'INSERT' then 'homework.assigned' when 'UPDATE' then 'homework.updated' else 'homework.deleted' end
        else 'homework.' || coalesce(row_data->>'state','deleted') end;
    insert into public.school_audit_log(actor_id,actor_name,action,entity_id,entity_label,class_id,teacher_id)
    values(auth.uid(),public.audit_actor_name(),event,coalesce(row_data->>'id',row_data->>'task_id'),label,target_class,owner_id);
    if tg_op='DELETE' then return old; end if; return new;
end
$$;
create trigger record_homework_action after insert or update or delete on public.homework_tasks for each row execute function public.record_homework_action();
create trigger record_homework_submission_action after insert or update or delete on public.homework_submissions for each row execute function public.record_homework_action();
revoke all on function public.validate_homework_task(), public.homework_response_fingerprint(uuid,jsonb), public.homework_effective_state(text,text,text), public.record_homework_action() from public,anon,authenticated;
revoke all on function public.list_homework(uuid), public.start_homework(uuid), public.submit_homework(uuid), public.review_homework(uuid,uuid,timestamptz,text) from public,anon;
grant execute on function public.list_homework(uuid), public.start_homework(uuid), public.submit_homework(uuid), public.review_homework(uuid,uuid,timestamptz,text) to authenticated;
commit;
