<script> 
    const translations = {
'ua': {
    'nav_courses': 'Курси',
    'nav_teachers': 'Викладачі',
    'hero_title': 'Словацька мова легко',
    'hero_sub': 'Вивчіть словацька мову для життя та роботи в Словаччині.',
    'hero_btn': 'Переглянути ціни',
    // Пробный урок
    'card1_title': 'Пробний урок',
    'card1_sub': '/Безкоштовно',
    'card1_f1': 'Знайомство з вчителем',
    'card1_f2': 'Тестування рівня мови',
    'card1_f3': '30 хвилин спілкування',
    'card1_f4': 'Інтерактивна платформа',
    'card1_btn': 'Записатися безкоштовно',
    // Индивидуально
    'card2_title': 'Індивідуально',
    'card2_sub': '/заняття',
    'card2_f1': 'Персональний графік',
    'card2_f2': 'Упор на розмову',
    'card2_btn': 'Замовити урок',
    // Группа
    'card3_title': 'Групове навчання',
    'card3_sub': '/заняття',
    'card3_f1': 'Група від 3-х осіб',
    'card3_f2': 'Інтерактивна платформа',
    'card3_f3': 'Записи занять',
    'card3_btn': 'Купити зараз',
    // Парные
    'card_pair_title': 'У парі',
    'card_pair_sub': '/заняття',
    'card_pair_f1': 'З другом або партнером',
    'card_pair_f2': 'Більше практики',
    'card_pair_btn': 'Замовити урок',
    // Учителя
    'teachers_title': 'Наші викладачі',
    'teachers_subtitle': 'Понад 100+ студентів вже заговорили словацькою разом з нами',
    'sofia_name': 'Софія',
    'sofia_role': 'Засновниця & Методолог',
    'sofia_bio': 'Створила систему навчання, яка допомагає швидко заговорити словацькою без зубріння.',
    'victoria_name': 'Виктория',
    'victoria_role': 'Старший викладач',
    'victoria_bio': 'Допомагає перейти від "розумію" до "говорю" та контролює результати кожного студента.',
    'team_name1': 'Анастасія — викладач',
    'team_name2': 'Мирослава — викладач',
    'team_name3': 'Віталій — викладач',
    'team_others_title': 'Інші викладачі нашої команди',
    'team_footer': 'Кожен викладач проходить відбір та навчання за нашою методикою, тому ти отримуєш однаково високий результат.'
},
'ru': {
    'nav_courses': 'Курсы',
    'nav_teachers': 'Преподаватели',
    'hero_title': 'Словацкий язык легко',
    'hero_sub': 'Изучите словацкий язык для жизни и работы в Словакии.',
    'hero_btn': 'Посмотреть цены',
    // Пробный урок
    'card1_title': 'Пробный урок',
    'card1_sub': '/бесплатно',
    'card1_f1': 'Знакомство с учителем',
    'card1_f2': 'Тестирование уровня языка',
    'card1_f3': '30 минут общения',
    'card1_f4': 'Интерактивная платформа',
    'card1_btn': 'Записаться бесплатно',
    // Индивидуально
    'card2_title': 'Индивидуально',
    'card2_sub': '/занятие',
    'card2_f1': 'Персональный график',
    'card2_f2': 'Упор на разговорную речь',
    'card2_btn': 'Заказать урок',
    // Группа
    'card3_title': 'Групповое обучение',
    'card3_sub': '/занятие',
    'card3_f1': 'Группа от 3-х человек',
    'card3_f2': 'Интерактивная платформа',
    'card3_f3': 'Записи занятий',
    'card3_btn': 'Купить сейчас',
    // Парные
    'card_pair_title': 'Парные занятия',
    'card_pair_sub': '/занятие',
    'card_pair_f1': 'С другом или партнером',
    'card_pair_f2': 'Больше практики',
    'card_pair_btn': 'Заказать урок',
    // Учителя
    'teachers_title': 'Наши преподаватели',
    'teachers_subtitle': 'Более 100+ студентов уже заговорили на словацком вместе с нами',
    'sofia_name': 'София',
    'sofia_role': 'Основательница & Методолог',
    'sofia_bio': 'Создала систему обучения, которая помогает быстро заговорить на словацком без зубрежки.',
    'victoria_name': 'Виктория',
    'victoria_role': 'Старший преподаватель',
    'victoria_bio': 'Помогает перейти от "понимаю" к "говорю" и контролирует результаты каждого студента.',
    'team_name1': 'Анастасия — преподаватель',
    'team_name2': 'Мирослава — преподаватель',
    'team_name3': 'Виталий — преподаватель',
    'team_others_title': 'Другие преподаватели нашей команды',
    'team_footer': 'Каждый преподаватель проходит отбор и обучение по нашей методике, поэтому вы получаете стабильный результат.'
},
'en': {
    'nav_courses': 'Courses',
    'nav_teachers': 'Teachers',
    'hero_title': 'Slovak Made Easy',
    'hero_sub': 'Learn Slovak for life and work in Slovakia.',
    'hero_btn': 'View Prices',
    // Пробный урок
    'card1_title': 'Trial Lesson',
    'card1_sub': '/free',
    'card1_f1': 'Meeting the teacher',
    'card1_f2': 'Language level testing',
    'card1_f3': '30 minutes of conversation',
    'card1_f4': 'Interactive platform',
    'card1_btn': 'Book for Free',
    // Индивидуально
    'card2_title': 'Individual',
    'card2_sub': '/lesson',
    'card2_f1': 'Personal schedule',
    'card2_f2': 'Focus on speaking',
    'card2_btn': 'Order a lesson',
    // Группа
    'card3_title': 'Group Classes',
    'card3_sub': '/lesson',
    'card3_f1': 'Group of 3 or more',
    'card3_f2': 'Interactive platform',
    'card3_f3': 'Lesson recordings',
    'card3_btn': 'Buy now',
    'card_pair_title': 'Pair lessons',
    'card_pair_sub': '/lesson',
    'card_pair_f1': 'With a friend or partner',
    'card_pair_f2': 'More practice',
    'card_pair_btn': 'Order a lesson',
    // Учителя
    'teachers_title': 'Our Teachers',
    'teachers_subtitle': 'Over 100+ students are already speaking Slovak with us',
    'sofia_name': 'Sofia',
    'sofia_role': 'Founder & Methodologist',
    'sofia_bio': 'Created a learning system that helps you start speaking Slovak quickly without rote learning.',
    'victoria_name': 'Victoria',
    'victoria_role': 'Senior Teacher',
    'victoria_bio': 'Helps transition from "understanding" to "speaking" and monitors every student\'s results.',
    'team_name1': 'Anastasia — teacher',
    'team_name2': 'Myroslava — teacher',
    'team_name3': 'Vitaliy — teacher',
    'team_others_title': 'Other teachers of our team',
    'team_footer': 'Every teacher undergoes selection and training according to our methodology, ensuring a stable result.'
    }
};
    function changeLanguage(lang) {
    document.querySelectorAll('.btn-lang-item').forEach(btn => {
        btn.classList.remove('active');
        if(btn.innerText.toLowerCase() === lang) {
            btn.classList.add('active');
        }
    });

    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if(translations[lang][key]) {
            element.innerText = translations[lang][key];
        }
    });
}           
</script>