import Image from "next/image";
import Navbar from "../components/Navbar";
import SignatureLogo from "../components/SignatureLogo";
import Footer from "../components/Footer";
import WorkshopCard from "../components/WorkshopCard";
import { getWorkshops } from "../../lib/supabaseClient";

export const metadata = {
  title: "Workshops - Tourist Guidance Museum",
  description:
    "Explore our heritage awareness workshops and educational programs.",
};

export default async function Workshops() {
  const workshops = await getWorkshops(true);

  return (
    <main className="relative min-h-screen w-full flex flex-col">
      {/* Signature Logo - Always visible */}
      <SignatureLogo />

      {/* Background Image */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <Image
          src="/backgrounds/hieroglyphics-background.jpg"
          alt="Ancient Hieroglyphics Background"
          fill
          priority
          quality={80}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <Navbar />

      <div className="flex-1 pt-24 sm:pt-28 md:pt-32 pb-0 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto pb-12 sm:pb-16">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-12 md:mb-16 bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-white/20">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-3 sm:mb-4">
              Workshops
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
              Heritage awareness workshops and educational programs
            </p>
          </div>

          {/* Workshops List or Empty State */}
          {workshops.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-8 sm:p-12 border border-white/20 text-center">
              <div className="max-w-2xl mx-auto">
                <svg
                  className="mx-auto h-16 w-16 sm:h-20 sm:w-20 text-white/60 mb-6"
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
                  Coming Soon
                </h2>
                <p className="text-lg text-gray-200">
                  Workshop information will be added through the dashboard.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {workshops.map((workshop) => (
                <WorkshopCard key={workshop.id} workshop={workshop} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
