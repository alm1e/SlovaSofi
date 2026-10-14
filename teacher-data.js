(() => {
    function fail(error, operation) {
        if (error) throw new Error(`${operation}: ${error.message || error.details || "Неизвестная ошибка базы данных."}`);
    }

    async function loadWorkspace(client, userId) {
        const [settingsResult, classesResult, lessonsResult, rosterResult, assignmentsResult] = await Promise.all([
            client.from("teacher_workspace_settings").select("legacy_imported").eq("user_id", userId).maybeSingle(),
            client.from("teacher_classes").select("id,name,course").eq("teacher_id", userId).order("created_at"),
            client.from("teacher_lessons").select("id,title,unit,activities").eq("teacher_id", userId).order("created_at"),
            client.from("class_students").select("id,class_id,display_name,email,linked_user_id").eq("teacher_id", userId),
            client.from("class_lesson_assignments").select("class_id,lesson_id").eq("teacher_id", userId)
        ]);
        fail(settingsResult.error, "Не удалось загрузить настройки кабинета");
        fail(classesResult.error, "Не удалось загрузить классы");
        fail(lessonsResult.error, "Не удалось загрузить уроки");
        fail(rosterResult.error, "Не удалось загрузить список учеников");
        fail(assignmentsResult.error, "Не удалось загрузить назначения уроков");

        const classes = classesResult.data.map((group) => ({
            id: group.id,
            name: group.name,
            course: group.course,
            studentRecords: rosterResult.data.filter((student) => student.class_id === group.id),
            students: rosterResult.data.filter((student) => student.class_id === group.id).map((student) => student.display_name)
        }));
        const assignmentsByLesson = new Map();
        assignmentsResult.data.forEach(({ class_id: classId, lesson_id: lessonId }) => {
            const ids = assignmentsByLesson.get(lessonId) || [];
            ids.push(classId);
            assignmentsByLesson.set(lessonId, ids);
        });
        const lessons = lessonsResult.data.map((lesson) => {
            const sections = lesson.activities?.format === "sections-v1" && Array.isArray(lesson.activities.sections)
                ? lesson.activities.sections
                : [];
            return {
                ...lesson,
                classIds: assignmentsByLesson.get(lesson.id) || [],
                sections,
                activities: sections.length
                    ? sections.flatMap((section) => Array.isArray(section.activities) ? section.activities : [])
                    : Array.isArray(lesson.activities) ? lesson.activities : []
            };
        });
        const settings = settingsResult.data;

        if (!settings?.legacy_imported) await saveSettings(client, userId, true);
        return { data: { classes, lessons }, migratedLegacy: false };
    }

    async function saveSettings(client, userId, legacyImported) {
        const { error } = await client.from("teacher_workspace_settings").upsert(
            { user_id: userId, legacy_imported: legacyImported },
            { onConflict: "user_id" }
        );
        fail(error, "Не удалось сохранить настройки кабинета");
    }

    async function saveWorkspace(client, userId, data) {
        const classes = data.classes.map(({ id, name, course }) => ({ id, teacher_id: userId, name, course }));
        const lessons = data.lessons.map(({ id, title, unit, activities, sections }) => ({
            id,
            teacher_id: userId,
            title,
            unit,
            activities: Array.isArray(sections) && sections.length
                ? { format: "sections-v1", sections }
                : Array.isArray(activities) ? activities : [],
            updated_at: new Date().toISOString()
        }));
        await upsertRows(client, "teacher_classes", classes, "Не удалось сохранить классы");
        await syncRoster(client, userId, data.classes);
        await upsertRows(client, "teacher_lessons", lessons, "Не удалось сохранить уроки");
        await syncAssignments(client, userId, data.classes, data.lessons);
        await deleteMissing(client, "teacher_classes", userId, classes.map((row) => row.id), "Не удалось удалить классы");
        await deleteMissing(client, "teacher_lessons", userId, lessons.map((row) => row.id), "Не удалось удалить уроки");
        await saveSettings(client, userId, true);
    }

    async function inviteStudent(client, classId, displayName, email) {
        const { data, error } = await client.functions.invoke("invite-student", {
            body: { classId, displayName, email }
        });
        if (error) {
            let message = error.message || "Не удалось отправить приглашение ученику.";
            if (error.context instanceof Response) {
                const responseText = await error.context.text();
                try {
                    const responseBody = JSON.parse(responseText);
                    if (responseBody?.error) message = responseBody.error;
                } catch {
                    if (responseText) message = responseText;
                }
            }
            throw new Error(message);
        }
        if (data?.error) throw new Error(data.error);
        return data;
    }

    async function upsertRows(client, table, rows, operation) {
        if (!rows.length) return;
        const { error } = await client.from(table).upsert(rows, { onConflict: "id" });
        fail(error, operation);
    }

    async function syncRoster(client, userId, classes) {
        const { data: existing, error: readError } = await client.from("class_students")
            .select("id,class_id,display_name,email,linked_user_id").eq("teacher_id", userId);
        fail(readError, "Не удалось прочитать список учеников перед сохранением");
        const studentsByIdentity = new Map(existing.map((student) => [`${student.class_id}\u0000${student.display_name}`, student]));
        const desired = classes.flatMap((group) => group.students.map((displayName) => ({
            id: studentsByIdentity.get(`${group.id}\u0000${displayName}`)?.id || crypto.randomUUID(),
            class_id: group.id,
            teacher_id: userId,
            display_name: displayName,
            email: studentsByIdentity.get(`${group.id}\u0000${displayName}`)?.email || null,
            linked_user_id: studentsByIdentity.get(`${group.id}\u0000${displayName}`)?.linked_user_id || null
        })));
        await upsertRows(client, "class_students", desired, "Не удалось сохранить учеников");
        const desiredIdentities = new Set(desired.map((student) => `${student.class_id}\u0000${student.display_name}`));
        const staleIds = existing.filter((student) => !desiredIdentities.has(`${student.class_id}\u0000${student.display_name}`)).map((student) => student.id);
        await deleteIds(client, "class_students", staleIds, "Не удалось удалить учеников из списка");
    }

    async function syncAssignments(client, userId, classes, lessons) {
        const { data: existing, error: readError } = await client.from("class_lesson_assignments")
            .select("class_id,lesson_id").eq("teacher_id", userId);
        fail(readError, "Не удалось прочитать назначения уроков перед сохранением");
        const desired = lessons.flatMap((lesson) => {
            const classIds = Array.isArray(lesson.classIds) ? lesson.classIds : lesson.classId ? [lesson.classId] : [];
            return classIds.filter((classId) => classes.some((group) => group.id === classId))
                .map((classId) => ({ class_id: classId, lesson_id: lesson.id, teacher_id: userId }));
        });
        if (desired.length) {
            const { error } = await client.from("class_lesson_assignments").upsert(desired, { onConflict: "class_id,lesson_id" });
            fail(error, "Не удалось назначить уроки классам");
        }
        const desiredKeys = new Set(desired.map((row) => `${row.class_id}\u0000${row.lesson_id}`));
        for (const row of existing) {
            if (desiredKeys.has(`${row.class_id}\u0000${row.lesson_id}`)) continue;
            const { error } = await client.from("class_lesson_assignments").delete()
                .eq("teacher_id", userId).eq("class_id", row.class_id).eq("lesson_id", row.lesson_id);
            fail(error, "Не удалось снять назначение урока");
        }
    }

    async function deleteMissing(client, table, userId, desiredIds, operation) {
        const { data: existing, error: readError } = await client.from(table).select("id").eq("teacher_id", userId);
        fail(readError, operation);
        const desired = new Set(desiredIds);
        const staleIds = existing.filter((row) => !desired.has(row.id)).map((row) => row.id);
        await deleteIds(client, table, staleIds, operation);
    }

    async function deleteIds(client, table, ids, operation) {
        if (!ids.length) return;
        const { error } = await client.from(table).delete().in("id", ids);
        fail(error, operation);
    }

    window.teacherWorkspaceApi = { loadWorkspace, saveWorkspace, inviteStudent };
})();
