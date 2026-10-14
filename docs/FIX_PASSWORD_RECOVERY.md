# Исправление восстановления пароля в SlovaSofi

> ⚠️ **ВАЖНО**: Функция восстановления пароля требует конфигурации в Supabase Dashboard. Без этого система не сможет отправлять письма восстановления.

## Что сломано

При нажатии на кнопку "Забыли пароль?" на странице входа, система показывает ошибку:
- 🇷🇺 "Не удалось отправить письмо для восстановления пароля"
- 🇺🇦 "Не вдалося надіслати лист для відновлення пароля"
- 🇬🇧 "Could not send the password reset email"

## Причины проблемы

1. **Отсутствует Redirect URL в Supabase Auth** — Supabase не знает, куда перенаправлять пользователя после восстановления пароля
2. **SMTP не настроен** — Supabase не может отправлять письма (требуется Resend или другой SMTP-провайдер)
3. **Сайт работает на file:// протоколе** — Supabase не принимает локальные file:// адреса

## Решение (3 шага)

### Шаг 1: Добавить Redirect URL в Supabase

1. Откройте **Supabase Dashboard** → ваш проект
2. Слева нажмите **Authentication** (Аутентификация)
3. Перейдите в **URL Configuration** (Конфигурация URL)
4. В разделе **Redirect URLs** нажмите **Add URL**
5. **Добавьте обе ссылки:**
   ```
   https://alm1e.github.io/SlovaSofi/reset-password.html
   ```
   И если вы тестируете локально через HTTP-сервер:
   ```
   http://localhost:3000/reset-password.html
   http://localhost:8000/reset-password.html
   http://localhost:5500/reset-password.html
   ```
   (Замените на реальный адрес вашего локального сервера)

6. Нажмите **Save** (Сохранить)

**Результат:** ✅ Supabase сможет перенаправлять пользователей на страницу восстановления

---

### Шаг 2: Настроить отправку писем (SMTP)

По умолчанию Supabase не может отправлять письма. Есть несколько вариантов:

#### Вариант A: Использовать Resend (рекомендуется)

1. Откройте **Supabase Dashboard** → **Authentication** → **SMTP Settings** (Настройки SMTP)
2. Нажмите **Enable Custom SMTP** или **Use Resend** (если доступно)
3. Зарегистрируйтесь на [resend.com](https://resend.com)
4. Получите API ключ Resend
5. В SMTP Settings введите параметры Resend:
   - **Host:** `smtp.resend.com`
   - **Port:** `465` или `587`
   - **Username:** `default` или ваш email
   - **Password:** ваш Resend API ключ

#### Вариант B: Использовать другой SMTP провайдер

Примеры: SendGrid, Mailgun, AWS SES, Gmail, и др.

**Настройка для Gmail:**
- Создайте App Password в аккаунте Google
- **Host:** `smtp.gmail.com`
- **Port:** `465`
- **Username:** ваш Gmail адрес
- **Password:** App Password

---

### Шаг 3: Проверить email в Supabase Auth (для локального тестирования)

Если вы не хотите настраивать SMTP прямо сейчас:

1. В **Supabase Dashboard** → **Authentication** → **Providers** → **Email**
2. Включите **Confirm email** (Подтвердить email)
3. Для локального тестирования: Supabase отправляет ссылки в **Email Confirmations** в браузерной консоли

**⚠️ Это работает только для разработки! Для production нужен реальный SMTP.**

---

## Тестирование

### Локально (file:// протокол)
```
❌ Не будет работать — Supabase отклоняет file:// адреса
```

### Локально (HTTP-сервер)
```
✅ Откройте VS Code Live Server или используйте:

# Вариант 1: Python
python -m http.server 8000

# Вариант 2: Node.js
npx http-server -p 8000

# Вариант 3: PHP
php -S localhost:8000
```

Затем откройте: `http://localhost:8000/login.html`

### На GitHub Pages
```
✅ https://alm1e.github.io/SlovaSofi/login.html
```

## Проверка работы

1. Откройте страницу входа: `https://alm1e.github.io/SlovaSofi/login.html`
2. Нажмите **"Забыли пароль?"** (кнопка с иконкой 🔑)
3. Введите email зарегистрированного аккаунта
4. Вы должны увидеть: ✅ "Если аккаунт с этим адресом существует, на почту отправлена ссылка..."
5. **Проверьте email** (включая папку Спам/Junk)
6. Кликните ссылку в письме
7. На странице `reset-password.html` установите новый пароль
8. Используйте новый пароль для входа

## Диагностика

### "Не подключено к Supabase"
- ❌ Проверьте интернет соединение
- ❌ Откройте DevTools (F12) → Console и посмотрите ошибки
- ✅ Убедитесь, что `supabase-config.js` загружается без ошибок

### "Не удалось отправить письмо"
- ❌ SMTP не настроен (Шаг 2 выше)
- ❌ Email провайдера требует подтверждения домена
- ❌ Лимит писем превышен (у Resend free план ограничен)

### "Ссылка недействительна или устарела"
- ❌ Ссылка истекла (действительна 24 часа)
- ❌ Redirect URL не добавлен в Supabase (Шаг 1 выше)
- ❌ Вы используете file:// протокол (используйте HTTP-сервер)

### "Пароль не изменён"
- ❌ Пароль короче 8 символов
- ❌ Пароли не совпадают
- ❌ Проверьте консоль браузера на более детальные ошибки

## Полезные ссылки

- [Supabase Authentication](https://supabase.com/docs/guides/auth/overview)
- [Reset Password Documentation](https://supabase.com/docs/reference/javascript/auth-resetpasswordforemail)
- [Resend Email Service](https://resend.com)
- [SMTP Providers Comparison](https://supabase.com/docs/guides/auth/auth-smtp)

---

**Статус:** 🔴 Требует конфигурации в Supabase Dashboard  
**Приоритет:** 🔴 Высокий (необходимо для production)  
**Затронутые страницы:** `login.html`, `reset-password.html`
