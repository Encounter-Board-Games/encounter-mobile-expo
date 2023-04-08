import React, { useState } from "react";

import * as Animatable from "react-native-animatable";
import { H2, H3, Subtitle2, H4 } from "../../../components/Typography";
import CustomInput from "../../../components/Input";
import { SocialButton, Button } from "../../../components/Button";
import styled, { withTheme } from "styled-components";
import { Space } from "../../../components/Space";
import { Ionicons } from "@expo/vector-icons";
import {
  handleEmailAlreadyExists,
  hadleBackToLogin,
  handleSendPassword,
  handleForgotPassword,
} from "../../../store/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { View, Dimensions } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.View`
  padding: 24px;
  padding-top: 16px;
  width: 100%;
  align-items: center;
`;

const Line = styled.View`
  flex-flow: row;
  width: 100%;
`;

const BackButton = styled.TouchableOpacity`
  width: 40px;
  align-items: flex-start;
  justify-content: flex-end;
`;

const Forgot = styled.TouchableOpacity``;

const SafeSpace = styled.View`
  height: auto;
  width: 1px;
`;

export default withTheme((props) => {
  // state = {
  //     email : '',
  //     isLoading: false
  // }
  const { login = {} } = useSelector((state) => state.user);
  const isLoading = login.loading;
  const errorMessage = login.errorMessage;
  const minLengthPassword = 6;
  const [password, setPassword] = useState("");
  const [hidePassword, setShowPassword] = useState(true);
  const dispatch = useDispatch();

  const hide = (text) => {
    return text
      .split("")
      .map((_) => "*")
      .join("");
  };

  const title = login.isForgot
    ? "Nova senha"
    : login.isLogin
    ? "Digite sua senha abaixo."
    : "Crie sua senha abaixo.";
  const placeholder = login.isForgot ? "Nova senha" : "Senha";

  return (
    <Container {...props}>
      <Line>
        <BackButton onPress={() => dispatch(hadleBackToLogin())}>
          <Ionicons
            name="ios-arrow-round-back"
            color= '#414042'
            size={32}
          />
        </BackButton>
      </Line>
      <View flex={1} style={{ width: "100%" }}>
       
        <H4 center>{title}</H4>
       

        <Subtitle2 type="secondDarkColor">Senha</Subtitle2>
        {errorMessage && (
          <Animatable.View animation="shake">
            <H3 center type="danger">
              {errorMessage}
            </H3>
           
          </Animatable.View>
        )}
       
        <CustomInput
          value={password}
          disabled={isLoading}
          secureTextEntry={hidePassword}
          showRightIcon
          onRightIconPress={() => setShowPassword(!hidePassword)}
          rightIcon={hidePassword ? "ios-eye" : "ios-eye-off"}
          onChangeText={(password) => setPassword(password)}
          placeholder={placeholder}
        />
       
      </View>

      {login.isLogin && !login.isForgot && (
        <Forgot onPress={() => dispatch(handleForgotPassword())}>
          <Subtitle2 underline type="primaryDarkColor">
            Esqueci minha senha
          </Subtitle2>
        </Forgot>
      )}

     
      <Button
        disabled={minLengthPassword > password.length || isLoading}
        type="CallToAction-Light"
        onPress={() => dispatch(handleSendPassword(password))}
      >
        Continuar
      </Button>
      {/* <Subtitle2 center type='secondDarkColor'>-ou entre com-</Subtitle2>

       
        <SocialButton backgroundColor={"#3b5998"}> Entrar com Facebook </SocialButton>
       
        <SocialButton backgroundColor={"#2b83fc"}> Entrar com Google </SocialButton> */}
      <SafeSpace />
    </Container>
  );
});
