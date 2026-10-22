"""Build isolated browser checks against current UI code. No school API is loaded.
Run: python3 tests/browser/build.py [output-directory]
Then open the printed teacher.html file and click the QA button.
"""
from pathlib import Path
import json
import re
import sys

root = Path(__file__).resolve().parents[2]
output = Path(sys.argv[1] if len(sys.argv) > 1 else '/tmp/slovasofi-ui-qa').resolve()
output.mkdir(parents=True, exist_ok=True)
source = (root / 'assets/js/teacher.js').read_text()
startup = 'loadCurrentUser().catch((error) => {\n    console.error("Failed to load current user:", error);\n});'
assert startup in source, 'Teacher startup changed; update QA isolation before running.'
source = source.replace(startup, '')
source += (root / 'tests/browser/teacher-fixture.js').read_text()
(output / 'teacher-fixture.js').write_text(source)
html = (root / 'teacher.html').read_text()
html = re.sub(r'<script src="[^\"]*(?:supabase|teacher-data)[^\"]*"></script>', '', html)
html = html.replace('src="assets/js/teacher.js"', f'src="{(output / "teacher-fixture.js").as_uri()}"')
html = html.replace('href="assets/', f'href="{root.as_uri()}/assets/').replace('src="assets/', f'src="{root.as_uri()}/assets/')
html = html.replace('</body>', '<pre id="qa-log" style="position:fixed;bottom:0;left:0;z-index:99999;background:#111;color:#fff;font-size:11px;max-height:80px;overflow:auto">LOCAL QA — no school API</pre></body>')
child = html.replace('</body>', "<script>openLessonEditor(data.lessons[0],'qa-intro',0);</script></body>")
suite = (root / 'tests/browser/teacher-ui.js').read_text().replace('__QA_CHILD_HTML__', json.dumps(child))
(output / 'teacher-ui.js').write_text(suite)
button = f'''<button style="position:fixed;top:0;right:0;z-index:99999" onclick="this.remove();let s=document.createElement('script');s.src='{(output / 'teacher-ui.js').as_uri()}';document.body.append(s)">Запустить QA проверки</button>'''
(output / 'teacher.html').write_text(html.replace('</body>', button + '</body>'))
print((output / 'teacher.html').as_uri())

student = (root / 'assets/js/student.js').read_text()
startup = 'start().catch((error) => {\n        console.error("Could not start the student dashboard.", error);\n        showError(text("loadError"), error);\n    });'
assert startup in student, 'Student startup changed; update QA isolation.'
student = student.replace(startup, (root / 'tests/browser/student-ui.js').read_text())
start = student.index('    async function invokeLessonApi(payload) {')
end = student.index('    function responseForActivity(', start)
student = student[:start] + '''    async function invokeLessonApi(payload) {
        qaRequests.push(structuredClone(payload));
        return { answers: {}, completed: false, correct: true, reviewRequired: typeof payload.response === 'object' && !Array.isArray(payload.response) };
    }

''' + student[end:]
(output / 'student-fixture.js').write_text(student)
html = (root / 'student.html').read_text()
html = re.sub(r'<script src="[^\"]*(?:supabase)[^\"]*"></script>', '', html)
html = html.replace('src="assets/js/student.js"', f'src="{(output / "student-fixture.js").as_uri()}"')
html = html.replace('href="assets/', f'href="{root.as_uri()}/assets/').replace('src="assets/', f'src="{root.as_uri()}/assets/')
(output / 'student.html').write_text(html)
print((output / 'student.html').as_uri())

for name, width, height in [('wide', 1200, 600), ('tall', 600, 1200)]:
    (output / f'{name}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}"><rect width="100%" height="100%" fill="#f4d35e"/><rect x="5" y="5" width="{width-10}" height="{height-10}" fill="none" stroke="#168653" stroke-width="10"/><text x="30" y="80" font-size="50">{name}</text></svg>')

pages = {}
for name in ['index.html', 'login.html', 'register.html', 'reset-password.html', 'teacher-setup.html']:
    html = (root / name).read_text()
    html = re.sub(r'<script src="[^\"]*supabase[^\"]*"></script>', '', html)
    html = html.replace('href="assets/', f'href="{root.as_uri()}/assets/').replace('src="assets/', f'src="{root.as_uri()}/assets/')
    pages[name] = html
public_script = '''
const pages = __PAGES__;
const results = [];
const report = document.querySelector('#report');
const assert = (value,message) => {if (!value) throw Error(message);};
const run = async (name,fn) => {try {await fn();results.push('PASS '+name);}catch(e){results.push('FAIL '+name+' — '+e.message);}const p=document.createElement('p');p.textContent=results.at(-1);report.append(p);};
(async()=>{
for (const [name,html] of Object.entries(pages)) {
 for(const width of [360,768,1440]) await run(name+' · ширина '+width,async()=>{
 const f=document.createElement('iframe');f.style='width:'+width+'px;height:900px;border:0;position:fixed;inset:0;z-index:10';
 const loaded=new Promise(resolve=>f.onload=resolve);f.srcdoc=html;document.body.append(f);await loaded;
 await new Promise(resolve=>f.contentWindow.requestAnimationFrame(()=>f.contentWindow.requestAnimationFrame(resolve)));
 try {const d=f.contentDocument;assert(d.querySelector('h1'),'Нет заголовка');assert(d.documentElement.scrollWidth<=width+1,'Страница шире экрана: '+d.documentElement.scrollWidth);
 for(const lang of ['ua','ru','en']){d.querySelector('[data-lang="'+lang+'"]')?.click();assert(!d.body.textContent.includes('undefined'),'Пропавший перевод');}
 const theme=d.querySelector('[data-theme-toggle]');if(theme){const before=d.documentElement.dataset.theme;theme.click();assert(d.documentElement.dataset.theme!==before,'Тема не переключилась');theme.click();}
 const form=d.querySelector('form');if(form&&form.querySelector('[required]')&&!form.hidden)assert(!form.checkValidity(),'Пустая форма считается заполненной');
 } finally {f.remove();}
 });
}
const p=document.createElement('p');p.textContent='TOTAL '+results.length+'; FAIL '+results.filter(x=>x.startsWith('FAIL')).length;report.append(p);
})();
'''.replace('__PAGES__', json.dumps(pages))
(output / 'public-ui.js').write_text(public_script)
(output / 'public.html').write_text(f'<meta charset="utf-8"><style>body{{background:#0f191e;color:#dff5e7;font:16px Arial}}p{{margin:8px}}</style><div id="report"></div><script src="{(output / "public-ui.js").as_uri()}"></script>')
print((output / 'public.html').as_uri())
