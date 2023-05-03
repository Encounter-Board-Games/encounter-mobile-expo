import { OPEN_POPUP_MODAL } from '../store/actions/info';
import { SetUserNotificationAction } from './actionLoginTypes';

export const SHOW_LOGIN_POPUP = 'SHOW_LOGIN_POPUP';
export const SET_LOGOUT_USER = 'SET_LOGOUT_USER';
export const SET_NEED_COMPLETE_INFOS = 'SET_NEED_COMPLETE_INFOS';
export const SET_LOGIN_USER = 'SET_LOGIN_USER';
export const SET_IS_CODE_SENT = 'SET_IS_CODE_SENT';
export const SET_IS_CHANGE_PASSWORD = 'SET_IS_CHANGE_PASSWORD';
export const SET_EMAIL_LOGIN_PROCESS = 'SET_EMAIL_LOGIN_PROCESS';
export const SET_LOGIN_LOADING = 'SET_LOGIN_LOADING';
export const SET_ERROR_LOGIN_PROCESS_MESSAGE =
  'SET_ERROR_LOGIN_PROCESS_MESSAGE';
export const SET_BACK_LOGIN_SCREEN_LOGIN_PROCESS =
  'SET_BACK_LOGIN_SCREEN_LOGIN_PROCESS';

export const SET_AUTO_COMPLETE_REGISTER = 'SET_AUTO_COMPLETE_REGISTER';
//FAVORITES
export const SET_USER_INFO = 'SET_USER_INFO';
export const SET_USER_FAVORITES = 'SET_USER_FAVORITES';
export const ADD_USER_FAVORITE = 'ADD_USER_FAVORITE';
export const REMOVE_USER_FAVORITE = 'REMOVE_USER_FAVORITE';
export const SET_PENDENCES = 'SET_PENDENCES';
export const SET_USER_REMEMBER_PRODUCTS = 'SET_USER_REMEMBER_PRODUCTS';
export const ADD_USER_REMEMBER_PRODUCTS = 'ADD_USER_REMEMBER_PRODUCTS';
export const REMOVE_USER_REMEMBER_PRODUCTS = 'REMOVE_USER_REMEMBER_PRODUCTS';

export interface AddUserFavorite {
  type: 'ADD_USER_FAVORITE';
  productId: string;
  favorite: any; // replace with interface for favorite
}

export interface AddUserFavoriteAction {
  type: typeof ADD_USER_FAVORITE;
  productId: string;
  favorite: any; // replace with interface for favorite
}

export interface AddUserRememberProducts {
  key: string;
  type: 'ADD_USER_REMEMBER_PRODUCTS';
  rememberProductKeys: string[];
}

export interface AddUserRememberProductsAction {
  key: string;
  type: typeof ADD_USER_REMEMBER_PRODUCTS;
  rememberProductKeys: string[];
}

export interface AutoCompleteRegister {
  name: string;
  lastname: string;
}

export interface LoginState {
  email: string;
  isRegister: boolean;
  isLogin: boolean;
  loading: boolean;
  errorMessage?: string;
  isCodeSent: boolean;
  isForgot: boolean;
  changePassword?: boolean;
  code?: string;
}

export interface OpenPopupModal {
  type: 'OPEN_POPUP_MODAL';
  typeOfModal: any;
  payload?: any;
}

export interface OpenPopupModalAction {
  type: typeof OPEN_POPUP_MODAL;
  typeOfModal: any;
  payload?: any;
}

export interface RemoveUserFavorite {
  type: 'REMOVE_USER_FAVORITE';
  productId: any;
  favorite: any;
}

export interface RemoveUserFavoriteAction {
  type: typeof REMOVE_USER_FAVORITE;
  productId: any;
  favorite: any;
}

export interface RemoveUserRememberProductsAction {
  key: string;
  type: typeof REMOVE_USER_REMEMBER_PRODUCTS;
  rememberProductKeys: string[];
}

export interface RespondQuestionAction {
  type: 'RESPOND_QUESTION';
  payload: Error;
}

export interface SetAutocompleteRegisterAction {
  type: typeof SET_AUTO_COMPLETE_REGISTER;
  name: string;
  lastname: string;
}

export interface SetBackLoginScreenLoginProcess {
  type: 'SET_BACK_LOGIN_SCREEN_LOGIN_PROCESS';
  login: any;
}

export interface SetBackLoginScreenLoginProcessAction {
  type: 'SET_BACK_LOGIN_SCREEN_LOGIN_PROCESS';
  login: any;
}

export interface SetErroLoginProcessMessage {
  type: 'SET_ERROR_LOGIN_PROCESS_MESSAGE';
  errorMessage: string;
  typeOfModal: any;
}

export interface SetErroLoginProcessMessageAction {
  type: typeof SET_ERROR_LOGIN_PROCESS_MESSAGE;
  errorMessage: string;
  typeOfModal: any;
}

