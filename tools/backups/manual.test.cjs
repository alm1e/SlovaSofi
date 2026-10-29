'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs/promises'),path=require('node:path'),os=require('node:os');
const {manualBackup}=require('./manual.cjs');
const {sourceConfig,command,PROJECT}=require('./backup.cjs');
const env={...process.env,SUPABASE_DB_URL:`postgresql://postgres.${PROJECT}:fixture@aws-0-eu-west-1.pooler.supabase.com:5432/postgres`,
    SUPABASE_SERVICE_ROLE_KEY:`mock.${Buffer.from(JSON.stringify({role:'service_role',ref:PROJECT})).toString('base64url')}.fixture`,
    RESTIC_PASSWORD:'disposable-test-password-at-least-32-characters'};
for(const name of ['RESTIC_REPOSITORY','AWS_ACCESS_KEY_ID','AWS_SECRET_ACCESS_KEY'])delete env[name];
test('manual source configuration requires no Cloudflare credentials',()=>{
    assert.equal(sourceConfig(env).project,PROJECT);
    assert.throws(()=>sourceConfig({...env,RESTIC_PASSWORD:'short'}),/32 characters/);
    assert.throws(()=>sourceConfig({...env,SUPABASE_SERVICE_ROLE_KEY:'public-key'}),/service_role/);
});
test('manual backup stops before database access if Docker is unavailable',async()=>{
    const calls=[];
    await assert.rejects(manualBackup(env,{run:async(file,args)=>{
        calls.push({file,args});
        if(file==='docker')throw Error('unavailable');
        return '';
    },log(){}}),/requires a running Docker engine/);
    assert.equal(calls.some(({args})=>args.includes('dump')),false);
});
test('a failed manual export reports its private working directory and never offers an upload',async t=>{
    const directory=await fs.mkdtemp(path.join(os.tmpdir(),'slovasofi-manual-test-'));
    t.after(async()=>{assert.equal(path.dirname(directory),path.resolve(os.tmpdir()));assert.ok(path.basename(directory).startsWith('slovasofi-manual-test-'));await fs.rm(directory,{recursive:true,force:true});});
    const logs=[];
    await assert.rejects(manualBackup({...env,BACKUP_MANUAL_OUTPUT:directory},{run:async(file,args)=>{
        if(file==='supabase'&&args.includes('dump'))throw Error('fixture export failure');
        return args[0]==='stats'?'{"total_size":0}':'';
    },log:line=>logs.push(line)}),/fixture export failure/);
    assert.ok(logs.some(line=>line.includes('may contain unencrypted school data')));
    assert.equal(logs.some(line=>line.startsWith('READY FOR MANUAL UPLOAD:')),false);
    const [job]=await fs.readdir(directory);
    assert.equal((await fs.readdir(path.join(directory,job))).some(name=>name.endsWith('.tar')),false);
});
test('manual archive is encrypted, independently restorable and contains no plaintext',{skip:!process.env.BACKUP_RESTIC_BINARY},async t=>{
    const directory=await fs.mkdtemp(path.join(os.tmpdir(),'slovasofi-manual-test-'));
    t.after(async()=>{assert.equal(path.dirname(directory),path.resolve(os.tmpdir()));assert.ok(path.basename(directory).startsWith('slovasofi-manual-test-'));await fs.rm(directory,{recursive:true,force:true});});
    const tables=['auth.users','auth.identities','public.profiles','public.teacher_lessons','public.teacher_classes','public.class_students',
        'public.class_lesson_assignments','public.student_lesson_progress','public.teacher_workspace_settings','public.teacher_lesson_editors',
        'public.teacher_student_directory','public.calendar_events'];
    const data=tables.map(name=>`COPY ${name} (id) FROM stdin;\n\\.\n`).join('')+
        'COPY storage.buckets (id, public) FROM stdin;\nlesson-images\tt\n\\.\n'+
        'COPY storage.objects (id, bucket_id, name, metadata, version) FROM stdin;\n1\tlesson-images\tphoto.png\t{"size":3}\tfixture\n\\.\n';
    const logs=[];
    const options={...env,BACKUP_MANUAL_OUTPUT:directory,BACKUP_RESTIC_BINARY:process.env.BACKUP_RESTIC_BINARY,
        RESTIC_PASSWORD_FILE:'must-not-be-used',RESTIC_REPOSITORY_FILE:'must-not-be-used',AWS_ACCESS_KEY_ID:'must-not-be-used'};
    const run=async(file,args,settings)=>{
        if(file==='docker'||file==='supabase'&&args[0]==='--version')return 'fixture-version';
        if(file==='supabase'){
            const target=args[args.indexOf('--file')+1];
            await fs.writeFile(target,target.endsWith('data.sql')?data:'-- schema fixture');
            return '';
        }
        if(file==='git'){
            if(args[0]==='archive')await fs.writeFile(args.find(arg=>arg.startsWith('--output=')).slice(9),'source fixture');
            return 'a'.repeat(40);
        }
        return command(file,args,settings);
    };
    const receipt=await manualBackup(options,{run,fetcher:async()=>new Response('abc'),log:line=>logs.push(line)});
    const job=path.dirname(receipt.archive),files=await fs.readdir(job);
    assert.deepEqual(files.sort(),[path.basename(receipt.archive),`${path.basename(receipt.archive)}.sha256`].sort());
    assert.equal(receipt.restoreVerified,true);
    assert.equal(receipt.objects,1);
    assert.match(await fs.readFile(`${receipt.archive}.sha256`,'utf8'),new RegExp(`^${receipt.sha256}  `));
    const extracted=path.join(directory,'independent-restore');
    await fs.mkdir(extracted);
    await command(process.platform==='win32'?'tar.exe':'tar',['-xf',receipt.archive,'-C',extracted]);
    const restoreEnv={...env,RESTIC_REPOSITORY:path.join(extracted,'encrypted-repository')};
    await command(process.env.BACKUP_RESTIC_BINARY,['check','--read-data'],{env:restoreEnv});
    await assert.rejects(command(process.env.BACKUP_RESTIC_BINARY,['snapshots'],{env:{...restoreEnv,RESTIC_PASSWORD:'wrong-password'}}));
    assert.ok(logs.some(line=>line.startsWith('READY FOR MANUAL UPLOAD:')));
    assert.equal(logs.join('\n').includes(env.RESTIC_PASSWORD),false);
});
