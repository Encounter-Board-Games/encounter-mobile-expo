import React from 'react';
import styled from 'styled-components';
import { Space, Bottom } from '../../../components/Space';
import { H1, H4, H2, Subtitle2, H3 } from '../../../components/Typography';
import { Image, Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import Constants from 'expo-constants';
import { Button } from '../../../components/Button/Button';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native-animatable';
import { useDispatch } from 'react-redux';
import {
  handleLoginOnboard,
  handleFinishOnboarding,
} from '../../../store/actions/onboarding';

export const MainContainer = styled.View`
flex: 1;
width: 100%;
height: 100%
padding-left: ${(props) => props.theme.space.s3}
padding-right: ${(props) => props.theme.space.s3}
padding-top: ${(props) =>
  Platform.OS == 'ios'
    ? Constants.statusBarHeight + 'px'
    : props.theme.space.s2};

`;

export const Line = styled.View`
  width: 100%;
  flex-flow: row;
  align-items: center;
`;

export const Icon = styled.View`
    min-height: 20px;
    width: ${(props) => props.theme.space.s2}
    margin-right: ${(props) => props.theme.space.s1}
`;

export const ImageContent = styled.View`
  flex: 1;
  min-height: 88px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.View`
  flex: 1;
`;

export const Footer = styled.View``;

export const ButtonsRow = styled.View`
  flex-flow: column;
  align-items: flex-end;
`;

export default (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const letsGo = () => {
    dispatch(handleFinishOnboarding());
    dispatch(handleLoginOnboard());
  };
  const notNow = () => {
    dispatch(handleFinishOnboarding());
  };

  return (
    <MainContainer>
      <Content>
        <Space n={3} />
        <H1>Pronto, chega de perguntas!</H1>
        <Space n={3} />
        <H2>Na verdade, só mais uma coisinha…</H2>
        <Space n={3} />
        <H4 noBold>
          Para realizar o seu 1º aluguel, você precisa completar o seu cadastro
          com:
        </H4>

        <Space n={3} />
        <Line>
          <Icon>
            <Image
              resizeMode={'contain'}
              style={{ width: 20, height: 20 }}
              source={require('../../../assets/img/dado.png')}
            />
          </Icon>
          <Content>
            <Subtitle2 type="seconddark">
              Informações pessoais básicas;
            </Subtitle2>
          </Content>
        </Line>
        <Space n={2} />
        <Line>
          <Icon>
            <Image
              resizeMode={'contain'}
              style={{ width: 20, height: 20 }}
              source={require('../../../assets/img/dado.png')}
            />
          </Icon>
          <Content>
            <Subtitle2 type="seconddark">
              Selfie com documento de identidade.
            </Subtitle2>
          </Content>
        </Line>

        <Space n={4} />

        <H4>
          Essas informações passarão por análise e seu{' '}
          <H3>aluguel será efetivado depois da aprovação.</H3>
        </H4>
        <ImageContent></ImageContent>
        <H2>Bora completar seu cadastro agora?</H2>
        <Space n={3} />
      </Content>
      <Footer>
        <ButtonsRow>
          <View>
            <Button
              width="auto"
              disable={props.loading}
              type="CallToAction-Light"
              onPress={letsGo}
            >
              Bora!
            </Button>
          </View>
          <Space n={2} />
          <View>
            <Button
              width="auto"
              disable={props.loading}
              type="CallToAction-Outline"
              onPress={notNow}
            >
              Agora não
            </Button>
          </View>
        </ButtonsRow>
      </Footer>
      <Bottom />
    </MainContainer>
  );
};
