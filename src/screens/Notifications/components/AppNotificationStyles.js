import styled from "styled-components";
import Constants from "expo-constants";
import {
  Platform,
} from "react-native";

export const Container = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
    background:  ${(props) => props.theme.colors[props.type]};
    padding-top: ${Platform.OS == "ios" ? Constants.statusBarHeight : 8}px
    padding-bottom: ${(props) => props.theme.space.space1}
    border-radius: 8px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
`;
export const Notification = styled.View`
    min-height:  ${(props) => props.theme.sizes.notification};
    width: 100%
    align-items: center;
    justify-content: center;
`;

export const Message = styled.Text`
    font-family: Nunito-Bold
    font-size: ${(props) => props.theme.sizes.subtitle2};
    color: ${(props) =>
      props.type == "success"
        ? props.theme.colors.darkColor
        : props.theme.colors.lightColor}
`;

