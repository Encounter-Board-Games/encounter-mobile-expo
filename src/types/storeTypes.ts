import { OPEN_POPUP_MODAL } from '../store/actions/info';
import { SET_USER_NOTIFICATION } from '../store/actions/user/notifications';
import {
  SET_NOTIFICATION,
  SHOW_NOTIFICATION,
} from '../store/actions/notification';
import { CLOSE_DISCOVERY } from 'src/store/actions/discovery';

export const SET_USER_REMEMBER_PRODUCTS = 'SET_USER_REMEMBER_PRODUCTS';
export const ADD_USER_REMEMBER_PRODUCTS = 'ADD_USER_REMEMBER_PRODUCTS';
export const REMOVE_USER_REMEMBER_PRODUCTS = 'REMOVE_USER_REMEMBER_PRODUCTS';
export const CART_ADD_PRODUCT = 'CART_ADD_PRODUCT';
export const CART_SET_RENEW = 'CART_SET_RENEW';
export const CART_REMOVE_PRODUCT = 'CART_REMOVE_PRODUCT';
export const CART_SET_SUBTOTAL_AND_TOTAL = 'CART_SET_SUBTOTAL_AND_TOTAL';
export const CART_LOGOUT = 'CART_LOGOUT';
export const CART_SET_DELIVERY_TYPE_OPENED = 'CART_SET_DELIVERY_TYPE_OPENED';
export const CART_SET_DELIVERY = 'CART_SET_DELIVERY';
export const CART_SET_DELIVERY_OPTIONS = 'CART_SET_DELIVERY_OPTIONS';
export const CART_SET_DELIVERY_TAXES = 'CART_SET_DELIVERY_TAXES';
export const CART_SET_PAYMENT_METHODS = 'CART_SET_PAYMENT_METHODS';
export const CART_SET_CUPOM = 'CART_SET_CUPOM';
export const CART_IS_LOADING = 'CART_IS_LOADING';
export const CART_CLEAR = 'CART_CLEAR';
export const SET_CURRENT_LOCATION = 'SET_CURRENT_LOCATION';
export const SET_CURRENT_LOCATION_NOT_FOUND = 'SET_CURRENT_LOCATION_NOT_FOUND';
export const SET_LOCATIONS_SEARCHS = 'SET_LOCATIONS_SEARCHS';
export const SET_LOCATIONS_SEARCHS_NOT_FOUND =
  'SET_LOCATIONS_SEARCHS_NOT_FOUND';
export const SET_SEARCHS_LOCATIONS_TERM = 'SET_SEARCHS_LOCATIONS_TERM';
export const SET_LOCATIONS_SEARCHS_LOADING = 'SET_LOCATIONS_SEARCHS_LOADING';
export const SET_CHOSE_ADDRESS_MODE = 'SET_CHOSE_ADDRESS_MODE';
export const SET_ADRESSES = 'SET_ADRESSES';
export const ADD_ADDRESS = 'ADD_ADRESSES';
export const REMOVE_ADDRESS = 'REMOVE_ADDRESS';
export const EDIT_ADDRESS = 'EDIT_ADDRESS';
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
export const SET_USER_INFO = 'SET_USER_INFO';
export const SET_USER_FAVORITES = 'SET_USER_FAVORITES';
export const ADD_USER_FAVORITE = 'ADD_USER_FAVORITE';
export const REMOVE_USER_FAVORITE = 'REMOVE_USER_FAVORITE';
export const SET_PENDENCES = 'SET_PENDENCES';

export interface AddUserFavorite {
  type: 'ADD_USER_FAVORITE';
  productId: string;
  favorite: any;
}

