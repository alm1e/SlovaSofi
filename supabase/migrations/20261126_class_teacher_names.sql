begin;
-- Return labels only for owners of classes visible to the requesting staff member.
create function public.class_teacher_names()
returns table(id uuid,display_name text)
language sql stable security definer set search_path='' as $$
 select p.id,coalesce(
  nullif(btrim(concat_ws(' ',nullif(btrim(p.first_name),''),nullif(btrim(p.last_name),''))),''),
  nullif(btrim(u.raw_user_meta_data->>'display_name'),''),
  nullif(btrim(u.raw_user_meta_data->>'displayName'),''),
  nullif(btrim(concat_ws(' ',nullif(btrim(u.raw_user_meta_data->>'first_name'),''),nullif(btrim(u.raw_user_meta_data->>'last_name'),''))),''),
  nullif(btrim(u.raw_user_meta_data->>'full_name'),''),
  nullif(btrim(u.raw_user_meta_data->>'name'),''),
  nullif(u.email,''),'Преподаватель · '||left(p.id::text,8))
 from public.profiles p join auth.users u on u.id=p.id
 where public.current_profile_role() in ('admin','director','teacher') and exists(
  select 1 from public.teacher_classes c where c.teacher_id=p.id and (
   public.is_platform_admin() or (public.current_profile_role()='teacher' and c.teacher_id=auth.uid())
   or (public.current_profile_role()='director' and c.class_scope='school')));
$$;
revoke all on function public.class_teacher_names() from public,anon;
grant execute on function public.class_teacher_names() to authenticated;
commit;