export interface SetEmailLoginProcess {
  type: 'SET_EMAIL_LOGIN_PROCESS';
  login: any;
  email: string;
  isRegister: boolean;
  isLogin: boolean;
}

export interface SetEmailLoginProcessAction {
  type: typeof SET_EMAIL_LOGIN_PROCESS;
  login: {};
  email: string;
  isRegister: boolean;
  isLogin: boolean;
}

export interface SetFavoritesAction {
  type: typeof SET_USER_FAVORITES;
  favorites: any[]; // replace with interface for favorites
}

export interface SetIsCodeSent {
  type: 'SET_IS_CODE_SENT';
  login: {};
  isCodeSent: boolean;
  isForgot: boolean;
}

export interface SetIsCodeSentAction {
  type: typeof SET_IS_CODE_SENT;
  login: {};
  isCodeSent: boolean;
  isForgot: boolean;
}

export interface SetIsChangePassword {
  type: 'SET_IS_CHANGE_PASSWORD';
  login: {};
  changePassword: boolean;
  code: string;
}

export interface SetIsChangePasswordAction {
  type: typeof SET_IS_CHANGE_PASSWORD;
  login: {};
  changePassword: boolean;
  code: string;
}

export interface SetLoginLoading {
  type: 'SET_LOGIN_LOADING';
  typeOfModal?: any;
  payload?: any;
  loading: boolean;
}

export interface SetLoginLoadingAction {
  type: typeof SET_LOGIN_LOADING;
  typeOfModal?: any;
  payload?: any;
  loading: boolean;
}

export interface SetLoginUser {
  type: 'SET_LOGIN_USER';
  isLogged: boolean;
  user: string;
  LoginPopup: boolean;
}

export interface SetLoginUserAction {
  type: typeof SET_LOGIN_USER;
  isLogged: boolean;
  user: string;
  LoginPopup: boolean;
}

export interface SetLogoutUser {
  type: 'SET_LOGOUT_USER';
  isLogged: boolean;
  user: string;
  LoginPopup: boolean;
}

export interface SetLogoutUserAction {
  type: typeof SET_LOGOUT_USER;
  isLogged: boolean;
  user: string;
  LoginPopup: boolean;
}

export interface SetNeedCompleteInfo {
  type: 'SET_NEED_COMPLETE_INFOS';
  needCompleteInfos: boolean;
}

export interface SetNeedCompleteInfoAction {
  type: typeof SET_NEED_COMPLETE_INFOS;
  needCompleteInfos: boolean;
}

export interface SetPendences {
  type: 'SET_PENDENCES';
  pendences: any[];
}

export interface SetPendencesAction {
  type: typeof SET_PENDENCES;
  pendences: any[];
}

export interface SetUserInfo {
  type: 'SET_USER_INFO';
  userInfo: any;
}

export interface SetUserInfoAction {
  type: typeof SET_USER_INFO;
  userInfo: any;
}

export interface SetUserRememberProductsAction {
  type: typeof SET_USER_REMEMBER_PRODUCTS;
  rememberProductKeys: string[];
}

export interface ShowLoginPopup {
  type: 'SHOW_LOGIN_POPUP';
  loginPopup: boolean;
}

export interface ShowLoginPopupAction {
  type: typeof SHOW_LOGIN_POPUP;
  loginPopup: any;
}

export interface UploadImageFailureAction {
  type: 'UPLOAD_IMAGE_FAILURE';
  payload: Error;
}

export interface UploadImageSuccessAction {
  type: 'UPLOAD_IMAGE_SUCCESS';
  payload: string;
}

export interface UserInfo {
  favorites?: string[];
}

export interface UserRememberProducts {
  [key: string]: boolean;
}

export interface UserState {
  app: {
    isLoggedIn: boolean;
  };
  login: {
    email: string;
    isRegister: boolean;
    isLogin: boolean;
    errorMessage: string;
    loading: boolean;
    isCodeSent: boolean;
    isForgot: boolean;
    changePassword: boolean;
    code: string;
  };
  userInfo: {
    favorites: any[];
    address: any[];
    rememberProductKeys: any[];
  };
}

export type UserAction =
  | AddUserFavoriteAction
  | AddUserRememberProductsAction
  | RemoveUserFavoriteAction
  | RemoveUserRememberProductsAction
  | RespondQuestionAction
  | OpenPopupModalAction
  | SetAutocompleteRegisterAction
  | SetBackLoginScreenLoginProcessAction
  | SetEmailLoginProcessAction
  | SetErroLoginProcessMessageAction
  | SetFavoritesAction
  | SetIsChangePasswordAction
  | SetIsCodeSentAction
  | SetLoginLoadingAction
  | SetLoginUserAction
  | SetLogoutUserAction
  | SetNeedCompleteInfoAction
  | SetPendencesAction
  | SetUserInfoAction
  | SetUserNotificationAction
  | SetUserRememberProductsAction
  | ShowLoginPopupAction
  | UploadImageFailureAction
  | UploadImageSuccessAction;
