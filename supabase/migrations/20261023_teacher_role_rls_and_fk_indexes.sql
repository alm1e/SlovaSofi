begin;

set local lock_timeout = '5s';
set local statement_timeout = '60s';

-- A retained editor grant must not authorize a demoted student.
create or replace function public.can_edit_lessons()
returns boolean language sql stable security definer set search_path = ''
as $$
    select public.is_platform_admin() or (
        public.current_profile_role() = 'teacher'
        and exists (select 1 from public.teacher_lesson_editors
                    where user_id = (select auth.uid()))
    )
$$;

drop policy if exists "Teachers and admins view classes" on public.teacher_classes;
create policy "Teachers and admins view classes"
    on public.teacher_classes for select to authenticated
    using ((public.current_profile_role() = 'teacher' and teacher_id = (select auth.uid()))
        or public.is_platform_admin());

drop policy if exists "Teachers and admins view class rosters" on public.class_students;
create policy "Teachers and admins view class rosters"
    on public.class_students for select to authenticated
    using ((public.current_profile_role() = 'teacher' and teacher_id = (select auth.uid()))
        or linked_user_id = (select auth.uid()) or public.is_platform_admin());

drop policy if exists "Teachers and admins view lesson assignments" on public.class_lesson_assignments;
create policy "Teachers and admins view lesson assignments"
    on public.class_lesson_assignments for select to authenticated
    using ((public.current_profile_role() = 'teacher' and teacher_id = (select auth.uid()))
        or public.is_platform_admin()
        or exists (select 1 from public.class_students student
            where student.class_id = class_lesson_assignments.class_id
            and student.linked_user_id = (select auth.uid())));

drop policy if exists "Users view own lesson progress" on public.student_lesson_progress;
create policy "Users view own lesson progress"
    on public.student_lesson_progress for select to authenticated
    using (public.is_platform_admin() or exists (
        select 1 from public.class_students student
        where student.id = student_lesson_progress.student_id
        and (student.linked_user_id = (select auth.uid())
            or (public.current_profile_role() = 'teacher' and student.teacher_id = (select auth.uid())))
    ));

drop policy if exists "Teachers and admins manage classes" on public.teacher_classes;
create policy "Teachers and admins manage classes"
    on public.teacher_classes for all to authenticated
    using (
        (
            public.current_profile_role() = 'teacher'
            and teacher_id = (select auth.uid())
        )
        or public.is_platform_admin()
    )
    with check (
        (
            public.current_profile_role() = 'teacher'
            and teacher_id = (select auth.uid())
        )
        or public.is_platform_admin()
    );

drop policy if exists "Teachers and admins manage class rosters" on public.class_students;
create policy "Teachers and admins manage class rosters"
    on public.class_students for all to authenticated
    using (
        (
            public.current_profile_role() = 'teacher'
            and teacher_id = (select auth.uid())
        )
        or public.is_platform_admin()
    )
    with check (
        (
            public.current_profile_role() = 'teacher'
            and teacher_id = (select auth.uid())
        )
        or public.is_platform_admin()
    );

drop policy if exists "Teachers and admins manage lesson assignments" on public.class_lesson_assignments;
create policy "Teachers and admins manage lesson assignments"
    on public.class_lesson_assignments for all to authenticated
    using (
        (
            public.current_profile_role() = 'teacher'
            and teacher_id = (select auth.uid())
        )
        or public.is_platform_admin()
    )
    with check (
        (
            public.current_profile_role() = 'teacher'
            and teacher_id = (select auth.uid())
        )
        or public.is_platform_admin()
    );

revoke all on function public.create_student_profile() from public, anon, authenticated;

create index if not exists teacher_classes_teacher_id_idx
    on public.teacher_classes (teacher_id);
create index if not exists class_students_teacher_id_idx
    on public.class_students (teacher_id);
create index if not exists class_students_class_teacher_idx
    on public.class_students (class_id, teacher_id);
create index if not exists teacher_lessons_teacher_id_idx
    on public.teacher_lessons (teacher_id);
create index if not exists class_lesson_assignments_teacher_id_idx
    on public.class_lesson_assignments (teacher_id);
create index if not exists class_lesson_assignments_class_teacher_idx
    on public.class_lesson_assignments (class_id, teacher_id);
-- teacher_materials was removed by 20261017; do not recreate it or index it.
create index if not exists student_lesson_progress_student_class_idx
    on public.student_lesson_progress (student_id, class_id);
create index if not exists teacher_student_directory_student_user_id_idx
    on public.teacher_student_directory (student_user_id);

commit;
