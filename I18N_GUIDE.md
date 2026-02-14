# i18n Implementation Guide

## Overview

This museum platform now supports internationalization (i18n) for 6 languages:

- **en** - English (default & fallback)
- **ar-EG** - Arabic (Egypt) with RTL support
- **de** - German (Deutsch)
- **es** - Spanish (Español)
- **it** - Italian (Italiano)
- **fr** - French (Français)

## Architecture

### Shared i18n Infrastructure

Located in `shared/` folder to be used by both apps:

```
shared/
├── i18n/
│   ├── index.ts              # Core i18n functions (getDictionary, createT, etc.)
│   └── LanguageContext.tsx   # React context for language state
├── locales/
│   ├── en.json               # English (source of truth)
│   ├── ar-EG.json            # Arabic translations
│   ├── de.json               # German translations
│   ├── es.json               # Spanish translations
│   ├── it.json               # Italian translations
│   └── fr.json               # French translations
├── components/
│   └── LanguageSwitcher.tsx  # Globe button language selector
└── utils/
    └── exhibitTranslations.ts # Exhibit translation utilities
```

### Key Features

1. **No route changes** - Language switching happens client-side without changing URLs
2. **localStorage persistence** - Selected language is saved and restored on reload
3. **Automatic RTL** - Arabic automatically applies `dir="rtl"` to `<html>` element
4. **Fallback system** - Missing translations automatically fall back to English
5. **Type-safe** - Full TypeScript support with Locale type

## How to Use

### In Components

```tsx
"use client";

import { useLanguage } from "../../../shared/i18n/LanguageContext";

export default function MyComponent() {
  const { t, locale, setLocale, isRTL } = useLanguage();

  return (
    <div>
      <h1>{t("home.hero.title")}</h1>
      <p>{t("home.hero.subtitle")}</p>

      {/* With interpolation */}
      <p>{t("footer.copyright", { year: "2024" })}</p>
    </div>
  );
}
```

### Translation Keys

Keys use dot notation for organization:

```json
{
  "common": {
    "search": "Search",
    "close": "Close"
  },
  "home": {
    "hero": {
      "title": "Welcome to Our Museum",
      "subtitle": "Explore history through time"
    }
  }
}
```

Access with: `t('home.hero.title')`

### Interpolation

Use `{variable}` syntax in translations:

```json
{
  "greeting": "Hello, {name}!"
}
```

```tsx
t("greeting", { name: "Ahmed" }); // "Hello, Ahmed!"
```

## RTL Support

RTL is automatically handled for Arabic (`ar-EG`):

1. `document.documentElement.dir` is set to `"rtl"` or `"ltr"`
2. `document.documentElement.lang` is set to the locale code
3. Tailwind's RTL classes work automatically
4. Text alignment and spacing adjust automatically

No additional code needed in components!

## Adding a New Language

1. **Create locale file**: `shared/locales/xx.json`

   ```json
   {
     "common": { ... },
     "nav": { ... },
     "home": { ... }
   }
   ```

2. **Update i18n/index.ts**:

   ```ts
   import xx from "../locales/xx.json";

   export type Locale = "en" | "ar-EG" | "de" | "es" | "it" | "fr" | "xx";

   const dictionaries: Record<Locale, Dictionary> = {
     // ...
     xx: xx,
   };

   export function getLocaleDisplayName(locale: Locale): string {
     const names: Record<Locale, string> = {
       // ...
       xx: "Language Name",
     };
     return names[locale] || locale;
   }

   export function getAvailableLocales(): Locale[] {
     return ["en", "ar-EG", "de", "es", "it", "fr", "xx"];
   }

   export function isRTL(locale: Locale): boolean {
     return locale === "ar-EG" || locale === "xx"; // if RTL
   }
   ```

3. **Test**: Language will appear in the globe dropdown automatically

## Exhibit Translations

Exhibits can have manual translations stored in the database.

### Database Schema

Add a `translations` JSONB column to `exhibits` table:

```sql
ALTER TABLE exhibits
ADD COLUMN translations JSONB;
```

