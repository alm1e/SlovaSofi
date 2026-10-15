import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
};

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const interactiveTypes = new Set([
    "drag-words", "fill-blank", "multiple-choice", "one-of-many", "order-items",
    "sentence-order", "true-false", "table", "match", "columns", "open-answer",
    "flashcards", "text", "image", "audio", "video"
]);
const answerableTypes = new Set([
    "drag-words", "fill-blank", "multiple-choice", "one-of-many", "order-items",
    "sentence-order", "true-false", "table", "match", "columns", "open-answer"
]);

type JsonRecord = Record<string, unknown>;
type Activity = { type: string; prompt: string; content: string; answer: string };
type ProgressAnswer = { response: unknown; correct: boolean | null; submitted_at: string; draft?: boolean };

function jsonResponse(status: number, body: unknown, origin: string) {
    return new Response(JSON.stringify(body), {
        status,
        headers: { ...corsHeaders, "Access-Control-Allow-Origin": origin }
    });
}

function record(value: unknown): JsonRecord {
    return value && typeof value === "object" && !Array.isArray(value) ? value as JsonRecord : {};
}

function stringValue(value: unknown): string {
    return typeof value === "string" ? value : "";
}

function lines(value: string): string[] {
    return value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
}

function answerParts(value: string): string[] {
    return value.split(/\s*\/\s*|\r?\n/).map((part) => part.trim()).filter(Boolean);
}

function shuffle<T>(items: T[]): T[] {
    const result = [...items];
    for (let index = result.length - 1; index > 0; index -= 1) {
        const other = crypto.getRandomValues(new Uint32Array(1))[0] % (index + 1);
        [result[index], result[other]] = [result[other], result[index]];
    }
    return result;
}

function flattenActivities(activities: unknown): Activity[] {
    const value = record(activities);
    const sectionGroups = value.format === "sections-v1" && Array.isArray(value.sections)
        ? [...value.sections, ...(Array.isArray(value.homeworkSections) ? value.homeworkSections : [])]
        : [{ activities: Array.isArray(activities) ? activities : [] }];
    return sectionGroups.flatMap((section) => {
        const sectionRecord = record(section);
        if (!Array.isArray(sectionRecord.activities)) return [];
        return sectionRecord.activities.flatMap((rawActivity) => {
            const activity = record(rawActivity);
            const type = stringValue(activity.type);
            if (!interactiveTypes.has(type)) return [];
            return [{
                type,
                prompt: stringValue(activity.prompt).slice(0, 500),
                content: stringValue(activity.content).slice(0, 20000),
                answer: stringValue(activity.answer).slice(0, 2000)
            }];
        });
    });
}

function sectionsWithSafeActivities(activities: unknown) {
    const value = record(activities);
    const sections = value.format === "sections-v1" && Array.isArray(value.sections)
        ? value.sections
        : [{ title: "Lesson", activities: Array.isArray(activities) ? activities : [] }];
    const homeworkSections = value.format === "sections-v1" && Array.isArray(value.homeworkSections)
        ? value.homeworkSections
        : [];
    let activityIndex = 0;
    return [
        ...sections.map((rawSection) => ({ section: rawSection, homework: false })),
        ...homeworkSections.map((rawSection) => ({ section: rawSection, homework: true }))
    ].map(({ section: rawSection, homework }) => {
        const section = record(rawSection);
        const safeActivities = (Array.isArray(section.activities) ? section.activities : []).flatMap((rawActivity) => {
            const activity = record(rawActivity);
            const type = stringValue(activity.type);
            if (!interactiveTypes.has(type)) return [];
            const safe = safeActivity({
                type,
                prompt: stringValue(activity.prompt).slice(0, 500),
                content: stringValue(activity.content).slice(0, 20000),
                answer: stringValue(activity.answer).slice(0, 2000)
            });
            return [{ ...safe, index: activityIndex++ }];
        });
        return { title: stringValue(section.title) || "Lesson", homework, activities: safeActivities };
    }).filter((section) => section.activities.length);
}

