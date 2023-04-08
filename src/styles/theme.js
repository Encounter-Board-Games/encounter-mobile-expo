/**************
 * Theme for Styled components
 * This can be used in your styled component to access default variables
 * Exemple:
 * background-color: ${props => props.theme.colors.primary}
 *************/

import { Dimensions, Platform, PixelRatio } from 'react-native';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 375;


export default {
  colors: {
    primaryColor:  "#c8e8e0",
    primaryDarkColor: "#0e9577",
    primaryLightColor: "#ebf7f4",

    secondColor: "#BCBEC0",
    secondDarkColor: "#6D6E71",
    secondLightColor: "#E6E7E8",

    complementColor: "#0d3c54",

    lightColor: "#FAFAFA",
    darkColor:  '#414042',

    success: "#6FE382",
    warming: "#fda856",
    danger: "#E35959",
  },
  elements:{
    productDetailsImage: 0.5,
  },
  header: {
    heigth: "50px",
    largeHeigth: "80px",
    title: "16px",
    largeTitle: '24px'
  },
  sizes: {
    icons: '18px',
    notification: '32px',

    btnBig: '48px',
    btn: '40px',
    btnSmall: '32px',

    h1: '24px',
    h2: '18px',
    h3: '16px',
    h4: '16px',

    subtitle1: '16px',
    subtitle2: '14px',
    subtitle3: '12px',

    button1: '16px',
    button2: '14px',
    button3: '12px',
    button4: '11px',
  },
  space: {
    space0: '4px' ,
    space1: '8px' ,
    space2: '16px',
    space3: '24px',
    space4: '32px',
    space5: '40px',
  },
  borderRadius: {
    button:  '8px',
    tag:  '20px',
  },
  shadow: {
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: { width: '0px', height: '5px' },
    shadowOpacity: .16,
    shadowRadius: '3px',
    elevation: 2,
  },
};

