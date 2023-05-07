import { useMutation, useQuery } from '@apollo/client';
import {
  createOrderMutation,
  ordersQuery,
  renewOrderMudation,
} from '../queries/cart';

export function useRenewOrder() {
  const [renewOrder] = useMutation(renewOrderMudation);
  return (key: string, payment: any) => {
    return renewOrder({ variables: { key, payment } }).then(
      (resp: { data: { renewOrderOcurring: any } }) =>
        resp.data.renewOrderOcurring
    );
  };
}

export function useCreateOrder() {
  const [createOrder] = useMutation(createOrderMutation);
  return (
    productKeys: string[],
    paymentKey: string,
    totalSumCart: number,
    cupomKey: string,
    takeDeliveryMethod: string,
    leaveDeliveryMethod: string,
    takeDeliveryAddressKey: string,
    leaveDeliveryAddressKey: string,
    productsOptions: any[]
  ) => {
    return createOrder({
      variables: {
        paymentKey,
        productKeys,
        totalSumCart,
        cupomKey,
        leaveDeliveryMethod,
        takeDeliveryMethod,
        takeDeliveryAddressKey,
        leaveDeliveryAddressKey,
        productsOptions,
      },
    })
      .catch(console.log)
      .then((resp: { data: { createOrder: any } }) => {
        return resp.data.createOrder;
      });
  };
}

export function useOrders() {
  const { data } = useQuery(ordersQuery);
  return data?.orders;
}
