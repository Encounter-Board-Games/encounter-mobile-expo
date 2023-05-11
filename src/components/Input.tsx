import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { Container } from './CarrosselStyles';
import { CustomInput } from './CelphoneInput';
import { ButtonSpace, TouchRightIcon } from './InputStyles';
import { ButtonComponent } from './Button/ButtonStyles';
import IconComponent from './IconsComponent';

export interface CustomTextInputProps {
  name: any;
  onChangeText?: (value: string) => void;
  format?: (value: string) => string;
  withButton?: boolean;
  disabledButton?: boolean;
  onPress?: () => void;
  rightIcon?: string;
  onRightIconPress?: () => void;
  disabled?: boolean;
}

function CustomTextInput(props: CustomTextInputProps) {
  const theme = useTheme();

  const format = (value: string) => {
    if (!props.format) return value;
    return props.format(value);
  };

  let withButton: React.ReactNode, rightIcon: React.ReactNode;

  if (props.withButton) {
    withButton = (
      <ButtonSpace>
        <TouchableWithoutFeedback
          disabled={props.disabledButton}
          onPress={props.onPress}
        >
          <ButtonComponent disabled={props.disabledButton}>
            <Ionicons name="ios-arrow-forward" color="#FAFAFA" size={32} />
          </ButtonComponent>
        </TouchableWithoutFeedback>
      </ButtonSpace>
    );
  }

  if (props.rightIcon) {
    rightIcon = (
      <TouchRightIcon
        disabled={props.disabled}
        onPress={props.onRightIconPress}
      >
        <IconComponent
          name={props.rightIcon}
          color={theme.colors.dark}
          size={32}
        />
      </TouchRightIcon>
    );
  }

  return (
    <Container withButton={props.withButton}>
      <CustomInput
        {...props}
        onChangeText={(e) =>
          props.onChangeText && props.onChangeText(format(e))
        }
        editable={!props.disabled}
      />
      {withButton}
      {rightIcon}
    </Container>
  );
}

export default CustomTextInput;
