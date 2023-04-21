import { editBasicInfo } from '../../../graphql';
import { handleShowNotification } from '../notification';
import { handleUserData } from './handlers';
import { setNeedCompleteInfos } from './login';

import {
  SetAutocompleteRegisterAction,
  SetUserInfoAction,
  SetFavoritesAction,
  AddUserFavoriteAction,
  RemoveUserFavoriteAction,
  SetPendencesAction,
  SetUserRememberProductsAction,
  AddUserRememberProductsAction,
  RemoveUserRememberProductsAction,
} from './userTypes';

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

export function setAutocompleteRegister(
  name: string,
  lastname: string
): SetAutocompleteRegisterAction {
  return {
    type: SET_AUTO_COMPLETE_REGISTER,
    name,
    lastname,
  };
}

export function setUserInfo(userInfo: any): SetUserInfoAction {
  return {
    type: SET_USER_INFO,
    userInfo,
  };
}

export function setFavorites(favorites: any[]): SetFavoritesAction {
  return {
    type: SET_USER_FAVORITES,
    favorites,
  };
}

export function addUserFavorite(favorite: any): AddUserFavoriteAction {
  return {
    type: ADD_USER_FAVORITE,
    favorite,
  };
}

export function removeUserFavorite(favorite: any): RemoveUserFavoriteAction {
  return {
    type: REMOVE_USER_FAVORITE,
    favorite,
  };
}

export function setPendences(pendences: any[]): SetPendencesAction {
  return {
    type: SET_PENDENCES,
    pendences,
  };
}

export function setUserRememberProducts(
  rememberProductKeys: string[]
): SetUserRememberProductsAction {
  return {
    type: SET_USER_REMEMBER_PRODUCTS,
    rememberProductKeys,
  };
}

export function addUserRememberProducts(
  rememberProductKeys: string[]
): AddUserRememberProductsAction {
  return {
    type: ADD_USER_REMEMBER_PRODUCTS,
    rememberProductKeys,
  };
}

export function removeUserRememberProducts(
  rememberProductKeys: string[]
): RemoveUserRememberProductsAction {
  return {
    type: REMOVE_USER_REMEMBER_PRODUCTS,
    rememberProductKeys,
  };
}

export function handleEditUserInfo(
  name: string,
  lastname: string,
  preferenceName: string,
  birthday: string,
  cellphone: string,
  terms: boolean,
  gender: string,
  document: string
) {
  return async (dispatch: any, getState: any) => {
    const result = await editBasicInfo(
      name,
      lastname,
      preferenceName,
      birthday,
      cellphone,
      terms,
      gender,
      document
    );
    const { user } = getState();
    const { pendences = [] } = user;
    dispatch(setNeedCompleteInfos(false));

    if (!terms) dispatch(handleShowNotification('Dados alterados com sucesso'));
    dispatch(handleUserData());
  };
}
