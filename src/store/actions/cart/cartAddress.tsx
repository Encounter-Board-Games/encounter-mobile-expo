import { cartSetDelivery } from './cartDelivery';
import { handleCalcDeliveryTaxes } from './cartOrderPayment';

export function handleSelectAddress(addressKey: string) {
  return (dispatch: Function, getState: Function) => {
    const { cart } = getState();
    const { deliveryTypeOpened, deliveryTypeMode } = cart;

    dispatch(cartSetDelivery(deliveryTypeOpened, deliveryTypeMode, addressKey));
    dispatch(handleCalcDeliveryTaxes());
  };
}

export function handleSelectAddressDefault(type: string, mode: string) {
  return (dispatch: Function, getState: Function) => {
    const { cart } = getState();
    const { delivery = {} } = cart;
    const deliveryOptions = delivery[type].deliveryOptions || [];
    const otherType = type === 'leave' ? 'take' : 'leave';
    const value = delivery[otherType].selected?.key;

    dispatch(cartSetDelivery(type, mode, value));
    dispatch(handleCalcDeliveryTaxes());
  };
}

export function handleSelectModeAddress(type: string, mode: string) {
  return (dispatch: Function, getState: Function) => {
    const { cart } = getState();
    const { delivery } = cart;

    dispatch(cartSetDelivery(type, mode, delivery[type].selected?.key));

    dispatch(handleCalcDeliveryTaxes());
  };
}
