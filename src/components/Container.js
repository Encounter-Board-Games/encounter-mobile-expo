import React from 'react';
import styled, { withTheme } from 'styled-components';
import { H2, Subtitle2 } from './Typography';

import { Placeholder, PlaceholderLine, Fade } from 'rn-placeholder';

export const Box = styled.View`
  background-color: white;
  margin-bottom: ${(props) => props.theme.space.space2};
  width: 100%;
  padding-top: ${(props) => props.theme.space.space2};
  padding-bottom: ${(props) => props.theme.space.space2};
  shadow-color: ${(props) => props.theme.shadow.shadowColor};
  shadow-offset: ${(props) => props.theme.shadow.shadowOffset.width}
    ${(props) => props.theme.shadow.shadowOffset.width};
  shadow-opacity: ${(props) => props.theme.shadow.shadowOpacity};
  shadow-radius: ${(props) => props.theme.shadow.shadowRadius};
  elevation: ${(props) => props.theme.shadow.elevation};
`;

export const Header = styled.View`
  padding-left: ${(props) => props.theme.space.space2};
  padding-right: ${(props) => props.theme.space.space2};
  margin-bottom: ${(props) => props.theme.space.space2};
  position: relative;
`;

export const ToolText = styled.TouchableOpacity`
  position: absolute;
  right: ${(props) => props.theme.space.space2};
  top: 0;
`;

function Container(props) {
  const subtitle = props.subtitle ? (
    <Subtitle2>{props.subtitle}</Subtitle2>
  ) : null;
  const toolText = props.toolText ? (
    <ToolText onPress={() => props?.onToolTextPress()}>
      <Subtitle2 underline type="primaryDarkColor">
        {props.toolText}
      </Subtitle2>
    </ToolText>
  ) : null;

  return (
    <Box>
      <Header>
        {props.isLoading ? (
          <Placeholder style={{ flex: 1 }} Animation={Fade}>
            <PlaceholderLine noMargin />
          </Placeholder>
        ) : (
          <H2>{props.title}</H2>
        )}
        {subtitle}
        {toolText}
      </Header>
      {props.children}
    </Box>
  );
}

export default withTheme(Container);
