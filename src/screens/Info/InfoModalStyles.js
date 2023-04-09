import { TouchableOpacity } from 'react-native';
import { getBottomSpace } from "react-native-iphone-x-helper";
import styled from "styled-components";


export const Container = styled.View`
  padding: ${(props) => props.theme.space.space2};
  background: ${(props) => props.theme.colors.lightColor};
  flex: 1;
  width: 100%;
  flex-wrap: wrap;
`;

export const Header = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.lightColor};
  position: relative;
  justify-content: center;
  align-items: center;
  padding-right: 40px;
  padding-left: 40px;
`;

export const CloseButton = styled.View`
  position: absolute;
  top: 0;
  left: 0px;
  background-color: ${(props) => props.theme.colors.lightColor};
  height: 100%;
  width: 40px;
  justify-content: center;
  align-items: flex-start;
`;

export const Content = styled.View`
  flex: 1;
  width: 100%;
`;

export const SafeSpace = styled.View`

  width: 1px;
`;

