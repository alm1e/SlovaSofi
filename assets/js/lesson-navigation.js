(function () {
    const sidebar = document.getElementById('studentSidebar') || document.getElementById('sidebar');
    const button = document.getElementById('studentMenuToggle') || document.getElementById('menuToggle');
    const backdrop = document.getElementById('studentSidebarBackdrop') || document.getElementById('sidebarBackdrop');
    if (!sidebar || !button || !backdrop) return;
    let lessonOpen = false;
    const mobile = window.matchMedia('(max-width: 700px)');
    const teacherRail = sidebar.id === 'sidebar';
    const labels = {
        ua: ['Відкрити навігацію', 'Закрити навігацію'],
        ru: ['Открыть навигацию', 'Закрыть навигацию'],
        en: ['Open navigation', 'Close navigation']
    };
    function update() {
        const drawer = mobile.matches || (lessonOpen && !teacherRail);
        const expanded = !drawer || sidebar.classList.contains('open');
        sidebar.inert = !expanded;
        button.setAttribute('aria-controls', sidebar.id);
        button.setAttribute('aria-expanded', String(expanded));
        const language = document.documentElement.lang;
        const text = labels[language === 'uk' ? 'ua' : language] || labels.ru;
        button.setAttribute('aria-label', text[expanded ? 1 : 0]);
        button.title = text[expanded ? 1 : 0];
        backdrop.setAttribute('aria-label', text[1]);
        backdrop.tabIndex = expanded && drawer ? 0 : -1;
    }
    function close(restoreFocus = false) {
        sidebar.classList.remove('open');
        backdrop.classList.remove('open');
        if (restoreFocus || sidebar.contains(document.activeElement)) button.focus({ preventScroll: true });
        update();
    }
    function sync(open) {
        if (lessonOpen !== Boolean(open)) {
            lessonOpen = Boolean(open);
            document.body.classList.toggle('lesson-focus', lessonOpen);
            close();
        }
        update();
    }
    button.addEventListener('click', () => {
        if (sidebar.classList.contains('open')) close(true);
        else {
            sidebar.classList.add('open');
            backdrop.classList.add('open');
            update();
            sidebar.querySelector('.nav-item.active, a, button')?.focus({ preventScroll: true });
        }
    });
    backdrop.addEventListener('click', () => close(true));
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && sidebar.classList.contains('open')) close(true);
    });
    mobile.addEventListener('change', () => close());
    window.SlovaLessonNavigation = { sync };
    update();
})();
