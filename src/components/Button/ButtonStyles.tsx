import styled from 'styled-components/native';
import { ButtonProps, TextProps, SocialButtonProps } from './ButtonTypes';

export const Button_ = styled.TouchableOpacity<ButtonProps>`
  justify-content: center;
  height: ${(props) => props.height || 'auto'};
  width: ${(props) => props.width || 'auto'};
  flex: ${(props) => (props.flex ? 1 : 'none')};
  padding-left: ${(props) => props.paddingSides || '0'};
  padding-right: ${(props) => props.paddingSides || '0'};
  align-items: center;
  border-radius: ${(props) => props.theme.borderRadius.button};
  border: 1.5px solid ${(props) => props.borderColor || 'transparent'};
  background-color: ${(props) =>
    props.isOutline ? 'transparent' : props.background || 'transparent'};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

export const Text = styled.Text<TextProps>`
  font-size: ${(props) => props.fontSize || '16px'};
  font-family: Nunito;
  color: ${(props) =>
    props.isOutline ? props.textColorIsOutline : props.textColor || 'black'};
`;

export const SocialButton_ = styled.TouchableOpacity<SocialButtonProps>`
  background: ${(props) => props.backgroundColor || props.theme.colors};
`;
