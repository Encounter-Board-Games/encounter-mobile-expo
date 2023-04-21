import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { SocialButtonProps, SocialIconName } from './ButtonTypes';
import { SocialButton_} from './ButtonStyles';

        
export const SocialButton: React.FC<SocialButtonProps> = (props) => {
  return (
    <SocialButton_ backgroundColor={props.backgroundColor} {...props}>
      {typeof props.icon === 'string' ? (
      <FontAwesome
        name={props.icon as SocialIconName}
        size={16}
        color="white"
        style={{ marginRight: 6 }}
      />
      ) : (
        props.icon
      )}
      <SocialButton_>{props.children}</SocialButton_>
    </SocialButton_>
  );
};
        
        
        
        
        
        