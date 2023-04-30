/* eslint-disable indent */
import { arrayToObj } from '../../utils/helpers';

export interface ProductState {
  products: Record<string, any>;
  currentProductKey?: string;
  evaluationsProducts?: any[];
}

export type ProductAction = {
  type: 'SET_EVALUATIONS_PRODUCTS' | 'SET_PRODUCTS' | 'SET_CURRENT_PRODUCT';
  evaluationsProducts?: any[];
  products?: Record<string, any>;
  currentProductKey?: string;
};

export default function product(
  state: ProductState = { products: {}, currentProductKey: undefined },
  action: ProductAction
): ProductState {
  switch (action.type) {
    case 'SET_EVALUATIONS_PRODUCTS':
      return {
        ...state,
        evaluationsProducts: action.evaluationsProducts,
      };
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: {
          ...state.products,
          ...arrayToObj(
            Object.keys(action.products).map((key) => ({
              ...(state.products || {})[key],
              ...action.products[key],
            }))
          ),
        },
      };
    case 'SET_CURRENT_PRODUCT':
      return {
        ...state,
        currentProductKey: action.currentProductKey,
      };
    default:
      return state;
  }
}
