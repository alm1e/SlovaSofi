const STORAGE_KEY = "slovasofiTeacherSpace";
const LESSON_UNITS = ["A1", "A2", "B1", "B2"];
const translations = {
    ua: {
        "nav.overview": "Огляд", "nav.classes": "Класи", "nav.lessons": "Уроки", "nav.materials": "Матеріали", "nav.students": "Учні", "nav.home": "← На головну", "nav.label": "Навігація", "brand.home": "SlovaSofi — на головну", "language.label": "Мова", "menu.open": "Відкрити меню", "header.notifications": "Сповіщення", "modal.close": "Закрити", "teacher.role": "Викладач", "school.profile": "Профіль школи", "profile.open": "Профіль користувача: {name}", "profile.title": "Профіль користувача", "profile.signedOut": "Гість", "profile.notSignedIn": "Ви не ввійшли в обліковий запис", "profile.logout": "Вийти з профілю", "profile.login": "Увійти", "profile.logoutError": "Не вдалося вийти з профілю. Спробуйте ще раз.", "profile.loadError": "Не вдалося завантажити профіль користувача.", "school.title": "Профіль школи", "school.purpose": "Профіль школи — це спільний простір SlovaSofi. Тут зберігаються класи, уроки й навчальні матеріали школи.", "school.workspace": "Навчальний простір", "school.workspaceDetail": "Спільні класи, уроки та матеріали", "notifications.title": "Сповіщення", "notifications.empty": "Поки немає сповіщень", "notifications.description": "Тут з’являтимуться оновлення про класи, уроки та учнів.", "class.noClass": "Без класу",
        "page.overview": "Огляд", "page.classes": "Класи", "page.lessons": "Уроки", "page.materials": "Матеріали", "page.students": "Учні", "pageTitle": "Кабінет викладача", "welcome.badge": "ПАНЕЛЬ ВИКЛАДАЧА · SLOVASOFI", "welcome.title": "Добрий день, {name} 👋", "welcome.text": "Ваші заняття та матеріали в одному місці.", "welcome.storage": "✓ Демо-дані зберігаються у цьому браузері", "action.createLesson": "＋ Створити урок",
        "stat.classes": "Створено класів", "stat.students": "Учнів у класах", "stat.lessons": "Створено уроків", "stat.materials": "Матеріали", "overview.recent": "Останні уроки", "overview.recentHint": "Ваші останні створені уроки", "overview.allLessons": "Усі уроки →", "overview.yourClasses": "Ваші класи", "overview.groups": "Групи учнів", "overview.allClasses": "Усі класи →",
        "classes.title": "Класи", "classes.description": "Створюйте групи та призначайте їм окремі уроки.", "classes.create": "＋ Створити клас", "classes.search": "Пошук класів…", "classes.lessons": "Уроки →", "classes.notFound": "Класи не знайдено", "classes.notFoundHint": "Змініть запит або створіть новий клас.",
        "lessons.title": "Уроки", "lessons.description": "Створюйте інтерактивні завдання та призначайте їх класам.", "lessons.add": "＋ Додати урок", "lessons.allClasses": "Усі класи", "lessons.search": "Пошук уроку…", "lessons.notFound": "Уроків поки немає", "lessons.notFoundHint": "Натисніть «Додати урок», щоб вибрати типи завдань.", "lessons.blocks": "блоків", "lessons.block": "блок", "lessons.task": "завдання", "lessons.tasks": "завдань",
        "materials.title": "Матеріали", "materials.description": "Спільна бібліотека файлів, посилань і навчальних ресурсів.", "materials.add": "＋ Додати матеріал", "materials.total": "Усього матеріалів: {count}", "materials.search": "Пошук матеріалів…", "materials.open": "Відкрити матеріал ↗", "materials.inLibrary": "Додано до бібліотеки", "materials.notFound": "Матеріалів не знайдено", "materials.notFoundHint": "Додайте перший матеріал або змініть запит.",
        "students.title": "Учні", "students.description": "Список учнів, розподілених за вашими класами.", "students.manage": "Керувати класами", "students.total": "Усього учнів: {count}", "students.search": "Пошук учня…", "students.role": "Учень SlovaSofi", "students.notFound": "Учнів не знайдено", "students.notFoundHint": "Додайте учнів до класів, щоб вони з’явилися тут.",
        "empty.noClasses": "Класів поки немає", "empty.createClass": "Створіть клас, щоб призначати уроки.", "empty.search": "Нічого не знайдено", "empty.changeSearch": "Змініть пошуковий запит.",
        "modal.editClass": "Редагувати клас", "modal.newClass": "Новий клас", "field.className": "Назва класу", "field.course": "Курс або рівень", "field.students": "Учні", "field.studentsPlaceholder": "Введіть імена через кому", "field.studentsHint": "Кожне ім’я стане окремим учнем.", "field.exampleClass": "Наприклад, Словацька A1", "field.exampleCourse": "Наприклад, Словацька · A1", "action.cancel": "Скасувати", "action.save": "Зберегти", "action.createClass": "Створити клас", "action.delete": "Видалити", "class.unnamedCourse": "Курс не вказано",
        "modal.editLesson": "Редагувати урок", "modal.newLesson": "Новий урок", "field.lessonTitle": "Назва уроку", "field.exampleLesson": "Наприклад, Lekcia 5. Rodina", "field.chooseClass": "Виберіть клас", "lesson.activities": "Завдання уроку", "activity.addBlock": "＋ Додати блок", "lesson.firstActivity": "Додайте перше завдання", "lesson.firstActivityHint": "Виберіть тип блоку: перетягування, пропуск, порядок, відповідність тощо.", "lesson.save": "Зберегти урок", "lesson.create": "Створити урок",
        "field.instruction": "Інструкція", "field.instructionExample": "Наприклад, складіть речення", "field.taskText": "Текст завдання", "field.mediaContent": "Посилання або вміст", "field.answer": "Правильна відповідь", "field.enterText": "Введіть текст або вставте посилання", "hint.drag": "слова у правильному порядку", "hint.blank": "використовуйте ___ для пропуску", "hint.options": "кожен варіант з нового рядка", "hint.order": "кожен елемент з нового рядка", "hint.sentences": "кожне речення з нового рядка", "hint.match": "пара у форматі слово = переклад, одна на рядок", "hint.columns": "категорія: елемент, кожен з нового рядка", "hint.table": "колонки розділіть |, порожні комірки позначте ___", "hint.select": "варіанти відповіді з нового рядка", "hint.trueFalse": "твердження для перевірки", "hint.cards": "картка: переклад, по одній на рядок", "hint.answerSlash": "слова через /", "hint.answerText": "слово або фраза", "hint.answerChoice": "точний текст правильної відповіді", "hint.answerOrder": "правильний порядок через /", "hint.optional": "необов’язково", "hint.correctChoice": "правильний варіант",
        "picker.title": "Виберіть інтерактивне завдання", "picker.all": "Усі", "picker.tests": "Тести", "picker.media": "Медіа", "picker.other": "Інше", "picker.search": "Пошук блоку…", "picker.back": "← До уроку",
        "activity.task": "Завдання", "activity.drag": "Перетягнути слова", "activity.dragDesc": "Складіть речення зі слів у правильному порядку.", "activity.blank": "Заповнити пропуск", "activity.blankDesc": "Впишіть відповідне слово у пропуск.", "activity.choice": "Вибрати варіант", "activity.choiceDesc": "Виберіть одну правильну відповідь.", "activity.order": "Правильний порядок", "activity.orderDesc": "Розташуйте елементи у правильному порядку.", "activity.sentences": "Порядок речень", "activity.sentencesDesc": "Складіть зв’язний текст із речень.", "activity.dropdown": "Один із варіантів", "activity.dropdownDesc": "Заповніть пропуск, вибравши слово зі списку.", "activity.trueFalse": "True або False", "activity.trueFalseDesc": "Визначте, чи є твердження правильним.", "activity.table": "Заповнити таблицю", "activity.tableDesc": "Внесіть відповіді до таблиці.", "activity.match": "Поєднати елементи", "activity.matchDesc": "Поєднайте слова з їхніми значеннями.", "activity.columns": "Розподілити за колонками", "activity.columnsDesc": "Розкладіть картки за категоріями.", "activity.open": "Відкрита відповідь", "activity.openDesc": "Додайте запитання з відповіддю своїми словами.", "activity.cards": "Картки", "activity.cardsDesc": "Створіть картки зі словом і перекладом.", "activity.text": "Заголовок і текст", "activity.textDesc": "Додайте пояснення або інструкцію.", "activity.video": "Відео", "activity.videoDesc": "Вставте посилання на відео.", "activity.audio": "Аудіо", "activity.audioDesc": "Додайте аудіо або посилання на запис.", "activity.image": "Зображення", "activity.imageDesc": "Додайте зображення до уроку.",
        "material.name": "Назва", "material.example": "Наприклад, Слова на тему «Їжа»", "material.type": "Тип матеріалу", "material.description": "Опис", "material.shortDescription": "Короткий опис", "material.url": "Посилання (необов’язково)", "material.add": "Додати матеріал", "material.noDescription": "Без опису",
        "toast.classCreated": "Клас створено.", "toast.classUpdated": "Клас оновлено.", "toast.classDeleted": "Клас видалено.", "toast.lessonCreated": "Урок створено.", "toast.lessonUpdated": "Урок оновлено.", "toast.lessonDeleted": "Урок видалено.", "toast.activityUpdated": "Завдання збережено.", "toast.activityDeleted": "Завдання видалено.", "toast.activityOrderSaved": "Порядок завдань збережено.", "toast.materialAdded": "Матеріал додано до бібліотеки.", "toast.materialDeleted": "Матеріал видалено.", "toast.createClassFirst": "Спочатку створіть клас, щоб призначити йому урок.", "toast.titleAndClass": "Вкажіть назву уроку та виберіть клас.", "toast.httpUrl": "Посилання має починатися з http:// або https://.", "toast.storageError": "Не вдалося зберегти зміни у браузері. Перевірте доступ до локального сховища.",
        "confirm.deleteClass": "Видалити клас «{name}»? Уроки залишаться у списку без класу.", "confirm.deleteLesson": "Видалити урок «{name}»?", "confirm.deleteActivity": "Видалити це завдання?", "confirm.deleteMaterial": "Видалити матеріал «{name}»?", "course.slovakA1": "Словацька · A1", "course.slovakB1": "Словацька · B1", "material.vocabulary": "Словник", "material.document": "Документ", "material.audio": "Аудіо", "material.video": "Відео", "material.link": "Посилання"
    },
    ru: {
        "nav.overview": "Обзор", "nav.classes": "Классы", "nav.lessons": "Уроки", "nav.materials": "Материалы", "nav.students": "Ученики", "nav.home": "← На главную", "nav.label": "Основная навигация", "brand.home": "SlovaSofi — на главную", "language.label": "Язык", "menu.open": "Открыть меню", "header.notifications": "Уведомления", "modal.close": "Закрыть", "teacher.role": "Преподаватель", "school.profile": "Профиль школы", "profile.open": "Профиль пользователя: {name}", "profile.title": "Профиль пользователя", "profile.signedOut": "Гость", "profile.notSignedIn": "Вы не вошли в учётную запись", "profile.logout": "Выйти из профиля", "profile.login": "Войти", "profile.logoutError": "Не удалось выйти из профиля. Попробуйте ещё раз.", "profile.loadError": "Не удалось загрузить профиль пользователя.", "school.title": "Профиль школы", "school.purpose": "Профиль школы — это общее пространство SlovaSofi. Здесь находятся классы, уроки и учебные материалы школы.", "school.workspace": "Учебное пространство", "school.workspaceDetail": "Общие классы, уроки и материалы", "notifications.title": "Уведомления", "notifications.empty": "Пока нет уведомлений", "notifications.description": "Здесь будут появляться обновления о классах, уроках и учениках.", "class.noClass": "Без класса",
        "page.overview": "Обзор", "page.classes": "Классы", "page.lessons": "Уроки", "page.materials": "Материалы", "page.students": "Ученики", "pageTitle": "Кабинет преподавателя", "welcome.badge": "ПАНЕЛЬ ПРЕПОДАВАТЕЛЯ · SLOVASOFI", "welcome.title": "Добрый день, {name} 👋", "welcome.text": "Ваши занятия и материалы в одном месте.", "welcome.storage": "✓ Демо-данные сохраняются в этом браузере", "action.createLesson": "＋ Создать урок",
        "stat.classes": "Создано классов", "stat.students": "Учеников в классах", "stat.lessons": "Создано уроков", "stat.materials": "Материалы", "overview.recent": "Последние уроки", "overview.recentHint": "Ваши недавно созданные уроки", "overview.allLessons": "Все уроки →", "overview.yourClasses": "Ваши классы", "overview.groups": "Группы учеников", "overview.allClasses": "Все классы →",
        "classes.title": "Классы", "classes.description": "Создавайте группы и назначайте им отдельные уроки.", "classes.create": "＋ Создать класс", "classes.search": "Поиск классов…", "classes.lessons": "Уроки →", "classes.notFound": "Классы не найдены", "classes.notFoundHint": "Измените запрос или создайте новый класс.",
        "lessons.title": "Уроки", "lessons.description": "Собирайте интерактивные задания и назначайте их классам.", "lessons.add": "＋ Добавить урок", "lessons.allClasses": "Все классы", "lessons.search": "Поиск урока…", "lessons.notFound": "Уроков пока нет", "lessons.notFoundHint": "Нажмите «Добавить урок», чтобы выбрать типы заданий.", "lessons.blocks": "блоков", "lessons.block": "блок", "lessons.task": "задание", "lessons.tasks": "заданий",
        "materials.title": "Материалы", "materials.description": "Общая библиотека файлов, ссылок и учебных ресурсов.", "materials.add": "＋ Добавить материал", "materials.total": "Всего материалов: {count}", "materials.search": "Поиск материалов…", "materials.open": "Открыть материал ↗", "materials.inLibrary": "Добавлен в библиотеку", "materials.notFound": "Материалы не найдены", "materials.notFoundHint": "Добавьте первый материал или измените запрос.",
        "students.title": "Ученики", "students.description": "Список учеников, распределённых по вашим классам.", "students.manage": "Управлять классами", "students.total": "Всего учеников: {count}", "students.search": "Поиск ученика…", "students.role": "Ученик SlovaSofi", "students.notFound": "Ученики не найдены", "students.notFoundHint": "Добавьте учеников в классы, чтобы они появились здесь.",
        "empty.noClasses": "Классов пока нет", "empty.createClass": "Создайте класс, чтобы назначать уроки.", "empty.search": "Ничего не найдено", "empty.changeSearch": "Измените поисковый запрос.",
        "modal.editClass": "Редактировать класс", "modal.newClass": "Новый класс", "field.className": "Название класса", "field.course": "Курс или уровень", "field.students": "Ученики", "field.studentsPlaceholder": "Введите имена через запятую", "field.studentsHint": "Каждое имя станет отдельным учеником.", "field.exampleClass": "Например, Словацкий A1", "field.exampleCourse": "Например, Словацкий · A1", "action.cancel": "Отмена", "action.save": "Сохранить", "action.createClass": "Создать класс", "action.delete": "Удалить", "class.unnamedCourse": "Курс не указан",
        "modal.editLesson": "Редактировать урок", "modal.newLesson": "Новый урок", "field.lessonTitle": "Название урока", "field.exampleLesson": "Например, Lekcia 5. Rodina", "field.chooseClass": "Выберите класс", "lesson.activities": "Задания урока", "activity.addBlock": "＋ Добавить блок", "lesson.firstActivity": "Добавьте первое задание", "lesson.firstActivityHint": "Выберите тип блока: перетягивание, пропуск, порядок, соответствия и другие.", "lesson.save": "Сохранить урок", "lesson.create": "Создать урок",
        "field.instruction": "Инструкция", "field.instructionExample": "Например, соберите предложение", "field.taskText": "Текст задания", "field.mediaContent": "Ссылка или содержимое", "field.answer": "Правильный ответ", "field.enterText": "Введите текст или вставьте ссылку", "hint.drag": "слова в правильном порядке", "hint.blank": "используйте ___ для пропуска", "hint.options": "каждый вариант с новой строки", "hint.order": "каждый элемент с новой строки", "hint.sentences": "каждое предложение с новой строки", "hint.match": "пара в формате слово = перевод, одна на строку", "hint.columns": "категория: элемент, каждый с новой строки", "hint.table": "колонки разделяйте |, пустые ячейки отмечайте ___", "hint.select": "варианты ответа с новой строки", "hint.trueFalse": "утверждение для проверки", "hint.cards": "карточка: перевод, по одной на строку", "hint.answerSlash": "слова через /", "hint.answerText": "слово или фраза", "hint.answerChoice": "точный текст верного варианта", "hint.answerOrder": "правильный порядок через /", "hint.optional": "необязательно", "hint.correctChoice": "правильный вариант",
        "picker.title": "Выберите интерактивное задание", "picker.all": "Все", "picker.tests": "Тесты", "picker.media": "Медиа", "picker.other": "Другое", "picker.search": "Поиск блока…", "picker.back": "← К уроку",
        "activity.task": "Задание", "activity.drag": "Перетянуть слова", "activity.dragDesc": "Соберите предложение из слов в правильном порядке.", "activity.blank": "Заполнить пропуск", "activity.blankDesc": "Впишите подходящее слово в пропуск.", "activity.choice": "Выбрать вариант", "activity.choiceDesc": "Выберите один правильный ответ.", "activity.order": "Правильный порядок", "activity.orderDesc": "Расставьте элементы по порядку.", "activity.sentences": "Порядок предложений", "activity.sentencesDesc": "Соберите связный текст из предложений.", "activity.dropdown": "Один из вариантов", "activity.dropdownDesc": "Заполните пропуск, выбрав слово из списка.", "activity.trueFalse": "True или False", "activity.trueFalseDesc": "Оцените утверждение как верное или ложное.", "activity.table": "Заполнить таблицу", "activity.tableDesc": "Внесите ответы в таблицу.", "activity.match": "Соединить элементы", "activity.matchDesc": "Соедините слова и их значения.", "activity.columns": "Распределить по колонкам", "activity.columnsDesc": "Разложите карточки по категориям.", "activity.open": "Открытый ответ", "activity.openDesc": "Добавьте вопрос с ответом своими словами.", "activity.cards": "Флип-карточки", "activity.cardsDesc": "Создайте карточки со словом и переводом.", "activity.text": "Заголовок и текст", "activity.textDesc": "Добавьте пояснение или инструкцию.", "activity.video": "Видео", "activity.videoDesc": "Вставьте ссылку на видео.", "activity.audio": "Аудио", "activity.audioDesc": "Добавьте аудио или ссылку на запись.", "activity.image": "Картинка", "activity.imageDesc": "Добавьте изображение в урок.",
        "material.name": "Название", "material.example": "Например, Слова по теме «Еда»", "material.type": "Тип материала", "material.description": "Описание", "material.shortDescription": "Краткое описание", "material.url": "Ссылка (необязательно)", "material.add": "Добавить материал", "material.noDescription": "Без описания",
        "toast.classCreated": "Класс создан.", "toast.classUpdated": "Класс обновлён.", "toast.classDeleted": "Класс удалён.", "toast.lessonCreated": "Урок создан.", "toast.lessonUpdated": "Урок обновлён.", "toast.lessonDeleted": "Урок удалён.", "toast.activityUpdated": "Задание сохранено.", "toast.activityDeleted": "Задание удалено.", "toast.activityOrderSaved": "Порядок заданий сохранён.", "toast.materialAdded": "Материал добавлен в библиотеку.", "toast.materialDeleted": "Материал удалён.", "toast.createClassFirst": "Сначала создайте класс, чтобы назначить ему урок.", "toast.titleAndClass": "Укажите название урока и выберите класс.", "toast.httpUrl": "Ссылка должна начинаться с http:// или https://.", "toast.storageError": "Не удалось сохранить изменения в браузере. Проверьте доступ к локальному хранилищу.",
        "confirm.deleteClass": "Удалить класс «{name}»? Уроки останутся в списке без класса.", "confirm.deleteLesson": "Удалить урок «{name}»?", "confirm.deleteActivity": "Удалить это задание?", "confirm.deleteMaterial": "Удалить материал «{name}»?", "course.slovakA1": "Словацкий · A1", "course.slovakB1": "Словацкий · B1", "material.vocabulary": "Словарь", "material.document": "Документ", "material.audio": "Аудио", "material.video": "Видео", "material.link": "Ссылка"
    },
    en: {
        "nav.overview": "Overview", "nav.classes": "Classes", "nav.lessons": "Lessons", "nav.materials": "Materials", "nav.students": "Students", "nav.home": "← Home", "nav.label": "Main navigation", "brand.home": "SlovaSofi — home", "language.label": "Language", "menu.open": "Open menu", "header.notifications": "Notifications", "modal.close": "Close", "teacher.role": "Teacher", "school.profile": "School profile", "profile.open": "User profile: {name}", "profile.title": "User profile", "profile.signedOut": "Guest", "profile.notSignedIn": "You are not signed in", "profile.logout": "Sign out", "profile.login": "Sign in", "profile.logoutError": "Could not sign out. Please try again.", "profile.loadError": "Could not load the user profile.", "school.title": "School profile", "school.purpose": "The school profile is SlovaSofi’s shared workspace. It brings the school’s classes, lessons, and learning materials together.", "school.workspace": "Learning workspace", "school.workspaceDetail": "Shared classes, lessons, and materials", "notifications.title": "Notifications", "notifications.empty": "No notifications yet", "notifications.description": "Updates about classes, lessons, and students will appear here.", "class.noClass": "No class",
        "page.overview": "Overview", "page.classes": "Classes", "page.lessons": "Lessons", "page.materials": "Materials", "page.students": "Students", "pageTitle": "Teacher dashboard", "welcome.badge": "TEACHER DASHBOARD · SLOVASOFI", "welcome.title": "Good day, {name} 👋", "welcome.text": "Your lessons and materials in one place.", "welcome.storage": "✓ Demo data is saved in this browser", "action.createLesson": "＋ Create lesson",
        "stat.classes": "Classes created", "stat.students": "Students in classes", "stat.lessons": "Lessons created", "stat.materials": "Materials", "overview.recent": "Recent lessons", "overview.recentHint": "Lessons assigned to your classes", "overview.allLessons": "All lessons →", "overview.yourClasses": "Your classes", "overview.groups": "Student groups", "overview.allClasses": "All classes →",
        "classes.title": "Classes", "classes.description": "Create groups and assign individual lessons to them.", "classes.create": "＋ Create class", "classes.search": "Search classes…", "classes.lessons": "Lessons →", "classes.notFound": "No classes found", "classes.notFoundHint": "Change your search or create a new class.",
        "lessons.title": "Lessons", "lessons.description": "Build interactive activities and assign them to classes.", "lessons.add": "＋ Add lesson", "lessons.allClasses": "All classes", "lessons.search": "Search lessons…", "lessons.notFound": "No lessons yet", "lessons.notFoundHint": "Select “Add lesson” to choose activity types.", "lessons.blocks": "blocks", "lessons.block": "block", "lessons.task": "activity", "lessons.tasks": "activities",
        "materials.title": "Materials", "materials.description": "A shared library of files, links, and learning resources.", "materials.add": "＋ Add material", "materials.total": "Total materials: {count}", "materials.search": "Search materials…", "materials.open": "Open material ↗", "materials.inLibrary": "Added to library", "materials.notFound": "No materials found", "materials.notFoundHint": "Add your first material or change the search.",
        "students.title": "Students", "students.description": "Students organized by your classes.", "students.manage": "Manage classes", "students.total": "Total students: {count}", "students.search": "Search students…", "students.role": "SlovaSofi student", "students.notFound": "No students found", "students.notFoundHint": "Add students to classes to see them here.",
        "empty.noClasses": "No classes yet", "empty.createClass": "Create a class to assign lessons.", "empty.search": "Nothing found", "empty.changeSearch": "Try a different search.",
        "modal.editClass": "Edit class", "modal.newClass": "New class", "field.className": "Class name", "field.course": "Course or level", "field.students": "Students", "field.studentsPlaceholder": "Enter names separated by commas", "field.studentsHint": "Each name will be added as a student.", "field.exampleClass": "For example, Slovak A1", "field.exampleCourse": "For example, Slovak · A1", "action.cancel": "Cancel", "action.save": "Save", "action.createClass": "Create class", "action.delete": "Delete", "class.unnamedCourse": "Course not specified",
        "modal.editLesson": "Edit lesson", "modal.newLesson": "New lesson", "field.lessonTitle": "Lesson name", "field.exampleLesson": "For example, Lekcia 5. Rodina", "field.chooseClass": "Choose a class", "lesson.activities": "Lesson activities", "activity.addBlock": "＋ Add activity", "lesson.firstActivity": "Add your first activity", "lesson.firstActivityHint": "Choose a block: drag and drop, fill in the blank, ordering, matching, and more.", "lesson.save": "Save lesson", "lesson.create": "Create lesson",
        "field.instruction": "Instructions", "field.instructionExample": "For example, arrange the sentence", "field.taskText": "Activity text", "field.mediaContent": "Link or content", "field.answer": "Correct answer", "field.enterText": "Enter text or paste a link", "hint.drag": "words in the correct order", "hint.blank": "use ___ for the blank", "hint.options": "one option per line", "hint.order": "one item per line", "hint.sentences": "one sentence per line", "hint.match": "pair format word = translation, one per line", "hint.columns": "category: item, one per line", "hint.table": "separate columns with | and mark empty cells with ___", "hint.select": "options, one per line", "hint.trueFalse": "statement to evaluate", "hint.cards": "card: translation, one per line", "hint.answerSlash": "separate words with /", "hint.answerText": "word or phrase", "hint.answerChoice": "exact text of the correct answer", "hint.answerOrder": "correct order separated by /", "hint.optional": "optional", "hint.correctChoice": "correct option",
        "picker.title": "Choose an interactive activity", "picker.all": "All", "picker.tests": "Quizzes", "picker.media": "Media", "picker.other": "Other", "picker.search": "Search activities…", "picker.back": "← Back to lesson",
        "activity.task": "Activity", "activity.drag": "Drag the words", "activity.dragDesc": "Build a sentence by arranging words in the correct order.", "activity.blank": "Fill in the blank", "activity.blankDesc": "Enter a suitable word in the blank.", "activity.choice": "Choose an answer", "activity.choiceDesc": "Select one correct answer.", "activity.order": "Put in order", "activity.orderDesc": "Arrange the items in the correct order.", "activity.sentences": "Order the sentences", "activity.sentencesDesc": "Build a coherent text from sentences.", "activity.dropdown": "Choose from options", "activity.dropdownDesc": "Fill in the blank by choosing a word from the list.", "activity.trueFalse": "True or False", "activity.trueFalseDesc": "Decide whether the statement is true or false.", "activity.table": "Complete the table", "activity.tableDesc": "Enter answers into a table.", "activity.match": "Match the items", "activity.matchDesc": "Match words with their meanings.", "activity.columns": "Sort into columns", "activity.columnsDesc": "Sort cards into categories.", "activity.open": "Open answer", "activity.openDesc": "Add a question for a free-form answer.", "activity.cards": "Flashcards", "activity.cardsDesc": "Create cards with a word and its translation.", "activity.text": "Heading and text", "activity.textDesc": "Add an explanation or instruction.", "activity.video": "Video", "activity.videoDesc": "Insert a video link.", "activity.audio": "Audio", "activity.audioDesc": "Add audio or a recording link.", "activity.image": "Image", "activity.imageDesc": "Add an image to the lesson.",
        "material.name": "Name", "material.example": "For example, Food vocabulary", "material.type": "Material type", "material.description": "Description", "material.shortDescription": "Short description", "material.url": "Link (optional)", "material.add": "Add material", "material.noDescription": "No description",
        "toast.classCreated": "Class created.", "toast.classUpdated": "Class updated.", "toast.classDeleted": "Class deleted.", "toast.lessonCreated": "Lesson created.", "toast.lessonUpdated": "Lesson updated.", "toast.lessonDeleted": "Lesson deleted.", "toast.activityUpdated": "Activity saved.", "toast.activityDeleted": "Activity deleted.", "toast.activityOrderSaved": "Activity order saved.", "toast.materialAdded": "Material added to the library.", "toast.materialDeleted": "Material deleted.", "toast.createClassFirst": "Create a class first to assign it a lesson.", "toast.titleAndClass": "Enter a lesson name and choose a class.", "toast.httpUrl": "The link must start with http:// or https://.", "toast.storageError": "Could not save changes in this browser. Check local storage access.",
        "confirm.deleteClass": "Delete class “{name}”? Its lessons will remain unassigned.", "confirm.deleteLesson": "Delete lesson “{name}”?", "confirm.deleteActivity": "Delete this activity?", "confirm.deleteMaterial": "Delete material “{name}”?", "course.slovakA1": "Slovak · A1", "course.slovakB1": "Slovak · B1", "material.vocabulary": "Vocabulary", "material.document": "Document", "material.audio": "Audio", "material.video": "Video", "material.link": "Link"
    }
};
Object.assign(translations.ua, {
    "classes.inviteStudent": "＋ Запросити учня",
    "studentInvite.title": "Запросити учня до класу",
    "studentInvite.newMode": "Новий учень",
    "studentInvite.existingMode": "Із бази учнів",
    "studentInvite.name": "Ім’я учня",
    "studentInvite.email": "Email учня",
    "studentInvite.hint": "Учень отримає лист, щоб створити пароль і приєднатися до класу.",
    "studentInvite.selectExisting": "Виберіть учня",
    "studentInvite.loadingExisting": "Завантаження списку учнів…",
    "studentInvite.noExisting": "У цьому кабінеті поки немає учнів, яких можна додати.",
    "studentInvite.noneAvailable": "Усі учні з бази вже є в цьому класі.",
    "studentInvite.targetClass": "Клас: {name}",
    "studentInvite.existingHint": "Тут відображаються учні, уже пов’язані з вашим кабінетом. Повторне запрошення не надсилається.",
    "studentInvite.send": "Надіслати запрошення",
    "studentInvite.addExisting": "Додати до класу",
    "toast.studentInvited": "Запрошення надіслано.",
    "toast.studentInviteError": "Не вдалося надіслати запрошення:",
    "toast.studentAdded": "Учня додано до класу.",
    "toast.studentAddError": "Не вдалося додати учня:",
    "toast.studentListError": "Не вдалося завантажити список учнів:"
});
Object.assign(translations.ru, {
    "classes.inviteStudent": "＋ Пригласить ученика",
    "studentInvite.title": "Пригласить ученика в класс",
    "studentInvite.newMode": "Новый ученик",
    "studentInvite.existingMode": "Из базы учеников",
    "studentInvite.name": "Имя ученика",
    "studentInvite.email": "Email ученика",
    "studentInvite.hint": "Ученик получит письмо, чтобы создать пароль и вступить в класс.",
    "studentInvite.selectExisting": "Выберите ученика",
    "studentInvite.loadingExisting": "Загрузка списка учеников…",
    "studentInvite.noExisting": "В этом кабинете пока нет учеников, которых можно добавить.",
    "studentInvite.noneAvailable": "Все ученики из базы уже добавлены в этот класс.",
    "studentInvite.targetClass": "Класс: {name}",
    "studentInvite.existingHint": "Здесь отображаются ученики, уже связанные с вашим кабинетом. Повторное приглашение не отправляется.",
    "studentInvite.send": "Отправить приглашение",
    "studentInvite.addExisting": "Добавить в класс",
    "toast.studentInvited": "Приглашение отправлено.",
    "toast.studentInviteError": "Не удалось отправить приглашение:",
    "toast.studentAdded": "Ученик добавлен в класс.",
    "toast.studentAddError": "Не удалось добавить ученика:",
    "toast.studentListError": "Не удалось загрузить список учеников:"
});
Object.assign(translations.en, {
    "classes.inviteStudent": "＋ Invite student",
    "studentInvite.title": "Invite a student to class",
    "studentInvite.newMode": "New student",
    "studentInvite.existingMode": "From student directory",
    "studentInvite.name": "Student name",
    "studentInvite.email": "Student email",
    "studentInvite.hint": "The student will receive an email to set a password and join the class.",
    "studentInvite.selectExisting": "Choose a student",
    "studentInvite.loadingExisting": "Loading students…",
    "studentInvite.noExisting": "There are no students in this workspace that can be added.",
    "studentInvite.noneAvailable": "All students from the directory are already in this class.",
    "studentInvite.targetClass": "Class: {name}",
    "studentInvite.existingHint": "Only students already linked to your workspace appear here. No new invitation will be sent.",
    "studentInvite.send": "Send invitation",
    "studentInvite.addExisting": "Add to class",
    "toast.studentInvited": "Invitation sent.",
    "toast.studentInviteError": "Could not send invitation:",
    "toast.studentAdded": "Student added to the class.",
    "toast.studentAddError": "Could not add the student:",
    "toast.studentListError": "Could not load the student list:"
});
Object.assign(translations.ua, {
    "welcome.database": "✓ Дані синхронізуються з Supabase",
    "toast.databaseLoadError": "Не вдалося завантажити дані з бази:",
    "toast.staffLoadError": "Не вдалося завантажити список викладачів:",
    "toast.databaseSaveError": "Не вдалося зберегти дані в базі:"
});
Object.assign(translations.ru, {
    "welcome.database": "✓ Данные синхронизируются с Supabase",
    "toast.databaseLoadError": "Не удалось загрузить данные из базы:",
    "toast.staffLoadError": "Не удалось загрузить список преподавателей:",
    "toast.databaseSaveError": "Не удалось сохранить данные в базе:"
});
Object.assign(translations.en, {
    "welcome.database": "✓ Data syncs with Supabase",
    "toast.databaseLoadError": "Could not load data from the database:",
    "toast.staffLoadError": "Could not load the teacher list:",
    "toast.databaseSaveError": "Could not save data to the database:"
});
Object.assign(translations.ua, {
    "nav.overview": "Профіль",
    "page.overview": "Профіль",
    "profile.dashboardTitle": "Мій профіль",
    "profile.dashboardHint": "Персональний простір викладача SlovaSofi.",
    "lessons.unitEmpty": "Поки без уроків",
    "lessons.unitSubtitle": "Уроки цього рівня",
    "classes.teacherLabel": "Викладач класу",
    "classes.studentsLabel": "Учні в класі",
    "classes.noStudents": "Учнів поки немає"
});
Object.assign(translations.ru, {
    "nav.overview": "Профиль",
    "page.overview": "Профиль",
    "profile.dashboardTitle": "Мой профиль",
    "profile.dashboardHint": "Личное пространство преподавателя SlovaSofi.",
    "lessons.unitEmpty": "Пока без уроков",
    "lessons.unitSubtitle": "Уроки этого уровня",
    "classes.teacherLabel": "Преподаватель класса",
    "classes.studentsLabel": "Ученики в классе",
    "classes.noStudents": "Пока нет учеников"
});
Object.assign(translations.en, {
    "nav.overview": "Profile",
    "page.overview": "Profile",
    "profile.dashboardTitle": "My profile",
    "profile.dashboardHint": "Your personal SlovaSofi teacher space.",
    "lessons.unitEmpty": "No lessons yet",
    "lessons.unitSubtitle": "Lessons for this level",
    "classes.teacherLabel": "Class teacher",
    "classes.studentsLabel": "Students in this class",
    "classes.noStudents": "No students yet"
});
const staffLabels = {
    ua: {
        nav: "Викладачі", title: "Викладачі", description: "Викладачі керують своїми класами й учнями. Редагування спільних уроків можна надати окремо.",
        add: "＋ Додати викладача", empty: "Поки немає інших викладачів", emptyHint: "Додайте колегу та оберіть, що він зможе робити.",
        inviteTitle: "Додати викладача", editTitle: "Права доступу викладача", email: "Email викладача", role: "Роль", teacher: "Викладач",
        passwordTitle: "Створіть пароль", passwordHint: "Запрошення прийнято. Створіть пароль для входу до кабінету.", password: "Пароль (не менше 8 символів)", setPassword: "Зберегти пароль",
        permissions: "Додаткове право", viewClasses: "Перегляд класів і учнів", manageClasses: "Керування класами й учнями",
        viewLessons: "Перегляд і призначення уроків", editLessons: "Редагування спільних уроків",
        manageTeachers: "Запрошення й керування викладачами", cancel: "Скасувати", invite: "Надіслати запрошення",
        save: "Зберегти права", edit: "Змінити права", remove: "Зняти право редактора", removeConfirm: "Зняти право редагувати уроки у {email}?",
        memberRole: "Викладач", noPermission: "Виберіть хоча б одне право.", noEditor: "Без права редагувати уроки",
        added: "Викладача додано до кабінету. Якщо в нього ще немає акаунта, надіслано лист-запрошення.", updated: "Права доступу оновлено.",
        removed: "Доступ викладача відкликано.", error: "Не вдалося змінити доступ:"
    },
    ru: {
        nav: "Учителя", title: "Учителя", description: "Учителя управляют своими классами и учениками. Право редактировать общие уроки можно выдать отдельно.",
        add: "＋ Добавить учителя", empty: "Пока нет других учителей", emptyHint: "Добавьте коллегу и выберите, что ему разрешено.",
        inviteTitle: "Добавить учителя", editTitle: "Права доступа учителя", email: "Email учителя", role: "Роль", teacher: "Учитель",
        passwordTitle: "Создайте пароль", passwordHint: "Приглашение принято. Создайте пароль для входа в кабинет.", password: "Пароль (не менее 8 символов)", setPassword: "Сохранить пароль",
        permissions: "Дополнительное право", viewClasses: "Просмотр классов и учеников", manageClasses: "Управление классами и учениками",
        viewLessons: "Просмотр и назначение уроков", editLessons: "Редактирование общих уроков",
        manageTeachers: "Приглашение и управление учителями", cancel: "Отмена", invite: "Отправить приглашение",
        save: "Сохранить права", edit: "Изменить права", remove: "Снять права редактора", removeConfirm: "Снять право редактировать уроки у {email}?",
        memberRole: "Учитель", noPermission: "Выберите хотя бы одно право.", noEditor: "Без права редактировать уроки",
        added: "Учитель добавлен в кабинет. Если у него ещё нет аккаунта, отправлено приглашение.", updated: "Права доступа обновлены.",
        removed: "Доступ учителя отозван.", error: "Не удалось изменить доступ:"
    },
    en: {
        nav: "Teachers", title: "Teachers", description: "Teachers manage their own classes and students. Permission to edit shared lessons is optional.",
        add: "＋ Add teacher", empty: "No other teachers yet", emptyHint: "Invite a colleague and choose what they can do.",
        inviteTitle: "Add teacher", editTitle: "Teacher permissions", email: "Teacher email", role: "Role", teacher: "Teacher",
        passwordTitle: "Create a password", passwordHint: "Invitation accepted. Create a password to access your workspace.", password: "Password (at least 8 characters)", setPassword: "Save password",
        permissions: "Optional permission", viewClasses: "View classes and students", manageClasses: "Manage classes and students",
        viewLessons: "View and assign lessons", editLessons: "Edit shared lessons",
        manageTeachers: "Invite and manage teachers", cancel: "Cancel", invite: "Send invitation",
        save: "Save access", edit: "Edit access", remove: "Remove editor access", removeConfirm: "Remove lesson-editing access for {email}?",
        memberRole: "Teacher", noPermission: "Select at least one permission.", noEditor: "Cannot edit lessons",
        added: "Teacher added to the workspace. An invitation email was sent if they did not already have an account.", updated: "Permissions updated.",
        removed: "Teacher access removed.", error: "Could not update access:"
    }
};
const permissionLabels = [
    ["edit_lessons", "editLessons"]
];
const roleLabels = { admin: { ua: "Адміністратор", ru: "Администратор", en: "Administrator" } };
const ownerPermissions = Object.fromEntries(permissionLabels.map(([key]) => [key, true]));
let currentLanguage = ["ua", "ru", "en"].includes(localStorage.getItem("siteLanguage")) ? localStorage.getItem("siteLanguage") : "ua";
let currentUser = null;
let workspaceAccess = { workspaceOwnerId: null, permissions: ownerPermissions, staff: [] };
let workspaceSaveQueue = Promise.resolve(true);
let openPopover = "";

