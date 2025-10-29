import dynamic from "next/dynamic";
import BackgroundImage from "./components/ui/BackgroundImage";
import Hero from "./components/home/Hero";
import ScrollIndicator from "./components/home/ScrollIndicator";

// Dynamically import Navbar
const Navbar = dynamic(() => import("./components/layout/Navbar"), {
  loading: () => <div className="h-20 bg-black/20" />,
});

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <BackgroundImage src="/museum.webp" alt="University Museum Building" />
      <Navbar />
      <Hero />
      <ScrollIndicator />
    </main>
  );
}
