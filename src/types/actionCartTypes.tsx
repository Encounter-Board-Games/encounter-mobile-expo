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
