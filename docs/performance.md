# Performance

This document details all performance optimisations applied to the project.

---

## Caching Strategy

### ISR (Incremental Static Regeneration)

API routes use Next.js ISR to cache Supabase query results at the origin:

| Route            | `revalidate` | `Cache-Control`                                   |
| ---------------- | ------------ | ------------------------------------------------- |
| `/api/exhibits`  | 30 s         | `public, s-maxage=30, stale-while-revalidate=60`  |
| `/api/workshops` | 60 s         | `public, s-maxage=60, stale-while-revalidate=120` |

This means:

- Supabase is not queried on every request; Vercel serves the cached response.
- `s-maxage` instructs the Vercel CDN edge to serve from cache for the given duration.
- `stale-while-revalidate` allows the edge to serve a stale response while revalidating in the background (no visible latency spike).

### Result

Before: Supabase was hit on every page visit (up to 100 records per request).  
After: Supabase is hit at most once per `revalidate` interval, regardless of traffic.

---

## Column Projection

All Supabase queries in `public-site` name only the columns the UI actually needs — no `select("*")`:

```ts
// exhibits API route
.select("id,title,description,title_translations,description_translations,image_url,published,created_at", { count: "exact" })

// workshops API route
.select("id,title,description,date,order,image_url,published")
```

This reduces data transfer and prevents accidental exposure of future columns.

> **Rule:** Always cross-check projections against the [Verified DB Column Lists](./database.md) before writing a `select()`.

---

## Server-Side Filtering & Pagination (Exhibits)

Filtering, sorting, and pagination happen in Supabase, not in JavaScript:

- The API route applies `ilike` search, `order()`, and `range()` in the Supabase query.
- Each page fetch returns exactly 6 records (configured via `EXHIBITS_PER_PAGE = 6`).

**Before:** The page fetched all 100 published exhibits, then filtered/sorted/paginated in JS.  
**After:** Supabase returns only the 6 records needed for the current page.

---

## Search Debounce

The search input on the exhibits page uses a **300 ms debounce**:

```ts
useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(searchQuery);
    setCurrentPage(1);
  }, 300);
  return () => clearTimeout(timer);
}, [searchQuery]);
```

This prevents an API call on every keystroke. The fetch only fires after the user stops typing for 300 ms.

---

## Workshops via API Route (Not Direct Import)

`workshops/page.tsx` calls `/api/workshops` (the cached API route) instead of dynamically importing the Supabase client bundle into the page. This:

- Keeps the Supabase client out of the page bundle.
- Benefits from ISR caching.
- Reduces the client-side JavaScript bundle size.

---

## Image Optimisation (Public Site)

Both apps use `next/image` for automatic optimisation. The public site config:

```js
images: {
  formats: ["image/avif", "image/webp"],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  qualities: [75, 80, 90, 100],
  unoptimized: false,
  remotePatterns: [{ hostname: "**.supabase.co", ... }],
}
```

`ExhibitCard` uses responsive `sizes` attributes to request the correct resolution for each viewport:

```tsx
sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";
```

Priority loading (`priority={true}`) is set on the first 3 exhibit cards to optimise LCP.

---

## Animation Performance

Framer Motion `layout` props and `AnimatePresence` around the card grid were **removed** because they triggered expensive synchronous DOM layout measurements on every render.

Remaining animations were tuned:

| Before                     | After                                              |
| -------------------------- | -------------------------------------------------- |
| 100 ms delay step per card | 50 ms delay step                                   |
| 400 ms duration            | 300 ms duration                                    |
| `scale` animation          | Removed (caused GPU layer promotion for all cards) |

The `PageTransition` component uses a lightweight CSS `@keyframes` animation (0.28 s) instead of Framer Motion to avoid SSR hydration issues.

---

## Font & Asset Loading

- System font stack used — no external font downloads.
- Background images are loaded lazily except the hero (which uses `priority`).
- Vercel Speed Insights + Analytics are loaded asynchronously via `<Script>` and `@vercel/analytics`.

---

## Bundle Size

- `museum-dashboard` has no `framer-motion` dependency — significantly smaller bundle.
- `public-site` dynamically imports `Navbar` with a fallback skeleton to avoid blocking the initial render.
