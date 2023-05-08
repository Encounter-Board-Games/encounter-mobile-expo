import React from 'react';
import styled from 'styled-components/native';
import CartMarker from '../screens/cart/components/CartMarker';
import { useSelector } from 'react-redux';
import { RootState } from '../types/globals';

export interface MainContainerProps {
  children: React.ReactNode;
  noScroll?: boolean;
}

export const Container = styled.View`
  background-color: ${(props: { theme: { colors: { lightColor: any } } }) =>
    props.theme.colors.lightColor};
  flex: 1;
`;

export const ScrollContainer = styled.ScrollView`
  flex: 1;
  background-color: blue;
`;

const MainContainer: React.FC<MainContainerProps> = ({
  children,
  noScroll,
}) => {
  const cart = useSelector((state: RootState) => state.cart);
  const hasCart = cart.products.length !== 0 && !cart.renew;

  return (
    <Container>
      {noScroll ? children : <ScrollContainer>{children}</ScrollContainer>}
      {hasCart && <CartMarker />}
    </Container>
  );
};

export default MainContainer;
