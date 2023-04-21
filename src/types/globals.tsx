import { UserRememberProducts } from '../store/actions/user/userTypes';

export interface AppState {
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

export interface UserState {
  isLogged: boolean;
  userInfo?: {
    favorites: {
      key: string;
    }[];
    address: any[];
    rememberProductKeys: string[];
  };
  rememberProducts: UserRememberProducts;
  rememberProductKeys: any;
  pendences: any;
}

export interface Update {
  title: string;
  texts: string[];
  btnCancel?: string;
  btnText: string;
  img: string;
  link: string;
}

export interface TextProps {
  text: string;
}
