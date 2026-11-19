begin;
alter table public.lesson_categories add column cover_url text not null default '' check(cover_url='' or cover_url ~ '^https://');
alter table public.lesson_categories add column lesson_order uuid[] not null default '{}';
alter table public.teacher_lessons add column note_visibility jsonb not null default '{}' check(jsonb_typeof(note_visibility)='object');
grant update(cover_url,lesson_order) on public.lesson_categories to authenticated;
create policy "Editors update category presentation" on public.lesson_categories for update to authenticated using(public.can_edit_lessons()) with check(public.can_edit_lessons());
insert into public.lesson_categories(name,created_by) select unit,min(teacher_id::text)::uuid from public.teacher_lessons group by unit on conflict do nothing;
create function public.set_category_order(category_name text, ordered_ids uuid[], expected_order uuid[]) returns void language plpgsql security definer set search_path='' as $$
declare prior uuid[];
begin
 if not public.can_edit_lessons() then raise exception 'Нет права изменять порядок уроков.' using errcode='42501'; end if;
 select lesson_order into prior from public.lesson_categories where name=category_name for update;
 if not found or prior is distinct from expected_order then raise exception 'Порядок уже изменён. Обновите страницу.'; end if;
 if ordered_ids is null or cardinality(ordered_ids) <> (select count(*) from public.teacher_lessons where unit=category_name) or cardinality(ordered_ids) <> (select count(distinct x) from unnest(ordered_ids) x) or exists(select 1 from unnest(ordered_ids) x where not exists(select 1 from public.teacher_lessons where id=x and unit=category_name)) then raise exception 'Состав категории изменился. Обновите страницу.'; end if;
 update public.lesson_categories set lesson_order=ordered_ids where name=category_name;
end $$;
create function public.set_note_visibility(target_lesson uuid,target_block uuid,visible boolean) returns jsonb language plpgsql security definer set search_path='' as $$
declare body jsonb; item jsonb; section jsonb; found_note boolean:=false; result jsonb; part text;
begin
 if not public.can_edit_lessons() or visible is null then raise exception 'Нет права изменять заметку.' using errcode='42501'; end if;
 select activities into body from public.teacher_lessons where id=target_lesson for update;
 if not found then raise exception 'Урок не найден.'; end if;
 if jsonb_typeof(body)='array' then
  for item in select value from jsonb_array_elements(body) loop
   if item->>'id'=target_block::text and item->>'type'='text' and (item#>>'{settings,note}'='true' or item->>'content' ~* '^\s*\[(info|star)\]') then found_note:=true; end if;
  end loop;
 else
  foreach part in array array['sections','homeworkSections'] loop
   for section in select value from jsonb_array_elements(coalesce(body->part,'[]')) loop
    for item in select value from jsonb_array_elements(coalesce(section->'activities','[]')) loop
     if item->>'id'=target_block::text and item->>'type'='text' and (item#>>'{settings,note}'='true' or item->>'content' ~* '^\s*\[(info|star)\]') then found_note:=true; end if;
    end loop;
   end loop;
  end loop;
 end if;
 if not found_note then raise exception 'Заметка не найдена. Сначала сохраните урок.'; end if;
 update public.teacher_lessons set note_visibility=jsonb_set(note_visibility,array[target_block::text],to_jsonb(visible),true) where id=target_lesson returning note_visibility into result;
 return result;
end $$;
revoke all on function public.set_category_order(text,uuid[],uuid[]),public.set_note_visibility(uuid,uuid,boolean) from public,anon;
grant execute on function public.set_category_order(text,uuid[],uuid[]),public.set_note_visibility(uuid,uuid,boolean) to authenticated;
create function public.set_category_cover(category_name text,image_url text) returns void language plpgsql security definer set search_path='' as $$
begin
 if not public.can_edit_lessons() then raise exception 'Нет права изменять обложку.' using errcode='42501'; end if;
 if image_url is null or (image_url<>'' and image_url !~ '^https://') then raise exception 'Некорректная ссылка на изображение.'; end if;
 insert into public.lesson_categories(name,cover_url) values(category_name,image_url) on conflict(name) do update set cover_url=excluded.cover_url;
end $$;
revoke all on function public.set_category_cover(text,text) from public,anon;
grant execute on function public.set_category_cover(text,text) to authenticated;
-- Category covers use the same protected image lifecycle as lesson illustrations.
do $$ declare definition text; begin
 if to_regprocedure('public.lesson_image_is_referenced(text)') is not null then
  select pg_get_functiondef('public.lesson_image_is_referenced(text)'::regprocedure) into definition;
  definition:=replace(definition,'select exists(select 1 from public.lesson_image_cleanup_protected', 'select exists(select 1 from public.lesson_categories c where strpos(lower(c.cover_url),public.lesson_image_uuid(object_name))>0) or exists(select 1 from public.lesson_image_cleanup_protected');
  execute definition;
  create trigger guard_category_cover_images before insert or update on public.lesson_categories for each row execute function public.guard_lesson_image_references();
 end if;
end $$;
commit;
