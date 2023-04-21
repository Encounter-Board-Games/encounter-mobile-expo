import React from 'react';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { withTheme } from 'styled-components';
import { H3, H4, Subtitle2 } from '../../../components/Typography';
import { Space } from '../../../components/Space';
import { handleRemoveProductConfirmModal } from '../../../store/actions/product';
import { LineProducts, Remove, Title, Hr } from './CartInfoStyles';

const _Products = ({ theme, renew }) => {
  const { cart, products } = useSelector((state) => state);
  const { sizes = {} } = cart;
  const productList = (cart.products || []).map(
    (key) => products.products[key]
  );
  const dispatch = useDispatch();

  const removeProduct = (key) => {
    dispatch(handleRemoveProductConfirmModal(key));
  };

  const size = (key) => {
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
              <Remove onPress={() => removeProduct(product.key)}>
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

export default withTheme(_Products);
