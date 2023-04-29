import React, { useEffect, useState } from 'react';
import styled, { withTheme } from 'styled-components';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProductStatus from './ProductStatus';
import { useSelector, useDispatch } from 'react-redux';
import { handleSetCurrentProduct } from '../../../store/actions/product';

import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from 'rn-placeholder';
import { Space } from '../../../components/Space';
import { Subtitle3 } from '../../../components/Typography';
// eslint-disable-next-line max-len
import { handleRememberProduct } from '../../../store/actions/user/handlers/handleRememberProducts';
import { View } from 'react-native-animatable';

export const ProductImage = styled.View`
  width: ${(props) => (props.spotlight ? 200 : 140)}px;
  min-height: ${(props) => (props.spotlight ? 200 : 140)}px;
  min-width: ${(props) => (props.spotlight ? 200 : 140)}px;
  max-height: ${(props) => (props.spotlight ? 200 : 140)}px;
  max-width: ${(props) => (props.spotlight ? 200 : 140)}px;
`;

export const Container = styled.TouchableOpacity`
  width: ${(props) => (props.spotlight ? 200 : 140)}px;
  min-height: 10px;
  ${(props) =>
    props.flex ? 'flex: 1;' : `margin-left: ${props.theme.space.space2}`}
`;

export const Content = styled.View``;

export const ProductPrice = styled.Text`
  max-width: 100%;
  font-size: ${(props) => props.theme.sizes.subtitle2};
  font-family: Nunito;
  color: ${(props) => props.theme.colors.darkColor};
`;

export const ProductStatusContent = styled.Text``;

function ProductItem(props) {
  const products = useSelector((state) => state.products.products);
  const { rememberProductKeys = [] } = useSelector((state) => state.user);
  const product = products[props.id];
  const [showImage, setShowImage] = useState(false);
  const hasAlert = rememberProductKeys.includes(props.id);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const openProduct = () => {
    props.onPress && props.onPress();
    dispatch(handleSetCurrentProduct(props.id));
    navigation.navigate('ProductDetails');
  };

  useEffect(() => {
    if (props.showImage) setShowImage(props.showImage);
  }, [props.showImage]);
  const Subtitle3Size = +props.theme.sizes.subtitle3.replace('px', '');

  if (props.isLoading)
    return (
      <Container {...props}>
        <Placeholder style={{ flex: 1 }} Animation={Fade}>
          <View style={{ alignItems: 'center' }}>
            <ProductImage>
              <PlaceholderMedia size={'100%'} />
            </ProductImage>
          </View>
          <Space n={0} />
          <PlaceholderLine noMargin height={Subtitle3Size * 2} />
          <Space n={1} />
          {props.showPrice && (
            <PlaceholderLine noMargin height={Subtitle3Size * 1.5} />
          )}
          <Space n={0} />
          {!props.spotlight && (
            <PlaceholderLine noMargin height={Subtitle3Size * 1.5} />
          )}
        </Placeholder>
      </Container>
    );

  if (!product) return <Container {...props}></Container>;

  return (
    <Container {...props} onPress={() => openProduct()}>
      <View style={{ alignItems: 'center' }}>
        <ProductImage spotlight={props.spotlight}>
          {showImage && (
            <Image
              resizeMode="center"
              style={{ height: '100%', width: '100%' }}
              source={{ uri: product.mainImage }}
            />
          )}
        </ProductImage>
      </View>
      <Space n={0} />
      <Content style={{ flex: props.noFlex ? undefined : 1 }}>
        <Subtitle3
          numberOfLines={props.numberOfLines ? props.numberOfLines : 2}
        >
          {product.name}
        </Subtitle3>
      </Content>
      {(props.showPrice || !props.spotlight) && <Space n={1} />}

      {props.showPrice && (
        <ProductPrice>{product.priceValueFormated}</ProductPrice>
      )}
      {!props.spotlight && (
        <ProductStatus
          onPress={() => dispatch(handleRememberProduct(product.key))}
          hasAlert={hasAlert}
          company={product.age}
          rememberMe={props.showRemember && !product.available}
          available={product.available}
        />
      )}
    </Container>
  );
}

export default withTheme(ProductItem);
