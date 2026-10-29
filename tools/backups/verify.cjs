'use strict';
const {verifyStage}=require('./backup.cjs');
if(process.argv.length!==3){console.error('Usage: node tools/backups/verify.cjs <restored-directory>');process.exitCode=1;}
else verifyStage(process.argv[2]).then(result=>console.log(`Checksums and inventory valid: ${result.tables} tables, ${result.objects} Storage files.`)).catch(error=>{console.error(error.message);process.exitCode=1;});
