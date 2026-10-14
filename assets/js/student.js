(() => {
    const copy = {
        ua: {
            loading: "Завантаження…", activate: "Створіть пароль", activateHint: "Запрошення прийнято. Створіть пароль для входу до свого кабінету.",
            password: "Пароль (не менше 8 символів)", save: "Зберегти пароль", welcome: "Мій навчальний простір",
            welcomeHint: "Тут зібрані ваші класи та уроки від викладача.", login: "Увійти до кабінету",
            needInvite: "Щоб переглянути кабінет, увійдіть за посиланням із запрошення або через сторінку входу.",
            navClasses: "Мої класи", navLessons: "Мої уроки", classes: "Мої класи", classesHint: "Класи, до яких вас запросили.",
            lessons: "Мої уроки", lessonsHint: "Уроки, призначені для ваших класів.", class: "Клас", classCount: "класів",
            lessonCount: "уроків", activities: "завдань", noClasses: "Поки немає класів, пов’язаних з акаунтом.",
            noLessons: "Для цього класу поки не призначено уроків.", noAssignedLessons: "Викладач ще не призначив вам уроки.",
            openLesson: "Відкрити урок", back: "Назад до уроків", section: "Розділ", activity: "Завдання",
            noContent: "Викладач поки не додав вміст до цього завдання.", materials: "Матеріал",
            profileRole: "Учень", logout: "Вийти з профілю", home: "← На головну", language: "Мова",
            saveError: "Не вдалося зберегти пароль:", loadError: "Не вдалося завантажити кабінет:",
            logoutError: "Не вдалося вийти з профілю. Спробуйте ще раз.", imageAlt: "Зображення до завдання",
            checkAnswer: "Перевірити відповідь", correct: "Правильно!", incorrect: "Поки неправильно. Спробуйте ще раз.",
            submitted: "Відповідь збережено. Викладач зможе її перевірити.", saved: "Прогрес збережено.",
            completed: "Урок завершено!", choose: "Виберіть відповідь", true: "Так", false: "Ні",
            addWords: "Перетягуйте слова або натискайте на них, щоб скласти відповідь", yourAnswer: "Ваша відповідь", emptyAnswer: "Спочатку введіть відповідь.",
            moveUp: "Вище", moveDown: "Нижче", flip: "Показати переклад", loading: "Завантаження уроку…"
        },
        ru: {
            loading: "Загрузка…", activate: "Создайте пароль", activateHint: "Приглашение принято. Создайте пароль для входа в личный кабинет.",
            password: "Пароль (не менее 8 символов)", save: "Сохранить пароль", welcome: "Моё учебное пространство",
            welcomeHint: "Здесь собраны ваши классы и уроки от преподавателя.", login: "Войти в кабинет",
            needInvite: "Чтобы открыть кабинет, войдите по ссылке из приглашения или через страницу входа.",
            navClasses: "Мои классы", navLessons: "Мои уроки", classes: "Мои классы", classesHint: "Классы, в которые вас пригласили.",
            lessons: "Мои уроки", lessonsHint: "Уроки, назначенные вашим классам.", class: "Класс", classCount: "классов",
            lessonCount: "уроков", activities: "заданий", noClasses: "Пока нет классов, связанных с аккаунтом.",
            noLessons: "Для этого класса пока не назначены уроки.", noAssignedLessons: "Учитель пока не назначил вам уроки.",
            openLesson: "Открыть урок", back: "Назад к урокам", section: "Раздел", activity: "Задание",
            noContent: "Учитель пока не добавил содержимое этого задания.", materials: "Материал",
            profileRole: "Ученик", logout: "Выйти из профиля", home: "← На главную", language: "Язык",
            saveError: "Не удалось сохранить пароль:", loadError: "Не удалось загрузить кабинет:",
            logoutError: "Не удалось выйти из профиля. Попробуйте ещё раз.", imageAlt: "Изображение к заданию",
            checkAnswer: "Проверить ответ", correct: "Правильно!", incorrect: "Пока неверно. Попробуйте ещё раз.",
            submitted: "Ответ сохранён. Преподаватель сможет его проверить.", saved: "Прогресс сохранён.",
            completed: "Урок завершён!", choose: "Выберите ответ", true: "Да", false: "Нет",
            addWords: "Перетаскивайте слова или нажимайте на них, чтобы составить ответ", yourAnswer: "Ваш ответ", emptyAnswer: "Сначала введите ответ.",
            moveUp: "Выше", moveDown: "Ниже", flip: "Показать перевод", loading: "Загрузка урока…"
        },
        en: {
            loading: "Loading…", activate: "Create a password", activateHint: "Invitation accepted. Create a password to access your account.",
            password: "Password (at least 8 characters)", save: "Save password", welcome: "My learning space",
            welcomeHint: "Your classes and teacher-assigned lessons are all in one place.", login: "Sign in",
            needInvite: "Open your invitation link or sign in to access your dashboard.",
            navClasses: "My classes", navLessons: "My lessons", classes: "My classes", classesHint: "Classes you have been invited to.",
            lessons: "My lessons", lessonsHint: "Lessons assigned to your classes.", class: "Class", classCount: "classes",
            lessonCount: "lessons", activities: "activities", noClasses: "No classes are linked to this account yet.",
            noLessons: "No lessons have been assigned to this class yet.", noAssignedLessons: "Your teacher has not assigned any lessons yet.",
            openLesson: "Open lesson", back: "Back to lessons", section: "Section", activity: "Activity",
            noContent: "Your teacher has not added content to this activity yet.", materials: "Material",
            profileRole: "Student", logout: "Sign out", home: "← Home", language: "Language",
            saveError: "Could not save the password:", loadError: "Could not load the dashboard:",
            logoutError: "Could not sign out. Please try again.", imageAlt: "Activity image",
            checkAnswer: "Check answer", correct: "Correct!", incorrect: "Not quite. Try again.",
            submitted: "Answer saved. Your teacher can review it.", saved: "Progress saved.",
            completed: "Lesson completed!", choose: "Choose an answer", true: "True", false: "False",
            addWords: "Drag or click words to build your answer", yourAnswer: "Your answer", emptyAnswer: "Enter an answer first.",
            moveUp: "Move up", moveDown: "Move down", flip: "Show translation", loading: "Loading lesson…"
        }
    };
    const languageChoices = ["ua", "ru", "en"];
    let language = languageChoices.includes(localStorage.getItem("siteLanguage")) ? localStorage.getItem("siteLanguage") : "ua";
    let user = null;
    let classes = [];
    let lessons = [];
    let activeView = "classes";
    let selectedLessonId = "";
    let openedLesson = null;
    let draggedWordButton = null;
    let toastTimer;
    const sidebar = document.getElementById("studentSidebar");
    const pageContent = document.getElementById("studentPageContent");
    const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
    const text = (key) => copy[language][key];
    const lessonSections = (lesson) => Array.isArray(lesson.sections) ? lesson.sections : [];
    const activitiesFor = (lesson) => lessonSections(lesson).flatMap((section) => Array.isArray(section.activities) ? section.activities : []);
    const activityCount = (lesson) => activitiesFor(lesson).length || Number(lesson.activityCount) || 0;
    function countLabel(count, type) {
        if (language === "en") {
            const labels = { class: ["class", "classes"], lesson: ["lesson", "lessons"], activity: ["activity", "activities"] };
            return `${count} ${labels[type][count === 1 ? 0 : 1]}`;
        }
        const labels = language === "ua"
            ? { class: ["клас", "класи", "класів"], lesson: ["урок", "уроки", "уроків"], activity: ["завдання", "завдання", "завдань"] }
            : { class: ["класс", "класса", "классов"], lesson: ["урок", "урока", "уроков"], activity: ["задание", "задания", "заданий"] };
        const lastTwo = count % 100;
        const last = count % 10;
        const form = last === 1 && lastTwo !== 11 ? labels[type][0]
            : last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14) ? labels[type][1]
                : labels[type][2];
        return `${count} ${form}`;
    }

    function showToast(message, isError = false) {
        const toast = document.getElementById("studentToast");
        toast.textContent = message;
        toast.classList.toggle("student-toast-error", isError);
        toast.classList.add("visible");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove("visible"), 3600);
    }

    function showError(prefix, error) {
        console.error(prefix, error);
        pageContent.innerHTML = `<div class="student-message-card"><span class="eyebrow">SlovaSofi</span><h1>${escapeHtml(text("loadError").replace(/:$/, ""))}</h1><p class="student-error">${escapeHtml(error.message || error)}</p></div>`;
    }

    function updateIdentity() {
        const metadata = user?.user_metadata || {};
        const fullName = [metadata.first_name || metadata.firstName, metadata.last_name || metadata.lastName].filter(Boolean).join(" ")
            || metadata.full_name || metadata.name || user?.email || text("profileRole");
        const initials = fullName.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toLocaleUpperCase();
        document.querySelectorAll(".student-name").forEach((element) => { element.textContent = fullName; });
        document.querySelectorAll(".student-avatar").forEach((element) => { element.textContent = initials; });
        document.querySelectorAll("[data-lang]").forEach((button) => {
            button.classList.toggle("active", button.dataset.lang === language);
            button.setAttribute("aria-pressed", button.dataset.lang === language ? "true" : "false");
        });
    }

    function renderWelcome() {
        const studentCount = lessons.length;
        return `<section class="student-hero"><div class="student-hero-copy"><span class="eyebrow">✦ SLOVASOFI · ${escapeHtml(text("profileRole").toLocaleUpperCase())}</span><h1>${escapeHtml(text("welcome"))}</h1><p>${escapeHtml(text("welcomeHint"))}</p></div><span class="student-hero-mark" aria-hidden="true">S</span></section>
            <div class="stats-grid student-stats">
                <article class="stat-card"><span class="stat-icon">▣</span><span>${escapeHtml(text("classes"))}</span><strong>${classes.length}</strong></article>
                <article class="stat-card"><span class="stat-icon blue">▤</span><span>${escapeHtml(text("lessons"))}</span><strong>${studentCount}</strong></article>
            </div>`;
    }

    function renderClasses() {
        const content = classes.length
            ? `<div class="card-grid student-class-grid">${classes.map((group, index) => `<article class="class-card student-class-card class-tone-${index % 4}">
                <div class="class-card-top"><span class="class-card-avatar">${escapeHtml(group.name.slice(0, 2).toLocaleUpperCase())}</span><span class="class-course-pill">${escapeHtml(countLabel(group.lessons.length, "lesson"))}</span></div>
                <h3>${escapeHtml(group.name)}</h3><p>${escapeHtml(text("class"))}</p>
                <div class="student-class-lessons">${group.lessons.length
                    ? group.lessons.map((lesson) => `<button class="student-lesson-link" type="button" data-open-lesson="${escapeHtml(lesson.id)}"><span class="student-lesson-icon" aria-hidden="true">▤</span><span><strong>${escapeHtml(lesson.title)}</strong><small>${escapeHtml(lesson.unit || "")} · ${escapeHtml(countLabel(activityCount(lesson), "activity"))}</small></span><span aria-hidden="true">→</span></button>`).join("")
                    : `<p class="student-muted">${escapeHtml(text("noLessons"))}</p>`}</div>
            </article>`).join("")}</div>`
            : `<div class="panel student-empty"><span class="student-empty-icon">▣</span><h2>${escapeHtml(text("noClasses"))}</h2></div>`;
        return `<div class="section-heading"><div><h1>${escapeHtml(text("classes"))}</h1><p>${escapeHtml(text("classesHint"))}</p></div></div>${content}`;
    }

    function renderLessons() {
        const allLessons = lessons.map((lesson) => ({
            ...lesson,
            classNames: classes.filter((group) => group.lessons.some((item) => item.id === lesson.id)).map((group) => group.name)
        }));
        const content = allLessons.length
            ? `<div class="panel student-lessons-panel"><div class="student-lessons-list">${allLessons.map((lesson) => `<article class="lesson-row student-lesson-row"><span class="lesson-symbol">▤</span><div class="lesson-main"><strong>${escapeHtml(lesson.title)}</strong><small>${escapeHtml(lesson.classNames.join(", "))}${lesson.unit ? ` · ${escapeHtml(lesson.unit)}` : ""}</small></div><span class="lesson-count">${escapeHtml(countLabel(activityCount(lesson), "activity"))}</span><button class="button secondary small" type="button" data-open-lesson="${escapeHtml(lesson.id)}">${escapeHtml(text("openLesson"))}</button></article>`).join("")}</div></div>`
            : `<div class="panel student-empty"><span class="student-empty-icon">▤</span><h2>${escapeHtml(text("noAssignedLessons"))}</h2></div>`;
        return `<div class="section-heading"><div><h1>${escapeHtml(text("lessons"))}</h1><p>${escapeHtml(text("lessonsHint"))}</p></div></div>${content}`;
    }

    function progressFor(lesson, index) {
        return lesson.progress?.[`a${index}`] || null;
    }

    function mediaUrl(value) {
        try {
            const url = new URL(value, location.href);
            return ["http:", "https:"].includes(url.protocol) ? url.href : "";
        } catch {
            return "";
        }
    }

    function renderActivity(activity) {
        const index = activity.index;
        const saved = progressFor(openedLesson, index);
        const savedResponse = saved?.response;
        let body = "";
        let controls = "";
        if (activity.type === "drag-words") {
            const selected = Array.isArray(savedResponse) ? savedResponse.map(String) : [];
            const remaining = [...activity.tokens];
            selected.forEach((word) => {
                const tokenIndex = remaining.indexOf(word);
                if (tokenIndex >= 0) remaining.splice(tokenIndex, 1);
            });
            body = `<p class="student-muted">${escapeHtml(text("addWords"))}</p><div class="student-word-bank" data-word-bank>${remaining.map((word) => `<button class="student-word-token" type="button" draggable="true" data-word-token="${escapeHtml(word)}">${escapeHtml(word)}</button>`).join("")}</div><div class="student-answer-zone" data-word-answer aria-label="${escapeHtml(text("yourAnswer"))}">${selected.map((word) => `<button class="student-word-token selected" type="button" draggable="true" data-remove-word="${escapeHtml(word)}">${escapeHtml(word)} ×</button>`).join("")}</div>`;
            controls = `<input type="hidden" data-answer-kind="words">`;
        } else if (activity.type === "fill-blank") {
            const savedParts = Array.isArray(savedResponse) ? [...savedResponse] : [];
            const parts = String(activity.content || "").split("___");
            body = `<p class="student-activity-content">${parts.map((part, partIndex) => `${escapeHtml(part)}${partIndex < parts.length - 1 ? `<input class="student-inline-answer" data-blank-answer value="${escapeHtml(savedParts.shift() || "")}" aria-label="${escapeHtml(text("yourAnswer"))}" autocomplete="off">` : ""}`).join("")}</p>`;
            controls = `<input type="hidden" data-answer-kind="blanks">`;
        } else if (activity.type === "multiple-choice" || activity.type === "one-of-many") {
            const options = Array.isArray(activity.options) ? activity.options : [];
            body = `<div class="student-answer-options">${options.map((option, optionIndex) => `<label class="student-answer-option"><input type="radio" name="student-answer-${index}" value="${escapeHtml(option)}" ${savedResponse === option ? "checked" : ""}><span>${escapeHtml(option)}</span></label>`).join("")}</div>`;
            controls = `<input type="hidden" data-answer-kind="choice">`;
        } else if (activity.type === "true-false") {
            body = `<p class="student-activity-content">${escapeHtml(activity.content || "")}</p><div class="student-answer-options">${[["true", text("true")], ["false", text("false")]].map(([value, label]) => `<label class="student-answer-option"><input type="radio" name="student-answer-${index}" value="${value}" ${savedResponse === value ? "checked" : ""}><span>${escapeHtml(label)}</span></label>`).join("")}</div>`;
            controls = `<input type="hidden" data-answer-kind="choice">`;
        } else if (activity.type === "order-items" || activity.type === "sentence-order") {
            const savedItems = Array.isArray(savedResponse) ? savedResponse.map(String) : [];
            const items = savedItems.length ? savedItems : activity.items || [];
            body = `<ol class="student-order-list">${items.map((item, itemIndex) => `<li data-order-item="${escapeHtml(item)}"><span>${escapeHtml(item)}</span><span><button type="button" data-move-item="-1" ${itemIndex === 0 ? "disabled" : ""} aria-label="${escapeHtml(text("moveUp"))}">↑</button><button type="button" data-move-item="1" ${itemIndex === items.length - 1 ? "disabled" : ""} aria-label="${escapeHtml(text("moveDown"))}">↓</button></span></li>`).join("")}</ol>`;
            controls = `<input type="hidden" data-answer-kind="order">`;
        } else if (activity.type === "match" || activity.type === "columns") {
            const rows = activity.type === "match" ? activity.pairs || [] : activity.items || [];
            const options = activity.type === "match" ? activity.options || [] : activity.categories || [];
            const savedChoices = Array.isArray(savedResponse) ? savedResponse : [];
            body = `<div class="student-match-list">${rows.map((item, itemIndex) => `<label class="student-match-row"><span>${escapeHtml(item)}</span><select data-match-answer aria-label="${escapeHtml(item)}"><option value="">${escapeHtml(text("choose"))}</option>${options.map((option) => `<option value="${escapeHtml(option)}" ${savedChoices[itemIndex] === option ? "selected" : ""}>${escapeHtml(option)}</option>`).join("")}</select></label>`).join("")}</div>`;
            controls = `<input type="hidden" data-answer-kind="matches">`;
        } else if (activity.type === "table") {
            const savedParts = Array.isArray(savedResponse) ? savedResponse : [];
            body = `<div class="student-table-wrap"><table class="student-answer-table"><tbody>${(activity.rows || []).map((row) => `<tr>${row.map((cell) => `<td>${String(cell).split(/(\{\{blank:\d+\}\})/g).map((part) => {
                const blank = part.match(/^\{\{blank:(\d+)\}\}$/);
                if (!blank) return escapeHtml(part);
                const value = escapeHtml(savedParts[Number(blank[1])] || "");
                return `<input class="student-inline-answer" data-table-answer value="${value}" aria-label="${escapeHtml(text("yourAnswer"))}" autocomplete="off">`;
            }).join("")}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
            controls = `<input type="hidden" data-answer-kind="table">`;
        } else if (activity.type === "open-answer") {
            body = `${activity.content ? `<div class="student-activity-content">${escapeHtml(activity.content).replace(/\n/g, "<br>")}</div>` : ""}<textarea class="student-open-answer" data-open-answer maxlength="10000" placeholder="${escapeHtml(text("yourAnswer"))}">${escapeHtml(savedResponse || "")}</textarea>`;
            controls = `<input type="hidden" data-answer-kind="open">`;
        } else if (activity.type === "flashcards") {
            body = `<div class="student-flashcard-list">${(activity.cards || []).map((item) => `<button class="student-flashcard" type="button" data-front="${escapeHtml(item.front)}" data-back="${escapeHtml(item.back)}"><strong>${escapeHtml(item.front)}</strong><small>${escapeHtml(text("flip"))}</small></button>`).join("")}</div>`;
        } else if (activity.type === "image") {
            const source = mediaUrl(activity.content);
            body = source ? `<img class="student-activity-image" src="${escapeHtml(source)}" alt="${escapeHtml(activity.alt || activity.prompt || text("imageAlt"))}">` : `<p class="student-muted">${escapeHtml(text("noContent"))}</p>`;
        } else if (activity.type === "audio" || activity.type === "video") {
            const source = mediaUrl(activity.content);
            body = source ? `<${activity.type} class="student-activity-media" controls preload="metadata"><source src="${escapeHtml(source)}"></${activity.type}>` : `<p class="student-muted">${escapeHtml(text("noContent"))}</p>`;
        } else {
            body = activity.content ? `<div class="student-activity-content">${escapeHtml(activity.content).replace(/\n/g, "<br>")}</div>` : `<p class="student-muted">${escapeHtml(text("noContent"))}</p>`;
        }
        const feedback = saved?.correct === true ? text("correct")
            : saved?.correct === false ? text("incorrect")
                : saved?.correct === null ? text("submitted") : "";
        const submitButton = activity.gradable || activity.reviewRequired
            ? `<div class="student-activity-actions">${controls}<button class="button small" type="button" data-submit-answer>${escapeHtml(text("checkAnswer"))}</button></div><p class="student-answer-feedback ${saved?.correct === true ? "is-correct" : saved?.correct === false ? "is-incorrect" : ""}" data-answer-feedback aria-live="polite">${escapeHtml(feedback)}</p>`
            : activity.type === "flashcards" ? "" : "";
        return `<article class="student-activity" data-activity-index="${index}" data-activity-type="${escapeHtml(activity.type)}"><span class="student-activity-number">${index + 1}</span><div class="student-activity-main"><h3>${escapeHtml(activity.prompt || text("activity"))}</h3>${body}${submitButton}</div></article>`;
    }

    function renderLessonDetail(lesson) {
        const sections = lessonSections(lesson);
        return `<button class="text-link student-back-link" type="button" data-back-to-lessons>← ${escapeHtml(text("back"))}</button>
            <section class="student-lesson-hero"><span class="eyebrow">${escapeHtml(lesson.className || "")}</span><h1>${escapeHtml(lesson.title)}</h1><p>${escapeHtml(lesson.unit || "")} · ${escapeHtml(countLabel(activityCount(lesson), "activity"))}${lesson.completed ? ` · ${escapeHtml(text("completed"))}` : ""}</p></section>
            <div class="student-section-list">${sections.map((section) => `<section class="panel student-section"><h2>${escapeHtml(section.title || text("section"))}</h2><div class="student-activity-list">${(Array.isArray(section.activities) ? section.activities : []).map((activity) => renderActivity(activity)).join("") || `<p class="student-muted">${escapeHtml(text("noContent"))}</p>`}</div></section>`).join("")}</div>`;
    }

    async function invokeLessonApi(payload) {
        const { data, error } = await window.supabaseClient.functions.invoke("student-lessons", { body: payload });
        if (error) {
            let message = error.message || text("loadError");
            if (error.context instanceof Response) {
                const responseText = await error.context.text();
                try {
                    const responseBody = JSON.parse(responseText);
                    if (responseBody?.error) message = responseBody.error;
                } catch {
                    if (responseText) message = responseText;
                }
            }
            throw new Error(message);
        }
        if (data?.error) throw new Error(data.error);
        return data;
    }

    function responseForActivity(element) {
        const kind = element.querySelector("[data-answer-kind]")?.dataset.answerKind;
        if (kind === "words") {
            return [...element.querySelectorAll("[data-word-answer] [data-remove-word]")].map((button) => button.dataset.removeWord);
        }
        if (kind === "blanks") return [...element.querySelectorAll("[data-blank-answer]")].map((input) => input.value.trim());
        if (kind === "choice") return element.querySelector('input[type="radio"]:checked')?.value || "";
        if (kind === "order") return [...element.querySelectorAll("[data-order-item]")].map((item) => item.dataset.orderItem);
        if (kind === "matches") return [...element.querySelectorAll("[data-match-answer]")].map((select) => select.value);
        if (kind === "table") return [...element.querySelectorAll("[data-table-answer]")].map((input) => input.value.trim());
        if (kind === "open") return element.querySelector("[data-open-answer]")?.value.trim() || "";
        return "";
    }

    function moveWordButton(button, destination) {
        const activity = button.closest("[data-activity-index]");
        const word = button.dataset.wordToken || button.dataset.removeWord;
        const selected = destination === "answer";
        const target = activity.querySelector(selected ? "[data-word-answer]" : "[data-word-bank]");
        const replacement = document.createElement("button");
        replacement.type = "button";
        replacement.className = `student-word-token${selected ? " selected" : ""}`;
        replacement.draggable = true;
        if (selected) replacement.dataset.removeWord = word;
        else replacement.dataset.wordToken = word;
        replacement.textContent = selected ? `${word} ×` : word;
        button.replaceWith(replacement);
        target.append(replacement);
    }

    async function submitActivity(element) {
        const button = element.querySelector("[data-submit-answer]");
        const index = Number(element.dataset.activityIndex);
        const feedback = element.querySelector("[data-answer-feedback]");
        const response = responseForActivity(element);
        const isEmpty = Array.isArray(response) ? response.some((part) => !part) || !response.length : !response;
        if (isEmpty) {
            feedback.textContent = text("emptyAnswer");
            feedback.className = "student-answer-feedback is-incorrect";
            return;
        }
        button.disabled = true;
        feedback.textContent = text("loading");
        feedback.className = "student-answer-feedback";
        try {
            const result = await invokeLessonApi({
                action: "submit",
                lessonId: openedLesson.id,
                activityIndex: index,
                response
            });
            openedLesson.progress = result.answers;
            openedLesson.completed = result.completed;
            const classLesson = classes.flatMap((group) => group.lessons).find((lesson) => lesson.id === openedLesson.id);
            if (classLesson) {
                classLesson.completed = result.completed;
                classLesson.answeredCount = Object.keys(result.answers || {}).length;
            }
            feedback.textContent = result.reviewRequired ? text("submitted")
                : result.correct ? text("correct") : text("incorrect");
            feedback.className = `student-answer-feedback ${result.reviewRequired ? "" : result.correct ? "is-correct" : "is-incorrect"}`;
            if (result.completed) showToast(text("completed"));
            render();
        } catch (error) {
            console.error("Could not submit the student answer.", error);
            feedback.textContent = error.message;
            feedback.className = "student-answer-feedback is-incorrect";
            button.disabled = false;
        }
    }

    async function openStudentLesson(lessonId) {
        const summary = lessons.find((item) => item.id === lessonId);
        if (!summary) return;
        selectedLessonId = lessonId;
        pageContent.innerHTML = `<div class="panel student-empty"><p>${escapeHtml(text("loading"))}</p></div>`;
        try {
            const result = await invokeLessonApi({ action: "load", lessonId });
            openedLesson = result.lesson;
            openedLesson.className = result.className;
            activeView = "lessons";
            render();
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (error) {
            selectedLessonId = "";
            openedLesson = null;
            console.error("Could not load the assigned lesson.", error);
            showToast(error.message, true);
            render();
        }
    }

    function render() {
        document.documentElement.lang = language === "ru" ? "ru" : language === "en" ? "en" : "uk";
        document.title = `SlovaSofi · ${escapeHtml(text("profileRole"))}`;
        updateIdentity();
        const keys = { classes: "navClasses", lessons: "navLessons" };
        document.querySelectorAll(".nav-item").forEach((button) => {
            button.classList.toggle("active", button.dataset.view === activeView);
            button.querySelector("[data-i18n]").textContent = text(keys[button.dataset.view]);
        });
        document.getElementById("studentBreadcrumb").textContent = selectedLessonId
            ? text("lessons")
            : text(keys[activeView]);
        pageContent.innerHTML = `${renderWelcome()}${openedLesson && openedLesson.id === selectedLessonId
            ? renderLessonDetail(openedLesson)
            : activeView === "classes" ? renderClasses() : renderLessons()}`;
        pageContent.querySelectorAll("[data-open-lesson]").forEach((button) => {
            button.addEventListener("click", () => openStudentLesson(button.dataset.openLesson));
        });
        pageContent.querySelector("[data-back-to-lessons]")?.addEventListener("click", () => {
            selectedLessonId = "";
            openedLesson = null;
            activeView = "lessons";
            render();
        });
        pageContent.querySelectorAll("[data-submit-answer]").forEach((button) => {
            button.addEventListener("click", () => submitActivity(button.closest("[data-activity-index]")));
        });
        pageContent.querySelectorAll("[data-move-item]").forEach((button) => {
            button.addEventListener("click", () => {
                const item = button.closest("[data-order-item]");
                const direction = Number(button.dataset.moveItem);
                if (direction < 0 && item.previousElementSibling) item.parentElement.insertBefore(item, item.previousElementSibling);
                if (direction > 0 && item.nextElementSibling) item.parentElement.insertBefore(item.nextElementSibling, item);
                item.parentElement.querySelectorAll("[data-order-item]").forEach((row, index, rows) => {
                    row.querySelector('[data-move-item="-1"]').disabled = index === 0;
                    row.querySelector('[data-move-item="1"]').disabled = index === rows.length - 1;
                });
            });
        });
        pageContent.querySelectorAll("[data-front][data-back]").forEach((button) => {
            button.addEventListener("click", () => {
                const flipped = button.classList.toggle("is-flipped");
                button.querySelector("strong").textContent = flipped ? button.dataset.back : button.dataset.front;
                button.querySelector("small").textContent = flipped ? button.dataset.front : text("flip");
            });
        });
    }

    pageContent.addEventListener("click", (event) => {
        const button = event.target.closest("[data-word-token], [data-remove-word]");
        if (!button) return;
        moveWordButton(button, button.dataset.wordToken ? "answer" : "bank");
    });
    pageContent.addEventListener("dragstart", (event) => {
        draggedWordButton = event.target.closest("[data-word-token], [data-remove-word]");
        if (draggedWordButton) event.dataTransfer.setData("text/plain", "word");
    });
    pageContent.addEventListener("dragend", () => { draggedWordButton = null; });
    pageContent.addEventListener("dragover", (event) => {
        if (draggedWordButton && event.target.closest("[data-word-bank], [data-word-answer]")) event.preventDefault();
    });
    pageContent.addEventListener("drop", (event) => {
        const destinationZone = event.target.closest("[data-word-bank], [data-word-answer]");
        if (!draggedWordButton || !destinationZone) return;
        event.preventDefault();
        if (destinationZone.closest("[data-activity-index]") !== draggedWordButton.closest("[data-activity-index]")) return;
        const movingToAnswer = destinationZone.hasAttribute("data-word-answer");
        const fromBank = Boolean(draggedWordButton.dataset.wordToken);
        if (movingToAnswer === fromBank) moveWordButton(draggedWordButton, movingToAnswer ? "answer" : "bank");
        draggedWordButton = null;
    });

    function renderAuthState(title, description, form = "") {
        sidebar.hidden = true;
        document.querySelector(".main-area .topbar").hidden = true;
        pageContent.classList.add("student-auth-content");
        pageContent.innerHTML = `<section class="student-auth-card"><a class="brand student-auth-brand" href="index.html"><span class="brand-mark">S</span><span>Slova<span class="brand-accent">Sofi</span></span></a><span class="eyebrow">SLOVASOFI</span><h1>${escapeHtml(title)}</h1><p>${escapeHtml(description)}</p>${form}</section>`;
    }

    async function loadDashboard(client, signedInUser) {
        user = signedInUser;
        const result = await invokeLessonApi({ action: "list" });
        classes = result.classes || [];
        lessons = result.lessons || [];
        if (!lessons.some((lesson) => lesson.id === selectedLessonId)) selectedLessonId = "";
        if (!lessons.some((lesson) => lesson.id === openedLesson?.id)) openedLesson = null;
        sidebar.hidden = false;
        document.querySelector(".main-area .topbar").hidden = false;
        pageContent.classList.remove("student-auth-content");
        render();
    }

    async function start() {
        const client = window.supabaseClient;
        const inviteFlow = new URLSearchParams(location.hash.slice(1)).get("type") === "invite"
            || new URLSearchParams(location.search).get("type") === "invite";
        if (!client) {
            renderAuthState(text("needInvite"), "", `<a class="button" href="login.html">${escapeHtml(text("login"))}</a>`);
            return;
        }
        const { data: { session }, error } = await client.auth.getSession();
        if (error) throw error;
        if (!session) {
            renderAuthState(text("needInvite"), "", `<a class="button" href="login.html">${escapeHtml(text("login"))}</a>`);
            return;
        }
        user = session.user;
        if (inviteFlow) {
            const passwordForm = `<form class="student-form" id="studentPasswordForm"><label for="studentPassword">${escapeHtml(text("password"))}</label><input id="studentPassword" type="password" minlength="8" autocomplete="new-password" required><button class="button" type="submit">${escapeHtml(text("save"))}</button></form>`;
            renderAuthState(text("activate"), text("activateHint"), passwordForm);
            document.getElementById("studentPasswordForm").addEventListener("submit", async (event) => {
                event.preventDefault();
                const button = event.currentTarget.querySelector("button");
                button.disabled = true;
                const { error: updateError } = await client.auth.updateUser({
                    password: document.getElementById("studentPassword").value
                });
                if (updateError) {
                    console.error("Could not save the student's password.", updateError);
                    showToast(`${text("saveError")} ${updateError.message}`, true);
                    button.disabled = false;
                    return;
                }
                history.replaceState(null, "", location.pathname);
                await loadDashboard(client, session.user);
            });
            return;
        }
        await loadDashboard(client, session.user);
    }

    document.querySelectorAll(".nav-item").forEach((button) => button.addEventListener("click", () => {
        activeView = button.dataset.view;
        selectedLessonId = "";
        openedLesson = null;
        sidebar.classList.remove("open");
        render();
    }));
    document.querySelectorAll(".language-button").forEach((button) => button.addEventListener("click", () => {
        if (!languageChoices.includes(button.dataset.lang)) return;
        language = button.dataset.lang;
        localStorage.setItem("siteLanguage", language);
        render();
    }));
    document.getElementById("studentMenuToggle").addEventListener("click", () => sidebar.classList.toggle("open"));
    document.getElementById("studentLogout").addEventListener("click", async () => {
        const { error } = await window.supabaseClient.auth.signOut();
        if (error) {
            console.error("Could not sign out the student.", error);
            showToast(text("logoutError"), true);
            return;
        }
        location.assign("login.html");
    });
    start().catch((error) => {
        console.error("Could not start the student dashboard.", error);
        showError(text("loadError"), error);
    });
})();
