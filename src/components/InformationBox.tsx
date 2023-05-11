import React, { FC } from 'react';

interface InformationBoxTheme {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  // Add other properties you need from your theme
}

interface InformationBoxProps {
  img: string;
  title: string;
  description: string;
  buttonText: string;
  onPressButton?: () => void;
  theme: InformationBoxTheme;
}

const InformationBox: FC<InformationBoxProps> = ({
  img,
  title,
  description,
  buttonText,
  onPressButton,
  theme,
}) => {
  return (
    <div>
      <img src={img} alt="" />
      <h1>{title}</h1>
      <p>{description}</p>
      <button onClick={onPressButton}>{buttonText}</button>
    </div>
  );
};

export default InformationBox;
