# API Routes

Both API routes live in `public-site/app/api/` and are served by Next.js Route Handlers (App Router).

---

## GET `/api/exhibits`

**File:** `public-site/app/api/exhibits/route.ts`

Returns a paginated, filtered, sorted list of published exhibits.

### ISR / Caching

```
export const revalidate = 30;  // ISR: revalidate every 30 s
Cache-Control: public, s-maxage=30, stale-while-revalidate=60
```

### Query Parameters

| Parameter | Type    | Default  | Constraints                           | Description                                   |
| --------- | ------- | -------- | ------------------------------------- | --------------------------------------------- |
| `page`    | integer | `1`      | 1 – 10000                             | Page number                                   |
| `limit`   | integer | `6`      | 1 – 100                               | Records per page                              |
| `sort`    | string  | `newest` | `newest` \| `oldest` \| `az` \| `za`  | Sort order                                    |
| `search`  | string  | —        | max 100 chars; special chars stripped | Full-text search on `title` and `description` |

### Response — Success `200`

```json
{
  "exhibits": [
    {
      "id": "uuid",
      "title": "Golden Mask",
      "description": "...",
      "title_translations": { "ar-EG": "القناع الذهبي", "de": "..." },
      "description_translations": { ... },
      "image_url": "https://...supabase.co/...",
      "published": true,
      "created_at": "2025-11-01T10:00:00Z"
    }
  ],
  "pagination": {
    "total": 42,
    "page": 1,
    "limit": 6,
    "totalPages": 7,
    "hasMore": true
  }
}
```

### Response — Errors

| Status | Body                                           | Cause                   |
| ------ | ---------------------------------------------- | ----------------------- |
| `400`  | `{ "error": "Invalid pagination parameters" }` | page/limit out of range |
| `400`  | `{ "error": "Invalid sort parameter" }`        | sort not in whitelist   |
| `500`  | `{ "error": "Failed to fetch exhibits" }`      | Supabase error          |
| `500`  | `{ "error": "Internal server error" }`         | Unexpected exception    |

### Search Sanitisation

1. Trimmed and truncated to 100 characters.
2. Characters matching `/[%_\\(),.]/` are stripped to prevent PostgREST filter injection.
3. If the sanitised string is empty the search filter is skipped.

---

## GET `/api/workshops`

**File:** `public-site/app/api/workshops/route.ts`

Returns all published workshops ordered by their `order` field.

### ISR / Caching

```
export const revalidate = 60;  // ISR: revalidate every 60 s
Cache-Control: public, s-maxage=60, stale-while-revalidate=120
```

### Query Parameters

None. Returns all published workshops in one response.

### Response — Success `200`

```json
{
  "workshops": [
    {
      "id": "uuid",
      "title": "Heritage Craft Workshop",
      "description": "...",
      "date": "2025-12-10",
      "order": 1,
      "image_url": "https://...supabase.co/...",
      "published": true
    }
  ]
}
```

### Response — Errors

| Status | Body                                       | Cause                |
| ------ | ------------------------------------------ | -------------------- |
| `500`  | `{ "error": "Failed to fetch workshops" }` | Supabase error       |
| `500`  | `{ "error": "Internal server error" }`     | Unexpected exception |

---

## Notes

- Both routes import `supabase` from `public-site/lib/supabaseClient.ts`, which uses a **session-less** client (`persistSession: false`, `autoRefreshToken: false`).
- Internal `error.message` values are never exposed in API responses; only generic messages are returned.
- The dashboard does **not** use these API routes — it calls Supabase directly from `museum-dashboard/lib/supabaseClient.ts`.
