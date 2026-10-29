'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs/promises'),path=require('node:path'),os=require('node:os');
const {config,redactor,command,objectUrl,downloadObject,verifyStage,backup,PROJECT}=require('./backup.cjs'),{readInventory,decodeCopy}=require('./copy-reader.cjs');
const {prepare}=require('./prepare.cjs');
const roleKey=`mock.${Buffer.from(JSON.stringify({role:'service_role',ref:PROJECT})).toString('base64url')}.not-a-real-token`;
const env={SUPABASE_DB_URL:`postgresql://postgres.${PROJECT}:not%20a%20real%20password@aws-0-eu-west-1.pooler.supabase.com:5432/postgres`,SUPABASE_SERVICE_ROLE_KEY:roleKey,RESTIC_REPOSITORY:`s3:https://${'a'.repeat(32)}.r2.cloudflarestorage.com/slovasofi-backups/slovasofi`,RESTIC_PASSWORD:'not-a-real-password-'.repeat(3),AWS_ACCESS_KEY_ID:'b'.repeat(32),AWS_SECRET_ACCESS_KEY:'c'.repeat(64)};
function sql(objects=[{bucket:'lesson-images',name:'folder/flag.png',size:3}],quoted=false){
    const copy=(name,columns,rows)=>`COPY ${quoted?name.split('.').map(part=>`"${part}"`).join('.'):name} (${columns.map(part=>quoted?`"${part}"`:part).join(', ')}) FROM stdin;\n${rows.map(row=>row.join('\t')+'\n').join('')}\\.\n`;
    const escape=value=>value===null?'\\N':String(value).replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/\r/g,'\\r').replace(/\t/g,'\\t');
    return copy('auth.users',['id'],[['user-fixture']])+copy('storage.buckets',['id','public'],[...new Set(objects.map(object=>object.bucket))].map(bucket=>[bucket,bucket==='student-recordings'?'f':'t']))+copy('storage.objects',['id','bucket_id','name','metadata','version'],objects.map((object,index)=>[index,object.bucket,escape(object.name),JSON.stringify({size:object.size,mimetype:'image/png'}),'version-fixture']))+copy('public.teacher_lessons',['id','title'],[['lesson-fixture','A lesson']])+copy('public.student_lesson_progress',['id'],[])+['auth.identities','public.profiles','public.teacher_classes','public.class_students','public.class_lesson_assignments','public.teacher_workspace_settings','public.teacher_lesson_editors','public.teacher_student_directory','public.calendar_events'].map(name=>copy(name,['id'],[])).join('');
}
async function temporary(t){
    const directory=await fs.mkdtemp(path.join(os.tmpdir(),'slovasofi-backup-test-'));
    t.after(async()=>{if(path.dirname(directory)!==path.resolve(os.tmpdir())||!path.basename(directory).startsWith('slovasofi-backup-test-'))throw Error('Unsafe test cleanup');await fs.rm(directory,{recursive:true,force:true});});
    return directory;
}
async function fixture(t,options={}){
    const directory=await temporary(t),stage=path.join(directory,'stage'),calls=[],cfg=config({...env,...options.env}),data=options.data??sql();
    const run=async(file,args,settings)=>{
        calls.push({file,args,settings});if(options.fail?.(file,args))throw Error('simulated tool failure');
        if(file==='supabase'){const target=args[args.indexOf('--file')+1];await fs.writeFile(target,target.endsWith('data.sql')?data:target.endsWith('roles.sql')?'':'CREATE TABLE fixture;');return '';}
        if(file==='git'){
            if(args[0]==='archive'){await fs.writeFile(args.find(arg=>arg.startsWith('--output=')).slice(9),'fixture source archive');return '';}
            return 'a'.repeat(40)+'\n';
        }
        if(args[0]==='stats')return JSON.stringify({total_size:options.cloudSize||0});
        if(args[0]==='backup')return JSON.stringify({message_type:'summary',snapshot_id:'a'.repeat(64)})+'\n';
        if(args[0]==='restore'){
            const target=args[args.indexOf('--target')+1];for(const name of await fs.readdir(stage))await fs.cp(path.join(stage,name),path.join(target,name),{recursive:true,errorOnExist:true,force:false});
            if(options.corruptRestore)await fs.appendFile(path.join(target,options.corruptRestore),'damaged');
        }
        return '{}';
    };
    const fetcher=options.fetcher||(async()=>new Response(Buffer.from('abc')));
    return {stage,calls,cfg,data,run,fetcher,invoke:()=>backup(cfg,{stage,run,fetcher,source:directory,now:new Date('2026-10-29T03:17:00Z'),log(){}})};
}
test('configuration accepts the production project and rejects mismatched databases, transaction pooling, insecure storage and browser keys',()=>{
    assert.equal(config(env).project,PROJECT);
    for(const overrides of [{SUPABASE_DB_URL:env.SUPABASE_DB_URL.replace(PROJECT,'x'.repeat(20))},{SUPABASE_DB_URL:env.SUPABASE_DB_URL.replace(':5432',':6543')},{SUPABASE_DB_URL:'postgres://postgres:pass@evil.invalid/postgres'},{SUPABASE_SERVICE_ROLE_KEY:'sb_publishable_fixture'},{RESTIC_REPOSITORY:env.RESTIC_REPOSITORY.replace('https:','http:')},{RESTIC_REPOSITORY:env.RESTIC_REPOSITORY.replace(/\/slovasofi$/,'/other')},{RESTIC_PASSWORD:'short'},{BACKUP_MAX_STORAGE_BYTES:'bad'}])assert.throws(()=>config({...env,...overrides}));
});
test('redaction removes actual keys and both encoded and decoded database passwords',()=>{
    const scrub=redactor(env),text=scrub([...Object.values(env),'not a real password','not%20a%20real%20password'].join('\n'));
    assert.doesNotMatch(text,/not a real password|not%20a%20real%20password|mock\./);for(const name of ['AWS_ACCESS_KEY_ID','AWS_SECRET_ACCESS_KEY'])assert.equal(text.includes(env[name]),false);assert.match(text,/REDACTED/);
});

