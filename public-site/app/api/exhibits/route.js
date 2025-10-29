import { supabase } from "../../../lib/supabaseClient.js";
import { NextResponse } from "next/server";

// Disable caching to always fetch fresh data
export const revalidate = 0;

export async function GET(request) {
  try {
    // Parse query parameters from URL
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort") || "newest";
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 6;

    // Validate pagination parameters
    if (page < 1 || limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: "Invalid pagination parameters" },
        { status: 400 }
      );
    }

    // Start building the query - only fetch published exhibits
    let query = supabase
      .from("exhibits")
      .select("*", { count: "exact" })
      .eq("published", true);

    // Apply category filter
    if (category && category !== "All") {
      query = query.eq("category", category);
    }

    // Apply search filter (case-insensitive match on title or description)
    if (search && search.trim()) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // Apply sorting
    switch (sort) {
      case "newest":
        query = query.order("created_at", { ascending: false });
        break;
      case "oldest":
        query = query.order("created_at", { ascending: true });
        break;
      case "az":
        query = query.order("title", { ascending: true });
        break;
      case "za":
        query = query.order("title", { ascending: false });
        break;
      default:
        query = query.order("created_at", { ascending: false });
    }

    // Apply pagination using range
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit - 1;
    query = query.range(startIndex, endIndex);

    // Execute the query
    const { data: exhibits, error, count } = await query;

    // Handle Supabase errors
    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        {
          error: "Failed to fetch exhibits",
          message: error.message,
        },
        { status: 500 }
      );
    }

    // Calculate pagination metadata
    const totalPages = Math.ceil((count || 0) / limit);
    const hasMore = page < totalPages;

    // Return structured response
    return NextResponse.json(
      {
        exhibits: exhibits || [],
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages,
          hasMore,
        },
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
