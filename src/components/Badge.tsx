/* eslint-disable indent */
import React from 'react';
import styled from 'styled-components/native';
import theme from '../theme/theme';

export interface BadgeContainerProps {
  isCircle?: boolean;
  isSelected?: boolean;
}

const BadgeContainer = styled.View<BadgeContainerProps>`
  margin-top: ${(props) => theme.space.space0};
  margin-right: ${(props) => theme.space.space0};
  padding: ${(props) => theme.space.space0} ${(props) => theme.space.space1};
  border-radius: ${(props) =>
    props.isCircle ? '100px' : theme.borderRadius.tag};
  border: 1.5px solid
    ${(props) =>
      props.isSelected
        ? theme.colors.primaryColor
        : theme.colors.secondaryColor};
  background-color: ${(props) =>
    props.isSelected ? theme.colors.primaryLightColor : 'transparent'};
`;

const BadgeText = styled.Text`
  font-size: ${(props) => theme.fontSizes.subtitle3}px;
  font-family: Nunito;
  color: ${theme.colors.primaryDarkColor};
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
