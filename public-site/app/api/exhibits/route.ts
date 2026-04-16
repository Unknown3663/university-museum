import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getExhibitPage } from "../../../lib/publicData";
import { EXHIBITS_PER_PAGE } from "../../../lib/publicDataTypes";

// ISR: revalidate cached response every 30 seconds
export const revalidate = 30;

// Allowed sort values
const ALLOWED_SORTS = new Set(["newest", "oldest", "az", "za"]);

const MAX_PAGE = 10000;

export async function GET(request: NextRequest) {
  try {
    // Parse query parameters (use nextUrl to avoid dynamic server usage in static analysis)
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search");
    const sort = searchParams.get("sort") || "newest";
    const page = parseInt(searchParams.get("page") || "1") || 1;
    const limit =
      parseInt(searchParams.get("limit") || String(EXHIBITS_PER_PAGE)) ||
      EXHIBITS_PER_PAGE;

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

    const result = await getExhibitPage({
      page,
      limit,
      search: search || "",
      sort: sort as "newest" | "oldest" | "az" | "za",
    });

    // Return structured response
    return NextResponse.json(
      result,
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
