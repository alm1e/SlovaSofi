(() => {
    const PREFIX = "slovasofi-pending-answer:v1:";
    function create(storage) {
        const prefix = (userId, lessonId) => `${PREFIX}${encodeURIComponent(userId)}:${encodeURIComponent(lessonId)}:`;
        const keyFor = (record) => prefix(record.userId, record.lessonId) + encodeURIComponent(JSON.stringify([record.revision, record.activityId, record.questionId || null]));
        function put(record) {
            const saved = { ...record, version: `${Date.now()}:${Math.random()}` };
            try { storage.setItem(keyFor(saved), JSON.stringify(saved)); return saved; }
            catch { return null; }
        }
        function list(userId, lessonId) {
            const records = [];
            try {
                for (let index = 0; index < storage.length; index += 1) {
                    const key = storage.key(index);
                    if (!key?.startsWith(prefix(userId, lessonId))) continue;
                    try {
                        const record = JSON.parse(storage.getItem(key));
                        if (record?.userId === userId && record.lessonId === lessonId
                            && typeof record.activityId === "string" && typeof record.revision === "string"
                            && typeof record.version === "string" && keyFor(record) === key) records.push(record);
                    } catch { /* A damaged entry must not prevent loading other answers. */ }
                }
            } catch { /* Restricted browser storage is handled by the caller on writes. */ }
            return records;
        }
        function acknowledge(record) {
            if (!record) return;
            try {
                const key = keyFor(record), current = JSON.parse(storage.getItem(key));
                if (current?.version === record.version) storage.removeItem(key);
            } catch { /* Preserve a backup when acknowledgement cannot be verified. */ }
        }
        function clearUser(userId) {
            try {
                const start = `${PREFIX}${encodeURIComponent(userId)}:`;
                const keys = [];
                for (let index = 0; index < storage.length; index += 1) {
                    const key = storage.key(index);
                    if (key?.startsWith(start)) keys.push(key);
                }
                keys.forEach(key => storage.removeItem(key));
            } catch { /* Storage cleanup must not break sign-out. */ }
        }
        return { put, list, acknowledge, clearUser };
    }
    window.SlovaStudentDrafts = { create };
})();
