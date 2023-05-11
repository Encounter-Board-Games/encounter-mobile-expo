import translations from './translations';
import config from './config';

interface TranslationProps {
  [key: string]: any;
  time?: any;
  countItems?: string;
  key?: string;
  name?: any;
}

export const translation = (
  textPath: string,
  props?: TranslationProps
): string => {
  const pathSplited = textPath.split('.');

  let element: any = translations[config.translation];

  for (let i = 0; i < pathSplited.length; i++) {
    const currentPath = pathSplited[i];
    element = element[currentPath];
    if (!element) break;
  }

  if (typeof element === 'string' && props) {
    Object.keys(props).forEach(
      (key) => (element = element.replace(`{{${key}}}`, props[key]))
    );
  }

  return (element as string) || '';
};
