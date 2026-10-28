const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const test = require('node:test');
const source = fs.readFileSync(`${__dirname}/teacher.js`, 'utf8');
function readFunction(name) {
    const marker = source.includes(`async function ${name}(`) ? `async function ${name}(` : `function ${name}(`;
    const start = source.indexOf(marker);
    assert.notEqual(start, -1);
    return source.slice(start, source.indexOf('\n}', start) + 2);
}
function savingContext() {
    const button = {disabled:false,isConnected:true};
    const ctx = vm.createContext({
        structuredClone, clearTimeout, crypto:require('node:crypto').webcrypto,
        FormData:class { get(key) {return {title:'Updated lesson',unit:'A1'}[key];} },
        hasPermission:()=>true, lessonDraftAutosaveTimer:0, lessonDraftAutosaveRevision:0,
        editingLessonId:'lesson', workspaceLessonId:'lesson', lessonWorkspaceMode:'edit',
        editorReturnToPreview:true, previewActivityEdit:{lessonId:'lesson'},
        lessonWorkspaceTab:'homework', activeLessonSectionId:'section-two', activeHomeworkSectionId:'homework-two',
        lessonFormDraft:{title:'Updated lesson',unit:'A1'}, monitorClassId:'class',currentUser:{id:'teacher'},
        draftSections:[{id:'section-one',activities:[]},{id:'section-two',activities:[{type:'text',content:'Saved content'}]}],
        draftHomeworkSections:[{id:'homework-one',activities:[]},{id:'homework-two',activities:[]}],
        data:{lessons:[{id:'other',title:'Other lesson'},{id:'lesson',title:'Old title',teacherId:'owner',classIds:['class']}]},
        LESSON_UNITS:['A1','B1'],window:{SlovaExerciseFormat:require('./exercise-format.js')},
        lessonClassIds:lesson=>lesson.classIds||[],persistWorkspaceChange:async()=>true,
        clearNewLessonDraft(){ctx.clearedNewDraft=true;}, stopLiveProgressSubscription(){ctx.stopped=true;},
        render(){ctx.rendered={mode:ctx.lessonWorkspaceMode,id:ctx.workspaceLessonId,tab:ctx.lessonWorkspaceTab};},
        scrollToFirstWorkspaceActivity(){ctx.scrolled=true;},t:key=>key,lessonText:key=>key,showToast(message){ctx.toast=message;}
    });
    vm.runInContext(readFunction('saveLesson'),ctx);
    ctx.save=()=>ctx.saveLesson({preventDefault(){},currentTarget:{querySelector:()=>button}});
    ctx.button=button;return ctx;
}
test('saving an existing lesson returns to its preview, preserving both sections and the homework tab',async()=>{
    const ctx=savingContext();await ctx.save();
    assert.deepEqual(ctx.rendered,{mode:'preview',id:'lesson',tab:'homework'});
    assert.equal(ctx.activeLessonSectionId,'section-two');assert.equal(ctx.activeHomeworkSectionId,'homework-two');
    assert.equal(ctx.data.lessons[1].title,'Updated lesson');assert.equal(ctx.data.lessons[1].teacherId,'owner');
    assert.equal(ctx.data.lessons[1].sections[1].activities[0].content,'Saved content');
    assert.equal(ctx.monitorClassId,'class');assert.equal(ctx.editingLessonId,null);assert.equal(ctx.previewActivityEdit,null);
    assert.equal(ctx.editorReturnToPreview,false);assert.equal(ctx.draftSections.length,0);assert.equal(ctx.scrolled,true);
    assert.equal(ctx.toast,'toast.lessonUpdated');assert.equal(ctx.clearedNewDraft,undefined);
});
test('creating a lesson opens the newly saved lesson and clears only the new-lesson draft',async()=>{
    const ctx=savingContext();ctx.editingLessonId=null;ctx.workspaceLessonId='';ctx.lessonWorkspaceTab='lesson';
    await ctx.save();const lesson=ctx.data.lessons.at(-1);
    assert.equal(ctx.workspaceLessonId,lesson.id);assert.equal(ctx.rendered.mode,'preview');assert.equal(ctx.rendered.tab,'lesson');
    assert.equal(ctx.data.lessons[1].title,'Old title');assert.equal(ctx.clearedNewDraft,true);
    assert.equal(ctx.monitorClassId,'');assert.equal(ctx.toast,'toast.lessonCreated');
});
test('a failed save stays in the editor with its draft and enabled save control',async()=>{
    const ctx=savingContext();ctx.persistWorkspaceChange=async previous=>{ctx.data=previous;return false;};await ctx.save();
    assert.equal(ctx.lessonWorkspaceMode,'edit');assert.equal(ctx.editingLessonId,'lesson');assert.equal(ctx.draftSections.length,2);
    assert.equal(ctx.button.disabled,false);assert.equal(ctx.rendered,undefined);assert.equal(ctx.scrolled,undefined);
});

