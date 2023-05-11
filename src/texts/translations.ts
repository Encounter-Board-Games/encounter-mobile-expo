export interface TranslationKeys {
  [key: string]: string;
}

export interface TranslationCategories {
  [category: string]: TranslationKeys;
}

export interface Translations {
  [language: string]: TranslationCategories;
}

const translations: Translations = {
  en: {
    discovery: {
      title: 'Discover',
      subtitle: 'Find the best restaurants',
    },
    // ... other categories and translations
  },
  // ... other languages
};

export default translations;
