/* eslint-disable indent */
// actionTypes.ts
export enum ActionTypes {
  CART_CLEAR = 'CART_CLEAR',
  CART_SET_DELIVERY_OPTIONS = 'CART_SET_DELIVERY_OPTIONS',
  CART_SET_RENEW = 'CART_SET_RENEW',
  CART_ADD_PRODUCT = 'CART_ADD_PRODUCT',
  CART_IS_LOADING = 'CART_IS_LOADING',
  CART_REMOVE_PRODUCT = 'CART_REMOVE_PRODUCT',
  CART_SET_SUBTOTAL_AND_TOTAL = 'CART_SET_SUBTOTAL_AND_TOTAL',
  CART_SET_CUPOM = 'CART_SET_CUPOM',
  CART_SET_DELIVERY_TAXES = 'CART_SET_DELIVERY_TAXES',
  CART_SET_PAYMENT_METHODS = 'CART_SET_PAYMENT_METHODS',
  CART_LOGOUT = 'CART_LOGOUT',
  CART_SET_DELIVERY = 'CART_SET_DELIVERY',
  CART_SET_DELIVERY_TYPE_OPENED = 'CART_SET_DELIVERY_TYPE_OPENED',
}

interface Product {
  key: string;
  price?: number;
  name?: string;
}

interface DeliveryOption {
  key: string;
  type: string;
}

interface Delivery {
  take: {
    deliveryOptions: DeliveryOption[];
  };
  leave: {
    deliveryOptions: DeliveryOption[];
  };
}

interface RootState {
  products: Product[];
  deliveryTypeOpened?: string;
  deliveryTypeMode?: string;
  delivery: Delivery;
  time?: string;
  payment?: string;
  deliveryTaxes?: number;
  cupom?: string;
  subtotal?: number;
  total: number;
  sizes?: Record<string, any>;
  isLoading?: boolean;
  renew?: boolean;
  renewOrderId?: string;
}

interface Action {
  type: ActionTypes;
  options?: DeliveryOption[];
  deliveryType?: string;
  renewOrderId?: string;
  key?: string;
  size?: any;
  isLoading?: boolean;
  productKey?: string;
  subtotal?: number;
  total?: number;
  time?: string;
  cupom?: string;
  value?: number;
  deliveryTypeMode?: string;
}

const delivery: Delivery = {
  take: { deliveryOptions: [] },
  leave: { deliveryOptions: [] },
};

const defaultCart: RootState = {
  products: [],
  delivery: delivery,
  total: undefined,
};

export default function cart(
  state: RootState = defaultCart,
  action: Action
): RootState {
  switch (action.type) {
    case ActionTypes.CART_CLEAR:
      return { ...defaultCart };

    case ActionTypes.CART_SET_DELIVERY_OPTIONS:
      return {
        ...state,
        delivery: {
          ...state.delivery,
          [action.deliveryType!]: {
            ...state.delivery[action.deliveryType!],
            deliveryOptions: action.options!,
          },
        },
      };

    case ActionTypes.CART_SET_RENEW:
      return { ...state, renew: true, renewOrderId: action.renewOrderId };

    case ActionTypes.CART_ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, { key: action.key! }],
        sizes: { ...state.sizes, [action.key!]: action.size },
      };

    case ActionTypes.CART_IS_LOADING:
      return { ...state, isLoading: action.isLoading };

    case ActionTypes.CART_REMOVE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((p) => p.key !== action.productKey),
      };

    case ActionTypes.CART_SET_SUBTOTAL_AND_TOTAL:
      return {
        ...state,
        subtotal: action.subtotal,
        total: action.total!,
        time: action.time,
      };
    case ActionTypes.CART_SET_CUPOM:
      return { ...state, cupom: action.cupom };

    case ActionTypes.CART_SET_DELIVERY_TAXES:
      return { ...state, deliveryTaxes: action.value };

    case ActionTypes.CART_SET_PAYMENT_METHODS:
      return { ...state, payment: action.key };

    case ActionTypes.CART_LOGOUT:
      return {
        ...state,
        time: undefined,
        payment: undefined,
        deliveryTaxes: undefined,
        cupom: undefined,
        subtotal: undefined,
        total: undefined,
        delivery,
      };

    case ActionTypes.CART_SET_DELIVERY:
      return {
        ...state,
        delivery: {
          ...state.delivery,
          [action.deliveryType!]: {
            ...state.delivery[action.deliveryType!],
            selected: { key: action.value!, type: action.deliveryTypeMode! },
          },
        },
      };

    case ActionTypes.CART_SET_DELIVERY_TYPE_OPENED:
      return {
        ...state,
        deliveryTypeOpened: action.deliveryType,
        deliveryTypeMode: action.deliveryTypeMode,
      };

    default:
      return state;
  }
}
