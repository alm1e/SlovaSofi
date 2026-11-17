begin;
set local lock_timeout='5s';

-- Only generated lesson-images names are eligible; no recordings/media are touched.
create table public.lesson_image_cleanup_settings (
    singleton boolean primary key default true check(singleton),
    enabled boolean not null default false,
    project_url text not null default 'https://vvrxhiextryjnzpxvals.supabase.co',
    cron_token text not null default replace(gen_random_uuid()::text,'-','')||replace(gen_random_uuid()::text,'-',''),
    active_run uuid, lease_until timestamptz
);
insert into public.lesson_image_cleanup_settings(singleton) values(true);
create table public.lesson_image_cleanup_candidates (
    object_id uuid primary key, name text not null unique,
    first_seen_at timestamptz not null default clock_timestamp(),
    state text not null default 'pending' check(state in ('pending','deleting','deleted')),
    deleted_at timestamptz
);
create table public.lesson_image_cleanup_drafts (
    user_id uuid not null references auth.users(id) on delete cascade,
    draft_key text not null, image_ids text[] not null,
    updated_at timestamptz not null default clock_timestamp(),
    primary key(user_id,draft_key)
);
create table public.lesson_image_cleanup_protected (
    image_id text primary key check(image_id ~* '^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$'),
    reason text not null
);
create table public.lesson_image_cleanup_runs (
    id uuid primary key, started_at timestamptz not null default clock_timestamp(),
    finished_at timestamptz, dry_run boolean not null, result jsonb not null default '{}'::jsonb
);

alter table public.lesson_image_cleanup_settings enable row level security;
alter table public.lesson_image_cleanup_candidates enable row level security;
alter table public.lesson_image_cleanup_drafts enable row level security;
alter table public.lesson_image_cleanup_protected enable row level security;
alter table public.lesson_image_cleanup_runs enable row level security;
revoke all on public.lesson_image_cleanup_settings,public.lesson_image_cleanup_candidates,public.lesson_image_cleanup_drafts,public.lesson_image_cleanup_protected,public.lesson_image_cleanup_runs from public,anon,authenticated;
grant all on public.lesson_image_cleanup_settings,public.lesson_image_cleanup_candidates,public.lesson_image_cleanup_drafts,public.lesson_image_cleanup_protected,public.lesson_image_cleanup_runs to service_role;
grant select on public.lesson_image_cleanup_candidates,public.lesson_image_cleanup_runs to authenticated;
create policy "Only admins read cleanup candidates" on public.lesson_image_cleanup_candidates for select to authenticated using(public.is_platform_admin());
create policy "Only admins read cleanup runs" on public.lesson_image_cleanup_runs for select to authenticated using(public.is_platform_admin());

create function public.lesson_image_uuid(object_name text)
returns text language sql immutable set search_path='' as $$ select lower(split_part(split_part(object_name,'/',2),'.',1)) $$;
create function public.lesson_image_is_referenced(object_name text)
returns boolean language sql stable security definer set search_path='' as $$
    select exists(select 1 from public.lesson_image_cleanup_protected where image_id=public.lesson_image_uuid(object_name))
    or exists(select 1 from public.lesson_image_cleanup_drafts where public.lesson_image_uuid(object_name)=any(image_ids))
    or exists(select 1 from public.teacher_lessons t where strpos(replace(lower(to_jsonb(t)::text),'%2d','-'),public.lesson_image_uuid(object_name))>0)
    or exists(select 1 from public.lesson_versions t where strpos(replace(lower(t.snapshot::text),'%2d','-'),public.lesson_image_uuid(object_name))>0)
    or exists(select 1 from public.student_lesson_progress t where strpos(replace(lower(t.answers::text),'%2d','-'),public.lesson_image_uuid(object_name))>0)
    or exists(select 1 from public.teacher_workspace_settings t where strpos(replace(lower(to_jsonb(t)::text),'%2d','-'),public.lesson_image_uuid(object_name))>0)
    or exists(select 1 from public.calendar_events t where strpos(replace(lower(to_jsonb(t)::text),'%2d','-'),public.lesson_image_uuid(object_name))>0)
    or exists(select 1 from public.homework_tasks t where strpos(replace(lower(to_jsonb(t)::text),'%2d','-'),public.lesson_image_uuid(object_name))>0)
    or exists(select 1 from public.school_audit_log t where strpos(replace(lower(t.details::text),'%2d','-'),public.lesson_image_uuid(object_name))>0)
$$;

