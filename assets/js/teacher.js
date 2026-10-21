const STORAGE_KEY = "slovasofiTeacherSpace";
const LESSON_UNITS = ["A1", "A2", "B1", "B2"];
const translations = {
    ua: {
        "nav.loading": "Завантаження розділу…",
        "nav.overview": "Огляд", "nav.classes": "Класи", "nav.lessons": "Уроки", "nav.calendar": "Календар", "nav.materials": "Матеріали", "nav.students": "Учні", "nav.home": "← На головну", "nav.label": "Навігація", "brand.home": "SlovaSofi — на головну", "language.label": "Мова", "menu.open": "Відкрити меню", "header.notifications": "Сповіщення", "modal.close": "Закрити", "teacher.role": "Викладач", "school.profile": "Профіль школи", "profile.open": "Профіль користувача: {name}", "profile.title": "Профіль користувача", "profile.signedOut": "Гість", "profile.notSignedIn": "Ви не ввійшли в обліковий запис", "profile.logout": "Вийти з профілю", "profile.login": "Увійти", "profile.logoutError": "Не вдалося вийти з профілю. Спробуйте ще раз.", "profile.loadError": "Не вдалося завантажити профіль користувача.", "school.title": "Профіль школи", "school.purpose": "Профіль школи — це спільний простір SlovaSofi. Тут зберігаються класи, уроки й навчальні матеріали школи.", "school.workspace": "Навчальний простір", "school.workspaceDetail": "Спільні класи, уроки та матеріали", "notifications.title": "Сповіщення", "notifications.empty": "Поки немає сповіщень", "notifications.description": "Тут з’являтимуться оновлення про класи, уроки та учнів.", "class.noClass": "Без класу",
        "calendar.title": "Розклад занять", "calendar.description": "Заплануйте заняття для класу. Учні побачать його у своєму кабінеті.", "calendar.add": "＋ Додати заняття", "calendar.today": "Сьогодні", "calendar.empty": "На цей день занять немає", "calendar.noEvents": "Поки немає запланованих занять", "calendar.createFirst": "Додайте заняття — воно з’явиться тут і в розкладі учнів.", "calendar.newEvent": "Нове заняття", "calendar.editEvent": "Редагувати заняття", "calendar.titleLabel": "Тема заняття", "calendar.classLabel": "Клас", "calendar.lessonLabel": "Матеріал уроку (необязательно)", "calendar.noLesson": "Без прив’язки до уроку", "calendar.dateLabel": "Дата і час", "calendar.duration": "Тривалість", "calendar.minutes": "мин.", "calendar.repeat": "Повтор", "calendar.noRepeat": "Не повторять", "calendar.weekly": "Каждую неделю", "calendar.repeatUntil": "Повторять до", "calendar.save": "Сохранить занятие", "calendar.delete": "Удалить занятие", "calendar.cancel": "Отмена", "calendar.saved": "Занятие добавлено в расписание.", "calendar.updated": "Расписание обновлено.", "calendar.deleted": "Занятие удалено.", "calendar.loadError": "Не удалось загрузить расписание.", "calendar.saveError": "Не удалось сохранить занятие:", "calendar.deleteConfirm": "Удалить занятие и все его повторы?", "calendar.recurring": "Еженедельно", "calendar.minutesShort": "мин", "calendar.noClasses": "Сначала создайте класс, чтобы запланировать занятие.", "calendar.soundReminder": "Скоро занятие: {title}",
        "page.overview": "Огляд", "page.classes": "Класи", "page.lessons": "Уроки", "page.materials": "Матеріали", "page.students": "Учні", "pageTitle": "Кабінет викладача", "welcome.badge": "ПАНЕЛЬ ВИКЛАДАЧА · SLOVASOFI", "welcome.title": "Добрий день, {name} 👋", "welcome.text": "Ваші заняття та матеріали в одному місці.", "welcome.storage": "✓ Демо-дані зберігаються у цьому браузері", "action.createLesson": "＋ Створити урок",
        "stat.classes": "Створено класів", "stat.students": "Учнів у класах", "stat.lessons": "Створено уроків", "stat.materials": "Матеріали", "overview.recent": "Останні уроки", "overview.recentHint": "Ваші останні створені уроки", "overview.allLessons": "Усі уроки →", "overview.yourClasses": "Ваші класи", "overview.groups": "Групи учнів", "overview.allClasses": "Усі класи →",
        "classes.title": "Класи", "classes.description": "Створюйте групи та призначайте їм окремі уроки.", "classes.create": "＋ Створити клас", "classes.search": "Пошук класів…", "classes.lessons": "Уроки →", "classes.notFound": "Класи не знайдено", "classes.notFoundHint": "Змініть запит або створіть новий клас.",
        "lessons.title": "Уроки", "lessons.description": "Створюйте інтерактивні завдання та призначайте їх класам.", "lessons.add": "＋ Додати урок", "lessons.allClasses": "Усі класи", "lessons.search": "Пошук уроку…", "lessons.notFound": "Уроків поки немає", "lessons.notFoundHint": "Натисніть «Додати урок», щоб вибрати типи завдань.", "lessons.blocks": "блоків", "lessons.block": "блок", "lessons.task": "завдання", "lessons.tasks": "завдань",
        "materials.title": "Матеріали", "materials.description": "Спільна бібліотека файлів, посилань і навчальних ресурсів.", "materials.add": "＋ Додати матеріал", "materials.total": "Усього матеріалів: {count}", "materials.search": "Пошук матеріалів…", "materials.open": "Відкрити матеріал ↗", "materials.inLibrary": "Додано до бібліотеки", "materials.notFound": "Матеріалів не знайдено", "materials.notFoundHint": "Додайте перший матеріал або змініть запит.",
        "students.title": "Учні", "students.description": "Список учнів, розподілених за вашими класами.", "students.manage": "Керувати класами", "students.total": "Усього учнів: {count}", "students.search": "Пошук учня…", "students.role": "Учень SlovaSofi", "students.notFound": "Учнів не знайдено", "students.notFoundHint": "Додайте учнів до класів, щоб вони з’явилися тут.", "presence.online": "Онлайн", "presence.offline": "Офлайн",
        "empty.noClasses": "Класів поки немає", "empty.createClass": "Створіть клас, щоб призначати уроки.", "empty.search": "Нічого не знайдено", "empty.changeSearch": "Змініть пошуковий запит.",
        "modal.editClass": "Редагувати клас", "modal.newClass": "Новий клас", "field.className": "Назва класу", "field.course": "Курс або рівень", "field.students": "Учні", "field.studentsPlaceholder": "Введіть імена через кому", "field.studentsHint": "Кожне ім’я стане окремим учнем.", "action.addStudent": "＋ Додати учня", "field.exampleClass": "Наприклад, Словацька A1", "field.exampleCourse": "Наприклад, Словацька · A1", "action.cancel": "Скасувати", "action.save": "Зберегти", "action.createClass": "Створити клас", "action.delete": "Видалити", "class.unnamedCourse": "Курс не вказано",
        "modal.editLesson": "Редагувати урок", "modal.newLesson": "Новий урок", "field.lessonTitle": "Назва уроку", "field.exampleLesson": "Наприклад, Lekcia 5. Rodina", "field.chooseClass": "Виберіть клас", "lesson.activities": "Завдання уроку", "activity.addBlock": "＋ Додати блок", "lesson.firstActivity": "Додайте перше завдання", "lesson.firstActivityHint": "Виберіть тип блоку: перетягування, пропуск, порядок, відповідність тощо.", "lesson.save": "Зберегти урок", "lesson.create": "Створити урок",
        "field.instruction": "Інструкція", "field.instructionExample": "Наприклад, складіть речення", "field.taskText": "Текст завдання", "field.mediaContent": "Посилання або вміст", "field.answer": "Правильна відповідь", "field.enterText": "Введіть текст або вставте посилання", "hint.drag": "слова у правильному порядку", "hint.blank": "використовуйте ___ для пропуску", "hint.options": "кожен варіант з нового рядка", "hint.order": "кожен елемент з нового рядка", "hint.sentences": "кожне речення з нового рядка", "hint.match": "пара у форматі слово = переклад, одна на рядок", "hint.columns": "категорія: елемент, кожен з нового рядка", "hint.table": "колонки розділіть |, порожні комірки позначте ___", "hint.select": "1-й рядок: речення з ___, далі варіанти (або лише варіанти)", "hint.trueFalse": "твердження для перевірки", "hint.cards": "картка: переклад, по одній на рядок", "hint.answerSlash": "слова через /", "hint.answerText": "слово або фраза", "hint.answerChoice": "точний текст правильної відповіді", "hint.answerOrder": "правильний порядок через /", "hint.optional": "необов’язково", "hint.correctChoice": "правильний варіант",
        "picker.title": "Виберіть інтерактивне завдання", "picker.all": "Усі", "picker.tests": "Тести", "picker.media": "Медіа", "picker.other": "Інше", "picker.search": "Пошук блоку…", "picker.back": "← До уроку",
        "activity.task": "Завдання", "activity.drag": "Перетягнути слова", "activity.dragDesc": "Складіть речення зі слів у правильному порядку.", "activity.blank": "Заповнити пропуск", "activity.blankDesc": "Впишіть відповідне слово у пропуск.", "activity.choice": "Вибрати варіант", "activity.choiceDesc": "Виберіть одну правильну відповідь.", "activity.order": "Правильний порядок", "activity.orderDesc": "Розташуйте елементи у правильному порядку.", "activity.sentences": "Порядок речень", "activity.sentencesDesc": "Складіть зв’язний текст із речень.", "activity.dropdown": "Один із варіантів", "activity.dropdownDesc": "Заповніть пропуск, вибравши слово зі списку.", "activity.trueFalse": "True або False", "activity.trueFalseDesc": "Визначте, чи є твердження правильним.", "activity.table": "Заповнити таблицю", "activity.tableDesc": "Внесіть відповіді до таблиці.", "activity.match": "Поєднати елементи", "activity.matchDesc": "Поєднайте слова з їхніми значеннями.", "activity.columns": "Розподілити за колонками", "activity.columnsDesc": "Розкладіть картки за категоріями.", "activity.open": "Відкрита відповідь", "activity.openDesc": "Додайте запитання з відповіддю своїми словами.", "activity.cards": "Картки", "activity.cardsDesc": "Створіть картки зі словом і перекладом.", "activity.text": "Заголовок і текст", "activity.textDesc": "Додайте пояснення або інструкцію.", "activity.video": "Відео", "activity.videoDesc": "Вставте посилання на відео.", "activity.audio": "Аудіо", "activity.audioDesc": "Додайте аудіо або посилання на запис.", "activity.image": "Зображення", "activity.imageDesc": "Додайте зображення до уроку.",
        "material.name": "Назва", "material.example": "Наприклад, Слова на тему «Їжа»", "material.type": "Тип матеріалу", "material.description": "Опис", "material.shortDescription": "Короткий опис", "material.url": "Посилання (необов’язково)", "material.add": "Додати матеріал", "material.noDescription": "Без опису",
        "toast.classCreated": "Клас створено.", "toast.classUpdated": "Клас оновлено.", "toast.classDeleted": "Клас видалено.", "toast.lessonCreated": "Урок створено.", "toast.lessonUpdated": "Урок оновлено.", "toast.lessonDeleted": "Урок видалено.", "toast.activityUpdated": "Завдання збережено.", "toast.activityDeleted": "Завдання видалено.", "toast.activityOrderSaved": "Порядок завдань збережено.", "toast.materialAdded": "Матеріал додано до бібліотеки.", "toast.materialDeleted": "Матеріал видалено.", "toast.createClassFirst": "Спочатку створіть клас, щоб призначити йому урок.", "toast.titleAndClass": "Вкажіть назву уроку та виберіть клас.", "toast.httpUrl": "Посилання має починатися з http:// або https://.", "toast.storageError": "Не вдалося зберегти зміни у браузері. Перевірте доступ до локального сховища.",
        "confirm.deleteClass": "Видалити клас «{name}»? Уроки залишаться у списку без класу.", "confirm.deleteLesson": "Видалити урок «{name}»?", "confirm.deleteActivity": "Видалити це завдання?", "confirm.deleteMaterial": "Видалити матеріал «{name}»?", "course.slovakA1": "Словацька · A1", "course.slovakB1": "Словацька · B1", "material.vocabulary": "Словник", "material.document": "Документ", "material.audio": "Аудіо", "material.video": "Відео", "material.link": "Посилання"
    },
    ru: {
        "nav.loading": "Открываем раздел…",
        "nav.overview": "Обзор", "nav.classes": "Классы", "nav.lessons": "Уроки", "nav.materials": "Материалы", "nav.students": "Ученики", "nav.home": "← На главную", "nav.label": "Основная навигация", "brand.home": "SlovaSofi — на главную", "language.label": "Язык", "menu.open": "Открыть меню", "header.notifications": "Уведомления", "modal.close": "Закрыть", "teacher.role": "Преподаватель", "school.profile": "Профиль школы", "profile.open": "Профиль пользователя: {name}", "profile.title": "Профиль пользователя", "profile.signedOut": "Гость", "profile.notSignedIn": "Вы не вошли в учётную запись", "profile.logout": "Выйти из профиля", "profile.login": "Войти", "profile.logoutError": "Не удалось выйти из профиля. Попробуйте ещё раз.", "profile.loadError": "Не удалось загрузить профиль пользователя.", "school.title": "Профиль школы", "school.purpose": "Профиль школы — это общее пространство SlovaSofi. Здесь находятся классы, уроки и учебные материалы школы.", "school.workspace": "Учебное пространство", "school.workspaceDetail": "Общие классы, уроки и материалы", "notifications.title": "Уведомления", "notifications.empty": "Пока нет уведомлений", "notifications.description": "Здесь будут появляться обновления о классах, уроках и учениках.", "class.noClass": "Без класса",
        "nav.calendar": "Календарь", "calendar.title": "Расписание занятий", "calendar.description": "Планируйте занятия для классов. Ученики увидят расписание в своём кабинете.", "calendar.add": "＋ Добавить занятие", "calendar.today": "Сегодня", "calendar.empty": "На этот день занятий нет", "calendar.noEvents": "Пока нет запланированных занятий", "calendar.createFirst": "Добавьте занятие — оно появится здесь и в расписании учеников.", "calendar.newEvent": "Новое занятие", "calendar.editEvent": "Изменить занятие", "calendar.titleLabel": "Тема занятия", "calendar.classLabel": "Класс", "calendar.lessonLabel": "Урок (необязательно)", "calendar.noLesson": "Без привязки к уроку", "calendar.dateLabel": "Дата и время", "calendar.duration": "Длительность", "calendar.minutes": "мин.", "calendar.repeat": "Повтор", "calendar.noRepeat": "Не повторять", "calendar.weekly": "Каждую неделю", "calendar.repeatUntil": "Повторять до", "calendar.save": "Сохранить занятие", "calendar.delete": "Удалить занятие", "calendar.cancel": "Отмена", "calendar.saved": "Занятие добавлено в расписание.", "calendar.updated": "Расписание обновлено.", "calendar.deleted": "Занятие удалено.", "calendar.loadError": "Не удалось загрузить расписание.", "calendar.saveError": "Не удалось сохранить занятие:", "calendar.deleteConfirm": "Удалить занятие и все его повторы?", "calendar.recurring": "Каждую неделю", "calendar.minutesShort": "мин", "calendar.noClasses": "Сначала создайте класс, чтобы запланировать занятие.", "calendar.soundReminder": "Скоро занятие: {title}",
        "page.overview": "Обзор", "page.classes": "Классы", "page.lessons": "Уроки", "page.materials": "Материалы", "page.students": "Ученики", "pageTitle": "Кабинет преподавателя", "welcome.badge": "ПАНЕЛЬ ПРЕПОДАВАТЕЛЯ · SLOVASOFI", "welcome.title": "Добрый день, {name} 👋", "welcome.text": "Ваши занятия и материалы в одном месте.", "welcome.storage": "✓ Демо-данные сохраняются в этом браузере", "action.createLesson": "＋ Создать урок",
        "stat.classes": "Создано классов", "stat.students": "Учеников в классах", "stat.lessons": "Создано уроков", "stat.materials": "Материалы", "overview.recent": "Последние уроки", "overview.recentHint": "Ваши недавно созданные уроки", "overview.allLessons": "Все уроки →", "overview.yourClasses": "Ваши классы", "overview.groups": "Группы учеников", "overview.allClasses": "Все классы →",
        "classes.title": "Классы", "classes.description": "Создавайте группы и назначайте им отдельные уроки.", "classes.create": "＋ Создать класс", "classes.search": "Поиск классов…", "classes.lessons": "Уроки →", "classes.notFound": "Классы не найдены", "classes.notFoundHint": "Измените запрос или создайте новый класс.",
        "lessons.title": "Уроки", "lessons.description": "Собирайте интерактивные задания и назначайте их классам.", "lessons.add": "＋ Добавить урок", "lessons.allClasses": "Все классы", "lessons.search": "Поиск урока…", "lessons.notFound": "Уроков пока нет", "lessons.notFoundHint": "Нажмите «Добавить урок», чтобы выбрать типы заданий.", "lessons.blocks": "блоков", "lessons.block": "блок", "lessons.task": "задание", "lessons.tasks": "заданий",
        "materials.title": "Материалы", "materials.description": "Общая библиотека файлов, ссылок и учебных ресурсов.", "materials.add": "＋ Добавить материал", "materials.total": "Всего материалов: {count}", "materials.search": "Поиск материалов…", "materials.open": "Открыть материал ↗", "materials.inLibrary": "Добавлен в библиотеку", "materials.notFound": "Материалы не найдены", "materials.notFoundHint": "Добавьте первый материал или измените запрос.",
        "students.title": "Ученики", "students.description": "Список учеников, распределённых по вашим классам.", "students.manage": "Управлять классами", "students.total": "Всего учеников: {count}", "students.search": "Поиск ученика…", "students.role": "Ученик SlovaSofi", "students.notFound": "Ученики не найдены", "students.notFoundHint": "Добавьте учеников в классы, чтобы они появились здесь.", "presence.online": "Онлайн", "presence.offline": "Офлайн",
        "empty.noClasses": "Классов пока нет", "empty.createClass": "Создайте класс, чтобы назначать уроки.", "empty.search": "Ничего не найдено", "empty.changeSearch": "Измените поисковый запрос.",
        "modal.editClass": "Редактировать класс", "modal.newClass": "Новый класс", "field.className": "Название класса", "field.course": "Курс или уровень", "field.students": "Ученики", "field.studentsPlaceholder": "Введите имена через запятую", "field.studentsHint": "Каждое имя станет отдельным учеником.", "action.addStudent": "＋ Добавить ученика", "field.exampleClass": "Например, Словацкий A1", "field.exampleCourse": "Например, Словацкий · A1", "action.cancel": "Отмена", "action.save": "Сохранить", "action.createClass": "Создать класс", "action.delete": "Удалить", "class.unnamedCourse": "Курс не указан",
        "modal.editLesson": "Редактировать урок", "modal.newLesson": "Новый урок", "field.lessonTitle": "Название урока", "field.exampleLesson": "Например, Lekcia 5. Rodina", "field.chooseClass": "Выберите класс", "lesson.activities": "Задания урока", "activity.addBlock": "＋ Добавить блок", "lesson.firstActivity": "Добавьте первое задание", "lesson.firstActivityHint": "Выберите тип блока: перетягивание, пропуск, порядок, соответствия и другие.", "lesson.save": "Сохранить урок", "lesson.create": "Создать урок",
        "field.instruction": "Инструкция", "field.instructionExample": "Например, соберите предложение", "field.taskText": "Текст задания", "field.mediaContent": "Ссылка или содержимое", "field.answer": "Правильный ответ", "field.enterText": "Введите текст или вставьте ссылку", "hint.drag": "слова в правильном порядке", "hint.blank": "используйте ___ для пропуска", "hint.options": "каждый вариант с новой строки", "hint.order": "каждый элемент с новой строки", "hint.sentences": "каждое предложение с новой строки", "hint.match": "пара в формате слово = перевод, одна на строку", "hint.columns": "категория: элемент, каждый с новой строки", "hint.table": "колонки разделяйте |, пустые ячейки отмечайте ___", "hint.select": "1-я строка: предложение с ___, далее варианты (или только варианты)", "hint.trueFalse": "утверждение для проверки", "hint.cards": "карточка: перевод, по одной на строку", "hint.answerSlash": "слова через /", "hint.answerText": "слово или фраза", "hint.answerChoice": "точный текст верного варианта", "hint.answerOrder": "правильный порядок через /", "hint.optional": "необязательно", "hint.correctChoice": "правильный вариант",
        "picker.title": "Выберите интерактивное задание", "picker.all": "Все", "picker.tests": "Тесты", "picker.media": "Медиа", "picker.other": "Другое", "picker.search": "Поиск блока…", "picker.back": "← К уроку",
        "activity.task": "Задание", "activity.drag": "Перетянуть слова", "activity.dragDesc": "Соберите предложение из слов в правильном порядке.", "activity.blank": "Заполнить пропуск", "activity.blankDesc": "Впишите подходящее слово в пропуск.", "activity.choice": "Выбрать вариант", "activity.choiceDesc": "Выберите один правильный ответ.", "activity.order": "Правильный порядок", "activity.orderDesc": "Расставьте элементы по порядку.", "activity.sentences": "Порядок предложений", "activity.sentencesDesc": "Соберите связный текст из предложений.", "activity.dropdown": "Один из вариантов", "activity.dropdownDesc": "Заполните пропуск, выбрав слово из списка.", "activity.trueFalse": "True или False", "activity.trueFalseDesc": "Оцените утверждение как верное или ложное.", "activity.table": "Заполнить таблицу", "activity.tableDesc": "Внесите ответы в таблицу.", "activity.match": "Соединить элементы", "activity.matchDesc": "Соедините слова и их значения.", "activity.columns": "Распределить по колонкам", "activity.columnsDesc": "Разложите карточки по категориям.", "activity.open": "Открытый ответ", "activity.openDesc": "Добавьте вопрос с ответом своими словами.", "activity.cards": "Флип-карточки", "activity.cardsDesc": "Создайте карточки со словом и переводом.", "activity.text": "Заголовок и текст", "activity.textDesc": "Добавьте пояснение или инструкцию.", "activity.video": "Видео", "activity.videoDesc": "Вставьте ссылку на видео.", "activity.audio": "Аудио", "activity.audioDesc": "Добавьте аудио или ссылку на запись.", "activity.image": "Картинка", "activity.imageDesc": "Добавьте изображение в урок.",
        "material.name": "Название", "material.example": "Например, Слова по теме «Еда»", "material.type": "Тип материала", "material.description": "Описание", "material.shortDescription": "Краткое описание", "material.url": "Ссылка (необязательно)", "material.add": "Добавить материал", "material.noDescription": "Без описания",
        "toast.classCreated": "Класс создан.", "toast.classUpdated": "Класс обновлён.", "toast.classDeleted": "Класс удалён.", "toast.lessonCreated": "Урок создан.", "toast.lessonUpdated": "Урок обновлён.", "toast.lessonDeleted": "Урок удалён.", "toast.activityUpdated": "Задание сохранено.", "toast.activityDeleted": "Задание удалено.", "toast.activityOrderSaved": "Порядок заданий сохранён.", "toast.materialAdded": "Материал добавлен в библиотеку.", "toast.materialDeleted": "Материал удалён.", "toast.createClassFirst": "Сначала создайте класс, чтобы назначить ему урок.", "toast.titleAndClass": "Укажите название урока и выберите класс.", "toast.httpUrl": "Ссылка должна начинаться с http:// или https://.", "toast.storageError": "Не удалось сохранить изменения в браузере. Проверьте доступ к локальному хранилищу.",
        "confirm.deleteClass": "Удалить класс «{name}»? Уроки останутся в списке без класса.", "confirm.deleteLesson": "Удалить урок «{name}»?", "confirm.deleteActivity": "Удалить это задание?", "confirm.deleteMaterial": "Удалить материал «{name}»?", "course.slovakA1": "Словацкий · A1", "course.slovakB1": "Словацкий · B1", "material.vocabulary": "Словарь", "material.document": "Документ", "material.audio": "Аудио", "material.video": "Видео", "material.link": "Ссылка"
    },
    en: {
        "nav.loading": "Opening section…",
        "nav.overview": "Overview", "nav.classes": "Classes", "nav.lessons": "Lessons", "nav.materials": "Materials", "nav.students": "Students", "nav.home": "← Home", "nav.label": "Main navigation", "brand.home": "SlovaSofi — home", "language.label": "Language", "menu.open": "Open menu", "header.notifications": "Notifications", "modal.close": "Close", "teacher.role": "Teacher", "school.profile": "School profile", "profile.open": "User profile: {name}", "profile.title": "User profile", "profile.signedOut": "Guest", "profile.notSignedIn": "You are not signed in", "profile.logout": "Sign out", "profile.login": "Sign in", "profile.logoutError": "Could not sign out. Please try again.", "profile.loadError": "Could not load the user profile.", "school.title": "School profile", "school.purpose": "The school profile is SlovaSofi’s shared workspace. It brings the school’s classes, lessons, and learning materials together.", "school.workspace": "Learning workspace", "school.workspaceDetail": "Shared classes, lessons, and materials", "notifications.title": "Notifications", "notifications.empty": "No notifications yet", "notifications.description": "Updates about classes, lessons, and students will appear here.", "class.noClass": "No class",
        "page.overview": "Overview", "page.classes": "Classes", "page.lessons": "Lessons", "page.materials": "Materials", "page.students": "Students", "pageTitle": "Teacher dashboard", "welcome.badge": "TEACHER DASHBOARD · SLOVASOFI", "welcome.title": "Good day, {name} 👋", "welcome.text": "Your lessons and materials in one place.", "welcome.storage": "✓ Demo data is saved in this browser", "action.createLesson": "＋ Create lesson",
        "stat.classes": "Classes created", "stat.students": "Students in classes", "stat.lessons": "Lessons created", "stat.materials": "Materials", "overview.recent": "Recent lessons", "overview.recentHint": "Lessons assigned to your classes", "overview.allLessons": "All lessons →", "overview.yourClasses": "Your classes", "overview.groups": "Student groups", "overview.allClasses": "All classes →",
        "classes.title": "Classes", "classes.description": "Create groups and assign individual lessons to them.", "classes.create": "＋ Create class", "classes.search": "Search classes…", "classes.lessons": "Lessons →", "classes.notFound": "No classes found", "classes.notFoundHint": "Change your search or create a new class.",
        "lessons.title": "Lessons", "lessons.description": "Build interactive activities and assign them to classes.", "lessons.add": "＋ Add lesson", "lessons.allClasses": "All classes", "lessons.search": "Search lessons…", "lessons.notFound": "No lessons yet", "lessons.notFoundHint": "Select “Add lesson” to choose activity types.", "lessons.blocks": "blocks", "lessons.block": "block", "lessons.task": "activity", "lessons.tasks": "activities",
        "materials.title": "Materials", "materials.description": "A shared library of files, links, and learning resources.", "materials.add": "＋ Add material", "materials.total": "Total materials: {count}", "materials.search": "Search materials…", "materials.open": "Open material ↗", "materials.inLibrary": "Added to library", "materials.notFound": "No materials found", "materials.notFoundHint": "Add your first material or change the search.",
        "students.title": "Students", "students.description": "Students organized by your classes.", "students.manage": "Manage classes", "students.total": "Total students: {count}", "students.search": "Search students…", "students.role": "SlovaSofi student", "students.notFound": "No students found", "students.notFoundHint": "Add students to classes to see them here.", "presence.online": "Online", "presence.offline": "Offline",
        "empty.noClasses": "No classes yet", "empty.createClass": "Create a class to assign lessons.", "empty.search": "Nothing found", "empty.changeSearch": "Try a different search.",
        "modal.editClass": "Edit class", "modal.newClass": "New class", "field.className": "Class name", "field.course": "Course or level", "field.students": "Students", "field.studentsPlaceholder": "Enter names separated by commas", "field.studentsHint": "Each name will be added as a student.", "action.addStudent": "＋ Add student", "field.exampleClass": "For example, Slovak A1", "field.exampleCourse": "For example, Slovak · A1", "action.cancel": "Cancel", "action.save": "Save", "action.createClass": "Create class", "action.delete": "Delete", "class.unnamedCourse": "Course not specified",
        "modal.editLesson": "Edit lesson", "modal.newLesson": "New lesson", "field.lessonTitle": "Lesson name", "field.exampleLesson": "For example, Lekcia 5. Rodina", "field.chooseClass": "Choose a class", "lesson.activities": "Lesson activities", "activity.addBlock": "＋ Add activity", "lesson.firstActivity": "Add your first activity", "lesson.firstActivityHint": "Choose a block: drag and drop, fill in the blank, ordering, matching, and more.", "lesson.save": "Save lesson", "lesson.create": "Create lesson",
        "field.instruction": "Instructions", "field.instructionExample": "For example, arrange the sentence", "field.taskText": "Activity text", "field.mediaContent": "Link or content", "field.answer": "Correct answer", "field.enterText": "Enter text or paste a link", "hint.drag": "words in the correct order", "hint.blank": "use ___ for the blank", "hint.options": "one option per line", "hint.order": "one item per line", "hint.sentences": "one sentence per line", "hint.match": "pair format word = translation, one per line", "hint.columns": "category: item, one per line", "hint.table": "separate columns with | and mark empty cells with ___", "hint.select": "line 1: sentence with ___, then options (or options only)", "hint.trueFalse": "statement to evaluate", "hint.cards": "card: translation, one per line", "hint.answerSlash": "separate words with /", "hint.answerText": "word or phrase", "hint.answerChoice": "exact text of the correct answer", "hint.answerOrder": "correct order separated by /", "hint.optional": "optional", "hint.correctChoice": "correct option",
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
Object.assign(translations.ua, {
    "nav.calendar": "Календар",
    "page.calendar": "Календар",
    "calendar.title": "Розклад занять",
    "calendar.description": "Плануйте заняття для класів. Учні побачать розклад у своєму кабінеті.",
    "calendar.add": "＋ Додати заняття",
    "calendar.today": "Сьогодні",
    "calendar.empty": "На цей день занять немає",
    "calendar.noEvents": "Поки немає запланованих занять",
    "calendar.createFirst": "Додайте заняття — воно з’явиться тут і в розкладі учнів.",
    "calendar.newEvent": "Нове заняття",
    "calendar.editEvent": "Редагувати заняття",
    "calendar.titleLabel": "Тема заняття",
    "calendar.classLabel": "Клас",
    "calendar.lessonLabel": "Урок (необов’язково)",
    "calendar.noLesson": "Без прив’язки до уроку",
    "calendar.dateLabel": "Дата і час",
    "calendar.duration": "Тривалість",
    "calendar.minutes": "хв",
    "calendar.repeat": "Повтор",
    "calendar.noRepeat": "Не повторювати",
    "calendar.weekly": "Щотижня",
    "calendar.daily": "Щодня",
    "calendar.everyOtherDay": "Через день",
    "calendar.customDays": "Вибрати дні тижня",
    "calendar.repeatDaysLabel": "Дні проведення занять",
    "calendar.repeatDaysHint": "Оберіть один або кілька днів.",
    "calendar.monday": "Понеділок",
    "calendar.tuesday": "Вівторок",
    "calendar.wednesday": "Середа",
    "calendar.thursday": "Четвер",
    "calendar.friday": "П’ятниця",
    "calendar.saturday": "Субота",
    "calendar.sunday": "Неділя",
    "calendar.repeatUntil": "Повторювати до",
    "calendar.save": "Зберегти заняття",
    "calendar.delete": "Видалити заняття",
    "calendar.cancel": "Скасувати",
    "calendar.saved": "Заняття додано до розкладу.",
    "calendar.updated": "Розклад оновлено.",
    "calendar.deleted": "Заняття видалено.",
    "calendar.loadError": "Не вдалося завантажити розклад.",
    "calendar.saveError": "Не вдалося зберегти заняття:",
    "calendar.deleteConfirm": "Видалити заняття та всі його повтори?",
    "calendar.recurring": "Щотижня",
    "calendar.minutesShort": "хв",
    "calendar.noClasses": "Спочатку створіть клас, щоб запланувати заняття.",
    "calendar.soundReminder": "Незабаром заняття: {title}",
    "calendar.upcoming": "Найближчі заняття",
    "calendar.upcomingHint": "Наступні 30 днів",
    "calendar.open": "Відкрити календар →",
    "calendar.invalidDate": "Виберіть коректні дату й час.",
    "calendar.invalidClass": "Виберіть клас зі списку.",
    "calendar.invalidRepeat": "Дата завершення має бути в межах року від початку.",
    "calendar.invalidRepeatDays": "Оберіть щонайменше один день тижня.",
    "calendar.migrationRequired": "Календар ще не налаштований у базі. Адміністратор має застосувати міграції Supabase командою supabase db push."
});
Object.assign(translations.en, {
    "nav.calendar": "Calendar",
    "page.calendar": "Calendar",
    "calendar.title": "Class schedule",
    "calendar.description": "Schedule a class session. Students will see it in their dashboard.",
    "calendar.add": "＋ Add session",
    "calendar.today": "Today",
    "calendar.empty": "No sessions on this day",
    "calendar.noEvents": "No sessions scheduled yet",
    "calendar.createFirst": "Add a session to show it here and in your students' schedule.",
    "calendar.newEvent": "New session",
    "calendar.editEvent": "Edit session",
    "calendar.titleLabel": "Session topic",
    "calendar.classLabel": "Class",
    "calendar.lessonLabel": "Lesson (optional)",
    "calendar.noLesson": "No linked lesson",
    "calendar.dateLabel": "Date and time",
    "calendar.duration": "Duration",
    "calendar.minutes": "min",
    "calendar.repeat": "Repeat",
    "calendar.noRepeat": "Does not repeat",
    "calendar.weekly": "Weekly",
    "calendar.daily": "Every day",
    "calendar.everyOtherDay": "Every other day",
    "calendar.customDays": "Choose weekdays",
    "calendar.repeatDaysLabel": "Class days",
    "calendar.repeatDaysHint": "Select one or more weekdays.",
    "calendar.monday": "Monday",
    "calendar.tuesday": "Tuesday",
    "calendar.wednesday": "Wednesday",
    "calendar.thursday": "Thursday",
    "calendar.friday": "Friday",
    "calendar.saturday": "Saturday",
    "calendar.sunday": "Sunday",
    "calendar.repeatUntil": "Repeat until",
    "calendar.save": "Save session",
    "calendar.delete": "Delete session",
    "calendar.cancel": "Cancel",
    "calendar.saved": "Session added to the schedule.",
    "calendar.updated": "Schedule updated.",
    "calendar.deleted": "Session deleted.",
    "calendar.loadError": "Could not load the schedule.",
    "calendar.saveError": "Could not save the session:",
    "calendar.deleteConfirm": "Delete this session and all its repeats?",
    "calendar.recurring": "Weekly",
    "calendar.minutesShort": "min",
    "calendar.noClasses": "Create a class before scheduling a session.",
    "calendar.soundReminder": "Upcoming session: {title}",
    "calendar.upcoming": "Upcoming sessions",
    "calendar.upcomingHint": "Next 30 days",
    "calendar.open": "Open calendar →",
    "calendar.invalidDate": "Choose a valid date and time.",
    "calendar.invalidClass": "Choose a class from the list.",
    "calendar.invalidRepeat": "The repeat end date must be within one year.",
    "calendar.invalidRepeatDays": "Select at least one weekday.",
    "calendar.migrationRequired": "The calendar database is not set up yet. An administrator must apply the Supabase migrations with supabase db push."
});
for (const [language, labels] of Object.entries({
    ua: {
        "activity.recording": "Запис вимови",
        "activity.recordingDesc": "Учень записує вимову слова або речення й надсилає її викладачу.",
        "activity.listeningQuiz": "Аудіювання з питаннями",
        "activity.listeningQuizDesc": "Одне аудіо та кілька питань із варіантами відповідей.",
        "activity.findError": "Знайди помилку в тексті",
        "activity.findErrorDesc": "Учень вибирає слово з помилкою та вводить виправлення.",
        "activity.hotspots": "Інтерактивне зображення",
        "activity.hotspotsDesc": "Позначте на зображенні слова, переклади й вимову.",
        "activity.vocabulary": "Словник уроку",
        "activity.vocabularyDesc": "Картки нових слів із перекладом та аудіо."
    },
    ru: {
        "activity.recording": "Запись произношения",
        "activity.recordingDesc": "Ученик записывает слово или фразу и отправляет преподавателю.",
        "activity.listeningQuiz": "Аудирование с вопросами",
        "activity.listeningQuizDesc": "Одно аудио и несколько вопросов с вариантами ответов.",
        "activity.findError": "Найди ошибку в тексте",
        "activity.findErrorDesc": "Ученик выбирает ошибочное слово и вводит исправление.",
        "activity.hotspots": "Интерактивная картинка",
        "activity.hotspotsDesc": "Отметьте на картинке слова, переводы и произношение.",
        "activity.vocabulary": "Словарь урока",
        "activity.vocabularyDesc": "Карточки новых слов с переводом и аудио."
    },
    en: {
        "activity.recording": "Pronunciation recording",
        "activity.recordingDesc": "Students record a word or sentence and send it to the teacher.",
        "activity.listeningQuiz": "Listening with questions",
        "activity.listeningQuizDesc": "One audio track followed by multiple-choice questions.",
        "activity.findError": "Find the text error",
        "activity.findErrorDesc": "Students select an incorrect word and enter a correction.",
        "activity.hotspots": "Interactive image",
        "activity.hotspotsDesc": "Mark words, translations, and pronunciation on an image.",
        "activity.vocabulary": "Lesson vocabulary",
        "activity.vocabularyDesc": "New-word flashcards with translations and audio."
    }
})) Object.assign(translations[language], labels);
Object.assign(translations.ru, { "nav.calendar": "Календарь", "page.calendar": "Календарь" });
Object.assign(translations.ru, {
    "calendar.upcoming": "Ближайшие занятия",
    "calendar.upcomingHint": "Следующие 30 дней",
    "calendar.open": "Открыть календарь →",
    "calendar.invalidDate": "Выберите корректные дату и время.",
    "calendar.invalidClass": "Выберите класс из списка.",
    "calendar.invalidRepeat": "Дата повтора должна быть в пределах года после начала.",
    "calendar.daily": "Каждый день",
    "calendar.everyOtherDay": "Через день",
    "calendar.customDays": "Выбрать дни недели",
    "calendar.repeatDaysLabel": "Дни проведения занятий",
    "calendar.repeatDaysHint": "Выберите один или несколько дней.",
    "calendar.monday": "Понедельник",
    "calendar.tuesday": "Вторник",
    "calendar.wednesday": "Среда",
    "calendar.thursday": "Четверг",
    "calendar.friday": "Пятница",
    "calendar.saturday": "Суббота",
    "calendar.sunday": "Воскресенье",
    "calendar.invalidRepeatDays": "Выберите хотя бы один день недели.",
    "calendar.migrationRequired": "Календарь ещё не настроен в базе. Администратору нужно применить миграции Supabase командой supabase db push."
});
Object.assign(translations.ua, {
    "calendar.selectedDates": "Обрати конкретні дати",
    "calendar.selectedDatesLabel": "Дати занять",
    "calendar.selectedDatesHint": "Натискайте на дати в календарі. Час кожного заняття буде однаковим.",
    "calendar.selectedDatesCount": "Обрано дат: {count}",
    "calendar.invalidSelectedDates": "Оберіть дату початку та інші дати в межах року після неї."
});
Object.assign(translations.ru, {
    "calendar.selectedDates": "Выбрать конкретные даты",
    "calendar.selectedDatesLabel": "Даты занятий",
    "calendar.selectedDatesHint": "Нажимайте на даты в календаре. Время каждого занятия будет одинаковым.",
    "calendar.selectedDatesCount": "Выбрано дат: {count}",
    "calendar.invalidSelectedDates": "Выберите дату начала и остальные даты в пределах года после неё."
});
Object.assign(translations.en, {
    "calendar.selectedDates": "Choose specific dates",
    "calendar.selectedDatesLabel": "Session dates",
    "calendar.selectedDatesHint": "Select dates on the calendar. Each session will use the same time.",
    "calendar.selectedDatesCount": "Dates selected: {count}",
    "calendar.invalidSelectedDates": "Select the start date and any other dates within one year of it."
});
Object.assign(translations.ua, {
    "welcome.morning": "Доброго ранку, {name} ☀️",
    "welcome.day": "Добрий день, {name} 👋",
    "welcome.evening": "Добрий вечір, {name} 🌇",
    "welcome.night": "Ніч надворі — чого не спиш, {name}? 🌙"
});
Object.assign(translations.ru, {
    "welcome.morning": "Доброе утро, {name} ☀️",
    "welcome.day": "Добрый день, {name} 👋",
    "welcome.evening": "Добрый вечер, {name} 🌇",
    "welcome.night": "Ночь на дворе — чего не спишь, {name}? 🌙"
});
Object.assign(translations.en, {
    "welcome.morning": "Good morning, {name} ☀️",
    "welcome.day": "Good afternoon, {name} 👋",
    "welcome.evening": "Good evening, {name} 🌇",
    "welcome.night": "It's late — still up, {name}? 🌙"
});
Object.assign(translations.ua, {
    "theme.switchToDark": "Увімкнути нічну тему",
    "theme.switchToLight": "Увімкнути світлу тему",
    "theme.saveError": "Не вдалося зберегти налаштування теми."
});
Object.assign(translations.ru, {
    "theme.switchToDark": "Включить ночную тему",
    "theme.switchToLight": "Включить светлую тему",
    "theme.saveError": "Не удалось сохранить настройку темы."
});
Object.assign(translations.en, {
    "theme.switchToDark": "Switch to dark theme",
    "theme.switchToLight": "Switch to light theme",
    "theme.saveError": "Could not save the theme preference."
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
let currentTheme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
let themeUpdateTimer = null;
let currentUser = null;
let workspaceAccess = { workspaceOwnerId: null, permissions: ownerPermissions, staff: [] };
let calendarEvents = [];
let calendarMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
let calendarReminderTimer = null;
let calendarChannel = null;
let calendarAudioContext = null;
const playedCalendarReminders = new Set();
let presenceChannels = [];
let onlineUserIds = new Set();
let workspaceSaveQueue = Promise.resolve(true);
let openPopover = "";

const imageUploadMessages = {
    ua: { uploading: "Завантаження зображення…", done: "Зображення додано.", failed: "Не вдалося завантажити зображення:", login: "Увійдіть у кабінет, щоб завантажувати зображення.", type: "Вставте файл зображення." },
    ru: { uploading: "Загрузка изображения…", done: "Изображение добавлено.", failed: "Не удалось загрузить изображение:", login: "Войдите в кабинет, чтобы загружать изображения.", type: "Вставьте файл изображения." },
    en: { uploading: "Uploading image…", done: "Image added.", failed: "Could not upload the image:", login: "Sign in to upload images.", type: "Paste an image file." }
};

imageUploadMessages.ua.copyFailed = "Копію не збережено.";
imageUploadMessages.ru.copyFailed = "Копия не сохранена.";
imageUploadMessages.en.copyFailed = "No copy was saved.";
imageUploadMessages.ua.chooseFile = "Завантажити з комп’ютера";
imageUploadMessages.ru.chooseFile = "Загрузить с компьютера";
imageUploadMessages.en.chooseFile = "Upload from computer";
imageUploadMessages.ua.galleryHint = "Одне зображення на рядок. Якщо їх кілька, учень побачить слайдер; на зображення можна натиснути, щоб збільшити.";
imageUploadMessages.ru.galleryHint = "Одно изображение на строку. Если их несколько, ученик увидит слайдер; на изображение можно нажать, чтобы увеличить.";
imageUploadMessages.en.galleryHint = "One image per line. With several, students get a slider; click an image to enlarge it.";
imageUploadMessages.ua.linkOnly = "Сайт не дозволяє зберегти копію, використано посилання. Завантажте файл з комп’ютера, щоб зображення не зникло.";
imageUploadMessages.ru.linkOnly = "Сайт не разрешает сохранить копию, использована ссылка. Загрузите файл с компьютера, чтобы изображение не пропало.";
imageUploadMessages.en.linkOnly = "The site does not allow saving a copy, so the link is used. Upload the file from your computer to keep the image.";

function readRawPixels(bitmap) {
    const gl = document.createElement("canvas").getContext("webgl", { premultipliedAlpha: false, preserveDrawingBuffer: true });
    if (!gl) return null;
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, gl.NONE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bitmap);
    const framebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    const pixels = new Uint8ClampedArray(bitmap.width * bitmap.height * 4);
    gl.readPixels(0, 0, bitmap.width, bitmap.height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    return pixels;
}

// Windows screenshots can arrive with zero alpha everywhere; the colours are intact, so rebuild an opaque image.
async function recoverTransparentImage(file) {
    const bitmap = await createImageBitmap(file, { premultiplyAlpha: "none", colorSpaceConversion: "none" });
    const pixels = readRawPixels(bitmap);
    if (!pixels) return null;
    let hasColor = false;
    for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i + 3] === 0 && (pixels[i] || pixels[i + 1] || pixels[i + 2])) hasColor = true;
        pixels[i + 3] = 255;
    }
    const canvas = document.createElement("canvas");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    canvas.getContext("2d").putImageData(new ImageData(pixels, bitmap.width, bitmap.height), 0, 0);
    bitmap.close?.();
    return hasColor ? canvas : null;
}

async function resizeImageForUpload(file, strict = false) {
    if (file.type === "image/gif") return file;
    const bitmap = await createImageBitmap(file);
    if (!bitmap.width || !bitmap.height) throw new Error("Empty image");
    const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const context = canvas.getContext("2d");
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const sample = context.getImageData(0, 0, canvas.width, canvas.height).data;
    let visible = false;
    for (let i = 3; i < sample.length; i += 4) if (sample[i] > 0) { visible = true; break; }
    context.globalCompositeOperation = "destination-over";
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.globalCompositeOperation = "source-over";
    if (!visible) {
        const recovered = await recoverTransparentImage(file);
        if (recovered) context.drawImage(recovered, 0, 0, canvas.width, canvas.height);
    }
    bitmap.close?.();
    if (strict) {
        const final = context.getImageData(0, 0, canvas.width, canvas.height).data;
        let varied = false;
        for (let i = 4; i < final.length; i += 4) {
            if (Math.abs(final[i] - final[0]) > 12 || Math.abs(final[i + 1] - final[1]) > 12 || Math.abs(final[i + 2] - final[2]) > 12) { varied = true; break; }
        }
        if (!varied) throw new Error("Blank image");
    }
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.88));
    if (!blob || blob.size < 100) throw new Error("Could not read the image");
    return blob;
}

