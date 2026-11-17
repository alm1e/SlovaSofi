begin;
-- Safe to re-run. Existing SELECT policies still control which classes staff can see.
do $$ begin
    if not exists(select 1 from pg_publication where pubname='supabase_realtime') then
        raise exception 'Enable Supabase Realtime before applying this migration';
    end if;
    if not exists(select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='student_lesson_progress') then
        alter publication supabase_realtime add table public.student_lesson_progress;
    end if;
end $$;
commit;
