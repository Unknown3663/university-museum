"use client";

import Image from "next/image";

export default function SideLogos() {
  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <>
      {/* Left Side Logo - College */}
      <div
        className="absolute left-2 sm:left-3 md:left-4 top-20 sm:top-20 md:top-20 z-40 pointer-events-auto"
        onClick={handleClick}
        onTouchStart={handleClick}
      >
        <div className="bg-white/10 backdrop-blur-md rounded-md sm:rounded-lg p-1.5 sm:p-2 md:p-3 border border-white/20 shadow-lg select-none touch-none">
          <Image
            src="/logos/college-logo.jpg"
            alt="College Logo"
            width={80}
            height={80}
            quality={100}
            priority
            className="object-contain w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
            draggable={false}
          />
        </div>
      </div>

      {/* Right Side Logo - University */}
      <div
        className="absolute right-2 sm:right-3 md:right-4 top-20 sm:top-20 md:top-20 z-40 pointer-events-auto"
        onClick={handleClick}
        onTouchStart={handleClick}
      >
        <div className="bg-white/10 backdrop-blur-md rounded-md sm:rounded-lg p-1.5 sm:p-2 md:p-3 border border-white/20 shadow-lg select-none touch-none">
          <Image
            src="/logos/uni-logo.jpg"
            alt="University Logo"
            width={80}
            height={80}
            quality={100}
            priority
            className="object-contain w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
            draggable={false}
          />
        </div>
      </div>
    </>
  );
}
