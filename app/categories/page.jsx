import Image from "next/image";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Categories - University Museum",
  description: "Browse our museum collections by category.",
};

export default function Categories() {
  return (
    <main className="relative min-h-screen overflow-hidden">
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
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <Navbar />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-6 text-shadow">
            Categories
          </h1>
          <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-8 space-y-6 border border-white/20">
            <p className="text-lg text-gray-100">
              This is a placeholder for the Categories page. Here you can
              display different collection categories.
            </p>
            <p className="text-gray-200">Content coming soon...</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 hover:shadow-xl transition-all duration-300">
                <h3 className="font-serif text-xl font-semibold mb-2 text-white">
                  Art & Paintings
                </h3>
                <p className="text-gray-200">Coming soon</p>
              </div>
              <div className="p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 hover:shadow-xl transition-all duration-300">
                <h3 className="font-serif text-xl font-semibold mb-2 text-white">
                  Archaeology
                </h3>
                <p className="text-gray-200">Coming soon</p>
              </div>
              <div className="p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 hover:shadow-xl transition-all duration-300">
                <h3 className="font-serif text-xl font-semibold mb-2 text-white">
                  Historical Artifacts
                </h3>
                <p className="text-gray-200">Coming soon</p>
              </div>
              <div className="p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 hover:shadow-xl transition-all duration-300">
                <h3 className="font-serif text-xl font-semibold mb-2 text-white">
                  Natural History
                </h3>
                <p className="text-gray-200">Coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
