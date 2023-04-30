import { openCart } from '../info';
import { getLastPaymentId } from '../../../graphql';
import {
  AddProductAction,
  SetRenewAction,
  ClearAction,
  CartIsLoadingAction,
  CartLogoutAction,
  RemoveProductAction,
} from '../../../types/actionCartTypes';
import {
  calcTotal,
  handleApplyCupon,
  handleSelectPaymentMethod,
} from './cartOrderPayment';
import { handleLoadDeliveryMethods } from './cartLoadDeliveryMethods';

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

export function addProduct(key: string, size: string): AddProductAction {
  return {
    type: CART_ADD_PRODUCT,
    key,
    size,
  };
}

export function setRenew(renewOrderId: string): SetRenewAction {
  return {
    type: CART_SET_RENEW,
    renewOrderId,
  };
}

export function clear(): ClearAction {
  return {
    type: CART_CLEAR,
  };
}

export function handleClearCart() {
  return (dispatch: Function) => {
    dispatch(clear());
  };
}

export function cartIsLoading(isLoading: boolean): CartIsLoadingAction {
  return {
    type: CART_IS_LOADING,
    isLoading,
  };
}

export function cartLogout(): CartLogoutAction {
  return {
    type: CART_LOGOUT,
  };
}

export function removeProduct(productKey: string): RemoveProductAction {
  return {
    type: CART_REMOVE_PRODUCT,
    productKey,
  };
}

export function handleRemoveProduct(productKey: string) {
  return (dispatch: Function, getState: Function) => {
    dispatch(removeProduct(productKey));
    dispatch(calcTotal());
  };
}

export function handleLoginCart() {
  return (dispatch: Function) => {
    dispatch(handleApplyCupon());
  };
}

export function handleLogoutCart() {
  return (dispatch: Function) => {
    dispatch(cartLogout());
    dispatch(handleLoadDeliveryMethods());
    dispatch(calcTotal());
  };
}

export function handleOpenCart(show = true) {
  return async (dispatch: Function, getState: Function) => {
    const { cart } = getState();
    if (cart.renew && !show) {
      dispatch(clear());
    }

    if (show) {
      const paymentId = await getLastPaymentId();
      if (paymentId) dispatch(handleSelectPaymentMethod(paymentId));
    }
    dispatch(openCart(show));
  };
}

export { handleSelectPaymentMethod };