async function uploadLessonImage(source, preserveOriginal = false) {
    const messages = imageUploadMessages[currentLanguage] || imageUploadMessages.ru;
    const candidates = (Array.isArray(source) ? source : [source]).filter((file) => file?.type?.startsWith("image/"));
    if (!candidates.length) throw new Error(messages.type);
    if (!currentUser || !window.supabaseClient) throw new Error(messages.login);
    const strict = Array.isArray(source);
    let prepared = null;
    let lastError = null;
    for (const candidate of candidates) {
        try {
            prepared = preserveOriginal ? candidate : await resizeImageForUpload(candidate, strict);
            break;
        } catch (error) {
            lastError = error;
        }
    }
    if (!prepared) throw lastError || new Error(messages.type);
    const extension = ({ "image/png": "png", "image/jpeg": "jpg", "image/gif": "gif", "image/webp": "webp" })[prepared.type] || "webp";
    const path = `${currentUser.id}/${crypto.randomUUID()}.${extension}`;
    const { error } = await window.supabaseClient.storage.from("lesson-images").upload(path, prepared, { contentType: prepared.type, cacheControl: "31536000", upsert: false });
    if (error) throw error;
    return window.supabaseClient.storage.from("lesson-images").getPublicUrl(path).data.publicUrl;
}

async function uploadLessonMedia(file) {
    const allowedTypes = new Set([
        "audio/mpeg", "audio/mp4", "audio/wav", "audio/x-wav", "audio/ogg", "audio/aac", "audio/webm",
        "video/mp4", "video/webm", "video/quicktime"
    ]);
    if (!allowedTypes.has(file?.type)) throw new Error("Поддерживаются MP3, M4A, WAV, OGG, AAC, MP4, WebM и MOV.");
    if (file.size > 50 * 1024 * 1024) throw new Error("Размер аудио- или видеофайла не должен превышать 50 МБ.");
    if (!currentUser || !window.supabaseClient) throw new Error("Войдите в кабинет преподавателя, чтобы загрузить файл.");
    const extension = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "bin";
    const path = `${currentUser.id}/${crypto.randomUUID()}.${extension}`;
    const { error } = await window.supabaseClient.storage.from("lesson-media").upload(path, file, {
        contentType: file.type,
        cacheControl: "31536000",
        upsert: false
    });
    if (error) throw error;
    return window.supabaseClient.storage.from("lesson-media").getPublicUrl(path).data.publicUrl;
}

const ownImageUrlPattern = /\/storage\/v1\/object\/public\/lesson-images\//;

// Pasting or typing an image address copies the picture into our own storage so it outlives the source site.
async function attachImageToBlock(file, textarea, block, sourceUrl = "") {
    const messages = imageUploadMessages[currentLanguage] || imageUploadMessages.ru;
    textarea.disabled = true;
    showToast(messages.uploading);
    try {
        let url = "";
        if (file) {
            url = await uploadLessonImage(file);
        } else if (/^https:\/\//i.test(sourceUrl)) {
            try {
                const { data, error } = await window.supabaseClient.functions.invoke("import-lesson-image", { body: { url: sourceUrl } });
                if (error || !data?.base64 || !data?.contentType?.startsWith("image/")) throw error || new Error("Import failed");
                const bytes = Uint8Array.from(atob(data.base64), (character) => character.charCodeAt(0));
                url = await uploadLessonImage(new Blob([bytes], { type: data.contentType }), true);
            } catch (error) {
                console.warn("Could not import the image through the server.", error);
            }
        }
        if (!url && sourceUrl) {
            try {
                const response = await fetch(sourceUrl);
                const blob = await response.blob();
                if (response.ok && blob.type.startsWith("image/")) url = await uploadLessonImage(blob, true);
            } catch (error) {
                console.warn("Could not fetch the image source.", error);
            }
        }
        if (!url && /^https?:\/\//i.test(sourceUrl)) {
            showToast(messages.linkOnly);
            return false;
        }
        if (!url) throw new Error(messages.type);
        const lines = String(block.content || "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
        const position = sourceUrl ? lines.indexOf(sourceUrl) : -1;
        if (position >= 0) lines[position] = url; else lines.push(url);
        block.content = lines.join("\n");
        textarea.value = block.content;
        showToast(messages.done);
        return true;
    } catch (error) {
        console.error("Could not upload the lesson image.", error);
        showToast(`${messages.failed} ${error.message || error}`);
        return false;
    } finally {
        textarea.disabled = false;
    }
}

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

function presenceBadge(userId) {
    const online = Boolean(userId && onlineUserIds.has(userId));
    const label = t(online ? "presence.online" : "presence.offline");
    return `<span class="presence-status ${online ? "is-online" : "is-offline"}" data-presence-user-id="${escapeHtml(userId || "")}" aria-label="${label}"><span class="presence-status-dot" aria-hidden="true"></span><span data-presence-label>${label}</span></span>`;
}

function refreshPresenceBadges() {
    document.querySelectorAll("[data-presence-user-id]").forEach((badge) => {
        const online = Boolean(badge.dataset.presenceUserId && onlineUserIds.has(badge.dataset.presenceUserId));
        badge.classList.toggle("is-online", online);
        badge.classList.toggle("is-offline", !online);
        badge.setAttribute("aria-label", t(online ? "presence.online" : "presence.offline"));
        badge.querySelector("[data-presence-label]").textContent = t(online ? "presence.online" : "presence.offline");
    });
}

function startPresenceTracking(client, workspaceIds, user) {
    presenceChannels.forEach((channel) => {
        client.removeChannel(channel).catch((error) => console.error("Could not stop the previous presence channel.", error));
    });
    presenceChannels = [];
    onlineUserIds = new Set();
    refreshPresenceBadges();
    if (!client?.channel || !user?.id) return;

    [...new Set(workspaceIds.filter(Boolean))].forEach((workspaceId) => {
        const channel = client.channel(`workspace-presence:${workspaceId}`, {
            config: { presence: { key: user.id } }
        });
        channel.on("presence", { event: "sync" }, () => {
            onlineUserIds = new Set(presenceChannels.flatMap((presenceChannel) =>
                Object.keys(presenceChannel.presenceState())));
            refreshPresenceBadges();
        });
        channel.subscribe(async (status) => {
            if (status === "SUBSCRIBED") {
                const { error } = await channel.track({ userId: user.id });
                if (error) console.error("Could not publish the current user's online status.", error);
            } else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
                console.error(`Presence channel failed: ${status}.`);
            }
        });
        presenceChannels.push(channel);
    });
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
    { id: "image", nameKey: "activity.image", descKey: "activity.imageDesc", icon: "▧", category: "media" },
    { id: "pronunciation-recording", nameKey: "activity.recording", descKey: "activity.recordingDesc", icon: "🎙", category: "media" },
    { id: "listening-questions", nameKey: "activity.listeningQuiz", descKey: "activity.listeningQuizDesc", icon: "🎧", category: "tests" },
    { id: "find-error", nameKey: "activity.findError", descKey: "activity.findErrorDesc", icon: "✎", category: "tests" },
    { id: "interactive-image", nameKey: "activity.hotspots", descKey: "activity.hotspotsDesc", icon: "▧", category: "media" },
    { id: "vocabulary", nameKey: "activity.vocabulary", descKey: "activity.vocabularyDesc", icon: "A", category: "other" }
];
const MAX_ACTIVITY_QUESTIONS = 100;
const activityQuestionLabels = {
    ua: { item: "Пункт", commonPrompt: "Загальна інструкція", itemPrompt: "Питання або пункт (необов’язково)", add: "＋ Додати пункт", remove: "Видалити пункт", limit: "Можна додати до 100 пунктів" },
    ru: { item: "Пункт", commonPrompt: "Общая инструкция", itemPrompt: "Вопрос или пункт (необязательно)", add: "＋ Добавить пункт", remove: "Удалить пункт", limit: "Можно добавить до 100 пунктов" },
    en: { item: "Item", commonPrompt: "Shared instructions", itemPrompt: "Question or item (optional)", add: "＋ Add item", remove: "Remove item", limit: "Up to 100 items can be added" }
};
const liveAnswerActivityTypes = new Set([
    "drag-words", "fill-blank", "multiple-choice", "one-of-many", "order-items",
    "sentence-order", "true-false", "table", "match", "columns", "open-answer",
    "pronunciation-recording", "listening-questions", "find-error", "vocabulary"
]);

