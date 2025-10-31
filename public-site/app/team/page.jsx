import Image from "next/image";
import Navbar from "../components/Navbar";
import SignatureLogo from "../components/SignatureLogo";
import Footer from "../components/Footer";

export const metadata = {
  title: "Our Team - Tourist Guidance Museum",
  description: "Meet the dedicated team behind the Tourist Guidance Museum.",
};

const FACULTY = [
  { name: "Prof. Samar Mustafa", role: "College Dean" },
  { name: "Prof. Engy Elkilany", role: "College Vice Dean" },
  { name: "Dr. Gehad Mohamed", role: "Initiative coordinator" },
];

const TEAM_MEMBERS = [
  { name: "Ezzat Maged", role: "Web Developer" },
  { name: "Mohand Hesham", role: "Team Leader" },
  { name: "Ziad Khalaf", role: "Curator" },
  { name: "Mahmoud Farghly", role: "Curator" },
  { name: "Mala Amr", role: "Curator" },
  { name: "Romaysaa Mohamed", role: "Curator" },
  { name: "Rogena Hany", role: "Curator" },
  { name: "Shahd Esaam", role: "Curator" },
  { name: "Shahd Ahmad", role: "Curator" },
  { name: "Hanin Ahmed", role: "Curator" },
  { name: "Login Ahmed", role: "Curator" },
  { name: "Samuil Hany", role: "Curator" },
];

export default function Team() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Signature Logo - Always visible */}
      <SignatureLogo />

      {/* Background Image */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <Image
          src="/backgrounds/team-background.jpg"
          alt="Museum Team Background"
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
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4"
              style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.8)" }}
            >
              Our Team
            </h1>
            <p
              className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto"
              style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.8)" }}
            >
              Meet the dedicated individuals behind the Tourist Guidance Museum
              initiative
            </p>
          </div>

          {/* Faculty Section */}
          <section className="mb-12 sm:mb-16">
            <h2
              className="text-2xl sm:text-3xl font-serif font-bold text-white mb-6 sm:mb-8 text-center"
              style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.8)" }}
            >
              Faculty & Leadership
            </h2>
            <div className="space-y-4">
              {FACULTY.map((member, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 shadow-lg p-6 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    {/* Placeholder for future profile picture */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-8 h-8 sm:w-10 sm:h-10 text-white/60"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3
                        className="text-xl sm:text-2xl font-bold text-white mb-1"
                        style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.8)" }}
                      >
                        {member.name}
                      </h3>
                      <p
                        className="text-sm sm:text-base text-gray-300"
                        style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.8)" }}
                      >
                        {member.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Team Members Section */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-serif font-bold text-white mb-6 sm:mb-8 text-center"
              style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.8)" }}
            >
              Initiative Team
            </h2>
            <div className="space-y-4">
              {TEAM_MEMBERS.map((member, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 shadow-lg p-6 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    {/* Placeholder for future profile picture */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-8 h-8 sm:w-10 sm:h-10 text-white/60"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3
                        className="text-lg sm:text-xl font-bold text-white mb-1"
                        style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.8)" }}
                      >
                        {member.name}
                      </h3>
                      <p
                        className="text-sm sm:text-base text-gray-300"
                        style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.8)" }}
                      >
                        {member.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
