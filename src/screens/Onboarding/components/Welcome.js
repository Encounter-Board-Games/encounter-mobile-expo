import React from 'react';
import styled from 'styled-components';
import { Space, Bottom } from '../../../components/Space';
import { H1, H4, H3 } from '../../../components/Typography';
import { Image } from 'react-native';
import { Button } from '../../../components/Button/Button';
import { useDispatch } from 'react-redux';
import { handleLoginOnboard } from '../../../store/actions/onboarding';
import { API_URI } from '../../../graphql/client';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

export const MainContainer = styled.View`
flex: 1;
width: 100%;
padding-left: ${(props) => props.theme.space.s3}
padding-right: ${(props) => props.theme.space.s3}
padding-top: ${(props) =>
    Platform.OS == 'ios'
      ? Constants.statusBarHeight + 'px'
      : props.theme.space.s2};
`;

export const TextLine = styled.View`
  width: 100%;
  flex-flow: row;
  margin-bottom: ${(props) => props.theme.space.s2};
`;

export const TextItemList = styled.View`
  width: 20px;
  align-items: flex-start;
  justify-content: center;
`;

export const TextItemListIcon = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 12px;
  backgroundcolor: ${(props) => props.theme.colors.primaryDark};
`;

export const TextContent = styled.Text`
  flex: 1;
  flex-flow-: row;
`;

export const ImageContent = styled.View`
  flex: 1;
  min-height: 88px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const PaddingTop = styled.View`
  width: 100%;
`;

export const Content = styled.View`
  flex: 1;
`;

export const Footer = styled.View``;

export const ButtonsRow = styled.View`
  flex-flow: row;
  justify-content: flex-end;
`;

export default ({
  onNext,
  title,
  texts,
  footerText,
  cancelBtn,
  showListStyle,
  okBtn,
  img,
}) => {
  const dispatch = useDispatch();

  return (
    <MainContainer>
      <Content>
        <Space n={3} />
        <H1>{title}</H1>
        <Space n={3} />
        {texts.map((text, i) => (
          <TextLine key={i}>
            {showListStyle ===
            (
              <TextItemList>
                <TextItemListIcon />
              </TextItemList>
            )}
            <TextContent>
              {text
                .split('*')
                .map((text, index) =>
                  index % 2 == 0 ? (
                    <H4 key={index}>{text}</H4>
                  ) : (
                    <H3 key={index}>{text}</H3>
                  )
                )}
            </TextContent>
          </TextLine>
        ))}
        <Space n={4} />
        <ImageContent>
          <Image
            resizeMode={'contain'}
            style={{ height: '100%', width: '75%' }}
            source={{ uri: API_URI + '/' + img }}
          />
        </ImageContent>
      </Content>
      <Footer>
        <Space n={4} />
        {footerText ===
        (
          <React.Fragment>
            <H1>{footerText}</H1>
            <Space n={3} />
          </React.Fragment>
        )}
        <ButtonsRow>
          <Button
            width={cancelBtn ? 'auto' : '100%'}
            type="CallToAction-Light"
            onPress={() => onNext()}
          >
            {okBtn}
          </Button>
        </ButtonsRow>

        {cancelBtn ===
        (
          <React.Fragment>
            <Space n={2} />
            <ButtonsRow>
              <Button
                onPress={() => dispatch(handleLoginOnboard())}
                type="CallToAction-Outline"
              >
                {cancelBtn}
              </Button>
            </ButtonsRow>
          </React.Fragment>
        )}
      </Footer>
      <Bottom />
    </MainContainer>
  );
};
