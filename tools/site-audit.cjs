// Audit a private lesson export without changing school data.
const fs = require('node:fs'), vm = require('node:vm');
const { stripTypeScriptTypes } = require('node:module');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
function engine(file) {
  const context = vm.createContext({ URL, crypto: require('node:crypto').webcrypto,
    SlovaTable: require('../assets/js/table.js'), SlovaFillBlanks: require('../assets/js/fill-blanks.js'),
    SlovaExerciseFormat: require('../assets/js/exercise-format.js'), Deno: { serve() {} } });
  vm.runInContext(stripTypeScriptTypes(fs.readFileSync(file, 'utf8').replace(/^import .*;\r?\n/gm, '')), context);
  return context;
}
function audit(lessons, context) {
  require('../assets/js/table.js'); require('../assets/js/fill-blanks.js'); require('../assets/js/exercise-format.js');
  const readiness = require('../assets/js/lesson-readiness.js');
  return lessons.map(lesson => {
    const blocks = [], ids = new Set();
    const payload = lesson.activities;
    const sections = Array.isArray(payload) ? [{title:'Lesson',activities:payload}] : [...(payload.sections || []), ...(payload.homeworkSections || [])];
    for (const section of sections) for (const activity of section.activities || []) {
      const issues = [];
      if (!activity.id || ids.has(activity.id)) issues.push('missing-or-duplicate-id');
      ids.add(activity.id);
      if (readiness.incomplete(activity)) issues.push('incomplete');
      let visible = false;
      try { visible = context.sectionsWithSafeActivities([activity]).some(s => s.activities.length); }
      catch (error) { issues.push('engine-error: ' + error.message); }
      if (!visible && activity.settings?.studentVisible !== false) issues.push('not-visible');
      blocks.push({id:activity.id,type:activity.type,section:section.title,prompt:activity.prompt || '',issues});
    }
    return {id:lesson.id,title:lesson.title,unit:lesson.unit,blocks:blocks.length,issues:blocks.filter(b=>b.issues.length).length,activities:blocks};
  });
}
if (require.main === module) {
  const [snapshot, source = path.join(root, 'supabase/functions/student-lessons/index.ts'), output] = process.argv.slice(2);
  if (!snapshot) throw Error('Usage: node tools/site-audit.cjs snapshot.json [engine.ts] [report.json]');
  const report = audit(JSON.parse(fs.readFileSync(snapshot, 'utf8')), engine(source));
  if (output) fs.writeFileSync(output, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report.map(({activities,...summary})=>({...summary,problems:activities.filter(b=>b.issues.length)})),null,2));
}
module.exports = {engine,audit};
