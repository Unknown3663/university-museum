import { Inter } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
