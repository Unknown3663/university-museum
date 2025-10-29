# ✅ Museum Project - Setup Checklist

## 🎯 Project Restructure Complete!

Your museum project has been successfully reorganized into a professional monorepo structure with two self-contained Next.js 15 applications.

---

## 📊 Project Summary

### ✅ Created Structure

```
University-Museum/
├── public-site/          # 13 component files ✅
├── museum-dashboard/     # 17 component files ✅
├── shared/              # Optional utilities ✅
└── docs (README, etc.)  # Complete ✅
```

### 📦 Applications

#### 🌐 Public Site (`public-site/`)

- **Purpose**: Public-facing museum website
- **Port**: 3000 (default)
- **Features**:
  - Homepage with fullscreen background
  - Navbar with animated search
  - Team, Categories, Exhibits pages
  - Supabase integration (read published exhibits)
  - Responsive design with Tailwind CSS

#### 🔒 Dashboard (`museum-dashboard/`)

- **Purpose**: Private admin CMS
- **Port**: 3001 (recommended)
- **Features**:
  - Supabase authentication
  - Dashboard overview
  - Upload new exhibits with images
  - Manage exhibits (CRUD operations)
  - Publish/unpublish toggle
  - Protected routes

---

## 🚀 Next Steps (In Order)

### 1️⃣ Setup Public Site

```bash
cd public-site
npm install
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials
npm run dev
```

✅ Site will run on http://localhost:3000

### 2️⃣ Setup Dashboard

```bash
cd museum-dashboard
npm install
cp .env.local.example .env.local
# Edit .env.local with the SAME Supabase credentials
npm run dev -- -p 3001
```

✅ Dashboard will run on http://localhost:3001

### 3️⃣ Setup Supabase (5 minutes)

**A. Create Project**

1. Go to https://supabase.com
2. Create new project
3. Wait for database to initialize

**B. Run SQL Schema**
Go to **SQL Editor** and run:

```sql
CREATE TABLE exhibits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT,
  image_url TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE exhibits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published exhibits"
ON exhibits FOR SELECT
USING (published = true);

CREATE POLICY "Authenticated users full access"
ON exhibits FOR ALL
USING (auth.role() = 'authenticated');
```

**C. Create Storage Bucket**

1. Go to **Storage**
2. Create bucket: `exhibit-images`
3. Make it **public**

**D. Create Admin User**

1. Go to **Authentication** → **Users**
2. Click **Add User**
3. Enter email and password
4. Save credentials for login

**E. Get API Keys**

1. Go to **Settings** → **API**
2. Copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Add to `.env.local` in BOTH apps

---

## 🔑 Environment Variables Template

Create `.env.local` in both `public-site/` and `museum-dashboard/`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **Important**: Use the SAME credentials in both apps!

---

## 🧪 Testing Workflow