function t(key, values = {}) {
    const text = translations[currentLanguage][key] || translations.ru[key] || key;
    return text.replace(/\{(\w+)\}/g, (_, name) => String(values[name] ?? ""));
}

function staffText(key, values = {}) {
    const text = staffLabels[currentLanguage][key] || staffLabels.ru[key];
    return text.replace(/\{(\w+)\}/g, (_, name) => String(values[name] ?? ""));
}

function hasPermission(permission) {
    return currentUser ? workspaceAccess.permissions?.[permission] === true : permission !== "manage_teachers";
}

const activityTypes = [
    { id: "drag-words", nameKey: "activity.drag", descKey: "activity.dragDesc", icon: "↔", category: "tests" },
    { id: "fill-blank", nameKey: "activity.blank", descKey: "activity.blankDesc", icon: "▱", category: "tests" },
    { id: "multiple-choice", nameKey: "activity.choice", descKey: "activity.choiceDesc", icon: "☑", category: "tests" },
    { id: "order-items", nameKey: "activity.order", descKey: "activity.orderDesc", icon: "≡", category: "tests" },
    { id: "sentence-order", nameKey: "activity.sentences", descKey: "activity.sentencesDesc", icon: "☷", category: "tests" },
    { id: "one-of-many", nameKey: "activity.dropdown", descKey: "activity.dropdownDesc", icon: "⌄", category: "tests" },
    { id: "true-false", nameKey: "activity.trueFalse", descKey: "activity.trueFalseDesc", icon: "✓", category: "tests" },
    { id: "table", nameKey: "activity.table", descKey: "activity.tableDesc", icon: "▦", category: "tests" },
    { id: "match", nameKey: "activity.match", descKey: "activity.matchDesc", icon: "⟷", category: "tests" },
    { id: "columns", nameKey: "activity.columns", descKey: "activity.columnsDesc", icon: "▥", category: "tests" },
    { id: "open-answer", nameKey: "activity.open", descKey: "activity.openDesc", icon: "✎", category: "tests" },
    { id: "flashcards", nameKey: "activity.cards", descKey: "activity.cardsDesc", icon: "▤", category: "tests" },
    { id: "text", nameKey: "activity.text", descKey: "activity.textDesc", icon: "T", category: "other" },
    { id: "video", nameKey: "activity.video", descKey: "activity.videoDesc", icon: "▶", category: "media" },
    { id: "audio", nameKey: "activity.audio", descKey: "activity.audioDesc", icon: "♫", category: "media" },
    { id: "image", nameKey: "activity.image", descKey: "activity.imageDesc", icon: "▧", category: "media" }
];
const liveAnswerActivityTypes = new Set([
    "drag-words", "fill-blank", "multiple-choice", "one-of-many", "order-items",
    "sentence-order", "true-false", "table", "match", "columns", "open-answer"
]);

const initialData = {
    classes: [
        { id: "class-a1", name: "Slovenčina A1 Deti", course: "Slovenčina · A1", students: ["Виктория К.", "Анастасия М."] },
        { id: "class-a2", name: "Slovenčina A1", course: "Slovenčina · A1", students: ["Вероника Т."] },
        { id: "class-b1", name: "Slovenčina B1 Deti", course: "Slovenčina · B1", students: ["Ирина П.", "Анна С."] }
    ],
    lessons: [
        { id: "lesson-1", title: "Lekcia 3. Či, ktorý, aký", unit: "A1", classIds: ["class-a1"], activities: [{ type: "drag-words", prompt: "Zostavte vetu", content: "Kde bývaš dnes?", answer: "Kde / bývaš / dnes?" }] },
        { id: "lesson-2", title: "Lekcia 4. Nábytok", unit: "A1", classIds: ["class-a1"], activities: [{ type: "match", prompt: "Spojte slovo a preklad", content: "stolička = стул\nstôl = стол", answer: "" }] },
        { id: "lesson-3", title: "Počasie a ročné obdobia", unit: "B1", classIds: ["class-b1"], activities: [{ type: "fill-blank", prompt: "Doplňte vhodné slovo", content: "V zime často ___ .", answer: "sneží" }] }
    ],
};

let data = loadData();
let activeView = "overview";
let selectedLessonUnit = "";
let activeClassFilter = "";
let searchQuery = "";
let selectedActivityCategory = "all";
let activitySearch = "";
let editingLessonId = null;
let lessonFormDraft = { title: "", unit: "A1" };
let draftSections = [];
let draftHomeworkSections = [];
let expandedActivityBlocks = new WeakSet();
let activityBlockDragController = null;
let activeLessonSectionId = "";
let activeHomeworkSectionId = "";
let lessonWorkspaceTab = "lesson";
let previewActivityEdit = null;
let editorReturnToPreview = false;
let homeworkSourceLessonId = "__current__";
let lessonWorkspaceMode = "";
let workspaceLessonId = "";
let monitorClassId = "";
let selectedLiveStudentId = "";
let liveProgressRows = new Map();
let liveProgressChannel = null;
let liveProgressKey = "";
let liveProgressGeneration = 0;
let liveProgressStatus = "idle";
let liveProgressError = "";
let activeSelectDropdown = null;
let selectDropdownSequence = 0;
let toastTimer;
let refreshModal = null;

const pageContent = document.getElementById("pageContent");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalCard = document.getElementById("modalCard");

function loadData() {
    try {
        const saved = localStorage.getItem(storageKey());
        if (!saved) return structuredClone(initialData);
        const parsed = JSON.parse(saved);
        if (!parsed || !Array.isArray(parsed.classes) || !Array.isArray(parsed.lessons)) {
            throw new Error("Сохранённые данные кабинета имеют неверный формат.");
        }
        delete parsed.materials;
        parsed.classes = parsed.classes.map((item) => item.id === "class-a2" && item.name === "Словацкий A1" ? { ...item, name: "Slovenčina A1" } : item);
        parsed.lessons = parsed.lessons.map((lesson) => ({
            ...lesson,
            classIds: lessonClassIds(lesson),
            unit: LESSON_UNITS.includes(lesson.unit) ? lesson.unit : inferLessonUnit(lesson, parsed.classes),
            sections: normalizeLessonSections(lesson),
            homeworkSections: normalizeHomeworkSections(lesson),
            activities: lessonActivities(lesson)
        }));
        return parsed;
    } catch (error) {
        console.error("Не удалось загрузить данные кабинета преподавателя.", error);
        return structuredClone(initialData);
    }
}

