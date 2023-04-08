import React, { useEffect } from "react";
import styled from "styled-components";
import EditProfileContent from "./EditProfileContent";
import { H2 } from "../../components/Typography";
import { Space } from "../../components/Space";
import Constants from "expo-constants";
import { getBottomSpace } from "react-native-iphone-x-helper";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { openCart } from "../../store/actions/info";
import { handleOpenCart } from "../../store/actions/cart";

const Container = styled.View`
  width: 100%;
  height: 100%;
  padding-bottom: 16px;
`;

const Header = styled.View`
  padding-top: 24px;
  padding-left: 16px;
  padding-right: 16px;
`;

export default () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleOpenCart(false));
  }, []);

  return (
    <Animatable.View
      animation="fadeInUp"
      style={{ height: "100%", width: "100%" }}
    >
      <Container>
        <Header>
          <H2>Complete suas informações abaixo:</H2>
        </Header>

       
        <EditProfileContent navigation={navigation} hasTerms />
      </Container>
    </Animatable.View>
  );
};
