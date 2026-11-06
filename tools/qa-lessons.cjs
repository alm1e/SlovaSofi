// Reproducible, unassigned QA lessons. Writes JSON only; never writes to the database.
const fs=require('node:fs'),{randomUUID}=require('node:crypto');
require('../assets/js/fill-blanks.js');require('../assets/js/table.js');
require('../assets/js/exercise-format.js');
const help=require('../assets/js/activity-authoring.js'),ready=require('../assets/js/lesson-readiness.js');
const image='https://alm1e.github.io/SlovaSofi/assets/images/logo.jpg';
const audio='https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3';
const video='https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
function activity(type,extra={}){
 const a={id:randomUUID(),type,prompt:help.get(type,'ru')?.hint||type,content:'',answer:'',settings:{},...extra};
 if(help.get(type,'ru')?.insertable)help.applyExample(a,'ru');
 if(ready.incomplete(a))throw Error('Incomplete QA activity: '+type);
 return a;
}
function makeLessons(){
 const groups=[
  ['01 · Ответы, выбор и порядок',['drag-words','fill-blank','multiple-choice','order-items','sentence-order','one-of-many','true-false','table'].map(t=>activity(t))],
  ['02 · Пары, категории и словарь',['match','columns','flashcards','vocabulary'].map(t=>activity(t))],
  ['03 · Медиа и развёрнутые ответы',[
   activity('text'),activity('image',{content:image}),activity('audio',{content:audio}),activity('video',{content:video}),
   activity('open-answer'),activity('pronunciation-recording'),
   activity('listening-questions',{content:audio,prompt:'Прослушайте звук. Что вы услышали?',questions:[{id:randomUUID(),prompt:'Выберите источник звука.',content:'[Животное]\nМузыка\nТишина',answer:''}]}),
   activity('interactive-image',{content:image,prompt:'Нажмите метку на логотипе.',settings:{hotspots:[{x:50,y:50,word:'SlovaSofi',translation:'Школа словацкого языка'}]}})
  ]],
  ['04 · Ошибки, группы и сохранение',[
   activity('find-error'),
   activity('fill-blank',{prompt:'Два независимых пункта. После ответа перезагрузите урок.',questions:[{id:randomUUID(),prompt:'Первый пункт',content:'Ja [som] doma.',answer:''},{id:randomUUID(),prompt:'Второй пункт',content:'Ty [si] v škole.',answer:''}]}),
   activity('text',{content:'Заметка для преподавателя: проверьте неверный ответ, верный ответ, перезагрузку, переключение разделов и домашнюю работу. Ответы должны сохраниться.',settings:{note:true,studentVisible:false,noteColor:'#e4ae16'}}),
   activity('vocabulary',{content:'výhoda / nevýhoda [перевага / недолік]\npichanie[поколювання]',settings:{vocabularyFormat:'slash'}})
  ]]
 ];
 return groups.map(([title,activities])=>({id:randomUUID(),title:'Проверка · '+title,unit:'Проверка',activities:{format:'sections-v1',sections:[{id:randomUUID(),title:'Проверочные задания',activities}],homeworkSections:[{id:randomUUID(),title:'Домашняя работа · сохранение',activities:[activity('fill-blank',{content:'Dnes [čítam] knihu.'})]}]}}));
}
if(require.main===module){const lessons=makeLessons();fs.writeFileSync(process.argv[2]||'artifacts/qa-lessons.json',JSON.stringify(lessons,null,2));console.log('Prepared '+lessons.length+' QA lessons');}
module.exports={makeLessons};