function activityQuestionText(key) {
    return activityQuestionLabels[currentLanguage]?.[key] || activityQuestionLabels.en[key];
}

function createActivityQuestionId() {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
    return `q-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

function activityQuestionProgressId(question, index, questions = []) {
    const usedIds = new Set();
    questions.slice(0, index).forEach((item, itemIndex) => {
        const requestedId = typeof item?.id === "string" ? item.id.trim() : "";
        let id = /^[A-Za-z0-9_-]{1,100}$/.test(requestedId) && !usedIds.has(requestedId)
            ? requestedId
            : `legacy-${itemIndex}`;
        while (usedIds.has(id)) id = `legacy-${itemIndex}-${usedIds.size}`;
        usedIds.add(id);
    });
    const requestedId = typeof question?.id === "string" ? question.id.trim() : "";
    let id = /^[A-Za-z0-9_-]{1,100}$/.test(requestedId) && !usedIds.has(requestedId)
        ? requestedId
        : `legacy-${index}`;
    while (usedIds.has(id)) id = `legacy-${index}-${usedIds.size}`;
    return id;
}

function ensureActivityQuestionIds(activity) {
    if (!Array.isArray(activity.questions)) return;
    const ids = new Set();
    activity.questions.forEach((question, index) => {
        if (!question || typeof question !== "object" || Array.isArray(question)) {
            question = { prompt: "", content: "", answer: "" };
            activity.questions[index] = question;
        }
        let id = typeof question.id === "string" ? question.id.trim() : "";
        if (!/^[A-Za-z0-9_-]{1,100}$/.test(id) || ids.has(id)) id = createActivityQuestionId();
        question.id = id;
        ids.add(id);
    });
}

function ensureActivityBlockIds(sections) {
    const ids = new Set();
    let progressIndex = 0;
    sections.forEach((section) => section.activities.forEach((activity) => {
        if (!activity || typeof activity !== "object") return;
        const isTrackable = activityTypes.some((type) => type.id === activity.type);
        const id = typeof activity.id === "string" ? activity.id.trim() : "";
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id) || ids.has(id)) {
            activity.id = crypto.randomUUID();
            if (isTrackable && !Number.isInteger(activity.legacyProgressIndex)) {
                activity.legacyProgressIndex = progressIndex;
            }
        }
        ids.add(activity.id);
        if (isTrackable) progressIndex += 1;
    }));
}

function cloneActivityBlock(activity) {
    const copy = structuredClone(activity);
    copy.id = crypto.randomUUID();
    delete copy.legacyProgressIndex;
    if (Array.isArray(copy.questions)) copy.questions.forEach((question) => { if (question && typeof question === "object") delete question.id; });
    ensureActivityQuestionIds(copy);
    return copy;
}

function duplicateBlockButton(attribute, index) {
    return `<button class="mini-action" type="button" ${attribute}="${index}" aria-label="${lessonSectionText("duplicate")}" title="${lessonSectionText("duplicate")}">⧉</button>`;
}

function addActivityQuestion(activity) {
    if (!Array.isArray(activity.questions) || !activity.questions.length) {
        activity.questions = [{
            id: createActivityQuestionId(),
            prompt: "",
            content: String(activity.content || ""),
            answer: String(activity.answer || "")
        }, {
            id: createActivityQuestionId(),
            prompt: "",
            content: "",
            answer: ""
        }];
        delete activity.content;
        delete activity.answer;
        return activity.questions.length - 1;
    }
    if (activity.questions.length >= MAX_ACTIVITY_QUESTIONS) return -1;
    ensureActivityQuestionIds(activity);
    activity.questions.push({ id: createActivityQuestionId(), prompt: "", content: "", answer: "" });
    return activity.questions.length - 1;
}

function renderActivityQuestionEditor(activity, preview = false) {
    const questions = Array.isArray(activity.questions) ? activity.questions : [];
    ensureActivityQuestionIds(activity);
    const fieldAttribute = preview ? "data-preview-question-field" : "data-field";
    const indexAttribute = preview ? "data-preview-question-index" : "data-question-index";
    const addAttribute = preview ? "data-add-preview-question" : "data-add-question";
    const removeAttribute = preview ? "data-preview-remove-question" : "data-remove-question";
    const type = activityTypes.find((item) => item.id === activity.type);
    const hasAnswer = !["text", "image", "video", "audio", "pronunciation-recording", "interactive-image", "vocabulary"].includes(activity.type);
    const items = questions.map((question, index) => `<section class="activity-question-editor-item" ${indexAttribute}="${index}">
        <header class="activity-question-editor-heading"><strong>${activityQuestionText("item")} ${index + 1}</strong><button type="button" class="mini-action activity-question-remove" ${removeAttribute} aria-label="${activityQuestionText("remove")}" title="${activityQuestionText("remove")}" ${questions.length <= 1 ? "disabled" : ""}>×</button></header>
        <div class="form-field"><label>${activityQuestionText("itemPrompt")}</label><input ${fieldAttribute}="prompt" value="${escapeHtml(question.prompt || "")}" placeholder="${t("field.instructionExample")}"></div>
        <div class="form-field"><label>${type?.category === "media" ? t("field.mediaContent") : t("field.taskText")} <span class="hint">${escapeHtml(contentHint(activity.type))}</span></label><textarea ${fieldAttribute}="content" placeholder="${escapeHtml(contentPlaceholder(activity.type))}">${escapeHtml(question.content || "")}</textarea></div>
        ${hasAnswer ? `<div class="form-field"><label>${t("field.answer")} <span class="hint">${escapeHtml(answerHint(activity.type))}</span></label><input ${fieldAttribute}="answer" value="${escapeHtml(question.answer || "")}" placeholder="${escapeHtml(answerPlaceholder(activity.type))}"></div>` : ""}
    </section>`).join("");
    return `<div class="activity-question-editor">${items}<button type="button" class="button secondary small activity-question-add" ${addAttribute} ${questions.length >= MAX_ACTIVITY_QUESTIONS ? "disabled" : ""} title="${activityQuestionText("limit")}">${activityQuestionText("add")}</button></div>`;
}

function activitySummary(activity) {
    const firstQuestion = Array.isArray(activity.questions) ? activity.questions[0] : null;
    return [activity.prompt || firstQuestion?.prompt, activity.content || firstQuestion?.content]
        .filter((value, index, values) => typeof value === "string" && value.trim() && values.indexOf(value) === index)
        .map((value) => value.trim().replace(/\s+/g, " "))
        .join(" / ");
}

function activityEditorMeta(activity) {
    const labels = {
        ua: { editing: "Редагування", answer: "Відповідь:" },
        ru: { editing: "Редактирование", answer: "Ответ:" },
        en: { editing: "Editing", answer: "Answer:" }
    };
    const text = labels[currentLanguage] || labels.en;
    const firstQuestion = Array.isArray(activity.questions) ? activity.questions[0] : null;
    const answer = String(firstQuestion?.answer || activity.answer || "").trim();
    return answer ? `${text.editing} · ${text.answer} ${answer}` : text.editing;
}

const initialData = { classes: [], lessons: [] };

let data = loadData();
const viewStateKey = "slovasofiTeacherView";
const savedViewState = (() => {
    try {
        const saved = JSON.parse(sessionStorage.getItem(viewStateKey) || "{}");
        return ["overview", "classes", "lessons", "calendar", "students", "staff"].includes(saved.view) ? saved : {};
    } catch {
        return {};
    }
})();
let activeView = savedViewState.view || "overview";
let selectedLessonUnit = ["A1", "B1"].includes(savedViewState.unit) ? savedViewState.unit : "";
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
let liveMonitorOpen = false;
let liveProgressRows = new Map();
let liveProgressChannel = null;
let liveProgressKey = "";
let liveProgressGeneration = 0;
let liveProgressStatus = "idle";
let liveProgressError = "";
let activeSelectDropdown = null;
let selectDropdownSequence = 0;
const enhancedSelectRefreshers = new WeakMap();
let toastTimer;
let refreshModal = null;

const pageContent = document.getElementById("pageContent");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalCard = document.getElementById("modalCard");

function clearWorkspaceCache() {
    // Remove only this application's old workspace snapshots, never auth tokens.
    try {
        for (const key of Object.keys(localStorage)) {
            if (key === STORAGE_KEY || key.startsWith(STORAGE_KEY + ":")) localStorage.removeItem(key);
        }
    } catch (error) {
        console.warn("Could not remove the legacy workspace cache.", error);
    }
}

function loadData() {
    clearWorkspaceCache();
    return structuredClone(initialData);
}

function storageKey(userId = currentUser?.id) {
    return `${STORAGE_KEY}:${userId || "demo"}`;
}

function persist(deletedLessonIds = []) {
    try {
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

let lessonDraftAutosaveTimer = 0;
let lessonDraftAutosaveRevision = 0;

function lessonDraftStorageKey() {
    return `${storageKey()}:lesson-editor-draft`;
}

function lessonAutosaveText(key) {
    const labels = {
        ua: { saving: "Збереження…", saved: "Збережено", error: "Помилка збереження" },
        ru: { saving: "Сохранение…", saved: "Сохранено", error: "Ошибка сохранения" },
        en: { saving: "Saving…", saved: "Saved", error: "Save failed" }
    };
    return labels[currentLanguage]?.[key] || labels.en[key];
}

function setLessonAutosaveStatus(key) {
    const status = pageContent.querySelector("[data-lesson-autosave-status]");
    if (status) status.textContent = lessonAutosaveText(key);
}

function loadNewLessonDraft() {
    try {
        const saved = localStorage.getItem(lessonDraftStorageKey());
        if (!saved) return null;
        const draft = JSON.parse(saved);
        if (!draft || !Array.isArray(draft.sections) || !draft.sections.every((section) =>
            section && typeof section === "object" && Array.isArray(section.activities))) return null;
        const homeworkSections = Array.isArray(draft.homeworkSections) && draft.homeworkSections.every((section) =>
            section && typeof section === "object" && Array.isArray(section.activities))
            ? draft.homeworkSections
            : [];
        return {
            title: typeof draft.title === "string" ? draft.title : "",
            unit: LESSON_UNITS.includes(draft.unit) ? draft.unit : "A1",
            sections: draft.sections,
            homeworkSections
        };
    } catch (error) {
        console.error("Could not restore the local lesson draft.", error);
        return null;
    }
}

function clearNewLessonDraft() {
    try {
        localStorage.removeItem(lessonDraftStorageKey());
    } catch (error) {
        console.error("Could not clear the local lesson draft.", error);
        showToast(t("toast.storageError"));
    }
}

function scheduleLessonDraftAutosave() {
    if (lessonWorkspaceMode !== "edit") return;
    clearTimeout(lessonDraftAutosaveTimer);
    const revision = ++lessonDraftAutosaveRevision;
    const targetLessonId = editingLessonId;
    const snapshot = {
        title: pageContent.querySelector("#lessonTitle")?.value ?? lessonFormDraft.title,
        unit: pageContent.querySelector("#lessonUnit")?.value ?? lessonFormDraft.unit,
        sections: structuredClone(draftSections),
        homeworkSections: structuredClone(draftHomeworkSections)
    };
    setLessonAutosaveStatus("saving");
    lessonDraftAutosaveTimer = setTimeout(async () => {
        if (!targetLessonId) {
            try {
                localStorage.setItem(lessonDraftStorageKey(), JSON.stringify(snapshot));
                if (revision === lessonDraftAutosaveRevision) setLessonAutosaveStatus("saved");
            } catch (error) {
                console.error("Could not save the local lesson draft.", error);
                if (revision === lessonDraftAutosaveRevision) setLessonAutosaveStatus("error");
                showToast(t("toast.storageError"));
            }
            return;
        }
        const existingLesson = data.lessons.find((item) => item.id === targetLessonId);
        if (!existingLesson) {
            if (revision === lessonDraftAutosaveRevision) setLessonAutosaveStatus("error");
            return;
        }
        const previousData = structuredClone(data);
        const lesson = {
            ...existingLesson,
            title: snapshot.title.trim() || existingLesson.title,
            unit: LESSON_UNITS.includes(snapshot.unit) ? snapshot.unit : existingLesson.unit,
            sections: snapshot.sections,
            homeworkSections: snapshot.homeworkSections,
            activities: snapshot.sections.flatMap((section) => section.activities)
        };
        data.lessons = data.lessons.map((item) => item.id === targetLessonId ? lesson : item);
        const saved = await persistWorkspaceChange(previousData);
        if (revision === lessonDraftAutosaveRevision) setLessonAutosaveStatus(saved ? "saved" : "error");
    }, 650);
}

async function waitForWorkspaceSave() {
    return !currentUser || await workspaceSaveQueue;
}

async function persistWorkspaceChange(previousData, deletedLessonIds = []) {
    if (!persist(deletedLessonIds)) {
        data = previousData;
        render();
        return false;
    }
    if (await waitForWorkspaceSave()) return true;

    data = previousData;
    // A multi-request save may have partially succeeded. Replaying an old
    // snapshot could delete newly invited students and their cascading progress.
    try {
        if (currentUser && window.teacherWorkspaceApi) {
            const loaded = await window.teacherWorkspaceApi.loadWorkspace(window.supabaseClient, currentUser.id, currentUser.email || "");
            data = loaded.data;
        }
    } catch (error) {
        console.error("Could not reload the workspace after a failed save.", error);
    }
    render();
    return false;
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

function userDisplayName(user) {
    const metadata = user?.user_metadata || {};
    const firstName = metadata.first_name || metadata.firstName || "";
    const lastName = metadata.last_name || metadata.lastName || "";
    return metadata.display_name || metadata.displayName
        || [firstName, lastName].filter(Boolean).join(" ")
        || metadata.full_name || metadata.name || user?.email || t("profile.signedOut");
}

function userInitials(user) {
    const metadata = user?.user_metadata || {};
    const displayName = userDisplayName(user);
    if (metadata.display_name || metadata.displayName) return initialsFor(displayName);
    const firstName = metadata.first_name || metadata.firstName || "";
    const lastName = metadata.last_name || metadata.lastName || "";
    return [firstName, lastName].filter(Boolean).map((part) => part.trim()[0]).join("").toLocaleUpperCase()
        || initialsFor(displayName)
        || "—";
}

function profileGreeting(user) {
    const hour = new Date().getHours();
    const greeting = hour >= 5 && hour < 12
        ? "welcome.morning"
        : hour >= 12 && hour < 18
            ? "welcome.day"
            : hour >= 18 && hour < 23
                ? "welcome.evening"
                : "welcome.night";
    return t(greeting, { name: userDisplayName(user) });
}

function updateUserIdentity(user) {
    currentUser = user;
    const displayName = userDisplayName(user);
    const initials = userInitials(user);
    document.querySelectorAll(".user-name").forEach((element) => { element.textContent = displayName; });
    document.querySelectorAll(".user-avatar").forEach((element) => { element.textContent = initials; });
    const profileLabel = t("profile.open", { name: displayName });
    document.querySelectorAll(".profile-trigger").forEach((element) => { element.setAttribute("aria-label", profileLabel); });
    const welcomeHeading = document.getElementById("welcomeHeading");
    if (welcomeHeading) welcomeHeading.textContent = profileGreeting(user);
}

async function loadCurrentUser() {
    if (!window.supabaseClient) {
        console.error("Supabase is not configured; user profile and sign out are unavailable.");
        window.location.replace("login.html");
        return;
    }
    try {
        // Get session and user in parallel
        // getSession reads local storage, so the UI does not wait for a network round trip
        const { data: { session }, error: sessionError } = await window.supabaseClient.auth.getSession();
        if (sessionError) throw sessionError;
        const user = session?.user;
        
        if (!session) {
            window.location.replace("login.html");
            return;
        }

        const invitationType = new URLSearchParams(`${location.search.slice(1)}&${location.hash.slice(1)}`).get("type");
        if (invitationType === "invite") {
            const setupUrl = new URL("teacher-setup.html", location.href);
            setupUrl.search = location.search;
            setupUrl.hash = location.hash;
            window.location.replace(setupUrl.href);
            return;
        }
        
        updateUserIdentity(user);
        
        // Fail closed until server-side role and permissions have been checked.
        clearWorkspaceCache();
        data = { classes: [], lessons: [] };
        workspaceAccess = { workspaceOwnerId: null, permissions: {}, staff: [] };
        translateStaticUI();
        render();

        // Load workspace in background (don't block UI)
        try {
            const workspace = await window.teacherWorkspaceApi.loadWorkspace(window.supabaseClient, user.id, user.email || "");
            data = workspace.data;
            workspaceAccess = {
                workspaceOwnerId: workspace.workspaceOwnerId,
                role: workspace.role,
                permissions: workspace.permissions,
                staff: workspace.staff
            };
            startPresenceTracking(window.supabaseClient, [
                currentUser.id,
                ...data.classes.map((item) => item.teacherId)
            ], currentUser);
            translateStaticUI();
            render();
            const storageNote = document.querySelector(".storage-note");
            if (storageNote) storageNote.textContent = t("welcome.database");

            loadCalendarEvents().then(() => {
                if (activeView === "calendar" && !lessonWorkspaceMode) render();
            }).catch((calendarError) => {
                console.error("Could not load calendar events.", calendarError);
                showToast(isMissingCalendarTable(calendarError)
                    ? t("calendar.migrationRequired")
                    : `${t("calendar.loadError")} ${calendarError.message}`);
            });
            subscribeToCalendarChanges(window.supabaseClient, currentUser);
            if (workspace.permissions.manage_teachers && window.teacherWorkspaceApi.loadStaff) {
                window.teacherWorkspaceApi.loadStaff(window.supabaseClient).then((staff) => {
                    workspaceAccess.staff = staff;
                    startPresenceTracking(window.supabaseClient, [
                        currentUser.id,
                        ...data.classes.map((item) => item.teacherId),
                        ...staff.map((member) => member.id)
                    ], currentUser);
                    if (activeView === "staff" && !lessonWorkspaceMode) render();
                }).catch((error) => {
                    console.error("Could not load teacher accounts; the rest of the dashboard is still available.", error);
                    showToast(`${t("toast.staffLoadError")} ${error.message || ""}`);
                });
            }
        } catch (workspaceError) {
            console.error("Could not load the teacher workspace from Supabase.", workspaceError);
            if (workspaceError.code === "WORKSPACE_FORBIDDEN") {
                window.location.replace("student.html");
                return;
            }
            showToast(t("toast.databaseLoadError") + " " + workspaceError.message);
        }
    } catch (error) {
        console.error("Could not load the signed-in user profile.", error);
        window.location.replace("login.html");
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
    const name = userDisplayName(currentUser);
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
        clearWorkspaceCache();
        data = { classes: [], lessons: [] };
        workspaceAccess = { permissions: {}, staff: [] };
        currentUser = null;
        closePopover();
        window.location.assign("login.html");
    } catch (error) {
        console.error("Could not sign out of the current account.", error);
        showToast(t("profile.logoutError"));
    }
}

function showNotifications(button) {
    const upcoming = calendarOccurrences(calendarEvents, new Date(), new Date(Date.now() + 7 * 86_400_000)).slice(0, 5);
    const content = upcoming.length
        ? `<div class="calendar-notification-list">${upcoming.map((event) => `<button type="button" class="calendar-notification" data-open-calendar><strong>${escapeHtml(event.title)}</strong><small>${formatCalendarDate(event.occurrenceAt, { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })} · ${escapeHtml(data.classes.find((item) => item.id === event.class_id)?.name || t("class.noClass"))}</small></button>`).join("")}<button type="button" class="text-link" data-open-calendar>${t("calendar.open")}</button></div>`
        : `<p class="popover-copy">${t("notifications.empty")}</p>`;
    openPopoverAt(button, `<div class="popover-heading"><span class="notification-mark"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></svg></span><div><strong>${t("header.notifications")}</strong><small>${upcoming.length ? t("calendar.upcoming") : t("notifications.empty")}</small></div></div>${content}`, "notifications");
    document.querySelectorAll("[data-open-calendar]").forEach((item) => item.addEventListener("click", () => {
        closePopover();
        setView("calendar");
    }));
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
    document.getElementById("sidebarBackdrop").classList.remove("open");
    document.getElementById("menuToggle").setAttribute("aria-expanded", "false");
    pageContent.removeAttribute("aria-busy");
    render();
}

function render() {
    try {
        sessionStorage.setItem(viewStateKey, JSON.stringify({ view: activeView, unit: selectedLessonUnit }));
    } catch {
        // Session storage may be unavailable; the view just won't survive a reload.
    }
    document.querySelectorAll(".nav-item").forEach((button) => button.classList.toggle("active", button.dataset.view === activeView));
    if (lessonWorkspaceMode) {
        renderLessonWorkspace();
        return;
    }
    const renderers = { overview: renderOverview, classes: renderClasses, lessons: renderLessons, calendar: renderCalendar, students: renderStudents, staff: renderStaff };
    pageContent.innerHTML = renderers[activeView]();
    bindPageActions();
    enhanceSelects(pageContent);
}

function enhanceSelects(root) {
    root.querySelectorAll("select:not(.teacher-select-native):not([data-pair-row] select)").forEach((select) => {
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

        const refreshOptions = () => {
            trigger.disabled = select.disabled;
            listbox.replaceChildren();
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
            syncSelection();
        };
        enhancedSelectRefreshers.set(select, refreshOptions);
        select.classList.add("teacher-select-native");
        select.tabIndex = -1;
        select.setAttribute("aria-hidden", "true");
        select.parentNode.insertBefore(wrapper, select);
        wrapper.append(trigger, listbox, select);
        refreshOptions();
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
        ua: { intro: "Вступ", newSection: "Новий розділ", addSection: "＋ Додати розділ", section: "Розділи уроку", rename: "Назва розділу", remove: "Видалити", previous: "← Назад", next: "Далі →", moveUp: "Перемістити вище", moveDown: "Перемістити нижче", moveBlock: "Перетягніть, щоб перемістити блок", duplicate: "Дублювати блок", duplicated: "Блок продубльовано.", addElement: "＋ Додати новий елемент", copyElement: "▣ Копіювати елемент", edit: "Редагувати", done: "Готово", back: "До уроків", save: "Зберегти урок", create: "Створити урок", empty: "У цьому розділі ще немає елементів.", confirmRemove: "Видалити розділ разом з його елементами?", lessonTab: "Урок", editorTab: "Редагування", workspaceMode: "Режим уроку", homework: "Домашня робота", homeworkSections: "Розділи домашньої роботи", homeworkActivities: "Завдання домашньої роботи", currentLesson: "Поточний урок", copyFromLesson: "Копіювати завдання з уроку", dragCopyHint: "Перетягніть або натисніть завдання, щоб скопіювати його сюди.", dropCopyHint: "Перетягніть завдання сюди", noSourceActivities: "У цьому уроці поки немає завдань для копіювання.", liveHint: "Відповіді учнів оновлюються в реальному часі.", liveClass: "Клас", liveConnect: "Підключення до відповідей…", liveReady: "Підключено · відповіді оновлюються", liveOffline: "Увійдіть у кабінет викладача, щоб бачити відповіді в реальному часі.", liveError: "Не вдалося підключитися до відповідей.", liveNoClass: "Урок ще не призначений жодному класу.", liveNoPermission: "У вас немає доступу до відповідей учнів.", liveNoStudents: "У цьому класі поки немає учнів.", liveAnswers: "Відповіді учнів", liveWait: "Поки немає відповіді", liveDraft: "Чернетка", liveSubmitted: "Надіслано", liveUnsaved: "Зміни редактора ще не збережені. Учні бачать останню збережену версію." },
        ru: { intro: "Введение", newSection: "Новый раздел", addSection: "＋ Добавить раздел", section: "Разделы урока", rename: "Название раздела", remove: "Удалить", previous: "← Назад", next: "Далее →", moveUp: "Переместить выше", moveDown: "Переместить ниже", moveBlock: "Перетащите, чтобы переместить задание", duplicate: "Дублировать блок", duplicated: "Блок продублирован.", addElement: "＋ Добавить новый элемент", copyElement: "▣ Копировать элемент", edit: "Редактировать", done: "Готово", back: "К урокам", save: "Сохранить урок", create: "Создать урок", empty: "В этом разделе пока нет элементов.", confirmRemove: "Удалить раздел вместе с его элементами?", lessonTab: "Урок", editorTab: "Редактирование", workspaceMode: "Режим урока", homework: "Домашняя работа", homeworkSections: "Разделы домашней работы", homeworkActivities: "Задания домашней работы", currentLesson: "Текущий урок", copyFromLesson: "Копировать задания из урока", dragCopyHint: "Перетащите или нажмите задание, чтобы скопировать его сюда.", dropCopyHint: "Перетащите задание сюда", noSourceActivities: "В этом уроке пока нет заданий для копирования.", liveHint: "Ответы учеников обновляются в реальном времени.", liveClass: "Класс", liveConnect: "Подключение к ответам…", liveReady: "Подключено · ответы обновляются", liveOffline: "Войдите в кабинет преподавателя, чтобы видеть ответы в реальном времени.", liveError: "Не удалось подключиться к ответам.", liveNoClass: "Урок ещё не назначен ни одному классу.", liveNoPermission: "У вас нет доступа к ответам учеников.", liveNoStudents: "В этом классе пока нет учеников.", liveAnswers: "Ответы учеников", liveWait: "Пока нет ответа", liveDraft: "Черновик", liveSubmitted: "Отправлено", liveUnsaved: "Изменения редактора ещё не сохранены. Ученики видят последнюю сохранённую версию." },
        en: { intro: "Introduction", newSection: "New section", addSection: "＋ Add section", section: "Lesson sections", rename: "Section name", remove: "Delete", previous: "← Back", next: "Next →", moveUp: "Move up", moveDown: "Move down", moveBlock: "Drag to move this activity", duplicate: "Duplicate block", duplicated: "Block duplicated.", addElement: "＋ Add new item", copyElement: "▣ Duplicate item", edit: "Edit", done: "Done", back: "Back to lessons", save: "Save lesson", create: "Create lesson", empty: "This section has no items yet.", confirmRemove: "Delete this section and its items?", lessonTab: "Lesson", editorTab: "Edit", workspaceMode: "Lesson mode", homework: "Homework", homeworkSections: "Homework sections", homeworkActivities: "Homework activities", currentLesson: "Current lesson", copyFromLesson: "Copy activities from a lesson", dragCopyHint: "Drag or click an activity to copy it here.", dropCopyHint: "Drop an activity here", noSourceActivities: "This lesson has no activities to copy yet.", liveHint: "Student answers update in real time.", liveClass: "Class", liveConnect: "Connecting to answers…", liveReady: "Connected · answers update live", liveOffline: "Sign in to the teacher dashboard to see live answers.", liveError: "Could not connect to student answers.", liveNoClass: "This lesson is not assigned to a class yet.", liveNoPermission: "You do not have access to student answers.", liveNoStudents: "There are no students in this class yet.", liveAnswers: "Student answers", liveWait: "No answer yet", liveDraft: "Draft", liveSubmitted: "Submitted", liveUnsaved: "Editor changes are not saved yet. Students see the last saved version." }
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
        noActivities: "Немає завдань із відповідями",
        recording: "Запис вимови",
        playRecording: "Прослухати запис"
    },
    ru: {
        selector: "Показывать ответы ученика",
        answer: "Ответ ученика",
        correctAnswer: "Правильный ответ",
        noCorrectAnswer: "Эталонный ответ не задан",
        count: "{answered}/{total} ответов",
        noActivities: "Нет заданий с ответами",
        recording: "Запись произношения",
        playRecording: "Прослушать запись"
    },
    en: {
        selector: "Show answers for",
        answer: "Student answer",
        correctAnswer: "Correct answer",
        noCorrectAnswer: "No reference answer set",
        count: "{answered}/{total} answers",
        noActivities: "No answer activities",
        recording: "Pronunciation recording",
        playRecording: "Play recording"
    }
};

function liveStudentText(key, values = {}) {
    const text = liveStudentLabels[currentLanguage]?.[key] || liveStudentLabels.ru[key];
    return text.replace(/\{(\w+)\}/g, (_, name) => String(values[name] ?? ""));
}

function progressResetText(key) {
    const labels = {
        ua: { action: "Скинути відповіді", confirm: "Скинути всі відповіді цього учня за урок?", success: "Відповіді учня скинуто.", error: "Не вдалося скинути відповіді." },
        ru: { action: "Сбросить ответы", confirm: "Сбросить все ответы этого ученика за урок?", success: "Ответы ученика сброшены.", error: "Не удалось сбросить ответы." },
        en: { action: "Reset answers", confirm: "Reset all of this student's answers for the lesson?", success: "Student answers were reset.", error: "Could not reset student answers." }
    };
    return labels[currentLanguage]?.[key] || labels.en[key];
}

function liveReviewText(key) {
    const labels = {
        ua: {
            title: "Рецензія викладача",
            feedback: "Коментар",
            correction: "Виправлення",
            score: "Оцінка",
            save: "Зберегти рецензію",
            saved: "Рецензію збережено."
        },
        ru: {
            title: "Рецензия преподавателя",
            feedback: "Комментарий",
            correction: "Исправление",
            score: "Оценка",
            save: "Сохранить рецензию",
            saved: "Рецензия сохранена."
        },
        en: {
            title: "Teacher review",
            feedback: "Comment",
            correction: "Correction",
            score: "Score",
            save: "Save review",
            saved: "Review saved."
        }
    };
    return labels[currentLanguage]?.[key] || labels.en[key];
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

function syncThemeToggle() {
    const button = document.getElementById("themeToggle");
    const label = t(currentTheme === "dark" ? "theme.switchToLight" : "theme.switchToDark");
    button.setAttribute("aria-label", label);
    button.title = label;
    button.setAttribute("aria-pressed", String(currentTheme === "dark"));
}

function timeBasedTheme(date = new Date()) {
    const hour = date.getHours();
    return hour < 7 || hour >= 18 ? "dark" : "light";
}

function updateThemeFromTime() {
    let savedTheme;
    try {
        savedTheme = localStorage.getItem("slovasofiTeacherTheme");
    } catch (error) {
        console.error("Could not read the teacher theme preference.", error);
        return;
    }
    if (savedTheme === "light" || savedTheme === "dark") return;

    const theme = timeBasedTheme();
    if (theme !== currentTheme) applyTheme(theme);
}

function scheduleThemeUpdate() {
    if (themeUpdateTimer !== null) window.clearTimeout(themeUpdateTimer);
    if (document.hidden) return;

    const now = new Date();
    const nextChange = new Date(now);
    if (now.getHours() < 7) {
        nextChange.setHours(7, 0, 0, 0);
    } else if (now.getHours() < 18) {
        nextChange.setHours(18, 0, 0, 0);
    } else {
        nextChange.setDate(nextChange.getDate() + 1);
        nextChange.setHours(7, 0, 0, 0);
    }
    themeUpdateTimer = window.setTimeout(() => {
        updateThemeFromTime();
        scheduleThemeUpdate();
    }, Math.max(1000, nextChange.getTime() - now.getTime()));
}

function applyTheme(theme) {
    currentTheme = theme;
    if (theme === "dark") document.documentElement.dataset.theme = "dark";
    else document.documentElement.removeAttribute("data-theme");
    document.querySelector('meta[name="theme-color"]').content = theme === "dark" ? "#111a16" : "#f5f8f5";
    syncThemeToggle();
}

function setTheme(theme) {
    if (theme !== "light" && theme !== "dark") return;
    try {
        localStorage.setItem("slovasofiTeacherTheme", theme);
    } catch (error) {
        console.error("Could not save the teacher theme preference.", error);
        showToast(t("theme.saveError"));
        return;
    }
    applyTheme(theme);
    if (themeUpdateTimer !== null) window.clearTimeout(themeUpdateTimer);
    themeUpdateTimer = null;
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
    syncThemeToggle();
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
    const initials = userInitials(currentUser);
    const roleLabel = workspaceAccess.role === "admin" ? roleLabels.admin[currentLanguage] : t("teacher.role");
    return `<section class="profile-hero"><div class="profile-identity"><span class="profile-avatar">${escapeHtml(initials)}</span><div><span class="eyebrow">✦ ${t("welcome.badge")}</span><h1 id="welcomeHeading">${escapeHtml(profileGreeting(currentUser))}</h1><p>${escapeHtml(currentUser?.email || t("profile.notSignedIn"))}</p></div></div><div class="profile-role">${roleLabel}</div></section>
        <div class="profile-welcome"><div><h2>${t("profile.dashboardTitle")}</h2><p>${t("profile.dashboardHint")}</p><span class="storage-note">${t("welcome.storage")}</span></div>${hasPermission("edit_lessons") ? `<button class="button" data-action="new-lesson">${t("action.createLesson")}</button>` : ""}</div>
        <div class="stats-grid profile-stats">
            <article class="stat-card"><span class="stat-icon stat-icon-classes" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3.5" y="4.5" width="17" height="15" rx="2.5"/><path d="M8 4.5v15M8 9h12.5M8 14h12.5"/></svg></span><span>${t("stat.classes")}</span><strong>${data.classes.length}</strong></article>
            <article class="stat-card"><span class="stat-icon stat-icon-students" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0M16 5.5a3 3 0 0 1 0 5.5M17 14a5 5 0 0 1 3.5 5"/></svg></span><span>${t("stat.students")}</span><strong>${studentCount}</strong></article>
            <article class="stat-card"><span class="stat-icon stat-icon-lessons" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 4.5A2.5 2.5 0 0 1 7.5 2H20v17H7.5A2.5 2.5 0 0 0 5 21.5z"/><path d="M5 5h12M9 9h7M9 12.5h7"/></svg></span><span>${t("stat.lessons")}</span><strong>${data.lessons.length}</strong></article>
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

function localDateKey(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function calendarOccurrences(events, rangeStart, rangeEnd) {
    return window.SlovaCalendar.occurrences(events, rangeStart, rangeEnd);
}

function calendarRecurrenceLabel(recurrence) {
    const labels = {
        daily: "calendar.daily",
        every_other_day: "calendar.everyOtherDay",
        weekly: "calendar.weekly",
        custom: "calendar.customDays",
        selected_dates: "calendar.selectedDates"
    };
    return labels[recurrence] ? t(labels[recurrence]) : "";
}

function calendarLocale() {
    return currentLanguage === "ua" ? "uk-UA" : currentLanguage === "en" ? "en-US" : "ru-RU";
}

function isMissingCalendarTable(error) {
    return error.code === "PGRST205" || error.code === "PGRST204" || error.code === "42P01"
        || /public\.calendar_events.*(schema cache|does not exist)/i.test(error.message || "");
}

async function loadCalendarEvents() {
    if (!window.supabaseClient || !currentUser?.id) return;
    const { data: events, error } = await window.supabaseClient.from("calendar_events")
        .select("id,teacher_id,class_id,lesson_id,title,starts_at,duration_minutes,recurrence,repeat_until,repeat_days,repeat_dates")
        .order("starts_at");
    if (error) throw error;
    calendarEvents = events || [];
    checkCalendarReminders();
}

function subscribeToCalendarChanges(client, user) {
    if (calendarChannel) {
        client.removeChannel(calendarChannel).catch((error) => console.error("Could not stop the previous calendar subscription.", error));
        calendarChannel = null;
    }
    if (!client?.channel || !user?.id) return;
    const changeOptions = {
        event: "*",
        schema: "public",
        table: "calendar_events",
        ...(workspaceAccess.role === "admin" ? {} : { filter: `teacher_id=eq.${user.id}` })
    };
    calendarChannel = client.channel(`calendar-events:${user.id}`)
        .on("postgres_changes", changeOptions, ({ eventType, new: next, old: previous }) => {
            if (eventType === "DELETE") calendarEvents = calendarEvents.filter((event) => event.id !== previous.id);
            else {
                const index = calendarEvents.findIndex((event) => event.id === next.id);
                if (index < 0) calendarEvents.push(next);
                else calendarEvents[index] = next;
            }
            checkCalendarReminders();
            if (activeView === "calendar") render();
        })
        .subscribe((status) => {
            if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") console.error(`Calendar updates could not be received: ${status}.`);
        });
}

function playCalendarReminderSound() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    try {
        calendarAudioContext ||= new AudioContextClass();
        const audio = calendarAudioContext;
        if (audio.state === "suspended") audio.resume().catch((error) => console.warn("The browser blocked the calendar reminder sound.", error));
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
        console.warn("The browser did not allow the calendar reminder sound.", error);
    }
}

function unlockCalendarSound() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass || calendarAudioContext) return;
    calendarAudioContext = new AudioContextClass();
    calendarAudioContext.resume().catch((error) => console.warn("Could not enable calendar reminder audio.", error));
}

