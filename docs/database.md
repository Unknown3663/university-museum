# Database

Hosted on **Supabase** (project ID: `gzmouasbhzucflpcgsfu`, region: `eu-west-1`).

---

## Tables

### `exhibits`

Stores museum exhibit records.

| Column                     | Type        | Nullable | Notes                                                               |
| -------------------------- | ----------- | -------- | ------------------------------------------------------------------- |
| `id`                       | uuid        | No       | Primary key, auto-generated                                         |
| `title`                    | text        | No       | English title                                                       |
| `description`              | text        | No       | English description                                                 |
| `title_translations`       | jsonb       | Yes      | `{ "ar-EG": "...", "de": "...", ... }` — optional chaining required |
| `description_translations` | jsonb       | Yes      | Same shape as `title_translations`                                  |
| `image_url`                | text        | Yes      | Full public URL from Supabase storage                               |
| `published`                | bool        | No       | `true` = visible on public site                                     |
| `created_at`               | timestamptz | No       | Automatically set on insert                                         |

> ❌ **`category` does NOT exist** in `exhibits`. Do not include it in `SELECT` projections.

### `workshops`

Stores workshop and event records.

| Column        | Type        | Nullable | Notes                                 |
| ------------- | ----------- | -------- | ------------------------------------- |
| `id`          | uuid        | No       | Primary key, auto-generated           |
| `title`       | text        | No       | Workshop title                        |
| `description` | text        | Yes      | Workshop description                  |
| `date`        | text / date | No       | Event date                            |
| `order`       | int         | No       | Display order (ascending)             |
| `image_url`   | text        | Yes      | Full public URL from Supabase storage |
| `published`   | bool        | No       | `true` = visible on public site       |
| `created_at`  | timestamptz | No       | Automatically set on insert           |

> ❌ **`title_translations` and `description_translations` do NOT exist** in `workshops`.

---

## Row-Level Security (RLS)

RLS is **enabled** on both tables.

### `exhibits`

| Operation | Role          | Policy description                             |
| --------- | ------------- | ---------------------------------------------- |
| SELECT    | public (anon) | Anyone can read published/unpublished exhibits |
| INSERT    | authenticated | Any signed-in user (i.e., admin) can insert    |
| UPDATE    | authenticated | Any signed-in user can update                  |
| DELETE    | authenticated | Any signed-in user can delete                  |

> The INSERT/UPDATE/DELETE policies are intentionally permissive (`always true` for authenticated) because only museum admins have Supabase accounts — there are no public sign-ups.

### `workshops`

Four granular policies (not one catch-all `ALL` policy):

| Operation | Role          | Policy description |
| --------- | ------------- | ------------------ |
| SELECT    | public (anon) | Anyone can read    |
| INSERT    | authenticated | Admins only        |
| UPDATE    | authenticated | Admins only        |
| DELETE    | authenticated | Admins only        |

---

## Storage

### Bucket: `exhibit-images`

| Setting            | Value                                                |
| ------------------ | ---------------------------------------------------- |
| Visibility         | Public                                               |
| Max file size      | 5 MB                                                 |
| Allowed MIME types | `image/jpeg`, `image/png`, `image/webp`, `image/gif` |

Storage policies mirror the table RLS:

- Public read access
- Authenticated users can upload, update, delete

### File Naming

Images are stored with **`crypto.randomUUID()`**-based filenames (not derived from `file.name`) to prevent extension spoofing and make paths unpredictable.

File extension is derived from the MIME type using an internal map:

```ts
{ "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif" }
```

### URL Validation on Delete

Before deleting a storage object, `deleteImage()` validates that the URL:

1. Starts with the Supabase origin (`https://gzmouasbhzucflpcgsfu.supabase.co`)
2. Does not contain `..` (path traversal prevention)

---

## Column Projections

All queries name only the columns that are actually needed — **no `select("*")`** on the public site.  
The dashboard uses `select("*")` only internally for admin operations.

If you add a `select()` call, cross-reference the column tables above. A projection referencing a non-existent column will cause a Supabase `42703` error.

---

## Supabase Auth Settings (Applied 2026-03-05)

| Setting                 | Value                                   |
| ----------------------- | --------------------------------------- |
| Public sign-ups         | Disabled                                |
| Secure password change  | Enabled (requires re-login within 24 h) |
| Minimum password length | 12 characters                           |
| TOTP MFA                | Enabled                                 |