function storageKey(userId = currentUser?.id) {
    return `${STORAGE_KEY}:${userId || "demo"}`;
}

function persist(deletedLessonIds = []) {
    try {
        localStorage.setItem(storageKey(), JSON.stringify(data));
        if (currentUser && window.teacherWorkspaceApi) {
            const snapshot = structuredClone(data);
            const userId = currentUser.id;
            workspaceSaveQueue = workspaceSaveQueue
                .then(() => window.teacherWorkspaceApi.saveWorkspace(window.supabaseClient, userId, snapshot, workspaceAccess, deletedLessonIds))
                .then(() => true)
                .catch((error) => {
                    console.error("Не удалось синхронизировать кабинет с Supabase.", error);
                    showToast(`${t("toast.databaseSaveError")} ${error.message}`);
                    return false;
                });
        }
        return true;
    } catch (error) {
        console.error("Не удалось сохранить данные кабинета преподавателя.", error);
        showToast(t("toast.storageError"));
        return false;
    }
}

async function waitForWorkspaceSave() {
    return !currentUser || await workspaceSaveQueue;
}

function escapeHtml(value = "") {
    return String(value).replace(/[&<>"']/g, (character) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
}

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 3000);
}

function updateUserIdentity(user) {
    currentUser = user;
    const metadata = user?.user_metadata || {};
    const firstName = metadata.first_name || metadata.firstName || "";
    const lastName = metadata.last_name || metadata.lastName || "";
    const displayName = [firstName, lastName].filter(Boolean).join(" ") || metadata.full_name || metadata.name || user?.email || t("profile.signedOut");
    const initials = [firstName, lastName].filter(Boolean).map((part) => part.trim()[0]).join("").toLocaleUpperCase()
        || displayName.split(/[\s@._-]+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toLocaleUpperCase()
        || "—";
    document.querySelectorAll(".user-name").forEach((element) => { element.textContent = displayName; });
    document.querySelectorAll(".user-avatar").forEach((element) => { element.textContent = initials; });
    const profileLabel = t("profile.open", { name: displayName });
    document.querySelectorAll(".profile-trigger").forEach((element) => { element.setAttribute("aria-label", profileLabel); });
    const welcomeHeading = document.getElementById("welcomeHeading");
    if (welcomeHeading) welcomeHeading.textContent = t("welcome.title", { name: firstName || displayName });
}

async function loadCurrentUser() {
    if (!window.supabaseClient) {
        console.error("Supabase is not configured; user profile and sign out are unavailable.");
        updateUserIdentity(null);
        return;
    }
    try {
        // Get session and user in parallel
        // getSession reads local storage, so the UI does not wait for a network round trip
        const { data: { session }, error: sessionError } = await window.supabaseClient.auth.getSession();
        if (sessionError) throw sessionError;
        const user = session?.user;
        
        if (!session) {
            updateUserIdentity(null);
            data = loadData();
            workspaceAccess = { workspaceOwnerId: null, permissions: ownerPermissions, staff: [] };
            translateStaticUI();
            render();
            return;
        }
        
        updateUserIdentity(user);
        
        // Load from cache first (instant UI)
        const cachedData = (() => {
            try {
                const cached = localStorage.getItem(storageKey(user.id));
                return cached ? JSON.parse(cached) : { classes: [], lessons: [] };
            } catch {
                return { classes: [], lessons: [] };
            }
        })();
        
        const cachedAccess = (() => {
            try { return JSON.parse(localStorage.getItem(`${storageKey(user.id)}:access`)); } catch { return null; }
        })();

        data = cachedData;
        workspaceAccess = cachedAccess || {
            workspaceOwnerId: null,
            permissions: { view_classes_students: true, view_assign_lessons: true },
            staff: []
        };
        translateStaticUI();
        render();
        
        // Load workspace in background (don't block UI)
        try {
            const workspace = await window.teacherWorkspaceApi.loadWorkspace(window.supabaseClient, user.id);
            data = workspace.data;
            workspaceAccess = {
                workspaceOwnerId: workspace.workspaceOwnerId,
                role: workspace.role,
                permissions: workspace.permissions,
                staff: workspace.staff
            };
            localStorage.setItem(storageKey(user.id), JSON.stringify(data));
            localStorage.setItem(`${storageKey(user.id)}:access`, JSON.stringify(workspaceAccess));
            translateStaticUI();
            render();
            const storageNote = document.querySelector(".storage-note");
            if (storageNote) storageNote.textContent = t("welcome.database");
            if (workspace.staffLoadError) showToast(`${t("toast.staffLoadError")} ${workspace.staffLoadError}`);
            if (new URLSearchParams(location.hash.slice(1)).get("type") === "invite"
                || new URLSearchParams(location.search).get("type") === "invite") openTeacherPasswordForm();
        } catch (workspaceError) {
            console.error("Could not load the teacher workspace from Supabase.", workspaceError);
            showToast(`${t("toast.databaseLoadError")} ${workspaceError.message}`);
        }
    } catch (error) {
        console.error("Could not load the signed-in user profile.", error);
        updateUserIdentity(null);
        data = loadData();
        workspaceAccess = { workspaceOwnerId: null, permissions: ownerPermissions, staff: [] };
        translateStaticUI();
        render();
        showToast(t("profile.loadError"));
    }
}

function closePopover() {
    document.getElementById("popoverRoot").innerHTML = "";
    document.querySelectorAll(".popover-trigger, .profile-trigger").forEach((button) => button.setAttribute("aria-expanded", "false"));
    openPopover = "";
}

function openPopoverAt(button, content, kind) {
    if (openPopover === kind) {
        closePopover();
        return;
    }
    closePopover();
    const root = document.getElementById("popoverRoot");
    root.innerHTML = `<section class="popover-panel" role="dialog" aria-label="${escapeHtml(t(kind === "profile" ? "profile.title" : `${kind}.title`))}">${content}</section>`;
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
    panel.querySelector("[data-popover-action='login']")?.addEventListener("click", () => { window.location.assign("login.html"); });
}

function showUserMenu(button) {
    const metadata = currentUser?.user_metadata || {};
    const name = [metadata.first_name || metadata.firstName, metadata.last_name || metadata.lastName].filter(Boolean).join(" ")
        || metadata.full_name || metadata.name || currentUser?.email || t("profile.signedOut");
    const identity = currentUser?.email
        ? `<div class="popover-email">${escapeHtml(currentUser.email)}</div>`
        : `<div class="popover-email">${t("profile.notSignedIn")}</div>`;
    const action = currentUser
        ? `<button class="popover-action danger" type="button" data-popover-action="logout"><span aria-hidden="true">↪</span>${t("profile.logout")}</button>`
        : `<button class="popover-action" type="button" data-popover-action="login"><span aria-hidden="true">→</span>${t("profile.login")}</button>`;
    openPopoverAt(button, `<div class="popover-user"><span class="avatar">${escapeHtml(initialsFor(name))}</span><div><strong>${escapeHtml(name)}</strong><small>${t("teacher.role")}</small></div></div>${identity}<div class="popover-divider"></div>${action}`, "profile");
}

function initialsFor(name) {
    return String(name).split(/[\s@._-]+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toLocaleUpperCase() || "—";
}

async function signOut() {
    if (!window.supabaseClient) {
        console.error("Supabase is not configured; cannot sign out.");
        showToast(t("profile.logoutError"));
        return;
    }
    try {
        const { error } = await window.supabaseClient.auth.signOut();
        if (error) throw error;
        currentUser = null;
        closePopover();
        window.location.assign("login.html");
    } catch (error) {
        console.error("Could not sign out of the current account.", error);
        showToast(t("profile.logoutError"));
    }
}

function showNotifications(button) {
    openPopoverAt(button, `<div class="popover-heading"><span class="notification-mark"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></svg></span><div><strong>${t("header.notifications")}</strong><small>${t("notifications.empty")}</small></div></div><p class="popover-copy">${t("notifications.description")}</p>`, "notifications");
}

function className(classId) {
    return data.classes.find((item) => item.id === classId)?.name || t("class.noClass");
}

function lessonClassIds(lesson) {
    if (Array.isArray(lesson.classIds)) return lesson.classIds;
    return lesson.classId ? [lesson.classId] : [];
}

function lessonClassNames(lesson) {
    return lessonClassIds(lesson).map(className).join(", ") || t("class.noClass");
}

function inferLessonUnit(lesson, classes = data.classes) {
    const assignedClasses = lessonClassIds(lesson).map((id) => classes.find((item) => item.id === id)).filter(Boolean);
    const source = [...assignedClasses.map((item) => `${item.name} ${item.course}`), lesson.title || ""].join(" ");
    return source.match(/\b(A1|A2|B1|B2)\b/i)?.[1].toUpperCase() || "A1";
}

function lessonText(key, values = {}) {
    const labels = {
        ua: {
            description: "Створюйте уроки, розкладайте їх за рівнями, а потім призначайте класам.",
            unit: "Рівень уроку",
            unitEmpty: "Поки без уроків",
            noUnit: "У цьому рівні поки немає уроків.",
            levelDescription: "Навчальна програма та уроки рівня {level}.",
            courseLabel: "НАВЧАЛЬНИЙ КУРС",
            levelLessons: "Уроки",
            unassigned: "Не призначено класу",
            noSearch: "За вашим запитом уроків не знайдено.",
            chooseUnit: "Виберіть рівень",
            classLater: "Клас можна призначити після створення уроку."
        },
        ru: {
            description: "Создавайте уроки, распределяйте их по уровням, а затем назначайте классам.",
            unit: "Уровень урока",
            unitEmpty: "Пока без уроков",
            noUnit: "На этом уровне пока нет уроков.",
            levelDescription: "Учебная программа и уроки уровня {level}.",
            courseLabel: "УЧЕБНЫЙ КУРС",
            levelLessons: "Уроки",
            unassigned: "Не назначен классу",
            noSearch: "По вашему запросу уроков не найдено.",
            chooseUnit: "Выберите уровень",
            classLater: "Класс можно назначить после создания урока."
        },
        en: {
            description: "Create lessons, organize them by level, then assign them to classes.",
            unit: "Lesson level",
            unitEmpty: "No lessons yet",
            noUnit: "There are no lessons at this level yet.",
            levelDescription: "Course content and lessons for level {level}.",
            courseLabel: "LEARNING COURSE",
            levelLessons: "Lessons",
            unassigned: "Not assigned to a class",
            noSearch: "No lessons match your search.",
            chooseUnit: "Choose a level",
            classLater: "You can assign a class after creating the lesson."
        }
    };
    return labels[currentLanguage][key].replace(/\{(\w+)\}/g, (_, name) => String(values[name] ?? ""));
}

function assignmentText(key) {
    const labels = {
        ua: { add: "＋ Додати до класу", dialog: "Додати урок до класів", hint: "Виберіть один або кілька класів для цього уроку.", save: "Зберегти призначення", saved: "Призначення уроку оновлено." },
        ru: { add: "＋ Добавить в класс", dialog: "Добавить урок в классы", hint: "Выберите один или несколько классов для этого урока.", save: "Сохранить назначение", saved: "Назначение урока обновлено." },
        en: { add: "＋ Assign to class", dialog: "Assign lesson to classes", hint: "Choose one or more classes for this lesson.", save: "Save assignment", saved: "Lesson assignment updated." }
    };
    return labels[currentLanguage][key];
}

function classAssignmentChoices(selectedIds) {
    if (!data.classes.length) return emptyMessage(t("empty.noClasses"), t("empty.createClass"));
    return data.classes.map((group) => `<label class="class-choice"><input type="checkbox" name="classIds" value="${escapeHtml(group.id)}" ${selectedIds.includes(group.id) ? "checked" : ""}><span>${escapeHtml(group.name)}</span></label>`).join("");
}

function countLabel(count, entity) {
    const forms = {
        ua: { student: ["учень", "учні", "учнів"], activity: ["завдання", "завдання", "завдань"], block: ["блок", "блоки", "блоків"], lesson: ["урок", "уроки", "уроків"] },
        ru: { student: ["ученик", "ученика", "учеников"], activity: ["задание", "задания", "заданий"], block: ["блок", "блока", "блоков"], lesson: ["урок", "урока", "уроков"] },
        en: { student: ["student", "students", "students"], activity: ["activity", "activities", "activities"], block: ["block", "blocks", "blocks"], lesson: ["lesson", "lessons", "lessons"] }
    }[currentLanguage][entity];
    const lastTwo = count % 100;
    if (currentLanguage === "en") return `${count} ${forms[count === 1 ? 0 : 1]}`;
    if (lastTwo >= 11 && lastTwo <= 14) return `${count} ${forms[2]}`;
    const last = count % 10;
    return `${count} ${forms[last === 1 ? 0 : last >= 2 && last <= 4 ? 1 : 2]}`;
}

function safeHttpUrl(value) {
    if (!value) return "";
    try {
        const url = new URL(value);
        return url.protocol === "https:" || url.protocol === "http:" ? url.href : "";
    } catch {
        return "";
    }
}

function formatCourse(course) {
    const match = course.match(/^(?:словацкий|словацька|slovak|slovenčina)\s*[·.-]\s*(a1|b1)$/i);
    return match ? t(`course.slovak${match[1].toUpperCase()}`) : course;
}

function setView(view) {
    if (view === "staff" && !hasPermission("manage_teachers")) return;
    if (view === "classes" && !hasPermission("view_classes_students") && !hasPermission("manage_classes_students")) return;
    if (view === "students" && !hasPermission("view_classes_students") && !hasPermission("manage_classes_students")) return;
    if (view === "lessons" && !hasPermission("view_assign_lessons") && !hasPermission("edit_lessons")) return;
    stopLiveProgressSubscription();
    lessonWorkspaceMode = "";
    workspaceLessonId = "";
    editingLessonId = null;
    editorReturnToPreview = false;
    draftSections = [];
    draftHomeworkSections = [];
    previewActivityEdit = null;
    activeLessonSectionId = "";
    activeView = view;
    document.getElementById("breadcrumb").textContent = view === "staff" ? staffText("title") : t(`page.${view}`);
    document.querySelectorAll(".nav-item").forEach((button) => button.classList.toggle("active", button.dataset.view === view));
    document.getElementById("sidebar").classList.remove("open");
    render();
}

function render() {
    if (lessonWorkspaceMode) {
        renderLessonWorkspace();
        return;
    }
    const renderers = { overview: renderOverview, classes: renderClasses, lessons: renderLessons, students: renderStudents, staff: renderStaff };
    pageContent.innerHTML = renderers[activeView]();
    bindPageActions();
    enhanceSelects(pageContent);
}

function enhanceSelects(root) {
    root.querySelectorAll("select:not(.teacher-select-native)").forEach((select) => {
        const wrapper = document.createElement("div");
        wrapper.className = "teacher-select";
        const id = `teacher-select-${++selectDropdownSequence}`;
        const trigger = document.createElement("button");
        trigger.type = "button";
        trigger.className = "select-trigger";
        trigger.setAttribute("aria-haspopup", "listbox");
        trigger.setAttribute("aria-expanded", "false");
        trigger.setAttribute("aria-controls", `${id}-options`);
        const associatedLabel = select.labels?.[0]?.textContent.trim();
        const accessibleName = select.getAttribute("aria-label") || associatedLabel;
        if (accessibleName) trigger.setAttribute("aria-label", accessibleName);
        const label = document.createElement("span");
        label.className = "select-trigger-label";
        const chevron = document.createElement("span");
        chevron.className = "select-chevron";
        chevron.setAttribute("aria-hidden", "true");
        chevron.textContent = "⌄";
        trigger.append(label, chevron);

        const listbox = document.createElement("div");
        listbox.className = "select-options";
        listbox.id = `${id}-options`;
        listbox.setAttribute("role", "listbox");
        if (accessibleName) listbox.setAttribute("aria-label", accessibleName);

        const syncSelection = () => {
            const selectedOption = select.options[select.selectedIndex];
            label.textContent = selectedOption?.textContent || "";
            listbox.querySelectorAll('[role="option"]').forEach((option, index) => {
                const isSelected = index === select.selectedIndex;
                option.setAttribute("aria-selected", String(isSelected));
                option.classList.toggle("selected", isSelected);
            });
        };

        Array.from(select.options).forEach((option, index) => {
            const item = document.createElement("button");
            item.type = "button";
            item.className = "select-option";
            item.tabIndex = -1;
            item.setAttribute("role", "option");
            item.setAttribute("aria-selected", String(index === select.selectedIndex));
            item.textContent = option.textContent;
            item.disabled = option.disabled;
            item.addEventListener("click", () => {
                select.selectedIndex = index;
                syncSelection();
                closeSelectDropdown();
                select.dispatchEvent(new Event("change", { bubbles: true }));
                trigger.focus();
            });
            listbox.append(item);
        });

        const openListbox = () => {
            if (activeSelectDropdown === wrapper) {
                closeSelectDropdown();
                return;
            }
            closeSelectDropdown();
            activeSelectDropdown = wrapper;
            wrapper.classList.add("open");
            trigger.setAttribute("aria-expanded", "true");
            const spaceBelow = window.innerHeight - wrapper.getBoundingClientRect().bottom;
            const spaceAbove = wrapper.getBoundingClientRect().top;
            listbox.classList.toggle("opens-up", spaceBelow < Math.min(listbox.scrollHeight, 240) && spaceAbove > spaceBelow);
            listbox.querySelector('[aria-selected="true"]:not(:disabled), [role="option"]:not(:disabled)')?.focus();
        };

        trigger.addEventListener("click", openListbox);
        trigger.addEventListener("keydown", (event) => {
            if (event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                if (activeSelectDropdown !== wrapper) openListbox();
                else listbox.querySelector('[aria-selected="true"]:not(:disabled), [role="option"]:not(:disabled)')?.focus();
            }
        });
        listbox.addEventListener("keydown", (event) => {
            const enabledOptions = Array.from(listbox.querySelectorAll('[role="option"]:not(:disabled)'));
            const currentIndex = enabledOptions.indexOf(document.activeElement);
            let nextIndex = currentIndex;
            if (event.key === "ArrowDown") nextIndex = Math.min(currentIndex + 1, enabledOptions.length - 1);
            else if (event.key === "ArrowUp") nextIndex = Math.max(currentIndex - 1, 0);
            else if (event.key === "Home") nextIndex = 0;
            else if (event.key === "End") nextIndex = enabledOptions.length - 1;
            else if (event.key === "Escape") {
                event.preventDefault();
                closeSelectDropdown();
                trigger.focus();
                return;
            } else if (event.key === "Tab") {
                closeSelectDropdown();
                return;
            } else return;
            event.preventDefault();
            enabledOptions[nextIndex]?.focus();
        });

        select.classList.add("teacher-select-native");
        select.tabIndex = -1;
        select.setAttribute("aria-hidden", "true");
        select.parentNode.insertBefore(wrapper, select);
        wrapper.append(trigger, listbox, select);
        syncSelection();
    });
}

function closeSelectDropdown() {
    if (!activeSelectDropdown) return;
    activeSelectDropdown.classList.remove("open");
    activeSelectDropdown.querySelector(".select-trigger").setAttribute("aria-expanded", "false");
    activeSelectDropdown = null;
}

function lessonSectionText(key) {
    const labels = {
        ua: { intro: "Вступ", newSection: "Новий розділ", addSection: "＋ Додати розділ", section: "Розділи уроку", rename: "Назва розділу", remove: "Видалити", previous: "← Назад", next: "Далі →", moveUp: "Перемістити вище", moveDown: "Перемістити нижче", moveBlock: "Перетягніть, щоб перемістити блок", addElement: "＋ Додати новий елемент", copyElement: "▣ Копіювати елемент", edit: "Редагувати", done: "Готово", back: "До уроків", save: "Зберегти урок", create: "Створити урок", empty: "У цьому розділі ще немає елементів.", confirmRemove: "Видалити розділ разом з його елементами?", lessonTab: "Урок", editorTab: "Редагування", workspaceMode: "Режим уроку", homework: "Домашня робота", homeworkSections: "Розділи домашньої роботи", homeworkActivities: "Завдання домашньої роботи", currentLesson: "Поточний урок", copyFromLesson: "Копіювати завдання з уроку", dragCopyHint: "Перетягніть або натисніть завдання, щоб скопіювати його сюди.", dropCopyHint: "Перетягніть завдання сюди", noSourceActivities: "У цьому уроці поки немає завдань для копіювання.", liveHint: "Відповіді учнів оновлюються в реальному часі.", liveClass: "Клас", liveConnect: "Підключення до відповідей…", liveReady: "Підключено · відповіді оновлюються", liveOffline: "Увійдіть у кабінет викладача, щоб бачити відповіді в реальному часі.", liveError: "Не вдалося підключитися до відповідей.", liveNoClass: "Урок ще не призначений жодному класу.", liveNoPermission: "У вас немає доступу до відповідей учнів.", liveNoStudents: "У цьому класі поки немає учнів.", liveAnswers: "Відповіді учнів", liveWait: "Поки немає відповіді", liveDraft: "Чернетка", liveSubmitted: "Надіслано", liveUnsaved: "Зміни редактора ще не збережені. Учні бачать останню збережену версію." },
        ru: { intro: "Введение", newSection: "Новый раздел", addSection: "＋ Добавить раздел", section: "Разделы урока", rename: "Название раздела", remove: "Удалить", previous: "← Назад", next: "Далее →", moveUp: "Переместить выше", moveDown: "Переместить ниже", moveBlock: "Перетащите, чтобы переместить задание", addElement: "＋ Добавить новый элемент", copyElement: "▣ Копировать элемент", edit: "Редактировать", done: "Готово", back: "К урокам", save: "Сохранить урок", create: "Создать урок", empty: "В этом разделе пока нет элементов.", confirmRemove: "Удалить раздел вместе с его элементами?", lessonTab: "Урок", editorTab: "Редактирование", workspaceMode: "Режим урока", homework: "Домашняя работа", homeworkSections: "Разделы домашней работы", homeworkActivities: "Задания домашней работы", currentLesson: "Текущий урок", copyFromLesson: "Копировать задания из урока", dragCopyHint: "Перетащите или нажмите задание, чтобы скопировать его сюда.", dropCopyHint: "Перетащите задание сюда", noSourceActivities: "В этом уроке пока нет заданий для копирования.", liveHint: "Ответы учеников обновляются в реальном времени.", liveClass: "Класс", liveConnect: "Подключение к ответам…", liveReady: "Подключено · ответы обновляются", liveOffline: "Войдите в кабинет преподавателя, чтобы видеть ответы в реальном времени.", liveError: "Не удалось подключиться к ответам.", liveNoClass: "Урок ещё не назначен ни одному классу.", liveNoPermission: "У вас нет доступа к ответам учеников.", liveNoStudents: "В этом классе пока нет учеников.", liveAnswers: "Ответы учеников", liveWait: "Пока нет ответа", liveDraft: "Черновик", liveSubmitted: "Отправлено", liveUnsaved: "Изменения редактора ещё не сохранены. Ученики видят последнюю сохранённую версию." },
        en: { intro: "Introduction", newSection: "New section", addSection: "＋ Add section", section: "Lesson sections", rename: "Section name", remove: "Delete", previous: "← Back", next: "Next →", moveUp: "Move up", moveDown: "Move down", moveBlock: "Drag to move this activity", addElement: "＋ Add new item", copyElement: "▣ Duplicate item", edit: "Edit", done: "Done", back: "Back to lessons", save: "Save lesson", create: "Create lesson", empty: "This section has no items yet.", confirmRemove: "Delete this section and its items?", lessonTab: "Lesson", editorTab: "Edit", workspaceMode: "Lesson mode", homework: "Homework", homeworkSections: "Homework sections", homeworkActivities: "Homework activities", currentLesson: "Current lesson", copyFromLesson: "Copy activities from a lesson", dragCopyHint: "Drag or click an activity to copy it here.", dropCopyHint: "Drop an activity here", noSourceActivities: "This lesson has no activities to copy yet.", liveHint: "Student answers update in real time.", liveClass: "Class", liveConnect: "Connecting to answers…", liveReady: "Connected · answers update live", liveOffline: "Sign in to the teacher dashboard to see live answers.", liveError: "Could not connect to student answers.", liveNoClass: "This lesson is not assigned to a class yet.", liveNoPermission: "You do not have access to student answers.", liveNoStudents: "There are no students in this class yet.", liveAnswers: "Student answers", liveWait: "No answer yet", liveDraft: "Draft", liveSubmitted: "Submitted", liveUnsaved: "Editor changes are not saved yet. Students see the last saved version." }
    };
    return labels[currentLanguage][key];
}

const liveStudentLabels = {
    ua: {
        selector: "Показувати відповіді учня",
        answer: "Відповідь учня",
        correctAnswer: "Правильна відповідь",
        noCorrectAnswer: "Еталонну відповідь не задано",
        count: "{answered}/{total} відповідей",
        noActivities: "Немає завдань із відповідями"
    },
    ru: {
        selector: "Показывать ответы ученика",
        answer: "Ответ ученика",
        correctAnswer: "Правильный ответ",
        noCorrectAnswer: "Эталонный ответ не задан",
        count: "{answered}/{total} ответов",
        noActivities: "Нет заданий с ответами"
    },
    en: {
        selector: "Show answers for",
        answer: "Student answer",
        correctAnswer: "Correct answer",
        noCorrectAnswer: "No reference answer set",
        count: "{answered}/{total} answers",
        noActivities: "No answer activities"
    }
};

function liveStudentText(key, values = {}) {
    const text = liveStudentLabels[currentLanguage]?.[key] || liveStudentLabels.ru[key];
    return text.replace(/\{(\w+)\}/g, (_, name) => String(values[name] ?? ""));
}

function normalizeLessonSections(lesson) {
    if (Array.isArray(lesson.sections) && lesson.sections.length) {
        return lesson.sections.map((section, index) => ({
            id: String(section.id || `section-${index + 1}`),
            title: String(section.title || `${lessonSectionText("newSection")} ${index + 1}`),
            activities: Array.isArray(section.activities) ? section.activities : []
        }));
    }
    const activities = Array.isArray(lesson.activities) ? lesson.activities : [];
    return [{ id: "section-intro", title: lessonSectionText("intro"), activities }];
}

function normalizeHomeworkSections(lesson) {
    if (!Array.isArray(lesson.homeworkSections)) return [];
    return lesson.homeworkSections.map((section, index) => ({
        id: String(section.id || `homework-section-${index + 1}`),
        title: String(section.title || `${lessonSectionText("homework")} ${index + 1}`),
        activities: Array.isArray(section.activities) ? section.activities : []
    }));
}

function normalizePreviewHomeworkSections(lesson) {
    const sections = normalizeHomeworkSections(lesson);
    return sections.length ? sections : [{
        id: "homework-empty",
        title: lessonSectionText("homework"),
        activities: []
    }];
}

function lessonActivities(lesson) {
    if (Array.isArray(lesson.activities)) return lesson.activities;
    if (Array.isArray(lesson.sections)) {
        return lesson.sections.flatMap((section) => Array.isArray(section.activities) ? section.activities : []);
    }
    return [];
}

function activeDraftSections() {
    return lessonWorkspaceTab === "homework" ? draftHomeworkSections : draftSections;
}

function activeWorkspaceSectionId() {
    return lessonWorkspaceTab === "homework" ? activeHomeworkSectionId : activeLessonSectionId;
}

function setActiveWorkspaceSectionId(sectionId) {
    if (lessonWorkspaceTab === "homework") activeHomeworkSectionId = sectionId;
    else activeLessonSectionId = sectionId;
}

function activeDraftSection() {
    const sections = activeDraftSections();
    return sections.find((section) => section.id === activeWorkspaceSectionId()) || sections[0];
}

function setLanguage(language) {
    if (!translations[language]) return;
    currentLanguage = language;
    localStorage.setItem("siteLanguage", language);
    closePopover();
    updateUserIdentity(currentUser);
    document.documentElement.lang = language === "ua" ? "uk" : language;
    document.title = `SlovaSofi · ${t("pageTitle")}`;
    translateStaticUI();
    render();
    if (!modalBackdrop.hidden && refreshModal) {
        const getFieldKey = (element, index) => element.name || element.id || (element.dataset.field ? `${element.closest(".builder-block")?.dataset.blockIndex}:${element.dataset.field}` : `field-${index}`);
        const values = new Map([...modalCard.querySelectorAll("input, textarea, select")].map((element, index) => [
            getFieldKey(element, index),
            { value: element.value, checked: "checked" in element ? element.checked : undefined }
        ]));
        refreshModal();
        modalCard.querySelectorAll("input, textarea, select").forEach((element, index) => {
            const saved = values.get(getFieldKey(element, index));
            if (saved) {
                element.value = saved.value;
                if (saved.checked !== undefined) element.checked = saved.checked;
            }
        });
    }
}

function translateStaticUI() {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
        element.textContent = t(element.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
        element.setAttribute("aria-label", t(element.dataset.i18nAria));
    });
    document.querySelectorAll(".language-button").forEach((button) => {
        button.classList.toggle("active", button.dataset.lang === currentLanguage);
        button.setAttribute("aria-pressed", button.dataset.lang === currentLanguage ? "true" : "false");
    });
    document.getElementById("breadcrumb").textContent = activeView === "staff" ? staffText("title") : t(`page.${activeView}`);
    const staffNav = document.querySelector(".staff-nav-item");
    staffNav.hidden = !hasPermission("manage_teachers");
    staffNav.querySelector("[data-staff-nav]").textContent = staffText("nav");
    document.querySelectorAll('[data-i18n="teacher.role"]').forEach((element) => {
        element.textContent = workspaceAccess.role === "admin" ? roleLabels.admin[currentLanguage] : t("teacher.role");
    });
    document.querySelector('[data-view="classes"]').hidden = !hasPermission("view_classes_students") && !hasPermission("manage_classes_students");
    document.querySelector('[data-view="students"]').hidden = !hasPermission("view_classes_students") && !hasPermission("manage_classes_students");
    document.querySelector('[data-view="lessons"]').hidden = !hasPermission("view_assign_lessons") && !hasPermission("edit_lessons");
    document.getElementById("menuToggle").setAttribute("aria-label", t("menu.open"));
    document.title = `SlovaSofi · ${t("pageTitle")}`;
}

function renderOverview() {
    const studentCount = data.classes.reduce((total, item) => total + item.students.length, 0);
    const recentLessons = [...data.lessons].slice(-3).reverse();
    const featuredClasses = data.classes.slice(0, 3);
    const profileMetadata = currentUser?.user_metadata || {};
    const firstName = profileMetadata.first_name || profileMetadata.firstName;
    const profileName = [firstName, profileMetadata.last_name || profileMetadata.lastName].filter(Boolean).join(" ") || profileMetadata.full_name || profileMetadata.name || currentUser?.email || t("profile.signedOut");
    const initials = [firstName, profileMetadata.last_name || profileMetadata.lastName].filter(Boolean).map((part) => part[0]).join("").toLocaleUpperCase() || initialsFor(profileName);
    const roleLabel = workspaceAccess.role === "admin" ? roleLabels.admin[currentLanguage] : t("teacher.role");
    return `<section class="profile-hero"><div class="profile-identity"><span class="profile-avatar">${escapeHtml(initials)}</span><div><span class="eyebrow">✦ ${t("welcome.badge")}</span><h1 id="welcomeHeading">${t("welcome.title", { name: firstName || profileName })}</h1><p>${escapeHtml(currentUser?.email || t("profile.notSignedIn"))}</p></div></div><div class="profile-role">${roleLabel}</div></section>
        <div class="profile-welcome"><div><h2>${t("profile.dashboardTitle")}</h2><p>${t("profile.dashboardHint")}</p><span class="storage-note">${t("welcome.storage")}</span></div>${hasPermission("edit_lessons") ? `<button class="button" data-action="new-lesson">${t("action.createLesson")}</button>` : ""}</div>
        <div class="stats-grid profile-stats">
            <article class="stat-card"><span class="stat-icon">▣</span><span>${t("stat.classes")}</span><strong>${data.classes.length}</strong></article>
            <article class="stat-card"><span class="stat-icon blue">♧</span><span>${t("stat.students")}</span><strong>${studentCount}</strong></article>
            <article class="stat-card"><span class="stat-icon orange">▤</span><span>${t("stat.lessons")}</span><strong>${data.lessons.length}</strong></article>
        </div>
        <div class="overview-grid">
            <section class="panel"><div class="panel-heading"><div><h2>${t("overview.recent")}</h2><p class="hint">${t("overview.recentHint")}</p></div><button class="text-link" data-view-link="lessons">${t("overview.allLessons")}</button></div>
                <div class="lesson-list">${recentLessons.length ? recentLessons.map((lesson) => lessonRow(lesson)).join("") : emptyMessage(t("lessons.notFound"), t("lessons.notFoundHint"))}</div>
            </section>
            <section class="panel"><div class="panel-heading"><div><h2>${t("overview.yourClasses")}</h2><p class="hint">${t("overview.groups")}</p></div><button class="text-link" data-view-link="classes">${t("overview.allClasses")}</button></div>
                <div class="class-preview">${featuredClasses.length ? featuredClasses.map((item) => `<div class="class-mini"><span class="class-dot"></span><div><strong>${escapeHtml(item.name)}</strong><small>${countLabel(item.students.length, "student")} · ${escapeHtml(formatCourse(item.course))}</small></div></div>`).join("") : emptyMessage(t("empty.noClasses"), t("empty.createClass"))}</div>
            </section>
        </div>`;
}

function renderClasses() {
    const canManageClasses = hasPermission("manage_classes_students");
    const filtered = data.classes.filter((item) => `${item.name} ${item.course}`.toLowerCase().includes(searchQuery.toLowerCase()));
    const metadata = currentUser?.user_metadata || {};
    const teacherName = [metadata.first_name || metadata.firstName, metadata.last_name || metadata.lastName].filter(Boolean).join(" ")
        || metadata.full_name || metadata.name || currentUser?.email || t("profile.signedOut");
    return `<div class="section-heading"><div><h1>${t("classes.title")}</h1><p>${t("classes.description")}</p></div></div>
        <div class="toolbar">${canManageClasses ? `<button class="button secondary" data-action="new-class">${t("classes.create")}</button>` : ""}<input type="search" data-search placeholder="${t("classes.search")}" value="${escapeHtml(searchQuery)}" aria-label="${t("classes.search")}"></div>
        <div class="card-grid class-grid">${filtered.length ? filtered.map((item, index) => `<article class="class-card class-card-enhanced class-tone-${index % 4}" data-open-class-id="${escapeHtml(item.id)}">
            ${canManageClasses ? `<div class="card-actions"><button class="mini-action" data-action="edit-class" data-id="${escapeHtml(item.id)}" aria-label="${t("modal.editClass")}">✎</button><button class="mini-action" data-action="delete-class" data-id="${escapeHtml(item.id)}" aria-label="${t("action.delete")}">×</button></div>` : ""}
            <div class="class-card-top"><span class="class-card-avatar">${escapeHtml(item.name.slice(0, 2).toUpperCase())}</span><span class="class-course-pill">${escapeHtml(formatCourse(item.course))}</span></div><h3><button type="button" class="class-card-title" data-action="class-lessons" data-id="${escapeHtml(item.id)}">${escapeHtml(item.name)}</button></h3>
            <div class="class-teacher-line"><span class="class-person-icon" aria-hidden="true">♙</span><span><small>${t("classes.teacherLabel")}</small><strong>${escapeHtml(item.teacherName || teacherName)}</strong></span></div>
            <div class="class-roster"><div class="class-roster-heading"><strong>${t("classes.studentsLabel")}</strong><span>${item.students.length}</span></div>
                ${item.students.length ? `<ul class="class-roster-list">${item.students.map((student) => `<li><span class="class-student-avatar">${escapeHtml(student.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toLocaleUpperCase())}</span><span>${escapeHtml(student)}</span></li>`).join("")}</ul>` : `<p class="class-roster-empty">${t("classes.noStudents")}</p>`}
            </div>
            <div class="class-card-meta">${hasPermission("view_assign_lessons") || hasPermission("edit_lessons") ? `<button class="text-link" data-action="class-lessons" data-id="${escapeHtml(item.id)}">${t("classes.lessons")}</button>` : ""}</div>
            ${canManageClasses ? `<button class="button secondary small class-invite-button" data-action="invite-student" data-id="${escapeHtml(item.id)}">${t("classes.inviteStudent")}</button>` : ""}</article>`).join("") : emptyMessage(t("classes.notFound"), t("classes.notFoundHint"))}</div>`;
}

function renderLessons() {
    const canEditLessons = hasPermission("edit_lessons");
    const canAssignLessons = hasPermission("view_assign_lessons");
    const filtered = data.lessons.filter((item) => (!activeClassFilter || lessonClassIds(item).includes(activeClassFilter))
        && `${item.title} ${item.unit} ${lessonClassNames(item)}`.toLowerCase().includes(searchQuery.toLowerCase()));
    const classSelect = `<option value="">${t("lessons.allClasses")}</option>${data.classes.map((item) => `<option value="${escapeHtml(item.id)}" ${activeClassFilter === item.id ? "selected" : ""}>${escapeHtml(item.name)}</option>`).join("")}`;
    const selectedLevelLessons = filtered.filter((item) => (item.unit || inferLessonUnit(item)) === selectedLessonUnit);
    const sectionHeading = selectedLessonUnit
        ? `<div class="lesson-breadcrumb"><button class="text-link" type="button" data-action="back-to-units">${t("lessons.title")}</button><span aria-hidden="true">›</span><strong>${selectedLessonUnit}</strong></div>`
        : "";
    return `${sectionHeading}<div class="section-heading"><div><h1>${selectedLessonUnit || t("lessons.title")}</h1><p>${selectedLessonUnit ? lessonText("levelDescription", { level: selectedLessonUnit }) : lessonText("description")}</p></div>${canEditLessons ? `<button class="button" data-action="new-lesson">${t("lessons.add")}</button>` : ""}</div>
        <div class="toolbar"><select data-class-filter aria-label="${t("lessons.allClasses")}">${classSelect}</select><input type="search" data-search placeholder="${t("lessons.search")}" value="${escapeHtml(searchQuery)}" aria-label="${t("lessons.search")}"></div>
        ${selectedLessonUnit ? `<section class="course-hero course-hero-${selectedLessonUnit.toLowerCase()}"><div class="course-hero-art" aria-hidden="true"><span>${selectedLessonUnit}</span></div><div class="course-hero-copy"><span class="course-hero-kicker">${lessonText("courseLabel")}</span><h2>${selectedLessonUnit}</h2><p>${lessonText("levelDescription", { level: selectedLessonUnit })}</p><span class="course-hero-count">${countLabel(selectedLevelLessons.length, "lesson")}</span></div></section>
            <div class="course-lessons-heading"><h2>${lessonText("levelLessons")}</h2><span>${selectedLevelLessons.length}</span></div>
            <div class="course-lesson-list">${selectedLevelLessons.length ? selectedLevelLessons.map((item) => `<article class="course-lesson-row">${lessonIcon(item)}<div class="lesson-main"><button class="lesson-preview-link" data-action="preview-lesson" data-id="${escapeHtml(item.id)}">${escapeHtml(item.title)}</button><small>${escapeHtml(lessonClassNames(item)) || lessonText("unassigned")} · ${countLabel(lessonActivities(item).length, "activity")}</small></div><div class="course-lesson-actions"><button class="mini-action course-action-preview" data-action="preview-lesson" data-id="${escapeHtml(item.id)}" aria-label="${previewText("open")}" title="${previewText("open")}">↗</button>${canEditLessons ? `<button class="mini-action" data-action="edit-lesson" data-id="${escapeHtml(item.id)}" aria-label="${t("modal.editLesson")}" title="${t("modal.editLesson")}">✎</button>` : ""}${canAssignLessons ? `<button class="mini-action" data-action="assign-lesson" data-id="${escapeHtml(item.id)}" aria-label="${assignmentText("add")}" title="${assignmentText("add")}">⌁</button>` : ""}${canEditLessons ? `<button class="mini-action" data-action="delete-lesson" data-id="${escapeHtml(item.id)}" aria-label="${t("action.delete")}" title="${t("action.delete")}">×</button>` : ""}</div></article>`).join("") : emptyMessage(data.lessons.length ? lessonText("noSearch") : t("lessons.notFound"), data.lessons.length ? "" : t("lessons.notFoundHint"))}</div>`
            : `<div class="unit-sections">${LESSON_UNITS.map((unit) => {
                const unitLessons = filtered.filter((item) => (item.unit || inferLessonUnit(item)) === unit);
                return `<button type="button" class="unit-card unit-card-link unit-card-${unit.toLowerCase()}" data-unit-open="${unit}"><span class="unit-card-mark">${unit}</span><span class="unit-card-copy"><strong>${unit}</strong><small>${unitLessons.length ? countLabel(unitLessons.length, "lesson") : lessonText("unitEmpty")}</small></span><span class="unit-card-chevron" aria-hidden="true">→</span></button>`;
            }).join("")}</div>${filtered.length ? "" : emptyMessage(data.lessons.length ? lessonText("noSearch") : t("lessons.notFound"), data.lessons.length ? "" : t("lessons.notFoundHint"))}`}`;
}

function renderStudents() {
    const canManageClasses = hasPermission("manage_classes_students");
    const students = data.classes.flatMap((item) => item.students.map((name, index) => ({ name, className: item.name, id: `${item.id}-${index}` })));
    const filtered = students.filter((student) => `${student.name} ${student.className}`.toLowerCase().includes(searchQuery.toLowerCase()));
    return `<div class="section-heading"><div><h1>${t("students.title")}</h1><p>${t("students.description")}</p></div>${canManageClasses ? `<button class="button secondary" data-view-link="classes">${t("students.manage")}</button>` : ""}</div>
        <div class="toolbar"><span class="hint" style="color:#d7e9dd">${t("students.total", { count: students.length })}</span><input type="search" data-search placeholder="${t("students.search")}" value="${escapeHtml(searchQuery)}" aria-label="${t("students.search")}"></div>
        <div class="student-list">${filtered.length ? filtered.map((student) => `<div class="student-row"><span class="avatar">${escapeHtml(student.name.split(" ").map((part) => part[0]).join("").slice(0, 2))}</span><div><strong>${escapeHtml(student.name)}</strong><small>${t("students.role")}</small></div><span class="class-label">${escapeHtml(student.className)}</span></div>`).join("") : emptyMessage(t("students.notFound"), t("students.notFoundHint"))}</div>`;
}

function renderStaff() {
    const members = workspaceAccess.staff || [];
    return `<div class="section-heading"><div><h1>${staffText("title")}</h1><p>${staffText("description")}</p></div><button class="button" data-action="add-teacher">${staffText("add")}</button></div>
        <div class="staff-grid">
            ${members.length ? members.map((member) => `<article class="staff-card"><span class="avatar">${escapeHtml(initialsFor(member.email))}</span><div class="staff-card-main"><strong>${escapeHtml(member.email)}</strong><small>${staffText("memberRole")}</small><span class="staff-permissions">${permissionLabels.filter(([key]) => member.permissions?.[key]).map(([, label]) => staffText(label)).join(" · ") || staffText("noEditor")}</span></div>
                <div class="staff-card-actions"><button type="button" class="button secondary small" data-action="edit-teacher" data-id="${escapeHtml(member.id)}">${staffText("edit")}</button><button type="button" class="mini-action" data-action="remove-teacher" data-id="${escapeHtml(member.id)}" aria-label="${staffText("remove")}" title="${staffText("remove")}">×</button></div></article>`).join("") : emptyMessage(staffText("empty"), staffText("emptyHint"))}
        </div>`;
}

function openTeacherForm(member = null) {
    const initialPermissions = member?.permissions || {};
    const isEditing = Boolean(member);
    const permissionInputs = permissionLabels.map(([key, label]) => `<label class="staff-permission-choice"><input type="checkbox" name="permission_${key}" data-permission-key="${key}" ${initialPermissions[key] ? "checked" : ""}><span>${staffText(label)}</span></label>`).join("");
    openModal(`${modalHeader(staffText(isEditing ? "editTitle" : "inviteTitle"))}
        <form id="teacherInviteForm">
            <div class="form-field"><label for="teacherInviteEmail">${staffText("email")}</label><input id="teacherInviteEmail" name="email" type="email" required maxlength="254" autocomplete="email" value="${escapeHtml(member?.email || "")}" ${isEditing ? "readonly" : ""}></div>
            <div class="form-field"><span class="staff-field-label">${staffText("role")}</span><div class="staff-role-value">${staffText("teacher")}</div></div>
            <fieldset class="staff-permission-field"><legend>${staffText("permissions")}</legend>${permissionInputs}</fieldset>
            <div class="modal-actions"><button type="button" class="button secondary" data-close>${staffText("cancel")}</button><button class="button" type="submit">${staffText(isEditing ? "save" : "invite")}</button></div>
        </form>`);
    refreshModal = () => openTeacherForm(member);
    modalCard.querySelectorAll("[data-close]").forEach((button) => button.addEventListener("click", closeModal));
    modalCard.querySelector("#teacherInviteForm").addEventListener("submit", async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const permissions = Object.fromEntries(permissionLabels.map(([key]) => [
            key,
            form.querySelector(`[data-permission-key="${key}"]`).checked
        ]));
        const submitButton = form.querySelector('[type="submit"]');
        submitButton.disabled = true;
        try {
            await window.teacherWorkspaceApi.manageTeacher(window.supabaseClient, {
                action: isEditing ? "update" : "invite",
                ...(isEditing ? { memberId: member.id } : { email: String(new FormData(form).get("email")).trim().toLowerCase() }),
                permissions
            });
            const workspace = await window.teacherWorkspaceApi.loadWorkspace(window.supabaseClient, currentUser.id);
            data = workspace.data;
            workspaceAccess = {
                workspaceOwnerId: workspace.workspaceOwnerId,
                role: workspace.role,
                permissions: workspace.permissions,
                staff: workspace.staff
            };
            localStorage.setItem(storageKey(currentUser.id), JSON.stringify(data));
            closeModal();
            translateStaticUI();
            render();
            showToast(staffText(isEditing ? "updated" : "added"));
        } catch (error) {
            console.error("Could not update teacher workspace access.", error);
            showToast(`${staffText("error")} ${error.message}`);
            submitButton.disabled = false;
        }
    });
}

