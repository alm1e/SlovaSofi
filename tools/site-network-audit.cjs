// Read-only reachability checks; uses no credentials or student accounts.
const fs=require('node:fs');
const lessons=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const urls=[...new Set(JSON.stringify(lessons).match(/https:\/\/[^\s"<>\\)\]]+/g)||[])];
const base='https://alm1e.github.io/SlovaSofi/';
urls.push(...['index.html','login.html','register.html','reset-password.html','teacher.html','student.html','teacher-setup.html'].map(p=>base+p));
async function check(url){try{const r=await fetch(url,{method:'HEAD',signal:AbortSignal.timeout(8000)});return {url,status:r.status,ok:r.ok,type:r.headers.get('content-type')};}catch(e){return{url,ok:false,error:e.cause?.code||e.name};}}
(async()=>{const results=[];let cursor=0;await Promise.all(Array.from({length:8},async()=>{while(cursor<urls.length){const url=urls[cursor++];results.push(await check(url));}}));
fs.writeFileSync('artifacts/private-backups/network-audit-2026-11-06.json',JSON.stringify(results,null,2));console.log(JSON.stringify({checked:results.length,failures:results.filter(r=>!r.ok)},null,2));})();
