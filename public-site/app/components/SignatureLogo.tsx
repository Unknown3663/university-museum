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

    const heroSection = document.getElementById("hero-section");

    if (!heroSection) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      {
        threshold: 0.2,
      },
    );

    observer.observe(heroSection);

    return () => observer.disconnect();
  }, [hideOnHeroSection]);

  return (
    <div
      className={`fixed bottom-4 left-2 sm:left-3 md:left-4 z-[60] transition-[opacity,transform] duration-500 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <div className="bg-white/10 backdrop-blur-md rounded-md sm:rounded-lg p-1 sm:p-1.5 md:p-2 border border-white/20 shadow-lg hover:bg-white/20 transition-[background-color,box-shadow]">
        <Image
          src="/logos/fom-signature.jpg"
          alt="Faculty of Tourism Signature Logo"
          width={60}
          height={20}
          quality={85}
          priority={!hideOnHeroSection}
          className="object-contain w-10 h-auto sm:w-12 sm:h-auto md:w-14 md:h-auto lg:w-16 lg:h-auto"
        />
      </div>
    </div>
  );
}
