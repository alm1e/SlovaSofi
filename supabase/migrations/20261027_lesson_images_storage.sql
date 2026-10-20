insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('lesson-images', 'lesson-images', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Lesson editors upload lesson images" on storage.objects;
create policy "Lesson editors upload lesson images"
    on storage.objects for insert to authenticated
    with check (bucket_id = 'lesson-images' and public.can_edit_lessons());