function safeActivity(activity: Activity) {
    const contentLines = lines(activity.content);
    const prompt = activity.prompt;
    switch (activity.type) {
        case "drag-words": {
            const expected = answerParts(activity.answer);
            const words = expected.length ? expected : lines(activity.content).flatMap((line) => line.split(/\s+/)).filter(Boolean);
            return { type: activity.type, prompt, tokens: shuffle(words), gradable: expected.length > 0 };
        }
        case "fill-blank":
            return { type: activity.type, prompt, content: activity.content, blankCount: (activity.content.match(/___/g) || []).length, gradable: Boolean(activity.answer.trim()) };
        case "multiple-choice":
        case "one-of-many":
            return { type: activity.type, prompt, options: contentLines, gradable: Boolean(activity.answer.trim()) };
        case "true-false":
            return { type: activity.type, prompt, content: activity.content, gradable: Boolean(activity.answer.trim()) };
        case "order-items":
        case "sentence-order": {
            const items = contentLines.map((line) => line.replace(/^\d+[.)]\s*/, ""));
            return { type: activity.type, prompt, items: shuffle(items), gradable: activity.answer.trim().length > 0 || items.length > 0 };
        }
        case "match": {
            const pairs = contentLines.map((line) => line.split("=").map((part) => part.trim()))
                .filter((pair) => pair.length >= 2 && pair[0] && pair[1])
                .map(([left, right]) => ({ left, right }));
            return { type: activity.type, prompt, pairs: pairs.map(({ left }) => left), options: shuffle(pairs.map(({ right }) => right)), gradable: pairs.length > 0 };
        }
        case "columns": {
            const pairs = contentLines.map((line) => line.split(":").map((part) => part.trim()))
                .filter((pair) => pair.length >= 2 && pair[0] && pair[1])
                .map(([category, item]) => ({ category, item }));
            return { type: activity.type, prompt, items: pairs.map(({ item }) => item), categories: [...new Set(pairs.map(({ category }) => category))], gradable: pairs.length > 0 };
        }
        case "table": {
            const rows = contentLines.map((line) => line.split(/\t|\s*\|\s*/).map((cell) => cell.trim()));
            let blankCount = 0;
            const safeRows = rows.map((row) => row.map((cell) => cell.replace(/___/g, () => `{{blank:${blankCount++}}}`)));
            return { type: activity.type, prompt, rows: safeRows, blankCount, gradable: blankCount > 0 && answerParts(activity.answer).length > 0 };
        }
        case "open-answer":
            return { type: activity.type, prompt, content: activity.content, gradable: false, reviewRequired: true };
        case "flashcards":
            return {
                type: activity.type,
                prompt,
                cards: contentLines.map((line) => {
                    const [front, ...back] = line.split(":");
                    return { front: front.trim(), back: back.join(":").trim() };
                }).filter((item) => item.front && item.back)
            };
        case "image": {
            const markdownImage = activity.content.match(/!\[([^\]]*)\]\(([^)]+)\)/);
            return { type: activity.type, prompt, content: markdownImage?.[2] || activity.content, alt: markdownImage?.[1] || prompt };
        }
        case "audio":
        case "video":
        case "text":
            return { type: activity.type, prompt, content: activity.content };
        default:
            return { type: activity.type, prompt, content: activity.content };
    }
}

function normalized(value: string): string {
    return value.trim().replace(/\s+/g, " ").toLocaleLowerCase();
}

