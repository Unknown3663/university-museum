<div align="center">

# 🏛️ Tourist Guidance Museum

### Digital Platform for Heritage Preservation & Education

_Faculty of Tourism and Hotels, Minia University_

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)

</div>

---

## 📖 Overview

This monorepo powers the **Tourist Guidance Museum** digital experience:

- `public-site/` – a public storytelling site showcasing exhibits, workshops, and the **Friends of Museum** initiative.
- `museum-dashboard/` – a secure admin dashboard for managing exhibits and workshops.
- `shared/` – shared types, utilities, and components used by both apps.

The platform supports the initiative **“It's Your Own: Protect Your Identity”**, launched alongside the **Grand Egyptian Museum** opening (November 1st, 2025), to strengthen Egyptian identity and heritage awareness.

---

## ✨ Core Features

### 🌐 Public Website (`public-site/`)

- 🏠 **Hero storytelling** with museum imagery, countdown to the Grand Egyptian Museum, and clear initiative messaging.
- 🔍 **Smart search** with real‑time exhibit filtering and instant results.
- 🖼️ **Exhibits gallery** with high‑quality images, categories, and responsive cards.
- 📚 **Workshops & events** listing with ordering, dates, and rich descriptions.
- 👥 **Team page** highlighting faculty, initiative leaders, and museum team.
- 📱 **First‑class responsive design** across phones, tablets, laptops, and 4K.

> Detailed responsive behaviour and component notes live in `RESPONSIVE_DESIGN.md`.

### 🔐 Admin Dashboard (`museum-dashboard/`)

- 🔒 **Supabase Auth** login with protected routes.
- 🖼️ **Exhibit management** – create, edit, delete, publish/unpublish exhibits with image upload to Supabase Storage.
- 📅 **Workshop management** – create and order workshops for the public site.
- 📊 **Content overview** – clean dashboard layout with navigation and statistics.
- 📱 **Mobile‑ready admin UI** so content can be updated on the go.

See `museum-dashboard/README.md` for schema, setup, and usage details.

---

## 🏗️ Architecture

### Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **UI:** React 18, Tailwind CSS
- **Backend as a Service:** Supabase (PostgreSQL, Auth, Storage, RLS)

### High‑Level Structure

```bash
University-Museum/
│
├── public-site/          # Public-facing website (Next.js 15, TS)
│   ├── app/
│   │   ├── page.tsx      # Landing page
│   │   ├── exhibits/     # Exhibits listing
│   │   ├── workshops/    # Workshops listing
│   │   ├── team/         # Team page
│   │   ├── api/          # Public API (e.g. /api/exhibits)
│   │   └── components/   # UI components (Hero, Navbar, Cards, etc.)
│   ├── lib/
│   │   └── supabaseClient.ts
│   └── public/
│       ├── backgrounds/
│       └── logos/
│
├── museum-dashboard/     # Admin dashboard (Next.js 15, TS)
│   ├── app/
│   │   ├── login/
│   │   └── dashboard/
│   │       ├── exhibits/
│   │       ├── upload/
│   │       ├── workshops/
│   │       └── components/
│   ├── lib/
│   │   └── supabaseClient.ts
│   └── public/
│
└── shared/               # Cross‑app building blocks
    ├── components/
    ├── types/
    │   └── index.ts
    └── utils/
        └── formatDate.ts
```

---

## 🚀 Getting Started

> You can run each app independently. Make sure you have Node.js 18+ and npm or pnpm installed.

### 1. Clone & Install

```bash
git clone https://github.com/Unknown3663/University-Museum.git
cd University-Museum

# Install for both apps (from repo root)
cd public-site && npm install
cd ../museum-dashboard && npm install
```

### 2. Environment Variables

Create `.env.local` files in both `public-site/` and `museum-dashboard/` using your Supabase project credentials.

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

For dashboard‑specific database and storage configuration (tables, RLS, buckets), follow `museum-dashboard/README.md`.

### 3. Run Development Servers

```bash
# Public site
cd public-site
npm run dev   # default: http://localhost:3000

# Admin dashboard
cd ../museum-dashboard
npm run dev   # often configured as http://localhost:3001
```

---

## 🎨 Design & UX

- 📱 **Responsive by design** – carefully tuned breakpoints for phones → 2XL screens.
- 🎭 **Brand‑aligned visuals** – museum‑inspired palette, heritage imagery, and typography (Playfair Display + Inter).
- ⚡ **Performance‑minded** – image optimization, lazy loading, and efficient layouts.
- ♿ **Accessibility** – semantic structure, ARIA attributes, and keyboard‑friendly navigation.

For a deep dive into breakpoints, components, and testing guidelines, see `RESPONSIVE_DESIGN.md`.

---

## 🎓 Educational Mission

Aligned with **Egypt's Vision 2030**, the platform focuses on:

1. **Heritage Awareness** – workshops, curated exhibits, and educational storytelling.
2. **Digital Documentation** – a structured, queryable catalog of artifact replicas.
3. **Community Engagement** – open access to museology news and educational events.
4. **Identity Preservation** – strengthening Egyptian cultural identity through digital tools.

---

## 📌 Roadmap

- 🌍 Full Arabic/English bilingual support.
- 🤖 AI‑assisted heritage recommendations and smart exhibit suggestions.
- 🎥 Virtual tours and richer media experiences.
- 📊 Analytics dashboard for visitor engagement.
- 📱 Native mobile apps and PWA enhancements.

---

## 👥 Credits

**Friends Of Museum – Faculty of Tourism and Hotels, Minia University**

- Prof. Samar Mustafa – College Dean
- Prof. Engy Elkilany – College Vice Dean
- Dr. Gehad Mohamed – Initiative Coordinator

**Museum Team**

- Mohand Hesham – Team Leader
- Ezzat Maged – Web Developer
- Ziad Khalaf – Curator
- Mahmoud Farghly – Curator
- Mala Amr – Curator
- Romaysaa Mohamed – Curator
- Rogena Hany – Curator
- Shahd Esaam – Curator
- Shahd Ahmad – Curator
- Hanin Ahmed – Curator
- Login Ahmed – Curator
- Samuil Hany – Curator

---

<div align="center">

**Faculty of Tourism and Hotels – Minia University, Egypt**  
🌐 <a href="https://tourism.minia.edu.eg" target="_blank">tourism.minia.edu.eg</a>

If this project inspires you, consider starring the repo ⭐

_"Protecting our heritage, strengthening our identity"_

</div>
