import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the faculty and student team behind the Tourist Guidance Museum initiative at the Faculty of Tourism and Hotels, Minia University.",
  alternates: {
    canonical: "https://tgm-chi.vercel.app/team",
  },
  openGraph: {
    title: "Our Team | Tourist Guidance Museum",
    description:
      "Meet the faculty and student team behind the Tourist Guidance Museum initiative.",
    url: "https://tgm-chi.vercel.app/team",
    type: "website",
  },
};

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
