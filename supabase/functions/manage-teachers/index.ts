import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
};

type Payload = {
    action?: unknown;
    email?: unknown;
    memberId?: unknown;
    permissions?: unknown;
};

function jsonResponse(status: number, body: unknown, origin: string) {
    return new Response(JSON.stringify(body), {
        status,
        headers: { ...corsHeaders, "Access-Control-Allow-Origin": origin }
    });
}

function validPermissions(value: unknown): value is { edit_lessons: boolean } {
    if (!value || typeof value !== "object" || Array.isArray(value)) return false;
    const candidate = value as Record<string, unknown>;
    return typeof candidate.edit_lessons === "boolean"
        && Object.keys(candidate).every((key) => key === "edit_lessons");
}

Deno.serve(async (request: Request) => {
    const appUrl = Deno.env.get("APP_URL");
    const appBaseUrl = new URL(appUrl ? (appUrl.endsWith("/") ? appUrl : `${appUrl}/`) : "http://invalid.local/");
    const configuredOrigin = appUrl ? appBaseUrl.origin : "";
    const requestOrigin = request.headers.get("origin") || "";

    if (!configuredOrigin || requestOrigin !== configuredOrigin) {
        return jsonResponse(403, { error: "This site is not allowed to manage teachers." }, configuredOrigin);
    }
    if (request.method === "OPTIONS") {
        return new Response("ok", {
            headers: { ...corsHeaders, "Access-Control-Allow-Origin": configuredOrigin }
        });
    }
    if (request.method !== "POST") {
        return jsonResponse(405, { error: "Method not allowed." }, configuredOrigin);
    }

    const authorization = request.headers.get("authorization");
    if (!authorization?.startsWith("Bearer ")) {
        return jsonResponse(401, { error: "Sign in as an administrator to manage teachers." }, configuredOrigin);
    }

    let payload: Payload;
    try {
        payload = await request.json();
    } catch {
        return jsonResponse(400, { error: "The request must contain valid JSON." }, configuredOrigin);
    }
    const action = typeof payload.action === "string" ? payload.action : "";
    const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
    const memberId = typeof payload.memberId === "string" ? payload.memberId.trim() : "";
    if (!["list", "invite", "update", "remove"].includes(action)) {
        return jsonResponse(400, { error: "Choose a valid teacher action." }, configuredOrigin);
    }
    if ((action === "invite" && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254))
        || (action !== "list" && action !== "invite"
            && !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(memberId))
        || (action !== "list" && action !== "remove" && !validPermissions(payload.permissions))) {
        return jsonResponse(400, { error: "Enter a valid email, teacher account, and editor permission." }, configuredOrigin);
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !anonKey || !serviceRoleKey) {
        console.error("Teacher management function is missing Supabase environment variables.");
        return jsonResponse(500, { error: "Teacher management is not configured on the server." }, configuredOrigin);
    }

    const userClient = createClient(supabaseUrl, anonKey, {
        global: { headers: { Authorization: authorization } },
        auth: { autoRefreshToken: false, persistSession: false }
    });
    const { data: { user }, error: authError } = await userClient.auth.getUser();
    if (authError || !user) {
        return jsonResponse(401, { error: "Your session expired. Sign in again and retry." }, configuredOrigin);
    }
    const { data: canManage, error: permissionError } = await userClient.rpc(
        "teacher_workspace_has_permission",
        { permission_name: "manage_teachers" }
    );
    if (permissionError) {
        console.error("Could not verify administrator access.", permissionError);
        return jsonResponse(500, { error: "Could not verify administrator access. Apply the latest database migration." }, configuredOrigin);
    }
    if (canManage !== true) {
        return jsonResponse(403, { error: "Only the platform administrator can manage teacher accounts." }, configuredOrigin);
    }

    const adminClient = createClient(supabaseUrl, serviceRoleKey, {
        auth: { autoRefreshToken: false, persistSession: false }
    });

    if (action === "list") {
        const { data: profiles, error: profilesError } = await adminClient.from("profiles")
            .select("id,role").in("role", ["teacher", "admin"]);
        if (profilesError) {
            console.error("Could not load teacher profiles.", profilesError);
            return jsonResponse(500, { error: "Could not load teacher accounts." }, configuredOrigin);
        }
        const teacherIds = profiles.map((profile) => profile.id);
        if (!teacherIds.length) return jsonResponse(200, { staff: [] }, configuredOrigin);
        const { data: editors, error: editorsError } = await adminClient.from("teacher_lesson_editors")
            .select("user_id,created_at").in("user_id", teacherIds);
        if (editorsError) {
            console.error("Could not load teacher editor permissions.", editorsError);
            return jsonResponse(500, { error: "Could not load lesson-editing permissions." }, configuredOrigin);
        }
        const editorIds = new Set(editors.map((editor) => editor.user_id));
        const users = [];
        for (let page = 1; ; page += 1) {
            const { data, error } = await adminClient.auth.admin.listUsers({ page, perPage: 1000 });
            if (error) {
                console.error("Could not load teacher email addresses.", error);
                return jsonResponse(500, { error: "Could not load teacher email addresses." }, configuredOrigin);
            }
            users.push(...data.users.filter((candidate) => teacherIds.includes(candidate.id)));
            if (data.users.length < 1000) break;
        }
        const staff = users.map((candidate) => {
            const metadata = (candidate.user_metadata || {}) as Record<string, unknown>;
            const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");
            const name = text(metadata.display_name) || text(metadata.displayName)
                || [text(metadata.first_name), text(metadata.last_name)].filter(Boolean).join(" ")
                || text(metadata.full_name) || text(metadata.name);
            return {
                id: candidate.id,
                email: candidate.email || "",
                name,
                role: profiles.find((profile) => profile.id === candidate.id)?.role,
                permissions: { edit_lessons: profiles.some((profile) => profile.id === candidate.id && profile.role === "admin") || editorIds.has(candidate.id) },
                created_at: candidate.created_at
            };
        });
        return jsonResponse(200, { staff }, configuredOrigin);
    }

    let teacher: { id: string; email?: string; user_metadata?: Record<string, unknown> } | null = null;
    if (action === "invite") {
        for (let page = 1; !teacher; page += 1) {
            const { data, error } = await adminClient.auth.admin.listUsers({ page, perPage: 1000 });
            if (error) {
                console.error("Could not check for an existing teacher account.", error);
                return jsonResponse(500, { error: "Could not check the teacher account." }, configuredOrigin);
            }
            teacher = data.users.find((candidate) => candidate.email?.toLowerCase() === email) || null;
            if (data.users.length < 1000) break;
        }
        if (teacher?.user_metadata?.role === "student" || teacher?.user_metadata?.role === "admin") {
            return jsonResponse(409, { error: "This email already belongs to a non-teacher account." }, configuredOrigin);
        }
        let isNewTeacher = false;
        if (!teacher) {
            const redirectTo = new URL("teacher-setup.html", appBaseUrl).href;
            const { data, error } = await adminClient.auth.admin.inviteUserByEmail(email, {
                redirectTo,
                data: { role: "teacher" }
            });
            if (error || !data.user) {
                console.error("Could not send the teacher invitation.", error);
                return jsonResponse(502, { error: error?.message || "The teacher invitation could not be sent." }, configuredOrigin);
            }
            teacher = data.user;
            isNewTeacher = true;
        } else {
            const { data: existingProfile, error: existingProfileError } = await adminClient.from("profiles")
                .select("role").eq("id", teacher.id).maybeSingle();
            if (existingProfileError) {
                console.error("Could not verify the existing account role.", existingProfileError);
                return jsonResponse(500, { error: "Could not verify the existing account role." }, configuredOrigin);
            }
            if (!existingProfile || existingProfile.role !== "teacher") {
                return jsonResponse(409, { error: "This email is already linked to a non-teacher account." }, configuredOrigin);
            }
        }
        if (isNewTeacher) {
            const { data: profile, error: profileError } = await adminClient.from("profiles")
                .update({ role: "teacher" }).eq("id", teacher.id).select("id").maybeSingle();
            if (profileError || !profile) {
                console.error("Could not set the invited account's teacher role.", profileError);
                return jsonResponse(500, { error: "The invitation was sent, but the teacher role could not be set." }, configuredOrigin);
            }
        }
        const { error: metadataError } = await adminClient.auth.admin.updateUserById(teacher.id, {
            user_metadata: { ...teacher.user_metadata, role: "teacher" }
        });
        if (metadataError) {
            console.error("Could not set the invited account's teacher metadata.", metadataError);
            return jsonResponse(500, { error: "The invitation was sent, but the account role could not be set." }, configuredOrigin);
        }
    } else {
        const { data: profile, error: profileError } = await adminClient.from("profiles")
            .select("id,role").eq("id", memberId).maybeSingle();
        if (profileError) {
            console.error("Could not verify the teacher account.", profileError);
            return jsonResponse(500, { error: "Could not verify the teacher account." }, configuredOrigin);
        }
        if (!profile || profile.role !== "teacher") {
            return jsonResponse(404, { error: "Teacher account not found." }, configuredOrigin);
        }
        teacher = { id: profile.id };
    }

    if (!teacher) {
        console.error("Teacher management finished without a resolved account.");
        return jsonResponse(500, { error: "Could not resolve the teacher account." }, configuredOrigin);
    }

    if (action === "remove" || (payload.permissions as { edit_lessons: boolean }).edit_lessons === false) {
        const { error } = await adminClient.from("teacher_lesson_editors").delete().eq("user_id", teacher.id);
        if (error) {
            console.error("Could not revoke lesson-editing permission.", error);
            return jsonResponse(500, { error: "Could not remove lesson-editing permission." }, configuredOrigin);
        }
    } else {
        const { error } = await adminClient.from("teacher_lesson_editors").upsert(
            { user_id: teacher.id },
            { onConflict: "user_id" }
        );
        if (error) {
            console.error("Could not grant lesson-editing permission.", error);
            return jsonResponse(500, { error: "Could not grant lesson-editing permission." }, configuredOrigin);
        }
    }

    return jsonResponse(200, { message: action === "invite" ? "Teacher account saved." : "Teacher access updated." }, configuredOrigin);
});
