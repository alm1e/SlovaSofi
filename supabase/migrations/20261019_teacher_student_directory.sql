begin;

create table if not exists public.teacher_student_directory (
    teacher_id uuid not null references auth.users(id) on delete cascade,
    student_user_id uuid not null references auth.users(id) on delete cascade,
    email text not null,
    display_name text not null check (length(trim(display_name)) between 1 and 120),
    created_at timestamptz not null default now(),
    primary key (teacher_id, student_user_id)
);

create index if not exists teacher_student_directory_teacher_name_idx
    on public.teacher_student_directory (teacher_id, lower(display_name));

alter table public.teacher_student_directory enable row level security;
revoke all on public.teacher_student_directory from anon, authenticated;

insert into public.teacher_student_directory (teacher_id, student_user_id, email, display_name)
select distinct on (student.teacher_id, student.linked_user_id)
    student.teacher_id,
    student.linked_user_id,
    lower(coalesce(account.email, student.email)),
    left(coalesce(
        nullif(trim(student.display_name), ''),
        nullif(trim(account.raw_user_meta_data ->> 'display_name'), ''),
        coalesce(account.email, student.email)
    ), 120)
from public.class_students as student
join auth.users as account on account.id = student.linked_user_id
where student.linked_user_id is not null
  and coalesce(account.email, student.email) is not null
order by student.teacher_id, student.linked_user_id, student.created_at desc
on conflict (teacher_id, student_user_id) do update
set email = excluded.email,
    display_name = excluded.display_name;

commit;
