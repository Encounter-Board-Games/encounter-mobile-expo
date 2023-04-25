import React from 'react';
import styled, { ThemeProps } from 'styled-components/native';
import { H3, H4, Subtitle2 } from './Typography';
import { Image, ImageSourcePropType } from 'react-native';
import Box from './Box';
import { Space } from './Space';
import { ButtonComponent } from './Button/ButtonStyles';

interface InformationBoxProps extends ThemeProps<any> {
  title: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  buttonWidth?: number;
  onPressButton?: () => void;
  img?: ImageSourcePropType;
  titleType?: string;
}

const ImageContent = styled.View`
  flex: 1;
  min-height: 88px;
  width: 100%;
  align-items: center;
`;

function InformationBox(props: InformationBoxProps) {
  const {
    img,
    title,
    subtitle,
    description,
    buttonText,
    buttonWidth,
    onPressButton,
    titleType,
  } = props;

  const imgContent = img ? (
    <>
      <ImageContent>
        <Image resizeMode={'contain'} style={{ height: '100%' }} source={img} />
      </ImageContent>
      <Space n={2} />
    </>
  ) : null;

  const subtitleContent = subtitle ? (
    <>
      <Space n={1} />
      <H4 center>{subtitle}</H4>
    </>
  ) : null;

  const descriptionContent = description ? (
    <>
      <Space n={1} />
      <Subtitle2 center type="secondDarkColor">
        {description}
      </Subtitle2>
    </>
  ) : null;

  const buttonTextContent = buttonText ? (
    <>
      <Space n={2} />
      <ButtonComponent
        width={buttonWidth}
        onPress={() => onPressButton && onPressButton()}
        type={'CallToAction-Outline'}
      >
        {buttonText}
      </ButtonComponent>
    </>
  ) : null;

  return (
    <Box>
      <Space n={1} />
      {imgContent}
      <H3 center type={titleType}>
        {title}
      </H3>
      {subtitleContent}
      {descriptionContent}
      {buttonTextContent}
      <Space n={1} />
    </Box>
  );
}

export default InformationBox;
