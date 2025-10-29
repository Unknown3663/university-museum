# Museum Dashboard

A private admin dashboard for managing museum exhibits. Built with Next.js 15, React 18, Tailwind CSS, and Supabase.

## Features

- 🔐 Secure authentication with Supabase Auth
- 📸 Image upload to Supabase Storage
- ✏️ Create, edit, and delete exhibits
- 👁️ Publish/unpublish exhibits
- 📱 Fully responsive design
- ⚡ Server-side rendering with Next.js 15

## Tech Stack

- **Framework:** Next.js 15
- **UI Library:** React 18
- **Styling:** Tailwind CSS
- **Backend:** Supabase (Auth, Database, Storage)
- **Language:** JavaScript

## Project Structure

```
museum-dashboard/
├── app/
│   ├── components/
│   │   ├── DashboardNavbar.jsx    # Top navigation bar
│   │   ├── ProtectedRoute.jsx     # Auth protection wrapper
│   │   ├── ExhibitCard.jsx        # Exhibit display card
│   │   └── ExhibitModal.jsx       # Add/Edit exhibit form
│   ├── dashboard/
│   │   ├── layout.jsx             # Dashboard layout
│   │   └── page.jsx               # Main dashboard page
│   ├── login/
│   │   └── page.jsx               # Login page
│   ├── globals.css                # Global styles
│   ├── layout.jsx                 # Root layout
│   └── page.jsx                   # Root redirect
├── lib/
│   ├── supabase.js                # Supabase client setup
│   ├── auth.js                    # Authentication utilities
│   └── exhibits.js                # Exhibit CRUD operations
├── public/                         # Static assets
├── .env.local.example             # Environment variables template
└── package.json

```

## Setup Instructions

### 1. Install Dependencies

```bash
cd museum-dashboard
npm install
```

### 2. Set Up Supabase

1. Go to [https://supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be ready

#### Create the Database Table

Run this SQL in the Supabase SQL Editor:

```sql
-- Create exhibits table
CREATE TABLE exhibits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE exhibits ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to do everything
CREATE POLICY "Allow authenticated users full access"
  ON exhibits
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
```

#### Create Storage Bucket

1. Go to **Storage** in your Supabase dashboard
2. Click **New bucket**
3. Name it: `exhibit-images`
4. Make it **Public**
5. Click **Create bucket**

#### Create a User

1. Go to **Authentication** → **Users**
2. Click **Add user**
3. Choose **Create new user**
4. Enter email and password
5. Click **Create user**

### 3. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:

   ```bash
   cp .env.local.example .env.local
   ```

2. Get your Supabase credentials:

   - Go to **Project Settings** → **API**
   - Copy the **Project URL** and **anon public** key

3. Update `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   ```

### 4. Run the Development Server

```bash
npm run dev
```

The dashboard will be available at [http://localhost:3001](http://localhost:3001)

## Usage

### Login

1. Navigate to `http://localhost:3001`
2. You'll be redirected to the login page
3. Enter the credentials you created in Supabase
4. Click **Sign In**

### Managing Exhibits

#### Add New Exhibit

1. Click **+ Add New Exhibit**
2. Fill in the title and description
3. Upload an image (optional)
4. Check **Publish** to make it visible to the public
5. Click **Save Exhibit**

#### Edit Exhibit

1. Click **Edit** on any exhibit card
2. Modify the fields
3. Click **Save Exhibit**

#### Delete Exhibit

1. Click **Delete** on any exhibit card
2. Confirm the deletion

#### Publish/Unpublish

- Toggle the publish checkbox when editing an exhibit
- Only published exhibits will be visible on the public website

## Connecting to Public Website

To fetch published exhibits from your public museum website:

```javascript
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Fetch published exhibits
async function getPublishedExhibits() {
  const { data, error } = await supabase
    .from("exhibits")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}
```

## Database Schema

### Exhibits Table

| Column      | Type      | Description                         |
| ----------- | --------- | ----------------------------------- |
| id          | UUID      | Primary key (auto-generated)        |
| title       | TEXT      | Exhibit title                       |
| description | TEXT      | Exhibit description                 |
| image_url   | TEXT      | URL to image in Supabase Storage    |
| published   | BOOLEAN   | Whether exhibit is publicly visible |
| created_at  | TIMESTAMP | When the exhibit was created        |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js 15:

- Netlify
- Railway
- AWS Amplify
- Self-hosted

## Security Notes

- ✅ All routes except login are protected
- ✅ Row Level Security enabled on Supabase
- ✅ Only authenticated users can manage exhibits
- ✅ Environment variables are kept secure
- ⚠️ Make sure to add authorized team emails in Supabase Auth

## License

This project is created for educational purposes.
