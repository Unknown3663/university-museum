"use client";

import { useLanguage } from "../i18n/LanguageContext";
import { Locale, getLocaleDisplayName, getAvailableLocales } from "../i18n";
import { useState, useRef, useEffect } from "react";

interface LanguageSwitcherProps {
  variant?: "light" | "dark";
}

export default function LanguageSwitcher({
  variant = "dark",
}: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const locales = getAvailableLocales();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  const buttonClasses =
    variant === "dark"
      ? "text-white hover:text-gray-200"
      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${buttonClasses} transition-colors p-2 flex items-center gap-2`}
        aria-label="Change language"
        title="Change language"
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
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="hidden sm:inline text-sm font-medium">
          {getLocaleDisplayName(locale)}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => handleLocaleChange(loc)}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors ${
                locale === loc
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700"
              }`}
            >
              {getLocaleDisplayName(loc)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
