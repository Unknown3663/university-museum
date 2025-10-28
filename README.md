# University Museum Website

A modern, responsive museum homepage built with Next.js 15 and React 18.

## Features

- ✨ Server-Side Rendering (SSR) with Next.js 15
- 🎨 Styled with Tailwind CSS
- 🖼️ Fullscreen background image with overlay
- 🎭 Smooth animations and transitions
- 📱 Fully responsive design
- 🔍 Interactive search functionality
- 🎯 Glass-morphism navbar effect
- 📖 Museum-style typography (Playfair Display)

## Getting Started

### Prerequisites

Make sure you have Node.js 18+ installed on your system.

### Installation

1. Navigate to the project directory:
```bash
cd museum-website
```

2. Install dependencies:
```bash
npm install
```

3. Add your museum image:
   - Place your `museum.webp` file in the `public/` folder

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
museum-website/
├── app/
│   ├── components/
│   │   └── Navbar.jsx         # Reusable navigation component
│   ├── team/
│   │   └── page.jsx           # Team page
│   ├── categories/
│   │   └── page.jsx           # Categories page
│   ├── layout.jsx             # Root layout with fonts
│   ├── page.jsx               # Homepage
│   └── globals.css            # Global styles and Tailwind
├── public/
│   └── museum.webp            # Main background image (add yours here)
├── next.config.js             # Next.js configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
└── package.json               # Dependencies and scripts
```

## Pages

- **Home** (`/`) - Fullscreen museum homepage with background image
- **Team** (`/team`) - Team members page (placeholder)
- **Categories** (`/categories`) - Museum categories page (placeholder)

## Technologies Used

- **Next.js 15** - React framework with SSR and HMR
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Google Fonts** - Playfair Display (serif) and Inter (sans-serif)

## Customization

### Changing Colors
Edit `tailwind.config.js` to customize the color scheme.

### Changing Fonts
Modify the font imports in `app/layout.jsx`.

### Adding Content
Replace placeholder content in `app/team/page.jsx` and `app/categories/page.jsx`.

## License

This project is created for educational purposes.
