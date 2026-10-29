'use strict';
const crypto=require('node:crypto');
const {command}=require('./backup.cjs');
function settings(env){
    for(const name of ['RESTIC_REPOSITORY','AWS_ACCESS_KEY_ID','AWS_SECRET_ACCESS_KEY','BACKUP_R2_ACCOUNT_ID','BACKUP_R2_BUCKET_NAME'])if(!env[name])throw Error(`Missing ${name}`);
    const account=env.BACKUP_R2_ACCOUNT_ID,bucket=env.BACKUP_R2_BUCKET_NAME;
    if(!/^[a-f0-9]{32}$/.test(account)||!/^[a-z0-9][a-z0-9-]{1,61}[a-z0-9]$/.test(bucket))throw Error('Invalid expected R2 account or bucket');
    if(env.RESTIC_REPOSITORY!==`s3:https://${account}.r2.cloudflarestorage.com/${bucket}/slovasofi`)throw Error('RESTIC_REPOSITORY does not point to the verified Cloudflare bucket');
    if(!/^[a-f0-9]{32}$/i.test(env.AWS_ACCESS_KEY_ID))throw Error('R2_ACCESS_KEY_ID has an invalid format');
    if(env.BACKUP_R2_ACCESS_KEY_SHA256&&crypto.createHash('sha256').update(env.AWS_ACCESS_KEY_ID).digest('hex')!==env.BACKUP_R2_ACCESS_KEY_SHA256)throw Error('R2_ACCESS_KEY_ID does not match the active R2 Account Token shown in Cloudflare');
    if(!/^[a-f0-9]{64}$/i.test(env.AWS_SECRET_ACCESS_KEY))throw Error('R2_SECRET_ACCESS_KEY has an invalid format');
    return {endpoint:`https://${account}.r2.cloudflarestorage.com`,bucket,env:{...env,AWS_DEFAULT_REGION:'auto',AWS_EC2_METADATA_DISABLED:'true',AWS_MAX_ATTEMPTS:'1',AWS_PAGER:''}};
}
async function diagnose(env,{run=command,log=console.log}={}){
    const cfg=settings(env);
    log(env.BACKUP_R2_ACCESS_KEY_SHA256?'R2 account, bucket and active token ID match the Cloudflare dashboard.':'R2 account and bucket match the configured Cloudflare destination; checking the current credential pair.');
    const args=['s3api','list-objects-v2','--endpoint-url',cfg.endpoint,'--region','auto','--bucket',cfg.bucket,'--max-keys','0','--no-paginate','--output','json','--no-cli-pager','--cli-connect-timeout','15','--cli-read-timeout','20'];
    let output;
    try{output=await run('aws',args,{env:cfg.env});}catch(error){
        // Print only the service error code, never raw output, headers, keys or object names.
        const code=/An error occurred \(([A-Za-z0-9]+)\)/.exec(error.message)?.[1]||'ConnectionOrClientError';
        throw Error(`R2 direct S3 request failed: ${code}`);
    }
    try{JSON.parse(output);}catch{throw Error('R2 returned an invalid response');}
    log('R2 direct S3 authentication and bucket access succeeded. No object contents were downloaded or changed.');
    return {authenticated:true};
}
if(require.main===module)diagnose(process.env).catch(error=>{console.error(error.message);process.exitCode=1;});
module.exports={settings,diagnose};
