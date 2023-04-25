export interface SetDeliveryTaxesAction {
  type: 'CART_SET_DELIVERY_TAXES';
  value: number;
}

export function setDeliveryTaxes(value: number): SetDeliveryTaxesAction {
  return {
    type: 'CART_SET_DELIVERY_TAXES',
    value,
  };
}

export interface CartSetDeliveryOptionsAction {
  type: 'CART_SET_DELIVERY_OPTIONS';
  deliveryType: string;
  options: string[];
}

export function cartSetDeliveryOptions(
  deliveryType: string,
  options: string[]
): CartSetDeliveryOptionsAction {
  return {
    type: 'CART_SET_DELIVERY_OPTIONS',
    deliveryType,
    options,
  };
}

export interface CartSetDeliveryAction {
  type: 'CART_SET_DELIVERY';
  deliveryType: string;
  deliveryTypeMode: string;
  value: number;
}

export function cartSetDelivery(
  type: string,
  mode: string,
  value: number
): CartSetDeliveryAction {
  return {
    type: 'CART_SET_DELIVERY',
    deliveryType: type,
    deliveryTypeMode: mode,
    value,
  };
}

export interface CartSetDeliveryTypeOpenedAction {
  type: 'CART_SET_DELIVERY_TYPE_OPENED';
  deliveryType: string;
  deliveryTypeMode: string;
}

export function cartSetDeliveryTypeOpened(
  type: string,
  mode: string
): CartSetDeliveryTypeOpenedAction {
  return {
    type: 'CART_SET_DELIVERY_TYPE_OPENED',
    deliveryType: type,
    deliveryTypeMode: mode,
  };
}
