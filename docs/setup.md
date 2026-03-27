# Setup & Local Development

## Prerequisites

| Tool    | Version |
| ------- | ------- |
| Node.js | ≥ 18    |
| npm     | ≥ 9     |

No other global installs are required.

---

## Environment Variables

Create a `.env.local` file in **both** `public-site/` and `museum-dashboard/`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key from Supabase dashboard>
```

Both packages validate these at boot and throw a descriptive error if missing.

> **Note:** These are `NEXT_PUBLIC_` variables — they are exposed to the browser. They grant only anon-level access; actual write operations are guarded by Supabase RLS policies.

---

## Install Dependencies

Each package manages its own `node_modules`.

```bash
# Install public-site dependencies
cd public-site
npm install

# (Optionally) install shared dependencies
cd ../shared
npm install

# Install museum-dashboard dependencies
cd ../museum-dashboard
npm install
```

The `build` script in each package runs `npm run install:shared` automatically before building.

---

## Running Locally

### Public site (port 3000)

```bash
cd public-site
npm run dev
```

Open: http://localhost:3000

### Dashboard (port 3001)

```bash
cd museum-dashboard
npm run dev
```

Open: http://localhost:3001  
Login: http://localhost:3001/login

---

## Building for Production

```bash
# Public site
cd public-site
npm run build
npm start

# Dashboard
cd museum-dashboard
npm run build
npm start   # runs on port 3001
```

---

## Linting

```bash
cd public-site && npm run lint
cd museum-dashboard && npm run lint
```

---

## Project-Specific Notes

- The `museum-dashboard` dev server runs on **port 3001** (via `-p 3001` flag) to avoid conflicting with the public site on 3000.
- Both `next.config.js` files use `--webpack` flag in dev/build scripts to pin the webpack bundler (Next.js 16 supports Turbopack by default; webpack is required for the shared-folder alias to work).
- `allowedDevOrigins: ["192.168.1.20"]` is set in `public-site/next.config.js` for LAN testing.
