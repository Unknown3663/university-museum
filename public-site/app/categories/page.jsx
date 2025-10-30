import Image from "next/image";
import Navbar from "../components/Navbar";

const CATEGORIES = [
  {
    id: 1,
    title: "Art & Paintings",
    description: "Explore classical and modern art pieces",
  },
  {
    id: 2,
    title: "Archaeology",
    description: "Discover ancient artifacts and civilizations",
  },
  {
    id: 3,
    title: "Historical Artifacts",
    description: "Learn about historical objects and their stories",
  },
  {
    id: 4,
    title: "Natural History",
    description: "Experience the wonders of natural world",
  },
];

export const metadata = {
  title: "Categories - Tourist Guidance Museum",
  description: "Explore our museum categories and collections",
};

export default function Categories() {
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
              Museum Categories
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto px-4">
              Explore our diverse collections spanning different eras and
              cultures
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {CATEGORIES.map((category) => (
              <div
                key={category.id}
                className="bg-white/10 backdrop-blur-md rounded-lg sm:rounded-xl p-5 sm:p-6 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <h2 className="text-xl sm:text-2xl font-serif font-semibold text-white mb-2 sm:mb-3">
                  {category.title}
                </h2>
                <p className="text-sm sm:text-base text-gray-200">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
