# Architecture

## Overview

The project is a **monorepo** containing three packages under one root directory.

```
University-Museum/
├── public-site/        # Public-facing museum website
├── museum-dashboard/   # Admin dashboard (authenticated)
└── shared/             # Shared code consumed by both apps
```

There is no root `package.json` or workspace manager (Turborepo, Nx, etc.). Each package is a self-contained Next.js app that resolves `shared/` via a custom webpack alias configured in `next.config.js`.

---

## Packages

### `public-site`

- **Purpose:** Read-only, publicly accessible museum website.
- **Port (dev):** 3000
- **Deployed at:** https://tgm-chi.vercel.app
- **Key capabilities:**
  - Browsing and filtering paginated exhibits gallery
  - Viewing workshop schedules
  - Viewing team page
  - Multi-language UI (6 languages, client-side)
  - SEO metadata + JSON-LD schema (Museum)
  - Vercel Analytics + Speed Insights

### `museum-dashboard`

- **Purpose:** Admin dashboard for museum staff to create, edit, and publish content.
- **Port (dev):** 3001
- **Access:** Protected by Supabase email/password auth. No public sign-ups.
- **Key capabilities:**
  - CRUD for exhibits (title, description, image, publish toggle)
  - CRUD for workshops (title, description, date, order, image, publish toggle)
  - Per-record multilingual translation input (6 languages)
  - Image upload to Supabase storage with live preview and progress bar
  - Server-side auth enforcement via `proxy.ts`

### `shared`

- **Purpose:** Code shared between both apps — no build output; imported directly by webpack.
- **Contents:**

| Path                                     | Contents                                                                           |
| ---------------------------------------- | ---------------------------------------------------------------------------------- |
| `shared/types/index.ts`                  | TypeScript interfaces for `Exhibit`, `Workshop`, `TeamMember`, `ApiResponse`, etc. |
| `shared/i18n/index.ts`                   | Core i18n engine: `getDictionary`, `createT`, locale utilities                     |
| `shared/i18n/LanguageContext.tsx`        | React context + `useLanguage()` hook                                               |
| `shared/locales/*.json`                  | Translation files for `en`, `ar-EG`, `de`, `es`, `it`, `fr`                        |
| `shared/components/LanguageSwitcher.tsx` | Globe button UI for switching languages                                            |
| `shared/utils/exhibitTranslations.ts`    | `getExhibitTranslation()` — resolves per-exhibit DB translations                   |

---

## Data Flow

```
Browser
  │
  ├─► public-site (Next.js, Vercel Edge)
  │       │
  │       ├─► /api/exhibits  ──► Supabase DB (ISR 30 s)
  │       └─► /api/workshops ──► Supabase DB (ISR 60 s)
  │
  └─► museum-dashboard (Next.js, Vercel)
          │
          ├─► proxy.ts (auth gate on /dashboard/*)
          └─► Supabase (auth + DB + storage) – direct from client
```

### Request Path — Public Site Exhibit Page

1. User visits `/exhibits?search=gold&sort=newest&page=2`
2. `ExhibitsContent` component calls `GET /api/exhibits?search=gold&sort=newest&page=2`
3. API route validates params, queries Supabase, returns `{ exhibits, pagination }`
4. ISR cache serves the response for up to 30 s; Vercel CDN edge-caches with `s-maxage=30`
5. Cards render with entrance animations (Framer Motion)

### Request Path — Dashboard Edit

1. Admin navigates to `/dashboard/exhibits`
2. `ProtectedRoute` calls `isAuthenticated()` → redirects to `/login` if false
3. Page fetches all exhibits directly from Supabase (no API route)
4. Admin submits `UploadForm` → `createExhibit()` / `updateExhibit()` + `uploadImage()` called from `museum-dashboard/lib/supabaseClient.ts`

---

## Webpack shared-folder alias

Both `next.config.js` files add the monorepo root to `config.resolve.modules`:

```js
config.resolve.modules.push(path.resolve(__dirname, "../"));
```

This means imports like `import { useLanguage } from "../../shared/i18n/LanguageContext"` resolve from the actual file system root, not from `node_modules`.

---

## Environment Variables

Both apps require the same two Supabase env vars (see [setup.md](./setup.md)):

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Both validate these at module initialisation time and throw if missing.
