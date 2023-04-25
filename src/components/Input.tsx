import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

interface CustomTextInputProps {
  onChangeText?: (value: string) => void;
  format?: (value: string) => string;
  withButton?: boolean;
  disabledButton?: boolean;
  onPress?: () => void;
  rightIcon?: string;
  onRightIconPress?: () => void;
  disabled?: boolean;
}

const Container = styled.View<{ withButton?: boolean }>`
  width: 100%;
  position: relative;
  padding-right: ${({ withButton }) => (withButton ? '28px' : '0px')};
`;

const CustomInput = styled.TextInput<{ disabled?: boolean }>`
  border: 1.5px solid ${({ theme }) => theme.colors.primaryColor};
  background: ${({ theme }) => theme.colors.primaryLightColor};
  padding-left: ${({ theme }) => theme.space.space2};
  border-radius: ${({ theme }) => theme.borderRadius.button};
  font-size: ${({ theme }) => theme.space.space2};
  opacity: ${({ disabled }) => (disabled ? '.5' : '1')};
`;

const Button = styled.View<{ disabledButton?: boolean }>`
  height: 56px;
  align-items: center;
  justify-content: center;
  width: 56px;
  border-radius: 56px;
  background: ${({ theme }) => theme.colors.primaryDarkColor};
  opacity: ${({ disabledButton }) => (disabledButton ? '.5' : '1')};
`;

const ButtonSpace = styled.View`
  height: 56px;
  width: 56px;
  border-radius: 56px;
  background: ${({ theme }) => theme.colors.lightColor};
  position: absolute;
  right: 0;
`;

const TouchRightIcon = styled.TouchableOpacity<{ disabled?: boolean }>`
  height: 56px;
  width: 56px;
  border-radius: 56px;
  position: absolute;
  right: 0;
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }) => (disabled ? '.5' : '1')};
`;

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
          <Button disabledButton={props.disabledButton}>
            <Ionicons name="ios-arrow-forward" color="#FAFAFA" size={32} />
          </Button>
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
        <Ionicons
          name={props.rightIcon}
          color={theme.colors.darkColor}
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
