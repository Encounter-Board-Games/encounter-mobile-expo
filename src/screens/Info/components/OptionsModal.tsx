import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Keyboard, View } from 'react-native';
import styled from 'styled-components/native';

import { Space } from '../../../components/Space';
import { Button } from '../../../components/Input';
import { H3, H4 } from '../../../components/Typography';
import { closePopupModal } from '../../../store/actions/info';
import { RootState } from '../../../store/reducers';

interface OptionModalProps {}

const Container = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Line = styled.View`
  flex-flow: row;
  align-items: center;
  justify-content: center;
`;

const Btn = styled.View`
  margin: 0 10px;
`;

const Option = styled.TouchableOpacity`
  padding: 16px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray[300]};
`;

const OptionsModal: FC<OptionModalProps> = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState<string>('');
  const { popup = {} } = useSelector((state: RootState) => state.info);
  const {
    callBack = () => {},
    title,
    description,
    cancelBtn = 'Cancelar',
    options = [],
  } = popup.data || {};

  const handleCancel = () => {
    dispatch(closePopupModal());
    callBack(false); // Pass a boolean value to the callback function
  };

  const handleChooseOption = (option: string) => {
    dispatch(closePopupModal());
    callBack(option);
  };

  return (
    <Container onPress={() => Keyboard.dismiss()}>
      {title && <H3 center>{title}</H3>}
      <Space n={1} />
      {description && (
        <H4 noBold center>
          {description}
        </H4>
      )}
      <Space n={1} />
      <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap' }}>
        {options.map((option) => (
          <View key={option} style={{ flexGrow: 1, alignItems: 'center' }}>
            <Option onPress={() => handleChooseOption(option)}>{option}</Option>
          </View>
        ))}
      </View>
      <Space n={2} />
      <Line>
        <Btn>
          <Button onPress={handleCancel} type="CallToAction-Outline">
            {cancelBtn}
          </Button>
        </Btn>
      </Line>
    </Container>
  );
};

export default OptionsModal;
