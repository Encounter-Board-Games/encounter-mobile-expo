import React from 'react';
import styled from 'styled-components';

const Container = styled.TouchableOpacity<{
  size: number;
  isSelected: boolean;
}>`
  width: ${({ size }) => size * 16}px;
  border-radius: ${({ size }) => size * 2}px;
  position: relative;
  margin-right: ${({ theme }) => theme.space.s0};
  border: 0.5px solid ${({ theme }) => theme.colors.warming};
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.warming : 'transparent'};
`;

const Pointer = styled.View<{
  size: number;
  isSelected: boolean;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}>`
  position: absolute;
  width: ${({ size }) => size * 4}px;
  ${({ top }) => (top ? `top: ${top}` : '')};
  ${({ left }) => (left ? `left: ${left}` : '')};
  ${({ right }) => (right ? `right: ${right}` : '')};
  ${({ bottom }) => (bottom ? `bottom: ${bottom}` : '')};
  border-radius: ${({ size }) => size * 4}px;
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.light : theme.colors.warming};
`;

interface DiceProps {
  size: number;
  number: number;
  onPress?: (number: number) => void;
  isSelected?: boolean;
}

const Dice: React.FC<DiceProps> = ({ size, number, onPress, isSelected }) => {
  const topLeft = { top: `${size * 2}px`, left: `${size * 2}px` };
  const topRight = { top: `${size * 2}px`, right: `${size * 2}px` };
  const bottomLeft = { bottom: `${size * 2}px`, left: `${size * 2}px` };
  const bottomRight = { bottom: `${size * 2}px`, right: `${size * 2}px` };
  const middle = { top: `${size * 6 - 0.5}px`, left: `${size * 6 - 0.5}px` };

  const dices = [
    [middle],
    [topLeft, bottomRight],
    [topLeft, middle, bottomRight],
    [topLeft, topRight, bottomLeft, bottomRight],
    [topLeft, topRight, bottomLeft, bottomRight, middle],
  ];

  return (
    <Container
      size={size}
      isSelected={isSelected || false}
      onPress={() => onPress && onPress(number)}
    >
      {dices[number - 1].map((n, index) => (
        <Pointer
          key={index}
          size={size}
          isSelected={isSelected || false}
          {...n}
        />
      ))}
    </Container>
  );
};

export default Dice;
