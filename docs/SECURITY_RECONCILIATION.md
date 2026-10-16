# Access and migration reconciliation

Production was inspected on 2026-10-16, at repository base
`7790eec3e9db064fee26c63727b2929ad6e0f892`.

- Production already has versions 20261014 through 20261022. These are version
  identifiers, despite being later than the inspection date.
- 20261021 is **lock_student_direct_access**, not the trigger EXECUTE revocation.
  Its repository file is restored to the applied SQL's semantics. Do not rerun
  it or mark it reverted in production.
- The trigger EXECUTE revocation belongs to the pending 20261023 migration.
- 20261023 removes the obsolete teacher_materials index, tightens SELECT and
  management policies, requires a teacher role for editor grants, and revokes
  client EXECUTE on the signup trigger function. It changes no application rows.
- Apply 20261023 once in a transaction. Lock timeout is 5 seconds and statement
  timeout 60 seconds. A lock timeout must abort, not leave partial changes.
- If the management API assigns a timestamp version, reconcile that exact new
  history entry to 20261023 only after checking its name and stored SQL. Preserve
  all earlier entries. Never mark an unapplied migration as applied.

## Authorization model

`teacher-editor` means `profiles.role = 'teacher'` plus a row in
`teacher_lesson_editors`; it is not a fourth profile role. Administrators can
edit all lessons. Other teachers can view/assign shared lessons, manage only
their own classes, and cannot edit lessons. Students read their own memberships
and assignments; lesson content and progress writes go through student-lessons,
which validates the authenticated profile, membership, assignment, and answers.
Direct lesson SELECT stays closed to students because it contains answer keys.

The authenticated SECURITY DEFINER helpers intentionally support RLS and the
workspace UI. They use an empty search_path and derive identity from auth.uid().
Do not revoke their authenticated EXECUTE just to silence an advisor warning.
teacher_student_directory is deliberately service-role-only with RLS and no
client policies; invite-student checks the caller and filters by teacher.
The signup trigger remains SECURITY DEFINER but is not a client RPC.

## Verification

Run `node --test assets/js/teacher-data.test.js` and syntax-check assets/js/*.js.
Run supabase/tests/access-regression.sql as postgres: it creates synthetic
fixtures inside a transaction, tests signup, student isolation, role escalation,
teacher ownership, editor permission, administrator visibility, and rename
preservation, then rolls everything back. It sends no invitations.

All three deployed Edge Function sources matched the repository base. GitHub
Pages deployment for the base commit succeeded. Authenticated browser flows and
email delivery still need a test account; do not use real students as fixtures.

Remaining architectural limitation: workspace persistence uses multiple REST
requests and is not atomic across concurrent tabs. Error recovery now reloads
the server state instead of replaying an old snapshot. A future transactional,
version-checked save API would be needed for complete concurrent-edit protection.
