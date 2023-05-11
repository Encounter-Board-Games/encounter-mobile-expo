import 'styled-components';

export interface Theme {
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

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
