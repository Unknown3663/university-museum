# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies

```bash
cd museum-dashboard
npm install
```

### Step 2: Set Up Supabase

1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Run this SQL in SQL Editor:

```sql
CREATE TABLE exhibits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE exhibits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users full access"
  ON exhibits FOR ALL TO authenticated
  USING (true) WITH CHECK (true);
```

4. Create Storage bucket named `exhibit-images` (make it public)
5. Create a user in Authentication → Users

### Step 3: Configure Environment

```bash
cp .env.local.example .env.local
```

Add your Supabase URL and Key to `.env.local`

### Step 4: Run!

```bash
npm run dev
```

Visit [http://localhost:3001](http://localhost:3001) and log in!

## 📝 Supabase Credentials Location

- Dashboard: https://app.supabase.com/project/YOUR_PROJECT/settings/api
- Copy **Project URL** and **anon public** key

## 🎯 First Time Setup Checklist

- [ ] npm install
- [ ] Create Supabase project
- [ ] Run SQL to create table
- [ ] Create storage bucket
- [ ] Create user account
- [ ] Add credentials to .env.local
- [ ] npm run dev
- [ ] Login and test!

## 🆘 Troubleshooting

**Can't login?**

- Check if user exists in Supabase Auth
- Verify .env.local has correct credentials
- Make sure Supabase project is not paused

**Images not uploading?**

- Check storage bucket is named `exhibit-images`
- Verify bucket is set to public
- Check file size (max 50MB by default)

**Table errors?**

- Ensure SQL was run completely
- Check RLS policies are created
- Verify table name is exactly `exhibits`
