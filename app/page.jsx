import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamically import Navbar if it's heavy
const Navbar = dynamic(() => import("./components/Navbar"), {
  loading: () => <div className="h-20 bg-black/20" />,
});

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <Image
          src="/museum.webp"
          alt="University Museum Building"
          fill
          priority
          quality={80}
          sizes="100vw"
          className="object-cover"
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex items-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl animate-fade-in">
          <div className="space-y-6 pl-4 sm:pl-8 lg:pl-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white text-shadow leading-tight">
              Welcome to Our Museum
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-100 text-shadow font-light">
              Explore history and heritage through time
            </p>
            <div className="pt-4">
              <a
                href="#explore"
                className="inline-block px-8 py-3 bg-white/20 backdrop-blur-md text-white font-medium rounded-lg border border-white/30 hover:bg-white/30 hover:scale-105 transition-all duration-300"
              >
                Start Exploring
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-white/70"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </main>
  );
}