function checkCalendarReminders() {
    if (!currentUser || !calendarEvents.length) return;
    let savedReminders = [];
    try {
        const storedReminders = JSON.parse(localStorage.getItem("slovasofiCalendarReminders") || "[]");
        savedReminders = Array.isArray(storedReminders) ? storedReminders.filter((item) => typeof item === "string").slice(-100) : [];
        savedReminders.forEach((key) => playedCalendarReminders.add(key));
    } catch (error) {
        console.error("Could not read the calendar reminder state.", error);
    }
    const now = new Date();
    const soon = calendarOccurrences(calendarEvents, now, new Date(now.getTime() + 15 * 60_000));
    soon.forEach((event) => {
        const reminderKey = `${currentUser.id}:${event.id}:${event.occurrenceAt.toISOString()}`;
        if (playedCalendarReminders.has(reminderKey)) return;
        playedCalendarReminders.add(reminderKey);
        try {
            savedReminders.push(reminderKey);
            localStorage.setItem("slovasofiCalendarReminders", JSON.stringify(savedReminders.slice(-100)));
        } catch (error) {
            console.error("Could not save the calendar reminder state.", error);
        }
        showToast(t("calendar.soundReminder", { title: event.title }));
        playCalendarReminderSound();
    });
}

function localDateTimeValue(date) {
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
    return local.toISOString().slice(0, 16);
}

function calendarRepeatDays(event) {
    const weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    return `<fieldset class="calendar-repeat-days" data-repeat-days ${event?.recurrence === "custom" ? "" : "hidden"}>
        <legend>${t("calendar.repeatDaysLabel")}</legend>
        <div class="calendar-weekday-options">${weekdays.map((day, index) => `<label class="calendar-weekday-option"><input type="checkbox" name="repeatDays" value="${index}" ${event?.repeat_days?.includes(index) || (!event && index === new Date().getDay()) ? "checked" : ""}><span>${t(`calendar.${day}`)}</span></label>`).join("")}</div>
        <small>${t("calendar.repeatDaysHint")}</small>
    </fieldset>`;
}

function renderSelectedDatesPicker(selectedDates, month, startDate, maxDate) {
    const monthStart = new Date(month.getFullYear(), month.getMonth(), 1);
    const gridStart = new Date(monthStart);
    gridStart.setDate(gridStart.getDate() - ((gridStart.getDay() + 6) % 7));
    const weekdays = Array.from({ length: 7 }, (_, index) => {
        const weekday = new Date(2024, 0, 1 + index);
        return `<span>${escapeHtml(new Intl.DateTimeFormat(calendarLocale(), { weekday: "short" }).format(weekday))}</span>`;
    }).join("");
    const dates = Array.from({ length: 42 }, (_, index) => {
        const date = new Date(gridStart);
        date.setDate(gridStart.getDate() + index);
        const key = localDateKey(date);
        const selected = selectedDates.has(key);
        const unavailable = key < startDate || key > maxDate;
        return `<button type="button" class="calendar-selected-date ${date.getMonth() === month.getMonth() ? "" : "is-outside"} ${selected ? "is-selected" : ""}" data-selected-date="${key}" aria-pressed="${selected}" aria-label="${escapeHtml(formatCalendarDate(date, { dateStyle: "full" }))}" ${unavailable ? "disabled" : ""}>${date.getDate()}</button>`;
    }).join("");
    const monthLabel = new Intl.DateTimeFormat(calendarLocale(), { month: "long", year: "numeric" }).format(month);
    const minimumMonth = startDate.slice(0, 7);
    const maximumMonth = maxDate.slice(0, 7);
    const currentMonth = localDateKey(month).slice(0, 7);
    const previousDisabled = currentMonth <= minimumMonth;
    const nextDisabled = currentMonth >= maximumMonth;
    return `<fieldset class="calendar-repeat-days calendar-selected-dates" data-selected-dates-picker>
        <legend>${t("calendar.selectedDatesLabel")}</legend>
        <div class="calendar-selected-dates-toolbar"><button type="button" class="mini-action" data-date-picker-shift="-1" aria-label="←" ${previousDisabled ? "disabled" : ""}>‹</button><strong>${escapeHtml(monthLabel)}</strong><button type="button" class="mini-action" data-date-picker-shift="1" aria-label="→" ${nextDisabled ? "disabled" : ""}>›</button></div>
        <div class="calendar-selected-dates-weekdays">${weekdays}</div>
        <div class="calendar-selected-dates-grid">${dates}</div>
        <small data-selected-dates-count>${t("calendar.selectedDatesCount", { count: selectedDates.size })}</small>
        <small>${t("calendar.selectedDatesHint")}</small>
        ${Array.from(selectedDates).sort().map((date) => `<input type="hidden" name="repeatDates" value="${date}">`).join("")}
    </fieldset>`;
}

function openCalendarEvent(event = null, selectedDate = new Date()) {
    if (!hasPermission("manage_classes_students")) return;
    if (!data.classes.length) {
        showToast(t("calendar.noClasses"));
        return;
    }
    const startAt = event ? new Date(event.starts_at) : new Date(selectedDate);
    if (!event) startAt.setHours(10, 0, 0, 0);
    const selectedClassId = event?.class_id || data.classes[0].id;
    const classOptions = data.classes.map((group) => `<option value="${escapeHtml(group.id)}" ${group.id === selectedClassId ? "selected" : ""}>${escapeHtml(group.name)}</option>`).join("");
    const lessonOptions = data.lessons.map((lesson) => `<option value="${escapeHtml(lesson.id)}" ${lesson.id === event?.lesson_id ? "selected" : ""}>${escapeHtml(lesson.title)}</option>`).join("");
    const repeatUntil = event?.repeat_until || localDateKey(new Date(startAt.getFullYear(), startAt.getMonth(), startAt.getDate() + 56));
    const recurrence = event?.recurrence || "none";
    const selectedDates = new Set(event?.repeat_dates || (!event ? [localDateKey(startAt)] : []));
    let selectedDatesMonth = new Date(startAt.getFullYear(), startAt.getMonth(), 1);
    const repeatTypes = [
        ["none", t("calendar.noRepeat")],
        ["daily", t("calendar.daily")],
        ["every_other_day", t("calendar.everyOtherDay")],
        ["weekly", t("calendar.weekly")],
        ["custom", t("calendar.customDays")],
        ["selected_dates", t("calendar.selectedDates")]
    ];
    const repeatMax = localDateKey(new Date(startAt.getFullYear(), startAt.getMonth(), startAt.getDate() + 365));
    const title = event ? t("calendar.editEvent") : t("calendar.newEvent");
    openModal(`${modalHeader(title)}
        <form id="calendarEventForm">
            <div class="form-field"><label for="calendarEventTitle">${t("calendar.titleLabel")}</label><input id="calendarEventTitle" name="title" maxlength="120" required value="${escapeHtml(event?.title || "")}"></div>
            <div class="form-field"><label for="calendarEventClass">${t("calendar.classLabel")}</label><select id="calendarEventClass" name="classId" required>${classOptions}</select></div>
            <div class="form-field"><label for="calendarEventLesson">${t("calendar.lessonLabel")}</label><select id="calendarEventLesson" name="lessonId"><option value="">${t("calendar.noLesson")}</option>${lessonOptions}</select></div>
            <div class="form-grid"><div class="form-field"><label for="calendarEventStartsAt">${t("calendar.dateLabel")}</label><input id="calendarEventStartsAt" name="startsAt" type="datetime-local" required value="${localDateTimeValue(startAt)}"></div><div class="form-field"><label for="calendarEventDuration">${t("calendar.duration")}</label><select id="calendarEventDuration" name="duration" required>${[30, 45, 60, 90, 120].map((minutes) => `<option value="${minutes}" ${Number(event?.duration_minutes || 60) === minutes ? "selected" : ""}>${minutes} ${t("calendar.minutes")}</option>`).join("")}</select></div></div>
            <div class="form-field"><label for="calendarEventRecurrence">${t("calendar.repeat")}</label><select id="calendarEventRecurrence" name="recurrence">${repeatTypes.map(([value, label]) => `<option value="${value}" ${recurrence === value ? "selected" : ""}>${label}</option>`).join("")}</select></div>
            ${calendarRepeatDays(event)}
            <div data-selected-dates-field ${recurrence === "selected_dates" ? "" : "hidden"}>${renderSelectedDatesPicker(selectedDates, selectedDatesMonth, localDateKey(startAt), repeatMax)}</div>
            <div class="form-field" data-repeat-until ${recurrence !== "none" ? "" : "hidden"}><label for="calendarEventRepeatUntil">${t("calendar.repeatUntil")}</label><input id="calendarEventRepeatUntil" name="repeatUntil" type="date" value="${repeatUntil}" min="${localDateKey(startAt)}" max="${repeatMax}"></div>
            <div class="modal-actions">${event ? `<button type="button" class="button danger" data-calendar-delete="${escapeHtml(event.id)}">${t("calendar.delete")}</button>` : ""}<button type="button" class="button secondary" data-close>${t("calendar.cancel")}</button><button type="submit" class="button">${t("calendar.save")}</button></div>
        </form>`, true);
    enhanceSelects(modalCard);
    const form = modalCard.querySelector("#calendarEventForm");
    const recurrenceSelect = form.elements.recurrence;
    const repeatUntilField = form.querySelector("[data-repeat-until]");
    const repeatDaysField = form.querySelector("[data-repeat-days]");
    const selectedDatesField = form.querySelector("[data-selected-dates-field]");
    const renderDatePicker = () => {
        const startsAt = new Date(form.elements.startsAt.value);
        if (Number.isNaN(startsAt.getTime())) return;
        const startDate = localDateKey(startsAt);
        const maxDate = localDateKey(new Date(startsAt.getFullYear(), startsAt.getMonth(), startsAt.getDate() + 365));
        for (const date of selectedDates) {
            if (date < startDate || date > maxDate) selectedDates.delete(date);
        }
        selectedDatesField.innerHTML = renderSelectedDatesPicker(selectedDates, selectedDatesMonth, startDate, maxDate);
    };
    const syncRecurrenceFields = () => {
        const repeating = recurrenceSelect.value !== "none" && recurrenceSelect.value !== "selected_dates";
        repeatUntilField.hidden = !repeating;
        repeatDaysField.hidden = recurrenceSelect.value !== "custom";
        selectedDatesField.hidden = recurrenceSelect.value !== "selected_dates";
        form.elements.repeatUntil.required = repeating;
        renderDatePicker();
    };
    recurrenceSelect.addEventListener("change", syncRecurrenceFields);
    selectedDatesField.addEventListener("click", (clickEvent) => {
        const shiftButton = clickEvent.target.closest("[data-date-picker-shift]");
        if (shiftButton && !shiftButton.disabled) {
            selectedDatesMonth.setMonth(selectedDatesMonth.getMonth() + Number(shiftButton.dataset.datePickerShift));
            renderDatePicker();
            return;
        }
        const dateButton = clickEvent.target.closest("[data-selected-date]");
        if (!dateButton || dateButton.disabled) return;
        const date = dateButton.dataset.selectedDate;
        if (selectedDates.has(date)) selectedDates.delete(date);
        else selectedDates.add(date);
        renderDatePicker();
    });
    form.elements.startsAt.addEventListener("change", () => {
        const startsAt = new Date(form.elements.startsAt.value);
        if (Number.isNaN(startsAt.getTime())) return;
        form.elements.repeatUntil.min = localDateKey(startsAt);
        form.elements.repeatUntil.max = localDateKey(new Date(startsAt.getFullYear(), startsAt.getMonth(), startsAt.getDate() + 365));
        selectedDatesMonth = new Date(startsAt.getFullYear(), startsAt.getMonth(), 1);
        if (form.elements.repeatUntil.value < form.elements.repeatUntil.min) {
            form.elements.repeatUntil.value = form.elements.repeatUntil.min;
        }
        renderDatePicker();
    });
    syncRecurrenceFields();
    form.addEventListener("submit", async (submitEvent) => {
        submitEvent.preventDefault();
        const values = new FormData(form);
        const startsAt = new Date(String(values.get("startsAt")));
        if (Number.isNaN(startsAt.getTime())) {
            form.elements.startsAt.setCustomValidity(t("calendar.invalidDate"));
            form.elements.startsAt.reportValidity();
            return;
        }
        form.elements.startsAt.setCustomValidity("");
        const classId = String(values.get("classId"));
        const group = data.classes.find((item) => item.id === classId);
        if (!group) {
            showToast(t("calendar.invalidClass"));
            return;
        }
        const recurrenceType = String(values.get("recurrence"));
        const repeating = recurrenceType !== "none" && recurrenceType !== "selected_dates";
        const repeatDays = values.getAll("repeatDays").map(Number).filter((day) => Number.isInteger(day) && day >= 0 && day <= 6);
        const selectedDateKeys = values.getAll("repeatDates").map(String).filter((date) => /^\d{4}-\d{2}-\d{2}$/.test(date)).sort();
        const repeatDate = String(values.get("repeatUntil") || "");
        const startDate = localDateKey(startsAt);
        const maxRepeatDate = localDateKey(new Date(startsAt.getFullYear(), startsAt.getMonth(), startsAt.getDate() + 365));
        if (repeating && (!repeatDate || repeatDate < startDate || repeatDate > maxRepeatDate)) {
            form.elements.repeatUntil.setCustomValidity(t("calendar.invalidRepeat"));
            form.elements.repeatUntil.reportValidity();
            return;
        }
        form.elements.repeatUntil.setCustomValidity("");
        if (recurrenceType === "custom" && !repeatDays.length) {
            showToast(t("calendar.invalidRepeatDays"));
            form.querySelector('[name="repeatDays"]')?.focus();
            return;
        }
        const maxSelectedDate = localDateKey(new Date(startsAt.getFullYear(), startsAt.getMonth(), startsAt.getDate() + 365));
        if (recurrenceType === "selected_dates" && (
            !selectedDateKeys.includes(startDate)
            || selectedDateKeys.some((date) => date < startDate || date > maxSelectedDate)
        )) {
            showToast(t("calendar.invalidSelectedDates"));
            return;
        }
        const payload = {
            ...(event ? { id: event.id } : {}),
            teacher_id: group.teacherId || currentUser.id,
            class_id: classId,
            lesson_id: String(values.get("lessonId") || "") || null,
            title: String(values.get("title")).trim(),
            starts_at: startsAt.toISOString(),
            duration_minutes: Number(values.get("duration")),
            recurrence: recurrenceType,
            repeat_until: repeating ? repeatDate : null,
            repeat_days: recurrenceType === "custom" ? repeatDays : [],
            repeat_dates: recurrenceType === "selected_dates" ? selectedDateKeys : [],
            updated_at: new Date().toISOString()
        };
        const submitButton = form.querySelector('[type="submit"]');
        submitButton.disabled = true;
        try {
            const { error } = await window.supabaseClient.from("calendar_events").upsert(payload);
            if (error) throw error;
            await loadCalendarEvents();
            closeModal();
            render();
            showToast(t(event ? "calendar.updated" : "calendar.saved"));
        } catch (error) {
            console.error("Could not save the calendar event.", error);
            showToast(isMissingCalendarTable(error)
                ? t("calendar.migrationRequired")
                : `${t("calendar.saveError")} ${error.message}`);
            submitButton.disabled = false;
        }
    });
    modalCard.querySelector("[data-calendar-delete]")?.addEventListener("click", async (clickEvent) => {
        const deleteButton = clickEvent.currentTarget;
        if (!window.confirm(t("calendar.deleteConfirm"))) return;
        deleteButton.disabled = true;
        try {
            const { error } = await window.supabaseClient.from("calendar_events").delete().eq("id", event.id);
            if (error) throw error;
            await loadCalendarEvents();
            closeModal();
            render();
            showToast(t("calendar.deleted"));
        } catch (error) {
            console.error("Could not delete the calendar event.", error);
            showToast(`${t("calendar.saveError")} ${error.message}`);
            deleteButton.disabled = false;
        }
    });
}

function formatCalendarDate(date, options = { day: "numeric", month: "short" }) {
    return new Intl.DateTimeFormat(calendarLocale(), options).format(date);
}

function calendarEventLabel(event) {
    const group = data.classes.find((item) => item.id === event.class_id);
    return `${group?.name || t("class.noClass")} · ${event.title}`;
}

function renderCalendar() {
    const writable = hasPermission("manage_classes_students");
    const monthStart = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), 1);
    const gridStart = new Date(monthStart);
    gridStart.setDate(gridStart.getDate() - ((gridStart.getDay() + 6) % 7));
    const gridEnd = new Date(gridStart);
    gridEnd.setDate(gridEnd.getDate() + 41);
    gridEnd.setHours(23, 59, 59, 999);
    const occurrences = calendarOccurrences(calendarEvents, gridStart, gridEnd);
    const eventsByDate = new Map();
    occurrences.forEach((event) => {
        const key = localDateKey(event.occurrenceAt);
        const dayEvents = eventsByDate.get(key) || [];
        dayEvents.push(event);
        eventsByDate.set(key, dayEvents);
    });
    const weekdays = Array.from({ length: 7 }, (_, index) => {
        const day = new Date(2024, 0, 1 + index);
        return `<span>${escapeHtml(new Intl.DateTimeFormat(calendarLocale(), { weekday: "short" }).format(day))}</span>`;
    }).join("");
    const cells = Array.from({ length: 42 }, (_, index) => {
        const date = new Date(gridStart);
        date.setDate(gridStart.getDate() + index);
        const key = localDateKey(date);
        const isCurrentMonth = date.getMonth() === calendarMonth.getMonth();
        const events = eventsByDate.get(key) || [];
        return `<button type="button" class="calendar-day ${isCurrentMonth ? "" : "is-outside"} ${key === localDateKey(new Date()) ? "is-today" : ""}" data-calendar-day="${key}" ${writable ? `aria-label="${escapeHtml(formatCalendarDate(date, { dateStyle: "full" }))}"` : "disabled"}><span class="calendar-day-number">${date.getDate()}</span><span class="calendar-day-events">${events.slice(0, 3).map((event) => `<span class="calendar-event-chip" ${writable ? `data-calendar-event="${escapeHtml(event.id)}"` : ""}><time>${formatCalendarDate(event.occurrenceAt, { hour: "2-digit", minute: "2-digit" })}</time><span>${escapeHtml(calendarEventLabel(event))}</span></span>`).join("")}${events.length > 3 ? `<span class="calendar-more">+${events.length - 3}</span>` : ""}</span></button>`;
    }).join("");
    const monthLabel = new Intl.DateTimeFormat(calendarLocale(), { month: "long", year: "numeric" }).format(calendarMonth);
    const nextEvents = calendarOccurrences(calendarEvents, new Date(), new Date(Date.now() + 30 * 86_400_000)).slice(0, 8);
    return `<div class="section-heading calendar-heading"><div><h1>${t("calendar.title")}</h1><p>${t("calendar.description")}</p></div>${writable ? `<button class="button" type="button" data-calendar-new>${t("calendar.add")}</button>` : ""}</div>
        <div class="calendar-layout"><section class="panel calendar-panel"><div class="calendar-toolbar"><div><button class="mini-action" type="button" data-calendar-shift="-1" aria-label="←">‹</button><button class="button secondary small" type="button" data-calendar-today>${t("calendar.today")}</button><button class="mini-action" type="button" data-calendar-shift="1" aria-label="→">›</button></div><h2>${escapeHtml(monthLabel)}</h2></div><div class="calendar-weekdays">${weekdays}</div><div class="calendar-grid">${cells}</div></section>
        <aside class="panel calendar-upcoming"><div class="panel-heading"><div><h2>${t("calendar.upcoming")}</h2><p class="hint">${t("calendar.upcomingHint")}</p></div><span class="calendar-upcoming-count">${nextEvents.length}</span></div>${nextEvents.length ? `<div class="calendar-upcoming-list">${nextEvents.map((event) => `<article class="calendar-upcoming-item" ${writable ? `data-calendar-event="${escapeHtml(event.id)}"` : ""}><time><strong>${formatCalendarDate(event.occurrenceAt, { day: "numeric" })}</strong><small>${formatCalendarDate(event.occurrenceAt, { month: "short" })}</small></time><div><strong>${escapeHtml(event.title)}</strong><small>${formatCalendarDate(event.occurrenceAt, { hour: "2-digit", minute: "2-digit" })} · ${escapeHtml(data.classes.find((item) => item.id === event.class_id)?.name || t("class.noClass"))}${calendarRecurrenceLabel(event.recurrence) ? ` · ${calendarRecurrenceLabel(event.recurrence)}` : ""}</small></div></article>`).join("")}</div>` : `<div class="calendar-empty">${t(calendarEvents.length ? "calendar.empty" : "calendar.noEvents")}${!calendarEvents.length ? `<small>${t("calendar.createFirst")}</small>` : ""}</div>`}</aside></div>`;
}

