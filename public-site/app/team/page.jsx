import Image from "next/image";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Our Team - Tourist Guidance Museum",
  description: "Meet the dedicated team behind the Tourist Guidance Museum.",
};

export default function Team() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <Image
          src="/hieroglyphics-background.jpg"
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

      <div className="pt-20 sm:pt-24 pb-12 sm:pb-16 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4 sm:mb-6 px-4 sm:px-0"
            style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.8)" }}
          >
            Our Team
          </h1>
          <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 shadow-lg p-6 sm:p-8 space-y-4 sm:space-y-6">
            <p
              className="text-base sm:text-lg text-gray-200"
              style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.8)" }}
            >
              This is a placeholder for the Team page. Here you can showcase the
              members of your museum team.
            </p>
            <p
              className="text-sm sm:text-base text-gray-300"
              style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.8)" }}
            >
              Content coming soon...
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
