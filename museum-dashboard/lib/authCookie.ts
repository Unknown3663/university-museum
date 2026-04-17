import type { Session } from "@supabase/supabase-js";

export const AUTH_COOKIE_NAME = "museum-dashboard-auth-token";
const AUTH_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

interface SessionCookiePayload {
  access_token: string;
  refresh_token: string;
}

export function buildSessionCookieValue(session: Session): string {
  return encodeURIComponent(
    JSON.stringify({
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    } satisfies SessionCookiePayload),
  );
}

export function parseSessionCookieValue(
  value: string | undefined,
): SessionCookiePayload | null {
  if (!value) return null;

  try {
    const parsed = JSON.parse(decodeURIComponent(value));
    if (
      parsed &&
      typeof parsed.access_token === "string" &&
      typeof parsed.refresh_token === "string"
    ) {
      return parsed satisfies SessionCookiePayload;
    }
  } catch {
    return null;
  }

  return null;
}

export function buildSessionCookieString(session: Session): string {
  const secure = typeof window !== "undefined" && window.location.protocol === "https:";

  return [
    `${AUTH_COOKIE_NAME}=${buildSessionCookieValue(session)}`,
    "Path=/",
    `Max-Age=${AUTH_COOKIE_MAX_AGE_SECONDS}`,
    "SameSite=Lax",
    secure ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");
}

export function buildExpiredSessionCookieString(): string {
  const secure = typeof window !== "undefined" && window.location.protocol === "https:";

  return [
    `${AUTH_COOKIE_NAME}=`,
    "Path=/",
    "Max-Age=0",
    "SameSite=Lax",
    secure ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");
}
