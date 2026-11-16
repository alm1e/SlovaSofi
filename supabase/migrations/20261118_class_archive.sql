begin;
set local lock_timeout = '5s';
-- Archive is metadata only. Keep memberships, assignments and progress intact.
-- Existing teacher_classes RLS still governs viewing and updates.
alter table public.teacher_classes add column if not exists archived_at timestamptz;
commit;
