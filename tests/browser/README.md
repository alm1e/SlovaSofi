# Browser UI checks

On Windows with Brave installed, run `node tests/browser/run.cjs`. Set `QA_BROWSER` to another Chromium executable if needed. This launches a separate headless profile and checks the teacher, student and five public pages (including responsive layouts). Results and generated fixtures are written under the ignored `artifacts/private-backups/browser-qa/` directory. Exit status is nonzero on failure. It uses the built-in Node WebSocket API and does not require an npm install.

Run `python3 tests/browser/build.py` from the repository root. Open the printed local file URLs in a browser. Click the QA button on the teacher and student pages; the public-page checks start automatically. Reports list every passed/failed scenario.

The builder uses the current production HTML, CSS and JS, removes authentication startup and backend scripts from generated copies, and injects disposable lesson fixtures. Teacher persistence is in memory; student API replies are simulated. It does not access the school's database. Files are generated under `/tmp/slovasofi-ui-qa` by default; an optional output directory can be supplied.

These checks cover DOM behavior and layout in a real browser. They do not validate real login, storage uploads, microphone recording, network persistence or actual media playback. Audio control tests simulate playback time and duration.
