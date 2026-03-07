# Security

This document summarises every security hardening measure applied to the project.

---

## HTTP Security Headers

Applied via `async headers()` in both `next.config.js` files. Every route (`"/(.*)"`) receives:

| Header                      | Value                                                          | Purpose                    |
| --------------------------- | -------------------------------------------------------------- | -------------------------- |
| `Content-Security-Policy`   | (see below)                                                    | Restricts resource origins |
| `X-Content-Type-Options`    | `nosniff`                                                      | Prevents MIME sniffing     |
| `X-Frame-Options`           | `DENY`                                                         | Blocks clickjacking        |
| `X-XSS-Protection`          | `1; mode=block`                                                | Legacy XSS filter          |
| `Referrer-Policy`           | `strict-origin-when-cross-origin`                              | Controls referrer leakage  |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload`                 | Forces HTTPS for 2 years   |
| `Permissions-Policy`        | `camera=(), microphone=(), geolocation=(), interest-cohort=()` | Disables browser features  |

`poweredByHeader: false` removes the `X-Powered-By: Next.js` header in both configs.

### CSP Directives (Public Site)

```
default-src 'self'
script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://cdn.vercel-insights.com
style-src 'self' 'unsafe-inline'
img-src 'self' data: blob: https://*.supabase.co
font-src 'self'
connect-src 'self' https://*.supabase.co wss://*.supabase.co https://va.vercel-scripts.com https://vitals.vercel-insights.com
frame-ancestors 'none'
base-uri 'self'
form-action 'self'
object-src 'none'
```

The dashboard CSP is similar but without the Vercel Analytics domains.

---

## Authentication & Access Control

- **No public sign-ups** — `supabase` project has email sign-ups disabled.
- **Server-side auth enforcement** via `museum-dashboard/proxy.ts` — validates the Supabase session cookie on every `/dashboard/*` request at the edge.
- **Client-side guard** via `ProtectedRoute` component as a second layer.
- **Hardened login error** — "Invalid email or password" for all failures; does not distinguish "email not found" vs "wrong password" (prevents user enumeration).
- **TOTP MFA** enabled on Supabase Auth.
- **Secure password change** requires re-authentication within 24 h.
- **Minimum password length:** 12 characters.

---

## API Input Validation

All inputs to `GET /api/exhibits` are validated server-side:

| Input    | Validation                                                           |
| -------- | -------------------------------------------------------------------- |
| `page`   | Integer, 1 – 10000                                                   |
| `limit`  | Integer, 1 – 100                                                     |
| `sort`   | Whitelist: `newest \| oldest \| az \| za`                            |
| `search` | Trimmed, max 100 chars, special PostgREST chars stripped (`%_\(),.`) |

Returns `400` for invalid params; never exposes internal `error.message` in responses.

---

## Form Validation (Dashboard)

Both `UploadForm` and `WorkshopForm` enforce client-side validation before submitting:

| Field            | Constraint                                                |
| ---------------- | --------------------------------------------------------- |
| `title`          | Max 255 characters                                        |
| `description`    | Max 5000 characters                                       |
| Image file       | MIME type: jpeg / png / webp / gif only                   |
| Image file       | Max 5 MB                                                  |
| `<input accept>` | Restricted to specific MIME types (not generic `image/*`) |

MIME type is validated against a `Set` (`ALLOWED_IMAGE_TYPES`) at the JS layer and enforced at the Supabase storage bucket level.

---

## Storage Security

### File Naming

Images are stored as `<crypto.randomUUID()>.<ext>`, NOT using the original `file.name`. This prevents:

- Extension spoofing (e.g., `malware.php.jpg`)
- Guessable storage paths

### Extension Derivation

Extension is derived from the validated MIME type via a hardcoded map:

```ts
{ "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif" }
```

### Delete Validation (`deleteImage`)

Before removing a storage object, the URL is checked:

1. Must start with `https://gzmouasbhzucflpcgsfu.supabase.co` (Supabase origin)
2. Must not contain `..` (prevents path traversal attacks)

### Bucket MIME Restriction

The `exhibit-images` storage bucket has `allowed_mime_types` set to `[image/jpeg, image/png, image/webp, image/gif]` directly in Supabase — server-side enforcement independent of client validation.

---

## SVG

`dangerouslyAllowSVG: false` is set in the dashboard `next.config.js` `images` object to prevent SVG-based XSS via `next/image`.

---

## Row-Level Security

Both `exhibits` and `workshops` tables have RLS enabled. The `workshops` table uses four granular role-bound policies (`SELECT/INSERT/UPDATE/DELETE` each bound to the correct role), replacing an earlier broken `ALL` policy.

See [database.md](./database.md) for full RLS details.

---

## Environment Variables

Both Supabase clients check for the required env vars at module init time:

```ts
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables. ...");
}
```

This prevents silent failures with undefined credentials.

---

## Public Site Supabase Client

The public-site Supabase client uses a session-less configuration:

```ts
auth: {
  persistSession: false,
  autoRefreshToken: false,
  detectSessionInUrl: false,
}
```

This ensures no auth tokens are stored, refreshed, or read from URLs on the public site.

---

## Remaining Advisors (Intentional / Non-actionable)

| Advisor                                                   | Reason                                                  |
| --------------------------------------------------------- | ------------------------------------------------------- |
| `rls_policy_always_true` on exhibits INSERT/UPDATE/DELETE | Expected behaviour — only admins have Supabase accounts |
| `auth_leaked_password_protection`                         | Pro plan only; not available on Free tier               |
