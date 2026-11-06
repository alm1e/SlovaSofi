// Runs isolated production UI fixtures in an installed Chromium browser.
const fs=require('node:fs'),path=require('node:path'),{pathToFileURL}=require('node:url'),{spawn}=require('node:child_process');
const root=path.resolve(__dirname,'../..'),out=path.join(root,'artifacts/private-backups/browser-qa');
fs.mkdirSync(out,{recursive:true});
for(const [name,width,height] of [['wide',1200,600],['tall',600,1200]])fs.writeFileSync(path.join(out,name+'.svg'),`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="#f4d35e"/><circle cx="100" cy="100" r="60" fill="#168653"/></svg>`);
const read=name=>fs.readFileSync(path.join(root,name),'utf8'),write=(name,text)=>fs.writeFileSync(path.join(out,name),text),url=name=>pathToFileURL(path.join(out,name)).href;
function isolate(name){return read(name).replace(/<script src="[^"]*(?:supabase|teacher-data)[^"]*"><\/script>/g,'').replaceAll('href="assets/',`href="${pathToFileURL(root).href}/assets/`).replaceAll('src="assets/',`src="${pathToFileURL(root).href}/assets/`);}
let teacher=read('assets/js/teacher.js');
const teacherStart='loadCurrentUser().catch((error) => {\n    console.error("Failed to load current user:", error);\n});';
if(!teacher.includes(teacherStart))throw Error('Teacher startup changed');
teacher=teacher.replace(teacherStart,'')+read('tests/browser/teacher-fixture.js');write('teacher-fixture.js',teacher);
let html=isolate('teacher.html').replace(/src="[^"]*\/assets\/js\/teacher.js"/,`src="${url('teacher-fixture.js')}"`);
html=html.replace('</body>','<pre id="qa-log"></pre></body>');
const child=html.replace('</body>',"<script>openLessonEditor(data.lessons[0],'qa-intro',0);</script></body>");
write('teacher-ui.js',read('tests/browser/teacher-ui.js').replace('__QA_CHILD_HTML__',JSON.stringify(child)));
write('teacher.html',html.replace('</body>',`<script src="${url('teacher-ui.js')}"></script></body>`));
let student=read('assets/js/student.js');
const studentStart='start().catch((error) => {\n        console.error("Could not start the student dashboard.", error);\n        showError(text("loadError"), error);\n    });';
if(!student.includes(studentStart))throw Error('Student startup changed');
student=student.replace(studentStart,read('tests/browser/student-ui.js'));
const start=student.indexOf('    async function invokeLessonApi(payload) {'),end=student.indexOf('    function responseForActivity(',start);
student=student.slice(0,start)+`    async function invokeLessonApi(payload) {qaRequests.push(structuredClone(payload));return {answers:{},completed:false,correct:true,reviewRequired:typeof payload.response==='object'&&!Array.isArray(payload.response)};}\n`+student.slice(end);
write('student-fixture.js',student);write('student.html',isolate('student.html').replace(/src="[^"]*\/assets\/js\/student.js"/,`src="${url('student-fixture.js')}"`));
const publicPages=Object.fromEntries(['index.html','login.html','register.html','reset-password.html','teacher-setup.html'].map(name=>[name,isolate(name)]));
write('public.html',`<meta charset="utf-8"><div id="qa-report"></div><script>
const pages=${JSON.stringify(publicPages).replace(/</g,'\\u003c')},results=[],report=document.querySelector('#qa-report');
(async()=>{for(const [name,html]of Object.entries(pages))for(const width of [360,768,1440]){
 const frame=document.createElement('iframe');frame.style='position:fixed;inset:0;width:'+width+'px;height:900px;border:0';
 const loaded=new Promise(r=>frame.onload=r);frame.srcdoc=html;document.body.append(frame);await loaded;
 await new Promise(r=>frame.contentWindow.requestAnimationFrame(()=>frame.contentWindow.requestAnimationFrame(r)));
 try{const d=frame.contentDocument;if(!d.querySelector('h1'))throw Error('Missing title');if(d.documentElement.scrollWidth>d.documentElement.clientWidth+1)throw Error('Horizontal overflow');
 for(const lang of ['ua','ru','en','sk','kk']){d.querySelector('[data-lang="'+lang+'"]')?.click();if(d.body.textContent.includes('undefined'))throw Error('Missing translation');}
 const toggle=d.querySelector('[data-theme-toggle]');if(toggle){const before=d.documentElement.dataset.theme;toggle.click();if(d.documentElement.dataset.theme===before)throw Error('Theme did not change');}
 results.push('PASS '+name+' '+width);}catch(e){results.push('FAIL '+name+' '+width+' '+e.message);}finally{frame.remove();}
}report.innerText=results.join('\\n')+'\\nTOTAL '+results.length+'; FAIL '+results.filter(r=>r.startsWith('FAIL')).length;})();</script>`);
const browser=process.env.QA_BROWSER||'C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe';
const port=19346,proc=spawn(browser,['--headless=new','--no-first-run','--no-default-browser-check','--disable-gpu','--allow-file-access-from-files',`--remote-debugging-port=${port}`,`--user-data-dir=${path.join(out,'profile')}`],{stdio:'ignore',windowsHide:true});
const delay=ms=>new Promise(r=>setTimeout(r,ms));
let seq=0,ws,pending=new Map();
async function send(method,params={}){const id=++seq;return new Promise((resolve,reject)=>{const timer=setTimeout(()=>{pending.delete(id);reject(Error('CDP timeout: '+method));},15000);pending.set(id,{resolve:r=>{clearTimeout(timer);resolve(r);},reject:e=>{clearTimeout(timer);reject(e);}});ws.send(JSON.stringify({id,method,params}));});}
async function evaluate(expression){const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;}
const keepAlive=setInterval(()=>{},1000);
(async()=>{try{
 let tabs;for(let i=0;i<100;i++){try{tabs=await(await fetch(`http://127.0.0.1:${port}/json`)).json();break;}catch{await delay(100);}}
 if(!tabs)throw Error('Browser did not start');
 ws=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise((r,j)=>{ws.onopen=r;ws.onerror=j;});
 ws.onmessage=e=>{const r=JSON.parse(e.data),p=pending.get(r.id);if(p){pending.delete(r.id);r.error?p.reject(Error(r.error.message)):p.resolve(r.result);}};
 await send('Page.enable');
 const reports=[];
 for(const name of ['teacher','student','public']){
  await send('Page.navigate',{url:url(name+'.html')});
  if(name==='student'){for(let i=0;i<100;i++){if(await evaluate("!![...document.querySelectorAll('button')].find(b=>b.textContent.includes('QA'))"))break;await delay(100);}await evaluate("[...document.querySelectorAll('button')].find(b=>b.textContent.includes('QA')).click()");}
  let result='';for(let i=0;i<300;i++){result=await evaluate("document.body?.innerText||''");if(/TOTAL \d+; FAIL \d+/.test(result))break;await delay(100);}
  const report=await evaluate("document.querySelector('#qa-report')?.innerText||''");
  const lines=(report||result).split('\n').filter(l=>/^(PASS |FAIL |TOTAL )/.test(l));reports.push({page:name,lines});console.log(name,lines.filter(l=>/^(FAIL |TOTAL )/.test(l)).join('\n'));if(!lines.some(l=>l.startsWith('TOTAL')))throw Error(name+' checks did not finish');
 }
 fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(reports,null,2));
 if(reports.some(r=>r.lines.some(l=>l.startsWith('FAIL '))))process.exitCode=1;
}finally{clearInterval(keepAlive);ws?.close();proc.kill();}})().catch(e=>{console.error(e);process.exitCode=1;});
