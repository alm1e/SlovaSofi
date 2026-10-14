(() => {
    const translations = {
        ua: {
            title: "Створіть новий пароль", description: "Введіть новий пароль для свого облікового запису.",
            password: "Новий пароль (не менше 8 символів)", confirm: "Повторіть пароль",
            save: "Зберегти пароль", login: "Повернутися до входу", dashboard: "Відкрити кабінет",
            invalidTitle: "Посилання не працює",
            invalid: "Посилання недійсне або застаріле. Запросіть відновлення пароля ще раз.",
            mismatch: "Паролі не збігаються.", failed: "Не вдалося змінити пароль. Запросіть нове посилання.",
            success: "Пароль змінено. Перейдіть до кабінету…"
        },
        ru: {
            title: "Создайте новый пароль", description: "Введите новый пароль для своей учётной записи.",
            password: "Новый пароль (не менее 8 символов)", confirm: "Повторите пароль",
            save: "Сохранить пароль", login: "Вернуться ко входу", dashboard: "Открыть кабинет",
            invalidTitle: "Ссылка не работает",
            invalid: "Ссылка недействительна или устарела. Запросите восстановление пароля ещё раз.",
            mismatch: "Пароли не совпадают.", failed: "Не удалось изменить пароль. Запросите новую ссылку.",
            success: "Пароль изменён. Переходим в кабинет…"
        },
        en: {
            title: "Create a new password", description: "Enter a new password for your account.",
            password: "New password (at least 8 characters)", confirm: "Confirm password",
            save: "Save password", login: "Back to sign in", dashboard: "Open dashboard",
            invalidTitle: "Reset link unavailable",
            invalid: "This link is invalid or expired. Request a new password reset email.",
            mismatch: "The passwords do not match.", failed: "Could not change the password. Request a new link.",
            success: "Password changed. Opening your dashboard…"
        }
    };
    const language = localStorage.getItem("siteLanguage") || "ua";
    const copy = translations[language] || translations.ua;
    const form = document.getElementById("resetPasswordForm");
    const message = document.getElementById("resetMessage");
    const actions = document.getElementById("resetLinkActions");
    const title = document.getElementById("resetTitle");
    const description = document.getElementById("resetDescription");
    const showMessage = (text, isError = false) => {
        message.textContent = text;
        message.className = `mb-3 ${isError ? "text-danger" : "text-success"}`;
    };
    const showInvalidLink = () => {
        title.textContent = copy.invalidTitle;
        description.textContent = copy.invalid;
        form.hidden = true;
        actions.hidden = false;
    };

    document.documentElement.lang = language === "ru" ? "ru" : language === "en" ? "en" : "uk";
    document.title = `${copy.title} | SlovaSofi`;
    title.textContent = copy.title;
    description.textContent = copy.description;
    document.getElementById("passwordLabel").textContent = copy.password;
    document.getElementById("confirmLabel").textContent = copy.confirm;
    document.getElementById("savePasswordButton").textContent = copy.save;
    document.getElementById("loginLink").textContent = copy.login;

    async function start() {
        if (!window.supabaseClient) {
            showInvalidLink();
            return;
        }
        const { data, error } = await window.supabaseClient.auth.getSession();
        if (error) {
            console.error("Could not validate password recovery session.", error);
            showInvalidLink();
            return;
        }
        if (!data.session) {
            showInvalidLink();
            return;
        }
        form.hidden = false;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const button = document.getElementById("savePasswordButton");
        const password = document.getElementById("newPassword").value;
        if (password !== document.getElementById("confirmPassword").value) {
            showMessage(copy.mismatch, true);
            return;
        }
        button.disabled = true;
        showMessage("");
        const { data, error } = await window.supabaseClient.auth.updateUser({ password });
        if (error) {
            console.error("Could not update the account password.", error);
            showMessage(copy.failed, true);
            button.disabled = false;
            return;
        }
        showMessage(copy.success);
        history.replaceState(null, "", location.pathname);
        form.hidden = true;
        actions.hidden = false;
        const role = data.user?.user_metadata?.role;
        document.getElementById("loginLink").href = role === "student" ? "student.html" : "teacher.html";
        document.getElementById("loginLink").textContent = copy.dashboard;
    });

    start().catch((error) => {
        console.error("Could not initialize password recovery.", error);
        showInvalidLink();
    });
})();
