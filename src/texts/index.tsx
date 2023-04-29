import translations from './translations';
import config from '../../config';

export const translation = (
  textPath: string,
  props?: Record<string, string>
) => {
  const pathSplited = textPath.split('.');

  let element = translations[config.translation];

  for (let i = 0; i < pathSplited.length; i++) {
    const currentPath = pathSplited[i];
    element = element[currentPath];
    if (!element) break;
  }

  // array ["time", "countItems"]

  if (element && !!element.replace) {
    Object.keys(props || {}).forEach((key) => {
      if (props && props[key]) {
        element = element.replace(`{{${key}}}`, props[key]);
      }
    });
  }
  return element;
};