function workspaceContext() {
    const section={id:'section',title:'Reading',activities:[]},homework={id:'homework',title:'Practice',activities:[]};
    const listener={addEventListener(){}};
    const ctx=vm.createContext({
        lessonWorkspaceMode:'preview',workspaceLessonId:'lesson',lessonWorkspaceTab:'lesson',
        data:{lessons:[{id:'lesson',title:'Reading',unit:'A1',sections:[section],homeworkSections:[homework]}],classes:[]},
        activeLessonSectionId:'section',activeHomeworkSectionId:'homework',monitorClassId:'',selectedLiveStudentId:'',
        previewActivityEdit:null,lessonFormDraft:{title:'Reading',unit:'A1'},homeworkSourceLessonId:'__current__',
        editorReturnToPreview:false,liveMonitorOpen:false,currentLanguage:'en',draftSections:[section],draftHomeworkSections:[homework],
        LESSON_UNITS:['A1','B1'],editingLessonId:'lesson',
        pageContent:{innerHTML:'',querySelector:()=>listener,querySelectorAll:()=>[]},window:{SlovaLessonImportUI:{labels:()=>['Import']}},
        SlovaI18n:{locales:labels=>labels},hasPermission:()=>true,normalizeLessonSections:lesson=>lesson.sections,
        normalizePreviewHomeworkSections:lesson=>lesson.homeworkSections,ensureActivityBlockIds(){},
        activeWorkspaceSectionId:()=>ctx.lessonWorkspaceTab==='homework'?ctx.activeHomeworkSectionId:ctx.activeLessonSectionId,
        lessonProgressIndexes:()=>new Map(),renderLiveMonitor:()=>'<section class="live-monitor-bar">Answers</section>',
        lessonSectionText:key=>key,lessonText:key=>key,previewText:key=>key,t:key=>key,lessonClassNames:()=>'',emptyMessage:()=>'',
        renderActivityBlocks:()=>'',exitLessonWorkspace(){},saveLesson(){},scheduleLessonDraftAutosave(){},
        switchLessonWorkspaceMode(){},openActivityPicker(){},openLessonTextImport(){},enhanceSelects(){},bindLessonPreviewActions(){},
        bindTrueFalseEditors(){},bindLessonNotes(){},bindBlankCardSettings(){},bindActivityBlockActions(){},bindActivityAuthoring(){}
    });
    vm.runInContext(readFunction('escapeHtml')+readFunction('renderLessonWorkspace'),ctx);return ctx;
}
test('lesson mode controls appear once above the answer card, and stay available in the editor',()=>{
    const ctx=workspaceContext();ctx.renderLessonWorkspace();const html=ctx.pageContent.innerHTML;
    assert.match(html,/<aside class="lesson-monitor-rail"><nav class="lesson-workspace-tabs"/);
    assert.ok(html.indexOf('data-workspace-mode="edit"')<html.indexOf('<section class="live-monitor-bar">'));
    assert.equal((html.match(/data-workspace-mode="edit"/g)||[]).length,1);
    ctx.lessonWorkspaceMode='edit';ctx.renderLessonWorkspace();
    assert.equal((ctx.pageContent.innerHTML.match(/data-workspace-mode="preview"/g)||[]).length,1);
    assert.doesNotMatch(ctx.pageContent.innerHTML,/<aside class="lesson-monitor-rail">/);
});

test('grouped live answers retain their block identity and correction settings when rendering the lesson',()=>{
    const ctx=workspaceContext(),activity={id:'block',type:'find-error',settings:{caseSensitive:true},questions:[{id:'q1',content:'Ja [bad/good] tu.'}]};
    ctx.data.lessons[0].sections[0].activities=[activity];ctx.data.classes=[{id:'class'}];ctx.monitorClassId='class';
    ctx.liveStudentsForGroup=()=>[];ctx.lessonProgressIndexes=()=>new Map([['section:0',0]]);
    ctx.liveAnswerActivityTypes=new Set(['find-error']);ctx.activityQuestionProgressId=question=>question.id;
    ctx.renderLiveAnswerPanel=(student,question,index,questionId)=>{ctx.liveQuestion={question,index,questionId};return '';};
    ctx.renderPreviewActivity=()=>'<article>Read</article>';ctx.renderLessonWorkspace();
    assert.equal(ctx.liveQuestion.question.id,'block');assert.equal(ctx.liveQuestion.questionId,'q1');
    assert.equal(ctx.liveQuestion.question.content,'Ja [bad/good] tu.');assert.equal(ctx.liveQuestion.question.settings.caseSensitive,true);
});
