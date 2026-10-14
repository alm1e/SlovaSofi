# Supabase setup

Apply the workspace-sharing migration and deploy both functions after updating the application:

```sh
supabase db push
supabase functions deploy manage-teachers
supabase functions deploy invite-student
```

Set the `APP_URL` function secret to the deployed site's origin (for example, `https://example.com`). The invitation functions also require the standard `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` secrets. The service-role key must remain server-side and must never be added to the browser application.

Add the deployed `teacher.html` URL to Supabase Auth's allowed redirect URLs so invite links can return to the teacher dashboard.

The workspace migration keeps existing teachers as owners of their current classes and lessons. Invited staff use the owner's workspace, with permissions enforced by row-level security as well as by the teacher dashboard.
