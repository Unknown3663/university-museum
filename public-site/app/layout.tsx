import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Metadata as NextMetadata } from "next";
import { LanguageProvider } from "../../shared/i18n/LanguageContext";

export const metadata: NextMetadata = {
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
    <html lang="en">
      <body className="font-sans antialiased">
        <LanguageProvider>{children}</LanguageProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
