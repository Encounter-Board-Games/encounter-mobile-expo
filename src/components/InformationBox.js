import React from 'react'
import styled, { withTheme } from 'styled-components'
import { H3, H4, Subtitle2 } from './Typography'
import { Button } from './Button'
import { Image } from 'react-native'
import { Box } from './Box'

const ImageContent = styled.View`
flex: 1;
min-height: 88px;
width: 100%;
align-items: center;
`

export default withTheme((props) => {
  const imgContent = props.img ? (
    <>
      <ImageContent>
        <Image resizeMode={"contain"} style={{ height: '100%' }} source={props.img} />
      </ImageContent>
    </>
  ) : null;

  const subtitleContent = props.subtitle ? (
    <>
      <H4 center>{props.subtitle}</H4>
    </>
  ) : null;

  const descriptionContent = props.description ? (
    <>
      <Subtitle2 center type="secondDarkColor">{props.description}</Subtitle2>
    </>
  ) : null;

  const buttonTextContent = props.buttonText ? (
    <>
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
      {imgContent}
      <H3 center type={props.titleType}>{props.title}</H3>
      {subtitleContent}
      {descriptionContent}
      {buttonTextContent}
    </Box>
  );
})