test('R2 setup errors identify the wrong secret without revealing values',()=>{
    assert.equal(config({...env,BACKUP_R2_ACCOUNT_ID:'a'.repeat(32)}).project,PROJECT);
    for(const [overrides,message] of [[{BACKUP_R2_ACCOUNT_ID:'d'.repeat(32)},/RESTIC_REPOSITORY Account ID/],[{AWS_ACCESS_KEY_ID:'token-value-instead-of-id'},/R2_ACCESS_KEY_ID/],[{AWS_SECRET_ACCESS_KEY:'raw-api-token'},/R2_SECRET_ACCESS_KEY/]])assert.throws(()=>config({...env,...overrides}),message);
});
test('COPY inventory handles quoted identifiers, Unicode, tabs, backslashes, nulls and empty tables',async t=>{
    const directory=await temporary(t),filename=path.join(directory,'data.sql');
    await fs.writeFile(filename,sql([{bucket:'student-recordings',name:'žiak/voice\tname\\x.png',size:3}],true));
    const inventory=await readInventory(filename);assert.equal(inventory.objects[0].name,'žiak/voice\tname\\x.png');assert.equal(inventory.buckets[0].public,false);assert.equal(inventory.counts['public.student_lesson_progress'],0);
    assert.equal(decodeCopy('\\N'),null);assert.equal(decodeCopy('\\141\\x62\\n\\\\n'),'ab\n\\n');
});
test('missing managed data, truncated COPY, path traversal and duplicate files fail closed',async t=>{
    const directory=await temporary(t),filename=path.join(directory,'data.sql');
    for(const data of [sql().replace('COPY auth.users','COPY auth.others'),sql().slice(0,-3),sql([{bucket:'lesson-images',name:'../secrets',size:3}]),sql([{bucket:'lesson-images',name:'same',size:3},{bucket:'lesson-images',name:'same',size:3}])]){await fs.writeFile(filename,data);await assert.rejects(readInventory(filename));}
});
test('Storage downloads use the private authenticated route, encode names and store hashed local paths',async t=>{
    const directory=await temporary(t),object={bucket:'student-recordings',name:'ž/voice #1.mp3',size:3,metadata:{}};let request;
    const result=await downloadObject(config(env),object,directory,{fetcher:async(url,options)=>{request={url,options};return new Response('abc');}});
    assert.match(request.url,/object\/authenticated\/student-recordings\/%C5%BE\/voice%20%231.mp3$/);assert.equal(request.options.redirect,'error');assert.equal(request.options.headers.apikey,roleKey);
    assert.match(result.file,/^storage\/[a-f0-9]{64}\.bin$/);assert.equal(result.sha256,'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
});
test('missing files, changed etags and size mismatches never become successful downloads',async t=>{
    const directory=await temporary(t),cfg=config(env),object={bucket:'lesson-images',name:'file',size:3,metadata:{eTag:'original'}};
    for(const response of [new Response('missing',{status:404}),new Response('abc',{headers:{etag:'changed'}}),new Response('short',{headers:{etag:'original'}})])await assert.rejects(downloadObject(cfg,object,directory,{fetcher:async()=>response}));
});
test('transient Storage errors retry without creating partial successful files',async t=>{
    const directory=await temporary(t);let attempts=0;
    await downloadObject(config(env),{bucket:'lesson-images',name:'file',size:3,metadata:{}},directory,{fetcher:async()=>++attempts<3?new Response('',{status:503}):new Response('abc'),sleep:async()=>{}});assert.equal(attempts,3);
});
test('a complete run includes empty roles, accounts, data and files, and verifies the cloud before retention',async t=>{
    const f=await fixture(t,{env:{BACKUP_RETENTION_ENABLED:'true'}}),receipt=await f.invoke();assert.equal(receipt.objects,1);assert.equal(receipt.tables,14);
    const manifest=JSON.parse(await fs.readFile(path.join(f.stage,'manifest.json'),'utf8'));assert.equal(manifest.tableRows['auth.users'],1);assert.equal(manifest.files.find(file=>file.file==='database/roles.sql').size,0);
    const commands=f.calls.filter(call=>call.file==='restic').map(call=>call.args[0]);assert.deepEqual(commands,['cat','stats','backup','check','restore','forget','check']);assert.equal(receipt.restoreVerified,true);
    const backupCommand=f.calls.find(call=>call.file==='restic'&&call.args[0]==='backup');assert.equal(backupCommand.settings.cwd,f.stage);assert.equal(backupCommand.args[1],'.');
    const forget=f.calls.find(call=>call.args[0]==='forget');assert.ok(forget.args.includes('30')&&forget.args.includes('12'));assert.ok(forget.args.includes(`project:${PROJECT}`));
    assert.deepEqual(await verifyStage(f.stage),{tables:14,objects:1,files:5});
});
test('default backup retains every previous snapshot until retention is explicitly enabled',async t=>{
    const f=await fixture(t);await f.invoke();assert.equal(f.calls.some(call=>call.args[0]==='forget'||call.args[0]==='prune'),false);assert.equal(f.calls.some(call=>call.args[0]==='init'),false);
});
test('a failed cloud check, restore or dump never runs retention',async t=>{
    for(const command of ['supabase','check','restore']){
        const f=await fixture(t,{env:{BACKUP_RETENTION_ENABLED:'true'},fail:(file,args)=>file===command||args[0]===command});await assert.rejects(f.invoke());assert.equal(f.calls.some(call=>call.args[0]==='forget'),false);
    }
});

test('damaged cloud restores never count as successful or remove previous versions',async t=>{
    for(const corruptRestore of ['manifest.json','database/schema.sql']){
        const f=await fixture(t,{env:{BACKUP_RETENTION_ENABLED:'true'},corruptRestore});await assert.rejects(f.invoke(),/manifest differs|checksum/);assert.equal(f.calls.some(call=>call.args[0]==='forget'),false);
    }
});
test('download and repository budgets stop before the corresponding expensive work',async t=>{
    const storage=await fixture(t,{env:{BACKUP_MAX_STORAGE_BYTES:'2'},fetcher:async()=>{throw Error('should not download');}});await assert.rejects(storage.invoke(),/download budget/);assert.equal(storage.calls.some(call=>call.args[0]==='backup'),false);
    const cloud=await fixture(t,{cloudSize:9*1024*1024*1024});await assert.rejects(cloud.invoke(),/size limit/);assert.equal(cloud.calls.some(call=>call.file==='supabase'),false);
});
test('restored bytes, malicious manifest paths and missing objects are detected',async t=>{
    const f=await fixture(t);await f.invoke();const file=path.join(f.stage,'manifest.json'),manifest=JSON.parse(await fs.readFile(file,'utf8'));
    await fs.appendFile(path.join(f.stage,'database/schema.sql'),'changed');await assert.rejects(verifyStage(f.stage),/checksum/);
    manifest.files[0].file='../outside';await fs.writeFile(file,JSON.stringify(manifest));await assert.rejects(verifyStage(f.stage),/Unsafe/);
});
test('repository initialization is explicit and staging never overwrites an existing directory',async t=>{
    const f=await fixture(t,{env:{BACKUP_INITIALIZE:'true'}});await f.invoke();assert.equal(f.calls[0].args[0],'init');
    const count=f.calls.length;await assert.rejects(f.invoke(),/EEXIST/);assert.equal(f.calls.length,count);
});
test('private-repository setup contains tools and workflow, and no credentials or production snapshots',async t=>{
    const directory=await temporary(t),target=path.join(directory,'setup');await prepare(target);
    const workflow=await fs.readFile(path.join(target,'.github/workflows/backup.yml'),'utf8');assert.match(workflow,/github.event.repository.private/);assert.match(workflow,/17 3 \* \* \*/);assert.doesNotMatch(workflow,/uses: actions\/upload-artifact/);
    assert.equal((await fs.readdir(path.join(target,'tools/backups'))).includes('prepare.cjs'),true);assert.equal((await fs.readdir(target)).includes('.env.backups'),false);
    await assert.rejects(prepare(target),/EEXIST/);
});

test('real restic encrypts a local test repository and restores every file with valid checksums',{skip:!process.env.BACKUP_RESTIC_BINARY},async t=>{
    const f=await fixture(t,{env:{BACKUP_INITIALIZE:'true'}}),repository=path.join(path.dirname(f.stage),'encrypted-restic'),resticEnv={...process.env,...f.cfg.env,RESTIC_REPOSITORY:repository,RESTIC_PASSWORD:'fixture-only-password-for-disposable-data',RESTIC_CACHE_DIR:path.join(path.dirname(f.stage),'restic-cache')};
    const run=(file,args,options)=>file==='restic'?command(process.env.BACKUP_RESTIC_BINARY,args,{...options,env:resticEnv}):f.run(file,args,options);
    const receipt=await backup(f.cfg,{stage:f.stage,run,fetcher:f.fetcher,source:path.dirname(f.stage),log(){}});
    const restore=path.join(path.dirname(f.stage),'restored');await command(process.env.BACKUP_RESTIC_BINARY,['restore',receipt.snapshot,'--target',restore],{env:resticEnv});
    assert.deepEqual(await verifyStage(restore),{tables:14,objects:1,files:5});
    const manifest=JSON.parse(await fs.readFile(path.join(restore,'manifest.json'),'utf8'));assert.equal(await fs.readFile(path.join(restore,manifest.objects[0].file),'utf8'),'abc');
    await assert.rejects(command(process.env.BACKUP_RESTIC_BINARY,['snapshots'],{env:{...resticEnv,RESTIC_PASSWORD:'wrong-fixture-password'}}));
});
