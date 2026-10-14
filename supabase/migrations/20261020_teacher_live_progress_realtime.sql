do $$
begin
    if not exists (
        select 1
        from pg_publication
        where pubname = 'supabase_realtime'
    ) then
        raise exception 'Supabase Realtime publication does not exist.';
    end if;

    if not exists (
        select 1
        from pg_publication_tables
        where pubname = 'supabase_realtime'
          and schemaname = 'public'
          and tablename = 'student_lesson_progress'
    ) then
        alter publication supabase_realtime add table public.student_lesson_progress;
    end if;
end
$$;
