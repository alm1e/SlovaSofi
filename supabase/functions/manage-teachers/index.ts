import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
};

const permissionKeys = [
    "view_classes_students",
    "manage_classes_students",
    "view_assign_lessons",
    "edit_lessons",
    "manage_teachers"
] as const;

type Permissions = Record<typeof permissionKeys[number], boolean>;

function jsonResponse(status: number, body: Record<string, string>, origin: string) {
    return new Response(JSON.stringify(body), {
        status,
        headers: { ...corsHeaders, "Access-Control-Allow-Origin": origin }
    });
}

function validPermissions(value: unknown): value is Permissions {
    if (!value || typeof value !== "object" || Array.isArray(value)) return false;
    const candidate = value as Record<string, unknown>;
    return permissionKeys.every((key) => typeof candidate[key] === "boolean")
        && Object.keys(candidate).every((key) => permissionKeys.includes(key as typeof permissionKeys[number]));
}

Deno.serve(async (request: Request) => {
    const appUrl = Deno.env.get("APP_URL");
    const appBaseUrl = new URL(appUrl ? (appUrl.endsWith("/") ? appUrl : `${appUrl}/`) : "http://invalid.local/");
    const configuredOrigin = appUrl ? appBaseUrl.origin : "";
    const requestOrigin = request.headers.get("origin") || "";

    if (!configuredOrigin || requestOrigin !== configuredOrigin) {
        return jsonResponse(403, { error: "This site is not allowed to manage staff." }, configuredOrigin);
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
        return jsonResponse(401, { error: "Sign in before managing staff." }, configuredOrigin);
    }

    let payload: { action?: unknown; email?: unknown; permissions?: unknown; memberId?: unknown };
    try {
        payload = await request.json();
    } catch {
        return jsonResponse(400, { error: "The request must contain valid JSON." }, configuredOrigin);
    }

    const action = typeof payload.action === "string" ? payload.action : "";
    const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
    const memberId = typeof payload.memberId === "string" ? payload.memberId.trim() : "";
    if (!["invite", "update", "remove"].includes(action)) {
        return jsonResponse(400, { error: "Choose a valid staff action." }, configuredOrigin);
    }
    if ((action === "invite" && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254))
        || (action !== "invite" && !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(memberId))
        || (action !== "remove" && (!validPermissions(payload.permissions)
            || !Object.values(payload.permissions).some((allowed) => allowed === true)))) {
        return jsonResponse(400, { error: "Enter a valid email, staff member, and complete permission set." }, configuredOrigin);
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !anonKey || !serviceRoleKey) {
        console.error("Staff management function is missing Supabase environment variables.");
        return jsonResponse(500, { error: "Staff management is not configured on the server." }, configuredOrigin);
    }

    const userClient = createClient(supabaseUrl, anonKey, {
        global: { headers: { Authorization: authorization } },
        auth: { autoRefreshToken: false, persistSession: false }
    });
    const { data: { user }, error: authError } = await userClient.auth.getUser();
    if (authError || !user) {
        return jsonResponse(401, { error: "Your session expired. Sign in again and retry." }, configuredOrigin);
    }
    const [{ data: context, error: contextError }, { data: canManage, error: permissionError }] = await Promise.all([
        userClient.rpc("teacher_workspace_context"),
        userClient.rpc("teacher_workspace_has_permission", { permission_name: "manage_teachers" })
    ]);
    if (contextError || permissionError || !context?.owner_id) {
        console.error("Could not verify staff management access.", contextError || permissionError);
        return jsonResponse(500, { error: "Could not verify workspace permissions. Apply the latest database migration." }, configuredOrigin);
    }
    if (canManage !== true) return jsonResponse(403, { error: "You do not have permission to manage staff." }, configuredOrigin);

    const adminClient = createClient(supabaseUrl, serviceRoleKey, {
        auth: { autoRefreshToken: false, persistSession: false }
    });
    const ownerId = String(context.owner_id);

    if (action === "remove") {
        const { data: deleted, error: deleteError } = await adminClient.from("teacher_workspace_members")
            .delete().eq("id", memberId).eq("owner_id", ownerId).select("id").maybeSingle();
        if (deleteError) {
            console.error("Could not remove the workspace teacher.", deleteError);
            return jsonResponse(500, { error: "Could not remove this teacher." }, configuredOrigin);
        }
        if (!deleted) return jsonResponse(404, { error: "Teacher not found in this workspace." }, configuredOrigin);
        return jsonResponse(200, { message: "Teacher access removed." }, configuredOrigin);
    }

    if (action === "update") {
        const { data: updated, error: updateError } = await adminClient.from("teacher_workspace_members")
            .update({ permissions: payload.permissions })
            .eq("id", memberId).eq("owner_id", ownerId).select("id").maybeSingle();
        if (updateError) {
            console.error("Could not update workspace teacher permissions.", updateError);
            return jsonResponse(500, { error: "Could not update teacher permissions." }, configuredOrigin);
        }
        if (!updated) return jsonResponse(404, { error: "Teacher not found in this workspace." }, configuredOrigin);
        return jsonResponse(200, { message: "Teacher permissions updated." }, configuredOrigin);
    }

    const { data: existingMembership, error: membershipLookupError } = await adminClient.from("teacher_workspace_members")
        .select("id").eq("owner_id", ownerId).eq("email", email).maybeSingle();
    if (membershipLookupError) {
        console.error("Could not check existing workspace teacher access.", membershipLookupError);
        return jsonResponse(500, { error: "Could not check existing staff access." }, configuredOrigin);
    }
    if (existingMembership) return jsonResponse(409, { error: "This email already has access to the workspace." }, configuredOrigin);

    let invitedUser: { id: string; user_metadata?: Record<string, unknown> } | null = null;
    for (let page = 1; !invitedUser; page += 1) {
        const { data: users, error: usersError } = await adminClient.auth.admin.listUsers({ page, perPage: 1000 });
        if (usersError) {
            console.error("Could not check whether the staff account already exists.", usersError);
            return jsonResponse(500, { error: "Could not check the teacher account." }, configuredOrigin);
        }
        invitedUser = users.users.find((candidate) => candidate.email?.toLowerCase() === email) || null;
        if (users.users.length < 1000) break;
    }

    if (invitedUser?.user_metadata?.role === "student") {
        return jsonResponse(409, { error: "This email belongs to a student account. Use a different email for a teacher." }, configuredOrigin);
    }
    if (invitedUser) {
        const [{ data: otherMembership, error: otherMembershipError }, { count: ownedClasses, error: classesError }, { count: ownedLessons, error: lessonsError }, { data: ownSettings, error: settingsError }] = await Promise.all([
            adminClient.from("teacher_workspace_members").select("id").eq("member_id", invitedUser.id).maybeSingle(),
            adminClient.from("teacher_classes").select("id", { count: "exact", head: true }).eq("teacher_id", invitedUser.id),
            adminClient.from("teacher_lessons").select("id", { count: "exact", head: true }).eq("teacher_id", invitedUser.id),
            adminClient.from("teacher_workspace_settings").select("user_id").eq("user_id", invitedUser.id).maybeSingle()
        ]);
        const ownershipError = otherMembershipError || classesError || lessonsError || settingsError;
        if (ownershipError) {
            console.error("Could not check whether the account already owns or belongs to a workspace.", ownershipError);
            return jsonResponse(500, { error: "Could not verify this teacher's existing workspace." }, configuredOrigin);
        }
        if (otherMembership || ownSettings || (ownedClasses || 0) > 0 || (ownedLessons || 0) > 0) {
            return jsonResponse(409, {
                error: "This account already owns or belongs to a workspace and cannot be added to another school."
            }, configuredOrigin);
        }
    }

    const alreadyHadAccount = Boolean(invitedUser);
    if (!invitedUser) {
        const redirectTo = new URL("teacher.html", appBaseUrl).href;
        const { data: invitation, error: inviteError } = await adminClient.auth.admin.inviteUserByEmail(email, {
            redirectTo,
            data: { role: "teacher" }
        });
        if (inviteError || !invitation.user) {
            console.error("Could not send the teacher invitation.", inviteError);
            return jsonResponse(502, {
                error: inviteError?.message || "The email invitation could not be sent. Check the Auth email settings."
            }, configuredOrigin);
        }
        invitedUser = invitation.user;
    }

    const { error: insertError } = await adminClient.from("teacher_workspace_members").insert({
        owner_id: ownerId,
        member_id: invitedUser.id,
        email,
        permissions: payload.permissions
    });
    if (insertError) {
        console.error("Could not save the teacher workspace membership.", insertError);
        return jsonResponse(500, {
            error: "The account was found or invited, but workspace access could not be saved. Retry the invitation."
        }, configuredOrigin);
    }

    return jsonResponse(200, {
        message: alreadyHadAccount ? "Teacher access granted." : "Teacher invitation sent."
    }, configuredOrigin);
});
