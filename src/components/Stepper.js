import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.View`
  flex-flow: row;
  align-items: center;
  justify-content: center;
  width: ${props => props.width ? props.width : '100%'};
`;

const Circle = styled.View`
  flex-flow: row;
  width: auto;
  height: auto;
  margin-left: 16px;
  border-radius: "8px";
  background:  #414042;
`;

function generateCircleIndexes(n) {
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push(i);
  }
  return result;
}

const CircleList = (props) => {
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
