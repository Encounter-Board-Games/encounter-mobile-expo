import React from 'react';
import RadioButton from '../../components/RadioButton';
import { Line } from './EditProfileContentStyles';
import { Space } from '../../components/Space';
import { RadioButtonItem } from '../../types/globals';

export default function RadioButtonItem({
  key,
  isLast,
  isSelected,
  onPress,
  children,
}: RadioButtonItem) {
  return (
    <>
      <RadioButton isLast={isLast} isSelected={isSelected} onPress={onPress}>
        {children}
      </RadioButton>
      {!isLast && (
        <Space n={2}>
          <Line />
        </Space>
      )}
    </>
  );
}
