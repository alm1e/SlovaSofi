begin;

alter table public.teacher_lessons
    drop constraint if exists teacher_lessons_activities_check;

alter table public.teacher_lessons
    add constraint teacher_lessons_activities_check
    check (jsonb_typeof(activities) in ('array', 'object'));

create table if not exists public.teacher_workspace_members (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    member_id uuid not null references auth.users(id) on delete cascade,
    email text not null,
    permissions jsonb not null default '{}'::jsonb
        check (jsonb_typeof(permissions) = 'object'),
    created_at timestamptz not null default now(),
    unique (owner_id, member_id)
);

create unique index if not exists teacher_workspace_members_owner_email_unique
    on public.teacher_workspace_members (owner_id, lower(email));

create index if not exists teacher_workspace_members_member_idx
    on public.teacher_workspace_members (member_id);
create unique index if not exists teacher_workspace_members_one_school_per_user
    on public.teacher_workspace_members (member_id);

alter table public.teacher_workspace_members enable row level security;
grant select on public.teacher_workspace_members to authenticated;

create or replace function public.teacher_workspace_owner_id()
returns uuid
language sql
stable
security definer
set search_path = ''
as $$
    select coalesce(
        (
            select member.owner_id
            from public.teacher_workspace_members as member
            where member.member_id = (select auth.uid())
            limit 1
        ),
        (select auth.uid())
    );
$$;

create or replace function public.teacher_workspace_has_permission(permission_name text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
    select case
        when (select auth.uid()) is null then false
        when (select auth.uid()) = public.teacher_workspace_owner_id() then true
        else exists (
            select 1
            from public.teacher_workspace_members as member
            where member.owner_id = public.teacher_workspace_owner_id()
              and member.member_id = (select auth.uid())
              and member.permissions ->> permission_name = 'true'
        )
    end;
$$;

create or replace function public.teacher_workspace_context()
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
    select jsonb_build_object(
        'owner_id', public.teacher_workspace_owner_id(),
        'permissions',
        case
            when (select auth.uid()) = public.teacher_workspace_owner_id()
                then jsonb_build_object(
                    'view_classes_students', true,
                    'manage_classes_students', true,
                    'view_assign_lessons', true,
                    'edit_lessons', true,
                    'manage_teachers', true
                )
            else coalesce(
                (
                    select member.permissions
                    from public.teacher_workspace_members as member
                    where member.owner_id = public.teacher_workspace_owner_id()
                      and member.member_id = (select auth.uid())
                    limit 1
                ),
                '{}'::jsonb
            )
        end
    );
$$;

revoke all on function public.teacher_workspace_owner_id() from public;
revoke all on function public.teacher_workspace_has_permission(text) from public;
revoke all on function public.teacher_workspace_context() from public;
grant execute on function public.teacher_workspace_owner_id() to authenticated;
grant execute on function public.teacher_workspace_has_permission(text) to authenticated;
grant execute on function public.teacher_workspace_context() to authenticated;

drop policy if exists "Workspace members view their school staff" on public.teacher_workspace_members;
create policy "Workspace members view their school staff"
    on public.teacher_workspace_members for select to authenticated
    using (
        member_id = (select auth.uid())
        or (
            owner_id = public.teacher_workspace_owner_id()
            and public.teacher_workspace_has_permission('manage_teachers')
        )
    );

drop policy if exists "Teachers manage their own classes" on public.teacher_classes;
drop policy if exists "Workspace members view classes" on public.teacher_classes;
create policy "Workspace members view classes"
    on public.teacher_classes for select to authenticated
    using (
        teacher_id = public.teacher_workspace_owner_id()
        and (
            public.teacher_workspace_has_permission('view_classes_students')
            or public.teacher_workspace_has_permission('manage_classes_students')
            or public.teacher_workspace_has_permission('view_assign_lessons')
        )
    );
drop policy if exists "Workspace managers manage classes" on public.teacher_classes;
create policy "Workspace managers manage classes"
    on public.teacher_classes for all to authenticated
    using (
        teacher_id = public.teacher_workspace_owner_id()
        and public.teacher_workspace_has_permission('manage_classes_students')
    )
    with check (
        teacher_id = public.teacher_workspace_owner_id()
        and public.teacher_workspace_has_permission('manage_classes_students')
    );

drop policy if exists "Teachers manage their class rosters" on public.class_students;
drop policy if exists "Workspace members view class rosters" on public.class_students;
create policy "Workspace members view class rosters"
    on public.class_students for select to authenticated
    using (
        (
            teacher_id = public.teacher_workspace_owner_id()
            and (
                public.teacher_workspace_has_permission('view_classes_students')
                or public.teacher_workspace_has_permission('manage_classes_students')
            )
        )
        or linked_user_id = (select auth.uid())
    );
drop policy if exists "Workspace managers manage class rosters" on public.class_students;
create policy "Workspace managers manage class rosters"
    on public.class_students for all to authenticated
    using (
        teacher_id = public.teacher_workspace_owner_id()
        and public.teacher_workspace_has_permission('manage_classes_students')
    )
    with check (
        teacher_id = public.teacher_workspace_owner_id()
        and public.teacher_workspace_has_permission('manage_classes_students')
    );

drop policy if exists "Teachers manage their own lessons" on public.teacher_lessons;
drop policy if exists "Workspace members view lessons" on public.teacher_lessons;
create policy "Workspace members view lessons"
    on public.teacher_lessons for select to authenticated
    using (
        teacher_id = public.teacher_workspace_owner_id()
        and (
            public.teacher_workspace_has_permission('view_assign_lessons')
            or public.teacher_workspace_has_permission('edit_lessons')
        )
    );
drop policy if exists "Workspace editors manage lessons" on public.teacher_lessons;
create policy "Workspace editors manage lessons"
    on public.teacher_lessons for all to authenticated
    using (
        teacher_id = public.teacher_workspace_owner_id()
        and public.teacher_workspace_has_permission('edit_lessons')
    )
    with check (
        teacher_id = public.teacher_workspace_owner_id()
        and public.teacher_workspace_has_permission('edit_lessons')
    );

drop policy if exists "Teachers manage their lesson assignments" on public.class_lesson_assignments;
drop policy if exists "Workspace members view lesson assignments" on public.class_lesson_assignments;
create policy "Workspace members view lesson assignments"
    on public.class_lesson_assignments for select to authenticated
    using (
        teacher_id = public.teacher_workspace_owner_id()
        and (
            public.teacher_workspace_has_permission('view_assign_lessons')
            or public.teacher_workspace_has_permission('edit_lessons')
        )
    );
drop policy if exists "Workspace members assign lessons" on public.class_lesson_assignments;
create policy "Workspace members assign lessons"
    on public.class_lesson_assignments for all to authenticated
    using (
        teacher_id = public.teacher_workspace_owner_id()
        and public.teacher_workspace_has_permission('view_assign_lessons')
    )
    with check (
        teacher_id = public.teacher_workspace_owner_id()
        and public.teacher_workspace_has_permission('view_assign_lessons')
    );

commit;
