import { useQuery, useMutation } from '@apollo/client';
import {
  getProductQuery,
  ProductsQuery,
  deliveryOptionsQuery,
  createOrderMutation,
} from '../queries/shelves';
import { ToggleFavoriteMutation } from '../queries/user';
import { evaluateProductMutation } from '../queries/product';
import { applyCuponMutation } from '../queries/cupons';

export function useGetProduct(id: string) {
  const { loading, error, data } = useQuery(getProductQuery, {
    variables: { id },
    onError: (e: any) => console.log('error', e),
  });

  return { loading, error, product: data?.product?.product };
}

export function useGetProducts(filter: any, text: string) {
  const { loading, error, data } = useQuery(ProductsQuery, {
    variables: { ...filter, text },
    onError: (e: any) => console.log('error', e),
  });

  return { loading, error, products: data?.products };
}

export function useToggleFavorite() {
  const [toggleFavorite] = useMutation(ToggleFavoriteMutation);

  return (productId: string) => {
    toggleFavorite({ variables: { productId } });
  };
}

export function useDeliveryOptions() {
  const { loading, error, data } = useQuery(deliveryOptionsQuery);

  return { loading, error, deliveryOptions: data?.deliveryOptions };
}

export function useCreateOrder() {
  const [createOrder] = useMutation(createOrderMutation);

  return (input: any) => {
    return createOrder({ variables: input }).then(
      (resp: { data: { createOrder: any } }) => resp.data?.createOrder
    );
  };
}

export function useEvaluateProduct() {
  const [evaluateProduct] = useMutation(evaluateProductMutation);

  return (key: string, evaluation: number) => {
    return evaluateProduct({ variables: { key, evaluation } }).then(
      (resp: { data: { evaluateProduct: any } }) => resp.data?.evaluateProduct
    );
  };
}

export function useApplyCupon() {
  const [applyCupon] = useMutation(applyCuponMutation, {
    fetchPolicy: 'no-cache',
  });

  return (productSum: number, keys: string[]) => {
    return applyCupon({ variables: { productSum, keys } }).then(
      (resp: { data: { applyCupon: any } }) => resp.data?.applyCupon
    );
  };
}
