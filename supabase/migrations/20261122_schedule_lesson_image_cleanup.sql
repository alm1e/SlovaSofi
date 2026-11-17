begin;
-- Enable Cron and pg_net in the Supabase Dashboard first. No API keys are pasted.
do $$ begin
    if not exists(select 1 from pg_extension where extname='pg_cron') or not exists(select 1 from pg_extension where extname='pg_net') then
        raise exception 'Enable pg_cron and pg_net in Supabase Database Extensions, then rerun this migration';
    end if;
end $$;
create function public.run_scheduled_lesson_image_cleanup()
returns bigint language plpgsql security definer set search_path='' as $$
declare config public.lesson_image_cleanup_settings; request_id bigint;
begin
    select * into config from public.lesson_image_cleanup_settings where singleton;
    if config.project_url !~ '^https://[a-z0-9]+\.supabase\.co$' then raise exception 'Invalid project URL'; end if;
    select net.http_post(url:=config.project_url||'/functions/v1/cleanup-images',
        headers:=jsonb_build_object('Content-Type','application/json','x-cleanup-token',config.cron_token),
        body:=jsonb_build_object('dry_run',not config.enabled),timeout_milliseconds:=120000) into request_id;
    return request_id;
end $$;
revoke all on function public.run_scheduled_lesson_image_cleanup() from public,anon,authenticated;
select cron.schedule('slovasofi-unused-lesson-images','17 4 * * *',$job$select public.run_scheduled_lesson_image_cleanup();$job$);
commit;
