# Browser UI checks

Run `python3 tests/browser/build.py` from the repository root. Open the printed local file URLs in a browser. Click the QA button on the teacher and student pages; the public-page checks start automatically. Reports list every passed/failed scenario.

The builder uses the current production HTML, CSS and JS, removes authentication startup and backend scripts from generated copies, and injects disposable lesson fixtures. Teacher persistence is in memory; student API replies are simulated. It does not access the school's database. Files are generated under `/tmp/slovasofi-ui-qa` by default; an optional output directory can be supplied.

These checks cover DOM behavior and layout in a real browser. They do not validate real login, storage uploads, microphone recording, network persistence or actual media playback. Audio control tests simulate playback time and duration.
