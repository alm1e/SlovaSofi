begin;

create table if not exists public.teacher_workspace_settings (
    user_id uuid primary key references auth.users(id) on delete cascade,
    legacy_imported boolean not null default false,
    created_at timestamptz not null default now()
);

create table if not exists public.teacher_classes (
    id uuid primary key default gen_random_uuid(),
    teacher_id uuid not null references auth.users(id) on delete cascade,
    name text not null check (length(trim(name)) between 1 and 80),
    course text not null default '',
    created_at timestamptz not null default now(),
    unique (id, teacher_id)
);

create table if not exists public.class_students (
    id uuid primary key default gen_random_uuid(),
    class_id uuid not null,
    teacher_id uuid not null references auth.users(id) on delete cascade,
    display_name text not null check (length(trim(display_name)) between 1 and 120),
    linked_user_id uuid references auth.users(id) on delete set null,
    created_at timestamptz not null default now(),
    unique (id, class_id),
    unique (class_id, display_name),
    foreign key (class_id, teacher_id) references public.teacher_classes(id, teacher_id) on delete cascade
);

create table if not exists public.teacher_lessons (
    id uuid primary key default gen_random_uuid(),
    teacher_id uuid not null references auth.users(id) on delete cascade,
    title text not null check (length(trim(title)) between 1 and 100),
    unit text not null check (unit in ('A1', 'A2', 'B1', 'B2')),
    activities jsonb not null default '[]'::jsonb check (jsonb_typeof(activities) = 'array'),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    unique (id, teacher_id)
);

create table if not exists public.class_lesson_assignments (
    class_id uuid not null,
    lesson_id uuid not null,
    teacher_id uuid not null references auth.users(id) on delete cascade,
    assigned_at timestamptz not null default now(),
    primary key (class_id, lesson_id),
    foreign key (class_id, teacher_id) references public.teacher_classes(id, teacher_id) on delete cascade,
    foreign key (lesson_id, teacher_id) references public.teacher_lessons(id, teacher_id) on delete cascade
);

create table if not exists public.teacher_materials (
    id uuid primary key default gen_random_uuid(),
    teacher_id uuid not null references auth.users(id) on delete cascade,
    name text not null check (length(trim(name)) between 1 and 100),
    kind text not null,
    details text not null default '',
    url text not null default '',
    created_at timestamptz not null default now()
);

create table if not exists public.student_lesson_progress (
    student_id uuid not null,
    class_id uuid not null,
    lesson_id uuid not null,
    answers jsonb not null default '{}'::jsonb check (jsonb_typeof(answers) = 'object'),
    completed_at timestamptz,
    updated_at timestamptz not null default now(),
    primary key (student_id, lesson_id),
    foreign key (student_id, class_id) references public.class_students(id, class_id) on delete cascade,
    foreign key (class_id, lesson_id) references public.class_lesson_assignments(class_id, lesson_id) on delete cascade
);

create index if not exists class_students_linked_user_idx on public.class_students(linked_user_id);
create index if not exists assignments_lesson_idx on public.class_lesson_assignments(lesson_id);
create index if not exists progress_class_idx on public.student_lesson_progress(class_id);

grant select, insert, update, delete on public.teacher_workspace_settings to authenticated;
grant select, insert, update, delete on public.teacher_classes to authenticated;
grant select, insert, update, delete on public.class_students to authenticated;
grant select, insert, update, delete on public.teacher_lessons to authenticated;
grant select, insert, update, delete on public.class_lesson_assignments to authenticated;
grant select, insert, update, delete on public.teacher_materials to authenticated;
grant select, insert, update, delete on public.student_lesson_progress to authenticated;

alter table public.teacher_workspace_settings enable row level security;
alter table public.teacher_classes enable row level security;
alter table public.class_students enable row level security;
alter table public.teacher_lessons enable row level security;
alter table public.class_lesson_assignments enable row level security;
alter table public.teacher_materials enable row level security;
alter table public.student_lesson_progress enable row level security;

drop policy if exists "Users manage their own workspace settings" on public.teacher_workspace_settings;
create policy "Users manage their own workspace settings"
    on public.teacher_workspace_settings for all to authenticated
    using (user_id = (select auth.uid()))
    with check (user_id = (select auth.uid()));

