import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { currencyFormat } from '../../../utils/helpers';
import { translation } from '../../../texts';
import { handleOpenCart } from '../../../store/actions/cart';

export const PriceContent = styled.View`
  flex: 1;
  flex-flow: row;
`;

export const Container = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-left: ${(props) => props.theme.space.space2};
  padding-right: ${(props) => props.theme.space.space2};
  background: ${(props) => props.theme.colors.primaryDarkColor};
  flex-flow: row;
`;

export const Price = styled.Text`
  font-family: Nunito-Bold;
  font-size: ${(props) => props.theme.sizes.h3};
  color: ${(props) => props.theme.colors.lightColor};
`;

export const PriceItem = styled.Text`
  font-family: Nunito;
  font-size: ${(props) => props.theme.sizes.h3};
  color: ${(props) => props.theme.colors.lightColor};
`;

export const Button = styled.TouchableOpacity`
  background: ${(props) => props.theme.colors.lightColor};
  padding-left: ${(props) => props.theme.space.space3};
  padding-right: ${(props) => props.theme.space.space3};
  margin-top: ${(props) => props.theme.space.space1};
  margin-bottom: ${(props) => props.theme.space.space1};
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => props.theme.borderRadius.button};
`;

export const ButtonText = styled.Text`
  font-family: Nunito;
  font-size: ${(props) => props.theme.sizes.h3};
  color: ${(props) => props.theme.colors.darkColor};
`;

export default (props) => {
  const dispatch = useDispatch();
  const {
    total = 0,
    time = undefined,
    products = [],
  } = useSelector((state) => state.cart);
  const countItems =
    products.length == 1 ? '1 item' : `${products.length} itens`;
  return (
    <Container>
      <PriceContent flex={1} style={{ flexFlow: 'row' }}>
        <Price>{currencyFormat(total)}</Price>
        {time ===
        (
          <PriceItem>
            {translation('cart.minimezedText', { time, countItems })}
          </PriceItem>
        )}
      </PriceContent>
      <Button onPress={() => dispatch(handleOpenCart())}>
        <ButtonText>{translation('cart.openCart')}</ButtonText>
      </Button>
    </Container>
  );
};
