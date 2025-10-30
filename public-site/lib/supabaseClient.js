import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // Public site doesn't need session persistence
    autoRefreshToken: false, // Disable auto-refresh since we don't use auth
    detectSessionInUrl: false, // Don't detect sessions from URL
  },
});

// Fetch exhibits with optional published filter
export async function getExhibits(publishedOnly = false) {
  let query = supabase
    .from("exhibits")
    .select("*")
    .order("created_at", { ascending: false });

  if (publishedOnly) {
    query = query.eq("published", true);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching exhibits:", error);
    return [];
  }

  return data;
}

// Legacy function - kept for backward compatibility
export async function getPublishedExhibits() {
  return getExhibits(true);
}
