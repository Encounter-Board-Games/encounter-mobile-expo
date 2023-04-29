// eslint-disable-next-line max-len
import { SetAutocompleteRegisterAction } from '../../../../types/actionUserTypes';

export function setAutocompleteRegister(
  name: string,
  lastname: string
): SetAutocompleteRegisterAction {
  return {
    type: 'SET_AUTO_COMPLETE_REGISTER',
    name,
    lastname,
  };
}

export function setLogged(user: any, action: string) {
  return {
    type: 'SET_LOGGED',
    user,
    action,
  };
}

export function setLoginLoading(user: any, action: string) {
  return {
    type: 'SET_LOGIN_LOADING',
    user,
    action,
  };
}

export function setPendences(pendences: any) {
  return {
    type: 'SET_PENDENCES',
    pendences,
  };
}

export function setEmailLoginProcess(email: string, isLogin: boolean) {
  return {
    type: 'SET_EMAIL_LOGIN_PROCESS',
    email,
    isLogin,
  };
}

export function setIsCodeSent(isCodeSent: boolean, loginLoading: boolean) {
  return {
    type: 'SET_IS_CODE_SENT',
    isCodeSent,
    loginLoading,
  };
}

export function setFavorites(favorites: string[]) {
  return {
    type: 'SET_FAVORITES',
    favorites,
  };
}
