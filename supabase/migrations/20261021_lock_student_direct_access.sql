-- Restored from the migration actually applied to production.
-- Students use student-lessons to avoid exposing answer keys or forging progress.
drop policy if exists "Teachers and admins view shared lessons" on public.teacher_lessons;
create policy "Teachers and admins view shared lessons"
    on public.teacher_lessons for select to authenticated
    using (public.current_profile_role() in ('teacher', 'admin'));
drop policy if exists "Students save own lesson progress" on public.student_lesson_progress;
drop policy if exists "Students update own lesson progress" on public.student_lesson_progress;
revoke all on public.teacher_lessons from anon;
revoke all on public.student_lesson_progress from anon;
revoke all on public.class_students from anon;
revoke all on public.class_lesson_assignments from anon;
