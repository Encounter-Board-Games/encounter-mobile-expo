import React from "react";
import styled from "styled-components/native";
import CartMarker from "../screens/Cart/components/CartMarker";
import { useSelector } from "react-redux";

const Container = styled.View`
  background-color: ${(props) => props.theme.colors.lightColor};
  flex: 1;
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
  background-color: blue;
`;

const MainContainer = ({ children, noScroll }) => {
  const cart = useSelector((state) => state.cart);
  const hasCart = cart.products.length !== 0 && !cart.renew;

  return (
    <Container>
      {noScroll ? (
        children
      ) : (
        <ScrollContainer>
          {children}
        </ScrollContainer>
      )}
      {hasCart && <CartMarker />}
    </Container>
  );
};

export default MainContainer;
