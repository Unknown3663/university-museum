import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workshops",
  description:
    "Join heritage awareness and AI preservation workshops hosted by the Tourist Guidance Museum at the Faculty of Tourism and Hotels, Minia University.",
  alternates: {
    canonical: "https://tgm-chi.vercel.app/workshops",
  },
  openGraph: {
    title: "Workshops | Tourist Guidance Museum",
    description:
      "Heritage awareness and AI preservation workshops hosted by the Tourist Guidance Museum.",
    url: "https://tgm-chi.vercel.app/workshops",
    type: "website",
  },
};

export default function WorkshopsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
