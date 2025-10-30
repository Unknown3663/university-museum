import dynamic from "next/dynamic";
import Image from "next/image";
import BackgroundImage from "./components/BackgroundImage";
import Hero from "./components/HeroSection";
import ScrollIndicator from "./components/ScrollIndicator";
import SideLogos from "./components/SideLogos";

// Dynamically import Navbar
const Navbar = dynamic(() => import("./components/Navbar"), {
  loading: () => <div className="h-20 bg-black/20" />,
});

export default function Home() {
  return (
    <main className="relative w-full">
      {/* Fixed Background */}
      <BackgroundImage
        src="/backgrounds/college-background.jpg"
        alt="Tourist Guidance Museum Building"
      />

      {/* Hero Section */}
      <div className="relative min-h-screen w-full overflow-hidden">
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
              About Us
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Info Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 border border-gray-200">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  This platform supports the initiative of the{" "}
                  <strong>Museum Friends team</strong>, Faculty of Tourism and
                  Hotels, Minia University. The launch of the initiative
                  coincides with the inauguration of the{" "}
                  <strong>Grand Egyptian Museum</strong>, which is scheduled to
                  open officially on <strong>November 1st</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This Initiative named{" "}
                  <strong className="text-blue-600">
                    "It's your own: Protect your Identity,"
                  </strong>{" "}
                  to foster the Egyptian Identity and urge the preservation of
                  Heritage.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Additionally, the platform sheds light on the{" "}
                  <strong>educational museum</strong>, which contains many
                  replicas of archaeological artefacts, accompanied by
                  identification labels in Arabic and English, thereby
                  contributing to public heritage awareness.
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
              Our Aims
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          {/* Content Card */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 border border-gray-200">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  One of <strong>Egypt's Vision 2030</strong> goals is{" "}
                  <strong className="text-blue-600">
                    "enriching cultural and sporting life,"
                  </strong>{" "}
                  which includes preserving Egypt's tangible and intangible
                  heritage.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  The faculty's scientific research plan is to encourage
                  researches in technological applications to preserve Egyptian
                  culture. Numerous digital and technological programs have been
                  implemented in museums and archaeological sites, and ancient
                  historical archives have been documented through. In addition
                  to, the daily launch of countless international and local
                  platforms to serve this purpose. So, launching our initiative
                  is necessary to contribute in supporting our heritage and
                  strengthen our identity.
                </p>

                <p className="text-gray-900 font-semibold text-lg mb-4">
                  The main goals of our platform are summarized as follows:
                </p>

                <ol className="space-y-4 text-gray-700 leading-relaxed list-decimal list-inside">
                  <li className="pl-2">
                    Conducting workshops about Heritage awareness and Artificial
                    applications for Heritage preservation.
                  </li>
                  <li className="pl-2">
                    Training the museum team, implementing museum practices and
                    disseminating them at the college level to serve the primary
                    aim of the initiative.
                  </li>
                  <li className="pl-2">
                    Upgrading the educational museum catalog.
                  </li>
                  <li className="pl-2">Updating the museum database.</li>
                  <li className="pl-2">
                    Publishing announcements about Museology and Heritage
                    fields.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
