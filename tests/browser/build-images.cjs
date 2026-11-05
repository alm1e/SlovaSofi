// node tests/browser/build-images.cjs — isolated real-browser image checks; no school API.
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const root = path.resolve(__dirname, '../..');
const output = path.join(root, 'artifacts/image-upload-qa');
fs.mkdirSync(output, { recursive: true });
let teacher = fs.readFileSync(path.join(root, 'assets/js/teacher.js'), 'utf8');
const startup = 'loadCurrentUser().catch((error) => {\n    console.error("Failed to load current user:", error);\n});';
if (!teacher.includes(startup)) throw Error('Update QA isolation: teacher startup changed');
teacher = teacher.replace(startup, '') + '\n' + fs.readFileSync(path.join(__dirname, 'teacher-fixture.js'), 'utf8');
fs.writeFileSync(path.join(output, 'teacher-fixture.js'), teacher);
let html = fs.readFileSync(path.join(root, 'teacher.html'), 'utf8')
    .replace(/<script src="[^"]*(?:supabase|teacher-data)[^"]*"><\/script>/g, '')
    .replace('src="assets/js/teacher.js"', 'src="teacher-fixture.js"')
    .replaceAll('src="assets/', `src="${pathToFileURL(root).href}/assets/`)
    .replaceAll('href="assets/', `href="${pathToFileURL(root).href}/assets/`);
html = html.replace('</body>', '<pre id="qa-log"></pre><script src="image-checks.js"></script></body>');
fs.writeFileSync(path.join(output, 'teacher.html'), html);
fs.copyFileSync(path.join(__dirname, 'image-checks.js'), path.join(output, 'image-checks.js'));
console.log(pathToFileURL(path.join(output, 'teacher.html')).href);
