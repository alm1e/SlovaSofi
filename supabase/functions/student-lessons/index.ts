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
    "flashcards", "text", "image", "audio", "video", "pronunciation-recording",
    "listening-questions", "find-error", "interactive-image", "vocabulary", "phrase-list"
]);
const answerableTypes = new Set([
    "drag-words", "fill-blank", "multiple-choice", "one-of-many", "order-items",
    "sentence-order", "true-false", "table", "match", "columns", "open-answer",
    "flashcards", "pronunciation-recording", "listening-questions", "find-error"
]);

type JsonRecord = Record<string, unknown>;
type ActivityQuestion = { id: string; prompt: string; content: string; answer: string };
type ActivityCard = { front: string; back: string; audio?: string };
type Activity = { id?: string; legacyProgressIndex?: number; type: string; prompt: string; content: string; answer: string; questions?: ActivityQuestion[]; cards?: ActivityCard[]; settings?: JsonRecord };
type ProgressAnswer = { blankResults?: boolean[]; response: unknown; correct: boolean | null; submitted_at: string; draft?: boolean; feedback?: string };
type ActivityProgressItem = { activity: Activity; key: string; fallbackKeys?: string[] };
type OpenAnswerResponse = { text: string; attachments: string[] };

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

function normalizedSettings(value: unknown): JsonRecord | undefined {
    const settings = record(value);
    const entries = Object.entries(settings).slice(0, 30);
    if (!entries.length) return undefined;
    const safe: JsonRecord = {};
    for (const [key, item] of entries) {
        if (!/^[A-Za-z][A-Za-z0-9_-]{0,50}$/.test(key)) continue;
        if (typeof item === "string") safe[key] = item.slice(0, 2000);
        else if (typeof item === "boolean" || (typeof item === "number" && Number.isFinite(item))) safe[key] = item;
        else if (Array.isArray(item)) {
            const safeItems: unknown[] = [];
            for (const entry of item.slice(0, 200)) {
                if (typeof entry === "string") {
                    safeItems.push(entry.slice(0, 2000));
                    continue;
                }
                if (typeof entry === "boolean" || (typeof entry === "number" && Number.isFinite(entry))) {
                    safeItems.push(entry);
                    continue;
                }
                const nested = record(entry);
                if (!Object.keys(nested).length) continue;
                const safeNested: JsonRecord = {};
                for (const [nestedKey, nestedValue] of Object.entries(nested).slice(0, 10)) {
                    if (!/^[A-Za-z][A-Za-z0-9_-]{0,50}$/.test(nestedKey)) continue;
                    if (typeof nestedValue === "string") safeNested[nestedKey] = nestedValue.slice(0, 2000);
                    else if (typeof nestedValue === "boolean" || (typeof nestedValue === "number" && Number.isFinite(nestedValue))) safeNested[nestedKey] = nestedValue;
                    else if (Array.isArray(nestedValue)) safeNested[nestedKey] = nestedValue.slice(0, 100).filter((part) => typeof part === "string" || typeof part === "number" && Number.isFinite(part) || typeof part === "boolean")
                        .map((part) => typeof part === "string" ? part.slice(0, 2000) : part);
                }
                if (Object.keys(safeNested).length) safeItems.push(safeNested);
            }
            safe[key] = safeItems;
        } else if (item && typeof item === "object") {
            const safeNested: JsonRecord = {};
            for (const [nestedKey, nestedValue] of Object.entries(record(item)).slice(0, 100)) {
                if (!/^[A-Za-z0-9_-]{1,50}$/.test(nestedKey)) continue;
                if (typeof nestedValue === "string") safeNested[nestedKey] = nestedValue.slice(0, 2000);
                else if (Array.isArray(nestedValue)) safeNested[nestedKey] = nestedValue.slice(0, 100)
                    .filter((part) => typeof part === "string" || typeof part === "number" && Number.isFinite(part) || typeof part === "boolean")
                    .map((part) => typeof part === "string" ? part.slice(0, 2000) : part);
            }
            if (Object.keys(safeNested).length) safe[key] = safeNested;
        }
    }
    return Object.keys(safe).length ? safe : undefined;
}

function publicActivitySettings(type: string, settings: JsonRecord | undefined): JsonRecord | undefined {
    if (!settings) return undefined;
    const keysByType: Record<string, string[]> = {
        "drag-words": ["lockedWords"],
        "fill-blank": ["hints", "wordBank", "caseSensitive"],
        "multiple-choice": ["multipleAnswers"],
        "one-of-many": ["multipleAnswers"],
        "order-items": ["items", "groups"],
        "sentence-order": ["items", "groups"],
        "true-false": ["allowNotStated", "explanation"],
        table: ["cellOptions", "hints"],
        columns: ["categories"],
        "open-answer": ["allowAttachments"],
        audio: ["transcript", "hideTranscript"],
        video: ["transcript", "hideTranscript"],
        "interactive-image": [],
        vocabulary: [],
        text: ["note", "noteColor", "noteCollapsed"],
        "listening-questions": ["maxPlays", "transcript", "transcriptAfterSubmit"],
        "find-error": [],
        "pronunciation-recording": ["maxSeconds"]
    };
    const result: JsonRecord = {};
    for (const key of keysByType[type] || []) {
        if (settings[key] !== undefined) result[key] = settings[key];
    }
    return Object.keys(result).length ? result : undefined;
}

