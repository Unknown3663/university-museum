"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function SignatureLogo({ hideOnHeroSection = false }) {
  const [isVisible, setIsVisible] = useState(!hideOnHeroSection);

  useEffect(() => {
    if (!hideOnHeroSection) {
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      // Show the signature logo when user scrolls past the hero section (viewport height)
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;

      setIsVisible(scrollPosition > viewportHeight);
    };

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hideOnHeroSection]);

  return (
    <div
      className={`fixed bottom-4 left-2 sm:left-3 md:left-4 z-[60] transition-all duration-500 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <div className="bg-white/10 backdrop-blur-md rounded-md sm:rounded-lg p-1 sm:p-1.5 md:p-2 border border-white/20 shadow-lg hover:bg-white/20 transition-all">
        <Image
          src="/logos/fom-signature.jpg"
          alt="Faculty of Tourism Signature Logo"
          width={60}
          height={20}
          quality={100}
          priority={!hideOnHeroSection}
          className="object-contain w-10 h-auto sm:w-12 sm:h-auto md:w-14 md:h-auto lg:w-16 lg:h-auto"
        />
      </div>
    </div>
  );
}
