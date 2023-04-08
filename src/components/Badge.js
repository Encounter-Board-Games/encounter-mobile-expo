import React from 'react';
import styled from 'styled-components';

const BadgeContainer = styled.View`
  margin-top: 4px;
  margin-right: 4px;
  padding: 4px;
  border-radius: 100px;
  border: 1.5px solid;
  background-color:  #c8e8e0;
`;

const BadgeText = styled.Text`
  font-size: 12px;
  font-family: Nunito;
  color: #414042;
`;

const Badge = (props) => (
  <BadgeContainer {...props}>
    <BadgeText>{props.children}</BadgeText>
  </BadgeContainer>
);

export default Badge;