function lines(value: string): string[] {
    return value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
}

function answerParts(value: string): string[] {
    return value.split(/\s*\/\s*|\r?\n/).map((part) => part.trim()).filter(Boolean);
}

function settingStrings(settings: JsonRecord | undefined, key: string): string[] {
    const value = settings?.[key];
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean) : [];
}

function settingStringGroups(settings: JsonRecord | undefined, key: string): string[][] {
    const value = settings?.[key];
    return Array.isArray(value) ? value.map((group) => Array.isArray(group)
        ? group.filter((item): item is string => typeof item === "string").map((item) => item.trim())
        : []).filter((group) => group.length > 0) : [];
}

function settingRecords(settings: JsonRecord | undefined, key: string): JsonRecord[] {
    const value = settings?.[key];
    return Array.isArray(value) ? value.map(record) : [];
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

function normalizedFlashcards(value: unknown): ActivityCard[] | undefined {
    if (!Array.isArray(value)) return undefined;
    const cards = value.slice(0, 100).flatMap((rawCard) => {
        const card = record(rawCard);
        const front = stringValue(card.front).slice(0, 2000);
        const back = stringValue(card.back).slice(0, 2000);
        return front && back ? [{ front, back }] : [];
    });
    return cards.length ? cards : undefined;
}

function activityForQuestion(activity: Activity, question: ActivityQuestion): Activity {
    return {
        type: activity.type === "listening-questions" ? "multiple-choice" : activity.type,
        prompt: question.prompt,
        content: question.content,
        answer: question.answer,
        ...(activity.settings ? { settings: activity.settings } : {})
    };
}

function activityProgressKey(activity: Activity, activityIndex: number): string {
    return activity.id && uuidPattern.test(activity.id) ? `b${activity.id}` : `a${activityIndex}`;
}

function legacyActivityProgressIndex(activity: Activity, activityIndex: number): number | null {
    if (!activity.id || !uuidPattern.test(activity.id)) return activityIndex;
    const legacyProgressIndex = activity.legacyProgressIndex;
    return typeof legacyProgressIndex === "number" && Number.isInteger(legacyProgressIndex) && legacyProgressIndex >= 0
        ? legacyProgressIndex
        : null;
}

function activityProgressItems(activities: Activity[]): ActivityProgressItem[] {
    return activities.flatMap((activity, activityIndex) => {
        const key = activityProgressKey(activity, activityIndex);
        const legacyIndex = legacyActivityProgressIndex(activity, activityIndex);
        const legacyKey = legacyIndex === null ? null : `a${legacyIndex}`;
        if (activity.questions?.length) {
            return activity.questions.map((question, questionIndex) => {
                const questionKey = `${key}.q${question.id}`;
                const oldQuestionKey = legacyKey ? `${legacyKey}.q${question.id}` : null;
                const fallbackKeys = [
                    ...(oldQuestionKey && oldQuestionKey !== questionKey ? [oldQuestionKey] : []),
                    ...(questionIndex === 0 && legacyKey && legacyKey !== key ? [legacyKey] : [])
                ];
                return {
                    activity: activityForQuestion(activity, question),
                    key: questionKey,
                    ...(fallbackKeys.length ? { fallbackKeys } : {})
                };
            });
        }
        return [{ activity, key, ...(legacyKey && key !== legacyKey ? { fallbackKeys: [legacyKey] } : {}) }];
    });
}

function progressEntry(answers: Record<string, ProgressAnswer>, item: ActivityProgressItem): ProgressAnswer | undefined {
    return answers[item.key] || item.fallbackKeys?.map((key) => answers[key]).find(Boolean);
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

function groupItems(items: Array<string | { text: string; media: string }>, rawGroups: unknown) {
    if (!Array.isArray(rawGroups)) return items;
    const grouped = new Map<number, number[]>();
    const groupedIndexes = new Set<number>();
    for (const rawGroup of rawGroups.slice(0, 100)) {
        if (!Array.isArray(rawGroup)) continue;
        const indexes = [...new Set(rawGroup.filter((index): index is number =>
            Number.isInteger(index) && index >= 0 && index < items.length))].sort((a, b) => a - b);
        if (indexes.length < 2 || indexes.some((index) => groupedIndexes.has(index))) continue;
        indexes.forEach((index) => groupedIndexes.add(index));
        grouped.set(indexes[0], indexes);
    }
    if (!grouped.size) return items;
    const result: typeof items = [];
    items.forEach((item, index) => {
        const indexes = grouped.get(index);
        if (!indexes) {
            if (!groupedIndexes.has(index)) result.push(item);
            return;
        }
        const members = indexes.map((memberIndex) => items[memberIndex]);
        const text = members.map((member) => typeof member === "string" ? member : member.text).join(" ");
        result.push(typeof item === "string" ? text : { ...item, text });
    });
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
            const questions = normalizedQuestions(activity.questions);
            const cards = normalizedFlashcards(activity.cards);
            return [{
                type,
                prompt: stringValue(activity.prompt).slice(0, 500),
                content: stringValue(activity.content).slice(0, 20000),
                answer: stringValue(activity.answer).slice(0, 2000),
                ...(uuidPattern.test(stringValue(activity.id)) ? { id: stringValue(activity.id) } : {}),
                ...(Number.isInteger(activity.legacyProgressIndex) && Number(activity.legacyProgressIndex) >= 0
                    ? { legacyProgressIndex: Number(activity.legacyProgressIndex) }
                    : {}),
                ...(normalizedSettings(activity.settings) ? { settings: normalizedSettings(activity.settings) } : {}),
                ...(questions ? { questions } : {}),
                ...(cards ? { cards } : {})
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
            const cards = normalizedFlashcards(activity.cards);
            const index = activityIndex++;
            if (type === "text" && record(activity.settings).studentVisible === false) return [];
            const safe = safeActivity({
                type,
                prompt: stringValue(activity.prompt).slice(0, 500),
                content: stringValue(activity.content).slice(0, 20000),
                answer: stringValue(activity.answer).slice(0, 2000),
                ...(normalizedSettings(activity.settings) ? { settings: normalizedSettings(activity.settings) } : {}),
                ...(questions ? { questions } : {}),
                ...(cards ? { cards } : {})
            });
            return [{
                ...safe,
                ...(publicActivitySettings(type, normalizedSettings(activity.settings)) ? { settings: publicActivitySettings(type, normalizedSettings(activity.settings)) } : {}),
                ...(uuidPattern.test(stringValue(activity.id)) ? { id: stringValue(activity.id) } : {}),
                ...(Number.isInteger(activity.legacyProgressIndex) && Number(activity.legacyProgressIndex) >= 0
                    ? { legacyProgressIndex: Number(activity.legacyProgressIndex) }
                    : {}),
                index
            }];
        });
        return { title: stringValue(section.title) || "Lesson", homework, activities: safeActivities };
    }).filter((section) => section.activities.length);
}

