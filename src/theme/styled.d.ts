import 'styled-components';

export interface Theme {
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

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