export interface AddUserFavoriteAction {
  type: typeof ADD_USER_FAVORITE;
  productId: string;
  favorite: any;
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
  favorites: any[];
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

export interface NotificationType {
  key: string;
  action?: string;
  viewed: boolean;
  title: string;
  body: string;
  dateTimeFormated: string;
  dateFormated: string;
}

export interface SetCurrentLocationAction {
  type: typeof SET_CURRENT_LOCATION;
  currentLocation: LocationModel;
}

export interface SetCurrentLocationNotFoundAction {
  type: typeof SET_CURRENT_LOCATION_NOT_FOUND;
}

export interface SetLocationsSearchsAction {
  type: typeof SET_LOCATIONS_SEARCHS;
  locations: LocationModel[];
}

export interface SetLocationsSearchsNotFoundAction {
  type: typeof SET_LOCATIONS_SEARCHS_NOT_FOUND;
}

export interface SetSearchsLocationsTermAction {
  type: typeof SET_SEARCHS_LOCATIONS_TERM;
  searchLocationsTerm: string;
}

export interface SetLocationsSearchsLoadingAction {
  type: typeof SET_LOCATIONS_SEARCHS_LOADING;
}

export interface SetChoseAddressModeAction {
  type: typeof SET_CHOSE_ADDRESS_MODE;
  choseAddressMode: boolean;
}

export interface SetAddressesAction {
  type: typeof SET_ADRESSES;
  addresses: AddressModel[];
}

export interface AddAddressAction {
  type: typeof ADD_ADDRESS;
  address: AddressModel;
}

export interface RemoveAddressAction {
  type: typeof REMOVE_ADDRESS;
  key: string;
}

export interface EditAddressAction {
  type: typeof EDIT_ADDRESS;
  address: AddressModel;
}

export interface LocationModel {
  key?: string;
  description: string;
  lat: number;
  lng: number;
}

export interface AddressModel extends LocationModel {
  number?: string;
  complement?: string;
  reference?: string;
  name?: string;
  cep?: string;
}

export interface AddProductAction {
  type: typeof CART_ADD_PRODUCT;
  key: string;
  size: string;
}

export interface CartAddProductAction {
  type: 'CART_ADD_PRODUCT';
  key: string;
  size: string;
}

export interface CartIsLoadingAction {
  type: typeof CART_IS_LOADING;
  isLoading: boolean;
}

export interface CartLogoutAction {
  type: typeof CART_LOGOUT;
}

export interface CartSetCupomAction {
  type: 'CART_SET_CUPOM';
  cupom: any;
}

export interface CartSetPaymentMethodsAction {
  type: 'CART_SET_PAYMENT_METHODS';
  key: string;
}

export interface CartSetRenewAction {
  type: 'CART_SET_RENEW';
  renewOrderId: string;
}

export interface CartSetSubtotalAndTotalAction {
  type: 'CART_SET_SUBTOTAL_AND_TOTAL';
  total: number;
  subtotal: number;
  time: number;
}

export interface ClearAction {
  type: typeof CART_CLEAR;
}

export interface DeliveryOptions {
  take: string[];
  leave: string[];
}

export interface LoadDeliveryMethodsAction {
  type: 'LOAD_DELIVERY_METHODS';
  payload: DeliveryOptions;
}

export interface OptionsModalProps {
  callBack: (option: string | undefined) => void;
  options: ProductOption[];
  title: string;
}

export interface ProductOption {
  id: string;
  size: string;
}

export interface RemoveProductAction {
  type: typeof CART_REMOVE_PRODUCT;
  productKey: string;
}

export interface SetRenewAction {
  type: typeof CART_SET_RENEW;
  renewOrderId: string;
}

export interface SetUserRememberProductsAction {
  type: typeof SET_USER_REMEMBER_PRODUCTS;
  rememberProductKeys: string[];
}

export interface AddUserRememberProductsAction {
  type: typeof ADD_USER_REMEMBER_PRODUCTS;
  key: string;
  rememberProductKey: string;
}

export interface RemoveUserRememberProductsAction {
  type: typeof REMOVE_USER_REMEMBER_PRODUCTS;
  rememberProductKey: string;
}

export interface ShowNotificationAction {
  type: string;
  payload: {
    notification: string | { text: string; action?: () => void; key?: string };
    type?: string;
    time?: number;
  };
}

export interface EmailLoginProcessProps {
  type: string;
  email: string;
  isLogin: boolean;
}

export interface ErrorLoginProcessMessageProps {
  type: string;
  errorMessage: string;
  typeOfModal: any;
}

export interface IsChangePasswordProps {
  type: string;
  changePassword: boolean;
  code: string;
}

export interface IsCodeSentProps {
  type: string;
  isCodeSent: boolean;
  isForgot: boolean;
}

export interface LoginLoadingProps {
  type: string;
  typeOfModal?: any;
  payload?: any;
  loading: boolean;
}

export interface LoginPopupProps {
  type: string;
  show: boolean;
}

export interface LoginUserProps {
  type: string;
  user: any;
}

export interface NeedCompleteInfosProps {
  type: string;
  needCompleteInfos: boolean;
}

export interface Notification {
  id: string;
  message: string;
  isViewed: boolean;
}

export interface NotificationState {
  notifications: Notification[];
  type: string;
}

export interface SetNotification {
  type: 'SET_NOTIFICATION';
  notificationType: string;
  notificationText: string;
  notificationAction?: void;
  notificationKey?: string;
}

export interface SetNotificationAction {
  type: typeof SET_NOTIFICATION;
  notificationType: string;
  notificationText: string;
  notificationAction?: void;
  notificationKey?: string;
}

export interface ShowNotification {
  type: 'SHOW_NOTIFICATION';
  show: boolean;
}

export interface ShowNotificationAction {
  type: typeof SHOW_NOTIFICATION;
  show: boolean;
}

export interface SetUserNotification {
  type: 'SET_USER_NOTIFICATION';
  notifications: Notification[];
}

export interface SetUserNotificationAction {
  type: typeof SET_USER_NOTIFICATION;
  notifications: Notification[];
}

export interface DiscoveryFilters {
  text: {
    [key: string]: string;
  };
}

export interface FinishDiscovery {
  type: 'FINISH_DISCOVERY';
  payload: DiscoveryFilters;
}

export interface FinishDiscoveryAction {
  type: typeof FINISH_DISCOVERY;
  payload: DiscoveryFilters;
}

export interface CloseDiscoveryAction {
  type: typeof CLOSE_DISCOVERY;
}

export interface DiscoveryState {
  filters: DiscoveryFilters;
  steps: string;
}

export interface AddUserFavorite {
  type: 'ADD_USER_FAVORITE';
  productId: string;
  favorite: any;
}

export interface AddUserFavoriteAction {
  type: typeof ADD_USER_FAVORITE;
  productId: string;
  favorite: any;
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
  favorites: any[];
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

export interface NotificationType {
  key: string;
  action?: string;
  viewed: boolean;
  title: string;
  body: string;
  dateTimeFormated: string;
  dateFormated: string;
}

export interface SetCurrentLocationAction {
  type: typeof SET_CURRENT_LOCATION;
  currentLocation: LocationModel;
}

export interface SetCurrentLocationNotFoundAction {
  type: typeof SET_CURRENT_LOCATION_NOT_FOUND;
}

export interface SetLocationsSearchsAction {
  type: typeof SET_LOCATIONS_SEARCHS;
  locations: LocationModel[];
}

export interface SetLocationsSearchsNotFoundAction {
  type: typeof SET_LOCATIONS_SEARCHS_NOT_FOUND;
}

export interface SetSearchsLocationsTermAction {
  type: typeof SET_SEARCHS_LOCATIONS_TERM;
  searchLocationsTerm: string;
}

export interface SetLocationsSearchsLoadingAction {
  type: typeof SET_LOCATIONS_SEARCHS_LOADING;
}

export interface SetChoseAddressModeAction {
  type: typeof SET_CHOSE_ADDRESS_MODE;
  choseAddressMode: boolean;
}

export interface SetAddressesAction {
  type: typeof SET_ADRESSES;
  addresses: AddressModel[];
}

export interface AddAddressAction {
  type: typeof ADD_ADDRESS;
  address: AddressModel;
}

export interface RemoveAddressAction {
  type: typeof REMOVE_ADDRESS;
  key: string;
}

export interface EditAddressAction {
  type: typeof EDIT_ADDRESS;
  address: AddressModel;
}

export interface LocationModel {
  key?: string;
  description: string;
  lat: number;
  lng: number;
}

export interface AddressModel extends LocationModel {
  number?: string;
  complement?: string;
  reference?: string;
  name?: string;
  cep?: string;
}

export interface AddProductAction {
  type: typeof CART_ADD_PRODUCT;
  key: string;
  size: string;
}

export interface CartAddProductAction {
  type: 'CART_ADD_PRODUCT';
  key: string;
  size: string;
}

export interface CartIsLoadingAction {
  type: typeof CART_IS_LOADING;
  isLoading: boolean;
}

export interface CartLogoutAction {
  type: typeof CART_LOGOUT;
}

export interface CartSetCupomAction {
  type: 'CART_SET_CUPOM';
  cupom: any;
}

export interface CartSetPaymentMethodsAction {
  type: 'CART_SET_PAYMENT_METHODS';
  key: string;
}

export interface CartSetRenewAction {
  type: 'CART_SET_RENEW';
  renewOrderId: string;
}

export interface CartSetSubtotalAndTotalAction {
  type: 'CART_SET_SUBTOTAL_AND_TOTAL';
  total: number;
  subtotal: number;
  time: number;
}

export interface ClearAction {
  type: typeof CART_CLEAR;
}

export interface DeliveryOptions {
  take: string[];
  leave: string[];
}

export interface LoadDeliveryMethodsAction {
  type: 'LOAD_DELIVERY_METHODS';
  payload: DeliveryOptions;
}

export interface OptionsModalProps {
  callBack: (option: string | undefined) => void;
  options: ProductOption[];
  title: string;
}

export interface ProductOption {
  id: string;
  size: string;
}

export interface RemoveProductAction {
  type: typeof CART_REMOVE_PRODUCT;
  productKey: string;
}

export interface SetRenewAction {
  type: typeof CART_SET_RENEW;
  renewOrderId: string;
}

export interface SetUserRememberProductsAction {
  type: typeof SET_USER_REMEMBER_PRODUCTS;
  rememberProductKeys: string[];
}

export interface AddUserRememberProductsAction {
  type: typeof ADD_USER_REMEMBER_PRODUCTS;
  key: string;
  rememberProductKey: string;
}

export interface RemoveUserRememberProductsAction {
  type: typeof REMOVE_USER_REMEMBER_PRODUCTS;
  rememberProductKey: string;
}

export interface ShowNotificationAction {
  type: string;
  payload: {
    notification: string | { text: string; action?: () => void; key?: string };
    type?: string;
    time?: number;
  };
}

export interface EmailLoginProcessProps {
  type: string;
  email: string;
  isLogin: boolean;
}

export interface ErrorLoginProcessMessageProps {
  type: string;
  errorMessage: string;
  typeOfModal: any;
}

export interface IsChangePasswordProps {
  type: string;
  changePassword: boolean;
  code: string;
}

export interface IsCodeSentProps {
  type: string;
  isCodeSent: boolean;
  isForgot: boolean;
}

export interface LoginLoadingProps {
  type: string;
  typeOfModal?: any;
  payload?: any;
  loading: boolean;
}

export interface LoginPopupProps {
  type: string;
  show: boolean;
}

export interface LoginUserProps {
  type: string;
  user: any;
}

export interface NeedCompleteInfosProps {
  type: string;
  needCompleteInfos: boolean;
}

export interface Notification {
  id: string;
  message: string;
  isViewed: boolean;
}

export interface NotificationState {
  notifications: Notification[];
  type: string;
}

export interface SetNotification {
  type: 'SET_NOTIFICATION';
  notificationType: string;
  notificationText: string;
  notificationAction?: void;
  notificationKey?: string;
}

export interface SetNotificationAction {
  type: typeof SET_NOTIFICATION;
  notificationType: string;
  notificationText: string;
  notificationAction?: void;
  notificationKey?: string;
}

export interface ShowNotificationAction {
  type: typeof SHOW_NOTIFICATION;
  show: boolean;
}

export interface SetUserNotification {
  type: 'SET_USER_NOTIFICATION';
  notifications: Notification[];
}

export interface SetUserNotificationAction {
  type: typeof SET_USER_NOTIFICATION;
  notifications: Notification[];
}

export interface DiscoveryFilters {
  text: {
    [key: string]: string;
  };
}

export interface FinishDiscoveryAction {
  type: typeof FINISH_DISCOVERY;
  payload: DiscoveryFilters;
}

export interface CloseDiscoveryAction {
  type: typeof CLOSE_DISCOVERY;
}

export interface DiscoveryState {
  filters: DiscoveryFilters;
  steps: string;
}

export type AddressActionType =
  | SetCurrentLocationAction
  | SetCurrentLocationNotFoundAction
  | SetLocationsSearchsAction
  | SetLocationsSearchsNotFoundAction
  | SetSearchsLocationsTermAction
  | SetLocationsSearchsLoadingAction
  | SetChoseAddressModeAction
  | SetAddressesAction
  | AddAddressAction
  | RemoveAddressAction
  | EditAddressAction;

export type CartAction =
  | AddProductAction
  | CartAddProductAction
  | CartIsLoadingAction
  | CartLogoutAction
  | CartSetSubtotalAndTotalAction
  | CartSetCupomAction
  | CartSetPaymentMethodsAction
  | CartSetRenewAction
  | ClearAction
  | RemoveProductAction
  | SetRenewAction;

export type DiscoveryActionTypes = FinishDiscoveryAction | CloseDiscoveryAction;

export type NotificationActionTypes =
  | LoginLoadingProps
  | Notification
  | NotificationState
  | SetNotificationAction
  | SetUserNotificationAction
  | ShowNotificationAction;

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

export type UserRememberProductsAction =
  | SetUserRememberProductsAction
  | AddUserRememberProductsAction
  | RemoveUserRememberProductsAction
  | ShowNotificationAction;
