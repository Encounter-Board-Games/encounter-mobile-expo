import React, { useState } from 'react';
import { Space, SpaceHorizontal } from '../../../components/Space';
import Button from '../../../components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { H4, H3 } from '../../../components/Typography';
import { closePopupModal } from '../../../store/actions/info';
import { Keyboard, View } from 'react-native';
import { Container, TextInput, Line, Btn } from './TextModalStyles';
import theme from '../../../styles/theme';

interface PopupData {
  callBack?: (text: string) => void;
  title?: string;
  description?: string;
  cancelBtn?: string;
  confirmBtn?: string;
}

interface PopupState {
  data?: PopupData;
}

interface InfoState {
  popup?: PopupState;
}

const TextModal: React.FC = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const { popup = {} } = useSelector(
    (state: { info: InfoState }) => state.info
  );
  const {
    callBack = () => {},
    title,
    description,
    cancelBtn,
    confirmBtn,
  } = popup?.data ?? {};

  const remove = () => {
    callBack(text);
    dispatch(closePopupModal());
  };

  const cancel = () => {
    dispatch(closePopupModal());
    callBack('false');
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
      <View style={{ width: '100%' }}>
        <TextInput
          multiline
          numberOfLines={4}
          value={text}
          onChangeText={(text) => setText(text)}
        />
      </View>
      <Space n={2} />
      <Line>
        <Btn>
          <Button onPress={cancel} type="CallToAction-Outline" theme={theme}>
            {cancelBtn ?? 'Cancelar'}
          </Button>
        </Btn>
        <SpaceHorizontal n={4} />
        <Btn>
          <Button onPress={remove} type="ComplementButton-Big" theme={theme}>
            {confirmBtn ?? 'Sim, excluir'}
          </Button>
        </Btn>
      </Line>
    </Container>
  );
};

export default TextModal;
