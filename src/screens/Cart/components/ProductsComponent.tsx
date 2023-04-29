/* eslint-disable indent */
import React from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { withTheme } from 'styled-components';
import { H3, H4, Subtitle2 } from '../../../components/Typography';
import { Space } from '../../../components/Space';
// eslint-disable-next-line max-len
import { handleRemoveProductConfirmModal } from '../../../store/actions/cart/cartRemoveProductConfirmModal';
import { LineProducts, Remove, Title, Hr } from './CartInfoStyles';
import { translation } from '../../../texts';
import { currencyFormat } from '../../../utils/helpers';
import { ProductsComponentProps, CartState, Product } from './CartTypes';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { RootState } from '../../../types/globals';

const ProductsComponent: React.FC<ProductsComponentProps> = ({
  theme,
  renew,
}) => {
  const {
    cart = {
      renew: false,
      products: [],
      subtotal: 0,
      delivery: undefined,
      sizes: undefined,
      isLoading: false,
    },
    products,
  }: CartState = useSelector((state: CartState) => state);
  const { sizes = {} } = cart;
  const productList: Product[] = (cart.products || []).map(
    (key) => products.products[key]
  );
  const dispatch = useDispatch();

  const removeProduct =
    (key: string) =>
    async (
      dispatch: ThunkDispatch<RootState, unknown, Action<string>>
    ): Promise<any> => {
      await dispatch(handleRemoveProductConfirmModal(key));
    };

  const size = (key: string) => {
    if (sizes[key]) return <H3>{sizes[key]} - </H3>;
    return '';
  };

  return (
    <View>
      {!renew && <Space n={2} />}
      <H3 type="secondDarkColor">
        {renew ? 'Renovação de aluguel' : translation('orders.products')}
      </H3>
      <Space n={2} />
      {productList.map((product, index) => (
        <React.Fragment key={product.key}>
          <LineProducts>
            {!renew && (
              <Remove onPress={() => dispatch(removeProduct(product.key))}>
                {' '}
                <AntDesign
                  color={theme.colors.danger}
                  name="closecircleo"
                  size={24}
                />
              </Remove>
            )}

            <Title>
              <H4 numberOfLines={1}>
                {size(product.key)}
                {product.name}
              </H4>
            </Title>
            <H4>
              {product.priceValueFormated
                ? product.priceValueFormated
                : currencyFormat(product.priceValue)}
            </H4>
          </LineProducts>
          <Space n={0} />
        </React.Fragment>
      ))}

      {productList.length === 0 && (
        <Subtitle2 type="secondColor">Carrinho vazio</Subtitle2>
      )}

      <Space n={2} />
      <Hr />
    </View>
  );
};

export default withTheme(ProductsComponent);
