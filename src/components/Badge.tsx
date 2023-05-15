/* eslint-disable indent */
import React, { useContext } from 'react';
import { Theme } from '../theme/theme';
import styled, { ThemeContext } from 'styled-components/native';

interface BadgeContainerProps {
  isCircle?: boolean;
  isSelected?: boolean;
  theme: Theme;
}

const BadgeContainer = styled.View<BadgeContainerProps>`
  margin-top: ${({ theme }) => theme.space.s0};
  margin-right: ${({ theme }) => theme.space.s0};
  padding: ${({ theme }) => theme.space.s0} ${({ theme }) => theme.space.s1};
  border-radius: ${({ isCircle, theme }) =>
    isCircle ? '100px' : theme.borderRadius.tag};
  border: 1.5px solid
    ${({ isSelected, theme }) =>
      isSelected ? theme.colors.primary : theme.colors.secondary};
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.primaryLight : 'transparent'};
`;

const BadgeText = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.subtitle3}px;
  font-family: Nunito;
  color: ${({ theme }) => theme.colors.primaryDark};
`;

interface BadgeProps {
  isCircle?: boolean;
  isSelected?: boolean;
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ isCircle, isSelected, children }) => {
  const theme = useContext(ThemeContext);

  return (
    <BadgeContainer isCircle={isCircle} isSelected={isSelected} theme={theme}>
      <BadgeText>{children}</BadgeText>
    </BadgeContainer>
  );
};

export default Badge;