function isCorrect(activity: Activity, response: unknown): boolean {
    const contentLines = lines(activity.content);
    if (activity.type === "fill-blank" || activity.type === "table") {
        const expected = answerParts(activity.answer);
        const actual = Array.isArray(response) ? response.map(stringValue) : [stringValue(response)];
        return expected.length > 0 && expected.length === actual.length
            && expected.every((value, index) => normalized(value) === normalized(actual[index]));
    }
    if (activity.type === "multiple-choice" || activity.type === "one-of-many") {
        const options = contentLines;
        const answerIndex = Number(activity.answer);
        const expected = activity.answer.trim() !== "" && Number.isInteger(answerIndex)
            && answerIndex >= 0 && answerIndex < options.length
            ? options[answerIndex]
            : activity.answer;
        return normalized(stringValue(response)) === normalized(expected);
    }
    if (activity.type === "true-false") {
        const expected = normalized(activity.answer);
        const expectedTrue = ["true", "yes", "да", "так", "правда", "0"].includes(expected);
        const expectedFalse = ["false", "no", "нет", "ні", "неправда", "1"].includes(expected);
        const actual = normalized(stringValue(response));
        return (expectedTrue || expectedFalse) && actual === String(expectedTrue);
    }
    if (activity.type === "drag-words") {
        const expected = answerParts(activity.answer);
        const actual = Array.isArray(response) ? response.map(stringValue) : [];
        return expected.length > 0 && expected.length === actual.length
            && expected.every((value, index) => normalized(value) === normalized(actual[index]));
    }
    if (activity.type === "order-items" || activity.type === "sentence-order") {
        const actual = Array.isArray(response) ? response.map(stringValue) : [];
        const expected = answerParts(activity.answer);
        const source = contentLines.map((line) => line.replace(/^\d+[.)]\s*/, ""));
        const numericOrder = expected.length > 0 && expected.every((item) => /^\d+$/.test(item));
        const order = numericOrder ? expected.map((item) => Number(item) - 1) : [];
        const ordered = numericOrder && order.every((index) => index >= 0 && index < source.length)
            ? order.map((index) => source[index])
            : expected.length ? expected : source;
        return ordered.length > 0 && ordered.length === actual.length
            && ordered.every((value, index) => normalized(value) === normalized(actual[index]));
    }
    if (activity.type === "match") {
        const pairs = contentLines.map((line) => line.split("=").map((part) => part.trim()))
            .filter((pair) => pair.length >= 2 && pair[0] && pair[1]);
        const actual = Array.isArray(response) ? response.map(stringValue) : [];
        return pairs.length > 0 && pairs.length === actual.length
            && pairs.every((pair, index) => normalized(pair[1]) === normalized(actual[index]));
    }
    if (activity.type === "columns") {
        const pairs = contentLines.map((line) => line.split(":").map((part) => part.trim()))
            .filter((pair) => pair.length >= 2 && pair[0] && pair[1]);
        const actual = Array.isArray(response) ? response.map(stringValue) : [];
        return pairs.length > 0 && pairs.length === actual.length
            && pairs.every((pair, index) => normalized(pair[0]) === normalized(actual[index]));
    }
    return false;
}

function isGradable(activity: Activity): boolean {
    if (["open-answer", "flashcards", "text", "image", "audio", "video"].includes(activity.type)) return false;
    if (activity.answer.trim()) return true;
    return ["order-items", "sentence-order", "match", "columns"].includes(activity.type)
        && lines(activity.content).length > 0;
}

function publicProgress(value: unknown): Record<string, ProgressAnswer> {
    const answers = record(value);
    const result: Record<string, ProgressAnswer> = {};
    for (const [key, raw] of Object.entries(answers)) {
        const entry = record(raw);
        if (typeof entry.correct !== "boolean" && entry.correct !== null) continue;
        result[key] = {
            response: entry.response,
            correct: entry.correct as boolean | null,
            submitted_at: stringValue(entry.submitted_at),
            draft: entry.draft === true
        };
    }
    return result;
}

function hasAnswerResponse(response: unknown): boolean {
    if (typeof response === "string") return response.trim().length > 0;
    return Array.isArray(response) && response.some((part) => typeof part === "string" && part.trim().length > 0);
}

function progressSummary(activities: Activity[], value: unknown): { progressActivityCount: number; answeredCount: number } {
    const answers = publicProgress(value);
    const answerableIndexes = activities.flatMap((activity, index) => answerableTypes.has(activity.type) ? [index] : []);
    const answeredCount = answerableIndexes.filter((index) => hasAnswerResponse(answers[`a${index}`]?.response)).length;
    return { progressActivityCount: answerableIndexes.length, answeredCount };
}

