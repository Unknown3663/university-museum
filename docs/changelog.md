# Changelog

Full project history in reverse-chronological order.

---

## 2026-03-07

### Performance Optimisations

- **ISR caching on API routes:**
  - `GET /api/exhibits` — `revalidate = 30` (30 s ISR) + `Cache-Control: public, s-maxage=30, stale-while-revalidate=60`
  - `GET /api/workshops` — `revalidate = 60` (60 s ISR) + `Cache-Control: public, s-maxage=60, stale-while-revalidate=120`
- **Column projection:** All Supabase queries in `public-site` now name only required columns. No more `select("*")`.
- **Server-side filtering/pagination:** Exhibits page fetches exactly 6 records from DB per page. Search, sort, and page handled in Supabase query.
- **300 ms debounce on exhibits search input:** No longer fires on every keystroke.
- **Workshops via API route:** `workshops/page.tsx` now calls `/api/workshops` (cached) instead of importing Supabase client in the page bundle.
- **Removed Framer Motion `layout` props:** Card grid and cards no longer use `layout`/`AnimatePresence` to prevent expensive DOM layout measurements.
- **Tuned entrance animations:** Delay step 100 ms → 50 ms, duration 400 ms → 300 ms, `scale` animation removed.

### Bug Fixes

- Removed `category` column from `exhibits` SQL projections (column does not exist → `42703` error).
- Removed `title_translations`/`description_translations` from `workshops` projections (columns do not exist).

### New Features

- **Page transitions + scroll-to-top:** `PageTransition.tsx` component wraps `{children}` in root layout. Handles CSS route-change animation + instant scroll-to-top (bypasses `scroll-behavior: smooth`).

_Files changed:_ `api/exhibits/route.ts`, `api/workshops/route.ts` (new), `exhibits/page.tsx`, `workshops/page.tsx`, `public-site/lib/supabaseClient.ts`, `PageTransition.tsx` (new), `layout.tsx`

---

## 2026-03-05

### Security Hardening — Database Pass (via Supabase MCP)

- Fixed `workshops` RLS policy role binding: dropped broken `ALL/public` policy, recreated as 4 granular policies (`SELECT/INSERT/UPDATE/DELETE`) all bound to the `authenticated` role.
- Set `allowed_mime_types = [image/jpeg, image/png, image/webp, image/gif]` on `exhibit-images` storage bucket (was `null` — no server-side restriction).
- Removed 3 duplicate `_0` storage object policies.
- Supabase Auth manual settings applied:
  - Disabled public sign-ups.
  - Enabled "Secure password change" (requires re-login within 24 h).
  - Minimum password length raised 6 → 12 characters.
  - TOTP MFA enabled.

### Security Hardening — Second Pass

- **`uploadImage`:** Replaced `Math.random()` with `crypto.randomUUID()` — unpredictable storage filenames.
- **`uploadImage`:** File extension derived from MIME type map, not `file.name` — blocks extension spoofing.
- **`deleteImage`:** Validate URL starts with Supabase origin + block `..` path traversal before removing object.
- **`SearchBar`:** Now passes `?search=` param to API (server-side search) — was fetching 100 records per keystroke client-side.

_Files changed:_ `museum-dashboard/lib/supabaseClient.ts`, `public-site/app/components/SearchBar.tsx`

### Security Hardening — Initial Pass

- Added security headers (CSP, X-Frame-Options, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) to both `next.config.js` files.
- Disabled `poweredByHeader` in both Next.js configs.
- Added server-side auth proxy (`museum-dashboard/proxy.ts`) to enforce auth on `/dashboard` routes.
- Sanitised API route inputs: search (length + special char escape), sort (whitelist), category (length), pagination (max page).
- Removed internal error messages from API responses.
- Added file MIME type validation (jpeg/png/webp/gif) to `UploadForm` and `WorkshopForm`.
- Restricted `<input accept>` to specific MIME types.
- Added input length validation to all forms (title 255, description 5000).
- Added environment variable validation to `public-site/lib/supabaseClient.ts`.
- Disabled `dangerouslyAllowSVG` in dashboard `next.config.js`.
- Hardened login error message to prevent user enumeration.
- Renamed `middleware.ts` → `proxy.ts` (Next.js 16 compatibility).

_Files changed:_ `next.config.js` (both), `proxy.ts`, `api/exhibits/route.ts`, `api/workshops/route.ts`, `UploadForm.tsx`, `WorkshopForm.tsx`, `public-site/lib/supabaseClient.ts`, `login/page.tsx`

---

## Earlier (pre-2026-03-05)

### Internationalization

- Created shared i18n infrastructure in `shared/` (context, dictionary engine, locale files).
- Supported languages: English, Arabic (RTL), German, Spanish, Italian, French.
- Locale files created: `en.json`, `ar-EG.json`, `de.json`, `es.json`, `it.json`, `fr.json`.
- Updated `public-site` pages: layout, home, Navbar, HeroSection, Footer, SearchBar, exhibits page, workshops page.
- Updated `museum-dashboard` pages: layout, Navbar, Sidebar, dashboard page.
- `LanguageSwitcher` globe-button component added.
- localStorage persistence + automatic RTL for Arabic.

### Responsive Design

- Mobile-first Tailwind CSS responsive design across all public-site components.
- Added custom `xs` breakpoint (475 px).
- Mobile hamburger menu in Navbar.
- Responsive typography scaling in HeroSection.
- Responsive grid (1→2→3 columns) for exhibits gallery.
- Mobile-optimised pagination with scroll-to-top.
- Responsive ExhibitCard with optimised image sizes.
- Accessibility: ARIA labels, focus rings, semantic HTML, 44 × 44 px touch targets.

### Initial Build

- Monorepo setup: `public-site` + `museum-dashboard` + `shared`.
- Next.js 15/16, TypeScript, Tailwind CSS, Framer Motion, Supabase, Vercel.
- Exhibits gallery with search, sort, pagination.
- Workshops page.
- Team page.
- Admin dashboard with exhibit and workshop CRUD.
- Image upload to Supabase storage.
- SEO metadata, JSON-LD, sitemap, robots.txt.
- Vercel Analytics + Speed Insights.
