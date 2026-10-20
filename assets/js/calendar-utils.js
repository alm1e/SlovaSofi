(function () {
    function dateOrdinal(date) {
        return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000;
    }

    function occursOnDate(event, date, start) {
        const daysSinceStart = dateOrdinal(date) - dateOrdinal(start);
        if (daysSinceStart < 0) return false;
        if (event.recurrence === "selected_dates") {
            return Array.isArray(event.repeat_dates) && event.repeat_dates.includes(
                `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
            );
        }
        if (event.recurrence === "daily") return true;
        if (event.recurrence === "every_other_day") return daysSinceStart % 2 === 0;
        if (event.recurrence === "weekly") return daysSinceStart % 7 === 0;
        if (event.recurrence === "custom") {
            return Array.isArray(event.repeat_days) && event.repeat_days.includes(date.getDay());
        }
        return daysSinceStart === 0;
    }

    function occurrences(events, rangeStart, rangeEnd) {
        const result = [];
        events.forEach((event) => {
            const start = new Date(event.starts_at);
            if (Number.isNaN(start.getTime())) return;
            if (event.recurrence === "selected_dates") {
                if (!Array.isArray(event.repeat_dates)) return;
                event.repeat_dates.forEach((dateKey) => {
                    if (typeof dateKey !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) return;
                    const [year, month, day] = dateKey.split("-").map(Number);
                    const occurrence = new Date(start);
                    occurrence.setFullYear(year, month - 1, day);
                    if (Number.isNaN(occurrence.getTime())
                        || `${occurrence.getFullYear()}-${String(occurrence.getMonth() + 1).padStart(2, "0")}-${String(occurrence.getDate()).padStart(2, "0")}` !== dateKey
                        || dateOrdinal(occurrence) < dateOrdinal(start)) return;
                    if (occurrence >= rangeStart && occurrence <= rangeEnd) {
                        result.push({ ...event, occurrenceAt: occurrence });
                    }
                });
                return;
            }
            const repeatUntil = event.recurrence && event.recurrence !== "none" && event.repeat_until
                ? new Date(`${event.repeat_until}T23:59:59`)
                : start;
            const occurrence = new Date(start);
            while (occurrence <= repeatUntil && occurrence <= rangeEnd) {
                if (occurrence >= rangeStart && occursOnDate(event, occurrence, start)) {
                    result.push({ ...event, occurrenceAt: new Date(occurrence) });
                }
                occurrence.setDate(occurrence.getDate() + 1);
            }
        });
        return result.sort((left, right) => left.occurrenceAt - right.occurrenceAt);
    }

    window.SlovaCalendar = { occurrences };
})();
