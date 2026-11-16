begin;
set local lock_timeout = '5s';

create table public.lesson_versions (
    id uuid primary key default gen_random_uuid(),
    lesson_id uuid not null,
    version_no integer not null,
    snapshot jsonb not null,
    created_at timestamptz not null default clock_timestamp(),
    actor_id uuid,
    actor_name text,
    restored_from uuid,
    unique(lesson_id, version_no)
);
create table public.school_audit_log (
    id bigint generated always as identity primary key,
    created_at timestamptz not null default clock_timestamp(),
    actor_id uuid,
    actor_name text,
    action text not null,
    entity_id text,
    entity_label text,
    class_id uuid,
    teacher_id uuid,
    details jsonb not null default '{}'::jsonb
);
alter table public.lesson_versions enable row level security;
alter table public.school_audit_log enable row level security;
revoke all on public.lesson_versions, public.school_audit_log from public, anon, authenticated;
grant select on public.lesson_versions, public.school_audit_log to authenticated;
create policy "Staff read shared lesson versions" on public.lesson_versions for select to authenticated
using (public.current_profile_role() in ('teacher','director','admin'));
create policy "Staff read authorized audit events" on public.school_audit_log for select to authenticated
using (
    public.is_platform_admin()
    or (action like 'lesson.%' and public.current_profile_role() in ('teacher','director'))
    or (class_id is not null and (
        (public.current_profile_role() = 'teacher' and teacher_id = (select auth.uid()))
        or public.director_can_read_class(class_id)
    ))
);
create index school_audit_class_id_idx on public.school_audit_log(class_id, id desc);
create index school_audit_teacher_id_idx on public.school_audit_log(teacher_id, id desc);

-- Names are for display only; actor_id always comes from the verified JWT.
create function public.audit_actor_name()
returns text language sql stable security definer set search_path = ''
as $$
    select coalesce(nullif(btrim(concat_ws(' ',p.first_name,p.last_name)),''),
        nullif(a.raw_user_meta_data->>'display_name',''),
        nullif(btrim(concat_ws(' ',a.raw_user_meta_data->>'first_name',a.raw_user_meta_data->>'last_name')),''))
    from public.profiles p left join auth.users a on a.id=p.id where p.id=auth.uid()
$$;
revoke all on function public.audit_actor_name() from public, anon, authenticated;

-- Autocomplete saves must not manufacture content versions or invalidate students' revisions.
create function public.set_lesson_revision()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
    if new.title is not distinct from old.title and new.unit is not distinct from old.unit
       and new.activities is not distinct from old.activities and new.teacher_id is not distinct from old.teacher_id then
        new.updated_at := old.updated_at;
    else
        new.updated_at := clock_timestamp();
    end if;
    return new;
end
$$;
create trigger set_lesson_revision before update on public.teacher_lessons
for each row execute function public.set_lesson_revision();

create function public.record_lesson_version()
returns trigger language plpgsql security definer set search_path = ''
as $$
declare
    actor uuid := auth.uid();
    actor_label text;
    next_version integer;
    operation text;
begin
    if tg_op = 'UPDATE' and new.title is not distinct from old.title and new.unit is not distinct from old.unit
       and new.activities is not distinct from old.activities and new.teacher_id is not distinct from old.teacher_id then
        return new;
    end if;
    actor_label := public.audit_actor_name();
    if tg_op <> 'DELETE' then
        -- INSERT/UPDATE holds the parent lesson row lock, serializing version numbers.
        select coalesce(max(version_no), 0)+1 into next_version from public.lesson_versions where lesson_id=new.id;
        insert into public.lesson_versions(lesson_id,version_no,snapshot,actor_id,actor_name)
        values(new.id,next_version,jsonb_build_object('title',new.title,'unit',new.unit,'activities',new.activities,'teacher_id',new.teacher_id),actor,actor_label);
    end if;
    operation := case tg_op when 'INSERT' then 'lesson.created' when 'UPDATE' then 'lesson.updated' else 'lesson.deleted' end;
    insert into public.school_audit_log(actor_id,actor_name,action,entity_id,entity_label)
    values(actor,actor_label,operation,case when tg_op='DELETE' then old.id else new.id end,
        case when tg_op='DELETE' then old.title else new.title end);
    if tg_op='DELETE' then return old; end if;
    return new;
end
$$;
create trigger record_lesson_version after insert or update or delete on public.teacher_lessons
for each row execute function public.record_lesson_version();
-- One baseline per existing lesson; no fabricated historical authors or changes.
insert into public.lesson_versions(lesson_id,version_no,snapshot)
select id,1,jsonb_build_object('title',title,'unit',unit,'activities',activities,'teacher_id',teacher_id) from public.teacher_lessons;

create function public.record_school_action()
returns trigger language plpgsql security definer set search_path = ''
as $$
declare
    row_data jsonb;
    actor uuid := auth.uid();
    actor_label text;
    target_class uuid;
    owner_id uuid;
    label text;
    operation text;
    extra jsonb := '{}'::jsonb;
