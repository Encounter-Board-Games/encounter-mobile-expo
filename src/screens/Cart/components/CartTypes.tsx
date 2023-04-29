export interface Cart {
  renew: boolean;
  products: any[];
  subtotal: number;
  delivery: any;
  sizes: Record<string, string>;
  deliveryTaxes?: number;
  total?: number;
  cupom?: any;
  time?: any;
  isLoading: boolean;
  payment?: any;
}

export interface CartState {
  cart: Cart;
  products: Record<string, Product>;
}

export interface Product {
  key: string;
  name: string;
  priceValue: number;
  priceValueFormated?: string;
}

export interface ProductsComponentProps {
  theme: any;
  renew: boolean;
}
