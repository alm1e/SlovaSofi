# Supabase setup

Apply the database migration and deploy both Edge Functions after updating the application:

```sh
supabase db push --dry-run
supabase db push
supabase functions deploy manage-teachers
supabase functions deploy invite-student
```

The role and class-isolation migration makes `akhumanoid@gmail.com` the platform administrator and grants `vikishim11@gmail.com` permission to edit the shared lesson library. Teachers only see and manage their own classes and students; all teachers can view and assign shared lessons, while only the administrator and designated lesson editors can change lesson content.

Set the `APP_URL` function secret to the deployed site's origin (for example, `https://example.com`). The invitation functions also require the standard `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` secrets. The service-role key must remain server-side and must never be added to the browser application.

Add the deployed `teacher.html` and `student.html` URLs to Supabase Auth's allowed redirect URLs so invitation links can return to the correct dashboard.

The migration preserves existing class ownership and lesson records, removes the previous shared-workspace membership table, and enforces access in PostgreSQL row-level security in addition to the dashboard UI.
