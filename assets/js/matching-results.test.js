const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),test=require('node:test');
const {stripTypeScriptTypes}=require('node:module');
for(const file of ['../../supabase/functions/student-lessons/index.ts','../../artifacts/student-lessons-matching.ts']) {
    test(`matching feedback exposes only grading booleans and survives progress reload: ${file}`,()=>{
        const context=vm.createContext({Deno:{serve(){}},URL,SlovaTable:require('./table.js'),SlovaFillBlanks:require('./fill-blanks.js')});
        const source=fs.readFileSync(`${__dirname}/${file}`,'utf8').replace(/^import .*;\r?\n/gm,'');
        vm.runInContext(stripTypeScriptTypes(source),context);
        const activity={type:'match',content:'Taliansko = Talian\nSlovensko = Slovák\nPoľsko = Poliak',prompt:'Match',answer:''};
        const results=context.matchingResults(activity,['Talian','Poliak','Slovák']);
        assert.equal(JSON.stringify(results),'[true,false,false]');
        assert.equal(context.isCorrect(activity,['Talian','Slovák','Poliak']),true);
        const progress=context.publicProgress({a:{response:['Talian','Poliak','Slovák'],correct:false,matchResults:results,submitted_at:'2026-10-23'}});
        assert.equal(JSON.stringify(progress.a.matchResults),'[true,false,false]');
        assert.equal('expected' in progress.a,false);
        assert.equal(context.matchingResults({...activity,type:'text'},[]),undefined);
    });
}
