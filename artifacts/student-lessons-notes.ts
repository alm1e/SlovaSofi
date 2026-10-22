import "../../../assets/js/fill-blanks.js";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";


const fillBlanks = (globalThis as unknown as { SlovaFillBlanks: {
    parse(content: string, answer?: string, settings?: unknown): {content: string; groups: string[][]; answers: string[]};
    check(content: string, answer: string, settings: unknown, response: unknown): boolean[];
} }).SlovaFillBlanks;

const corsHeaders = {
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
};

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const interactiveTypes = new Set([
    "drag-words", "fill-blank", "multiple-choice", "one-of-many", "order-items",
    "sentence-order", "true-false", "table", "match", "columns", "open-answer",
    "flashcards", "text", "image", "audio", "video", "phrase-list", "vocabulary"
]);
const answerableTypes = new Set([
    "drag-words", "fill-blank", "multiple-choice", "one-of-many", "order-items",
    "sentence-order", "true-false", "table", "match", "columns", "open-answer"
]);

type JsonRecord = Record<string, unknown>;
type ActivityQuestion = { id: string; prompt: string; content: string; answer: string };
type Activity = { type: string; prompt: string; content: string; answer: string; questions?: ActivityQuestion[]; cards?: { front: string; back: string; audio: string }[] };
type ProgressAnswer = { blankResults?: boolean[]; response: unknown; correct: boolean | null; submitted_at: string; draft?: boolean };
type ActivityProgressItem = { activity: Activity; key: string; fallbackKey?: string };

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

function normalizedQuestions(value: unknown): ActivityQuestion[] | undefined {
    if (!Array.isArray(value)) return undefined;
    const usedIds = new Set<string>();
    return value.map((rawQuestion, index) => {
        const question = record(rawQuestion);
        const requestedId = stringValue(question.id).trim();
        let id = /^[A-Za-z0-9_-]{1,100}$/.test(requestedId) && !usedIds.has(requestedId)
            ? requestedId
            : `legacy-${index}`;
        while (usedIds.has(id)) id = `legacy-${index}-${usedIds.size}`;
        usedIds.add(id);
        return {
            id,
            prompt: stringValue(question.prompt).slice(0, 500),
            content: stringValue(question.content).slice(0, 20000),
            answer: stringValue(question.answer).slice(0, 2000)
        };
    });
}

function activityForQuestion(activity: Activity, question: ActivityQuestion): Activity {
    return {
        type: activity.type,
        prompt: question.prompt,
        content: question.content,
        answer: question.answer
    };
}

function activityProgressItems(activities: Activity[]): ActivityProgressItem[] {
    return activities.flatMap((activity, activityIndex) => {
        if (activity.questions?.length) {
            return activity.questions.map((question, questionIndex) => ({
                activity: activityForQuestion(activity, question),
                key: `a${activityIndex}.q${question.id}`,
                ...(questionIndex === 0 ? { fallbackKey: `a${activityIndex}` } : {})
            }));
        }
        return [{ activity, key: `a${activityIndex}` }];
    });
}

function progressEntry(answers: Record<string, ProgressAnswer>, item: ActivityProgressItem): ProgressAnswer | undefined {
    return answers[item.key] || (item.fallbackKey ? answers[item.fallbackKey] : undefined);
}

function allGradableAnswersCorrect(activities: Activity[], answers: Record<string, ProgressAnswer>): boolean {
    const gradableItems = activityProgressItems(activities).filter(({ activity }) => isGradable(activity));
    return gradableItems.length > 0 && gradableItems.every((item) => progressEntry(answers, item)?.correct === true);
}

function shuffle<T>(items: T[]): T[] {
    const result = [...items];
    for (let index = result.length - 1; index > 0; index -= 1) {
        const other = crypto.getRandomValues(new Uint32Array(1))[0] % (index + 1);
        [result[index], result[other]] = [result[other], result[index]];
    }
    return result;
}

