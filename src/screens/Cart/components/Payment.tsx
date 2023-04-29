import React, { useEffect } from 'react';
import { Space, SpaceHorizontal } from '../../../components/Space';
import { H4, Subtitle2, H3 } from '../../../components/Typography';
import styled, { DefaultTheme, withTheme } from 'styled-components/native';
import { EvilIcons } from '@expo/vector-icons';
import HideInfo from '../../../components/HideInfo';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { handleSetCartChosePayment } from '../../../store/actions/shared';
// eslint-disable-next-line max-len
import { handleLoadPaymentMethods } from '../../../store/actions/payments/payments';

interface PaymentProps {
  theme: DefaultTheme;
}

const Line = styled.View`
  flex-flow: row;
  align-items: center;
`;

const Title = styled.View`
  flex: 1;
  padding-right: 8px;
`;

const SelectPayment = styled.TouchableOpacity`
  flex-flow: row;
`;

const Payment: React.FC<PaymentProps> = ({ theme }) => {
  const { payment } = useSelector((state: any) => state.cart);
  const { paymentMethods } = useSelector((state: any) => state.payments);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (!paymentMethods) dispatch(handleLoadPaymentMethods());
  }, [dispatch, paymentMethods]);

  const methods = paymentMethods || [];
  const selectedMethod = methods.find((p) => p.key === payment);
  const cardNumber = selectedMethod ? selectedMethod.card_number : undefined;

  const addPayment = () => {
    dispatch(handleSetCartChosePayment());
    navigation.navigate('Payments');
  };

  return (
    <>
      <Space n={2} />
      <H3 type="secondDarkColor">Pagamento</H3>
      <Space n={2} />
      <Line>
        <Title>
          <H4>Pagamento via app</H4>
        </Title>
        {!!cardNumber ? (
          <SelectPayment onPress={addPayment}>
            <EvilIcons
              name="credit-card"
              color={theme.colors.darkColor}
              size={24}
            />
            <SpaceHorizontal n={0} />
            <HideInfo n={4} />
            <SpaceHorizontal n={0} />
            <Subtitle2 bold>{cardNumber}</Subtitle2>
          </SelectPayment>
        ) : (
          <SelectPayment onPress={addPayment}>
            <Subtitle2 bold>Adicionar cartão</Subtitle2>
            <EvilIcons
              name="chevron-right"
              color={theme.colors.darkColor}
              size={24}
            />
          </SelectPayment>
        )}
      </Line>
    </>
  );
};

export default withTheme(Payment);
