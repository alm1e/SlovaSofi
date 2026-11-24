# Browser UI checks

On Windows with Brave installed, run `node tests/browser/run.cjs`. Set `QA_BROWSER` to another Chromium executable if needed. This launches a separate headless profile and checks the teacher, student and five public pages (including responsive layouts). Results and generated fixtures are written under the ignored `artifacts/private-backups/browser-qa/` directory. Exit status is nonzero on failure. It uses the built-in Node WebSocket API and does not require an npm install.

Run `python3 tests/browser/build.py` from the repository root. Open the printed local file URLs in a browser. Click the QA button on the teacher and student pages; the public-page checks start automatically. Reports list every passed/failed scenario.

The builder uses the current production HTML, CSS and JS, removes authentication startup and backend scripts from generated copies, and injects disposable lesson fixtures. Teacher persistence is in memory; student API replies are simulated. It does not access the school's database. Files are generated under `/tmp/slovasofi-ui-qa` by default; an optional output directory can be supplied.

These checks cover DOM behavior and layout in a real browser. They do not validate real login, storage uploads, microphone recording, network persistence or actual media playback. Audio control tests simulate playback time and duration.

Mobile block coverage uses all 21 creation types plus picture gaps, grouped questions, the legacy phrase list and notes. It builds student presentation with the production `student-lessons` formatter and checks teacher preview/editing and student view at 320, 360, 390, 430 and 768 CSS pixels in both themes with touch emulation. The fixtures use long instructions and words, multi-column tables and portrait images. Tables may scroll inside their own wrapper; exercises must not widen the page. Screenshots of words, photos and tables at 390px are written to `artifacts/private-backups/browser-qa/mobile-*.png`.

To focus a layout check, use `QA_PAGES=mobile-teacher,mobile-student QA_WIDTHS=320,390` with the browser runner (and `QA_BROWSER` for the installed Chromium path). Photo recognition is stubbed only in these layout fixtures; its own real-pixel checks remain in `photo-ui.js`. These are Chromium viewport/touch checks, not a substitute for a physical iOS/Safari test.

The generator also creates `improvements.html` (teacher) and `student-improvements.html` for lesson controls, undo/redo, readiness checks, graphical rows/markers, incremental live updates and save status. These run automatically across 360×800, 390×844, 768×1024, 820×1180, 1024×768, 1180×820, 1366×768 and 1920×1080 browser frames. They check responsive layout, not physical devices or mobile Safari.
