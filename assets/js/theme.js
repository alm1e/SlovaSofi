(() => {
    const preferenceKey = "slovasofiTeacherTheme";
    const themeLabels = SlovaI18n.locales({
        ua: { light: "Увімкнути світлу тему", dark: "Увімкнути темну тему" },
        ru: { light: "Включить светлую тему", dark: "Включить тёмную тему" },
        en: { light: "Enable light theme", dark: "Enable dark theme" }
    });
    let themeTimer = null;

    function savedTheme() {
        try {
            const preference = localStorage.getItem(preferenceKey);
            return preference === "light" || preference === "dark" ? preference : null;
        } catch (error) {
            console.error("Could not read the saved theme preference.", error);
            return null;
        }
    }

    function timeBasedTheme() {
        const hour = new Date().getHours();
        return hour < 7 || hour >= 18 ? "dark" : "light";
    }

    function applyTheme(theme) {
        if (theme === "dark") document.documentElement.dataset.theme = "dark";
        else document.documentElement.removeAttribute("data-theme");

        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.content = theme === "dark" ? "#0d1519" : "#f2f7f6";

        let language = "ua";
        try {
            language = localStorage.getItem("siteLanguage") || "ua";
        } catch (error) {
            console.error("Could not read the selected language.", error);
        }
        document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
            button.setAttribute("aria-pressed", String(theme === "dark"));
            button.setAttribute("aria-label", themeLabels[language]?.[theme === "dark" ? "light" : "dark"] || themeLabels.ua.dark);
            button.title = button.getAttribute("aria-label");
        });
    }

    function updateFromTime() {
        if (savedTheme()) return;
        applyTheme(timeBasedTheme());
    }

    function scheduleThemeUpdate() {
        if (themeTimer !== null) window.clearTimeout(themeTimer);
        if (document.hidden || savedTheme()) return;

        const now = new Date();
        const nextChange = new Date(now);
        if (now.getHours() < 7) nextChange.setHours(7, 0, 0, 0);
        else if (now.getHours() < 18) nextChange.setHours(18, 0, 0, 0);
        else {
            nextChange.setDate(nextChange.getDate() + 1);
            nextChange.setHours(7, 0, 0, 0);
        }
        themeTimer = window.setTimeout(() => {
            updateFromTime();
            scheduleThemeUpdate();
        }, Math.max(1000, nextChange.getTime() - now.getTime()));
    }

    applyTheme(savedTheme() || timeBasedTheme());
    document.addEventListener("DOMContentLoaded", () => {
        applyTheme(savedTheme() || timeBasedTheme());
        scheduleThemeUpdate();
    });
    document.addEventListener("click", (event) => {
        const button = event.target.closest("[data-theme-toggle]");
        if (!button) return;
        const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        try {
            localStorage.setItem(preferenceKey, theme);
        } catch (error) {
            console.error("Could not save the theme preference.", error);
            return;
        }
        applyTheme(theme);
        if (themeTimer !== null) window.clearTimeout(themeTimer);
        themeTimer = null;
    });
    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) updateFromTime();
        scheduleThemeUpdate();
    });
    window.addEventListener("storage", (event) => {
        if (event.key !== preferenceKey) return;
        updateFromTime();
        if (event.newValue === "light" || event.newValue === "dark") applyTheme(event.newValue);
        scheduleThemeUpdate();
    });
    new MutationObserver(() => applyTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light"))
        .observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
})();
