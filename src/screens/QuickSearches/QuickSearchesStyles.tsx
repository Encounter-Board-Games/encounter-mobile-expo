import styled from 'styled-components';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

interface Props {
  theme: {
    colors: {
      lightColor: string;
    };
    space: {
      space2: string;
      space3: string;
    };
  };
}

export const Container = styled.View<Props>`
  flex: 1;
  width: 100%;
  background-color: ${(props) => props.theme.colors.lightColor};
  padding-left: ${(props) => props.theme.space.space3};
  padding-right: ${(props) => props.theme.space.space3};
  padding-top: ${(props) =>
    Platform.OS == 'ios'
      ? Constants.statusBarHeight + 'px'
      : props.theme.space.space2};
`;

export const Content = styled.View`
  flex: 1;
`;

export const ImageContent = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Footer = styled.View`
  width: 100%;
`;

export const Tags = styled.View`
  flex-flow: row;
  flex-wrap: wrap;
`;

export const KnowInfo = styled.TouchableOpacity`
  flex-flow: row;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const Cancel = styled.TouchableOpacity``;
