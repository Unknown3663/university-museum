import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function proxy(request: NextRequest) {
  // Only protect /dashboard routes
  if (!request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  // Get the Supabase access token from the cookie
  // Supabase stores its session in cookies with the format: sb-<project-ref>-auth-token
  const cookies = request.cookies;
  let accessToken: string | null = null;

  // Look for the Supabase auth token in cookies
  for (const [name, cookie] of cookies) {
    if (name.startsWith("sb-") && name.endsWith("-auth-token")) {
      try {
        // Supabase stores a JSON array [access_token, refresh_token] or base64 encoded
        const value = cookie.value;
        // Try parsing as JSON first
        const parsed = JSON.parse(decodeURIComponent(value));
        if (Array.isArray(parsed) && parsed[0]) {
          accessToken = parsed[0];
        } else if (parsed.access_token) {
          accessToken = parsed.access_token;
        }
      } catch {
        // Try using the raw value
        accessToken = cookie.value;
      }
      break;
    }
  }

  if (!accessToken) {
    // No auth token found — redirect to login
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Validate the token with Supabase
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // Env vars missing — block access for safety
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    // Invalid or expired token — redirect to login
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
