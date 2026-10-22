const loginForm = document.getElementById("loginForm");

async function dashboardPathFor(user) {
    const { data: profile, error } = await window.supabaseClient.from("profiles")
        .select("role").eq("id", user.id).single();
    if (error) throw error;
    return ["teacher", "admin"].includes(profile?.role) ? "teacher.html" : "student.html";
}

async function restoreSavedSession() {
    if (!loginForm || !window.supabaseClient) return;
    try {
        const { data: { session }, error } = await window.supabaseClient.auth.getSession();
        if (error) throw error;
        if (session) window.location.replace(await dashboardPathFor(session.user));
    } catch (error) {
        console.error("Could not restore the saved sign-in session.", error);
        const messages = SlovaI18n.locales({
            ua: "Не вдалося перевірити збережений сеанс. Ви можете увійти ще раз.",
            ru: "Не удалось проверить сохранённую сессию. Вы можете войти ещё раз.",
            en: "Could not verify the saved session. You can sign in again."
        });
        const message = document.getElementById("authMessage");
        if (message) {
            message.textContent = messages[localStorage.getItem("siteLanguage")] || messages.ua;
            message.className = "mb-3 text-danger";
        }
    }
}

void restoreSavedSession();

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
        window.location.assign(await dashboardPathFor(data.user));
    } catch {
        message.textContent = "Ошибка соединения. Попробуйте ещё раз.";
        message.className = "mb-3 text-danger";
    } finally {
        button.disabled = false;
    }
});

document.getElementById("forgotPasswordButton")?.addEventListener("click", async (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    const message = document.getElementById("authMessage");
    const button = event.currentTarget;
    const emailInput = document.getElementById("email");
    const language = localStorage.getItem("siteLanguage") || "ua";
    const messages = SlovaI18n.locales({
        ua: {
            email: "Введіть коректну електронну пошту.",
            connection: "Не вдалося підключитися до Supabase. Спробуйте ще раз.",
            error: "Не вдалося надіслати лист для відновлення пароля. Перевірте, чи адреса пошти правильна, або спробуйте пізніше.",
            sent: "Якщо акаунт із цією адресою існує, на пошту надіслано посилання для зміни пароля. Перевірте теку Спам, якщо не бачите листа.",
            info: "ℹ️ Посилання дійсне 24 години. Якщо посилання не приходить, переконайтеся, що введена правильна адреса пошти."
        },
        ru: {
            email: "Введите корректный адрес электронной почты.",
            connection: "Не удалось подключиться к Supabase. Попробуйте ещё раз.",
            error: "Не удалось отправить письмо для восстановления пароля. Проверьте, правильно ли введён адрес почты, или попробуйте позже.",
            sent: "Если аккаунт с этим адресом существует, на почту отправлена ссылка для смены пароля. Проверьте папку Спам, если не видите письма.",
            info: "ℹ️ Ссылка действительна 24 часа. Если письмо не приходит, убедитесь, что введён правильный адрес почты."
        },
        en: {
            email: "Enter a valid email address.",
            connection: "Could not connect to Supabase. Please try again.",
            error: "Could not send the password reset email. Check that the email address is correct, or try again later.",
            sent: "If an account exists for this address, a password reset link has been sent to your email. Check your spam folder if you don't see it.",
            info: "ℹ️ The reset link is valid for 24 hours. If you don't receive an email, make sure you entered the correct address."
        }
    });
    const copy = messages[language] || messages.ua;
    if (!emailInput.value.trim() || !emailInput.checkValidity()) {
        message.textContent = copy.email;
        message.className = "mb-3 text-danger";
        emailInput.focus();
        return;
    }
    if (!window.supabaseClient) {
        message.textContent = copy.connection;
        message.className = "mb-3 text-danger";
        return;
    }
    button.disabled = true;
    message.textContent = "";
    try {
        const redirectTo = new URL("reset-password.html", window.location.href).href;
        const { error } = await window.supabaseClient.auth.resetPasswordForEmail(emailInput.value.trim(), { redirectTo });
        if (error) {
            console.error("Could not request password recovery.", error);
            message.innerHTML = `<div class="mb-2">${copy.error}</div><div style="font-size: 0.9rem; margin-top: 8px; padding: 8px; background: rgba(220,53,69,0.1); border-radius: 6px;">${copy.info}</div>`;
            message.className = "mb-3 text-danger";
            return;
        }
        message.innerHTML = `<div class="mb-2">${copy.sent}</div><div style="font-size: 0.9rem; margin-top: 8px; padding: 8px; background: rgba(40,167,69,0.1); border-radius: 6px;">${copy.info}</div>`;
        message.className = "mb-3 text-success";
    } catch (error) {
        console.error("Could not request password recovery.", error);
        message.textContent = copy.connection;
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

    const messages = SlovaI18n.locales({
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
    });
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
