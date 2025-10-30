"use client";

import Image from "next/image";
import { useState } from "react";

export default function ExhibitCard({ exhibit, index = 0, priority = false }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
  };

  return (
    <>
      <div
        className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group h-full flex flex-col cursor-pointer"
        onClick={openModal}
      >
        {exhibit.image_url && (
          <div className="relative w-full aspect-video overflow-hidden bg-gray-100">
            <Image
              src={exhibit.image_url}
              alt={exhibit.title}
              fill
              loading={priority ? "eager" : "lazy"}
              priority={priority}
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
          <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-gray-900 mb-2 line-clamp-2">
            {exhibit.title}
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-3 flex-1">
            {exhibit.description}
          </p>
          {exhibit.category && (
            <span className="inline-block bg-blue-100 text-blue-800 text-xs sm:text-sm px-2.5 sm:px-3 py-1 rounded-full self-start">
              {exhibit.category}
            </span>
          )}
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

            {/* Image */}
            {exhibit.image_url && (
              <div className="relative w-full bg-gray-100 flex items-center justify-center">
                <Image
                  src={exhibit.image_url}
                  alt={exhibit.title}
                  width={1200}
                  height={800}
                  className="w-full h-auto max-h-[60vh] object-contain"
                  priority
                />
              </div>
            )}

            {/* Content */}
            <div className="p-6 sm:p-8">
              <div className="mb-4">
                {exhibit.category && (
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mb-4">
                    {exhibit.category}
                  </span>
                )}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900">
                  {exhibit.title}
                </h2>
              </div>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                {exhibit.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