function openTeacherPasswordForm() {
    openModal(`${modalHeader(staffText("passwordTitle"))}
        <form id="teacherPasswordForm">
            <p class="assignment-hint">${staffText("passwordHint")}</p>
            <div class="form-field"><label for="teacherPassword">${staffText("password")}</label><input id="teacherPassword" type="password" minlength="8" autocomplete="new-password" required></div>
            <div class="modal-actions"><button class="button" type="submit">${staffText("setPassword")}</button></div>
        </form>`);
    modalCard.querySelector("#teacherPasswordForm").addEventListener("submit", async (event) => {
        event.preventDefault();
        const button = event.currentTarget.querySelector('[type="submit"]');
        button.disabled = true;
        const { error } = await window.supabaseClient.auth.updateUser({
            password: modalCard.querySelector("#teacherPassword").value
        });
        if (error) {
            console.error("Could not set the invited teacher's password.", error);
            showToast(`${staffText("error")} ${error.message}`);
            button.disabled = false;
            return;
        }
        const cleanUrl = new URL(location.href);
        cleanUrl.searchParams.delete("type");
        cleanUrl.hash = "";
        history.replaceState(null, "", `${cleanUrl.pathname}${cleanUrl.search}`);
        closeModal();
        showToast(staffText("updated"));
    });
}

