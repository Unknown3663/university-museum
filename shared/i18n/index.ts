// Simple i18n for Next.js App Router without middleware or route changes
// Supports en (default), ar-EG (RTL), de, es, it, fr

import en from "../locales/en.json";
import arEG from "../locales/ar-EG.json";
import de from "../locales/de.json";
import es from "../locales/es.json";
import it from "../locales/it.json";
import fr from "../locales/fr.json";

export type Locale = "en" | "ar-EG" | "de" | "es" | "it" | "fr";
export type Dictionary = Record<string, any>;

const dictionaries: Record<Locale, Dictionary> = {
  en: en,
  "ar-EG": arEG,
  de: de,
  es: es,
  it: it,
  fr: fr,
};

// Get nested value from object using dot notation (e.g., "home.hero.title")
function getNestedValue(obj: any, path: string): string | undefined {
  return path.split(".").reduce((current, key) => current?.[key], obj);
}

// Interpolate variables in string (e.g., "Hello {name}" with {name: "John"})
function interpolate(
  template: string,
  vars?: Record<string, string | number>,
): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? ""));
}

/**
 * Get dictionary for a locale (returns English as fallback)
 */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] || dictionaries.en;
}

/**
 * Create translation function for a dictionary
 */
export function createT(dict: Dictionary) {
  return function t(
    key: string,
    vars?: Record<string, string | number>,
  ): string {
    const value = getNestedValue(dict, key);

    if (value === undefined) {
      // Fallback to English
      const fallback = getNestedValue(dictionaries.en, key);
      if (fallback === undefined) {
        console.warn(`Missing translation key: ${key}`);
        return key;
      }
      return interpolate(fallback, vars);
    }

    return interpolate(value, vars);
  };
}

/**
 * Check if locale is RTL
 */
export function isRTL(locale: Locale): boolean {
  return locale === "ar-EG";
}

/**
 * Get locale display name
 */
export function getLocaleDisplayName(locale: Locale): string {
  const names: Record<Locale, string> = {
    en: "English",
    "ar-EG": "العربية",
    de: "Deutsch",
    es: "Español",
    it: "Italiano",
    fr: "Français",
  };
  return names[locale] || locale;
}

/**
 * Get all available locales
 */
export function getAvailableLocales(): Locale[] {
  return ["en", "ar-EG", "de", "es", "it", "fr"];
}

/**
 * Validate locale string
 */
export function isValidLocale(locale: string): locale is Locale {
  return getAvailableLocales().includes(locale as Locale);
}
