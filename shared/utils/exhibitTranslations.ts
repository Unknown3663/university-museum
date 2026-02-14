import { Locale } from "../i18n";

/**
 * Structure for exhibit translations
 * Store in the database as JSON in a 'translations' column
 */
export interface ExhibitTranslations {
  en?: {
    title: string;
    description: string;
  };
  "ar-EG"?: {
    title: string;
    description: string;
  };
  de?: {
    title: string;
    description: string;
  };
  es?: {
    title: string;
    description: string;
  };
  it?: {
    title: string;
    description: string;
  };
  fr?: {
    title: string;
    description: string;
  };
}

/**
 * Get exhibit content in the specified language with fallback to English
 */
export function getExhibitTranslation(
  exhibit: {
    title: string;
    description: string;
    translations?: ExhibitTranslations | null;
  },
  locale: Locale,
): { title: string; description: string } {
  // If no translations field, return original (assumed to be English)
  if (!exhibit.translations) {
    return {
      title: exhibit.title,
      description: exhibit.description,
    };
  }

  // Try to get translation for selected language
  const translation = exhibit.translations[locale];
  if (translation) {
    return translation;
  }

  // Fallback to English translation
  const englishTranslation = exhibit.translations.en;
  if (englishTranslation) {
    return englishTranslation;
  }

  // Fallback to original fields
  return {
    title: exhibit.title,
    description: exhibit.description,
  };
}

/**
 * Check if exhibit has translation for a specific language
 */
export function hasExhibitTranslation(
  translations: ExhibitTranslations | null | undefined,
  locale: Locale,
): boolean {
  if (!translations) return false;
  return !!translations[locale];
}

/**
 * Get list of available languages for an exhibit
 */
export function getAvailableExhibitLanguages(
  translations: ExhibitTranslations | null | undefined,
): Locale[] {
  if (!translations) return [];
  return Object.keys(translations).filter(
    (key) => translations[key as Locale],
  ) as Locale[];
}
