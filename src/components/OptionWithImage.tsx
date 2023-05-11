import * as React from 'react';
import styled, { ThemeProps } from 'styled-components/native';
import { H4, H3 } from './Typography';
import { Image, TouchableOpacity } from 'react-native';

interface Props {
  isActive: boolean;
  text: string;
  image: string;
  onPress: () => void;
}

const OptionWithImageTouch = styled.TouchableOpacity<{ isActive: boolean }>`
  padding: ${(props) => props.theme.space.s2};
  padding-top: ${(props) => props.theme.space.s2};
  padding-bottom: ${(props) => props.theme.space.s2};
  border-radius: ${(props) => props.theme.borderRadius.button};
  border: 1.5px;
  border-color: ${(props) =>
    props.isActive
      ? props.theme.colors.primary
      : props.theme.colors.secondColor};
  margin-bottom: ${(props) => props.theme.space.s2};
  background-color: ${(props) =>
    props.isActive ? props.theme.colors.primaryLight : 'transparent'};
  height: 120px;
`;

const Content = styled.View`
  flex: 1;
  height: 100%;
  justify-content: center;
  flex-wrap: wrap;
`;

const Line = styled.View`
  flex-flow: row;
  align-items: flex-start;
`;

const ImageContent = styled.View`
  align-items: flex-start;
  justify-content: flex-end;
  height: 100%;
  padding-right: ${(props) => props.theme.space.s2};
  width: 50%;
`;

function OptionWithImage(props: Props & ThemeProps<any>) {
  const { isActive, text, image, onPress } = props;

  return (
    <OptionWithImageTouch isActive={isActive} onPress={onPress}>
      <Line>
        <ImageContent>
          <Image
            resizeMode="contain"
            style={{
              width: '100%',
              height: '100%',
              flex: 1,
            }}
            source={{ uri: image }}
          />
        </ImageContent>
        <Content>
          {isActive ? (
            <H3 bold type="primaryDark" style={{ width: '100%' }}>
              {text}
            </H3>
          ) : (
            <H4 type="seconddark" style={{ width: '100%' }}>
              {text}
            </H4>
          )}
        </Content>
      </Line>
    </OptionWithImageTouch>
  );
}

export default OptionWithImage;
