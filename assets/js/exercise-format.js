(function(root) {
    'use strict';
    const sequenceTypes = ['drag-words', 'order-items', 'sentence-order'];
    function shuffleChoices(items,random=Math.random){
        const result=[...items];for(let i=result.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}return result;
    }
    function sequenceAnswer(type, content) {
        const text = String(content || '').replace(/\[([^\[\]]+)\]/g,'$1').trim();
        if (type === 'drag-words') return text.split(/\s+/).filter(Boolean).map(word=>word.replace(/_/g,' ')).join(' / ');
        return text.split(/\r?\n/).filter(line => line.trim()).map((_, index) => index + 1).join(' / ');
    }
    function cards(content, answer = '') {
        const oldAnswers = /^https?:\/\//.test(String(answer||''))?[String(answer)]:String(answer || '').split(/\r?\n|\s*\/\s*/).map(value => value.trim());
        return String(content || '').split(/\r?\n/).map(line => line.trim()).filter(Boolean).slice(0,100).map((line,index) => {
            const bracket = line.match(/^(.+?)\s+\[([\s\S]+)\]\s*$/);
            if (bracket) return {front:bracket[1].trim(),back:bracket[2].trim()};
            const delimiter = line.includes('|') ? line.indexOf('|') : /^https?:\/\//i.test(line) ? -1 : line.indexOf(':');
            return delimiter >= 0 ? {front:line.slice(0,delimiter).trim(),back:line.slice(delimiter+1).trim()}
                : {front:line,back:oldAnswers[index] || ''};
        });
    }
    function cardsFor(activity) {
        const parsed=cards(activity.content,activity.answer);
        if (parsed.length && parsed.every(card=>card.front&&card.back)) return parsed;
        const configured=activity.cards || activity.settings?.cards;
        return Array.isArray(configured)&&configured.length ? configured.map(card=>({front:String(card.front||''),back:String(card.back||'')})) : parsed;
    }
    function cardsEditorContent(activity){
        const raw=String(activity.content||'');
        if(cards(raw).every(card=>card.front&&card.back)&&raw.trim())return raw;
        return cardsFor(activity).map(card=>card.back?`${card.front} [${card.back}]`:card.front).join('\n');
    }
    function answerFieldNeeded() { return false; }
    function parseColumns(content){
        const cards=[],invalidLines=[];let hasBrackets=false;
        String(content||'').split(/\r?\n/).forEach((source,index)=>{
            const line=source.trim();if(!line)return;
            const group=line.match(/^(.+?):\s*\[((?:\\.|[^\[\]])*)\]\s*$/);
            if(group){
                hasBrackets=true;const category=group[1].trim(),words=[];let word='';
                for(let i=0;i<group[2].length;i++){const char=group[2][i];if(char==='\\'&&/[\\/]/.test(group[2][i+1]||'')){word+=group[2][++i];}else if(char==='/'){if(word.trim())words.push(word.trim());word='';}else word+=char;}
                if(word.trim())words.push(word.trim());
                if(!category||!words.length){invalidLines.push(index+1);return;}
                words.forEach(text=>cards.push({text,category}));return;
            }
            const single=line.match(/^(.+?)\s*\[([^\[\]]+)\]\s*$/);
            if(single){hasBrackets=true;const text=single[1].trim(),category=single[2].trim();if(text&&category)cards.push({text,category});else invalidLines.push(index+1);return;}
            const separator=line.indexOf(':');
            if(separator>0&&!/[\[\]]/.test(line)){const category=line.slice(0,separator).trim(),text=line.slice(separator+1).trim();if(category&&text){cards.push({text,category});return;}}
            if(/[\[\]]/.test(line))hasBrackets=true;invalidLines.push(index+1);
        });
        return{cards,categories:[...new Set(cards.map(card=>card.category))],invalidLines,hasBrackets};
    }
    function prepare(activity){
        const result={...activity,settings:{...activity.settings}},type=activity.type;
        let content=String(activity.content||'');
        if(['multiple-choice','one-of-many'].includes(type)){
            const lines=content.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);
            if(lines.some(line=>/^\[[^\[\]]+\]$/.test(line))){
                const old=result.settings.options||[];
                const options=lines.map(line=>{const marked=line.match(/^\[([^\[\]]+)\]$/),text=marked?marked[1].trim():line;return {...old.find(option=>option.text===text),text,correct:!!marked&&!!text};});
                result.content=options.map(option=>option.text).join('\n');result.settings.options=options;result.settings.multipleAnswers=options.filter(option=>option.correct).length>1;
                result.answer=options.filter(option=>option.correct).map(option=>option.text).join(' / ');
            }
        } else if(type==='true-false'){
            const source=content||String(activity.prompt||''),match=source.match(/^([\s\S]*?)\s*\[([^\[\]]+)\]\s*$/);
            if(match){const labels=result.settings.choiceLabels||[],value=match[2].trim().toLocaleLowerCase();let index=labels.findIndex(label=>label.toLocaleLowerCase()===value);
                if(index<0){if(/^(true|правда|верно|так|да|дұрыс|pravda)$/.test(value))index=0;else if(/^(false|неправда|неверно|ні|нет|бұрыс|nepravda)$/.test(value))index=1;else if(/^(not-stated|не сказано|не вказано|nevieme|neuvedené|айтылмаған)$/.test(value))index=2;}
                result.content=match[1].trim();if(!content)result.prompt=result.content;result.answer=['true','false','not-stated'][index]||'';if(index===2)result.settings.allowNotStated=true;
            }
        } else if(['vocabulary','phrase-list'].includes(type)){
            let found=false;
            result.content=content.replace(/(^|\n)([^\n]+?)\s+\[([^\[\]\n]+)\](?=\s*(?:\/\s*https?:\/\/|<|\n|$))/g,(_,prefix,word,translation)=>{found=true;return `${prefix}${word.trim()} / ${translation.trim()}`;});
            if(found)delete result.settings.words;
        } else if(type==='columns'){
            const parsed=parseColumns(content);
            if(parsed.hasBrackets){
                const previous=Array.isArray(result.settings.cards)?result.settings.cards:[];
                result.content=parsed.cards.map(card=>`${card.category}: ${card.text}`).join('\n');
                result.settings.cards=parsed.cards.map(card=>({...previous.find(old=>old.text===card.text&&old.category===card.category),...card}));
                result.settings.categories=parsed.categories;
                result.settings.columnsInvalid=!!parsed.invalidLines.length||parsed.cards.length>100;
            }
        } else if(type==='match'){
            let found=false;result.content=content.split(/\r?\n/).map(line=>{const match=line.match(/^(.+?)\s*\[([^\[\]]+)\]\s*$/);if(!match)return line;found=true;return `${match[1].trim()} = ${match[2].trim()}`;}).join('\n');
            if(found)delete result.settings.pairs;
        } else if(type==='find-error'){
            const errors=[];let output='',last=0;
            for(const match of content.matchAll(/\[([^\[\]\/\n]+)\/([^\[\]\n]+)\]/g)){output+=content.slice(last,match.index);errors.push({index:(output.match(/\S+/g)||[]).length,correction:match[2].trim()});output+=match[1].trim();last=match.index+match[0].length;}
            if(errors.length){result.content=output+content.slice(last);result.settings.errors=errors;}
        } else if(type==='open-answer'){
            const match=content.match(/\s*\[([^\[\]]+)\]\s*$/);if(match){result.content=content.slice(0,match.index).trimEnd();result.answer=match[1].trim();}
        } else if(sequenceTypes.includes(type)&&/\[[^\[\]]+\]/.test(content)){
            result.content=content.replace(/\[([^\[\]]+)\]/g,'$1');result.answer=sequenceAnswer(type,result.content);result.settings.answerFromContent=true;
        }
        return result;
    }
    function editorContent(activity){
        const type=activity.type,raw=String(activity.content||''),answer=String(activity.answer||'').trim(),settings=activity.settings||{};
        if(type==='flashcards')return cardsEditorContent(activity);
        if(sequenceTypes.includes(type)&&raw.trim()&&!/\[[^\[\]]+\]/.test(raw))return type==='drag-words'?`[${raw}]`:raw.split('\n').map(line=>line.trim()?`[${line}]`:line).join('\n');
        if(type==='fill-blank'){
            const parsed=root.SlovaFillBlanks.parse(raw,answer,settings);
            return parsed.parts.map((part,index)=>part+(index<parsed.groups.length?`[${parsed.groups[index].join('/')}]`:'')).join('');
        }
        if(type==='table'){
            const parsed=root.SlovaTable.parse(raw,answer,settings);
            return parsed.rows.map(row=>row.map(cell=>cell.replace(/\{\{blank:(\d+)\}\}/g,(_,index)=>`[${(parsed.groups[Number(index)]||[]).join('/')}]`)).join(' / ')).join('\n');
        }
        if(type==='true-false')return /\[[^\[\]]+\]\s*$/.test(raw)?raw:`${raw||activity.prompt||''}${answer?` [${answer}]`:''}`;
        if(['multiple-choice','one-of-many'].includes(type)&&!dropdown(raw)&&!raw.split('\n').some(line=>/^\[[^\[\]]+\]$/.test(line.trim()))){
            const lines=raw.split(/\r?\n/).filter(line=>line.trim());
            if(type==='one-of-many'&&lines[0]?.includes('___')){const options=lines.slice(1),correct=options.find(option=>option===answer)||options[Number(answer)-1];return correct?lines[0].replace(/___/g,`[${[correct,...options.filter(option=>option!==correct)].join('/')}]`):raw;}
            const configured=settings.options||[],options=configured.length?configured.map(option=>option.text):lines;
            return options.map((line,index)=>configured.some(option=>option.text===line&&option.correct)||line===answer||answer!==''&&String(index)===answer?`[${line}]`:line).join('\n');
        }
        if(['match','columns','vocabulary','phrase-list'].includes(type)){
            if(/\[[^\[\]]+\]/.test(raw))return raw;
            if(type==='match')return (settings.pairs?.length?settings.pairs.map(pair=>`${pair.left} = ${pair.right}`):raw.split('\n')).map(line=>{const index=line.indexOf('=');return index<0?line:`${line.slice(0,index).trim()} [${line.slice(index+1).trim()}]`;}).join('\n');
            if(type==='columns'){
                const cards=settings.cards?.length?settings.cards:parseColumns(raw).cards,groups=new Map();
                cards.forEach(card=>{if(!groups.has(card.category))groups.set(card.category,[]);groups.get(card.category).push(card.text);});
                return [...groups].map(([category,words])=>`${category}: [${words.map(word=>String(word).replace(/\\/g,'\\\\').replace(/\//g,'\\/')).join('/')}]`).join('\n')||raw;
            }
            if(root.SlovaPhraseList){const words=root.SlovaPhraseList.wordsFor(activity);return words.map(word=>`${word.word} [${word.translation}]${word.audio?` / ${word.audio}`:''}${word.example?` <${word.example}>`:''}`).join('\n');}
            return raw.split('\n').map(line=>{const index=line.includes('|')?line.indexOf('|'):line.lastIndexOf(' / ');const width=line.includes('|')?1:3;return index<0?line:`${line.slice(0,index).trim()} [${line.slice(index+width).trim()}]`;}).join('\n');
        }
        if(type==='find-error'&&settings.errors?.length&&!/\[[^\]]+\/[^\]]+\]/.test(raw)){let index=0;return raw.replace(/\S+/g,word=>{const error=settings.errors.find(error=>Number(error.index)===index++);return error?`[${word}/${error.correction}]`:word;});}
        if(type==='open-answer'&&answer&&!/\[[^\[\]]+\]\s*$/.test(raw))return `${raw}\n[${answer}]`.trim();
        return raw;
    }
    function applyContent(activity,value,type=activity.type){
        activity.content=value;
        if(['multiple-choice','one-of-many','true-false','find-error','open-answer','fill-blank','table'].includes(type)){
            activity.answer='';activity.settings={...activity.settings};
            if(['multiple-choice','one-of-many'].includes(type)&&activity.settings.options)activity.settings.options=activity.settings.options.map(option=>({...option,correct:false}));
            if(type==='find-error')delete activity.settings.errors;
        }
        if(sequenceTypes.includes(type)){activity.answer=sequenceAnswer(type,value);activity.settings={...activity.settings,answerFromContent:true};}
        if(type==='match'&&activity.settings){delete activity.settings.pairs;}
        if(type==='columns'&&activity.settings){delete activity.settings.cards;delete activity.settings.categories;delete activity.settings.columnsInvalid;}
        if(['vocabulary','phrase-list'].includes(type)&&activity.settings){delete activity.settings.words;}
    }
    function applyQuestionContent(activity,question,value){
        const type=activity.type==='listening-questions'?'multiple-choice':activity.type;
        (activity.questions||[]).forEach(other=>{if(other!==question)other.content=editorContent({...other,type,settings:activity.settings});});
        activity.settings={...activity.settings};
        if(['multiple-choice','one-of-many'].includes(type)&&activity.settings.options)activity.settings.options=activity.settings.options.map(option=>({...option,correct:false}));
        if(type==='match')delete activity.settings.pairs;
        if(type==='columns'){delete activity.settings.cards;delete activity.settings.categories;delete activity.settings.columnsInvalid;}
        applyContent(question,value,type);
    }
    function dropdown(content){
        const groups=[];
        const text=String(content||'').replace(/\[([^\[\]\n]+)\]/g,(full,inner)=>{
            const values=inner.split('/').map(value=>value.trim());
            if(values.length<2||values.some(value=>!value))return full;
            groups.push(values);return '___';
        });
        return groups.length?{content:text,choices:groups,answers:groups.map(values=>values[0])}:null;
    }
    function contentEdited(activity) {
        if (sequenceTypes.includes(activity.type)) {
            activity.answer=sequenceAnswer(activity.type,activity.content);
            activity.settings={...activity.settings,answerFromContent:true};
        }
    }
    function errorSpec(activity){
        const prepared=prepare(activity),tokens=String(prepared.content||'').match(/\S+/g)||[],expected=new Map();
        for(const error of Array.isArray(prepared.settings?.errors)?prepared.settings.errors:[]){if(!error||typeof error!=='object')continue;const index=Number(error.index),correction=String(error.correction||'').trim();if(Number.isInteger(index)&&index>=0&&index<tokens.length&&correction)expected.set(index,correction);}
        return{tokens,expected,caseSensitive:prepared.settings?.caseSensitive===true};
    }
    function errorParse(value){if(typeof value==='string'){try{return JSON.parse(value);}catch{return null;}}return value&&typeof value==='object'&&!Array.isArray(value)?value:null;}
    function errorNormalize(value,sensitive){const text=String(value||'').normalize('NFC').trim().replace(/\s+/g,' ');return sensitive?text:text.toLocaleLowerCase();}
    function errorState(activity,response,entry={}){
        const spec=errorSpec(activity),raw=errorParse(response)||{},state={version:2,total:spec.expected.size,selected:{},fixes:{},events:[]};
        const valid=index=>Number.isInteger(Number(index))&&Number(index)>=0&&Number(index)<spec.tokens.length;
        if(raw.version===2){
            for(const index of Object.keys(raw.selected||{}))if(valid(index))state.selected[Number(index)]=spec.expected.has(Number(index));
            for(const [index,fix] of Object.entries(raw.fixes||{}))if(valid(index)&&state.selected[index]===true&&fix&&typeof fix==='object'){
                const text=String(fix.text||'').slice(0,500),checkedText=typeof fix.checkedText==='string'?fix.checkedText.slice(0,500):undefined;
                const checkedCorrect=checkedText!==undefined?errorNormalize(checkedText,spec.caseSensitive)===errorNormalize(spec.expected.get(Number(index)),spec.caseSensitive):null;
                state.fixes[index]={text,attempts:Math.max(0,Math.min(1000000,Number(fix.attempts)||0)),wrongAttempts:Math.max(0,Math.min(1000000,Number(fix.wrongAttempts)||0)),...(checkedText!==undefined?{checkedText}:{}),checkedCorrect,correct:checkedText===text?checkedCorrect:null};
            }
            state.events=(Array.isArray(raw.events)?raw.events:[]).slice(-100).filter(event=>event&&typeof event.id==='string'&&valid(event.index)).map(event=>({id:event.id.slice(0,100),kind:event.kind==='correction'?'correction':'select',index:Number(event.index),correct:event.correct===true,...(event.kind==='correction'?{value:String(event.value||'').slice(0,500)}:{}),at:String(event.at||'').slice(0,40)}));
        }else if(raw.index!==''&&raw.index!==null&&raw.index!==undefined&&valid(raw.index)){
            const index=Number(raw.index);state.selected[index]=spec.expected.has(index);
            if(state.selected[index]){const text=String(raw.correction||'').slice(0,500),checked=entry.draft!==true&&typeof entry.correct==='boolean';const correct=checked?errorNormalize(text,spec.caseSensitive)===errorNormalize(spec.expected.get(index),spec.caseSensitive):null;state.fixes[index]={text,...(checked?{checkedText:text}:{}),checkedCorrect:correct,correct,attempts:checked?1:0,wrongAttempts:correct===false?1:0};}
        }
        for(const index of Object.keys(state.selected))if(state.selected[index]===true&&!state.fixes[index])state.fixes[index]={text:'',correct:null,attempts:0,wrongAttempts:0};
        state.complete=state.total>0&&[...spec.expected.keys()].every(index=>state.selected[index]===true&&state.fixes[index]?.correct===true);
        return state;
    }
    function errorEvent(activity,response,event,entry={},now=new Date().toISOString()){
        const spec=errorSpec(activity),state=errorState(activity,response,entry),index=Number(event?.index),id=String(event?.id||'');
        if(!id||id.length>100||event?.index===''||event?.index===null||!Number.isInteger(index)||index<0||index>=spec.tokens.length||!['select','correction'].includes(event?.kind))throw Error('Invalid error-check event.');
        if(state.events.some(old=>old.id===id))return state;
        if(event.kind==='select'){
            if(Object.prototype.hasOwnProperty.call(state.selected,index))return state;
            const correct=spec.expected.has(index);state.selected[index]=correct;if(correct)state.fixes[index]={text:'',correct:null,attempts:0,wrongAttempts:0};
            state.events.push({id,kind:'select',index,correct,at:now});
        }else{
            if(state.selected[index]!==true)throw Error('Select an incorrect word first.');
            const value=String(event.value||'').trim();if(!value||value.length>500)throw Error('Enter a correction of up to 500 characters.');
            const fix=state.fixes[index],correct=errorNormalize(value,spec.caseSensitive)===errorNormalize(spec.expected.get(index),spec.caseSensitive);
            state.fixes[index]={text:value,checkedText:value,correct,attempts:fix.attempts+1,wrongAttempts:fix.wrongAttempts+(correct?0:1)};
            state.events.push({id,kind:'correction',index,value,correct,at:now});
        }
        state.events=state.events.slice(-100);return errorState(activity,state);
    }
    function errorDraft(activity,response,drafts,entry={}){
        const state=errorState(activity,response,entry),raw=errorParse(drafts)||{};
        for(const [index,value] of Object.entries(raw.drafts||{}))if(state.selected[index]===true&&typeof value==='string'&&value.length<=500){state.fixes[index].text=value.trim();}
        return errorState(activity,state);
    }
    function errorStats(state){return{corrected:Object.values(state.fixes||{}).filter(fix=>fix.correct===true).length,mistakes:Object.values(state.selected||{}).filter(value=>value===false).length+Object.values(state.fixes||{}).reduce((sum,fix)=>sum+(Number(fix.wrongAttempts)||0),0)};}
    const findErrors={spec:errorSpec,parse:errorParse,state:errorState,event:errorEvent,draft:errorDraft,stats:errorStats};
    const copy={
        ru:['Например: Ja [bývam] v Bratislave. Вместо слова в скобках появится пропуск.','Напишите слова в правильном порядке: Ja bývam v Bratislave. Они перемешаются автоматически.','Напишите по одному элементу в строке в правильном порядке — они перемешаются автоматически.','Напишите предложения в правильном порядке, каждое с новой строки — они перемешаются автоматически.','Например: Anna / [Bratislava] / [slovenčina]. Ответы в скобках станут пропусками.','Например: auto [машина]. Каждая новая строка — новая карточка.','Кнопки с ответами','Пропуск со списком','Например: выберите столицу — Bratislava, Košice или Žilina.','Например: Ja [bývam/bývaš/býva] v Bratislave. Первый вариант правильный.'],
        ua:['Наприклад: Ja [bývam] v Bratislave. Замість слова в дужках з’явиться пропуск.','Напишіть слова в правильному порядку: Ja bývam v Bratislave. Вони перемішаються автоматично.','Напишіть по одному елементу в рядку в правильному порядку — вони перемішаються автоматично.','Напишіть речення в правильному порядку, кожне з нового рядка — вони перемішаються автоматично.','Наприклад: Anna / [Bratislava] / [slovenčina]. Відповіді в дужках стануть пропусками.','Наприклад: auto [машина]. Кожен новий рядок — нова картка.','Кнопки з відповідями','Пропуск зі списком','Наприклад: оберіть столицю — Bratislava, Košice або Žilina.','Наприклад: Ja [bývam/bývaš/býva] v Bratislave. Перший варіант правильний.'],
        en:['Example: Ja [bývam] v Bratislave. The bracketed word becomes a gap.','Write words in the correct order: Ja bývam v Bratislave. They will be shuffled automatically.','Write one item per line in the correct order. They will be shuffled automatically.','Write sentences in the correct order, one per line. They will be shuffled automatically.','Example: Anna / [Bratislava] / [slovenčina]. Bracketed answers become gaps.','Example: auto [car]. Each new line creates a new card.','Answer buttons','Gap with a dropdown','Example: choose the capital — Bratislava, Košice or Žilina.','Example: Ja [bývam/bývaš/býva] v Bratislave. The first option is correct.'],
        sk:['Napríklad: Ja [bývam] v Bratislave. Slovo v zátvorkách sa zmení na medzeru.','Napíšte slová v správnom poradí: Ja bývam v Bratislave. Automaticky sa premiešajú.','Napíšte položky v správnom poradí, každú na nový riadok. Automaticky sa premiešajú.','Napíšte vety v správnom poradí, každú na nový riadok. Automaticky sa premiešajú.','Napríklad: Anna / [Bratislava] / [slovenčina]. Odpovede v zátvorkách sa zmenia na medzery.','Napríklad: auto [машина]. Každý nový riadok vytvorí novú kartičku.','Tlačidlá s odpoveďami','Medzera s výberom','Napríklad: vyberte hlavné mesto — Bratislava, Košice alebo Žilina.','Napríklad: Ja [bývam/bývaš/býva] v Bratislave. Prvá možnosť je správna.'],
        kk:['Мысалы: Ja [bývam] v Bratislave. Жақшадағы сөз бос орынға айналады.','Сөздерді дұрыс ретпен жазыңыз: Ja bývam v Bratislave. Олар автоматты түрде араласады.','Элементтерді дұрыс ретпен, әрқайсын жаңа жолға жазыңыз. Олар автоматты түрде араласады.','Сөйлемдерді дұрыс ретпен, әрқайсын жаңа жолға жазыңыз. Олар автоматты түрде араласады.','Мысалы: Anna / [Bratislava] / [slovenčina]. Жақшадағы жауаптар бос орынға айналады.','Мысалы: auto [көлік]. Әр жаңа жол жаңа карточка жасайды.','Жауап батырмалары','Тізімі бар бос орын','Мысалы: астананы таңдаңыз — Bratislava, Košice немесе Žilina.','Мысалы: Ja [bývam/bývaš/býva] v Bratislave. Бірінші нұсқа дұрыс.']
    };
    function hint(type,language){const index={'fill-blank':0,'drag-words':1,'order-items':2,'sentence-order':3,table:4,flashcards:5,'multiple-choice':8,'one-of-many':9}[type];return index===undefined?'':(copy[language]||copy.en)[index];}
    root.SlovaExerciseFormat={cards,cardsFor,cardsEditorContent,sequenceAnswer,sequenceTypes,answerFieldNeeded,contentEdited,dropdown,hint,copy,prepare,editorContent,applyContent,applyQuestionContent,shuffleChoices,parseColumns,findErrors};
    if(typeof module!=='undefined')module.exports=root.SlovaExerciseFormat;
})(typeof window!=='undefined'?window:globalThis);
