window.supabaseClient = window.supabase.createClient(
    "https://vvrxhiextryjnzpxvals.supabase.co",
    "sb_publishable_9ZaFxUmKZuifFYPIY01cfA_7d3ru597",
    {
        auth: {
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true
        }
    }
);