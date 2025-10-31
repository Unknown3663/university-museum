import Image from "next/image";
import Navbar from "../components/Navbar";
import { getWorkshops } from "../../lib/supabaseClient";

export const metadata = {
  title: "Workshops - Tourist Guidance Museum",
  description:
    "Explore our heritage awareness workshops and educational programs.",
};

export default async function Workshops() {
  const workshops = await getWorkshops(true);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
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

      <div className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
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
            <div className="space-y-6">
              {workshops.map((workshop) => (
                <div
                  key={workshop.id}
                  className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    {/* Order Badge */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-2xl sm:text-3xl font-bold text-white">
                          {workshop.order}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                        {workshop.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-4">
                        <svg
                          className="w-5 h-5 text-blue-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-blue-200 font-medium">
                          {formatDate(workshop.date)}
                        </span>
                      </div>
                      {workshop.description && (
                        <p className="text-gray-200 leading-relaxed">
                          {workshop.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