function renderClasses() {
    const canManageClasses = hasPermission("manage_classes_students");
    const filtered = data.classes.filter((item) => `${item.name} ${item.course}`.toLowerCase().includes(searchQuery.toLowerCase()));
    const teacherName = userDisplayName(currentUser);
    return `<div class="section-heading"><div><h1>${t("classes.title")}</h1><p>${t("classes.description")}</p></div></div>
        <div class="toolbar">${canManageClasses ? `<button class="button secondary" data-action="new-class">${t("classes.create")}</button>` : ""}<input type="search" data-search placeholder="${t("classes.search")}" value="${escapeHtml(searchQuery)}" aria-label="${t("classes.search")}"></div>
        <div class="card-grid class-grid">${filtered.length ? filtered.map((item, index) => `<article class="class-card class-card-enhanced class-tone-${index % 4}" data-open-class-id="${escapeHtml(item.id)}">
            ${canManageClasses ? `<div class="card-actions"><button class="mini-action" data-action="edit-class" data-id="${escapeHtml(item.id)}" aria-label="${t("modal.editClass")}">✎</button><button class="mini-action" data-action="delete-class" data-id="${escapeHtml(item.id)}" aria-label="${t("action.delete")}">×</button></div>` : ""}
            <div class="class-card-top"><span class="class-card-avatar">${escapeHtml(item.name.slice(0, 2).toUpperCase())}</span><span class="class-course-pill">${escapeHtml(formatCourse(item.course))}</span></div><h3><button type="button" class="class-card-title" data-action="class-lessons" data-id="${escapeHtml(item.id)}">${escapeHtml(item.name)}</button></h3>
            <div class="class-teacher-line"><span class="class-person-icon" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><circle cx="12" cy="7" r="4"></circle><path d="M4.5 21v-2a7.5 7.5 0 0 1 15 0v2z"></path></svg></span><span><small>${t("classes.teacherLabel")}</small><strong>${escapeHtml(item.teacherName || teacherName)}</strong>${presenceBadge(item.teacherId)}</span></div>
            <div class="class-roster"><div class="class-roster-heading"><strong>${t("classes.studentsLabel")}</strong><span>${item.students.length}</span></div>
                ${item.students.length ? `<ul class="class-roster-list">${(item.studentRecords?.length ? item.studentRecords.map((student) => ({ name: student.display_name, userId: student.linked_user_id })) : item.students.map((name) => ({ name, userId: null }))).map((student) => `<li><span class="class-student-avatar">${escapeHtml(student.name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toLocaleUpperCase())}</span><span class="class-roster-student-name">${escapeHtml(student.name)}</span>${presenceBadge(student.userId)}</li>`).join("")}</ul>` : `<p class="class-roster-empty">${t("classes.noStudents")}</p>`}
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
    const students = data.classes.flatMap((item) => item.studentRecords?.length
        ? item.studentRecords.map((student) => ({ name: student.display_name, className: item.name, id: student.id, userId: student.linked_user_id }))
        : item.students.map((name, index) => ({ name, className: item.name, id: `${item.id}-${index}`, userId: null })));
    const filtered = students.filter((student) => `${student.name} ${student.className}`.toLowerCase().includes(searchQuery.toLowerCase()));
    return `<div class="section-heading"><div><h1>${t("students.title")}</h1><p>${t("students.description")}</p></div>${canManageClasses ? `<button class="button secondary" data-view-link="classes">${t("students.manage")}</button>` : ""}</div>
        <div class="toolbar"><span class="hint" style="color:#d7e9dd">${t("students.total", { count: students.length })}</span><input type="search" data-search placeholder="${t("students.search")}" value="${escapeHtml(searchQuery)}" aria-label="${t("students.search")}"></div>
        <div class="student-list">${filtered.length ? filtered.map((student) => `<div class="student-row"><span class="avatar">${escapeHtml(student.name.split(" ").map((part) => part[0]).join("").slice(0, 2))}</span><div class="student-row-main"><strong>${escapeHtml(student.name)}</strong><small>${t("students.role")}</small>${presenceBadge(student.userId)}</div><span class="class-label">${escapeHtml(student.className)}</span></div>`).join("") : emptyMessage(t("students.notFound"), t("students.notFoundHint"))}</div>`;
}

function renderStaff() {
    const members = workspaceAccess.staff || [];
    return `<div class="section-heading"><div><h1>${staffText("title")}</h1><p>${staffText("description")}</p></div><button class="button" data-action="add-teacher">${staffText("add")}</button></div>
        <div class="staff-grid">
            ${members.length ? members.map((member) => `<article class="staff-card"><span class="avatar">${escapeHtml(initialsFor(member.name || member.email))}</span><div class="staff-card-main"><strong>${escapeHtml(member.name || member.email)}</strong>${member.name ? `<small class="staff-card-email">${escapeHtml(member.email)}</small>` : ""}<small>${staffText("memberRole")}</small>${presenceBadge(member.id)}<span class="staff-permissions">${permissionLabels.filter(([key]) => member.permissions?.[key]).map(([, label]) => staffText(label)).join(" · ") || staffText("noEditor")}</span></div>
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

async function removeTeacher(memberId) {
    const member = workspaceAccess.staff.find((item) => item.id === memberId);
    if (!member || !window.confirm(staffText("removeConfirm", { email: member.name || member.email }))) return;
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
        render();
        showToast(staffText("removed"));
    } catch (error) {
        console.error("Could not remove teacher workspace access.", error);
        showToast(`${staffText("error")} ${error.message}`);
    }
}

const lessonIconPaths = {
    "drag-words": '<path d="M4 8h10m-3-3 3 3-3 3M20 16H10m3-3-3 3 3 3"/>',
    "fill-blank": '<path d="M4 7h16M4 12h6m4 0h6M4 17h16"/><path d="M10 13v-2m4 2v-2"/>',
    "multiple-choice": '<circle cx="12" cy="12" r="8.5"/><path d="m8.5 12 2.3 2.3 4.8-5"/>',
    "order-items": '<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4.5 6h.01M4.5 12h.01M4.5 18h.01"/>',
    "sentence-order": '<path d="M5 5h15M5 9h11M5 15h15M5 19h11"/><path d="M3 5h.01M3 15h.01"/>',
    "one-of-many": '<rect x="4" y="5" width="16" height="14" rx="3"/><path d="m9 11 3 3 3-3"/>',
    "true-false": '<path d="m4.5 7 2 2 3.5-4M13 7h7M4.5 17l2-2 3.5 4M13 17h7"/>',
    table: '<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><path d="M3.5 10h17M3.5 14.5h17M9 4.5v15M15 4.5v15"/>',
    match: '<circle cx="6" cy="6" r="1.5"/><circle cx="18" cy="18" r="1.5"/><path d="M7.5 6H12a3 3 0 0 1 3 3v3a3 3 0 0 0 3 3M6 7.5v9"/>',
    columns: '<rect x="4" y="4" width="7" height="16" rx="1.5"/><rect x="13" y="4" width="7" height="16" rx="1.5"/><path d="M6 8h3M15 8h3"/>',
    "open-answer": '<path d="m14 5 5 5M4 20l4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z"/>',
    flashcards: '<rect x="7" y="4" width="13" height="15" rx="2"/><path d="M4 7v13h12"/>',
    text: '<path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5"/>',
    video: '<rect x="3.5" y="5" width="17" height="14" rx="3"/><path d="m10 9 5 3-5 3z"/>',
    audio: '<path d="M4 10v4M8 7v10M12 4v16M16 7v10M20 10v4"/>',
    image: '<rect x="3.5" y="4.5" width="17" height="15" rx="2.5"/><circle cx="9" cy="9" r="1.5"/><path d="m4 16 5-4 3 2 3-3 5 4"/>',
    "pronunciation-recording": '<rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3m-4 0h8"/>',
    "listening-questions": '<path d="M4 13v-2a8 8 0 0 1 16 0v2"/><path d="M4 12H3v6h4v-5H4zm16 0h1v6h-4v-5h3z"/>',
    "find-error": '<path d="m4 7 2 2 4-4M13 7h7M4 17h16M6 13h8"/>',
    "interactive-image": '<rect x="3.5" y="4.5" width="17" height="15" rx="2.5"/><circle cx="9" cy="9" r="1.5"/><path d="m4 16 5-4 3 2 3-3 5 4"/><circle cx="16" cy="10" r="2"/>',
    vocabulary: '<path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5"/><path d="m16 2 2 2"/>'
};

function lessonIcon(lesson) {
    const activityType = lessonActivities(lesson)[0]?.type;
    const icon = lessonIconPaths[activityType] || lessonIconPaths.text;
    return `<span class="lesson-symbol" aria-hidden="true"><svg viewBox="0 0 24 24">${icon}</svg></span>`;
}

function lessonRow(lesson) {
    return `<div class="lesson-row">${lessonIcon(lesson)}<div class="lesson-main"><button class="lesson-preview-link" data-action="preview-lesson" data-id="${escapeHtml(lesson.id)}">${escapeHtml(lesson.title)}</button><small>${lesson.unit || inferLessonUnit(lesson)} · ${escapeHtml(lessonClassNames(lesson))}</small></div><span class="lesson-count">${countLabel(lessonActivities(lesson).length, "activity")}</span></div>`;
}

const previewLabels = {
    ua: { open: "Відкрити урок", practice: "Спробуйте виконати завдання. Результати тут не зберігаються.", check: "Перевірити", correct: "Правильно!", incorrect: "Спробуйте ще раз.", noAnswer: "Для цього завдання ще не вказано правильну відповідь.", typeAnswer: "Введіть відповідь", choose: "Виберіть відповідь", drop: "Перетягніть або натисніть слова сюди", bank: "Слова", answer: "Ваше речення", up: "Вище", down: "Нижче", flip: "Перевернути картку", empty: "У цьому уроці поки немає блоків.", imageError: "Не вдалося завантажити зображення.", mediaError: "Перевірте посилання на медіафайл.", readOnly: "Навчальний матеріал", true: "Так", false: "Ні" },
    ru: { open: "Открыть урок", practice: "Попробуйте выполнить задания. Результаты здесь не сохраняются.", check: "Проверить", correct: "Верно!", incorrect: "Попробуйте ещё раз.", noAnswer: "Для этого задания ещё не указан правильный ответ.", typeAnswer: "Введите ответ", choose: "Выберите ответ", drop: "Перетащите или нажмите слова сюда", bank: "Слова", answer: "Ваш ответ", up: "Выше", down: "Ниже", flip: "Перевернуть карточку", empty: "В этом уроке пока нет блоков.", imageError: "Не удалось загрузить изображение.", mediaError: "Проверьте ссылку на медиафайл.", readOnly: "Учебный материал", true: "Да", false: "Нет" },
    en: { open: "Open lesson", practice: "Try the activities. Your results are not saved here.", check: "Check answer", correct: "Correct!", incorrect: "Try again.", noAnswer: "No correct answer has been set for this activity.", typeAnswer: "Type your answer", choose: "Choose an answer", drop: "Drag or click words here", bank: "Words", answer: "Your answer", up: "Move up", down: "Move down", flip: "Flip card", empty: "This lesson has no activities yet.", imageError: "The image could not be loaded.", mediaError: "Check the media link.", readOnly: "Learning material", true: "True", false: "False" }
};
const previewGroupCheckLabels = { ua: "Перевірити відповіді", ru: "Проверить ответы", en: "Check answers" };

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
        return ["https:", "http:"].includes(url.protocol) ? url.href : "";
    } catch {
        return "";
    }
}

function previewFlashcardSideMarkup(value) {
    const url = previewMediaUrl(value);
    if (!url) return escapeHtml(value).replace(/\n/g, "<br>");
    const pathname = new URL(url).pathname.toLowerCase();
    if (/\.(png|jpe?g|webp|gif|avif)$/.test(pathname)) {
        return `<img class="preview-flashcard-media" src="${escapeHtml(url)}" alt="" data-preview-image>`;
    }
    if (/\.(mp3|wav|m4a|ogg|aac|flac)$/.test(pathname)) {
        return `<audio class="preview-flashcard-media" controls preload="none" src="${escapeHtml(url)}" data-preview-media></audio>`;
    }
    return escapeHtml(value).replace(/\n/g, "<br>");
}

function previewVideoEmbedUrl(value) {
    try {
        const url = new URL(String(value || "").trim());
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

function renderPreviewActivity(activity, index, canEdit = false, quickEditing = false, liveAnswerMarkup = "", questionIndex = null) {
    const type = activity.type;
    const isQuestion = Number.isInteger(questionIndex);
    const prompt = escapeHtml(activity.prompt || (isQuestion
        ? `${activityQuestionText("item")} ${questionIndex + 1}`
        : t(activityTypes.find((item) => item.id === type)?.nameKey || "activity.task")));
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
        const hasQuestions = Array.isArray(activity.questions) && activity.questions.length > 0;
        return `<article class="preview-activity preview-activity-editable preview-activity-editing" data-preview-activity="${index}" data-preview-type="${escapeHtml(type)}" data-preview-answer="${escapeHtml(answer)}" data-preview-content="${escapeHtml(content)}">
            <header class="preview-activity-header"><h3>${index + 1}. ${prompt}</h3><div class="preview-activity-actions">
                <button class="mini-action" type="button" data-save-preview-block aria-label="${lessonSectionText("done")}" title="${lessonSectionText("done")}">✓</button>
                <button class="mini-action preview-activity-delete" type="button" data-cancel-preview-edit aria-label="${t("action.cancel")}" title="${t("action.cancel")}">×</button>
            </div></header>
            <div class="preview-inline-editor">
                <div class="form-field"><label>${hasQuestions ? activityQuestionText("commonPrompt") : t("field.instruction")}</label><input data-preview-field="prompt" value="${escapeHtml(activity.prompt || "")}" placeholder="${t("field.instructionExample")}"></div>
                ${hasQuestions
                    ? renderActivityQuestionEditor(activity, true)
                    : `<div class="form-field"><label>${activityType?.category === "media" ? t("field.mediaContent") : t("field.taskText")} <span class="hint">${escapeHtml(contentHint(type))}</span></label><textarea data-preview-field="content" placeholder="${escapeHtml(contentPlaceholder(type))}">${escapeHtml(activity.content || "")}</textarea></div>
                    ${hasAnswer ? `<div class="form-field"><label>${t("field.answer")} <span class="hint">${escapeHtml(answerHint(type))}</span></label><input data-preview-field="answer" value="${escapeHtml(activity.answer || "")}" placeholder="${escapeHtml(answerPlaceholder(type))}"></div>` : ""}
                    ${renderActivityQuestionEditor(activity, true)}`}
                ${activitySettingsField(activity, true)}
            </div>
        </article>`;
    }

    if (!isQuestion && Array.isArray(activity.questions) && activity.questions.length) {
        const questionAnswers = Array.isArray(liveAnswerMarkup) ? liveAnswerMarkup : [];
        const questionsMarkup = activity.questions.map((question, itemIndex) => renderPreviewActivity({
            type,
            prompt: String(question.prompt || ""),
            content: String(question.content || ""),
            answer: String(question.answer || "")
        }, index, false, false, questionAnswers[itemIndex] || "", itemIndex)).join("");
        return `<article class="preview-activity preview-activity-group ${canEdit ? "preview-activity-editable" : ""}" data-preview-activity="${index}">
            <header class="preview-activity-header">${canEdit ? `<button type="button" class="preview-activity-drag" aria-label="${lessonSectionText("moveBlock")}" title="${lessonSectionText("moveBlock")}">⠿</button>` : ""}<h3>${index + 1}. ${escapeHtml(activity.prompt || t(activityTypes.find((item) => item.id === type)?.nameKey || "activity.task"))}</h3>${canEdit ? `<div class="preview-activity-actions">${duplicateBlockButton("data-duplicate-preview-block", index)}<button class="mini-action" type="button" data-edit-preview-block="${index}" aria-label="${lessonSectionText("edit")}" title="${lessonSectionText("edit")}">✎</button><button class="mini-action preview-activity-delete" type="button" data-delete-preview-block="${index}" aria-label="${lessonSectionText("remove")}" title="${lessonSectionText("remove")}">×</button></div>` : ""}</header>
            <div class="preview-question-list">${questionsMarkup}</div>
            ${liveAnswerActivityTypes.has(type) ? `<div class="preview-actions"><button class="button preview-check" type="button" data-check-activity-group>${previewGroupCheckLabels[currentLanguage]}</button></div>` : ""}
        </article>`;
    }

    if (type === "drag-words") {
        const expected = answer ? previewTokens(answer) : content.trim().split(/\s+/).filter(Boolean);
        const correctOrder = answer ? expected.join(" ") : content.trim();
        const tokens = expected.map((word, wordIndex) => ({ word, wordIndex }));
        if (tokens.length > 1) tokens.push(tokens.shift());
        const previewKey = isQuestion ? `${index}-q${questionIndex}` : String(index);
        body = `<div class="preview-drag-layout"><div><strong>${previewText("bank")}</strong><div class="preview-word-bank" data-word-bank>${tokens.map(({ word, wordIndex }) => `<button type="button" class="preview-word" draggable="true" data-word-index="${previewKey}-${wordIndex}">${escapeHtml(word)}</button>`).join("")}</div></div><div><strong>${previewText("answer")}</strong><div class="preview-dropzone" data-dropzone tabindex="0">${correctOrder ? `<span class="preview-answer-ghost">${escapeHtml(correctOrder)}</span>` : `<span class="preview-drop-hint">${previewText("drop")}</span>`}</div></div></div>`;
        if (!expected.length) checkable = false;
    } else if (type === "fill-blank") {
        let blankIndex = 0;
        const parts = content.split("___");
        const correctParts = previewTokens(answer);
        body = `<p class="preview-instruction">${parts.map((part, partIndex) => `${escapeHtml(part)}${partIndex < parts.length - 1 ? `<input class="preview-inline-input" data-answer-index="${blankIndex}" placeholder="${escapeHtml(correctParts[blankIndex++] || "")}" aria-label="${previewText("typeAnswer")}" autocomplete="off">` : ""}`).join("")}</p>`;
    } else if (type === "one-of-many" && (lines[0] || "").includes("___")) {
        const [before, ...after] = lines[0].split("___");
        const options = lines.slice(1);
        const answerIndex = Number(answer);
        const correctOption = Number.isInteger(answerIndex) && answer !== "" && options[answerIndex - 1] !== undefined
            ? options[answerIndex - 1]
            : answer;
        body = `<p class="preview-instruction">${escapeHtml(before)}<select class="preview-inline-select" data-inline-choice aria-label="${previewText("choose")}"><option value="">---</option>${options.map((option, optionIndex) => `<option value="${optionIndex + 1}" ${option.toLocaleLowerCase() === correctOption.toLocaleLowerCase() ? "data-correct-option" : ""}>${escapeHtml(option)}</option>`).join("")}</select>${escapeHtml(after.join("___"))}</p>`;
        if (!answer) checkable = false;
    } else if (type === "multiple-choice" || type === "one-of-many" || type === "true-false") {
        const options = type === "true-false" ? [previewText("true"), previewText("false")] : lines;
        const statement = type === "true-false" && displayContent ? `<p class="preview-instruction">${escapeHtml(displayContent)}</p>` : "";
        const radioName = isQuestion ? `preview-${index}-q${questionIndex}` : `preview-${index}`;
        const answerIndex = Number(answer);
        const booleanAnswerIndex = /^(true|yes|так|да|правда|0)$/i.test(answer) ? 0
            : /^(false|no|ні|нет|неправда|1)$/i.test(answer) ? 1 : -1;
        const correctOption = type === "true-false" && booleanAnswerIndex >= 0
            ? options[booleanAnswerIndex].toLocaleLowerCase()
            : Number.isInteger(answerIndex) && answer !== "" && options[answerIndex] !== undefined
                ? options[answerIndex].toLocaleLowerCase()
                : answer.toLocaleLowerCase();
        body = `${statement}<div class="preview-options">${options.map((option, optionIndex) => `<label class="preview-option ${option.toLocaleLowerCase() === correctOption ? "is-correct-option" : ""}"><input type="radio" name="${radioName}" value="${optionIndex}"><span>${escapeHtml(option)}</span>${option.toLocaleLowerCase() === correctOption ? `<span class="preview-correct-mark" title="${liveStudentText("correctAnswer")}" aria-label="${liveStudentText("correctAnswer")}">✓</span>` : ""}</label>`).join("")}</div>`;
        if (!answer) checkable = false;
    } else if (type === "order-items" || type === "sentence-order") {
        const items = lines.map((line, itemIndex) => ({ text: line.replace(/^\d+[.)]\s*/, ""), itemIndex }));
        if (items.length > 1) items.reverse();
        const previewKey = isQuestion ? `${index}-q${questionIndex}` : String(index);
        body = `<ol class="preview-order-list" data-order-list>${items.map(({ text, itemIndex }) => `<li class="preview-order-item" draggable="true" data-order-index="${previewKey}-${itemIndex}"><span class="preview-order-item-text">${escapeHtml(text)}</span><span class="preview-order-actions"><button type="button" data-move="up" aria-label="${previewText("up")}">↑</button><button type="button" data-move="down" aria-label="${previewText("down")}">↓</button></span></li>`).join("")}</ol>`;
    } else if (type === "columns") {
        const pairs = lines.map((line) => line.split(":").map((part) => part.trim())).filter((pair) => pair.length >= 2 && pair[0] && pair[1]);
        const categories = [...new Set(pairs.map(([category]) => category))];
        body = `${pairs.length ? `<div class="preview-match-list" data-pair-board data-pair-reuse>${pairs.map(([category, item], itemIndex) => `<div class="preview-match-row" data-pair-row data-pair-correct="${escapeHtml(category)}"><span>${escapeHtml(item)}</span><select data-column-index="${itemIndex}" aria-label="${previewText("choose")}"><option value="">${previewText("choose")}</option>${categories.map((option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`).join("")}</select></div>`).join("")}</div>` : displayContent ? `<p class="preview-material">${escapeHtml(displayContent)}</p>` : ""}`;
        if (!pairs.length) checkable = false;
    } else if (type === "match") {
        const pairs = lines.map((line) => line.split("=").map((part) => part.trim())).filter((pair) => pair.length >= 2 && pair[0] && pair[1]);
        body = `${pairs.length ? `<div class="preview-match-list" data-pair-board>${pairs.map(([left, correct], pairIndex) => `<div class="preview-match-row" data-pair-row data-pair-correct="${escapeHtml(correct)}"><span>${escapeHtml(left)}</span><select data-match-index="${pairIndex}" aria-label="${previewText("choose")}"><option value="">${previewText("choose")}</option>${pairs.map(([, right], rightIndex) => `<option value="${rightIndex}">${escapeHtml(right)}</option>`).join("")}</select></div>`).join("")}</div>` : displayContent ? `<p class="preview-material">${escapeHtml(displayContent)}</p>` : ""}`;
        if (!pairs.length) checkable = false;
    } else if (type === "open-answer") {
        body = `${displayContent ? `<p class="preview-material">${escapeHtml(displayContent)}</p>` : ""}<textarea class="preview-text-answer" data-open-answer placeholder="${previewText("typeAnswer")}"></textarea>`;
        if (!answer) checkable = false;
    } else if (type === "flashcards") {
        body = `<div class="preview-flashcards">${lines.map((line) => {
            const delimiter = line.includes("|") ? "|" : ":";
            const separator = line.indexOf(delimiter);
            const front = (separator < 0 ? line : line.slice(0, separator)).trim();
            const back = separator < 0 ? "" : line.slice(separator + 1).trim();
            return `<div class="preview-flashcard" data-front="${escapeHtml(front)}" data-back="${escapeHtml(back)}"><strong>${previewFlashcardSideMarkup(front)}</strong><button type="button" class="preview-flashcard-flip" aria-pressed="false">${previewText("flip")}</button></div>`;
        }).join("") || `<p class="preview-material">${escapeHtml(displayContent)}</p>`}</div>`;
        checkable = false;
    } else if (type === "image") {
        const images = window.slovaGallery.parse(content, true);
        body = images.length ? window.slovaGallery.html(images, activity.prompt || "", "preview-image") : `<p class="preview-material">${escapeHtml(displayContent || previewText("imageError"))}</p>`;
        checkable = false;
    } else if (type === "audio" || type === "video") {
        const embed = type === "video" ? previewVideoEmbedUrl(content) : "";
        const source = previewMediaUrl(content);
        body = `${embed ? `<iframe class="preview-video-embed" src="${escapeHtml(embed)}" title="${escapeHtml(prompt || previewText("mediaError"))}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` : source ? `<${type} class="preview-media" controls preload="metadata" data-preview-media><source src="${escapeHtml(source)}"></${type}>` : `<p class="preview-material">${escapeHtml(displayContent || previewText("mediaError"))}</p>`}`;
        checkable = false;
    } else if (type === "table") {
        let blankIndex = 0;
        const rows = lines.map((line) => line.split(/\t|\s*\|\s*/).map((cell) => cell.trim()));
        const correctParts = previewTokens(answer);
        body = `<div class="preview-table-wrap"><table class="preview-table"><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell.split("___").map((part, partIndex, parts) => `${escapeHtml(part)}${partIndex < parts.length - 1 ? `<input class="preview-inline-input" data-table-answer-index="${blankIndex}" placeholder="${escapeHtml(correctParts[blankIndex++] || "")}" aria-label="${previewText("typeAnswer")}" autocomplete="off">` : ""}`).join("")}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
        checkable = blankIndex > 0;
    } else if (type === "text") {
        const note = window.SlovaActivityUI?.renderNote(content, activity.prompt);
        if (note && !quickEditing) {
            const noteEditTools = canEdit ? `<div class="preview-activity-actions note-actions">${duplicateBlockButton("data-duplicate-preview-block", index)}<button class="mini-action" type="button" data-edit-preview-block="${index}" aria-label="${lessonSectionText("edit")}" title="${lessonSectionText("edit")}">✎</button><button class="mini-action preview-activity-delete" type="button" data-delete-preview-block="${index}" aria-label="${lessonSectionText("remove")}" title="${lessonSectionText("remove")}">×</button></div>` : "";
            return `<article class="preview-activity preview-note-card" data-preview-activity="${index}">${noteEditTools}${note}</article>`;
        }
        const richText = window.SlovaActivityUI?.renderRichText(content);
        body = richText || (displayContent ? `<div class="preview-material">${escapeHtml(displayContent).replace(/\n/g, "<br>")}</div>` : "");
        checkable = false;
    } else {
        body = displayContent ? `<div class="preview-material">${escapeHtml(displayContent).replace(/\n/g, "<br>")}</div>` : "";
        checkable = false;
    }

    const previewItemNumber = isQuestion ? `${index + 1}.${questionIndex + 1}` : String(index + 1);
    const previewItemClass = isQuestion ? "preview-question-activity" : "preview-activity";
    const questionAttribute = isQuestion ? `data-question-index="${questionIndex}"` : "";
    const resultMarkup = checkable || (isQuestion && liveAnswerActivityTypes.has(type))
        ? `<p class="preview-result${isQuestion ? " preview-question-result" : ""}" data-preview-result aria-live="polite"></p>`
        : "";
    const checkButton = checkable && !isQuestion
        ? `<div class="preview-actions"><button class="button preview-check" type="button" data-check-activity>${previewText("check")}</button></div>`
        : "";
    const correctMarkup = "";
    return `<article class="${previewItemClass}" data-preview-activity="${index}" ${questionAttribute} data-preview-type="${escapeHtml(type)}" data-preview-answer="${escapeHtml(answer)}" data-preview-content="${escapeHtml(content)}"><header class="preview-activity-header">${canEdit ? `<button type="button" class="preview-activity-drag" aria-label="${lessonSectionText("moveBlock")}" title="${lessonSectionText("moveBlock")}">⠿</button>` : ""}${isQuestion ? `<span class="preview-q-badge">${questionIndex + 1}</span>` : `<h3>${previewItemNumber}. ${prompt}</h3>`}${canEdit ? `<div class="preview-activity-actions">${duplicateBlockButton("data-duplicate-preview-block", index)}<button class="mini-action" type="button" data-edit-preview-block="${index}" aria-label="${lessonSectionText("edit")}" title="${lessonSectionText("edit")}">✎</button><button class="mini-action preview-activity-delete" type="button" data-delete-preview-block="${index}" aria-label="${lessonSectionText("remove")}" title="${lessonSectionText("remove")}">×</button></div>` : ""}</header>${isQuestion && activity.prompt?.trim() ? `<p class="preview-q-prompt">${prompt}</p>` : ""}${liveAnswerMarkup}${resultMarkup}${body}${correctMarkup}${checkButton}</article>`;
}

