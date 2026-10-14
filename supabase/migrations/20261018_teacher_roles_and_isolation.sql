begin;

create table if not exists public.teacher_lesson_editors (
    user_id uuid primary key references auth.users(id) on delete cascade,
    created_at timestamptz not null default now()
);

alter table public.teacher_lesson_editors enable row level security;
revoke all on public.teacher_lesson_editors from anon, authenticated;

create or replace function public.current_profile_role()
returns text
language sql
stable
security definer
set search_path = ''
as $$
    select profile.role
    from public.profiles as profile
    where profile.id = (select auth.uid())
$$;

create or replace function public.is_platform_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
    select coalesce(public.current_profile_role() = 'admin', false)
$$;

create or replace function public.can_edit_lessons()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
    select public.is_platform_admin()
        or exists (
            select 1
            from public.teacher_lesson_editors as editor
            where editor.user_id = (select auth.uid())
        )
$$;

create or replace function public.teacher_workspace_owner_id()
returns uuid
language sql
stable
security definer
set search_path = ''
as $$
    select (select auth.uid())
$$;

create or replace function public.teacher_workspace_has_permission(permission_name text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
    select case permission_name
        when 'view_classes_students' then public.current_profile_role() in ('teacher', 'admin')
        when 'manage_classes_students' then public.current_profile_role() in ('teacher', 'admin')
        when 'view_assign_lessons' then public.current_profile_role() in ('teacher', 'admin')
        when 'edit_lessons' then public.can_edit_lessons()
        when 'manage_teachers' then public.is_platform_admin()
        else false
    end
$$;

create or replace function public.teacher_workspace_context()
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
    select jsonb_build_object(
        'owner_id', (select auth.uid()),
        'role', public.current_profile_role(),
        'permissions', jsonb_build_object(
            'view_classes_students', public.teacher_workspace_has_permission('view_classes_students'),
            'manage_classes_students', public.teacher_workspace_has_permission('manage_classes_students'),
            'view_assign_lessons', public.teacher_workspace_has_permission('view_assign_lessons'),
            'edit_lessons', public.teacher_workspace_has_permission('edit_lessons'),
            'manage_teachers', public.teacher_workspace_has_permission('manage_teachers')
        )
    )
$$;

revoke all on function public.current_profile_role() from public;
revoke all on function public.is_platform_admin() from public;
revoke all on function public.can_edit_lessons() from public;
revoke all on function public.teacher_workspace_owner_id() from public;
revoke all on function public.teacher_workspace_has_permission(text) from public;
revoke all on function public.teacher_workspace_context() from public;
grant execute on function public.current_profile_role() to authenticated;
grant execute on function public.is_platform_admin() to authenticated;
grant execute on function public.can_edit_lessons() to authenticated;
grant execute on function public.teacher_workspace_owner_id() to authenticated;
grant execute on function public.teacher_workspace_has_permission(text) to authenticated;
grant execute on function public.teacher_workspace_context() to authenticated;

do $$
declare
    target_table text;
    policy_row record;
begin
    foreach target_table in array array[
        'profiles',
        'teacher_workspace_members',
        'teacher_workspace_settings',
        'teacher_classes',
        'class_students',
        'teacher_lessons',
        'class_lesson_assignments',
        'student_lesson_progress'
    ]
    loop
        for policy_row in
            select policyname
            from pg_policies
            where schemaname = 'public' and tablename = target_table
        loop
            execute format('drop policy %I on public.%I', policy_row.policyname, target_table);
        end loop;
    end loop;
end
$$;

drop table if exists public.teacher_workspace_members;

drop policy if exists "Editors view own editor grant" on public.teacher_lesson_editors;
create policy "Editors view own editor grant"
    on public.teacher_lesson_editors for select to authenticated
    using (user_id = (select auth.uid()) or public.is_platform_admin());
grant select on public.teacher_lesson_editors to authenticated;

drop policy if exists "Users view their own profile" on public.profiles;
create policy "Users view their own profile"
    on public.profiles for select to authenticated
    using (id = (select auth.uid()));
create policy "Admins view all profiles"
    on public.profiles for select to authenticated
    using (public.is_platform_admin());
create policy "Users update non-role profile fields"
    on public.profiles for update to authenticated
    using (id = (select auth.uid()))
    with check (
        id = (select auth.uid())
        and role = public.current_profile_role()
    );
create policy "Admins update profiles"
    on public.profiles for update to authenticated
    using (public.is_platform_admin())
    with check (public.is_platform_admin());

drop policy if exists "Users manage their own workspace settings" on public.teacher_workspace_settings;
create policy "Users manage their own workspace settings"
    on public.teacher_workspace_settings for all to authenticated
    using (user_id = (select auth.uid()) or public.is_platform_admin())
    with check (user_id = (select auth.uid()) or public.is_platform_admin());

create policy "Teachers and admins view classes"
    on public.teacher_classes for select to authenticated
    using (teacher_id = (select auth.uid()) or public.is_platform_admin());
create policy "Students view their assigned classes"
    on public.teacher_classes for select to authenticated
    using (
        exists (
            select 1
            from public.class_students as student
            where student.class_id = teacher_classes.id
              and student.linked_user_id = (select auth.uid())
        )
    );
create policy "Teachers and admins manage classes"
    on public.teacher_classes for all to authenticated
    using (teacher_id = (select auth.uid()) or public.is_platform_admin())
    with check (teacher_id = (select auth.uid()) or public.is_platform_admin());

create policy "Teachers and admins view class rosters"
    on public.class_students for select to authenticated
    using (
        teacher_id = (select auth.uid())
        or linked_user_id = (select auth.uid())
        or public.is_platform_admin()
    );
create policy "Teachers and admins manage class rosters"
    on public.class_students for all to authenticated
    using (teacher_id = (select auth.uid()) or public.is_platform_admin())
    with check (teacher_id = (select auth.uid()) or public.is_platform_admin());

create policy "Teachers and admins view shared lessons"
    on public.teacher_lessons for select to authenticated
    using (
        public.current_profile_role() in ('teacher', 'admin')
        or exists (
            select 1
            from public.class_lesson_assignments as assignment
            join public.class_students as student on student.class_id = assignment.class_id
            where assignment.lesson_id = teacher_lessons.id
              and student.linked_user_id = (select auth.uid())
        )
    );
create policy "Lesson editors manage shared lessons"
    on public.teacher_lessons for all to authenticated
    using (public.can_edit_lessons())
    with check (public.can_edit_lessons());

alter table public.class_lesson_assignments
    drop constraint if exists class_lesson_assignments_lesson_id_teacher_id_fkey;
alter table public.class_lesson_assignments
    add constraint class_lesson_assignments_lesson_id_fkey
    foreign key (lesson_id) references public.teacher_lessons(id) on delete cascade;

create policy "Teachers and admins view lesson assignments"
    on public.class_lesson_assignments for select to authenticated
    using (
        teacher_id = (select auth.uid())
        or public.is_platform_admin()
        or exists (
            select 1
            from public.class_students as student
            where student.class_id = class_lesson_assignments.class_id
              and student.linked_user_id = (select auth.uid())
        )
    );
create policy "Teachers and admins manage lesson assignments"
    on public.class_lesson_assignments for all to authenticated
    using (teacher_id = (select auth.uid()) or public.is_platform_admin())
    with check (teacher_id = (select auth.uid()) or public.is_platform_admin());

create policy "Users view own lesson progress"
    on public.student_lesson_progress for select to authenticated
    using (
        public.is_platform_admin()
        or exists (
            select 1
            from public.class_students as student
            where student.id = student_lesson_progress.student_id
              and (
                  student.linked_user_id = (select auth.uid())
                  or student.teacher_id = (select auth.uid())
              )
        )
    );
create policy "Students save own lesson progress"
    on public.student_lesson_progress for insert to authenticated
    with check (
        exists (
            select 1
            from public.class_students as student
            where student.id = student_lesson_progress.student_id
              and student.class_id = student_lesson_progress.class_id
              and student.linked_user_id = (select auth.uid())
        )
        and exists (
            select 1
            from public.class_lesson_assignments as assignment
            where assignment.class_id = student_lesson_progress.class_id
              and assignment.lesson_id = student_lesson_progress.lesson_id
        )
    );
create policy "Students update own lesson progress"
    on public.student_lesson_progress for update to authenticated
    using (
        exists (
            select 1
            from public.class_students as student
            where student.id = student_lesson_progress.student_id
              and student.linked_user_id = (select auth.uid())
        )
    )
    with check (
        exists (
            select 1
            from public.class_students as student
            where student.id = student_lesson_progress.student_id
              and student.class_id = student_lesson_progress.class_id
              and student.linked_user_id = (select auth.uid())
        )
        and exists (
            select 1
            from public.class_lesson_assignments as assignment
            where assignment.class_id = student_lesson_progress.class_id
              and assignment.lesson_id = student_lesson_progress.lesson_id
        )
    );
create policy "Admins manage all lesson progress"
    on public.student_lesson_progress for all to authenticated
    using (public.is_platform_admin())
    with check (public.is_platform_admin());

update public.profiles as profile
set role = 'admin'
from auth.users as account
where account.id = profile.id
  and lower(account.email) = 'akhumanoid@gmail.com';

do $$
begin
    if not exists (
        select 1
        from auth.users as account
        join public.profiles as profile on profile.id = account.id
        where lower(account.email) = 'akhumanoid@gmail.com'
          and profile.role = 'admin'
    ) then
        raise exception 'Expected administrator profile for akhumanoid@gmail.com was not found.';
    end if;
    if not exists (
        select 1
        from auth.users as account
        join public.profiles as profile on profile.id = account.id
        where lower(account.email) = 'vikishim11@gmail.com'
          and profile.role = 'teacher'
    ) then
        raise exception 'Expected teacher profile for vikishim11@gmail.com was not found.';
    end if;
end
$$;

insert into public.teacher_lesson_editors (user_id)
select account.id
from auth.users as account
join public.profiles as profile on profile.id = account.id
where lower(account.email) = 'vikishim11@gmail.com'
  and profile.role = 'teacher'
on conflict (user_id) do nothing;

commit;
