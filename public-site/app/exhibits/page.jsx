"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import ExhibitCard from "../components/ExhibitCard";

const EXHIBITS_PER_PAGE = 6;

export default function Exhibits() {
  const [exhibits, setExhibits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchExhibits = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/exhibits");
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch exhibits");
      }

      setExhibits(result.exhibits || []);
    } catch (err) {
      console.error("Error fetching exhibits:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExhibits();
  }, []);

  // Extract unique categories from exhibits
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(exhibits.map((exhibit) => exhibit.category).filter(Boolean)),
    ];
    return ["All", ...uniqueCategories];
  }, [exhibits]);

  // Filter, search, and sort exhibits
  const processedExhibits = useMemo(() => {
    let filtered = exhibits;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (exhibit) => exhibit.category === selectedCategory
      );
    }

    // Search by title or description
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (exhibit) =>
          exhibit.title.toLowerCase().includes(query) ||
          exhibit.description.toLowerCase().includes(query)
      );
    }

    // Sort
    const sorted = [...filtered];
    switch (sortBy) {
      case "newest":
        sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case "oldest":
        sorted.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        break;
      case "a-z":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "z-a":
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    return sorted;
  }, [exhibits, selectedCategory, searchQuery, sortBy]);

  // Pagination
  const totalPages = Math.ceil(processedExhibits.length / EXHIBITS_PER_PAGE);
  const paginatedExhibits = useMemo(() => {
    const startIndex = (currentPage - 1) * EXHIBITS_PER_PAGE;
    return processedExhibits.slice(startIndex, startIndex + EXHIBITS_PER_PAGE);
  }, [processedExhibits, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, sortBy]);

  // Skeleton loader component
  const SkeletonCard = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
      <div className="w-full aspect-video bg-gray-300"></div>
      <div className="p-6 space-y-3">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-6 bg-gray-300 rounded w-24 mt-4"></div>
      </div>
    </div>
  );

  return (
    <main
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"
      suppressHydrationWarning
    >
      <Navbar />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Our Exhibits
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our curated collection of exhibits from around the world
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <div className="max-w-2xl mx-auto relative">
              <input
                type="text"
                placeholder="Search exhibits by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3 pl-12 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                aria-label="Search exhibits"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </motion.div>

          {/* Controls: Category Filter + Sort */}
          {!loading && !error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 space-y-4"
            >
              {/* Category Filter */}
              {categories.length > 1 && (
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-gray-700 mr-2">
                    Filter:
                  </span>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedCategory === category
                          ? "bg-blue-600 text-white shadow-md scale-105"
                          : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm hover:shadow-md"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}

              {/* Sort + Results Count */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <label
                    htmlFor="sort"
                    className="text-sm font-medium text-gray-700"
                  >
                    Sort by:
                  </label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm bg-white text-sm"
                  >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="a-z">A–Z</option>
                    <option value="z-a">Z–A</option>
                  </select>
                </div>

                <p className="text-sm text-gray-600">
                  Showing {processedExhibits.length}{" "}
                  {processedExhibits.length === 1 ? "exhibit" : "exhibits"}
                  {selectedCategory !== "All" && (
                    <span className="font-medium"> in {selectedCategory}</span>
                  )}
                  {searchQuery && (
                    <span className="font-medium">
                      {" "}
                      matching "{searchQuery}"
                    </span>
                  )}
                </p>
              </div>
            </motion.div>
          )}

          {/* Loading State - Skeleton */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center bg-red-50 border border-red-200 rounded-lg p-12"
            >
              <svg
                className="mx-auto h-16 w-16 text-red-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p className="text-xl text-red-700 mb-2">
                Failed to load exhibits
              </p>
              <p className="text-sm text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchExhibits}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Retry
              </button>
            </motion.div>
          )}

          {/* Empty State */}
          {!loading && !error && processedExhibits.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center bg-white rounded-lg shadow-lg p-12"
            >
              <svg
                className="mx-auto h-16 w-16 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-xl text-gray-600 mb-2">
                {searchQuery
                  ? `No exhibits found matching "${searchQuery}"`
                  : selectedCategory === "All"
                  ? "No exhibits available at the moment."
                  : `No exhibits found in ${selectedCategory}.`}
              </p>
              {(selectedCategory !== "All" || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear filters
                </button>
              )}
            </motion.div>
          )}

          {/* Exhibits Grid */}
          {!loading && !error && paginatedExhibits.length > 0 && (
            <>
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                <AnimatePresence mode="popLayout">
                  {paginatedExhibits.map((exhibit, index) => {
                    const globalIndex =
                      (currentPage - 1) * EXHIBITS_PER_PAGE + index;
                    const isPriority = globalIndex < 3; // First 3 images get priority

                    return (
                      <motion.div
                        key={exhibit.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.1,
                        }}
                      >
                        <ExhibitCard
                          exhibit={exhibit}
                          index={index}
                          priority={isPriority}
                        />
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-12 flex justify-center items-center gap-4"
                >
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                    className="px-6 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
                  >
                    Previous
                  </button>

                  <div className="flex items-center gap-2">
                    {[...Array(totalPages)].map((_, i) => {
                      const pageNum = i + 1;
                      // Show first, last, current, and adjacent pages
                      if (
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        Math.abs(pageNum - currentPage) <= 1
                      ) {
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-10 h-10 rounded-lg font-medium transition-all ${
                              currentPage === pageNum
                                ? "bg-blue-600 text-white shadow-md"
                                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      } else if (
                        pageNum === currentPage - 2 ||
                        pageNum === currentPage + 2
                      ) {
                        return (
                          <span key={pageNum} className="text-gray-400">
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-6 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
                  >
                    Next
                  </button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