begin
    if tg_op='UPDATE' and (to_jsonb(new)-'updated_at') = (to_jsonb(old)-'updated_at') then return new; end if;
    row_data := case when tg_op='DELETE' then to_jsonb(old) else to_jsonb(new) end;
    actor_label := public.audit_actor_name();
    if tg_table_name='profiles' then
        if new.role is not distinct from old.role then return new; end if;
        label := nullif(btrim(concat_ws(' ',new.first_name,new.last_name)), '');
        operation := 'staff.role_changed';
        extra := jsonb_build_object('from',old.role,'to',new.role);
    elsif tg_table_name='teacher_lesson_editors' then
        operation := case when tg_op='DELETE' then 'staff.editor_revoked' else 'staff.editor_granted' end;
    elsif tg_table_name='teacher_classes' then
        target_class := (row_data->>'id')::uuid;
        owner_id := (row_data->>'teacher_id')::uuid;
        label := row_data->>'name';
        operation := case when tg_op='INSERT' then 'class.created' when tg_op='DELETE' then 'class.deleted'
            when old.archived_at is null and new.archived_at is not null then 'class.archived'
            when old.archived_at is not null and new.archived_at is null then 'class.restored' else 'class.updated' end;
    else
        target_class := (row_data->>'class_id')::uuid;
        owner_id := (row_data->>'teacher_id')::uuid;
        select c.name into label from public.teacher_classes c where c.id=target_class;
        operation := case tg_table_name when 'class_students' then 'student.' when 'class_lesson_assignments' then 'assignment.' else 'calendar.' end
            || case tg_op when 'INSERT' then 'created' when 'UPDATE' then 'updated' else 'deleted' end;
        if tg_table_name='class_students' then label := concat_ws(' · ',label,row_data->>'display_name'); end if;
        if tg_table_name='class_lesson_assignments' then
            label := concat_ws(' · ',label,(select title from public.teacher_lessons where id=(row_data->>'lesson_id')::uuid));
            extra := jsonb_build_object('lesson_id',row_data->>'lesson_id');
        end if;
    end if;
    insert into public.school_audit_log(actor_id,actor_name,action,entity_id,entity_label,class_id,teacher_id,details)
    values(actor,actor_label,operation,coalesce(row_data->>'id',row_data->>'user_id',row_data->>'lesson_id'),label,target_class,owner_id,extra);
    if tg_op='DELETE' then return old; end if;
    return new;
end
$$;
do $$
declare target_table text;
begin
    foreach target_table in array array['teacher_classes','class_students','class_lesson_assignments','calendar_events','teacher_lesson_editors'] loop
        execute format('create trigger record_school_action after insert or update or delete on public.%I for each row execute function public.record_school_action()',target_table);
    end loop;
end
$$;
create trigger record_staff_role after update of role on public.profiles
for each row execute function public.record_school_action();

create function public.restore_lesson_version(target_version_id uuid, expected_updated_at timestamptz)
returns timestamptz language plpgsql security definer set search_path = ''
as $$
declare
    source public.lesson_versions;
    lesson public.teacher_lessons;
    result_revision timestamptz;
begin
    if auth.uid() is null or not public.can_edit_lessons() then raise exception 'restore_forbidden' using errcode='42501'; end if;
    select * into source from public.lesson_versions where id=target_version_id;
    if not found then raise exception 'version_not_found'; end if;
    select * into lesson from public.teacher_lessons where id=source.lesson_id for update;
    if not found then raise exception 'lesson_not_found'; end if;
    if expected_updated_at is null or lesson.updated_at is distinct from expected_updated_at then raise exception 'lesson_changed'; end if;
    if lesson.title=source.snapshot->>'title' and lesson.unit=source.snapshot->>'unit' and lesson.activities=source.snapshot->'activities' then raise exception 'version_already_current'; end if;
    update public.teacher_lessons set title=source.snapshot->>'title',unit=source.snapshot->>'unit',activities=source.snapshot->'activities'
    where id=lesson.id returning updated_at into result_revision;
    update public.lesson_versions set restored_from=source.id
    where lesson_id=lesson.id and version_no=(select max(version_no) from public.lesson_versions where lesson_id=lesson.id);
    insert into public.school_audit_log(actor_id,actor_name,action,entity_id,entity_label,details)
    select auth.uid(),public.audit_actor_name(),'lesson.restored',lesson.id::text,source.snapshot->>'title',jsonb_build_object('version_no',source.version_no)
    from public.profiles p where p.id=auth.uid();
    return result_revision;
end
$$;
-- Run staff role changes with the administrator's user JWT, not the service JWT.
create function public.set_staff_access(target_user_id uuid, target_role text, can_edit boolean)
returns void language plpgsql security definer set search_path = ''
as $$
begin
    if not public.is_platform_admin() then raise exception 'staff_access_forbidden' using errcode='42501'; end if;
    if target_role not in ('teacher','director') or target_role is null then raise exception 'invalid_staff_role'; end if;
    perform 1 from public.profiles where id=target_user_id and role in ('teacher','director') for update;
    if not found then raise exception 'staff_not_found'; end if;
    update public.profiles set role=target_role where id=target_user_id;
    if target_role='teacher' and can_edit is true then
        insert into public.teacher_lesson_editors(user_id) values(target_user_id) on conflict do nothing;
    else delete from public.teacher_lesson_editors where user_id=target_user_id;
    end if;
end
$$;
revoke all on function public.set_lesson_revision(), public.record_lesson_version(), public.record_school_action() from public, anon, authenticated;
revoke all on function public.restore_lesson_version(uuid,timestamptz), public.set_staff_access(uuid,text,boolean) from public, anon;
grant execute on function public.restore_lesson_version(uuid,timestamptz), public.set_staff_access(uuid,text,boolean) to authenticated;
commit;
