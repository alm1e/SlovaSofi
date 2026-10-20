insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
    'lesson-media',
    'lesson-media',
    true,
    52428800,
    array['audio/mpeg', 'audio/mp4', 'audio/wav', 'audio/x-wav', 'audio/ogg', 'audio/aac', 'audio/webm', 'video/mp4', 'video/webm', 'video/quicktime']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Lesson editors upload lesson media" on storage.objects;
create policy "Lesson editors upload lesson media"
    on storage.objects for insert to authenticated
    with check (bucket_id = 'lesson-media' and public.can_edit_lessons());
