import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';

export const StyledText = styled(Text)`
  font-family: Nunito;
`;

export default (props) => {
  
  return (
  <StyledText {...props}>{props.children}</StyledText>
  );
}
