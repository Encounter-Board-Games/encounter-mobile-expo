import React from "react";
import styled from "styled-components";
import CartMarker from "../screens/Cart/components/CartMarker";
import { useSelector } from "react-redux";

export const Container = styled.View`
  background-color: ${(props) => props.theme.colors.lightColor};
  flex: 1;
`;

export const ScrollContainer = styled.ScrollView`
  flex: 1;
  background-color: blue;
`;

export default function MainContainer ({ children, noScroll }) {
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