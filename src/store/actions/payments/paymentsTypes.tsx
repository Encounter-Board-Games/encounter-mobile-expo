
export const SET_PAYMENT_LOADING = "SET_PAYMENT_LOADING";
export const SET_PAYMENT_METHODS = "SET_PAYMENT_METHODS";
export const SET_CURRENT_PAYMENT_METHODS = "SET_CURRENT_PAYMENT_METHODS";
export const SET_REMOVE_PAYMENT_METHODS = "SET_REMOVE_PAYMENT_METHODS";
export const SET_ADD_PAYMENT_METHODS = "SET_REMOVE_PAYMENT";
export const SET_CHOSE_PAYMENT_METHODS_MODE = "SET_CHOSE_PAYMENT_METHODS_MODE";

export interface PaymentMethod {
  key: string;
  // Add other properties of a payment method here
}

export interface PaymentState {
  paymentMethods: PaymentMethod[];
  currentPaymentKey: string | undefined;
  loading: boolean;
  choseMode: boolean;
}

export interface SetPaymentLoadingAction {
  type: typeof SET_PAYMENT_LOADING;
  loading: boolean;
}

export interface SetUserPaymentMethodsAction {
  type: typeof SET_PAYMENT_METHODS;
  paymentMethods: PaymentMethod[];
}

export interface SetCurrentPaymentMethodsAction {
  type: typeof SET_CURRENT_PAYMENT_METHODS;
  key: string | undefined;
}

export interface SetChosePaymentMethodsModeAction {
  type: typeof SET_CHOSE_PAYMENT_METHODS_MODE;
  choseMode: boolean;
}

export interface SetRemovePaymentMethodsAction {
  type: typeof SET_REMOVE_PAYMENT_METHODS;
  key: string;
}

export interface SetAddPaymentMethodsAction {
  type: typeof SET_ADD_PAYMENT_METHODS;
  paymentMethod: PaymentMethod;
}

export type PaymentActionTypes =
  | SetPaymentLoadingAction
  | SetUserPaymentMethodsAction
  | SetCurrentPaymentMethodsAction
  | SetChosePaymentMethodsModeAction
  | SetRemovePaymentMethodsAction
  | SetAddPaymentMethodsAction;