begin;

drop policy if exists "Workspace editors reset student lesson progress"
    on public.student_lesson_progress;

create policy "Workspace editors reset student lesson progress"
    on public.student_lesson_progress for delete to authenticated
    using (
        public.teacher_workspace_has_permission('edit_lessons')
        and exists (
            select 1
            from public.class_students as student
            join public.class_lesson_assignments as assignment
                on assignment.class_id = student.class_id
            where student.id = student_lesson_progress.student_id
              and student.class_id = student_lesson_progress.class_id
              and student.teacher_id = public.teacher_workspace_owner_id()
              and assignment.lesson_id = student_lesson_progress.lesson_id
              and assignment.teacher_id = public.teacher_workspace_owner_id()
        )
    );

commit;
