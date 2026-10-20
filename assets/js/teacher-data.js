(() => {
    function fail(error, operation) {
        if (error) throw new Error(`${operation}: ${error.message || error.details || "Неизвестная ошибка базы данных."}`);
    }

    async function loadWorkspace(client, userId, userEmail = "") {
        const { data: context, error: contextError } = await client.rpc("teacher_workspace_context");
        fail(contextError, "Не удалось определить школьный кабинет и права доступа");
        if (!context?.owner_id || !context?.permissions) {
            throw new Error("Не удалось определить школьный кабинет и права доступа.");
        }
        const isAdmin = context.role === "admin";
        if (!["teacher", "admin"].includes(context.role)) {
            const error = new Error("Этот кабинет доступен только преподавателям.");
            error.code = "WORKSPACE_FORBIDDEN";
            throw error;
        }
        const permissions = context.permissions;
        const [settingsResult, classesResult, lessonsResult, rosterResult, assignmentsResult] = await Promise.all([
            client.from("teacher_workspace_settings").select("legacy_imported").eq("user_id", userId).maybeSingle(),
            (isAdmin
                ? client.from("teacher_classes").select("id,name,course,teacher_id").order("created_at")
                : client.from("teacher_classes").select("id,name,course,teacher_id").eq("teacher_id", userId).order("created_at")),
            client.from("teacher_lessons").select("id,title,unit,activities,teacher_id").order("created_at"),
            (isAdmin
                ? client.from("class_students").select("id,class_id,teacher_id,display_name,email,linked_user_id")
                : client.from("class_students").select("id,class_id,teacher_id,display_name,email,linked_user_id").eq("teacher_id", userId)),
            (isAdmin
                ? client.from("class_lesson_assignments").select("class_id,lesson_id,teacher_id")
                : client.from("class_lesson_assignments").select("class_id,lesson_id,teacher_id").eq("teacher_id", userId))
        ]);
        fail(settingsResult.error, "Не удалось загрузить настройки кабинета");
        fail(classesResult.error, "Не удалось загрузить классы");
        fail(lessonsResult.error, "Не удалось загрузить уроки");
        fail(rosterResult.error, "Не удалось загрузить список учеников");
        fail(assignmentsResult.error, "Не удалось загрузить назначения уроков");

        const teacherIds = [...new Set(classesResult.data.map((group) => group.teacher_id))];
        const { data: profiles, error: profilesError } = teacherIds.length
            ? await client.from("profiles").select("id,first_name,last_name").in("id", teacherIds)
            : { data: [], error: null };
        fail(profilesError, "Не удалось загрузить профили преподавателей");
        const profileById = new Map(profiles.map((profile) => [profile.id, profile]));
        const classes = classesResult.data.map((group) => ({
            id: group.id,
            name: group.name,
            course: group.course,
            teacherId: group.teacher_id,
            teacherName: [profileById.get(group.teacher_id)?.first_name, profileById.get(group.teacher_id)?.last_name]
                .filter(Boolean).join(" ") || (group.teacher_id === userId ? userEmail : "Преподаватель"),
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
            const isSectionFormat = lesson.activities?.format === "sections-v1";
            const sections = isSectionFormat && Array.isArray(lesson.activities.sections)
                ? lesson.activities.sections
                : [];
            const homeworkSections = isSectionFormat && Array.isArray(lesson.activities.homeworkSections)
                ? lesson.activities.homeworkSections
                : [];
            return {
                ...lesson,
                teacherId: lesson.teacher_id,
                classIds: assignmentsByLesson.get(lesson.id) || [],
                sections,
                homeworkSections,
                activities: sections.length
                    ? sections.flatMap((section) => Array.isArray(section.activities) ? section.activities : [])
                    : Array.isArray(lesson.activities) ? lesson.activities : []
            };
        });
        const settings = settingsResult.data;

        if (!settingsResult.data?.legacy_imported) {
            saveSettings(client, userId, true).catch((error) =>
                console.error("Could not initialize teacher workspace settings.", error));
        }
        return {
            data: { classes, lessons },
            migratedLegacy: false,
            workspaceOwnerId: userId,
            role: context.role,
            permissions,
            staff: []
        };
    }

    async function loadStaff(client) {
        const result = await manageTeacher(client, { action: "list" });
        return result.staff;
    }

    async function saveSettings(client, userId, legacyImported) {
        const { error } = await client.from("teacher_workspace_settings").upsert(
            { user_id: userId, legacy_imported: legacyImported },
            { onConflict: "user_id" }
        );
        fail(error, "Не удалось сохранить настройки кабинета");
    }

    async function saveWorkspace(client, userId, data, access, deletedLessonIds = []) {
        const permissions = access?.permissions || {};
        if (permissions.manage_classes_students) {
            const classes = data.classes.map(({ id, name, course, teacherId }) => ({
                id,
                teacher_id: access?.role === "admin" ? teacherId || userId : userId,
                name,
                course
            }));
            await upsertRows(client, "teacher_classes", classes, "Не удалось сохранить классы");
            await syncRoster(client, userId, access?.role === "admin", data.classes);
            await deleteMissing(client, "teacher_classes", userId, classes.map((row) => row.id), "Не удалось удалить классы", access?.role === "admin");
        }
        if (permissions.edit_lessons) {
            const lessons = data.lessons.map(({ id, title, unit, activities, sections, homeworkSections, teacherId }) => ({
                id,
                teacher_id: teacherId || userId,
                title,
                unit,
                activities: (Array.isArray(sections) && sections.length > 0) || (Array.isArray(homeworkSections) && homeworkSections.length > 0)
                    ? {
                        format: "sections-v1",
                        sections: Array.isArray(sections) ? sections : [],
                        homeworkSections: Array.isArray(homeworkSections) ? homeworkSections : []
                    }
                    : Array.isArray(activities) ? activities : [],
                updated_at: new Date().toISOString()
            }));
            await upsertRows(client, "teacher_lessons", lessons, "Не удалось сохранить уроки");
        }
        if (permissions.view_assign_lessons) {
            await syncAssignments(client, userId, access?.role === "admin", data.classes, data.lessons);
        }
        if (deletedLessonIds.length) {
            const { error } = await client.from("teacher_lessons").delete().in("id", deletedLessonIds);
            fail(error, "Не удалось удалить уроки");
        }
        await saveSettings(client, userId, true);
    }

    async function invokeStudentFunction(client, body) {
        const { data, error } = await client.functions.invoke("invite-student", { body });
        if (error) {
            let message = error.message || "Не удалось изменить список учеников.";
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

    async function inviteStudent(client, classId, displayName, email) {
        return invokeStudentFunction(client, { action: "invite", classId, displayName, email });
    }

    async function listExistingStudents(client) {
        const result = await invokeStudentFunction(client, { action: "list-existing" });
        if (!result || !Array.isArray(result.students)) {
            throw new Error("The existing-student list response is invalid.");
        }
        return result.students;
    }

    async function addExistingStudent(client, classId, studentUserId) {
        return invokeStudentFunction(client, { action: "add-existing", classId, studentUserId });
    }

    async function loadLessonProgress(client, classId, lessonId) {
        const { data, error } = await client.from("student_lesson_progress")
            .select("student_id,class_id,lesson_id,answers,completed_at,updated_at")
            .eq("class_id", classId)
            .eq("lesson_id", lessonId);
        fail(error, "Не удалось загрузить ответы учеников");
        if (!Array.isArray(data)) {
            throw new Error("Не удалось загрузить ответы учеников: база данных вернула неожиданный формат.");
        }
        return data;
    }

    async function resetLessonProgress(client, classId, lessonId, studentId) {
        const { count, error } = await client.from("student_lesson_progress")
            .delete({ count: "exact" })
            .eq("class_id", classId)
            .eq("lesson_id", lessonId)
            .eq("student_id", studentId);
        fail(error, "Не удалось сбросить ответы ученика");
        if (count !== 1) {
            throw new Error("Не удалось сбросить ответы: запись не найдена или недостаточно прав.");
        }
    }

    async function saveLessonAnswerReview(client, classId, lessonId, studentId, answerKey, review = {}) {
        if (!answerKey) throw new Error("Не указан ключ ответа для рецензии.");
        const { data: row, error: readError } = await client.from("student_lesson_progress")
            .select("answers")
            .eq("class_id", classId)
            .eq("lesson_id", lessonId)
            .eq("student_id", studentId)
            .maybeSingle();
        fail(readError, "Не удалось загрузить ответ для рецензии");
        if (!row?.answers || typeof row.answers !== "object") {
            throw new Error("Не удалось найти ответ ученика для рецензии.");
        }
        const answers = structuredClone(row.answers);
        const entry = answers?.[answerKey];
        if (!entry || typeof entry !== "object") {
            throw new Error("Ответ ученика для рецензии не найден.");
        }
        entry.teacher_feedback = String(review.feedback || "").trim().slice(0, 2000);
        entry.teacher_correction = String(review.correction || "").trim().slice(0, 2000);
        const score = String(review.score || "").trim();
        entry.teacher_score = score ? score.slice(0, 50) : "";
        entry.reviewed_at = new Date().toISOString();
        entry.feedback = entry.teacher_feedback;
        const { error } = await client.from("student_lesson_progress")
            .update({ answers, updated_at: new Date().toISOString() })
            .eq("class_id", classId)
            .eq("lesson_id", lessonId)
            .eq("student_id", studentId);
        fail(error, "Не удалось сохранить рецензию преподавателя");
        return answers;
    }

    function subscribeLessonProgress(client, lessonId, onChange, onStatus) {
        return client.channel(`teacher-live-progress:${lessonId}:${crypto.randomUUID()}`)
            .on("postgres_changes", {
                event: "*",
                schema: "public",
                table: "student_lesson_progress",
                filter: `lesson_id=eq.${lessonId}`
            }, onChange)
            .subscribe(onStatus);
    }

    async function upsertRows(client, table, rows, operation) {
        if (!rows.length) return;
        const { error } = await client.from(table).upsert(rows, { onConflict: "id" });
        fail(error, operation);
    }

    async function syncRoster(client, userId, isAdmin, classes) {
        let query = client.from("class_students").select("id,class_id,teacher_id,display_name,email,linked_user_id");
        if (!isAdmin) query = query.eq("teacher_id", userId);
        const { data: existing, error: readError } = await query;
        fail(readError, "Не удалось прочитать список учеников перед сохранением");
        const studentsById = new Map(existing.map((student) => [student.id, student]));
        const studentsByIdentity = new Map(existing.map((student) => [`${student.class_id}\u0000${student.display_name}`, student]));
        const desired = classes.flatMap((group) => group.students.map((displayName, index) => {
            const editedRecord = group.studentRecords?.[index];
            const editedPriorRecord = editedRecord?.id ? studentsById.get(editedRecord.id) : null;
            const priorRecord = (editedPriorRecord?.class_id === group.id && editedPriorRecord)
                || studentsByIdentity.get(`${group.id}\u0000${displayName}`);
            return {
                id: editedRecord?.id || priorRecord?.id || crypto.randomUUID(),
                class_id: group.id,
                teacher_id: isAdmin ? group.teacherId || userId : userId,
                display_name: displayName,
                email: priorRecord?.email || null,
                linked_user_id: priorRecord?.linked_user_id || null
            };
        }));
        await upsertRows(client, "class_students", desired, "Не удалось сохранить учеников");
        const desiredIds = new Set(desired.map((student) => student.id));
        const staleIds = existing.filter((student) => !desiredIds.has(student.id)).map((student) => student.id);
        await deleteIds(client, "class_students", staleIds, "Не удалось удалить учеников из списка");
    }

    async function syncAssignments(client, userId, isAdmin, classes, lessons) {
        let query = client.from("class_lesson_assignments").select("class_id,lesson_id,teacher_id");
        if (!isAdmin) query = query.eq("teacher_id", userId);
        const { data: existing, error: readError } = await query;
        fail(readError, "Не удалось прочитать назначения уроков перед сохранением");
        const desired = lessons.flatMap((lesson) => {
            const classIds = Array.isArray(lesson.classIds) ? lesson.classIds : lesson.classId ? [lesson.classId] : [];
            return classIds.filter((classId) => classes.some((group) => group.id === classId))
                .map((classId) => ({
                    class_id: classId,
                    lesson_id: lesson.id,
                    teacher_id: classes.find((group) => group.id === classId)?.teacherId || userId
                }));
        });
        if (desired.length) {
            const { error } = await client.from("class_lesson_assignments").upsert(desired, { onConflict: "class_id,lesson_id" });
            fail(error, "Не удалось назначить уроки классам");
        }
        const desiredKeys = new Set(desired.map((row) => `${row.class_id}\u0000${row.lesson_id}`));
        for (const row of existing) {
            if (desiredKeys.has(`${row.class_id}\u0000${row.lesson_id}`)) continue;
            let query = client.from("class_lesson_assignments").delete()
                .eq("class_id", row.class_id).eq("lesson_id", row.lesson_id);
            if (!isAdmin) query = query.eq("teacher_id", userId);
            const { error } = await query;
            fail(error, "Не удалось снять назначение урока");
        }
    }

    async function deleteMissing(client, table, userId, desiredIds, operation, isAdmin = false) {
        let query = client.from(table).select("id");
        if (!isAdmin) query = query.eq("teacher_id", userId);
        const { data: existing, error: readError } = await query;
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

    async function manageTeacher(client, payload) {
        const { data, error } = await client.functions.invoke("manage-teachers", { body: payload });
        if (error) {
            let message = error.message || "Не удалось изменить доступ преподавателя.";
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

    window.teacherWorkspaceApi = {
        loadWorkspace,
        loadStaff,
        saveWorkspace,
        inviteStudent,
        listExistingStudents,
        addExistingStudent,
        loadLessonProgress,
        resetLessonProgress,
        saveLessonAnswerReview,
        subscribeLessonProgress,
        manageTeacher
    };
})();
