"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import SearchBar from "./SearchBar";

const SITE_CONFIG = {
  name: "Tourist Guidance Museum",
  description: "Explore history and heritage through time",
  logo: "/tgm-public.png",
};

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/team", label: "Team" },
  { href: "/categories", label: "Categories" },
  { href: "/exhibits", label: "Exhibits" },
];

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        suppressHydrationWarning
      >
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center gap-3 text-white font-serif text-xl font-semibold hover:text-gray-200 transition-colors group"
            >
              <Image
                src={SITE_CONFIG.logo}
                alt={`${SITE_CONFIG.name} Logo`}
                width={40}
                height={40}
                className="object-contain transition-transform group-hover:scale-110"
              />
              <span>{SITE_CONFIG.name}</span>
            </Link>
          </div>

          {/* Right side - Navigation */}
          <div className="flex items-center space-x-6">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-white hover:text-gray-200 transition-colors p-2"
              aria-label="Toggle search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Navigation Links */}
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:text-gray-200 font-medium relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>
        </div>

        {/* Search Bar - Expandable */}
        <SearchBar isOpen={isSearchOpen} />
      </div>
    </nav>
  );
}
