import { createClient } from "@supabase/supabase-js";

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
 * @param {Error} error - The error object
 * @param {string} context - Context description for the error
 */
function handleError(error, context = "") {
  const message = context
    ? `❌ [${context}]: ${error.message}`
    : `❌ ${error.message}`;
  console.error(message);
  throw error;
}

// ============ AUTH FUNCTIONS ============
export async function signIn(email, password) {
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

export async function signOut() {
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

export async function isAuthenticated() {
  try {
    const user = await getUser();
    return !!user;
  } catch {
    return false;
  }
}

// ============ EXHIBIT FUNCTIONS ============
export async function getExhibits(publishedOnly = false) {
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
    return data;
  } catch (error) {
    handleError(error, "Fetching exhibits");
  }
}

export async function createExhibit(exhibit) {
  try {
    const { data, error } = await supabase
      .from("exhibits")
      .insert([exhibit])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    handleError(error, "Creating exhibit");
  }
}

export async function updateExhibit(id, updates) {
  try {
    const { data, error } = await supabase
      .from("exhibits")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    handleError(error, "Updating exhibit");
  }
}

export async function deleteExhibit(id) {
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
 * @param {string} id - Exhibit ID
 * @param {boolean} publishStatus - New publish status
 */
export async function togglePublish(id, publishStatus) {
  return await updateExhibit(id, { published: publishStatus });
}

// ============ IMAGE FUNCTIONS ============
export async function uploadImage(file) {
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

export async function deleteImage(imageUrl) {
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