async function removeTeacher(memberId) {
    const member = workspaceAccess.staff.find((item) => item.id === memberId);
    if (!member || !window.confirm(staffText("removeConfirm", { email: member.email }))) return;
    try {
        await window.teacherWorkspaceApi.manageTeacher(window.supabaseClient, { action: "remove", memberId });
        const workspace = await window.teacherWorkspaceApi.loadWorkspace(window.supabaseClient, currentUser.id);
        data = workspace.data;
        workspaceAccess = {
            workspaceOwnerId: workspace.workspaceOwnerId,
            role: workspace.role,
            permissions: workspace.permissions,
            staff: workspace.staff
        };
        localStorage.setItem(storageKey(currentUser.id), JSON.stringify(data));
        render();
        showToast(staffText("removed"));
    } catch (error) {
        console.error("Could not remove teacher workspace access.", error);
        showToast(`${staffText("error")} ${error.message}`);
    }
}

function lessonIcon(lesson) {
    const activity = activityTypes.find((item) => item.id === lessonActivities(lesson)[0]?.type);
    return `<span class="lesson-symbol">${activity?.icon || "▤"}</span>`;
}

function lessonRow(lesson) {
    return `<div class="lesson-row">${lessonIcon(lesson)}<div class="lesson-main"><button class="lesson-preview-link" data-action="preview-lesson" data-id="${escapeHtml(lesson.id)}">${escapeHtml(lesson.title)}</button><small>${lesson.unit || inferLessonUnit(lesson)} · ${escapeHtml(lessonClassNames(lesson))}</small></div><span class="lesson-count">${countLabel(lessonActivities(lesson).length, "activity")}</span></div>`;
}

const previewLabels = {
    ua: { open: "Відкрити урок", practice: "Спробуйте виконати завдання. Результати тут не зберігаються.", check: "Перевірити", correct: "Правильно!", incorrect: "Спробуйте ще раз.", noAnswer: "Для цього завдання ще не вказано правильну відповідь.", typeAnswer: "Введіть відповідь", choose: "Виберіть відповідь", drop: "Перетягніть або натисніть слова сюди", bank: "Слова", answer: "Ваше речення", up: "Вище", down: "Нижче", flip: "Перевернути картку", empty: "У цьому уроці поки немає блоків.", imageError: "Не вдалося завантажити зображення.", mediaError: "Перевірте посилання на медіафайл.", readOnly: "Навчальний матеріал", true: "Так", false: "Ні" },
    ru: { open: "Открыть урок", practice: "Попробуйте выполнить задания. Результаты здесь не сохраняются.", check: "Проверить", correct: "Верно!", incorrect: "Попробуйте ещё раз.", noAnswer: "Для этого задания ещё не указан правильный ответ.", typeAnswer: "Введите ответ", choose: "Выберите ответ", drop: "Перетащите или нажмите слова сюда", bank: "Слова", answer: "Ваш ответ", up: "Выше", down: "Ниже", flip: "Перевернуть карточку", empty: "В этом уроке пока нет блоков.", imageError: "Не удалось загрузить изображение.", mediaError: "Проверьте ссылку на медиафайл.", readOnly: "Учебный материал", true: "Да", false: "Нет" },
    en: { open: "Open lesson", practice: "Try the activities. Your results are not saved here.", check: "Check answer", correct: "Correct!", incorrect: "Try again.", noAnswer: "No correct answer has been set for this activity.", typeAnswer: "Type your answer", choose: "Choose an answer", drop: "Drag or click words here", bank: "Words", answer: "Your answer", up: "Move up", down: "Move down", flip: "Flip card", empty: "This lesson has no activities yet.", imageError: "The image could not be loaded.", mediaError: "Check the media link.", readOnly: "Learning material", true: "True", false: "False" }
};

function previewText(key) {
    return previewLabels[currentLanguage][key];
}

function previewTokens(value) {
    return String(value || "").split(/\s*\/\s*|\r?\n/).map((part) => part.trim()).filter(Boolean);
}

function previewLines(value) {
    return String(value || "").split(/\r?\n/).map((part) => part.trim()).filter(Boolean);
}

function previewMediaUrl(value) {
    const source = String(value || "").trim();
    if (!source) return "";
    try {
        const url = new URL(source, window.location.href);
        return ["https:", "http:", "file:"].includes(url.protocol) ? url.href : "";
    } catch {
        return "";
    }
}

