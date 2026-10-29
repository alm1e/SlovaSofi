'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const {diagnose}=require('./r2-access.cjs');
const account='a'.repeat(32),key='b'.repeat(32),secret='c'.repeat(64);
const env={RESTIC_REPOSITORY:`s3:https://${account}.r2.cloudflarestorage.com/slovasofi-backups/slovasofi`,AWS_ACCESS_KEY_ID:key,AWS_SECRET_ACCESS_KEY:secret,BACKUP_R2_ACCOUNT_ID:account,BACKUP_R2_BUCKET_NAME:'slovasofi-backups',BACKUP_R2_ACCESS_KEY_SHA256:crypto.createHash('sha256').update(key).digest('hex')};
test('R2 diagnostics use the verified token and a read-only request with zero object results',async()=>{
    let call;const logs=[];
    assert.deepEqual(await diagnose(env,{run:async(file,args,options)=>{call={file,args,options};return '{"KeyCount":0}';},log:line=>logs.push(line)}),{authenticated:true});
    assert.equal(call.file,'aws');assert.equal(call.args[1],'list-objects-v2');assert.equal(call.args[call.args.indexOf('--max-keys')+1],'0');
    assert.equal(call.options.env.AWS_DEFAULT_REGION,'auto');assert.equal(call.args.includes(key)||call.args.includes(secret),false);
    assert.equal(logs.join('\n').includes(key)||logs.join('\n').includes(secret),false);
});
test('R2 diagnostics identify an incorrect bucket or token ID before sending credentials',async()=>{
    for(const overrides of [{AWS_ACCESS_KEY_ID:account},{RESTIC_REPOSITORY:env.RESTIC_REPOSITORY.replace('slovasofi-backups','other-bucket')}]){
        let called=false;await assert.rejects(diagnose({...env,...overrides},{run:async()=>{called=true;},log(){}}),/does not (match|point)/);assert.equal(called,false);
    }
});
test('R2 diagnostics report only an error code and never echo raw service errors',async()=>{
    const logs=[];await assert.rejects(diagnose(env,{run:async()=>{throw Error(`An error occurred (SignatureDoesNotMatch) when calling ListObjectsV2: ${key} ${secret}`);},log:line=>logs.push(line)}),error=>error.message==='R2 direct S3 request failed: SignatureDoesNotMatch');
    assert.equal(logs.join('\n').includes(secret),false);
});
test('R2 credential rotation can be checked directly without pinning an obsolete token ID',async()=>{
    const rotated={...env,AWS_ACCESS_KEY_ID:'d'.repeat(32),BACKUP_R2_ACCESS_KEY_SHA256:undefined};let called=false;
    assert.deepEqual(await diagnose(rotated,{run:async()=>{called=true;return '{}';},log(){}}),{authenticated:true});assert.equal(called,true);
});
