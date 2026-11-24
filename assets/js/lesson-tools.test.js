const test=require('node:test'),assert=require('node:assert/strict');
const {createHistory}=require('./lesson-tools.js');
test('undo and redo restore deleted blocks and discard obsolete redo branches',()=>{
 const history=createHistory();history.reset({sections:[{activities:['one','two']}]});
 history.record({sections:[{activities:['one']}]},1000);
 assert.deepEqual(history.undo(),{sections:[{activities:['one','two']}]});
 assert.deepEqual(history.redo(),{sections:[{activities:['one']}]});
 history.undo();history.record({sections:[{activities:['new']}]},2000);
 assert.equal(history.canRedo,false);assert.equal(history.canUndo,true);
});
test('typing is grouped into one undo step without losing the initial state',()=>{
 const history=createHistory();history.reset({text:''});history.record({text:'a'},1000);history.record({text:'ab'},1100);history.record({text:'abc'},1200);
 assert.deepEqual(history.undo(),{text:''});assert.deepEqual(history.redo(),{text:'abc'});
});
test('history is bounded and snapshots cannot be mutated by later edits',()=>{
 const history=createHistory(3),value={items:[]};history.reset(value);
 for(let i=0;i<5;i++){value.items.push(i);history.record(value,1000+i*1000);}
 assert.deepEqual(history.undo().items,[0,1,2,3]);assert.deepEqual(history.undo().items,[0,1,2]);assert.equal(history.undo(),null);
});
