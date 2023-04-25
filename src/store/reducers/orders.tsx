/* eslint-disable indent */
// Define TypeScript interfaces for the RootState and actions
interface OrdersState {
  orders?: Record<string, any>;
  order_selected?: string;
}

type OrdersAction = {
  type: 'ORDERS_SET_ORDERS' | 'ORDERS_SET_ORDER_SELECTED';
  orders?: Record<string, any>;
  key?: string;
};

export default function orders(
  state: OrdersState = {},
  action: OrdersAction
): OrdersState {
  switch (action.type) {
    case 'ORDERS_SET_ORDERS':
      return {
        ...state,
        orders: {
          ...state.orders,
          ...action.orders,
        },
      };
    case 'ORDERS_SET_ORDER_SELECTED':
      return {
        ...state,
        order_selected: action.key,
      };
    default:
      return state;
  }
}
