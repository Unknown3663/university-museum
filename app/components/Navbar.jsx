"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Team Name */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-white font-serif text-xl font-semibold hover:text-gray-200"
            >
              Museum Team
            </Link>
          </div>

          {/* Right side - Navigation */}
          <div className="flex items-center space-x-6">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-white hover:text-gray-200 transition-colors p-2"
              aria-label="Search"
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
            <Link
              href="/"
              className="text-white hover:text-gray-200 font-medium relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/team"
              className="text-white hover:text-gray-200 font-medium relative group"
            >
              Team
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/categories"
              className="text-white hover:text-gray-200 font-medium relative group"
            >
              Categories
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
        </div>

        {/* Search Bar - Expandable */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isSearchOpen ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pb-4">
            <input
              type="text"
              placeholder="Search the museum..."
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none focus:outline-none focus-visible:outline-none transition-all duration-200"
              autoFocus={isSearchOpen}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
