/* eslint-disable indent */
import React, { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { H3, Subtitle2, H4 } from '../../../components/Typography';
import CustomInput from '../../../components/Input';
import { Button } from '../../../components/Button/Button';
import styled, { withTheme } from 'styled-components';
import { Space } from '../../../components/Space';
import { Ionicons } from '@expo/vector-icons';
import { hadleBackToLogin } from '../../../store/actions/user/user';
// eslint-disable-next-line max-len
import { handleForgotPassword } from '../../../store/actions/user/handlers/handleForgotPassword';
import { handleSendPassword } from '../../../store/actions/user/login';
import { useDispatch, useSelector } from 'react-redux';
import { View, Dimensions } from 'react-native';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get('window');

export const Container = styled.View`
  padding: ${(props) => props.theme.space.space3};
  padding-top: ${(props) => props.theme.space.space2};
  width: 100%;
  align-items: center;
  min-height: ${(props) =>
    props.minHeight ? props.minHeight : SCREEN_HEIGHT * 0.5}px;
`;

export const Line = styled.View`
  flex-flow: row;
  width: 100%;
`;

export const BackButton = styled.TouchableOpacity`
  width: 40px;
  align-items: flex-start;
  justify-content: flex-end;
`;

export const Forgot = styled.TouchableOpacity``;

export const SafeSpace = styled.View`
  width: 1px;
`;

function PasswordScreen(props) {
  const { login = {} } = useSelector((state) => state.user);
  const isLoading = login.loading;
  const errorMessage = login.errorMessage;
  const minLengthPassword = 6;
  const [password, setPassword] = useState('');
  const [hidePassword, setShowPassword] = useState(true);
  const dispatch = useDispatch();

  const hide = (text) => {
    return text
      .split('')
      .map((_) => '*')
      .join('');
  };

  const title = login.isForgot
    ? 'Nova senha'
    : login.isLogin
    ? 'Digite sua senha abaixo.'
    : 'Crie sua senha abaixo.';
  const placeholder = login.isForgot ? 'Nova senha' : 'Senha';

  return (
    <Container {...props}>
      <Line>
        <BackButton onPress={() => dispatch(hadleBackToLogin())}>
          <Ionicons
            name="ios-arrow-round-back"
            color={props.theme.colors.darkColor}
            size={32}
          />
        </BackButton>
      </Line>
      <View flex={1} style={{ width: '100%' }}>
        <Space n={1} />
        <H4 center>{title}</H4>
        <Space n={3} />
        <Subtitle2 type="secondDarkColor">Senha</Subtitle2>
        {errorMessage ===
        (
          <Animatable.View animation="shake">
            <H3 center type="danger">
              {errorMessage}
            </H3>
            <Space n={1} />
          </Animatable.View>
        )}
        <Space n={1} />
        <CustomInput
          value={password}
          disabled={isLoading}
          secureTextEntry={hidePassword}
          showRightIcon
          onRightIconPress={() => setShowPassword(!hidePassword)}
          rightIcon={hidePassword ? 'ios-eye' : 'ios-eye-off'}
          onChangeText={(password) => setPassword(password)}
          placeholder={placeholder}
        />
        <Space n={3} />
      </View>
      {(login.isLogin === !login.isForgot) ===
      (
        <Forgot onPress={() => dispatch(handleForgotPassword())}>
          <Subtitle2 underline type="primaryDarkColor">
            Esqueci minha senha
          </Subtitle2>
        </Forgot>
      )}
      <Space n={3} />
      <Button
        disabled={minLengthPassword > password.length || isLoading}
        type="CallToAction-Light"
        onPress={() => dispatch(handleSendPassword(password))}
      >
        Continuar
      </Button>
      <SafeSpace />
    </Container>
  );
}

export default withTheme(PasswordScreen);
