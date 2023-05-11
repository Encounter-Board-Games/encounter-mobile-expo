import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { SocialButtonProps, SocialIconName } from './ButtonTypes';

interface SocialButtonComponentProps extends TouchableOpacityProps {
  backgroundColor?: string;
  icon?: React.ReactNode | SocialIconName;
  style?: StyleProp<ViewStyle>;
}

export const SocialButton: React.FC<
  SocialButtonProps & SocialButtonComponentProps
> = ({ backgroundColor, icon, style, children, ...restProps }) => {
  return (
    <TouchableOpacity style={style} {...restProps}>
      {typeof icon === 'string' ? (
        <FontAwesome
          name={icon as SocialIconName}
          size={16}
          color="white"
          style={{ marginRight: 6 }}
        />
      ) : (
        icon
      )}
      {children}
    </TouchableOpacity>
  );
};
