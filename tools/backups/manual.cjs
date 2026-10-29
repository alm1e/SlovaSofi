'use strict';
const fs=require('node:fs/promises'),path=require('node:path');
const {sourceConfig,backup,command,digest,verifyStage,redactor}=require('./backup.cjs');

async function manualBackup(env=process.env,{run=command,fetcher=fetch,log=console.log}={}){
    const source=path.resolve(env.BACKUP_SOURCE_DIR||path.join(__dirname,'../..')),cfg=sourceConfig(env);
    const restic=env.BACKUP_RESTIC_BINARY||'restic',tar=process.platform==='win32'?'tar.exe':'tar';
    await run(restic,['version'],{env});
    await run(tar,['--version'],{env});
    await run('supabase',['--version'],{env});
    try{await run('docker',['info','--format','{{.ServerVersion}}'],{env});}
    catch{throw Error('Supabase database export requires a running Docker engine (Docker Desktop for a local Windows run). Start the engine before retrying. No backup has been created.');}
    const parent=path.resolve(env.BACKUP_MANUAL_OUTPUT||path.join(source,'artifacts/private-backups/manual'));
    await fs.mkdir(parent,{recursive:true,mode:0o700});
    const job=await fs.mkdtemp(path.join(parent,'manual-'));
    const repository=path.join(job,'encrypted-repository');
    const localEnv={...env,RESTIC_REPOSITORY:repository,RESTIC_CACHE_DIR:path.join(job,'cache')};
    // Prevent inherited cloud/password-file options from changing the local destination or password.
    for(const name of ['RESTIC_REPOSITORY_FILE','RESTIC_PASSWORD_FILE','RESTIC_PASSWORD_COMMAND','AWS_ACCESS_KEY_ID','AWS_SECRET_ACCESS_KEY','AWS_SESSION_TOKEN'])delete localEnv[name];
    const localCfg={...cfg,repository,env:localEnv,initialize:true,retention:false};
    const localRun=(file,args,options)=>run(file==='restic'?restic:file,args,options);
    let completed=false;
    try{
        log('Exporting database, Storage files and committed source into a local encrypted repository...');
        const receipt=await backup(localCfg,{run:localRun,fetcher,stage:path.join(job,'plaintext'),source,log});
        await run(restic,['check','--read-data'],{env:localEnv});
        const pending=path.join(job,'upload.tar.partial'),archive=path.join(job,`SlovaSofi-${new Date().toISOString().replace(/[:.]/g,'-')}.restic.tar`);
        await run(tar,['-cf',pending,'-C',job,'encrypted-repository'],{env:localEnv});
        const unpacked=path.join(job,'archive-check');
        await fs.mkdir(unpacked,{mode:0o700});
        await run(tar,['-xf',pending,'-C',unpacked],{env:localEnv});
        const checkEnv={...localEnv,RESTIC_REPOSITORY:path.join(unpacked,'encrypted-repository')};
        await run(restic,['check','--read-data'],{env:checkEnv});
        const restored=path.join(job,'archive-restored');
        await run(restic,['restore',receipt.snapshot,'--target',restored],{env:checkEnv});
        await verifyStage(restored);
        const original=await digest(path.join(job,'plaintext/manifest.json')),restoredManifest=await digest(path.join(restored,'manifest.json'));
        if(original.sha256!==restoredManifest.sha256)throw Error('Archive restore manifest does not match the exported snapshot');
        await fs.rename(pending,archive);
        const checksum=await digest(archive);
        await fs.writeFile(`${archive}.sha256`,`${checksum.sha256}  ${path.basename(archive)}\n`,{flag:'wx',mode:0o600});
        // job is a new directory owned exclusively by this invocation, never an arbitrary user path.
        for(const entry of await fs.readdir(job)){
            if(entry!==path.basename(archive)&&entry!==`${path.basename(archive)}.sha256`)await fs.rm(path.join(job,entry),{recursive:true,force:true});
        }
        completed=true;
        log(`READY FOR MANUAL UPLOAD: ${archive}`);
        log(`SHA-256: ${checksum.sha256}`);
        log('Upload the .restic.tar file and its .sha256 file through the private R2 bucket dashboard. Keep the encryption password separately. No cloud upload was performed.');
        return {archive,sha256:checksum.sha256,...receipt};
    }finally{
        if(!completed)log(`Manual backup did not complete. Do not upload this directory: ${job}. It may contain unencrypted school data; remove this specific failed job directory after resolving the error.`);
    }
}
async function main(){
    process.umask(0o077);
    const receipt=await manualBackup();
    if(process.env.GITHUB_OUTPUT)await fs.appendFile(process.env.GITHUB_OUTPUT,`archive=${receipt.archive}\nchecksum=${receipt.archive}.sha256\n`);
    if(process.env.GITHUB_STEP_SUMMARY)await fs.appendFile(process.env.GITHUB_STEP_SUMMARY,
        `## Manual backup ready\n\nDownload the \`SlovaSofi-manual-backup\` artifact below. Extract the GitHub ZIP and upload the enclosed \`.restic.tar\` and \`.sha256\` files through your private R2 bucket dashboard.\n\nSnapshot: \`${receipt.snapshot}\`\n\nTables: ${receipt.tables}; Storage files: ${receipt.objects}\n\nArchive restore: verified by SHA-256 (SQL import into a test database is still a separate check).\n\nArchive SHA-256: \`${receipt.sha256}\`\n\nNo R2 API request was made. GitHub retains the encrypted download for 1 day; download it now. Keep the RESTIC_PASSWORD separately. Cloud storage is not confirmed until you upload and re-download the archive to verify its checksum.\n`);
}
if(require.main===module)main().catch(error=>{console.error(redactor(process.env)(error.message));process.exitCode=1;});
module.exports={manualBackup};
