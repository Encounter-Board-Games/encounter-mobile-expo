import { Dimensions, Platform, PixelRatio } from 'react-native';
import { DefaultTheme } from 'styled-components';
import config from '../config';
import 'styled-components';

export interface Theme extends DefaultTheme {
  fontSizes: any;
  colors: {
    primaryColor: string;
    primaryDarkColor: string;
    primaryLightColor: string;
    secondaryColor: string;
    secondaryDarkColor: string;
    secondaryLightColor: string;
    complementColor: string;
    lightColor: string;
    darkColor: string;
    success: string;
    warming: string;
    danger: string;
  };
  elements: {
    productDetailsImage: number;
  };
  header: {
    heigth: string;
    largeHeigth: string;
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
  space: {
    space0: string;
    space1: string;
    space2: string;
    space3: string;
    space4: string;
    space5: string;
  };
  borderRadius: {
    button: string;
    tag: string;
  };
  shadow: {
    shadowColor: string;
    shadowOffset: {
      width: string;
      height: string;
    };
    shadowOpacity: number;
    shadowRadius: string;
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
    heigth: actuatedNormalize(50),
    largeHeigth: actuatedNormalize(80),
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
  space: {
    space0: actuatedNormalize(4),
    space1: actuatedNormalize(8),
    space2: actuatedNormalize(16),
    space3: actuatedNormalize(24),
    space4: actuatedNormalize(32),
    space5: actuatedNormalize(40),
  },
  borderRadius: {
    button: actuatedNormalize(8),
    tag: actuatedNormalize(20),
  },
  shadow: {
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: { width: '0', height: '2' },
    shadowOpacity: 0.16,
    shadowRadius: '3',
    elevation: 2,
  },
};

export default theme;
