create table if not exists public.lesson_categories (
    name text primary key check (char_length(name) between 1 and 80 and name = btrim(name)),
    created_by uuid not null default auth.uid() references auth.users(id),
    created_at timestamptz not null default now()
);

create unique index if not exists lesson_categories_name_lower_key
    on public.lesson_categories (lower(name));

alter table public.teacher_lessons drop constraint if exists teacher_lessons_unit_check;
alter table public.teacher_lessons add constraint teacher_lessons_unit_check
    check (char_length(unit) between 1 and 80 and unit = btrim(unit));

alter table public.lesson_categories enable row level security;
revoke all on public.lesson_categories from anon, authenticated;
grant select, insert on public.lesson_categories to authenticated;
grant all on public.lesson_categories to service_role;

create policy "Teachers view shared lesson categories"
    on public.lesson_categories for select to authenticated
    using (public.current_profile_role() in ('teacher', 'admin'));
create policy "Lesson editors create shared categories"
    on public.lesson_categories for insert to authenticated
    with check (public.can_edit_lessons() and created_by = (select auth.uid()));
