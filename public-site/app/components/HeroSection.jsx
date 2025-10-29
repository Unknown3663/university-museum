import Button from "./Button";

export default function HeroSection() {
  return (
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
            <Button href="#explore">About Us</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
