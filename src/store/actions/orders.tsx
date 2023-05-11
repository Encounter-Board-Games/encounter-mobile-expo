import { orders } from '../../graphql';
import { arrayToObj } from '../../utils/helpers';
import { openPopupModal } from './info';
import { translation } from '../../texts/translations';
import { Linking } from 'react-native';

export interface Order {
  key: string;
  // add other properties of order here
}

export interface OrdersState {
  orders: Record<string, Order>;
  selectedOrderKey: string | null;
}

export const ORDERS_SET_ORDERS = 'ORDERS_SET_ORDERS';
export const ORDERS_SET_ORDER_SELECTED = 'ORDERS_SET_ORDER_SELECTED';

interface SetOrdersAction {
  type: typeof ORDERS_SET_ORDERS;
  payload: Record<string, Order>;
}

interface SetSelectedOrderAction {
  type: typeof ORDERS_SET_ORDER_SELECTED;
  payload: string;
}

export type OrdersActionTypes = SetOrdersAction | SetSelectedOrderAction;

export function ordersSetOrders(
  orders: Record<string, Order>
): SetOrdersAction {
  return {
    type: ORDERS_SET_ORDERS,
    payload: orders,
  };
}

export function setSelectedOrder(key: string): SetSelectedOrderAction {
  return {
    type: ORDERS_SET_ORDER_SELECTED,
    payload: key,
  };
}

export function handleLoadOrders() {
  return async (dispatch: Function) => {
    try {
      const orders_ = await orders();

      dispatch(ordersSetOrders(arrayToObj(orders_) as Record<string, Order>));
    } catch (error) {
      console.log(error);
    }
  };
}

export function handleSelectOrder(key: string) {
  return async (dispatch: Function) => {
    dispatch(setSelectedOrder(key));
  };
}

export function addOrderAndSelect(order: Order) {
  return async (dispatch: Function) => {
    dispatch(ordersSetOrders({ [order.key]: order }));
    dispatch(handleSelectOrder(order.key));
  };
}

export function handleOpenOrderHelp(key: string) {
  return (dispatch: Function) => {
    dispatch(
      openPopupModal('WPP_POPUP', {
        text: translation('orders.helpWPP', { key }),
      })
    );
  };
}

export function handleEvaluateExperience() {
  return async (dispatch: Function, getState: Function) => {
    const { app = {} } = getState();
    const { about = {} } = app;
    const { phone } = about;
    return await new Promise<string>((resolve) => {
      dispatch(
        openPopupModal('TEXT_MODAL', {
          callBack: (text: string | PromiseLike<string>) => {
            if (text)
              Linking.openURL(
                'whatsapp://send?phone=' + phone + '&text=' + text
              );
            resolve(text);
          },
          title: 'Avalie sua experiência',
          description: 'Sua avaliação é muito importante para a gente!',
          confirmBtn: 'Avaliar',
        })
      );
    });
  };
}
