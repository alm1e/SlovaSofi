(() => {
    const copy = {
        ua: {
            loading: "Завантаження…", activate: "Створіть пароль", activateHint: "Запрошення прийнято. Створіть пароль для входу до свого кабінету.",
            password: "Пароль (не менше 8 символів)", save: "Зберегти пароль", welcome: "Ваш учнівський кабінет",
            welcomeHint: "Тут відображаються класи й уроки, призначені викладачем.", login: "Увійти до кабінету",
            needInvite: "Щоб переглянути кабінет, увійдіть за посиланням із запрошення або через сторінку входу.",
            class: "Клас", noClasses: "Поки немає класів, пов’язаних з акаунтом.",
            noLessons: "Для цього класу ще не призначено уроків.", activities: "завдань",
            saveError: "Не вдалося зберегти пароль:", loadError: "Не вдалося завантажити кабінет:"
        },
        ru: {
            loading: "Загрузка…", activate: "Создайте пароль", activateHint: "Приглашение принято. Создайте пароль для входа в личный кабинет.",
            password: "Пароль (не менее 8 символов)", save: "Сохранить пароль", welcome: "Ваш ученический кабинет",
            welcomeHint: "Здесь отображаются классы и уроки, назначенные преподавателем.", login: "Войти в кабинет",
            needInvite: "Чтобы открыть кабинет, войдите по ссылке из приглашения или через страницу входа.",
            class: "Класс", noClasses: "Пока нет классов, связанных с аккаунтом.",
            noLessons: "Для этого класса пока не назначены уроки.", activities: "заданий",
            saveError: "Не удалось сохранить пароль:", loadError: "Не удалось загрузить кабинет:"
        },
        en: {
            loading: "Loading…", activate: "Create a password", activateHint: "Invitation accepted. Create a password to access your account.",
            password: "Password (at least 8 characters)", save: "Save password", welcome: "Your student dashboard",
            welcomeHint: "Classes and lessons assigned by your teacher appear here.", login: "Sign in",
            needInvite: "Open your invitation link or sign in to access your dashboard.",
            class: "Class", noClasses: "No classes are linked to this account yet.",
            noLessons: "No lessons have been assigned to this class yet.", activities: "activities",
            saveError: "Could not save the password:", loadError: "Could not load the dashboard:"
        }
    };
    const language = localStorage.getItem("siteLanguage");
    const text = copy[language] || copy.ua;
    const inviteFlow = new URLSearchParams(location.hash.slice(1)).get("type") === "invite"
        || new URLSearchParams(location.search).get("type") === "invite";
    const card = document.getElementById("studentCard");
    const heading = document.getElementById("studentHeading");
    const message = document.getElementById("studentMessage");
    const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);

    function showError(prefix, error) {
        console.error(prefix, error);
        message.className = "student-error";
        message.textContent = `${prefix} ${error.message || error}`;
    }

    async function loadDashboard(client, user) {
        heading.textContent = text.welcome;
        message.className = "";
        message.textContent = text.welcomeHint;
        const { data: memberships, error: membershipsError } = await client.from("class_students")
            .select("class_id").eq("linked_user_id", user.id);
        if (membershipsError) throw membershipsError;
        const classIds = [...new Set(memberships.map((membership) => membership.class_id))];
        if (!classIds.length) {
            card.insertAdjacentHTML("beforeend", `<p>${escapeHtml(text.noClasses)}</p>`);
            return;
        }
        const [classesResult, assignmentsResult] = await Promise.all([
            client.from("teacher_classes").select("id,name").in("id", classIds),
            client.from("class_lesson_assignments")
                .select("class_id,teacher_lessons(id,title,unit,activities)")
                .in("class_id", classIds)
        ]);
        if (classesResult.error) throw classesResult.error;
        if (assignmentsResult.error) throw assignmentsResult.error;
        const lessonsByClass = new Map();
        assignmentsResult.data.forEach((assignment) => {
            const lessons = lessonsByClass.get(assignment.class_id) || [];
            if (assignment.teacher_lessons) lessons.push(assignment.teacher_lessons);
            lessonsByClass.set(assignment.class_id, lessons);
        });
        classesResult.data.forEach((group) => {
            const lessons = lessonsByClass.get(group.id) || [];
            const section = document.createElement("section");
            section.className = "student-class";
            section.innerHTML = `<h2>${escapeHtml(text.class)}: ${escapeHtml(group.name)}</h2>${
                lessons.length ? lessons.map((lesson) => `<article class="student-lesson"><strong>${escapeHtml(lesson.title)}</strong><p>${escapeHtml(lesson.unit)} · ${(lesson.activities || []).length} ${escapeHtml(text.activities)}</p></article>`).join("") : `<p>${escapeHtml(text.noLessons)}</p>`
            }`;
            card.append(section);
        });
    }

    async function start() {
        document.documentElement.lang = language === "ru" ? "ru" : language === "en" ? "en" : "uk";
        if (!window.supabaseClient) {
            heading.textContent = text.needInvite;
            message.innerHTML = `<a class="student-link" href="login.html">${escapeHtml(text.login)}</a>`;
            return;
        }
        const { data: { session }, error } = await window.supabaseClient.auth.getSession();
        if (error) throw error;
        if (!session) {
            heading.textContent = text.needInvite;
            message.innerHTML = `<a class="student-link" href="login.html">${escapeHtml(text.login)}</a>`;
            return;
        }

        if (!inviteFlow) {
            try {
                await loadDashboard(window.supabaseClient, session.user);
            } catch (dashboardError) {
                showError(text.loadError, dashboardError);
            }
            return;
        }
        heading.textContent = text.activate;
        message.textContent = text.activateHint;
        const form = document.createElement("form");
        form.className = "student-form";
        form.innerHTML = `<label for="studentPassword">${escapeHtml(text.password)}</label><input id="studentPassword" type="password" minlength="8" autocomplete="new-password" required><button class="student-button" type="submit">${escapeHtml(text.save)}</button>`;
        card.append(form);
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const button = form.querySelector("button");
            button.disabled = true;
            const { error: updateError } = await window.supabaseClient.auth.updateUser({
                password: form.querySelector("input").value
            });
            if (updateError) {
                showError(text.saveError, updateError);
                button.disabled = false;
                return;
            }
            form.remove();
            history.replaceState(null, "", location.pathname);
            try {
                await loadDashboard(window.supabaseClient, session.user);
            } catch (dashboardError) {
                showError(text.loadError, dashboardError);
            }
        });
    }

    start().catch((error) => showError(text.loadError, error));
})();
