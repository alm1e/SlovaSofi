begin;

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
create index if not exists teacher_materials_teacher_id_idx
    on public.teacher_materials (teacher_id);
create index if not exists student_lesson_progress_student_class_idx
    on public.student_lesson_progress (student_id, class_id);
create index if not exists teacher_student_directory_student_user_id_idx
    on public.teacher_student_directory (student_user_id);

commit;
