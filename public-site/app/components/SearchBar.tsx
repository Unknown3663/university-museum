"use client";

import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { Exhibit } from "../../../shared/types";

interface SearchBarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export default function SearchBar({ isOpen, onClose }: SearchBarProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Exhibit[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // ESC key handler to close search bar
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && onClose) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  // Search exhibits with debounce
  useEffect(() => {
    const searchExhibits = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([]);
        setShowResults(false);
        return;
      }

      setIsSearching(true);
      setShowResults(true);

      try {
        const response = await fetch(`/api/exhibits?limit=100`);
        const data = await response.json();

        if (data.exhibits) {
          const filtered = data.exhibits.filter(
            (exhibit: Exhibit) =>
              exhibit.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              exhibit.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
          );
          setSearchResults(filtered.slice(0, 5)); // Show max 5 results
        }
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(searchExhibits, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowResults(false);
    };

    if (showResults) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showResults]);

  const handleResultClick = (exhibitId: number): void => {
    const query = searchQuery;
    setSearchQuery("");
    setShowResults(false);
    // Navigate to exhibits page with search query
    router.push(`/exhibits?search=${encodeURIComponent(query)}`);
  };

  const handleViewAll = () => {
    const query = searchQuery;
    setSearchQuery("");
    setShowResults(false);
    router.push(`/exhibits?search=${encodeURIComponent(query)}`);
  };

  return (
    <div
      className={`overflow-visible transition-all duration-500 ease-in-out ${
        isOpen ? "max-h-20 sm:max-h-24 opacity-100" : "max-h-0 opacity-0"
      }`}
      onClick={(e) => e.stopPropagation()}
      aria-hidden={!isOpen}
      {...(!isOpen && { inert: true })}
    >
      <div className="pb-3 sm:pb-4 relative">
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search exhibits by name or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none focus:outline-none focus-visible:outline-none focus:border-white/40 transition-all duration-200"
          suppressHydrationWarning
          tabIndex={isOpen ? 0 : -1}
        />

        {/* Search Results Dropdown */}
        {showResults && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-2xl border border-gray-200 max-h-96 overflow-y-auto z-50">
            {isSearching ? (
              <div className="p-4 text-center text-gray-500">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <p className="mt-2">Searching...</p>
              </div>
            ) : searchQuery.trim().length < 2 ? (
              <div className="p-4 text-center text-gray-500">
                Type at least 2 characters to search
              </div>
            ) : searchResults.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No exhibits found for "{searchQuery}"
              </div>
            ) : (
              <>
                <div className="divide-y divide-gray-100">
                  {searchResults.map((exhibit) => (
                    <button
                      key={exhibit.id}
                      onClick={() => handleResultClick(Number(exhibit.id))}
                      className="w-full p-3 hover:bg-gray-50 transition-colors text-left flex items-start gap-3"
                    >
                      <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        {exhibit.image_url ? (
                          <Image
                            src={exhibit.image_url}
                            alt={exhibit.title}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                            <svg
                              className="w-8 h-8"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1 truncate">
                          {exhibit.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {exhibit.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
                {searchResults.length > 0 && (
                  <div className="border-t border-gray-200 p-3 text-center">
                    <button
                      onClick={handleViewAll}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      View all results →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
