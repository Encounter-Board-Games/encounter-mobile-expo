import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../Store';
import { Action } from 'redux';
import { setProducts } from '../product';
import { applyCupon } from '../../../graphql';
import { cartIsLoading, clear, handleOpenCart } from './cart';
import { handleCalcDeliveryTaxes } from './cartCalcDeliveryTaxes';
import {
  CartAddProductAction,
  CartSetSubtotalAndTotalAction,
  CartSetCupomAction,
  CartSetRenewAction,
  CartSetPaymentMethodsAction,
} from '../../../types/actionCartTypes';
import { handleLoadDeliveryMethods } from './cartLoadDeliveryMethods';

export const addProduct = (
  key: string,
  size: string
): CartAddProductAction => ({
  type: 'CART_ADD_PRODUCT',
  key,
  size,
});

export const setSubtotalAndTotal = (
  total: number,
  subtotal: number,
  time: number
): CartSetSubtotalAndTotalAction => ({
  type: 'CART_SET_SUBTOTAL_AND_TOTAL',
  total,
  subtotal,
  time,
});

export const setCupom = (cupom: any): CartSetCupomAction => ({
  type: 'CART_SET_CUPOM',
  cupom,
});

export const handleApplyCupon = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => {
  return async (dispatch, getState) => {
    dispatch(cartIsLoading(true));
    const { cart, products: productsState } = getState();

    const { products = [] } = cart;
    const subtotal = products
      .map((key) => productsState.products[key])
      .reduce((a, b) => a + b.priceValue, 0);

    const cupon = await applyCupon(subtotal, products);
    dispatch(setCupom(cupon));
    dispatch(calcTotal());
    dispatch(cartIsLoading(false));
  };
};

export const setRenew = (renewOrderId: string): CartSetRenewAction => ({
  type: 'CART_SET_RENEW',
  renewOrderId,
});

export const setPaymentMethods = (
  key: string
): CartSetPaymentMethodsAction => ({
  type: 'CART_SET_PAYMENT_METHODS',
  key,
});

export const calcTotal = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => {
  return async (dispatch, getState) => {
    const { cart, products: productsState } = getState();

    dispatch(handleLoadDeliveryMethods());

    const { products = [], cupom = {}, deliveryTaxes = 0 } = cart;
    const cupomDiscount = cupom && cupom.discount ? cupom.discount : 0;
    const subtotal = products
      .map((key) => productsState.products[key])
      .reduce((a, b) => a + b.priceValue, 0);
    const total = subtotal - cupomDiscount + deliveryTaxes;
    const time = products.length >= 2 ? 7 : 3;

    dispatch(setSubtotalAndTotal(total, subtotal, time));
  };
};

export const handleSelectPaymentMethod = (
  key: string
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return (dispatch, getState) => {
    dispatch(setPaymentMethods(key));
    dispatch(handleCalcDeliveryTaxes());
  };
};

export const renewOrder = (
  orderId: string,
  products: any[],
  time: number
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return (dispatch) => {
    dispatch(clear());
    dispatch(setProducts(products));
    products.map(({ key }) => dispatch(addProduct(key)));
    const total = products.map((p) => p.priceValue).reduce((a, b) => a + b, 0);
    dispatch(handleOpenCart());
    dispatch(setSubtotalAndTotal(total, total, time));
    dispatch(setRenew(orderId));
  };
};
export { handleCalcDeliveryTaxes };
