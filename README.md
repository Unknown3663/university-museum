# 🏛️ Tourist Guidance Museum - Full Stack Project# University Museum Website

A complete museum management system with a **public-facing website** and a **private admin dashboard** for managing exhibits.A modern, responsive museum homepage built with Next.js 15 and React 18.

## 📁 Project Structure## Features

````- ✨ Server-Side Rendering (SSR) with Next.js 15

museum-project/- 🎨 Styled with Tailwind CSS

│- 🖼️ Fullscreen background image with overlay

├── public-site/              # 🌐 Public website (Next.js 15 + React 18)- 🎭 Smooth animations and transitions

│   ├── app/- 📱 Fully responsive design

│   │   ├── page.jsx          # Homepage with hero section- 🔍 Interactive search functionality

│   │   ├── team/             # Team page- 🎯 Glass-morphism navbar effect

│   │   ├── workshops/        # Workshops page- 📖 Museum-style typography (Playfair Display)

│   │   ├── exhibits/         # Public exhibit gallery (Supabase)

│   │   └── components/       # Reusable components## Getting Started

│   ├── lib/

│   │   └── supabaseClient.js # Supabase integration### Prerequisites

│   └── package.json

│Make sure you have Node.js 18+ installed on your system.

├── museum-dashboard/         # 🔒 Admin CMS (Next.js 15 + React 18)

│   ├── app/### Installation

│   │   ├── login/            # Authentication

│   │   └── dashboard/1. Navigate to the project directory:

│   │       ├── page.jsx      # Dashboard overview```bash

│   │       ├── upload/       # Upload new exhibitscd museum-website

│   │       ├── exhibits/     # Manage exhibits```

│   │       └── components/   # Dashboard components

│   ├── lib/2. Install dependencies:

│   │   └── supabaseClient.js # Supabase CRUD + Auth```bash

│   └── package.jsonnpm install

│```

└── README.md                 # This file

```3. Add your museum image:

   - Place your `museum.webp` file in the `public/` folder

## 🚀 Getting Started

### Running the Development Server

### Prerequisites

```bash

- **Node.js** 18+ and npmnpm run dev

- **Supabase** account ([supabase.com](https://supabase.com))```



### 1️⃣ Setup Public SiteOpen [http://localhost:3000](http://localhost:3000) in your browser to see the result.



```bash### Building for Production

cd public-site

npm install```bash

cp .env.local.example .env.localnpm run build

# Add your Supabase credentials to .env.localnpm start

npm run dev```

# Opens on http://localhost:3000

```## Project Structure



### 2️⃣ Setup Dashboard```

museum-website/

```bash├── app/

cd museum-dashboard│   ├── components/

npm install│   │   └── Navbar.jsx         # Reusable navigation component

cp .env.local.example .env.local│   ├── team/

# Add your Supabase credentials to .env.local│   │   └── page.jsx           # Team page

npm run dev│   ├── workshops/

# Opens on http://localhost:3000│   │   └── page.jsx           # Workshops page

```│   ├── layout.jsx             # Root layout with fonts

│   ├── page.jsx               # Homepage

To run both apps simultaneously, use different ports:│   └── globals.css            # Global styles and Tailwind

```bash├── public/

# Public site (default port 3000)│   └── museum.webp            # Main background image (add yours here)

cd public-site && npm run dev├── next.config.js             # Next.js configuration

├── tailwind.config.js         # Tailwind CSS configuration

# Dashboard (port 3001)├── postcss.config.js          # PostCSS configuration

cd museum-dashboard && npm run dev -- -p 3001└── package.json               # Dependencies and scripts

````

### 3️⃣ Setup Supabase Database## Pages

**SQL Schema** (run in Supabase SQL Editor):- **Home** (`/`) - Fullscreen museum homepage with background image

- **Team** (`/team`) - Team members page (placeholder)

```sql- **Workshops** (`/workshops`) - Heritage awareness workshops page

-- Create exhibits table

CREATE TABLE exhibits (## Technologies Used

id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

title TEXT NOT NULL,- **Next.js 15** - React framework with SSR and HMR

description TEXT NOT NULL,- **React 18** - UI library

category TEXT, -- (deprecated, kept for backward compatibility)- **Tailwind CSS** - Utility-first CSS framework

image_url TEXT,- **Google Fonts** - Playfair Display (serif) and Inter (sans-serif)

published BOOLEAN DEFAULT false,

created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),## Customization

updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()

);### Changing Colors

Edit `tailwind.config.js` to customize the color scheme.

-- Enable Row Level Security

ALTER TABLE exhibits ENABLE ROW LEVEL SECURITY;### Changing Fonts

Modify the font imports in `app/layout.jsx`.

-- Policy: Allow public read access to published exhibits

CREATE POLICY "Public can view published exhibits"### Adding Content

ON exhibits FOR SELECTReplace placeholder content in `app/team/page.jsx` and `app/categories/page.jsx`.

USING (published = true);

## License

-- Policy: Authenticated users can do everything

CREATE POLICY "Authenticated users full access"This project is created for educational purposes.

ON exhibits FOR ALL
USING (auth.role() = 'authenticated');

```

**Storage Setup:**

1. Go to **Storage** in Supabase
2. Create a bucket named: `exhibit-images`
3. Make it **public**
4. Add this policy:
```

Allow public read: bucket_id = 'exhibit-images'
Allow authenticated insert/update/delete

````

### 4️⃣ Create Admin User

In Supabase → **Authentication** → **Users** → **Add User**:
- Email: your-email@example.com
- Password: (create a strong password)

## 🎨 Features

### Public Site (`public-site/`)
- ✅ Fullscreen homepage with hero image
- ✅ Responsive Navbar with search
- ✅ Workshops page
- ✅ Team page
- ✅ **Exhibits page** (fetches published exhibits from Supabase)
- ✅ Tailwind CSS animations

### Admin Dashboard (`museum-dashboard/`)
- ✅ Secure login (Supabase Auth)
- ✅ Dashboard overview
- ✅ Upload new exhibits with images
- ✅ Manage exhibits (edit, delete, publish/unpublish)
- ✅ Sidebar navigation
- ✅ Protected routes

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 15** | React framework (App Router) |
| **React 18** | UI library |
| **Tailwind CSS** | Styling |
| **Supabase** | Database, Auth, Storage |
| **Vercel** | Deployment (recommended) |

## 📝 Environment Variables

Both apps need `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
````

Get these from **Supabase Dashboard** → **Settings** → **API**.

## 🚢 Deployment

### Deploy Public Site (Vercel)

```bash
cd public-site
vercel deploy
```

### Deploy Dashboard (Vercel)

```bash
cd museum-dashboard
vercel deploy
```

**Important:** Add environment variables in Vercel project settings!

## 📚 Common Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🔒 Security Notes

- ✅ Dashboard requires authentication
- ✅ RLS policies protect database
- ✅ Public site only shows published exhibits
- ✅ Image uploads validated on client & server
- ⚠️ Never commit `.env.local` to Git

## 🤝 Contributing

1. Both apps are **self-contained** (separate package.json)
2. They share the **same Supabase project**
3. Public site = read-only exhibits
4. Dashboard = full CRUD access

## 📄 License

MIT License - Free to use and modify

---

**Need Help?**

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
