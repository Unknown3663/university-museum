import { createClient } from "@supabase/supabase-js";

interface Exhibit {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  category?: string | null;
  published: boolean;
  created_at: string;
}

interface Workshop {
  id: string;
  title: string;
  description: string | null;
  date: string;
  order: number;
  image_url: string | null;
  published: boolean;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // Public site doesn't need session persistence
    autoRefreshToken: false, // Disable auto-refresh since we don't use auth
    detectSessionInUrl: false, // Don't detect sessions from URL
  },
});

// Fetch exhibits with optional published filter
export async function getExhibits(
  publishedOnly: boolean = false
): Promise<Exhibit[]> {
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

  return data as Exhibit[];
}

// Legacy function - kept for backward compatibility
export async function getPublishedExhibits(): Promise<Exhibit[]> {
  return getExhibits(true);
}

// Fetch workshops with optional published filter
export async function getWorkshops(
  publishedOnly: boolean = true
): Promise<Workshop[]> {
  let query = supabase
    .from("workshops")
    .select("*")
    .order("order", { ascending: true });

  if (publishedOnly) {
    query = query.eq("published", true);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching workshops:", error);
    return [];
  }

  return data as Workshop[];
}