-- Serialize writes containing image references against a deletion claim. A deleted
-- name remains a tombstone: it can never silently become a broken new reference.
create function public.guard_lesson_image_references()
returns trigger language plpgsql security definer set search_path='' as $$
declare item record; body text := replace(lower(to_jsonb(new)::text),'%2d','-');
begin
    for item in select c.name,c.state from public.lesson_image_cleanup_candidates c
        where strpos(body,public.lesson_image_uuid(c.name))>0 order by c.object_id for share loop
        if item.state in ('deleting','deleted') then
            raise exception 'image_unavailable: upload this image again before saving' using errcode='23514';
        end if;
    end loop;
    return new;
end $$;
create trigger guard_lesson_images before insert or update on public.teacher_lessons for each row execute function public.guard_lesson_image_references();
create trigger guard_version_images before insert or update on public.lesson_versions for each row execute function public.guard_lesson_image_references();
create trigger guard_answer_images before insert or update on public.student_lesson_progress for each row execute function public.guard_lesson_image_references();
create trigger guard_workspace_images before insert or update on public.teacher_workspace_settings for each row execute function public.guard_lesson_image_references();
create trigger guard_calendar_images before insert or update on public.calendar_events for each row execute function public.guard_lesson_image_references();
create trigger guard_homework_images before insert or update on public.homework_tasks for each row execute function public.guard_lesson_image_references();
create trigger guard_audit_images before insert or update on public.school_audit_log for each row execute function public.guard_lesson_image_references();
create trigger guard_draft_images before insert or update on public.lesson_image_cleanup_drafts for each row execute function public.guard_lesson_image_references();
create trigger guard_storage_image_replacements before insert or update on storage.objects for each row when (new.bucket_id='lesson-images') execute function public.guard_lesson_image_references();
create trigger guard_protected_images before insert or update on public.lesson_image_cleanup_protected for each row execute function public.guard_lesson_image_references();

create function public.protect_lesson_image_draft(draft_key text, image_ids text[])
returns void language plpgsql security definer set search_path='' as $$
begin
    if auth.uid() is null or not public.can_edit_lessons() then raise exception 'forbidden'; end if;
    if length(draft_key)>120 or draft_key='' or cardinality(image_ids)>1000 or image_ids is null
       or exists(select 1 from unnest(image_ids) value where value is null or value !~* '^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$') then raise exception 'invalid_draft'; end if;
    if cardinality(image_ids)=0 then
        delete from public.lesson_image_cleanup_drafts d where d.user_id=auth.uid() and d.draft_key=protect_lesson_image_draft.draft_key;
    else
        insert into public.lesson_image_cleanup_drafts(user_id,draft_key,image_ids) values(auth.uid(),draft_key,array(select distinct lower(value) from unnest(image_ids) value))
        on conflict on constraint lesson_image_cleanup_drafts_pkey do update set image_ids=excluded.image_ids,updated_at=clock_timestamp();
    end if;
end $$;

create function public.begin_lesson_image_cleanup(token text, requested_dry_run boolean default true, protected_ids text[] default '{}')
returns jsonb language plpgsql security definer set search_path='' as $$
declare config public.lesson_image_cleanup_settings; run uuid:=gen_random_uuid(); preview boolean;
begin
    select * into config from public.lesson_image_cleanup_settings where singleton for update;
    if token is null or length(token)<>64 or sha256(convert_to(token,'UTF8'))<>sha256(convert_to(config.cron_token,'UTF8')) then raise exception 'unauthorized'; end if;
    if config.lease_until>clock_timestamp() then raise exception 'cleanup_busy'; end if;
    if protected_ids is null or cardinality(protected_ids)>10000 or exists(select 1 from unnest(protected_ids) value where value is null or value !~* '^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$') then raise exception 'invalid_site_manifest'; end if;
    delete from public.lesson_image_cleanup_protected where reason='website-source' and image_id<>all(protected_ids);
    insert into public.lesson_image_cleanup_protected(image_id,reason) select distinct lower(value),'website-source' from unnest(protected_ids) value on conflict do nothing;
    preview := coalesce(requested_dry_run,true) or not config.enabled;
    update public.lesson_image_cleanup_settings set active_run=run,lease_until=clock_timestamp()+interval '10 minutes' where singleton;
    insert into public.lesson_image_cleanup_runs(id,dry_run) values(run,preview);
    -- Reference rechecks reset the entire observation window, not just today's run.
    delete from public.lesson_image_cleanup_candidates c where c.state='pending' and (
        public.lesson_image_is_referenced(c.name) or not exists(select 1 from storage.objects o where o.id=c.object_id and o.bucket_id='lesson-images' and o.name=c.name));
    insert into public.lesson_image_cleanup_candidates(object_id,name)
    select o.id,o.name from storage.objects o where o.bucket_id='lesson-images'
        and o.created_at<clock_timestamp()-interval '30 days'
        and o.name ~* '^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}/[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}\.(png|jpe?g|webp|gif)$'
        and not public.lesson_image_is_referenced(o.name)
    order by o.created_at,o.id limit 1000 on conflict do nothing;
    return jsonb_build_object('run_id',run,'dry_run',preview,'pending_count',(select count(*) from public.lesson_image_cleanup_candidates where state='pending'),
        'objects',coalesce((select jsonb_agg(jsonb_build_object('id',c.object_id,'name',c.name)) from (
            select * from public.lesson_image_cleanup_candidates where state='deleting' or (state='pending' and first_seen_at<clock_timestamp()-interval '14 days')
            order by first_seen_at,object_id limit 50) c),'[]'::jsonb));