function safeActivity(activity: Activity): Record<string, unknown> {
    if (activity.type === "text" && activity.settings?.studentVisible === false) return {};
    const contentLines = lines(activity.content);
    const prompt = activity.prompt;
    const settings = activity.settings;
    if (activity.questions?.length) {
        if (activity.type === "listening-questions") {
            return {
                type: activity.type,
                prompt,
                content: activity.content,
                transcript: stringValue(settings?.transcript).slice(0, 20000),
                transcriptAfterSubmit: settings?.transcriptAfterSubmit === true,
                maxPlays: Math.max(0, Math.min(20, Number(settings?.maxPlays) || 0)),
                questions: activity.questions.map((question) => ({
                    questionId: question.id,
                    ...safeActivity(activityForQuestion(activity, question))
                }))
            };
        }
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
            const words = expected.length ? [...expected, ...settingStrings(settings, "distractors")] : lines(activity.content).flatMap((line) => line.split(/\s+/)).filter(Boolean);
            const lockedWords = settingStrings(settings, "lockedWords");
            return { type: activity.type, prompt, tokens: shuffle(words), lockedWords, acceptedOrders: settingStringGroups(settings, "acceptedOrders"), gradable: expected.length > 0 };
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
        case "one-of-many": {
            const configuredOptions = Array.isArray(settings?.options) ? settings.options.map((raw) => record(raw))
                .filter((option) => stringValue(option.text).trim())
                .map((option) => ({
                    text: stringValue(option.text).slice(0, 500),
                    media: stringValue(option.media).slice(0, 2000),
                    correct: option.correct === true,
                    explanation: stringValue(option.explanation).slice(0, 2000)
                })) : [];
            const options = configuredOptions.length ? configuredOptions : contentLines.map((text, index) => ({
                text,
                media: "",
                correct: text === activity.answer || String(index) === activity.answer,
                explanation: ""
            }));
            const answerOptions = settings?.randomizeOptions === false ? options : shuffle(options);
            return {
                type: activity.type,
                prompt,
                options: answerOptions.map(({ text, media, explanation }) => ({ text, media, explanation })),
                choicesByBlank: Array.isArray(settings?.choicesByBlank) ? settings.choicesByBlank : [],
                explanations: settingStrings(settings, "explanations"),
                multipleAnswers: settings?.multipleAnswers === true,
                gradable: Boolean(activity.answer.trim()) || options.some((option) => option.correct)
            };
        }
        case "true-false": {
            const options = [{ value: "true", label: "true" }, { value: "false", label: "false" }];
            if (settings?.allowNotStated === true) options.push({ value: "not-stated", label: "not-stated" });
            return { type: activity.type, prompt, content: activity.content, options, explanation: stringValue(settings?.explanation), gradable: Boolean(activity.answer.trim()) };
        }
        case "order-items":
        case "sentence-order": {
            const configuredItems = Array.isArray(settings?.items) ? settings.items.map((raw) => record(raw))
                .filter((item) => stringValue(item.text).trim())
                .map((item) => ({ text: stringValue(item.text).slice(0, 2000), media: stringValue(item.media).slice(0, 2000) })) : [];
            const source = configuredItems.length ? configuredItems : contentLines.map((line) => ({ text: line.replace(/^\d+[.)]\s*/, ""), media: "" }));
            const items = activity.type === "sentence-order" && settings?.autoSplitSentences === true
                ? source.flatMap((item) => item.text.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map((text) => ({ ...item, text: text.trim() })) || [])
                : source;
            const groupedItems = activity.type === "sentence-order"
                ? groupItems(items, settings?.groups).map((item) => typeof item === "string" ? { text: item, media: "" } : item)
                : items;
            return { type: activity.type, prompt, items: shuffle(groupedItems.map((item, sourceIndex) => ({ ...item, sourceIndex }))), acceptedOrders: settings?.acceptedOrders || [], groups: settings?.groups || [], gradable: activity.answer.trim().length > 0 || groupedItems.length > 0 };
        }
        case "match": {
            const configuredPairs = Array.isArray(settings?.pairs) ? settings.pairs.map((raw) => record(raw))
                .filter((pair) => stringValue(pair.left).trim() && stringValue(pair.right).trim())
                .map((pair) => ({
                    left: stringValue(pair.left).slice(0, 500),
                    right: stringValue(pair.right).slice(0, 500),
                    leftMedia: stringValue(pair.leftMedia).slice(0, 2000),
                    rightMedia: stringValue(pair.rightMedia).slice(0, 2000)
                })) : [];
            const pairs = configuredPairs.length ? configuredPairs : contentLines.map((line) => line.split("=").map((part) => part.trim()))
                .filter((pair) => pair.length >= 2 && pair[0] && pair[1])
                .map(([left, right]) => ({ left, right, leftMedia: "", rightMedia: "" }));
            const distractors = Array.isArray(settings?.distractors) ? settings.distractors.map((raw) => record(raw))
                .filter((item) => stringValue(item.text).trim())
                .map((item) => ({ text: stringValue(item.text).slice(0, 500), media: stringValue(item.media).slice(0, 2000) }))
                : settingStrings(settings, "distractors").map((text) => ({ text, media: "" }));
            const rightOptions = pairs.map(({ right, rightMedia }) => ({ text: right, media: rightMedia }));
            return {
                type: activity.type,
                prompt,
                pairs: pairs.map(({ left, leftMedia }) => ({ text: left, media: leftMedia })),
                options: shuffle([...rightOptions, ...distractors]),
                gradable: pairs.length > 0
            };
        }
        case "columns": {
            const pairs = contentLines.map((line) => line.split(":").map((part) => part.trim()))
                .filter((pair) => pair.length >= 2 && pair[0] && pair[1])
                .map(([category, item]) => ({ category, item }));
            const configuredCategories = settingStrings(settings, "categories");
            const configuredCards = Array.isArray(settings?.cards) ? settings.cards.map((raw) => record(raw))
                .filter((card) => stringValue(card.text).trim() && stringValue(card.category).trim())
                .map((card) => ({ item: stringValue(card.text).slice(0, 500), category: stringValue(card.category).slice(0, 500), media: stringValue(card.media).slice(0, 2000) })) : [];
            const cards = configuredCards.length ? configuredCards : pairs.map((pair) => ({ ...pair, media: "" }));
            return { type: activity.type, prompt, items: cards.map(({ item, category, media }) => ({ text: item, category, media })), categories: configuredCategories.length ? configuredCategories : [...new Set(pairs.map(({ category }) => category))], gradable: cards.length > 0 };
        }
        case "table": {
            const rows = contentLines.map((line) => line.split(/\t|\s*\|\s*/).map((cell) => cell.trim()));
            let blankCount = 0;
            const hiddenCells = new Set(Array.isArray(settings?.hiddenCells) ? settings.hiddenCells.filter((item): item is number => Number.isInteger(item)) : []);
            let cellIndex = 0;
            const safeRows = rows.map((row) => row.map((cell) => {
                const currentCell = cellIndex++;
                return hiddenCells.has(currentCell) && !cell.includes("___") ? `{{blank:${blankCount++}}}`
                    : cell.replace(/___/g, () => `{{blank:${blankCount++}}}`);
            }));
            return { type: activity.type, prompt, rows: safeRows, blankCount, cellOptions: record(settings?.cellOptions), hints: record(settings?.hints), gradable: blankCount > 0 && (answerParts(activity.answer).length > 0 || Object.keys(record(settings?.acceptedAnswers)).length > 0) };
        }
        case "open-answer":
            return { type: activity.type, prompt, content: activity.content, gradable: false, reviewRequired: true };
        case "flashcards": {
            const cards = activity.cards || contentLines.map((line) => {
                const separator = line.includes("|") ? line.indexOf("|") : line.indexOf(":");
                if (separator < 0) return { front: "", back: "" };
                return { front: line.slice(0, separator).trim(), back: line.slice(separator + 1).trim() };
            }).filter((card) => card.front && card.back);
            return {
                type: activity.type,
                prompt,
                cards: (settings?.shuffle === false ? cards : shuffle(cards)).map((card) => ({ ...card, cardIndex: cards.indexOf(card) }))
            };
        }
        case "image": {
            const images = contentLines.slice(0, 20).map((line) => {
                const markdown = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
                return { url: markdown ? markdown[2] : line, alt: markdown ? markdown[1] : "" };
            });
            return { type: activity.type, prompt, content: images.map((image) => image.url).join("\n"), alt: images[0]?.alt || prompt };
        }
        case "pronunciation-recording":
            return { type: activity.type, prompt, content: activity.content, reviewRequired: true };
        case "listening-questions":
            return {
                type: activity.type,
                prompt,
                content: activity.content,
                transcript: stringValue(settings?.transcript).slice(0, 20000),
                transcriptAfterSubmit: settings?.transcriptAfterSubmit === true,
                maxPlays: Math.max(0, Math.min(20, Number(settings?.maxPlays) || 0)),
                questions: [],
                gradable: false
            };
        case "find-error":
            return { type: activity.type, prompt, content: activity.content, gradable: true };
        case "interactive-image": {
            const image = contentLines[0] || "";
            const hotspots = settingRecords(settings, "hotspots").flatMap((hotspot) => {
                const x = Number(hotspot.x);
                const y = Number(hotspot.y);
                const word = stringValue(hotspot.word).trim();
                if (!Number.isFinite(x) || !Number.isFinite(y) || !word) return [];
                return [{
                    x: Math.min(100, Math.max(0, x)),
                    y: Math.min(100, Math.max(0, y)),
                    word: word.slice(0, 200),
                    translation: stringValue(hotspot.translation).slice(0, 500),
                    audio: stringValue(hotspot.audio).slice(0, 2000)
                }];
            });
            return { type: activity.type, prompt, content: image, hotspots };
        }
        case "vocabulary": {
            const words = settingRecords(settings, "words").flatMap((word) => {
                const front = stringValue(word.word).trim();
                const back = stringValue(word.translation).trim();
                return front && back ? [{
                    front,
                    back,
                    audio: stringValue(word.audio).slice(0, 2000)
                }] : [];
            }).map((word, cardIndex) => ({ ...word, cardIndex }));
            return { type: activity.type, prompt, content: activity.content, cards: words,
                settings: { vocabularyFormat: settings.vocabularyFormat } };
        }
        case "phrase-list":
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
    if (activity.type === "fill-blank") {
        const checks = fillBlanks.check(activity.content, activity.answer, (activity as Activity & {settings?: unknown}).settings, response);
        return checks.length > 0 && Array.isArray(response) && response.length === checks.length && checks.every(Boolean);
    }
    const contentLines = lines(activity.content);
    const settings = activity.settings;
    const normalizeAnswer = (value: string) => {
        const collapsed = value.trim().replace(/\s+/g, " ");
        return settings?.caseSensitive === true ? collapsed : collapsed.toLocaleLowerCase();
    };
    if (activity.type === "table") {
        const actual = Array.isArray(response) ? response.map(stringValue) : [stringValue(response)];
        const configured = settings?.acceptedAnswers;
        const expectedGroups = Array.isArray(configured)
            ? configured.map((group) => Array.isArray(group) ? group.filter((item): item is string => typeof item === "string") : [])
            : answerParts(activity.answer).map((value) => [value]);
        const tableAnswers = record(configured);
        const alternatives = activity.type === "table" && !Array.isArray(configured)
            ? actual.map((_, index) => {
                const value = tableAnswers[String(index)];
                return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : answerParts(activity.answer)[index] ? [answerParts(activity.answer)[index]] : [];
            })
            : expectedGroups;
        return alternatives.length > 0 && alternatives.length === actual.length
            && alternatives.every((values, index) => values.some((value) => normalizeAnswer(value) === normalizeAnswer(actual[index])));
    }
    if (activity.type === "multiple-choice" || activity.type === "one-of-many") {
        if (activity.type === "one-of-many" && Array.isArray(response)) {
            const actual = response.map(stringValue);
            const expectedGroups = Array.isArray(settings?.correctAnswers)
                ? settings.correctAnswers.map((group) => Array.isArray(group) ? group.filter((item): item is string => typeof item === "string") : [])
                : answerParts(activity.answer).map((part) => [part]);
            return expectedGroups.length === actual.length && expectedGroups.every((values, index) =>
                values.some((value) => normalizeAnswer(value) === normalizeAnswer(actual[index])));
        }
        const configuredOptions = Array.isArray(settings?.options) ? settings.options.map((option) => record(option)) : [];
        const correctOptions = configuredOptions.filter((option) => option.correct === true).map((option) => stringValue(option.text));
        if (correctOptions.length) {
            const actualOptions = Array.isArray(response) ? response.map(stringValue) : [stringValue(response)];
            const matches = actualOptions.filter(Boolean).map(normalizeAnswer);
            const expected = correctOptions.map(normalizeAnswer);
            return settings?.multipleAnswers === true
                ? matches.length === expected.length && expected.every((value) => matches.includes(value))
                : matches.length === 1 && expected.includes(matches[0]);
        }
        const options = contentLines;
        const answerIndex = Number(activity.answer);
        const expected = activity.answer.trim() !== "" && Number.isInteger(answerIndex)
            && answerIndex >= 0 && answerIndex < options.length
            ? options[answerIndex]
            : activity.answer;
        return normalizeAnswer(stringValue(response)) === normalizeAnswer(expected);
    }
    if (activity.type === "true-false") {
        const expected = normalizeAnswer(activity.answer);
        const expectedTrue = ["true", "yes", "да", "так", "правда", "0"].includes(expected);
        const expectedFalse = ["false", "no", "нет", "ні", "неправда", "1"].includes(expected);
        const expectedNotStated = ["not-stated", "not stated", "не указано", "не зазначено"].includes(expected);
        const actual = normalizeAnswer(stringValue(response));
        return (expectedTrue && ["true", "yes", "да", "так", "правда"].includes(actual))
            || (expectedFalse && ["false", "no", "нет", "ні", "неправда"].includes(actual))
            || (expectedNotStated && settings?.allowNotStated === true && ["not-stated", "not stated"].includes(actual));
    }
    if (activity.type === "find-error") {
        if (typeof response !== "string") return false;
        let submitted: unknown;
        try {
            submitted = JSON.parse(response);
        } catch {
            return false;
        }
        const value = record(submitted);
        const index = Number(value.index);
        const correction = stringValue(value.correction).trim();
        const errors = settingRecords(settings, "errors");
        const expected = errors.find((item) => Number(item.index) === index);
        return Boolean(expected && correction && normalized(correction) === normalized(stringValue(expected.correction)));
    }
    if (activity.type === "drag-words") {
        const expected = answerParts(activity.answer);
        const actual = Array.isArray(response) ? response.map(stringValue) : [];
        const acceptedOrders = settingStringGroups(settings, "acceptedOrders");
        if (acceptedOrders.length && acceptedOrders.some((order) => order.length === actual.length
            && order.every((value, index) => normalizeAnswer(value) === normalizeAnswer(actual[index])))) return true;
        return expected.length > 0 && expected.length === actual.length
            && expected.every((value, index) => normalizeAnswer(value) === normalizeAnswer(actual[index]));
    }
    if (activity.type === "order-items" || activity.type === "sentence-order") {
        const actual = Array.isArray(response) ? response.map(stringValue) : [];
        const expected = answerParts(activity.answer);
        const configuredItems = Array.isArray(settings?.items) ? settings.items.map((item) => stringValue(record(item).text)).filter(Boolean) : [];
        let source = configuredItems.length ? configuredItems : contentLines.map((line) => line.replace(/^\d+[.)]\s*/, ""));
        if (activity.type === "sentence-order" && settings?.autoSplitSentences === true) {
            source = source.flatMap((item) => item.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map((sentence) => sentence.trim()) || []);
        }
        if (activity.type === "sentence-order") {
            source = groupItems(source, settings?.groups).map((item) => typeof item === "string" ? item : item.text);
        }
        const acceptedOrders = Array.isArray(settings?.acceptedOrders) ? settings.acceptedOrders.filter(Array.isArray) : [];
        if (acceptedOrders.some((order) => {
            const expectedOrder = order.map((item) => typeof item === "number" && Number.isInteger(item) ? source[item] : stringValue(item));
            return expectedOrder.length === actual.length && expectedOrder.every((value, index) => normalizeAnswer(value) === normalizeAnswer(actual[index]));
        })) return true;
        const numericOrder = expected.length > 0 && expected.every((item) => /^\d+$/.test(item));
        const order = numericOrder ? expected.map((item) => Number(item) - 1) : [];
        const ordered = numericOrder && order.every((index) => index >= 0 && index < source.length)
            ? order.map((index) => source[index])
            : expected.length ? expected : source;
        return ordered.length > 0 && ordered.length === actual.length
            && ordered.every((value, index) => normalizeAnswer(value) === normalizeAnswer(actual[index]));
    }
    if (activity.type === "match") {
        const configuredPairs = Array.isArray(settings?.pairs) ? settings.pairs.map((pair) => record(pair))
            .filter((pair) => stringValue(pair.left).trim() && stringValue(pair.right).trim())
            .map((pair) => [stringValue(pair.left), stringValue(pair.right)]) : [];
        const pairs = configuredPairs.length ? configuredPairs : contentLines.map((line) => line.split("=").map((part) => part.trim()))
            .filter((pair) => pair.length >= 2 && pair[0] && pair[1]);
        const actual = Array.isArray(response) ? response.map(stringValue) : [];
        return pairs.length > 0 && pairs.length === actual.length
            && pairs.every((pair, index) => normalized(stringValue(pair[1])) === normalized(actual[index]));
    }
    if (activity.type === "columns") {
        const pairs = contentLines.map((line) => line.split(":").map((part) => part.trim()))
            .filter((pair) => pair.length >= 2 && pair[0] && pair[1]);
        const configuredCards = Array.isArray(settings?.cards) ? settings.cards.map((card) => record(card))
            .filter((card) => stringValue(card.text).trim() && stringValue(card.category).trim())
            .map((card) => [stringValue(card.category), stringValue(card.text)]) : [];
        const expectedPairs = configuredCards.length ? configuredCards : pairs;
        const actual = Array.isArray(response) ? response.map(stringValue) : [];
        return expectedPairs.length > 0 && expectedPairs.length === actual.length
            && expectedPairs.every((pair, index) => normalized(stringValue(pair[0])) === normalized(actual[index]));
    }
    return false;
}

