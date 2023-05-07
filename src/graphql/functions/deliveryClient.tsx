import { useQuery, useMutation } from '@apollo/client';
import {
  getAddressByLatLongQuery,
  getAddressBySearcQuery,
  addAddressMutation,
  editAddressMutation,
  removeAddressMutation,
} from '../queries/user';
import { deliveryTaxesQuery } from '../queries/cart';

export function useAddressByLatLong(lat: number, long: number) {
  const { data } = useQuery(getAddressByLatLongQuery, {
    variables: { lat, long },
    onError: console.log,
  });
  return data?.getAddressByLatLong;
}

export function useAddressBySearch(search: string) {
  const { data } = useQuery(getAddressBySearcQuery, {
    variables: { search },
    onError: console.log,
  });
  return data?.getAddressBySearch;
}

export function useAddAddress() {
  const [addAddress] = useMutation(addAddressMutation);
  return (body: any) => {
    return addAddress({ variables: body }).then(
      (resp: { data: { addAddress: any } }) => resp.data.addAddress
    );
  };
}

export function useEditAddress() {
  const [editAddress] = useMutation(editAddressMutation);
  return (key: string, body: any) => {
    return editAddress({ variables: { ...body, key } }).then(
      (resp: { data: { editAddress: any } }) => resp.data.editAddress
    );
  };
}

export function useRemoveAddress() {
  const [removeAddress] = useMutation(removeAddressMutation);
  return (key: string) => {
    return removeAddress({ variables: { key } }).then(
      (resp: { data: { removeAddress: any } }) => resp.data.removeAddress
    );
  };
}

export function useDeliveryTaxes() {
  const { data } = useQuery(deliveryTaxesQuery, {
    onError: console.log,
  });
  return (
    takeType: string,
    leaveType: string,
    takeZipcode: string,
    leaveZipcode: string
  ) => {
    return data?.deliveryTaxes({
      variables: { leaveType, takeType, takeZipcode, leaveZipcode },
    });
  };
}
