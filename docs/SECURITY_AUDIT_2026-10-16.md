# Security audit — 2026-10-16

Scope: main commit 757f8d544aadcee9250645d47dfc459033bfb434, the live Supabase
database, deployed function metadata/sources, and the static frontend. PR #1 is
merged. This is a source/configuration review with targeted regression checks,
not a guarantee that no vulnerability exists or a full penetration test.

## Confirmed issues addressed

1. **Medium: persistent teacher data and stale permissions in the browser.**
   Workspace snapshots included rosters, email addresses, lesson answers and
   permission flags. They survived logout and were displayed before refreshing
   authorization. Remove workspace persistence, delete legacy workspace keys,
   begin with empty data/permissions, and reject student workspace loads before
   table queries. Language preferences and Supabase authentication storage remain.
   Previously downloaded information cannot be remotely recalled from old copies.
2. **Defense in depth: excessive database table privileges.** Anonymous roles had
   grants on three tables although no policy allowed anonymous data access.
   Authenticated roles had TRUNCATE, REFERENCES, TRIGGER and MAINTAIN on seven
   tables. RLS does not protect table-wide operations. No callable arbitrary-SQL
   RPC or ordinary REST TRUNCATE path was found; this is not a claim that anonymous
   visitors could truncate through PostgREST. Migration 20261024 removes unused
   privileges, preserving authenticated DML and profile column UPDATE grants.
3. Password-recovery navigation now goes through login's database-role routing,
   rather than user-editable metadata. Teacher previews no longer accept file URLs.

## Verified controls

- All nine public tables have RLS enabled. Policies bind teachers to their own
  classes and students to their membership. Profile role is not client-updatable.
- Direct student reads of answer-bearing lesson rows and direct student progress
  writes remain blocked; the Edge Function authorizes membership/assignment and
  computes correctness server-side.
- All seven public functions have fixed empty search_path. Six intentional
  authenticated SECURITY DEFINER helpers use auth.uid()/trusted profile data.
  The signup trigger has no anon/authenticated EXECUTE. The student directory
  has no client grants or policies and is accessed through authorized functions.
- All three Edge Functions are ACTIVE with verify_jwt=true, check getUser(),
  authorize roles and ownership, and keep service credentials server-side.
  Their deployed versions are unchanged since the previous verified comparison.
- No Storage buckets exist; storage tables have RLS. No public views were found.
  Public-schema Realtime publishes only student_lesson_progress, with RLS.
- Reviewed HTML rendering escapes student/profile/lesson text. Note-rendering
  regression includes hostile script, image and SVG input. No eval/new Function
  or raw user HTML execution was found in the reviewed rendering paths.
- Pattern scanning 142 reachable text blobs in the cloned Git history found no
  private keys, known secret-token formats, or service-role JWTs. The browser
  uses a publishable key, which is designed to be public. Pattern scanning cannot
  prove absence of every possible secret or inspect inaccessible/deleted history.
- Seven JavaScript tests and syntax checks pass. SQL authorization and grant
  regressions are included; fixture tests roll back and do not send emails.

## Remaining risks and unverified settings

- **MFA:** no enrolled Auth MFA factors were found. Add MFA for administrators
  and teachers, with an enrollment/recovery flow before requiring aal2 in RLS.
  Enforcing it immediately would lock out the current staff.
- **Leaked-password protection:** still disabled according to the security advisor.
  Enable in Auth settings, subject to the project's available plan/features.
- **Supply chain/browser hardening:** Supabase imports use mutable @2 in the
  browser and Edge Functions. Browser CDN scripts lack SRI; HTML has no CSP.
  Pin/test exact versions and integrity hashes; introduce a tested CSP. Pages
  hosting needs a proxy or alternate host for custom response headers including
  frame-ancestors. Do not treat a meta frame-ancestors as effective protection.
- **Concurrency/integrity:** workspace saves are multiple REST requests. Student
  progress uses read/modify/upsert and can lose concurrent answers from different
  tabs. Use transactional/versioned operations before promising multi-tab safety.
- **Abuse protection:** no application-level per-user rate limit was found for
  invitations or submissions. Auth/platform limits were not independently verified.
- **Enrollment:** teacher-owned roster writes allow setting linked_user_id through
  REST; the directory restriction in invite-student is not itself a database rule.
  Decide whether teachers may enroll any known student ID or only directory members
  before tightening this, to avoid breaking established enrollment workflows.
- Full signed-in browser flows, email delivery, CAPTCHA, SMTP, Auth redirect
  allowlists, token/session settings, organization MFA, backups/PITR, database
  network restrictions and GitHub branch protections were not fully verified
  with the available access. No load/DoS testing or destructive probes were run.

References:
- https://www.postgresql.org/docs/current/ddl-rowsecurity.html
- https://supabase.com/docs/guides/api/securing-your-api
- https://supabase.com/docs/guides/database/database-linter?lint=0029_authenticated_security_definer_function_executable
- https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy
- https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection
