begin;

create table if not exists public.calendar_events (
    id uuid primary key default gen_random_uuid(),
    teacher_id uuid not null references auth.users(id) on delete cascade,
    class_id uuid not null references public.teacher_classes(id) on delete cascade,
    lesson_id uuid references public.teacher_lessons(id) on delete set null,
    title text not null check (length(trim(title)) between 1 and 120),
    starts_at timestamptz not null,
    duration_minutes integer not null default 60 check (duration_minutes between 15 and 360),
    recurrence text not null default 'none'
        check (recurrence in ('none', 'daily', 'every_other_day', 'weekly', 'custom')),
    repeat_until date,
    repeat_days smallint[] not null default '{}',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    check (
        (
            recurrence = 'none'
            and repeat_until is null
            and cardinality(repeat_days) = 0
        )
        or (
            recurrence <> 'none'
            and repeat_until is not null
            and repeat_until >= starts_at::date
            and repeat_until <= (starts_at::date + 365)
            and (
                (recurrence = 'custom' and cardinality(repeat_days) between 1 and 7
                    and repeat_days <@ array[0, 1, 2, 3, 4, 5, 6]::smallint[])
                or (recurrence <> 'custom' and cardinality(repeat_days) = 0)
            )
        )
    )
);

create index if not exists calendar_events_class_starts_at_idx
    on public.calendar_events (class_id, starts_at);
create index if not exists calendar_events_teacher_starts_at_idx
    on public.calendar_events (teacher_id, starts_at);

alter table public.calendar_events enable row level security;
grant select, insert, update, delete on public.calendar_events to authenticated;

drop policy if exists "Teachers and admins view calendar events" on public.calendar_events;
create policy "Teachers and admins view calendar events"
    on public.calendar_events for select to authenticated
    using (
        public.is_platform_admin()
        or (public.current_profile_role() = 'teacher' and teacher_id = (select auth.uid()))
    );

drop policy if exists "Teachers and admins manage calendar events" on public.calendar_events;
create policy "Teachers and admins manage calendar events"
    on public.calendar_events for all to authenticated
    using (
        public.is_platform_admin()
        or (public.current_profile_role() = 'teacher' and teacher_id = (select auth.uid()))
    )
    with check (
        public.is_platform_admin()
        or (
            public.current_profile_role() = 'teacher'
            and teacher_id = (select auth.uid())
            and exists (
                select 1 from public.teacher_classes as class
                where class.id = calendar_events.class_id
                  and class.teacher_id = (select auth.uid())
            )
        )
    );

drop policy if exists "Students view their own class schedule" on public.calendar_events;
create policy "Students view their own class schedule"
    on public.calendar_events for select to authenticated
    using (
        public.current_profile_role() = 'student'
        and exists (
            select 1 from public.class_students as student
            where student.class_id = calendar_events.class_id
              and student.linked_user_id = (select auth.uid())
        )
    );

do $$
begin
    if exists (select 1 from pg_publication where pubname = 'supabase_realtime')
       and not exists (
           select 1 from pg_publication_tables
           where pubname = 'supabase_realtime'
             and schemaname = 'public'
             and tablename = 'calendar_events'
       ) then
        alter publication supabase_realtime add table public.calendar_events;
    end if;
end
$$;

commit;
