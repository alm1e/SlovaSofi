const STORAGE_KEY = "slovasofiTeacherSpace";
const LESSON_UNITS = ["A1", "A2", "B1", "B2"];
const translations = SlovaI18n.locales({
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
});
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
for (const [language, labels] of Object.entries(SlovaI18n.locales({
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
        "activity.vocabularyDesc": "Words and phrases with translations, pronunciation and saved vocabulary."
    }
}))) Object.assign(translations[language], labels);
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

Object.assign(translations.ru, { 'note.title': 'Заметка', 'note.description': 'Подсказка для ученика или личная заметка учителя.' });
Object.assign(translations.ua, { 'note.title': 'Примітка', 'note.description': 'Підказка для учня або особиста примітка викладача.' });
Object.assign(translations.en, { 'note.title': 'Note', 'note.description': 'Student hint or private teacher note.' });
const staffLabels = SlovaI18n.locales({
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
});
const permissionLabels = [
    ["edit_lessons", "editLessons"]
];
const roleLabels = { director: SlovaI18n.locales({ ua: "Директор", ru: "Директор", en: "Director" }), admin: SlovaI18n.locales({ ua: "Адміністратор", ru: "Администратор", en: "Administrator" }) };
const ownerPermissions = Object.fromEntries(permissionLabels.map(([key]) => [key, true]));
let currentLanguage = ["ua", "ru", "en", "sk", "kk"].includes(localStorage.getItem("siteLanguage")) ? localStorage.getItem("siteLanguage") : "ua";
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

const imageUploadMessages = SlovaI18n.locales({
    ua: { uploading: "Завантаження зображення…", done: "Зображення додано.", failed: "Не вдалося завантажити зображення:", login: "Увійдіть у кабінет, щоб завантажувати зображення.", type: "Вставте файл зображення." },
    ru: { uploading: "Загрузка изображения…", done: "Изображение добавлено.", failed: "Не удалось загрузить изображение:", login: "Войдите в кабинет, чтобы загружать изображения.", type: "Вставьте файл изображения." },
    en: { uploading: "Uploading image…", done: "Image added.", failed: "Could not upload the image:", login: "Sign in to upload images.", type: "Paste an image file." }
});

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
imageUploadMessages.ua.blank = "Зображення порожнє або не вдалося прочитати його кольори. Збережіть оригінал як PNG/JPG і завантажте ще раз.";
imageUploadMessages.ru.blank = "Изображение пустое или не удалось прочитать его цвета. Сохраните оригинал как PNG/JPG и загрузите ещё раз.";
imageUploadMessages.en.blank = "The image is blank or its colours could not be read. Save the original as PNG/JPG and upload it again.";
Object.assign(imageUploadMessages.ru, { pasteHint: 'Скопируйте изображение, нажмите здесь и вставьте Ctrl+V (на Mac — ⌘V).', size: 'Изображение должно быть не больше 5 МБ.', decode: 'Не удалось прочитать изображение. Сохраните его как PNG или JPG и попробуйте снова.' });
Object.assign(imageUploadMessages.ua, { pasteHint: 'Скопіюйте зображення, натисніть тут і вставте Ctrl+V (на Mac — ⌘V).', size: 'Зображення має бути не більше 5 МБ.', decode: 'Не вдалося прочитати зображення. Збережіть його як PNG або JPG і спробуйте знову.' });
Object.assign(imageUploadMessages.en, { pasteHint: 'Copy an image, click here and paste with Ctrl+V (⌘V on Mac).', size: 'The image must be no larger than 5 MB.', decode: 'Could not read the image. Save it as PNG or JPG and try again.' });

async function decodeLessonImage(file) {
    if (typeof createImageBitmap === 'function') {
        try { return await createImageBitmap(file); } catch { /* Try the browser's image decoder too. */ }
    }
    return new Promise((resolve, reject) => {
        const image = new Image();
        const url = URL.createObjectURL(file);
        image.onload = () => { URL.revokeObjectURL(url); resolve(image); };
        image.onerror = () => { URL.revokeObjectURL(url); reject(new Error((imageUploadMessages[currentLanguage] || imageUploadMessages.en).decode)); };
        image.src = url;
    });
}

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

async function resizeImageForUpload(file, strict = false, preserveOriginal = false) {
    const mime = window.SlovaImageInput.type(file);
    if (mime && mime !== file.type) file = file.slice(0, file.size, mime);
    if (mime === "image/gif") return file;
    const bitmap = await decodeLessonImage(file);
    try {
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
        let recovered = null;
        try { recovered = await recoverTransparentImage(file); } catch { /* WebGL is optional. */ }
        if (recovered) context.drawImage(recovered, 0, 0, canvas.width, canvas.height);
    }
    if (strict) {
        const final = context.getImageData(0, 0, canvas.width, canvas.height).data;
        let varied = false;
        for (let i = 4; i < final.length; i += 4) {
            if (Math.abs(final[i] - final[0]) > 12 || Math.abs(final[i + 1] - final[1]) > 12 || Math.abs(final[i + 2] - final[2]) > 12) { varied = true; break; }
        }
        if (!varied) {
            const error = new Error("Blank image");
            error.code = "BLANK_IMAGE";
            throw error;
        }
    }
    if (preserveOriginal && visible) return file;
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.88));
    if (!blob || blob.size < 100) throw new Error("Could not read the image");
    return blob;
    } finally {
        bitmap.close?.();
    }
}

