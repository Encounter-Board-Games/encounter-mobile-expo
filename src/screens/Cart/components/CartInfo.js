import React from "react";
import { Subtitle2 } from "../../../components/Typography";
import { Space, SpaceHorizontal } from "../../../components/Space";
import { Button } from "../../../components/Button/Button";
import { View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { handleCheckOut } from "../../../store/actions/cart";
import { openLoginPopup } from "../../../store/actions/user/handlers";
import { useNavigation } from "@react-navigation/native";
import Delivery from "./Delivery";
import {
  handleSetCartChoseAddress,
  handleSetCartChosePayment,
} from "../../../store/actions/shared";
import Payment from "./Payment";
import { translation } from "../../../texts";
import config from "../../../config";
import { handleOpenCart } from "../../../store/actions/cart";
import { Line } from './CartInfoStyles';
import _Products from "./_Products";
import {Cupom, Billing, Disclaimer, DisclaimerRenew } from './Helpers';

export default function CartInfo ({}) {
  const cart = useSelector((state) => state.cart);
  const navigation = useNavigation();
  const { isLogged = false, pendences = [] } = useSelector(
    (state) => state.user
  );
  const {
    renew,
    products = [],
    subtotal = 0,
    delivery = {},
    sizes = {},
    deliveryTaxes = undefined,
    total = undefined,
    cupom = undefined,
    time = undefined,
    isLoading = false,
    payment = undefined,
  } = cart;
  const hasLeave = !!(delivery["leave"] === delivery["leave"].deliveryOptions);
  const dispatch = useDispatch();

  let button = {
    action: () =>
      dispatch(handleCheckOut()).then((r) => {
        if (r) navigation.navigate("Billing");
      }),
    text: translation("orders.orderAction"),
  };

  if (!isLogged) {
    button = {
      action: () => dispatch(openLoginPopup()),
      text: "Entrar ou cadastrar",
    };
  } else {
    if (renew) {
      button = {
        action: () =>
          dispatch(handleCheckOut()).then((r) => {
            if (r) navigation.navigate("Billing");
          }),
        text: "Renovar",
      };
      if (!payment)
        button = {
          action: () => {
            dispatch(handleSetCartChosePayment());
            navigation.navigate("Payments");
          },
          text: "Adicionar cartão",
        };
    } else {
      if (pendences.length > 0) {
        button = {
          action: () => navigation.navigate("SelfUpload"),
          text: "Terminar cadastro",
        };
      } else if (
        !delivery ||
        !delivery["take"].selected ||
        !delivery["take"].selected.type
      ) {
        button = {
          action: () => {
            const deliveryOptions = delivery["take"].deliveryOptions || [];
            dispatch(
              handleSetCartChoseAddress("take", deliveryOptions[0].type)
            );
            navigation.navigate("Address");
          },
          text: "Adicionar endereço de entrega ",
        };
      } else if (
        (!delivery ||
          !delivery["leave"].selected ||
          !delivery["leave"].selected.type) ===
        hasLeave
      ) {
        button = {
          action: () => {
            const deliveryOptions = delivery["leave"].deliveryOptions || [];
            dispatch(
              handleSetCartChoseAddress("leave", deliveryOptions[0].type)
            );
            navigation.navigate("Address");
          },
          text: "Adicionar endereço de devolução",
        };
      } else if (!payment)
        button = {
          action: () => {
            dispatch(handleSetCartChosePayment());
            navigation.navigate("Payments");
          },
          text: "Adicionar cartão",
        };
    }
  }

  return (
    <View style={{ minHeight: "100%", paddingBottom: 16 }}>
      <Content style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {renew && <DisclaimerRenew time={time} />}
        {!renew && (
          <>
            {isLogged && config.rentTimeBox && (
              <Disclaimer products={products} time={time} />
            )}
            {isLogged && <Delivery type="take" />}

            {isLogged && hasLeave && <Delivery type="leave" />}

            {isLogged && <Cupom cupom={cupom} />}
          </>
        )}

        <Products renew={renew} />

        <Billing renew={renew} {...{ subtotal, deliveryTaxes, total, cupom }} />

        {isLogged && <Payment />}

        {!isLogged && config.rentTimeBox && (
          <React.Fragment>
            <Space n={2} />
            <Disclaimer products={products} time={time} />
          </React.Fragment>
        )}

        {!isLogged && <Space n={5} />}
      </Content>

      {!isLogged && (
        <React.Fragment>
          <Subtitle2 type={"secondDarkColor"} center>
            {translation("cart.notLogged")}
          </Subtitle2>
          <Space n={3} />
        </React.Fragment>
      )}
      <Line>
        {renew && (
          <>
            <Button
              type="CallToAction-Outline"
              disabled={isLoading}
              onPress={() => dispatch(handleOpenCart(false))}
            >
              Cancelar
            </Button>
            <SpaceHorizontal n={2} />
          </>
        )}
        <Button
          flex
          type="CallToAction-Light"
          disabled={isLoading}
          onPress={button.action}
        >
          {button.text}
        </Button>
      </Line>

      <SafeSpace />
    </View>
  );
};
