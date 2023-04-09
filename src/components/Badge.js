import React from 'react';
import styled, { withTheme } from "styled-components";

const BadgeContainer = styled.View`
  margin-top: ${(props) => props.theme.space.space0};
  margin-right: ${(props) => props.theme.space.space0};
  padding: ${(props) => props.theme.space.space0} ${(props) =>
  props.theme.space.space1};
  border-radius: ${(props) =>
    props.isCircle ? '100px' : props.theme.borderRadius.tag};
  border: 1.5px solid
    ${(props) =>
      props.isSelected
        ? props.theme.colors.primaryColor
        : props.theme.colors.secondColor};
  background-color: ${(props) =>
    props.isSelected
      ? props.theme.colors.primaryLightColor
      : 'transparent'};
`;

const BadgeText = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.subtitle3}px;
  font-family: Nunito;
  color: ${(props) => props.theme.colors.primaryDarkColor};
`;

const Badge = (props) => (
  <BadgeContainer {...props}>
    <BadgeText>{props.children}</BadgeText>
  </BadgeContainer>
);

export default Badge;
