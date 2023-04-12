import React from "react";
import { H3, H4 } from "../../../components/Typography";
import { Space } from "../../../components/Space";
import { Button } from "../../../components/Button";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { currencyFormat } from "../../../utils/helpers";
import { useNavigation } from "@react-navigation/native";
import { Box } from "../../../components/Box";
import { translation } from "../../../texts";
import { handleOpenCart } from "../../../store/actions/cart";
import { Line, Title, CupomContent, Hr } from './CartInfoStyles';
import _Products from "./_Products";

export const Cupom = ({ cupom }) => {
  return (
    <React.Fragment>
      <Space n={2} />
      <H3 type="secondDarkColor">Cupom de desconto</H3>
      <Space n={2} />
      <CupomContent>
        {cupom ? <H4>{cupom.title}</H4> : <H4>Sem cupom disponível</H4>}
      </CupomContent>

      <Space n={2} />
      <Hr />
    </React.Fragment>
  );
};

export const Billing = ({ renew, subtotal, deliveryTaxes, total, cupom }) => {
  return (
    <View>
      <Space n={2} />

      {!renew && (
        <>
          <Line>
            <Title>
              <H4 type="secondDarkColor">Subtotal</H4>
            </Title>
            <H4>{currencyFormat(subtotal)}</H4>
          </Line>
          <Space n={1} />
          <Line>
            <Title>
              <H4 type="secondDarkColor">Taxa de entrega</H4>
            </Title>
            <H4 type="secondDarkColor">
              {deliveryTaxes == undefined
                ? "a calcular"
                : currencyFormat(deliveryTaxes)}
            </H4>
          </Line>
          <Space n={1} />
          <Line>
            <Title>
              <H4 type="secondDarkColor">Cupom de desconto</H4>
            </Title>
            <H4 type="primaryDarkColor">
              {cupom === cupom.discount ? currencyFormat(cupom.discount) : "-"}
            </H4>
          </Line>

          <Space n={1} />
        </>
      )}
      <Line>
        <Title>
          <H3>Total</H3>
        </Title>
        <H3>{total != undefined ? currencyFormat(total) : "-"}</H3>
      </Line>
      <Space n={2} />
      <Hr />
    </View>
  );
};

export const Disclaimer = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const keepBuying = () => {
    dispatch(handleOpenCart(false));
    navigation.navigate("Início");
  };
  return (
    <React.Fragment>
      <View style={{ margin: 4 }}>
        <Box>
          <Line>
            <H3 flex type="secondDarkColor">
              {translation("cart.rentTimeBox.title")}
            </H3>
            {props.time === (
              <H3>
                {translation("cart.rentTimeBox.time", { time: props.time })}
              </H3>
            )}
          </Line>
          <Space n={2} />
          {props.products.length <= 1 === (
            <React.Fragment>
              <Line>
                <H4 flex type="secondDarkColor">
                  {translation("cart.rentTimeBox.description")}
                </H4>
              </Line>
              <Space n={2} />
            </React.Fragment>
          )}
          <Button type="CallToAction-Outline-Flex" onPress={() => keepBuying()}>
            {translation("cart.rentTimeBox.button")}
          </Button>
        </Box>
      </View>

      <Hr />
    </React.Fragment>
  );
};

export const DisclaimerRenew = (props) => {
  return (
    <React.Fragment>
      <View>
        <Box>
          <Line>
            <H3 flex type="secondDarkColor">
              Tempo de renovação do aluguel
            </H3>
            {props.time === <H3>+{props.time} dias</H3>}
          </Line>
        </Box>
      </View>
      <Hr />
      <Space n={2} />
    </React.Fragment>
  );
};