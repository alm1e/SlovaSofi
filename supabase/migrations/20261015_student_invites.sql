begin;

alter table public.class_students
    add column if not exists email text;

create unique index if not exists class_students_class_email_unique
    on public.class_students (class_id, lower(email))
    where email is not null;

drop policy if exists "Students view their own class memberships" on public.class_students;
create policy "Students view their own class memberships"
    on public.class_students for select to authenticated
    using (linked_user_id = (select auth.uid()));

drop policy if exists "Students view their own class" on public.teacher_classes;
create policy "Students view their own class"
    on public.teacher_classes for select to authenticated
    using (
        exists (
            select 1 from public.class_students student
            where student.class_id = teacher_classes.id
              and student.linked_user_id = (select auth.uid())
        )
    );

commit;
