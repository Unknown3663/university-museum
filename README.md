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

The Tourist Guidance Museum is a digital experience bringing Egypt's heritage closer to everyone. Supports the **"It's Your Own: Protect Your Identity"** initiative with the Grand Egyptian Museum.

**Live site:** https://tgm-chi.vercel.app

---

## Structure

```
University-Museum/
├── public-site/        # Public website (Next.js, port 3000)
├── museum-dashboard/   # Admin dashboard - auth required (port 3001)
├── shared/             # Shared types, i18n, components
└── docs/               # Full documentation
```

---

## Quick Start

**Prerequisites:** Node.js >= 18

```bash
# Public site (http://localhost:3000)
cd public-site && npm install && npm run dev

# Admin dashboard (http://localhost:3001)
cd museum-dashboard && npm install && npm run dev
```

Environment variables: copy `.env.local.example` to `.env.local` in each package.

---

## Tech Stack

Next.js 16 (App Router) · TypeScript (strict) · Tailwind CSS · Framer Motion · Supabase (Auth, PostgreSQL, Storage) · Vercel

---

## Features

- Exhibits gallery — paginated, searchable, server-side filtering
- Workshops — event listings with dates and images
- Admin dashboard — full CRUD with image upload
- Multilingual — 6 languages (EN, AR/RTL, DE, ES, IT, FR)
- Responsive — mobile-first with adaptive grids
- Secure — CSP headers, RLS policies, auth enforcement

---

## Documentation

Full documentation available in the [`docs/`](./docs/) folder.

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