Deno.serve(async (request: Request) => {
    const appUrl = Deno.env.get("APP_URL");
    const appBaseUrl = new URL(appUrl ? (appUrl.endsWith("/") ? appUrl : `${appUrl}/`) : "http://invalid.local/");
    const allowedOrigin = appUrl ? appBaseUrl.origin : "";
    const origin = request.headers.get("origin") || "";
    if (!allowedOrigin || origin !== allowedOrigin) {
        return jsonResponse(403, { error: "This site is not allowed to access student lessons." }, allowedOrigin);
    }
    if (request.method === "OPTIONS") {
        return new Response("ok", { headers: { ...corsHeaders, "Access-Control-Allow-Origin": allowedOrigin } });
    }
    if (request.method !== "POST") return jsonResponse(405, { error: "Method not allowed." }, allowedOrigin);

    const authorization = request.headers.get("authorization");
    if (!authorization?.startsWith("Bearer ")) return jsonResponse(401, { error: "Sign in to open your lessons." }, allowedOrigin);
    const bodyText = await request.text();
    if (bodyText.length > 64000) return jsonResponse(413, { error: "The request is too large." }, allowedOrigin);
    let payload: JsonRecord;
    try {
        payload = record(JSON.parse(bodyText));
    } catch {
        return jsonResponse(400, { error: "The request must contain valid JSON." }, allowedOrigin);
    }
    const action = stringValue(payload.action);
    if (!["list", "load", "submit", "save-draft"].includes(action)) return jsonResponse(400, { error: "Choose a valid lesson action." }, allowedOrigin);
    const lessonId = stringValue(payload.lessonId);
    if (action !== "list" && !uuidPattern.test(lessonId)) return jsonResponse(400, { error: "Choose a valid assigned lesson." }, allowedOrigin);

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !anonKey || !serviceRoleKey) {
        console.error("Student lesson function is missing Supabase environment variables.");
        return jsonResponse(500, { error: "Student lessons are not configured on the server." }, allowedOrigin);
    }
    const userClient = createClient(supabaseUrl, anonKey, {
        global: { headers: { Authorization: authorization } },
        auth: { autoRefreshToken: false, persistSession: false }
    });
    const { data: { user }, error: authError } = await userClient.auth.getUser();
    if (authError || !user) return jsonResponse(401, { error: "Your session expired. Sign in again." }, allowedOrigin);

    const admin = createClient(supabaseUrl, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } });
    const [{ data: profile, error: profileError }, { data: memberships, error: membershipError }] = await Promise.all([
        admin.from("profiles").select("role").eq("id", user.id).maybeSingle(),
        admin.from("class_students").select("id,class_id,teacher_classes(id,name,course)").eq("linked_user_id", user.id)
    ]);
    if (profileError || membershipError) {
        console.error("Could not verify student class access.", profileError || membershipError);
        return jsonResponse(500, { error: "Could not verify your class access." }, allowedOrigin);
    }
    if (profile?.role !== "student") return jsonResponse(403, { error: "Only student accounts can open this endpoint." }, allowedOrigin);
    const memberRows = (memberships || []).map((row) => ({
        id: String(row.id),
        classId: String(row.class_id),
        group: record(Array.isArray(row.teacher_classes) ? row.teacher_classes[0] : row.teacher_classes)
    }));
    const classIds = [...new Set(memberRows.map((row) => row.classId))];
    if (!classIds.length) return jsonResponse(200, { classes: [], lessons: [] }, allowedOrigin);

    const { data: assignments, error: assignmentsError } = await admin.from("class_lesson_assignments")
        .select("class_id,lesson_id,teacher_lessons(id,title,unit,activities)")
        .in("class_id", classIds);
    if (assignmentsError) {
        console.error("Could not load assigned lessons.", assignmentsError);
        return jsonResponse(500, { error: "Could not load assigned lessons." }, allowedOrigin);
    }
    const assignmentRows = (assignments || []).flatMap((row) => {
        const lesson = record(Array.isArray(row.teacher_lessons) ? row.teacher_lessons[0] : row.teacher_lessons);
        const member = memberRows.find((item) => item.classId === String(row.class_id));
        if (!member || !lesson.id) return [];
        return [{ classId: String(row.class_id), memberId: member.id, group: member.group, lesson }];
    });
    const lessonIds = [...new Set(assignmentRows.map((row) => String(row.lesson.id)))];
    const memberIds = [...new Set(assignmentRows.map((row) => row.memberId))];
    const { data: progressRows, error: progressError } = memberIds.length
        ? await admin.from("student_lesson_progress")
            .select("student_id,class_id,lesson_id,answers,completed_at,updated_at")
            .in("student_id", memberIds).in("lesson_id", lessonIds)
        : { data: [], error: null };
    if (progressError) {
        console.error("Could not load student lesson progress.", progressError);
        return jsonResponse(500, { error: "Could not load saved lesson progress." }, allowedOrigin);
    }
    const progressByLesson = new Map((progressRows || []).map((row) => [`${row.student_id}:${row.lesson_id}`, row]));

    if (action === "list") {
        const classLessons = new Map<string, Map<string, JsonRecord>>();
        for (const assignment of assignmentRows) {
            const group = assignment.group;
            const classId = assignment.classId;
            const lesson = assignment.lesson;
            const lessonIdValue = String(lesson.id);
            const byId = classLessons.get(classId) || new Map<string, JsonRecord>();
            const progress = progressByLesson.get(`${assignment.memberId}:${lessonIdValue}`);
            const activities = flattenActivities(lesson.activities);
            byId.set(lessonIdValue, {
                id: lessonIdValue,
                title: stringValue(lesson.title),
                unit: stringValue(lesson.unit),
                activityCount: activities.length,
                completed: Boolean(progress?.completed_at),
                ...progressSummary(activities, progress?.answers)
            });
            classLessons.set(classId, byId);
        }
        const classes = memberRows.map((member) => ({
            id: member.classId,
            name: stringValue(member.group.name),
            course: stringValue(member.group.course),
            lessons: [...(classLessons.get(member.classId)?.values() || [])]
        }));
        const lessons = [...new Map(assignmentRows.map((row) => {
            const progress = progressByLesson.get(`${row.memberId}:${String(row.lesson.id)}`);
            const activities = flattenActivities(row.lesson.activities);
            return [String(row.lesson.id), {
                id: String(row.lesson.id),
                title: stringValue(row.lesson.title),
                unit: stringValue(row.lesson.unit),
                activityCount: activities.length,
                completed: Boolean(progress?.completed_at),
                ...progressSummary(activities, progress?.answers)
            }];
        })).values()];
        return jsonResponse(200, { classes, lessons }, allowedOrigin);
    }

    const assignment = assignmentRows.find((row) => String(row.lesson.id) === lessonId);
    if (!assignment) return jsonResponse(404, { error: "This lesson is not assigned to your classes." }, allowedOrigin);
    const allActivities = flattenActivities(assignment.lesson.activities);
    const progress = progressByLesson.get(`${assignment.memberId}:${lessonId}`);
    if (action === "load") {
        const safeLesson = {
            id: lessonId,
            title: stringValue(assignment.lesson.title),
            unit: stringValue(assignment.lesson.unit),
            activityCount: allActivities.length,
            ...progressSummary(allActivities, progress?.answers),
            sections: sectionsWithSafeActivities(assignment.lesson.activities),
            progress: publicProgress(progress?.answers),
            completed: Boolean(progress?.completed_at)
        };
        return jsonResponse(200, {
            lesson: safeLesson,
            className: stringValue(assignment.group.name)
        }, allowedOrigin);
    }

    const activityIndex = payload.activityIndex;
    if (!Number.isInteger(activityIndex) || Number(activityIndex) < 0 || Number(activityIndex) >= allActivities.length) {
        return jsonResponse(400, { error: "Choose a valid activity." }, allowedOrigin);
    }
    const activity = allActivities[Number(activityIndex)];
    const response = payload.response;
    if (action === "save-draft") {
        if (!answerableTypes.has(activity.type)) return jsonResponse(400, { error: "This activity does not accept a saved answer." }, allowedOrigin);
        if (!(typeof response === "string" || Array.isArray(response))
            || (typeof response === "string" && response.length > 10000)
            || (Array.isArray(response) && (response.length > 100 || response.some((item) => typeof item !== "string" || item.length > 500)))) {
            return jsonResponse(400, { error: "The saved answer has an invalid format." }, allowedOrigin);
        }
        const answers = publicProgress(progress?.answers);
        answers[`a${activityIndex}`] = {
            response,
            correct: null,
            submitted_at: new Date().toISOString(),
            draft: true
        };
        const gradedIndexes = allActivities
            .map((item, index) => ({ item, index }))
            .filter(({ item }) => isGradable(item))
            .map(({ index }) => `a${index}`);
        const completed = gradedIndexes.length > 0 && gradedIndexes.every((key) => answers[key]?.correct === true);
        const completedAt = completed ? progress?.completed_at || new Date().toISOString() : null;
        const { error } = await admin.from("student_lesson_progress").upsert({
            student_id: assignment.memberId,
            class_id: assignment.classId,
            lesson_id: lessonId,
            answers,
            completed_at: completedAt,
            updated_at: new Date().toISOString()
        }, { onConflict: "student_id,lesson_id" });
        if (error) {
            console.error("Could not save the student's answer draft.", error);
            return jsonResponse(500, { error: "Could not save your draft. Please try again." }, allowedOrigin);
        }
        return jsonResponse(200, { answers, completed }, allowedOrigin);
    }
    if (activity.type === "open-answer") {
        const writtenResponse = stringValue(response).trim();
        if (!writtenResponse || writtenResponse.length > 10000) return jsonResponse(400, { error: "Enter an answer of up to 10,000 characters." }, allowedOrigin);
        const answers = publicProgress(progress?.answers);
        answers[`a${activityIndex}`] = { response: writtenResponse, correct: null, submitted_at: new Date().toISOString() };
        const { error } = await admin.from("student_lesson_progress").upsert({
            student_id: assignment.memberId,
            class_id: assignment.classId,
            lesson_id: lessonId,
            answers,
            completed_at: progress?.completed_at || null,
            updated_at: new Date().toISOString()
        }, { onConflict: "student_id,lesson_id" });
        if (error) {
            console.error("Could not save the student's written answer.", error);
            return jsonResponse(500, { error: "Could not save your answer. Please try again." }, allowedOrigin);
        }
        return jsonResponse(200, { correct: null, reviewRequired: true, answers, completed: Boolean(progress?.completed_at) }, allowedOrigin);
    }

    if (!(typeof response === "string" || Array.isArray(response))
        || (typeof response === "string" && response.length > 10000)
        || (Array.isArray(response) && (response.length > 100 || response.some((item) => typeof item !== "string" || item.length > 500)))) {
        return jsonResponse(400, { error: "The submitted answer has an invalid format." }, allowedOrigin);
    }
    const correct = isCorrect(activity, response);
    const answers = publicProgress(progress?.answers);
    answers[`a${activityIndex}`] = { response, correct, submitted_at: new Date().toISOString() };
    const gradedIndexes = allActivities
        .map((item, index) => ({ item, index }))
        .filter(({ item }) => isGradable(item))
        .map(({ index }) => `a${index}`);
    const completed = gradedIndexes.length > 0 && gradedIndexes.every((key) => answers[key]?.correct === true);
    const { error: saveError } = await admin.from("student_lesson_progress").upsert({
        student_id: assignment.memberId,
        class_id: assignment.classId,
        lesson_id: lessonId,
        answers,
        completed_at: completed ? new Date().toISOString() : null,
        updated_at: new Date().toISOString()
    }, { onConflict: "student_id,lesson_id" });
    if (saveError) {
        console.error("Could not save student progress.", saveError);
        return jsonResponse(500, { error: "Could not save your progress. Please try again." }, allowedOrigin);
    }
    return jsonResponse(200, { correct, reviewRequired: false, answers, completed }, allowedOrigin);
});
