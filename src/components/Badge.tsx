import React from 'react';
import styled from 'styled-components/native';

interface BadgeContainerProps {
  isCircle?: boolean;
  isSelected?: boolean;
}

const BadgeContainer = styled.View<BadgeContainerProps>`
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

interface BadgeProps extends BadgeContainerProps {
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = (props) => {
  return (
    <BadgeContainer {...props}>
      <BadgeText>{props.children}</BadgeText>
    </BadgeContainer>
  );
};

export default Badge;
