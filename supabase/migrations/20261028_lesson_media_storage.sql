insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
    'lesson-media',
    'lesson-media',
    true,
    104857600,
    array['video/mp4', 'video/webm', 'audio/mpeg', 'audio/mp4', 'audio/x-m4a', 'audio/wav', 'audio/x-wav', 'audio/wave', 'audio/ogg']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Lesson editors upload lesson media" on storage.objects;
create policy "Lesson editors upload lesson media"
    on storage.objects for insert to authenticated
    with check (bucket_id = 'lesson-media' and public.can_edit_lessons());
