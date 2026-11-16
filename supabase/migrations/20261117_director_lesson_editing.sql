begin;
-- Directors edit the shared lesson library, while class boundaries remain unchanged.
create or replace function public.can_edit_lessons()
returns boolean language sql stable security definer set search_path = ''
as $$
    select public.current_profile_role() in ('admin', 'director') or (
        public.current_profile_role() = 'teacher' and exists (
            select 1 from public.teacher_lesson_editors where user_id = (select auth.uid())
        )
    )
$$;
create or replace function public.teacher_workspace_has_permission(permission_name text)
returns boolean language sql stable security definer set search_path = ''
as $$
    select case
        when public.current_profile_role() = 'director' then
            permission_name in ('view_classes_students', 'view_lessons', 'edit_lessons')
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

do $$
declare target_table text;
begin
    foreach target_table in array array['teacher_lessons', 'lesson_categories'] loop
        execute format('drop policy if exists "Directors cannot insert" on public.%I', target_table);
        execute format('drop policy if exists "Directors cannot update" on public.%I', target_table);
        execute format('drop policy if exists "Directors cannot delete" on public.%I', target_table);
    end loop;
end
$$;
-- Uploading shared lesson media must not grant access to student recordings.
alter policy "Directors cannot upload objects" on storage.objects
with check (public.current_profile_role() <> 'director' or bucket_id in ('lesson-images', 'lesson-media'));
alter policy "Directors cannot edit objects" on storage.objects
using (public.current_profile_role() <> 'director' or bucket_id in ('lesson-images', 'lesson-media'))
with check (public.current_profile_role() <> 'director' or bucket_id in ('lesson-images', 'lesson-media'));
alter policy "Directors cannot delete objects" on storage.objects
using (public.current_profile_role() <> 'director' or bucket_id in ('lesson-images', 'lesson-media'));
commit;
