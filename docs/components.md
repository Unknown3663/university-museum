# Components Reference

---

## Public Site (`public-site/app/components/`)

### `Navbar`

**File:** `public-site/app/components/Navbar.tsx`

Main navigation bar for the public site.

- Fixed to top, transparent with backdrop blur.
- Shows TGM logo + site name (abbreviated to "TGM" on mobile).
- Desktop: horizontal nav links (Home, Exhibits, Workshops, Team).
- Mobile: hamburger icon → slide-in drawer from the right.
- Includes `<LanguageSwitcher>` for locale selection.
- Active route highlighted.
- Body scroll locked when mobile menu is open.
- Closes automatically on route change.

---

### `HeroSection`

**File:** `public-site/app/components/HeroSection.tsx`

Full-screen hero on the homepage.

- Large headline (responsive: `text-3xl` → `text-8xl`).
- Calls `t("home.hero.title")` and `t("home.hero.subtitle")`.
- CTA button that links to `/exhibits`.
- Center-aligned on mobile, left-aligned on desktop.

---

### `Footer`

**File:** `public-site/app/components/Footer.tsx`

Page footer rendered on all public-site pages.

- Displays copyright text via `t("footer.copyright", { year: "..." })`.
- Faculty branding.

---

### `ExhibitCard`

**File:** `public-site/app/components/ExhibitCard.tsx`

Card component for a single exhibit in the gallery.

**Props:**

| Prop       | Type      | Default  | Description                                          |
| ---------- | --------- | -------- | ---------------------------------------------------- |
| `exhibit`  | `Exhibit` | required | The exhibit data object                              |
| `index`    | `number`  | `0`      | Used to stagger entrance animation delay             |
| `priority` | `boolean` | `false`  | Pass `true` for the first 3 cards (LCP optimisation) |

- Uses `next/image` with `fill` layout.
- Image sizes: `100vw` mobile, `50vw` tablet, `33vw` desktop.
- Title and description clamped with line-clamp.
- Entrance animation: fade + translateY (Framer Motion), 50 ms delay step per card.
- Resolved title/description via `getExhibitTranslation(exhibit, locale)`.

---

### `WorkshopCard`

**File:** `public-site/app/components/WorkshopCard.tsx`

Card component for a single workshop.

**Props:**

| Prop       | Type       | Description              |
| ---------- | ---------- | ------------------------ |
| `workshop` | `Workshop` | The workshop data object |

- Displays title, date, description, and optional image.
- Shows an order badge.

---

### `SearchBar`

**File:** `public-site/app/components/SearchBar.tsx`

Floating search overlay triggered from the Navbar.

- Input triggers API call to `/api/exhibits?search=<query>` (server-side search).
- Minimum 2 characters before search fires.
- Shows "Searching…" state and results list with links to `/exhibits?search=<query>`.
- "View all results →" link.
- Closed via Escape key or backdrop click.

---

### `PageTransition`

**File:** `public-site/app/components/PageTransition.tsx`

Wraps `{children}` in the root layout to animate route changes.

- Uses `key={pathname}` to remount the wrapper div on navigation, re-triggering a CSS `@keyframes pageEntry` animation (0.28 s ease-out).
- On route change: forces `scrollBehavior: "auto"` momentarily, scrolls to top, then restores smooth scrolling via `requestAnimationFrame`.
- No Framer Motion dependency — pure CSS animation.

---

### `BackgroundImage`

**File:** `public-site/app/components/BackgroundImage.tsx`

Full-viewport fixed background image helper. Used on page layouts to set a blurred/dim background behind content.

---

### `ScrollIndicator`

**File:** `public-site/app/components/ScrollIndicator.tsx`

An animated scroll-down arrow shown at the bottom of the hero section. Fades out after the user scrolls past the hero.

---

### `SideLogos`

**File:** `public-site/app/components/SideLogos.tsx`

Displays institutional logos (university + faculty) on the sides of the hero. Hidden on smaller screens.

---

### `SignatureLogo`

**File:** `public-site/app/components/SignatureLogo.tsx`

A fixed-position TGM signature logo that hides while the hero section is in the viewport and appears on scroll.

**Props:**

| Prop                | Type      | Default | Description                                               |
| ------------------- | --------- | ------- | --------------------------------------------------------- |
| `hideOnHeroSection` | `boolean` | `false` | If `true`, uses IntersectionObserver to toggle visibility |

