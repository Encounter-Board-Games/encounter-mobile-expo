import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import Constants from 'expo-constants';

export const Container = styled.View`
  padding: ${({ theme }) => theme.space.space2};
  padding-top: ${({ theme }) => theme.space.space1};
`;

export const Logout = styled.TouchableOpacity`
  flex-flow: row;
  margin-top: ${({ theme }) => theme.space.space3};
  align-items: center;
`;

export const MainContainer = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  padding-left: ${(props) => props.theme.space.space3};
  padding-right: ${(props) => props.theme.space.space3};
  padding-top: ${(props) =>
    Platform.OS == 'ios'
      ? Constants.statusBarHeight + 'px'
      : props.theme.space.space2};
  padding-bottom: ${getBottomSpace() + 24 + 'px'};
  background: ${(props) => props.theme.colors.lightColor};
`;

export const Line = styled.View`
  width: 100%;
  flex-flow: row;
  align-items: center;
`;

export const Icon = styled.View`
  min-height: 20px;
  width: ${(props) => props.theme.space.space2};
  margin-right: ${(props) => props.theme.space.space1};
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

export const Footer = styled.View`
  padding-bottom: ${(props) => props.theme.space.space2};
`;

export const ButtonsRow = styled.View`
  flex-flow: row;
  justify-content: flex-end;
`;
