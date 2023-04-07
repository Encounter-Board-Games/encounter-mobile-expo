/**************
 * Theme for Styled components
 * This can be used in your styled component to access default variables
 * Exemple:
 * background-color: ${props => props.theme.colors.primary}
 *************/

import { Dimensions, Platform, PixelRatio } from 'react-native';
import config from '../config';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const scale = SCREEN_WIDTH / 375;

function actuatedNormalize(size) {
  const newSize = size * scale
  if (Platform.OS === 'ios') {
    return ( Math.round(PixelRatio.roundToNearestPixel(newSize))) + 'px'
  } else {
    return (Math.round(PixelRatio.roundToNearestPixel(newSize))) + 'px'
  }
}

export default {
  colors: {
    ...config.theme.colors,
  },
  elements:{
    productDetailsImage: .3,
    ...config.theme.elements
  },
  header: {
    heigth: "50px",
    largeHeigth: "80px",
    title: "16px",
    largeTitle: "24px"
  },
  sizes: {
    icons: (18),
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
    button4: '11px',
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
    button:  actuatedNormalize(8),
    tag:  actuatedNormalize(20),
  },
  shadow: {
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: { width: '0px', height: '2px' },
    shadowOpacity: .16,
    shadowRadius: '3px',
    elevation: 2,
  }, 
};
