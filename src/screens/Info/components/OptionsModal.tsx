import React, { useState } from 'react';
import { Space } from '../../../components/Space';
import Button from '../../../components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { H4, H3 } from '../../../components/Typography';
import { closePopupModal } from '../../../store/actions/info';
import { Keyboard, View } from 'react-native';
import { Container, Line, Btn, Option } from './OptionsModalStyles';
import theme from '../../../styles/theme';

interface OptionModalProps {}

const OptionsModal: React.FC<OptionModalProps> = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState<string>('');
  const { popup = {} } = useSelector((state) => state.info);
  const {
    callBack = () => {},
    title = undefined,
    description = undefined,
    cancelBtn = undefined,
    options = [],
  } = popup.data ? popup.data : {};

  const handleCancel = () => {
    dispatch(closePopupModal());
    callBack(false);
  };

  const handleChooseOption = (option: string) => {
    dispatch(closePopupModal());
    callBack(option);
  };

  return (
    <Container onPress={() => Keyboard.dismiss()}>
      {title && <H3 center>{title}</H3>}
      <Space n={1} />
      {description && <H4 noBold center>{description}</H4>}
      <Space n={1} />
      <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap' }}>
        {options.map((option, index) => (
          <View key={index} style={{ flexGrow: 1, alignItems: 'center' }}>
            <Option onPress={() => handleChooseOption(option)}>{option}</Option>
          </View>
        ))}
      </View>
      <Space n={2} />
      <Line>
        <Btn>
          <Button onPress={handleCancel} type="CallToAction-Outline" theme={theme}>
            {cancelBtn ? cancelBtn : 'Cancelar'}
          </Button>
        </Btn>
      </Line>
    </Container>
  );
};

export default OptionsModal;
