export interface SetUserRememberProductsAction {
  type: typeof SET_USER_REMEMBER_PRODUCTS;
  rememberProductKeys: string[];
}

export interface AddUserRememberProductsAction {
  type: typeof ADD_USER_REMEMBER_PRODUCTS;
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

export type UserRememberProductsAction =
  | SetUserRememberProductsAction
  | AddUserRememberProductsAction
  | RemoveUserRememberProductsAction
  | ShowNotificationAction;

export const SET_USER_REMEMBER_PRODUCTS = 'SET_USER_REMEMBER_PRODUCTS';
export const ADD_USER_REMEMBER_PRODUCTS = 'ADD_USER_REMEMBER_PRODUCTS';
export const REMOVE_USER_REMEMBER_PRODUCTS = 'REMOVE_USER_REMEMBER_PRODUCTS';
