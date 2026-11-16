(() => {
    const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
    const copies = SlovaI18n.locales({
        ua: { audit:'Журнал дій', versions:'Історія версій', loading:'Завантаження…', empty:'Записів поки немає', more:'Показати ще', close:'Закрити', system:'Система', staff:'Співробітник', version:'Версія', view:'Переглянути', back:'До списку версій', restore:'Відновити цю версію', notice:'Відновлення створить нову версію. Поточна залишиться в історії. Призначення й прогрес учнів збережуться.', restored:'Версію відновлено.', error:'Не вдалося завантажити історію.', conflict:'Урок уже змінився. Закрийте історію й відкрийте її знову.', current:'Це вже поточний вміст уроку.', saveFirst:'Спочатку збережіть зміни уроку.', lesson:'Урок', homework:'Домашня робота', answer:'Відповідь', retry:'Спробувати знову', changed:'Змінено', created:'Створено', deleted:'Видалено', archived:'Перенесено до архіву', unarchived:'Відновлено з архіву', assignment:'Призначення уроку', student:'Учень класу', calendar:'Розклад', role:'Роль співробітника', editorGranted:'Надано право редагування', editorRevoked:'Скасовано право редагування' },
        ru: { audit:'Журнал действий', versions:'История версий', loading:'Загрузка…', empty:'Записей пока нет', more:'Показать ещё', close:'Закрыть', system:'Система', staff:'Сотрудник', version:'Версия', view:'Посмотреть', back:'К списку версий', restore:'Восстановить эту версию', notice:'Восстановление создаст новую версию. Текущая останется в истории. Назначения и прогресс учеников сохранятся.', restored:'Версия восстановлена.', error:'Не удалось загрузить историю.', conflict:'Урок уже изменился. Закройте историю и откройте её заново.', current:'Это уже текущее содержимое урока.', saveFirst:'Сначала сохраните изменения урока.', lesson:'Урок', homework:'Домашняя работа', answer:'Ответ', retry:'Попробовать снова', changed:'Изменено', created:'Создано', deleted:'Удалено', archived:'Перенесён в архив', unarchived:'Восстановлен из архива', assignment:'Назначение урока', student:'Ученик класса', calendar:'Расписание', role:'Роль сотрудника', editorGranted:'Предоставлено право редактирования', editorRevoked:'Снято право редактирования' },
        en: { audit:'Activity log', versions:'Version history', loading:'Loading…', empty:'No records yet', more:'Load more', close:'Close', system:'System', staff:'Staff member', version:'Version', view:'View', back:'Back to versions', restore:'Restore this version', notice:'Restoring creates a new version and keeps the current version in history. Assignments and student progress are preserved.', restored:'Version restored.', error:'Could not load history.', conflict:'This lesson changed. Close the history and open it again.', current:'This is already the current lesson content.', saveFirst:'Save lesson changes first.', lesson:'Lesson', homework:'Homework', answer:'Answer', retry:'Try again', changed:'Updated', created:'Created', deleted:'Deleted', archived:'Archived', unarchived:'Restored from archive', assignment:'Lesson assignment', student:'Class student', calendar:'Schedule', role:'Staff role', editorGranted:'Editing permission granted', editorRevoked:'Editing permission revoked' }
    });
    const text = (language, key) => (copies[language] || copies.en)[key];
    function actionLabel(action, language) {
        const t = key => text(language,key), [entity, operation] = action.split('.');
        if (action.startsWith('homework.')) return `${({ua:'Домашня робота',ru:'Домашняя работа',en:'Homework'})[language] || 'Homework'} · ${({assigned:{ua:'призначено',ru:'назначена',en:'assigned'},updated:{ua:'змінено',ru:'изменена',en:'updated'},deleted:{ua:'видалено',ru:'удалена',en:'deleted'},in_progress:{ua:'у роботі',ru:'в работе',en:'in progress'},submitted:{ua:'здано',ru:'сдана',en:'submitted'},reviewed:{ua:'перевірено',ru:'проверена',en:'reviewed'}})[operation]?.[language] || operation}`;
        if (action === 'staff.role_changed') return t('role');
        if (action === 'staff.editor_granted') return t('editorGranted');
        if (action === 'staff.editor_revoked') return t('editorRevoked');
        if (action === 'class.archived') return t('archived');
        if (action === 'class.restored') return t('unarchived');
        if (action === 'lesson.restored') return `${t('lesson')} · ${t('restored')}`;
        const labels = { lesson:'lesson', class:'lesson', student:'student', assignment:'assignment', calendar:'calendar' };
        const entityLabel = entity === 'class' ? ({ua:'Клас',ru:'Класс',en:'Class'}[language] || 'Class') : t(labels[entity] || 'changed');
        return `${entityLabel} · ${t(({created:'created',updated:'changed',deleted:'deleted'})[operation] || 'changed')}`;
    }
    function actorLabel(row, language) {
        return row.actor_name || (row.actor_id ? `${text(language,'staff')} · ${row.actor_id.slice(0,8)}` : text(language,'system'));
    }
    function dateLabel(value, language) {
        const date = new Date(value);
        return Number.isNaN(date.getTime()) ? '' : date.toLocaleString(({ua:'uk-UA',ru:'ru-RU',en:'en-GB',sk:'sk-SK',kk:'kk-KZ'})[language] || 'en-GB');
    }
    function snapshotMarkup(snapshot, language) {
        const t = key => text(language,key), content = snapshot.activities;
        const sections = Array.isArray(content) ? [{title:t('lesson'),activities:content}]
            : [...(Array.isArray(content?.sections) ? content.sections : []), ...(Array.isArray(content?.homeworkSections) ? content.homeworkSections : []).map(section => ({...section,title:`${t('homework')} · ${section.title || ''}`}))];
        const activityMarkup = activity => `<article class="history-snapshot-activity">${activity.prompt ? `<h4>${escape(activity.prompt)}</h4>` : ''}${activity.content ? `<p class="history-source-text">${escape(activity.content)}</p>` : ''}${typeof activity.answer === 'string' && activity.answer ? `<p>${escape(t('answer'))}: ${escape(activity.answer)}</p>` : ''}${(Array.isArray(activity.questions) ? activity.questions : []).map(activityMarkup).join('')}</article>`;
        return `<h3>${escape(snapshot.title)}</h3><p>${escape(snapshot.unit)}</p>${sections.map(section => `<section><h4>${escape(section.title || t('lesson'))}</h4>${(Array.isArray(section.activities) ? section.activities : []).map(activityMarkup).join('')}</section>`).join('')}`;
    }
    async function openAudit(context, classId = null) {
        const { api, client, language, openModal, modalCard } = context, t = key => text(language,key);
        openModal(`<h2>${t('audit')}</h2><div data-history-list role="status">${t('loading')}</div><button type="button" class="button secondary" data-close>${t('close')}</button>`, true);
        const list = modalCard.querySelector('[data-history-list]');
        let cursor = null, busy = false, records = [];
        const load = async () => {
            if (busy || !list.isConnected) return;
            busy = true;
            try {
                const page = await api.listAuditLog(client,classId,cursor);
                if (!list.isConnected) return;
                records.push(...page);
                cursor = page.at(-1)?.id;
                list.innerHTML = records.length ? records.map(row => `<article class="history-entry"><strong>${escape(actionLabel(row.action,language))}</strong><p>${escape(row.entity_label || '')}</p><small>${escape(actorLabel(row,language))} · ${escape(dateLabel(row.created_at,language))}</small>${row.action === 'staff.role_changed' ? `<p>${escape(row.details?.from)} → ${escape(row.details?.to)}</p>` : ''}</article>`).join('') : `<p>${t('empty')}</p>`;
                if (page.length === 50) list.insertAdjacentHTML('beforeend',`<button type="button" class="button secondary small" data-history-more>${t('more')}</button>`);
                list.querySelector('[data-history-more]')?.addEventListener('click',load);
            } catch (error) {
                if (list.isConnected) {
                    const message = document.createElement('p'); message.textContent = `${t('error')} ${error.message}`; list.append(message);
                    const retry = document.createElement('button'); retry.type='button'; retry.className='button secondary small'; retry.textContent=t('retry'); retry.addEventListener('click',()=>{message.remove();retry.remove();load();});list.append(retry);
                }
            } finally { busy = false; }
        };
        await load();
    }
    async function openVersions(context, lessonId) {
        const { api, client, language, openModal, modalCard } = context, t = key => text(language,key);
        openModal(`<h2>${t('versions')}</h2><div data-version-panel role="status">${t('loading')}</div><button type="button" class="button secondary" data-close>${t('close')}</button>`,true);
        const panel = modalCard.querySelector('[data-version-panel]');
        let revision;
        let cursor = null, records = [], busy = false, hasMore = false;
        const showError = error => {
            if (!panel.isConnected) return;
            const raw = error.message || '';
            panel.textContent = raw.includes('lesson_changed') ? t('conflict') : raw.includes('version_already_current') ? t('current') : `${t('error')} ${raw}`;
        };
        const showList = () => {
            if (!panel.isConnected) return;
            panel.innerHTML = records.length ? records.map(row => `<article class="history-entry"><strong>${t('version')} ${row.version_no}</strong><small>${escape(actorLabel(row,language))} · ${escape(dateLabel(row.created_at,language))}</small><button type="button" class="button secondary small" data-view-version="${escape(row.id)}">${t('view')}</button></article>`).join('') : `<p>${t('empty')}</p>`;
            panel.querySelectorAll('[data-view-version]').forEach(button => button.addEventListener('click',()=>showVersion(button.dataset.viewVersion)));
            if (hasMore) {
                panel.insertAdjacentHTML('beforeend',`<button type="button" class="button secondary small" data-version-more>${t('more')}</button>`);
                panel.querySelector('[data-version-more]').addEventListener('click',load);
            }
        };
        const showVersion = async id => {
            if (busy) return;
            busy = true;
            try {
                const version = await api.getLessonVersion(client,id);
                if (!panel.isConnected) return;
                panel.innerHTML = `<button type="button" class="button secondary small" data-version-back>${t('back')}</button><p>${t('version')} ${version.version_no}</p><div class="history-snapshot">${snapshotMarkup(version.snapshot,language)}</div>${context.canRestore ? `<p>${t('notice')}</p><button type="button" class="button" data-restore-version>${t('restore')}</button>` : ''}`;
                panel.querySelector('[data-version-back]').addEventListener('click',showList);
                panel.querySelector('[data-restore-version]')?.addEventListener('click',async event => {
                    const button=event.currentTarget; if(button.disabled)return; button.disabled=true;
                    try {
                        await api.restoreLessonVersion(client,id,revision);
                        if (!panel.isConnected) return;
                        await context.onRestored(lessonId);
                        context.showToast(t('restored'));
                    } catch (error) { showError(error); }
                });
            } catch (error) { showError(error); }
            finally { busy = false; }
        };
        const load = async () => {
            if (busy || !panel.isConnected) return;
            busy = true;
            try {
                const page = await api.listLessonVersions(client,lessonId,cursor);
                if (!panel.isConnected) return;
                records.push(...page); if(page.length)cursor=page.at(-1).version_no; hasMore=page.length===50; showList();
            } catch (error) { showError(error); }
            finally { busy = false; }
        };
        try { revision=await api.getLessonRevision(client,lessonId); await load(); }
        catch(error) { showError(error); }
    }
    window.SlovaHistoryUI = { text, actionLabel, actorLabel, snapshotMarkup, openAudit, openVersions };
})();
