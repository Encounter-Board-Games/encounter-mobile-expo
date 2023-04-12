import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Container = styled.View`
  flex-flow: row;
  align-items: center;
  justify-content: center;
  width: ${props => props.width ? props.width : '100%'};
`;

export const Circle = styled.View`
  flex-flow: row;
  width: ${props => props.size * 2}px;
  
  margin-left: ${props => props.isFirst ? '0px' : `${props.size}px`};
  border-radius: 8px;
  background: ${props => {
    if(props.customColor) {
      return props.theme.colors[props.customColor];
    }
    return  props.isActive ? props.theme.colors.primaryDarkColor :  props.theme.colors.primaryColor;
  }};
`;

function generateCircleIndexes(n) {
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push(i);
  }
  return result;
}

function CircleList(props) {
  const { size = 4, customColor, number, current, ...rest } = props;

  return (
    <Container {...rest}>
      {generateCircleIndexes(number).map(index => (
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

CircleList.propTypes = {
  size: PropTypes.number,
  customColor: PropTypes.string,
  number: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
};

export default CircleList;
