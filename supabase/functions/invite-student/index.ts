import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
};

function jsonResponse(status: number, body: unknown, origin: string) {
    return new Response(JSON.stringify(body), {
        status,
        headers: { ...corsHeaders, "Access-Control-Allow-Origin": origin }
    });
}

Deno.serve(async (request: Request) => {
    const appUrl = Deno.env.get("APP_URL");
    const appBaseUrl = new URL(appUrl ? (appUrl.endsWith("/") ? appUrl : `${appUrl}/`) : "http://invalid.local/");
    const configuredOrigin = appUrl ? appBaseUrl.origin : "";
    const requestOrigin = request.headers.get("origin") || "";

    if (!configuredOrigin || requestOrigin !== configuredOrigin) {
        return jsonResponse(403, { error: "This site is not allowed to send invitations." }, configuredOrigin);
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
        return jsonResponse(401, { error: "Sign in as a teacher to invite a student." }, configuredOrigin);
    }

    let payload: { action?: unknown; classId?: unknown; email?: unknown; displayName?: unknown; studentUserId?: unknown };
    try {
        payload = await request.json();
    } catch {
        return jsonResponse(400, { error: "The invitation request must contain valid JSON." }, configuredOrigin);
    }

    const action = typeof payload.action === "string" ? payload.action : "invite";
    const classId = typeof payload.classId === "string" ? payload.classId.trim() : "";
    const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
    const displayName = typeof payload.displayName === "string" ? payload.displayName.trim() : "";
    const studentUserId = typeof payload.studentUserId === "string" ? payload.studentUserId.trim() : "";
    const isUuid = (value: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
    if (!["invite", "list-existing", "add-existing"].includes(action)) {
        return jsonResponse(400, { error: "Choose a valid student action." }, configuredOrigin);
    }
    if (action !== "list-existing" && !isUuid(classId)) {
        return jsonResponse(400, { error: "Choose a valid class." }, configuredOrigin);
    }
    if (action === "invite" && (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        || displayName.length < 1 || displayName.length > 120)) {
        return jsonResponse(400, { error: "Enter a valid student name and email address." }, configuredOrigin);
    }
    if (action === "add-existing" && !isUuid(studentUserId)) {
        return jsonResponse(400, { error: "Choose an existing student." }, configuredOrigin);
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !anonKey || !serviceRoleKey) {
        console.error("Student invitation function is missing Supabase environment variables.");
        return jsonResponse(500, { error: "Student invitations are not configured on the server." }, configuredOrigin);
    }

    const userClient = createClient(supabaseUrl, anonKey, {
        global: { headers: { Authorization: authorization } },
        auth: { autoRefreshToken: false, persistSession: false }
    });
    const { data: { user }, error: authError } = await userClient.auth.getUser();
    if (authError || !user) {
        return jsonResponse(401, { error: "Your session expired. Sign in again and retry." }, configuredOrigin);
    }

    const adminClient = createClient(supabaseUrl, serviceRoleKey, {
        auth: { autoRefreshToken: false, persistSession: false }
    });
    const [{ data: context, error: contextError }, { data: canManageClasses, error: permissionError }] = await Promise.all([
        userClient.rpc("teacher_workspace_context"),
        userClient.rpc("teacher_workspace_has_permission", { permission_name: "manage_classes_students" })
    ]);
    if (contextError || permissionError || !context?.owner_id || !["teacher", "admin"].includes(context.role)) {
        console.error("Could not verify student invitation permissions.", contextError || permissionError);
        return jsonResponse(500, { error: "Could not verify class permissions. Apply the latest database migration." }, configuredOrigin);
    }
    if (canManageClasses !== true) {
        return jsonResponse(403, { error: "You do not have permission to manage class students." }, configuredOrigin);
    }

    const isAdmin = context.role === "admin";
    if (action === "list-existing") {
        let directoryQuery = adminClient.from("teacher_student_directory")
            .select("student_user_id,email,display_name")
            .order("display_name");
        if (!isAdmin) directoryQuery = directoryQuery.eq("teacher_id", user.id);
        const { data: students, error: directoryError } = await directoryQuery;
        if (directoryError) {
            console.error("Could not load the teacher's existing student directory.", directoryError);
            return jsonResponse(500, { error: "Could not load the existing students. Apply the latest database migration." }, configuredOrigin);
        }
        return jsonResponse(200, {
            students: [...new Map((students || []).map((student) => [String(student.student_user_id), student])).values()].map((student) => ({
                id: String(student.student_user_id),
                email: String(student.email || ""),
                displayName: String(student.display_name || "")
            }))
        }, configuredOrigin);
    }

    let classQuery = adminClient.from("teacher_classes").select("id,teacher_id").eq("id", classId);
    if (!isAdmin) classQuery = classQuery.eq("teacher_id", user.id);
    const { data: group, error: classError } = await classQuery.maybeSingle();
    if (classError) {
        console.error("Could not verify class ownership.", classError);
        return jsonResponse(500, { error: "Could not verify that this class belongs to you." }, configuredOrigin);
    }
    if (!group) return jsonResponse(404, { error: "Class not found." }, configuredOrigin);

    if (action === "add-existing") {
        let directoryQuery = adminClient.from("teacher_student_directory")
            .select("student_user_id,email,display_name")
            .eq("student_user_id", studentUserId);
        if (isAdmin) directoryQuery = directoryQuery.limit(1);
        else directoryQuery = directoryQuery.eq("teacher_id", user.id);
        const { data: existingStudent, error: directoryError } = await directoryQuery.maybeSingle();
        if (directoryError) {
            console.error("Could not verify the selected student.", directoryError);
            return jsonResponse(500, { error: "Could not verify the selected student." }, configuredOrigin);
        }
        if (!existingStudent) return jsonResponse(404, { error: "This student is not in your student directory." }, configuredOrigin);

        const [{ data: profile, error: profileError }, { data: classStudents, error: membershipError }] = await Promise.all([
            adminClient.from("profiles").select("role").eq("id", studentUserId).maybeSingle(),
            adminClient.from("class_students").select("id,linked_user_id,email,display_name").eq("class_id", classId)
        ]);
        if (profileError || membershipError) {
            console.error("Could not verify the selected student's account or class membership.", profileError || membershipError);
            return jsonResponse(500, { error: "Could not verify the selected student's account." }, configuredOrigin);
        }
        if (profile?.role !== "student") {
            return jsonResponse(409, { error: "Only a student account can be added to this class." }, configuredOrigin);
        }
        const existingMembership = (classStudents || []).find((student) => student.linked_user_id === studentUserId);
        if (existingMembership) return jsonResponse(409, { error: "This student is already in the class." }, configuredOrigin);

        const emailMembership = (classStudents || []).find((student) =>
            typeof student.email === "string" && student.email.toLowerCase() === existingStudent.email.toLowerCase()
        );
        if (emailMembership) {
            if (emailMembership.linked_user_id) {
                return jsonResponse(409, { error: "This email address is already linked to another account in the class." }, configuredOrigin);
            }
            const { error: linkError } = await adminClient.from("class_students").update({
                linked_user_id: studentUserId,
                email: existingStudent.email
            }).eq("id", emailMembership.id);
            if (linkError) {
                console.error("Could not link the existing class roster entry to the selected student.", linkError);
                return jsonResponse(500, { error: "Could not link the student to the class." }, configuredOrigin);
            }
            return jsonResponse(200, { message: "Existing student added to the class." }, configuredOrigin);
        }

        const classStudentNames = new Set((classStudents || []).map((student) => String(student.display_name).toLocaleLowerCase()));
        const baseDisplayName = String(existingStudent.display_name);
        let displayName = baseDisplayName;
        let suffix = 2;
        while (classStudentNames.has(displayName.toLocaleLowerCase())) {
            const suffixText = ` (${suffix++})`;
            displayName = `${baseDisplayName.slice(0, 120 - suffixText.length)}${suffixText}`;
        }

        const { error: insertError } = await adminClient.from("class_students").insert({
            class_id: classId,
            teacher_id: group.teacher_id,
            display_name: displayName,
            email: existingStudent.email,
            linked_user_id: studentUserId
        });
        if (insertError) {
            console.error("Could not add the existing student to the selected class.", insertError);
            return jsonResponse(insertError.code === "23505" ? 409 : 500, {
                error: insertError.code === "23505" ? "This student is already in the class." : "Could not add the student to the class."
            }, configuredOrigin);
        }
        return jsonResponse(200, { message: "Existing student added to the class." }, configuredOrigin);
    }

    const { data: existingStudent, error: studentLookupError } = await adminClient.from("class_students")
        .select("id").eq("class_id", classId).eq("email", email).maybeSingle();
    if (studentLookupError) {
        console.error("Could not check whether this student is already in the class.", studentLookupError);
        return jsonResponse(500, { error: "Could not check the class roster." }, configuredOrigin);
    }
    if (existingStudent) return jsonResponse(409, { error: "This email is already in the class." }, configuredOrigin);

    const { data: studentRecord, error: insertError } = await adminClient.from("class_students")
        .insert({ class_id: classId, teacher_id: group.teacher_id, display_name: displayName, email })
        .select("id").single();
    if (insertError) {
        console.error("Could not add the student invitation to the class.", insertError);
        return jsonResponse(500, { error: "Could not add the student to the class." }, configuredOrigin);
    }

    const redirectTo = new URL("student.html", appBaseUrl).href;
    const { data: invite, error: inviteError } = await adminClient.auth.admin.inviteUserByEmail(email, {
        redirectTo,
        data: {
            role: "student",
            display_name: displayName,
            first_name: displayName.split(/\s+/)[0],
            last_name: displayName.split(/\s+/).slice(1).join(" ")
        }
    });
    if (inviteError || !invite.user) {
        const { error: cleanupError } = await adminClient.from("class_students").delete().eq("id", studentRecord.id);
        if (cleanupError) console.error("Could not clean up the class roster after the invitation failed.", cleanupError);
        console.error("Could not send the student invitation.", inviteError);
        return jsonResponse(502, {
            error: inviteError?.message || "The email invitation could not be sent. Check the Auth email settings."
        }, configuredOrigin);
    }

    const { error: linkError } = await adminClient.from("class_students")
        .update({ linked_user_id: invite.user.id }).eq("id", studentRecord.id);
    if (linkError) {
        console.error("The invite was sent, but the new user could not be linked to the class.", linkError);
        return jsonResponse(500, { error: "The email was sent, but linking the student failed. Contact the administrator." }, configuredOrigin);
    }

    const { error: directoryError } = await adminClient.from("teacher_student_directory").upsert({
        teacher_id: group.teacher_id,
        student_user_id: invite.user.id,
        email: invite.user.email?.toLowerCase() || email,
        display_name: displayName
    }, { onConflict: "teacher_id,student_user_id" });
    if (directoryError) {
        console.error("The invitation was sent, but the student directory could not be updated.", directoryError);
        return jsonResponse(500, { error: "The invitation was sent, but the existing-student list could not be updated. Apply the latest database migration." }, configuredOrigin);
    }

    return jsonResponse(200, { message: "Invitation sent." }, configuredOrigin);
});
