import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============ AUTH FUNCTIONS ============
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
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
    throw error;
  }

  return data;
}

export async function createExhibit(exhibit) {
  const { data, error } = await supabase
    .from("exhibits")
    .insert([exhibit])
    .select()
    .single();

  if (error) {
    console.error("Error creating exhibit:", error);
    throw error;
  }

  return data;
}

export async function updateExhibit(id, updates) {
  const { data, error } = await supabase
    .from("exhibits")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating exhibit:", error);
    throw error;
  }

  return data;
}

export async function deleteExhibit(id) {
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

  if (error) {
    console.error("Error deleting exhibit:", error);
    throw error;
  }
}

// ============ IMAGE FUNCTIONS ============
export async function uploadImage(file) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("exhibit-images")
    .upload(filePath, file);

  if (uploadError) {
    console.error("Error uploading image:", uploadError);
    throw uploadError;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("exhibit-images").getPublicUrl(filePath);

  return publicUrl;
}

export async function deleteImage(imageUrl) {
  try {
    const path = imageUrl.split("/exhibit-images/")[1];
    if (!path) return;

    const { error } = await supabase.storage
      .from("exhibit-images")
      .remove([path]);

    if (error) {
      console.error("Error deleting image:", error);
    }
  } catch (err) {
    console.error("Error parsing image URL:", err);
  }
}
