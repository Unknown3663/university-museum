"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function WorkshopCard({ workshop }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
  };

  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isModalOpen]);

  return (
    <>
      {/* Workshop Card with integrated banner */}
      <div
        onClick={openModal}
        className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-xl overflow-hidden"
      >
        {/* Workshop Banner Image (if exists) */}
        {workshop.image_url && (
          <div className="relative w-full aspect-[3/1]">
            <Image
              src={workshop.image_url}
              alt={`${workshop.title} banner`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>
        )}

        {/* Card Content */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            {/* Order Badge */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <span className="text-2xl sm:text-3xl font-bold text-white">
                  {workshop.order}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                {workshop.title}
              </h3>
              <div className="flex items-center gap-2 mb-3">
                <svg
                  className="w-5 h-5 text-blue-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-blue-200 font-medium">
                  {formatDate(workshop.date)}
                </span>
              </div>
              {workshop.description && (
                <p className="text-gray-200 leading-relaxed line-clamp-3">
                  {workshop.description}
                </p>
              )}
              <div className="mt-4 flex items-center text-blue-300 text-sm font-medium">
                <span>Click to view details</span>
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all hover:scale-110"
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Banner Image */}
            {workshop.image_url && (
              <div className="relative w-full bg-gray-100 flex items-center justify-center">
                <Image
                  src={workshop.image_url}
                  alt={workshop.title}
                  width={1200}
                  height={400}
                  className="w-full h-auto max-h-[50vh] object-contain"
                  priority
                />
              </div>
            )}

            {/* Content */}
            <div className="p-6 sm:p-8">
              {/* Order Badge in Modal */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg flex-shrink-0">
                  <span className="text-2xl font-bold text-white">
                    {workshop.order}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900">
                    {workshop.title}
                  </h2>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center gap-2 mb-6 text-gray-600">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-base sm:text-lg font-medium">
                  {formatDate(workshop.date)}
                </span>
              </div>

              {/* Description */}
              {workshop.description && (
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {workshop.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
