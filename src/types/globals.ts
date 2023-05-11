import { ReactNode } from 'react';
import { InfoState } from '../screens/info/components/TextModalTypes';
import { ProductState } from '../store/reducers/productReducer';
import { ShelvesState } from '../store/reducers/shelvesReducer';
import { LoginState, UserRememberProducts } from './userTypes';

export interface AutoCompleteRegister {
  name?: string;
  lastname?: string;
}

export interface AboutState {
  app: AppState;
  nameAbout: string;
  aboutText: ReactNode;
  name: string;
  phone: string;
  terms: AppTerms;
  description: string;
  location: string;
  website: string;
  instagram: string;
}

export interface AppState {
  shelves: any;
  terms: any;
  about: AboutState;
  update: {
    show: boolean;
  };
}

export interface AppTerms {
  terms: string;
  policy: string;
}

export interface Banner {
  action: string;
  url: string | undefined;
  width?: string;
  height?: string;
  maxHeight?: string;
}

export type CombinedStateType = {
  app: AppState;
  products: ProductState;
  shelves: ShelvesState;
  filters: RootState;
  userReducer: RootState;
  info: InfoState;
  user: User;
};

export interface RadioButtonItem {
  key: string;
  isLast: boolean;
  isSelected: boolean;
  onPress: () => void;
  children: any;
}

export interface RootState {
  [x: string]: any;
  address: any;
  about: AboutState;
  app: AppState;
  autoCompleteRegister?: AutoCompleteRegister;
  cart: any;
  email: string;
  filters: any;
  hasTerms: boolean;
  info: string;
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
  payments: any;
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

export interface User {
  userInfo?: {
    name?: string;
    lastname?: string;
    preferenceName?: string;
    cellphone?: string;
    birthdayFormatted?: string;
    gender?: string;
    document?: string;
  };
  pendences?: any[];
  hasTerms?: boolean;
  email?: string;
  autoCompleteRegister?: AutoCompleteRegister;
}

export interface UserInfo {
  name: string;
  lastname: string;
  preferenceName: string;
  cellphone: string;
  birthdayFormatted: string | null;
  gender: string;
  document: string;
}
