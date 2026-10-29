The shared `assets/js/locales.js` dictionary provides Slovak (`sk`) and Kazakh (`kk`) translations for the existing English UI copy. Existing Ukrainian (`ua`), Russian (`ru`) and English (`en`) tables remain the source of UI keys. `SlovaI18n.locales(table)` exposes the new languages using the same keys, including labels added with `Object.assign` during initialization. Lesson text and user data never pass through this translator.

`locale-source.json` and `locales.tsv` have matching row order. TSV columns contain Slovak and Kazakh. `locale-extras.tsv` contains English, Slovak and Kazakh for messages outside locale tables. Literal `\n` represents a newline.

Regenerate the shared file with `node --expose-internals tools/build-locales.cjs`. The script also connects locale tables and adds the language choices to pages. It is safe to rerun. Add new UI messages to the translation sources before regenerating.

Run `node --test assets/js/*.test.js` to check coverage, interpolation tokens, page loading order and activity compatibility.

Cloud backup preparation is documented in [BACKUPS_QUICK_START.md](../docs/BACKUPS_QUICK_START.md) and [BACKUPS.md](../docs/BACKUPS.md). Run `node --test tools/backups/*.test.cjs` for export, validation, failure and retention tests. Set `BACKUP_RESTIC_BINARY` to an installed restic executable to include a real encrypted local restore test. `node tools/backups/prepare.cjs` creates a credential-free setup package for a separate private automation repository. No backup schedule is enabled by these local files alone.

For manual backups without R2 API keys or GitHub Actions, run `powershell -NoProfile -File .\tools\backups\manual-backup.ps1` on Windows with Docker Desktop running. The script prompts for Supabase credentials and an encryption password, creates and verifies a local encrypted restic archive, and prints its path for manual upload through the private R2 dashboard. It does not upload anything. See the quick start for download verification and recovery.
