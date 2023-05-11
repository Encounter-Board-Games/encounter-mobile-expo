/* eslint-disable indent */
import React from 'react';
import styled from 'styled-components';
import Circle from './Circle';

interface RadioButtonProps {
  isSelected: boolean;
  isFlex?: boolean;
  isLast?: boolean;
  onPress?: () => void;
  children?: any;
}

export const Radio = styled.button<RadioButtonProps>`
  display: flex;
  flex-flow: row;
  margin-top: ${(props) => props.theme.space.s1};
  padding: 0px 12px;
  align-items: center;
  ${(props) => (props.isFlex ? `flex: 1` : '')}
  margin-right: ${(props) =>
    props.isLast
      ? '0px'
      : props.isFlex
      ? props.theme.space.s2
      : props.theme.space.s1};
  height: 40px;
  border-radius: ${(props) => props.theme.borderRadius.button};
  border: 1.5px solid
    ${(props) =>
      props.isSelected
        ? props.theme.colors.primary
        : props.theme.colors.secondary};
  background-color: ${(props) =>
    props.isSelected ? props.theme.colors.primaryLight : 'transparent'};
`;

export const Text = styled.span<{ isSelected: boolean }>`
  font-size: 14px;
  font-family: Nunito ${(props) => (props.isSelected ? '-Bold' : '')};
  color: ${(props) =>
    props.isSelected
      ? props.theme.colors.primaryDark
      : props.theme.colors.dark};
`;

const RadioButton: React.FC<RadioButtonProps> = ({
  isSelected,
  isFlex,
  isLast,
  onPress,
  children,
}) => {
  return (
    <Radio
      isSelected={isSelected}
      isFlex={isFlex}
      isLast={isLast}
      onPress={onPress}
    >
      <Circle isSelected={isSelected} />
      <Text isSelected={isSelected}>{children}</Text>
    </Radio>
  );
};

export default RadioButton;