---

### `Button`

**File:** `public-site/app/components/Button.tsx`

Reusable button with variants.

- Responsive padding: `px-6 py-2.5` → `px-8 py-3`.
- Responsive font: `text-sm` → `text-base`.
- Supports `primary` / `secondary` variants.

---

## Public Site Pages

### `app/page.tsx` — Homepage

- Hero section with museum background image.
- About Us section (two columns: text + image).
- Aims section (icon grid).
- All text strings resolved via `t()`.

### `app/exhibits/page.tsx` — Exhibits Gallery

- Client component (`"use client"`).
- Fetches from `/api/exhibits` with `page`, `limit`, `sort`, `search` params.
- 300 ms debounce on the search input.
- Pagination with scroll-to-top (bypasses `scroll-behavior: smooth`).
- Sort options: Newest, Oldest, A–Z, Z–A.
- Loading skeletons (6 cards).
- Empty state and error state.
- Wrapped in `<Suspense>` because it reads `useSearchParams()`.

### `app/workshops/page.tsx` — Workshops

- Fetches from `/api/workshops` (server-side via `fetch`).
- Renders a list of `<WorkshopCard>` components.
- Empty state.

### `app/team/page.tsx` — Team

- Static content (no DB fetch).
- Lists faculty, initiative coordinators, and student team members.

---

## Dashboard Components (`museum-dashboard/app/dashboard/components/`)

### `UploadForm`

**File:** `museum-dashboard/app/dashboard/components/UploadForm.tsx`

Form for creating and editing exhibits.

**Props:**

| Prop          | Type              | Default  | Description                                  |
| ------------- | ----------------- | -------- | -------------------------------------------- |
| `onSuccess`   | `() => void`      | required | Called after successful save                 |
| `editMode`    | `boolean`         | `false`  | Pre-fill form with `initialData` when `true` |
| `initialData` | `Exhibit \| null` | `null`   | Existing exhibit for edit mode               |

**Features:**

- Fields: `title`, `description`, `published` checkbox, optional per-language translation inputs (collapsed by default).
- Image upload with preview and progress bar.
- File validation: MIME type (jpeg/png/webp/gif only), max 5 MB.
- Field validation: title ≤ 255 chars, description ≤ 5000 chars.
- Calls `createExhibit()` or `updateExhibit()` + `uploadImage()` from the dashboard Supabase client.
- Shows a success toast on completion.
- Error messages displayed inline next to fields.

---

### `WorkshopForm`

**File:** `museum-dashboard/app/dashboard/components/WorkshopForm.tsx`

Form for creating and editing workshops. Same structure as `UploadForm` with additional fields:

**Extra fields compared to UploadForm:**

- `date` — event date
- `order` — display order (integer)

**Props:** same as `UploadForm` plus `onCancelEdit?: () => void`.

---

### `ExhibitList`

**File:** `museum-dashboard/app/dashboard/components/ExhibitList.tsx`

Table listing all exhibits (published and unpublished).

- Fetches all exhibits directly from Supabase.
- Edit button → opens `UploadForm` in edit mode.
- Delete button → calls `deleteExhibit()` (also deletes the storage image).
- Toggle publish state.

---

### `WorkshopList`

**File:** `museum-dashboard/app/dashboard/components/WorkshopList.tsx`

Same as `ExhibitList` but for workshops.

---

### `ProtectedRoute`

**File:** `museum-dashboard/app/dashboard/components/ProtectedRoute.tsx`

Auth guard component. See [auth.md](./auth.md) for full details.

---

### `Navbar` (Dashboard)

**File:** `museum-dashboard/app/dashboard/components/Navbar.tsx`

- Displays "Tourist Guidance Museum" title.
- Sign Out button (calls `signOut()` then redirects to `/login`).
- Includes `<LanguageSwitcher>`.
- Language: `t("dashboard.navbar.title")`, etc.

---

### `Sidebar`

**File:** `museum-dashboard/app/dashboard/components/Sidebar.tsx`

Left sidebar navigation for the dashboard.

- Links: Dashboard overview, Exhibits, Upload Exhibit, Workshops.
- Active route highlighted.
- Language: `t("dashboard.sidebar.*")` keys.
