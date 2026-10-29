'use strict';
const fs=require('node:fs/promises'),path=require('node:path'),crypto=require('node:crypto');
const {createReadStream,createWriteStream}=require('node:fs'),{Readable,Transform}=require('node:stream'),{pipeline}=require('node:stream/promises'),{spawn}=require('node:child_process');
const {readInventory}=require('./copy-reader.cjs');
const PROJECT='vvrxhiextryjnzpxvals';

function sourceConfig(env=process.env){
    for(const name of ['SUPABASE_DB_URL','SUPABASE_SERVICE_ROLE_KEY','RESTIC_PASSWORD'])if(!env[name])throw Error(`Missing ${name}`);
    const project=env.BACKUP_PROJECT_REF||PROJECT;if(!/^[a-z0-9]{20}$/.test(project))throw Error('Invalid project reference');
    const database=new URL(env.SUPABASE_DB_URL);
    if(!['postgres:','postgresql:'].includes(database.protocol)||!database.password)throw Error('Use a password-protected Postgres connection string');
    if(database.port==='6543')throw Error('Use the session pooler on port 5432, not transaction pooling');
    if(!database.hostname.endsWith('.supabase.com')&&!database.hostname.endsWith('.supabase.co'))throw Error('Unexpected database host');
    if(!database.hostname.includes(project)&&decodeURIComponent(database.username)!==`postgres.${project}`)throw Error('Database and Storage project references differ');
    if(env.RESTIC_PASSWORD.length<32)throw Error('Use a randomly generated backup password of at least 32 characters');
    let claims;try{claims=JSON.parse(Buffer.from(env.SUPABASE_SERVICE_ROLE_KEY.split('.')[1],'base64url').toString('utf8'));}catch{}
    if(claims?.role!=='service_role'||claims.ref&&claims.ref!==project)throw Error('Use the legacy server-only service_role key for this project, not a publishable/anon key');
    const limit=(name,fallback)=>{const value=Number(env[name]||fallback);if(!Number.isSafeInteger(value)||value<1)throw Error(`Invalid ${name}`);return value;};
    return {project,database:env.SUPABASE_DB_URL,url:`https://${project}.supabase.co`,key:env.SUPABASE_SERVICE_ROLE_KEY,password:env.RESTIC_PASSWORD,
        storageLimit:limit('BACKUP_MAX_STORAGE_BYTES',128*1024*1024),cloudLimit:limit('BACKUP_MAX_REPOSITORY_BYTES',8*1024*1024*1024),
        initialize:env.BACKUP_INITIALIZE==='true',retention:env.BACKUP_RETENTION_ENABLED==='true',env:{...env,AWS_DEFAULT_REGION:'auto'}};
}
function config(env=process.env){
    const cfg=sourceConfig(env);
    for(const name of ['RESTIC_REPOSITORY','AWS_ACCESS_KEY_ID','AWS_SECRET_ACCESS_KEY'])if(!env[name])throw Error(`Missing ${name}`);
    const repository=env.RESTIC_REPOSITORY;
    if(!/^s3:https:\/\/[a-f0-9]{32}\.r2\.cloudflarestorage\.com\/[a-z0-9][a-z0-9.-]+\/slovasofi$/.test(repository))throw Error('Use a private Cloudflare R2 bucket with the /slovasofi repository prefix');
    if(env.BACKUP_R2_ACCOUNT_ID&&new URL(repository.slice(3)).hostname!==`${env.BACKUP_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`)throw Error('RESTIC_REPOSITORY Account ID differs from the configured Cloudflare account');
    if(!/^[a-f0-9]{32}$/i.test(env.AWS_ACCESS_KEY_ID))throw Error('R2_ACCESS_KEY_ID must be the 32-character Access Key ID from the R2 token confirmation');
    if(!/^[a-f0-9]{64}$/i.test(env.AWS_SECRET_ACCESS_KEY))throw Error('R2_SECRET_ACCESS_KEY must be the 64-character Secret Access Key from the same R2 token confirmation');
    return {...cfg,repository};
}
function redactor(env){
    const secrets=['SUPABASE_DB_URL','SUPABASE_SERVICE_ROLE_KEY','RESTIC_PASSWORD','AWS_ACCESS_KEY_ID','AWS_SECRET_ACCESS_KEY'].map(key=>env[key]).filter(Boolean);
    try{const password=new URL(env.SUPABASE_DB_URL).password;if(password)secrets.push(password,decodeURIComponent(password));}catch{}
    return text=>secrets.sort((a,b)=>b.length-a.length).reduce((value,secret)=>value.split(secret).join('[REDACTED]'),String(text)).replace(/postgres(?:ql)?:\/\/\S+/g,'[REDACTED DATABASE URL]');
}
function command(file,args,{cwd,env=process.env}={}){
    return new Promise((resolve,reject)=>{
        const child=spawn(file,args,{cwd,env,shell:false,windowsHide:true,stdio:['ignore','pipe','pipe']});let output='',error='';
        child.stdout.on('data',chunk=>{output+=chunk;if(output.length>16*1024*1024)child.kill();});
        child.stderr.on('data',chunk=>{error=(error+chunk).slice(-8192);});
        child.on('error',()=>reject(Error(`Could not start ${file}. Check that the required tool is installed.`)));
        child.on('close',code=>code===0?resolve(output):reject(Error(`${file} failed (${code}): ${redactor(env)(error).trim()}`)));
    });
}
async function digest(filename){const hash=crypto.createHash('sha256');let size=0;for await(const chunk of createReadStream(filename)){hash.update(chunk);size+=chunk.length;}return {sha256:hash.digest('hex'),size};}
function objectUrl(base,object){return `${base}/storage/v1/object/authenticated/${encodeURIComponent(object.bucket)}/${object.name.split('/').map(encodeURIComponent).join('/')}`;}
async function downloadObject(cfg,object,stage,{fetcher=fetch,sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms))}={}){
    const relative=`storage/${crypto.createHash('sha256').update(JSON.stringify([object.bucket,object.name])).digest('hex')}.bin`,filename=path.join(stage,relative);
    await fs.mkdir(path.dirname(filename),{recursive:true,mode:0o700});
    for(let attempt=0;attempt<3;attempt++){
        let response;
        try{response=await fetcher(objectUrl(cfg.url,object),{headers:{apikey:cfg.key,Authorization:`Bearer ${cfg.key}`},redirect:'error',signal:AbortSignal.timeout(180000)});}catch{if(attempt<2){await sleep(1000*2**attempt);continue;}throw Error('Storage connection failed; no new backup will be marked successful');}
        if(response.status===429||response.status>=500){await response.body?.cancel();if(attempt<2){await sleep(1000*2**attempt);continue;}}
        if(!response.ok||!response.body)throw Error(`Storage download failed (${response.status}); retry after checking the source files`);
        const expected=String(object.metadata.eTag||object.metadata.etag||'').replace(/^"|"$/g,''),received=String(response.headers.get('etag')||'').replace(/^"|"$/g,'');
        if(expected&&received&&expected!==received){await response.body.cancel();throw Error('Storage object changed after the database snapshot');}
        let bytes=0;const hash=crypto.createHash('sha256'),guard=new Transform({transform(chunk,encoding,done){bytes+=chunk.length;if(bytes>cfg.storageLimit||bytes>object.size)return done(Error('Storage object exceeded its recorded size'));hash.update(chunk);done(null,chunk);}});
        await pipeline(Readable.fromWeb(response.body),guard,createWriteStream(filename,{flags:'wx',mode:0o600}));
        if(bytes!==object.size)throw Error('Storage object size does not match the database snapshot');
        return {...object,file:relative,size:bytes,sha256:hash.digest('hex')};
    }
    throw Error('Storage download failed');
}
async function verifyStage(stage){
    const root=path.resolve(stage),manifest=JSON.parse(await fs.readFile(path.join(root,'manifest.json'),'utf8'));
    if(manifest.format!==1||!Array.isArray(manifest.files)||!Array.isArray(manifest.objects))throw Error('Invalid backup manifest');
    const paths=new Set();
    for(const entry of [...manifest.files,...manifest.objects]){
        if(typeof entry.file!=='string'||!['database/roles.sql','database/schema.sql','database/data.sql','source.tar.gz'].includes(entry.file)&&!/^storage\/[a-f0-9]{64}\.bin$/.test(entry.file))throw Error('Unsafe manifest path');
        if(paths.has(entry.file))throw Error('Duplicate manifest file');paths.add(entry.file);
        const filename=path.resolve(root,entry.file);if(!filename.startsWith(root+path.sep)||(await fs.lstat(filename)).isSymbolicLink())throw Error('Unsafe backup file');
        const actual=await digest(filename);if(actual.size!==entry.size||actual.sha256!==entry.sha256)throw Error('Backup file checksum mismatch');
    }
    for(const name of ['database/roles.sql','database/schema.sql','database/data.sql','source.tar.gz'])if(!paths.has(name))throw Error(`Missing backup file ${name}`);
    const inventory=await readInventory(path.join(root,'database/data.sql'));
    if(JSON.stringify(inventory.counts)!==JSON.stringify(manifest.tableRows)||inventory.objects.length!==manifest.objects.length)throw Error('Backup inventory mismatch');
    const byPath=new Map(manifest.objects.map(object=>[JSON.stringify([object.bucket,object.name]),object]));
    for(const object of inventory.objects)if(byPath.get(JSON.stringify([object.bucket,object.name]))?.size!==object.size)throw Error('Backup Storage inventory mismatch');
    return {tables:Object.keys(inventory.counts).length,objects:manifest.objects.length,files:paths.size};
}
async function backup(cfg,{run=command,fetcher=fetch,stage,source=path.resolve(__dirname,'../..'),now=new Date(),log=console.log}={}){
    if(!stage)throw Error('A new staging directory is required');
    // Never clean an arbitrary directory. A nonempty destination fails before any database request.
    await fs.mkdir(stage,{recursive:false,mode:0o700});await fs.mkdir(path.join(stage,'database'),{mode:0o700});
    const options={env:cfg.env},restic=(...args)=>run('restic',args,options);
    if(cfg.initialize)await restic('init');
    await restic('cat','config');
    const statistics=JSON.parse(await restic('stats','--mode','raw-data','--json'));
    if(!Number.isFinite(statistics.total_size)||statistics.total_size>=cfg.cloudLimit)throw Error('Backup repository has reached its configured size limit');
    for(const [name,flags] of [['roles',['--role-only']],['schema',[]],['data',['--data-only','--use-copy','--exclude','storage.buckets_vectors','--exclude','storage.vector_indexes']]]){
        await run('supabase',['db','dump','--db-url',cfg.database,'--file',path.join(stage,`database/${name}.sql`),...flags],options);
        const size=(await fs.stat(path.join(stage,`database/${name}.sql`))).size;if(name!=='roles'&&!size)throw Error('Database dump is empty');
    }
    const inventory=await readInventory(path.join(stage,'database/data.sql'));
    if(inventory.objects.reduce((total,object)=>total+object.size,0)>cfg.storageLimit)throw Error('Storage size exceeds the configured download budget; review the schedule or budget before increasing the limit');
    const objects=[];for(const object of inventory.objects)objects.push(await downloadObject(cfg,object,stage,{fetcher}));
    await run('git',['archive','--format=tar.gz',`--output=${path.join(stage,'source.tar.gz')}`,'HEAD'],{cwd:source,env:cfg.env});
    const revision=(await run('git',['rev-parse','HEAD'],{cwd:source,env:cfg.env})).trim();
    const files=[];for(const file of ['database/roles.sql','database/schema.sql','database/data.sql','source.tar.gz'])files.push({file,...await digest(path.join(stage,file))});
    if(statistics.total_size+files.reduce((sum,file)=>sum+file.size,0)+objects.reduce((sum,file)=>sum+file.size,0)>cfg.cloudLimit)throw Error('New backup could exceed the configured repository size limit');
    const manifest={format:1,project:cfg.project,startedAt:now.toISOString(),sourceRevision:revision,tableRows:inventory.counts,buckets:inventory.buckets,files,objects,
        excluded:['Storage vector bucket data','Dashboard Auth/SMTP settings, secrets and encryption root key','Custom database role passwords','Uncommitted source files','Edge Function code not present in the source commit']};
    await fs.writeFile(path.join(stage,'manifest.json'),JSON.stringify(manifest,null,2)+'\n',{mode:0o600});
    const verified=await verifyStage(stage);
    const tags=['--host','SlovaSofi','--tag','slovasofi','--tag',`project:${cfg.project}`];
    const output=await run('restic',['backup','.',...tags,'--json','--quiet'],{cwd:stage,env:cfg.env});
    const summary=output.split(/\r?\n/).filter(Boolean).map(line=>JSON.parse(line)).find(item=>item.message_type==='summary'&&item.snapshot_id);
    if(!summary||!/^[a-f0-9]{8,64}$/.test(summary.snapshot_id))throw Error('Restic did not confirm a completed snapshot');
    await restic('check',now.getUTCDate()===1?'--read-data':`--read-data-subset=${now.getUTCDay()+1}/7`);
    const restored=path.join(path.dirname(stage),`restored-${crypto.randomUUID()}`);
    await fs.mkdir(restored,{recursive:false,mode:0o700});
    await restic('restore',summary.snapshot_id,'--target',restored);
    if((await digest(path.join(restored,'manifest.json'))).sha256!==(await digest(path.join(stage,'manifest.json'))).sha256)throw Error('Restored manifest differs from the uploaded snapshot');
    await verifyStage(restored);
    if(cfg.retention){await restic('forget','--host','SlovaSofi','--tag',`project:${cfg.project}`,'--group-by','host','--keep-daily','30','--keep-monthly','12','--prune');await restic('check');}
    const receipt={completedAt:new Date().toISOString(),snapshot:summary.snapshot_id,restoreVerified:true,...verified};
    log(`Backup and file restore verified: ${receipt.snapshot}; ${receipt.tables} tables, ${receipt.objects} Storage files.`);
    return receipt;
}
async function main(){
    process.umask(0o077);const cfg=config(),parent=path.resolve(process.env.BACKUP_STAGE_PARENT||path.join(__dirname,'../../artifacts/private-backups'));
    await fs.mkdir(parent,{recursive:true,mode:0o700});
    const stage=path.join(parent,`slovasofi-${crypto.randomUUID()}`);
    const receipt=await backup(cfg,{stage,source:process.env.BACKUP_SOURCE_DIR||path.resolve(__dirname,'../..')});
    if(process.env.GITHUB_STEP_SUMMARY)await fs.appendFile(process.env.GITHUB_STEP_SUMMARY,`## SlovaSofi backup\n\nVerified snapshot: \`${receipt.snapshot}\`\n\nTables: ${receipt.tables}; Storage files: ${receipt.objects}\n\nCloud file restore: verified by SHA-256 (database import is not performed)\n\nSuccessful completion: ${receipt.completedAt}\n`);
}
if(require.main===module)main().catch(error=>{console.error(redactor(process.env)(error.message));process.exitCode=1;});
module.exports={PROJECT,sourceConfig,config,redactor,command,digest,objectUrl,downloadObject,verifyStage,backup};
