/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import getConfigs from './getConfigs';
import { ButtonWrapperProps } from './ButtonTypes';
import { ButtonComponent, Text } from './ButtonStyles';

export interface ButtonProps extends ButtonWrapperProps {}

const EncounterButton: React.FC<ButtonProps> = (props) => {
  return (
    <ButtonComponent
      {...getConfigs(props.theme, props.type)}
      {...props}
      onPress={() => !props.disabled && props.onPress && props.onPress()}
    >
      <Text
        isOutline={props.isOutline}
        {...getConfigs(props.theme, props.type)}
      >
        {props.children}
      </Text>
    </ButtonComponent>
  );
};

export default EncounterButton;
