<div align="center">

# Tourist Guidance Museum (TGM)

**Digital platform for heritage preservation & education**

_Faculty of Tourism and Hotels, Minia University_

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-DB%20%2B%20Auth%20%2B%20Storage-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-tgm--chi.vercel.app-black?style=flat-square&logo=vercel)](https://tgm-chi.vercel.app)

</div>

---

## About

The Tourist Guidance Museum is a digital experience that brings Egypt's rich heritage closer to everyone — celebrating artifacts, stories, and the people who care for them.

This platform supports the **"It's Your Own: Protect Your Identity"** initiative, launched alongside the opening of the Grand Egyptian Museum (November 2025).

**Live site:** https://tgm-chi.vercel.app

---

## Repository Structure

This is a monorepo with three packages:

```
University-Museum/
├── public-site/        # Public-facing museum website (Next.js, port 3000)
├── museum-dashboard/   # Admin dashboard — auth required (Next.js, port 3001)
├── shared/             # Shared types, i18n, components (no build output)
└── docs/               # Project documentation
```

---

## Quick Start

**Prerequisites:** Node.js >= 18, npm >= 9

**1. Set environment variables**

Create `.env.local` in both `public-site/` and `museum-dashboard/`:

```env
NEXT_PUBLIC_SUPABASE_URL=<public URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>
```

**2. Install and run**

```bash
# Public site (http://localhost:3000)
cd public-site && npm install && npm run dev

# Admin dashboard (http://localhost:3001)
cd museum-dashboard && npm install && npm run dev
```

---

## Tech Stack

| Layer      | Technology                           |
| ---------- | ------------------------------------ |
| Framework  | Next.js 16 (App Router)              |
| Language   | TypeScript (strict)                  |
| Styling    | Tailwind CSS                         |
| Animations | Framer Motion (public site only)     |
| Backend    | Supabase (Auth, PostgreSQL, Storage) |
| Hosting    | Vercel                               |
| Analytics  | Vercel Analytics + Speed Insights    |

---

## Features

- **Exhibits gallery** — paginated, searchable, sortable with server-side filtering
- **Workshops** — event listings with dates and images
- **Admin dashboard** — full CRUD for exhibits and workshops with image upload
- **Multilingual UI** — 6 languages (English, Arabic/RTL, German, Spanish, Italian, French)
- **Responsive** — mobile-first design with hamburger nav and adaptive grids
- **Secure** — CSP headers, RLS policies, input validation, auth enforcement

---

## Documentation

Full documentation is in the [`docs/`](./docs/) folder:

| Doc                                       | Description                                          |
| ----------------------------------------- | ---------------------------------------------------- |
| [Architecture](./docs/architecture.md)    | Monorepo structure, data flow, package relationships |
| [Setup](./docs/setup.md)                  | Local dev, environment variables, build commands     |
| [API Reference](./docs/api.md)            | REST API routes, request/response schemas            |
| [Database](./docs/database.md)            | Schema diagram, table details, RLS policies, storage |
| [Authentication](./docs/auth.md)          | Login flow, protected routes, server proxy           |
| [i18n](./docs/i18n.md)                    | Internationalization system, adding languages        |
| [Components](./docs/components.md)        | All UI components — props and behaviour              |
| [Security](./docs/security.md)            | Security hardening applied                           |
| [Performance](./docs/performance.md)      | Caching, ISR, optimisations                          |
| [Responsive Design](./docs/responsive.md) | Breakpoints, mobile-first details                    |
| [Deployment](./docs/deployment.md)        | Vercel setup, environment variables                  |
| [Types](./docs/types.md)                  | TypeScript types reference                           |
| [Changelog](./docs/changelog.md)          | Project history                                      |

---

## Team

**Faculty of Tourism and Hotels, Minia University**

- Prof. Samar Mustafa – Dean
- Prof. Engy Elkilany – Vice Dean
- Dr. Gehad Mohamed – Initiative Coordinator

**Museum Team** — Mohand Hesham (Lead), Ezzat Maged (Web Developer), and curators: Ziad Khalaf, Mahmoud Farghly, Mala Amr, Romaysaa Mohamed, Rogena Hany, Shahd Esaam, Shahd Ahmad, Hanin Ahmed, Login Ahmed, Samuil Hany.

---

<div align="center">

_"Protecting our heritage, strengthening our identity"_

</div>
