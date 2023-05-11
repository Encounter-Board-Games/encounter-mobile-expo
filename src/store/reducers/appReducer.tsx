/* eslint-disable indent */
import { ReactNode } from 'react';
import { AppState, AppTerms, RootState } from '../../types/globals';

export enum ActionTypes {
  APP_SET_TERMS = 'APP_SET_TERMS',
  APP_SET_CONFIGURATION = 'APP_SET_CONFIGURATION',
  APP_SET_NEED_UPDATE_VERSION = 'APP_SET_NEED_UPDATE_VERSION',
}

interface TermsState {
  [key: string]: any;
}

interface AboutState {
  [key: string]: any;
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

interface UpdateState {
  [key: string]: any;
}

interface UserRememberProducts {
  [key: string]: any;
}

export interface Action {
  type: ActionTypes;
  terms?: TermsState;
  about?: AboutState;
  update?: UpdateState;
}

export const initialState: RootState = {
  address: undefined,
  about: {} as AboutState,
  app: {} as AppState,
  cart: undefined,
  email: '',
  filters: undefined,
  hasTerms: false,
  info: '',
  isCodeSent: false,
  isForgot: false,
  isLogged: false,
  isLogin: false,
  isRegister: false,
  loading: false,
  payments: undefined,
  products: [],
  rememberProducts: {} as UserRememberProducts, // Added missing property
  user: '',
  users: '',
};

export default function app(
  state: RootState = initialState,
  action: Action
): RootState {
  switch (action.type) {
    case ActionTypes.APP_SET_TERMS:
      return { ...state, terms: { ...state.terms, ...action.terms } };

    case ActionTypes.APP_SET_CONFIGURATION:
      return { ...state, about: { ...state.about, ...action.about } };

    case ActionTypes.APP_SET_NEED_UPDATE_VERSION:
      return { ...state, update: { ...state.update, ...action.update } };

    default:
      return state;
  }
}
