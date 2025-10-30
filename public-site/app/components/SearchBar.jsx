"use client";

import { useRef, useEffect } from "react";

export default function SearchBar({ isOpen }) {
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div
      className={`overflow-hidden transition-all duration-500 ease-in-out ${
        isOpen ? "max-h-20 sm:max-h-24 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="pb-3 sm:pb-4">
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search the museum..."
          className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none focus:outline-none focus-visible:outline-none transition-all duration-200"
          suppressHydrationWarning
        />
      </div>
    </div>
  );
}