function checkPreviewActivity(card) {
    const result = card.querySelector("[data-preview-result]");
    if (!result) return;
    const answer = card.dataset.previewAnswer.trim();
    const resultClass = (status = "") => `preview-result${card.classList.contains("preview-question-activity") ? " preview-question-result" : ""}${status ? ` ${status}` : ""}`;
    if (!answer && !["match", "columns"].includes(card.dataset.previewType)) {
        result.textContent = previewText("noAnswer");
        result.className = resultClass();
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
        const inlineChoice = card.querySelector("[data-inline-choice]");
        const selected = inlineChoice ? (inlineChoice.value ? inlineChoice : null) : card.querySelector('input[type="radio"]:checked');
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
    result.className = resultClass(correct ? "correct" : "incorrect");
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
    scrollToFirstWorkspaceActivity();
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
    const previousData = structuredClone(data);
    const originalSections = isHomework ? normalizeHomeworkSections(lesson) : normalizeLessonSections(lesson);
    const sections = originalSections.map((section) => ({
        ...section,
        activities: section.id === sectionId ? activities : [...section.activities]
    }));
    ensureActivityBlockIds(sections);
    lesson[sectionProperty] = sections;
    if (!isHomework) lesson.activities = sections.flatMap((section) => section.activities);
    if (!await persistWorkspaceChange(previousData)) return false;
    previewActivityEdit = null;
    render();
    scrollToFirstWorkspaceActivity();
    showToast(successMessage);
    return true;
}

function bindLessonPreviewActions(container = pageContent, lesson = null, section = null, isHomework = false) {
    window.SlovaActivityUI?.enhancePairing(container, { empty: previewText("choose") });
    if (lesson && section && hasPermission("edit_lessons")) {
        container.querySelectorAll("[data-edit-preview-block]").forEach((button) => button.addEventListener("click", () => {
            const activityIndex = Number(button.dataset.editPreviewBlock);
            const activity = section.activities[activityIndex];
            if (!activity) return;
            const draft = structuredClone(activity);
            ensureActivityQuestionIds(draft);
            previewActivityEdit = {
                lessonId: lesson.id,
                sectionId: section.id,
                activityIndex,
                isHomework,
                draft
            };
            render();
            (pageContent.querySelector('[data-preview-question-field="content"]')
                || pageContent.querySelector('[data-preview-field="prompt"]'))?.focus();
        }));
        container.querySelectorAll("[data-preview-field]").forEach((input) => input.addEventListener("input", () => {
            if (previewActivityEdit?.lessonId === lesson.id
                && previewActivityEdit.sectionId === section.id
                && previewActivityEdit.isHomework === isHomework) {
            if (input.dataset.previewField === "settings") {
                updateActivitySettings(previewActivityEdit.draft, input);
            } else previewActivityEdit.draft[input.dataset.previewField] = input.value;
            }
        }));
        container.querySelectorAll("[data-preview-question-field]").forEach((input) => input.addEventListener("input", () => {
            const edit = previewActivityEdit;
            if (edit?.lessonId !== lesson.id || edit.sectionId !== section.id || edit.isHomework !== isHomework) return;
            const question = edit.draft.questions?.[Number(input.closest("[data-preview-question-index]")?.dataset.previewQuestionIndex)];
            if (question) question[input.dataset.previewQuestionField] = input.value;
        }));
        container.querySelectorAll("[data-add-preview-question]").forEach((button) => button.addEventListener("click", () => {
            const edit = previewActivityEdit;
            if (!edit || edit.lessonId !== lesson.id || edit.sectionId !== section.id || edit.isHomework !== isHomework) return;
            const questionIndex = addActivityQuestion(edit.draft);
            if (questionIndex < 0) return;
            render();
            pageContent.querySelector(`[data-preview-question-index="${questionIndex}"] [data-preview-question-field="content"]`)?.focus();
        }));
        container.querySelectorAll("[data-preview-remove-question]").forEach((button) => button.addEventListener("click", () => {
            const edit = previewActivityEdit;
            if (!edit || edit.lessonId !== lesson.id || edit.sectionId !== section.id || edit.isHomework !== isHomework) return;
            const questionIndex = Number(button.closest("[data-preview-question-index]")?.dataset.previewQuestionIndex);
            if (!Array.isArray(edit.draft.questions) || edit.draft.questions.length <= 1) return;
            edit.draft.questions.splice(questionIndex, 1);
            render();
        }));
        container.querySelectorAll("[data-cancel-preview-edit]").forEach((button) => button.addEventListener("click", () => {
            previewActivityEdit = null;
            render();
        }));
        container.querySelectorAll("[data-save-preview-block]").forEach((button) => button.addEventListener("click", async () => {
            const edit = previewActivityEdit;
            if (!edit || edit.lessonId !== lesson.id || edit.sectionId !== section.id || edit.isHomework !== isHomework) return;
            const settingsInput = container.querySelector('[data-preview-field="settings"]');
            if (settingsInput && !updateActivitySettings(edit.draft, settingsInput)) {
                settingsInput.focus();
                return;
            }
            const activities = section.activities.map((activity, index) =>
                index === edit.activityIndex ? structuredClone(edit.draft) : activity
            );
            button.disabled = true;
            const saved = await savePreviewActivities(lesson, section.id, activities, t("toast.activityUpdated"), isHomework);
            if (!saved && button.isConnected) button.disabled = false;
        }));
        container.querySelectorAll("[data-duplicate-preview-block]").forEach((button) => button.addEventListener("click", () => {
            const index = Number(button.dataset.duplicatePreviewBlock);
            if (!section.activities[index]) return;
            const activities = [...section.activities];
            activities.splice(index + 1, 0, cloneActivityBlock(section.activities[index]));
            savePreviewActivities(lesson, section.id, activities, lessonSectionText("duplicated"), isHomework);
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
        checkPreviewActivity(button.closest("[data-preview-activity]"));
    }));
    container.querySelectorAll("[data-check-activity-group]").forEach((button) => button.addEventListener("click", () => {
        button.closest(".preview-activity-group")?.querySelectorAll(".preview-question-activity")
            .forEach((card) => checkPreviewActivity(card));
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
        animatePreviewReorder(item.parentElement, () => {
            if (button.dataset.move === "up") item.parentElement.insertBefore(item, sibling);
            else item.parentElement.insertBefore(sibling, item);
        });
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
            if (moving && moving !== item) animatePreviewReorder(item.parentElement, () => item.parentElement.insertBefore(moving, item));
        });
    });
    container.querySelectorAll(".preview-flashcard-flip").forEach((button) => button.addEventListener("click", () => {
        const card = button.closest(".preview-flashcard");
        if (!card) return;
        const flipped = card.dataset.flipped === "true";
        card.dataset.flipped = String(!flipped);
        card.querySelector("strong").replaceChildren(document.createRange().createContextualFragment(
            previewFlashcardSideMarkup(flipped ? card.dataset.front : (card.dataset.back || card.dataset.front))
        ));
        card.classList.toggle("flipped", !flipped);
        button.setAttribute("aria-pressed", String(!flipped));
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
    dropzone.classList.toggle("has-words", Boolean(dropzone.querySelector(".preview-word")));
    word.animate([{ transform: "translateY(4px) scale(.96)", opacity: .65 }, { transform: "translateY(0) scale(1)", opacity: 1 }], { duration: 200, easing: "cubic-bezier(.2,.75,.25,1)" });
    if (!dropzone.querySelector(".preview-word") && !dropzone.querySelector(".preview-answer-ghost")) dropzone.innerHTML = `<span class="preview-drop-hint">${previewText("drop")}</span>`;
}

function animatePreviewReorder(container, update) {
    const items = [...container.children];
    const positions = new Map(items.map((item) => [item, item.getBoundingClientRect()]));
    update();
    [...container.children].forEach((item) => {
        const before = positions.get(item);
        if (!before) return;
        const after = item.getBoundingClientRect();
        const x = before.left - after.left;
        const y = before.top - after.top;
        if (x || y) item.animate([{ transform: `translate(${x}px, ${y}px)` }, { transform: "translate(0, 0)" }], { duration: 220, easing: "cubic-bezier(.2,.75,.25,1)" });
    });
}

function emptyMessage(title, description) {
    return `<div class="empty-state"><strong>${escapeHtml(title)}</strong>${escapeHtml(description)}</div>`;
}

function bindPageActions() {
    pageContent.querySelector("[data-calendar-new]")?.addEventListener("click", () => openCalendarEvent());
    pageContent.querySelectorAll("[data-calendar-shift]").forEach((button) => button.addEventListener("click", () => {
        calendarMonth.setMonth(calendarMonth.getMonth() + Number(button.dataset.calendarShift));
        render();
    }));
    pageContent.querySelector("[data-calendar-today]")?.addEventListener("click", () => {
        calendarMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        render();
    });
    pageContent.querySelectorAll("[data-calendar-day]").forEach((button) => button.addEventListener("click", (event) => {
        const existing = event.target.closest("[data-calendar-event]");
        if (existing) {
            const calendarEvent = calendarEvents.find((item) => item.id === existing.dataset.calendarEvent);
            if (calendarEvent) openCalendarEvent(calendarEvent);
            return;
        }
        openCalendarEvent(null, new Date(`${button.dataset.calendarDay}T10:00:00`));
    }));
    pageContent.querySelectorAll(".calendar-upcoming-item[data-calendar-event]").forEach((item) => item.addEventListener("click", () => {
        const calendarEvent = calendarEvents.find((event) => event.id === item.dataset.calendarEvent);
        if (calendarEvent) openCalendarEvent(calendarEvent);
    }));
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
    const studentRecords = item?.studentRecords?.length
        ? item.studentRecords
        : (item?.students || []).map((display_name) => ({ id: "", display_name }));
    const studentRowMarkup = (student = {}) => `<div class="class-student-edit-row" data-student-row>
        <input name="studentNames" data-student-id="${escapeHtml(student.id || crypto.randomUUID())}" value="${escapeHtml(student.display_name || "")}" maxlength="120" placeholder="${t("field.studentsPlaceholder")}" aria-label="${t("field.students")}">
        <button class="mini-action" type="button" data-remove-student aria-label="${t("action.delete")}">×</button>
    </div>`;
    openModal(`${modalHeader(item ? t("modal.editClass") : t("modal.newClass"))}
        <form id="classForm">
            <div class="form-field"><label for="className">${t("field.className")}</label><input id="className" name="name" required maxlength="80" value="${escapeHtml(item?.name || "")}" placeholder="${t("field.exampleClass")}"></div>
            <div class="form-field"><label for="classCourse">${t("field.course")}</label><input id="classCourse" name="course" maxlength="80" value="${escapeHtml(item?.course || "")}" placeholder="${t("field.exampleCourse")}"></div>
            ${item
                ? `<div class="form-field"><label>${t("field.students")}</label><div class="class-student-edit-list">${studentRecords.map(studentRowMarkup).join("")}</div><button class="text-link" id="addClassStudent" type="button">${t("action.addStudent")}</button><span class="hint">${t("field.studentsHint")}</span></div>`
                : `<div class="form-field"><label for="classStudents">${t("field.students")}</label><textarea id="classStudents" name="students" placeholder="${t("field.studentsPlaceholder")}"></textarea><span class="hint">${t("field.studentsHint")}</span></div>`}
            <div class="modal-actions"><button type="button" class="button secondary" data-close>${t("action.cancel")}</button><button class="button" type="submit">${item ? t("action.save") : t("action.createClass")}</button></div>
        </form>`);
    refreshModal = () => openClassEditor(item);
    modalCard.querySelectorAll("[data-close]").forEach((button) => button.addEventListener("click", closeModal));
    const formElement = modalCard.querySelector("#classForm");
    const studentRows = formElement.querySelector(".class-student-edit-list");
    studentRows?.addEventListener("click", (event) => {
        if (event.target.closest("[data-remove-student]")) event.target.closest("[data-student-row]").remove();
    });
    modalCard.querySelector("#addClassStudent")?.addEventListener("click", () => {
        studentRows.insertAdjacentHTML("beforeend", studentRowMarkup());
        studentRows.lastElementChild.querySelector("input").focus();
    });
    formElement.addEventListener("submit", async (event) => {
        event.preventDefault();
        const submitButton = event.currentTarget.querySelector('[type="submit"]');
        if (submitButton.disabled) return;
        const form = new FormData(event.currentTarget);
        const name = String(form.get("name")).trim();
        if (!name) return;
        const updatedStudents = item
            ? [...studentRows.querySelectorAll("[data-student-row]")].map((row) => ({
                id: row.querySelector("input").dataset.studentId,
                display_name: row.querySelector("input").value.trim()
            })).filter((student) => student.display_name)
            : String(form.get("students")).split(",").map((student) => student.trim()).filter(Boolean)
                .map((display_name) => ({ id: crypto.randomUUID(), display_name }));
        const updated = {
            id: item?.id || crypto.randomUUID(),
            teacherId: item?.teacherId || currentUser?.id,
            teacherName: item?.teacherName,
            name,
            course: String(form.get("course")).trim() || t("class.unnamedCourse"),
            students: updatedStudents.map((student) => typeof student === "string" ? student : student.display_name),
            studentRecords: updatedStudents
        };
        const previousData = structuredClone(data);
        if (item) data.classes = data.classes.map((current) => current.id === item.id ? updated : current);
        else data.classes.push(updated);
        submitButton.disabled = true;
        if (!await persistWorkspaceChange(previousData)) {
            if (submitButton.isConnected) submitButton.disabled = false;
            return;
        }
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
    enhanceSelects(modalCard);
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
        enhancedSelectRefreshers.get(existingSelect)?.();
        existingStatus.textContent = available.length ? "" : students.length ? t("studentInvite.noneAvailable") : t("studentInvite.noExisting");
        existingSelect.required = mode === "existing" && Boolean(available.length);
        if (mode === "existing") submitButton.disabled = !available.length;
    }).catch((error) => {
        console.error("Could not load the existing student directory.", error);
        existingSelect.innerHTML = `<option value="">${t("studentInvite.noExisting")}</option>`;
        existingSelect.disabled = true;
        enhancedSelectRefreshers.get(existingSelect)?.();
        existingStatus.textContent = `${t("toast.studentListError")} ${error.message}`;
        if (mode === "existing") submitButton.disabled = true;
    });
}

async function deleteClass(id) {
    if (!hasPermission("manage_classes_students")) return;
    const item = data.classes.find((current) => current.id === id);
    if (!item || !window.confirm(t("confirm.deleteClass", { name: item.name }))) return;
    const previousData = structuredClone(data);
    data.classes = data.classes.filter((current) => current.id !== id);
    data.lessons = data.lessons.map((lesson) => ({ ...lesson, classIds: lessonClassIds(lesson).filter((classId) => classId !== id) }));
    if (!await persistWorkspaceChange(previousData)) return;
    showToast(t("toast.classDeleted"));
}

function openLessonEditor(item, sectionId = "", activityIndex = -1, tab = "lesson") {
    if (!hasPermission("edit_lessons")) return;
    stopLiveProgressSubscription();
    const recoveredDraft = item ? null : loadNewLessonDraft();
    activeView = "lessons";
    document.getElementById("breadcrumb").textContent = t("page.lessons");
    document.querySelectorAll(".nav-item").forEach((button) => button.classList.toggle("active", button.dataset.view === "lessons"));
    editingLessonId = item?.id || null;
    workspaceLessonId = item?.id || "";
    lessonWorkspaceMode = "edit";
    editorReturnToPreview = false;
    previewActivityEdit = null;
    lessonFormDraft = {
        title: item?.title || recoveredDraft?.title || "",
        unit: item?.unit || recoveredDraft?.unit || selectedLessonUnit || inferLessonUnit(item || { title: "", classIds: [] })
    };
    draftSections = item
        ? structuredClone(normalizeLessonSections(item))
        : recoveredDraft?.sections || [{ id: crypto.randomUUID(), title: lessonSectionText("intro"), activities: [] }];
    const homeworkSections = item ? normalizeHomeworkSections(item) : recoveredDraft?.homeworkSections || [];
    draftHomeworkSections = homeworkSections.length
        ? structuredClone(homeworkSections)
        : [{ id: crypto.randomUUID(), title: lessonSectionText("homework"), activities: [] }];
    ensureActivityBlockIds([...draftSections, ...draftHomeworkSections]);
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
    } else scrollToFirstWorkspaceActivity();
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
            scrollToFirstWorkspaceActivity();
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
    const copy = cloneActivityBlock(activity);
    section.activities.push(copy);
    expandedActivityBlocks.add(copy);
    scheduleLessonDraftAutosave();
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

function activityProgressKey(activity, index) {
    const id = typeof activity?.id === "string" ? activity.id : "";
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)
        ? `b${id}`
        : `a${index}`;
}

function legacyActivityProgressKey(activity, index) {
    const id = typeof activity?.id === "string" ? activity.id : "";
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) return `a${index}`;
    return Number.isInteger(activity.legacyProgressIndex) && activity.legacyProgressIndex >= 0
        ? `a${activity.legacyProgressIndex}`
        : null;
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
    if (response && typeof response === "object" && !Array.isArray(response)) {
        const text = String(response.text || "").trim();
        const attachments = Array.isArray(response.attachments)
            ? response.attachments.filter((item) => typeof item === "string" && item.trim()).map((item) => item.trim())
            : [];
        return [text, ...attachments.map((url) => `↗ ${url}`)].filter(Boolean).join("\n");
    }
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
    if (activity.type === "find-error") {
        try {
            const submitted = JSON.parse(value);
            const wordIndex = Number(submitted.index);
            const word = String(activity.content || "").match(/\S+/g)?.[wordIndex];
            return word ? `${word} → ${String(submitted.correction || "")}` : value;
        } catch {
            return value;
        }
    }
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
        const progressIndex = progressIndexes.get(`${section.id}:${activityIndex}`);
        if (progressIndex === undefined) return;
        const questionEntries = Array.isArray(activity.questions) && activity.questions.length
            ? activity.questions.map((question, questionIndex) => ({
                questionId: activityQuestionProgressId(question, questionIndex, activity.questions),
                questionIndex
            }))
            : [{ questionId: null, questionIndex: null }];
        questionEntries.forEach(({ questionId, questionIndex }) => {
            total += 1;
            const key = questionId
                ? `${activityProgressKey(activity, progressIndex)}.q${questionId}`
                : activityProgressKey(activity, progressIndex);
            const legacyKey = legacyActivityProgressKey(activity, progressIndex);
            const answer = answers[key]
                || (questionId && legacyKey ? answers[`${legacyKey}.q${questionId}`] : null)
                || ((questionIndex === 0 || !questionId) && legacyKey ? answers[legacyKey] : null);
            const response = answer?.response;
            const hasResponse = Array.isArray(response)
                ? response.some((item) => typeof item === "string" && item.trim())
                : typeof response === "string" && Boolean(response.trim());
            if (hasResponse) answered += 1;
        });
    }));
    return { answered, total };
}