async function uploadLessonImage(source, preserveOriginal = false) {
    const messages = imageUploadMessages[currentLanguage] || imageUploadMessages.ru;
    const candidates = (Array.isArray(source) ? source : [source]).filter((file) => window.SlovaImageInput.type(file));
    if (!candidates.length) throw new Error(messages.type);
    if (!currentUser || !window.supabaseClient) throw new Error(messages.login);
    let prepared = null;
    let lastError = null;
    for (const candidate of candidates) {
        try {
            prepared = await resizeImageForUpload(candidate, true, preserveOriginal);
            break;
        } catch (error) {
            lastError = error;
        }
    }
    if (!prepared) {
        if (lastError?.code === "BLANK_IMAGE") throw new Error(messages.blank);
        throw lastError || new Error(messages.type);
    }
    if (prepared.size > 5 * 1024 * 1024) throw new Error(messages.size);
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
        if (position >= 0) {
            lines[position] = url;
            if (block.settings?.imageAnnotations) {
                const source = window.slovaGallery.parse(sourceUrl)[0]?.url;
                const destination = window.slovaGallery.parse(url)[0]?.url;
                const annotations = window.SlovaPhotoAnnotations.read(block.settings.imageAnnotations);
                if (source && destination && source !== destination && annotations[source]) {
                    const { [source]: marks, ...others } = annotations;
                    block.settings = { ...block.settings, imageAnnotations: { ...others, [destination]: marks } };
                }
            }
        } else lines.push(url);
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
    { id: "sentence-order", nameKey: "activity.order", descKey: "activity.orderDesc", icon: "☷", category: "tests" },
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
const activityQuestionLabels = SlovaI18n.locales({
    ua: { item: "Пункт", commonPrompt: "Загальна інструкція", itemPrompt: "Питання або пункт (необов’язково)", add: "＋ Додати пункт", remove: "Видалити пункт", limit: "Можна додати до 100 пунктів" },
    ru: { item: "Пункт", commonPrompt: "Общая инструкция", itemPrompt: "Вопрос или пункт (необязательно)", add: "＋ Добавить пункт", remove: "Удалить пункт", limit: "Можно добавить до 100 пунктов" },
    en: { item: "Item", commonPrompt: "Shared instructions", itemPrompt: "Question or item (optional)", add: "＋ Add item", remove: "Remove item", limit: "Up to 100 items can be added" }
});
const liveAnswerActivityTypes = new Set([
    "drag-words", "fill-blank", "multiple-choice", "one-of-many", "order-items",
    "sentence-order", "true-false", "table", "match", "columns", "open-answer",
    "pronunciation-recording", "listening-questions", "find-error"
]);

function acceptsLiveAnswer(activity, response) {
    return liveAnswerActivityTypes.has(activity.type)
        || Boolean(window.SlovaPhotoAnnotations?.isInteractive(activity))
        || (activity.type === "image" && Boolean(window.SlovaPhotoAnnotations?.hasContent(response)));
}

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
    if (activity.type === "listening-questions" && !activity.questions?.length) {
        activity.questions = [{ id: createActivityQuestionId(), prompt: "", content: "", answer: "" }];
        return 0;
    }
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
    if (activity.type === "true-false") {
        ensureActivityQuestionIds(activity);
        return renderTrueFalseEditor(activity, preview);
    }
    if (["vocabulary", "phrase-list"].includes(activity.type)) return "";
    const questionType=activity.type==="listening-questions"?"multiple-choice":activity.type;
    const questions = Array.isArray(activity.questions) ? activity.questions : [];
    if (activity.type === "text" && !questions.length) return "";
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
        ${questionType === "fill-blank" ? renderFillBlankEditor({...question,type:questionType,settings:activity.settings},fieldAttribute) : `<div class="form-field"><label>${type?.category === "media" ? t("field.mediaContent") : t("field.taskText")} <span class="hint">${escapeHtml(contentHint(questionType))}</span></label><textarea ${fieldAttribute}="content" placeholder="${escapeHtml(contentPlaceholder(questionType))}">${escapeHtml(window.SlovaExerciseFormat.editorContent({...question,type:questionType,settings:activity.settings}))}</textarea></div>`}
        ${hasAnswer ? renderActivityAnswerField({...question,type:questionType,settings:activity.settings},fieldAttribute) : ""}
    </section>`).join("");
    return `<div class="activity-question-editor">${items}<button type="button" class="button secondary small activity-question-add" ${addAttribute} ${questions.length >= MAX_ACTIVITY_QUESTIONS ? "disabled" : ""} title="${activityQuestionText("limit")}">${activityQuestionText("add")}</button></div>`;
}

function renderTrueFalseEditor(activity, preview = false) {
    const text = (SlovaI18n.locales({
        ru: { title: "Утверждения", yes: "Правда", no: "Неправда", choose: "Выберите ответ", statement: "Текст утверждения", add: "＋ Добавить утверждение", remove: "Удалить утверждение", up: "Выше", down: "Ниже", move: "Перетащить утверждение" },
        ua: { title: "Твердження", yes: "Правда", no: "Неправда", choose: "Оберіть відповідь", statement: "Текст твердження", add: "＋ Додати твердження", remove: "Видалити твердження", up: "Вище", down: "Нижче", move: "Перетягнути твердження" },
        en: { title: "Statements", yes: "True", no: "False", choose: "Choose answer", statement: "Statement", add: "＋ Add statement", remove: "Remove statement", up: "Move up", down: "Move down", move: "Drag statement" }
    }))[currentLanguage];
    const grouped = Boolean(activity.questions?.length);
    const rows = grouped ? activity.questions : [activity];
    const field = preview ? grouped ? "data-preview-question-field" : "data-preview-field" : "data-field";
    const indexAttr = preview ? "data-preview-question-index" : "data-question-index";
    return `<div class="tf-editor" data-tf-editor data-tf-preview="${preview}"><strong class="tf-editor-heading">${text.title}</strong><div class="tf-rows">${rows.map((question, index) => {
        const answer = String(question.answer || "").trim();
        const value = /^(true|yes|так|да|правда|0)$/i.test(answer) ? "true" : /^(false|no|ні|нет|неправда|1)$/i.test(answer) ? "false" : answer;
        const contentField = "content";
        return `<div class="tf-row" data-tf-index="${index}" ${grouped ? `${indexAttr}="${index}"` : ""}>
            <span class="tf-drag" data-tf-drag draggable="${grouped}" aria-hidden="true" title="${text.move}">⠿</span>

            <div class="tf-statement"><input ${field}="${contentField}" value="${escapeHtml(window.SlovaExerciseFormat.editorContent({...question,type:"true-false",settings:activity.settings}))}" placeholder="${text.statement}" aria-label="${text.statement} ${index + 1}">${grouped && question.prompt && question.content ? `<small>${escapeHtml(question.prompt)}</small>` : ""}</div>
            <div class="tf-row-actions"><button type="button" data-tf-move="-1" aria-label="${text.up}" title="${text.up}" ${index === 0 ? "disabled" : ""}>↑</button><button type="button" data-tf-move="1" aria-label="${text.down}" title="${text.down}" ${index === rows.length - 1 ? "disabled" : ""}>↓</button><button type="button" ${preview ? "data-preview-remove-question" : "data-remove-question"} aria-label="${text.remove}" title="${text.remove}" ${!grouped || rows.length <= 1 ? "disabled" : ""}>×</button></div>
        </div>`;
    }).join("")}</div><button type="button" class="button secondary tf-add" ${preview ? "data-add-preview-question" : "data-add-question"} ${rows.length >= MAX_ACTIVITY_QUESTIONS ? "disabled" : ""}>${text.add}</button></div>`;
}

function moveTrueFalseQuestion(activity, from, to) {
    if (activity?.type !== "true-false" || !Array.isArray(activity.questions)
        || !Number.isInteger(from) || !Number.isInteger(to) || from < 0 || to < 0
        || from >= activity.questions.length || to >= activity.questions.length || from === to) return false;
    const [question] = activity.questions.splice(from, 1);
    activity.questions.splice(to, 0, question);
    return true;
}

function bindTrueFalseEditors(root) {
    root.querySelectorAll('[data-tf-editor]').forEach(editor => {
        if (editor.dataset.bound) return;
        editor.dataset.bound = 'true';
        const move = (from, to) => {
            const { activity, block, inline } = activityAuthoringContext(editor);
            if (inline && previewActivityEdit.uploads) return;
            if (!moveTrueFalseQuestion(activity, from, to)) return;
            if (inline) renderInlineActivityEditor(block);
            else {
                scheduleLessonDraftAutosave();
                render();
            }
        };
        editor.querySelectorAll('[data-tf-answer]').forEach(select => select.addEventListener('change', () => select.dispatchEvent(new Event('input', { bubbles: true }))));
        editor.querySelectorAll('[data-tf-move]').forEach(button => button.addEventListener('click', () => {
            const from = Number(button.closest('[data-tf-index]').dataset.tfIndex);
            move(from, from + Number(button.dataset.tfMove));
        }));
        let dragged = null;
        editor.addEventListener('dragstart', event => {
            if (!event.target.closest('[data-tf-drag]')) return;
            dragged = Number(event.target.closest('[data-tf-index]').dataset.tfIndex);
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('text/plain', String(dragged));
            event.stopPropagation();
        });
        editor.addEventListener('dragover', event => { if (dragged !== null && event.target.closest('[data-tf-index]')) event.preventDefault(); });
        editor.addEventListener('drop', event => {
            const row = event.target.closest('[data-tf-index]');
            if (dragged === null || !row) return;
            event.preventDefault(); event.stopPropagation();
            const from = dragged; dragged = null; move(from, Number(row.dataset.tfIndex));
        });
        editor.addEventListener('dragend', () => { dragged = null; });
    });
}

function activitySummary(activity) {
    const firstQuestion = Array.isArray(activity.questions) ? activity.questions[0] : null;
    return [activity.prompt || firstQuestion?.prompt, activity.content || firstQuestion?.content]
        .filter((value, index, values) => typeof value === "string" && value.trim() && values.indexOf(value) === index)
        .map((value) => value.trim().replace(/\s+/g, " "))
        .join(" / ");
}

function activityEditorMeta(activity) {
    const labels = SlovaI18n.locales({
        ua: { editing: "Редагування", answer: "Відповідь:" },
        ru: { editing: "Редактирование", answer: "Ответ:" },
        en: { editing: "Editing", answer: "Answer:" }
    });
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
let selectedLessonUnit = typeof savedViewState.unit === "string" ? savedViewState.unit : "";
let activeClassFilter = "";
let classArchiveView = false;
const archivingClassIds = new Set();
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
const teacherPhotoDrafts=new Map();
let activeSelectDropdown = null;
let selectDropdownSequence = 0;
const enhancedSelectRefreshers = new WeakMap();
let toastTimer;
let refreshModal = null;
let workspaceHistory = null;

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
    const labels = SlovaI18n.locales({
        ua: { saving: "Збереження…", saved: "Збережено", error: "Помилка збереження" },
        ru: { saving: "Сохранение…", saved: "Сохранено", error: "Ошибка сохранения" },
        en: { saving: "Saving…", saved: "Saved", error: "Save failed" }
    });
    return labels[currentLanguage]?.[key] || labels.en[key];
}

function setLessonAutosaveStatus(key) {
    const status = pageContent.querySelector("[data-lesson-autosave-status]");
    if (status) {
        const local=!editingLessonId;
        const labels={ru:{saved:local?'Черновик сохранён на этом устройстве':'Сохранено на сервере',error:'Не сохранено — проверьте соединение'},ua:{saved:local?'Чернетку збережено на цьому пристрої':'Збережено на сервері',error:'Не збережено — перевірте з’єднання'},en:{saved:local?'Draft saved on this device':'Saved to server',error:'Not saved — check your connection'}};
        status.textContent=labels[currentLanguage]?.[key]||lessonAutosaveText(key);
        status.dataset.saveState=key;
    }
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
            unit: typeof draft.unit === "string" && draft.unit.trim() && draft.unit.length <= 80 ? draft.unit : "A1",
            sections: draft.sections,
            homeworkSections
        };
    } catch (error) {
        console.error("Could not restore the local lesson draft.", error);
        return null;
    }
}

let lessonImageDraftProtectionQueue = Promise.resolve();
async function protectNewLessonDraftImages(snapshot) {
    if (!currentUser || !window.supabaseClient?.rpc) return;
    const userId=currentUser.id;
    const key=lessonDraftStorageKey()+':image-protection-id';
    let browserDraftId=localStorage.getItem(key);
    if(!browserDraftId){browserDraftId=crypto.randomUUID();localStorage.setItem(key,browserDraftId);}
    const ids=[...new Set([...JSON.stringify(snapshot).matchAll(/[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}\/([0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12})\.(?:png|jpe?g|webp|gif)/gi)].map(match=>match[1].toLowerCase()))];
    // Each browser has its own draft. Serialize writes so a late older request
    // cannot remove the protection of a newer snapshot or another browser.
    const write=lessonImageDraftProtectionQueue.catch(()=>{}).then(async()=>{
        if(currentUser?.id!==userId)return;
        const {error}=await window.supabaseClient.rpc('protect_lesson_image_draft',{draft_key:'new-lesson:'+browserDraftId,image_ids:ids});
        if(error)throw new Error(currentLanguage==='ru'?'Не удалось защитить фото черновика от очистки. Сохраните урок.':'Could not protect draft images. Save the lesson.');
    });
    lessonImageDraftProtectionQueue=write;
    return write;
}

function clearNewLessonDraft() {
    try {
        localStorage.removeItem(lessonDraftStorageKey());
        protectNewLessonDraftImages({}).catch(error=>console.warn(error.message));
    } catch (error) {
        console.error("Could not clear the local lesson draft.", error);
        showToast(t("toast.storageError"));
    }
}

let lessonUndoHistory = null, lessonUndoKey = '', restoringLessonHistory = false;
function lessonEditorSnapshot() {
    return { title: pageContent.querySelector('#lessonTitle')?.value ?? lessonFormDraft.title,
        unit: pageContent.querySelector('#lessonUnit')?.value ?? lessonFormDraft.unit,
        sections: structuredClone(draftSections), homeworkSections: structuredClone(draftHomeworkSections) };
}
function restoreLessonEdit(direction) {
    const value = lessonUndoHistory?.[direction]();
    if (!value) return;
    restoringLessonHistory = true;
    lessonFormDraft = { title: value.title, unit: value.unit };
    draftSections = value.sections; draftHomeworkSections = value.homeworkSections;
    ensureActivityBlockIds([...draftSections, ...draftHomeworkSections]);
    expandedActivityBlocks = new WeakSet([...draftSections,...draftHomeworkSections].flatMap(section=>section.activities));
    render();scheduleLessonDraftAutosave();restoringLessonHistory = false;
}
function syncLessonTools() {
    const editing = lessonWorkspaceMode === 'edit';
    if (editing && window.SlovaLessonTools) {
        const key = editingLessonId || '__new__';
        if (!lessonUndoHistory || lessonUndoKey !== key) { lessonUndoKey = key;lessonUndoHistory=window.SlovaLessonTools.createHistory();lessonUndoHistory.reset(lessonEditorSnapshot()); }
    } else { lessonUndoKey='';lessonUndoHistory=null; }
    window.SlovaLessonTools?.sync({container:pageContent,editing,language:currentLanguage,history:lessonUndoHistory,
        undo:()=>restoreLessonEdit('undo'),redo:()=>restoreLessonEdit('redo'),validate:()=>showLessonReadiness()});
}
function showLessonReadiness() {
    const lesson = lessonWorkspaceMode==='edit' ? lessonEditorSnapshot() : data.lessons.find(item=>item.id===workspaceLessonId);
    if (!lesson) return;
    const sections=[...(lesson.sections||[]),...(lesson.homeworkSections||[])];
    const problems=sections.flatMap(section=>section.activities.flatMap((activity,index)=>(window.SlovaLessonReadiness?.issues?.(activity,currentLanguage)||[]).map(message=>({section:section.id,index,message,label:`${section.title} · ${index+1}`}))));
    const title = currentLanguage==='ru'?'Проверка урока':currentLanguage==='ua'?'Перевірка уроку':'Lesson check';
    openModal(`${modalHeader(title)}${problems.length?`<ul class="lesson-check-list">${problems.map((item,index)=>`<li><button type="button" class="text-link" data-readiness-go="${index}">${escapeHtml(item.label)}</button>: ${escapeHtml(item.message)}</li>`).join('')}</ul>`:`<p>${currentLanguage==='ru'?'Задания заполнены. Урок готов к назначению.':currentLanguage==='ua'?'Завдання заповнено. Урок готовий до призначення.':'Activities are complete. The lesson is ready to assign.'}</p>`}<button type="button" class="button secondary" data-close>${t('modal.close')}</button>`,true);
    modalCard.querySelectorAll('[data-readiness-go]').forEach(button=>button.onclick=()=>{const problem=problems[Number(button.dataset.readinessGo)];closeModal();const homework=(lesson.homeworkSections||[]).some(section=>section.id===problem.section);if(lessonWorkspaceMode==='edit'){lessonWorkspaceTab=homework?'homework':'lesson';setActiveWorkspaceSectionId(problem.section);expandedActivityBlocks.add(activeDraftSection().activities[problem.index]);render();}else openLessonEditor(lesson,problem.section,problem.index,homework?'homework':'lesson');});
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
    if (!restoringLessonHistory) lessonUndoHistory?.record(snapshot);
    const undoButton=pageContent.querySelector('[data-tools-undo]'),redoButton=pageContent.querySelector('[data-tools-redo]');
    if(undoButton)undoButton.disabled=!lessonUndoHistory?.canUndo;
    if(redoButton)redoButton.disabled=!lessonUndoHistory?.canRedo;
    setLessonAutosaveStatus("saving");
    lessonDraftAutosaveTimer = setTimeout(async () => {
        if (!targetLessonId) {
            try {
                localStorage.setItem(lessonDraftStorageKey(), JSON.stringify(snapshot));
                await protectNewLessonDraftImages(snapshot);
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
            unit: lessonCategories().includes(snapshot.unit) ? snapshot.unit : existingLesson.unit,
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
            const workspace = await window.teacherWorkspaceApi.loadWorkspace(
                window.supabaseClient,
                user.id,
                user.email || "",
                (context) => {
                    workspaceAccess = { ...workspaceAccess, ...context };
                    translateStaticUI();
                }
            );
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
            initializeWorkspaceHistory();
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
    const labels = SlovaI18n.locales({
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
    });
    return labels[currentLanguage][key].replace(/\{(\w+)\}/g, (_, name) => String(values[name] ?? ""));
}

function assignmentText(key) {
    const labels = SlovaI18n.locales({
        ua: { add: "＋ Додати до класу", dialog: "Додати урок до класів", hint: "Виберіть один або кілька класів для цього уроку.", save: "Зберегти призначення", saved: "Призначення уроку оновлено." },
        ru: { add: "＋ Добавить в класс", dialog: "Добавить урок в классы", hint: "Выберите один или несколько классов для этого урока.", save: "Сохранить назначение", saved: "Назначение урока обновлено." },
        en: { add: "＋ Assign to class", dialog: "Assign lesson to classes", hint: "Choose one or more classes for this lesson.", save: "Save assignment", saved: "Lesson assignment updated." }
    });
    return labels[currentLanguage][key];
}

function classAssignmentChoices(selectedIds) {
    if (!data.classes.length) return emptyMessage(t("empty.noClasses"), t("empty.createClass"));
    return data.classes.map((group) => `<label class="class-choice"><input type="checkbox" name="classIds" value="${escapeHtml(group.id)}" ${selectedIds.includes(group.id) ? "checked" : ""}><span>${escapeHtml(group.name)}</span></label>`).join("");
}

function countLabel(count, entity) {
    const forms = SlovaI18n.locales({
        ua: { student: ["учень", "учні", "учнів"], activity: ["завдання", "завдання", "завдань"], block: ["блок", "блоки", "блоків"], lesson: ["урок", "уроки", "уроків"] },
        ru: { student: ["ученик", "ученика", "учеников"], activity: ["задание", "задания", "заданий"], block: ["блок", "блока", "блоков"], lesson: ["урок", "урока", "уроков"] },
        en: { student: ["student", "students", "students"], activity: ["activity", "activities", "activities"], block: ["block", "blocks", "blocks"], lesson: ["lesson", "lessons", "lessons"] }
    })[currentLanguage][entity];
    const lastTwo = count % 100;
    if (currentLanguage === "en" || currentLanguage === "kk") return `${count} ${forms[currentLanguage === "kk" || count === 1 ? 0 : 1]}`;
    if (currentLanguage === "sk") return `${count} ${{ student: ["žiak", "žiaci", "žiakov"], activity: ["úloha", "úlohy", "úloh"], block: ["blok", "bloky", "blokov"], lesson: ["lekcia", "lekcie", "lekcií"] }[entity][count === 1 ? 0 : count >= 2 && count <= 4 ? 1 : 2]}`;
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
    if (view === "lessons" && !hasPermission("view_lessons") && !hasPermission("view_assign_lessons") && !hasPermission("edit_lessons")) return;
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
    window.SlovaLessonNavigation?.sync(Boolean(lessonWorkspaceMode));
    try {
        sessionStorage.setItem(viewStateKey, JSON.stringify({ view: activeView, unit: selectedLessonUnit }));
    } catch {
        // Session storage may be unavailable; the view just won't survive a reload.
    }
    document.querySelectorAll(".nav-item").forEach((button) => button.classList.toggle("active", button.dataset.view === activeView));
    if (lessonWorkspaceMode) {
        renderLessonWorkspace();
        syncLessonTools();
        if (lessonWorkspaceMode === "preview") bindInlineActivityActions();
        workspaceHistory?.sync();
        return;
    }
    const renderers = { overview: renderOverview, classes: renderClasses, lessons: renderLessons, calendar: renderCalendar, students: renderStudents, staff: renderStaff };
    pageContent.innerHTML = renderers[activeView]();
    window.SlovaLessonTools?.sync({container:pageContent,language:currentLanguage});
    bindPageActions();
    enhanceSelects(pageContent);
    workspaceHistory?.sync();
}

function initializeWorkspaceHistory() {
    if (workspaceHistory) return;
    const editorDrafts = new Map();
    workspaceHistory = window.SlovaPageHistory.create({
        key: "slovaTeacher",
        read() {
            if (lessonWorkspaceMode === "edit") {
                editorDrafts.set(workspaceLessonId, structuredClone({
                    form: lessonFormDraft, sections: draftSections, homework: draftHomeworkSections
                }));
            }
            return {
                route: { view: activeView, unit: selectedLessonUnit, classId: activeClassFilter, archived: classArchiveView,
                    lessonId: workspaceLessonId, mode: lessonWorkspaceMode, tab: lessonWorkspaceTab,
                    section: activeLessonSectionId, homeworkSection: activeHomeworkSectionId },
                search: searchQuery
            };
        },
        async restore(state) {
            const route = state.route;
            if (!await waitForWorkspaceSave()) throw new Error(t("toast.databaseSaveError"));
            closeModal();
            setView(route.view);
            selectedLessonUnit = route.unit;
            activeClassFilter = route.classId;
            classArchiveView = Boolean(route.archived);
            searchQuery = state.search;
            if (route.mode) {
                const lesson = data.lessons.find((item) => item.id === route.lessonId);
                if (lesson && route.mode === "preview") openLessonPreview(lesson.id);
                else if (route.mode === "edit" && (!route.lessonId || lesson)) {
                    openLessonEditor(lesson);
                    const draft = editorDrafts.get(route.lessonId);
                    if (draft) {
                        lessonFormDraft = structuredClone(draft.form);
                        draftSections = structuredClone(draft.sections);
                        draftHomeworkSections = structuredClone(draft.homework);
                    }
                }
                lessonWorkspaceTab = route.tab;
                activeLessonSectionId = route.section;
                activeHomeworkSectionId = route.homeworkSection;
            }
            render();
        },
        onError(error) {
            console.error("Could not restore workspace navigation.", error);
            showToast(error.message);
        }
    });
    workspaceHistory.sync();
}

function enhanceSelects(root) {
    window.SlovaSelectUI?.enhance(root);
    root.querySelectorAll('select').forEach(select=>enhancedSelectRefreshers.set(select,()=>window.SlovaSelectUI?.enhance(select)));
}

function closeSelectDropdown() {
    if (!activeSelectDropdown) return;
    activeSelectDropdown.classList.remove("open");
    activeSelectDropdown.querySelector(".select-trigger").setAttribute("aria-expanded", "false");
    activeSelectDropdown = null;
}

function lessonSectionText(key) {
    const labels = SlovaI18n.locales({
        ua: { intro: "Вступ", newSection: "Новий розділ", addSection: "＋ Додати розділ", section: "Розділи уроку", rename: "Назва розділу", remove: "Видалити", previous: "← Назад", next: "Далі →", moveUp: "Перемістити вище", moveDown: "Перемістити нижче", moveBlock: "Перетягніть, щоб перемістити блок", duplicate: "Дублювати блок", duplicated: "Блок продубльовано.", addElement: "＋ Додати новий елемент", copyElement: "▣ Копіювати елемент", edit: "Редагувати", done: "Готово", back: "До уроків", save: "Зберегти урок", create: "Створити урок", empty: "У цьому розділі ще немає елементів.", confirmRemove: "Видалити розділ разом з його елементами?", lessonTab: "Урок", editorTab: "Редагування", workspaceMode: "Режим уроку", homework: "Домашня робота", homeworkSections: "Розділи домашньої роботи", homeworkActivities: "Завдання домашньої роботи", currentLesson: "Поточний урок", copyFromLesson: "Копіювати завдання з уроку", dragCopyHint: "Перетягніть або натисніть завдання, щоб скопіювати його сюди.", dropCopyHint: "Перетягніть завдання сюди", noSourceActivities: "У цьому уроці поки немає завдань для копіювання.", liveHint: "Відповіді учнів оновлюються в реальному часі.", liveClass: "Клас", liveConnect: "Підключення до відповідей…", liveReady: "Підключено · відповіді оновлюються", liveOffline: "Увійдіть у кабінет викладача, щоб бачити відповіді в реальному часі.", liveError: "Не вдалося підключитися до відповідей.", liveNoClass: "Урок ще не призначений жодному класу.", liveNoPermission: "У вас немає доступу до відповідей учнів.", liveNoStudents: "У цьому класі поки немає учнів.", liveAnswers: "Відповіді учнів", liveWait: "Поки немає відповіді", liveDraft: "Чернетка", liveSubmitted: "Надіслано", liveUnsaved: "Зміни редактора ще не збережені. Учні бачать останню збережену версію." },
        ru: { intro: "Введение", newSection: "Новый раздел", addSection: "＋ Добавить раздел", section: "Разделы урока", rename: "Название раздела", remove: "Удалить", previous: "← Назад", next: "Далее →", moveUp: "Переместить выше", moveDown: "Переместить ниже", moveBlock: "Перетащите, чтобы переместить задание", duplicate: "Дублировать блок", duplicated: "Блок продублирован.", addElement: "＋ Добавить новый элемент", copyElement: "▣ Копировать элемент", edit: "Редактировать", done: "Готово", back: "К урокам", save: "Сохранить урок", create: "Создать урок", empty: "В этом разделе пока нет элементов.", confirmRemove: "Удалить раздел вместе с его элементами?", lessonTab: "Урок", editorTab: "Редактирование", workspaceMode: "Режим урока", homework: "Домашняя работа", homeworkSections: "Разделы домашней работы", homeworkActivities: "Задания домашней работы", currentLesson: "Текущий урок", copyFromLesson: "Копировать задания из урока", dragCopyHint: "Перетащите или нажмите задание, чтобы скопировать его сюда.", dropCopyHint: "Перетащите задание сюда", noSourceActivities: "В этом уроке пока нет заданий для копирования.", liveHint: "Ответы учеников обновляются в реальном времени.", liveClass: "Класс", liveConnect: "Подключение к ответам…", liveReady: "Подключено · ответы обновляются", liveOffline: "Войдите в кабинет преподавателя, чтобы видеть ответы в реальном времени.", liveError: "Не удалось подключиться к ответам.", liveNoClass: "Урок ещё не назначен ни одному классу.", liveNoPermission: "У вас нет доступа к ответам учеников.", liveNoStudents: "В этом классе пока нет учеников.", liveAnswers: "Ответы учеников", liveWait: "Пока нет ответа", liveDraft: "Черновик", liveSubmitted: "Отправлено", liveUnsaved: "Изменения редактора ещё не сохранены. Ученики видят последнюю сохранённую версию." },
        en: { intro: "Introduction", newSection: "New section", addSection: "＋ Add section", section: "Lesson sections", rename: "Section name", remove: "Delete", previous: "← Back", next: "Next →", moveUp: "Move up", moveDown: "Move down", moveBlock: "Drag to move this activity", duplicate: "Duplicate block", duplicated: "Block duplicated.", addElement: "＋ Add new item", copyElement: "▣ Duplicate item", edit: "Edit", done: "Done", back: "Back to lessons", save: "Save lesson", create: "Create lesson", empty: "This section has no items yet.", confirmRemove: "Delete this section and its items?", lessonTab: "Lesson", editorTab: "Edit", workspaceMode: "Lesson mode", homework: "Homework", homeworkSections: "Homework sections", homeworkActivities: "Homework activities", currentLesson: "Current lesson", copyFromLesson: "Copy activities from a lesson", dragCopyHint: "Drag or click an activity to copy it here.", dropCopyHint: "Drop an activity here", noSourceActivities: "This lesson has no activities to copy yet.", liveHint: "Student answers update in real time.", liveClass: "Class", liveConnect: "Connecting to answers…", liveReady: "Connected · answers update live", liveOffline: "Sign in to the teacher dashboard to see live answers.", liveError: "Could not connect to student answers.", liveNoClass: "This lesson is not assigned to a class yet.", liveNoPermission: "You do not have access to student answers.", liveNoStudents: "There are no students in this class yet.", liveAnswers: "Student answers", liveWait: "No answer yet", liveDraft: "Draft", liveSubmitted: "Submitted", liveUnsaved: "Editor changes are not saved yet. Students see the last saved version." }
    });
    return labels[currentLanguage][key];
}

const liveStudentLabels = SlovaI18n.locales({
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
});

function liveStudentText(key, values = {}) {
    const text = liveStudentLabels[currentLanguage]?.[key] || liveStudentLabels.ru[key];
    return text.replace(/\{(\w+)\}/g, (_, name) => String(values[name] ?? ""));
}

function progressResetText(key, studentName, lessonTitle) {
    const labels = SlovaI18n.locales({
        ua: { action: "Скинути відповіді", confirm: `Видалити всі відповіді учня «${studentName}» за урок «${lessonTitle}»? Цю дію не можна скасувати.`, success: "Відповіді учня скинуто.", error: "Не вдалося скинути відповіді." },
        ru: { action: "Сбросить ответы", confirm: `Удалить все ответы ученика «${studentName}» за урок «${lessonTitle}»? Это действие нельзя отменить.`, success: "Ответы ученика сброшены.", error: "Не удалось сбросить ответы." },
        en: { action: "Reset answers", confirm: `Delete all answers from “${studentName}” for the lesson “${lessonTitle}”? This cannot be undone.`, success: "Student answers were reset.", error: "Could not reset student answers." },
        sk: { action: "Vymazať odpovede", confirm: `Vymazať všetky odpovede žiaka „${studentName}“ v lekcii „${lessonTitle}“? Túto akciu nemožno vrátiť späť.`, success: "Odpovede žiaka boli vymazané.", error: "Odpovede žiaka sa nepodarilo vymazať." },
        kk: { action: "Жауаптарды өшіру", confirm: `«${studentName}» оқушысының «${lessonTitle}» сабағындағы барлық жауаптарын өшіру керек пе? Бұл әрекетті кері қайтару мүмкін емес.`, success: "Оқушының жауаптары өшірілді.", error: "Оқушының жауаптарын өшіру мүмкін болмады." }
    });
    return labels[currentLanguage]?.[key] || labels.en[key];
}

function liveReviewText(key) {
    const labels = SlovaI18n.locales({
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
    });
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
    document.querySelector('meta[name="theme-color"]').content = theme === "dark" ? "#0d1519" : "#f2f7f6";
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
        element.textContent = roleLabels[workspaceAccess.role]?.[currentLanguage] || t("teacher.role");
    });
    document.querySelector('[data-view="classes"]').hidden = !hasPermission("view_classes_students") && !hasPermission("manage_classes_students");
    document.querySelector('[data-view="students"]').hidden = !hasPermission("view_classes_students") && !hasPermission("manage_classes_students");
    document.querySelector('[data-view="lessons"]').hidden = !hasPermission("view_lessons") && !hasPermission("view_assign_lessons") && !hasPermission("edit_lessons");
    document.getElementById("menuToggle").setAttribute("aria-label", t("menu.open"));
    document.title = `SlovaSofi · ${t("pageTitle")}`;
}

function renderOverview() {
    const activeClasses = data.classes.filter(item => !item.archivedAt);
    const studentCount = activeClasses.reduce((total, item) => total + item.students.length, 0);
    const recentLessons = [...data.lessons].slice(-3).reverse();
    const featuredClasses = activeClasses.slice(0, 3);
    const initials = userInitials(currentUser);
    const roleLabel = roleLabels[workspaceAccess.role]?.[currentLanguage] || t("teacher.role");
    return `<section class="profile-hero"><div class="profile-identity"><span class="profile-avatar">${escapeHtml(initials)}</span><div><span class="eyebrow">✦ ${t("welcome.badge")}</span><h1 id="welcomeHeading">${escapeHtml(profileGreeting(currentUser))}</h1><p>${escapeHtml(currentUser?.email || t("profile.notSignedIn"))}</p></div></div><div class="profile-role">${roleLabel}</div></section>
        <div class="profile-welcome"><div><h2>${t("profile.dashboardTitle")}</h2><p>${t("profile.dashboardHint")}</p><span class="storage-note">${t("welcome.storage")}</span></div>${hasPermission("edit_lessons") ? `<button class="button" data-action="new-lesson">${t("action.createLesson")}</button>` : ""}</div>
        <div class="stats-grid profile-stats">
            <article class="stat-card"><span class="stat-icon stat-icon-classes" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3.5" y="4.5" width="17" height="15" rx="2.5"/><path d="M8 4.5v15M8 9h12.5M8 14h12.5"/></svg></span><span>${t("stat.classes")}</span><strong>${activeClasses.length}</strong></article>
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
    return (SlovaI18n.locales({ ua: 'uk-UA', ru: 'ru-RU', en: 'en-US', sk: 'sk-SK', kk: 'kk-KZ' }))[currentLanguage];
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
        ...(["admin", "director"].includes(workspaceAccess.role) ? {} : { filter: `teacher_id=eq.${user.id}` })
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

function homeworkText(key) {
    return window.SlovaHomework?.text(currentLanguage, key) || "Homework";
}

function openClassHomework(classId) {
    const group = data.classes.find(item => item.id === classId);
    if (!group || (!hasPermission("view_classes_students") && !hasPermission("manage_classes_students"))) return;
    window.SlovaHomework.openTeacher({ client: window.supabaseClient, language: currentLanguage,
        classId, className: group.name, openModal, modalCard,
        canAssign: hasPermission("manage_classes_students") && !group.archivedAt,
        canReview: hasPermission("manage_classes_students"),
        lessons: data.lessons.filter(lesson => lessonClassIds(lesson).includes(classId)),
        hasHomework: lesson => normalizeHomeworkSections(lesson).some(section => section.activities?.length),
        openAnswers(lessonId, studentId) {
            closeModal(); activeClassFilter = classId; openLessonPreview(lessonId);
            monitorClassId = classId; selectedLiveStudentId = studentId;
            lessonWorkspaceTab = "homework"; liveMonitorOpen = true; render();
        }
    });
}

function historyText(key) {
    return window.SlovaHistoryUI?.text(currentLanguage, key) || ({audit:"Activity log",versions:"Version history",saveFirst:"Save lesson changes first"})[key];
}

function historyContext() {
    return { api: window.teacherWorkspaceApi, client: window.supabaseClient, language: currentLanguage,
        openModal, modalCard, showToast, canRestore: hasPermission("edit_lessons"),
        async onRestored(lessonId) {
            const workspace = await window.teacherWorkspaceApi.loadWorkspace(window.supabaseClient, currentUser.id, currentUser.email || "");
            data = workspace.data;
            closeModal();
            openLessonPreview(lessonId);
        }
    };
}

function openSchoolAudit(classId = null) {
    if (!hasPermission("view_classes_students") && !hasPermission("edit_lessons")) return;
    if (classId && !data.classes.some(group => group.id === classId)) return;
    window.SlovaHistoryUI.openAudit(historyContext(), classId);
}

async function openLessonHistory(lessonId) {
    if (!data.lessons.some(lesson => lesson.id === lessonId)) return;
    if (lessonWorkspaceMode === "edit" || editorReturnToPreview || previewActivityEdit) {
        showToast(historyText("saveFirst")); return;
    }
    if (!await waitForWorkspaceSave()) return;
    await window.SlovaHistoryUI.openVersions(historyContext(), lessonId);
}

function classArchiveText(key) {
    const labels = SlovaI18n.locales({
        ua: { active: "Активні", archive: "Архів", move: "До архіву", restore: "Відновити", archived: "Клас перенесено до архіву.", restored: "Клас відновлено.", empty: "Архів порожній", hint: "Тут будуть завершені класи. Учні та прогрес зберігаються.", error: "Не вдалося змінити архів класу." },
        ru: { active: "Активные", archive: "Архив", move: "В архив", restore: "Восстановить", archived: "Класс перенесён в архив.", restored: "Класс восстановлен.", empty: "Архив пуст", hint: "Здесь будут завершённые классы. Ученики и прогресс сохраняются.", error: "Не удалось изменить архив класса." },
        en: { active: "Active", archive: "Archive", move: "Archive class", restore: "Restore", archived: "Class archived.", restored: "Class restored.", empty: "Archive is empty", hint: "Completed classes appear here. Students and progress are preserved.", error: "Could not update class archive." }
    });
    return (labels[currentLanguage] || labels.en)[key];
}

async function setClassArchived(id, archived) {
    if (!hasPermission("manage_classes_students") || archivingClassIds.has(id)) return;
    const group = data.classes.find(item => item.id === id);
    if (!group) return;
    archivingClassIds.add(id);
    render();
    try {
        const archivedAt = await window.teacherWorkspaceApi.setClassArchived(window.supabaseClient, id, archived);
        data.classes = data.classes.map(item => item.id === id ? { ...item, archivedAt } : item);
        showToast(classArchiveText(archived ? "archived" : "restored"));
    } catch (error) {
        showToast(`${classArchiveText("error")} ${error.message}`);
    } finally {
        archivingClassIds.delete(id);
        render();
    }
}

function renderClasses() {
    const canManageClasses = hasPermission("manage_classes_students");
    const filtered = data.classes.filter((item) => Boolean(item.archivedAt) === classArchiveView
        && `${item.name} ${item.course}`.toLowerCase().includes(searchQuery.toLowerCase()));
    const teacherName = userDisplayName(currentUser);
    return `<div class="section-heading"><div><h1>${t("classes.title")}</h1><p>${t("classes.description")}</p></div><button type="button" class="button secondary small" data-action="audit-log">${historyText("audit")}</button></div>
        <div class="toolbar class-toolbar" role="group" aria-label="${t("classes.title")}">${[false, true].map(archived => `<button type="button" class="button secondary small" data-action="class-archive-view" data-id="${archived ? "archive" : "active"}" aria-pressed="${classArchiveView === archived}">${classArchiveText(archived ? "archive" : "active")} (${data.classes.filter(item => Boolean(item.archivedAt) === archived).length})</button>`).join("")}</div>
        <div class="toolbar class-toolbar">${canManageClasses ? `<button class="button secondary" data-action="new-class">${t("classes.create")}</button>` : ""}<input type="search" data-search placeholder="${t("classes.search")}" value="${escapeHtml(searchQuery)}" aria-label="${t("classes.search")}"></div>
        <div class="card-grid class-grid">${filtered.length ? filtered.map((item, index) => `<article class="class-card class-card-enhanced class-tone-${index % 4}" data-open-class-id="${escapeHtml(item.id)}">
            ${canManageClasses ? `<div class="card-actions"><button class="mini-action" data-action="edit-class" data-id="${escapeHtml(item.id)}" aria-label="${t("modal.editClass")}">✎</button><button type="button" class="mini-action" data-action="delete-class" data-id="${escapeHtml(item.id)}" aria-label="Удалить класс" title="Удалить класс">×</button></div>` : ""}
            <div class="class-card-top"><span class="class-card-avatar">${escapeHtml(item.name.slice(0, 2).toUpperCase())}</span><span class="class-course-pill">${escapeHtml(formatCourse(item.course))} · ${escapeHtml(classScopeText(item.classScope || "private"))}</span></div><h3><button type="button" class="class-card-title" data-action="class-lessons" data-id="${escapeHtml(item.id)}">${escapeHtml(item.name)}</button></h3>
            <div class="class-teacher-line"><span class="class-person-icon" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><circle cx="12" cy="7" r="4"></circle><path d="M4.5 21v-2a7.5 7.5 0 0 1 15 0v2z"></path></svg></span><span><small>${t("classes.teacherLabel")}</small><strong>${escapeHtml(item.teacherName || teacherName)}</strong>${presenceBadge(item.teacherId)}</span></div>
            <div class="class-roster"><div class="class-roster-heading"><strong>${t("classes.studentsLabel")}</strong><span>${item.students.length}</span></div>
                ${item.students.length ? `<ul class="class-roster-list">${(item.studentRecords?.length ? item.studentRecords.map((student) => ({ name: student.display_name, userId: student.linked_user_id })) : item.students.map((name) => ({ name, userId: null }))).map((student) => `<li><span class="class-student-avatar">${escapeHtml(student.name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toLocaleUpperCase())}</span><span class="class-roster-student-name">${escapeHtml(student.name)}</span>${presenceBadge(student.userId)}</li>`).join("")}</ul>` : `<p class="class-roster-empty">${t("classes.noStudents")}</p>`}
            </div>
            <div class="class-card-meta"><button type="button" class="text-link" data-action="class-homework" data-id="${escapeHtml(item.id)}">${homeworkText("title")}</button><button type="button" class="text-link" data-action="class-audit-log" data-id="${escapeHtml(item.id)}">${historyText("audit")}</button>${hasPermission("view_lessons") || hasPermission("view_assign_lessons") || hasPermission("edit_lessons") ? `<button class="text-link" data-action="class-lessons" data-id="${escapeHtml(item.id)}">${t("classes.lessons")}</button>` : ""}${canManageClasses ? `<button type="button" class="button secondary small" data-action="${item.archivedAt ? "restore-class" : "archive-class"}" data-id="${escapeHtml(item.id)}" ${archivingClassIds.has(item.id) ? "disabled" : ""}>${classArchiveText(item.archivedAt ? "restore" : "move")}</button>` : ""}</div>
            ${canManageClasses && !item.archivedAt ? `<button class="button secondary small class-invite-button" data-action="invite-student" data-id="${escapeHtml(item.id)}">${t("classes.inviteStudent")}</button>` : ""}</article>`).join("") : emptyMessage(classArchiveView && !searchQuery ? classArchiveText("empty") : t("classes.notFound"), classArchiveView && !searchQuery ? classArchiveText("hint") : t("classes.notFoundHint"))}</div>`;
}

// Consistent line icons for lesson actions, independent of the system font.
function lessonActionIcon(action) {
    const paths = {
        preview: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
        edit: '<path d="m15 5 4 4M4 20l4.5-1L20 7.5a2.8 2.8 0 0 0-4-4L4.5 15Z"/><path d="M13 20h7"/>',
        assign: '<circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2M17 5a3 3 0 0 1 0 6M19 14v6m-3-3h6"/>',
        delete: '<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7"/>'
    };
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[action] || paths.preview}</svg>`;
}

function renderLessons() {
    const canEditLessons = hasPermission("edit_lessons");
    const canAssignLessons = hasPermission("view_assign_lessons");
    const selectedClass = data.classes.find(item => item.id === activeClassFilter);
    const filtered = data.lessons.filter((item) => (!activeClassFilter || lessonClassIds(item).includes(activeClassFilter))
        && `${item.title} ${item.unit} ${lessonClassNames(item)}`.toLowerCase().includes(searchQuery.toLowerCase()));
    const classSelect = `<option value="">${t("lessons.allClasses")}</option>${data.classes.map((item) => `<option value="${escapeHtml(item.id)}" ${activeClassFilter === item.id ? "selected" : ""}>${escapeHtml(item.name)}</option>`).join("")}`;
    const rank = data.categoryPresentation?.[selectedLessonUnit]?.lesson_order || [];
    const selectedLevelLessons = filtered.filter((item) => (item.unit || inferLessonUnit(item)) === selectedLessonUnit).sort((a,b) => (rank.includes(a.id)?rank.indexOf(a.id):1e9)-(rank.includes(b.id)?rank.indexOf(b.id):1e9));
    const sectionHeading = selectedLessonUnit
        ? `<div class="lesson-breadcrumb"><button class="text-link" type="button" data-action="back-to-units">${t("lessons.title")}</button><span aria-hidden="true">›</span><strong>${escapeHtml(selectedLessonUnit)}</strong></div>`
        : "";
    const deleteCategoryButton = canEditLessons && selectedLessonUnit && !LESSON_UNITS.includes(selectedLessonUnit.toUpperCase())
        && (data.categories || []).includes(selectedLessonUnit)
        ? `<button class="button secondary" type="button" data-action="delete-category" data-id="${escapeHtml(selectedLessonUnit)}">${categoryText("remove")}</button>` : "";
    return `${sectionHeading}<div class="section-heading"><div><h1>${escapeHtml(selectedClass ? `${selectedClass.name}${selectedLessonUnit ? ` · ${selectedLessonUnit}` : ""}` : selectedLessonUnit || t("lessons.title"))}</h1><p>${escapeHtml(selectedLessonUnit ? lessonText("levelDescription", { level: selectedLessonUnit }) : lessonText("description"))}</p></div><div class="lesson-heading-actions">${selectedClass && canAssignLessons ? `<button class="button" type="button" data-action="add-class-lessons" data-id="${escapeHtml(selectedClass.id)}">${classLessonText("add")}</button>` : ""}${canEditLessons ? `${selectedLessonUnit ? `<button type="button" class="button secondary" data-category-cover="${escapeHtml(selectedLessonUnit)}">Обложка категории</button>` : ""}${deleteCategoryButton}<button class="button secondary" type="button" data-action="new-category">${categoryText("add")}</button><button class="button" data-action="new-lesson">${t("lessons.add")}</button>` : ""}</div></div>
        <div class="toolbar"><select data-class-filter aria-label="${t("lessons.allClasses")}">${classSelect}</select><input type="search" data-search placeholder="${t("lessons.search")}" value="${escapeHtml(searchQuery)}" aria-label="${t("lessons.search")}"></div>
        ${selectedLessonUnit ? `<section class="course-hero course-hero-${LESSON_UNITS.includes(selectedLessonUnit) ? selectedLessonUnit.toLowerCase() : "custom"}"><div class="course-hero-art" aria-hidden="true">${data.categoryPresentation?.[selectedLessonUnit]?.cover_url ? `<img src="${escapeHtml(data.categoryPresentation[selectedLessonUnit].cover_url)}" alt="">` : `<span>${escapeHtml(selectedLessonUnit)}</span>`}</div><div class="course-hero-copy"><span class="course-hero-kicker">${lessonText("courseLabel")}</span><h2>${escapeHtml(selectedLessonUnit)}</h2><p>${escapeHtml(lessonText("levelDescription", { level: selectedLessonUnit }))}</p><span class="course-hero-count">${countLabel(selectedLevelLessons.length, "lesson")}</span></div></section>
            <div class="course-lessons-heading"><h2>${lessonText("levelLessons")}</h2><span>${selectedLevelLessons.length}</span></div>
            <div class="course-lesson-list">${selectedLevelLessons.length ? selectedLevelLessons.map((item) => `<article class="course-lesson-row" data-sort-lesson="${escapeHtml(item.id)}" draggable="${canEditLessons && !searchQuery && !activeClassFilter}">${canEditLessons && !searchQuery && !activeClassFilter ? `<div class="lesson-sort-controls"><span aria-hidden="true" title="Перетащить урок">⠿</span><button type="button" class="mini-action" data-lesson-step="-1" data-id="${escapeHtml(item.id)}" aria-label="Переместить урок выше">↑</button><button type="button" class="mini-action" data-lesson-step="1" data-id="${escapeHtml(item.id)}" aria-label="Переместить урок ниже">↓</button></div>` : ""}${lessonIcon(item)}<div class="lesson-main"><button class="lesson-preview-link" data-action="preview-lesson" data-id="${escapeHtml(item.id)}">${escapeHtml(item.title)}</button><small>${escapeHtml(lessonClassNames(item)) || lessonText("unassigned")} · ${countLabel(lessonActivities(item).length, "activity")}</small></div><div class="course-lesson-actions"><button class="button secondary small" type="button" data-action="lesson-history" data-id="${escapeHtml(item.id)}">${historyText("versions")}</button><button class="mini-action course-action-preview" data-action="preview-lesson" data-id="${escapeHtml(item.id)}" aria-label="${previewText("open")}" title="${previewText("open")}">${lessonActionIcon("preview")}</button>${canEditLessons ? `<button class="mini-action course-action-edit" data-action="edit-lesson" data-id="${escapeHtml(item.id)}" aria-label="${t("modal.editLesson")}" title="${t("modal.editLesson")}">${lessonActionIcon("edit")}</button>` : ""}${canAssignLessons ? `<button class="mini-action course-action-assign" data-action="assign-lesson" data-id="${escapeHtml(item.id)}" aria-label="${assignmentText("add")}" title="${assignmentText("add")}">${lessonActionIcon("assign")}</button>` : ""}${canEditLessons ? `<button class="mini-action course-action-delete" data-action="delete-lesson" data-id="${escapeHtml(item.id)}" aria-label="${t("action.delete")}" title="${t("action.delete")}">${lessonActionIcon("delete")}</button>` : ""}</div></article>`).join("") : emptyMessage(data.lessons.length ? lessonText("noSearch") : t("lessons.notFound"), data.lessons.length ? "" : t("lessons.notFoundHint"))}</div>`
            : `<div class="unit-sections">${lessonCategories().map((unit) => {
                const unitLessons = filtered.filter((item) => (item.unit || inferLessonUnit(item)) === unit);
                return `<button type="button" class="unit-card unit-card-link unit-card-${LESSON_UNITS.includes(unit) ? unit.toLowerCase() : "custom"}" data-unit-open="${escapeHtml(unit)}"><span class="unit-card-mark">${data.categoryPresentation?.[unit]?.cover_url ? `<img src="${escapeHtml(data.categoryPresentation[unit].cover_url)}" alt="" loading="lazy">` : escapeHtml(unit.slice(0,2))}</span><span class="unit-card-copy"><strong>${escapeHtml(unit)}</strong><small>${unitLessons.length ? countLabel(unitLessons.length, "lesson") : lessonText("unitEmpty")}</small></span><span class="unit-card-chevron" aria-hidden="true">→</span></button>`;
            }).join("")}</div>${filtered.length ? "" : emptyMessage(data.lessons.length ? lessonText("noSearch") : t("lessons.notFound"), data.lessons.length ? "" : t("lessons.notFoundHint"))}`}`;
}

let categoryOrderSaving=false;
async function moveCategoryLesson(id,targetId,step=0){
 if(categoryOrderSaving||!hasPermission('edit_lessons'))return;
 const meta=data.categoryPresentation?.[selectedLessonUnit]||{lesson_order:[]};
 const order=Array.from(document.querySelectorAll('[data-sort-lesson]'),row=>row.dataset.sortLesson);
 const from=order.indexOf(id),to=step?from+step:order.indexOf(targetId);if(from<0||to<0||to>=order.length||from===to)return;
 order.splice(to,0,order.splice(from,1)[0]);categoryOrderSaving=true;
 try{const {error}=await window.supabaseClient.rpc('set_category_order',{category_name:selectedLessonUnit,ordered_ids:order,expected_order:meta.lesson_order||[]});if(error)throw error;
 data.categoryPresentation||={};data.categoryPresentation[selectedLessonUnit]={...meta,lesson_order:order};render();
 }catch(error){showToast(error.message);}finally{categoryOrderSaving=false;}
}
function bindCategoryPresentation(){
 pageContent.querySelectorAll('[data-category-cover]').forEach(button=>button.addEventListener('click',()=>{
  const unit=button.dataset.categoryCover;
  openModal(`${modalHeader('Обложка категории')}<form id="categoryCoverForm"><label>Изображение<input type="file" accept="image/png,image/jpeg,image/webp,image/gif" name="cover"></label><div class="modal-actions"><button type="button" class="button secondary" data-close>Отмена</button><button type="button" class="button secondary" data-remove-cover>Убрать обложку</button><button type="submit" class="button">Загрузить</button></div></form>`);
  const form=modalCard.querySelector('form');modalCard.querySelector('[data-close]').onclick=closeModal;
  async function save(remove=false){const file=form.elements.cover.files[0];if(!remove&&!file)return;form.querySelectorAll('button').forEach(b=>b.disabled=true);
   try{const url=remove?'':await uploadLessonImage(file);
    const {error}=await window.supabaseClient.rpc('set_category_cover',{category_name:unit,image_url:url});if(error)throw error;
    data.categoryPresentation||={};data.categoryPresentation[unit]={...data.categoryPresentation[unit],cover_url:url};closeModal();render();
   }catch(error){showToast(error.message);form.querySelectorAll('button').forEach(b=>b.disabled=false);}
  }
  form.onsubmit=e=>{e.preventDefault();save();};form.querySelector('[data-remove-cover]').onclick=()=>save(true);
 }));
 pageContent.querySelectorAll('[data-lesson-step]').forEach(b=>b.onclick=()=>moveCategoryLesson(b.dataset.id,null,Number(b.dataset.lessonStep)));
 let dragging='';pageContent.querySelectorAll('[data-sort-lesson][draggable="true"]').forEach(row=>{
  row.addEventListener('dragstart',e=>{if(e.target.closest('button,input,a')){e.preventDefault();return;}dragging=row.dataset.sortLesson;e.dataTransfer.setData('text/plain',dragging);});
  row.addEventListener('dragover',e=>{if(dragging)e.preventDefault();});row.addEventListener('drop',e=>{e.preventDefault();if(dragging)moveCategoryLesson(dragging,row.dataset.sortLesson);dragging='';});row.addEventListener('dragend',()=>dragging='');
 });
}

function lessonCategories() {
    const names = [...LESSON_UNITS, ...(data.categories || []), ...data.lessons.map((lesson) => lesson.unit), lessonFormDraft.unit];
    const seen = new Set();
    return names.filter((name) => {
        if (typeof name !== "string" || !name.trim()) return false;
        const key = name.toLocaleLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

function categoryText(key) {
    const labels = {
        ru: { add: "+ Категория", title: "Новая категория", name: "Название категории", duplicate: "Такая категория уже существует.", saved: "Категория создана", hint: "Например: Разговорная практика или Подготовка к экзамену." },
        ua: { add: "+ Категорія", title: "Нова категорія", name: "Назва категорії", duplicate: "Така категорія вже існує.", saved: "Категорію створено", hint: "Наприклад: Розмовна практика або Підготовка до іспиту." },
        en: { add: "+ Category", title: "New category", name: "Category name", duplicate: "This category already exists.", saved: "Category created", hint: "For example: Conversation practice or Exam preparation." },
        sk: { add: "+ Kategória", title: "Nová kategória", name: "Názov kategórie", duplicate: "Táto kategória už existuje.", saved: "Kategória bola vytvorená", hint: "Napríklad: Konverzácia alebo Príprava na skúšku." },
        kk: { add: "+ Санат", title: "Жаңа санат", name: "Санат атауы", duplicate: "Бұл санат бар.", saved: "Санат құрылды", hint: "Мысалы: Сөйлесу тәжірибесі немесе Емтиханға дайындық." }
    };
    const deletionLabels = {
        ru: { remove: "Удалить категорию", confirm: "Удалить категорию «{name}»? Это действие нельзя отменить.", notEmpty: "Нельзя удалить категорию, пока в ней есть уроки. Сначала перенесите или удалите их.", deleted: "Категория удалена" },
        ua: { remove: "Видалити категорію", confirm: "Видалити категорію «{name}»? Цю дію неможливо скасувати.", notEmpty: "Не можна видалити категорію, поки в ній є уроки. Спочатку перенесіть або видаліть їх.", deleted: "Категорію видалено" },
        en: { remove: "Delete category", confirm: "Delete category “{name}”? This cannot be undone.", notEmpty: "This category contains lessons. Move or delete them before deleting the category.", deleted: "Category deleted" },
        sk: { remove: "Odstrániť kategóriu", confirm: "Odstrániť kategóriu „{name}“? Túto akciu nemožno vrátiť späť.", notEmpty: "Kategória obsahuje lekcie. Najskôr ich presuňte alebo odstráňte.", deleted: "Kategória bola odstránená" },
        kk: { remove: "Санатты жою", confirm: "«{name}» санатын жою керек пе? Бұл әрекетті қайтару мүмкін емес.", notEmpty: "Санатта сабақтар бар. Алдымен оларды жылжытыңыз немесе жойыңыз.", deleted: "Санат жойылды" }
    };
    return (labels[currentLanguage] || labels.en)[key] || (deletionLabels[currentLanguage] || deletionLabels.en)[key];
}

async function deleteLessonCategory(name) {
    if (!hasPermission("edit_lessons") || LESSON_UNITS.includes(String(name).toUpperCase())
        || !(data.categories || []).includes(name)) return;
    if (data.lessons.some((lesson) => (lesson.unit || inferLessonUnit(lesson)).toLocaleLowerCase() === name.toLocaleLowerCase())) {
        showToast(categoryText("notEmpty"));
        return;
    }
    const button = [...pageContent.querySelectorAll('[data-action="delete-category"]')].find((item) => item.dataset.id === name);
    if (button?.disabled) return;
    if (!window.confirm(categoryText("confirm").replace("{name}", name))) return;
    if (button) button.disabled = true;
    try {
        await window.teacherWorkspaceApi.deleteLessonCategory(window.supabaseClient, name);
        data.categories = data.categories.filter((category) => category.toLocaleLowerCase() !== name.toLocaleLowerCase());
        if (selectedLessonUnit === name) selectedLessonUnit = "";
        if (lessonFormDraft.unit === name) lessonFormDraft.unit = "A1";
        render();
        showToast(categoryText("deleted"));
    } catch (error) {
        console.error("Could not delete lesson category.", error);
        showToast(error.code === "CATEGORY_NOT_EMPTY" ? categoryText("notEmpty") : error.message);
    } finally {
        if (button?.isConnected) button.disabled = false;
    }
}

function openCategoryEditor() {
    if (!hasPermission("edit_lessons")) return;
    openModal(`${modalHeader(categoryText("title"))}<form id="categoryForm"><div class="form-field"><label for="categoryName">${categoryText("name")}</label><input id="categoryName" required maxlength="80" autocomplete="off"><small class="hint">${categoryText("hint")}</small></div><p data-category-error role="alert"></p><div class="modal-actions"><button class="button secondary" type="button" data-close>${t("action.cancel")}</button><button class="button" type="submit">${t("action.save")}</button></div></form>`);
    modalCard.querySelectorAll("[data-close]").forEach((button) => button.addEventListener("click", closeModal));
    const form = modalCard.querySelector("#categoryForm");
    const input = form.querySelector("input");
    input.focus();
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const name = input.value.trim().replace(/\s+/g, " ");
        const errorLabel = form.querySelector("[data-category-error]");
        if (!name || lessonCategories().some((category) => category.toLocaleLowerCase() === name.toLocaleLowerCase())) {
            errorLabel.textContent = categoryText("duplicate");
            return;
        }
        const button = form.querySelector('[type="submit"]');
        button.disabled = true;
        try {
            const saved = await window.teacherWorkspaceApi.createLessonCategory(window.supabaseClient, name);
            data.categories = [...(data.categories || []), saved];
            selectedLessonUnit = saved;
            closeModal();
            render();
            showToast(categoryText("saved"));
        } catch (error) {
            console.error("Could not create lesson category.", error);
            errorLabel.textContent = error.message;
            button.disabled = false;
        }
    });
}
let studentScopeView = "school";
function renderStudents() {
    if (workspaceAccess.role === "director") studentScopeView = "school";
    const canManageClasses = hasPermission("manage_classes_students");
    const memberships = data.classes.flatMap((item) => item.studentRecords?.length
        ? item.studentRecords.map((student) => ({ name: student.display_name, className: item.name, id: student.id, userId: student.linked_user_id }))
        : item.students.map((name, index) => ({ name, className: item.name, id: `${item.id}-${index}`, userId: null })));
    const directory = data.studentDirectory || [];
    const students = directory.filter(p => p.student_scope === studentScopeView).map(p => {
        const rows = memberships.filter(row => row.userId === p.id);
        return {name: rows[0]?.name || p.display_name || "Ученик", className: [...new Set(rows.map(row => row.className))].join(", "), id:p.id, userId:p.id};
    }).concat(studentScopeView === "school" ? memberships.filter(row => !row.userId) : []);
    const filtered = students.filter((student) => `${student.name} ${student.className}`.toLowerCase().includes(searchQuery.toLowerCase()));
    return `<div class="section-heading"><div><h1>${t("students.title")}</h1><p>${t("students.description")}</p></div>${canManageClasses ? `<button class="button secondary" data-view-link="classes">${t("students.manage")}</button>` : ""}</div>
        <div class="toolbar"><span class="hint" style="color:#d7e9dd">${t("students.total", { count: students.length })}</span><input type="search" data-search placeholder="${t("students.search")}" value="${escapeHtml(searchQuery)}" aria-label="${t("students.search")}"></div>
        <div class="toolbar"><button type="button" class="button secondary" data-action="student-scope-view" data-id="school" aria-pressed="${studentScopeView === 'school'}">Ученики SlovaSofi</button>${workspaceAccess.role !== 'director' ? `<button type="button" class="button secondary" data-action="student-scope-view" data-id="private" aria-pressed="${studentScopeView === 'private'}">Личные ученики</button>` : ''}</div>
        <div class="student-list">${filtered.length ? filtered.map((student) => `<div class="student-row"><span class="avatar">${escapeHtml(student.name.split(" ").map((part) => part[0]).join("").slice(0, 2))}</span><div class="student-row-main"><strong>${escapeHtml(student.name)}</strong><small>${t("students.role")}</small>${presenceBadge(student.userId)}</div><span class="class-label">${escapeHtml(student.className || "Без класса")}</span>${workspaceAccess.role === 'admin' && student.userId ? `<button type="button" class="button secondary small" data-action="student-scope-edit" data-id="${escapeHtml(student.userId)}">Принадлежность</button>` : ''}</div>`).join("") : emptyMessage(t("students.notFound"), t("students.notFoundHint"))}</div>`;
}

function openStudentScopeForm(id) {
    if (workspaceAccess.role !== "admin") return;
    const student = data.studentDirectory?.find(p => p.id === id);
    if (!student) return;
    const teachers = new Map(data.classes.map(c => [c.teacherId, c.teacherName]));
    for (const member of workspaceAccess.staff || []) if (["teacher","admin"].includes(member.role)) teachers.set(member.id,member.name || member.email);
    if (currentUser) teachers.set(currentUser.id, userDisplayName(currentUser));
    openModal(`${modalHeader("Принадлежность ученика")}<form id="studentScopeForm"><div class="form-field"><label>Принадлежность<select name="scope"><option value="school">Школа SlovaSofi</option><option value="private">Личный ученик</option></select></label></div><div class="form-field"><label>Преподаватель личного ученика<select name="teacher">${[...teachers].map(([id,name]) => `<option value="${escapeHtml(id)}">${escapeHtml(name)}</option>`).join('')}</select></label></div><p class="hint">Личный ученик доступен администратору и выбранному преподавателю. Сначала переведите его классы в личные или уберите из школьных классов. Удалять ответы не нужно.</p><div class="modal-actions"><button type="button" class="button secondary" data-close>Отмена</button><button type="submit" class="button">Сохранить</button></div></form>`);
    const form = modalCard.querySelector('form');
    form.elements.scope.value = student.student_scope;
    if (student.private_teacher_id) form.elements.teacher.value = student.private_teacher_id;
    const sync = () => { form.elements.teacher.disabled = form.elements.scope.value !== 'private'; };
    form.elements.scope.addEventListener('change',sync); sync();
    modalCard.querySelector('[data-close]').addEventListener('click',closeModal);
    form.addEventListener('submit',async event => {
        event.preventDefault(); const button = form.querySelector('[type="submit"]'); button.disabled = true;
        try {
            const {error} = await window.supabaseClient.rpc('set_student_scope',{target_student:id,target_scope:form.elements.scope.value,target_teacher:form.elements.scope.value === 'private' ? form.elements.teacher.value : null});
            if (error) throw error;
            const workspace = await window.teacherWorkspaceApi.loadWorkspace(window.supabaseClient,currentUser.id); data = workspace.data;
            closeModal(); render(); showToast('Принадлежность ученика сохранена');
        } catch(error) {showToast(error.message); button.disabled=false;}
    });
}

function renderStaff() {
    const members = workspaceAccess.staff || [];
    return `<div class="section-heading"><div><h1>${staffText("title")}</h1><p>${staffText("description")}</p></div><button class="button" data-action="add-teacher">${staffText("add")}</button></div>
        <div class="staff-grid">
            ${members.length ? members.map((member) => `<article class="staff-card"><span class="avatar">${escapeHtml(initialsFor(member.name || member.email))}</span><div class="staff-card-main"><strong>${escapeHtml(member.name || member.email)}</strong>${member.name ? `<small class="staff-card-email">${escapeHtml(member.email)}</small>` : ""}<small>${roleLabels[member.role]?.[currentLanguage] || staffText("memberRole")}</small>${presenceBadge(member.id)}<span class="staff-permissions">${permissionLabels.filter(([key]) => member.permissions?.[key]).map(([, label]) => staffText(label)).join(" · ") || staffText("noEditor")}</span></div>
                ${member.role === "admin" ? "" : `<div class="staff-card-actions"><button type="button" class="button secondary small" data-action="edit-teacher" data-id="${escapeHtml(member.id)}">${staffText("edit")}</button>${member.role === "director" ? "" : `<button type="button" class="mini-action" data-action="remove-teacher" data-id="${escapeHtml(member.id)}" aria-label="${staffText("remove")}" title="${staffText("remove")}">×</button>`}</div>`}</article>`).join("") : emptyMessage(staffText("empty"), staffText("emptyHint"))}
        </div>`;
}

function openTeacherForm(member = null) {
    const initialPermissions = member?.permissions || {};
    const isEditing = Boolean(member);
    const permissionInputs = permissionLabels.map(([key, label]) => `<label class="staff-permission-choice"><input type="checkbox" name="permission_${key}" data-permission-key="${key}" ${initialPermissions[key] ? "checked" : ""}><span>${staffText(label)}</span></label>`).join("");
    openModal(`${modalHeader(staffText(isEditing ? "editTitle" : "inviteTitle"))}
        <form id="teacherInviteForm">
            <div class="form-field"><label for="teacherInviteEmail">${staffText("email")}</label><input id="teacherInviteEmail" name="email" type="email" required maxlength="254" autocomplete="email" value="${escapeHtml(member?.email || "")}" ${isEditing ? "readonly" : ""}></div>
            <div class="form-field"><span class="staff-field-label">${staffText("role")}</span><select name="staffRole"><option value="teacher" ${member?.role !== "director" ? "selected" : ""}>${staffText("teacher")}</option><option value="director" ${member?.role === "director" ? "selected" : ""}>${roleLabels.director[currentLanguage] || roleLabels.director.en}</option></select></div>
            <fieldset class="staff-permission-field"><legend>${staffText("permissions")}</legend>${permissionInputs}</fieldset>
            <div class="modal-actions"><button type="button" class="button secondary" data-close>${staffText("cancel")}</button><button class="button" type="submit">${staffText(isEditing ? "save" : "invite")}</button></div>
        </form>`);
    refreshModal = () => openTeacherForm(member);
    modalCard.querySelectorAll("[data-close]").forEach((button) => button.addEventListener("click", closeModal));
    const staffForm = modalCard.querySelector("#teacherInviteForm");
    const syncRolePermissions = () => {
        const director = staffForm.elements.staffRole.value === "director";
        staffForm.querySelectorAll("[data-permission-key]").forEach((input) => {
            input.disabled = director;
            if (director) input.checked = true;
        });
    };
    staffForm.elements.staffRole.addEventListener("change", syncRolePermissions);
    syncRolePermissions();
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
                permissions,
                role: form.elements.staffRole.value
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
    return `<div class="lesson-row">${lessonIcon(lesson)}<div class="lesson-main"><button class="lesson-preview-link" data-action="preview-lesson" data-id="${escapeHtml(lesson.id)}">${escapeHtml(lesson.title)}</button><small>${escapeHtml(lesson.unit || inferLessonUnit(lesson))} · ${escapeHtml(lessonClassNames(lesson))}</small></div><span class="lesson-count">${countLabel(lessonActivities(lesson).length, "activity")}</span></div>`;
}

const previewLabels = SlovaI18n.locales({
    ua: { open: "Відкрити урок", practice: "Спробуйте виконати завдання. Результати тут не зберігаються.", check: "Перевірити", correct: "Правильно!", incorrect: "Спробуйте ще раз.", noAnswer: "Для цього завдання ще не вказано правильну відповідь.", typeAnswer: "Введіть відповідь", choose: "Виберіть відповідь", drop: "Перетягніть або натисніть слова сюди", bank: "Слова", answer: "Ваше речення", up: "Вище", down: "Нижче", flip: "Перевернути картку", empty: "У цьому уроці поки немає блоків.", imageError: "Не вдалося завантажити зображення.", mediaError: "Перевірте посилання на медіафайл.", readOnly: "Навчальний матеріал", true: "Так", false: "Ні" },
    ru: { open: "Открыть урок", practice: "Попробуйте выполнить задания. Результаты здесь не сохраняются.", check: "Проверить", correct: "Верно!", incorrect: "Попробуйте ещё раз.", noAnswer: "Для этого задания ещё не указан правильный ответ.", typeAnswer: "Введите ответ", choose: "Выберите ответ", drop: "Перетащите или нажмите слова сюда", bank: "Слова", answer: "Ваш ответ", up: "Выше", down: "Ниже", flip: "Перевернуть карточку", empty: "В этом уроке пока нет блоков.", imageError: "Не удалось загрузить изображение.", mediaError: "Проверьте ссылку на медиафайл.", readOnly: "Учебный материал", true: "Да", false: "Нет" },
    en: { open: "Open lesson", practice: "Try the activities. Your results are not saved here.", check: "Check answer", correct: "Correct!", incorrect: "Try again.", noAnswer: "No correct answer has been set for this activity.", typeAnswer: "Type your answer", choose: "Choose an answer", drop: "Drag or click words here", bank: "Words", answer: "Your answer", up: "Move up", down: "Move down", flip: "Flip card", empty: "This lesson has no activities yet.", imageError: "The image could not be loaded.", mediaError: "Check the media link.", readOnly: "Learning material", true: "True", false: "False" }
});
const previewGroupCheckLabels = SlovaI18n.locales({ ua: "Перевірити відповіді", ru: "Проверить ответы", en: "Check answers" });

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

function renderPreviewActivity(activity, index, canEdit = false, quickEditing = false, liveAnswerMarkup = "", questionIndex = null, builder = false) {
    if (quickEditing) return renderActivityBlock(activity, index, true, true);
    activity=window.SlovaExerciseFormat.prepare(activity);
    const type = activity.type;
    const isQuestion = Number.isInteger(questionIndex);
    const prompt = escapeHtml(activity.prompt || (isQuestion
        ? `${activityQuestionText("item")} ${questionIndex + 1}`
        : t(activityTypes.find((item) => item.id === type)?.nameKey || "activity.task")));
    const content = String(activity.content || "");
    const contentMatchesPrompt = Boolean(activity.prompt?.trim())
        && content.trim().replace(/\s+/g, " ").toLocaleLowerCase() === activity.prompt.trim().replace(/\s+/g, " ").toLocaleLowerCase();
    const displayContent = contentMatchesPrompt ? "" : content;
    const answer = String(window.SlovaExerciseFormat.sequenceTypes.includes(type) ? window.SlovaExerciseFormat.sequenceAnswer(type, content) : activity.answer || "").trim();
    const lines = previewLines(content);
    let body = "";
    let checkable = true;

    const editButton = canEdit && !isQuestion ? previewActivityEditButton(index) : "";

    if (!isQuestion && Array.isArray(activity.questions) && activity.questions.length) {
        const questionAnswers = Array.isArray(liveAnswerMarkup) ? liveAnswerMarkup : [];
        const questionsMarkup = activity.questions.map((question, itemIndex) => renderPreviewActivity({
            type: type === "listening-questions" ? "multiple-choice" : type,
            prompt: String(question.prompt || ""),
            content: String(question.content || ""),
            answer: String(question.answer || ""),
            settings: activity.settings
        }, index, false, false, questionAnswers[itemIndex] || "", itemIndex)).join("");
        return `<article class="preview-activity preview-activity-group ${canEdit ? "preview-activity-editable" : ""}" data-preview-activity="${index}">
            <header class="preview-activity-header"><h3>${index + 1}. ${escapeHtml(activity.prompt || t(activityTypes.find((item) => item.id === type)?.nameKey || "activity.task"))}</h3>${editButton}</header>
            ${window.SlovaActivityUI.renderMetadata(activity)}${type === "listening-questions" ? renderSupplementaryPreview(activity) : ""}
            <div class="preview-question-list">${questionsMarkup}</div>
        </article>`;
    }

    if (type === "one-of-many" && window.SlovaExerciseFormat.dropdown(content)) {
        const inline=window.SlovaExerciseFormat.dropdown(content);
        body=`<p class="preview-instruction">${inline.content.split('___').map((part,i)=>escapeHtml(part)+(inline.choices[i]?`<select data-inline-choice aria-label="${previewText('choose')}"><option value="">---</option>${window.SlovaExerciseFormat.shuffleChoices(inline.choices[i]).map(option=>`<option value="${escapeHtml(option)}" ${option===inline.answers[i]?'data-correct-option':''}>${escapeHtml(option)}</option>`).join('')}</select>`:'')).join('')}</p>`;
    } else if (type === "drag-words") {
        const expected = answer ? previewTokens(answer) : content.trim().split(/\s+/).filter(Boolean);
        const tokens = window.SlovaExerciseFormat.shuffleSequence(expected.map((word, wordIndex) => ({ word, wordIndex })), item => item.word);
        const previewKey = isQuestion ? `${index}-q${questionIndex}` : String(index);
        body = `<div class="preview-drag-layout sequence-exercise ${expected.every(word => Array.from(word).length === 1) ? 'sequence-letters' : ''}"><div><strong>${previewText("bank")}</strong><div class="preview-word-bank" data-word-bank>${tokens.map(({ word, wordIndex }) => `<button type="button" class="preview-word" draggable="true" data-word-index="${previewKey}-${wordIndex}">${escapeHtml(word)}</button>`).join("")}</div></div><div><strong>${previewText("answer")}</strong><div class="preview-dropzone" data-dropzone data-token-count="${expected.length}" aria-label="${previewText("answer")}" tabindex="0">${expected.map(() => '<span class="sequence-slot" aria-hidden="true"></span>').join('')}</div></div></div>`;
        if (!expected.length) checkable = false;
    } else if (type === "fill-blank") {
        const blanks = window.SlovaFillBlanks.parse(content, answer, activity.settings);
        const view = window.SlovaFillBlanks.presentation(content, answer, activity.settings);
        body = `<div class="preview-instruction lesson-fill-text">${window.SlovaActivityUI.renderBlankText(blanks.parts, blanks.answers.map((value, partIndex) => `<input class="preview-inline-input" data-answer-index="${partIndex}" placeholder="..." data-correct-placeholder="${escapeHtml(value)}" aria-label="${previewText("typeAnswer")} ${partIndex + 1}" autocomplete="off">`))}</div>`;
        if (window.SlovaBlankCards) body = window.SlovaBlankCards.render(body,view.wordBank,view.gapLayout,currentLanguage);
    } else if (type === "one-of-many" && (lines[0] || "").includes("___")) {
        const [before, ...after] = lines[0].split("___");
        const options = lines.slice(1);
        const answerIndex = Number(answer);
        const correctOption = Number.isInteger(answerIndex) && answer !== "" && options[answerIndex - 1] !== undefined
            ? options[answerIndex - 1]
            : answer;
        body = `<p class="preview-instruction">${escapeHtml(before)}<select class="preview-inline-select" data-inline-choice aria-label="${previewText("choose")}"><option value="">---</option>${window.SlovaExerciseFormat.shuffleChoices(options).map((option, optionIndex) => `<option value="${optionIndex + 1}" ${option.toLocaleLowerCase() === correctOption.toLocaleLowerCase() ? "data-correct-option" : ""}>${escapeHtml(option)}</option>`).join("")}</select>${escapeHtml(after.join("___"))}</p>`;
        if (!answer) checkable = false;
    } else if (type === "multiple-choice" || type === "one-of-many" || type === "true-false") {
        const options = type === "true-false" ? (activity.settings?.choiceLabels || [previewText("true"), previewText("false"), ...(activity.settings?.allowNotStated ? ["Not stated"] : [])]) : lines;
        const statement = type === "true-false" && displayContent ? `<p class="preview-instruction">${escapeHtml(displayContent)}</p>` : "";
        const radioName = isQuestion ? `preview-${index}-q${questionIndex}` : `preview-${index}`;
        const answerIndex = Number(answer);
        const booleanAnswerIndex = /^(true|yes|так|да|правда|0)$/i.test(answer) ? 0
            : /^(false|no|ні|нет|неправда|1)$/i.test(answer) ? 1 : answer === "not-stated" ? 2 : -1;
        const correctOption = type === "true-false" && booleanAnswerIndex >= 0
            ? (options[booleanAnswerIndex]?.toLocaleLowerCase() || answer.toLocaleLowerCase())
            : Number.isInteger(answerIndex) && answer !== "" && options[answerIndex] !== undefined
                ? options[answerIndex].toLocaleLowerCase()
                : answer.toLocaleLowerCase();
        const multiple = activity.settings?.multipleAnswers === true;
        const configured = Array.isArray(activity.settings?.options) ? activity.settings.options : [];
        const isCorrect = (option, optionIndex) => configured.length && type !== "true-false"
            ? configured.some(item => item.text === option && item.correct === true)
            : option.toLocaleLowerCase() === correctOption;
        body = `${statement}<div class="preview-options">${options.map((option, optionIndex) => `<label class="preview-option ${isCorrect(option, optionIndex) ? "is-correct-option" : ""}"><input type="${multiple ? "checkbox" : "radio"}" name="${radioName}" value="${optionIndex}"><span>${escapeHtml(option)}</span>${isCorrect(option, optionIndex) ? `<span class="preview-correct-mark" title="${liveStudentText("correctAnswer")}" aria-label="${liveStudentText("correctAnswer")}">&#10003;</span>` : ""}</label>`).join("")}</div>`;
        if (!answer) checkable = false;
    } else if (type === "order-items" || type === "sentence-order") {
        const items = window.SlovaExerciseFormat.shuffleSequence(lines.map((line, itemIndex) => ({ text: line.replace(/^\d+[.)]\s*/, ""), itemIndex })), item => item.text);
        const previewKey = isQuestion ? `${index}-q${questionIndex}` : String(index);
        body = `<ol class="preview-order-list" data-order-list>${items.map(({ text, itemIndex }) => `<li class="preview-order-item" draggable="true" data-order-index="${previewKey}-${itemIndex}"><span class="preview-order-item-text">${escapeHtml(text)}</span><span class="preview-order-actions"><button type="button" data-move="up" aria-label="${previewText("up")}">↑</button><button type="button" data-move="down" aria-label="${previewText("down")}">↓</button></span></li>`).join("")}</ol>`;
    } else if (type === "columns") {
        const cards=activity.settings?.cards?.length?activity.settings.cards:window.SlovaExerciseFormat.parseColumns(content).cards;
        const pairs=cards.map(card=>[card.category,card.text]);
        const categories = activity.settings?.categories?.length?activity.settings.categories:[...new Set(pairs.map(([category]) => category))];
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
        body = window.SlovaFlashcardDeck.render(`<div class="preview-flashcards">${window.SlovaExerciseFormat.cardsFor(activity).map(card=>`<div class="preview-flashcard" data-front="${escapeHtml(card.front)}" data-back="${escapeHtml(card.back)}"><strong>${previewFlashcardSideMarkup(card.front)}</strong><button type="button" class="preview-flashcard-flip" aria-pressed="false">${previewText("flip")}</button></div>`).join('')}</div>`,currentLanguage);
        checkable = false;
    } else if (type === "image") {
        const images = window.slovaGallery.parse(content, true);
        const interactive = window.SlovaPhotoAnnotations.isInteractive(activity);
        const teacherCanWrite = !builder && lessonWorkspaceMode === "preview" && hasPermission("edit_lessons") && window.SlovaPhotoEditor;
        if (interactive && liveAnswerMarkup.includes("data-live-photo-answer")) {
            body = liveAnswerMarkup;
            liveAnswerMarkup = "";
        } else if (images.length && teacherCanWrite && interactive) {
            body = renderTeacherPhotoSurface(activity, index);
        } else {
            body = images.length ? renderPreviewPhotoMaterial(activity, images) : `<p class="preview-material">${escapeHtml(displayContent || previewText("imageError"))}</p>`;
            if (!builder && !interactive && lessonWorkspaceMode === "preview") {
                const tools = teacherCanWrite && images.length ? `<details class="teacher-photo-writing" data-teacher-photo-writing="${index}"><summary class="button secondary small">${teacherPhotoText("write")}</summary><div data-teacher-photo-editor></div></details>` : "";
                body = `${tools}<div data-teacher-photo-material>${body}</div><div data-photo-history-index="${index}">${liveAnswerMarkup}</div>`;
                liveAnswerMarkup = "";
            }
        }
        checkable = false;
    } else if (type === "audio" || type === "video") {
        const embed = type === "video" ? previewVideoEmbedUrl(content) : "";
        const source = previewMediaUrl(content);
        body = `${embed ? `<iframe class="preview-video-embed" src="${escapeHtml(embed)}" title="${escapeHtml(prompt || previewText("mediaError"))}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` : source ? `<${type} class="preview-media" controls preload="metadata" data-preview-media><source src="${escapeHtml(source)}"></${type}>` : `<p class="preview-material">${escapeHtml(displayContent || previewText("mediaError"))}</p>`}`;
        checkable = false;
    } else if (type === "table") {
        const table = window.SlovaTable.parse(content, answer, activity.settings);
        body = `<div class="preview-table-wrap"><table class="preview-table">${table.headers?.length?`<thead><tr>${table.headers.map(header=>`<th scope="col">${escapeHtml(header)}</th>`).join("")}</tr></thead>`:""}<tbody>${table.rows.slice(table.headerRow?1:0).map(row => `<tr>${row.map(cell => `<td>${cell.split(/(\{\{blank:\d+\}\})/g).map(part => {
            const match = part.match(/^\{\{blank:(\d+)\}\}$/);
            return match ? `<input class="preview-inline-input" data-table-answer-index="${match[1]}" placeholder="..." data-correct-placeholder="${escapeHtml(table.answers[Number(match[1])])}" aria-label="${previewText("typeAnswer")}" autocomplete="off">` : escapeHtml(part);
        }).join("")}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
        checkable = table.blankCount > 0;
    } else if (type === "text") {
        const state=typeof data!=='undefined' && typeof workspaceLessonId!=='undefined' ? data.lessons.find(l=>l.id===workspaceLessonId)?.note_visibility : null;
        const settings=state && Object.hasOwn(state,activity.id) ? {...activity.settings,studentVisible:state[activity.id]} : activity.settings;
        const note = window.SlovaActivityUI?.renderNote(content, activity.prompt, settings);
        if (note) {
            const eye = lessonWorkspaceMode==='preview' && hasPermission('edit_lessons') && activity.id ? `<button type="button" class="mini-action note-visibility-toggle" data-note-visibility="${escapeHtml(activity.id)}" aria-pressed="${settings?.studentVisible !== false}" aria-label="${settings?.studentVisible === false ? 'Показать ученику' : 'Скрыть от ученика'}" title="${settings?.studentVisible === false ? 'Показать ученику' : 'Скрыть от ученика'}"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>${settings?.studentVisible === false ? '<path d="M3 3 21 21"/>' : ''}</svg></button>` : '';
            const noteControls = eye + editButton;
            const noteWithControls = noteControls ? note.replace('</summary>', `<span class="preview-note-controls">${noteControls}</span></summary>`) : note;
            return `<article class="preview-activity preview-note-card" data-preview-activity="${index}">${noteWithControls}</article>`;
        }
        const richText = window.SlovaActivityUI?.renderRichText(content);
        body = richText || (displayContent ? `<div class="preview-material">${escapeHtml(displayContent).replace(/\n/g, "<br>")}</div>` : "");
        checkable = false;
    } else if (["pronunciation-recording", "listening-questions", "find-error", "interactive-image", "vocabulary", "phrase-list"].includes(type)) {
        body = renderSupplementaryPreview(activity);
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
    const hintLabels={ru:"Показать ответы",ua:"Показати відповіді",en:"Show answers",sk:"Zobraziť odpovede",kk:"Жауаптарды көрсету"};
    const correctMarkup = body.includes('data-correct-placeholder') ? `<button type="button" class="button secondary small" data-preview-reveal aria-pressed="false">${escapeHtml(hintLabels[currentLanguage]||hintLabels.en)}</button>` : "";
    return `<article class="${previewItemClass}" data-preview-activity="${index}" ${questionAttribute} data-preview-type="${escapeHtml(type)}" data-preview-answer="${escapeHtml(answer)}" data-preview-content="${escapeHtml(content)}" ${["fill-blank", "table", "columns", "find-error"].includes(type) ? `data-preview-settings="${escapeHtml(JSON.stringify(activity.settings || {}))}"` : ""}><header class="preview-activity-header">${isQuestion ? `<span class="preview-q-badge">${previewItemNumber}</span>${activity.prompt?.trim() ? `<span class="preview-q-prompt">${prompt}</span>` : ""}` : `<h3>${previewItemNumber}. ${prompt}</h3>`}${editButton}</header>${!isQuestion ? window.SlovaActivityUI.renderMetadata(activity) : ""}${liveAnswerMarkup}${resultMarkup}${body}${correctMarkup}</article>`;
}

function renderSupplementaryPreview(activity) {
    const settings = activity.settings || {};
    const text = SlovaI18n.locales({
        ru: { record: "Записать произношение", demo: "Запись доступна ученику в уроке. Здесь показан вид задания.", correction: "Исправление", choose: "Нажмите на ошибочное слово", empty: "Добавьте содержимое задания слева.", markers: "Добавьте метки в расширенных настройках.", words: "Добавьте слова и переводы в расширенных настройках.", transcript: "Текст аудио" },
        ua: { record: "Записати вимову", demo: "Запис доступний учню в уроці. Тут показано вигляд завдання.", correction: "Виправлення", choose: "Натисніть на помилкове слово", empty: "Додайте вміст завдання ліворуч.", markers: "Додайте мітки в розширених налаштуваннях.", words: "Додайте слова й переклади в розширених налаштуваннях.", transcript: "Текст аудіо" },
        en: { record: "Record pronunciation", demo: "Recording is available to students in the lesson. This is a visual preview.", correction: "Correction", choose: "Select the incorrect word", empty: "Add activity content on the left.", markers: "Add markers in advanced settings.", words: "Add words and translations in advanced settings.", transcript: "Transcript" }
    })[currentLanguage];
    const content = String(activity.content || "");
    const empty = (message) => `<p class="builder-preview-empty">${escapeHtml(message)}</p>`;
    if (activity.type === "pronunciation-recording") {
        return `<p class="preview-instruction">${escapeHtml(content)}</p><button type="button" class="button secondary" disabled>${text.record}</button>${empty(text.demo)}`;
    }
    if (activity.type === "listening-questions") {
        const source = previewMediaUrl(content);
        const transcript = typeof settings.transcript === "string" ? settings.transcript : "";
        return `${source ? `<audio class="preview-media" controls preload="none" src="${escapeHtml(source)}" data-preview-media></audio>` : empty(text.empty)}${transcript && settings.transcriptAfterSubmit !== true ? `<details><summary>${text.transcript}</summary><p>${escapeHtml(transcript)}</p></details>` : ""}`;
    }
    if (activity.type === "find-error") {
        const normalized=window.SlovaExerciseFormat.prepare(activity);
        return window.SlovaFindErrorUI.render(normalized.content,null,currentLanguage,window.SlovaExerciseFormat.findErrors.spec(activity).expected.size);
    }
    if (["vocabulary", "phrase-list"].includes(activity.type)) return window.SlovaPhraseList.render(window.SlovaPhraseList.wordsFor(activity), currentLanguage);
    const image = previewMediaUrl(content.split(/\r?\n/)[0]);
    if (!image) return empty(text.empty);
    const hotspots = Array.isArray(settings.hotspots) ? settings.hotspots.filter((spot) => spot && Number.isFinite(Number(spot.x)) && Number.isFinite(Number(spot.y)) && typeof spot.word === "string" && spot.word.trim()).slice(0, 100) : [];
    return `<div class="preview-hotspot-image"><img src="${escapeHtml(image)}" alt="${escapeHtml(activity.prompt || "")}" data-preview-image>${hotspots.map((spot, index) => `<button type="button" class="preview-hotspot" style="left:${Math.min(100, Math.max(0, Number(spot.x)))}%;top:${Math.min(100, Math.max(0, Number(spot.y)))}%" data-preview-hotspot="${escapeHtml(`${spot.word}${typeof spot.translation === "string" ? ` — ${spot.translation}` : ""}`)}" aria-label="${escapeHtml(spot.word)}">${index + 1}</button>`).join("")}</div><p data-preview-hotspot-detail>${hotspots.length ? "" : text.markers}</p>`;
}

function checkPreviewActivity(card) {
    const result = card.querySelector("[data-preview-result]");
    if (!result) return;
    const answer = card.dataset.previewAnswer.trim();
    const resultClass = (status = "") => `preview-result${card.classList.contains("preview-question-activity") ? " preview-question-result" : ""}${status ? ` ${status}` : ""}`;
    if (!answer && !["match", "columns", "fill-blank", "table"].includes(card.dataset.previewType) && !card.querySelector("[data-inline-choice]")) {
        result.textContent = previewText("noAnswer");
        result.className = resultClass();
        return;
    }
    const type = card.dataset.previewType;
    let correct = false;
    if (type === "drag-words") {
        const actual = Array.from(card.querySelectorAll("[data-dropzone] .preview-word"), (word) => word.textContent.trim());
        const expected = answer ? previewTokens(answer) : card.dataset.previewContent.trim().split(/\s+/).filter(Boolean);
        if (actual.length !== expected.length) { result.textContent = ""; result.className = resultClass(); return; }
        correct = actual.length === expected.length && actual.every((word, index) => word.toLocaleLowerCase() === expected[index].toLocaleLowerCase());
    } else if (type === "fill-blank") {
        const inputs = Array.from(card.querySelectorAll("[data-answer-index]"));
        const checks = window.SlovaFillBlanks.check(card.dataset.previewContent, answer, JSON.parse(card.dataset.previewSettings || '{}'), inputs.map(input => input.value));
        inputs.forEach((input, index) => { const filled = Boolean(input.value.trim()); input.classList.toggle('blank-correct', filled && checks[index] === true); input.classList.toggle('blank-incorrect', filled && checks[index] === false); input.setAttribute('aria-invalid', String(filled && checks[index] === false)); });
        correct = checks.length > 0 && checks.length === inputs.length && checks.every(Boolean);
    } else if (type === "table") {
        const actual = Array.from(card.querySelectorAll("[data-table-answer-index]"), input => input.value);
        const checks=window.SlovaTable.checkResults(card.dataset.previewContent,answer,JSON.parse(card.dataset.previewSettings||'{}'),actual);
        card.querySelectorAll('[data-table-answer-index]').forEach((input,index)=>{const filled=Boolean(input.value.trim());input.classList.toggle('blank-correct',filled&&checks[index]===true);input.classList.toggle('blank-incorrect',filled&&checks[index]===false);input.setAttribute('aria-invalid',String(filled&&checks[index]===false));});
        correct=checks.length>0&&checks.length===actual.length&&checks.every(Boolean);
    } else if (type === "multiple-choice" || type === "one-of-many" || type === "true-false") {
        const inlineChoice = card.querySelector("[data-inline-choice]");
        if (inlineChoice) correct = Array.from(card.querySelectorAll("[data-inline-choice]")).every(select=>Boolean(select.value && select.selectedOptions[0]?.hasAttribute("data-correct-option")));
        else {
            const options = Array.from(card.querySelectorAll('.preview-option'));
            correct = options.some(option => option.classList.contains('is-correct-option'))
                && options.every(option => option.querySelector('input').checked === option.classList.contains('is-correct-option'));
        }
    } else if (type === "order-items" || type === "sentence-order") {
        const actual = Array.from(card.querySelectorAll("[data-order-list] .preview-order-item"), (item) => item.querySelector("span").textContent.trim().toLocaleLowerCase());
        const sourceItems = previewLines(card.dataset.previewContent).map((line) => line.replace(/^\d+[.)]\s*/, "").toLocaleLowerCase());
        const expected = answer ? answer.split("/").map((part) => part.trim().toLocaleLowerCase()) : sourceItems;
        const normalizedExpected = expected.every((part) => /^\d+$/.test(part)) ? expected.map((part) => sourceItems[Number(part) - 1]) : expected;
        correct = actual.length === normalizedExpected.length && actual.every((value, index) => value === normalizedExpected[index]);
    } else if (type === "match") {
        const selects = Array.from(card.querySelectorAll("[data-match-index]"));
        selects.forEach((select,index) => {const row=select.closest('[data-pair-row]');if(select.value)row.dataset.pairResult=String(select.value===String(index));else delete row.dataset.pairResult;});
        card.querySelector('[data-pair-board]')?.dispatchEvent(new Event('pair-refresh'));
        correct = selects.length > 0 && selects.every((select, index) => select.value === String(index));
    } else if (type === "columns") {
        const settings=JSON.parse(card.dataset.previewSettings||"{}"),cards=settings.cards?.length?settings.cards:window.SlovaExerciseFormat.parseColumns(card.dataset.previewContent).cards;
        const expectedCategories=cards.map(card=>card.category);
        const selects = Array.from(card.querySelectorAll("[data-column-index]"));
        correct = selects.length > 0 && selects.every((select, index) => select.value === expectedCategories[index]);
    } else if (type === "open-answer") {
        correct = card.querySelector("[data-open-answer]").value.trim().toLocaleLowerCase() === answer.toLocaleLowerCase();
    }
    const emptyFields = [...card.querySelectorAll("[data-answer-index], [data-table-answer-index], [data-match-index], [data-column-index], [data-inline-choice], [data-open-answer]")].some((field) => !field.value.trim());
    result.textContent = emptyFields ? "" : correct ? previewText("correct") : previewText("incorrect");
    result.className = resultClass(emptyFields ? "" : correct ? "correct" : "incorrect");
}

function bindPreviewAutoCheck(container) {
    const cards = [...container.querySelectorAll("[data-preview-type]")];
    if (container.matches?.("[data-preview-type]")) cards.unshift(container);
    cards.forEach((card) => {
        if (card.dataset.autoCheckBound) return;
        card.dataset.autoCheckBound = "true";
        let timer;
        const check = () => {
            clearTimeout(timer);
            if (card.isConnected) checkPreviewActivity(card);
        };
        const selector = "[data-answer-index], [data-table-answer-index], [data-match-index], [data-column-index], [data-inline-choice], [data-open-answer], .preview-option input";
        card.addEventListener("input", (event) => {
            if (!event.target.matches(selector) || event.isComposing) return;
            clearTimeout(timer);
            timer = setTimeout(check, 500);
        });
        card.addEventListener("change", (event) => {
            if (event.target.matches(selector)) check();
        });
        card.addEventListener("click", (event) => {
            if (event.target.closest("[data-word-index], [data-move]")) queueMicrotask(check);
        });
        card.addEventListener("drop", () => queueMicrotask(check));
    });
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
    liveMonitorOpen = false;
    render();
    window.scrollTo({ top: 0, behavior: "instant" });
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

function bindLessonPreviewActions(container = pageContent) {
    container.querySelectorAll('[data-note-visibility]').forEach(button=>button.addEventListener('click',async event=>{
        event.preventDefault();event.stopPropagation();
        const lesson=data.lessons.find(l=>l.id===workspaceLessonId);if(!lesson)return;
        button.disabled=true;
        try{const visible=button.getAttribute('aria-pressed')!=='true';
            const {data:state,error}=await window.supabaseClient.rpc('set_note_visibility',{target_lesson:lesson.id,target_block:button.dataset.noteVisibility,visible});if(error)throw error;
            lesson.note_visibility=state;
            const visit=value=>{if(Array.isArray(value)){value.forEach(visit);return;}if(!value||typeof value!=='object')return;if(value.id===button.dataset.noteVisibility)value.settings={...value.settings,studentVisible:visible};Object.values(value).forEach(visit);};visit(lesson.sections);visit(lesson.homeworkSections);visit(lesson.activities);render();
        }catch(error){showToast(error.message);button.disabled=false;}
    }));
    container.querySelectorAll('[data-teacher-photo-writing]').forEach(disclosure => {
        disclosure.addEventListener("toggle", () => {
            const location = teacherPhotoLocation(Number(disclosure.dataset.teacherPhotoWriting));
            if (!location || !hasPermission("edit_lessons")) return;
            const editor = disclosure.querySelector("[data-teacher-photo-editor]");
            if (disclosure.open) {
                if (!editor.firstElementChild) {
                    editor.innerHTML = renderTeacherPhotoSurface(location.activity, Number(disclosure.dataset.teacherPhotoWriting));
                    bindLessonPreviewActions(editor);
                }
            } else {
                const material = disclosure.nextElementSibling;
                material.innerHTML = renderPreviewPhotoMaterial(location.activity, window.slovaGallery.parse(location.activity.content, true));
                bindLessonPreviewActions(material);
            }
        });
    });
    container.querySelectorAll('[data-photo-live-index]').forEach(host=>{
        const location = teacherPhotoLocation(Number(host.dataset.photoLiveIndex));
        if (!location || !hasPermission("edit_lessons")) return;
        const { activity, lesson: targetLesson, sections, sectionId } = location;
        const status=host.querySelector('[data-photo-live-status]');let revision=0;
        const photoKey=`${targetLesson.id}:${lessonWorkspaceTab}:${sectionId}:${host.dataset.photoLiveIndex}`;
        if(teacherPhotoDrafts.has(photoKey))status.textContent=currentLanguage==='ru'?' Есть несохранённые пометки':' Unsaved annotations';
        window.SlovaPhotoEditor.bind(host,{language:currentLanguage,change:annotations=>{teacherPhotoDrafts.set(photoKey,annotations);revision++;status.textContent=currentLanguage==='ru'?' Есть несохранённые пометки':' Unsaved annotations';}});
        host.querySelector('[data-save-photo-live]')?.addEventListener('click',async event=>{
            const button=event.currentTarget,snapshot=window.SlovaPhotoEditor.value(host),version=revision;
            button.disabled=true;status.textContent=currentLanguage==='ru'?' Сохранение…':' Saving…';
            const previousSettings = activity.settings;
            const nextSettings = { ...previousSettings, imageAnnotations: snapshot };
            activity.settings = nextSettings;
            // Keep the normalized section containers used for legacy lessons as well.
            if(lessonWorkspaceTab==='homework')targetLesson.homeworkSections=sections;else targetLesson.sections=sections;
            targetLesson.activities=normalizeLessonSections(targetLesson).flatMap(item=>item.activities);
            const saved=persist()&&await waitForWorkspaceSave();
            if (!saved && activity.settings === nextSettings) activity.settings = previousSettings;
            if(saved&&JSON.stringify(teacherPhotoDrafts.get(photoKey))===JSON.stringify(snapshot))teacherPhotoDrafts.delete(photoKey);
            status.textContent=version!==revision?(currentLanguage==='ru'?' Есть несохранённые пометки':' Unsaved annotations'):saved?(currentLanguage==='ru'?' Сохранено':' Saved'):(currentLanguage==='ru'?' Не сохранено. Нажмите ещё раз.':' Not saved. Retry.');
            button.disabled=false;
        });
    });
    window.SlovaPhotoEditor?.bind(container, {language:currentLanguage});
    container.querySelectorAll('[data-preview-reveal]').forEach(button=>button.addEventListener('click',()=>{
        const show=button.getAttribute('aria-pressed')!=='true';button.setAttribute('aria-pressed',String(show));
        button.closest('[data-preview-activity]')?.querySelectorAll('[data-correct-placeholder]').forEach(input=>{input.placeholder=show?input.dataset.correctPlaceholder:'...';});
    }));
    window.SlovaFlashcardDeck?.bind(container);
    window.SlovaSelectUI?.enhance(container);
    window.SlovaBlankCards?.bind(container);
    window.SlovaActivityUI?.enhancePairing(container, { empty: previewText("choose") });
    window.SlovaFindErrorUI?.bind(container,{send:(event,root)=>{
        const card=root.closest('[data-preview-activity]'),activity={type:'find-error',content:card.dataset.previewContent,settings:JSON.parse(card.dataset.previewSettings||'{}')};
        return {errorState:window.SlovaExerciseFormat.findErrors.event(activity,window.SlovaFindErrorUI.getState(root),event)};
    }});
    container.querySelectorAll("[data-preview-hotspot]").forEach((button) => button.addEventListener("click", () => {
        button.closest("[data-preview-activity]").querySelector("[data-preview-hotspot-detail]").textContent = button.dataset.previewHotspot;
    }));
    bindPreviewAutoCheck(container);

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
        const target = image.closest(".preview-hotspot-image") || image;
        target.replaceWith(Object.assign(document.createElement("p"), { className: "preview-material", textContent: previewText("imageError") }));
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
    dropzone.querySelectorAll('.sequence-slot,.preview-drop-hint').forEach(slot => slot.remove());
    const remaining = Number(dropzone.dataset.tokenCount || 0) - dropzone.querySelectorAll('.preview-word').length;
    for (let i=0;i<remaining;i++) { const slot=document.createElement('span'); slot.className='sequence-slot'; slot.setAttribute('aria-hidden','true'); dropzone.append(slot); }
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
    bindCategoryPresentation();
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
    if (action === "delete-category") deleteLessonCategory(id);
    if (action === "new-category") openCategoryEditor();
    if (action === "back-to-units") {
        selectedLessonUnit = "";
        render();
        return;
    }
    if (action === "new-class") { classArchiveView = false; openClassEditor(); }
    if (action === "invite-student") openStudentInvite(data.classes.find((item) => item.id === id));
    if (action === "edit-class") openClassEditor(data.classes.find((item) => item.id === id));
    if (action === "student-scope-view") { studentScopeView = id === "private" && workspaceAccess.role !== "director" ? "private" : "school"; render(); }
    if (action === "student-scope-edit") openStudentScopeForm(id);
    if (action === "delete-class") deleteClass(id);
    if (action === "class-archive-view") { classArchiveView = id === "archive"; searchQuery = ""; render(); }
    if (action === "archive-class") setClassArchived(id, true);
    if (action === "restore-class") setClassArchived(id, false);
    if (action === "class-lessons") {
        activeClassFilter = id;
        searchQuery = "";
        selectedLessonUnit = "";
        setView("lessons");
    }
    if (action === "new-lesson") openLessonEditor();
    if (action === "edit-lesson") openLessonEditor(data.lessons.find((item) => item.id === id));
    if (action === "preview-lesson") openLessonPreview(id);
    if (action === "class-homework") openClassHomework(id);
    if (action === "audit-log") openSchoolAudit();
    if (action === "class-audit-log") openSchoolAudit(id);
    if (action === "lesson-history") openLessonHistory(id);
    if (action === "assign-lesson") openLessonAssignment(id);
    if (action === "add-class-lessons") openClassLessonPicker(id);
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

function classScopeText(key) {
    const labels = SlovaI18n.locales({
        ua: { label: "Тип класу", school: "Клас школи", private: "Особистий клас", hint: "Директор бачить лише класи школи. Змінити тип наявного класу може адміністратор." },
        ru: { label: "Тип класса", school: "Класс школы", private: "Личный класс", hint: "Директор видит только классы школы. Изменить тип существующего класса может администратор." },
        en: { label: "Class type", school: "School class", private: "Personal class", hint: "Directors only see school classes. Only the administrator can change an existing class type." }
    });
    return (labels[currentLanguage] || labels.en)[key];
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
            <div class="form-field"><label for="classScope">${classScopeText("label")}</label><select id="classScope" name="classScope" ${workspaceAccess.role === "director" || (item && workspaceAccess.role !== "admin") ? "disabled" : ""}><option value="school" ${item?.classScope !== "private" ? "selected" : ""}>${classScopeText("school")}</option><option value="private" ${item?.classScope === "private" ? "selected" : ""}>${classScopeText("private")}</option></select><span class="hint">${classScopeText("hint")}</span></div>
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
            classScope: String(form.get("classScope") || item?.classScope || "school"),
            archivedAt: item?.archivedAt || null,
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
    window.teacherWorkspaceApi.listExistingStudents(window.supabaseClient, group.id).then((students) => {
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
    if (!item || !window.confirm(`Удалить класс «${item.name}» навсегда? Состав класса, назначения, его ответы, домашние работы и события будут удалены. Общие уроки и аккаунты учеников сохранятся. Для сохранения прогресса используйте архив.`)) return;
    if (archivingClassIds.has(id)) return;
    archivingClassIds.add(id);
    try {
        if (currentUser && window.teacherWorkspaceApi) {
            const { data: removed, error } = await window.supabaseClient.from('teacher_classes').delete().eq('id',id).select('id').single();
            if (error) throw error;
            if (!removed) throw new Error('Класс недоступен для удаления.');
            const workspace = await window.teacherWorkspaceApi.loadWorkspace(window.supabaseClient,currentUser.id); data = workspace.data;
        } else {
            data.classes = data.classes.filter(c => c.id !== id);
            data.lessons.forEach(lesson => { lesson.classIds = lessonClassIds(lesson).filter(classId => classId !== id); });
        }
        render(); showToast(t('toast.classDeleted'));
    } catch(error) {showToast(error.message);}
    finally {archivingClassIds.delete(id);}
}

function openLessonEditor(item, sectionId = "", activityIndex = -1, tab = "lesson") {
    lessonUndoKey="";lessonUndoHistory=null;
    if (!hasPermission("edit_lessons")) return;
    stopLiveProgressSubscription();
    const recoveredDraft = item ? null : loadNewLessonDraft();
    if(recoveredDraft)protectNewLessonDraftImages(recoveredDraft).catch(error=>showToast(error.message));
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
    } else window.scrollTo({ top: 0, behavior: "instant" });
}

function switchLessonWorkspaceMode(mode, activityId = "") {
    if (mode === "edit") {
        if (!hasPermission("edit_lessons")) return;
        const lesson = data.lessons.find((item) => item.id === workspaceLessonId);
        if (!lesson || lessonWorkspaceMode === "edit") return;
        if (editorReturnToPreview && editingLessonId === lesson.id) {
            stopLiveProgressSubscription();
            lessonWorkspaceMode = "edit";
            editorReturnToPreview = false;
            const activities = activeDraftSection()?.activities || [];
            const index = activityId ? activities.findIndex(activity => activity.id === activityId) : -1;
            if (index >= 0) expandedActivityBlocks.add(activities[index]);
            render();
            if (index >= 0) {
                const block = pageContent.querySelector(`#activityBlocks [data-block-index="${index}"]`);
                block?.scrollIntoView({ block: "start", behavior: "instant" });
                block?.querySelector('[data-field="prompt"]')?.focus({ preventScroll: true });
            } else window.scrollTo({ top: 0, behavior: "instant" });
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

function applyLiveProgressEvent(rows, payload, classId, lessonId = null) {
    const eventLesson=payload.eventType==="DELETE"?payload.old?.lesson_id:payload.new?.lesson_id;
    if(lessonId&&eventLesson&&eventLesson!==lessonId)return;
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

// Realtime updates must leave the teacher's reading/editing position unchanged.
function bindLiveAnswerActions(root) {
    root.querySelectorAll("[data-play-recording]").forEach((button) => {
        if (button.dataset.liveActionBound) return;
        button.dataset.liveActionBound = "true";
        button.addEventListener("click", async () => {
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
    }); });
    root.querySelectorAll("[data-save-live-review]").forEach((button) => {
        if (button.dataset.liveActionBound) return;
        button.dataset.liveActionBound = "true";
        button.addEventListener("click", async () => {
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
            refreshLiveProgressView();
            button.disabled = false;
            showToast(liveReviewText("saved"));
        } catch (error) {
            console.error("Could not save teacher review.", error);
            showToast(`${liveReviewText("save")} · ${error.message || ""}`);
            if (button.isConnected) button.disabled = false;
        }
    }); });
}

function refreshLiveProgressView() {
    const lesson = data.lessons.find(item => item.id === workspaceLessonId);
    if (!lesson || lessonWorkspaceMode !== "preview" || !window.SlovaLiveDOM) return;
    const sections = lessonWorkspaceTab === "homework" ? normalizePreviewHomeworkSections(lesson) : normalizeLessonSections(lesson);
    const section = sections.find(item => item.id === (lessonWorkspaceTab === "homework" ? activeHomeworkSectionId : activeLessonSectionId));
    const group = data.classes.find(item => item.id === monitorClassId);
    const students=group?liveStudentsForGroup(group):[];
    const student=students.find(item=>item.id===selectedLiveStudentId)||students[0]||null;
    if (!section) return;
    const scrollX = window.scrollX, scrollY = window.scrollY;
    const progressIndexes = lessonProgressIndexes(lesson);
    const inserted = [];
    pageContent.querySelectorAll('[data-live-progress-index]').forEach(panel => {
        if (panel.closest("[data-photo-history-index]")) return;
        const index = Number(panel.dataset.livePhotoIndexValue);
        let activity = window.SlovaExerciseFormat?.prepare?.(section.activities[index]) || section.activities[index];
        if (!activity) return;
        const questionIndex = panel.dataset.liveQuestionIndex === '' ? null : Number(panel.dataset.liveQuestionIndex);
        const questionId = panel.dataset.liveQuestionId || null;
        if (questionIndex !== null) {
            const question = activity.questions?.[questionIndex];
            if (!question) return;
            activity = { ...activity, prompt:String(question.prompt||""),content:String(question.content||""),answer:String(question.answer||""),questions: undefined, settings: { ...activity.settings, ...question.settings } };
        }
        const template = document.createElement('template');
        template.innerHTML = renderLiveAnswerPanel(student, activity, Number(panel.dataset.liveProgressIndex), questionId, questionIndex,
            { classId: monitorClassId, lessonId: lesson.id, photoIndex: index });
        window.SlovaLiveDOM.patch(panel, template.content.firstElementChild, inserted);
    });
    const answers = liveProgressRows.get(student?.id)?.answers || {};
    pageContent.querySelectorAll("[data-photo-history-index]").forEach(slot => {
        const index = Number(slot.dataset.photoHistoryIndex);
        const activity = section.activities[index];
        const progressIndex = progressIndexes.get(`${section.id}:${index}`);
        if (!activity || progressIndex === undefined) return;
        const answer = liveAnswerFor(activity, progressIndex, answers);
        const response = answer?.response;
        const wasAnswered = Boolean(slot.firstElementChild);
        const answered = Boolean(group && window.SlovaPhotoAnnotations?.hasContent(response));
        const stamp = answer?.submitted_at || "";
        if (!answered && !wasAnswered) return;
        if (answered && wasAnswered && stamp && slot.dataset.photoHistoryStamp === stamp) return;
        slot.innerHTML = answered ? renderLiveAnswerPanel(student, activity, progressIndex, null, null, { photoIndex: index }) : "";
        slot.dataset.photoHistoryStamp = stamp;
        window.SlovaPhotoEditor?.bind(slot, { language: currentLanguage });
    });
    const template = document.createElement('template');
    template.innerHTML = renderLiveMonitor(lesson, progressIndexes);
    const fresh = template.content;
    const status = pageContent.querySelector('.live-monitor-status');
    if (status && fresh.querySelector('.live-monitor-status')) window.SlovaLiveDOM.patch(status, fresh.querySelector('.live-monitor-status'));
    pageContent.querySelectorAll('[data-live-student-id]').forEach(button => {
        const replacement = [...fresh.querySelectorAll('[data-live-student-id]')].find(item => item.dataset.liveStudentId === button.dataset.liveStudentId);
        if (replacement) window.SlovaLiveDOM.patch(button, replacement);
    });
    bindLiveAnswerActions(pageContent);
    inserted.forEach(node => {
        if (node.matches('[data-photo-live-index]') || node.querySelector('[data-photo-live-index]')) {
            const wrapper = document.createElement('div');
            node.before(wrapper); wrapper.append(node); bindLessonPreviewActions(wrapper); wrapper.replaceWith(node);
        }
    });
    window.scrollTo({ left: scrollX, top: scrollY, behavior: 'instant' });
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
    function refreshView() {
        if (typeof pageContent === "undefined" || typeof document === "undefined") {
            render();
            return;
        }
        refreshLiveProgressView();
    }
    let snapshotGeneration=0;
    function loadSnapshot(){
        const ticket=++snapshotGeneration;
        snapshotLoaded=false;bufferedEvents.length=0;
        return api.loadLessonProgress(client,group.id,lesson.id).then(rows=>{
            if(generation!==liveProgressGeneration||ticket!==snapshotGeneration)return;
            liveProgressRows=new Map(rows.map(progress=>[progress.student_id,progress]));
            bufferedEvents.forEach(payload=>applyLiveProgressEvent(liveProgressRows,payload,group.id,lesson.id));
            bufferedEvents.length=0;snapshotLoaded=true;
            if(channelReady)updateStatus('ready');else if(channelFailed)updateStatus('error',liveProgressError);else updateStatus('connecting');
        }).catch(error=>{
            if(generation!==liveProgressGeneration||ticket!==snapshotGeneration)return;
            updateStatus('error',error.message||'');
        });
    }
    const updateStatus = (status, error = "") => {
        if (generation !== liveProgressGeneration) return;
        liveProgressStatus = status;
        liveProgressError = error;
        refreshView();
    };
    const handleEvent = (payload) => {
        if (generation !== liveProgressGeneration) return;
        if (!snapshotLoaded) {
            bufferedEvents.push(payload);
            return;
        }
        applyLiveProgressEvent(liveProgressRows, payload, group.id,lesson.id);
        refreshView();
    };

    try {
        liveProgressChannel = api.subscribeLessonProgress(client, lesson.id, handleEvent, (status, error) => {
            if (generation !== liveProgressGeneration) return;
            if (status === "SUBSCRIBED") {
                channelReady = true;
                channelFailed = false;
                loadSnapshot();
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

    loadSnapshot();
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
    activity=window.SlovaExerciseFormat.prepare(activity);
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
            if(submitted.version===2)return window.SlovaFindErrorUI.summary(activity.content,submitted,currentLanguage);
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
    activity=window.SlovaExerciseFormat.prepare(activity);
    const answer = String(activity.answer ?? "").trim();
    const expectedParts = previewTokens(answer);
    const contentLines = previewLines(activity.content);

    if (activity.type === "drag-words") return expectedParts.join(" ");
    if (activity.type === "find-error") {
        const {tokens, expected} = window.SlovaExerciseFormat.findErrors.spec(activity);
        return [...expected].map(([index, correction]) => `${tokens[index]} → ${correction}`).join("\n");
    }
    if (activity.type === "fill-blank") return window.SlovaFillBlanks.parse(activity.content, activity.answer, activity.settings).groups.map(group => group.join(" / ")).join(" · ");
    if (activity.type === "table") return window.SlovaTable.parse(activity.content, activity.answer, activity.settings).groups.map(group => group.join(" / ")).join(" · ");
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
        if (activity.type !== "image" && !acceptsLiveAnswer(activity)) return;
        const progressIndex = progressIndexes.get(`${section.id}:${activityIndex}`);
        if (progressIndex === undefined) return;
        const questionEntries = Array.isArray(activity.questions) && activity.questions.length
            ? activity.questions.map((question, questionIndex) => ({
                questionId: activityQuestionProgressId(question, questionIndex, activity.questions),
                questionIndex
            }))
            : [{ questionId: null, questionIndex: null }];
        questionEntries.forEach(({ questionId, questionIndex }) => {
            const answer = liveAnswerFor(activity, progressIndex, answers, questionId, questionIndex);
            const response = answer?.response;
            if (!acceptsLiveAnswer(activity, response)) return;
            total += 1;
            const hasResponse = activity.type==='image'
                ? Boolean(window.SlovaPhotoAnnotations?.hasContent(response))
                : response&&typeof response==='object'&&!Array.isArray(response)
                ? Boolean(String(response.text||'').trim()||(Array.isArray(response.attachments)&&response.attachments.some(url=>typeof url==='string'&&url.trim())))
                : Array.isArray(response)
                ? response.some((item) => typeof item === "string" && item.trim())
                : typeof response === "string" && Boolean(response.trim());
            if (hasResponse) answered += 1;
        });
    }));
    return { answered, total };
}

function renderTeacherPhotoSurface(activity,index,studentResponse={}) {
    const images=window.slovaGallery.parse(activity.content,true);
    const photoKey=`${workspaceLessonId}:${lessonWorkspaceTab}:${lessonWorkspaceTab==='homework'?activeHomeworkSectionId:activeLessonSectionId}:${index}`;
    const own=teacherPhotoDrafts.get(photoKey)||activity.settings?.imageAnnotations||{};
    const student=window.SlovaPhotoAnnotations.read(studentResponse),base={};
    for(const image of images) base[image.url]=[...(student[image.url]||[]),...(own[image.url]||[]).filter(op=>op.type==='field')];
    return `<div data-photo-live-index="${index}">${window.SlovaPhotoEditor.markup(images,base,own,true,currentLanguage,{direct:true,preserveFields:true})}<button type="button" class="button secondary small" data-save-photo-live>${currentLanguage==='ru'?'Сохранить пометки':currentLanguage==='ua'?'Зберегти позначки':'Save annotations'}</button><span data-photo-live-status role="status"></span></div>`;
}

function teacherPhotoLocation(index) {
    const lesson = data.lessons.find(item => item.id === workspaceLessonId);
    if (!lesson) return null;
    const homework = lessonWorkspaceTab === "homework";
    const sections = homework ? normalizePreviewHomeworkSections(lesson) : normalizeLessonSections(lesson);
    const sectionId = homework ? activeHomeworkSectionId : activeLessonSectionId;
    const activity = sections.find(section => section.id === sectionId)?.activities[index];
    return activity?.type === "image" ? { activity, lesson, sections, sectionId } : null;
}

function renderPreviewPhotoMaterial(activity, images) {
    const annotations = window.SlovaPhotoAnnotations.forDisplay(activity.settings?.imageAnnotations, window.SlovaPhotoAnnotations.isInteractive(activity));
    if (window.SlovaPhotoEditor && Object.keys(annotations).length) {
        return window.SlovaPhotoEditor.markup(images, annotations, {}, false, currentLanguage);
    }
    return window.slovaGallery.html(images, activity.prompt || "", "preview-image");
}

function teacherPhotoText(key) {
    const labels = SlovaI18n.locales({
        ru: { write: "Писать на фото", title: "Пометки на фото", hint: "Выберите «Вписать» и нажмите на фото в нужном месте." },
        ua: { write: "Писати на фото", title: "Позначки на фото", hint: "Виберіть «Вписати» й натисніть на потрібне місце на фото." },
        en: { write: "Write on the photo", title: "Photo annotations", hint: "Choose “Type here” and click where you want to write on the photo." },
        sk: { write: "Písať do obrázka", title: "Poznámky v obrázku", hint: "Vyberte „Písať sem“ a kliknite na požadované miesto v obrázku." },
        kk: { write: "Фотосуретке жазу", title: "Фотосуреттегі белгілер", hint: "«Осында жазу» құралын таңдап, фотосуреттегі керекті жерді басыңыз." }
    });
    return (labels[currentLanguage] || labels.en)[key];
}

function liveAnswerFor(activity, progressIndex, answers, questionId = null, questionIndex = null) {
    const answerKey = questionId
        ? `${activityProgressKey(activity, progressIndex)}.q${questionId}`
        : activityProgressKey(activity, progressIndex);
    const legacyKey = legacyActivityProgressKey(activity, progressIndex);
    return answers[answerKey]
        || (questionId && legacyKey ? answers[`${legacyKey}.q${questionId}`] : null)
        || ((questionIndex === 0 || !questionId) && legacyKey ? answers[legacyKey] : null);
}

function renderLiveAnswerPanel(student, activity, progressIndex, questionId = null, questionIndex = null, reviewContext = null) {
    const key = activityProgressKey(activity, progressIndex);
    const answerKey = questionId ? `${key}.q${questionId}` : key;
    const answers = student ? liveProgressRows.get(student.id)?.answers || {} : {};
    const answer = liveAnswerFor(activity, progressIndex, answers, questionId, questionIndex);
    const recordingPath = activity.type === "pronunciation-recording"
        && typeof answer?.response === "string"
        && /^[0-9a-f-]{36}\/[0-9a-f-]{36}\/[0-9a-f-]{36}\/[0-9a-f-]{36}\.(webm|ogg|mp4|wav)$/i.test(answer.response)
        ? answer.response
        : "";
    let photoAnswer = "";
    if (activity.type === "image" && window.SlovaPhotoEditor) {
        const images = window.slovaGallery.parse(activity.content);
        const template = activity.settings?.imageAnnotations;
        if (lessonWorkspaceMode === "preview" && hasPermission("edit_lessons") && window.SlovaPhotoAnnotations.isInteractive(activity)) {
            photoAnswer = renderTeacherPhotoSurface(activity, reviewContext?.photoIndex ?? progressIndex, answer?.response);
        } else {
            photoAnswer = window.SlovaPhotoEditor.markup(images, template, answer?.response, false, currentLanguage);
        }
        photoAnswer += window.SlovaPhotoEditor.savedText(images, template, answer?.response, currentLanguage);
    }
    const response = activity.type === 'image' ? (window.SlovaPhotoAnnotations?.hasContent(answer?.response)?(currentLanguage==='ru'?'Пометки на фото':currentLanguage==='ua'?'Позначки на фото':'Photo answer'):'') : recordingPath ? liveStudentText("recording") : formatLiveResponse(activity, answer?.response);
    const answerStatus = activity.type==='image'
        ? (window.SlovaPhotoAnnotations?.hasContent(answer?.response)?`<span class="live-answer-status is-submitted">${currentLanguage==='ru'?'Сохранено':currentLanguage==='ua'?'Збережено':'Saved'}</span>`:'')
        : answer
        ? `<span class="live-answer-status ${answer.draft ? "is-draft" : "is-submitted"}">${answer.draft ? lessonSectionText("liveDraft") : lessonSectionText("liveSubmitted")}</span>`
        : "";
    const name = student?.name || lessonSectionText("liveNoStudents");
    const answerTone = answer && !answer.draft ? (answer.correct === true ? "is-correct" : answer.correct === false ? "is-incorrect" : "") : "";
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
    return `<div data-live-progress-index="${progressIndex}" data-live-photo-index-value="${reviewContext?.photoIndex ?? progressIndex}" data-live-question-index="${questionIndex ?? ''}" data-live-question-id="${escapeHtml(questionId || '')}" ${activity.type==='image'?'data-live-photo-answer':''} class="live-answer-inline ${answerTone}" aria-label="${escapeHtml(name)}"><span class="live-answer-avatar" aria-hidden="true">${escapeHtml(name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2))}</span><strong>${escapeHtml(name)}</strong>${answerStatus}<span class="live-answer-response">${escapeHtml(response || lessonSectionText("liveWait"))}</span>${recordingPath ? `<button class="button secondary small" type="button" data-play-recording="${escapeHtml(recordingPath)}">${escapeHtml(liveStudentText("playRecording"))}</button>` : ""}<span data-recording-player></span>${teacherFeedback}${reviewForm}${photoAnswer}</div>`;
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
    return `<section class="live-monitor-bar" aria-label="${lessonSectionText("liveAnswers")}"><header class="live-monitor-heading"><h2>${lessonSectionText("liveAnswers")}</h2></header>${groupPicker}${studentPicker}${resetProgressButton}<p class="live-monitor-status ${statusClass}" role="status" aria-live="polite">${escapeHtml(statusText)}</p></section>`;
}

function renderLessonActivity(lesson, section, index, progressIndexes, liveGroup, liveStudent) {
    let activity = section.activities[index];
    if (previewActivityEdit?.lessonId === lesson.id && previewActivityEdit.sectionId === section.id
        && previewActivityEdit.draft.id === activity.id) return renderPreviewActivity(previewActivityEdit.draft, index, true, true);
    activity = window.SlovaExerciseFormat?.prepare?.(activity) || activity;
    const progressIndex = progressIndexes.get(`${section.id}:${index}`);
    const savedPhoto = activity.type === "image" && liveStudent && progressIndex !== undefined
        ? liveAnswerFor(activity, progressIndex, liveProgressRows.get(liveStudent.id)?.answers || {})?.response : undefined;
    const liveAnswerMarkup = liveGroup && acceptsLiveAnswer(activity, savedPhoto) && progressIndex !== undefined
        ? Array.isArray(activity.questions) && activity.questions.length
            ? activity.questions.map((question, questionIndex) => renderLiveAnswerPanel(liveStudent, {
                ...activity,
                questions: undefined,
                prompt: String(question.prompt || ""),
                content: String(question.content || ""),
                answer: String(question.answer || ""),
                settings: { ...activity.settings, ...question.settings }
            }, progressIndex, activityQuestionProgressId(question, questionIndex, activity.questions), questionIndex, {
                classId: monitorClassId,
                photoIndex: index,
                lessonId: lesson.id
            }))
            : renderLiveAnswerPanel(liveStudent, activity, progressIndex, null, null, {
                classId: monitorClassId,
                photoIndex: index,
                lessonId: lesson.id
            })
        : "";
    return renderPreviewActivity(activity, index, hasPermission("edit_lessons"), false, liveAnswerMarkup);
}

function inlineActivityLocation(index, edit = previewActivityEdit) {
    const lesson = data.lessons.find(item => item.id === workspaceLessonId);
    if (!lesson || lessonWorkspaceMode !== "preview") return null;
    const homework = lessonWorkspaceTab === "homework";
    const sections = homework ? normalizeHomeworkSections(lesson) : normalizeLessonSections(lesson);
    const section = sections.find(item => item.id === (homework ? activeHomeworkSectionId : activeLessonSectionId));
    if (edit) {
        if (edit.lessonId !== lesson.id || edit.sectionId !== section?.id) return null;
        index = section.activities.findIndex(activity => activity.id === edit.draft.id);
    }
    if (!section?.activities[index]) return null;
    return { lesson, section, sections, homework, index };
}

function replacePreviewActivityCard(card, markup) {
    const template = document.createElement("template");
    template.innerHTML = markup;
    const replacement = template.content.firstElementChild;
    const before = card.getBoundingClientRect().top;
    const headerBottom = document.querySelector(".topbar").getBoundingClientRect().bottom;
    card.replaceWith(replacement);
    if (before < headerBottom || before >= window.innerHeight) {
        replacement.scrollIntoView({ block: "start", behavior: "instant" });
    } else {
        const shift = replacement.getBoundingClientRect().top - before;
        if (shift) window.scrollBy({ top: shift, behavior: "instant" });
    }
    return replacement;
}

function syncInlineActivityControls() {
    const edit = previewActivityEdit;
    const controls = "[data-edit-preview-block], [data-workspace-back], [data-workspace-mode], [data-select-section], [data-section-step], [data-insert-note], [data-tools-validate], [data-open-lesson-history]";
    pageContent.querySelectorAll(controls).forEach(button => {
        if (edit && !button.disabled) {
            button.disabled = true;
            button.dataset.inlineEditLock = "";
        } else if (!edit && button.hasAttribute("data-inline-edit-lock")) {
            button.disabled = false;
            delete button.dataset.inlineEditLock;
        }
    });
    const card = pageContent.querySelector("[data-inline-block-editor]");
    if (!card || !edit) return;
    card.querySelector("[data-save-inline-activity]").disabled = edit.saving || edit.uploads > 0;
    card.querySelector("[data-cancel-inline-activity]").disabled = edit.saving;
    card.querySelector(".builder-block-fields").inert = edit.saving;
}

function renderInlineActivityEditor(card) {
    const edit = previewActivityEdit;
    const location = inlineActivityLocation();
    if (!edit || !location) return;
    const replacement = replacePreviewActivityCard(card, renderPreviewActivity(edit.draft, location.index, true, true));
    bindActivityEditor(replacement, () => edit.draft, () => {});
    bindTrueFalseEditors(replacement);
    bindLessonNotes(replacement);
    bindBlankCardSettings(replacement);
    bindActivityAuthoring(replacement);
    enhanceSelects(replacement);
    syncInlineActivityControls();
    return replacement;
}

function closeInlineActivityEditor() {
    const location = inlineActivityLocation();
    const card = pageContent.querySelector("[data-inline-block-editor]");
    previewActivityEdit = null;
    if (location && card) {
        const { lesson, section, index } = location;
        const group = data.classes.find(item => item.id === monitorClassId);
        const students = group ? liveStudentsForGroup(group) : [];
        const student = students.find(item => item.id === selectedLiveStudentId) || students[0] || null;
        const markup = renderLessonActivity(lesson, section, index, lessonProgressIndexes(lesson), group, student);
        const replacement = replacePreviewActivityCard(card, markup);
        bindLessonPreviewActions(replacement);
        bindLiveAnswerActions(replacement);
        syncInlineActivityControls();
        replacement.querySelector("[data-edit-preview-block]")?.focus({ preventScroll: true });
    } else {
        render();
    }
}

async function saveInlineActivity() {
    const edit = previewActivityEdit;
    const location = inlineActivityLocation();
    if (!edit || !location || edit.saving || edit.uploads || !hasPermission("edit_lessons")) return;
    const settings = pageContent.querySelector('[data-inline-block-editor] [data-field="settings"]');
    if (settings && !settings.checkValidity()) {
        settings.closest("details").open = true;
        settings.reportValidity();
        return;
    }
    edit.saving = true;
    syncInlineActivityControls();
    const previousData = structuredClone(data);
    const { lesson, section, sections, homework, index } = location;
    section.activities = section.activities.map((activity, position) => position === index ? structuredClone(edit.draft) : activity);
    lesson[homework ? "homeworkSections" : "sections"] = sections;
    if (!homework) lesson.activities = sections.flatMap(item => item.activities);
    const saved = await persistWorkspaceChange(previousData);
    edit.saving = false;
    if (previewActivityEdit !== edit) return;
    if (saved) {
        closeInlineActivityEditor();
        refreshLiveProgressView();
        showToast(t("toast.activityUpdated"));
    } else {
        syncInlineActivityControls();
    }
}

function bindInlineActivityActions() {
    const list = pageContent.querySelector(".lesson-preview-list");
    if (!list) return;
    const edit = previewActivityEdit;
    const existing = list.querySelector("[data-inline-block-editor]");
    if (edit && existing) bindActivityEditor(existing, () => edit.draft, () => {});
    syncInlineActivityControls();
    list.addEventListener("click", event => {
        const button = event.target.closest("[data-edit-preview-block], [data-cancel-inline-activity], [data-save-inline-activity], [data-add-question], [data-remove-question]");
        if (!button || button.disabled) return;
        if (button.hasAttribute("data-edit-preview-block")) {
            event.preventDefault();
            const location = inlineActivityLocation(Number(button.dataset.editPreviewBlock), null);
            if (!location || previewActivityEdit || !hasPermission("edit_lessons")) return;
            const activity = location.section.activities[location.index];
            if (editorReturnToPreview && editingLessonId === location.lesson.id) {
                switchLessonWorkspaceMode("edit", activity.id);
                return;
            }
            const draft = structuredClone(activity);
            ensureActivityQuestionIds(draft);
            previewActivityEdit = { lessonId: location.lesson.id, sectionId: location.section.id, draft, saving: false, uploads: 0 };
            renderInlineActivityEditor(button.closest("[data-preview-activity]"))?.querySelector('[data-field="prompt"]')?.focus({ preventScroll: true });
            return;
        }
        const card = button.closest("[data-inline-block-editor]");
        const current = previewActivityEdit;
        if (!card || !current || current.saving) return;
        if (button.hasAttribute("data-cancel-inline-activity")) closeInlineActivityEditor();
        else if (button.hasAttribute("data-save-inline-activity")) void saveInlineActivity();
        else {
            if (current.uploads) return;
            if (button.hasAttribute("data-add-question")) {
                const index = addActivityQuestion(current.draft);
                if (index < 0) return;
                renderInlineActivityEditor(card)?.querySelector(`[data-question-index="${index}"] [data-field="content"]`)?.focus();
            } else if (current.draft.questions?.length > 1) {
                current.draft.questions.splice(Number(button.closest("[data-question-index]").dataset.questionIndex), 1);
                renderInlineActivityEditor(card);
            }
        }
    });
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
    const title = isEditing ? lessonFormDraft.title : lesson.title;
    const unit = isEditing ? lessonFormDraft.unit : lesson.unit || inferLessonUnit(lesson);
    const renderSectionMenu = (items, isHomeworkSection) => items.map((item, index) => {
        const current = isHomeworkSection === isHomework && item.id === selectedSectionId;
        return `<div class="lesson-section-row ${current ? "active" : ""}">
            <button type="button" class="lesson-section-select" data-select-section="${escapeHtml(item.id)}" data-section-homework="${isHomeworkSection}" ${current ? 'aria-current="location"' : ""} ><span class="lesson-section-number">${index + 1}</span><span class="lesson-section-label" data-section-label="${escapeHtml(item.id)}">${escapeHtml(item.title)}</span></button>
            ${isEditing ? `<div class="lesson-section-tools"><button type="button" data-move-section-from="${escapeHtml(item.id)}" data-move-section="${index - 1}" data-section-homework="${isHomeworkSection}" ${index === 0 ? "disabled" : ""} aria-label="${lessonSectionText("previous")}">↑</button><button type="button" data-move-section-from="${escapeHtml(item.id)}" data-move-section="${index + 1}" data-section-homework="${isHomeworkSection}" ${index === items.length - 1 ? "disabled" : ""} aria-label="${lessonSectionText("next")}">↓</button><button type="button" data-delete-section="${escapeHtml(item.id)}" data-section-homework="${isHomeworkSection}" ${items.length === 1 ? "disabled" : ""} aria-label="${lessonSectionText("remove")}">×</button></div>` : ""}</div>`;
    }).join("");
    const lessonSectionMenu = renderSectionMenu(lessonSections, false);
    const homeworkSectionMenu = renderSectionMenu(homeworkSections, true);
    const sectionBody = isEditing
        ? `<div class="form-field section-name-field"><label for="sectionTitle">${lessonSectionText("rename")}</label><input id="sectionTitle" data-section-title="${escapeHtml(section.id)}" maxlength="80" value="${escapeHtml(section.title)}"></div><div class="builder-heading"><h3>${isHomework ? lessonSectionText("homeworkActivities") : t("lesson.activities")}</h3><span data-lesson-autosave-status role="status" aria-live="polite"></span><button type="button" class="button secondary small" data-action="choose-activity">${t("activity.addBlock")}</button></div><button type="button" class="button secondary small lesson-import-launch" data-import-lesson>${escapeHtml(window.SlovaLessonImportUI.labels(currentLanguage)[0])}</button><div id="activityBlocks">${renderActivityBlocks(section.activities)}</div>`
        : `<p class="preview-note">${previewText("practice")}</p><div class="lesson-preview-list">${section.activities.length ? section.activities.map((activity, index) => {
            const insertNote = hasPermission("edit_lessons") ? window.SlovaLessonNotes?.insertButton(index, currentLanguage) || "" : "";
            return insertNote + renderLessonActivity(lesson, section, index, progressIndexes, liveGroup, liveStudent);
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
    const workspaceTabs = `<nav class="lesson-workspace-tabs" role="tablist" aria-label="${lessonSectionText("workspaceMode")}"><button type="button" class="${!isEditing ? "active" : ""}" role="tab" aria-selected="${!isEditing}" data-workspace-mode="preview" ${!lesson ? "disabled" : ""}>${lessonSectionText("lessonTab")}</button>${hasPermission("edit_lessons") ? `<button type="button" class="${isEditing ? "active" : ""}" role="tab" aria-selected="${isEditing}" data-workspace-mode="edit" >${lessonSectionText("editorTab")}</button>` : ""}</nav>`;
    pageContent.innerHTML = `<section class="lesson-workspace"><form id="lessonForm" class="lesson-workspace-form">
        <header class="lesson-workspace-hero">
            <div class="lesson-workspace-heading"><button type="button" class="button back-to-lessons" data-workspace-back >← ${lessonSectionText("back")}</button>
                ${isEditing ? `<div class="lesson-workspace-fields"><div class="form-field"><label for="lessonTitle">${t("field.lessonTitle")}</label><input id="lessonTitle" name="title" required maxlength="100" value="${escapeHtml(title)}" placeholder="${t("field.exampleLesson")}"></div><div class="form-field"><label for="lessonUnit">${categoryText("name")}</label><select id="lessonUnit" name="unit" required><option value="">${lessonText("chooseUnit")}</option>${lessonCategories().map((level) => `<option value="${escapeHtml(level)}" ${unit === level ? "selected" : ""}>${escapeHtml(level)}</option>`).join("")}</select></div></div>` : `<div><span class="course-hero-kicker">${escapeHtml(lessonClassNames(lesson)) || lessonText("unassigned")} · ${escapeHtml(unit)}</span><h1>${escapeHtml(title)}</h1></div>`}
            </div>
            ${isEditing ? "" : `<div class="lesson-workspace-preview-actions"><span class="lesson-workspace-unit">${escapeHtml(unit)}</span>${lesson ? `<button type="button" class="button secondary small" data-open-lesson-history>${historyText("versions")}</button>` : ""}</div>`}
        </header>
        <div class="lesson-workspace-toolbar">${workspaceTabs}<div class="lesson-tools" data-lesson-tools></div></div>
        ${previewDraftNotice}
        <div class="lesson-workspace-layout">
            <aside class="lesson-workspace-rail">
                <section class="lesson-sections-panel" aria-labelledby="lessonSectionsHeading">
                    <h2 id="lessonSectionsHeading">${lessonSectionText("section")}</h2><nav class="lesson-sections-list" aria-label="${lessonSectionText("section")}">${lessonSectionMenu}</nav>
                    ${isEditing && !isHomework ? `<button type="button" class="button secondary lesson-add-section" data-add-section="lesson">${lessonSectionText("addSection")}</button>` : ""}
                    <h3 class="homework-sections-heading">${lessonSectionText("homework")}</h3><nav class="lesson-sections-list homework-sections-list" aria-label="${lessonSectionText("homework")}">${homeworkSectionMenu}</nav>
                    ${isEditing && isHomework ? `<button type="button" class="button secondary lesson-add-section" data-add-section="homework">${lessonSectionText("addSection")}</button>` : ""}
                </section>
                ${liveMonitor ? `<div class="live-monitor-column ${liveMonitorOpen ? "is-expanded" : ""}">
                    <button type="button" class="button secondary small live-monitor-toggle" data-toggle-live-monitor aria-controls="lessonLiveAnswers" aria-expanded="${liveMonitorOpen}">${lessonSectionText("liveAnswers")}</button>
                    <div id="lessonLiveAnswers">${liveMonitor}</div>
                </div>` : ""}
            </aside>
            <main class="lesson-workspace-main"><section class="lesson-workspace-section">
                ${isEditing ? `${sourcePanel}${sectionBody}${dropZone}` : `<h2>${escapeHtml(section.title)}</h2>${sectionBody}`}
            </section>
                <div class="lesson-workspace-footer"><button type="button" class="button secondary small" data-section-step="-1" ${sections.indexOf(section) === 0 ? "disabled" : ""}>${lessonSectionText("previous")}</button><span>${sections.indexOf(section) + 1} / ${sections.length}</span><button type="button" class="button secondary small" data-section-step="1" ${sections.indexOf(section) === sections.length - 1 ? "disabled" : ""}>${lessonSectionText("next")}</button>
                ${isEditing ? `<span class="lesson-workspace-spacer"></span><button type="button" class="button secondary small" data-action="choose-activity">${lessonSectionText("addElement")}</button><button type="button" class="button secondary small" data-copy-activity ${section.activities.length ? "" : "disabled"}>${lessonSectionText("copyElement")}</button>` : ""}</div>
            </main>
        </div>
        ${actionBar ? `<div class="lesson-workspace-actions">${actionBar}</div>` : ""}
    </form></section>`;
    pageContent.querySelector("[data-workspace-back]").addEventListener("click", exitLessonWorkspace);
    pageContent.querySelector("[data-open-lesson-history]")?.addEventListener("click", () => openLessonHistory(lesson.id));
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
        const classId = monitorClassId;
        if (button.disabled) return;
        if (!lesson || !classId || studentId !== liveStudent?.id || !studentId || !window.teacherWorkspaceApi?.resetLessonProgress) {
            showToast(progressResetText("error"));
            return;
        }
        if (!window.confirm(progressResetText("confirm", liveStudent.name, lesson.title))) return;
        button.disabled = true;
        try {
            await window.teacherWorkspaceApi.resetLessonProgress(window.supabaseClient, classId, lesson.id, studentId);
            liveProgressRows.delete(studentId);
            render();
            showToast(progressResetText("success"));
        } catch (error) {
            console.error("Could not reset student lesson progress.", error);
            showToast(`${progressResetText("error")} ${error.message || ""}`);
            if (button.isConnected) button.disabled = false;
        }
    });
    bindLiveAnswerActions(pageContent);
    pageContent.querySelector("[data-toggle-live-monitor]")?.addEventListener("click", (event) => {
        liveMonitorOpen = !liveMonitorOpen;
        event.currentTarget.closest(".live-monitor-column")?.classList.toggle("is-expanded", liveMonitorOpen);
        event.currentTarget.setAttribute("aria-expanded", String(liveMonitorOpen));
    });
    pageContent.querySelectorAll("[data-import-lesson]").forEach(button => button.addEventListener("click", openLessonTextImport));
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
    pageContent.querySelectorAll('.lesson-workspace form, #lessonForm').forEach(form => form.addEventListener('keydown',preventLessonInputSubmit));
    if (isEditing) bindActivityBlockActions();
    else pageContent.querySelectorAll(".lesson-preview-list > [data-preview-activity]").forEach(card => bindLessonPreviewActions(card));
    bindTrueFalseEditors(pageContent);
    bindLessonNotes(pageContent);
    bindBlankCardSettings(pageContent);
    bindActivityAuthoring(pageContent);
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
    return activities.map((block, index) =>
        (window.SlovaLessonNotes?.insertButton(index, currentLanguage) || "") + renderActivityBlock(block, index, expandedActivityBlocks.has(block))
    ).join("") + (window.SlovaLessonNotes?.insertButton(activities.length, currentLanguage) || "");
}

function renderActivityBlock(block, index, isExpanded, inline = false) {
    const type = activityTypes.find((item) => item.id === block.type);
    const hasQuestions = Array.isArray(block.questions) && block.questions.length > 0;
    const summary = activitySummary(block);
    const meta = activityEditorMeta(block);
    const isRichText = block.type === "text";
    const isPhoto = block.type === "image" && !hasQuestions;
    const previewTitle = isPhoto ? teacherPhotoText("title") : SlovaI18n.translate(currentLanguage === "ru" ? "Предпросмотр" : currentLanguage === "ua" ? "Попередній перегляд" : "Preview", currentLanguage);
    const previewHint = isPhoto ? teacherPhotoText("hint") : SlovaI18n.translate(currentLanguage === "ru" ? "Так блок будет выглядеть для ученика" : currentLanguage === "ua" ? "Так блок бачитиме учень" : "How the block will look to a student", currentLanguage);
    const preview = `<aside class="builder-block-preview"><div class="builder-preview-head"><span class="builder-preview-icon" aria-hidden="true">${activityEditorIcon(isPhoto ? "edit" : "eye")}</span><div><strong>${previewTitle}</strong><small>${previewHint}</small></div></div><div class="builder-preview-body" data-builder-preview>${isExpanded ? renderBuilderPreview(block, index) : ""}</div>${isPhoto ? "" : `<p class="builder-preview-hint">${SlovaI18n.translate(currentLanguage === "ru" ? "Пробные ответы здесь не сохраняются." : currentLanguage === "ua" ? "Пробні відповіді тут не зберігаються." : "Practice answers here are not saved.", currentLanguage)}</p>`}</aside>`;
    const inlineActions = `<div class="builder-block-actions inline-activity-actions">
        <button type="button" class="button secondary small" data-cancel-inline-activity>${t("action.cancel")}</button>
        <button type="button" class="button small" data-save-inline-activity>${t("action.save")}</button>
    </div>`;
    return `<article class="builder-block has-preview ${isExpanded ? "is-expanded" : ""}" data-block-index="${index}" ${inline ? "data-inline-block-editor" : ""}>
        <header class="builder-block-header">
            ${inline ? "" : `<button type="button" class="builder-block-drag" aria-label="${lessonSectionText("moveBlock")}" title="${lessonSectionText("moveBlock")}">⠿</button>`}
            <div class="builder-block-title"><strong>${index + 1}. ${escapeHtml(type ? t(type.nameKey) : t("activity.task"))}${isExpanded && type ? `<span class="builder-block-badge">${escapeHtml(isRichText ? (currentLanguage === "ru" ? "Текстовый блок" : currentLanguage === "ua" ? "Текстовий блок" : "Text block") : type.category === "media" ? (currentLanguage === "ru" ? "Медиа" : currentLanguage === "ua" ? "Медіа" : "Media") : (currentLanguage === "ru" ? "Задание" : currentLanguage === "ua" ? "Завдання" : "Activity"))}</span>` : ""}</strong>${summary ? `<span class="builder-block-summary">${escapeHtml(summary)}</span>` : ""}<span class="builder-block-summary">${escapeHtml(meta)}</span></div>
            ${inline ? inlineActions : `<div class="builder-block-actions">
                ${duplicateBlockButton("data-duplicate-block", index)}
                <button type="button" class="mini-action builder-block-edit" data-toggle-block="${index}" aria-expanded="${isExpanded}" aria-label="${isExpanded ? lessonSectionText("done") : lessonSectionText("edit")}" title="${isExpanded ? lessonSectionText("done") : lessonSectionText("edit")}">${isExpanded ? "✓" : "✎"}</button>
                <button type="button" class="mini-action builder-block-delete" data-remove-block="${index}" aria-label="${lessonSectionText("remove")}" title="${lessonSectionText("remove")}">×</button>
            </div>`}
        </header>
        <p class="lesson-readiness-warning" data-block-readiness role="status" ${window.SlovaLessonReadiness?.incomplete(block)?'':'hidden'}>${window.SlovaLessonReadiness?.message(currentLanguage)||''}</p>
        <div class="builder-block-fields" ${isExpanded ? "" : "hidden"}>
            <div class="builder-block-editor">
            <div class="form-field"><label>${hasQuestions ? activityQuestionText("commonPrompt") : t("field.instruction")}</label><input data-field="prompt" value="${escapeHtml(block.prompt || "")}" placeholder="${t("field.instructionExample")}"></div>
            ${window.SlovaActivityAuthoring.render(block,currentLanguage)}
            ${hasQuestions || block.type === "true-false"
                ? `${block.type === "listening-questions" ? `<div class="form-field"><label>${t("field.mediaContent")}</label><textarea data-field="content" placeholder="https://…">${escapeHtml(block.content || "")}</textarea></div>` : ""}${renderActivityQuestionEditor(block)}`
                : block.type === "fill-blank" ? `${renderFillBlankEditor(block,"data-field",true)}${renderActivityQuestionEditor(block)}` : `<div class="form-field"><label>${type?.category === "media" ? t("field.mediaContent") : t("field.taskText")} <span class="hint">${block.type === "text" ? "" : escapeHtml(contentHint(block.type))}</span></label>
                ${["text", "fill-blank"].includes(block.type) ? richTextToolbar() : ""}
                <textarea data-field="content" placeholder="${escapeHtml(contentPlaceholder(block.type))}">${escapeHtml(window.SlovaExerciseFormat.editorContent(block))}</textarea>${block.type === "fill-blank" ? `<button type="button" class="button secondary small" data-hide-selected-word>${SlovaI18n.translate(currentLanguage === "ru" ? "Скрыть выделенное слово" : currentLanguage === "ua" ? "Приховати виділене слово" : "Hide selected word", currentLanguage)}</button>` : ""}                    ${block.type === "text" ? `<div class="image-upload-row rich-text-actions"><button type="button" class="button secondary small" data-pick-rich-image>${escapeHtml((imageUploadMessages[currentLanguage] || imageUploadMessages.ru).chooseFile)}</button><input type="file" accept="image/png,image/jpeg,image/webp,image/gif" multiple data-rich-image-file hidden><button type="button" class="button secondary small" data-rich-add-item>${SlovaI18n.translate(currentLanguage === "ru" ? "＋ Добавить пункт" : currentLanguage === "ua" ? "＋ Додати пункт" : "＋ Add item", currentLanguage)}</button></div>` : ""}${block.type === "image" ? `<div class="image-upload-row"><button type="button" class="button secondary small" data-pick-image>${escapeHtml((imageUploadMessages[currentLanguage] || imageUploadMessages.ru).chooseFile)}</button><input type="file" accept="image/png,image/jpeg,image/webp,image/gif" multiple data-image-file hidden></div><small class="hint">${escapeHtml((imageUploadMessages[currentLanguage] || imageUploadMessages.ru).galleryHint)}</small>` : ""}${["audio", "video"].includes(block.type) ? `<div class="image-upload-row"><button type="button" class="button secondary small" data-pick-media>${SlovaI18n.translate(currentLanguage === "ru" ? "Загрузить файл" : currentLanguage === "ua" ? "Завантажити файл" : "Upload file", currentLanguage)}</button><input type="file" accept="${block.type}/*" data-media-file hidden></div><small class="hint">${SlovaI18n.translate(currentLanguage === "ru" ? "До 50 МБ; поддерживаются MP3/M4A/WAV/OGG/AAC и MP4/WebM/MOV." : currentLanguage === "ua" ? "До 50 МБ; підтримуються MP3/M4A/WAV/OGG/AAC і MP4/WebM/MOV." : "Up to 50 MB; MP3/M4A/WAV/OGG/AAC and MP4/WebM/MOV supported.", currentLanguage)}</small>` : ""}</div>
                ${renderActivityAnswerField(block)}
                ${renderActivityQuestionEditor(block)}`}
                    ${activityMetadataEditor(block)}${activitySettingsField(block)}
            </div>
            ${preview}
        </div>
    </article>`;
}

function previewActivityEditButton(index) {
    const label = escapeHtml(lessonSectionText("edit"));
    return `<button type="button" class="mini-action preview-block-edit" data-edit-preview-block="${index}" aria-label="${label}" title="${label}">${activityEditorIcon("edit")}</button>`;
}

function activityEditorIcon(name) {
    const paths = {
        edit: '<path d="m14.5 5.5 4 4M4 20l4.5-1 11-11a2.8 2.8 0 0 0-4-4l-11 11L4 20Z"/>',
        eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
        list: '<path d="M9 6h12M9 12h12M9 18h12"/><circle cx="3" cy="6" r=".8"/><circle cx="3" cy="12" r=".8"/><circle cx="3" cy="18" r=".8"/>',
        numbered: '<path d="M9 6h12M9 12h12M9 18h12M2 4h2v5M2 9h4M2 14c0-3 4-3 4-1 0 1-4 4-4 4h4"/>',
        left: '<path d="M3 5h18M3 10h11M3 15h18M3 20h11"/>',
        center: '<path d="M3 5h18M7 10h10M3 15h18M7 20h10"/>',
        right: '<path d="M3 5h18M10 10h11M3 15h18M10 20h11"/>',
        link: '<path d="m10 13 4-4M8 16l-1 1a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0M16 8l1-1a4 4 0 0 1 6 6l-5 5a4 4 0 0 1-6 0" transform="translate(1 0) scale(.9)"/>'
    };
    return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[name] || paths.list}</svg>`;
}

function renderBuilderPreview(block, index) {
    if (block.type === "text" && !block.questions?.length) return previewRichContent(block);
    if (block.type === "image" && !block.questions?.length && window.SlovaPhotoEditor) {
        const images = window.slovaGallery.parse(block.content, true);
        if (images.length) return window.SlovaPhotoEditor.markup(images, {}, block.settings?.imageAnnotations, true, currentLanguage, {direct: true, authorFields: true});
    }
    return renderPreviewActivity(block, index, false, false, "", null, true);
}

function previewRichContent(block) {
    const content = String(block.content || "");
    const note = window.SlovaActivityUI?.renderNote(content, block.prompt, block.settings);
    if (note) return note;
    const rendered = window.SlovaActivityUI?.renderRichText(content);
    return `<h3>${escapeHtml(block.prompt || '')}</h3>${window.SlovaActivityUI.renderMetadata(block)}${rendered || `<div class="preview-material">${escapeHtml(content).replace(/\n/g, "<br>")}</div>`}`;
}

function renderFillBlankEditor(activity, field = "data-field", rich = false) {
    const source = `<div class="form-field"><label>${t("field.taskText")} <span class="hint">${escapeHtml(contentHint("fill-blank"))}</span></label>${rich ? richTextToolbar() : ""}<textarea ${field}="content" placeholder="${escapeHtml(contentPlaceholder("fill-blank"))}">${escapeHtml(window.SlovaExerciseFormat.editorContent({...activity,type:"fill-blank"}))}</textarea>${rich ? `<button type="button" class="button secondary small" data-hide-selected-word>${SlovaI18n.translate(currentLanguage === "ru" ? "Скрыть выделенное слово" : currentLanguage === "ua" ? "Приховати виділене слово" : "Hide selected word",currentLanguage)}</button>` : ""}</div>`;
    return window.SlovaPictureGapEditor.render(activity,currentLanguage,source);
}

function contentHint(type) {
    return window.SlovaActivityAuthoring.get(type,currentLanguage)?.hint || '';
}

function richTextToolbar() {
    const labels = SlovaI18n.locales({
        ua: { toolbar: "Форматування тексту", style: "Стиль", normal: "Звичайний текст", size: "Розмір", accent: "Колір акценту", align: "Вирівнювання", left: "Ліворуч", center: "По центру", right: "Праворуч", bold: "Жирний", italic: "Курсив", underline: "Підкреслення", strike: "Закреслення", bullet: "Маркований список", numbered: "Нумерований список", quote: "Цитата", info: "Інформаційний блок", link: "Посилання", heading: "Заголовок" },
        ru: { toolbar: "Форматирование текста", style: "Стиль", normal: "Обычный текст", size: "Размер", accent: "Цвет акцента", align: "Выравнивание", left: "Слева", center: "По центру", right: "Справа", bold: "Жирный", italic: "Курсив", underline: "Подчёркивание", strike: "Зачёркивание", bullet: "Маркированный список", numbered: "Нумерованный список", quote: "Цитата", info: "Информационный блок", link: "Ссылка", heading: "Заголовок" },
        en: { toolbar: "Text formatting", style: "Style", normal: "Normal text", size: "Size", accent: "Accent color", align: "Alignment", left: "Left", center: "Center", right: "Right", bold: "Bold", italic: "Italic", underline: "Underline", strike: "Strikethrough", bullet: "Bulleted list", numbered: "Numbered list", quote: "Quote", info: "Information block", link: "Link", heading: "Heading" }
    });
    const text = labels[currentLanguage] || labels.en;
    const aria = (value) => escapeHtml(value);
    const formatButton = (format, label, icon) => `<button type="button" data-rich-format="${aria(format)}" aria-label="${aria(label)}" title="${aria(label)}">${icon}</button>`;
    const sizes = [12, 14, 16, 18, 20, 24, 28, 32, 36];
    const accents = ["#34724d", "#f4d35e", "#f4778b", "#4dabf7", "#a855f7"];
    return `<div class="rich-text-toolbar" role="toolbar" aria-label="${aria(text.toolbar)}">
        <div class="rich-toolbar-row rich-toolbar-main">
            ${formatButton("**", text.bold, "<strong>B</strong>")}
            ${formatButton("*", text.italic, "<em>I</em>")}
            ${formatButton("[u]", text.underline, "<u>U</u>")}
            ${formatButton("[s]", text.strike, "<s>S</s>")}
            ${formatButton("list", text.bullet, activityEditorIcon("list"))}
            ${formatButton("numbered", text.numbered, activityEditorIcon("numbered"))}
            ${formatButton("quote", text.quote, "❝")}
            ${formatButton("link", text.link, activityEditorIcon("link"))}
            ${formatButton("[info]", text.info, "ⓘ")}
            ${formatButton("[border]", SlovaI18n.translate(currentLanguage === "ru" ? "Обводка" : currentLanguage === "ua" ? "Обведення" : "Outline", currentLanguage), "▣")}
            ${[1, 2, 3].map((level) => formatButton(`${"#".repeat(level)} `, `${text.heading} ${level}`, `H${level}`)).join("")}
        </div>
        <div class="rich-toolbar-row rich-toolbar-options">
            <label class="rich-toolbar-group"><span>${aria(text.style)}</span><select data-rich-style aria-label="${aria(text.style)}">
                <option value="normal">${aria(text.normal)}</option><option value="h1">${aria(text.heading)} 1</option><option value="h2">${aria(text.heading)} 2</option><option value="h3">${aria(text.heading)} 3</option>
            </select></label>
            <label class="rich-toolbar-group"><span>${aria(text.size)}</span><select data-rich-size aria-label="${aria(text.size)}">
                <option value="">${aria(text.normal)}</option>${sizes.map((size) => `<option value="${size}">${size}px</option>`).join("")}
            </select></label>
            <div class="rich-toolbar-group rich-accent-group"><span>${aria(text.accent)}</span><div class="rich-accent-colors">
                ${accents.map((color, index) => `<button type="button" class="rich-accent-swatch ${index === 0 ? "is-selected" : ""}" data-rich-color="${color}" style="--accent-color:${color}" aria-label="${aria(text.accent)} ${index + 1}" title="${aria(text.accent)}: ${color}"></button>`).join("")}
            </div></div>
            <label class="rich-toolbar-group"><span>${SlovaI18n.translate(currentLanguage === "ru" ? "Подсветка" : currentLanguage === "ua" ? "Підсвічування" : "Highlight", currentLanguage)}</span><input type="color" data-rich-highlight value="#fff19c" aria-label="${SlovaI18n.translate(currentLanguage === "ru" ? "Цвет подсветки" : currentLanguage === "ua" ? "Колір підсвічування" : "Highlight color", currentLanguage)}"></label>
            <div class="rich-toolbar-group rich-align-group"><span>${aria(text.align)}</span><div class="rich-align-buttons">
                ${formatButton("[align=left]", text.left, activityEditorIcon("left"))}${formatButton("[align=center]", text.center, activityEditorIcon("center"))}${formatButton("[align=right]", text.right, activityEditorIcon("right"))}
            </div></div>
        </div>
    </div>`;
}

function contentPlaceholder(type) {
    const guide=window.SlovaActivityAuthoring.get(type,currentLanguage);
    return guide?.insertable ? guide.example : '';
}

function renderActivityAnswerField() { return ""; }

function preventLessonInputSubmit(event) {
    if(event.key==='Enter'&&event.target.matches('input:not([type="submit"])'))event.preventDefault();
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
        "fill-blank": { hints: ["Sloveso bývať"], caseSensitive: false },
        "multiple-choice": { randomizeOptions: true },
        "one-of-many": {},
        "order-items": {},
        "sentence-order": { autoSplitSentences: false },
        "true-false": { allowNotStated: true, explanation: "Informácia v texte chýba." },
        table: { cellOptions: { "0": ["Bratislava", "Košice"] } },
        match: { distractors: ["nesprávna možnosť"] },
        columns: {},
        "open-answer": { allowAttachments: ["image", "audio"] },
        flashcards: { shuffle: true },
        audio: { transcript: "Prepis hovoreného textu.", hideTranscript: true },
        video: { transcript: "Video transcript.", hideTranscript: true },
        "listening-questions": { maxPlays: 3, transcript: "Transcript shown after the questions.", transcriptAfterSubmit: true },
        "find-error": { caseSensitive: false },
        "interactive-image": { hotspots: [{ x: 35, y: 48, word: "dom", translation: "house" }] },
        "pronunciation-recording": { maxSeconds: 60 }
    };
    return JSON.stringify(examples[type] || {}, null, 2);
}

function activityMetadataEditor(activity, preview = false) {
    const text = window.SlovaLessonImportUI.labels(currentLanguage);
    const headerLabels={ru:'Названия столбцов через /',ua:'Назви стовпців через /',en:'Column names separated by /',sk:'Názvy stĺpcov oddelené /',kk:'Баған атаулары / арқылы'};
    const headers=activity.type==='table'?`<div class="form-field"><label>${escapeHtml(headerLabels[currentLanguage]||headerLabels.en)}<input data-table-headers maxlength="2000" value="${escapeHtml(window.SlovaTable.parse(activity.content,activity.answer,activity.settings).headers.join(' / '))}" placeholder="Meno / Mesto / Jazyk"></label></div>`:'';
    return `${headers}<details class="activity-metadata-settings"><summary>${escapeHtml(text[17])} / ${escapeHtml(text[18])}</summary>${['description', 'helperText'].map((field, index) => `<div class="form-field"><label>${escapeHtml(text[17 + index])}<textarea data-activity-meta="${field}" maxlength="2000" data-meta-preview="${preview}">${escapeHtml(activity.settings?.[field] || '')}</textarea></label></div>`).join('')}</details>`;
}

function activitySettingsField(activity, preview = false) {
    if (activity.type === "text") return window.SlovaLessonNotes?.controls(activity, currentLanguage) || "";
    if (activity.type === "true-false" && !Object.keys(activity.settings || {}).length) return "";
    if (["vocabulary", "phrase-list"].includes(activity.type)) return "";
    const field = preview ? "data-preview-field" : "data-field";
    const settings = activity.settings && typeof activity.settings === "object" && !Array.isArray(activity.settings)
        ? activity.settings
        : {};
    const text = SlovaI18n.locales({
        ru: { title: "Расширенные настройки", label: "Технические настройки (JSON)", help: "Необязательные правила проверки, подсказки и медиа. Для обычного задания этот раздел можно не открывать. Метки интерактивного изображения задаются здесь в hotspots. Пример структуры — в подсказке поля; существующие настройки сохраняйте." },
        ua: { title: "Розширені налаштування", label: "Технічні налаштування (JSON)", help: "Необов’язкові правила перевірки, підказки та медіа. Для звичайного завдання цей розділ можна не відкривати. Мітки інтерактивного зображення задаються тут у hotspots. Приклад структури — у підказці поля; зберігайте наявні налаштування." },
        en: { title: "Advanced settings", label: "Technical settings (JSON)", help: "Optional checking rules, hints and media. Ordinary activities do not require editing this section. Interactive image markers are configured here in hotspots. The field placeholder shows an example structure; preserve existing settings." },
        sk: { title: "Rozšírené nastavenia", label: "Technické nastavenia (JSON)", help: "Nepovinné pravidlá kontroly, pomôcky a médiá. Bežná úloha nevyžaduje úpravu tejto časti. Značky interaktívneho obrázka sa nastavujú v hotspots. Príklad štruktúry je v poli; zachovajte existujúce nastavenia." },
        kk: { title: "Кеңейтілген параметрлер", label: "Техникалық параметрлер (JSON)", help: "Міндетті емес тексеру ережелері, көмек және медиа. Қарапайым тапсырма үшін бұл бөлімді ашу қажет емес. Интерактивті сурет белгілері hotspots ішінде бапталады. Өрісте құрылым үлгісі бар; бар параметрлерді сақтаңыз." }
    })[currentLanguage] || { title: "Advanced settings", label: "Technical settings (JSON)", help: "Optional technical settings. Existing values are preserved." };
    return `<details class="activity-advanced-settings"><summary>${text.title}</summary><div class="form-field"><p class="activity-settings-help">${text.help}</p><label>${text.label}</label><textarea ${field}="settings" spellcheck="false" aria-label="${text.label}" placeholder="${escapeHtml(activitySettingsPlaceholder(activity.type))}">${escapeHtml(JSON.stringify(settings, null, 2))}</textarea><small data-settings-error class="hint" role="status"></small></div></details>`;
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
    pageContent.querySelectorAll("#activityBlocks .builder-block").forEach(blockElement => {
        bindActivityEditor(blockElement, () => activeDraftSection().activities[Number(blockElement.dataset.blockIndex)]);
    });

    if (blocksContainer) bindSortableActivityCards(blocksContainer, ".builder-block", ".builder-block-drag", "blockIndex", (order) => {
        const reordered = order.map((index) => activities[index]);
        activities.splice(0, activities.length, ...reordered);
        scheduleLessonDraftAutosave();
        render();
    });
}

function bindActivityEditor(blockElement, currentBlock, onChange = scheduleLessonDraftAutosave) {
    const previewBox = blockElement.querySelector("[data-builder-preview]");
    let visualEditor = null;
    const refreshRichPreview = () => {
        visualEditor?.refresh();
        const warning=blockElement.querySelector('[data-block-readiness]');
        if(warning)warning.hidden=!window.SlovaLessonReadiness?.incomplete(currentBlock());
        if (!previewBox || !blockElement.classList.contains("is-expanded")) return;
        const scrollTop = previewBox.scrollTop;
        previewBox.innerHTML = renderBuilderPreview(currentBlock(), Number(blockElement.dataset.blockIndex));
        bindLessonPreviewActions(previewBox);
        previewBox.scrollTop = scrollTop;
    };
    blockElement.querySelectorAll(".builder-block-editor [data-field]").forEach((input) => input.addEventListener("input", () => {
        const block = currentBlock();
        const questionElement = input.closest("[data-question-index]");
        if (questionElement && Array.isArray(block.questions)) {
            const question = block.questions[Number(questionElement.dataset.questionIndex)];
            if (question) {
                question[input.dataset.field] = input.value;
                if(input.dataset.field==="content"||block.type==="true-false")window.SlovaExerciseFormat.applyQuestionContent(block,question,input.value);
                if(input.dataset.field === "content" && window.SlovaExerciseFormat.sequenceTypes.includes(block.type)) question.answer=window.SlovaExerciseFormat.sequenceAnswer(block.type,question.content);
                onChange();
            }
        } else if (input.dataset.field === "settings") {
            if (!updateActivitySettings(block, input)) return;
            onChange();
        } else {
            block[input.dataset.field] = input.value;
            if(input.dataset.field === "content") window.SlovaExerciseFormat.applyContent(block,input.value);
            if (["vocabulary", "phrase-list"].includes(block.type) && input.dataset.field === "content") {
                block.settings = { ...block.settings, vocabularyFormat: "slash", words: window.SlovaPhraseList.parse(window.SlovaExerciseFormat.prepare(block).content) };
            }
            onChange();
        }
        const legacy=(questionElement||blockElement).querySelector('[data-legacy-answer-field]');
        if(legacy)legacy.hidden=!window.SlovaExerciseFormat.answerFieldNeeded(questionElement?{...block.questions[Number(questionElement.dataset.questionIndex)],type:block.type,settings:block.settings}:block);
        refreshRichPreview();
    }));
    if (blockElement.classList.contains('is-expanded')) window.SlovaActivitySettingsUI?.bind(blockElement.querySelector('.builder-block-editor'),currentBlock(),()=>{
        onChange();refreshRichPreview();
        const settingsField=blockElement.querySelector('textarea[data-field="settings"]');if(settingsField)settingsField.value=JSON.stringify(currentBlock().settings||{},null,2);
    },currentLanguage);
    blockElement.querySelectorAll('.builder-block-editor [data-question-index]').forEach(questionHost=>{
        const block=currentBlock(),question=block.questions?.[Number(questionHost.dataset.questionIndex)];
        if(!question)return;
        const visual={...question,type:block.type==='listening-questions'?'multiple-choice':block.type,settings:{...block.settings,...question.settings}};
        window.SlovaActivitySettingsUI?.bind(questionHost,visual,()=>{
            question.content=visual.content;question.answer=visual.answer;question.settings=visual.settings;
            onChange();refreshRichPreview();
        },currentLanguage);
    });
    const contentField = currentBlock().questions?.length ? null : blockElement.querySelector('.builder-block-editor textarea[data-field="content"]');
    const uploadImage = (...args) => trackInlineActivityUpload(blockElement, () => uploadLessonImage(...args));
    if (["text", "fill-blank"].includes(currentBlock().type)) visualEditor = window.SlovaRichEditor?.attach(blockElement, contentField, window.SlovaActivityUI.renderRichText, { upload: uploadImage, error: error => showToast(error.message || String(error)) });
    contentField?.addEventListener('slova-source-sync', () => visualEditor?.refresh());
    if (previewBox && blockElement.classList.contains("is-expanded")) bindLessonPreviewActions(previewBox);
    const applyRichFormat = (prefix, suffix = "", linePrefix = false) => {
        if (!contentField) return;
        const start = contentField.selectionStart;
        const end = contentField.selectionEnd;
        const selected = contentField.value.slice(start, end) || (SlovaI18n.translate(currentLanguage === "ru" ? "текст" : "text", currentLanguage));
        const lines = selected.split(/\r?\n/);
        const replacement = lines.map((line) => linePrefix ? `${prefix}${line}` : `${prefix}${line}${suffix}`).join("\n");
        contentField.setRangeText(replacement, start, end, "select");
        contentField.focus();
        contentField.setSelectionRange(start, start + replacement.length);
        currentBlock().content = contentField.value;
        onChange();
        refreshRichPreview();
    };
    const syncRichContent = () => {
        if (!contentField) return;
        currentBlock().content = contentField.value;
        onChange();
        refreshRichPreview();
    };
    blockElement.querySelectorAll("[data-rich-format]").forEach((button) => button.addEventListener("click", () => {
        const textarea = contentField;
        if (!textarea) return;
        const format = button.dataset.richFormat;
        const wrappers = { "[u]": "[/u]", "[s]": "[/s]", "[border]": "[/border]" };
        if (format === "**" || format === "*") applyRichFormat(format, format);
        else if (wrappers[format]) applyRichFormat(format, wrappers[format]);
        else if (format === "list") applyRichFormat("- ", "", true);
        else if (format === "numbered") applyRichFormat("1. ", "", true);
        else if (format === "quote") applyRichFormat("> ", "", true);
        else if (format === "[info]") {
            const existingInfo = textarea.value.match(/^\s*\[info\]\s*\n?/i);
            if (existingInfo) textarea.setRangeText("", 0, existingInfo[0].length);
            else textarea.setRangeText(`[info]\n${textarea.value}`, 0, textarea.value.length, "end");
            textarea.focus();
            syncRichContent();
        }
        else if (/^#/.test(format)) applyRichFormat(format, "", true);
        else if (format.startsWith("[align=")) {
            const align = format.match(/^\[align=(left|center|right)\]$/)?.[1];
            if (align) applyRichFormat(format, "[/align]");
        }
        else if (format === "link") {
            const selectionStart = textarea.selectionStart;
            const selectionEnd = textarea.selectionEnd;
            const selected = textarea.value.slice(selectionStart, selectionEnd) || (SlovaI18n.translate(currentLanguage === "ru" ? "текст" : "text", currentLanguage));
            const linkUrl = window.prompt(SlovaI18n.translate(currentLanguage === "ru" ? "Введите URL ссылки (https://…)" : currentLanguage === "ua" ? "Введіть URL посилання (https://…)" : "Enter a link URL (https://…)", currentLanguage), "https://");
            if (linkUrl === null) return;
            try {
                const url = new URL(linkUrl);
                if (!["http:", "https:"].includes(url.protocol)) throw new Error("Unsupported link protocol");
                textarea.setRangeText(`[${selected.replace(/[\[\]()]/g, "")}](${url.href})`, selectionStart, selectionEnd, "select");
                textarea.focus();
                syncRichContent();
            } catch {
                showToast(SlovaI18n.translate(currentLanguage === "ru" ? "Введите корректную ссылку, начинающуюся с http:// или https://." : currentLanguage === "ua" ? "Введіть коректне посилання, що починається з http:// або https://." : "Enter a valid link starting with http:// or https://.", currentLanguage));
            }
        }
        else {
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const selected = textarea.value.slice(start, end) || (SlovaI18n.translate(currentLanguage === "ru" ? "текст" : "text", currentLanguage));
            const label = selected.trim().replace(/\s+/g, " ").replace(/[\[\]()]/g, "");
            const value = format.startsWith("![") ? `![${label}](https://)` : `[${label}](https://)`;
            textarea.setRangeText(value, start, end, "select");
            textarea.focus();
            syncRichContent();
        }
    }));
    blockElement.querySelectorAll("[data-rich-style]").forEach((styleSelect) => styleSelect.addEventListener("change", (event) => {
        const style = event.currentTarget.value;
        if (!style) return;
        const prefixes = { normal: "", h1: "# ", h2: "## ", h3: "### ", list: "- " };
        const prefix = prefixes[style];
        const start = contentField.selectionStart;
        const end = contentField.selectionEnd;
        const selected = contentField.value.slice(start, end) || (SlovaI18n.translate(currentLanguage === "ru" ? "текст" : "text", currentLanguage));
        const lines = selected.split(/\r?\n/).map((line) => line.replace(/^#{1,3}\s+/, ""));
        const replacement = lines.map((line) => `${prefix}${line}`).join("\n");
        contentField.setRangeText(replacement, start, end, "select");
        contentField.focus();
        syncRichContent();
        event.currentTarget.value = "";
    }));
    blockElement.querySelector("[data-rich-size]")?.addEventListener("change", (event) => {
        const size = event.currentTarget.value;
        if (/^(12|14|16|18|20|24|28|32|36)$/.test(size)) applyRichFormat(`[size=${size}]`, "[/size]");
        event.currentTarget.value = "";
    });
    blockElement.querySelectorAll("[data-rich-color]").forEach((swatch) => swatch.addEventListener("click", () => {
        const color = swatch.dataset.richColor;
        if (!/^#[\da-f]{6}$/i.test(color)) return;
        blockElement.querySelectorAll(".rich-accent-swatch").forEach((item) => item.classList.toggle("is-selected", item === swatch));
        applyRichFormat(`[color=${color}]`, "[/color]");
    }));
    blockElement.querySelector("[data-rich-highlight]")?.addEventListener("change", (event) => {
        const color = event.currentTarget.value;
        if (/^#[\da-f]{6}$/i.test(color)) applyRichFormat(`[highlight=${color}]`, "[/highlight]");
    });
    blockElement.querySelector("[data-rich-align]")?.addEventListener("change", (event) => {
        const align = event.currentTarget.value;
        if (/^(left|center|right)$/.test(align)) applyRichFormat(`[align=${align}]`, "[/align]", false);
        event.currentTarget.value = "";
    });
    blockElement.querySelector("[data-rich-add-item]")?.addEventListener("click", () => {
        if (!contentField) return;
        const position = contentField.selectionStart;
        const before = contentField.value.slice(0, position);
        const separator = before && !before.endsWith("\n") ? "\n" : "";
        contentField.setRangeText(`${separator}- `, position, position, "end");
        contentField.focus();
        syncRichContent();
    });
    blockElement.querySelector("[data-hide-selected-word]")?.addEventListener("click", () => {
        if (!contentField) return;
        const start = contentField.selectionStart;
        const end = contentField.selectionEnd;
        const selected = contentField.value.slice(start, end).trim();
        if (!selected || selected.includes("___")) {
            showToast(SlovaI18n.translate(currentLanguage === "ru" ? "Сначала выделите слово в тексте." : "Select a word in the text first.", currentLanguage));
            return;
        }
        const block = currentBlock();
        const inserted = window.SlovaFillBlanks.insert(contentField.value, block.answer, block.settings, start, end);
        if (!inserted) return;
        Object.assign(block, inserted);
        contentField.value = inserted.content;
        contentField.setSelectionRange(start, start + 3);
        const answerField = blockElement.querySelector('[data-field="answer"]');
        if (answerField) answerField.value = inserted.answer;
        onChange();
        refreshRichPreview();
    });
    const richImageInput = blockElement.querySelector("[data-rich-image-file]");
    blockElement.querySelector("[data-pick-rich-image]")?.addEventListener("click", () => richImageInput?.click());
    richImageInput?.addEventListener("change", async () => {
        const files = window.SlovaImageInput.files(richImageInput);
        richImageInput.value = "";
        if (!files.length || !contentField) return;
        if (visualEditor) { await visualEditor.insertImages(files); return; }
        let position = contentField.selectionStart;
        try {
            richImageInput.disabled = true;
            for (const file of files) {
            const url = await uploadImage(file);
                const image = `![${(file.name || '').replace(/[\[\]()]/g, "").slice(0, 100) || "Image"}](${url})`;
                contentField.setRangeText(`${position > 0 && contentField.value[position - 1] !== "\n" ? "\n" : ""}${image}\n`, position, position, "end");
                position = contentField.selectionStart;
            }
            currentBlock().content = contentField.value;
            onChange();
            refreshRichPreview();
        } catch (error) {
            console.error("Could not upload an inline lesson image.", error);
            showToast(error.message || (SlovaI18n.translate(currentLanguage === "ru" ? "Не удалось загрузить изображение." : "Could not upload the image.", currentLanguage)));
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
            showToast(SlovaI18n.translate(currentLanguage === "ru" ? "Загружаю медиафайл…" : "Uploading media…", currentLanguage));
            const url = await trackInlineActivityUpload(blockElement, () => uploadLessonMedia(file));
            contentField.value = url;
            currentBlock().content = url;
            onChange();
            refreshRichPreview();
        } catch (error) {
            console.error("Could not upload lesson media.", error);
            showToast(error.message || (SlovaI18n.translate(currentLanguage === "ru" ? "Не удалось загрузить медиафайл." : "Could not upload media.", currentLanguage)));
        } finally {
            mediaFileInput.disabled = false;
        }
    });
    if (contentField && currentBlock()?.type === "image") {
        const photoInteraction = document.createElement('label');
        photoInteraction.className = 'photo-interaction-option';
        const photoEnabled = document.createElement('input');
        photoEnabled.type = 'checkbox';
        photoEnabled.dataset.photoInteractiveToggle = '';
        photoEnabled.checked = window.SlovaPhotoAnnotations.isInteractive(currentBlock());
        const photoLabels = SlovaI18n.locales({
            ru: ['Разрешить ученику писать на фото', 'Когда включено, фото входит в прогресс урока.'],
            ua: ['Дозволити учню писати на фото', 'Коли ввімкнено, фото зараховується до прогресу уроку.'],
            en: ['Let the student write on the photo', 'When enabled, the photo counts towards lesson progress.'],
            sk: ['Povoliť žiakovi písať do obrázka', 'Keď je táto možnosť zapnutá, obrázok sa započítava do pokroku v lekcii.'],
            kk: ['Оқушыға фотосуретке жазуға рұқсат беру', 'Қосылғанда фотосурет сабақ барысына есептеледі.']
        });
        const [photoLabel, photoHelp] = photoLabels[currentLanguage] || photoLabels.en;
        const photoDescription = document.createElement('small');
        photoDescription.textContent = photoHelp;
        photoInteraction.append(photoEnabled, document.createTextNode(photoLabel), photoDescription);
        const photoSettings = blockElement.querySelector('[data-field="settings"]');
        const savePhotoSettings = (settings) => {
            currentBlock().settings = { ...currentBlock().settings, ...settings };
            if (photoSettings) photoSettings.value = JSON.stringify(currentBlock().settings, null, 2);
            onChange();
        };
        photoEnabled.addEventListener('change', () => {
            savePhotoSettings({photoInteractive: photoEnabled.checked});
        });
        photoSettings?.addEventListener('input', () => { photoEnabled.checked = window.SlovaPhotoAnnotations.isInteractive(currentBlock()); });
        contentField.after(photoInteraction);
        previewBox?.addEventListener("photo-change", () => {
            savePhotoSettings({imageAnnotations: window.SlovaPhotoEditor.value(previewBox)});
            photoEnabled.checked = window.SlovaPhotoAnnotations.isInteractive(currentBlock());
        });
        const imagesFrom = (files) => window.SlovaImageInput.files({ files });
        const skipped = new Set();
        const attachFiles = (files) => trackInlineActivityUpload(blockElement, async () => {
            for (const file of files) await attachImageToBlock(file, contentField, currentBlock());
            onChange();
            refreshRichPreview();
        });
        const importAddresses = async () => {
            if (contentField.dataset.importing) return;
            const pending = contentField.value.split(/\r?\n/).map((line) => line.trim())
                .filter((line) => /^https?:\/\/\S+$/i.test(line) && !ownImageUrlPattern.test(line) && !skipped.has(line));
            if (!pending.length) return;
            contentField.dataset.importing = "true";
            await trackInlineActivityUpload(blockElement, async () => {
                try {
                    for (const address of pending) {
                        currentBlock().content = contentField.value;
                        if (!(await attachImageToBlock(null, contentField, currentBlock(), address))) skipped.add(address);
                    }
                } finally {
                    delete contentField.dataset.importing;
                    if (photoSettings) photoSettings.value = JSON.stringify(currentBlock().settings || {}, null, 2);
                    onChange();
                    refreshRichPreview();
                }
            });
        };
        contentField.placeholder = (imageUploadMessages[currentLanguage] || imageUploadMessages.en).pasteHint;
        contentField.addEventListener("paste", (event) => {
            const files = window.SlovaImageInput.files(event.clipboardData);
            if (files.length) {
                event.preventDefault();
                attachFiles(files);
            } else setTimeout(importAddresses);
        });
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
}

async function trackInlineActivityUpload(element, upload) {
    const edit = element.hasAttribute("data-inline-block-editor") ? previewActivityEdit : null;
    if (!edit) return upload();
    edit.uploads += 1;
    syncInlineActivityControls();
    try {
        return await upload();
    } finally {
        edit.uploads -= 1;
        if (previewActivityEdit === edit) syncInlineActivityControls();
    }
}

function activityAuthoringContext(element) {
    const block = element.closest('[data-block-index]');
    const inline = block?.dataset.inlineBlockEditor !== undefined;
    const activity = block && !inline ? activeDraftSection()?.activities[Number(block.dataset.blockIndex)] : previewActivityEdit?.draft;
    const question = element.closest('[data-question-index], [data-preview-question-index]');
    const index = question ? Number(question.dataset.questionIndex ?? question.dataset.previewQuestionIndex) : -1;
    return { block, activity, inline, target: question ? activity?.questions?.[index] : activity };
}

function refreshActivityAuthoring(element, context) {
    const editor = element.closest('.builder-block-editor, .preview-inline-editor');
    const settings = editor?.querySelector('[data-field="settings"], [data-preview-field="settings"]');
    if (settings) settings.value = JSON.stringify(context.activity.settings || {}, null, 2);
    if (!context.block) return;
    if (!context.inline) scheduleLessonDraftAutosave();
    const warning = context.block.querySelector('[data-block-readiness]');
    if (warning) warning.hidden = !window.SlovaLessonReadiness?.incomplete(context.activity);
    const preview = context.block.querySelector('[data-builder-preview]');
    if (preview) {
        const position = preview.scrollTop;
        preview.innerHTML = renderBuilderPreview(context.activity, Number(context.block.dataset.blockIndex));
        bindLessonPreviewActions(preview);
        preview.scrollTop = position;
    }
}

function bindActivityAuthoring(root) {
    const uploadScope = root.querySelector?.("[data-inline-block-editor]") || root;
    window.SlovaPictureGapEditor.bind(root, {
        upload: file => trackInlineActivityUpload(uploadScope, () => uploadLessonImage(file)),
        settings: element => activityAuthoringContext(element).activity?.settings || {},
        change(element, update) {
            const context = activityAuthoringContext(element);
            if (!context.activity || !context.target) return;
            if (update.content !== undefined) {
                if (context.target === context.activity) window.SlovaExerciseFormat.applyContent(context.activity, update.content);
                else window.SlovaExerciseFormat.applyQuestionContent(context.activity, context.target, update.content);
                const source = element.querySelector('textarea[data-field="content"],textarea[data-preview-field="content"],textarea[data-preview-question-field="content"]');
                source.value = update.content;
                source.dispatchEvent(new Event('slova-source-sync'));
            }
            if (update.settings) context.activity.settings = {...context.activity.settings, ...update.settings};
            refreshActivityAuthoring(element, context);
        }
    });
    root.querySelectorAll('[data-authoring-example]').forEach(button => button.addEventListener('click', () => {
        const {activity, block, inline} = activityAuthoringContext(button);
        if (!activity) return;
        if (inline && previewActivityEdit.uploads) return;
        const labels = window.SlovaActivityAuthoring.labels[currentLanguage] || window.SlovaActivityAuthoring.labels.en;
        if (!window.SlovaActivityAuthoring.applyExample(activity, currentLanguage)) {
            button.closest('[data-authoring-help]').querySelector('[data-authoring-message]').textContent = labels[4];
            return;
        }
        if (inline) renderInlineActivityEditor(block);
        else {
            if (block) scheduleLessonDraftAutosave();
            render();
        }
        showToast(labels[5]);
    }));
}

function bindBlankCardSettings(root) {
    root.querySelectorAll('[data-table-headers]').forEach(input=>input.addEventListener('input',()=>{
        const context = activityAuthoringContext(input), { activity } = context;
        if (!activity) return;
        window.SlovaTable.setHeaders(activity, input.value);
        const editor = input.closest('.builder-block-editor');
        const content = editor?.querySelector('[data-field="content"]');
        if (content) content.value = window.SlovaExerciseFormat.editorContent(activity);
        refreshActivityAuthoring(input, context);
    }));
    root.querySelectorAll('[data-activity-meta]').forEach(input => input.addEventListener('input', () => {
        const context = activityAuthoringContext(input), { activity } = context;
        if (!activity) return;
        activity.settings = {...activity.settings, [input.dataset.activityMeta]:input.value};
        refreshActivityAuthoring(input, context);
    }));

}

function bindLessonNotes(root) {
    root.querySelectorAll('[data-note-setting]').forEach(input => input.addEventListener('change', () => {
        const { block, activity, inline } = activityAuthoringContext(input);
        if (!activity) return;
        if (inline && previewActivityEdit.uploads) return;
        activity.settings = { ...activity.settings, [input.dataset.noteSetting]: input.type === 'checkbox' ? input.checked : input.value };
        if (input.dataset.noteSetting === 'note' && !input.checked) activity.content = activity.content.replace(/^\s*\[(info|star)\]\s*\n?/i, '');
        if (inline) renderInlineActivityEditor(block);
        else if (block) { scheduleLessonDraftAutosave(); render(); }
    }));
    root.querySelectorAll('[data-insert-note]').forEach(button => button.addEventListener('click', () => {
        if (!hasPermission('edit_lessons')) return;
        if (lessonWorkspaceMode !== 'edit') {
            const lesson = data.lessons.find(item => item.id === workspaceLessonId);
            if (!lesson) return;
            openLessonEditor(lesson, lessonWorkspaceTab === 'homework' ? activeHomeworkSectionId : activeLessonSectionId, -1, lessonWorkspaceTab);
        }
        const activity = { id: crypto.randomUUID(), type: 'text', prompt: window.SlovaLessonNotes.text(currentLanguage)[0], content: '', answer: '', settings: {note:true,noteColor:'#e4ae16',studentVisible:true} };
        const index = Number(button.dataset.insertNote);
        activeDraftSection().activities.splice(index, 0, activity);
        expandedActivityBlocks.add(activity);
        lessonWorkspaceMode = 'edit';
        scheduleLessonDraftAutosave();
        render();
        pageContent.querySelector(`[data-block-index="${index}"]`)?.scrollIntoView({block:'nearest'});
    }));
}
function openLessonTextImport() {
    if (!hasPermission("edit_lessons") || !activeDraftSection()) return;
    const section = activeDraftSection();
    window.SlovaLessonImportUI.open({
        language: currentLanguage, types: activityTypes, translate: t,
        openModal, header: modalHeader, modal: modalCard,
        preview: (activity, index) => renderPreviewActivity(activity, index),
        enhance: root => { bindLessonPreviewActions(root); enhanceSelects(root); },
        append: activities => {
            if (!hasPermission("edit_lessons") || activeDraftSection() !== section) return;
            section.activities.push(...activities);
            scheduleLessonDraftAutosave();
            closeModal(); render();
            pageContent.querySelector("#activityBlocks")?.lastElementChild?.scrollIntoView({block:"nearest"});
        }
    });
}

function creationActivityTypes() { return activityTypes.filter(item=>item.id!=='order-items'); }

function openActivityPicker() {
    const categories = [{ id: "all", label: t("picker.all") }, { id: "tests", label: t("picker.tests") }, { id: "media", label: t("picker.media") }, { id: "other", label: t("picker.other") }];
    const choices = [...creationActivityTypes(), {id:"lesson-note",nameKey:"note.title",descKey:"note.description",category:"other"}].filter((item) => (selectedActivityCategory === "all" || item.category === selectedActivityCategory) && `${t(item.nameKey)} ${t(item.descKey)}`.toLowerCase().includes(activitySearch.toLowerCase()));
    openModal(`${modalHeader(t("picker.title"))}
        <div class="block-tabs">${categories.map((category) => `<button class="block-tab ${selectedActivityCategory === category.id ? "active" : ""}" type="button" data-category="${category.id}">${category.label}</button>`).join("")}</div>
        <div class="form-field"><input type="search" id="activitySearch" value="${escapeHtml(activitySearch)}" placeholder="${t("picker.search")}" aria-label="${t("picker.search")}"></div>
        <div class="activity-grid">${choices.map((choice) => `<button type="button" class="activity-choice activity-choice-${choice.category}" data-add-activity="${choice.id}" aria-label="${escapeHtml(`${t(choice.nameKey)}. ${t(choice.descKey)}`)}">
            <span class="activity-illustration">${activityIllustration(choice.id)}</span>
            <span class="activity-choice-copy"><strong>${escapeHtml(["multiple-choice","one-of-many"].includes(choice.id)?window.SlovaExerciseFormat.copy[currentLanguage][choice.id==="multiple-choice"?6:7]:t(choice.nameKey))}</strong><small>${escapeHtml(["multiple-choice","one-of-many"].includes(choice.id)?window.SlovaExerciseFormat.hint(choice.id,currentLanguage):t(choice.descKey))}</small></span>
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
        const isNote = button.dataset.addActivity === "lesson-note";
        const type = activityTypes.find((entry) => entry.id === (isNote ? "text" : button.dataset.addActivity));
        const activity = { id: crypto.randomUUID(), type: type.id, prompt: t(type.nameKey), content: "", answer: "" };
        if (isNote) { activity.prompt = window.SlovaLessonNotes.text(currentLanguage)[0]; activity.settings = {note:true,noteColor:"#e4ae16",studentVisible:true}; }
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
        "pronunciation-recording": '<rect x="41" y="12" width="22" height="32" rx="11" fill="#2b6446"/><path d="M33 32v5a19 19 0 0 0 38 0v-5M52 56v9M41 65h22" fill="none" stroke="#bd913b" stroke-width="4" stroke-linecap="round"/>',
        "listening-questions": '<path d="M23 38v-7a20 20 0 0 1 40 0v7" fill="none" stroke="#2b6446" stroke-width="5"/><rect x="18" y="31" width="12" height="24" rx="5" fill="#bd913b"/><rect x="56" y="31" width="12" height="24" rx="5" fill="#bd913b"/><circle cx="78" cy="47" r="17" fill="#e1eee5"/><path d="m70 47 6 6 10-12" fill="none" stroke="#2b6446" stroke-width="3"/>',
        "find-error": '<rect x="12" y="14" width="69" height="42" rx="7" fill="#fff"/><path d="M22 26h48M22 36h26M22 46h19" stroke="#b4bdc9" stroke-width="3"/><circle cx="64" cy="43" r="13" fill="#fae9e7" stroke="#b76b63" stroke-width="3"/><path d="m74 53 13 12M59 43h10" stroke="#b76b63" stroke-width="4" stroke-linecap="round"/>',
        "interactive-image": '<rect x="13" y="12" width="78" height="48" rx="7" fill="#edf5ee"/><path d="m19 53 20-22 17 16 12-12 17 18" fill="#a8ccb0"/><circle cx="66" cy="24" r="7" fill="#bd913b"/><circle cx="39" cy="31" r="7" fill="#fff" stroke="#2b6446" stroke-width="3"/><path d="m68 43 3 22 5-7 8-2z" fill="#2b6446"/>',
        "vocabulary": '<path d="M14 18q19-8 38 2 19-10 38-2v39q-19-8-38 2-19-10-38-2z" fill="#fff" stroke="#bd913b" stroke-width="2"/><path d="M52 20v39M23 42h19M62 32h19M62 41h19M62 49h13" stroke="#afbbbd" stroke-width="3"/><path d="m25 36 6-13 6 13m-10-4h8" fill="none" stroke="#2b6446" stroke-width="2"/>',
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
    if (!title || !lessonCategories().includes(unit)) {
        showToast(lessonText("chooseUnit"));
        return;
    }
    const existingLesson = data.lessons.find((current) => current.id === editingLessonId);
    [...draftSections,...draftHomeworkSections].forEach(section=>section.activities.forEach(activity=>{if(window.SlovaExerciseFormat.sequenceTypes.includes(activity.type)){window.SlovaExerciseFormat.contentEdited(activity);activity.questions?.forEach(question=>{question.answer=window.SlovaExerciseFormat.sequenceAnswer(activity.type,question.content);});}}));
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
    lessonWorkspaceMode = "preview";
    workspaceLessonId = lesson.id;
    editingLessonId = null;
    editorReturnToPreview = false;
    previewActivityEdit = null;
    draftSections = [];
    draftHomeworkSections = [];
    lessonFormDraft = { title: "", unit: "A1" };
    const assignedClassIds = lessonClassIds(lesson);
    if (!assignedClassIds.includes(monitorClassId)) monitorClassId = assignedClassIds[0] || "";
    render();
    scrollToFirstWorkspaceActivity();
    showToast(wasEditing ? t("toast.lessonUpdated") : t("toast.lessonCreated"));
}

function classLessonText(key) {
    const labels = SlovaI18n.locales({
        ua: { add: "Додати урок із бібліотеки", title: "Уроки для класу", search: "Знайти урок…", all: "Усі рівні", assigned: "Уже додано", incomplete: "Урок ще не готовий", save: "Додати вибрані уроки", error: "Не вдалося додати уроки.", empty: "Уроків не знайдено" },
        ru: { add: "Добавить урок из библиотеки", title: "Уроки для класса", search: "Найти урок…", all: "Все уровни", assigned: "Уже добавлен", incomplete: "Урок ещё не готов", save: "Добавить выбранные уроки", error: "Не удалось добавить уроки.", empty: "Уроки не найдены" },
        en: { add: "Add a lesson from the library", title: "Lessons for class", search: "Find a lesson…", all: "All levels", assigned: "Already added", incomplete: "Lesson is not ready", save: "Add selected lessons", error: "Could not add lessons.", empty: "No lessons found" }
    });
    return (labels[currentLanguage] || labels.en)[key];
}

function lessonAssignmentIncomplete(lesson) {
    return [...normalizeLessonSections(lesson), ...normalizeHomeworkSections(lesson)]
        .flatMap(section => section.activities.map((activity, index) => ({ activity, label: `${section.title} · ${index + 1}` })))
        .map(item=>({...item,reasons:window.SlovaLessonReadiness?.issues?.(item.activity,currentLanguage)||[]})).filter(item=>item.reasons.length||window.SlovaLessonReadiness?.incomplete(item.activity));
}

function classLessonPickerItems(classId, query = "", unit = "") {
    const search = query.trim().toLocaleLowerCase();
    return data.lessons.filter(lesson => (!unit || lesson.unit === unit)
        && `${lesson.title} ${lesson.unit}`.toLocaleLowerCase().includes(search))
        .map(lesson => ({ lesson, assigned: lessonClassIds(lesson).includes(classId), incomplete: lessonAssignmentIncomplete(lesson).length > 0 }));
}

function openClassLessonPicker(classId) {
    if (!hasPermission("view_assign_lessons")) return;
    const group = data.classes.find(item => item.id === classId);
    if (!group) return;
    const selected = new Set();
    openModal(`${modalHeader(classLessonText("title"))}<form id="classLessonPickerForm">
        <p class="assignment-hint">${escapeHtml(group.name)}</p>
        <div class="toolbar"><input type="search" data-picker-search placeholder="${escapeHtml(classLessonText("search"))}" aria-label="${escapeHtml(classLessonText("search"))}"><select data-picker-unit aria-label="${escapeHtml(classLessonText("all"))}"><option value="">${escapeHtml(classLessonText("all"))}</option>${lessonCategories().map(unit => `<option value="${escapeHtml(unit)}" ${unit === selectedLessonUnit ? "selected" : ""}>${escapeHtml(unit)}</option>`).join("")}</select></div>
        <div class="class-assignment-list class-lesson-picker-list" data-picker-list></div>
        <p data-picker-count role="status" aria-live="polite"></p>
        <div class="modal-actions"><button type="button" class="button secondary" data-close>${t("action.cancel")}</button><button type="submit" class="button" disabled>${classLessonText("save")}</button></div>
    </form>`);
    const form = modalCard.querySelector("#classLessonPickerForm"), list = form.querySelector("[data-picker-list]");
    const search = form.querySelector("[data-picker-search]"), level = form.querySelector("[data-picker-unit]");
    const submit = form.querySelector('[type="submit"]'), count = form.querySelector("[data-picker-count]");
    let busy = false;
    const refresh = () => {
        const items = classLessonPickerItems(classId, search.value, level.value);
        list.innerHTML = items.length ? items.map(({ lesson, assigned, incomplete }) => `<label class="class-choice"><input type="checkbox" value="${escapeHtml(lesson.id)}" ${assigned || selected.has(lesson.id) ? "checked" : ""} ${assigned || incomplete ? "disabled" : ""}><span><strong>${escapeHtml(lesson.title)}</strong><small>${escapeHtml(lesson.unit)}${assigned ? ` · ${classLessonText("assigned")}` : incomplete ? ` · ${classLessonText("incomplete")}` : ""}</small></span></label>`).join("") : `<p class="hint">${classLessonText("empty")}</p>`;
        count.textContent = countLabel(selected.size, "lesson");
        submit.disabled = busy || !selected.size;
    };
    search.addEventListener("input", refresh);
    level.addEventListener("change", refresh);
    list.addEventListener("change", event => {
        if (!event.target.matches('input[type="checkbox"]') || event.target.disabled) return;
        event.target.checked ? selected.add(event.target.value) : selected.delete(event.target.value);
        count.textContent = countLabel(selected.size, "lesson"); submit.disabled = busy || !selected.size;
    });
    form.querySelector("[data-close]").addEventListener("click", closeModal);
    form.addEventListener("submit", async event => {
        event.preventDefault();
        if (busy || !hasPermission("view_assign_lessons")) return;
        const currentGroup = data.classes.find(item => item.id === classId);
        if (!currentGroup) return;
        const items = classLessonPickerItems(classId).filter(item => selected.has(item.lesson.id) && !item.assigned);
        if (!items.length) return;
        if (items.some(item => item.incomplete)) { showToast(window.SlovaLessonReadiness.blocked(currentLanguage)); return; }
        busy = true; submit.disabled = true;
        try {
            await window.teacherWorkspaceApi.assignLessonsToClass(window.supabaseClient, classId,
                currentGroup.teacherId || currentUser.id, items.map(item => item.lesson.id));
            const ids = new Set(items.map(item => item.lesson.id));
            data.lessons = data.lessons.map(lesson => ids.has(lesson.id)
                ? { ...lesson, classIds: [...new Set([...lessonClassIds(lesson), classId])] } : lesson);
            if (form.isConnected) {
                closeModal(); selectedLessonUnit = ""; searchQuery = ""; render();
            }
            showToast(assignmentText("saved"));
        } catch (error) {
            showToast(`${classLessonText("error")} ${error.message}`);
            busy = false; if (form.isConnected) refresh();
        }
    });
    refresh();
}

function openLessonAssignment(id) {
    if (!hasPermission("view_assign_lessons")) return;
    const lesson = data.lessons.find((item) => item.id === id);
    if (!lesson) return;
    const incomplete = lessonAssignmentIncomplete(lesson);
    openModal(`${modalHeader(assignmentText("dialog"))}
        <form id="lessonAssignmentForm">
            <p class="assignment-hint">${assignmentText("hint")}</p>
            ${incomplete.length ? `<div class="lesson-readiness-warning" role="status">${window.SlovaLessonReadiness.message(currentLanguage)}<ul>${incomplete.map(item=>`<li>${escapeHtml(item.label)}${item.reasons?.length?`: ${escapeHtml(item.reasons.join(" "))}`:""}</li>`).join('')}</ul></div>` : ''}
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
        if (incomplete.length && classIds.some(classId=>!lessonClassIds(lesson).includes(classId))) {showToast(window.SlovaLessonReadiness.blocked(currentLanguage));return;}
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
    if (event.key === "Escape" && liveMonitorOpen && modalBackdrop.hidden && !openPopover) {
        const button = pageContent.querySelector(".live-monitor-column.is-expanded [data-toggle-live-monitor]");
        if (button?.getClientRects().length && button.closest(".live-monitor-column").contains(document.activeElement)) {
            button.click();
            button.focus({ preventScroll: true });
        }
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
