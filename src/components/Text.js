import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';

const StyledText = styled(Text)`
  font-family: Nunito;
`;

export default (props) => <StyledText {...props}>{props.children}</StyledText>;
