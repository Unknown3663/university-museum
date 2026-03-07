import { supabase } from "../../../lib/supabaseClient";
import { NextResponse } from "next/server";

// ISR: revalidate cached response every 60 seconds
export const revalidate = 60;

export async function GET() {
  try {
    const { data: workshops, error } = await supabase
      .from("workshops")
      .select("id,title,description,date,order,image_url,published")
      .eq("published", true)
      .order("order", { ascending: true });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to fetch workshops" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { workshops: workshops || [] },
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
