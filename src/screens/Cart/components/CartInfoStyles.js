import React, { Component } from "react";
import { Subtitle2, H3, H4 } from "../../../components/Typography";
import styled, { withTheme } from "styled-components";
import { Space, SpaceHorizontal } from "../../../components/Space";
import { Button } from "../../../components/Button";
import { View, Dimensions } from "react-native";
import { useSelector, useDispatch, connect } from "react-redux";
import { currencyFormat } from "../../../utils/helpers";
import {
  handleRemoveProductConfirmModal,
  handleCheckOut,
} from "../../../store/actions/cart";
import { openLoginPopup } from "../../../store/actions/user";
import { Modalize } from "react-native-modalize";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Box } from "../../../components/Box";
import Constants from "expo-constants";
import Delivery from "./Delivery";
import {
  handleSetCartChoseAddress,
  handleSetCartChosePayment,
} from "../../../store/actions/shared";
import Payment from "./Payment";
import { translation } from "../../../texts";
import config from "../../../config";
import { handleOpenCart } from "../../../store/actions/cart";

export const Line = styled.View`
  flex: 1;
  flex-flow: row;
  align-items: center;
`;

export const Title = styled.View`
  flex: 1;
  padding-right: 8px;
`;

export const Remove = styled.TouchableOpacity`
    margin-right: ${(props) => props.theme.space.space1}
    justify-content:center;
    width: 24px;
    height: 24px;
`;

export const LineProducts = styled.View`
  flex-direction: row;
  width: 100%;
`;

export const CupomContent = styled.View`
    margin: 4px;
    padding: ${(props) => props.theme.space.space2}
    padding-top: ${(props) => props.theme.space.space1}
    padding-bottom: ${(props) => props.theme.space.space1}
    background: ${(props) => props.theme.colors.lightColor}
    border-radius: ${(props) => props.theme.borderRadius.button}
    shadow-color: ${(props) => props.theme.shadow.shadowColor};
    shadow-offset: ${(props) => props.theme.shadow.shadowOffset.width} ${(
  props
) => props.theme.shadow.shadowOffset.width} ;
    shadow-opacity: ${(props) => props.theme.shadow.shadowOpacity};
    shadow-radius: ${(props) => props.theme.shadow.shadowRadius};
    elevation: ${(props) => props.theme.shadow.elevation};
`;

export const Hr = styled.View`
  background: ${(props) => props.theme.colors.secondLightColor};
  height: 1.5px;
  width: 100%;
`;