function renderPreviewActivity(activity, index, canEdit = false, quickEditing = false, liveAnswerMarkup = "") {
    const type = activity.type;
    const prompt = escapeHtml(activity.prompt || t(activityTypes.find((item) => item.id === type)?.nameKey || "activity.task"));
    const content = String(activity.content || "");
    const contentMatchesPrompt = Boolean(activity.prompt?.trim())
        && content.trim().replace(/\s+/g, " ").toLocaleLowerCase() === activity.prompt.trim().replace(/\s+/g, " ").toLocaleLowerCase();
    const displayContent = contentMatchesPrompt ? "" : content;
    const answer = String(activity.answer || "").trim();
    const lines = previewLines(content);
    let body = "";
    let checkable = true;

    if (quickEditing) {
        const activityType = activityTypes.find((item) => item.id === type);
        const hasAnswer = !["text", "image", "video", "audio"].includes(type);
        return `<article class="preview-activity preview-activity-editable preview-activity-editing" data-preview-activity="${index}" data-preview-type="${escapeHtml(type)}" data-preview-answer="${escapeHtml(answer)}" data-preview-content="${escapeHtml(content)}">
            <header class="preview-activity-header"><h3>${index + 1}. ${prompt}</h3><div class="preview-activity-actions">
                <button class="mini-action" type="button" data-save-preview-block aria-label="${lessonSectionText("done")}" title="${lessonSectionText("done")}">✓</button>
                <button class="mini-action preview-activity-delete" type="button" data-cancel-preview-edit aria-label="${t("action.cancel")}" title="${t("action.cancel")}">×</button>
            </div></header>
            <div class="preview-inline-editor">
                <div class="form-field"><label>${t("field.instruction")}</label><input data-preview-field="prompt" value="${escapeHtml(activity.prompt || "")}" placeholder="${t("field.instructionExample")}"></div>
                <div class="form-field"><label>${activityType?.category === "media" ? t("field.mediaContent") : t("field.taskText")} <span class="hint">${escapeHtml(contentHint(type))}</span></label><textarea data-preview-field="content" placeholder="${escapeHtml(contentPlaceholder(type))}">${escapeHtml(activity.content || "")}</textarea></div>
                ${hasAnswer ? `<div class="form-field"><label>${t("field.answer")} <span class="hint">${escapeHtml(answerHint(type))}</span></label><input data-preview-field="answer" value="${escapeHtml(activity.answer || "")}" placeholder="${escapeHtml(answerPlaceholder(type))}"></div>` : ""}
            </div>
        </article>`;
    }

    if (type === "drag-words") {
        const expected = answer ? previewTokens(answer) : content.trim().split(/\s+/).filter(Boolean);
        const tokens = expected.map((word, wordIndex) => ({ word, wordIndex }));
        if (tokens.length > 1) tokens.push(tokens.shift());
        body = `<div class="preview-drag-layout"><div><strong>${previewText("bank")}</strong><div class="preview-word-bank" data-word-bank>${tokens.map(({ word, wordIndex }) => `<button type="button" class="preview-word" draggable="true" data-word-index="${wordIndex}">${escapeHtml(word)}</button>`).join("")}</div></div><div><strong>${previewText("answer")}</strong><div class="preview-dropzone" data-dropzone tabindex="0"><span class="preview-drop-hint">${previewText("drop")}</span></div></div></div>`;
        if (!expected.length) checkable = false;
    } else if (type === "fill-blank") {
        let blankIndex = 0;
        const parts = content.split("___");
        body = `<p class="preview-instruction">${parts.map((part, partIndex) => `${escapeHtml(part)}${partIndex < parts.length - 1 ? `<input class="preview-inline-input" data-answer-index="${blankIndex++}" aria-label="${previewText("typeAnswer")}" autocomplete="off">` : ""}`).join("")}</p>`;
    } else if (type === "multiple-choice" || type === "one-of-many" || type === "true-false") {
        const options = type === "true-false" ? [previewText("true"), previewText("false")] : lines;
        const statement = type === "true-false" && displayContent ? `<p class="preview-instruction">${escapeHtml(displayContent)}</p>` : "";
        body = `${statement}<div class="preview-options">${options.map((option, optionIndex) => `<label class="preview-option"><input type="radio" name="preview-${index}" value="${optionIndex}"><span>${escapeHtml(option)}</span></label>`).join("")}</div>`;
        if (!answer) checkable = false;
    } else if (type === "order-items" || type === "sentence-order") {
        const items = lines.map((line, itemIndex) => ({ text: line.replace(/^\d+[.)]\s*/, ""), itemIndex }));
        if (items.length > 1) items.reverse();
        body = `<ol class="preview-order-list" data-order-list>${items.map(({ text, itemIndex }) => `<li class="preview-order-item" draggable="true" data-order-index="${itemIndex}"><span>${escapeHtml(text)}</span><span class="preview-order-actions"><button type="button" data-move="up" aria-label="${previewText("up")}">↑</button><button type="button" data-move="down" aria-label="${previewText("down")}">↓</button></span></li>`).join("")}</ol>`;
    } else if (type === "columns") {
        const pairs = lines.map((line) => line.split(":").map((part) => part.trim())).filter((pair) => pair.length >= 2 && pair[0] && pair[1]);
        const categories = [...new Set(pairs.map(([category]) => category))];
        body = `${pairs.length ? `<div class="preview-match-list">${pairs.map(([, item], itemIndex) => `<label class="preview-match-row"><span>${escapeHtml(item)}</span><select data-column-index="${itemIndex}" aria-label="${previewText("choose")}"><option value="">${previewText("choose")}</option>${categories.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join("")}</select></label>`).join("")}</div>` : displayContent ? `<p class="preview-material">${escapeHtml(displayContent)}</p>` : ""}`;
        if (!pairs.length) checkable = false;
    } else if (type === "match") {
        const pairs = lines.map((line) => line.split("=").map((part) => part.trim())).filter((pair) => pair.length >= 2 && pair[0] && pair[1]);
        body = `${pairs.length ? `<div class="preview-match-list">${pairs.map(([left], pairIndex) => `<label class="preview-match-row"><span>${escapeHtml(left)}</span><select data-match-index="${pairIndex}" aria-label="${previewText("choose")}"><option value="">${previewText("choose")}</option>${pairs.map(([, right], rightIndex) => `<option value="${rightIndex}">${escapeHtml(right)}</option>`).join("")}</select></label>`).join("")}</div>` : displayContent ? `<p class="preview-material">${escapeHtml(displayContent)}</p>` : ""}`;
        if (!pairs.length) checkable = false;
    } else if (type === "open-answer") {
        body = `${displayContent ? `<p class="preview-material">${escapeHtml(displayContent)}</p>` : ""}<textarea class="preview-text-answer" data-open-answer placeholder="${previewText("typeAnswer")}"></textarea>`;
        if (!answer) checkable = false;
    } else if (type === "flashcards") {
        body = `<div class="preview-flashcards">${lines.map((line) => { const [front, ...back] = line.split(":"); return `<button type="button" class="preview-flashcard" data-front="${escapeHtml(front.trim())}" data-back="${escapeHtml(back.join(":").trim())}"><strong>${escapeHtml(front.trim())}</strong><small>${previewText("flip")}</small></button>`; }).join("") || `<p class="preview-material">${escapeHtml(displayContent)}</p>`}</div>`;
        checkable = false;
    } else if (type === "image") {
        const markdownImage = content.match(/!\[([^\]]*)\]\(([^)]+)\)/);
        const source = previewMediaUrl(markdownImage?.[2] || content);
        body = `${source ? `<img class="preview-image" src="${escapeHtml(source)}" alt="${escapeHtml(markdownImage?.[1] || activity.prompt || "")}" data-preview-image>` : `<p class="preview-material">${escapeHtml(displayContent || previewText("imageError"))}</p>`}`;
        checkable = false;
    } else if (type === "audio" || type === "video") {
        const source = previewMediaUrl(content);
        body = `${source ? `<${type} class="preview-media" controls preload="metadata" data-preview-media><source src="${escapeHtml(source)}"></${type}>` : `<p class="preview-material">${escapeHtml(displayContent || previewText("mediaError"))}</p>`}`;
        checkable = false;
    } else if (type === "table") {
        let blankIndex = 0;
        const rows = lines.map((line) => line.split(/\t|\s*\|\s*/).map((cell) => cell.trim()));
        body = `<div class="preview-table-wrap"><table class="preview-table"><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell.split("___").map((part, partIndex, parts) => `${escapeHtml(part)}${partIndex < parts.length - 1 ? `<input class="preview-inline-input" data-table-answer-index="${blankIndex++}" aria-label="${previewText("typeAnswer")}" autocomplete="off">` : ""}`).join("")}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
        checkable = blankIndex > 0;
    } else if (type === "text") {
        body = displayContent ? `<div class="preview-material">${escapeHtml(displayContent).replace(/\n/g, "<br>")}</div>` : "";
        checkable = false;
    } else {
        body = displayContent ? `<div class="preview-material">${escapeHtml(displayContent).replace(/\n/g, "<br>")}</div>` : "";
        checkable = false;
    }

    return `<article class="preview-activity ${canEdit ? "preview-activity-editable" : ""}" data-preview-activity="${index}" data-preview-type="${escapeHtml(type)}" data-preview-answer="${escapeHtml(answer)}" data-preview-content="${escapeHtml(content)}"><header class="preview-activity-header">${canEdit ? `<button type="button" class="preview-activity-drag" aria-label="${lessonSectionText("moveBlock")}" title="${lessonSectionText("moveBlock")}">⠿</button>` : ""}<h3>${index + 1}. ${prompt}</h3>${canEdit ? `<div class="preview-activity-actions"><button class="mini-action" type="button" data-edit-preview-block="${index}" aria-label="${lessonSectionText("edit")}" title="${lessonSectionText("edit")}">✎</button><button class="mini-action preview-activity-delete" type="button" data-delete-preview-block="${index}" aria-label="${lessonSectionText("remove")}" title="${lessonSectionText("remove")}">×</button></div>` : ""}</header>${body}${checkable ? `<button class="button preview-check" type="button" data-check-activity>${previewText("check")}</button><p class="preview-result" data-preview-result aria-live="polite"></p>` : ""}${liveAnswerMarkup}</article>`;
}

function openLessonPreview(id) {
    const lesson = data.lessons.find((item) => item.id === id);
    if (!lesson) return;
    stopLiveProgressSubscription();
    activeView = "lessons";
    document.getElementById("breadcrumb").textContent = t("page.lessons");
    document.querySelectorAll(".nav-item").forEach((button) => button.classList.toggle("active", button.dataset.view === "lessons"));
    lessonWorkspaceMode = "preview";
    workspaceLessonId = id;
    editingLessonId = null;
    editorReturnToPreview = false;
    lessonWorkspaceTab = "lesson";
    const assignedClassIds = lessonClassIds(lesson);
    monitorClassId = assignedClassIds.includes(activeClassFilter) ? activeClassFilter : assignedClassIds[0] || "";
    previewActivityEdit = null;
    activeLessonSectionId = normalizeLessonSections(lesson)[0].id;
    activeHomeworkSectionId = normalizePreviewHomeworkSections(lesson)[0].id;
    render();
}

function bindSortableActivityCards(container, cardSelector, handleSelector, indexAttribute, onReorder) {
    activityBlockDragController?.abort();
    const controller = new AbortController();
    activityBlockDragController = controller;
    const { signal } = controller;
    let dragStart = null;
    let draggedCard = null;

    container.querySelectorAll(handleSelector).forEach((handle) => handle.addEventListener("pointerdown", (event) => {
        if (event.button !== 0) return;
        const card = handle.closest(cardSelector);
        if (!card) return;
        dragStart = {
            pointerId: event.pointerId,
            x: event.clientX,
            y: event.clientY,
            card,
            order: [...container.querySelectorAll(cardSelector)].map((item) => Number(item.dataset[indexAttribute]))
        };
        handle.setPointerCapture(event.pointerId);
    }, { signal }));

    document.addEventListener("pointermove", (event) => {
        if (!dragStart || dragStart.pointerId !== event.pointerId) return;
        if (!draggedCard && Math.hypot(event.clientX - dragStart.x, event.clientY - dragStart.y) > 5) {
            draggedCard = dragStart.card;
            draggedCard.classList.add("is-dragging");
        }
        if (!draggedCard) return;
        event.preventDefault();
        const cards = [...container.querySelectorAll(cardSelector)];
        const target = document.elementFromPoint(event.clientX, event.clientY)?.closest(cardSelector);
        if (target && target !== draggedCard && container.contains(target)) {
            const bounds = target.getBoundingClientRect();
            animateActivityCardMove(container, cardSelector, draggedCard, target, event.clientY > bounds.top + bounds.height / 2);
            cards.forEach((card) => card.classList.toggle("is-drop-target", card === target));
        } else {
            const bounds = container.getBoundingClientRect();
            if (event.clientY >= bounds.top && event.clientY <= bounds.bottom && cards.length) {
                const last = cards[cards.length - 1];
                if (event.clientY > last.getBoundingClientRect().bottom && last !== draggedCard) {
                    animateActivityCardMove(container, cardSelector, draggedCard, last, true);
                    last.classList.add("is-drop-target");
                }
            }
        }
    }, { signal });

    const finishDrag = (event, cancelled = false) => {
        if (!dragStart || dragStart.pointerId !== event.pointerId) return;
        const finalOrder = [...container.querySelectorAll(cardSelector)].map((item) => Number(item.dataset[indexAttribute]));
        const changed = finalOrder.some((index, position) => index !== dragStart.order[position]);
        const shouldRender = Boolean(draggedCard);
        dragStart = null;
        draggedCard = null;
        if (changed && !cancelled) onReorder(finalOrder);
        else if (shouldRender) render();
    };
    document.addEventListener("pointerup", (event) => finishDrag(event), { signal });
    document.addEventListener("pointercancel", (event) => finishDrag(event, true), { signal });
}

function animateActivityCardMove(container, cardSelector, movingCard, targetCard, insertAfter) {
    const cards = [...container.querySelectorAll(cardSelector)];
    const previousPositions = new Map(cards.map((card) => [card, card.getBoundingClientRect()]));
    container.insertBefore(movingCard, insertAfter ? targetCard.nextSibling : targetCard);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    for (const card of cards) {
        const previous = previousPositions.get(card);
        const next = card.getBoundingClientRect();
        const deltaX = previous.left - next.left;
        const deltaY = previous.top - next.top;
        if (deltaX || deltaY) {
            card.animate(
                [{ transform: `translate(${deltaX}px, ${deltaY}px)` }, { transform: "translate(0, 0)" }],
                { duration: 190, easing: "cubic-bezier(.2,.75,.25,1)" }
            );
        }
    }
}

async function savePreviewActivities(lesson, sectionId, activities, successMessage, isHomework = false) {
    if (!hasPermission("edit_lessons")) return;
    const sectionProperty = isHomework ? "homeworkSections" : "sections";
    const previousSections = lesson[sectionProperty];
    const previousActivities = lesson.activities;
    const originalSections = isHomework ? normalizeHomeworkSections(lesson) : normalizeLessonSections(lesson);
    const sections = originalSections.map((section) => ({
        ...section,
        activities: section.id === sectionId ? activities : [...section.activities]
    }));
    lesson[sectionProperty] = sections;
    if (!isHomework) lesson.activities = sections.flatMap((section) => section.activities);
    if (!persist()) {
        lesson[sectionProperty] = previousSections;
        lesson.activities = previousActivities;
        return false;
    }
    if (!await waitForWorkspaceSave()) {
        lesson[sectionProperty] = previousSections;
        lesson.activities = previousActivities;
        persist();
        return false;
    }
    previewActivityEdit = null;
    render();
    showToast(successMessage);
    return true;
}

function bindLessonPreviewActions(container = pageContent, lesson = null, section = null, isHomework = false) {
    if (lesson && section && hasPermission("edit_lessons")) {
        container.querySelectorAll("[data-edit-preview-block]").forEach((button) => button.addEventListener("click", () => {
            const activityIndex = Number(button.dataset.editPreviewBlock);
            const activity = section.activities[activityIndex];
            if (!activity) return;
            previewActivityEdit = {
                lessonId: lesson.id,
                sectionId: section.id,
                activityIndex,
                isHomework,
                draft: structuredClone(activity)
            };
            render();
            pageContent.querySelector('[data-preview-field="prompt"]')?.focus();
        }));
        container.querySelectorAll("[data-preview-field]").forEach((input) => input.addEventListener("input", () => {
            if (previewActivityEdit?.lessonId === lesson.id
                && previewActivityEdit.sectionId === section.id
                && previewActivityEdit.isHomework === isHomework) {
                previewActivityEdit.draft[input.dataset.previewField] = input.value;
            }
        }));
        container.querySelectorAll("[data-cancel-preview-edit]").forEach((button) => button.addEventListener("click", () => {
            previewActivityEdit = null;
            render();
        }));
        container.querySelectorAll("[data-save-preview-block]").forEach((button) => button.addEventListener("click", async () => {
            const edit = previewActivityEdit;
            if (!edit || edit.lessonId !== lesson.id || edit.sectionId !== section.id || edit.isHomework !== isHomework) return;
            const activities = section.activities.map((activity, index) =>
                index === edit.activityIndex ? structuredClone(edit.draft) : activity
            );
            button.disabled = true;
            const saved = await savePreviewActivities(lesson, section.id, activities, t("toast.activityUpdated"), isHomework);
            if (!saved && button.isConnected) button.disabled = false;
        }));
        container.querySelectorAll("[data-delete-preview-block]").forEach((button) => button.addEventListener("click", () => {
            if (!hasPermission("edit_lessons") || !window.confirm(t("confirm.deleteActivity"))) return;
            const activities = [...section.activities];
            activities.splice(Number(button.dataset.deletePreviewBlock), 1);
            savePreviewActivities(lesson, section.id, activities, t("toast.activityDeleted"), isHomework);
        }));
        const activityList = container.querySelector(".lesson-preview-list");
        if (activityList) bindSortableActivityCards(activityList, ".preview-activity", ".preview-activity-drag", "previewActivity", (order) => {
            const activities = order.map((index) => section.activities[index]);
            savePreviewActivities(lesson, section.id, activities, t("toast.activityOrderSaved"), isHomework);
        });
    }
    container.querySelectorAll("[data-check-activity]").forEach((button) => button.addEventListener("click", () => {
        const card = button.closest("[data-preview-activity]");
        const result = card.querySelector("[data-preview-result]");
        const answer = card.dataset.previewAnswer.trim();
        if (!answer && !["match", "columns"].includes(card.dataset.previewType)) {
            result.textContent = previewText("noAnswer");
            result.className = "preview-result";
            return;
        }
        const type = card.dataset.previewType;
        let correct = false;
        if (type === "drag-words") {
            const actual = Array.from(card.querySelectorAll("[data-dropzone] .preview-word"), (word) => word.textContent.trim());
            const expected = answer ? previewTokens(answer) : card.dataset.previewContent.trim().split(/\s+/).filter(Boolean);
            correct = actual.length === expected.length && actual.every((word, index) => word.toLocaleLowerCase() === expected[index].toLocaleLowerCase());
        } else if (type === "fill-blank") {
            const actual = Array.from(card.querySelectorAll("[data-answer-index]"), (input) => input.value.trim().toLocaleLowerCase());
            const expected = answer.split("/").map((part) => part.trim().toLocaleLowerCase());
            correct = actual.length === expected.length && actual.every((value, index) => value === expected[index]);
        } else if (type === "table") {
            const actual = Array.from(card.querySelectorAll("[data-table-answer-index]"), (input) => input.value.trim().toLocaleLowerCase());
            const expected = answer.split("/").map((part) => part.trim().toLocaleLowerCase());
            correct = actual.length === expected.length && actual.every((value, index) => value === expected[index]);
        } else if (type === "multiple-choice" || type === "one-of-many" || type === "true-false") {
            const selected = card.querySelector('input[type="radio"]:checked');
            const options = type === "true-false" ? [previewText("true"), previewText("false")] : previewLines(card.dataset.previewContent);
            const answerIndex = Number(answer);
            if (type === "true-false" && /^(true|yes|так|да)$/i.test(answer)) correct = selected?.value === "0";
            else if (type === "true-false" && /^(false|no|ні|нет)$/i.test(answer)) correct = selected?.value === "1";
            else {
                const expected = Number.isInteger(answerIndex) && answer !== "" ? options[answerIndex] : answer;
                correct = Boolean(selected && options[Number(selected.value)]?.toLocaleLowerCase() === expected.toLocaleLowerCase());
            }
        } else if (type === "order-items" || type === "sentence-order") {
            const actual = Array.from(card.querySelectorAll("[data-order-list] .preview-order-item"), (item) => item.querySelector("span").textContent.trim().toLocaleLowerCase());
            const sourceItems = previewLines(card.dataset.previewContent).map((line) => line.replace(/^\d+[.)]\s*/, "").toLocaleLowerCase());
            const expected = answer ? answer.split("/").map((part) => part.trim().toLocaleLowerCase()) : sourceItems;
            const normalizedExpected = expected.every((part) => /^\d+$/.test(part)) ? expected.map((part) => sourceItems[Number(part) - 1]) : expected;
            correct = actual.length === normalizedExpected.length && actual.every((value, index) => value === normalizedExpected[index]);
        } else if (type === "match") {
            const selects = Array.from(card.querySelectorAll("[data-match-index]"));
            correct = selects.length > 0 && selects.every((select, index) => select.value === String(index));
        } else if (type === "columns") {
            const expectedCategories = previewLines(card.dataset.previewContent).map((line) => line.split(":")[0]?.trim());
            const selects = Array.from(card.querySelectorAll("[data-column-index]"));
            correct = selects.length > 0 && selects.every((select, index) => select.value === expectedCategories[index]);
        } else if (type === "open-answer") {
            correct = card.querySelector("[data-open-answer]").value.trim().toLocaleLowerCase() === answer.toLocaleLowerCase();
        }
        result.textContent = correct ? previewText("correct") : previewText("incorrect");
        result.className = `preview-result ${correct ? "correct" : "incorrect"}`;
    }));

    container.querySelectorAll("[data-word-index]").forEach((word) => {
        word.addEventListener("click", () => movePreviewWord(word, word.closest("[data-word-bank]") ? "drop" : "bank"));
        word.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text/plain", word.dataset.wordIndex);
            event.dataTransfer.effectAllowed = "move";
        });
    });
    container.querySelectorAll("[data-dropzone], [data-word-bank]").forEach((target) => {
        target.addEventListener("dragover", (event) => event.preventDefault());
        target.addEventListener("drop", (event) => {
            event.preventDefault();
            const word = container.querySelector(`.preview-word[data-word-index="${event.dataTransfer.getData("text/plain")}"]`);
            if (word) movePreviewWord(word, target.hasAttribute("data-dropzone") ? "drop" : "bank");
        });
    });
    container.querySelectorAll("[data-move]").forEach((button) => button.addEventListener("click", () => {
        const item = button.closest(".preview-order-item");
        const sibling = button.dataset.move === "up" ? item.previousElementSibling : item.nextElementSibling;
        if (!sibling) return;
        if (button.dataset.move === "up") item.parentElement.insertBefore(item, sibling);
        else item.parentElement.insertBefore(sibling, item);
    }));
    container.querySelectorAll("[data-order-list] .preview-order-item").forEach((item) => {
        item.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text/plain", item.dataset.orderIndex);
            event.dataTransfer.effectAllowed = "move";
        });
        item.addEventListener("dragover", (event) => event.preventDefault());
        item.addEventListener("drop", (event) => {
            event.preventDefault();
            const moving = container.querySelector(`.preview-order-item[data-order-index="${event.dataTransfer.getData("text/plain")}"]`);
            if (moving && moving !== item) item.parentElement.insertBefore(moving, item);
        });
    });
    container.querySelectorAll(".preview-flashcard").forEach((card) => card.addEventListener("click", () => {
        const flipped = card.dataset.flipped === "true";
        card.dataset.flipped = String(!flipped);
        card.querySelector("strong").textContent = flipped ? card.dataset.front : (card.dataset.back || card.dataset.front);
        card.classList.toggle("flipped", !flipped);
    }));
    container.querySelectorAll("[data-preview-image]").forEach((image) => image.addEventListener("error", () => {
        image.replaceWith(Object.assign(document.createElement("p"), { className: "preview-material", textContent: previewText("imageError") }));
    }));
    container.querySelectorAll("[data-preview-media]").forEach((media) => media.addEventListener("error", () => {
        media.replaceWith(Object.assign(document.createElement("p"), { className: "preview-material", textContent: previewText("mediaError") }));
    }));
}

function movePreviewWord(word, target) {
    const destination = word.closest("[data-preview-activity]").querySelector(target === "drop" ? "[data-dropzone]" : "[data-word-bank]");
    const hint = destination.querySelector(".preview-drop-hint");
    if (hint) hint.remove();
    destination.append(word);
    const dropzone = destination.closest("[data-preview-activity]").querySelector("[data-dropzone]");
    if (!dropzone.querySelector(".preview-word")) dropzone.innerHTML = `<span class="preview-drop-hint">${previewText("drop")}</span>`;
}

function emptyMessage(title, description) {
    return `<div class="empty-state"><strong>${escapeHtml(title)}</strong>${escapeHtml(description)}</div>`;
}

function bindPageActions() {
    pageContent.querySelectorAll("[data-open-class-id]").forEach((card) => card.addEventListener("click", (event) => {
        if (event.target.closest("[data-action],button,a,input,select,textarea,[role='button']")) return;
        handleAction("class-lessons", card.dataset.openClassId);
    }));
    pageContent.querySelectorAll("[data-unit-open]").forEach((button) => button.addEventListener("click", () => {
        selectedLessonUnit = button.dataset.unitOpen;
        render();
    }));
    pageContent.querySelectorAll("[data-view-link]").forEach((button) => button.addEventListener("click", () => {
        activeClassFilter = "";
        if (button.dataset.viewLink === "lessons") selectedLessonUnit = "";
        setView(button.dataset.viewLink);
    }));
    pageContent.querySelectorAll("[data-action]").forEach((button) => button.addEventListener("click", () => handleAction(button.dataset.action, button.dataset.id)));
    pageContent.querySelectorAll("[data-search]").forEach((input) => input.addEventListener("input", () => {
        searchQuery = input.value;
        const start = input.selectionStart;
        render();
        const replacement = pageContent.querySelector("[data-search]");
        replacement?.focus();
        replacement?.setSelectionRange(start, start);
    }));
    pageContent.querySelector("[data-class-filter]")?.addEventListener("change", (event) => {
        activeClassFilter = event.target.value;
        render();
    });
}

function handleAction(action, id) {
    if (action === "back-to-units") {
        selectedLessonUnit = "";
        render();
        return;
    }
    if (action === "new-class") openClassEditor();
    if (action === "invite-student") openStudentInvite(data.classes.find((item) => item.id === id));
    if (action === "edit-class") openClassEditor(data.classes.find((item) => item.id === id));
    if (action === "delete-class") deleteClass(id);
    if (action === "class-lessons") {
        activeClassFilter = id;
        searchQuery = "";
        selectedLessonUnit = "";
        setView("lessons");
    }
    if (action === "new-lesson") openLessonEditor();
    if (action === "edit-lesson") openLessonEditor(data.lessons.find((item) => item.id === id));
    if (action === "preview-lesson") openLessonPreview(id);
    if (action === "assign-lesson") openLessonAssignment(id);
    if (action === "delete-lesson") deleteLesson(id);
    if (action === "add-teacher" && hasPermission("manage_teachers")) openTeacherForm();
    if (action === "edit-teacher" && hasPermission("manage_teachers")) {
        const member = workspaceAccess.staff.find((item) => item.id === id);
        if (member) openTeacherForm(member);
    }
    if (action === "remove-teacher" && hasPermission("manage_teachers")) removeTeacher(id);
}

function openModal(content, wide = false) {
    modalCard.classList.toggle("wide", wide);
    modalCard.innerHTML = content;
    modalBackdrop.hidden = false;
    modalCard.querySelector("input, textarea, select, button")?.focus();
    modalCard.querySelector("[data-close]")?.addEventListener("click", closeModal);
}

function closeModal() {
    modalBackdrop.hidden = true;
    modalCard.innerHTML = "";
    refreshModal = null;
}

function modalHeader(title) {
    return `<div class="modal-header"><h2 id="modalTitle">${escapeHtml(title)}</h2><button type="button" class="modal-close" data-close aria-label="${t("modal.close")}">×</button></div>`;
}

function openClassEditor(item) {
    if (!hasPermission("manage_classes_students")) return;
    const selectedStudents = item?.students.join(", ") || "";
    openModal(`${modalHeader(item ? t("modal.editClass") : t("modal.newClass"))}
        <form id="classForm">
            <div class="form-field"><label for="className">${t("field.className")}</label><input id="className" name="name" required maxlength="80" value="${escapeHtml(item?.name || "")}" placeholder="${t("field.exampleClass")}"></div>
            <div class="form-field"><label for="classCourse">${t("field.course")}</label><input id="classCourse" name="course" maxlength="80" value="${escapeHtml(item?.course || "")}" placeholder="${t("field.exampleCourse")}"></div>
            <div class="form-field"><label for="classStudents">${t("field.students")}</label><textarea id="classStudents" name="students" placeholder="${t("field.studentsPlaceholder")}">${escapeHtml(selectedStudents)}</textarea><span class="hint">${t("field.studentsHint")}</span></div>
            <div class="modal-actions"><button type="button" class="button secondary" data-close>${t("action.cancel")}</button><button class="button" type="submit">${item ? t("action.save") : t("action.createClass")}</button></div>
        </form>`);
    refreshModal = () => openClassEditor(item);
    modalCard.querySelectorAll("[data-close]").forEach((button) => button.addEventListener("click", closeModal));
    modalCard.querySelector("#classForm").addEventListener("submit", (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const name = String(form.get("name")).trim();
        if (!name) return;
        const updated = { id: item?.id || crypto.randomUUID(), teacherId: item?.teacherId || currentUser?.id, teacherName: item?.teacherName, name, course: String(form.get("course")).trim() || t("class.unnamedCourse"), students: String(form.get("students")).split(",").map((student) => student.trim()).filter(Boolean) };
        if (item) data.classes = data.classes.map((current) => current.id === item.id ? updated : current);
        else data.classes.push(updated);
        persist();
        closeModal();
        render();
        showToast(item ? t("toast.classUpdated") : t("toast.classCreated"));
    });
}

function openStudentInvite(group) {
    if (!group || !hasPermission("manage_classes_students")) return;
    openModal(`${modalHeader(t("studentInvite.title"))}
        <form id="studentInviteForm">
            <div class="block-tabs" role="tablist" aria-label="${t("studentInvite.title")}">
                <button class="block-tab active" type="button" role="tab" aria-selected="true" data-student-mode="new">${t("studentInvite.newMode")}</button>
                <button class="block-tab" type="button" role="tab" aria-selected="false" data-student-mode="existing">${t("studentInvite.existingMode")}</button>
            </div>
            <div data-student-fields="new">
                <div class="form-field"><label for="studentInviteName">${t("studentInvite.name")}</label><input id="studentInviteName" name="displayName" required maxlength="120" autocomplete="name"></div>
                <div class="form-field"><label for="studentInviteEmail">${t("studentInvite.email")}</label><input id="studentInviteEmail" name="email" type="email" required maxlength="254" autocomplete="email"></div>
                <p class="assignment-hint">${t("studentInvite.hint")}</p>
            </div>
            <div data-student-fields="existing" hidden>
                <div class="form-field"><label for="existingStudentSelect">${t("studentInvite.selectExisting")}</label>
                    <select id="existingStudentSelect" name="studentUserId" disabled><option value="">${t("studentInvite.loadingExisting")}</option></select>
                </div>
                <p class="assignment-hint">${t("studentInvite.existingHint")}</p>
                <p class="hint" data-existing-student-status>${t("studentInvite.loadingExisting")}</p>
            </div>
            <p class="assignment-hint">${t("studentInvite.targetClass", { name: escapeHtml(group.name) })}</p>
            <div class="modal-actions"><button type="button" class="button secondary" data-close>${t("action.cancel")}</button><button class="button" type="submit">${t("studentInvite.send")}</button></div>
        </form>`);
    refreshModal = () => openStudentInvite(group);
    modalCard.querySelectorAll("[data-close]").forEach((button) => button.addEventListener("click", closeModal));
    const formElement = modalCard.querySelector("#studentInviteForm");
    const nameInput = formElement.querySelector("#studentInviteName");
    const emailInput = formElement.querySelector("#studentInviteEmail");
    const existingSelect = formElement.querySelector("#existingStudentSelect");
    const existingStatus = formElement.querySelector("[data-existing-student-status]");
    const submitButton = formElement.querySelector('[type="submit"]');
    let mode = "new";
    formElement.querySelectorAll("[data-student-mode]").forEach((button) => button.addEventListener("click", () => {
        mode = button.dataset.studentMode;
        formElement.querySelectorAll("[data-student-mode]").forEach((tab) => {
            const selected = tab.dataset.studentMode === mode;
            tab.classList.toggle("active", selected);
            tab.setAttribute("aria-selected", String(selected));
        });
        formElement.querySelectorAll("[data-student-fields]").forEach((fields) => {
            fields.hidden = fields.dataset.studentFields !== mode;
        });
        nameInput.required = mode === "new";
        emailInput.required = mode === "new";
        existingSelect.required = mode === "existing" && !existingSelect.disabled;
        submitButton.textContent = t(mode === "new" ? "studentInvite.send" : "studentInvite.addExisting");
        submitButton.disabled = mode === "existing" && existingSelect.disabled;
    }));
    formElement.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (mode === "existing" && !existingSelect.value) {
            showToast(t("studentInvite.noExisting"));
            return;
        }
        const form = new FormData(event.currentTarget);
        const displayName = String(form.get("displayName")).trim();
        const email = String(form.get("email")).trim().toLowerCase();
        const studentUserId = String(form.get("studentUserId") || "");
        if (!currentUser || !window.teacherWorkspaceApi) {
            showToast(t("profile.login"));
            return;
        }
        submitButton.disabled = true;
        try {
            if (mode === "existing") {
                await window.teacherWorkspaceApi.addExistingStudent(window.supabaseClient, group.id, studentUserId);
            } else {
                await window.teacherWorkspaceApi.inviteStudent(window.supabaseClient, group.id, displayName, email);
            }
            const workspace = await window.teacherWorkspaceApi.loadWorkspace(window.supabaseClient, currentUser.id);
            data = workspace.data;
            workspaceAccess = {
                workspaceOwnerId: workspace.workspaceOwnerId,
                role: workspace.role,
                permissions: workspace.permissions,
                staff: workspace.staff
            };
            localStorage.setItem(storageKey(currentUser.id), JSON.stringify(data));
            localStorage.setItem(`${storageKey(currentUser.id)}:access`, JSON.stringify(workspaceAccess));
            closeModal();
            render();
            showToast(t(mode === "existing" ? "toast.studentAdded" : "toast.studentInvited"));
        } catch (error) {
            console.error("Could not update students in the selected class.", error);
            showToast(`${t(mode === "existing" ? "toast.studentAddError" : "toast.studentInviteError")} ${error.message}`);
            submitButton.disabled = false;
        }
    });
    if (!currentUser || !window.teacherWorkspaceApi) {
        existingStatus.textContent = t("profile.login");
        return;
    }
    window.teacherWorkspaceApi.listExistingStudents(window.supabaseClient).then((students) => {
        const currentMemberships = group.studentRecords || [];
        const currentStudentIds = new Set(currentMemberships.map((student) => student.linked_user_id).filter(Boolean));
        const currentLinkedEmails = new Set(currentMemberships
            .filter((student) => student.linked_user_id)
            .map((student) => student.email?.trim().toLowerCase())
            .filter(Boolean));
        const available = students.filter((student) => {
            const email = String(student.email || "").trim().toLowerCase();
            return !currentStudentIds.has(student.id) && !currentLinkedEmails.has(email);
        });
        existingSelect.innerHTML = `<option value="">${t("studentInvite.selectExisting")}</option>${available.map((student) => `<option value="${escapeHtml(student.id)}">${escapeHtml(student.displayName)} · ${escapeHtml(student.email)}</option>`).join("")}`;
        existingSelect.disabled = !available.length;
        existingStatus.textContent = available.length ? "" : students.length ? t("studentInvite.noneAvailable") : t("studentInvite.noExisting");
        existingSelect.required = mode === "existing" && Boolean(available.length);
        if (mode === "existing") submitButton.disabled = !available.length;
    }).catch((error) => {
        console.error("Could not load the existing student directory.", error);
        existingSelect.innerHTML = `<option value="">${t("studentInvite.noExisting")}</option>`;
        existingSelect.disabled = true;
        existingStatus.textContent = `${t("toast.studentListError")} ${error.message}`;
        if (mode === "existing") submitButton.disabled = true;
    });
}

function deleteClass(id) {
    if (!hasPermission("manage_classes_students")) return;
    const item = data.classes.find((current) => current.id === id);
    if (!item || !window.confirm(t("confirm.deleteClass", { name: item.name }))) return;
    data.classes = data.classes.filter((current) => current.id !== id);
    data.lessons = data.lessons.map((lesson) => ({ ...lesson, classIds: lessonClassIds(lesson).filter((classId) => classId !== id) }));
    persist();
    render();
    showToast(t("toast.classDeleted"));
}

function openLessonEditor(item, sectionId = "", activityIndex = -1, tab = "lesson") {
    if (!hasPermission("edit_lessons")) return;
    stopLiveProgressSubscription();
    activeView = "lessons";
    document.getElementById("breadcrumb").textContent = t("page.lessons");
    document.querySelectorAll(".nav-item").forEach((button) => button.classList.toggle("active", button.dataset.view === "lessons"));
    editingLessonId = item?.id || null;
    workspaceLessonId = item?.id || "";
    lessonWorkspaceMode = "edit";
    editorReturnToPreview = false;
    previewActivityEdit = null;
    lessonFormDraft = { title: item?.title || "", unit: item?.unit || selectedLessonUnit || inferLessonUnit(item || { title: "", classIds: [] }) };
    draftSections = item ? structuredClone(normalizeLessonSections(item)) : [{ id: crypto.randomUUID(), title: lessonSectionText("intro"), activities: [] }];
    const homeworkSections = item ? normalizeHomeworkSections(item) : [];
    draftHomeworkSections = homeworkSections.length
        ? structuredClone(homeworkSections)
        : [{ id: crypto.randomUUID(), title: lessonSectionText("homework"), activities: [] }];
    expandedActivityBlocks = new WeakSet();
    activeLessonSectionId = draftSections.some((section) => section.id === sectionId) ? sectionId : draftSections[0].id;
    activeHomeworkSectionId = draftHomeworkSections.some((section) => section.id === sectionId) ? sectionId : draftHomeworkSections[0].id;
    lessonWorkspaceTab = tab === "homework" ? "homework" : "lesson";
    homeworkSourceLessonId = "__current__";
    if (activityIndex >= 0) {
        const activity = draftSections.find((section) => section.id === activeLessonSectionId)?.activities[activityIndex];
        if (activity) expandedActivityBlocks.add(activity);
    }
    render();
    if (activityIndex >= 0) {
        const activityBlock = pageContent.querySelector(`.builder-block[data-block-index="${activityIndex}"]`);
        activityBlock?.scrollIntoView({ behavior: "smooth", block: "center" });
        activityBlock?.querySelector("[data-field]")?.focus({ preventScroll: true });
    }
}

function switchLessonWorkspaceMode(mode) {
    if (mode === "edit") {
        if (!hasPermission("edit_lessons")) return;
        const lesson = data.lessons.find((item) => item.id === workspaceLessonId);
        if (!lesson || lessonWorkspaceMode === "edit") return;
        if (editorReturnToPreview && editingLessonId === lesson.id) {
            stopLiveProgressSubscription();
            lessonWorkspaceMode = "edit";
            editorReturnToPreview = false;
            render();
            return;
        }
        openLessonEditor(lesson, lessonWorkspaceTab === "lesson" ? activeLessonSectionId : activeHomeworkSectionId, -1, lessonWorkspaceTab);
        return;
    }
    if (mode === "preview" && lessonWorkspaceMode === "edit" && workspaceLessonId) {
        stopLiveProgressSubscription();
        lessonWorkspaceMode = "preview";
        editorReturnToPreview = Boolean(editingLessonId);
        previewActivityEdit = null;
        render();
    }
}

function homeworkSourceActivities() {
    if (homeworkSourceLessonId === "__current__") {
        return draftSections.flatMap((section) => section.activities);
    }
    const sourceLesson = data.lessons.find((item) => item.id === homeworkSourceLessonId);
    return sourceLesson ? normalizeLessonSections(sourceLesson).flatMap((section) => section.activities) : [];
}

function copyHomeworkActivity(index) {
    const activity = homeworkSourceActivities()[index];
    const section = activeDraftSection();
    if (!activity || !section || lessonWorkspaceTab !== "homework") return;
    const copy = structuredClone(activity);
    if (copy.id) copy.id = crypto.randomUUID();
    section.activities.push(copy);
    expandedActivityBlocks.add(copy);
    render();
}

function bindHomeworkCopySource() {
    const sourceSelect = pageContent.querySelector("#homeworkSourceLesson");
    sourceSelect?.addEventListener("change", () => {
        homeworkSourceLessonId = sourceSelect.value;
        render();
    });
    pageContent.querySelectorAll("[data-homework-copy]").forEach((button) => {
        button.addEventListener("click", () => copyHomeworkActivity(Number(button.dataset.homeworkCopy)));
        button.addEventListener("dragstart", (event) => {
            event.dataTransfer.effectAllowed = "copy";
            event.dataTransfer.setData("text/plain", button.dataset.homeworkCopy);
            button.classList.add("is-dragging");
        });
        button.addEventListener("dragend", () => button.classList.remove("is-dragging"));
    });
    const dropZone = pageContent.querySelector("#homeworkCopyDropZone");
    dropZone?.addEventListener("dragover", (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
        dropZone.classList.add("is-drop-target");
    });
    dropZone?.addEventListener("dragleave", (event) => {
        if (!dropZone.contains(event.relatedTarget)) dropZone.classList.remove("is-drop-target");
    });
    dropZone?.addEventListener("drop", (event) => {
        event.preventDefault();
        dropZone.classList.remove("is-drop-target");
        const index = Number(event.dataTransfer.getData("text/plain"));
        if (Number.isInteger(index) && index >= 0) copyHomeworkActivity(index);
    });
}

function stopLiveProgressSubscription() {
    liveProgressGeneration += 1;
    const channel = liveProgressChannel;
    liveProgressChannel = null;
    liveProgressKey = "";
    liveProgressRows = new Map();
    liveProgressStatus = "idle";
    liveProgressError = "";
    if (channel && window.supabaseClient?.removeChannel) {
        window.supabaseClient.removeChannel(channel).then((status) => {
            if (status !== "ok") console.warn("The live-answer subscription did not close cleanly.", status);
        }).catch((error) => console.error("Could not close the live-answer subscription.", error));
    }
}

function applyLiveProgressEvent(rows, payload, classId) {
    if (payload.eventType === "DELETE") {
        const studentId = payload.old?.student_id;
        if (studentId) rows.delete(studentId);
        return;
    }
    const progress = payload.new;
    if (!progress?.student_id) return;
    if (progress.class_id !== classId) {
        rows.delete(progress.student_id);
        return;
    }
    rows.set(progress.student_id, progress);
}

function ensureLiveProgressSubscription(lesson, group) {
    const key = `${lesson.id}:${group.id}`;
    if (liveProgressKey === key) return;
    stopLiveProgressSubscription();
    const generation = liveProgressGeneration;
    liveProgressKey = key;
    liveProgressStatus = "connecting";
    const client = window.supabaseClient;
    const api = window.teacherWorkspaceApi;
    if (!currentUser || !client || !api) {
        liveProgressStatus = "error";
        liveProgressError = lessonSectionText("liveOffline");
        return;
    }

    let snapshotLoaded = false;
    let channelReady = false;
    let channelFailed = false;
    const bufferedEvents = [];
    const updateStatus = (status, error = "") => {
        if (generation !== liveProgressGeneration) return;
        liveProgressStatus = status;
        liveProgressError = error;
        render();
    };
    const handleEvent = (payload) => {
        if (generation !== liveProgressGeneration) return;
        if (!snapshotLoaded) {
            bufferedEvents.push(payload);
            return;
        }
        applyLiveProgressEvent(liveProgressRows, payload, group.id);
        render();
    };

    try {
        liveProgressChannel = api.subscribeLessonProgress(client, lesson.id, handleEvent, (status, error) => {
            if (generation !== liveProgressGeneration) return;
            if (status === "SUBSCRIBED") {
                channelReady = true;
                channelFailed = false;
                if (snapshotLoaded) updateStatus("ready");
            } else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT" || status === "CLOSED") {
                channelFailed = true;
                updateStatus("error", error?.message || status);
                console.error(`The live-answer subscription failed: ${status}.`, error || status);
            }
        });
    } catch (error) {
        liveProgressStatus = "error";
        liveProgressError = error.message || "";
        console.error("Could not subscribe to live student answers.", error);
        return;
    }

    api.loadLessonProgress(client, group.id, lesson.id).then((rows) => {
        if (generation !== liveProgressGeneration) return;
        liveProgressRows = new Map(rows.map((progress) => [progress.student_id, progress]));
        bufferedEvents.forEach((payload) => applyLiveProgressEvent(liveProgressRows, payload, group.id));
        bufferedEvents.length = 0;
        snapshotLoaded = true;
        if (channelReady) updateStatus("ready");
        else if (channelFailed) updateStatus("error", liveProgressError);
        else updateStatus("connecting");
    }).catch((error) => {
        if (generation !== liveProgressGeneration) return;
        liveProgressStatus = "error";
        liveProgressError = error.message || "";
        console.error("Could not load the current student answers.", error);
        render();
    });
}

function lessonProgressIndexes(lesson) {
    const indexes = new Map();
    let progressIndex = 0;
    const allSections = [...normalizeLessonSections(lesson), ...normalizeHomeworkSections(lesson)];
    allSections.forEach((section) => section.activities.forEach((activity, activityIndex) => {
        if (!activityTypes.some((type) => type.id === activity.type)) return;
        indexes.set(`${section.id}:${activityIndex}`, progressIndex);
        progressIndex += 1;
    }));
    return indexes;
}

function formatLiveResponse(activity, response) {
    if (Array.isArray(response)) {
        const values = response.map((item) => typeof item === "string" ? item.trim() : "");
        if (!values.some(Boolean)) return "";
        if (activity.type === "drag-words") return values.filter(Boolean).join(" ");
        if (activity.type === "order-items" || activity.type === "sentence-order") return values.filter(Boolean).join(" → ");
        if (activity.type === "match" || activity.type === "columns") {
            const labels = previewLines(activity.content).map((line) => line.split(activity.type === "match" ? "=" : ":").map((part) => part.trim()))
                .filter((parts) => parts.length >= 2 && parts[0] && parts[1])
                .map((parts) => activity.type === "match" ? parts[0] : parts[1]);
            return values.map((value, index) => `${labels[index] || index + 1} → ${value || "—"}`).join("\n");
        }
        return values.map((value) => value || "—").join(" · ");
    }
    if (typeof response !== "string") return "";
    const value = response.trim();
    if (!value) return "";
    if (activity.type === "true-false") {
        if (/^(true|yes|так|да)$/i.test(value)) return previewText("true");
        if (/^(false|no|ні|нет)$/i.test(value)) return previewText("false");
    }
    return value;
}

function formatLiveCorrectAnswer(activity) {
    const answer = String(activity.answer ?? "").trim();
    const expectedParts = previewTokens(answer);
    const contentLines = previewLines(activity.content);

    if (activity.type === "drag-words") return expectedParts.join(" ");
    if (activity.type === "fill-blank" || activity.type === "table") return expectedParts.join(" · ");
    if (activity.type === "multiple-choice" || activity.type === "one-of-many") {
        const answerIndex = Number(answer);
        return answer && Number.isInteger(answerIndex) && answerIndex >= 0 && answerIndex < contentLines.length
            ? contentLines[answerIndex]
            : answer;
    }
    if (activity.type === "true-false") {
        const normalized = answer.replace(/\s+/g, " ").toLocaleLowerCase();
        if (["true", "yes", "да", "так", "правда", "0"].includes(normalized)) return previewText("true");
        if (["false", "no", "нет", "ні", "неправда", "1"].includes(normalized)) return previewText("false");
        return answer;
    }
    if (activity.type === "order-items" || activity.type === "sentence-order") {
        const source = contentLines.map((line) => line.replace(/^\d+[.)]\s*/, ""));
        if (!expectedParts.length) return source.join(" → ");
        const numericOrder = expectedParts.every((part) => /^\d+$/.test(part));
        const order = numericOrder ? expectedParts.map((part) => Number(part) - 1) : [];
        return numericOrder && order.every((index) => index >= 0 && index < source.length)
            ? order.map((index) => source[index]).join(" → ")
            : expectedParts.join(" → ");
    }
    if (activity.type === "match") {
        const pairs = contentLines.map((line) => line.split("=").map((part) => part.trim()))
            .filter((pair) => pair.length >= 2 && pair[0] && pair[1]);
        return pairs.length ? pairs.map(([left, right]) => `${left} → ${right}`).join("\n") : answer;
    }
    if (activity.type === "columns") {
        const pairs = contentLines.map((line) => line.split(":").map((part) => part.trim()))
            .filter((pair) => pair.length >= 2 && pair[0] && pair[1]);
        return pairs.length ? pairs.map(([category, item]) => `${item} → ${category}`).join("\n") : answer;
    }
    return answer;
}

function liveStudentsForGroup(group) {
    const students = group.studentRecords?.length
        ? group.studentRecords.map((student) => ({ id: student.id, name: student.display_name }))
        : (group.students || []).map((name, index) => ({ id: `student-${index}`, name }));
    return students;
}

function liveStudentAnswerProgress(lesson, studentId, progressIndexes) {
    const answers = liveProgressRows.get(studentId)?.answers || {};
    let answered = 0;
    let total = 0;
    const sections = [...normalizeLessonSections(lesson), ...normalizeHomeworkSections(lesson)];
    sections.forEach((section) => section.activities.forEach((activity, activityIndex) => {
        if (!liveAnswerActivityTypes.has(activity.type)) return;
        total += 1;
        const progressIndex = progressIndexes.get(`${section.id}:${activityIndex}`);
        if (progressIndex === undefined) return;
        const response = answers[`a${progressIndex}`]?.response;
        const hasResponse = Array.isArray(response)
            ? response.some((item) => typeof item === "string" && item.trim())
            : typeof response === "string" && Boolean(response.trim());
        if (hasResponse) answered += 1;
    }));
    return { answered, total };
}

function renderLiveAnswerPanel(student, activity, progressIndex) {
    const answerKey = `a${progressIndex}`;
    const answer = student ? liveProgressRows.get(student.id)?.answers?.[answerKey] : null;
    const response = formatLiveResponse(activity, answer?.response);
    const correctResponse = formatLiveCorrectAnswer(activity) || liveStudentText("noCorrectAnswer");
    const answerStatus = answer
        ? `<span class="live-answer-status ${answer.draft ? "is-draft" : "is-submitted"}">${answer.draft ? lessonSectionText("liveDraft") : lessonSectionText("liveSubmitted")}</span>`
        : "";
    const content = student
        ? `<div class="live-answer-row">${answerStatus}<p class="live-answer-response">${escapeHtml(response || lessonSectionText("liveWait"))}</p></div>`
        : `<p class="live-answer-empty">${lessonSectionText("liveNoStudents")}</p>`;
    return `<div class="live-answer-comparison">
        <div class="live-correct-answer"><h4>${escapeHtml(liveStudentText("correctAnswer"))}</h4><p class="live-correct-answer-value">${escapeHtml(correctResponse)}</p></div>
        <section class="live-answers-panel" aria-label="${escapeHtml(liveStudentText("answer"))}"><h4>${escapeHtml(liveStudentText("answer"))}${student ? ` · ${escapeHtml(student.name)}` : ""}</h4>${content}</section>
    </div>`;
}

function renderLiveMonitor(lesson, progressIndexes) {
    const groups = lessonClassIds(lesson).map((classId) => data.classes.find((group) => group.id === classId)).filter(Boolean);
    const selectedGroup = groups.find((group) => group.id === monitorClassId) || groups[0];
    monitorClassId = selectedGroup?.id || "";
    if (selectedGroup && currentUser) ensureLiveProgressSubscription(lesson, selectedGroup);
    else if (liveProgressKey) stopLiveProgressSubscription();
    const students = selectedGroup ? liveStudentsForGroup(selectedGroup) : [];
    const selectedStudent = students.find((student) => student.id === selectedLiveStudentId) || students[0] || null;
    selectedLiveStudentId = selectedStudent?.id || "";

    const groupPicker = groups.length > 1
        ? `<label class="live-class-picker"><span>${lessonSectionText("liveClass")}</span><select data-live-class>${groups.map((group) => `<option value="${escapeHtml(group.id)}" ${group.id === monitorClassId ? "selected" : ""}>${escapeHtml(group.name)}</option>`).join("")}</select></label>`
        : selectedGroup ? `<div class="live-class-picker"><span>${lessonSectionText("liveClass")}</span><strong>${escapeHtml(selectedGroup.name)}</strong></div>` : "";
    const studentPicker = students.length
        ? `<div class="live-student-switcher"><span class="live-student-label">${liveStudentText("selector")}</span><div class="live-student-tabs ${students.length === 1 ? "is-single" : students.length === 2 ? "is-pair" : "is-triple"}" role="group" aria-label="${liveStudentText("selector")}">${students.map((student) => {
            const { answered, total } = liveStudentAnswerProgress(lesson, student.id, progressIndexes);
            const count = total
                ? liveStudentText("count", { answered, total })
                : liveStudentText("noActivities");
            const safeAnswered = Math.min(answered, total);
            const percent = total ? Math.round((safeAnswered / total) * 100) : 0;
            const progressBar = total
                ? `<span class="live-student-progress-track" role="progressbar" aria-label="${escapeHtml(count)}" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${safeAnswered}" aria-valuetext="${escapeHtml(count)}"><span class="live-student-progress-fill" style="--progress-width:${percent}%"></span></span>`
                : "";
            return `<button type="button" class="live-student-tab ${student.id === selectedLiveStudentId ? "active" : ""}" data-live-student-id="${escapeHtml(student.id)}" aria-pressed="${student.id === selectedLiveStudentId}"><span class="live-student-name">${escapeHtml(student.name)}</span><span class="live-student-progress">${escapeHtml(count)}</span>${progressBar}</button>`;
        }).join("")}</div></div>`
        : "";
    let statusText = lessonSectionText("liveNoClass");
    let statusClass = "is-idle";
    if (!selectedGroup) {
        statusText = lessonSectionText("liveNoClass");
    } else if (!currentUser) {
        statusText = lessonSectionText("liveOffline");
        statusClass = "is-error";
    } else if (liveProgressStatus === "ready") {
        statusText = lessonSectionText("liveReady");
        statusClass = "is-ready";
    } else if (liveProgressStatus === "error") {
        statusText = liveProgressError === lessonSectionText("liveOffline")
            ? liveProgressError
            : lessonSectionText("liveError");
        statusClass = "is-error";
    } else {
        statusText = lessonSectionText("liveConnect");
        statusClass = "is-connecting";
    }
    return `<section class="live-monitor-bar"><div class="live-monitor-heading"><strong>${lessonSectionText("liveHint")}</strong><p>${selectedGroup ? escapeHtml(selectedGroup.name) : lessonSectionText("liveNoClass")}</p></div>${groupPicker}${studentPicker}<p class="live-monitor-status ${statusClass}" role="status" aria-live="polite">${escapeHtml(statusText)}</p></section>`;
}

function renderLessonWorkspace() {
    const isEditing = lessonWorkspaceMode === "edit";
    const lesson = data.lessons.find((item) => item.id === workspaceLessonId);
    if (!isEditing && !lesson) {
        exitLessonWorkspace();
        return;
    }
    const isHomework = lessonWorkspaceTab === "homework";
    const lessonSections = isEditing ? draftSections : normalizeLessonSections(lesson);
    const homeworkSections = isEditing ? draftHomeworkSections : normalizePreviewHomeworkSections(lesson);
    const sections = isHomework ? homeworkSections : lessonSections;
    const activeSectionId = isEditing
        ? activeWorkspaceSectionId()
        : isHomework ? activeHomeworkSectionId : activeLessonSectionId;
    if (!sections.some((item) => item.id === activeSectionId)) {
        if (isEditing) setActiveWorkspaceSectionId(sections[0].id);
        else if (isHomework) activeHomeworkSectionId = sections[0].id;
        else activeLessonSectionId = sections[0].id;
    }
    const selectedSectionId = isEditing
        ? activeWorkspaceSectionId()
        : isHomework ? activeHomeworkSectionId : activeLessonSectionId;
    const section = sections.find((item) => item.id === selectedSectionId);
    const progressIndexes = isEditing ? new Map() : lessonProgressIndexes(lesson);
    const liveMonitor = isEditing ? "" : renderLiveMonitor(lesson, progressIndexes);
    const liveGroup = !isEditing ? data.classes.find((group) => group.id === monitorClassId) : null;
    const liveStudents = liveGroup ? liveStudentsForGroup(liveGroup) : [];
    const liveStudent = liveStudents.find((student) => student.id === selectedLiveStudentId) || liveStudents[0] || null;
    const quickEditActive = !isEditing && previewActivityEdit?.lessonId === lesson.id
        && previewActivityEdit.sectionId === section.id && previewActivityEdit.isHomework === isHomework;
    const title = isEditing ? lessonFormDraft.title : lesson.title;
    const unit = isEditing ? lessonFormDraft.unit : lesson.unit || inferLessonUnit(lesson);
    const renderSectionMenu = (items, isHomeworkSection) => items.map((item, index) => `<div class="lesson-section-row ${item.id === (isHomeworkSection ? activeHomeworkSectionId : activeLessonSectionId) ? "active" : ""}">
        <button type="button" class="lesson-section-select" data-select-section="${escapeHtml(item.id)}" data-section-homework="${isHomeworkSection}" ${quickEditActive ? "disabled" : ""}><span class="lesson-section-number">${index + 1}</span><span class="lesson-section-label" data-section-label="${escapeHtml(item.id)}">${escapeHtml(item.title)}</span></button>
        ${isEditing ? `<div class="lesson-section-tools"><button type="button" data-move-section-from="${escapeHtml(item.id)}" data-move-section="${index - 1}" data-section-homework="${isHomeworkSection}" ${index === 0 ? "disabled" : ""} aria-label="${lessonSectionText("previous")}">↑</button><button type="button" data-move-section-from="${escapeHtml(item.id)}" data-move-section="${index + 1}" data-section-homework="${isHomeworkSection}" ${index === items.length - 1 ? "disabled" : ""} aria-label="${lessonSectionText("next")}">↓</button><button type="button" data-delete-section="${escapeHtml(item.id)}" data-section-homework="${isHomeworkSection}" ${items.length === 1 ? "disabled" : ""} aria-label="${lessonSectionText("remove")}">×</button></div>` : ""}</div>`).join("");
    const lessonSectionMenu = renderSectionMenu(lessonSections, false);
    const homeworkSectionMenu = renderSectionMenu(homeworkSections, true);
    const sectionBody = isEditing
        ? `<div class="form-field section-name-field"><label for="sectionTitle">${lessonSectionText("rename")}</label><input id="sectionTitle" data-section-title="${escapeHtml(section.id)}" maxlength="80" value="${escapeHtml(section.title)}"></div><div class="builder-heading"><h3>${isHomework ? lessonSectionText("homeworkActivities") : t("lesson.activities")}</h3><button type="button" class="button secondary small" data-action="choose-activity">${t("activity.addBlock")}</button></div><div id="activityBlocks">${renderActivityBlocks(section.activities)}</div>`
        : `<p class="preview-note">${previewText("practice")}</p><div class="lesson-preview-list">${section.activities.length ? section.activities.map((activity, index) => {
            const progressIndex = progressIndexes.get(`${section.id}:${index}`);
            const liveAnswerMarkup = liveGroup && liveAnswerActivityTypes.has(activity.type) && progressIndex !== undefined
                ? renderLiveAnswerPanel(liveStudent, activity, progressIndex)
                : "";
            return renderPreviewActivity(activity, index, false, false, liveAnswerMarkup);
        }).join("") : emptyMessage(lessonSectionText("empty"), "")}</div>`;
    const sourceOptions = [`<option value="__current__" ${homeworkSourceLessonId === "__current__" ? "selected" : ""}>${lessonSectionText("currentLesson")} · ${escapeHtml(lessonFormDraft.title.trim() || lessonSectionText("newSection"))}</option>`,
        ...data.lessons.filter((item) => item.id !== workspaceLessonId).map((item) => `<option value="${escapeHtml(item.id)}" ${homeworkSourceLessonId === item.id ? "selected" : ""}>${escapeHtml(item.title)}</option>`)].join("");
    const sourceActivities = isEditing && isHomework ? homeworkSourceActivities() : [];
    const sourcePanel = isEditing && isHomework ? `<div class="homework-copy-source">
        <div class="form-field"><label for="homeworkSourceLesson">${lessonSectionText("copyFromLesson")}</label><select id="homeworkSourceLesson">${sourceOptions}</select></div>
        <p class="hint">${lessonSectionText("dragCopyHint")}</p>
        <div class="homework-source-activities">${sourceActivities.length ? sourceActivities.map((activity, index) => {
            const type = activityTypes.find((item) => item.id === activity.type);
            const summary = String(activity.prompt || activity.content || "").trim().replace(/\s+/g, " ");
            return `<button type="button" class="homework-source-activity" draggable="true" data-homework-copy="${index}"><span>${escapeHtml(type ? t(type.nameKey) : t("activity.task"))}</span><strong>${escapeHtml(summary || lessonSectionText("newSection"))}</strong><span class="homework-source-copy-icon">＋</span></button>`;
        }).join("") : `<p class="hint">${lessonSectionText("noSourceActivities")}</p>`}</div>
    </div>` : "";
    const dropZone = isEditing && isHomework ? `<div id="homeworkCopyDropZone" class="homework-copy-drop-zone" tabindex="0">${lessonSectionText("dropCopyHint")}</div>` : "";
    const actionBar = isEditing
        ? `<button type="button" class="button secondary" data-workspace-cancel>${t("action.cancel")}</button><button class="button" type="submit">${editingLessonId ? lessonSectionText("save") : lessonSectionText("create")}</button>`
        : "";
    const previewDraftNotice = !isEditing && editorReturnToPreview
        ? `<p class="lesson-editor-draft-notice" role="status">${lessonSectionText("liveUnsaved")}</p>`
        : "";
    pageContent.innerHTML = `<section class="lesson-workspace"><form id="lessonForm" class="lesson-workspace-form">
        <header class="lesson-workspace-hero">
            <div class="lesson-workspace-heading"><button type="button" class="text-link" data-workspace-back ${quickEditActive ? "disabled" : ""}>← ${lessonSectionText("back")}</button>
                ${isEditing ? `<div class="lesson-workspace-fields"><div class="form-field"><label for="lessonTitle">${t("field.lessonTitle")}</label><input id="lessonTitle" name="title" required maxlength="100" value="${escapeHtml(title)}" placeholder="${t("field.exampleLesson")}"></div><div class="form-field"><label for="lessonUnit">${lessonText("unit")}</label><select id="lessonUnit" name="unit" required><option value="">${lessonText("chooseUnit")}</option>${LESSON_UNITS.map((level) => `<option value="${level}" ${unit === level ? "selected" : ""}>${level}</option>`).join("")}</select></div></div>` : `<div><span class="course-hero-kicker">${escapeHtml(lessonClassNames(lesson)) || lessonText("unassigned")} · ${escapeHtml(unit)}</span><h1>${escapeHtml(title)}</h1></div>`}
            </div>
            ${isEditing ? "" : `<div class="lesson-workspace-preview-actions"><span class="lesson-workspace-unit">${escapeHtml(unit)}</span></div>`}
        </header>
        <nav class="lesson-workspace-tabs" role="tablist" aria-label="${lessonSectionText("workspaceMode")}"><button type="button" class="${!isEditing ? "active" : ""}" role="tab" aria-selected="${!isEditing}" data-workspace-mode="preview" ${!lesson || quickEditActive ? "disabled" : ""}>${lessonSectionText("lessonTab")}</button>${hasPermission("edit_lessons") ? `<button type="button" class="${isEditing ? "active" : ""}" role="tab" aria-selected="${isEditing}" data-workspace-mode="edit" ${quickEditActive ? "disabled" : ""}>${lessonSectionText("editorTab")}</button>` : ""}</nav>
        ${previewDraftNotice}
        <div class="lesson-workspace-layout">
            <main class="lesson-workspace-main">${liveMonitor}<section class="lesson-workspace-section">
                ${isEditing ? `${sourcePanel}${sectionBody}${dropZone}` : `<h2>${escapeHtml(section.title)}</h2>${sectionBody}`}
            </section>
                <div class="lesson-workspace-footer"><button type="button" class="button secondary small" data-section-step="-1" ${sections.indexOf(section) === 0 || quickEditActive ? "disabled" : ""}>${lessonSectionText("previous")}</button><span>${sections.indexOf(section) + 1} / ${sections.length}</span><button type="button" class="button secondary small" data-section-step="1" ${sections.indexOf(section) === sections.length - 1 || quickEditActive ? "disabled" : ""}>${lessonSectionText("next")}</button>
                ${isEditing ? `<span class="lesson-workspace-spacer"></span><button type="button" class="button secondary small" data-action="choose-activity">${lessonSectionText("addElement")}</button><button type="button" class="button secondary small" data-copy-activity ${section.activities.length ? "" : "disabled"}>${lessonSectionText("copyElement")}</button>` : ""}</div>
            </main>
            <aside class="lesson-sections-panel"><h2>${lessonSectionText("section")}</h2><nav class="lesson-sections-list" aria-label="${lessonSectionText("section")}">${lessonSectionMenu}</nav>
                ${isEditing && !isHomework ? `<button type="button" class="button secondary lesson-add-section" data-add-section="lesson">${lessonSectionText("addSection")}</button>` : ""}
                <h3 class="homework-sections-heading">${lessonSectionText("homework")}</h3><nav class="lesson-sections-list homework-sections-list" aria-label="${lessonSectionText("homework")}">${homeworkSectionMenu}</nav>
                ${isEditing && isHomework ? `<button type="button" class="button secondary lesson-add-section" data-add-section="homework">${lessonSectionText("addSection")}</button>` : ""}
            </aside>
        </div>
        ${actionBar ? `<div class="lesson-workspace-actions">${actionBar}</div>` : ""}
    </form></section>`;
    pageContent.querySelector("[data-workspace-back]").addEventListener("click", exitLessonWorkspace);
    pageContent.querySelector("[data-workspace-cancel]")?.addEventListener("click", exitLessonWorkspace);
    if (isEditing) pageContent.querySelector("#lessonForm").addEventListener("submit", saveLesson);
    pageContent.querySelector("#lessonTitle")?.addEventListener("input", (event) => { lessonFormDraft.title = event.target.value; });
    pageContent.querySelector("#lessonUnit")?.addEventListener("change", (event) => { lessonFormDraft.unit = event.target.value; });
    pageContent.querySelectorAll("[data-workspace-mode]").forEach((button) => button.addEventListener("click", () => {
        if (previewActivityEdit) return;
        switchLessonWorkspaceMode(button.dataset.workspaceMode);
    }));
    pageContent.querySelector("[data-live-class]")?.addEventListener("change", (event) => {
        monitorClassId = event.target.value;
        selectedLiveStudentId = "";
        stopLiveProgressSubscription();
        render();
    });
    pageContent.querySelectorAll("[data-live-student-id]").forEach((button) => button.addEventListener("click", () => {
        if (selectedLiveStudentId === button.dataset.liveStudentId) return;
        selectedLiveStudentId = button.dataset.liveStudentId;
        render();
    }));
    pageContent.querySelectorAll('[data-action="choose-activity"]').forEach((button) => button.addEventListener("click", openActivityPicker));
    pageContent.querySelectorAll("[data-select-section]").forEach((button) => button.addEventListener("click", () => {
        if (previewActivityEdit) return;
        lessonWorkspaceTab = button.dataset.sectionHomework === "true" ? "homework" : "lesson";
        setActiveWorkspaceSectionId(button.dataset.selectSection);
        render();
    }));
    pageContent.querySelector("[data-add-section]")?.addEventListener("click", () => {
        lessonWorkspaceTab = pageContent.querySelector("[data-add-section]")?.dataset.addSection === "homework" ? "homework" : "lesson";
        const section = { id: crypto.randomUUID(), title: lessonSectionText("newSection"), activities: [] };
        activeDraftSections().push(section);
        setActiveWorkspaceSectionId(section.id);
        render();
    });
    pageContent.querySelectorAll("[data-move-section]").forEach((button) => button.addEventListener("click", () => {
        const targetSections = button.dataset.sectionHomework === "true" ? draftHomeworkSections : draftSections;
        const from = targetSections.findIndex((item) => item.id === button.dataset.moveSectionFrom);
        const to = Number(button.dataset.moveSection);
        if (from < 0 || to < 0 || to >= targetSections.length) return;
        [targetSections[from], targetSections[to]] = [targetSections[to], targetSections[from]];
        render();
    }));
    pageContent.querySelectorAll("[data-delete-section]").forEach((button) => button.addEventListener("click", () => {
        const isHomeworkSection = button.dataset.sectionHomework === "true";
        const targetSections = isHomeworkSection ? draftHomeworkSections : draftSections;
        if (targetSections.length < 2) return;
        const index = targetSections.findIndex((item) => item.id === button.dataset.deleteSection);
        if (index < 0) return;
        targetSections.splice(index, 1);
        const activeSectionId = isHomeworkSection ? activeHomeworkSectionId : activeLessonSectionId;
        if (activeSectionId === button.dataset.deleteSection) {
            if (isHomeworkSection) activeHomeworkSectionId = targetSections[Math.max(0, index - 1)].id;
            else activeLessonSectionId = targetSections[Math.max(0, index - 1)].id;
        }
        render();
    }));
    pageContent.querySelectorAll("[data-section-step]").forEach((button) => button.addEventListener("click", () => {
        if (previewActivityEdit) return;
        const next = sections.indexOf(section) + Number(button.dataset.sectionStep);
        if (sections[next]) {
            setActiveWorkspaceSectionId(sections[next].id);
            render();
        }
    }));
    pageContent.querySelector("[data-section-title]")?.addEventListener("input", (event) => {
        const currentSection = sections.find((item) => item.id === event.target.dataset.sectionTitle);
        if (!currentSection) return;
        currentSection.title = event.target.value;
        const label = pageContent.querySelector(`[data-section-label="${CSS.escape(currentSection.id)}"]`);
        if (label) label.textContent = currentSection.title;
    });
    pageContent.querySelector("[data-copy-activity]")?.addEventListener("click", () => {
        const currentSection = activeDraftSection();
        if (!currentSection?.activities.length) return;
        const copy = structuredClone(currentSection.activities[currentSection.activities.length - 1]);
        currentSection.activities.push(copy);
        expandedActivityBlocks.add(copy);
        render();
    });
    enhanceSelects(pageContent);
    if (isHomework) bindHomeworkCopySource();
    if (isEditing) bindActivityBlockActions();
    else bindLessonPreviewActions(pageContent);
}

function exitLessonWorkspace() {
    stopLiveProgressSubscription();
    lessonWorkspaceMode = "";
    workspaceLessonId = "";
    editingLessonId = null;
    editorReturnToPreview = false;
    previewActivityEdit = null;
    draftSections = [];
    draftHomeworkSections = [];
    activeLessonSectionId = "";
    activeHomeworkSectionId = "";
    lessonWorkspaceTab = "lesson";
    lessonFormDraft = { title: "", unit: "A1" };
    render();
}

function renderActivityBlocks(activities = activeDraftSection()?.activities || []) {
    if (!activities.length) return `<div class="empty-state"><strong>${t("lesson.firstActivity")}</strong>${t("lesson.firstActivityHint")}</div>`;
    return activities.map((block, index) => {
        const type = activityTypes.find((item) => item.id === block.type);
        const isExpanded = expandedActivityBlocks.has(block);
        const summary = String(block.prompt || block.content || "").trim().replace(/\s+/g, " ");
        return `<article class="builder-block ${isExpanded ? "is-expanded" : ""}" data-block-index="${index}">
            <header class="builder-block-header">
                <button type="button" class="builder-block-drag" aria-label="${lessonSectionText("moveBlock")}" title="${lessonSectionText("moveBlock")}">⠿</button>
                <div class="builder-block-title"><strong>${index + 1}. ${escapeHtml(type ? t(type.nameKey) : t("activity.task"))}</strong>${summary ? `<span class="builder-block-summary">${escapeHtml(summary)}</span>` : ""}</div>
                <div class="builder-block-actions">
                    <button type="button" class="mini-action builder-block-edit" data-toggle-block="${index}" aria-expanded="${isExpanded}" aria-label="${isExpanded ? lessonSectionText("done") : lessonSectionText("edit")}" title="${isExpanded ? lessonSectionText("done") : lessonSectionText("edit")}">${isExpanded ? "✓" : "✎"}</button>
                    <button type="button" class="mini-action builder-block-delete" data-remove-block="${index}" aria-label="${lessonSectionText("remove")}" title="${lessonSectionText("remove")}">×</button>
                </div>
            </header>
            <div class="builder-block-fields" ${isExpanded ? "" : "hidden"}>
                <div class="form-field"><label>${t("field.instruction")}</label><input data-field="prompt" value="${escapeHtml(block.prompt || "")}" placeholder="${t("field.instructionExample")}"></div>
                <div class="form-field"><label>${type?.category === "media" ? t("field.mediaContent") : t("field.taskText")} <span class="hint">${escapeHtml(contentHint(block.type))}</span></label><textarea data-field="content" placeholder="${escapeHtml(contentPlaceholder(block.type))}">${escapeHtml(block.content || "")}</textarea></div>
                ${block.type === "text" || block.type === "image" || block.type === "video" || block.type === "audio" ? "" : `<div class="form-field"><label>${t("field.answer")} <span class="hint">${escapeHtml(answerHint(block.type))}</span></label><input data-field="answer" value="${escapeHtml(block.answer || "")}" placeholder="${escapeHtml(answerPlaceholder(block.type))}"></div>`}
            </div>
        </article>`;
    }).join("");
}

function contentHint(type) {
    return ({ "drag-words": t("hint.drag"), "fill-blank": t("hint.blank"), "multiple-choice": t("hint.options"), "order-items": t("hint.order"), "sentence-order": t("hint.sentences"), match: t("hint.match"), columns: t("hint.columns"), table: t("hint.table"), "one-of-many": t("hint.select"), "true-false": t("hint.trueFalse"), flashcards: t("hint.cards") })[type] || "";
}

function contentPlaceholder(type) {
    const examples = {
        ua: { match: "dom = дім\nškola = школа", columns: "Дієслова: ísť\nІменники: dom" },
        ru: { match: "dom = дом\nškola = школа", columns: "Глаголы: ísť\nСуществительные: dom" },
        en: { match: "dom = house\nškola = school", columns: "Verbs: ísť\nNouns: dom" }
    };
    return examples[currentLanguage][type] || ({ "drag-words": "Napríklad: Ja bývam v Bratislave.", "fill-blank": "Ja ___ v Bratislave.", "multiple-choice": "Bratislava\nKošice\nŽilina", "order-items": "1. ráno\n2. popoludní\n3. večer" })[type] || t("field.enterText");
}

function answerHint(type) {
    return ({ "drag-words": t("hint.answerSlash"), "fill-blank": t("hint.answerText"), "multiple-choice": t("hint.answerChoice"), "order-items": t("hint.answerOrder"), "open-answer": t("hint.answerText"), table: t("hint.answerSlash"), match: t("hint.optional"), "one-of-many": t("hint.correctChoice") })[type] || "";
}

function answerPlaceholder(type) {
    return ({ "drag-words": "Ja / bývam / v / Bratislave", "fill-blank": "bývam", "multiple-choice": "Bratislava", "order-items": "1 / 2 / 3", "one-of-many": t("hint.correctChoice"), "true-false": "True / False" })[type] || t("field.answer");
}

function bindActivityBlockActions() {
    const currentSection = activeDraftSection();
    if (!currentSection) return;
    const activities = currentSection.activities;
    const blocksContainer = pageContent.querySelector("#activityBlocks");

    pageContent.querySelectorAll("[data-remove-block]").forEach((button) => button.addEventListener("click", () => {
        activities.splice(Number(button.dataset.removeBlock), 1);
        render();
    }));
    pageContent.querySelectorAll("[data-toggle-block]").forEach((button) => button.addEventListener("click", () => {
        const block = activeDraftSection().activities[Number(button.dataset.toggleBlock)];
        if (!block) return;
        if (expandedActivityBlocks.has(block)) expandedActivityBlocks.delete(block);
        else expandedActivityBlocks.add(block);
        render();
        if (expandedActivityBlocks.has(block)) {
            const blockElement = pageContent.querySelector(`.builder-block[data-block-index="${Number(button.dataset.toggleBlock)}"]`);
            blockElement?.scrollIntoView({ behavior: "smooth", block: "center" });
            blockElement?.querySelector("[data-field]")?.focus({ preventScroll: true });
        }
    }));
    pageContent.querySelectorAll(".builder-block").forEach((blockElement) => {
        blockElement.querySelectorAll("[data-field]").forEach((input) => input.addEventListener("input", () => {
            const block = activeDraftSection().activities[Number(blockElement.dataset.blockIndex)];
            block[input.dataset.field] = input.value;
        }));
    });

    if (blocksContainer) bindSortableActivityCards(blocksContainer, ".builder-block", ".builder-block-drag", "blockIndex", (order) => {
        const reordered = order.map((index) => activities[index]);
        activities.splice(0, activities.length, ...reordered);
        render();
    });
}

function openActivityPicker() {
    const categories = [{ id: "all", label: t("picker.all") }, { id: "tests", label: t("picker.tests") }, { id: "media", label: t("picker.media") }, { id: "other", label: t("picker.other") }];
    const choices = activityTypes.filter((item) => (selectedActivityCategory === "all" || item.category === selectedActivityCategory) && `${t(item.nameKey)} ${t(item.descKey)}`.toLowerCase().includes(activitySearch.toLowerCase()));
    openModal(`${modalHeader(t("picker.title"))}
        <div class="block-tabs">${categories.map((category) => `<button class="block-tab ${selectedActivityCategory === category.id ? "active" : ""}" type="button" data-category="${category.id}">${category.label}</button>`).join("")}</div>
        <div class="form-field"><input type="search" id="activitySearch" value="${escapeHtml(activitySearch)}" placeholder="${t("picker.search")}" aria-label="${t("picker.search")}"></div>
        <div class="activity-grid">${choices.map((choice) => `<button type="button" class="activity-choice" data-add-activity="${choice.id}" title="${escapeHtml(t(choice.descKey))}"><span>${choice.icon}</span>${escapeHtml(t(choice.nameKey))}</button>`).join("") || emptyMessage(t("empty.search"), t("empty.changeSearch"))}</div>
        <div class="modal-actions"><button type="button" class="button secondary" data-back-editor>${t("picker.back")}</button></div>`, true);
    refreshModal = openActivityPicker;
    modalCard.querySelectorAll("[data-close]").forEach((button) => button.addEventListener("click", closeModal));
    modalCard.querySelectorAll("[data-category]").forEach((button) => button.addEventListener("click", () => {
        selectedActivityCategory = button.dataset.category;
        openActivityPicker();
    }));
    modalCard.querySelector("#activitySearch").addEventListener("input", (event) => {
        activitySearch = event.target.value;
        openActivityPicker();
        const search = modalCard.querySelector("#activitySearch");
        search.focus();
        search.setSelectionRange(search.value.length, search.value.length);
    });
    modalCard.querySelectorAll("[data-add-activity]").forEach((button) => button.addEventListener("click", () => {
        const type = activityTypes.find((entry) => entry.id === button.dataset.addActivity);
        const activity = { type: type.id, prompt: t(type.nameKey), content: "", answer: "" };
        activeDraftSection().activities.push(activity);
        expandedActivityBlocks.add(activity);
        activitySearch = "";
        closeModal();
        render();
        pageContent.querySelector("#activityBlocks")?.lastElementChild?.scrollIntoView({ block: "nearest" });
    }));
    modalCard.querySelector("[data-back-editor]").addEventListener("click", () => {
        closeModal();
        render();
    });
}

async function saveLesson(event) {
    event.preventDefault();
    if (!hasPermission("edit_lessons")) return;
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const title = String(form.get("title")).trim();
    const unit = String(form.get("unit"));
    if (!title || !LESSON_UNITS.includes(unit)) {
        showToast(lessonText("chooseUnit"));
        return;
    }
    const existingLesson = data.lessons.find((current) => current.id === editingLessonId);
    const lesson = { id: editingLessonId || crypto.randomUUID(), teacherId: existingLesson?.teacherId || currentUser?.id, title, unit, classIds: existingLesson ? lessonClassIds(existingLesson) : [], sections: structuredClone(draftSections), homeworkSections: structuredClone(draftHomeworkSections), activities: draftSections.flatMap((section) => section.activities) };
    const previousLessons = data.lessons;
    const wasEditing = Boolean(editingLessonId);
    data.lessons = editingLessonId
        ? data.lessons.map((current) => current.id === editingLessonId ? lesson : current)
        : [...data.lessons, lesson];
    if (!persist()) {
        data.lessons = previousLessons;
        return;
    }
    const submitButton = formElement.querySelector('[type="submit"]');
    if (submitButton) submitButton.disabled = true;
    if (!await waitForWorkspaceSave()) {
        data.lessons = previousLessons;
        persist();
        if (submitButton?.isConnected) submitButton.disabled = false;
        return;
    }
    stopLiveProgressSubscription();
    lessonWorkspaceMode = "";
    workspaceLessonId = "";
    editingLessonId = null;
    editorReturnToPreview = false;
    draftSections = [];
    draftHomeworkSections = [];
    activeLessonSectionId = "";
    activeHomeworkSectionId = "";
    lessonWorkspaceTab = "lesson";
    lessonFormDraft = { title: "", unit: "A1" };
    render();
    showToast(wasEditing ? t("toast.lessonUpdated") : t("toast.lessonCreated"));
}

function openLessonAssignment(id) {
    if (!hasPermission("view_assign_lessons")) return;
    const lesson = data.lessons.find((item) => item.id === id);
    if (!lesson) return;
    openModal(`${modalHeader(assignmentText("dialog"))}
        <form id="lessonAssignmentForm">
            <p class="assignment-hint">${assignmentText("hint")}</p>
            <div class="class-assignment-list">${classAssignmentChoices(lessonClassIds(lesson))}</div>
            <div class="modal-actions"><button type="button" class="button secondary" data-close>${t("action.cancel")}</button><button class="button" type="submit">${assignmentText("save")}</button></div>
        </form>`);
    modalCard.querySelectorAll("[data-close]").forEach((button) => button.addEventListener("click", closeModal));
    modalCard.querySelector("#lessonAssignmentForm").addEventListener("submit", (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const classIds = form.getAll("classIds").map(String).filter((classId) => data.classes.some((item) => item.id === classId));
        const previousLesson = data.lessons.find((item) => item.id === id);
        data.lessons = data.lessons.map((item) => item.id === id ? { ...item, classIds } : item);
        if (!persist()) {
            data.lessons = data.lessons.map((item) => item.id === id ? previousLesson : item);
            return;
        }
        closeModal();
        render();
        showToast(assignmentText("saved"));
    });
}

function deleteLesson(id) {
    if (!hasPermission("edit_lessons")) return;
    const lesson = data.lessons.find((item) => item.id === id);
    if (!lesson || !window.confirm(t("confirm.deleteLesson", { name: lesson.title }))) return;
    data.lessons = data.lessons.filter((item) => item.id !== id);
    persist([id]);
    render();
    showToast(t("toast.lessonDeleted"));
}

document.querySelectorAll(".nav-item").forEach((button) => button.addEventListener("click", () => {
    searchQuery = "";
    activeClassFilter = "";
    if (button.dataset.view === "lessons") selectedLessonUnit = "";
    setView(button.dataset.view);
}));
document.getElementById("menuToggle").addEventListener("click", () => document.getElementById("sidebar").classList.toggle("open"));
document.querySelectorAll(".language-button").forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.lang)));
document.getElementById("notificationButton").addEventListener("click", (event) => showNotifications(event.currentTarget));
document.querySelectorAll(".profile-trigger").forEach((button) => button.addEventListener("click", () => showUserMenu(button)));
document.addEventListener("click", (event) => {
    if (activeSelectDropdown && !activeSelectDropdown.contains(event.target)) closeSelectDropdown();
    if (openPopover && !event.target.closest(".popover-root, .popover-trigger, .profile-trigger")) closePopover();
});
modalBackdrop.addEventListener("click", (event) => {
    if (event.target === modalBackdrop) closeModal();
});
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modalBackdrop.hidden) closeModal();
    if (event.key === "Escape" && openPopover) closePopover();
});

translateStaticUI();
render();
loadCurrentUser().catch((error) => {
    console.error("Failed to load current user:", error);
});
