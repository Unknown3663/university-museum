import { createClient } from "@supabase/supabase-js";
import type { Exhibit, Workshop } from "../../shared/types";

// ============ ENVIRONMENT VALIDATION ============
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

// ============ SUPABASE CLIENT ============
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============ ERROR HANDLER ============
/**
 * Centralized error handler
 */
function handleError(error: any, context: string = ""): never {
  const message = context
    ? `❌ [${context}]: ${error.message}`
    : `❌ ${error.message}`;
  console.error(message);
  throw error;
}

// ============ AUTH FUNCTIONS ============
export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  } catch (error) {
    handleError(error, "Signing in");
  }
}

export async function signOut(): Promise<void> {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    handleError(error, "Signing out");
  }
}

export async function getUser() {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error) {
    handleError(error, "Getting user");
  }
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const user = await getUser();
    return !!user;
  } catch {
    return false;
  }
}

// ============ EXHIBIT FUNCTIONS ============
export async function getExhibits(
  publishedOnly: boolean = false
): Promise<Exhibit[]> {
  try {
    let query = supabase
      .from("exhibits")
      .select("*")
      .order("created_at", { ascending: false });

    if (publishedOnly) {
      query = query.eq("published", true);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data as Exhibit[];
  } catch (error) {
    handleError(error, "Fetching exhibits");
  }
}

export async function createExhibit(exhibit: Exhibit): Promise<Exhibit> {
  try {
    const { data, error } = await supabase
      .from("exhibits")
      .insert([exhibit])
      .select()
      .single();

    if (error) throw error;
    return data as Exhibit;
  } catch (error) {
    handleError(error, "Creating exhibit");
  }
}

export async function updateExhibit(
  id: string,
  updates: Partial<Exhibit>
): Promise<Exhibit> {
  try {
    const { data, error } = await supabase
      .from("exhibits")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as Exhibit;
  } catch (error) {
    handleError(error, "Updating exhibit");
  }
}

export async function deleteExhibit(id: string): Promise<void> {
  try {
    // First, get the exhibit to delete its image
    const { data: exhibit } = await supabase
      .from("exhibits")
      .select("image_url")
      .eq("id", id)
      .single();

    if (exhibit?.image_url) {
      await deleteImage(exhibit.image_url);
    }

    const { error } = await supabase.from("exhibits").delete().eq("id", id);

    if (error) throw error;
  } catch (error) {
    handleError(error, "Deleting exhibit");
  }
}

/**
 * Toggle publish status of an exhibit
 */
export async function togglePublish(
  id: string,
  publishStatus: boolean
): Promise<Exhibit> {
  return await updateExhibit(id, { published: publishStatus });
}

// ============ IMAGE FUNCTIONS ============
export async function uploadImage(file: File): Promise<string> {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("exhibit-images")
      .upload(filePath, file);

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      if (
        uploadError.message?.includes("row-level security") ||
        uploadError.message?.includes("policy")
      ) {
        throw new Error(
          "Storage permission error. Please configure Supabase Storage policies to allow authenticated users to upload images. See console for details."
        );
      }
      throw uploadError;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("exhibit-images").getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    handleError(error, "Uploading image");
  }
}

export async function deleteImage(imageUrl: string): Promise<void> {
  try {
    const path = imageUrl.split("/exhibit-images/")[1];
    if (!path) return;

    const { error } = await supabase.storage
      .from("exhibit-images")
      .remove([path]);

    if (error) throw error;
  } catch (error) {
    handleError(error, "Deleting image");
  }
}

// ============ WORKSHOP FUNCTIONS ============
/**
 * Fetch all workshops (ordered by order number)
 */
export async function getWorkshops(): Promise<Workshop[]> {
  try {
    const { data, error } = await supabase
      .from("workshops")
      .select("*")
      .order("order", { ascending: true });

    if (error) throw error;
    return (data as Workshop[]) || [];
  } catch (error) {
    handleError(error, "Fetching workshops");
  }
}

/**
 * Create a new workshop
 */
export async function createWorkshop(
  workshopData: Workshop
): Promise<Workshop> {
  try {
    const { data, error } = await supabase
      .from("workshops")
      .insert([workshopData])
      .select()
      .single();

    if (error) throw error;
    return data as Workshop;
  } catch (error) {
    handleError(error, "Creating workshop");
  }
}

/**
 * Update an existing workshop
 */
export async function updateWorkshop(
  id: string,
  updates: Partial<Workshop>
): Promise<Workshop> {
  try {
    const { data, error } = await supabase
      .from("workshops")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as Workshop;
  } catch (error) {
    handleError(error, "Updating workshop");
  }
}

/**
 * Delete a workshop
 */
export async function deleteWorkshop(id: string): Promise<void> {
  try {
    const { error } = await supabase.from("workshops").delete().eq("id", id);

    if (error) throw error;
  } catch (error) {
    handleError(error, "Deleting workshop");
  }
}

/**
 * Toggle workshop publish status
 */
export async function toggleWorkshopPublish(
  id: string,
  publishStatus: boolean
): Promise<Workshop> {
  return await updateWorkshop(id, { published: publishStatus });
}
