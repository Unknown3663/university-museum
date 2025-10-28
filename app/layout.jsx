import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  preload: true, // Add preload
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true, // Add preload
});

export const metadata = {
  title: "University Museum - Explore History and Heritage",
  description:
    "Welcome to our University Museum. Explore history and heritage through time.",
  keywords: ["museum", "university", "history", "heritage", "exhibition"], // Add keywords
  openGraph: {
    // Add social media preview
    title: "University Museum",
    description: "Explore history and heritage through time",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
