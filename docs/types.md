# TypeScript Types Reference

**File:** `shared/types/index.ts`

All shared types are defined here and imported by both apps.

---

## Database Models

### `Exhibit`

```ts
interface Exhibit {
  id?: string; // UUID, PK — optional (absent on create)
  title: string; // English title
  description: string; // English description
  title_translations?: Record<string, string> | null; // { "ar-EG": "...", "de": "..." }
  description_translations?: Record<string, string> | null;
  image_url: string | null; // Full Supabase storage URL
  category?: string | null; // ⚠️ Deprecated — column does NOT exist in DB
  published: boolean;
  created_at?: string; // ISO 8601 timestamp
}
```

> ⚠️ `category` is declared in the type for legacy compatibility but the column does not exist in the database. Do not include it in Supabase `select()` projections.

---

### `Workshop`

```ts
interface Workshop {
  id?: string;
  title: string;
  description: string | null;
  title_translations?: Record<string, string> | null; // ⚠️ Not in DB — type only
  description_translations?: Record<string, string> | null; // ⚠️ Not in DB — type only
  date: string;
  order: number;
  image_url: string | null;
  published: boolean;
  created_at?: string;
}
```

> ⚠️ `title_translations` and `description_translations` are in the type for future use but the columns do NOT exist in the `workshops` table. Do not project them in Supabase queries.

---

### `TeamMember`

```ts
interface TeamMember {
  id: string;
  name: string;
  role: string;
  image_url: string | null;
  bio?: string | null;
  order: number;
  created_at?: string;
}
```

> Note: There is no `team_members` table in the current database. Team data is hardcoded in `app/team/page.tsx`.

---

## Form Data Types

### `ExhibitFormData`

```ts
interface ExhibitFormData {
  title: string;
  description: string;
  published: boolean;
  category?: string; // Unused — no DB column
}
```

### `WorkshopFormData`

```ts
interface WorkshopFormData {
  title: string;
  description: string;
  date: string;
  order: string; // String input; parsed to int before DB insert
  published: boolean;
}
```

---

## Component Props

### `ExhibitCardProps`

```ts
interface ExhibitCardProps {
  exhibit: Exhibit;
  index?: number; // Stagger animation delay
  priority?: boolean; // next/image priority (LCP)
}
```

### `WorkshopCardProps`

```ts
interface WorkshopCardProps {
  workshop: Workshop;
}
```

---

## API Response Types

### `ApiResponse<T>`

```ts
interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}
```

Generic wrapper for API responses. Both API routes return their own structured shape; this type is available for consumers.

---

## i18n Types

Defined in `shared/i18n/index.ts`:

```ts
type Locale = "en" | "ar-EG" | "de" | "es" | "it" | "fr";
type Dictionary = Record<string, any>;
```

### `ExhibitTranslations` (from `shared/utils/exhibitTranslations.ts`)

```ts
interface ExhibitTranslations {
  en?: { title: string; description: string };
  "ar-EG"?: { title: string; description: string };
  de?: { title: string; description: string };
  es?: { title: string; description: string };
  it?: { title: string; description: string };
  fr?: { title: string; description: string };
}
```
