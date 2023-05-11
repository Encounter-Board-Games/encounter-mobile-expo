import React from 'react';
import styled from 'styled-components/native';
import { EvilIcons } from '@expo/vector-icons';

export interface TagProps {
  isSelected?: boolean;
  isCircle?: boolean;
  onPress?: () => void;
  onClose?: () => void;
  children: any;
}

export const Radio = styled.TouchableOpacity<TagProps>`
  margin-top: ${({ theme }) => theme.space.s1}px;
  margin-right: ${({ theme }) => theme.space.s1}px;
  flex-flow: row;
  align-items: center;
  justify-content: center;
  border-radius: ${({ isCircle, theme }) =>
    isCircle ? '100px' : theme.borderRadius.tag}px;
  border: 1.5px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.primaryLight};
`;

export const CloseButtonArea = styled.TouchableOpacity`
  height: 100%;
  justify-content: center;
  align-items: center;
  padding-right: 6px;
  width: 30px;
`;

export const CloseButton = styled.View`
  background-color: ${({ theme }) => theme.colors.secondaryLight};
  height: 16px;
  width: 16px;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  margin-left: ${({ theme }) => theme.space.s1}px;
`;

export const StyledText = styled.Text<TagProps>`
  font-size: 14px;
  font-family: ${({ isSelected }) => (isSelected ? 'Nunito-Bold' : 'Nunito')};
  color: ${({ theme }) => theme.colors.primaryDark};
  margin: ${({ onClose }) => (onClose ? '6px 0px 6px 12px' : '6px 12px')};
`;

const Tag: React.FC<TagProps> = ({
  isSelected,
  isCircle,
  onPress,
  onClose,
  children,
}) => (
  <Radio onPress={onPress} isCircle={isCircle}>
    <StyledText isSelected={isSelected} onClose={onClose}>
      {children}
    </StyledText>
    {onClose && (
      <CloseButtonArea onPress={onClose}>
        <CloseButton>
          <EvilIcons name="close" color={'black'} size={12} />
        </CloseButton>
      </CloseButtonArea>
    )}
  </Radio>
);

export default Tag;
