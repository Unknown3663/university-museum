"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";

const SITE_CONFIG = {
  name: "Tourist Guidance Museum",
  description: "Explore history and heritage through time",
  logo: "/logos/tgm-public.png",
};

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/team", label: "Team" },
  { href: "/workshops", label: "Workshops" },
  { href: "/exhibits", label: "Exhibits" },
];

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

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
              className="flex items-center gap-2 sm:gap-3 text-white font-serif text-lg sm:text-xl font-semibold hover:text-gray-200 transition-colors group"
            >
              <Image
                src={SITE_CONFIG.logo}
                alt={`${SITE_CONFIG.name} Logo`}
                width={36}
                height={36}
                className="object-contain transition-transform group-hover:scale-110 sm:w-10 sm:h-10"
              />
              <span className="hidden sm:inline">{SITE_CONFIG.name}</span>
              <span className="sm:hidden text-base">TGM</span>
            </Link>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-6">
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
                className={`text-white hover:text-gray-200 font-medium relative group ${
                  pathname === link.href ? "text-gray-200" : ""
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ${
                    pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button & Search - Visible on mobile/tablet */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile Search Button */}
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

            {/* Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-gray-200 transition-colors p-2 focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Search Bar - Expandable */}
        <SearchBar
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />

        {/* Mobile Menu Dropdown - Like Search Bar */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out md:hidden ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pb-4 pt-2">
            <nav className="flex flex-col space-y-2 px-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 text-center ${
                    pathname === link.href ? "" : ""
                  }`}
                  style={
                    pathname === link.href
                      ? { backgroundColor: "#3b82f6" }
                      : {
                          backgroundColor: "rgba(100, 116, 139, 0.3)",
                          backdropFilter: "blur(8px)",
                        }
                  }
                  onMouseEnter={(e) => {
                    if (pathname !== link.href) {
                      e.currentTarget.style.backgroundColor =
                        "rgba(100, 116, 139, 0.5)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (pathname !== link.href) {
                      e.currentTarget.style.backgroundColor =
                        "rgba(100, 116, 139, 0.3)";
                    }
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </nav>
  );
}
