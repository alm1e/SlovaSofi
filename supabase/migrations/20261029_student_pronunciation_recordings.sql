begin;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
    'student-recordings',
    'student-recordings',
    false,
    10485760,
    array['audio/webm', 'audio/ogg', 'audio/mp4', 'audio/wav', 'audio/x-wav']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Assigned students upload own pronunciation recordings" on storage.objects;
create policy "Assigned students upload own pronunciation recordings"
    on storage.objects for insert to authenticated
    with check (
        bucket_id = 'student-recordings'
        and (storage.foldername(name))[1] = (select auth.uid())::text
        and exists (
            select 1
            from public.class_students student
            join public.class_lesson_assignments assignment on assignment.class_id = student.class_id
            where student.linked_user_id = (select auth.uid())
                and assignment.class_id::text = (storage.foldername(name))[2]
                and assignment.lesson_id::text = (storage.foldername(name))[3]
        )
    );

drop policy if exists "Students and assigned teachers read pronunciation recordings" on storage.objects;
create policy "Students and assigned teachers read pronunciation recordings"
    on storage.objects for select to authenticated
    using (
        bucket_id = 'student-recordings'
        and (
            (storage.foldername(name))[1] = (select auth.uid())::text
            or public.is_platform_admin()
            or (
                public.current_profile_role() = 'teacher'
                and (
                    public.teacher_workspace_has_permission('view_classes_students')
                    or public.teacher_workspace_has_permission('manage_classes_students')
                    or public.teacher_workspace_has_permission('view_assign_lessons')
                )
                and exists (
                    select 1
                    from public.teacher_classes class
                    join public.class_lesson_assignments assignment on assignment.class_id = class.id
                    where class.teacher_id = public.teacher_workspace_owner_id()
                        and class.id::text = (storage.foldername(name))[2]
                        and assignment.lesson_id::text = (storage.foldername(name))[3]
                )
            )
        )
    );

commit;
