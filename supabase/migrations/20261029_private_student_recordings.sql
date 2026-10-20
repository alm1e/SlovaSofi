insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
    'lesson-recordings',
    'lesson-recordings',
    false,
    15728640,
    array['audio/webm', 'audio/ogg', 'audio/mp4']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Students upload their own assigned lesson recordings" on storage.objects;
create policy "Students upload their own assigned lesson recordings"
    on storage.objects for insert to authenticated
    with check (
        bucket_id = 'lesson-recordings'
        and split_part(name, '/', 1) = (select auth.uid())::text
        and split_part(name, '/', 2) ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
        and split_part(name, '/', 3) ~* '^[ab][0-9a-f-]{1,45}(\.q[A-Za-z0-9_-]{1,100})?-[0-9a-f-]{36}\.(webm|ogg|mp4)$'
        and exists (
            select 1
            from public.class_students as student
            join public.class_lesson_assignments as assignment
                on assignment.class_id = student.class_id
            where student.linked_user_id = (select auth.uid())
              and assignment.lesson_id::text = split_part(name, '/', 2)
        )
    );

drop policy if exists "Students and their lesson teachers view recordings" on storage.objects;
create policy "Students and their lesson teachers view recordings"
    on storage.objects for select to authenticated
    using (
        bucket_id = 'lesson-recordings'
        and (
            (
                split_part(name, '/', 1) = (select auth.uid())::text
                and exists (
                    select 1
                    from public.class_students as student
                    join public.class_lesson_assignments as assignment
                        on assignment.class_id = student.class_id
                    where student.linked_user_id = (select auth.uid())
                      and assignment.lesson_id::text = split_part(name, '/', 2)
                )
            )
            or (
                (
                    public.teacher_workspace_has_permission('view_assign_lessons')
                    or public.teacher_workspace_has_permission('edit_lessons')
                )
                and exists (
                    select 1
                    from public.class_students as student
                    join public.class_lesson_assignments as assignment
                        on assignment.class_id = student.class_id
                    where student.linked_user_id::text = split_part(name, '/', 1)
                      and student.teacher_id = public.teacher_workspace_owner_id()
                      and assignment.lesson_id::text = split_part(name, '/', 2)
                )
            )
            or public.is_platform_admin()
        )
    );

drop policy if exists "Students and lesson teachers delete recordings" on storage.objects;
create policy "Students and lesson teachers delete recordings"
    on storage.objects for delete to authenticated
    using (
        bucket_id = 'lesson-recordings'
        and (
            (
                split_part(name, '/', 1) = (select auth.uid())::text
                and exists (
                    select 1
                    from public.class_students as student
                    join public.class_lesson_assignments as assignment
                        on assignment.class_id = student.class_id
                    where student.linked_user_id = (select auth.uid())
                      and assignment.lesson_id::text = split_part(name, '/', 2)
                )
            )
            or (
                public.teacher_workspace_has_permission('edit_lessons')
                and exists (
                    select 1
                    from public.class_students as student
                    join public.class_lesson_assignments as assignment
                        on assignment.class_id = student.class_id
                    where student.linked_user_id::text = split_part(name, '/', 1)
                      and student.teacher_id = public.teacher_workspace_owner_id()
                      and assignment.lesson_id::text = split_part(name, '/', 2)
                )
            )
            or public.is_platform_admin()
        )
    );