### Translation Structure

```json
{
  "en": {
    "title": "Ancient Pottery",
    "description": "A beautiful ceramic vessel..."
  },
  "ar-EG": {
    "title": "الفخار القديم",
    "description": "وعاء خزفي جميل..."
  },
  "de": {
    "title": "Antike Töpferwaren",
    "description": "Ein schönes Keramikgefäß..."
  }
}
```

### Using Exhibit Translations

```tsx
import { getExhibitTranslation } from "../../../shared/utils/exhibitTranslations";
import { useLanguage } from "../../../shared/i18n/LanguageContext";

export default function ExhibitCard({ exhibit }) {
  const { locale } = useLanguage();
  const translated = getExhibitTranslation(exhibit, locale);

  return (
    <div>
      <h3>{translated.title}</h3>
      <p>{translated.description}</p>
    </div>
  );
}
```

The utility automatically:

- Uses translation for selected language if available
- Falls back to English translation if not
- Falls back to original fields as last resort

### Dashboard: Adding Translations

In the dashboard upload/edit form, you can add inputs for each language:

```tsx
const [translations, setTranslations] = useState({
  en: { title: "", description: "" },
  "ar-EG": { title: "", description: "" },
  // ...
});

// Save to database
await supabase.from("exhibits").update({ translations }).eq("id", exhibitId);
```

## Translation Coverage

### ✅ Fully Translated

- **Public Site**:
  - Navigation menu
  - Hero section
  - About Us section
  - Our Aims section
  - Footer
  - Search bar
  - Exhibits page (headers, filters, empty states)
  - Workshops page (headers, empty states)
  - All buttons and CTAs

- **Dashboard**:
  - Navigation menu
  - Sidebar menu
  - Dashboard overview cards
  - All page titles and subtitles

### ⚠️ Content from Database

These are NOT hardcoded, so they're not in translation files:

- Exhibit titles and descriptions (use exhibit translations)
- Workshop titles and descriptions
- Category names (if added dynamically)

### 🔧 Technical Strings (Not Translated)

- API endpoint URLs
- Database field names
- Error codes
- Internal IDs

## Running Locally

No changes to run commands:

```bash
# Public site
cd public-site
npm run dev

# Dashboard
cd museum-dashboard
npm run dev
```

Language selection persists in browser localStorage.

## Testing

1. **Language Switching**: Click globe icon in navbar
2. **RTL**: Switch to Arabic - layout should flip
3. **Persistence**: Refresh page - language should persist
4. **Fallback**: If translation missing, English text appears
5. **No 404s**: All existing routes still work (URLs don't change)

## Troubleshooting

### Language doesn't persist

- Check browser localStorage for `museum-locale` key
- Ensure LanguageProvider wraps entire app

### Text not translating

- Check translation key exists in en.json
- Verify component uses `useLanguage()` hook
- Check for typos in key name

### RTL not working

- Ensure locale is exactly `ar-EG` (case-sensitive)
- Check `document.documentElement.dir` in browser console
- Verify Tailwind is processing RTL classes

### TypeScript errors in shared/

- Expected - shared folder doesn't have node_modules
- Apps (public-site, museum-dashboard) provide React at runtime
- No runtime impact

## Best Practices

1. **Semantic keys**: Use `home.hero.title` not `text1`
2. **Consistent structure**: Match key structure across all locales
3. **Complete translations**: Finish English first, then translate
4. **Test RTL**: Always check Arabic to ensure layout works
5. **Context in keys**: `button.submit` better than `submit` alone

## Migration Notes

- ✅ No breaking changes to URLs or routes
- ✅ All existing functionality preserved
- ✅ Language selection is additive feature
- ✅ Default language is English (existing behavior)
- ⚠️ If you have hardcoded strings, add them to locale files
- ⚠️ For exhibit translations, add database column and update forms

## Future Enhancements

Possible additions:

- Server-side translation for metadata/SEO
- Admin UI for managing translations
- Auto-translation API integration (optional)
- Language-specific date/number formatting
- Pluralization rules per language
