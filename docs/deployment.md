# Deployment

---

## Platform

Both apps are deployed on **Vercel**.

| App                | URL                                   |
| ------------------ | ------------------------------------- |
| `public-site`      | https://tgm-chi.vercel.app            |
| `museum-dashboard` | Separate Vercel project (private URL) |

---

## Environment Variables

Set the following in the Vercel project settings for **each** app:

| Variable                        | Description                                                            |
| ------------------------------- | ---------------------------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase project URL (e.g. `https://gzmouasbhzucflpcgsfu.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key                                               |

Both apps throw `Error: Missing Supabase environment variables` if these are absent.

> These are `NEXT_PUBLIC_` prefixed and therefore embedded in the client bundle. They grant only anon-level access; write operations are protected by Supabase RLS.

---

## Build Commands

Vercel auto-detects the Next.js framework. Explicit overrides in Vercel project settings:

| Setting          | `public-site`   | `museum-dashboard` |
| ---------------- | --------------- | ------------------ |
| Build command    | `npm run build` | `npm run build`    |
| Output directory | `.next`         | `.next`            |
| Install command  | `npm install`   | `npm install`      |
| Root directory   | `public-site`   | `museum-dashboard` |

The `build` npm script includes `npm run install:shared` to install shared package dependencies before building:

```json
"build": "npm run install:shared && next build --webpack"
```

> **`--webpack` flag is required.** Next.js 16 defaults to Turbopack; the custom webpack `resolve.modules` alias (for the shared folder) only works under webpack.

---

## Vercel Analytics & Speed Insights

Added to `public-site/app/layout.tsx`:

```tsx
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
```

Both are rendered inside the root layout and inject asynchronously. No configuration required beyond the import.

---

## SEO & Sitemap

### Metadata

`public-site/app/layout.tsx` exports Next.js `metadata`:

- Canonical URL: `https://tgm-chi.vercel.app`
- Open Graph (`og:title`, `og:image`, etc.)
- Twitter card (`summary_large_image`)
- Google site verification token

### JSON-LD

A `Museum` schema JSON-LD object is injected via `<Script type="application/ld+json">` in the root layout.

### Sitemap

`public-site/app/sitemap.ts` exports the dynamic sitemap, consumed by Vercel at `https://tgm-chi.vercel.app/sitemap.xml`.

### Robots

`public-site/public/robots.txt` allows all crawlers and points to the sitemap.

---

## Domain & HTTPS

- HTTPS is enforced via `Strict-Transport-Security` header (`max-age=63072000; includeSubDomains; preload`).
- Vercel handles TLS certificate provisioning automatically.

---

## Deployment Checklist

Before pushing to production:

- [ ] Environment variables set on Vercel for both apps.
- [ ] `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct.
- [ ] `--webpack` flag is present in `dev` and `build` scripts in `package.json`.
- [ ] No TypeScript or lint errors (`npm run lint`).
- [ ] Supabase RLS policies are enabled on both tables.
- [ ] Storage bucket MIME type restriction is set.
- [ ] Public sign-ups are disabled in Supabase Auth.