drop policy if exists "Teachers manage their own classes" on public.teacher_classes;
create policy "Teachers manage their own classes"
    on public.teacher_classes for all to authenticated
    using (teacher_id = (select auth.uid()))
    with check (teacher_id = (select auth.uid()));

drop policy if exists "Teachers manage their class rosters" on public.class_students;
create policy "Teachers manage their class rosters"
    on public.class_students for all to authenticated
    using (teacher_id = (select auth.uid()))
    with check (teacher_id = (select auth.uid()));
drop policy if exists "Students view their own class memberships" on public.class_students;
create policy "Students view their own class memberships"
    on public.class_students for select to authenticated
    using (linked_user_id = (select auth.uid()));

drop policy if exists "Teachers manage their own lessons" on public.teacher_lessons;
create policy "Teachers manage their own lessons"
    on public.teacher_lessons for all to authenticated
    using (teacher_id = (select auth.uid()))
    with check (teacher_id = (select auth.uid()));
drop policy if exists "Students view lessons assigned to their classes" on public.teacher_lessons;
create policy "Students view lessons assigned to their classes"
    on public.teacher_lessons for select to authenticated
    using (
        exists (
            select 1
            from public.class_lesson_assignments assignment
            join public.class_students student on student.class_id = assignment.class_id
            where assignment.lesson_id = teacher_lessons.id
              and student.linked_user_id = (select auth.uid())
        )
    );

drop policy if exists "Teachers manage their lesson assignments" on public.class_lesson_assignments;
create policy "Teachers manage their lesson assignments"
    on public.class_lesson_assignments for all to authenticated
    using (teacher_id = (select auth.uid()))
    with check (teacher_id = (select auth.uid()));
drop policy if exists "Students view assignments for their classes" on public.class_lesson_assignments;
create policy "Students view assignments for their classes"
    on public.class_lesson_assignments for select to authenticated
    using (
        exists (
            select 1 from public.class_students student
            where student.class_id = class_lesson_assignments.class_id
              and student.linked_user_id = (select auth.uid())
        )
    );

drop policy if exists "Teachers manage their own materials" on public.teacher_materials;
create policy "Teachers manage their own materials"
    on public.teacher_materials for all to authenticated
    using (teacher_id = (select auth.uid()))
    with check (teacher_id = (select auth.uid()));

drop policy if exists "Students and teachers view lesson progress" on public.student_lesson_progress;
create policy "Students and teachers view lesson progress"
    on public.student_lesson_progress for select to authenticated
    using (
        exists (
            select 1
            from public.class_students student
            where student.id = student_lesson_progress.student_id
              and (
                  student.linked_user_id = (select auth.uid())
                  or student.teacher_id = (select auth.uid())
              )
        )
    );
drop policy if exists "Students save their own assigned lesson progress" on public.student_lesson_progress;
create policy "Students save their own assigned lesson progress"
    on public.student_lesson_progress for insert to authenticated
    with check (
        exists (
            select 1
            from public.class_students student
            where student.id = student_lesson_progress.student_id
              and student.class_id = student_lesson_progress.class_id
              and student.linked_user_id = (select auth.uid())
        )
        and exists (
            select 1
            from public.class_lesson_assignments assignment
            where assignment.class_id = student_lesson_progress.class_id
              and assignment.lesson_id = student_lesson_progress.lesson_id
        )
    );
drop policy if exists "Students update their own assigned lesson progress" on public.student_lesson_progress;
create policy "Students update their own assigned lesson progress"
    on public.student_lesson_progress for update to authenticated
    using (
        exists (
            select 1
            from public.class_students student
            where student.id = student_lesson_progress.student_id
              and student.linked_user_id = (select auth.uid())
        )
    )
    with check (
        exists (
            select 1
            from public.class_students student
            where student.id = student_lesson_progress.student_id
              and student.class_id = student_lesson_progress.class_id
              and student.linked_user_id = (select auth.uid())
        )
        and exists (
            select 1
            from public.class_lesson_assignments assignment
            where assignment.class_id = student_lesson_progress.class_id
              and assignment.lesson_id = student_lesson_progress.lesson_id
        )
    );

commit;
