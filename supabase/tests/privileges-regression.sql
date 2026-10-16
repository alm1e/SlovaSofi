-- Read-only assertions: never execute TRUNCATE or any destructive probe.
do $$
declare r record;
begin
    for r in select oid,relname from pg_class
        where relnamespace='public'::regnamespace and relkind='r'
    loop
        if has_table_privilege('anon',r.oid,'SELECT,INSERT,UPDATE,DELETE,TRUNCATE,REFERENCES,TRIGGER,MAINTAIN') then
            raise exception 'Anonymous table privilege remains on %',r.relname;
        end if;
        if has_table_privilege('authenticated',r.oid,'TRUNCATE,REFERENCES,TRIGGER,MAINTAIN') then
            raise exception 'Unnecessary client privilege remains on %',r.relname;
        end if;
    end loop;
    if not has_column_privilege('authenticated','public.profiles','first_name','UPDATE') then
        raise exception 'Profile editing was broken';
    end if;
    if has_column_privilege('authenticated','public.profiles','role','UPDATE') then
        raise exception 'Direct role updates must stay closed';
    end if;
end $$;
