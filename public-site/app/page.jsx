import dynamic from "next/dynamic";
import BackgroundImage from "./components/BackgroundImage";
import Hero from "./components/HeroSection";
import ScrollIndicator from "./components/ScrollIndicator";

// Dynamically import Navbar
const Navbar = dynamic(() => import("./components/Navbar"), {
  loading: () => <div className="h-20 bg-black/20" />,
});

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <BackgroundImage
        src="/museum.webp"
        alt="Tourist Guidance Museum Building"
      />
      <Navbar />
      <Hero />
      <ScrollIndicator />
    </main>
  );
}
