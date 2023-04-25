import React from 'react';
import styled from 'styled-components';
import CartMarker from '../screens/Cart/components/CartMarker';
import { useSelector } from 'react-redux';
import { RootState } from '../types/globals';

interface MainContainerProps {
  children: React.ReactNode;
  noScroll?: boolean;
}

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.lightColor};
  flex: 1;
`;

const ScrollContainer = styled.div`
  flex: 1;
  background-color: blue;
  overflow: auto;
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
