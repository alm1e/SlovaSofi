begin;
set local lock_timeout = '5s';

-- This installation has one school (SlovaSofi). Personal classes remain separate.
alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check
    check (role in ('student', 'teacher', 'director', 'admin'));

-- Do not silently disclose existing classes to a newly appointed director.
alter table public.teacher_classes add column class_scope text;
update public.teacher_classes set class_scope = 'private';
alter table public.teacher_classes alter column class_scope set default 'school';
alter table public.teacher_classes alter column class_scope set not null;
alter table public.teacher_classes add constraint teacher_classes_scope_check
    check (class_scope in ('school', 'private'));
create index teacher_classes_scope_idx on public.teacher_classes(class_scope);

create function public.director_can_read_class(target_class_id uuid)
returns boolean language sql stable security definer set search_path = ''
as $$
    select public.current_profile_role() = 'director' and exists (
        select 1 from public.teacher_classes c
        where c.id = target_class_id and c.class_scope = 'school'
    )
$$;
revoke all on function public.director_can_read_class(uuid) from public, anon;
grant execute on function public.director_can_read_class(uuid) to authenticated;

-- Ownership and scope cannot be changed by a teacher to hide a school class.
create function public.guard_class_scope()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
    if auth.uid() is not null and not public.is_platform_admin()
       and (new.class_scope is distinct from old.class_scope
            or new.teacher_id is distinct from old.teacher_id) then
        raise exception 'Only the administrator can change class ownership or scope.' using errcode = '42501';
    end if;
    return new;
end
$$;
revoke all on function public.guard_class_scope() from public, anon, authenticated;
create trigger guard_class_scope before update on public.teacher_classes
for each row execute function public.guard_class_scope();

create or replace function public.teacher_workspace_has_permission(permission_name text)
returns boolean language sql stable security definer set search_path = ''
as $$
    select case
        when public.current_profile_role() = 'director' then
            permission_name in ('view_classes_students', 'view_lessons')
        else case permission_name
            when 'view_classes_students' then public.current_profile_role() in ('teacher', 'admin')
            when 'view_lessons' then public.current_profile_role() in ('teacher', 'admin')
            when 'manage_classes_students' then public.current_profile_role() in ('teacher', 'admin')
            when 'view_assign_lessons' then public.current_profile_role() in ('teacher', 'admin')
            when 'edit_lessons' then public.can_edit_lessons()
            when 'manage_teachers' then public.is_platform_admin()
            else false
        end
    end
$$;
create or replace function public.teacher_workspace_context()
returns jsonb language sql stable security definer set search_path = ''
as $$
    select jsonb_build_object('owner_id', (select auth.uid()), 'role', public.current_profile_role(),
        'permissions', jsonb_build_object(
            'view_classes_students', public.teacher_workspace_has_permission('view_classes_students'),
            'view_lessons', public.teacher_workspace_has_permission('view_lessons'),
            'manage_classes_students', public.teacher_workspace_has_permission('manage_classes_students'),
            'view_assign_lessons', public.teacher_workspace_has_permission('view_assign_lessons'),
            'edit_lessons', public.teacher_workspace_has_permission('edit_lessons'),
            'manage_teachers', public.teacher_workspace_has_permission('manage_teachers')))
$$;

-- Restrictive policies also cover accounts demoted from admin/teacher or formerly
-- linked as students. A stale student membership must not leak a personal class.
create policy "Directors read school classes" on public.teacher_classes for select to authenticated
using (public.director_can_read_class(id));
create policy "Director class boundary" on public.teacher_classes as restrictive for select to authenticated
using (public.current_profile_role() <> 'director' or public.director_can_read_class(id));

do $$
declare table_name text;
begin
    foreach table_name in array array['class_students', 'class_lesson_assignments', 'calendar_events', 'student_lesson_progress'] loop
        execute format('create policy "Directors read school rows" on public.%I for select to authenticated using (public.director_can_read_class(class_id))', table_name);
        execute format('create policy "Director school boundary" on public.%I as restrictive for select to authenticated using (public.current_profile_role() <> ''director'' or public.director_can_read_class(class_id))', table_name);
    end loop;
    foreach table_name in array array['teacher_classes', 'class_students', 'class_lesson_assignments', 'calendar_events', 'student_lesson_progress', 'teacher_lessons', 'lesson_categories', 'teacher_lesson_editors', 'teacher_student_directory'] loop
        execute format('create policy "Directors cannot insert" on public.%I as restrictive for insert to authenticated with check (public.current_profile_role() <> ''director'')', table_name);
        execute format('create policy "Directors cannot update" on public.%I as restrictive for update to authenticated using (public.current_profile_role() <> ''director'') with check (public.current_profile_role() <> ''director'')', table_name);
        execute format('create policy "Directors cannot delete" on public.%I as restrictive for delete to authenticated using (public.current_profile_role() <> ''director'')', table_name);
    end loop;
end
$$;

-- The lesson library is already shared by teachers. Directors may preview it.
create policy "Directors view shared lesson library" on public.teacher_lessons for select to authenticated
using (public.current_profile_role() = 'director');
create policy "Directors view lesson categories" on public.lesson_categories for select to authenticated
using (public.current_profile_role() = 'director');
create policy "Directors view school teacher names" on public.profiles for select to authenticated
using (public.current_profile_role() = 'director' and exists (
    select 1 from public.teacher_classes c
    where c.teacher_id = profiles.id and c.class_scope = 'school'
));

-- Audio recordings are private Storage objects, not just progress rows.
create policy "Directors read school pronunciation recordings" on storage.objects for select to authenticated
using (bucket_id = 'student-recordings' and public.current_profile_role() = 'director'
    and exists (select 1 from public.teacher_classes c
        join public.class_lesson_assignments a on a.class_id = c.id
        where c.class_scope = 'school' and c.id::text = (storage.foldername(storage.objects.name))[2]
        and a.lesson_id::text = (storage.foldername(storage.objects.name))[3]));
create policy "Director recording boundary" on storage.objects as restrictive for select to authenticated
using (public.current_profile_role() <> 'director' or bucket_id <> 'student-recordings'
    or exists (select 1 from public.teacher_classes c where c.class_scope = 'school'
        and c.id::text = (storage.foldername(storage.objects.name))[2]));
create policy "Directors cannot upload objects" on storage.objects as restrictive for insert to authenticated
with check (public.current_profile_role() <> 'director');
create policy "Directors cannot edit objects" on storage.objects as restrictive for update to authenticated
using (public.current_profile_role() <> 'director') with check (public.current_profile_role() <> 'director');
create policy "Directors cannot delete objects" on storage.objects as restrictive for delete to authenticated
using (public.current_profile_role() <> 'director');
commit;
