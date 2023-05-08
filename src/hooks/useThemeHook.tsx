import { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { Theme } from '../theme/theme';

export const useTheme = (): Theme => {
  const theme = useContext(ThemeContext);
  return theme;
};
