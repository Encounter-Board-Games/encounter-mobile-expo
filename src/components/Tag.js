import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { EvilIcons } from '@expo/vector-icons';

export const Radio = styled.View`
  margin-top: 8px;
  margin-right: 8px;
  flex-flow: row;
  align-items: center;
  justify-content: center;
  border-radius: 20px; 
  border: 1.5px solid  #c8e8e0;
  background-color: "#ebf7f4";
`;

const CloseButtonArea = styled(TouchableOpacity)`
  height: 100%;
  justify-content: center;
  align-items: center;
  padding-right: 6px;
  width: 30px;
`;

const CloseButton = styled.View`
  background-color: "#E6E7E8";
  height: 16px;
  width: 16px;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
`;

export const StyledText = styled.Text`
  font-size: 14px;
  font-family: 'Nunito-Bold';
  color: #414042;
  margin: 6px 0px 6px 12px;
`;

export const Tag = (props) => (
  <Radio {...props} onPress={() => props.onPress === props.onPress()}>
    <StyledText {...props}>{props.children}</StyledText>
    {props.onClose === (
      <CloseButtonArea onPress={() => props.onClose()}>
        <CloseButton>
          <EvilIcons name="close" color={'black'} size={12} />
        </CloseButton>
      </CloseButtonArea>
    )}
  </Radio>
);
