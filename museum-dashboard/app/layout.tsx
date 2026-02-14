import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "../../shared/i18n/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Museum Dashboard - Admin Panel",
  description: "Manage museum exhibits and content",
  icons: {
    icon: "/tgm-dashboard.jpg",
    shortcut: "/tgm-dashboard.jpg",
    apple: "/tgm-dashboard.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
