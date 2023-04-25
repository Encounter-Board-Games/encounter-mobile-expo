import {
  AutoCompleteRegister,
  LoginState,
  UserRememberProducts,
} from './actionUserTypes';

export interface AppState {
  terms: any;
  app: {
    about: {
      phone: string;
    };
  };
  about: {
    phone: string;
  };
  update: {
    show: boolean;
  };
}

export interface RootState {
  app: AppState;
  autoCompleteRegister?: AutoCompleteRegister;
  cart: any;
  email: string;
  isCodeSent: boolean;
  isForgot: boolean;
  isLogged: boolean;
  isLogin: boolean;
  isRegister: boolean;
  loading: boolean;
  login?: LoginState;
  loginPopup?: boolean;
  needCompleteInfos?: boolean;
  notifications?: any[];
  pendences?: any[];
  products: any[];
  rememberProducts: UserRememberProducts;
  rememberProductKeys?: string[];
  user: string;
  userInfo?: {
    favorites: {
      key: string;
    }[];
    address: any[];
    rememberProductKeys: string[];
  };
  users: string;
}

export interface TextProps {
  text: string;
}

export interface Update {
  title: string;
  texts: string[];
  btnCancel?: string;
  btnText: string;
  img: string;
  link: string;
}
