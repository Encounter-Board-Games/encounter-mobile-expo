export interface AddressLocation {
  street: string;
  city: string;
  state: string;
}

export interface Address {
  active: boolean;
}

export interface Addresses {
  [key: string]: Address;
}

export interface Props {
  theme: any;
}

export interface CurrentLocation {
  cep: string;
  key: string;
  name: string;
  complement: string;
  number: string;
  reference: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface AddressState {
  cep: string;
  number: string;
  complement: string;
  reference: string;
  name: string;
  isEdit: boolean;
}
