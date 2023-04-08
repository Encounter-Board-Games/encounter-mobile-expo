import React from "react";
import styled, { withTheme } from "styled-components";
import { FontAwesome } from "@expo/vector-icons";

// padding: 13px;
const Button_ = styled.TouchableOpacity`
  justify-content: center;
  height: auto;
  width: auto;
  flex: 1;
  padding-left: 13px;
  padding-right: 13px;
  align-items: center;
  border-radius: "8px";
  border: 1.5px solid;
  background-color: transparent;
  opacity: .5;
`;

export const Text = styled.Text`
  font-size: 18px;
  font-family: Nunito;
  color: #c8e8e0;
`;

function getConfigs(theme, type) {
  if (type == "CallToAction")
    return {
      textColorIsOutline: "#FAFAFA",
      textColor: "#FAFAFA",
      background: "#414042",
      borderColor: "#414042",
      width: "100%",
      height: '48px',
      paddingSides: '24px',
      fontSize: "18px",
    };
  if (type == "CallToAction-Orange")
    return {
      textColorIsOutline: "#FAFAFA",
      textColor: "#FAFAFA",
      background: "#fda856",
      borderColor: "#fda856",
      width: "100%",
      height: '48px',
      paddingSides: '24px',
      fontSize: "18px",
    };
  if (type == "CallToAction-Small")
    return {
      textColorIsOutline: "#FAFAFA",
      textColor: "#FAFAFA",
      background: "#414042",
      borderColor: "#414042",
      width: "auto",
      height: "32px",
      paddingSides: "8px",
      fontSize: "14px",
    };
  if (type == "CallToAction-Orange-Small")
    return {
      textColorIsOutline: "#FAFAFA",
      textColor: "#FAFAFA",
      background: "#fda856",
      borderColor: "#fda856",
      width: "auto",
      height: "32px",
      paddingSides: "8px",
      fontSize: "14px",
    };
  if (type == "CallToAction-Light-Small2")
    return {
      textColorIsOutline: "#FAFAFA",
      textColor: "#FAFAFA",
      background: "#414042",
      borderColor: "#414042",
      width: "100%",
      height: "32px",
      paddingSides: '24px',
      fontSize: "16px",
    };
  if (type == "CallToAction-Light-Small")
    return {
      textColorIsOutline: "#FAFAFA",
      textColor: "#FAFAFA",
      background: "#414042",
      borderColor: "#414042",
      width: "100%",
      height: "40px",
      paddingSides: '24px',
      fontSize: "16px",
    };
  if (type == "CallToAction-Light")
    return {
      textColorIsOutline: "#FAFAFA",
      textColor: "#FAFAFA",
      background: "#414042",
      borderColor: "#414042",
      width: "100%",
      height: '48px',
      paddingSides: '24px',
      fontSize: "18px",
    };

  if (type == "CallToAction-Outline")
    return {
      // isOutline: true,
      textColorIsOutline: "#6D6E71",
      textColor: "#6D6E71",
      background: "#FAFAFA",
      borderColor: "#BCBEC0",
      width: "auto",
      height: '48px',
      paddingSides: '24px',
      fontSize: "16px",
    };
  if (type == "CallToAction-Outline-Flex")
    return {
      isOutline: true,
      textColorIsOutline: "#6D6E71",
      textColor: "#6D6E71",
      background: "#BCBEC0",
      borderColor: "#BCBEC0",
      width: "100%",
      height: "40px",
      paddingSides: '24px',
      fontSize: "16px",
    };

  if (type == "ComplementButton")
    return {
      textColorIsOutline: "#FAFAFA",
      textColor: "#FAFAFA",
      background: "#0d3c54",
      borderColor: "#0d3c54",
      height: '32px',
      paddingSides: "8px",
      fontSize: "14px",
    };

  if (type == "CallToAction-Primary-Color")
    return {
      textColorIsOutline: "#FAFAFA",
      textColor: "#FAFAFA",
      background: "#414042",
      borderColor: "#414042",

      height: '32px',
      paddingSides: "8px",
      height: "40px",
      fontSize: "16px",
    };

  if (type == "ComplementButton-Medium")
    return {
      textColorIsOutline: "#FAFAFA",
      textColor: "#FAFAFA",
      background: "#0d3c54",
      borderColor: "#0d3c54",
      height: '32px',
      paddingSides: "8px",
      height: "40px",
      fontSize: "16px",
    };

  if (type == "ComplementButton-Big")
    return {
      textColorIsOutline: "#FAFAFA",
      textColor: "#FAFAFA",
      background: "#0d3c54",
      borderColor: "#0d3c54",
      width: "auto",
      height: '48px',
      paddingSides: '24px',
      fontSize: "16px",
    };

  if (type == "ComplementButton-Orange-Big")
    return {
      textColorIsOutline: "#FAFAFA",
      textColor: "#FAFAFA",
      background: "#fda856",
      borderColor: "#fda856",
      width: "auto",
      height: '48px',
      paddingSides: '24px',
      fontSize: "16px",
    };
  if (type == "ComplementButton-Outline")
    return {
      isOutline: true,
      textColorIsOutline: "#0d3c54",
      textColor: "#0d3c54",
      background: "#0d3c54",
      borderColor: "#0d3c54",
      width: "auto",
      height: '48px',
      paddingSides: '24px',
      fontSize: "16px",
    };
}

export const Button = withTheme((props) => {
  return (
    <Button_
      {...getConfigs(props.theme, props.type)}
      {...props}
      onPress={() => !props.disabled && props.onPress && props.onPress()}
    >
      <Text
        isOutline={props.isOutline}
        {...getConfigs(props.theme, props.type)}
      >
        {props.children}
      </Text>
    </Button_>
  );
});

const SocialButton_ = styled.TouchableOpacity`
  height: '48px';
  border-radius: '24px';
  width: 100%;
  padding-left: '32px';
  padding-right: '32px';
  justify-content: center;
  flex-flow: row;
  align-items: center;
  background:  #414042;
  opacity: .5;
`;
const SocialButtonText = styled.Text`
  font-family: Nunito;
  font-size: '16px';
  color: "#FAFAFA";
`;

export const SocialButton = (props) => (
  <SocialButton_ {...props}>
    <FontAwesome
      name={props.icon}
      size={16}
      color="white"
      style={{ marginRight: 6 }}
    />
    <SocialButtonText>{props.children}</SocialButtonText>
  </SocialButton_>
);
