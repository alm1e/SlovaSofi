(function () {
    const labels = SlovaI18n.locales({
        ru: ['Заметка', 'Цвет заметки', 'Показывать ученику', 'Сворачивать при открытии', 'Только для учителя', 'Вставить заметку здесь'],
        ua: ['Примітка', 'Колір примітки', 'Показувати учневі', 'Згортати при відкритті', 'Лише для викладача', 'Вставити примітку тут'],
        en: ['Note', 'Note color', 'Show to student', 'Collapse initially', 'Teacher only', 'Insert note here'],
        sk: ['Poznámka', 'Farba poznámky', 'Zobraziť žiakovi', 'Na začiatku zbaliť', 'Iba pre učiteľa', 'Vložiť poznámku sem'],
        kk: ['Ескертпе', 'Ескертпе түсі', 'Оқушыға көрсету', 'Алғаш ашқанда жинау', 'Тек мұғалімге', 'Осында ескертпе қосу']
    });
    const text = language => labels[language] || labels.ru;
    const isNote = activity => activity?.type === 'text' && (activity.settings?.note === true || /^\s*\[(info|star)\]/i.test(activity.content || ''));
    const color = settings => /^#[\da-f]{6}$/i.test(settings?.noteColor || '') ? settings.noteColor : '#e4ae16';
    function controls(activity, language) {
        const words = text(language), settings = activity.settings || {};
        return `<fieldset class="lesson-note-controls"><legend>${words[0]}</legend><label><input type="checkbox" data-note-setting="note" ${isNote(activity) ? 'checked' : ''}> ${words[0]}</label><label>${words[1]} <input type="color" data-note-setting="noteColor" value="${color(settings)}"></label><label><input type="checkbox" data-note-setting="studentVisible" ${settings.studentVisible !== false ? 'checked' : ''}> ${words[2]}</label><label><input type="checkbox" data-note-setting="noteCollapsed" ${settings.noteCollapsed ? 'checked' : ''}> ${words[3]}</label></fieldset>`;
    }
    function insertButton(index, language) {
        return `<div class="lesson-note-insert"><button type="button" data-insert-note="${index}" title="${text(language)[5]}">＋ ${text(language)[0]}</button></div>`;
    }
    window.SlovaLessonNotes = { text, isNote, color, controls, insertButton };
})();
