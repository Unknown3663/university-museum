"use client";

import Image from "next/image";
import Navbar from "../components/Navbar";
import SignatureLogo from "../components/SignatureLogo";
import Footer from "../components/Footer";
import WorkshopCard from "../components/WorkshopCard";
import type { Workshop } from "../../../shared/types";
import { useLanguage } from "../../../shared/i18n/LanguageContext";
import backgroundImage from "../../public/backgrounds/hieroglyphics-background.jpg";

interface WorkshopsClientProps {
  initialWorkshops: Workshop[];
  initialError?: boolean;
}

export default function WorkshopsClient({
  initialWorkshops,
  initialError = false,
}: WorkshopsClientProps) {
  const { t } = useLanguage();

  return (
    <main className="relative min-h-screen w-full flex flex-col">
      <SignatureLogo />

      <div className="fixed inset-0 w-full h-full -z-10">
        <Image
          src={backgroundImage}
          alt="Ancient Hieroglyphics Background"
          fill
          priority
          placeholder="blur"
          quality={70}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <Navbar />

      <div className="flex-1 pt-24 sm:pt-28 md:pt-32 pb-0 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto pb-12 sm:pb-16">
          <header className="text-center mb-10 sm:mb-12 md:mb-16 rounded-xl sm:rounded-2xl border border-white/20 bg-black/30 p-6 sm:p-8 backdrop-blur-md">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-3 sm:mb-4">
              {t("workshops.title")}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-100 max-w-3xl mx-auto">
              {t("workshops.subtitle")}
            </p>
          </header>

          {initialError ? (
            <section className="rounded-xl sm:rounded-2xl border border-red-200/70 bg-red-50 p-8 text-center shadow-lg">
              <h2 className="mb-3 text-2xl font-bold text-red-800">
                {t("common.error")}
              </h2>
              <p className="text-red-700">Failed to load workshops.</p>
            </section>
          ) : initialWorkshops.length === 0 ? (
            <section className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-8 sm:p-12 border border-white/20 text-center">
              <div className="max-w-2xl mx-auto">
                <svg
                  className="mx-auto h-16 w-16 sm:h-20 sm:w-20 text-white/70 mb-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  {t("workshops.emptyTitle")}
                </h2>
                <p className="text-lg text-slate-100">
                  {t("workshops.emptyDescription")}
                </p>
              </div>
            </section>
          ) : (
            <section
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              aria-label={t("workshops.title")}
            >
              {initialWorkshops.map((workshop, index) => (
                <WorkshopCard
                  key={workshop.id}
                  workshop={workshop}
                  priority={index === 0}
                />
              ))}
            </section>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
