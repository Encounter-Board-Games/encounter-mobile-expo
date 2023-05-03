import translations from './translations';

const t = (key) => {
  const keys = key.split('.');
  let result = translations;

  for (let i = 0; i < keys.length; i++) {
    if (result[keys[i]] !== undefined) {
      result = result[keys[i]];
    } else {
      return '';
    }
  }

  return result;
};

export default t;
