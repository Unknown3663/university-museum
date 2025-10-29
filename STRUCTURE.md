# 🏛️ Museum Project - Complete Structure Overview

## 📊 Project Architecture

This is a **monorepo** containing two self-contained Next.js 15 applications:

1. **public-site/** - Public-facing museum website
2. **museum-dashboard/** - Private admin CMS

Both connect to the **same Supabase project** for data synchronization.

---

## 📁 Complete Directory Tree

```
University-Museum/
│
├── 📄 README.md                     # Main project documentation
├── 📄 STRUCTURE.md                  # This file - detailed structure guide
├── 📄 .gitignore                    # Git ignore rules
│
├── 🌐 public-site/                  # PUBLIC WEBSITE
│   │
│   ├── app/
│   │   ├── layout.jsx               # Root layout (fonts, metadata)
│   │   ├── globals.css              # Tailwind base + custom styles
│   │   ├── page.jsx                 # 🏠 Homepage (hero + background)
│   │   │
│   │   ├── team/
│   │   │   └── page.jsx             # 👥 Team members page
│   │   │
│   │   ├── categories/
│   │   │   └── page.jsx             # 📂 Museum categories
│   │   │
│   │   ├── exhibits/
│   │   │   └── page.jsx             # 🖼️ Public exhibits (from Supabase)
│   │   │
│   │   └── components/
│   │       ├── Navbar.jsx           # Top navigation with search
│   │       ├── SearchBar.jsx        # Expandable search input
│   │       ├── BackgroundImage.jsx  # Fullscreen background image
│   │       ├── Button.jsx           # Reusable button component
│   │       ├── HeroSection.jsx      # Homepage hero section
│   │       ├── ScrollIndicator.jsx  # Scroll down indicator
│   │       ├── ExhibitCard.jsx      # Exhibit card for gallery
│   │       └── Footer.jsx           # (Optional) Footer component
│   │
│   ├── public/
│   │   ├── museum.webp              # Hero background image
│   │   ├── TGM.png                  # Museum logo
│   │   ├── hieroglyphics-background.jpg  # Categories page background
│   │   └── icon.png                 # Favicon
│   │
│   ├── lib/
│   │   └── supabaseClient.js        # Supabase client + getPublishedExhibits()
│   │
│   ├── 📦 package.json              # Dependencies (Next 15, React 18, Supabase)
│   ├── ⚙️ next.config.js             # Image optimization, Supabase domains
│   ├── ⚙️ tailwind.config.js        # Custom animations, fonts
│   ├── ⚙️ postcss.config.js
│   └── 📄 .env.local.example        # Environment variables template
│
│
├── 🔒 museum-dashboard/             # ADMIN DASHBOARD
│   │
│   ├── app/
│   │   ├── layout.jsx               # Root layout
│   │   ├── globals.css              # Dashboard styles
│   │   │
│   │   ├── login/
│   │   │   └── page.jsx             # 🔑 Login page (Supabase Auth)
│   │   │
│   │   └── dashboard/
│   │       ├── layout.jsx           # Dashboard layout (Sidebar + Navbar)
│   │       ├── page.jsx             # 📊 Dashboard overview
│   │       │
│   │       ├── upload/
│   │       │   └── page.jsx         # 📤 Upload new exhibit
│   │       │
│   │       ├── exhibits/
│   │       │   └── page.jsx         # 🖼️ Manage exhibits (edit/delete/publish)
│   │       │
│   │       └── components/
│   │           ├── Sidebar.jsx      # Left sidebar navigation
│   │           ├── Navbar.jsx       # Top navbar with sign out
│   │           ├── ProtectedRoute.jsx  # Auth wrapper
│   │           ├── UploadForm.jsx   # Exhibit upload form
│   │           └── ExhibitList.jsx  # Table of exhibits
│   │
│   ├── lib/
│   │   └── supabaseClient.js        # Supabase client + CRUD + Auth functions
│   │
│   ├── 📦 package.json              # Dependencies (Next 15, React 18, Supabase)
│   ├── ⚙️ next.config.js
│   ├── ⚙️ tailwind.config.js
│   ├── ⚙️ postcss.config.js
│   └── 📄 .env.local.example
│
│
└── 🧩 shared/                       # SHARED UTILITIES (Optional)
    ├── utils/
    │   └── formatDate.js            # Date formatting, text truncation
    └── components/
        └── Spinner.jsx              # Loading spinner component
```

---

## 🔄 Data Flow

```
┌─────────────────────┐
│   SUPABASE PROJECT  │
│                     │
│  ┌───────────────┐  │
│  │   exhibits    │  │ ← Database table
│  │   (table)     │  │
│  └───────────────┘  │
│                     │
│  ┌───────────────┐  │
│  │ exhibit-images│  │ ← Storage bucket
│  │   (bucket)    │  │
│  └───────────────┘  │
│                     │
│  ┌───────────────┐  │
│  │     auth      │  │ ← Authentication
│  └───────────────┘  │
└─────────────────────┘
         ↑       ↑
         │       │
         │       │
    ┌────┘       └────┐
    │                 │
    │                 │
┌───▼────────┐  ┌────▼──────────┐
│ PUBLIC SITE│  │   DASHBOARD   │
│            │  │               │
│ ✅ Read     │  │ ✅ Create      │
│ published  │  │ ✅ Read all    │
│ exhibits   │  │ ✅ Update      │
│ only       │  │ ✅ Delete      │
│            │  │ ✅ Auth        │
└────────────┘  └───────────────┘
```

---

## 🚀 Quick Start Commands

### Install & Run Public Site

```bash
cd public-site
npm install
npm run dev       # http://localhost:3000
```

### Install & Run Dashboard

```bash
cd museum-dashboard
npm install
npm run dev       # http://localhost:3000
# Or use port 3001: npm run dev -- -p 3001
```

### Run Both Simultaneously

```bash
# Terminal 1
cd public-site && npm run dev

# Terminal 2
cd museum-dashboard && npm run dev -- -p 3001
```

---

## 📝 Database Schema

```sql
exhibits
├── id: UUID (PK)
├── title: TEXT
├── description: TEXT
├── category: TEXT (nullable)
├── image_url: TEXT (nullable)
├── published: BOOLEAN (default: false)
├── created_at: TIMESTAMP
└── updated_at: TIMESTAMP
```

**Row Level Security (RLS) Policies:**

- Public: Can SELECT published exhibits only
- Authenticated: Full CRUD access

---

**Last Updated**: October 30, 2025
**Version**: 2.0.0 (Restructured Monorepo)
