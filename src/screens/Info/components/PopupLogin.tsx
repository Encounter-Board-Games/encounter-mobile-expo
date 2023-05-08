import React, { useState } from 'react';
import { Space } from '../../../components/Space';
import Button from '../../../components/Button/Button';
import { useDispatch } from 'react-redux';
import { Subtitle2 } from '../../../components/Typography';
import { openLoginPopup } from '../../../store/actions/user/login';
import { closePopupModal } from '../../../store/actions/info';
import theme from '../../../theme/theme';
import { Container, Line } from './PopupLoginStyles';

const LoginPopup: React.FC = () => {
  const dispatch = useDispatch();
  const [evaluation, setEvaluation] = useState<string | undefined>();

  const handleOpenLogin = () => {
    dispatch(closePopupModal());
    dispatch(openLoginPopup());
  };

  return (
    <Container>
      <Subtitle2>Você precisa estar logado para essa ação!</Subtitle2>
      <Space n={2} />
      <Line>
        <Button
          onPress={handleOpenLogin}
          type="CallToAction-Outline"
          theme={theme}
        >
          Entrar ou cadastrar
        </Button>
      </Line>
    </Container>
  );
};

export default LoginPopup;
