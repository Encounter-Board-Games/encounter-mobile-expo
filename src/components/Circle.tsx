/* eslint-disable indent */
import React from 'react';
import styled from 'styled-components';

export interface CircleProps {
  isSelected?: boolean;
}

export const Circle = styled.View<CircleProps>`
  height: 18px;
  width: 18px;
  border-radius: 18px;
  border: 2px solid
    ${(props) =>
      props.isSelected
        ? props.theme.colors.primaryDark
        : props.theme.colors.secondColor};
  margin-right: ${(props) => props.theme.space.s1};
  padding: 2px;
`;

export const CircleIntern = styled.View`
  height: 100%;
  width: 100%;
  border-radius: 18px;
  background: ${(props) => props.theme.colors.primaryDark};
`;

const CircleComponent: React.FC<CircleProps> = (props) => {
  return <Circle {...props}>{props.isSelected && <CircleIntern />}</Circle>;
};

export default CircleComponent;
