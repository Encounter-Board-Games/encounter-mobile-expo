import React from 'react';
import Modal from 'react-native-modal';
import { KeyboardAvoidingView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';

import Evaluate from '../product/components/Evaluate';
import PopupLogin from './components/PopupLogin';
import WppRedirect from './components/WppRedirect';
import InfoPopup from './components/InfoPopup';
import ConfirmModal from './components/ConfirmModal';
import TextModal from './components/TextModal';
import OptionsModal from './components/OptionsModal';

import { closePopupModal } from '../../store/actions/info';

interface InfoState {
  popup?: {
    open?: boolean;
    type?: string;
  };
}

const Container = styled.View`
  padding: ${({ theme }) => theme.space.space2};
  background: ${({ theme }) => theme.colors.lightColor};
  width: 100%;
  flex-wrap: wrap;
  border-radius: ${({ theme }) => theme.borderRadius.button};
  shadow-color: ${({ theme }) => theme.shadow.shadowColor};
  shadow-offset: ${({ theme }) =>
    `${theme.shadow.shadowOffset.width} ${theme.shadow.shadowOffset.width}`};
  shadow-opacity: ${({ theme }) => theme.shadow.shadowOpacity};
  shadow-radius: ${({ theme }) => theme.shadow.shadowRadius};
`;

interface BodyProps {
  type: string;
}

const Body: React.FC<BodyProps> = ({ type }) => {
  switch (type) {
    case 'EVALUATE':
      return <Evaluate />;
    case 'WPP_POPUP':
      return <WppRedirect />;
    case 'CONFIRM_MODAL':
      return <ConfirmModal />;
    case 'TEXT_MODAL':
      return <TextModal />;
    case 'OPTIONS_MODAL':
      return <OptionsModal />;
    case 'LOGIN_POPUP':
      return <PopupLogin />;
    case 'INFO_POPUP':
      return <InfoPopup />;
    default:
      return null;
  }
};

const PopupModal: React.FC = () => {
  const info = useSelector((state: { info: InfoState }) => state.info || {});
  const dispatch = useDispatch();

  const isVisible = info.popup?.open ?? false;
  const type = info.popup?.type ?? '';

  return (
    <Modal
      isVisible={isVisible}
      animationIn="fadeIn"
      animationOut="fadeOut"
      onBackdropPress={() => dispatch(closePopupModal())}
    >
      <KeyboardAvoidingView behavior="padding">
        <Container>
          <Body type={type} />
        </Container>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default PopupModal;
