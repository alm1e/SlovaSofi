const test=require('node:test'),assert=require('node:assert/strict'),core=require('./photo-annotations.js');
const url='https://school.example/photo.jpg',pen={type:'pen',color:'#e53935',width:4,points:[[0,0],[1000,1000]]};
test('photo annotations preserve strokes and text while discarding extra properties',()=>{
 const data=core.validate({[url]:[pen,{type:'text',color:'#168653',width:2,x:50,y:100,text:'<script>word</script>',extra:'discard'}]});
 assert.equal(data[url][1].text,'<script>word</script>');assert.equal('extra' in data[url][1],false);assert.deepEqual(core.validate(JSON.stringify(data)),data);
});
test('invalid geometry, URLs, colours, text and excessive payloads are rejected',()=>{
 for(const op of [{...pen,points:[[NaN,1]]},{...pen,points:[[-1,20]]},{...pen,color:'red'},{...pen,width:100},{...pen,points:Array(501).fill([0,0])},{type:'text',color:'#112233',width:2,x:0,y:0,text:'x'.repeat(201)}])assert.throws(()=>core.validate({[url]:[op]}));
 assert.throws(()=>core.validate({'javascript:alert(1)':[pen]}));assert.throws(()=>core.validate({[url]:Array(101).fill(pen)}));assert.throws(()=>core.validate('x'.repeat(60001)));
 const big={...pen,points:Array(500).fill([1,1])};assert.throws(()=>core.validate({[url]:Array(7).fill(big)}));
});
test('corrupt historical photo data falls back safely and empty annotations remain valid',()=>{
 assert.deepEqual(core.read('broken'),{});assert.deepEqual(Object.keys(core.validate({})),[]);
});

test('photo answer fields preserve identity, geometry and Unicode answers with bounded validation',()=>{
 const field={type:'field',id:'gap-1',x:250,y:100,w:80,h:35},answer={type:'field-answer',id:'gap-1',text:'í'};
 assert.deepEqual(core.validate({[url]:[field]})[url][0],field);assert.deepEqual(core.validate({[url]:[answer]})[url][0],answer);
 for(const invalid of [{...field,w:0},{...field,x:950,w:80},{...field,h:NaN},{...field,id:'<bad>'},{...answer,text:'x'.repeat(201)}])assert.throws(()=>core.validate({[url]:[invalid]}));
 assert.throws(()=>core.validate({[url]:[field,field]}));
});
