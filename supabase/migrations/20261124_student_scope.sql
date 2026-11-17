begin;
set local lock_timeout = '5s';
alter table public.profiles add column student_scope text not null default 'school' check (student_scope in ('school','private'));
alter table public.profiles add column private_teacher_id uuid references auth.users(id);
alter table public.profiles add constraint private_student_has_teacher check (student_scope <> 'private' or (role = 'student' and private_teacher_id is not null));

create function public.can_read_student_scope(target_user uuid)
returns boolean language sql stable security definer set search_path = '' as $$
 select target_user is null or target_user = auth.uid() or public.is_platform_admin() or exists (
 select 1 from public.profiles p where p.id = target_user and
 (p.student_scope = 'school' or (public.current_profile_role() = 'teacher' and p.private_teacher_id = auth.uid())));
$$;
revoke all on function public.can_read_student_scope(uuid) from public, anon;
grant execute on function public.can_read_student_scope(uuid) to authenticated;
create policy "Student privacy boundary" on public.profiles as restrictive for select to authenticated using (public.can_read_student_scope(id));
create policy "Student roster privacy boundary" on public.class_students as restrictive for select to authenticated using (public.can_read_student_scope(linked_user_id));

create function public.guard_student_scope() returns trigger language plpgsql security definer set search_path = '' as $$
begin
 if auth.uid() is not null and not public.is_platform_admin() then
  if tg_op = 'INSERT' then
   if new.student_scope <> 'school' or new.private_teacher_id is not null then raise exception 'Only the administrator can classify students.' using errcode='42501'; end if;
  elsif new.student_scope is distinct from old.student_scope or new.private_teacher_id is distinct from old.private_teacher_id then
   raise exception 'Only the administrator can classify students.' using errcode='42501';
  end if;
 end if;
 -- Serialize classification with concurrent roster/class updates.
 if new.student_scope = 'private' then
  perform 1 from public.teacher_classes c join public.class_students s on s.class_id=c.id where s.linked_user_id=new.id for update of c;
 end if;
 if new.student_scope = 'private' and exists (select 1 from public.class_students s join public.teacher_classes c on c.id=s.class_id where s.linked_user_id=new.id and (c.class_scope <> 'private' or c.teacher_id <> new.private_teacher_id)) then
  raise exception 'Сначала перенесите ученика из школьных классов и классов другого преподавателя. Ответы и прогресс не удалены.' using errcode='23514';
 end if;
 return new;
end $$;
create trigger guard_student_scope before insert or update on public.profiles for each row execute function public.guard_student_scope();

create function public.guard_private_student_membership() returns trigger language plpgsql security definer set search_path = '' as $$
begin
 perform 1 from public.profiles p where p.id=new.linked_user_id for update;
 perform 1 from public.teacher_classes c where c.id=new.class_id for update;
 if exists (select 1 from public.profiles p join public.teacher_classes c on c.id=new.class_id where p.id=new.linked_user_id and p.student_scope='private' and (c.class_scope <> 'private' or c.teacher_id is distinct from p.private_teacher_id)) then
  raise exception 'Личного ученика можно добавить только в личный класс его преподавателя.' using errcode='23514';
 end if;
 return new;
end $$;
create trigger guard_private_student_membership before insert or update on public.class_students for each row execute function public.guard_private_student_membership();
create function public.guard_private_student_class() returns trigger language plpgsql security definer set search_path = '' as $$
begin
 perform 1 from public.profiles p join public.class_students s on s.linked_user_id=p.id where s.class_id=new.id for update of p;
 if exists(select 1 from public.class_students s join public.profiles p on p.id=s.linked_user_id where s.class_id=new.id and p.student_scope='private' and (new.class_scope <> 'private' or new.teacher_id is distinct from p.private_teacher_id)) then
  raise exception 'В классе есть личные ученики: сначала измените их принадлежность.' using errcode='23514';
 end if;
 return new;
end $$;
create trigger guard_private_student_class before update on public.teacher_classes for each row execute function public.guard_private_student_class();

create function public.student_directory()
returns table(id uuid, display_name text, student_scope text, private_teacher_id uuid)
language sql stable security definer set search_path = '' as $$
 select p.id, trim(concat_ws(' ',p.first_name,p.last_name)), p.student_scope,p.private_teacher_id
 from public.profiles p where p.role='student' and public.can_read_student_scope(p.id) and (
 public.is_platform_admin() or (public.current_profile_role()='director' and p.student_scope='school') or
 (public.current_profile_role()='teacher' and (p.private_teacher_id=auth.uid() or exists(select 1 from public.teacher_student_directory d where d.student_user_id=p.id and d.teacher_id=auth.uid()) or exists(select 1 from public.class_students s where s.linked_user_id=p.id and s.teacher_id=auth.uid()))));
$$;
create function public.set_student_scope(target_student uuid, target_scope text, target_teacher uuid default null)
returns void language plpgsql security definer set search_path = '' as $$
begin
 if not public.is_platform_admin() then raise exception 'Только администратор может менять принадлежность ученика.' using errcode='42501'; end if;
 if target_scope not in ('school','private') or target_scope is null then raise exception 'Выберите принадлежность ученика.'; end if;
 if target_scope='private' and not exists(select 1 from public.profiles where id=target_teacher and role in ('teacher','admin')) then raise exception 'Выберите преподавателя личного ученика.'; end if;
 update public.profiles set student_scope=target_scope, private_teacher_id=case when target_scope='private' then target_teacher else null end where id=target_student and role='student';
 if not found then raise exception 'Ученик не найден.'; end if;
 if target_scope='private' then
  insert into public.teacher_student_directory(teacher_id,student_user_id,email,display_name)
  select target_teacher,p.id,u.email,coalesce(nullif(trim(concat_ws(' ',p.first_name,p.last_name)),''),u.email,'Ученик')
  from public.profiles p join auth.users u on u.id=p.id where p.id=target_student
  on conflict(teacher_id,student_user_id) do update set email=excluded.email;
 end if;
 insert into public.school_audit_log(actor_id,actor_name,action,entity_id,entity_label,details) values(auth.uid(),public.audit_actor_name(),'student.scope_changed',target_student::text,'Принадлежность ученика',jsonb_build_object('scope',target_scope,'teacher_id',target_teacher));
end $$;
revoke all on function public.student_directory() from public,anon;
revoke all on function public.set_student_scope(uuid,text,uuid) from public,anon;
grant execute on function public.student_directory(),public.set_student_scope(uuid,text,uuid) to authenticated;
revoke all on function public.guard_student_scope(),public.guard_private_student_membership(),public.guard_private_student_class() from public,anon,authenticated;
commit;
