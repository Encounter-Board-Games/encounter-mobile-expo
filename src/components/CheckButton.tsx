/* eslint-disable indent */
import React from 'react';
import styled from 'styled-components';

export interface RadioProps {
  isCircle?: boolean;
  isSelected?: boolean;
  onPress?: () => void;
}

export interface TextProps {
  isSelected?: boolean;
}

export interface CheckButtonProps extends RadioProps {
  children: React.ReactNode;
}

export const Radio = styled.TouchableOpacity<RadioProps>`
  margin-top: ${(props) => props.theme.space.s1};
  margin-right: ${(props) => props.theme.space.s1};
  padding: 6px 12px;
  flex-flow: row;
  align-items: center;
  justify-content: center;
  border-radius: ${(props) =>
    props.isCircle ? '100px' : props.theme.borderRadius.tag};
  border: 1.5px solid
    ${(props) =>
      props.isSelected
        ? props.theme.colors.primary
        : props.theme.colors.secondColor};
  background-color: ${(props) =>
    props.isSelected ? props.theme.colors.primaryLight : 'transparent'};
`;

export const CloseButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.secondaryLight};
  height: 16px;
  width: 16px;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  margin-left: ${(props) => props.theme.space.s1};
`;

export const Text = styled.Text<TextProps>`
  font-size: 14px;
  font-family: ${(props) => (props.isSelected ? 'Nunito' : 'Nunito')};
  color: ${(props) =>
    props.isSelected
      ? props.theme.colors.primaryDark
      : props.theme.colors.dark};
`;

const CheckButton: React.FC<CheckButtonProps> = ({
  children,
  onPress,
  ...props
}) => (
  <Radio onPress={() => onPress && onPress()} {...props}>
    <Text {...props}>{children}</Text>
  </Radio>
);

export default CheckButton;