function answerFeedback(activity: Activity, response: unknown): string {
    const settings = activity.settings;
    if (activity.type === "multiple-choice" || activity.type === "one-of-many") {
        const selected = Array.isArray(response) ? response.map(stringValue) : [stringValue(response)];
        const options = Array.isArray(settings?.options) ? settings.options.map((option) => record(option)) : [];
        const explanations = options.filter((option) => selected.some((value) => normalized(value) === normalized(stringValue(option.text))))
            .map((option) => stringValue(option.explanation)).filter(Boolean);
        return explanations.length ? explanations.join("\n").slice(0, 2000) : settingStrings(settings, "explanations").join("\n").slice(0, 2000);
    }
    if (activity.type === "true-false") return stringValue(settings?.explanation).slice(0, 2000);
    return "";
}

function isGradable(activity: Activity): boolean {
    if (activity.type === "fill-blank") {
        const blanks = fillBlanks.parse(activity.content, activity.answer, (activity as Activity & {settings?: unknown}).settings);
        return blanks.groups.length > 0 && blanks.groups.every(group => group.length > 0);
    }
    if (["open-answer", "flashcards", "text", "image", "audio", "video", "pronunciation-recording", "interactive-image", "vocabulary", "phrase-list"].includes(activity.type)) return false;
    if (activity.type === "find-error") return settingRecords(activity.settings, "errors").length > 0;
    if (activity.answer.trim()) return true;
    if (activity.type === "fill-blank" && settingStringGroups(activity.settings, "acceptedAnswers").length) return true;
    if ((activity.type === "multiple-choice" || activity.type === "one-of-many")
        && Array.isArray(activity.settings?.options)
        && activity.settings.options.some((option) => record(option).correct === true)) return true;
    if (activity.type === "drag-words" && settingStringGroups(activity.settings, "acceptedOrders").length) return true;
    if (activity.type === "table" && Object.keys(record(activity.settings?.acceptedAnswers)).length) return true;
    return ["order-items", "sentence-order", "match", "columns"].includes(activity.type)
        && lines(activity.content).length > 0;
}