end $$;

create function public.claim_lesson_image_cleanup(run_id uuid, target_object uuid)
returns text language plpgsql security definer set search_path='' as $$
declare item public.lesson_image_cleanup_candidates;
begin
    perform 1 from public.lesson_image_cleanup_settings s join public.lesson_image_cleanup_runs r on r.id=s.active_run
        where s.singleton and s.active_run=run_id and s.lease_until>clock_timestamp() and s.enabled and not r.dry_run for share of s;
    if not found then raise exception 'cleanup_not_enabled_or_expired'; end if;
    select * into item from public.lesson_image_cleanup_candidates where object_id=target_object for update;
    if not found or item.state='deleted' then return null; end if;
    if item.state='pending' and item.first_seen_at>=clock_timestamp()-interval '14 days' then return null; end if;
    -- This separate statement runs after the candidate lock. Concurrent reference
    -- writers either commit before this check or see the deleting tombstone.
    if public.lesson_image_is_referenced(item.name) then
        if item.state='pending' then delete from public.lesson_image_cleanup_candidates where object_id=target_object; end if;
        return null;
    end if;
    if not exists(select 1 from storage.objects where id=target_object and bucket_id='lesson-images' and name=item.name and created_at<clock_timestamp()-interval '30 days') then
        -- Never delete a replacement file with the same name and a new object id.
        if exists(select 1 from storage.objects where bucket_id='lesson-images' and name=item.name) then return null; end if;
        if item.state='deleting' then update public.lesson_image_cleanup_candidates set state='deleted',deleted_at=clock_timestamp() where object_id=target_object; end if;
        return null;
    end if;
    update public.lesson_image_cleanup_candidates set state='deleting' where object_id=target_object;
    return item.name;
end $$;

create function public.finish_lesson_image_cleanup(run_id uuid, target_object uuid default null, summary jsonb default null)
returns void language plpgsql security definer set search_path='' as $$
begin
    perform 1 from public.lesson_image_cleanup_settings where singleton and active_run=run_id and lease_until>clock_timestamp() for update;
    if not found then raise exception 'cleanup_expired'; end if;
    if target_object is not null then
        if exists(select 1 from storage.objects where id=target_object) then raise exception 'deletion_not_confirmed'; end if;
        update public.lesson_image_cleanup_candidates set state='deleted',deleted_at=clock_timestamp() where object_id=target_object and state='deleting';
    else
        update public.lesson_image_cleanup_runs set finished_at=clock_timestamp(),result=coalesce(summary,'{}'::jsonb) where id=run_id;
        update public.lesson_image_cleanup_settings set active_run=null,lease_until=null where singleton;
    end if;
end $$;

revoke all on function public.lesson_image_uuid(text),public.lesson_image_is_referenced(text),public.guard_lesson_image_references(),public.protect_lesson_image_draft(text,text[]),public.begin_lesson_image_cleanup(text,boolean,text[]),public.claim_lesson_image_cleanup(uuid,uuid),public.finish_lesson_image_cleanup(uuid,uuid,jsonb) from public,anon,authenticated;
grant execute on function public.protect_lesson_image_draft(text,text[]) to authenticated;
grant execute on function public.begin_lesson_image_cleanup(text,boolean,text[]),public.claim_lesson_image_cleanup(uuid,uuid),public.finish_lesson_image_cleanup(uuid,uuid,jsonb) to service_role;
commit;
