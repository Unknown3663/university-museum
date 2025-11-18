import { Playfair_Display, Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
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
    icon: "/logos/tgm-public.png",
    shortcut: "/logos/tgm-public.png",
    apple: "/logos/tgm-public.png",
  },
  openGraph: {
    title: "Tourist Guidance Museum",
    description: "Explore history and heritage through time",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
