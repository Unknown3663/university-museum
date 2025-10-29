import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const metadata = {
  title: "Tourist Guidance Museum - Explore History and Heritage",
  description:
    "Welcome to Tourist Guidance Museum. Explore history and heritage through time.",
  keywords: ["museum", "university", "history", "heritage", "exhibition"],
  icons: {
    icon: "/tgm-public.png",
    shortcut: "/tgm-public.png",
    apple: "/tgm-public.png",
  },
  openGraph: {
    title: "Tourist Guidance Museum",
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
