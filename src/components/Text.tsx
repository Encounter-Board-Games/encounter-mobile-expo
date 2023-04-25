import React from 'react';
import { Text, TextProps } from 'react-native';
import styled from 'styled-components/native';

interface StyledTextProps extends TextProps {}

export const StyledText = styled(Text)<StyledTextProps>`
  font-family: Nunito;
`;

const TextComponent: React.FC<StyledTextProps> = ({ children, ...rest }) => {
  return <StyledText {...rest}>{children}</StyledText>;
};

export default TextComponent;
