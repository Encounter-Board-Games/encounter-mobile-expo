import styled from "styled-components";
import { Platform } from "react-native";
import Constants from "expo-constants";

export const MainContainer = styled.View`
flex: 1;
width: 100%;
padding-left: ${(props) => props.theme.space.space3}
padding-right: ${(props) => props.theme.space.space3}
padding-top: ${(props) =>
  Platform.OS == "ios"
    ? Constants.statusBarHeight + "px"
    : props.theme.space.space2};
`;

export const TextLine = styled.View`
  width: 100%;
  flex-flow: row;
  margin-bottom: ${(props) => props.theme.space.space2};
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
  backgroundcolor: ${(props) => props.theme.colors.primaryDarkColor};
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