(function () {
    function dateOrdinal(date) {
        return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000;
    }

    function occursOnDate(event, date, start) {
        const daysSinceStart = dateOrdinal(date) - dateOrdinal(start);
        if (daysSinceStart < 0) return false;
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