function vocabularyWords(activity: JsonRecord) {
    const settings = record(activity.settings);
    const words = Array.isArray(settings.words) ? settings.words : [];
    return words.slice(0, 100).flatMap((value) => {
        const item = record(value);
        const front = stringValue(item.word).trim(), back = stringValue(item.translation).trim();
        return front && back ? [{ front, back, audio: stringValue(item.audio).slice(0, 2000) }] : [];
    });
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
            const questions = normalizedQuestions(activity.questions);
            return [{
                type,
                prompt: stringValue(activity.prompt).slice(0, 500),
                content: stringValue(activity.content).slice(0, 20000),
                ...(type === "vocabulary" ? { cards: vocabularyWords(activity) } : {}),
                ...(["text", "fill-blank"].includes(type) ? { settings: record(activity.settings) } : {}),
                answer: stringValue(activity.answer).slice(0, 2000),
                ...(questions ? { questions } : {})
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
            const questions = normalizedQuestions(activity.questions);
            const index = activityIndex++;
            if (type === "text" && record(activity.settings).studentVisible === false) return [];
            const safe = safeActivity({
                type,
                ...(["text", "fill-blank"].includes(type) ? { settings: record(activity.settings) } : {}),
                prompt: stringValue(activity.prompt).slice(0, 500),
                content: stringValue(activity.content).slice(0, 20000),
                ...(type === "vocabulary" ? { cards: vocabularyWords(activity) } : {}),
                answer: stringValue(activity.answer).slice(0, 2000),
                ...(questions ? { questions } : {})
            });
            return [{ ...safe, index }];
        });
        return { title: stringValue(section.title) || "Lesson", homework, activities: safeActivities };
    }).filter((section) => section.activities.length);
}

function safeActivity(activity: Activity) {
    const noteSettings = (activity as Activity & {settings?: Record<string, unknown>}).settings || {};
    if (activity.type === "text" && noteSettings.studentVisible === false) return {};
    const contentLines = lines(activity.content);
    const prompt = activity.prompt;
    if (activity.questions?.length) {
        return {
            type: activity.type,
            prompt,
            questions: activity.questions.map((question) => ({
                questionId: question.id,
                ...safeActivity(activityForQuestion(activity, question))
            }))
        };
    }
    switch (activity.type) {
        case "drag-words": {
            const expected = answerParts(activity.answer);
            const words = expected.length ? expected : lines(activity.content).flatMap((line) => line.split(/\s+/)).filter(Boolean);
            return { type: activity.type, prompt, tokens: shuffle(words), gradable: expected.length > 0 };
        }
        case "fill-blank": {
            const settings = (activity as Activity & { settings?: Record<string, unknown> }).settings || {};
            const blanks = fillBlanks.parse(activity.content, activity.answer, settings);
            return { type: activity.type, prompt, content: blanks.content, blankCount: blanks.groups.length,
                hints: Array.isArray(settings.hints) ? settings.hints.filter(value => typeof value === 'string') : [],
                wordBank: Array.isArray(settings.wordBank) ? settings.wordBank.filter(value => typeof value === 'string') : [],
                gradable: blanks.groups.length > 0 && blanks.groups.every(group => group.length > 0) };
        }
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
            const images = contentLines.slice(0, 20).map((line) => {
                const markdown = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
                return { url: markdown ? markdown[2] : line, alt: markdown ? markdown[1] : "" };
            });
            return { type: activity.type, prompt, content: images.map((image) => image.url).join("\n"), alt: images[0]?.alt || prompt };
        }
        case "vocabulary":
            return { type: activity.type, prompt, content: activity.content, cards: activity.cards || [] };
        case "phrase-list":
        case "audio":
        case "video":
        case "text":
            return { type: activity.type, prompt, content: activity.content, settings: {
                note: noteSettings.note === true,
                noteColor: /^#[\da-f]{6}$/i.test(String(noteSettings.noteColor || "")) ? noteSettings.noteColor : "#e4ae16",
                noteCollapsed: noteSettings.noteCollapsed === true
            }};
        default:
            return { type: activity.type, prompt, content: activity.content };
    }
}

function normalized(value: string): string {
    return value.trim().replace(/\s+/g, " ").toLocaleLowerCase();
}

