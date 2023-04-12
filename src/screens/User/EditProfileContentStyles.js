import styled from "styled-components";

export const Content = styled.ScrollView`
  flex: 1;
  padding: ${(props) => props.theme.space.space2};
`;

export const ContainerInputs = styled.View`
  flex: 1;
`;

export const Opacity = styled.View`
  opacity: 0.5;
`;

export const CustomInput = styled.TextInput`
    border: 1.5px solid ${(props) => props.theme.colors.primaryColor};
    background: ${(props) => props.theme.colors.primaryLightColor};
    padding-left: ${(props) => props.theme.space.space2};
    border-radius: ${(props) => props.theme.borderRadius.button};
    height: 48px;
    width: 50%;
    justify-content: center;
`;

export const InputDate = styled.TouchableOpacity`
    border: 1.5px solid ${(props) => props.theme.colors.primaryColor};
    background: ${(props) => props.theme.colors.primaryLightColor};
    padding-left: ${(props) => props.theme.space.space2};
    border-radius: ${(props) => props.theme.borderRadius.button};
    height: 48px;
    width: 50%;
    justify-content: center;
`;

export const Line = styled.View`
  flex-flow: row;
  flex-wrap: wrap;
`;

export const LineRow = styled.View`
    flex-flow: row;
    flex-wrap: wrap;
    flex: 1;
`;

export const CheckLine = styled.TouchableOpacity`
  flex-flow: row;
  height: 100%;
`;

export const Check = styled.View`
    width: ${(props) => props.theme.space.space2};
    margin-right: ${(props) => props.theme.space.space1};
    border: 1px ${(props) => props.theme.colors.primaryDarkColor};
    borderRadius: 2px;
    margin-top: ${(props) => props.theme.space.space0};
    background: ${(props) =>
      props.selected ? props.theme.colors.primaryDarkColor : "transparent"};
`;

export const CustomInputText = styled.Text`
    font-size: ${(props) => props.theme.sizes.h3};
    opacity: ${(props) => (props.disabled ? ".5" : "1")};
    color: ${(props) =>
      props.hasValue
        ? props.theme.colors.darkColor
        : props.theme.colors.secondColor};
`;

export const TermsAndConditions = styled.TouchableOpacity`
  flex-flow: row;
`;

export const LineButtons = styled.View`
  flex-flow: row;
  flex-wrap: wrap;
  width: 100%;
  margin-top: ${(props) => props.theme.space.space3};
`;