function renderLiveAnswerPanel(student, activity, progressIndex, questionId = null, questionIndex = null, reviewContext = null) {
    const answerKey = questionId
        ? `${activityProgressKey(activity, progressIndex)}.q${questionId}`
        : activityProgressKey(activity, progressIndex);
    const studentAnswers = student ? liveProgressRows.get(student.id)?.answers || {} : {};
    const legacyKey = legacyActivityProgressKey(activity, progressIndex);
    const answer = studentAnswers[answerKey]
        || (questionId && legacyKey ? studentAnswers[`${legacyKey}.q${questionId}`] : null)
        || ((questionIndex === 0 || !questionId) && legacyKey ? studentAnswers[legacyKey] : null);
    const recordingPath = activity.type === "pronunciation-recording"
        && typeof answer?.response === "string"
        && /^[0-9a-f-]{36}\/[0-9a-f-]{36}\/[0-9a-f-]{36}\/[0-9a-f-]{36}\.(webm|ogg|mp4|wav)$/i.test(answer.response)
        ? answer.response
        : "";
    const response = recordingPath ? liveStudentText("recording") : formatLiveResponse(activity, answer?.response);
    const answerStatus = answer
        ? `<span class="live-answer-status ${answer.draft ? "is-draft" : "is-submitted"}">${answer.draft ? lessonSectionText("liveDraft") : lessonSectionText("liveSubmitted")}</span>`
        : "";
    const name = student?.name ? `${liveStudentText("answer")} · ${student.name}` : lessonSectionText("liveNoStudents");
    const reviewForm = ["open-answer", "pronunciation-recording"].includes(activity.type) && reviewContext?.lessonId && reviewContext?.classId && student?.id && hasPermission("edit_lessons")
        ? `<details class="live-answer-review"><summary>${liveReviewText("title")}</summary>
            <div class="form-field"><label>${liveReviewText("feedback")}</label><textarea data-live-review-feedback rows="2">${escapeHtml(answer?.teacher_feedback || "")}</textarea></div>
            <div class="form-field"><label>${liveReviewText("correction")}</label><textarea data-live-review-correction rows="2">${escapeHtml(answer?.teacher_correction || "")}</textarea></div>
            <div class="form-field"><label>${liveReviewText("score")}</label><input data-live-review-score value="${escapeHtml(answer?.teacher_score || "")}" maxlength="50"></div>
            <button type="button" class="button secondary small" data-save-live-review
                data-review-answer-key="${escapeHtml(answerKey)}"
                data-review-class-id="${escapeHtml(reviewContext.classId)}"
                data-review-lesson-id="${escapeHtml(reviewContext.lessonId)}"
                data-review-student-id="${escapeHtml(student.id)}">${liveReviewText("save")}</button>
        </details>`
        : "";
    const teacherFeedback = answer?.teacher_feedback ? `<small class="live-answer-teacher-feedback">${escapeHtml(answer.teacher_feedback)}</small>` : "";
    return `<div class="live-answer-inline" aria-label="${escapeHtml(name)}"><strong>${escapeHtml(name)}</strong>${answerStatus}<span class="live-answer-response">${escapeHtml(response || lessonSectionText("liveWait"))}</span>${recordingPath ? `<button class="button secondary small" type="button" data-play-recording="${escapeHtml(recordingPath)}">${escapeHtml(liveStudentText("playRecording"))}</button>` : ""}<span data-recording-player></span>${teacherFeedback}${reviewForm}</div>`;
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
    const resetProgressButton = selectedStudent && selectedGroup && hasPermission("edit_lessons")
        ? `<button type="button" class="button secondary small" data-reset-lesson-progress="${escapeHtml(selectedStudent.id)}">${progressResetText("action")}</button>`
        : "";
    return `<section class="live-monitor-bar"><div class="live-monitor-heading"><strong>${lessonSectionText("liveHint")}</strong><p>${selectedGroup ? escapeHtml(selectedGroup.name) : lessonSectionText("liveNoClass")}</p></div>${groupPicker}${studentPicker}${resetProgressButton}<p class="live-monitor-status ${statusClass}" role="status" aria-live="polite">${escapeHtml(statusText)}</p></section>`;
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
    if (!isEditing && lesson && hasPermission("edit_lessons")) {
        ensureActivityBlockIds([...lessonSections, ...homeworkSections]);
    }
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
        ? `<div class="form-field section-name-field"><label for="sectionTitle">${lessonSectionText("rename")}</label><input id="sectionTitle" data-section-title="${escapeHtml(section.id)}" maxlength="80" value="${escapeHtml(section.title)}"></div><div class="builder-heading"><h3>${isHomework ? lessonSectionText("homeworkActivities") : t("lesson.activities")}</h3><span data-lesson-autosave-status role="status" aria-live="polite"></span><button type="button" class="button secondary small" data-action="choose-activity">${t("activity.addBlock")}</button></div><div id="activityBlocks">${renderActivityBlocks(section.activities)}</div>`
        : `<p class="preview-note">${previewText("practice")}</p><div class="lesson-preview-list">${section.activities.length ? section.activities.map((activity, index) => {
            const progressIndex = progressIndexes.get(`${section.id}:${index}`);
            const liveAnswerMarkup = liveGroup && liveAnswerActivityTypes.has(activity.type) && progressIndex !== undefined
                ? Array.isArray(activity.questions) && activity.questions.length
                    ? activity.questions.map((question, questionIndex) => renderLiveAnswerPanel(liveStudent, {
                        type: activity.type,
                        prompt: String(question.prompt || ""),
                        content: String(question.content || ""),
                        answer: String(question.answer || "")
                    }, progressIndex, activityQuestionProgressId(question, questionIndex, activity.questions), questionIndex, {
                        classId: monitorClassId,
                        lessonId: lesson.id
                    }))
                    : renderLiveAnswerPanel(liveStudent, activity, progressIndex, null, null, {
                        classId: monitorClassId,
                        lessonId: lesson.id
                    })
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
            const summary = activitySummary(activity);
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
            <div class="lesson-workspace-heading"><button type="button" class="button back-to-lessons" data-workspace-back ${quickEditActive ? "disabled" : ""}>← ${lessonSectionText("back")}</button>
                ${isEditing ? `<div class="lesson-workspace-fields"><div class="form-field"><label for="lessonTitle">${t("field.lessonTitle")}</label><input id="lessonTitle" name="title" required maxlength="100" value="${escapeHtml(title)}" placeholder="${t("field.exampleLesson")}"></div><div class="form-field"><label for="lessonUnit">${lessonText("unit")}</label><select id="lessonUnit" name="unit" required><option value="">${lessonText("chooseUnit")}</option>${LESSON_UNITS.map((level) => `<option value="${level}" ${unit === level ? "selected" : ""}>${level}</option>`).join("")}</select></div></div>` : `<div><span class="course-hero-kicker">${escapeHtml(lessonClassNames(lesson)) || lessonText("unassigned")} · ${escapeHtml(unit)}</span><h1>${escapeHtml(title)}</h1></div>`}
            </div>
            ${isEditing ? "" : `<div class="lesson-workspace-preview-actions"><span class="lesson-workspace-unit">${escapeHtml(unit)}</span></div>`}
        </header>
        <nav class="lesson-workspace-tabs" role="tablist" aria-label="${lessonSectionText("workspaceMode")}"><button type="button" class="${!isEditing ? "active" : ""}" role="tab" aria-selected="${!isEditing}" data-workspace-mode="preview" ${!lesson || quickEditActive ? "disabled" : ""}>${lessonSectionText("lessonTab")}</button>${hasPermission("edit_lessons") ? `<button type="button" class="${isEditing ? "active" : ""}" role="tab" aria-selected="${isEditing}" data-workspace-mode="edit" ${quickEditActive ? "disabled" : ""}>${lessonSectionText("editorTab")}</button>` : ""}</nav>
        ${previewDraftNotice}
        <div class="lesson-workspace-layout ${liveMonitor ? "has-live-monitor" : ""}">
            ${liveMonitor ? `<aside class="live-monitor-column ${liveMonitorOpen ? "is-expanded" : ""}">
                <button type="button" class="live-monitor-backdrop" data-close-live-monitor aria-label="${lessonSectionText("liveAnswers")}" tabindex="-1" ${liveMonitorOpen ? "" : "hidden"}></button>
                <button type="button" class="live-monitor-toggle" data-toggle-live-monitor aria-expanded="${liveMonitorOpen}"><span aria-hidden="true">☷</span><span>${lessonSectionText("liveAnswers")}</span></button>
                ${liveMonitor}
            </aside>` : ""}
            <main class="lesson-workspace-main"><section class="lesson-workspace-section">
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
    if (isEditing) {
        const lessonForm = pageContent.querySelector("#lessonForm");
        lessonForm.addEventListener("submit", saveLesson);
        lessonForm.addEventListener("input", scheduleLessonDraftAutosave);
        lessonForm.addEventListener("change", scheduleLessonDraftAutosave);
    }
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
    pageContent.querySelector("[data-reset-lesson-progress]")?.addEventListener("click", async (event) => {
        if (!hasPermission("edit_lessons")) return;
        const button = event.currentTarget;
        const studentId = button.dataset.resetLessonProgress;
        if (!lesson || !monitorClassId || !studentId || !window.teacherWorkspaceApi?.resetLessonProgress) {
            showToast(progressResetText("error"));
            return;
        }
        if (!window.confirm(progressResetText("confirm"))) return;
        button.disabled = true;
        try {
            await window.teacherWorkspaceApi.resetLessonProgress(window.supabaseClient, monitorClassId, lesson.id, studentId);
            liveProgressRows.delete(studentId);
            render();
            showToast(progressResetText("success"));
        } catch (error) {
            console.error("Could not reset student lesson progress.", error);
            showToast(`${progressResetText("error")} ${error.message || ""}`);
            if (button.isConnected) button.disabled = false;
        }
    });
    pageContent.querySelectorAll("[data-play-recording]").forEach((button) => button.addEventListener("click", async () => {
        if (!window.supabaseClient?.storage) return;
        button.disabled = true;
        try {
            const { data: signed, error } = await window.supabaseClient.storage
                .from("student-recordings")
                .createSignedUrl(button.dataset.playRecording, 300);
            if (error) throw error;
            if (!signed?.signedUrl) throw new Error("Could not create a secure audio link.");
            const player = document.createElement("audio");
            player.controls = true;
            player.autoplay = true;
            player.src = signed.signedUrl;
            button.closest(".live-answer-inline")?.querySelector("[data-recording-player]")?.replaceChildren(player);
        } catch (error) {
            console.error("Could not open the student's pronunciation recording.", error);
            showToast(`${liveStudentText("recording")} ${error.message || ""}`);
        } finally {
            if (button.isConnected) button.disabled = false;
        }
    }));
    pageContent.querySelectorAll("[data-save-live-review]").forEach((button) => button.addEventListener("click", async () => {
        if (!hasPermission("edit_lessons") || !window.teacherWorkspaceApi?.saveLessonAnswerReview || !window.supabaseClient) return;
        const panel = button.closest(".live-answer-review");
        const answerKey = button.dataset.reviewAnswerKey;
        const classId = button.dataset.reviewClassId;
        const lessonId = button.dataset.reviewLessonId;
        const studentId = button.dataset.reviewStudentId;
        if (!panel || !answerKey || !classId || !lessonId || !studentId) return;
        const feedback = panel.querySelector("[data-live-review-feedback]")?.value || "";
        const correction = panel.querySelector("[data-live-review-correction]")?.value || "";
        const score = panel.querySelector("[data-live-review-score]")?.value || "";
        button.disabled = true;
        try {
            const answers = await window.teacherWorkspaceApi.saveLessonAnswerReview(
                window.supabaseClient,
                classId,
                lessonId,
                studentId,
                answerKey,
                { feedback, correction, score }
            );
            const row = liveProgressRows.get(studentId) || { student_id: studentId, class_id: classId, lesson_id: lessonId, answers: {}, completed_at: null, updated_at: new Date().toISOString() };
            row.answers = answers;
            row.updated_at = new Date().toISOString();
            liveProgressRows.set(studentId, row);
            render();
            showToast(liveReviewText("saved"));
        } catch (error) {
            console.error("Could not save teacher review.", error);
            showToast(`${liveReviewText("save")} · ${error.message || ""}`);
            if (button.isConnected) button.disabled = false;
        }
    }));
    pageContent.querySelector("[data-toggle-live-monitor]")?.addEventListener("click", (event) => {
        liveMonitorOpen = !liveMonitorOpen;
        const column = event.currentTarget.closest(".live-monitor-column");
        column?.classList.toggle("is-expanded", liveMonitorOpen);
        event.currentTarget.setAttribute("aria-expanded", String(liveMonitorOpen));
        column?.querySelector("[data-close-live-monitor]")?.toggleAttribute("hidden", !liveMonitorOpen);
    });
    pageContent.querySelector("[data-close-live-monitor]")?.addEventListener("click", () => {
        liveMonitorOpen = false;
        const column = pageContent.querySelector(".live-monitor-column");
        column?.classList.remove("is-expanded");
        column?.querySelector("[data-toggle-live-monitor]")?.setAttribute("aria-expanded", "false");
        column?.querySelector("[data-close-live-monitor]")?.setAttribute("hidden", "");
    });
    pageContent.querySelectorAll('[data-action="choose-activity"]').forEach((button) => button.addEventListener("click", openActivityPicker));
    pageContent.querySelectorAll("[data-select-section]").forEach((button) => button.addEventListener("click", () => {
        if (previewActivityEdit) return;
        lessonWorkspaceTab = button.dataset.sectionHomework === "true" ? "homework" : "lesson";
        setActiveWorkspaceSectionId(button.dataset.selectSection);
        render();
        scrollToFirstWorkspaceActivity();
    }));
    pageContent.querySelector("[data-add-section]")?.addEventListener("click", () => {
        lessonWorkspaceTab = pageContent.querySelector("[data-add-section]")?.dataset.addSection === "homework" ? "homework" : "lesson";
        const section = { id: crypto.randomUUID(), title: lessonSectionText("newSection"), activities: [] };
        activeDraftSections().push(section);
        setActiveWorkspaceSectionId(section.id);
        scheduleLessonDraftAutosave();
        render();
    });
    pageContent.querySelectorAll("[data-move-section]").forEach((button) => button.addEventListener("click", () => {
        const targetSections = button.dataset.sectionHomework === "true" ? draftHomeworkSections : draftSections;
        const from = targetSections.findIndex((item) => item.id === button.dataset.moveSectionFrom);
        const to = Number(button.dataset.moveSection);
        if (from < 0 || to < 0 || to >= targetSections.length) return;
        [targetSections[from], targetSections[to]] = [targetSections[to], targetSections[from]];
        scheduleLessonDraftAutosave();
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
        scheduleLessonDraftAutosave();
        render();
    }));
    pageContent.querySelectorAll("[data-section-step]").forEach((button) => button.addEventListener("click", () => {
        if (previewActivityEdit) return;
        const next = sections.indexOf(section) + Number(button.dataset.sectionStep);
        if (sections[next]) {
            setActiveWorkspaceSectionId(sections[next].id);
            render();
            scrollToFirstWorkspaceActivity();
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
        const copy = cloneActivityBlock(currentSection.activities[currentSection.activities.length - 1]);
        currentSection.activities.push(copy);
        expandedActivityBlocks.add(copy);
        scheduleLessonDraftAutosave();
        render();
    });
    enhanceSelects(pageContent);
    if (isHomework) bindHomeworkCopySource();
    if (isEditing) bindActivityBlockActions();
    else bindLessonPreviewActions(pageContent);
}

function scrollToFirstWorkspaceActivity() {
    window.requestAnimationFrame(() => {
        const activity = pageContent.querySelector("#activityBlocks > .builder-block, .lesson-preview-list > :first-child");
        const target = activity || pageContent.querySelector(".lesson-workspace-section");
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
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
        const hasQuestions = Array.isArray(block.questions) && block.questions.length > 0;
        const summary = activitySummary(block);
        const meta = activityEditorMeta(block);
        return `<article class="builder-block ${isExpanded ? "is-expanded" : ""}" data-block-index="${index}">
            <header class="builder-block-header">
                <button type="button" class="builder-block-drag" aria-label="${lessonSectionText("moveBlock")}" title="${lessonSectionText("moveBlock")}">⠿</button>
                <div class="builder-block-title"><strong>${index + 1}. ${escapeHtml(type ? t(type.nameKey) : t("activity.task"))}</strong>${summary ? `<span class="builder-block-summary">${escapeHtml(summary)}</span>` : ""}<span class="builder-block-summary">${escapeHtml(meta)}</span></div>
                <div class="builder-block-actions">
                    ${duplicateBlockButton("data-duplicate-block", index)}
                    <button type="button" class="mini-action builder-block-edit" data-toggle-block="${index}" aria-expanded="${isExpanded}" aria-label="${isExpanded ? lessonSectionText("done") : lessonSectionText("edit")}" title="${isExpanded ? lessonSectionText("done") : lessonSectionText("edit")}">${isExpanded ? "✓" : "✎"}</button>
                    <button type="button" class="mini-action builder-block-delete" data-remove-block="${index}" aria-label="${lessonSectionText("remove")}" title="${lessonSectionText("remove")}">×</button>
                </div>
            </header>
            <div class="builder-block-fields" ${isExpanded ? "" : "hidden"}>
                <div class="form-field"><label>${hasQuestions ? activityQuestionText("commonPrompt") : t("field.instruction")}</label><input data-field="prompt" value="${escapeHtml(block.prompt || "")}" placeholder="${t("field.instructionExample")}"></div>
                ${hasQuestions
                    ? renderActivityQuestionEditor(block)
                    : `<div class="form-field"><label>${type?.category === "media" ? t("field.mediaContent") : t("field.taskText")} <span class="hint">${escapeHtml(contentHint(block.type))}</span></label>
                    ${block.type === "text" ? richTextToolbar() : ""}
                    <textarea data-field="content" placeholder="${escapeHtml(contentPlaceholder(block.type))}">${escapeHtml(block.content || "")}</textarea>${block.type === "fill-blank" ? `<button type="button" class="button secondary small" data-hide-selected-word>${currentLanguage === "ru" ? "Скрыть выделенное слово" : currentLanguage === "ua" ? "Приховати виділене слово" : "Hide selected word"}</button>` : ""}${block.type === "text" ? `<div class="image-upload-row"><button type="button" class="button secondary small" data-pick-rich-image>${escapeHtml((imageUploadMessages[currentLanguage] || imageUploadMessages.ru).chooseFile)}</button><input type="file" accept="image/png,image/jpeg,image/webp,image/gif" multiple data-rich-image-file hidden></div>` : ""}${block.type === "image" ? `<div class="image-upload-row"><button type="button" class="button secondary small" data-pick-image>${escapeHtml((imageUploadMessages[currentLanguage] || imageUploadMessages.ru).chooseFile)}</button><input type="file" accept="image/png,image/jpeg,image/webp,image/gif" multiple data-image-file hidden></div><small class="hint">${escapeHtml((imageUploadMessages[currentLanguage] || imageUploadMessages.ru).galleryHint)}</small>` : ""}${["audio", "video"].includes(block.type) ? `<div class="image-upload-row"><button type="button" class="button secondary small" data-pick-media>${currentLanguage === "ru" ? "Загрузить файл" : currentLanguage === "ua" ? "Завантажити файл" : "Upload file"}</button><input type="file" accept="${block.type}/*" data-media-file hidden></div><small class="hint">${currentLanguage === "ru" ? "До 50 МБ; поддерживаются MP3/M4A/WAV/OGG/AAC и MP4/WebM/MOV." : currentLanguage === "ua" ? "До 50 МБ; підтримуються MP3/M4A/WAV/OGG/AAC і MP4/WebM/MOV." : "Up to 50 MB; MP3/M4A/WAV/OGG/AAC and MP4/WebM/MOV supported."}</small>` : ""}</div>
                    ${block.type === "text" || block.type === "image" || block.type === "video" || block.type === "audio" ? "" : `<div class="form-field"><label>${t("field.answer")} <span class="hint">${escapeHtml(answerHint(block.type))}</span></label><input data-field="answer" value="${escapeHtml(block.answer || "")}" placeholder="${escapeHtml(answerPlaceholder(block.type))}"></div>`}
                    ${renderActivityQuestionEditor(block)}`}
                        ${activitySettingsField(block)}
            </div>
        </article>`;
    }).join("");
}

function contentHint(type) {
    const hints = { "drag-words": t("hint.drag"), "fill-blank": t("hint.blank"), "multiple-choice": t("hint.options"), "order-items": t("hint.order"), "sentence-order": t("hint.sentences"), match: t("hint.match"), columns: t("hint.columns"), table: t("hint.table"), "one-of-many": t("hint.select"), "true-false": t("hint.trueFalse"), flashcards: t("hint.cards"), text: "[info] / [star] + *italic* **bold** 1. list" };
    const newActivityHints = {
        ua: {
            "pronunciation-recording": "Інструкція, яку учень побачить перед записом.",
            "listening-questions": "Вставте URL аудіо. Питання та варіанти додайте нижче.",
            "find-error": "Введіть речення; виправлення налаштуйте у JSON нижче.",
            "interactive-image": "Вставте URL зображення; координати точок — у JSON нижче.",
            vocabulary: "Слова та переклади додайте у JSON нижче."
        },
        ru: {
            "pronunciation-recording": "Инструкция, которую ученик увидит перед записью.",
            "listening-questions": "Вставьте URL аудио. Вопросы и варианты добавьте ниже.",
            "find-error": "Введите предложение; исправления задаются в JSON ниже.",
            "interactive-image": "Вставьте URL изображения; координаты точек — в JSON ниже.",
            vocabulary: "Слова и переводы добавьте в JSON ниже."
        },
        en: {
            "pronunciation-recording": "Instructions shown to the student before recording.",
            "listening-questions": "Paste the audio URL. Add questions and options below.",
            "find-error": "Enter a sentence; configure corrections in the JSON below.",
            "interactive-image": "Paste the image URL; configure marker coordinates in JSON below.",
            vocabulary: "Add words and translations in the JSON below."
        }
    };
    if (newActivityHints[currentLanguage]?.[type]) return newActivityHints[currentLanguage][type];
    if (type === "flashcards") {
        const delimiterHint = currentLanguage === "ru" ? "лицевая сторона | обратная сторона" : currentLanguage === "ua" ? "лицева сторона | зворот" : "front | back";
        return `${hints.flashcards} · ${delimiterHint} (URL изображений/аудио допустимы)`;
    }
    return hints[type] || "";
}

function richTextToolbar() {
    const labels = {
        ua: { toolbar: "Форматування тексту", style: "Стиль", normal: "Звичайний", heading: "Заголовок", list: "Список", size: "Розмір", align: "Вирівнювання", left: "Ліворуч", center: "По центру", right: "Праворуч", bold: "Жирний", italic: "Курсив", underline: "Підкреслення", strike: "Закреслення", textColor: "Колір тексту", highlight: "Підсвічування", outline: "Обведення", link: "Посилання", image: "Зображення" },
        ru: { toolbar: "Форматирование текста", style: "Стиль", normal: "Обычный", heading: "Заголовок", list: "Список", size: "Размер", align: "Выравнивание", left: "Слева", center: "По центру", right: "Справа", bold: "Жирный", italic: "Курсив", underline: "Подчёркивание", strike: "Зачёркивание", textColor: "Цвет текста", highlight: "Подсветка", outline: "Обводка", link: "Ссылка", image: "Изображение" },
        en: { toolbar: "Text formatting", style: "Style", normal: "Normal", heading: "Heading", list: "List", size: "Size", align: "Alignment", left: "Left", center: "Center", right: "Right", bold: "Bold", italic: "Italic", underline: "Underline", strike: "Strikethrough", textColor: "Text color", highlight: "Highlight", outline: "Outline", link: "Link", image: "Image" }
    };
    const text = labels[currentLanguage] || labels.en;
    const aria = (value) => escapeHtml(value);
    return `<div class="rich-text-toolbar" role="toolbar" aria-label="${aria(text.toolbar)}">
        <select data-rich-style aria-label="${aria(text.style)}">
            <option value="">${aria(text.style)}</option><option value="normal">${aria(text.normal)}</option>
            <option value="h1">${aria(text.heading)} 1</option><option value="h2">${aria(text.heading)} 2</option><option value="h3">${aria(text.heading)} 3</option>
            <option value="list">${aria(text.list)}</option>
        </select>
        <button type="button" data-rich-format="**" aria-label="${aria(text.bold)}" title="${aria(text.bold)}"><strong>B</strong></button>
        <button type="button" data-rich-format="*" aria-label="${aria(text.italic)}" title="${aria(text.italic)}"><em>I</em></button>
        <button type="button" data-rich-format="[u]" aria-label="${aria(text.underline)}" title="${aria(text.underline)}"><u>U</u></button>
        <button type="button" data-rich-format="[s]" aria-label="${aria(text.strike)}" title="${aria(text.strike)}"><s>S</s></button>
        <select data-rich-size aria-label="${aria(text.size)}">
            <option value="">${aria(text.size)}</option>${[12, 14, 16, 18, 20, 24, 28, 32, 36].map((size) => `<option value="${size}">${size}px</option>`).join("")}
        </select>
        <input type="color" data-rich-color value="#34724d" aria-label="${aria(text.textColor)}" title="${aria(text.textColor)}">
        <input type="color" data-rich-highlight value="#fff19c" aria-label="${aria(text.highlight)}" title="${aria(text.highlight)}">
        <select data-rich-align aria-label="${aria(text.align)}">
            <option value="">${aria(text.align)}</option><option value="left">${aria(text.left)}</option>
            <option value="center">${aria(text.center)}</option><option value="right">${aria(text.right)}</option>
        </select>
        <button type="button" data-rich-format="[border]" aria-label="${aria(text.outline)}" title="${aria(text.outline)}">▣</button>
        <button type="button" data-rich-format="[текст](https://)" aria-label="${aria(text.link)}" title="${aria(text.link)}">↗</button>
        <button type="button" data-rich-format="![описание](https://)" aria-label="${aria(text.image)}" title="${aria(text.image)}">▧</button>
    </div>`;
}

function contentPlaceholder(type) {
    const examples = {
        ua: { match: "dom = дім\nškola = школа", columns: "Дієслова: ísť\nІменники: dom", "listening-questions": "https://example.com/listening.mp3", "interactive-image": "https://example.com/room.jpg", "find-error": "Ja bývať v Bratislave." },
        ru: { match: "dom = дом\nškola = школа", columns: "Глаголы: ísť\nСуществительные: dom", "listening-questions": "https://example.com/listening.mp3", "interactive-image": "https://example.com/room.jpg", "find-error": "Ja bývať v Bratislave." },
        en: { match: "dom = house\nškola = school", columns: "Verbs: ísť\nNouns: dom", "listening-questions": "https://example.com/listening.mp3", "interactive-image": "https://example.com/room.jpg", "find-error": "Ja bývať v Bratislave." }
    };
    return examples[currentLanguage][type] || ({ "drag-words": "Napríklad: Ja bývam v Bratislave.", "fill-blank": "Ja ___ v Bratislave.", "multiple-choice": "Bratislava\nKošice\nŽilina", "order-items": "1. ráno\n2. popoludní\n3. večer" })[type] || t("field.enterText");
}

function answerHint(type) {
    return ({ "drag-words": t("hint.answerSlash"), "fill-blank": t("hint.answerText"), "multiple-choice": t("hint.answerChoice"), "order-items": t("hint.answerOrder"), "open-answer": t("hint.answerText"), table: t("hint.answerSlash"), match: t("hint.optional"), "one-of-many": t("hint.correctChoice") })[type] || "";
}

function answerPlaceholder(type) {
    return ({ "drag-words": "Ja / bývam / v / Bratislave", "fill-blank": "bývam", "multiple-choice": "Bratislava", "order-items": "1 / 2 / 3", "one-of-many": t("hint.correctChoice"), "true-false": "True / False" })[type] || t("field.answer");
}

function activitySettingsPlaceholder(type) {
    const examples = {
        "drag-words": { distractors: ["navštevujem"], lockedWords: ["Ja"], acceptedOrders: [["Ja", "bývam", "v", "Bratislave"]] },
        "fill-blank": { acceptedAnswers: [["bývam", "žijem"]], hints: ["Sloveso bývať"], wordBank: ["bývam", "som"], caseSensitive: false },
        "multiple-choice": { options: [{ text: "Bratislava", correct: true, explanation: "Je to hlavné mesto." }, { text: "Košice", media: "https://example.com/image.jpg" }], randomizeOptions: true, multipleAnswers: false },
        "one-of-many": { choicesByBlank: [["bývam", "bývaš"], ["v", "na"]], explanations: ["Správny tvar slovesa", "Predložka"] },
        "order-items": { items: [{ text: "ráno", media: "https://example.com/audio.mp3" }, { text: "večer" }], acceptedOrders: [[0, 1]] },
        "sentence-order": { autoSplitSentences: true, groups: [[0, 1]] },
        "true-false": { allowNotStated: true, explanation: "Informácia v texte chýba." },
        table: { hiddenCells: [1], cellOptions: { "0": ["dom", "byt"] }, acceptedAnswers: { "1": ["Bratislava", "BA"] } },
        match: { distractors: ["nesprávna možnosť"] },
        columns: { categories: ["Slovesá", "Podstatné mená"], cards: [{ text: "ísť", category: "Slovesá", media: "https://example.com/picture.jpg" }] },
        "open-answer": { allowAttachments: ["image", "audio"] },
        flashcards: { shuffle: true, cards: [{ front: "Ahoj", back: "https://example.com/audio.mp3" }] },
        audio: { transcript: "Prepis hovoreného textu.", hideTranscript: true },
        video: { transcript: "Video transcript.", hideTranscript: true },
        "listening-questions": { maxPlays: 3, transcript: "Transcript shown after the questions.", transcriptAfterSubmit: true },
        "find-error": { errors: [{ index: 2, correction: "bývam" }] },
        "interactive-image": { hotspots: [{ x: 35, y: 48, word: "dom", translation: "house", audio: "https://example.com/dom.mp3" }] },
        vocabulary: { words: [{ word: "dom", translation: "house", audio: "https://example.com/dom.mp3" }] },
        "pronunciation-recording": { maxSeconds: 60 }
    };
    return JSON.stringify(examples[type] || {}, null, 2);
}

function activitySettingsField(activity, preview = false) {
    const field = preview ? "data-preview-field" : "data-field";
    const settings = activity.settings && typeof activity.settings === "object" && !Array.isArray(activity.settings)
        ? activity.settings
        : {};
    return `<details class="activity-advanced-settings"><summary>${currentLanguage === "ru" ? "Дополнительные параметры" : currentLanguage === "ua" ? "Додаткові параметри" : "Advanced options"}</summary><div class="form-field"><label>${currentLanguage === "ru" ? "Параметры упражнения (JSON)" : currentLanguage === "ua" ? "Параметри вправи (JSON)" : "Exercise settings (JSON)"}</label><textarea ${field}="settings" spellcheck="false" placeholder="${escapeHtml(activitySettingsPlaceholder(activity.type))}">${escapeHtml(JSON.stringify(settings, null, 2))}</textarea><small class="hint">${currentLanguage === "ru" ? "Дополнительно: допустимые ответы, медиа и режим проверки. Оставьте пустым, если не нужно." : currentLanguage === "ua" ? "Додатково: допустимі відповіді, медіа та режим перевірки. Залиште порожнім, якщо не потрібно." : "Optional accepted answers, media, and checking modes. Leave empty if not needed."}</small><small data-settings-error class="hint" role="status"></small></div></details>`;
}

function updateActivitySettings(activity, input) {
    const value = input.value.trim();
    try {
        const parsed = value ? JSON.parse(value) : {};
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Settings must be a JSON object.");
        activity.settings = parsed;
        input.setCustomValidity("");
        const error = input.closest(".form-field")?.querySelector("[data-settings-error]");
        if (error) error.textContent = "";
        return true;
    } catch (error) {
        input.setCustomValidity(error.message || "Invalid JSON settings.");
        const errorLabel = input.closest(".form-field")?.querySelector("[data-settings-error]");
        if (errorLabel) errorLabel.textContent = error.message || "Invalid JSON settings.";
        return false;
    }
}

function bindActivityBlockActions() {
    const currentSection = activeDraftSection();
    if (!currentSection) return;
    const activities = currentSection.activities;
    const blocksContainer = pageContent.querySelector("#activityBlocks");

    pageContent.querySelectorAll("[data-duplicate-block]").forEach((button) => button.addEventListener("click", () => {
        const index = Number(button.dataset.duplicateBlock);
        if (!activities[index]) return;
        const copy = cloneActivityBlock(activities[index]);
        activities.splice(index + 1, 0, copy);
        expandedActivityBlocks.add(copy);
        scheduleLessonDraftAutosave();
        render();
        showToast(lessonSectionText("duplicated"));
    }));
    pageContent.querySelectorAll("[data-remove-block]").forEach((button) => button.addEventListener("click", () => {
        activities.splice(Number(button.dataset.removeBlock), 1);
        scheduleLessonDraftAutosave();
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
    pageContent.querySelectorAll("[data-add-question]").forEach((button) => button.addEventListener("click", () => {
        const blockElement = button.closest(".builder-block");
        const blockIndex = Number(blockElement?.dataset.blockIndex);
        const block = activities[blockIndex];
        if (!block) return;
        const questionIndex = addActivityQuestion(block);
        if (questionIndex < 0) return;
        expandedActivityBlocks.add(block);
        scheduleLessonDraftAutosave();
        render();
        pageContent.querySelector(`.builder-block[data-block-index="${blockIndex}"] [data-question-index="${questionIndex}"] [data-field="content"]`)?.focus();
    }));
    pageContent.querySelectorAll("[data-remove-question]").forEach((button) => button.addEventListener("click", () => {
        const blockElement = button.closest(".builder-block");
        const block = activities[Number(blockElement?.dataset.blockIndex)];
        const questionIndex = Number(button.closest("[data-question-index]")?.dataset.questionIndex);
        if (!block || !Array.isArray(block.questions) || block.questions.length <= 1) return;
        block.questions.splice(questionIndex, 1);
        scheduleLessonDraftAutosave();
        render();
    }));
    pageContent.querySelectorAll(".builder-block").forEach((blockElement) => {
        blockElement.querySelectorAll("[data-field]").forEach((input) => input.addEventListener("input", () => {
            const block = activeDraftSection().activities[Number(blockElement.dataset.blockIndex)];
            const questionElement = input.closest("[data-question-index]");
            if (questionElement && Array.isArray(block.questions)) {
                const question = block.questions[Number(questionElement.dataset.questionIndex)];
                if (question) {
                    question[input.dataset.field] = input.value;
                    scheduleLessonDraftAutosave();
                }
            } else if (input.dataset.field === "settings") {
                if (updateActivitySettings(block, input)) scheduleLessonDraftAutosave();
            } else {
                block[input.dataset.field] = input.value;
                scheduleLessonDraftAutosave();
            }
        }));
        const currentBlock = () => activeDraftSection().activities[Number(blockElement.dataset.blockIndex)];
        const contentField = blockElement.querySelector(':scope > .builder-block-fields > .form-field > textarea[data-field="content"]');
        const applyRichFormat = (prefix, suffix = "", linePrefix = false) => {
            if (!contentField) return;
            const start = contentField.selectionStart;
            const end = contentField.selectionEnd;
            const selected = contentField.value.slice(start, end) || (currentLanguage === "ru" ? "текст" : "text");
            const lines = selected.split(/\r?\n/);
            const replacement = lines.map((line) => linePrefix ? `${prefix}${line}` : `${prefix}${line}${suffix}`).join("\n");
            contentField.setRangeText(replacement, start, end, "select");
            contentField.focus();
            contentField.setSelectionRange(start, start + replacement.length);
            currentBlock().content = contentField.value;
            scheduleLessonDraftAutosave();
        };
        blockElement.querySelectorAll("[data-rich-format]").forEach((button) => button.addEventListener("click", () => {
            const textarea = contentField;
            if (!textarea) return;
            const format = button.dataset.richFormat;
            const wrappers = { "[u]": "[/u]", "[s]": "[/s]", "[border]": "[/border]" };
            if (format === "**" || format === "*") applyRichFormat(format, format);
            else if (wrappers[format]) applyRichFormat(format, wrappers[format]);
            else if (format.startsWith("#") || format === "- ") applyRichFormat(format, "", true);
            else {
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const selected = textarea.value.slice(start, end) || (currentLanguage === "ru" ? "текст" : "text");
                const label = selected.trim().replace(/\s+/g, " ").replace(/[\[\]()]/g, "");
                const value = format.startsWith("![") ? `![${label}](https://)` : `[${label}](https://)`;
                textarea.setRangeText(value, start, end, "select");
                textarea.focus();
                currentBlock().content = textarea.value;
                scheduleLessonDraftAutosave();
            }
        }));
        blockElement.querySelector("[data-rich-style]")?.addEventListener("change", (event) => {
            const style = event.currentTarget.value;
            if (!style) return;
            const prefixes = { normal: "", h1: "# ", h2: "## ", h3: "### ", list: "- " };
            const prefix = prefixes[style];
            const start = contentField.selectionStart;
            const end = contentField.selectionEnd;
            const selected = contentField.value.slice(start, end) || (currentLanguage === "ru" ? "текст" : "text");
            const lines = selected.split(/\r?\n/).map((line) => line.replace(/^#{1,3}\s+/, ""));
            const replacement = lines.map((line) => `${prefix}${line}`).join("\n");
            contentField.setRangeText(replacement, start, end, "select");
            contentField.focus();
            currentBlock().content = contentField.value;
            scheduleLessonDraftAutosave();
            event.currentTarget.value = "";
        });
        blockElement.querySelector("[data-rich-size]")?.addEventListener("change", (event) => {
            const size = event.currentTarget.value;
            if (/^(12|14|16|18|20|24|28|32|36)$/.test(size)) applyRichFormat(`[size=${size}]`, "[/size]");
            event.currentTarget.value = "";
        });
        blockElement.querySelector("[data-rich-color]")?.addEventListener("change", (event) => {
            const color = event.currentTarget.value;
            if (/^#[\da-f]{6}$/i.test(color)) applyRichFormat(`[color=${color}]`, "[/color]");
        });
        blockElement.querySelector("[data-rich-highlight]")?.addEventListener("change", (event) => {
            const color = event.currentTarget.value;
            if (/^#[\da-f]{6}$/i.test(color)) applyRichFormat(`[highlight=${color}]`, "[/highlight]");
        });
        blockElement.querySelector("[data-rich-align]")?.addEventListener("change", (event) => {
            const align = event.currentTarget.value;
            if (/^(left|center|right)$/.test(align)) applyRichFormat(`[align=${align}]`, "[/align]", false);
            event.currentTarget.value = "";
        });
        blockElement.querySelector("[data-hide-selected-word]")?.addEventListener("click", () => {
            if (!contentField) return;
            const start = contentField.selectionStart;
            const end = contentField.selectionEnd;
            const selected = contentField.value.slice(start, end).trim();
            if (!selected || selected.includes("___")) {
                showToast(currentLanguage === "ru" ? "Сначала выделите слово в тексте." : "Select a word in the text first.");
                return;
            }
            const blankIndex = (contentField.value.slice(0, start).match(/___/g) || []).length;
            contentField.setRangeText("___", start, end, "select");
            currentBlock().content = contentField.value;
            const answerField = blockElement.querySelector('[data-field="answer"]');
            const answers = String(answerField?.value || currentBlock().answer || "").split(/\s*\/\s*|\r?\n/);
            while (answers.length <= blankIndex) answers.push("");
            if (!answers[blankIndex].trim()) answers[blankIndex] = selected;
            currentBlock().answer = answers.filter(Boolean).join(" / ");
            if (answerField) answerField.value = currentBlock().answer;
            scheduleLessonDraftAutosave();
        });
        const richImageInput = blockElement.querySelector("[data-rich-image-file]");
        blockElement.querySelector("[data-pick-rich-image]")?.addEventListener("click", () => richImageInput?.click());
        richImageInput?.addEventListener("change", async () => {
            const files = [...(richImageInput.files || [])].filter((file) => file.type?.startsWith("image/"));
            richImageInput.value = "";
            if (!files.length || !contentField) return;
            let position = contentField.selectionStart;
            try {
                richImageInput.disabled = true;
                for (const file of files) {
                    const url = await uploadLessonImage(file);
                    const image = `![${file.name.replace(/[\[\]()]/g, "").slice(0, 100) || "Image"}](${url})`;
                    contentField.setRangeText(`${position > 0 && contentField.value[position - 1] !== "\n" ? "\n" : ""}${image}\n`, position, position, "end");
                    position = contentField.selectionStart;
                }
                currentBlock().content = contentField.value;
                scheduleLessonDraftAutosave();
            } catch (error) {
                console.error("Could not upload an inline lesson image.", error);
                showToast(error.message || (currentLanguage === "ru" ? "Не удалось загрузить изображение." : "Could not upload the image."));
            } finally {
                richImageInput.disabled = false;
            }
        });
        const mediaFileInput = blockElement.querySelector("[data-media-file]");
        blockElement.querySelector("[data-pick-media]")?.addEventListener("click", () => mediaFileInput?.click());
        mediaFileInput?.addEventListener("change", async () => {
            const file = mediaFileInput.files?.[0];
            mediaFileInput.value = "";
            if (!file || !contentField) return;
            try {
                mediaFileInput.disabled = true;
                showToast(currentLanguage === "ru" ? "Загружаю медиафайл…" : "Uploading media…");
                const url = await uploadLessonMedia(file);
                contentField.value = url;
                currentBlock().content = url;
                scheduleLessonDraftAutosave();
            } catch (error) {
                console.error("Could not upload lesson media.", error);
                showToast(error.message || (currentLanguage === "ru" ? "Не удалось загрузить медиафайл." : "Could not upload media."));
            } finally {
                mediaFileInput.disabled = false;
            }
        });
        if (contentField && currentBlock()?.type === "image") {
            const imagesFrom = (files) => [...(files || [])].filter((item) => item.type?.startsWith("image/"));
            const skipped = new Set();
            const attachFiles = async (files) => {
                for (const file of files) await attachImageToBlock(file, contentField, currentBlock());
                scheduleLessonDraftAutosave();
            };
            const importAddresses = async () => {
                if (contentField.dataset.importing) return;
                const pending = contentField.value.split(/\r?\n/).map((line) => line.trim())
                    .filter((line) => /^https?:\/\/\S+$/i.test(line) && !ownImageUrlPattern.test(line) && !skipped.has(line));
                if (!pending.length) return;
                contentField.dataset.importing = "true";
                try {
                    for (const address of pending) {
                        currentBlock().content = contentField.value;
                        if (!(await attachImageToBlock(null, contentField, currentBlock(), address))) skipped.add(address);
                    }
                } finally {
                    delete contentField.dataset.importing;
                    scheduleLessonDraftAutosave();
                }
            };
            contentField.addEventListener("paste", () => setTimeout(importAddresses));
            contentField.addEventListener("change", importAddresses);
            const filePicker = blockElement.querySelector("[data-image-file]");
            blockElement.querySelector("[data-pick-image]")?.addEventListener("click", () => filePicker?.click());
            filePicker?.addEventListener("change", () => {
                const files = imagesFrom(filePicker.files);
                filePicker.value = "";
                if (files.length) attachFiles(files);
            });
            contentField.addEventListener("dragover", (event) => {
                if ([...(event.dataTransfer?.types || [])].includes("Files")) event.preventDefault();
            });
            contentField.addEventListener("drop", (event) => {
                const files = imagesFrom(event.dataTransfer?.files);
                if (!files.length) return;
                event.preventDefault();
                attachFiles(files);
            });
        }
    });

    if (blocksContainer) bindSortableActivityCards(blocksContainer, ".builder-block", ".builder-block-drag", "blockIndex", (order) => {
        const reordered = order.map((index) => activities[index]);
        activities.splice(0, activities.length, ...reordered);
        scheduleLessonDraftAutosave();
        render();
    });
}

function openActivityPicker() {
    const categories = [{ id: "all", label: t("picker.all") }, { id: "tests", label: t("picker.tests") }, { id: "media", label: t("picker.media") }, { id: "other", label: t("picker.other") }];
    const choices = activityTypes.filter((item) => (selectedActivityCategory === "all" || item.category === selectedActivityCategory) && `${t(item.nameKey)} ${t(item.descKey)}`.toLowerCase().includes(activitySearch.toLowerCase()));
    openModal(`${modalHeader(t("picker.title"))}
        <div class="block-tabs">${categories.map((category) => `<button class="block-tab ${selectedActivityCategory === category.id ? "active" : ""}" type="button" data-category="${category.id}">${category.label}</button>`).join("")}</div>
        <div class="form-field"><input type="search" id="activitySearch" value="${escapeHtml(activitySearch)}" placeholder="${t("picker.search")}" aria-label="${t("picker.search")}"></div>
        <div class="activity-grid">${choices.map((choice) => `<button type="button" class="activity-choice activity-choice-${choice.category}" data-add-activity="${choice.id}" aria-label="${escapeHtml(`${t(choice.nameKey)}. ${t(choice.descKey)}`)}">
            <span class="activity-illustration">${activityIllustration(choice.id)}</span>
            <span class="activity-choice-copy"><strong>${escapeHtml(t(choice.nameKey))}</strong><small>${escapeHtml(t(choice.descKey))}</small></span>
        </button>`).join("") || emptyMessage(t("empty.search"), t("empty.changeSearch"))}</div>
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
        const activity = { id: crypto.randomUUID(), type: type.id, prompt: t(type.nameKey), content: "", answer: "" };
        activeDraftSection().activities.push(activity);
        expandedActivityBlocks.add(activity);
        scheduleLessonDraftAutosave();
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

function activityIllustration(type) {
    const visuals = {
        "drag-words": '<rect x="12" y="17" width="28" height="13" rx="4" fill="#dff1e4"/><rect x="45" y="17" width="24" height="13" rx="4" fill="#ebe8ff"/><rect x="73" y="17" width="19" height="13" rx="4" fill="#fff0d9"/><path d="M29 40h37" stroke="#8c84dc" stroke-width="2" stroke-linecap="round"/><path d="m61 36 5 4-5 4" stroke="#8c84dc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="m77 43 4-9 6 6-4 1-2 4z" fill="#7069ca"/>',
        "fill-blank": '<path d="M18 20h62M18 31h36" stroke="#b5b7d8" stroke-width="4" stroke-linecap="round"/><rect x="57" y="25" width="26" height="13" rx="4" fill="#fff" stroke="#8a82d8" stroke-width="2"/><path d="M25 47h54" stroke="#d4d5e8" stroke-width="4" stroke-linecap="round"/><path d="M69 47v8" stroke="#7069ca" stroke-width="2" stroke-linecap="round"/>',
        "multiple-choice": '<rect x="18" y="15" width="57" height="11" rx="4" fill="#fff" stroke="#d8d9e9"/><rect x="23" y="18" width="6" height="6" rx="2" fill="#8c84dc"/><path d="m24 21 2 2 4-5" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/><path d="M35 21h31" stroke="#a9abc8" stroke-width="3" stroke-linecap="round"/><rect x="18" y="32" width="57" height="11" rx="4" fill="#fff" stroke="#d8d9e9"/><rect x="23" y="35" width="6" height="6" rx="2" fill="#eef0f7" stroke="#c8cadc"/><path d="M35 38h24" stroke="#c1c2d5" stroke-width="3" stroke-linecap="round"/>',
        "order-items": '<circle cx="23" cy="19" r="6" fill="#e5e2ff"/><circle cx="23" cy="35" r="6" fill="#dff1e4"/><circle cx="23" cy="51" r="6" fill="#fff0d9"/><path d="M21 19h4M21 35h4M21 51h4" stroke="#7069ca" stroke-width="1.5"/><rect x="35" y="15" width="48" height="8" rx="4" fill="#fff" stroke="#d8d9e9"/><rect x="35" y="31" width="38" height="8" rx="4" fill="#fff" stroke="#d8d9e9"/><rect x="35" y="47" width="54" height="8" rx="4" fill="#fff" stroke="#d8d9e9"/>',
        "sentence-order": '<rect x="15" y="14" width="68" height="12" rx="4" fill="#e9e7ff"/><path d="M23 20h46" stroke="#8c84dc" stroke-width="3" stroke-linecap="round"/><rect x="23" y="30" width="68" height="12" rx="4" fill="#e3f1e6"/><path d="M31 36h42" stroke="#85b493" stroke-width="3" stroke-linecap="round"/><rect x="11" y="46" width="68" height="12" rx="4" fill="#fff0d9"/><path d="M19 52h47" stroke="#d7b46f" stroke-width="3" stroke-linecap="round"/>',
        "one-of-many": '<rect x="17" y="14" width="67" height="15" rx="5" fill="#fff" stroke="#d8d9e9"/><path d="M25 21h38" stroke="#a4a6c7" stroke-width="3" stroke-linecap="round"/><path d="m72 19 4 4 4-4" fill="none" stroke="#7069ca" stroke-width="2" stroke-linecap="round"/><rect x="37" y="32" width="47" height="24" rx="5" fill="#fff" stroke="#d8d9e9"/><rect x="42" y="36" width="37" height="6" rx="3" fill="#e5e2ff"/><path d="M44 49h27" stroke="#c3c4d8" stroke-width="3" stroke-linecap="round"/>',
        "true-false": '<rect x="15" y="15" width="74" height="34" rx="8" fill="#fff" stroke="#d8d9e9"/><path d="M24 25h49M24 33h36" stroke="#b5b7d8" stroke-width="3" stroke-linecap="round"/><rect x="23" y="42" width="25" height="11" rx="5" fill="#e1f2e5"/><path d="m30 47 3 3 6-6" fill="none" stroke="#4b9a62" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="53" y="42" width="25" height="11" rx="5" fill="#f0edff"/><path d="m63 46 5 5m0-5-5 5" stroke="#827ad4" stroke-width="1.8" stroke-linecap="round"/>',
        "table": '<rect x="17" y="13" width="68" height="44" rx="5" fill="#fff" stroke="#d8d9e9"/><path d="M17 27h68M17 42h68M40 27v30M62 27v30" stroke="#d8d9e9" stroke-width="1.5"/><rect x="44" y="31" width="14" height="7" rx="3" fill="#e5e2ff"/><rect x="20" y="45" width="16" height="8" rx="3" fill="#dff1e4"/><path d="M68 34h11" stroke="#c0c1d6" stroke-width="2.5" stroke-linecap="round"/>',
        "match": '<rect x="14" y="15" width="26" height="12" rx="4" fill="#e5e2ff"/><rect x="65" y="15" width="26" height="12" rx="4" fill="#dff1e4"/><rect x="14" y="40" width="26" height="12" rx="4" fill="#fff0d9"/><rect x="65" y="40" width="26" height="12" rx="4" fill="#e7efff"/><path d="M40 21c20 0 5 20 25 20M40 46c18 0 10-19 25-25" fill="none" stroke="#8c84dc" stroke-width="2" stroke-linecap="round"/><circle cx="40" cy="21" r="2.5" fill="#7069ca"/><circle cx="65" cy="41" r="2.5" fill="#7069ca"/>',
        "columns": '<rect x="15" y="14" width="32" height="42" rx="5" fill="#fff" stroke="#d8d9e9"/><rect x="57" y="14" width="32" height="42" rx="5" fill="#fff" stroke="#d8d9e9"/><rect x="20" y="19" width="22" height="7" rx="3" fill="#e5e2ff"/><rect x="62" y="19" width="22" height="7" rx="3" fill="#dff1e4"/><rect x="21" y="33" width="17" height="8" rx="3" fill="#fff0d9"/><rect x="63" y="43" width="18" height="8" rx="3" fill="#e7efff"/><path d="m43 37 12-9m-5 0h5v5" fill="none" stroke="#8c84dc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
        "open-answer": '<rect x="17" y="13" width="68" height="44" rx="6" fill="#fff" stroke="#d8d9e9"/><path d="M25 23h49M25 32h41M25 41h48M25 50h29" stroke="#c0c1d6" stroke-width="3" stroke-linecap="round"/><path d="m70 47 10-10 4 4-10 10-5 1z" fill="#8c84dc"/><path d="m70 47 4 4" stroke="#fff" stroke-width="1.5"/>',
        "flashcards": '<g transform="rotate(-9 43 35)"><rect x="19" y="14" width="47" height="39" rx="6" fill="#e5e2ff" stroke="#c9c5f0"/><path d="M26 24h27M26 33h19" stroke="#8c84dc" stroke-width="3" stroke-linecap="round"/></g><g transform="rotate(8 62 35)"><rect x="40" y="19" width="39" height="37" rx="6" fill="#fff" stroke="#d8d9e9"/><circle cx="60" cy="31" r="5" fill="#dff1e4"/><path d="M49 45h22" stroke="#aeb0ca" stroke-width="3" stroke-linecap="round"/></g>',
        "text": '<rect x="16" y="13" width="70" height="44" rx="6" fill="#fff" stroke="#d8d9e9"/><rect x="23" y="20" width="35" height="7" rx="3" fill="#8c84dc"/><path d="M23 34h55M23 42h47M23 50h31" stroke="#c0c1d6" stroke-width="3" stroke-linecap="round"/>',
        "video": '<rect x="14" y="13" width="74" height="46" rx="7" fill="#e9e7ff"/><rect x="19" y="18" width="64" height="36" rx="4" fill="#7770cc"/><circle cx="51" cy="36" r="11" fill="#fff"/><path d="m48 30 10 6-10 6z" fill="#7770cc"/><path d="M24 49h17" stroke="#c7c3f2" stroke-width="2" stroke-linecap="round"/>',
        "audio": '<rect x="16" y="13" width="70" height="46" rx="8" fill="#f0edff"/><circle cx="34" cy="36" r="10" fill="#7770cc"/><path d="m32 31 7 5-7 5z" fill="#fff"/><path d="M51 36h4m4-7v14m5-19v24m5-14v5m5-11v17m5-13v9" stroke="#8c84dc" stroke-width="3" stroke-linecap="round"/>',
        "image": '<rect x="15" y="13" width="72" height="46" rx="7" fill="#fff" stroke="#d8d9e9"/><circle cx="68" cy="24" r="5" fill="#f4cf7b"/><path d="m20 51 17-17 11 10 10-9 23 16z" fill="#b5dcb9"/><path d="m20 51 17-17 11 10" fill="none" stroke="#78af83" stroke-width="2"/>'
    };
    const brandColors = new Map([
        ["#ebe8ff", "#fff0cc"],
        ["#e5e2ff", "#f8e9bd"],
        ["#e9e7ff", "#fff2d5"],
        ["#f0edff", "#fff4df"],
        ["#c9c5f0", "#e5d4aa"],
        ["#8c84dc", "#bd913b"],
        ["#8a82d8", "#bd913b"],
        ["#7069ca", "#8b651f"],
        ["#827ad4", "#9d752b"],
        ["#7770cc", "#2b6446"],
        ["#e7efff", "#f3ecd9"]
    ]);
    const artwork = (visuals[type] || visuals.text).replace(/#[0-9a-f]{6}/gi, (color) => brandColors.get(color.toLowerCase()) || color);
    return `<svg viewBox="0 0 104 72" focusable="false" aria-hidden="true">${artwork}</svg>`;
}

async function saveLesson(event) {
    event.preventDefault();
    if (!hasPermission("edit_lessons")) return;
    clearTimeout(lessonDraftAutosaveTimer);
    lessonDraftAutosaveTimer = 0;
    lessonDraftAutosaveRevision += 1;
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
    const previousData = structuredClone(data);
    const wasEditing = Boolean(editingLessonId);
    data.lessons = editingLessonId
        ? data.lessons.map((current) => current.id === editingLessonId ? lesson : current)
        : [...data.lessons, lesson];
    const submitButton = formElement.querySelector('[type="submit"]');
    if (submitButton) submitButton.disabled = true;
    if (!await persistWorkspaceChange(previousData)) {
        if (submitButton?.isConnected) submitButton.disabled = false;
        return;
    }
    if (!wasEditing) clearNewLessonDraft();
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
    modalCard.querySelector("#lessonAssignmentForm").addEventListener("submit", async (event) => {
        event.preventDefault();
        const submitButton = event.currentTarget.querySelector('[type="submit"]');
        if (submitButton.disabled) return;
        const form = new FormData(event.currentTarget);
        const classIds = form.getAll("classIds").map(String).filter((classId) => data.classes.some((item) => item.id === classId));
        const previousData = structuredClone(data);
        data.lessons = data.lessons.map((item) => item.id === id ? { ...item, classIds } : item);
        submitButton.disabled = true;
        if (!await persistWorkspaceChange(previousData)) {
            if (submitButton.isConnected) submitButton.disabled = false;
            return;
        }
        closeModal();
        showToast(assignmentText("saved"));
    });
}

async function deleteLesson(id) {
    if (!hasPermission("edit_lessons")) return;
    const lesson = data.lessons.find((item) => item.id === id);
    if (!lesson || !window.confirm(t("confirm.deleteLesson", { name: lesson.title }))) return;
    const previousData = structuredClone(data);
    data.lessons = data.lessons.filter((item) => item.id !== id);
    if (!await persistWorkspaceChange(previousData, [id])) return;
    showToast(t("toast.lessonDeleted"));
}

document.querySelectorAll(".nav-item").forEach((button) => button.addEventListener("click", () => {
    searchQuery = "";
    activeClassFilter = "";
    if (button.dataset.view === "lessons") selectedLessonUnit = "";
    setView(button.dataset.view);
}));
document.getElementById("menuToggle").addEventListener("click", () => {
    const isOpen = document.getElementById("sidebar").classList.toggle("open");
    document.getElementById("sidebarBackdrop").classList.toggle("open", isOpen);
    document.getElementById("menuToggle").setAttribute("aria-expanded", String(isOpen));
});
document.getElementById("sidebarBackdrop").addEventListener("click", () => {
    document.getElementById("sidebar").classList.remove("open");
    document.getElementById("sidebarBackdrop").classList.remove("open");
    document.getElementById("menuToggle").setAttribute("aria-expanded", "false");
});
document.querySelectorAll(".language-button").forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.lang)));
document.getElementById("themeToggle").addEventListener("click", () => setTheme(currentTheme === "dark" ? "light" : "dark"));
document.addEventListener("pointerdown", unlockCalendarSound, { once: true });
document.addEventListener("keydown", unlockCalendarSound, { once: true });
document.addEventListener("visibilitychange", () => {
    if (!document.hidden) updateThemeFromTime();
    scheduleThemeUpdate();
});
window.addEventListener("storage", (event) => {
    if (event.key !== "slovasofiTeacherTheme") return;
    if (event.newValue === "light" || event.newValue === "dark") {
        if (themeUpdateTimer !== null) window.clearTimeout(themeUpdateTimer);
        themeUpdateTimer = null;
        applyTheme(event.newValue);
    } else {
        updateThemeFromTime();
        scheduleThemeUpdate();
    }
});
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
    if (event.key === "Escape" && liveMonitorOpen) {
        liveMonitorOpen = false;
        pageContent.querySelector(".live-monitor-column")?.classList.remove("is-expanded");
        pageContent.querySelector("[data-toggle-live-monitor]")?.setAttribute("aria-expanded", "false");
        pageContent.querySelector("[data-close-live-monitor]")?.setAttribute("hidden", "");
    }
    if (event.key === "Escape" && !modalBackdrop.hidden) closeModal();
    if (event.key === "Escape" && openPopover) closePopover();
});

window.setInterval(() => {
    const welcomeHeading = document.getElementById("welcomeHeading");
    if (activeView === "overview" && !lessonWorkspaceMode && welcomeHeading) {
        welcomeHeading.textContent = profileGreeting(currentUser);
    }
}, 60_000);
calendarReminderTimer = window.setInterval(checkCalendarReminders, 60_000);

translateStaticUI();
syncThemeToggle();
updateThemeFromTime();
scheduleThemeUpdate();
loadCurrentUser().catch((error) => {
    console.error("Failed to load current user:", error);
});

document.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight"].includes(event.key) || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.target.closest("input, textarea, select, [contenteditable]")) return;
    const step = pageContent.querySelector(`[data-section-step="${event.key === "ArrowRight" ? 1 : -1}"]`);
    if (step && !step.disabled) step.click();
});
