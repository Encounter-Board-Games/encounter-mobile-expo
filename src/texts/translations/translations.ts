import translations from './translations';

type Translations = typeof translations;

const t = (key: string): string => {
  const keys = key.split('.');
  let result: Translations | string = translations;

  for (let i = 0; i < keys.length; i++) {
    if (typeof result === 'object' && result[keys[i]] !== undefined) {
      result = result[keys[i]];
    } else {
      return '';
    }
  }

  return result as unknown as string;
};

export default t;
