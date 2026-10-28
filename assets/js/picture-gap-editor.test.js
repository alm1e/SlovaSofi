const test=require('node:test'),assert=require('node:assert/strict');
const blanks=require('./fill-blanks.js');require('./table.js');require('./exercise-format.js');
const pictures=require('./picture-gap-editor.js');

test('picture edits preserve surrounding text, alternatives and independent gap order',()=>{
    const source='Názvy krajín\n![Flag](https://test.invalid/de.png) [Nemecko/Germany]\nJa [bývam] tu.\n![Flag](https://test.invalid/fr.png) [Francúzsko]';
    const cards=pictures.scan(source).cards;assert.equal(cards.length,2);assert.equal(cards[0].answer,'Nemecko/Germany');assert.equal(pictures.scan(source).other.length,2);
    const edited=pictures.change(source,1,{answer:'Francúzsko/France'});assert.deepEqual(blanks.parse(edited).groups,[['Nemecko','Germany'],['bývam'],['Francúzsko','France']]);
    assert.match(edited,/Ja \[bývam\] tu/);assert.equal(pictures.scan(source).cards[1].answer,'Francúzsko');
    const removed=pictures.change(edited,0,null);assert.deepEqual(blanks.parse(removed).answers,['bývam','Francúzsko']);assert.ok(removed.startsWith('Názvy krajín'));
    const moved=pictures.move(source,0,1);assert.deepEqual(blanks.parse(moved).answers,['Francúzsko','bývam','Nemecko']);assert.match(moved,/Ja \[bývam\] tu/);
});
test('picture source round-trips valid links, rejects unsafe URLs and permits an unfinished answer without destroying the image',()=>{
    assert.equal(pictures.imageUrl('javascript:alert(1)'), '');assert.equal(pictures.imageUrl('data:image/png,abc'),'');
    const line=pictures.lineFor({url:'https://test.invalid/flag(1).png',answer:'Nemecko',alt:'Flag'});assert.match(line,/%281%29/);assert.equal(pictures.scan(line).cards.length,1);
    const unfinished=pictures.change(line,0,{answer:''});assert.equal(blanks.parse(unfinished).groups[0].length,0);assert.equal(pictures.scan(unfinished).cards[0].url,pictures.scan(line).cards[0].url);
    for(const answer of ['bad\nanswer','[bad]','///'])assert.equal(pictures.validAnswer(answer),false);
    assert.throws(()=>pictures.lineFor({url:'file:///test.png',answer:'word'}));assert.equal(pictures.change('',0,{answer:'word'}),null);
});
test('legacy picture answers become editable cards and render in both main and quick editor fields without mutating the lesson',()=>{
    const activity={type:'fill-blank',content:'![Flag](https://test.invalid/de.png) ___\n![Flag](https://test.invalid/fr.png) []',answer:'Nemecko / Francúzsko',settings:{hints:['Keep']}};
    const before=JSON.stringify(activity);
    for(const language of ['ru','ua','en','sk','kk']){
        const html=pictures.render(activity,language,'<textarea data-field="content"></textarea>');
        assert.match(html,/data-picture-mode="cards"/);assert.match(html,/data-picture-file/);assert.match(html,/data-picture-drop/);assert.match(html,/value="Nemecko"/);assert.match(html,/value="Francúzsko"/);assert.match(html,/data-picture-source hidden/);assert.doesNotMatch(html,/data-gap-card-url/);
        assert.equal(JSON.stringify(activity),before);
    }
});
