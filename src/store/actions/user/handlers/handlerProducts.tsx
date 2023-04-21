import {
  SetUserRememberProductsAction,
  AddUserRememberProductsAction,
  RemoveUserRememberProductsAction,
  SET_USER_REMEMBER_PRODUCTS,
  ADD_USER_REMEMBER_PRODUCTS,
  REMOVE_USER_REMEMBER_PRODUCTS,
} from './handlersTypes';

export function getState(): { user: any } {
  throw new Error('Function not implemented.');
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
  rememberProductKey: string
): AddUserRememberProductsAction {
  return {
    type: ADD_USER_REMEMBER_PRODUCTS,
    rememberProductKey,
  };
}

export function removeUserRememberProducts(
  rememberProductKey: string
): RemoveUserRememberProductsAction {
  return {
    type: REMOVE_USER_REMEMBER_PRODUCTS,
    rememberProductKey,
  };
}
