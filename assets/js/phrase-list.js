(function () {
    const labels = SlovaI18n.locales({
        ru: { all: 'Добавить все слова', add: 'Добавить в словарь', added: 'Добавлено', listen: 'Прослушать', empty: 'Добавьте слова и переводы: слово | перевод', saved: 'Мой словарь', local: 'Словарь сохраняется в этом браузере для вашей учётной записи.', preview: 'Предпросмотр: добавление слов доступно ученику в уроке.', error: 'Не удалось сохранить словарь. Проверьте настройки браузера.', audioError: 'Не удалось воспроизвести произношение.', remove: 'Удалить из словаря', noWords: 'В словаре пока нет слов.' },
        ua: { all: 'Додати всі слова', add: 'Додати до словника', added: 'Додано', listen: 'Прослухати', empty: 'Додайте слова та переклади: слово | переклад', saved: 'Мій словник', local: 'Словник зберігається в цьому браузері для вашого облікового запису.', preview: 'Попередній перегляд: додавання слів доступне учню в уроці.', error: 'Не вдалося зберегти словник. Перевірте налаштування браузера.', audioError: 'Не вдалося відтворити вимову.', remove: 'Видалити зі словника', noWords: 'У словнику поки немає слів.' },
        en: { all: 'Add all words', add: 'Add to vocabulary', added: 'Added', listen: 'Listen', empty: 'Add words and translations: word / translation', saved: 'My vocabulary', local: 'Vocabulary is saved in this browser for your account.', preview: 'Preview: students can save words in their lesson.', error: 'Could not save vocabulary. Check your browser settings.', audioError: 'Could not play pronunciation.', remove: 'Remove from vocabulary', noWords: 'No saved words yet.' }
    });
    const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
    const safeAudio = value => { try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? url.href : ''; } catch { return ''; } };
    function parse(content) {
        return String(content || '').split(/\r?\n/).flatMap(line => {
            let word, translation, audio = '';
            if (line.includes('|')) [word, translation, audio = ''] = line.split('|').map(part => part.trim());
            else {
                const audioMatch = line.match(/\s+\/\s+(https?:\/\/\S+)\s*$/i);
                if (audioMatch) { audio = audioMatch[1]; line = line.slice(0, audioMatch.index); }
                // The last spaced slash separates the translation; earlier slashes can separate variants.
                let delimiter = line.lastIndexOf(' / '), width = 3;
                if (delimiter < 0) { delimiter = line.indexOf('/'); width = 1; }
                if (delimiter < 0) return [];
                word = line.slice(0, delimiter).trim(); translation = line.slice(delimiter + width).trim();
            }
            return word && translation ? [{ word, translation, audio: safeAudio(audio) }] : [];
        }).slice(0, 100);
    }
    const key = word => JSON.stringify([word.word.trim().toLocaleLowerCase('sk'), word.translation.trim().toLocaleLowerCase()]);
    const storageKey = user => `slovasofi:vocabulary:${user}`;
    function read(user) {
        try { const words = JSON.parse(localStorage.getItem(storageKey(user)) || '[]'); return Array.isArray(words) ? words.filter(w => typeof w?.word === 'string' && typeof w?.translation === 'string') : []; } catch { return []; }
    }
    const icons = {
        add: '<path d="M4 5h12M4 10h12M4 15h7M17 13v8M13 17h8"/>',
        listen: '<path d="M4 9h4l5-5v16l-5-5H4zM17 8a6 6 0 0 1 0 8M20 5a10 10 0 0 1 0 14"/>',
        check: '<path d="m5 12 4 4L19 6"/>'
    };
    const icon = name => `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name]}</svg>`;
    function render(words, language = 'ru', user = '') {
        const text = labels[language] || labels.ru;
        const saved = new Set(user ? read(user).map(key) : []);
        const rows = words.slice(0, 100).map(word => {
            const added = saved.has(key(word));
            return `<li class="phrase-row" data-phrase-word="${escape(word.word)}" data-phrase-translation="${escape(word.translation)}" data-phrase-audio="${escape(safeAudio(word.audio))}"><button type="button" class="phrase-icon" data-phrase-add aria-label="${escape((added ? text.added : text.add) + ': ' + word.word)}" title="${escape(added ? text.added : text.add)}" ${!user || added ? 'disabled' : ''}>${icon(added ? 'check' : 'add')}</button><button type="button" class="phrase-icon phrase-listen" data-phrase-listen aria-label="${escape(text.listen + ': ' + word.word)}" title="${escape(text.listen)}">${icon('listen')}</button><div class="phrase-copy"><strong>${escape(word.word)}</strong><span>${escape(word.translation)}</span></div></li>`;
        }).join('');
        return `<section class="phrase-list" data-phrase-list data-phrase-user="${escape(user)}" data-phrase-language="${escape(language)}"><button type="button" class="phrase-add-all" data-phrase-all ${!user || !words.length || words.every(w => saved.has(key(w))) ? 'disabled' : ''}>${icon('add')}<span>${text.all}</span></button>${rows ? `<ul class="phrase-rows">${rows}</ul>` : `<p class="phrase-hint">${text.empty}</p>`}<p class="phrase-hint">${user ? text.local : text.preview}</p><p class="phrase-status" role="status" aria-live="polite"></p>${user ? `<details class="phrase-saved"><summary>${text.saved}</summary><div data-phrase-saved></div></details>` : ''}</section>`;
    }
    const wordFrom = row => ({ word: row.dataset.phraseWord, translation: row.dataset.phraseTranslation, audio: row.dataset.phraseAudio });
    function refresh(root) {
        const user = root.dataset.phraseUser;
        const text = labels[root.dataset.phraseLanguage] || labels.ru;
        const words = read(user), keys = new Set(words.map(key));
        const rows = [...root.querySelectorAll('.phrase-row')];
        rows.forEach(row => {
            const button = row.querySelector('[data-phrase-add]'), added = keys.has(key(wordFrom(row)));
            button.disabled = added; button.innerHTML = icon(added ? 'check' : 'add');
            button.title = added ? text.added : text.add;
            button.setAttribute('aria-label', `${button.title}: ${row.dataset.phraseWord}`);
        });
        root.querySelector('[data-phrase-all]').disabled = !rows.length || rows.every(row => keys.has(key(wordFrom(row))));
        root.querySelector('[data-phrase-saved]').innerHTML = words.length ? words.map((word, index) => `<div class="phrase-saved-row"><span><strong>${escape(word.word)}</strong> — ${escape(word.translation)}</span><button type="button" class="phrase-icon" data-phrase-remove="${index}" aria-label="${escape(text.remove + ': ' + word.word)}">×</button></div>`).join('') : `<p>${text.noWords}</p>`;
    }
    let audio = null;
    document.addEventListener('click', async event => {
        const root = event.target.closest('[data-phrase-list]');
        if (!root) return;
        const text = labels[root.dataset.phraseLanguage] || labels.ru;
        const status = root.querySelector('.phrase-status');
        if (event.target.closest('[data-phrase-listen]')) {
            const word = wordFrom(event.target.closest('.phrase-row'));
            audio?.pause(); window.speechSynthesis?.cancel();
            try {
                if (safeAudio(word.audio)) { audio = new Audio(safeAudio(word.audio)); await audio.play(); }
                else if (window.speechSynthesis && window.SpeechSynthesisUtterance) {
                    const utterance = new SpeechSynthesisUtterance(word.word); utterance.lang = 'sk-SK'; utterance.rate = .85;
                    utterance.onerror = event => { if (!['interrupted', 'canceled'].includes(event.error)) status.textContent = text.audioError; };
                    window.speechSynthesis.speak(utterance);
                } else status.textContent = text.audioError;
            } catch { status.textContent = text.audioError; }
            return;
        }
        const user = root.dataset.phraseUser;
        if (!user) return;
        if (event.target.closest('summary')) { refresh(root); return; }
        const add = event.target.closest('[data-phrase-add], [data-phrase-all]');
        const remove = event.target.closest('[data-phrase-remove]');
        if (!add && !remove) return;
        let words = read(user);
        if (remove) words.splice(Number(remove.dataset.phraseRemove), 1);
        else {
            const rows = add.hasAttribute('data-phrase-all') ? root.querySelectorAll('.phrase-row') : [add.closest('.phrase-row')];
            const keys = new Set(words.map(key));
            for (const row of rows) { const word = wordFrom(row); if (!keys.has(key(word))) { words.push(word); keys.add(key(word)); } }
        }
        try {
            localStorage.setItem(storageKey(user), JSON.stringify(words));
            document.querySelectorAll('[data-phrase-list]').forEach(block => { if (block.dataset.phraseUser === user) refresh(block); });
            status.textContent = remove ? text.remove : text.added;
        } catch { status.textContent = text.error; }
    });
    window.addEventListener('pagehide', () => { audio?.pause(); window.speechSynthesis?.cancel(); });
    function wordsFor(activity) {
        const parsed = parse(activity.content);
        if (activity.settings?.vocabularyFormat === 'slash' || parsed.length) return parsed;
        const words = activity.settings?.words || activity.cards || [];
        return Array.isArray(words) ? words.flatMap(item => {
            const word = item?.word ?? item?.front, translation = item?.translation ?? item?.back;
            return typeof word === 'string' && typeof translation === 'string' && word.trim() && translation.trim()
                ? [{ word, translation, audio: safeAudio(item.audio) }] : [];
        }).slice(0, 100) : [];
    }
    function editorContent(activity) {
        if (activity.settings?.vocabularyFormat === 'slash' || parse(activity.content).length) return activity.content || '';
        return wordsFor(activity).map(word => `${word.word} / ${word.translation}${word.audio ? ` / ${word.audio}` : ''}`).join('\n');
    }
    window.SlovaPhraseList = { parse, render, wordsFor, editorContent };
})();
