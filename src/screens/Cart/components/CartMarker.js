import React from "react";
import styled from "styled-components";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { useDispatch, useSelector } from "react-redux";
import { openCart } from "../../../store/actions/info";
import { currencyFormat } from "../../../utils/helpers";
import { View } from "react-native-animatable";
import { translation } from "../../../texts";
import { handleOpenCart } from "../../../store/actions/cart";

const PriceContent = styled.View`
  flex: 1;
  flex-flow: row;
`;

const Container = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-left: 16px;
  padding-right: 16px;
  background:  #414042;
  flex-flow: row;
`;
const Price = styled.Text`
  font-family: Nunito-Bold;
  font-size: 16px;
  color: "#FAFAFA";
`;
const PriceItem = styled.Text`
  font-family: Nunito;
  font-size: 16px;
  color: "#FAFAFA";
`;

const Button = styled.TouchableOpacity`
  background: "#FAFAFA";
  padding-left: 24px;
  padding-right: 24px;
  margin-top: 8px;
  margin-bottom: 8px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: "8px";
`;
const ButtonText = styled.Text`
  font-family: Nunito;
  font-size: 16px;
  color:  #414042;
`;

export default (props) => {
  const dispatch = useDispatch();
  const { total = 0, time = undefined, products = [] } = useSelector(
    (state) => state.cart
  );
  const countItems =
    products.length == 1 ? "1 item" : `${products.length} itens`;
  return (
    <Container>
      <PriceContent flex={1} style={{ flexFlow: "row" }}>
        <Price>{currencyFormat(total)}</Price>
        {time && (
          <PriceItem>
            {translation("cart.minimezedText", { time, countItems })}
          </PriceItem>
        )}
      </PriceContent>
      <Button onPress={() => dispatch(handleOpenCart())}>
        <ButtonText>{translation("cart.openCart")}</ButtonText>
      </Button>
    </Container>
  );
};
