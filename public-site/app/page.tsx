"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import BackgroundImage from "./components/BackgroundImage";
import Hero from "./components/HeroSection";
import ScrollIndicator from "./components/ScrollIndicator";
import SideLogos from "./components/SideLogos";
import SignatureLogo from "./components/SignatureLogo";
import Footer from "./components/Footer";
import { useLanguage } from "../../shared/i18n/LanguageContext";

// Dynamically import Navbar
const Navbar = dynamic(() => import("./components/Navbar"), {
  loading: () => <div className="h-20 bg-black/20" />,
});

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="relative w-full">
      {/* Signature Logo - Hidden in hero section, visible after scrolling */}
      <SignatureLogo hideOnHeroSection={true} />

      {/* Hero Section with Background */}
      <div className="relative min-h-screen w-full overflow-hidden">
        {/* Hero Background - Moves with hero section */}
        <div className="absolute inset-0 w-full h-full -z-10">
          <Image
            src="/backgrounds/college-background.jpg"
            alt="Tourist Guidance Museum Building"
            fill
            priority
            quality={80}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        <Navbar />
        <SideLogos />
        <Hero />
        <ScrollIndicator />
      </div>

      {/* About Us Section */}
      <section
        id="about"
        className="relative bg-gray-50 py-16 sm:py-20 lg:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">
              {t("home.about.title")}
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Info Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 border border-gray-200">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  {t("home.about.paragraph1")}
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {t("home.about.paragraph2")}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {t("home.about.paragraph3")}
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-xl order-first lg:order-last">
              <Image
                src="/backgrounds/team-background.jpg"
                alt="Museum Team"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Aims Section */}
      <section id="aims" className="relative bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">
              {t("home.aims.title")}
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          {/* Content Card */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 border border-gray-200">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  {t("home.aims.paragraph1")}
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  {t("home.aims.paragraph2")}
                </p>

                <p className="text-gray-900 font-semibold text-lg mb-4">
                  {t("home.aims.mainGoals")}
                </p>

                <ol className="space-y-4 text-gray-700 leading-relaxed list-decimal list-inside">
                  <li className="pl-2">{t("home.aims.goal1")}</li>
                  <li className="pl-2">{t("home.aims.goal2")}</li>
                  <li className="pl-2">{t("home.aims.goal3")}</li>
                  <li className="pl-2">{t("home.aims.goal4")}</li>
                  <li className="pl-2">{t("home.aims.goal5")}</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
