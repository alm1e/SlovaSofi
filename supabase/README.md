# Supabase setup

Apply the database migration and deploy both Edge Functions after updating the application:

```sh
supabase db push --dry-run
supabase db push
supabase functions deploy manage-teachers
supabase functions deploy invite-student
supabase functions deploy student-lessons
```

The role and class-isolation migration makes `akhumanoid@gmail.com` the platform administrator and grants `vikishim11@gmail.com` permission to edit the shared lesson library. Teachers only see and manage their own classes and students; all teachers can view and assign shared lessons, while only the administrator and designated lesson editors can change lesson content.

Set the `APP_URL` function secret to the deployed site's origin (for example, `https://example.com`). The Edge Functions also require the standard `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` secrets. The service-role key must remain server-side and must never be added to the browser application.

The student-directory migration backfills existing linked students. Apply it before deploying the updated `invite-student` function; new invitations will then be available to add to another class without sending another email. The `student-lessons` function serves lesson and homework activities and stores student answer drafts and submitted progress. The live-lesson view subscribes to `student_lesson_progress`; the Realtime migration adds that table to Supabase's publication while existing row-level security keeps each teacher's visible progress limited to their classes.

Add the deployed `teacher.html`, `teacher-setup.html`, and `student.html` URLs to Supabase Auth's allowed redirect URLs. Teacher invitation links open the setup page so new teachers can enter their name and create a password before going to the dashboard.

The migration preserves existing class ownership and lesson records, removes the previous shared-workspace membership table, and enforces access in PostgreSQL row-level security in addition to the dashboard UI.

The calendar migrations add free in-app class scheduling with optional lesson links and one-time, daily, every-other-day, weekly, or selected-weekday recurrence. Run `supabase db push` to create the `calendar_events` table and update its recurrence rules; the dashboard will show a setup message if that table is missing. Redeploy `student-lessons` so students receive the selected weekdays with their class schedules. Calendar changes are delivered through Supabase Realtime; reminder sounds play only while the relevant dashboard is open and the browser allows audio. This calendar does not connect to Google Calendar or create Google Meet links.

The lesson-media migration creates public playback storage for teacher-uploaded audio and video files (up to 50 MB); only users allowed to edit lessons can upload to it. Apply the migration with `supabase db push` before using the media upload controls.
