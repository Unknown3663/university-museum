"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Locale, getDictionary, createT, isRTL, isValidLocale } from "../i18n";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const STORAGE_KEY = "museum-locale";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedLocale = localStorage.getItem(STORAGE_KEY);
    if (savedLocale && isValidLocale(savedLocale)) {
      setLocaleState(savedLocale);
    }
  }, []);

  // Update localStorage and document direction when locale changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, locale);
      document.documentElement.lang = locale;
      document.documentElement.dir = isRTL(locale) ? "rtl" : "ltr";
    }
  }, [locale, mounted]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
  };

  const dict = getDictionary(locale);
  const t = createT(dict);

  const value: LanguageContextType = {
    locale,
    setLocale,
    t,
    isRTL: isRTL(locale),
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
