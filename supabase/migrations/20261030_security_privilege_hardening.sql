begin;
set local lock_timeout = '5s';
set local statement_timeout = '30s';
-- RLS governs row access, not TRUNCATE/REFERENCES/TRIGGER. Browser roles
-- need only the existing row-level DML grants. Preserve column UPDATE grants.
revoke all privileges on all tables in schema public from anon;
revoke truncate, references, trigger on all tables in schema public from authenticated;
-- Postgres 17 also exposes MAINTAIN; no browser role needs it.
revoke maintain on all tables in schema public from authenticated;
commit;
