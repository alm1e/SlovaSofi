const setupTranslations = {
    ua: {
        title: "Завершіть налаштування профілю викладача",
        subtitle: "Вас запросили до SlovaSofi. Заповніть профіль і створіть пароль для входу.",
        firstName: "Ім’я",
        lastName: "Прізвище",
        email: "Електронна пошта",
        phone: "Номер телефону (необов’язково)",
        password: "Створіть пароль (не менше 8 символів)",
        confirmPassword: "Повторіть пароль",
        submit: "Зберегти профіль і створити пароль",
        login: "Перейти до входу",
        nameRequired: "Введіть ім’я та прізвище.",
        invalidInvite: "Посилання-запрошення недійсне або застаріло. Попросіть адміністратора надіслати нове запрошення.",
        connection: "Не вдалося перевірити запрошення. Перевірте з’єднання та відкрийте посилання ще раз.",
        mismatch: "Паролі не збігаються.",
        saveError: "Не вдалося зберегти профіль. Спробуйте ще раз."
    },
    ru: {
        title: "Завершите настройку профиля учителя",
        subtitle: "Вас пригласили в SlovaSofi. Заполните профиль и создайте пароль для входа.",
        firstName: "Имя",
        lastName: "Фамилия",
        email: "Электронная почта",
        phone: "Номер телефона (необязательно)",
        password: "Создайте пароль (не менее 8 символов)",
        confirmPassword: "Повторите пароль",
        submit: "Сохранить профиль и создать пароль",
        login: "Перейти ко входу",
        nameRequired: "Введите имя и фамилию.",
        invalidInvite: "Ссылка-приглашение недействительна или устарела. Попросите администратора отправить новое приглашение.",
        connection: "Не удалось проверить приглашение. Проверьте подключение и откройте ссылку ещё раз.",
        mismatch: "Пароли не совпадают.",
        saveError: "Не удалось сохранить профиль. Попробуйте ещё раз."
    },
    en: {
        title: "Complete your teacher profile",
        subtitle: "You have been invited to SlovaSofi. Complete your profile and create a password to sign in.",
        firstName: "First name",
        lastName: "Last name",
        email: "Email address",
        phone: "Phone number (optional)",
        password: "Create a password (at least 8 characters)",
        confirmPassword: "Confirm password",
        submit: "Save profile and create password",
        login: "Go to sign in",
        nameRequired: "Enter your first and last name.",
        invalidInvite: "This invitation link is invalid or expired. Ask the administrator to send a new invitation.",
        connection: "Could not verify the invitation. Check your connection and open the link again.",
        mismatch: "The passwords do not match.",
        saveError: "Could not save your profile. Please try again."
    }
};

const setupForm = document.getElementById("teacherSetupForm");
const setupMessage = document.getElementById("setupMessage");
let currentSetupLanguage = "ua";
let setupMessageState = null;

function setSetupLanguage(language) {
    currentSetupLanguage = setupTranslations[language] ? language : "ua";
    document.documentElement.lang = currentSetupLanguage === "ua" ? "uk" : currentSetupLanguage;
    document.querySelectorAll("[data-i18n]").forEach((element) => {
        element.textContent = setupTranslations[currentSetupLanguage][element.dataset.i18n];
    });
    document.querySelectorAll("[data-lang]").forEach((button) => {
        button.classList.toggle("active", button.dataset.lang === currentSetupLanguage);
    });
    renderSetupMessage();
    try {
        localStorage.setItem("siteLanguage", currentSetupLanguage);
    } catch (error) {
        console.error("Could not save the selected language.", error);
    }
}

function renderSetupMessage() {
    if (!setupMessageState) return;
    setupMessage.textContent = `${setupTranslations[currentSetupLanguage][setupMessageState.key]}${setupMessageState.detail}`;
    setupMessage.className = `mt-3 ${setupMessageState.isError ? "text-danger" : "text-success"}`;
}

function showSetupMessage(key, isError = true, detail = "") {
    setupMessageState = { key, isError, detail };
    renderSetupMessage();
}

document.querySelectorAll("[data-lang]").forEach((button) => {
    button.addEventListener("click", () => setSetupLanguage(button.dataset.lang));
});
let savedSetupLanguage = "ua";
try {
    savedSetupLanguage = localStorage.getItem("siteLanguage") || "ua";
} catch (error) {
    console.error("Could not read the selected language.", error);
}
setSetupLanguage(savedSetupLanguage);

async function initializeTeacherSetup() {
    const callbackParameters = new URLSearchParams(`${location.search.slice(1)}&${location.hash.slice(1)}`);
    if (callbackParameters.get("type") !== "invite" || !window.supabaseClient) {
        showSetupMessage("invalidInvite");
        return;
    }

    try {
        const { data: { session }, error } = await window.supabaseClient.auth.getSession();
        if (error) throw error;
        if (!session || session.user.user_metadata?.role !== "teacher" || !session.user.email) {
            showSetupMessage("invalidInvite");
            return;
        }
        document.getElementById("teacherEmail").value = session.user.email;
        setupForm.hidden = false;
    } catch (error) {
        console.error("Could not verify the teacher invitation.", error);
        showSetupMessage("connection");
    }
}

setupForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const password = form.elements.password.value;
    if (password !== form.elements.confirmPassword.value) {
        showSetupMessage("mismatch");
        form.elements.confirmPassword.focus();
        return;
    }
    if (!form.elements.firstName.value.trim() || !form.elements.lastName.value.trim()) {
        showSetupMessage("nameRequired");
        (!form.elements.firstName.value.trim() ? form.elements.firstName : form.elements.lastName).focus();
        return;
    }

    const submitButton = form.querySelector('[type="submit"]');
    submitButton.disabled = true;
    setupMessage.textContent = "";
    try {
        const firstName = form.elements.firstName.value.trim();
        const lastName = form.elements.lastName.value.trim();
        const { error } = await window.supabaseClient.auth.updateUser({
            password,
            data: {
                role: "teacher",
                first_name: firstName,
                last_name: lastName,
                display_name: `${firstName} ${lastName}`,
                phone: form.elements.phone.value.trim() || null
            }
        });
        if (error) throw error;
        window.location.replace(new URL("teacher.html", location.href).href);
    } catch (error) {
        console.error("Could not complete the invited teacher profile.", error);
        showSetupMessage("saveError", true, ` ${error.message}`);
        submitButton.disabled = false;
    }
});

void initializeTeacherSetup();
