/* eslint-disable indent */
// Define TypeScript interfaces for the RootState and actions
interface PaymentsState {
  paymentMethods?: any[];
  loading?: boolean;
  currentPaymentKey?: string;
  choseMode?: boolean;
}

type PaymentsAction = {
  type:
    | 'SET_PAYMENT_METHODS'
    | 'SET_PAYMENT_LOADING'
    | 'SET_CURRENT_PAYMENT_METHODS'
    | 'SET_ADD_PAYMENT_METHODS'
    | 'SET_REMOVE_PAYMENT_METHODS'
    | 'SET_CHOSE_PAYMENT_METHODS_MODE';
  paymentMethods?: any[];
  loading?: boolean;
  key?: string;
  paymentMethod?: any;
  choseMode?: boolean;
};

export default function payments(
  state: PaymentsState = {},
  action: PaymentsAction
): PaymentsState {
  switch (action.type) {
    case 'SET_PAYMENT_METHODS':
      return {
        ...state,
        paymentMethods: action.paymentMethods,
      };

    case 'SET_PAYMENT_LOADING':
      return {
        ...state,
        loading: action.loading,
      };
    case 'SET_CURRENT_PAYMENT_METHODS':
      return {
        ...state,
        currentPaymentKey: action.key,
      };
    case 'SET_ADD_PAYMENT_METHODS':
      return {
        ...state,
        paymentMethods: [...state.paymentMethods, action.paymentMethod],
      };
    case 'SET_REMOVE_PAYMENT_METHODS':
      return {
        ...state,
        paymentMethods: state.paymentMethods.filter(
          (f) => f.key !== action.key
        ),
      };
    case 'SET_CHOSE_PAYMENT_METHODS_MODE':
      return {
        ...state,
        choseMode: action.choseMode,
      };
    default:
      return state;
  }
}
