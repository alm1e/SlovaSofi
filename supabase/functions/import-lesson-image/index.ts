const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
};
const reply = (status, data) => new Response(JSON.stringify(data), {
    status, headers: { ...cors, "Content-Type": "application/json", "Cache-Control": "no-store" }
});

const allowedTypes = ["image/png", "image/jpeg", "image/gif", "image/webp"];
const limit = 5 * 1024 * 1024;

function isPrivateAddress(address) {
    if (address.includes(":")) {
        const value = address.toLowerCase();
        return value === "::1" || value === "::" || value.startsWith("fe80") || value.startsWith("fc") || value.startsWith("fd") || value.startsWith("::ffff:");
    }
    const [a, b] = address.split(".").map(Number);
    return a === 0 || a === 10 || a === 127 || (a === 100 && b >= 64 && b <= 127) || (a === 169 && b === 254) ||
        (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || a >= 224;
}

// Only public https hosts: no credentials, no custom ports, and every resolved address must be public.
async function assertPublicHttps(raw) {
    const url = new URL(raw);
    const host = url.hostname.toLowerCase();
    if (url.protocol !== "https:" || url.port || url.username || url.password) throw new Error("Unsupported image address");
    if (!host.includes(".") || host === "localhost" || host.endsWith(".local") || host.endsWith(".internal") || /^[\d.]+$/.test(host) || host.includes(":")) {
        throw new Error("Unsupported image address");
    }
    const addresses = [];
    for (const type of ["A", "AAAA"]) {
        try { addresses.push(...await Deno.resolveDns(host, type)); } catch { /* record type missing */ }
    }
    if (!addresses.length || addresses.some(isPrivateAddress)) throw new Error("Unsupported image address");
    return url;
}

async function fetchImage(raw) {
    let url = await assertPublicHttps(raw);
    for (let hop = 0; hop < 4; hop++) {
        const response = await fetch(url, {
            redirect: "manual",
            headers: { accept: "image/*", "user-agent": "Mozilla/5.0 (compatible; SlovaSofi image import)" },
            signal: AbortSignal.timeout(15000)
        });
        if (response.status >= 300 && response.status < 400 && response.headers.get("location")) {
            await response.body?.cancel();
            url = await assertPublicHttps(new URL(response.headers.get("location"), url).href);
            continue;
        }
        return response;
    }
    throw new Error("Too many redirects");
}

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
        const response = await fetchImage(String(body.url || ""));
        const type = (response.headers.get("content-type") || "").split(";")[0].trim().toLowerCase();
        if (!response.ok || !allowedTypes.includes(type)) return reply(422, { error: "Image unavailable" });
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
