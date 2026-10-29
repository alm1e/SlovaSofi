'use strict';
const fs=require('node:fs/promises'),path=require('node:path');
async function prepare(target){
    target=path.resolve(target);await fs.mkdir(path.dirname(target),{recursive:true});await fs.mkdir(target,{recursive:false});
    const scripts=path.join(target,'tools/backups'),workflow=path.join(target,'.github/workflows');
    await fs.mkdir(scripts,{recursive:true});await fs.mkdir(workflow,{recursive:true});
    for(const file of await fs.readdir(__dirname))if(file.endsWith('.cjs'))await fs.copyFile(path.join(__dirname,file),path.join(scripts,file));
    await fs.copyFile(path.join(__dirname,'cloud-backup.yml'),path.join(scripts,'cloud-backup.yml'));
    await fs.copyFile(path.join(__dirname,'r2-access-check.yml'),path.join(scripts,'r2-access-check.yml'));
    await fs.copyFile(path.join(__dirname,'backup.env.example'),path.join(scripts,'backup.env.example'));
    await fs.copyFile(path.join(__dirname,'cloud-backup.yml'),path.join(workflow,'backup.yml'));
    await fs.copyFile(path.join(__dirname,'r2-access-check.yml'),path.join(workflow,'r2-access-check.yml'));
    await fs.copyFile(path.join(__dirname,'manual-backup.yml'),path.join(workflow,'manual-backup.yml'));
    await fs.writeFile(path.join(target,'README.md'),'# SlovaSofi backups\n\n[Разовая настройка — коротко](docs/BACKUPS_QUICK_START.md)\n\n[Полная инструкция и восстановление](docs/BACKUPS.md)\n\nРасписание ещё нужно включить после добавления секретов и первого успешного восстановления.\n');
    await fs.mkdir(path.join(target,'docs'),{recursive:true});
    for(const file of ['BACKUPS.md','BACKUPS_QUICK_START.md'])await fs.copyFile(path.join(__dirname,'../../docs',file),path.join(target,'docs',file));
    await fs.writeFile(path.join(target,'.gitignore'),'.env\n.env.*\nartifacts/\n.restic-cache/\n');
    console.log('Private backup repository files prepared. No credentials or school data are included.');
}
if(require.main===module)prepare(process.argv[2]||path.join(__dirname,'../../artifacts/private-backups/cloud-backup-setup')).catch(error=>{console.error(error.message);process.exitCode=1;});
module.exports={prepare};
