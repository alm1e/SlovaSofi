The shared `assets/js/locales.js` dictionary provides Slovak (`sk`) and Kazakh (`kk`) translations for the existing English UI copy. Existing Ukrainian (`ua`), Russian (`ru`) and English (`en`) tables remain the source of UI keys. `SlovaI18n.locales(table)` exposes the new languages using the same keys, including labels added with `Object.assign` during initialization. Lesson text and user data never pass through this translator.

`locale-source.json` and `locales.tsv` have matching row order. TSV columns contain Slovak and Kazakh. `locale-extras.tsv` contains English, Slovak and Kazakh for messages outside locale tables. Literal `\n` represents a newline.

Regenerate the shared file with `node --expose-internals tools/build-locales.cjs`. The script also connects locale tables and adds the language choices to pages. It is safe to rerun. Add new UI messages to the translation sources before regenerating.

Run `node --test assets/js/*.test.js` to check coverage, interpolation tokens, page loading order and activity compatibility.
