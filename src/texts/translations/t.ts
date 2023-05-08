import translations from './translations';

export interface Translations {
  [key: string]: string | Translations;
}

export type TranslationKeys = keyof Translations;

export enum TranslationCategories {
  GREETINGS = 'greetings',
  FAREWELLS = 'farewells',
  GENERAL = 'general',
}

export function translate(keys: TranslationKeys[]): string {
  let result: string | Translations = translations;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      return '';
    }
  }
  return result as string;
}
