import React from 'react';
import styled from 'styled-components/native';
import { Space, SpaceHorizontal } from '../../../components/Space';
import Button from '../../../components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { H3 } from '../../../components/Typography';
import { closePopupModal } from '../../../store/actions/info';
import { Linking } from 'react-native';
import theme from '../../../theme/theme';

interface PopupData {
  text?: string;
}

interface PopupState {
  data?: PopupData;
}

interface AboutState {
  phone?: string;
}

interface InfoState {
  popup?: PopupState;
}

interface AppState {
  about?: AboutState;
}

const Container = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Line = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
`;

const WppRedirect: React.FC = () => {
  const dispatch = useDispatch();
  const { popup = {} } = useSelector(
    (state: { info: InfoState }) => state.info
  );
  const { about = {} } = useSelector((state: { app: AppState }) => state.app);
  const { phone = '' } = about;
  const { text = 'Olá' } = popup?.data ?? {};

  const openWpp = () => {
    Linking.openURL(`whatsapp://send?phone=${phone}&text=${text}`);
  };

  return (
    <Container>
      <H3 center>Você será direcionado para o WhatsApp.</H3>
      <Space n={0} />
      <H3 noBold>Deseja continuar?</H3>
      <Space n={2} />
      <Line>
        <Button
          onPress={() => dispatch(closePopupModal())}
          type="CallToAction-Outline"
          theme={theme}
        >
          Cancelar
        </Button>
        <SpaceHorizontal n={4} />
        <Button onPress={openWpp} type="ComplementButton-Big" theme={theme}>
          Continuar
        </Button>
      </Line>
    </Container>
  );
};

export default WppRedirect;
