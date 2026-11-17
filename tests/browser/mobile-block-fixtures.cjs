const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),{stripTypeScriptTypes}=require('node:module');
module.exports=function(root){
 require(path.join(root,'assets/js/fill-blanks.js'));require(path.join(root,'assets/js/table.js'));require(path.join(root,'assets/js/exercise-format.js'));
 const help=require(path.join(root,'assets/js/activity-authoring.js')),source=fs.readFileSync(path.join(root,'assets/js/teacher.js'),'utf8');
 const types=[...source.slice(source.indexOf('const activityTypes ='),source.indexOf('const MAX_ACTIVITY_QUESTIONS')).matchAll(/id: "([^"]+)"/g)].map(m=>m[1]);
 const long='najpravdepodobnejšiemuzodpovedajúcemuvysvetleniu',picture='https://example.invalid/mobile-photo.png';
 const raw=types.map(type=>{const block={id:require('node:crypto').randomUUID(),type,prompt:'Прочитайте задание и выполните его: '+long,content:'',answer:'',settings:{}};help.applyExample(block,'ru');
  if(type==='text')block.content='## Текст на телефоне\nНайдите нужное слово: '+long+'\n**Важная подсказка:** длинное объяснение должно переноситься на следующую строку.';
  if(type==='image')block.content=picture+'\nhttps://example.invalid/another-photo.png';
  if(type==='interactive-image'){block.content=picture;block.settings.hotspots=[{x:35,y:40,word:long}];}
  if(type==='listening-questions')block.content='https://example.invalid/listening.mp3';
  if(type==='audio'||type==='video')block.content='https://example.invalid/mobile.'+(type==='audio'?'mp3':'mp4');
  if(type==='open-answer')block.content='Напишите полный ответ и прикрепите ссылку на выполненное задание. '+long;
  if(type==='drag-words'){block.content='Ja '+long+' bývam v Bratislave a každý deň chodím do školy';block.answer='';}
  if(type==='order-items'||type==='sentence-order'){block.content=long+'\nJa bývam v Bratislave.\nKaždý deň chodím do školy.';block.answer='';}
  if(type==='match'){block.content=long+' = длинное объяснение для первого слова\ndom = большой дом возле школы';block.answer='';}
  if(type==='columns'){block.content='Dlhé slovenské slová: '+long+'\nKrátke slovenské slová: dom';block.answer='';}
  if(type==='table'){block.content='Anna | Bratislava | [slovenčina]\nPeter | Košice | [nemčina]';block.settings.tableHeaders=['Meno a priezvisko','Mesto trvalého pobytu','Jazyk každodennej komunikácie'];}
  if(type==='vocabulary'||type==='flashcards'||type==='phrase-list')block.content=long+' [Длинное слово для проверки переноса]\ndom [Дом возле школы]';
  block.settings.description='Описание задания: '+long;block.settings.helperText='Подсказка: '+long;return block;
 });
 raw.push({id:require('node:crypto').randomUUID(),type:'fill-blank',prompt:'Картинки и пропуски',content:`![Dom](${picture}) [dom]\n![Škola](${picture}) [škola]`,answer:'',settings:{gapLayout:'cards',wordBank:['dom','škola']}});
 raw.push({id:require('node:crypto').randomUUID(),type:'multiple-choice',prompt:'Несколько вопросов в одном задании',content:'',answer:'',settings:{},questions:[1,2].map(n=>({id:require('node:crypto').randomUUID(),prompt:'Вопрос '+n,content:long+'\nDruhá možnosť',answer:long}))});
 raw.push({...structuredClone(raw.find(block=>block.type==='vocabulary')),id:require('node:crypto').randomUUID(),type:'phrase-list'});
 raw.push({id:require('node:crypto').randomUUID(),type:'text',prompt:'Важная заметка',content:'Запомните: '+long,answer:'',settings:{note:true,noteColor:'#e4ae16',studentVisible:true}});
 const ctx=vm.createContext({URL,crypto:require('node:crypto').webcrypto,SlovaPhotoAnnotations:require(path.join(root,'assets/js/photo-annotations.js')),SlovaExerciseFormat:require(path.join(root,'assets/js/exercise-format.js')),SlovaFillBlanks:require(path.join(root,'assets/js/fill-blanks.js')),SlovaTable:require(path.join(root,'assets/js/table.js')),Deno:{serve(){},env:{get(){}}},console});
 vm.runInContext(stripTypeScriptTypes(fs.readFileSync(path.join(root,'supabase/functions/student-lessons/index.ts'),'utf8').replace(/^import .*;\r?\n/gm,'')),ctx);
 const sections=ctx.sectionsWithSafeActivities({format:'sections-v1',sections:[{id:'mobile-section',title:'Все типы блоков',activities:raw}],homeworkSections:[]});
 return {raw,safe:JSON.parse(JSON.stringify(sections[0].activities))};
};
