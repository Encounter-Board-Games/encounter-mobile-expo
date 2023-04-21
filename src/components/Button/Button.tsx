import React from 'react';
import getConfigs from './getConfigs';
import { ButtonWrapperProps } from './ButtonTypes';
import { Button_, Text } from './ButtonStyles';

interface ButtonProps extends ButtonWrapperProps {}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <Button_
      {...getConfigs(props.theme, props.type)}
      {...props}
      onPress={() => !props.disabled && props.onPress && props.onPress()}
    >
      <Text isOutline={props.isOutline} {...getConfigs(props.theme, props.type)}>
        {props.children}
      </Text>
    </Button_>
  );
};

export default Button;