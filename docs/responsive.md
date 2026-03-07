# Responsive Design

The public site uses a **mobile-first** design approach. Base styles target mobile; larger breakpoints progressively enhance the layout.

---

## Breakpoints

| Token     | Min width | Target devices              |
| --------- | --------- | --------------------------- |
| (default) | 0 px      | Mobile phones               |
| `xs`      | 475 px    | Extra-small phones          |
| `sm`      | 640 px    | Large phones, small tablets |
| `md`      | 768 px    | Tablets                     |
| `lg`      | 1024 px   | Laptops, large tablets      |
| `xl`      | 1280 px   | Desktops                    |
| `2xl`     | 1536 px   | Large desktops              |

`xs` is a custom breakpoint added in `public-site/tailwind.config.js`.

---

## Component Details

### Navbar

- **Mobile:** Hamburger icon → full-screen slide-in drawer from the right.
  - Semi-transparent backdrop overlay.
  - Touch-friendly nav items.
  - Body scroll locked (`overflow: hidden` on `<body>`) when drawer is open.
  - Auto-closes on route change.
  - Brand name shows abbreviated "TGM".
- **Desktop (`md`+):** Standard horizontal nav links.
- Logo size: 36 px mobile → 40 px desktop.
- `<LanguageSwitcher>` present on all screen sizes.

### HeroSection

Typography scales progressively:

| Breakpoint     | Font size  |
| -------------- | ---------- |
| default        | `text-3xl` |
| `xs` (475 px)  | `text-4xl` |
| `sm` (640 px)  | `text-5xl` |
| `md` (768 px)  | `text-6xl` |
| `lg` (1024 px) | `text-7xl` |
| `xl` (1280 px) | `text-8xl` |

Alignment: center on mobile → left on desktop.  
CTA button: full-width on mobile → auto-width on desktop.

### Exhibits Page

Grid layout:

| Breakpoint     | Columns |
| -------------- | ------- |
| default        | 1       |
| `sm` (640 px)  | 2       |
| `lg` (1024 px) | 3       |

- Pagination: full-width stacked on mobile → inline on desktop.
- Search bar and sort controls: full-width on mobile.
- Skeleton loaders match the card grid layout.

### ExhibitCard

- Min-height: 380 px.
- Image `sizes` attr: `100vw` / `50vw` / `33vw` at the three breakpoints above.
- Title: `text-lg` → `text-2xl`.
- Padding: `p-4` → `p-6`.
- Description clamped to 3 lines (`line-clamp-3`).

### Workshops Page

- Top padding: `pt-24` → `pt-32`.
- Single-column stack on all viewports.
- Cards use full-width on mobile.

### Button

- Padding: `px-6 py-2.5` → `px-8 py-3`.
- Font: `text-sm` → `text-base`.

### SearchBar

- Max height: `max-h-20` → `max-h-24`.
- Padding: `px-3` → `px-4`.
- Font: `text-sm` → `text-base`.

---

## Accessibility

- All interactive elements have ARIA labels.
- Focus rings visible on keyboard navigation (Tailwind `focus-visible` variants).
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<footer>`, heading hierarchy.
- Mobile menu includes `aria-expanded`, `aria-label`, `aria-controls`.
- Images have meaningful `alt` text.
- Minimum touch target size: 44 × 44 px for all interactive elements.

---

## Performance & Reduced Motion

- Non-hero images use `loading="lazy"`.
- First 3 exhibit cards use `priority={true}` for LCP.
- Animations use `will-change: opacity, transform` only where needed.
- `prefers-reduced-motion` is respected via Tailwind's `motion-safe:` variant where applied.
