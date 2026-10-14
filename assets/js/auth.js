const loginForm = document.getElementById("loginForm");

loginForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const message = document.getElementById("authMessage");
    const button = loginForm.querySelector('button[type="submit"]');

    if (!window.supabaseClient) {
        message.textContent = "Не удалось подключиться к Supabase. Проверьте настройки.";
        message.className = "mb-3 text-danger";
        return;
    }

    button.disabled = true;
    message.textContent = "";

    const email = loginForm.elements.email.value.trim();
    const password = loginForm.elements.password.value;

    try {
        const { data, error } = await window.supabaseClient.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            message.textContent = "Не удалось войти. Проверьте почту и пароль.";
            message.className = "mb-3 text-danger";
            return;
        }

        message.textContent = "Вход выполнен.";
        message.className = "mb-3 text-success";
        window.location.assign(data.user?.user_metadata?.role === "student" ? "student.html" : "teacher.html");
    } catch {
        message.textContent = "Ошибка соединения. Попробуйте ещё раз.";
        message.className = "mb-3 text-danger";
    } finally {
        button.disabled = false;
    }
});

const registerForm = document.getElementById("registerForm");

registerForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = document.getElementById("authMessage");
    const button = registerForm.querySelector('button[type="submit"]');
    if (button.disabled) return;

    const messages = {
        ua: {
            connection: "Не вдалося підключитися. Спробуйте ще раз.",
            error: "Не вдалося зареєструватися. Перевірте дані та спробуйте ще раз.",
            names: "Введіть ім’я та прізвище.",
            confirm: "Запит на реєстрацію прийнято. Перевірте пошту для підтвердження акаунта. Якщо акаунт уже існує, спробуйте увійти.",
            success: "Реєстрацію завершено. Ви увійшли в акаунт."
        },
        ru: {
            connection: "Не удалось подключиться. Попробуйте ещё раз.",
            error: "Не удалось зарегистрироваться. Проверьте данные и попробуйте ещё раз.",
            names: "Введите имя и фамилию.",
            confirm: "Запрос на регистрацию принят. Проверьте почту для подтверждения аккаунта. Если аккаунт уже существует, попробуйте войти.",
            success: "Регистрация завершена. Вы вошли в аккаунт."
        },
        en: {
            connection: "Could not connect. Please try again.",
            error: "Could not register. Check your details and try again.",
            names: "Enter your first and last name.",
            confirm: "Registration request received. Check your email to confirm your account. If you already have an account, try signing in.",
            success: "Registration complete. You are signed in."
        }
    };
    const copy = messages[localStorage.getItem("siteLanguage")] || messages.ua;
    const showMessage = (text, success = false) => {
        message.textContent = text;
        message.className = `mt-3 ${success ? "text-success" : "text-danger"}`;
    };
    if (!window.supabaseClient) {
        showMessage(copy.connection);
        return;
    }
    const firstName = registerForm.elements.firstName.value.trim();
    const lastName = registerForm.elements.lastName.value.trim();
    if (!firstName || !lastName) {
        showMessage(copy.names);
        return;
    }

    button.disabled = true;
    message.textContent = "";
    try {
        const { data, error } = await window.supabaseClient.auth.signUp({
            email: registerForm.elements.email.value.trim(),
            password: registerForm.elements.password.value,
            options: {
                emailRedirectTo: new URL("login.html", window.location.href).href,
                data: {
                    first_name: firstName,
                    last_name: lastName,
                    phone: registerForm.elements.phone.value.trim() || null
                }
            }
        });
        if (error) {
            showMessage(copy.error);
            return;
        }
        registerForm.elements.password.value = "";
        showMessage(data.session ? copy.success : copy.confirm, true);
    } catch {
        showMessage(copy.connection);
    } finally {
        button.disabled = false;
    }
});
