import React from 'react';
import styled from 'styled-components';

export const Container = styled.TouchableOpacity`
  width: ${(props) => props.size * 16}px;
  h
  border-radius: ${(props) => props.size * 2}px;
  position: relative;
  margin-right: ${(props) => props.theme.space.space0};
  border: 0.5px solid ${(props) => props.theme.colors.warming};
  background-color: ${(props) =>
    props.isSelected ? props.theme.colors.warming : 'transparent'};
`;

export const Pointer = styled.View`
  position: absolute;

  width: ${(props) => props.size * 4}px;
  ${(props) => (props.top ? 'top: ' + props.top : '')};
  ${(props) => (props.left ? 'left: ' + props.left : '')};
  ${(props) => (props.right ? 'right: ' + props.right : '')};
  ${(props) => (props.bottom ? 'bottom: ' + props.bottom : '')};
  border-radius: ${(props) => props.size * 4}px;
  background-color: ${(props) =>
    props.isSelected
      ? props.theme.colors.lightColor
      : props.theme.colors.warming};
`;

export const topLeft = (size) => ({
  top: `${size * 2}px`,
  left: `${size * 2}px`,
});
export const topRight = (size) => ({
  top: `${size * 2}px`,
  right: `${size * 2}px`,
});
export const bottomLeft = (size) => ({
  bottom: `${size * 2}px`,
  left: `${size * 2}px`,
});
export const bottomRight = (size) => ({
  bottom: `${size * 2}px`,
  right: `${size * 2}px`,
});
export const middle = (size) => ({
  top: `${size * 6 - 0.5}px`,
  left: `${size * 6 - 0.5}px`,
});

export const dices = [
  [middle],
  [topLeft, bottomRight],
  [topLeft, middle, bottomRight],
  [topLeft, topRight, bottomLeft, bottomRight],
  [topLeft, topRight, bottomLeft, bottomRight, middle],
];

export default function Dice(props) {
  return (
    <Container
      {...props}
      onPress={() => props.onPress && props.onPress(props.number)}
    >
      {dices[props.number - 1].map((n, index) => (
        <Pointer key={index} {...props} {...n(props.size)} />
      ))}
    </Container>
  );
}
