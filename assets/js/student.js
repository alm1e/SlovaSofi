(() => {
    const copy = SlovaI18n.locales({
        ua: {
            loading: "Завантаження…", activate: "Створіть пароль", activateHint: "Запрошення прийнято. Створіть пароль для входу до свого кабінету.",
            password: "Пароль (не менше 8 символів)", save: "Зберегти пароль", welcome: "Мій навчальний простір",
            welcomeHint: "Тут зібрані ваші класи та уроки від викладача.", login: "Увійти до кабінету",
            needInvite: "Щоб переглянути кабінет, увійдіть за посиланням із запрошення або через сторінку входу.",
            navClasses: "Мої класи", navLessons: "Мої уроки", classes: "Мої класи", classesHint: "Класи, до яких вас запросили.",
            lessons: "Мої уроки", lessonsHint: "Уроки, призначені для ваших класів.", class: "Клас", classCount: "класів",
            classLessons: "Уроки класу", allLessons: "Усі уроки",
            lessonCount: "уроків", activities: "завдань", noClasses: "Поки немає класів, пов’язаних з акаунтом.",
            noLessons: "Для цього класу поки не призначено уроків.", noAssignedLessons: "Викладач ще не призначив вам уроки.",
            openLesson: "Відкрити урок", back: "Назад до уроків", section: "Розділ", activity: "Завдання",
            noContent: "Викладач поки не додав вміст до цього завдання.", materials: "Матеріал",
            lessonTab: "Урок", homeworkTab: "Домашня робота", lessonSections: "Розділи уроку",
            homeworkSections: "Розділи домашньої роботи", previousSection: "← Назад", nextSection: "Далі →",
            openSections: "Відкрити розділи уроку", closeSections: "Закрити розділи",
            profileRole: "Учень", logout: "Вийти з профілю", home: "← На головну", language: "Мова",
            saveError: "Не вдалося зберегти пароль:", loadError: "Не вдалося завантажити кабінет:",
            logoutError: "Не вдалося вийти з профілю. Спробуйте ще раз.", imageAlt: "Зображення до завдання",
            checkAnswer: "Перевірити відповідь", checkAnswers: "Перевірити відповіді", correct: "Правильно!", incorrect: "Поки неправильно. Спробуйте ще раз.",
            submitted: "Відповідь збережено. Викладач зможе її перевірити.", saved: "Прогрес збережено.", draftSaveError: "Не вдалося зберегти чернетку:",
            completed: "Урок завершено!", homework: "Домашня робота", progress: "відповідей", progressSaved: "Чернетку збережено.",
            choose: "Виберіть відповідь", true: "Так", false: "Ні",
            addWords: "Перетягуйте слова або натискайте на них, щоб скласти відповідь", yourAnswer: "Ваша відповідь", emptyAnswer: "Спочатку введіть відповідь.",
            moveUp: "Вище", moveDown: "Нижче", flip: "Показати переклад", hint: "Підказка", locked: "Закріплене слово", loading: "Завантаження уроку…",
            seekBack: "−5 с", seekForward: "+5 с", loopA: "Точка A", loopB: "Точка B", clearLoop: "Скасувати повтор", speed: "Швидкість", transcript: "Транскрипція"
        },
        ru: {
            loading: "Загрузка…", activate: "Создайте пароль", activateHint: "Приглашение принято. Создайте пароль для входа в личный кабинет.",
            password: "Пароль (не менее 8 символов)", save: "Сохранить пароль", welcome: "Моё учебное пространство",
            welcomeHint: "Здесь собраны ваши классы и уроки от преподавателя.", login: "Войти в кабинет",
            needInvite: "Чтобы открыть кабинет, войдите по ссылке из приглашения или через страницу входа.",
            navClasses: "Мои классы", navLessons: "Мои уроки", classes: "Мои классы", classesHint: "Классы, в которые вас пригласили.",
            lessons: "Мои уроки", lessonsHint: "Уроки, назначенные вашим классам.", class: "Класс", classCount: "классов",
            classLessons: "Уроки класса", allLessons: "Все уроки",
            lessonCount: "уроков", activities: "заданий", noClasses: "Пока нет классов, связанных с аккаунтом.",
            noLessons: "Для этого класса пока не назначены уроки.", noAssignedLessons: "Учитель пока не назначил вам уроки.",
            openLesson: "Открыть урок", back: "Назад к урокам", section: "Раздел", activity: "Задание",
            noContent: "Учитель пока не добавил содержимое этого задания.", materials: "Материал",
            lessonTab: "Урок", homeworkTab: "Домашняя работа", lessonSections: "Разделы урока",
            homeworkSections: "Разделы домашней работы", previousSection: "← Назад", nextSection: "Далее →",
            openSections: "Открыть разделы урока", closeSections: "Закрыть разделы",
            profileRole: "Ученик", logout: "Выйти из профиля", home: "← На главную", language: "Язык",
            saveError: "Не удалось сохранить пароль:", loadError: "Не удалось загрузить кабинет:",
            logoutError: "Не удалось выйти из профиля. Попробуйте ещё раз.", imageAlt: "Изображение к заданию",
            checkAnswer: "Проверить ответ", checkAnswers: "Проверить ответы", correct: "Правильно!", incorrect: "Пока неверно. Попробуйте ещё раз.",
            submitted: "Ответ сохранён. Преподаватель сможет его проверить.", saved: "Прогресс сохранён.", draftSaveError: "Не удалось сохранить черновик:",
            completed: "Урок завершён!", homework: "Домашняя работа", progress: "ответов", progressSaved: "Черновик сохранён.",
            choose: "Выберите ответ", true: "Да", false: "Нет",
            addWords: "Перетаскивайте слова или нажимайте на них, чтобы составить ответ", yourAnswer: "Ваш ответ", emptyAnswer: "Сначала введите ответ.",
            moveUp: "Выше", moveDown: "Ниже", flip: "Показать перевод", hint: "Подсказка", locked: "Закреплённое слово", loading: "Загрузка урока…",
            seekBack: "−5 с", seekForward: "+5 с", loopA: "Точка A", loopB: "Точка B", clearLoop: "Сбросить повтор", speed: "Скорость", transcript: "Транскрипция"
        },
        en: {
            loading: "Loading…", activate: "Create a password", activateHint: "Invitation accepted. Create a password to access your account.",
            password: "Password (at least 8 characters)", save: "Save password", welcome: "My learning space",
            welcomeHint: "Your classes and teacher-assigned lessons are all in one place.", login: "Sign in",
            needInvite: "Open your invitation link or sign in to access your dashboard.",
            navClasses: "My classes", navLessons: "My lessons", classes: "My classes", classesHint: "Classes you have been invited to.",
            lessons: "My lessons", lessonsHint: "Lessons assigned to your classes.", class: "Class", classCount: "classes",
            classLessons: "Class lessons", allLessons: "All lessons",
            lessonCount: "lessons", activities: "activities", noClasses: "No classes are linked to this account yet.",
            noLessons: "No lessons have been assigned to this class yet.", noAssignedLessons: "Your teacher has not assigned any lessons yet.",
            openLesson: "Open lesson", back: "Back to lessons", section: "Section", activity: "Activity",
            noContent: "Your teacher has not added content to this activity yet.", materials: "Material",
            lessonTab: "Lesson", homeworkTab: "Homework", lessonSections: "Lesson sections",
            homeworkSections: "Homework sections", previousSection: "← Previous", nextSection: "Next →",
            openSections: "Open lesson sections", closeSections: "Close sections",
            profileRole: "Student", logout: "Sign out", home: "← Home", language: "Language",
            saveError: "Could not save the password:", loadError: "Could not load the dashboard:",
            logoutError: "Could not sign out. Please try again.", imageAlt: "Activity image",
            checkAnswer: "Check answer", checkAnswers: "Check answers", correct: "Correct!", incorrect: "Not quite. Try again.",
            submitted: "Answer saved. Your teacher can review it.", saved: "Progress saved.", draftSaveError: "Could not save the draft:",
            completed: "Lesson completed!", homework: "Homework", progress: "answered", progressSaved: "Draft saved.",
            choose: "Choose an answer", true: "True", false: "False",
            addWords: "Drag or click words to build your answer", yourAnswer: "Your answer", emptyAnswer: "Enter an answer first.",
            moveUp: "Move up", moveDown: "Move down", flip: "Show translation", hint: "Hint", locked: "Locked word", loading: "Loading lesson…",
            seekBack: "−5 sec", seekForward: "+5 sec", loopA: "Set A", loopB: "Set B", clearLoop: "Clear loop", speed: "Speed", transcript: "Transcript"
        }
    });
    const recoveryCopy = SlovaI18n.locales({
        ua: { retry: "Спробувати знову", unavailable: "Сервіс уроків тимчасово недоступний. Спробуйте ще раз пізніше.", connection: "Не вдалося з’єднатися із сервісом уроків. Перевірте інтернет і спробуйте знову.", profile: "Профіль учня", dashboardLoading: "Завантаження кабінету…" },
        ru: { retry: "Попробовать снова", unavailable: "Сервис уроков временно недоступен. Попробуйте ещё раз позже.", connection: "Не удалось связаться с сервисом уроков. Проверьте интернет и попробуйте снова.", profile: "Профиль ученика", dashboardLoading: "Загрузка кабинета…" },
        en: { retry: "Try again", unavailable: "The lesson service is temporarily unavailable. Please try again later.", connection: "Could not connect to the lesson service. Check your connection and try again.", profile: "Student profile", dashboardLoading: "Loading dashboard…" }
    });
    Object.keys(recoveryCopy).forEach((lang) => Object.assign(copy[lang], recoveryCopy[lang]));
    Object.assign(copy.ua, {
        navCalendar: "Календар",
        calendar: "Розклад занять",
        calendarHint: "Дата й час занять для ваших класів.",
        calendarEmpty: "Занять поки не заплановано.",
        calendarClass: "Клас",
        calendarLesson: "Урок",
        calendarWeekly: "Щотижня",
        calendarDaily: "Щодня",
        calendarEveryOtherDay: "Через день",
        calendarCustom: "За вибраними днями",
        calendarSelectedDates: "У вибрані дати",
        notifications: "Сповіщення",
        notificationsEmpty: "Найближчих занять немає.",
        openCalendar: "Відкрити календар →",
        reminder: "Незабаром заняття:"
    });
    Object.assign(copy.ru, {
        navCalendar: "Календарь",
        calendar: "Расписание занятий",
        calendarHint: "Дата и время занятий для ваших классов.",
        calendarEmpty: "Занятия пока не запланированы.",
        calendarClass: "Класс",
        calendarLesson: "Урок",
        calendarWeekly: "Каждую неделю",
        calendarDaily: "Каждый день",
        calendarEveryOtherDay: "Через день",
        calendarCustom: "В выбранные дни",
        calendarSelectedDates: "В выбранные даты",
        notifications: "Уведомления",
        notificationsEmpty: "Ближайших занятий нет.",
        openCalendar: "Открыть календарь →",
        reminder: "Скоро занятие:"
    });
    Object.assign(copy.en, {
        navCalendar: "Calendar",
        calendar: "Class schedule",
        calendarHint: "Dates and times for sessions in your classes.",
        calendarEmpty: "No sessions scheduled yet.",
        calendarClass: "Class",
        calendarLesson: "Lesson",
        calendarWeekly: "Weekly",
        calendarDaily: "Daily",
        calendarEveryOtherDay: "Every other day",
        calendarCustom: "On selected days",
        calendarSelectedDates: "On selected dates",
        notifications: "Notifications",
        notificationsEmpty: "No upcoming sessions.",
        openCalendar: "Open calendar →",
        reminder: "Upcoming session:"
    });
    Object.assign(copy.ua, {
        recordPronunciation: "Почати запис", stopRecording: "Зупинити запис", recording: "Запис…",
        uploadingRecording: "Збереження запису…", recordingSaved: "Запис збережено для викладача.",
        recordingError: "Не вдалося записати аудіо.", recordingUnsupported: "Браузер не підтримує запис аудіо.",
        chooseErrorWord: "Виберіть слово з помилкою й введіть виправлення.",
        correction: "Виправлення", selectHotspot: "Натисніть на позначку, щоб дізнатися слово.",
        hotspotAudio: "Прослухати вимову", microphonePermission: "Дозвольте доступ до мікрофона.",
        playsRemaining: "Залишилося прослуховувань: {count}", transcript: "Транскрипція"
    });
    Object.assign(copy.ru, {
        recordPronunciation: "Начать запись", stopRecording: "Остановить запись", recording: "Идёт запись…",
        uploadingRecording: "Сохранение записи…", recordingSaved: "Запись сохранена для преподавателя.",
        recordingError: "Не удалось записать аудио.", recordingUnsupported: "Браузер не поддерживает запись аудио.",
        chooseErrorWord: "Выберите слово с ошибкой и введите исправление.",
        correction: "Исправление", selectHotspot: "Нажмите на метку, чтобы узнать слово.",
        hotspotAudio: "Прослушать произношение", microphonePermission: "Разрешите доступ к микрофону.",
        playsRemaining: "Осталось прослушиваний: {count}", transcript: "Транскрипция"
    });
    Object.assign(copy.en, {
        recordPronunciation: "Start recording", stopRecording: "Stop recording", recording: "Recording…",
        uploadingRecording: "Saving recording…", recordingSaved: "Recording saved for your teacher.",
        recordingError: "Could not record audio.", recordingUnsupported: "Audio recording is not supported by this browser.",
        chooseErrorWord: "Select the incorrect word and enter a correction.",
        correction: "Correction", selectHotspot: "Select a marker to discover the word.",
        hotspotAudio: "Play pronunciation", microphonePermission: "Allow microphone access.",
        playsRemaining: "Listens remaining: {count}", transcript: "Transcript"
    });
    const languageChoices = ["ua", "ru", "en", "sk", "kk"];
    let language = languageChoices.includes(localStorage.getItem("siteLanguage")) ? localStorage.getItem("siteLanguage") : "ua";
    let user = null;
    let presenceChannels = [];
    let classes = [];
    let lessons = [];
    let calendarEvents = [];
    let calendarChannel = null;
    let calendarAudioContext = null;
    const playedCalendarReminders = new Set();
    let activeView = "classes";
    let selectedClassId = "";
    let selectedLessonId = "";
    let openedLesson = null;
    let studentWorkspaceTab = "lesson";
    let activeStudentSectionId = "";
    let studentSectionsOpen = false;
    let draggedWordButton = null;
    let draggedOrderItem = null;
    const activeRecorders = new Map();
    let draftSaveTimers = new Map();
    let pendingDrafts = new Map();
    let draftSaveQueue = Promise.resolve();
    let toastTimer;
    let dashboardStatus = "loading";
    let dashboardErrorKey = "connection";
    let dashboardRequest = null;
    let signingOut = false;

    function trackPresence(client, workspaceIds, signedInUser) {
        presenceChannels.forEach((channel) => {
            client.removeChannel(channel).catch((error) => console.error("Could not stop the previous presence channel.", error));
        });
        presenceChannels = [];
        if (!client?.channel || !signedInUser?.id) return;

        [...new Set(workspaceIds.filter(Boolean))].forEach((workspaceId) => {
            const channel = client.channel(`workspace-presence:${workspaceId}`, {
                config: { presence: { key: signedInUser.id } }
            });
            channel.subscribe(async (status) => {
                if (status === "SUBSCRIBED") {
                    const { error } = await channel.track({ userId: signedInUser.id });
                    if (error) console.error("Could not publish the student's online status.", error);
                } else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
                    console.error(`Student presence channel failed: ${status}.`);
                }
            });
            presenceChannels.push(channel);
        });
    }

    function subscribeToCalendar(client, signedInUser) {
        if (calendarChannel) {
            client.removeChannel(calendarChannel).catch((error) => console.error("Could not stop the previous student calendar subscription.", error));
            calendarChannel = null;
        }
        if (!client?.channel || !signedInUser?.id) return;
        calendarChannel = client.channel(`student-calendar:${signedInUser.id}`)
            .on("postgres_changes", { event: "*", schema: "public", table: "calendar_events" }, ({ eventType, new: next, old: previous }) => {
                if (eventType === "DELETE") calendarEvents = calendarEvents.filter((event) => event.id !== previous.id);
                else {
                    if (!classes.some((group) => group.id === next.class_id)) return;
                    const index = calendarEvents.findIndex((event) => event.id === next.id);
                    if (index < 0) calendarEvents.push(next);
                    else calendarEvents[index] = next;
                    if (eventType === "INSERT" && new Date(next.starts_at) > new Date()) {
                        showToast(`${text("reminder")} ${next.title}`);
                        playReminderSound();
                    }
                }
                if (activeView === "calendar") render();
            })
            .subscribe((status) => {
                if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") console.error(`Student schedule updates could not be received: ${status}.`);
            });
    }
    let profileTrigger = null;
    const sidebar = document.getElementById("studentSidebar");
    const pageContent = document.getElementById("studentPageContent");
    const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
    const text = (key) => copy[language][key];
    const lessonSections = (lesson) => Array.isArray(lesson.sections) ? lesson.sections : [];
    const activitiesFor = (lesson) => lessonSections(lesson).flatMap((section) => Array.isArray(section.activities) ? section.activities : []);
    const answerableActivityTypes = new Set([
        "drag-words", "fill-blank", "multiple-choice", "one-of-many", "order-items",
        "sentence-order", "true-false", "table", "match", "columns", "open-answer", "flashcards",
        "pronunciation-recording", "listening-questions", "find-error"
    ]);
    const progressActivitiesFor = (lesson) => activitiesFor(lesson).flatMap((activity) => {
        if (!answerableActivityTypes.has(activity.type)) return [];
        return Array.isArray(activity.questions) && activity.questions.length
            ? activity.questions.map((question, questionIndex) => ({
                activity,
                questionId: question.questionId || `legacy-${questionIndex}`,
                questionIndex
            }))
            : [{ activity, questionId: null, questionIndex: null }];
    });
    const activityCount = (lesson) => activitiesFor(lesson).length || Number(lesson.activityCount) || 0;
    function progressActivityCountFor(lesson) {
        const reported = Number(lesson.progressActivityCount);
        if (lesson.progressActivityCount !== undefined && lesson.progressActivityCount !== null
            && lesson.progressActivityCount !== "" && Number.isInteger(reported) && reported >= 0) return reported;
        return Array.isArray(lesson.sections) ? progressActivitiesFor(lesson).length : null;
    }
    function hasAnswerResponse(response) {
        if (typeof response === "string") return response.trim().length > 0;
        if (response && typeof response === "object" && !Array.isArray(response)) {
            const text = String(response.text || "").trim();
            const attachments = Array.isArray(response.attachments)
                ? response.attachments.some((item) => typeof item === "string" && item.trim())
                : false;
            return Boolean(text) || attachments;
        }
        return Array.isArray(response) && response.some((part) => typeof part === "string" && part.trim().length > 0);
    }
    function answeredCountFor(lesson, answers = lesson.progress) {
        if (Array.isArray(lesson.sections)) {
            return progressActivitiesFor(lesson).filter(({ activity, questionId, questionIndex }) => {
                if (!Number.isInteger(activity.index)) return false;
                const key = questionId
                    ? `${activityProgressKey(activity, activity.index)}.q${questionId}`
                    : activityProgressKey(activity, activity.index);
                const legacyKey = legacyActivityProgressKey(activity, activity.index);
                const answer = answers?.[key]
                    || (questionId && legacyKey ? answers?.[`${legacyKey}.q${questionId}`] : null)
                    || ((questionIndex === 0 || !questionId) && legacyKey ? answers?.[legacyKey] : null);
                return hasAnswerResponse(answer?.response);
            }).length;
        }
        return Number(lesson.answeredCount) || 0;
    }
    function progressBadge(lesson) {
        const completedBadge = lesson.completed
            ? `<span class="student-progress-badge is-complete">${escapeHtml(text("completed"))}</span>` : "";
        const total = progressActivityCountFor(lesson);
        if (total === null || total === 0) return completedBadge;
        const answered = Math.min(answeredCountFor(lesson), total);
        const percent = Math.round((answered / total) * 100);
        const label = `${answered}/${total} ${text("progress")}`;
        return `<span class="student-progress" data-progress-lesson="${escapeHtml(lesson.id)}">
            <span class="student-progress-meta"><span>${escapeHtml(label)}</span><strong>${percent}%</strong></span>
            <span class="student-progress-track" role="progressbar" aria-label="${escapeHtml(label)}" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${answered}" aria-valuetext="${escapeHtml(label)}"><span class="student-progress-fill" style="--progress-width:${percent}%"></span></span>
            ${completedBadge}
        </span>`;
    }
    function countLabel(count, type) {
        if (language === "kk") return `${count} ${{ class: "сынып", lesson: "сабақ", activity: "тапсырма" }[type]}`;
        if (language === "sk") return `${count} ${{ class: ["trieda", "triedy", "tried"], lesson: ["lekcia", "lekcie", "lekcií"], activity: ["úloha", "úlohy", "úloh"] }[type][count === 1 ? 0 : count >= 2 && count <= 4 ? 1 : 2]}`;
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
        dashboardStatus = "error";
        dashboardErrorKey = error.dashboardErrorKey || "connection";
        render();
    }

    function updateIdentity() {
        const metadata = user?.user_metadata || {};
        const fullName = [metadata.first_name || metadata.firstName, metadata.last_name || metadata.lastName].filter(Boolean).join(" ")
            || metadata.full_name || metadata.name || user?.email || text("profileRole");
        const initials = fullName.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toLocaleUpperCase();
        document.querySelectorAll(".student-name").forEach((element) => { element.textContent = fullName; });
        document.querySelectorAll(".student-avatar").forEach((element) => { element.textContent = initials; });
        document.querySelectorAll(".profile-trigger").forEach((button) => {
            button.setAttribute("aria-label", `${text("profile")}: ${fullName}`);
        });
        document.querySelectorAll('[data-i18n="profile.role"]').forEach((element) => { element.textContent = text("profileRole"); });
        document.querySelectorAll('[data-i18n="nav.home"]').forEach((element) => { element.textContent = text("home"); });
        document.querySelectorAll("[data-lang]").forEach((button) => {
            button.classList.toggle("active", button.dataset.lang === language);
            button.setAttribute("aria-pressed", button.dataset.lang === language ? "true" : "false");
        });
    }

    function renderWelcome() {
        const studentCount = lessons.length;
        return `<section class="student-hero"><div class="student-hero-copy"><span class="eyebrow">✦ SLOVASOFI · ${escapeHtml(text("profileRole").toLocaleUpperCase())}</span><h1>${escapeHtml(text("welcome"))}</h1><p>${escapeHtml(text("welcomeHint"))}</p></div><span class="student-hero-mark" aria-hidden="true">S</span></section>
            <div class="stats-grid student-stats">
                <article class="stat-card"><span class="stat-icon" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><rect x="3.5" y="4.5" width="17" height="15" rx="3"></rect><path d="M8 9h8M8 13h5"></path></svg></span><span>${escapeHtml(text("classes"))}</span><strong>${classes.length}</strong></article>
                <article class="stat-card"><span class="stat-icon blue" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="M5 3.5h10l4 4v13H5z"></path><path d="M14.5 3.5v4h4M8 12h8M8 16h8"></path></svg></span><span>${escapeHtml(text("lessons"))}</span><strong>${studentCount}</strong></article>
            </div>`;
    }

    function renderClasses() {
        const content = classes.length
            ? `<div class="card-grid student-class-grid">${classes.map((group, index) => `<article class="class-card student-class-card class-tone-${index % 4}">
                <button type="button" class="student-class-open" data-open-class-lessons="${escapeHtml(group.id)}"><span class="class-card-top"><span class="class-card-avatar">${escapeHtml(group.name.slice(0, 2).toLocaleUpperCase())}</span><span class="class-course-pill">${escapeHtml(countLabel(group.lessons.length, "lesson"))}</span></span>
                <span class="student-class-open-title">${escapeHtml(group.name)}</span><span class="student-class-open-subtitle">${escapeHtml(text("classLessons"))} →</span></button>
                <div class="student-class-lessons">${group.lessons.length
                    ? group.lessons.map((lesson) => `<button class="student-lesson-link" type="button" data-open-lesson="${escapeHtml(lesson.id)}"><span class="student-lesson-icon" aria-hidden="true">▤</span><span><strong>${escapeHtml(lesson.title)}</strong><small>${escapeHtml(lesson.unit || "")} · ${escapeHtml(countLabel(activityCount(lesson), "activity"))}</small>${progressBadge(lesson)}</span><span aria-hidden="true">→</span></button>`).join("")
                    : `<p class="student-muted">${escapeHtml(text("noLessons"))}</p>`}</div>
            </article>`).join("")}</div>`
            : `<div class="panel student-empty"><span class="student-empty-icon">▣</span><h2>${escapeHtml(text("noClasses"))}</h2></div>`;
        return `<div class="section-heading"><div><h1>${escapeHtml(text("classes"))}</h1><p>${escapeHtml(text("classesHint"))}</p></div></div>${content}`;
    }

    function renderLessons() {
        const sourceLessons = selectedClassId
            ? classes.find((group) => group.id === selectedClassId)?.lessons || []
            : lessons;
        const allLessons = sourceLessons.map((lesson) => ({
            ...lesson,
            classNames: classes.filter((group) => group.lessons.some((item) => item.id === lesson.id)).map((group) => group.name)
        }));
        const content = allLessons.length
            ? `<div class="panel student-lessons-panel"><div class="student-lessons-list">${allLessons.map((lesson) => `<article class="lesson-row student-lesson-row" role="button" tabindex="0" data-open-lesson-card="${escapeHtml(lesson.id)}"><span class="lesson-symbol">▤</span><div class="lesson-main"><strong>${escapeHtml(lesson.title)}</strong><small>${escapeHtml(lesson.classNames.join(", "))}${lesson.unit ? ` · ${escapeHtml(lesson.unit)}` : ""}</small>${progressBadge(lesson)}</div><span class="lesson-count">${escapeHtml(countLabel(activityCount(lesson), "activity"))}<span class="student-lesson-open-arrow" aria-hidden="true"> →</span></span></article>`).join("")}</div></div>`
            : `<div class="panel student-empty"><span class="student-empty-icon">▤</span><h2>${escapeHtml(text("noAssignedLessons"))}</h2></div>`;
        const selectedClass = classes.find((group) => group.id === selectedClassId);
        return `<div class="section-heading"><div><h1>${escapeHtml(selectedClass ? selectedClass.name : text("lessons"))}</h1><p>${escapeHtml(selectedClass ? text("classLessons") : text("lessonsHint"))}</p></div>${selectedClass ? `<button type="button" class="button secondary small" data-clear-class-filter>← ${escapeHtml(text("allLessons"))}</button>` : ""}</div>${content}`;
    }

    function scheduledOccurrences(from = new Date(), to = new Date(Date.now() + 30 * 86_400_000)) {
        return window.SlovaCalendar.occurrences(calendarEvents, from, to);
    }

    function calendarRecurrenceLabel(recurrence) {
        const labels = {
            daily: "calendarDaily",
            every_other_day: "calendarEveryOtherDay",
            weekly: "calendarWeekly",
            custom: "calendarCustom",
            selected_dates: "calendarSelectedDates"
        };
        return labels[recurrence] ? text(labels[recurrence]) : "";
    }

    function formatScheduledDate(date, options) {
        const locale = (SlovaI18n.locales({ ua: 'uk-UA', ru: 'ru-RU', en: 'en-US', sk: 'sk-SK', kk: 'kk-KZ' }))[language];
        return new Intl.DateTimeFormat(locale, options).format(date);
    }

    function renderStudentCalendar() {
        const upcoming = scheduledOccurrences();
        const grouped = new Map();
        upcoming.forEach((event) => {
            const key = `${event.occurrenceAt.getFullYear()}-${event.occurrenceAt.getMonth()}-${event.occurrenceAt.getDate()}`;
            const day = grouped.get(key) || [];
            day.push(event);
            grouped.set(key, day);
        });
        const content = upcoming.length
            ? `<div class="calendar-agenda">${[...grouped.values()].map((events) => `<section class="calendar-agenda-day"><h2>${formatScheduledDate(events[0].occurrenceAt, { weekday: "long", day: "numeric", month: "long" })}</h2>${events.map((event) => `<article class="calendar-agenda-event"><time><strong>${formatScheduledDate(event.occurrenceAt, { hour: "2-digit", minute: "2-digit" })}</strong><small>${Number(event.duration_minutes)} ${(SlovaI18n.locales({ ua: "хв", ru: "мин", en: "min", sk: "min", kk: "мин" }))[language]}</small></time><div><h3>${escapeHtml(event.title)}</h3><p>${escapeHtml(classes.find((group) => group.id === event.class_id)?.name || text("calendarClass"))}${calendarRecurrenceLabel(event.recurrence) ? ` · ${calendarRecurrenceLabel(event.recurrence)}` : ""}</p></div></article>`).join("")}</section>`).join("")}</div>`
            : `<div class="panel student-empty"><span class="student-empty-icon">▦</span><h2>${escapeHtml(text("calendarEmpty"))}</h2></div>`;
        return `<div class="section-heading"><div><h1>${escapeHtml(text("calendar"))}</h1><p>${escapeHtml(text("calendarHint"))}</p></div></div>${content}`;
    }

    function playReminderSound() {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        try {
            calendarAudioContext ||= new AudioContextClass();
            const audio = calendarAudioContext;
            if (audio.state === "suspended") audio.resume().catch((error) => console.warn("The browser blocked the student's calendar reminder sound.", error));
            const oscillator = audio.createOscillator();
            const gain = audio.createGain();
            oscillator.type = "sine";
            oscillator.frequency.value = 880;
            gain.gain.setValueAtTime(0.0001, audio.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.12, audio.currentTime + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + 0.45);
            oscillator.connect(gain);
            gain.connect(audio.destination);
            oscillator.start();
            oscillator.stop(audio.currentTime + 0.46);
        } catch (error) {
            console.warn("The browser did not allow the student's calendar reminder sound.", error);
        }
    }

    function unlockReminderAudio() {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass || calendarAudioContext) return;
        calendarAudioContext = new AudioContextClass();
        calendarAudioContext.resume().catch((error) => console.warn("Could not enable student calendar reminder audio.", error));
    }

    function checkCalendarReminders() {
        if (!user) return;
        const now = new Date();
        scheduledOccurrences(now, new Date(now.getTime() + 15 * 60_000)).forEach((event) => {
            const key = `${user.id}:${event.id}:${event.occurrenceAt.toISOString()}`;
            if (playedCalendarReminders.has(key)) return;
            playedCalendarReminders.add(key);
            showToast(`${text("reminder")} ${event.title}`);
            playReminderSound();
        });
    }

    function progressFor(lesson, index) {
        return lesson.progress?.[`a${index}`] || null;
    }

    function activityProgressKey(activity, index) {
        const id = typeof activity.id === "string" ? activity.id : "";
        return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)
            ? `b${id}`
            : `a${index}`;
    }

    function legacyActivityProgressKey(activity, index) {
        const id = typeof activity.id === "string" ? activity.id : "";
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) return `a${index}`;
        return Number.isInteger(activity.legacyProgressIndex) && activity.legacyProgressIndex >= 0
            ? `a${activity.legacyProgressIndex}`
            : null;
    }

    function progressForActivity(lesson, activity) {
        const index = activity.index;
        const legacyKey = legacyActivityProgressKey(activity, index);
        return lesson.progress?.[activityProgressKey(activity, index)] || (legacyKey ? lesson.progress?.[legacyKey] : null) || null;
    }

    function progressForQuestion(lesson, activity, index, questionId, questionIndex) {
        const key = activityProgressKey(activity, index);
        const legacyKey = legacyActivityProgressKey(activity, index);
        return lesson.progress?.[`${key}.q${questionId}`]
            || (legacyKey ? lesson.progress?.[`${legacyKey}.q${questionId}`] : null)
            || ((questionIndex === 0 && legacyKey) ? lesson.progress?.[legacyKey] : null);
    }

    function questionItemLabel(index) {
        const labels = SlovaI18n.locales({ ua: "Пункт", ru: "Пункт", en: "Item" });
        return `${labels[language] || labels.en} ${index + 1}`;
    }

    function flashcardChoiceText(key) {
        const labels = SlovaI18n.locales({
            ua: { know: "Знаю", repeat: "Повторити", hard: "Складні картки" },
            ru: { know: "Знаю", repeat: "Повторить", hard: "Сложные карточки" },
            en: { know: "Know", repeat: "Review", hard: "Difficult cards" }
        });
        return labels[language]?.[key] || labels.en[key];
    }

    function openAnswerText(key) {
        const labels = SlovaI18n.locales({
            ua: { attachments: "Вкладення", addAttachment: "Додати посилання", attachmentUrl: "https://...", removeAttachment: "Видалити" },
            ru: { attachments: "Вложения", addAttachment: "Добавить ссылку", attachmentUrl: "https://...", removeAttachment: "Удалить" },
            en: { attachments: "Attachments", addAttachment: "Add link", attachmentUrl: "https://...", removeAttachment: "Remove" }
        });
        return labels[language]?.[key] || labels.en[key];
    }

    function mediaUrl(value) {
        try {
            const url = new URL(value, location.href);
            return ["http:", "https:"].includes(url.protocol) ? url.href : "";
        } catch {
            return "";
        }
    }

    function flashcardSideMarkup(value) {
        const url = mediaUrl(value);
        if (!url) return escapeHtml(value).replace(/\n/g, "<br>");
        const pathname = new URL(url).pathname.toLowerCase();
        if (/\.(png|jpe?g|webp|gif|avif)$/.test(pathname)) {
            return `<img class="student-flashcard-media" src="${escapeHtml(url)}" alt="">`;
        }
        if (/\.(mp3|wav|m4a|ogg|aac|flac)$/.test(pathname)) {
            return `<audio class="student-flashcard-media" controls preload="none" src="${escapeHtml(url)}"></audio>`;
        }
        return `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(value)}</a>`;
    }

    function optionMediaMarkup(value) {
        const url = mediaUrl(value);
        if (!url) return "";
        const pathname = new URL(url).pathname.toLowerCase();
        if (/\.(png|jpe?g|webp|gif|avif)$/.test(pathname)) return `<img class="student-choice-media" src="${escapeHtml(url)}" alt="" loading="lazy">`;
        if (/\.(mp3|wav|m4a|ogg|aac|flac)$/.test(pathname)) return `<audio class="student-choice-media" controls preload="none" src="${escapeHtml(url)}"></audio>`;
        return "";
    }

    function videoEmbedUrl(value) {
        try {
            const url = new URL(value);
            if (["drive.google.com", "www.drive.google.com"].includes(url.hostname.toLowerCase())) {
                const fileId = url.pathname.match(/^\/file\/d\/([A-Za-z0-9_-]+)/)?.[1] || url.searchParams.get("id");
                return fileId && /^[A-Za-z0-9_-]{10,200}$/.test(fileId)
                    ? `https://drive.google.com/file/d/${fileId}/preview`
                    : "";
            }
            if (!["youtube.com", "www.youtube.com", "m.youtube.com", "youtube-nocookie.com", "www.youtube-nocookie.com", "youtu.be", "www.youtu.be"].includes(url.hostname.toLowerCase())) return "";
            const videoId = url.hostname.endsWith("youtu.be")
                ? url.pathname.split("/").filter(Boolean)[0]
                : url.searchParams.get("v") || url.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/)?.[1];
            if (!videoId || !/^[\w-]{11}$/.test(videoId)) return "";
            const embed = new URL(`https://www.youtube-nocookie.com/embed/${videoId}`);
            const start = Number(url.searchParams.get("start") || url.searchParams.get("t")?.replace(/s$/, ""));
            if (Number.isFinite(start) && start > 0) embed.searchParams.set("start", String(Math.floor(start)));
            return embed.href;
        } catch {
            return "";
        }
    }

    function renderActivity(activity) {
        const index = activity.index;
        if (activity.type === "text") {
            const note = window.SlovaActivityUI?.renderNote(activity.content, activity.prompt);
            if (note) return note;
            const richText = window.SlovaActivityUI?.renderRichText(activity.content);
            if (richText) return richText;
        }
        if (Array.isArray(activity.questions) && activity.questions.length) {
            const canSubmit = activity.questions.some((question) => question.gradable || question.reviewRequired);
            const questions = activity.questions.map((question, questionIndex) => ({
                question,
                questionIndex,
                saved: progressForQuestion(openedLesson, activity, index, question.questionId || `legacy-${questionIndex}`, questionIndex)
            }));
            const listening = activity.type === "listening-questions"
                ? (() => {
                    const source = mediaUrl(activity.content);
                    const maxPlays = Number(activity.maxPlays) || 0;
                    return source ? `<audio class="student-activity-media" controls preload="none" data-listening-audio data-max-plays="${maxPlays}" src="${escapeHtml(source)}"></audio>${maxPlays ? `<p class="student-muted" data-listening-status>${escapeHtml(text("playsRemaining").replace("{count}", String(maxPlays)))}</p>` : ""}` : "";
                })()
                : "";
            const transcriptAvailable = activity.transcript
                && (!activity.transcriptAfterSubmit || questions.every(({ saved }) => saved?.draft !== true && hasAnswerResponse(saved?.response)));
            const transcript = transcriptAvailable
                ? `<details class="student-listening-transcript"><summary>${escapeHtml(text("transcript"))}</summary><p>${escapeHtml(activity.transcript).replace(/\n/g, "<br>")}</p></details>`
                : "";
            return `<section class="student-activity-group">
                <header class="student-activity-group-heading"><span class="student-activity-number">${index + 1}</span><h3>${escapeHtml(activity.prompt || text("activity"))}</h3></header>
                ${listening}
                <div class="student-activity-subitems">${questions.map(({ question, questionIndex, saved }) => renderActivityItem(
                    question,
                    index,
                    questionIndex,
                    saved
                )).join("")}</div>
                ${transcript}
                ${canSubmit ? `<div class="student-activity-group-actions"><button class="button small" type="button" data-submit-activity-group>${escapeHtml(text("checkAnswers"))}</button></div>` : ""}
            </section>`;
        }
        return renderActivityItem(activity, index, null, progressForActivity(openedLesson, activity));
    }

    function renderActivityItem(activity, index, questionIndex, saved) {
        const savedResponse = saved?.response;
        const radioName = questionIndex === null ? `student-answer-${index}` : `student-answer-${index}-${questionIndex}`;
        let body = "";
        let controls = "";
        if (activity.type === "drag-words") {
            const lockedWords = Array.isArray(activity.settings?.lockedWords) ? activity.settings.lockedWords.map(String) : [];
            const selected = Array.isArray(savedResponse) ? savedResponse.map(String) : [...lockedWords];
            const remaining = [...activity.tokens];
            selected.forEach((word) => {
                const tokenIndex = remaining.indexOf(word);
                if (tokenIndex >= 0) remaining.splice(tokenIndex, 1);
            });
            body = `<p class="student-muted">${escapeHtml(text("addWords"))}</p><div class="student-word-bank" data-word-bank>${remaining.map((word) => `<button class="student-word-token" type="button" draggable="true" data-word-token="${escapeHtml(word)}">${escapeHtml(word)}</button>`).join("")}</div><div class="student-answer-zone" data-word-answer aria-label="${escapeHtml(text("yourAnswer"))}">${selected.map((word) => lockedWords.includes(word) ? `<span class="student-word-token selected is-locked" aria-label="${escapeHtml(text("locked"))}">${escapeHtml(word)} 🔒</span>` : `<button class="student-word-token selected" type="button" draggable="true" data-remove-word="${escapeHtml(word)}">${escapeHtml(word)} ×</button>`).join("")}</div>`;
            controls = `<input type="hidden" data-answer-kind="words">`;
        } else if (activity.type === "fill-blank") {
            const savedParts = Array.isArray(savedResponse) ? [...savedResponse] : [];
            const parts = String(activity.content || "").split("___");
            const blankCount = Math.max(parts.length - 1, Number(activity.blankCount) || 0);
            const hints = Array.isArray(activity.settings?.hints) ? activity.settings.hints : activity.hints || [];
            body = `<p class="student-activity-content student-fill-text">${Array.from({ length: blankCount }, (_, partIndex) => `${escapeHtml(parts[partIndex] || "")}<input class="student-inline-answer ${!saved?.draft && saved?.blankResults?.[partIndex] === true ? "blank-correct" : !saved?.draft && saved?.blankResults?.[partIndex] === false ? "blank-incorrect" : ""}" data-blank-answer value="${escapeHtml(savedParts.shift() || "")}" aria-invalid="${!saved?.draft && saved?.blankResults?.[partIndex] === false}" aria-label="${escapeHtml(text("yourAnswer"))} ${partIndex + 1}" autocomplete="off">`).join("")}${escapeHtml(parts.slice(blankCount).join("___"))}</p>${hints.map((hint, hintIndex) => `<div><button type="button" class="student-hint" data-show-hint="${hintIndex}">${escapeHtml(text("hint"))} ${hintIndex + 1}</button><span data-hint-content hidden>${escapeHtml(hint)}</span></div>`).join("")}${activity.wordBank?.length ? `<div class="student-word-bank">${activity.wordBank.map((word) => `<button class="student-word-token" type="button" data-word-bank-answer="${escapeHtml(word)}">${escapeHtml(word)}</button>`).join("")}</div>` : ""}`;
            controls = `<input type="hidden" data-answer-kind="blanks">`;
        } else if (activity.type === "multiple-choice" || activity.type === "one-of-many") {
            const rawOptions = Array.isArray(activity.options) ? activity.options : [];
            const options = rawOptions.map((option) => typeof option === "string" ? { text: option, media: "", explanation: "" } : option);
            const multiple = activity.type === "multiple-choice" && activity.multipleAnswers === true;
            const savedValues = Array.isArray(savedResponse) ? savedResponse.map(String) : [String(savedResponse || "")];
            if (activity.type === "one-of-many" && String(options[0]?.text || "").includes("___")) {
                const sentence = options[0].text;
                const choicesByBlank = Array.isArray(activity.choicesByBlank) ? activity.choicesByBlank : [];
                let blankIndex = 0;
                body = `<p class="student-activity-content">${sentence.split("___").map((part, index, items) => `${escapeHtml(part)}${index < items.length - 1 ? `<select class="student-inline-select" data-choice-select aria-label="${escapeHtml(text("choose"))}"><option value="">---</option>${(choicesByBlank[blankIndex] || options.slice(1).map((item) => item.text)).map((option) => `<option value="${escapeHtml(option)}" ${savedValues[blankIndex] === option ? "selected" : ""}>${escapeHtml(option)}</option>`).join("")}</select>${blankIndex++, ""}` : ""}`).join("")}</p>`;
                controls = `<input type="hidden" data-answer-kind="choice-list">`;
            } else {
                body = `<div class="student-answer-options">${options.map((option) => `<label class="student-answer-option"><input type="${multiple ? "checkbox" : "radio"}" name="${radioName}" value="${escapeHtml(option.text)}" ${savedValues.includes(option.text) ? "checked" : ""}><span>${optionMediaMarkup(option.media)}${escapeHtml(option.text)}</span></label>`).join("")}</div>`;
                controls = `<input type="hidden" data-answer-kind="${multiple ? "choices" : "choice"}">`;
            }
        } else if (activity.type === "true-false") {
            const options = Array.isArray(activity.options) ? activity.options : [{ value: "true", label: text("true") }, { value: "false", label: text("false") }];
            body = `<p class="student-activity-content">${escapeHtml(activity.content || "")}</p><div class="student-answer-options">${options.map(({ value, label }) => `<label class="student-answer-option"><input type="radio" name="${radioName}" value="${escapeHtml(value)}" ${savedResponse === value ? "checked" : ""}><span>${escapeHtml(value === "true" ? text("true") : value === "false" ? text("false") : label)}</span></label>`).join("")}</div>`;
            controls = `<input type="hidden" data-answer-kind="choice">`;
        } else if (activity.type === "order-items" || activity.type === "sentence-order") {
            const savedItems = Array.isArray(savedResponse) ? savedResponse.map(String) : [];
            const items = savedItems.length ? savedItems.map((text) => ({ text, media: "" })) : (activity.items || []).map((item) => typeof item === "string" ? { text: item, media: "" } : item);
            body = `<ol class="student-order-list">${items.map((item, itemIndex) => `<li draggable="true" data-order-item="${escapeHtml(item.text)}"><span>${optionMediaMarkup(item.media)}${escapeHtml(item.text)}</span><span><button type="button" data-move-item="-1" ${itemIndex === 0 ? "disabled" : ""} aria-label="${escapeHtml(text("moveUp"))}">↑</button><button type="button" data-move-item="1" ${itemIndex === items.length - 1 ? "disabled" : ""} aria-label="${escapeHtml(text("moveDown"))}">↓</button></span></li>`).join("")}</ol>`;
            controls = `<input type="hidden" data-answer-kind="order">`;
        } else if (activity.type === "match" || activity.type === "columns") {
            const rows = activity.type === "match" ? activity.pairs || [] : activity.items || [];
            const options = activity.type === "match" ? activity.options || [] : activity.categories || [];
            const savedChoices = Array.isArray(savedResponse) ? savedResponse : [];
            body = `<div class="student-match-list" data-pair-board ${activity.type === "columns" ? "data-pair-reuse" : ""}>${rows.map((rawItem, itemIndex) => {
                const item = typeof rawItem === "string" ? { text: rawItem, media: "" } : rawItem;
                const choiceOptions = options.map((rawOption) => typeof rawOption === "string" ? { text: rawOption, media: "" } : rawOption);
                return `<div class="student-match-row" data-pair-row><span>${optionMediaMarkup(item.media)}${escapeHtml(item.text)}</span><select data-match-answer aria-label="${escapeHtml(item.text)}"><option value="">${escapeHtml(text("choose"))}</option>${choiceOptions.map((option) => `<option value="${escapeHtml(option.text)}" ${savedChoices[itemIndex] === option.text ? "selected" : ""}>${escapeHtml(option.text)}</option>`).join("")}</select></div>`;
            }).join("")}</div>`;
            controls = `<input type="hidden" data-answer-kind="matches">`;
        } else if (activity.type === "table") {
            const savedParts = Array.isArray(savedResponse) ? savedResponse : [];
            body = `<div class="student-table-wrap"><table class="student-answer-table"><tbody>${(activity.rows || []).map((row) => `<tr>${row.map((cell) => `<td>${String(cell).split(/(\{\{blank:\d+\}\})/g).map((part) => {
                const blank = part.match(/^\{\{blank:(\d+)\}\}$/);
                if (!blank) return escapeHtml(part);
                const blankIndex = Number(blank[1]);
                const value = escapeHtml(savedParts[blankIndex] || "");
                const options = activity.cellOptions?.[String(blankIndex)];
                return Array.isArray(options) && options.length
                    ? `<select class="student-inline-select" data-table-answer aria-label="${escapeHtml(text("yourAnswer"))}"><option value="">${escapeHtml(text("choose"))}</option>${options.map((option) => `<option value="${escapeHtml(option)}" ${savedParts[blankIndex] === option ? "selected" : ""}>${escapeHtml(option)}</option>`).join("")}</select>`
                    : `<input class="student-inline-answer" data-table-answer value="${value}" aria-label="${escapeHtml(text("yourAnswer"))}" autocomplete="off">`;
            }).join("")}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
            controls = `<input type="hidden" data-answer-kind="table">`;
        } else if (activity.type === "open-answer") {
            const openSaved = savedResponse && typeof savedResponse === "object" && !Array.isArray(savedResponse)
                ? savedResponse
                : { text: savedResponse || "", attachments: [] };
            const attachments = Array.isArray(openSaved.attachments)
                ? openSaved.attachments.filter((item) => typeof item === "string").slice(0, 8)
                : [];
            body = `${activity.content ? `<div class="student-activity-content">${escapeHtml(activity.content).replace(/\n/g, "<br>")}</div>` : ""}<textarea class="student-open-answer" data-open-answer maxlength="10000" placeholder="${escapeHtml(text("yourAnswer"))}">${escapeHtml(openSaved.text || "")}</textarea><div class="student-open-attachments"><strong>${escapeHtml(openAnswerText("attachments"))}</strong><div data-open-attachments>${attachments.map((url) => `<div class="student-open-attachment"><input class="student-inline-answer" data-open-attachment value="${escapeHtml(url)}" placeholder="${escapeHtml(openAnswerText("attachmentUrl"))}" autocomplete="off"><button type="button" class="button secondary small" data-remove-open-attachment>${escapeHtml(openAnswerText("removeAttachment"))}</button></div>`).join("")}</div><button class="button secondary small" type="button" data-add-open-attachment>${escapeHtml(openAnswerText("addAttachment"))}</button></div>`;
            controls = `<input type="hidden" data-answer-kind="open">`;
        } else if (activity.type === "flashcards") {
            const ratings = Array.isArray(savedResponse) ? savedResponse : [];
            body = `<button class="button secondary small student-flashcard-hard-toggle" type="button" data-flashcards-hard-only aria-pressed="false">${escapeHtml(flashcardChoiceText("hard"))}</button><div class="student-flashcard-list">${(activity.cards || []).map((item) => {
                const rating = ratings[item.cardIndex] || "";
                return `<div class="student-flashcard-card" data-flashcard-card data-card-index="${item.cardIndex}" data-rating="${escapeHtml(rating)}"><div class="student-flashcard"><strong class="student-flashcard-face">${flashcardSideMarkup(item.front)}</strong><button class="student-flashcard-flip" type="button" data-front="${escapeHtml(item.front)}" data-back="${escapeHtml(item.back)}">${escapeHtml(text("flip"))}</button></div><div class="student-flashcard-rating"><button class="button secondary small" type="button" data-flashcard-rating="know" data-card-index="${item.cardIndex}" aria-pressed="${rating === "know"}">${escapeHtml(flashcardChoiceText("know"))}</button><button class="button secondary small" type="button" data-flashcard-rating="repeat" data-card-index="${item.cardIndex}" aria-pressed="${rating === "repeat"}">${escapeHtml(flashcardChoiceText("repeat"))}</button></div></div>`;
            }).join("")}</div>`;
        } else if (["vocabulary", "phrase-list"].includes(activity.type)) {
            body = window.SlovaPhraseList.render(window.SlovaPhraseList.wordsFor(activity), language, user?.id || "");
        } else if (activity.type === "pronunciation-recording") {
            const savedPath = typeof savedResponse === "string" ? savedResponse : "";
            body = `${activity.content ? `<div class="student-activity-content">${escapeHtml(activity.content).replace(/\n/g, "<br>")}</div>` : ""}<button class="button secondary small" type="button" data-recording-toggle>${escapeHtml(text("recordPronunciation"))}</button><p class="student-muted" data-recording-status aria-live="polite">${savedPath ? escapeHtml(text("recordingSaved")) : ""}</p><audio class="student-activity-media" data-recording-preview controls preload="none" ${savedPath ? "" : "hidden"}></audio>`;
            controls = `<input type="hidden" data-answer-kind="recording" data-recording-path value="${escapeHtml(savedPath)}">`;
        } else if (activity.type === "find-error") {
            let wordIndex = 0;
            const words = String(activity.content || "").match(/\S+|\s+/g) || [];
            body = `<p class="student-error-text">${words.map((word) => /^\s+$/.test(word)
                ? escapeHtml(word)
                : `<button type="button" class="student-error-word" data-error-word-index="${wordIndex++}">${escapeHtml(word)}</button>`).join("")}</p><label class="student-error-correction">${escapeHtml(text("correction"))}<input class="student-inline-answer" data-error-correction autocomplete="off"></label><p class="student-muted" data-error-selection>${escapeHtml(text("chooseErrorWord"))}</p>`;
            controls = `<input type="hidden" data-answer-kind="find-error" data-error-selected value="">`;
        } else if (activity.type === "interactive-image") {
            const image = mediaUrl(activity.content);
            const hotspots = Array.isArray(activity.hotspots) ? activity.hotspots : [];
            body = image ? `<div class="student-hotspot-image"><img src="${escapeHtml(image)}" alt="${escapeHtml(activity.prompt || text("imageAlt"))}" loading="lazy">${hotspots.map((hotspot, hotspotIndex) => `<button type="button" class="student-hotspot" data-hotspot-index="${hotspotIndex}" style="left:${Number(hotspot.x)}%;top:${Number(hotspot.y)}%" aria-label="${escapeHtml(hotspot.word)}">${hotspotIndex + 1}</button>`).join("")}</div><p class="student-hotspot-detail" data-hotspot-detail>${escapeHtml(text("selectHotspot"))}</p>` : `<p class="student-muted">${escapeHtml(text("noContent"))}</p>`;
        } else if (activity.type === "image") {
            const images = window.slovaGallery.parse(activity.content);
            body = images.length ? window.slovaGallery.html(images, activity.alt || activity.prompt || text("imageAlt"), "student-activity-image") : `<p class="student-muted">${escapeHtml(text("noContent"))}</p>`;
        } else if (activity.type === "audio" || activity.type === "video") {
            const embed = activity.type === "video" ? videoEmbedUrl(activity.content) : "";
            const source = mediaUrl(activity.content);
            const mediaPlayer = embed
                ? `<iframe class="student-activity-video" src="${escapeHtml(embed)}" title="${escapeHtml(activity.prompt || text("activity"))}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
                : source ? `<${activity.type} class="student-activity-media" controls preload="metadata" data-enhanced-media data-media-position-key="${escapeHtml(`${user?.id || ""}:${openedLesson?.id || ""}:${index}`)}"><source src="${escapeHtml(source)}"></${activity.type}>` : `<p class="student-muted">${escapeHtml(text("noContent"))}</p>`;
            const transcript = typeof activity.settings?.transcript === "string" ? activity.settings.transcript.trim() : "";
            const mediaTools = source ? `<div class="student-activity-actions"><button class="button secondary small" type="button" data-media-seek="-5">${escapeHtml(text("seekBack"))}</button><button class="button secondary small" type="button" data-media-seek="5">${escapeHtml(text("seekForward"))}</button><label>${escapeHtml(text("speed"))} <select data-media-speed><option value="0.75">0.75×</option><option value="1" selected>1×</option><option value="1.25">1.25×</option><option value="1.5">1.5×</option></select></label><button class="button secondary small" type="button" data-media-loop="a">${escapeHtml(text("loopA"))}</button><button class="button secondary small" type="button" data-media-loop="b">${escapeHtml(text("loopB"))}</button><button class="button secondary small" type="button" data-media-loop="clear">${escapeHtml(text("clearLoop"))}</button></div>` : "";
            body = `${mediaPlayer}${mediaTools}${transcript ? `<details class="student-media-transcript" ${activity.settings?.hideTranscript === false ? "open" : ""}><summary>${escapeHtml(text("transcript"))}</summary><p>${escapeHtml(transcript).replace(/\n/g, "<br>")}</p></details>` : ""}`;
        } else {
            body = activity.content ? `<div class="student-activity-content">${escapeHtml(activity.content).replace(/\n/g, "<br>")}</div>` : `<p class="student-muted">${escapeHtml(text("noContent"))}</p>`;
        }
        const feedback = saved?.draft ? text("progressSaved")
            : saved?.correct === true ? text("correct")
                : saved?.correct === false ? text("incorrect")
                    : saved?.correct === null ? text("submitted") : "";
        const isQuestion = Number.isInteger(questionIndex);
        const canSubmit = Boolean(activity.gradable || activity.reviewRequired);
        const feedbackMarkup = canSubmit || activity.type === "flashcards"
            ? `<p class="student-answer-feedback ${saved?.correct === true ? "is-correct" : saved?.correct === false ? "is-incorrect" : ""}" data-answer-feedback aria-live="polite">${escapeHtml([feedback, saved?.feedback].filter(Boolean).join(" "))}</p>`
            : "";
        const submitMarkup = !canSubmit ? feedbackMarkup
            : isQuestion ? controls
                : `<div class="student-activity-actions">${controls}<button class="button small" type="button" data-submit-answer>${escapeHtml(text("checkAnswer"))}</button></div>${feedbackMarkup}`;
        const questionId = isQuestion ? String(activity.questionId || `legacy-${questionIndex}`) : "";
        const questionAttributes = isQuestion
            ? `data-question-id="${escapeHtml(questionId)}" data-question-index="${questionIndex}" data-submittable="${canSubmit}"`
            : "";
        const itemNumber = isQuestion ? `${index + 1}.${questionIndex + 1}` : String(index + 1);
        const title = activity.prompt || (isQuestion ? questionItemLabel(questionIndex) : text("activity"));
        return `<article class="student-activity" data-activity-index="${index}" ${questionAttributes} data-activity-type="${escapeHtml(activity.type)}"><span class="student-activity-number">${itemNumber}</span><div class="student-activity-main"><h3>${escapeHtml(title)}</h3>${isQuestion ? feedbackMarkup : ""}${body}${submitMarkup}</div></article>`;
    }

    function renderLessonDetail(lesson) {
        const allSections = lessonSections(lesson);
        const lessonItems = allSections.filter((section) => !section.homework);
        const homeworkItems = allSections.filter((section) => section.homework);
        const sections = studentWorkspaceTab === "homework" ? homeworkItems : lessonItems;
        const sectionKey = (item, index, homework) => item.id || `${homework ? "homework" : "lesson"}-${index}`;
        if (!sections.some((item, index) => sectionKey(item, index, studentWorkspaceTab === "homework") === activeStudentSectionId)) {
            activeStudentSectionId = sections.length ? sectionKey(sections[0], 0, studentWorkspaceTab === "homework") : "";
        }
        const sectionIndex = sections.findIndex((item, index) => sectionKey(item, index, studentWorkspaceTab === "homework") === activeStudentSectionId);
        const section = sections[sectionIndex];
        const renderSectionList = (items, homework) => items.map((item, index) => {
            const id = sectionKey(item, index, homework);
            return `<div class="student-section-row ${id === activeStudentSectionId && studentWorkspaceTab === (homework ? "homework" : "lesson") ? "active" : ""}">
            <button type="button" class="student-section-select" data-student-select-section="${escapeHtml(id)}" data-student-section-tab="${homework ? "homework" : "lesson"}"><span class="student-section-number">${index + 1}</span><span class="student-section-label">${escapeHtml(item.title || text("section"))}</span></button>
        </div>`;
        }).join("");
        return `<button class="button secondary student-back-link" type="button" data-back-to-lessons>← ${escapeHtml(text("back"))}</button>
            <section class="student-lesson-hero"><span class="eyebrow">${escapeHtml(lesson.className || "")}</span><h1>${escapeHtml(lesson.title)}</h1><p>${escapeHtml(lesson.unit || "")} · ${escapeHtml(countLabel(activityCount(lesson), "activity"))}</p>${progressBadge(lesson)}</section>
            <nav class="student-workspace-tabs" role="tablist" aria-label="${escapeHtml(text("lessonTab"))}">
                <button type="button" role="tab" aria-selected="${studentWorkspaceTab === "lesson"}" class="${studentWorkspaceTab === "lesson" ? "active" : ""}" data-student-workspace-tab="lesson">${escapeHtml(text("lessonTab"))}</button>
                <button type="button" role="tab" aria-selected="${studentWorkspaceTab === "homework"}" class="${studentWorkspaceTab === "homework" ? "active" : ""}" data-student-workspace-tab="homework">${escapeHtml(text("homeworkTab"))}</button>
            </nav>
            <button type="button" class="student-sections-toggle" data-toggle-student-sections aria-label="${escapeHtml(text("openSections"))}" aria-expanded="${studentSectionsOpen}">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg><span>${escapeHtml(text("section"))}</span>
            </button>
            <div class="student-workspace-layout">
                <main class="student-workspace-main">${section ? `<section class="panel student-section ${section.homework ? "student-homework-section" : ""}" data-student-section>
                    <h2>${escapeHtml(section.title || text("section"))}</h2>
                    <div class="student-activity-list">${section.activities.map((activity) => renderActivity(activity)).join("") || `<p class="student-muted">${escapeHtml(text("noContent"))}</p>`}</div>
                </section>
                <div class="student-workspace-footer"><button type="button" class="button secondary small" data-student-step="-1" data-student-section-target="${sectionIndex > 0 ? escapeHtml(sectionKey(sections[sectionIndex - 1], sectionIndex - 1, studentWorkspaceTab === "homework")) : ""}" ${sectionIndex <= 0 ? "disabled" : ""}>${escapeHtml(text("previousSection"))}</button><span>${sectionIndex + 1} / ${sections.length}</span><button type="button" class="button secondary small" data-student-step="1" data-student-section-target="${sectionIndex >= 0 && sectionIndex < sections.length - 1 ? escapeHtml(sectionKey(sections[sectionIndex + 1], sectionIndex + 1, studentWorkspaceTab === "homework")) : ""}" ${sectionIndex < 0 || sectionIndex >= sections.length - 1 ? "disabled" : ""}>${escapeHtml(text("nextSection"))}</button></div>`
                    : `<section class="panel student-section"><h2>${escapeHtml(text(studentWorkspaceTab === "homework" ? "homeworkSections" : "lessonSections"))}</h2><p class="student-muted">${escapeHtml(text("noContent"))}</p></section>`}
                </main>
                <button type="button" class="student-section-drawer-backdrop ${studentSectionsOpen ? "is-open" : ""}" data-close-student-sections aria-label="${escapeHtml(text("closeSections"))}" ${studentSectionsOpen ? "" : "hidden"}></button>
                <aside class="student-sections-panel ${studentSectionsOpen ? "is-open" : ""}" id="studentSectionsPanel" aria-label="${escapeHtml(text("openSections"))}">
                    <div class="student-sections-heading"><h2>${escapeHtml(text("lessonSections"))}</h2><button type="button" data-close-student-sections aria-label="${escapeHtml(text("closeSections"))}">×</button></div><nav class="student-sections-list" aria-label="${escapeHtml(text("lessonSections"))}">${renderSectionList(lessonItems, false) || `<p class="student-muted">${escapeHtml(text("noContent"))}</p>`}</nav>
                    <h3>${escapeHtml(text("homeworkSections"))}</h3><nav class="student-sections-list student-homework-sections-list" aria-label="${escapeHtml(text("homeworkSections"))}">${renderSectionList(homeworkItems, true) || `<p class="student-muted">${escapeHtml(text("noContent"))}</p>`}</nav>
                </aside>
            </div>`;
    }

    function scrollToFirstStudentActivity() {
        window.requestAnimationFrame(() => {
            const firstActivity = pageContent.querySelector("[data-student-section] .student-activity-list > :first-child");
            const target = firstActivity || pageContent.querySelector("[data-student-section] > h2");
            target?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    }

    async function invokeLessonApi(payload) {
        // Retry only reads: a failed submission may already have reached the server.
        let data, error;
        const attempts = ["list", "load"].includes(payload.action) ? 3 : 1;
        for (let attempt = 0; attempt < attempts; attempt += 1) {
            ({ data, error } = await window.supabaseClient.functions.invoke("student-lessons", { body: payload }));
            const status = error?.context instanceof Response ? error.context.status : 0;
            const transient = error?.name === "FunctionsFetchError" || status >= 500;
            if (!error || !transient || attempt === attempts - 1) break;
            await new Promise((resolve) => setTimeout(resolve, 400 * (attempt + 1)));
        }
        if (error) {
            const status = error.context instanceof Response ? error.context.status : 0;
            if (error.name === "FunctionsFetchError" || status === 404 || status >= 500) {
                const failure = new Error(text(status === 404 || status >= 500 ? "unavailable" : "connection"));
                failure.dashboardErrorKey = status === 404 || status >= 500 ? "unavailable" : "connection";
                throw failure;
            }
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
        if (kind === "choice-list") return [...element.querySelectorAll("[data-choice-select]")].map((select) => select.value);
        if (kind === "choices") return [...element.querySelectorAll('input[type="checkbox"]:checked')].map((input) => input.value);
        if (kind === "choice") return element.querySelector('input[type="radio"]:checked')?.value || element.querySelector("[data-choice-select]")?.value || "";
        if (kind === "order") return [...element.querySelectorAll("[data-order-item]")].map((item) => item.dataset.orderItem);
        if (kind === "matches") return [...element.querySelectorAll("[data-match-answer]")].map((select) => select.value);
        if (kind === "table") return [...element.querySelectorAll("[data-table-answer]")].map((input) => input.value.trim());
        if (kind === "recording") return element.querySelector("[data-recording-path]")?.value || "";
        if (kind === "find-error") return JSON.stringify({
            index: element.querySelector("[data-error-selected]")?.value || "",
            correction: element.querySelector("[data-error-correction]")?.value.trim() || ""
        });
        if (kind === "open") return {
            text: element.querySelector("[data-open-answer]")?.value || "",
            attachments: [...element.querySelectorAll("[data-open-attachment]")].map((input) => input.value.trim()).filter(Boolean)
        };
        return "";
    }

    function syncProgressDisplay(lessonId) {
        const lesson = lessons.find((item) => item.id === lessonId)
            || classes.flatMap((group) => group.lessons).find((item) => item.id === lessonId);
        if (!lesson) return;
        pageContent.querySelectorAll("[data-progress-lesson]").forEach((element) => {
            if (element.dataset.progressLesson !== lessonId) return;
            const template = document.createElement("template");
            template.innerHTML = progressBadge(lesson);
            const replacement = template.content.firstElementChild;
            if (replacement) element.replaceWith(replacement);
            else element.remove();
        });
    }

    function updateLessonProgress(lessonId, answers, completed) {
        const currentLesson = openedLesson?.id === lessonId ? openedLesson : null;
        let answeredCount = Object.values(answers || {}).filter((entry) => hasAnswerResponse(entry?.response)).length;
        let progressActivityCount = null;
        if (currentLesson) {
            currentLesson.progress = answers;
            currentLesson.completed = completed;
            progressActivityCount = progressActivityCountFor(currentLesson);
            currentLesson.answeredCount = answeredCountFor(currentLesson, answers);
            answeredCount = currentLesson.answeredCount;
        }
        lessons.filter((lesson) => lesson.id === lessonId).forEach((lesson) => {
            lesson.answeredCount = answeredCount;
            lesson.completed = completed;
            if (progressActivityCount !== null) lesson.progressActivityCount = progressActivityCount;
        });
        classes.flatMap((group) => group.lessons).filter((lesson) => lesson.id === lessonId).forEach((lesson) => {
            lesson.answeredCount = answeredCount;
            lesson.completed = completed;
            if (progressActivityCount !== null) lesson.progressActivityCount = progressActivityCount;
        });
        syncProgressDisplay(lessonId);
    }

    function activityDraftKey(activityIndex, questionId) {
        return questionId ? `${activityIndex}:${questionId}` : String(activityIndex);
    }

    function setDraftFeedback(lessonId, activityIndex, questionId, message, isError = false) {
        if (openedLesson?.id !== lessonId || selectedLessonId !== lessonId) return;
        const activity = [...pageContent.querySelectorAll(".student-activity[data-activity-index]")].find((item) =>
            item.dataset.activityIndex === String(activityIndex)
            && (questionId ? item.dataset.questionId === questionId : !item.dataset.questionId));
        const feedback = activity?.querySelector("[data-answer-feedback]");
        if (!feedback) return;
        feedback.textContent = message;
        feedback.className = `student-answer-feedback${isError ? " is-incorrect" : ""}`;
    }

    function queueDraftSave(lessonId, draftKey, activityIndex, questionId, response) {
        const snapshot = structuredClone(response);
        const save = draftSaveQueue.catch((error) => {
            console.warn("Continuing the progress-save queue after an earlier draft failed.", error);
        }).then(async () => {
            const result = await invokeLessonApi({
                action: "save-draft",
                lessonId,
                activityIndex,
                ...(questionId ? { questionId } : {}),
                response: snapshot
            });
            updateLessonProgress(lessonId, result.answers, result.completed);
            const pending = pendingDrafts.get(draftKey);
            if (pending && JSON.stringify(pending.response) === JSON.stringify(snapshot)) {
                pendingDrafts.delete(draftKey);
            }
            setDraftFeedback(lessonId, activityIndex, questionId, text("progressSaved"));
        }).catch((error) => {
            console.error("Could not save the student answer draft.", error);
            setDraftFeedback(lessonId, activityIndex, questionId, error.message || text("loadError"), true);
            throw error;
        });
        draftSaveQueue = save;
        return save;
    }

    function scheduleDraftSave(element) {
        if (!openedLesson || !user || !element?.querySelector("[data-answer-kind]")) return;
        const lessonId = openedLesson.id;
        const activityIndex = Number(element.dataset.activityIndex);
        if (!Number.isInteger(activityIndex) || activityIndex < 0) return;
        const questionId = element.dataset.questionId || null;
        const draftKey = activityDraftKey(activityIndex, questionId);
        const response = responseForActivity(element);
        pendingDrafts.set(draftKey, { activityIndex, questionId, response: structuredClone(response) });
        clearTimeout(draftSaveTimers.get(draftKey));
        draftSaveTimers.set(draftKey, setTimeout(() => {
            draftSaveTimers.delete(draftKey);
            const pending = pendingDrafts.get(draftKey);
            if (pending) {
                queueDraftSave(lessonId, draftKey, pending.activityIndex, pending.questionId, pending.response).catch((error) => {
                    console.warn("The answer draft remains pending until the next save attempt.", error);
                });
            }
        }, 500));
    }

    async function flushDraftSaves() {
        if (!openedLesson || !user) return;
        const lessonId = openedLesson.id;
        while (draftSaveTimers.size || pendingDrafts.size) {
            draftSaveTimers.forEach((timer) => clearTimeout(timer));
            draftSaveTimers.clear();
            const pending = [...pendingDrafts.entries()].map(([draftKey, entry]) => [
                draftKey,
                { ...entry, response: structuredClone(entry.response) }
            ]);
            if (!pending.length) break;
            await Promise.all(pending.map(([draftKey, entry]) =>
                queueDraftSave(lessonId, draftKey, entry.activityIndex, entry.questionId, entry.response)));
        }
        await draftSaveQueue;
    }

    function lockLessonControls() {
        const controls = [...pageContent.querySelectorAll('.student-activity input:not([type="hidden"]), .student-activity select, .student-activity textarea, .student-activity [data-word-token], .student-activity [data-remove-word], .student-activity [data-move-item], .student-activity [data-submit-answer], [data-submit-activity-group]')];
        const previousStates = controls.map((control) => control.disabled);
        controls.forEach((control) => { control.disabled = true; });
        return () => controls.forEach((control, index) => {
            if (control.isConnected) control.disabled = previousStates[index];
        });
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

    function stopRecording(activityElement) {
        const recording = activeRecorders.get(activityElement);
        if (!recording || recording.recorder.state === "inactive") return recording?.finished || Promise.resolve();
        recording.recorder.stop();
        return recording.finished;
    }

    function startRecording(button) {
        const activityElement = button.closest("[data-activity-index]");
        const status = activityElement?.querySelector("[data-recording-status]");
        if (!activityElement || !status || !openedLesson || !user || !navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
            showToast(text("recordingUnsupported"), true);
            return;
        }
        const lesson = openedLesson;
        const student = user;
        const activityIndex = Number(activityElement.dataset.activityIndex);
        let mediaStream;
        button.disabled = true;
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            mediaStream = stream;
            if (openedLesson !== lesson) {
                stream.getTracks().forEach((track) => track.stop());
                return;
            }
            const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus") ? "audio/webm;codecs=opus" : "";
            const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
            const chunks = [];
            const lessonId = lesson.id;
            const classId = lesson.classId;
            const userId = student.id;
            let resolveFinished;
            const finished = new Promise((resolve) => { resolveFinished = resolve; });
            let maxTimer = 0;
            recorder.ondataavailable = (event) => { if (event.data.size) chunks.push(event.data); };
            recorder.onstop = async () => {
                stream.getTracks().forEach((track) => track.stop());
                clearTimeout(maxTimer);
                button.dataset.recording = "false";
                button.disabled = true;
                button.textContent = text("recordPronunciation");
                const blob = new Blob(chunks, { type: recorder.mimeType || "audio/webm" });
                const extension = blob.type.includes("ogg") ? "ogg" : blob.type.includes("mp4") ? "mp4" : blob.type.includes("wav") ? "wav" : "webm";
                const path = `${userId}/${classId}/${lessonId}/${crypto.randomUUID()}.${extension}`;
                const answerField = activityElement.querySelector("[data-recording-path]");
                const preview = activityElement.querySelector("[data-recording-preview]");
                const objectUrl = URL.createObjectURL(blob);
                if (preview) {
                    preview.src = objectUrl;
                    preview.hidden = false;
                }
                status.textContent = text("uploadingRecording");
                try {
                    const { error } = await window.supabaseClient.storage.from("student-recordings").upload(path, blob, {
                        contentType: blob.type.split(";")[0] || "audio/webm",
                        upsert: false
                    });
                    if (error) throw error;
                    if (answerField) answerField.value = path;
                    status.textContent = text("recordingSaved");
                    const draftKey = activityDraftKey(activityIndex, null);
                    const response = path;
                    pendingDrafts.set(draftKey, { activityIndex, questionId: null, response });
                    queueDraftSave(lessonId, draftKey, activityIndex, null, response).catch((error) => {
                        console.warn("The pronunciation recording remains pending until the next save attempt.", error);
                        showToast(`${text("draftSaveError")} ${error.message}`, true);
                    });
                } catch (error) {
                    console.error("Could not upload the student's pronunciation recording.", error);
                    status.textContent = `${text("recordingError")} ${error.message || ""}`;
                    showToast(`${text("recordingError")} ${error.message || ""}`, true);
                } finally {
                    activeRecorders.delete(activityElement);
                    button.disabled = false;
                    resolveFinished();
                }
            };
            activeRecorders.set(activityElement, { recorder, finished, maxTimer });
            recorder.start();
            const maxSeconds = Math.max(5, Math.min(300, Number(activitiesFor(lesson)[activityIndex]?.settings?.maxSeconds) || 60));
            maxTimer = window.setTimeout(() => {
                if (recorder.state !== "inactive") recorder.stop();
            }, maxSeconds * 1000);
            button.dataset.recording = "true";
            button.disabled = false;
            button.textContent = text("stopRecording");
            status.textContent = text("recording");
        }).catch((error) => {
            mediaStream?.getTracks().forEach((track) => track.stop());
            console.error("Could not access the student's microphone.", error);
            button.disabled = false;
            status.textContent = text("microphonePermission");
            showToast(`${text("microphonePermission")} ${error.message || ""}`, true);
        });
    }

    async function submitActivity(element, renderAfterSubmit = true) {
        const index = Number(element.dataset.activityIndex);
        const questionId = element.dataset.questionId || null;
        const draftKey = activityDraftKey(index, questionId);
        const feedback = element.querySelector("[data-answer-feedback]");
        const lessonId = openedLesson.id;
        const unlockControls = lockLessonControls();
        clearTimeout(draftSaveTimers.get(draftKey));
        draftSaveTimers.delete(draftKey);
        feedback.textContent = text("loading");
        feedback.className = "student-answer-feedback";
        try {
            await stopRecording(element);
            await flushDraftSaves();
            const response = responseForActivity(element);
            if (element.querySelector('[data-answer-kind="find-error"]')
                && (!element.querySelector("[data-error-selected]")?.value
                    || !element.querySelector("[data-error-correction]")?.value.trim())) {
                feedback.textContent = text("chooseErrorWord");
                feedback.className = "student-answer-feedback is-incorrect";
                unlockControls();
                return true;
            }
            const isEmpty = Array.isArray(response) ? response.some((part) => !String(part).trim()) || !response.length : !hasAnswerResponse(response);
            if (isEmpty) {
                feedback.textContent = text("emptyAnswer");
                feedback.className = "student-answer-feedback is-incorrect";
                unlockControls();
                return true;
            }
            const submission = draftSaveQueue.catch((error) => {
                console.warn("Submitting after a failed draft request; pending answers will be retried before leaving.", error);
            }).then(() => invokeLessonApi({
                action: "submit",
                lessonId,
                activityIndex: index,
                ...(questionId ? { questionId } : {}),
                response
            }));
            draftSaveQueue = submission;
            const result = await submission;
            element.querySelectorAll('[data-blank-answer]').forEach((input, index) => {
                const checked = result.blankResults?.[index];
                input.classList.toggle('blank-correct', checked === true);
                input.classList.toggle('blank-incorrect', checked === false);
                input.setAttribute('aria-invalid', String(checked === false));
            });
            pendingDrafts.delete(draftKey);
            updateLessonProgress(lessonId, result.answers, result.completed);
            feedback.textContent = [result.reviewRequired ? text("submitted")
                : result.correct ? text("correct") : text("incorrect"), result.feedback].filter(Boolean).join(" ");
            feedback.className = `student-answer-feedback ${result.reviewRequired ? "" : result.correct ? "is-correct" : "is-incorrect"}`;
            if (result.completed) showToast(text("completed"));
            if (renderAfterSubmit) render();
            else unlockControls();
            return true;
        } catch (error) {
            console.error("Could not submit the student answer.", error);
            feedback.textContent = error.message;
            feedback.className = "student-answer-feedback is-incorrect";
            unlockControls();
            return false;
        }
    }

    async function submitActivityGroup(group) {
        const activities = group
            ? [...group.querySelectorAll('.student-activity[data-submittable="true"]')]
            : [];
        if (!activities.length) return;
        const unlockControls = lockLessonControls();
        try {
            for (const activity of activities) {
                if (!await submitActivity(activity, false)) break;
            }
        } finally {
            unlockControls();
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
            studentWorkspaceTab = "lesson";
            activeStudentSectionId = lessonSections(openedLesson).find((section) => !section.homework)?.id || "";
            openedLesson.activityCount = activityCount(openedLesson);
            const progressActivityCount = progressActivityCountFor(openedLesson);
            if (progressActivityCount !== null) openedLesson.progressActivityCount = progressActivityCount;
            openedLesson.answeredCount = answeredCountFor(openedLesson, openedLesson.progress);
            activeView = "lessons";
            render();
            scrollToFirstStudentActivity();
        } catch (error) {
            selectedLessonId = "";
            openedLesson = null;
            console.error("Could not load the assigned lesson.", error);
            showToast(error.message, true);
            render();
        }
    }

    function render() {
        document.documentElement.lang = language === "ua" ? "uk" : language;
        window.SlovaLessonNavigation?.sync(dashboardStatus === "ready" && Boolean(openedLesson && openedLesson.id === selectedLessonId));
        document.title = `SlovaSofi · ${escapeHtml(text("profileRole"))}`;
        updateIdentity();
        document.getElementById("studentNotificationButton").setAttribute("aria-label", text("notifications"));
        const keys = { classes: "navClasses", lessons: "navLessons", calendar: "navCalendar" };
        document.querySelectorAll(".nav-item").forEach((button) => {
            button.classList.toggle("active", button.dataset.view === activeView);
            button.querySelector("[data-i18n]").textContent = text(keys[button.dataset.view]);
        });
        document.getElementById("studentBreadcrumb").textContent = selectedLessonId
            ? text("lessons")
            : text(activeView === "calendar" ? "calendar" : keys[activeView]);
        if (dashboardStatus !== "ready") {
            pageContent.innerHTML = dashboardStatus === "loading"
                ? `<div class="student-message-card" role="status"><p>${escapeHtml(text("dashboardLoading"))}</p></div>`
                : `<div class="student-message-card" role="alert"><span class="eyebrow">SlovaSofi</span><h1>${escapeHtml(text("loadError").replace(/:$/, ""))}</h1><p class="student-error">${escapeHtml(text(dashboardErrorKey))}</p><button class="button" type="button" data-retry-dashboard>${escapeHtml(text("retry"))}</button></div>`;
            pageContent.querySelector("[data-retry-dashboard]")?.addEventListener("click", () => {
                if (user) loadDashboard(window.supabaseClient, user);
                else start().catch((error) => showError(text("loadError"), error));
            });
            return;
        }
        pageContent.innerHTML = `${activeView === "calendar" ? "" : renderWelcome()}${openedLesson && openedLesson.id === selectedLessonId
            ? renderLessonDetail(openedLesson)
            : activeView === "classes" ? renderClasses() : activeView === "calendar" ? renderStudentCalendar() : renderLessons()}`;
        window.SlovaActivityUI?.enhancePairing(pageContent, { empty: text("choose") });
        pageContent.querySelectorAll("[data-open-lesson]").forEach((button) => {
            button.addEventListener("click", () => openStudentLesson(button.dataset.openLesson));
        });
        pageContent.querySelectorAll("[data-open-lesson-card]").forEach((card) => {
            card.addEventListener("click", () => openStudentLesson(card.dataset.openLessonCard));
            card.addEventListener("keydown", (event) => {
                if (event.key !== "Enter" && event.key !== " ") return;
                event.preventDefault();
                openStudentLesson(card.dataset.openLessonCard);
            });
        });
        pageContent.querySelectorAll("[data-open-class-lessons]").forEach((button) => button.addEventListener("click", () => {
            selectedClassId = button.dataset.openClassLessons;
            activeView = "lessons";
            render();
        }));
        pageContent.querySelector("[data-clear-class-filter]")?.addEventListener("click", () => {
            selectedClassId = "";
            render();
        });
        pageContent.querySelector("[data-back-to-lessons]")?.addEventListener("click", async (event) => {
            const button = event.currentTarget;
            const unlockControls = lockLessonControls();
            button.disabled = true;
            try {
                await flushDraftSaves();
                selectedLessonId = "";
                openedLesson = null;
                studentSectionsOpen = false;
                activeView = "lessons";
                render();
            } catch (error) {
                console.error("Could not save student progress before leaving the lesson.", error);
                showToast(`${text("draftSaveError")} ${error.message}`, true);
                button.disabled = false;
                unlockControls();
            }
        });
        const switchWorkspace = async (tab, sectionId) => {
            const unlockControls = lockLessonControls();
            try {
                await flushDraftSaves();
                studentWorkspaceTab = tab;
                activeStudentSectionId = sectionId;
                studentSectionsOpen = false;
                render();
                scrollToFirstStudentActivity();
            } catch (error) {
                console.error("Could not save student progress before switching lesson sections.", error);
                showToast(`${text("draftSaveError")} ${error.message}`, true);
                unlockControls();
            }
        };
        pageContent.querySelectorAll("[data-student-workspace-tab]").forEach((button) => button.addEventListener("click", () => {
            const tab = button.dataset.studentWorkspaceTab;
            const firstSection = lessonSections(openedLesson).filter((item) => (tab === "homework") === Boolean(item.homework))[0];
            const index = lessonSections(openedLesson).filter((item) => (tab === "homework") === Boolean(item.homework)).indexOf(firstSection);
            const id = firstSection ? (firstSection.id || `${tab}-${index}`) : "";
            switchWorkspace(tab, id);
        }));
        pageContent.querySelectorAll("[data-student-select-section]").forEach((button) => button.addEventListener("click", () => {
            switchWorkspace(button.dataset.studentSectionTab, button.dataset.studentSelectSection);
        }));
        pageContent.querySelector("[data-toggle-student-sections]")?.addEventListener("click", (event) => {
            studentSectionsOpen = !studentSectionsOpen;
            const isOpen = studentSectionsOpen;
            pageContent.querySelector(".student-sections-panel")?.classList.toggle("is-open", isOpen);
            pageContent.querySelector(".student-section-drawer-backdrop")?.classList.toggle("is-open", isOpen);
            pageContent.querySelector(".student-section-drawer-backdrop")?.toggleAttribute("hidden", !isOpen);
            event.currentTarget.setAttribute("aria-expanded", String(isOpen));
        });
        pageContent.querySelectorAll("[data-close-student-sections]").forEach((button) => button.addEventListener("click", () => {
            studentSectionsOpen = false;
            pageContent.querySelector(".student-sections-panel")?.classList.remove("is-open");
            pageContent.querySelector(".student-section-drawer-backdrop")?.classList.remove("is-open");
            pageContent.querySelector(".student-section-drawer-backdrop")?.setAttribute("hidden", "");
            pageContent.querySelector("[data-toggle-student-sections]")?.setAttribute("aria-expanded", "false");
        }));
        pageContent.querySelectorAll("[data-student-section-target]").forEach((button) => button.addEventListener("click", () => {
            if (!button.disabled && button.dataset.studentSectionTarget) switchWorkspace(studentWorkspaceTab, button.dataset.studentSectionTarget);
        }));
        pageContent.querySelectorAll("[data-submit-answer]").forEach((button) => {
            button.addEventListener("click", () => submitActivity(button.closest("[data-activity-index]")));
        });
        pageContent.querySelectorAll("[data-listening-audio]").forEach((audio) => audio.addEventListener("play", () => {
            const maxPlays = Number(audio.dataset.maxPlays) || 0;
            if (!maxPlays) return;
            const count = Number(audio.dataset.playCount) || 0;
            const status = audio.parentElement.querySelector("[data-listening-status]");
            if (count >= maxPlays) {
                audio.pause();
                if (status) status.textContent = text("playsRemaining").replace("{count}", "0");
                return;
            }
            audio.dataset.playCount = String(count + 1);
            if (status) status.textContent = text("playsRemaining").replace("{count}", String(maxPlays - count - 1));
        }));
        pageContent.querySelectorAll("[data-recording-toggle]").forEach((button) => button.addEventListener("click", () => {
            const activity = button.closest("[data-activity-index]");
            if (button.dataset.recording === "true") stopRecording(activity);
            else startRecording(button);
        }));
        pageContent.querySelectorAll("[data-recording-path]").forEach((input) => {
            if (!input.value || !window.supabaseClient?.storage) return;
            const player = input.closest("[data-activity-index]")?.querySelector("[data-recording-preview]");
            if (!player) return;
            window.supabaseClient.storage.from("student-recordings").createSignedUrl(input.value, 300).then(({ data, error }) => {
                if (error) throw error;
                if (player.isConnected && data?.signedUrl) {
                    player.src = data.signedUrl;
                    player.hidden = false;
                }
            }).catch((error) => console.error("Could not load the student's saved pronunciation recording.", error));
        });
        pageContent.querySelectorAll("[data-error-word-index]").forEach((button) => button.addEventListener("click", () => {
            const activity = button.closest("[data-activity-index]");
            activity?.querySelectorAll("[data-error-word-index]").forEach((word) => word.classList.toggle("is-selected", word === button));
            const selected = activity?.querySelector("[data-error-selected]");
            if (selected) selected.value = button.dataset.errorWordIndex;
            activity?.querySelector("[data-error-correction]")?.focus();
            if (activity) scheduleDraftSave(activity);
        }));
        pageContent.querySelectorAll("[data-hotspot-index]").forEach((button) => button.addEventListener("click", () => {
            const activity = button.closest("[data-activity-index]");
            const hotspot = openedLesson && activitiesFor(openedLesson)[Number(activity?.dataset.activityIndex)]?.hotspots?.[Number(button.dataset.hotspotIndex)];
            const detail = activity?.querySelector("[data-hotspot-detail]");
            if (!hotspot || !detail) return;
            activity.querySelectorAll("[data-hotspot-index]").forEach((marker) => marker.classList.toggle("is-active", marker === button));
            detail.innerHTML = `<strong>${escapeHtml(hotspot.word)}</strong>${hotspot.translation ? ` · ${escapeHtml(hotspot.translation)}` : ""}${hotspot.audio ? `<audio class="student-choice-media" controls autoplay preload="none" src="${escapeHtml(mediaUrl(hotspot.audio))}"></audio>` : ""}`;
        }));
        pageContent.querySelectorAll("[data-submit-activity-group]").forEach((button) => {
            button.addEventListener("click", () => submitActivityGroup(button.closest(".student-activity-group")));
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
                scheduleDraftSave(item.closest("[data-activity-index]"));
            });
        });
        pageContent.querySelectorAll("[data-media-seek]").forEach((button) => {
            button.addEventListener("click", () => {
                const media = button.closest("[data-activity-index]")?.querySelector("[data-enhanced-media]");
                if (media) media.currentTime = Math.max(0, Math.min(media.duration || Infinity, media.currentTime + Number(button.dataset.mediaSeek)));
            });
        });
        pageContent.querySelectorAll("[data-media-speed]").forEach((select) => {
            select.addEventListener("change", () => {
                const media = select.closest("[data-activity-index]")?.querySelector("[data-enhanced-media]");
                if (media) media.playbackRate = Number(select.value);
            });
        });
        pageContent.querySelectorAll("[data-enhanced-media]").forEach((media) => {
            const key = `slovasofiStudentMediaPosition:${media.dataset.mediaPositionKey}`;
            const savePosition = () => {
                try {
                    if (!Number.isFinite(media.currentTime) || media.currentTime < 1 || (media.duration && media.currentTime >= media.duration)) {
                        localStorage.removeItem(key);
                        return;
                    }
                    localStorage.setItem(key, String(Math.floor(media.currentTime)));
                } catch (error) {
                    console.warn("Could not save media playback position.", error);
                }
            };
            const restorePosition = () => {
                try {
                    const saved = Number(localStorage.getItem(key));
                    if (Number.isFinite(saved) && saved > 0 && saved < media.duration - 1) media.currentTime = saved;
                } catch (error) {
                    console.warn("Could not restore media playback position.", error);
                }
            };
            media.addEventListener("loadedmetadata", restorePosition, { once: true });
            media.addEventListener("pause", savePosition);
            let positionTimer = 0;
            media.addEventListener("timeupdate", () => {
                clearTimeout(positionTimer);
                positionTimer = setTimeout(savePosition, 1000);
            });
            media.addEventListener("ended", () => {
                try { localStorage.removeItem(key); } catch (error) { console.warn("Could not clear media playback position.", error); }
            }, { once: true });
        });
        pageContent.querySelectorAll("[data-media-loop]").forEach((button) => {
            button.addEventListener("click", () => {
                const media = button.closest("[data-activity-index]")?.querySelector("[data-enhanced-media]");
                if (!media) return;
                const point = button.dataset.mediaLoop;
                if (point === "clear") {
                    delete media.dataset.loopStart;
                    delete media.dataset.loopEnd;
                    return;
                }
                media.dataset[point === "a" ? "loopStart" : "loopEnd"] = String(media.currentTime);
                if (!media.dataset.loopListener) {
                    media.dataset.loopListener = "true";
                    media.addEventListener("timeupdate", () => {
                        const start = Number(media.dataset.loopStart);
                        const end = Number(media.dataset.loopEnd);
                        if (Number.isFinite(start) && Number.isFinite(end) && end > start && media.currentTime >= end) {
                            media.currentTime = start;
                        }
                    });
                }
            });
        });
        pageContent.querySelectorAll("[data-show-hint]").forEach((button) => {
            button.addEventListener("click", () => {
                button.parentElement.querySelector("[data-hint-content]")?.removeAttribute("hidden");
                button.disabled = true;
            });
        });
        pageContent.querySelectorAll("[data-word-bank-answer]").forEach((button) => {
            button.addEventListener("click", () => {
                const activity = button.closest("[data-activity-index]");
                const blank = activity?.querySelector("[data-blank-answer]:not(:focus)");
                if (blank) {
                    blank.value = button.dataset.wordBankAnswer;
                    scheduleDraftSave(activity);
                }
            });
        });
        pageContent.querySelectorAll("[data-add-open-attachment]").forEach((button) => {
            button.addEventListener("click", () => {
                const activity = button.closest("[data-activity-index]");
                const wrap = activity?.querySelector("[data-open-attachments]");
                if (!activity || !wrap || wrap.children.length >= 8) return;
                const row = document.createElement("div");
                row.className = "student-open-attachment";
                row.innerHTML = `<input class="student-inline-answer" data-open-attachment placeholder="${escapeHtml(openAnswerText("attachmentUrl"))}" autocomplete="off"><button type="button" class="button secondary small" data-remove-open-attachment>${escapeHtml(openAnswerText("removeAttachment"))}</button>`;
                wrap.append(row);
                row.querySelector("[data-open-attachment]")?.focus();
                scheduleDraftSave(activity);
            });
        });
        pageContent.querySelectorAll("[data-front][data-back]").forEach((button) => {
            button.addEventListener("click", () => {
                const flipped = button.classList.toggle("is-flipped");
                button.closest("[data-flashcard-card]")?.querySelector(".student-flashcard-face")
                    ?.replaceChildren(document.createRange().createContextualFragment(flashcardSideMarkup(flipped ? button.dataset.back : button.dataset.front)));
            });
        });
        pageContent.querySelectorAll("[data-flashcards-hard-only]").forEach((button) => {
            button.addEventListener("click", () => {
                const hardOnly = button.getAttribute("aria-pressed") !== "true";
                button.setAttribute("aria-pressed", String(hardOnly));
                button.closest("[data-activity-index]")?.querySelectorAll("[data-flashcard-card]").forEach((card) => {
                    card.hidden = hardOnly && card.dataset.rating === "know";
                });
            });
        });
        pageContent.querySelectorAll("[data-flashcard-rating]").forEach((button) => {
            button.addEventListener("click", () => {
                const activity = button.closest("[data-activity-index]");
                const card = button.closest("[data-flashcard-card]");
                if (!openedLesson || !activity || !card) return;
                const activityIndex = Number(activity.dataset.activityIndex);
                const cardIndex = Number(button.dataset.cardIndex);
                const rating = button.dataset.flashcardRating;
                if (!Number.isInteger(activityIndex) || !Number.isInteger(cardIndex) || !["know", "repeat"].includes(rating)) return;
                card.dataset.rating = rating;
                card.querySelectorAll("[data-flashcard-rating]").forEach((choice) => {
                    choice.setAttribute("aria-pressed", String(choice.dataset.flashcardRating === rating));
                });
                const cardElements = [...activity.querySelectorAll("[data-flashcard-card]")];
                const ratings = Array.from({ length: cardElements.length }, () => "");
                cardElements.forEach((item) => {
                    const index = Number(item.dataset.cardIndex);
                    if (Number.isInteger(index)) ratings[index] = item.dataset.rating || "";
                });
                ratings[cardIndex] = rating;
                const hardOnly = activity.querySelector("[data-flashcards-hard-only]")?.getAttribute("aria-pressed") === "true";
                card.hidden = hardOnly && rating === "know";
                queueDraftSave(openedLesson.id, activityDraftKey(activityIndex, null), activityIndex, null, ratings);
            });
        });
    }

    document.addEventListener("keydown", (event) => {
        if (!["ArrowLeft", "ArrowRight"].includes(event.key) || event.altKey || event.ctrlKey || event.metaKey) return;
        if (event.target.closest("input, textarea, select, [contenteditable]")) return;
        const step = pageContent.querySelector(`[data-student-step="${event.key === "ArrowRight" ? 1 : -1}"]:not(:disabled)`);
        if (step) {
            event.preventDefault();
            step.click();
        }
    });
    pageContent.addEventListener("click", (event) => {
        const button = event.target.closest("[data-word-token], [data-remove-word]");
        if (!button) return;
        const activity = button.closest("[data-activity-index]");
        moveWordButton(button, button.dataset.wordToken ? "answer" : "bank");
        scheduleDraftSave(activity);
    });
    // Delegation also covers attachment rows added after the lesson was rendered.
    pageContent.addEventListener("click", (event) => {
        const button = event.target.closest("[data-remove-open-attachment]");
        if (!button) return;
        const activity = button.closest("[data-activity-index]");
        button.closest(".student-open-attachment")?.remove();
        if (activity) scheduleDraftSave(activity);
    });
    pageContent.addEventListener("input", (event) => {
        if (event.target.matches('[data-blank-answer]')) {
            event.target.classList.remove('blank-correct', 'blank-incorrect');
            event.target.removeAttribute('aria-invalid');
        }
        const activity = event.target.closest("[data-activity-index]");
        if (activity) scheduleDraftSave(activity);
    });
    pageContent.addEventListener("change", (event) => {
        const activity = event.target.closest("[data-activity-index]");
        if (activity) scheduleDraftSave(activity);
    });
    pageContent.addEventListener("dragstart", (event) => {
        draggedWordButton = event.target.closest("[data-word-token], [data-remove-word]");
        if (draggedWordButton) event.dataTransfer.setData("text/plain", "word");
        draggedOrderItem = event.target.closest("[data-order-item]");
        if (draggedOrderItem) event.dataTransfer.setData("text/plain", "order-item");
    });
    pageContent.addEventListener("dragend", () => { draggedWordButton = null; draggedOrderItem = null; });
    pageContent.addEventListener("dragover", (event) => {
        if (draggedWordButton && event.target.closest("[data-word-bank], [data-word-answer]")) event.preventDefault();
        if (draggedOrderItem && event.target.closest("[data-order-item]")) event.preventDefault();
    });
    pageContent.addEventListener("drop", (event) => {
        const orderTarget = event.target.closest("[data-order-item]");
        if (draggedOrderItem && orderTarget && orderTarget.parentElement === draggedOrderItem.parentElement) {
            event.preventDefault();
            if (orderTarget !== draggedOrderItem) {
                const bounds = orderTarget.getBoundingClientRect();
                orderTarget.parentElement.insertBefore(draggedOrderItem,
                    event.clientY < bounds.top + bounds.height / 2 ? orderTarget : orderTarget.nextElementSibling);
                scheduleDraftSave(draggedOrderItem.closest("[data-activity-index]"));
            }
            draggedOrderItem = null;
            return;
        }
        const destinationZone = event.target.closest("[data-word-bank], [data-word-answer]");
        if (!draggedWordButton || !destinationZone) return;
        event.preventDefault();
        if (destinationZone.closest("[data-activity-index]") !== draggedWordButton.closest("[data-activity-index]")) return;
        const movingToAnswer = destinationZone.hasAttribute("data-word-answer");
        const fromBank = Boolean(draggedWordButton.dataset.wordToken);
        const activity = draggedWordButton.closest("[data-activity-index]");
        if (movingToAnswer === fromBank) {
            moveWordButton(draggedWordButton, movingToAnswer ? "answer" : "bank");
            scheduleDraftSave(activity);
        }
        draggedWordButton = null;
    });

    function renderAuthState(title, description, form = "") {
        sidebar.hidden = true;
        document.querySelector(".main-area .topbar").hidden = true;
        pageContent.classList.add("student-auth-content");
        pageContent.innerHTML = `<section class="student-auth-card"><div class="student-auth-controls"><button class="icon-button theme-toggle" type="button" data-theme-toggle aria-label="Включить тему" aria-pressed="false"><svg class="theme-icon theme-icon-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 15.2A8.5 8.5 0 0 1 8.8 3.8 8.5 8.5 0 1 0 20.2 15.2Z"/></svg><svg class="theme-icon theme-icon-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2"/></svg></button></div><a class="brand student-auth-brand" href="index.html"><span class="brand-mark">S</span><span>Slova<span class="brand-accent">Sofi</span></span></a><span class="eyebrow">SLOVASOFI</span><h1>${escapeHtml(title)}</h1><p>${escapeHtml(description)}</p>${form}</section>`;
        const darkTheme = document.documentElement.dataset.theme === "dark";
        const themeToggleLabel = (SlovaI18n.locales({
            ua: darkTheme ? "Увімкнути світлу тему" : "Увімкнути темну тему",
            ru: darkTheme ? "Включить светлую тему" : "Включить тёмную тему",
            en: darkTheme ? "Enable light theme" : "Enable dark theme"
        }))[language];
        const themeToggle = pageContent.querySelector("[data-theme-toggle]");
        themeToggle?.setAttribute("aria-pressed", String(darkTheme));
        themeToggle?.setAttribute("aria-label", themeToggleLabel);
        if (themeToggle) themeToggle.title = themeToggleLabel;
    }

    async function loadDashboard(client, signedInUser) {
        if (dashboardRequest) return dashboardRequest;
        user = signedInUser;
        sidebar.hidden = false;
        document.querySelector(".main-area .topbar").hidden = false;
        pageContent.classList.remove("student-auth-content");
        dashboardStatus = "loading";
        render();
        dashboardRequest = (async () => {
            try {
                const result = await invokeLessonApi({ action: "list" });
                if (signingOut) return;
                classes = result.classes || [];
                lessons = result.lessons || [];
                calendarEvents = result.calendarEvents || [];
                trackPresence(client, result.presenceWorkspaceIds || classes.map((group) => group.teacherId), signedInUser);
                subscribeToCalendar(client, signedInUser);
                checkCalendarReminders();
                dashboardStatus = "ready";
                if (!lessons.some((lesson) => lesson.id === selectedLessonId)) selectedLessonId = "";
                if (!lessons.some((lesson) => lesson.id === openedLesson?.id)) openedLesson = null;
                render();
            } catch (error) {
                if (!signingOut) showError(text("loadError"), error);
            } finally {
                dashboardRequest = null;
            }
        })();
        return dashboardRequest;
    }

    function showUserMenu(button) {
        const metadata = user?.user_metadata || {};
        const name = [metadata.first_name || metadata.firstName, metadata.last_name || metadata.lastName].filter(Boolean).join(" ")
            || metadata.full_name || metadata.name || user?.email || text("profileRole");
        const identity = `<div class="popover-email">${escapeHtml(user?.email || "")}</div>`;
        const action = `<button class="popover-action danger" type="button" data-popover-action="logout"><span aria-hidden="true">↪</span>${escapeHtml(text("logout"))}</button>`;
        openPopoverAt(button, `<div class="popover-user"><span class="avatar">${escapeHtml(initialsFor(name))}</span><div><strong>${escapeHtml(name)}</strong><small>${escapeHtml(text("profileRole"))}</small></div></div>${identity}<div class="popover-divider"></div>${action}`, "profile");
    }

    function showNotifications(button) {
        const upcoming = scheduledOccurrences(new Date(), new Date(Date.now() + 7 * 86_400_000)).slice(0, 5);
        const rows = upcoming.length
            ? `<div class="calendar-notification-list">${upcoming.map((event) => `<button type="button" class="calendar-notification" data-open-student-calendar><strong>${escapeHtml(event.title)}</strong><small>${formatScheduledDate(event.occurrenceAt, { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })} · ${escapeHtml(classes.find((group) => group.id === event.class_id)?.name || text("calendarClass"))}</small></button>`).join("")}<button type="button" class="text-link" data-open-student-calendar>${escapeHtml(text("openCalendar"))}</button></div>`
            : `<p class="popover-copy">${escapeHtml(text("notificationsEmpty"))}</p>`;
        openPopoverAt(button, `<div class="popover-heading"><span class="notification-mark"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></svg></span><div><strong>${escapeHtml(text("notifications"))}</strong><small>${escapeHtml(upcoming.length ? text("calendar") : text("notificationsEmpty"))}</small></div></div>${rows}`, "notifications");
        const panel = document.querySelector(".popover-panel");
        panel?.querySelectorAll("[data-open-student-calendar]").forEach((item) => item.addEventListener("click", () => {
            closePopover();
            activeView = "calendar";
            selectedClassId = "";
            selectedLessonId = "";
            openedLesson = null;
            studentSectionsOpen = false;
            render();
        }));
    }

    function initialsFor(name) {
        return String(name).split(/[\s@._-]+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toLocaleUpperCase() || "—";
    }

    function closePopover(restoreFocus = false) {
        document.getElementById("popoverRoot").innerHTML = "";
        document.querySelectorAll(".profile-trigger, #studentNotificationButton").forEach((button) => button.setAttribute("aria-expanded", "false"));
        openPopover = "";
        if (restoreFocus) profileTrigger?.focus();
    }

    function openPopoverAt(button, content, kind) {
        if (openPopover === kind && button.getAttribute("aria-expanded") === "true") {
            closePopover();
            return;
        }
        closePopover();
        profileTrigger = button;
        const root = document.getElementById("popoverRoot");
        root.innerHTML = `<section class="popover-panel" role="dialog" aria-label="${escapeHtml(text("profile"))}">${content}</section>`;
        const panel = root.firstElementChild;
        button.setAttribute("aria-expanded", "true");
        openPopover = kind;
        const bounds = button.getBoundingClientRect();
        const margin = 12;
        const panelBounds = panel.getBoundingClientRect();
        const left = Math.max(margin, Math.min(bounds.right - panelBounds.width, window.innerWidth - panelBounds.width - margin));
        let top = bounds.bottom + 9;
        if (top + panelBounds.height > window.innerHeight - margin) top = bounds.top - panelBounds.height - 9;
        top = Math.max(margin, Math.min(top, window.innerHeight - panelBounds.height - margin));
        panel.style.left = `${left}px`;
        panel.style.top = `${top}px`;
        panel.querySelector("[data-popover-action='logout']")?.addEventListener("click", signOut);
        panel.querySelector("button")?.focus();
    }

    async function signOut() {
        if (signingOut) return;
        signingOut = true;
        const unlockControls = lockLessonControls();
        const logoutButton = document.querySelector("[data-popover-action='logout']");
        if (logoutButton) logoutButton.disabled = true;
        try {
            await flushDraftSaves();
            const channelsToRemove = presenceChannels;
            presenceChannels = [];
            Promise.all(channelsToRemove.map((channel) => window.supabaseClient.removeChannel(channel)))
                .catch((error) => console.error("Could not stop the student's presence channels.", error));
            if (calendarChannel) {
                const channelToRemove = calendarChannel;
                calendarChannel = null;
                window.supabaseClient.removeChannel(channelToRemove)
                    .catch((error) => console.error("Could not stop the student's calendar subscription.", error));
            }
            const { error } = await window.supabaseClient.auth.signOut();
            if (error) throw error;
            try {
                if (user) localStorage.removeItem(`slovasofi-student:${user.id}`);
            } catch { /* Storage restrictions must not block a successful sign-out. */ }
            user = null;
            closePopover();
            window.location.assign("login.html");
        } catch (error) {
            signingOut = false;
            if (logoutButton) logoutButton.disabled = false;
            unlockControls();
            console.error("Could not save progress or sign out of the current account.", error);
            showToast(error.message ? `${text("logoutError")} ${error.message}` : text("logoutError"), true);
        }
    }

    let openPopover = "";

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
        const pendingSave = openedLesson && selectedLessonId ? flushDraftSaves() : Promise.resolve();
        activeRecorders.forEach((recording) => {
            if (recording.recorder.state !== "inactive") recording.recorder.stop();
        });
        activeView = button.dataset.view;
        selectedClassId = "";
        selectedLessonId = "";
        openedLesson = null;
        studentSectionsOpen = false;
        sidebar.classList.remove("open");
        document.getElementById("studentSidebarBackdrop").classList.remove("open");
        document.getElementById("studentMenuToggle").setAttribute("aria-expanded", "false");
        render();
        pendingSave.catch((error) => {
            console.error("Could not save student progress while changing sections.", error);
            showToast(`${text("draftSaveError")} ${error.message}`, true);
        });
    }));
    document.querySelectorAll(".language-button").forEach((button) => button.addEventListener("click", () => {
        if (!languageChoices.includes(button.dataset.lang)) return;
        language = button.dataset.lang;
        closePopover();
        localStorage.setItem("siteLanguage", language);
        render();
    }));
    // Profile menu for student (like teacher)
    document.querySelectorAll(".profile-trigger").forEach((button) => button.addEventListener("click", () => showUserMenu(button)));
    document.getElementById("studentNotificationButton").addEventListener("click", (event) => showNotifications(event.currentTarget));
    window.setInterval(checkCalendarReminders, 60_000);
    document.addEventListener("pointerdown", unlockReminderAudio, { once: true });
    document.addEventListener("keydown", unlockReminderAudio, { once: true });
    document.addEventListener("click", (event) => {
        if (openPopover && !event.target.closest(".popover-root, .profile-trigger, .popover-trigger")) closePopover();
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && studentSectionsOpen) {
            studentSectionsOpen = false;
            pageContent.querySelector(".student-sections-panel")?.classList.remove("is-open");
            pageContent.querySelector(".student-section-drawer-backdrop")?.classList.remove("is-open");
            pageContent.querySelector(".student-section-drawer-backdrop")?.setAttribute("hidden", "");
            pageContent.querySelector("[data-toggle-student-sections]")?.setAttribute("aria-expanded", "false");
        }
        if (event.key === "Escape" && openPopover) closePopover(true);
    });
    window.addEventListener("resize", () => closePopover());
    
    start().catch((error) => {
        console.error("Could not start the student dashboard.", error);
        showError(text("loadError"), error);
    });
})();
