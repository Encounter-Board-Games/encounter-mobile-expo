import { useMutation, useQuery, FetchResult } from '@apollo/client';
import { getLastPaymentIdQuery } from '../queries/cart';
import {
  paymentMethodsQuery,
  createPaymentMethodMutation,
  removePaymentMethodMutation,
} from '../queries/payment';

export function useLastPaymentId() {
  const { data } = useQuery(getLastPaymentIdQuery);
  return data?.getLastPaymentId;
}

export function usePaymentMethods() {
  const { data } = useQuery(paymentMethodsQuery);
  return data?.paymentMethods;
}

export function useCreatePaymentMethod() {
  const [createPaymentMethod] = useMutation(createPaymentMethodMutation);
  return (
    card_number: string,
    card_expiration_date: string,
    card_holder_name: string,
    card_cvv: string,
    card_document: string
  ) => {
    return createPaymentMethod({
      variables: {
        card_number,
        card_expiration_date,
        card_holder_name,
        card_cvv,
        card_document,
      },
    }).then((resp: FetchResult<{ createPaymentMethod: any }>) => {
      return resp.data?.createPaymentMethod;
    });
  };
}

export function useRemovePaymentMethod() {
  const [removePaymentMethod] = useMutation(removePaymentMethodMutation);
  return (key: string) => {
    return removePaymentMethod({ variables: { key } }).then(
      (resp: FetchResult<{ removePaymentMethod: any }>) =>
        resp.data?.removePaymentMethod
    );
  };
}
