import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exhibits",
  description:
    "Browse the Tourist Guidance Museum's curated collection of archaeological artefacts and cultural exhibits from ancient Egypt and beyond.",
  alternates: {
    canonical: "https://tgm-chi.vercel.app/exhibits",
  },
  openGraph: {
    title: "Exhibits | Tourist Guidance Museum",
    description:
      "Browse our curated collection of archaeological artefacts and cultural exhibits.",
    url: "https://tgm-chi.vercel.app/exhibits",
    type: "website",
  },
};

export default function ExhibitsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
