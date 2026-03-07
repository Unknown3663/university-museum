# Authentication

Authentication is used exclusively in `museum-dashboard`. The public site has no auth.

---

## Overview

| Mechanism               | Details                                             |
| ----------------------- | --------------------------------------------------- |
| Provider                | Supabase Auth (email + password)                    |
| Sign-ups                | Disabled — only manually provisioned admin accounts |
| MFA                     | TOTP enabled                                        |
| Session storage         | Supabase default (cookies)                          |
| Server-side enforcement | `museum-dashboard/proxy.ts`                         |
| Client-side enforcement | `ProtectedRoute` component                          |

---

## Login Flow

1. User visits `/login` in `museum-dashboard`.
2. `login/page.tsx` renders an email + password form.
3. On submit, `signIn(email, password)` from `museum-dashboard/lib/supabaseClient.ts` is called.
4. `supabase.auth.signInWithPassword()` is invoked; on success Supabase sets auth cookies.
5. The user is redirected to `/dashboard`.

### Error handling

The login error message is hardened to a generic string — it does not distinguish between "email not found" and "wrong password" to prevent user enumeration.

---

## Server-Side Auth Proxy (`proxy.ts`)

**File:** `museum-dashboard/proxy.ts`

This is a Next.js middleware-equivalent that protects all `/dashboard/*` routes at the edge.

### How it works

1. Intercepts every request to `/dashboard/*`.
2. Reads the Supabase auth token cookie (`sb-<project-ref>-auth-token`).
3. Parses the access token from the cookie value (handles JSON array format and `access_token` object format).
4. Creates a temporary `@supabase/supabase-js` client with the token in the `Authorization` header.
5. Calls `supabase.auth.getUser()` to validate the token against Supabase.
6. If invalid/missing → `302` redirect to `/login?redirect=<original-path>`.
7. If valid → request proceeds.

### Fallback behaviour

- Missing env vars → redirect to `/login` (fail-safe).
- Cookie parse error → falls back to raw cookie value.

---

## Client-Side Route Guard (`ProtectedRoute`)

**File:** `museum-dashboard/app/dashboard/components/ProtectedRoute.tsx`

A React component that wraps dashboard page content.

```tsx
export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
});
```

### Behaviour

1. Calls `isAuthenticated()` from `supabaseClient.ts` on mount.
2. Shows a full-screen spinner while checking.
3. Redirects to `/login` if not authenticated.
4. Renders `children` if authenticated.

This provides a second layer of protection in case the middleware is bypassed (e.g., direct client-side navigation).

---

## Auth Functions (`museum-dashboard/lib/supabaseClient.ts`)

| Function          | Signature                               | Description                              |
| ----------------- | --------------------------------------- | ---------------------------------------- |
| `signIn`          | `(email, password) → Promise<AuthData>` | Signs in with email + password           |
| `signOut`         | `() → Promise<void>`                    | Signs the user out and clears session    |
| `getUser`         | `() → Promise<User \| null>`            | Returns current authenticated user       |
| `isAuthenticated` | `() → Promise<boolean>`                 | Returns `true` if a valid session exists |

All functions throw on error via the centralised `handleError()` helper which logs context-tagged messages.

---

## Sign-Out

Handled in the `Navbar` component of the dashboard. Calls `signOut()` then redirects to `/login`.
