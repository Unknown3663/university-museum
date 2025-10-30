import Button from "./Button";

export default function HeroSection() {
  return (
    <div className="flex items-center min-h-screen px-4 sm:px-6 lg:px-8 pt-16 sm:pt-0">
      <div className="max-w-4xl w-full animate-fade-in">
        <div className="space-y-4 sm:space-y-6 text-left pl-4 sm:pl-8 lg:pl-16">
          {/* Main Heading - Responsive sizing */}
          <h1
            className="text-4xl xs:text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold text-white leading-tight"
            style={{
              textShadow:
                "2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.6)",
            }}
          >
            Welcome to Our Museum
          </h1>

          {/* Subtitle - Responsive sizing */}
          <p
            className="text-xl xs:text-2xl sm:text-2xl md:text-3xl text-gray-100 font-light"
            style={{
              textShadow:
                "2px 2px 6px rgba(0,0,0,0.8), 0 0 15px rgba(0,0,0,0.5)",
            }}
          >
            Explore history and heritage through time
          </p>

          {/* CTA Button */}
          <div className="pt-2 sm:pt-4">
            <Button href="#about">About Us</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
