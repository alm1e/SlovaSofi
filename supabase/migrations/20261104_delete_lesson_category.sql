create or replace function public.delete_lesson_category(category_name text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
    if auth.uid() is null or not public.can_edit_lessons() then
        raise exception 'category_delete_forbidden' using errcode = '42501';
    end if;
    if upper(category_name) in ('A1', 'A2', 'B1', 'B2') then
        raise exception 'category_delete_builtin';
    end if;

    -- Keep the emptiness check and deletion atomic with concurrent lesson writes.
    lock table public.teacher_lessons in share row exclusive mode;
    if exists (
        select 1 from public.teacher_lessons where lower(unit) = lower(category_name)
    ) then
        raise exception 'category_not_empty';
    end if;
    delete from public.lesson_categories where name = category_name;
    if not found then
        raise exception 'category_not_found';
    end if;
end;
$$;

revoke all on function public.delete_lesson_category(text) from public, anon;
grant execute on function public.delete_lesson_category(text) to authenticated;
