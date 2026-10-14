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
            logoutError: "Не вдалося вийти з профілю. Спробуйте ще раз.", imageAlt: "Зображення до завдання"
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
            logoutError: "Не удалось выйти из профиля. Попробуйте ещё раз.", imageAlt: "Изображение к заданию"
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
            logoutError: "Could not sign out. Please try again.", imageAlt: "Activity image"
        }
    };
    const languageChoices = ["ua", "ru", "en"];
    let language = languageChoices.includes(localStorage.getItem("siteLanguage")) ? localStorage.getItem("siteLanguage") : "ua";
    let user = null;
    let classes = [];
    let lessons = [];
    let activeView = "classes";
    let selectedLessonId = "";
    let toastTimer;
    const sidebar = document.getElementById("studentSidebar");
    const pageContent = document.getElementById("studentPageContent");
    const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
    const text = (key) => copy[language][key];
    const lessonSections = (lesson) => lesson.activities?.format === "sections-v1" && Array.isArray(lesson.activities.sections)
        ? lesson.activities.sections
        : [{ title: text("section"), activities: Array.isArray(lesson.activities) ? lesson.activities : [] }];
    const activitiesFor = (lesson) => lessonSections(lesson).flatMap((section) => Array.isArray(section.activities) ? section.activities : []);
    const activityCount = (lesson) => activitiesFor(lesson).length;
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
        const studentCount = classes.reduce((count, group) => count + group.lessons.length, 0);
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

    function mediaUrl(value) {
        try {
            const url = new URL(value, location.href);
            return ["http:", "https:"].includes(url.protocol) ? url.href : "";
        } catch {
            return "";
        }
    }

    function renderActivity(activity, index) {
        const content = String(activity.content || "").trim();
        const prompt = String(activity.prompt || "").trim();
        let body = "";
        if (activity.type === "image") {
            const markdownImage = content.match(/!\[([^\]]*)\]\(([^)]+)\)/);
            const source = mediaUrl(markdownImage?.[2] || content);
            body = source ? `<img class="student-activity-image" src="${escapeHtml(source)}" alt="${escapeHtml(markdownImage?.[1] || text("imageAlt"))}">` : "";
        } else if (activity.type === "audio" || activity.type === "video") {
            const source = mediaUrl(content);
            body = source ? `<${activity.type} class="student-activity-media" controls preload="metadata"><source src="${escapeHtml(source)}"></${activity.type}>` : "";
        } else if (content) {
            body = `<div class="student-activity-content">${escapeHtml(content).replace(/\n/g, "<br>")}</div>`;
        }
        return `<article class="student-activity"><span class="student-activity-number">${index + 1}</span><div class="student-activity-main"><h3>${escapeHtml(prompt || text("activity"))}</h3>${body || `<p class="student-muted">${escapeHtml(text("noContent"))}</p>`}</div></article>`;
    }

    function renderLessonDetail(lesson) {
        const groupNames = classes.filter((group) => group.lessons.some((item) => item.id === lesson.id)).map((group) => group.name);
        const sections = lessonSections(lesson);
        let activityIndex = 0;
        return `<button class="text-link student-back-link" type="button" data-back-to-lessons>← ${escapeHtml(text("back"))}</button>
            <section class="student-lesson-hero"><span class="eyebrow">${escapeHtml(groupNames.join(", "))}</span><h1>${escapeHtml(lesson.title)}</h1><p>${escapeHtml(lesson.unit || "")} · ${escapeHtml(countLabel(activityCount(lesson), "activity"))}</p></section>
            <div class="student-section-list">${sections.map((section) => `<section class="panel student-section"><h2>${escapeHtml(section.title || text("section"))}</h2><div class="student-activity-list">${(Array.isArray(section.activities) ? section.activities : []).map((activity) => renderActivity(activity, activityIndex++)).join("") || `<p class="student-muted">${escapeHtml(text("noContent"))}</p>`}</div></section>`).join("")}</div>`;
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
        const selectedLesson = lessons.find((lesson) => lesson.id === selectedLessonId);
        pageContent.innerHTML = `${renderWelcome()}${selectedLesson
            ? renderLessonDetail(selectedLesson)
            : activeView === "classes" ? renderClasses() : renderLessons()}`;
        pageContent.querySelectorAll("[data-open-lesson]").forEach((button) => {
            button.addEventListener("click", () => {
                selectedLessonId = button.dataset.openLesson;
                activeView = "lessons";
                render();
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
        });
        pageContent.querySelector("[data-back-to-lessons]")?.addEventListener("click", () => {
            selectedLessonId = "";
            activeView = "lessons";
            render();
        });
    }

    function renderAuthState(title, description, form = "") {
        sidebar.hidden = true;
        document.querySelector(".main-area .topbar").hidden = true;
        pageContent.classList.add("student-auth-content");
        pageContent.innerHTML = `<section class="student-auth-card"><a class="brand student-auth-brand" href="index.html"><span class="brand-mark">S</span><span>Slova<span class="brand-accent">Sofi</span></span></a><span class="eyebrow">SLOVASOFI</span><h1>${escapeHtml(title)}</h1><p>${escapeHtml(description)}</p>${form}</section>`;
    }

    async function loadDashboard(client, signedInUser) {
        user = signedInUser;
        const { data: memberships, error: membershipsError } = await client.from("class_students")
            .select("class_id").eq("linked_user_id", signedInUser.id);
        if (membershipsError) throw membershipsError;
        const classIds = [...new Set(memberships.map((membership) => membership.class_id))];
        if (!classIds.length) {
            classes = [];
            lessons = [];
            render();
            return;
        }
        const [classesResult, assignmentsResult] = await Promise.all([
            client.from("teacher_classes").select("id,name,course").in("id", classIds),
            client.from("class_lesson_assignments")
                .select("class_id,teacher_lessons(id,title,unit,activities)")
                .in("class_id", classIds)
        ]);
        if (classesResult.error) throw classesResult.error;
        if (assignmentsResult.error) throw assignmentsResult.error;
        const lessonsByClass = new Map();
        const lessonById = new Map();
        assignmentsResult.data.forEach((assignment) => {
            const lesson = assignment.teacher_lessons;
            if (!lesson) return;
            const assignedLessons = lessonsByClass.get(assignment.class_id) || [];
            if (!assignedLessons.some((item) => item.id === lesson.id)) assignedLessons.push(lesson);
            lessonsByClass.set(assignment.class_id, assignedLessons);
            lessonById.set(lesson.id, lesson);
        });
        classes = classesResult.data.map((group) => ({
            ...group,
            lessons: lessonsByClass.get(group.id) || []
        }));
        lessons = [...lessonById.values()];
        if (!lessons.some((lesson) => lesson.id === selectedLessonId)) selectedLessonId = "";
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