function isCorrect(activity: Activity, response: unknown): boolean {
    if (activity.type === "fill-blank") {
        const checks = fillBlanks.check(activity.content, activity.answer, (activity as Activity & {settings?: unknown}).settings, response);
        return checks.length > 0 && Array.isArray(response) && response.length === checks.length && checks.every(Boolean);
    }
    const contentLines = lines(activity.content);
    if (activity.type === "table") {
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
    if (activity.type === "fill-blank") {
        const blanks = fillBlanks.parse(activity.content, activity.answer, (activity as Activity & {settings?: unknown}).settings);
        return blanks.groups.length > 0 && blanks.groups.every(group => group.length > 0);
    }
    if (["open-answer", "flashcards", "text", "image", "audio", "video", "phrase-list", "vocabulary"].includes(activity.type)) return false;
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
            ...(Array.isArray(entry.blankResults) && entry.blankResults.every(value => typeof value === "boolean") ? {blankResults: entry.blankResults.slice(0, 1000) as boolean[]} : {}),
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
    const answerableItems = activityProgressItems(activities).filter(({ activity }) => answerableTypes.has(activity.type));
    const answeredCount = answerableItems.filter((item) => hasAnswerResponse(progressEntry(answers, item)?.response)).length;
    return { progressActivityCount: answerableItems.length, answeredCount };
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
        admin.from("class_students").select("id,class_id,teacher_classes(id,name,course,teacher_id)").eq("linked_user_id", user.id)
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
    const presenceWorkspaceIds = [...new Set(memberRows.map((row) => String(row.group.teacher_id || "")).filter(Boolean))];
    const classIds = [...new Set(memberRows.map((row) => row.classId))];
    if (!classIds.length) return jsonResponse(200, { classes: [], lessons: [], presenceWorkspaceIds, calendarEvents: [] }, allowedOrigin);

    const { data: calendarEvents, error: calendarError } = action === "list"
        ? await admin.from("calendar_events")
            .select("id,class_id,title,starts_at,duration_minutes,recurrence,repeat_until,repeat_days,repeat_dates")
            .in("class_id", classIds)
            .gte("starts_at", new Date(Date.now() - 366 * 86_400_000).toISOString())
            .order("starts_at")
        : { data: [], error: null };
    if (calendarError) {
        console.error("Could not load the student's class schedule.", calendarError);
        return jsonResponse(500, { error: "Could not load the class schedule." }, allowedOrigin);
    }

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
            teacherId: stringValue(member.group.teacher_id),
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
        return jsonResponse(200, { classes, lessons, presenceWorkspaceIds, calendarEvents: calendarEvents || [] }, allowedOrigin);
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
    let answerActivity = activity;
    let answerKey = `a${activityIndex}`;
    if (activity.questions?.length) {
        const questionId = stringValue(payload.questionId);
        const questionIndex = activity.questions.findIndex((question) => question.id === questionId);
        if (!questionId || questionIndex < 0) {
            return jsonResponse(400, { error: "Choose a valid item in this activity." }, allowedOrigin);
        }
        const question = activity.questions[questionIndex];
        answerActivity = activityForQuestion(activity, question);
        answerKey = `a${activityIndex}.q${question.id}`;
    } else if (payload.questionId !== undefined) {
        return jsonResponse(400, { error: "This activity does not contain separate items." }, allowedOrigin);
    }
    const response = payload.response;
    if (action === "save-draft") {
        if (!answerableTypes.has(answerActivity.type)) return jsonResponse(400, { error: "This activity does not accept a saved answer." }, allowedOrigin);
        if (!(typeof response === "string" || Array.isArray(response))
            || (typeof response === "string" && response.length > 10000)
            || (Array.isArray(response) && (response.length > 100 || response.some((item) => typeof item !== "string" || item.length > 500)))) {
            return jsonResponse(400, { error: "The saved answer has an invalid format." }, allowedOrigin);
        }
        const answers = publicProgress(progress?.answers);
        answers[answerKey] = {
            response,
            correct: null,
            submitted_at: new Date().toISOString(),
            draft: true
        };
        const completed = allGradableAnswersCorrect(allActivities, answers);
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
    if (answerActivity.type === "open-answer") {
        const writtenResponse = stringValue(response).trim();
        if (!writtenResponse || writtenResponse.length > 10000) return jsonResponse(400, { error: "Enter an answer of up to 10,000 characters." }, allowedOrigin);
        const answers = publicProgress(progress?.answers);
        answers[answerKey] = { response: writtenResponse, correct: null, submitted_at: new Date().toISOString() };
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
    const correct = isCorrect(answerActivity, response);
    const blankResults = answerActivity.type === "fill-blank"
        ? fillBlanks.check(answerActivity.content, answerActivity.answer, (answerActivity as Activity & {settings?: unknown}).settings, response) : undefined;
    const answers = publicProgress(progress?.answers);
    answers[answerKey] = { response, correct, ...(blankResults ? {blankResults} : {}), submitted_at: new Date().toISOString() };
    const completed = allGradableAnswersCorrect(allActivities, answers);
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
    return jsonResponse(200, { correct, blankResults, reviewRequired: false, answers, completed }, allowedOrigin);
});