function validRecordingPath(value: unknown, userId: string, classId: string, lessonId: string): value is string {
    if (typeof value !== "string") return false;
    const match = value.match(/^([0-9a-f-]{36})\/([0-9a-f-]{36})\/([0-9a-f-]{36})\/([0-9a-f-]{36})\.(webm|ogg|mp4|wav)$/i);
    return Boolean(match && match[1].toLowerCase() === userId.toLowerCase()
        && match[2].toLowerCase() === classId.toLowerCase()
        && match[3].toLowerCase() === lessonId.toLowerCase());
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
            draft: entry.draft === true,
            ...(stringValue(entry.feedback) ? { feedback: stringValue(entry.feedback).slice(0, 2000) } : {})
        };
    }
    return result;
}

function hasAnswerResponse(response: unknown): boolean {
    if (typeof response === "string") return response.trim().length > 0;
    if (response && typeof response === "object" && !Array.isArray(response)) {
        const value = record(response);
        const text = stringValue(value.text).trim();
        const attachments = Array.isArray(value.attachments)
            ? value.attachments.some((item) => typeof item === "string" && item.trim())
            : false;
        return Boolean(text) || attachments;
    }
    return Array.isArray(response) && response.some((part) => typeof part === "string" && part.trim().length > 0);
}

function normalizeOpenAnswerResponse(response: unknown): OpenAnswerResponse | null {
    if (typeof response === "string") {
        return { text: response.trim(), attachments: [] };
    }
    if (!response || typeof response !== "object" || Array.isArray(response)) return null;
    const value = record(response);
    const text = stringValue(value.text).trim();
    const attachments = (Array.isArray(value.attachments) ? value.attachments : [])
        .filter((item): item is string => typeof item === "string")
        .map((item) => item.trim())
        .filter((item) => /^https?:\/\/\S+$/i.test(item))
        .slice(0, 8);
    return { text, attachments };
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
            classId: assignment.classId,
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
    let answerKey = activityProgressKey(activity, Number(activityIndex));
    if (activity.questions?.length) {
        const questionId = stringValue(payload.questionId);
        const questionIndex = activity.questions.findIndex((question) => question.id === questionId);
        if (!questionId || questionIndex < 0) {
            return jsonResponse(400, { error: "Choose a valid item in this activity." }, allowedOrigin);
        }
        const question = activity.questions[questionIndex];
        answerActivity = activityForQuestion(activity, question);
        answerKey = `${answerKey}.q${question.id}`;
    } else if (payload.questionId !== undefined) {
        return jsonResponse(400, { error: "This activity does not contain separate items." }, allowedOrigin);
    }
    const response = payload.response;
    if (action === "save-draft") {
        if (!answerableTypes.has(answerActivity.type)) return jsonResponse(400, { error: "This activity does not accept a saved answer." }, allowedOrigin);
        if (answerActivity.type === "pronunciation-recording"
            && !validRecordingPath(response, user.id, assignment.classId, lessonId)) {
            return jsonResponse(400, { error: "Record your pronunciation before saving." }, allowedOrigin);
        }
        const openResponse = answerActivity.type === "open-answer" ? normalizeOpenAnswerResponse(response) : null;
        const invalidOpenResponse = answerActivity.type === "open-answer"
            && (!openResponse || openResponse.text.length > 10000 || openResponse.attachments.some((item) => item.length > 2000));
        if (invalidOpenResponse
            || (answerActivity.type !== "open-answer" && (!(typeof response === "string" || Array.isArray(response))
                || (typeof response === "string" && response.length > 10000)
                || (Array.isArray(response) && (response.length > 100 || response.some((item) => typeof item !== "string" || item.length > 500)))))) {
            return jsonResponse(400, { error: "The saved answer has an invalid format." }, allowedOrigin);
        }
        const answers = publicProgress(progress?.answers);
        answers[answerKey] = {
            response: answerActivity.type === "open-answer" ? openResponse : response,
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
    if (answerActivity.type === "pronunciation-recording") {
        if (!validRecordingPath(response, user.id, assignment.classId, lessonId)) {
            return jsonResponse(400, { error: "Record your pronunciation before submitting." }, allowedOrigin);
        }
        const answers = publicProgress(progress?.answers);
        answers[answerKey] = { response, correct: null, submitted_at: new Date().toISOString() };
        const { error } = await admin.from("student_lesson_progress").upsert({
            student_id: assignment.memberId,
            class_id: assignment.classId,
            lesson_id: lessonId,
            answers,
            completed_at: progress?.completed_at || null,
            updated_at: new Date().toISOString()
        }, { onConflict: "student_id,lesson_id" });
        if (error) {
            console.error("Could not save the student's pronunciation recording.", error);
            return jsonResponse(500, { error: "Could not save your recording. Please try again." }, allowedOrigin);
        }
        return jsonResponse(200, { correct: null, reviewRequired: true, answers, completed: Boolean(progress?.completed_at) }, allowedOrigin);
    }
    if (answerActivity.type === "open-answer") {
        const writtenResponse = normalizeOpenAnswerResponse(response);
        if (!writtenResponse || (!writtenResponse.text && !writtenResponse.attachments.length) || writtenResponse.text.length > 10000 || writtenResponse.attachments.some((item) => item.length > 2000)) {
            return jsonResponse(400, { error: "Enter an answer of up to 10,000 characters." }, allowedOrigin);
        }
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
    const feedback = answerFeedback(answerActivity, response);
    const answers = publicProgress(progress?.answers);
    answers[answerKey] = { response, correct, ...(blankResults ? {blankResults} : {}), submitted_at: new Date().toISOString(), ...(feedback ? { feedback } : {}) };
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
    return jsonResponse(200, { correct, blankResults, feedback, reviewRequired: false, answers, completed }, allowedOrigin);
});
