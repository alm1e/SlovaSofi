begin;
-- Directors have teacher tools across school classes; personal records stay excluded.
create or replace function public.teacher_workspace_has_permission(permission_name text)
returns boolean language sql stable security definer set search_path='' as $$
 select case when public.current_profile_role()='director' then permission_name in ('view_classes_students','view_lessons','edit_lessons','manage_classes_students','view_assign_lessons') else case permission_name
 when 'view_classes_students' then public.current_profile_role() in ('teacher','admin')
 when 'view_lessons' then public.current_profile_role() in ('teacher','admin')
 when 'manage_classes_students' then public.current_profile_role() in ('teacher','admin')
 when 'view_assign_lessons' then public.current_profile_role() in ('teacher','admin')
 when 'edit_lessons' then public.can_edit_lessons()
 when 'manage_teachers' then public.is_platform_admin() else false end end;
$$;
alter policy "Director class boundary" on public.teacher_classes using(public.current_profile_role()<>'director' or class_scope='school');
drop policy "Directors cannot insert" on public.teacher_classes;
drop policy "Directors cannot update" on public.teacher_classes;
drop policy "Directors cannot delete" on public.teacher_classes;
create policy "Directors manage school classes" on public.teacher_classes for all to authenticated using(public.current_profile_role()='director' and class_scope='school') with check(public.current_profile_role()='director' and class_scope='school');
create policy "Director school write boundary" on public.teacher_classes as restrictive for all to authenticated using(public.current_profile_role()<>'director' or class_scope='school') with check(public.current_profile_role()<>'director' or class_scope='school');
do $$ declare target text; begin
 foreach target in array array['class_students','class_lesson_assignments','calendar_events','student_lesson_progress'] loop
  execute format('drop policy "Directors cannot insert" on public.%I',target);
  execute format('drop policy "Directors cannot update" on public.%I',target);
  execute format('drop policy "Directors cannot delete" on public.%I',target);
  execute format('create policy "Directors manage school rows" on public.%I for all to authenticated using(public.director_can_read_class(class_id)) with check(public.director_can_read_class(class_id))',target);
  execute format('create policy "Director school write boundary" on public.%I as restrictive for all to authenticated using(public.current_profile_role()<>''director'' or public.director_can_read_class(class_id)) with check(public.current_profile_role()<>''director'' or public.director_can_read_class(class_id))',target);
 end loop;
end $$;
create or replace function public.can_manage_homework(target_class uuid)
returns boolean language sql stable security definer set search_path='' as $$
 select exists(select 1 from public.teacher_classes c where c.id=target_class and
 (public.is_platform_admin() or (public.current_profile_role()='teacher' and c.teacher_id=auth.uid())
 or (public.current_profile_role()='director' and c.class_scope='school')));
$$;
commit;
