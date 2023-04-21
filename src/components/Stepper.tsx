import * as React from 'react';
import styled from 'styled-components';

interface ContainerProps {
  width?: string;
}

const Container = styled.View<ContainerProps>`
  flex-flow: row;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.width ? props.width : '100%')};
`;

interface CircleProps {
  size: number;
  isFirst: boolean;
  isActive: boolean;
  customColor?: string;
}

const Circle = styled.View<CircleProps>`
  flex-flow: row;
  width: ${(props) => props.size * 2}px;
  margin-left: ${(props) =>
    props.isFirst ? '0px' : `${props.size}px`};
  border-radius: 8px;
  background: ${(props) => {
    if (props.customColor) {
      return props.theme.colors[props.customColor];
    }
    return props.isActive
      ? props.theme.colors.primaryDarkColor
      : props.theme.colors.primaryColor;
  }};
`;

export function generateCircleIndexes(n: number): number[] {
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push(i);
  }
  return result;
}

interface StepperProps {
  size?: number;
  customColor?: string;
  total: number;
  current: number;
  width?: string;
}

const Stepper: React.FC<StepperProps> = ({
  size = 4,
  customColor,
  total,
  current,
  width,
  ...rest
}) => {
  return (
    <Container width={width} {...rest}>
      {generateCircleIndexes(total).map((index) => (
        <Circle
          customColor={customColor}
          size={size}
          key={index}
          isFirst={index === 0}
          isActive={current === index}
        />
      ))}
    </Container>
  );
};

export default Stepper;