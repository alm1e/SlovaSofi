const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
};
const reply = (status, data) => new Response(JSON.stringify(data), {
    status, headers: { ...cors, "Content-Type": "application/json", "Cache-Control": "no-store" }
});

Deno.serve(async (req) => {
    if (req.method === "OPTIONS") return new Response(null, { headers: cors });
    if (req.method !== "POST") return reply(405, { error: "POST required" });
    const authorization = req.headers.get("authorization") || "";
    if (!authorization.startsWith("Bearer ")) return reply(401, { error: "Sign in required" });
    try {
        const user = await fetch(`${Deno.env.get("SUPABASE_URL")}/auth/v1/user`, {
            headers: { authorization, apikey: Deno.env.get("SUPABASE_ANON_KEY") },
            signal: AbortSignal.timeout(10000)
        });
        if (!user.ok || !(await user.json()).id) return reply(401, { error: "Invalid session" });
        const body = await req.json();
        const url = new URL(body.url);
        // Only the observed public image CDN; never forward credentials or follow redirects.
        if (url.protocol !== "https:" || url.hostname !== "media-a.edvibe.com" || url.port || url.username || url.password ||
            !/^\/files\/LessonExerciseImages\/[a-f0-9-]+\.(png|jpe?g|gif|webp)$/i.test(url.pathname) || url.search) {
            return reply(400, { error: "Unsupported image address" });
        }
        const response = await fetch(url, { redirect: "error", signal: AbortSignal.timeout(15000) });
        const type = (response.headers.get("content-type") || "").split(";")[0];
        if (!response.ok || !["image/png", "image/jpeg", "image/gif", "image/webp"].includes(type)) {
            return reply(422, { error: "Image unavailable" });
        }
        const limit = 5 * 1024 * 1024;
        if (Number(response.headers.get("content-length")) > limit) return reply(413, { error: "Image exceeds 5 MB" });
        const reader = response.body.getReader();
        const chunks = [];
        let size = 0;
        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            size += value.length;
            if (size > limit) { await reader.cancel(); return reply(413, { error: "Image exceeds 5 MB" }); }
            chunks.push(value);
        }
        if (!size) return reply(422, { error: "Empty image" });
        let binary = "";
        for (const chunk of chunks) {
            for (let i = 0; i < chunk.length; i += 8192) binary += String.fromCharCode(...chunk.subarray(i, i + 8192));
        }
        return reply(200, { contentType: type, base64: btoa(binary) });
    } catch {
        return reply(422, { error: "Could not retrieve the original image" });
    }
});
