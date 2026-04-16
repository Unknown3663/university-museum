import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Metadata as NextMetadata } from "next";
import { LanguageProvider } from "../../shared/i18n/LanguageContext";
import Script from "next/script";

const BASE_URL = "https://tgm-chi.vercel.app";
const supabaseOrigin = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).origin
  : null;

export const metadata: NextMetadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default:
      "Tourist Guidance Museum – Faculty of Tourism & Hotels, Minia University",
    template: "%s | Tourist Guidance Museum",
  },
  description:
    "Explore TGM – the Tourist Guidance Museum at the Faculty of Tourism and Hotels, Minia University. Discover archaeological artefacts, cultural exhibits, and heritage workshops as part of the 'Protect Your Identity' initiative.",
  keywords: [
    "TGM",
    "Tourist Guidance Museum",
    "TGM museum",
    "TGM Minia University",
    "Minia University",
    "Faculty of Tourism and Hotels",
    "Egyptian heritage",
    "archaeological artefacts",
    "museum exhibits",
    "heritage workshops",
    "Egyptian identity",
    "cultural museum",
    "Egypt archaeology",
  ],
  authors: [{ name: "Tourist Guidance Museum Team" }],
  creator: "Faculty of Tourism and Hotels, Minia University",
  publisher: "Minia University",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  verification: {
    google: "LPSxqAm6YvkQpeSAKok-IKYLk5akbTIUsvvOa0d9qNk",
  },
  icons: {
    icon: "/logos/tgm-public.png",
    shortcut: "/logos/tgm-public.png",
    apple: "/logos/tgm-public.png",
  },
  openGraph: {
    title: "Tourist Guidance Museum (TGM) – Minia University",
    description:
      "TGM – Explore history and heritage through time. Discover archaeological artefacts, cultural exhibits, and workshops at the Faculty of Tourism and Hotels, Minia University.",
    url: BASE_URL,
    siteName: "Tourist Guidance Museum",
    images: [
      {
        url: "/backgrounds/college-background.jpg",
        width: 1200,
        height: 630,
        alt: "Tourist Guidance Museum – Faculty of Tourism and Hotels, Minia University",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tourist Guidance Museum – Minia University",
    description:
      "Explore history and heritage through time. Discover archaeological artefacts, cultural exhibits, and workshops.",
    images: ["/backgrounds/college-background.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Museum",
  name: "Tourist Guidance Museum",
  alternateName: [
    "TGM",
    "Tourist Guidance Museum",
    "TGM Minia University",
    "TGM – Faculty of Tourism and Hotels, Minia University",
  ],
  url: BASE_URL,
  logo: `${BASE_URL}/logos/tgm-public.png`,
  image: `${BASE_URL}/backgrounds/college-background.jpg`,
  description:
    "The Tourist Guidance Museum at the Faculty of Tourism and Hotels, Minia University, houses replicas of archaeological artefacts with identification labels in Arabic and English, contributing to public heritage awareness.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Minia",
    addressCountry: "EG",
  },
  parentOrganization: {
    "@type": "CollegeOrUniversity",
    name: "Minia University",
    url: "https://mu.edu.eg",
  },
  sameAs: [BASE_URL],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        {supabaseOrigin && (
          <>
            <link rel="dns-prefetch" href={supabaseOrigin} />
            <link rel="preconnect" href={supabaseOrigin} crossOrigin="anonymous" />
          </>
        )}
        <Script
          id="json-ld-museum"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
