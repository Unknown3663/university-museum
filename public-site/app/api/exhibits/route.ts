import { supabase } from "../../../lib/supabaseClient";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// ISR: revalidate cached response every 30 seconds
export const revalidate = 30;

// Allowed sort values
const ALLOWED_SORTS = new Set(["newest", "oldest", "az", "za"]);

// Max search query length
const MAX_SEARCH_LENGTH = 100;
const MAX_PAGE = 10000;

export async function GET(request: NextRequest) {
  try {
    // Parse query parameters from URL
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const sort = searchParams.get("sort") || "newest";
    const page = parseInt(searchParams.get("page") || "1") || 1;
    const limit = parseInt(searchParams.get("limit") || "6") || 6;

    // Validate pagination parameters
    if (page < 1 || limit < 1 || limit > 100 || page > MAX_PAGE) {
      return NextResponse.json(
        { error: "Invalid pagination parameters" },
        { status: 400 },
      );
    }

    // Validate sort parameter against whitelist
    if (!ALLOWED_SORTS.has(sort)) {
      return NextResponse.json(
        { error: "Invalid sort parameter" },
        { status: 400 },
      );
    }

    // Start building the query - only fetch published exhibits, project only needed columns
    let query = supabase
      .from("exhibits")
      .select(
        "id,title,description,title_translations,description_translations,image_url,published,created_at",
        { count: "exact" },
      )
      .eq("published", true);

    // Apply search filter with sanitization
    if (search && search.trim()) {
      const sanitizedSearch = search.trim().slice(0, MAX_SEARCH_LENGTH);
      // Escape special PostgREST filter characters to prevent filter injection
      const escapedSearch = sanitizedSearch.replace(/[%_\\(),.]/g, "");
      if (escapedSearch.length > 0) {
        query = query.or(
          `title.ilike.%${escapedSearch}%,description.ilike.%${escapedSearch}%`,
        );
      }
    }

    // Apply sorting (already validated against whitelist above)
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
        { error: "Failed to fetch exhibits" },
        { status: 500 },
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
          // Allow Vercel CDN edge-caching; stale-while-revalidate keeps responses fast
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
        },
      },
    );
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
