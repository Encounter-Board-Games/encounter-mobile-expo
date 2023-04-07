import { Platform } from "react-native";
import "react-native-gesture-handler";
import styled from "styled-components";


export const Container = styled.View`
  flex: 1;
  background: ${(props) => props.theme.colors.lightColor};
  padding-top: ${(props) =>
    Platform.OS === "ios" ? props.theme.space.space4 : 0};
`;

export const LoadView = styled.View`
  background-color: ${(props) => props.theme.colors.primaryDarkColor};
`;