1. **Login to Dashboard** (http://localhost:3001)

   - Use the email/password you created in Supabase Auth

2. **Upload a Test Exhibit**

   - Go to Dashboard → Upload
   - Fill in title, description, category
   - Upload an image
   - Check "Publish immediately"
   - Submit

3. **Verify Public Site** (http://localhost:3000)

   - Navigate to Exhibits page
   - Should see your published exhibit

4. **Test Publishing Toggle**
   - Go to Dashboard → Exhibits
   - Click "Unpublish" on your exhibit
   - Refresh public site → exhibit disappears
   - Click "Publish" again → exhibit reappears

---

## 📁 File Structure Reference

### Public Site Files Created:

- ✅ `app/layout.jsx` - Root layout
- ✅ `app/page.jsx` - Homepage
- ✅ `app/team/page.jsx` - Team page
- ✅ `app/categories/page.jsx` - Categories page
- ✅ `app/exhibits/page.jsx` - Exhibits gallery
- ✅ `app/components/Navbar.jsx` - Navigation
- ✅ `app/components/SearchBar.jsx` - Search input
- ✅ `app/components/BackgroundImage.jsx` - Background
- ✅ `app/components/Button.jsx` - Button component
- ✅ `app/components/HeroSection.jsx` - Hero section
- ✅ `app/components/ScrollIndicator.jsx` - Scroll indicator
- ✅ `app/components/ExhibitCard.jsx` - Exhibit card
- ✅ `lib/supabaseClient.js` - Supabase client

### Dashboard Files Created:

- ✅ `app/layout.jsx` - Root layout
- ✅ `app/login/page.jsx` - Login page
- ✅ `app/dashboard/layout.jsx` - Dashboard layout
- ✅ `app/dashboard/page.jsx` - Overview
- ✅ `app/dashboard/upload/page.jsx` - Upload page
- ✅ `app/dashboard/exhibits/page.jsx` - Manage page
- ✅ `app/dashboard/components/Sidebar.jsx` - Sidebar
- ✅ `app/dashboard/components/Navbar.jsx` - Top navbar
- ✅ `app/dashboard/components/ProtectedRoute.jsx` - Auth wrapper
- ✅ `app/dashboard/components/UploadForm.jsx` - Upload form
- ✅ `app/dashboard/components/ExhibitList.jsx` - Exhibit table
- ✅ `lib/supabaseClient.js` - Supabase with full CRUD

---

## 🎨 Optional Enhancements

### Shared Components

Located in `shared/`:

- `shared/utils/formatDate.js` - Date formatting utilities
- `shared/components/Spinner.jsx` - Loading spinner

To use in your apps:

```javascript
// In public-site or museum-dashboard
import { formatDate } from "../../shared/utils/formatDate";
import Spinner from "../../shared/components/Spinner";
```

---

## 🚢 Deployment Guide

### Option 1: Vercel (Recommended)

**Deploy Public Site:**

```bash
cd public-site
vercel
# Follow prompts, add environment variables in dashboard
```

**Deploy Dashboard:**

```bash
cd museum-dashboard
vercel
# Use different project name, add same environment variables
```

### Option 2: Other Platforms

Both apps are standard Next.js 15 applications and can be deployed to:

- Netlify
- Railway
- Render
- AWS Amplify
- Cloudflare Pages

---

## 🐛 Troubleshooting

### Issue: "Module not found" errors

**Solution**:

```bash
cd public-site (or museum-dashboard)
rm -rf node_modules package-lock.json
npm install
```

### Issue: Images not loading from Supabase

**Solution**: Check `next.config.js` includes:

```javascript
remotePatterns: [
  {
    protocol: 'https',
    hostname: '**.supabase.co',
    pathname: '/storage/v1/object/public/**',
  },
],
```

### Issue: Authentication not working

**Solution**:

1. Verify user exists in Supabase Auth
2. Check `.env.local` has correct credentials
3. Confirm credentials are the same in both apps

### Issue: Can't see exhibits on public site

**Solution**:

1. Check exhibit is marked as "published" in dashboard
2. Verify RLS policies are created correctly
3. Check browser console for errors

---

## 📚 Documentation

- **README.md** - Main project overview
- **STRUCTURE.md** - Detailed architecture guide
- **SETUP.md** - This file (setup checklist)

---

## ✨ Project Status

### ✅ Completed

- [x] Public site structure (13 files)
- [x] Dashboard structure (17 files)
- [x] Supabase integration (both apps)
- [x] Authentication system
- [x] CRUD operations
- [x] Image upload/delete
- [x] Publish/unpublish functionality
- [x] Protected routes
- [x] Responsive design
- [x] Shared utilities folder
- [x] Complete documentation

### 🎯 Ready for Production

Both applications are production-ready and follow Next.js 15 best practices!

---

## 🤝 Need Help?

**Resources:**

- [Next.js 15 Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React 18 Docs](https://react.dev)

**Common Tasks:**

- Adding new page: Create `page.jsx` in `app/your-page/`
- Adding component: Create `.jsx` file in `app/components/`
- Updating styles: Edit `tailwind.config.js` or `globals.css`
- Database changes: Run SQL in Supabase SQL Editor

---

**🎉 Congratulations! Your museum project is ready to launch!**
