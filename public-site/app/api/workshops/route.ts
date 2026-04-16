import { NextResponse } from "next/server";
import { getPublishedWorkshops } from "../../../lib/publicData";

// ISR: revalidate cached response every 60 seconds
export const revalidate = 60;

export async function GET() {
  try {
    const workshops = await getPublishedWorkshops();

    return NextResponse.json(
      { workshops },
      {
        status: 200,
        headers: {
          // Allow Vercel CDN edge-caching; stale-while-revalidate keeps responses fast
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
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
