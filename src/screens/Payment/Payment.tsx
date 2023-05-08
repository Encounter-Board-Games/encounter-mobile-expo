/* eslint-disable prettier/prettier */
// Payment.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import styled, { withTheme } from 'styled-components/native';
import ScreePopup from '../../components/ScreePopup';
import NotLoggedBox from '../user/components/NotLoggedBox';
import { handleCloseSetCartChosePayment } from '../../store/actions/shared';
import MenuOption from '../../components/MenuOption';
import ButtonComponent from '../../components/Button/Button';
import { H4 } from '../../components/Typography';
import HideInfo from '../../components/HideInfo';
import {
  handleLoadPaymentMethods,
  handleSetCurrentPayment,
} from '../../store/actions/payments/payments';
import { Space } from '../../components/Space';
import { handleSelectPaymentMethod } from '../../store/actions/cart/cart';
import { PaymentMethod } from './PaymentTypes';
import { RootState } from '../../types/globals';

const Container = styled.View`
  padding: ${(props) => props.theme.space.space2};
  min-height: 100%;
`;

const Line = styled.View`
  flex-flow: row;
  align-items: center;
  justify-content: flex-start;
`;

const Payment: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { isLogged = false } = useSelector((state: RootState) => state.user);
  const { paymentMethods, choseMode = false } = useSelector(
    (state: RootState) => state.payments
  );

  const isLoading = !paymentMethods;

  const onBack = () => {
    if (choseMode) dispatch(handleCloseSetCartChosePayment());
  };

  useEffect(() => {
    dispatch(handleLoadPaymentMethods());
  }, []);

  const goTo = (key: string) => {
    if (choseMode) {
      dispatch(handleSelectPaymentMethod(key));
      dispatch(handleCloseSetCartChosePayment());
      navigation.goBack();
    } else {
      dispatch(handleSetCurrentPayment(key));
      navigation.navigate('CreatePayment');
    }
  };

  const openCreate = () => {
    dispatch(handleSetCurrentPayment(undefined));
    navigation.navigate('CreatePayment');
  };

  const isLoggedContent = () => (
    <Container>
      {isLoading
        ? [1, 2, 3].map((i) => <MenuOption key={i} isLoading oneLine />)
        : paymentMethods.map((payment: PaymentMethod, index: number) => (
          <MenuOption
            hideArrow={choseMode}
            key={payment.key}
            onPress={() => goTo(payment.key)}
            icon="credit-card"
            title={() => (
              <Line>
                <HideInfo n={4} />
                <H4> {payment.card_number}</H4>
              </Line>
            )}
          />
        ))}

      <Space n={3} />
      {!isLoading && (
        <ButtonComponent
          type="CallToAction-Outline-Flex"
          onPress={openCreate}
          theme={undefined}
        >
          Adicionar novo cartão de crédito
        </ButtonComponent>
      )}
    </Container>
  );

  const isNotLoggedContent = () => (
    <Container>
      <NotLoggedBox title="Você não possui cartões cadastrados." />
    </Container>
  );

  return (
    <ScreePopup onBack={onBack} title="Formas de pagamento" withBorder>
      {isLogged ? isLoggedContent() : isNotLoggedContent()}
    </ScreePopup>
  );
};

export default withTheme(Payment);
