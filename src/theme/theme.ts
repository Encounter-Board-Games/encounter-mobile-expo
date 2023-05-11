import { Dimensions, Platform, PixelRatio } from 'react-native';
import { DefaultTheme } from 'styled-components';
import config from '../config';
import 'styled-components';

export interface Theme extends DefaultTheme {
  fontSizes: any;
  colors: {
    primary: string;
    primaryDark: string;
    primaryLight: string;
    secondary: string;
    secondaryDark: string;
    secondaryLight: string;
    complement: string;
    light: string;
    dark: string;
    success: string;
    warning: string;
    danger: string;
  };
  elements: {
    productDetailsImage: number;
  };
  header: {
    height: string;
    largeHeight: string;
    title: string;
    largeTitle: string;
  };
  sizes: {
    icons: number;
    notification: string;
    btnBig: string;
    btn: string;
    btnSmall: string;
    h1: string;
    h2: string;
    h3: string;
    h4: string;
    subtitle1: string;
    subtitle2: string;
    subtitle3: string;
    button1: string;
    button2: string;
    button3: string;
    button4: string;
  };
  spacing: string;
  space: {
    s0: string;
    s1: string;
    s2: string;
    s3: string;
    s4: string;
    s5: string;
  };
  borderRadius: number;
  shadow: {
    color: string;
    offset: {
      width: string;
      height: string;
    };
    opacity: number;
    radius: string;
    elevation: number;
  };
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const scale = SCREEN_WIDTH / 375;

function actuatedNormalize(size: number): string {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) + 'px';
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) + 'px';
  }
}

export const theme: Theme = {
  fontSizes: undefined,
  colors: {
    ...config.theme.colors,
  },
  elements: {
    ...config.theme.elements,
  },
  header: {
    height: actuatedNormalize(50),
    largeHeight: actuatedNormalize(80),
    title: actuatedNormalize(16),
    largeTitle: actuatedNormalize(24),
  },
  sizes: {
    icons: 18,
    notification: actuatedNormalize(32),
    btnBig: actuatedNormalize(48),
    btn: actuatedNormalize(40),
    btnSmall: actuatedNormalize(32),
    h1: actuatedNormalize(24),
    h2: actuatedNormalize(18),
    h3: actuatedNormalize(16),
    h4: actuatedNormalize(16),
    subtitle1: actuatedNormalize(16),
    subtitle2: actuatedNormalize(14),
    subtitle3: actuatedNormalize(12),
    button1: actuatedNormalize(16),
    button2: actuatedNormalize(14),
    button3: actuatedNormalize(12),
    button4: actuatedNormalize(11),
  },
  spacing: actuatedNormalize(2),
  space: {
    s0: actuatedNormalize(4),
    s1: actuatedNormalize(8),
    s2: actuatedNormalize(16),
    s3: actuatedNormalize(24),
    s4: actuatedNormalize(32),
    s5: actuatedNormalize(40),
  },
  borderRadius: 5,
  shadow: {
    color: 'rgb(0, 0, 0)',
    offset: { width: '0', height: '2' },
    opacity: 0.16,
    radius: '3',
    elevation: 2,
  },
};

export default theme;
