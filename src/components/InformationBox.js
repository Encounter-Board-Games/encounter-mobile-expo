import React from 'react'
import styled, { withTheme } from 'styled-components'
import { H3, H4, Subtitle2 } from './Typography'
import { Button } from './Button'
import { Image } from 'react-native'
import { Box } from './Box'
import { Space } from './Space'

export const ImageContent = styled.View`
flex: 1;
min-height: 88px;
width: 100%;
align-items: center;
`;

function InformationBox(props) {
  const imgContent = props.img ? (
    <>
      <ImageContent>
        <Image resizeMode={"contain"} 
        style={{ height: '100%' }} 
        source={props.img} />
      </ImageContent>
      <Space n={2} />
    </>
  ) : null;

  const subtitleContent = props.subtitle ? (
    <>
      <Space n={1} />
      <H4 center>{props.subtitle}</H4>
    </>
  ) : null;

  const descriptionContent = props.description ? (
    <>
      <Space n={1} />
      <Subtitle2 center type="secondDarkColor">{props.description}</Subtitle2>
    </>
  ) : null;

  const buttonTextContent = props.buttonText ? (
    <>
      <Space n={2} />
      <Button
        width={props.buttonWidth}
        onPress={() => props.onPressButton && props.onPressButton()}
        type={'CallToAction-Outline'}>
        {props.buttonText}
      </Button>
    </>
  ) : null;

  return (
    <Box>
      <Space n={1} />
      {imgContent}
      <H3 center type={props.titleType}>{props.title}</H3>
      {subtitleContent}
      {descriptionContent}
      {buttonTextContent}
      <Space n={1} />
    </Box>
  );
};

export default withTheme(InformationBox);
