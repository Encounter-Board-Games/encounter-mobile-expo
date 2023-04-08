import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled, { withTheme } from 'styled-components';
import { H2, Subtitle2 } from './Typography';

import {
    Placeholder,
    PlaceholderLine,
    Fade
} from "rn-placeholder";

const Box = styled.View`
    background-color: white;
    margin-bottom: 16px;
    width: 100%;
    padding-top:  16px;
    padding-bottom:  16px;
    shadow-color: 'rgb(0, 0, 0)';
    shadow-offset: 0px, 5px;
    shadow-opacity: .16;
    shadow-radius: 3px;
    elevation: 2;
`;

const Header = styled.View`
    padding-left: 16px;
    padding-right: 16px;
    margin-bottom: 16px;
    position: relative;
`;

const ToolText = styled(TouchableOpacity)`
    position: absolute;
    right: 16px;
    top:0;
`;

export default withTheme((props) => {
    const subtitle = props.subtitle ? <Subtitle2>{props.subtitle}</Subtitle2> : null;
    const toolText = props.toolText ? (
      <ToolText onPress={() => props?.onToolTextPress()}>
        <Subtitle2 underline type="primaryDarkColor">{props.toolText}</Subtitle2>
      </ToolText>
    ) : null;
  
    return (
      <Box>
        <Header>
          {props.isLoading ? (
            <Placeholder style={{ flex: 1 }} Animation={Fade}>
              <PlaceholderLine noMargin height={24} />
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
  });
  