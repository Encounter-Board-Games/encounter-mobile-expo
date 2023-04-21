import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleCreateOrEditPayment,
  handleSetCurrentPayment,
  handleRemoveCurrentPaymentConfirmModal,
} from '../../store/actions/payments/payments';
import {
  Button,
  Subtitle2,
  Space,
  SpaceHorizontal,
  Bottom,
  Input,
  ScreenPopup,
  HideInfo,
  Content,
  ContentInput,
  ContentButton,
  Line,
  FlexItem,
  CustomInput,
  CustomInputText,
} from './CreatePaymentStyles';

function chunk(array, size) {
  const chunked_arr = [];
  for (let i = 0; i < array.length; i++) {
    const last = chunked_arr[chunked_arr.length - 1];
    if (!last || last.length === size) {
      chunked_arr.push([array[i]]);
    } else {
      last.push(array[i]);
    }
  }
  return chunked_arr;
}

const CreatePayment = (props) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpirationDate, setCardExpirationDate] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardDocument, setCardDocument] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const currentPayment = useSelector((state) => {
    if (state.payments.currentPaymentKey) {
      return state.payments.paymentMethods.find(
        (f) => f.key == state.payments.currentPaymentKey
      );
    }
    return undefined;
  });

  const dispatch = useDispatch();

  const onBack = () => {
    dispatch(handleSetCurrentPayment(undefined));
  };

  useEffect(() => {
    if (currentPayment) {
      const {
        card_number,
        card_expiration_date,
        card_holder_name,
        card_cvv,
        card_document,
      } = currentPayment;
      setCardNumber(card_number);
      setCardExpirationDate(card_expiration_date);
      setCardHolderName(card_holder_name);
      setCardCvv(card_cvv);
      setCardDocument(card_document);
      setIsEdit(true);
    }
  }, [currentPayment]);

  const enableButton = () => {
    return (
      cardNumber.length == 19 &&
      cardExpirationDate.length == 5 &&
      cardCvv.length == 3 &&
      cardHolderName.length > 3 &&
      (cardDocument.length == 14 || cardDocument.length == 18) &&
      !isEdit
    );
  };

  const submit = () => {
    Keyboard.dismiss();
    dispatch(
      handleCreateOrEditPayment(
        cardNumber,
        cardExpirationDate,
        cardHolderName,
        cardCvv,
        cardDocument
      )
    ).then((r) => {
      if (r) {
        props.navigation.navigate('Payments');

        if (props.choseMode) props.navigation.goBack();
      }
    });
  };

  const deletePayment = () => {
    dispatch(handleRemoveCurrentPaymentConfirmModal()).then((result) =>
      result ? props.navigation.goBack() : null
    );
  };

  return (
    <ScreenPopup
      noScroll
      onBack={() => onBack()}
      title="Cartão de Crédito"
      withBorder
    >
      <KeyboardAvoidingView
        style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
        behavior={Platform.OS == 'ios' ? 'padding' : undefined}
        enabled
        keyboardVerticalOffset={100}
      >
        <Content contentContainerStyle={{ flexGrow: 1 }}>
          <ContentInput>
            <Space n={3} />
            <React.Fragment>
              <Subtitle2>Número do cartão</Subtitle2>
              <Space n={1} />
              {isEdit ? (
                <CustomInput>
                  <HideInfo size={3} n={4} />
                  <SpaceHorizontal n={1} />
                  <HideInfo size={3} n={4} />
                  <SpaceHorizontal n={1} />
                  <HideInfo size={3} n={4} />
                  <SpaceHorizontal n={1} />
                  <CustomInputText>{cardNumber}</CustomInputText>
                </CustomInput>
              ) : (
                <Input
                  field
                  placeholder="XXXX XXXX XXXX XXXX"
                  value={cardNumber}
                  format={(value) => {
                    let valueToFormat = value.split(' ').join('');
                    return chunk(valueToFormat.split(''), 4)
                      .map((i) => i.join(''))
                      .join(' ');
                  }}
                  keyboardType="number-pad"
                  maxLength={19}
                  onChangeText={(value) => setCardNumber(value)}
                />
              )}
              <Space n={2} />
            </React.Fragment>
            <Line>
              <FlexItem>
                <Subtitle2>Validade</Subtitle2>
                <Space n={1} />
                <Input
                  field
                  placeholder="mm/aa"
                  disabled={isEdit}
                  value={cardExpirationDate}
                  format={(value) => {
                    let valueToFormat = value.split('/').join('');
                    if (valueToFormat.length > 2)
                      valueToFormat =
                        valueToFormat.slice(0, 2) +
                        '/' +
                        valueToFormat.slice(2);
                    return valueToFormat;
                  }}
                  keyboardType="number-pad"
                  maxLength={5}
                  onChangeText={(value) => setCardExpirationDate(value)}
                />
                <Space n={2} />
              </FlexItem>
              <SpaceHorizontal n={2} />
              <FlexItem>
                <Subtitle2>CVV</Subtitle2>
                <Space n={1} />
                {isEdit ? (
                  <CustomInput>
                    <HideInfo size={3} n={3} />
                  </CustomInput>
                ) : (
                  <Input
                    field
                    placeholder="CVV"
                    keyboardType="number-pad"
                    maxLength={3}
                    value={cardCvv}
                    onChangeText={(value) => setCardCvv(value)}
                  />
                )}
                <Space n={2} />
              </FlexItem>
            </Line>
            <React.Fragment>
              <Subtitle2>Nome do titular</Subtitle2>
              <Space n={1} />
              <Input
                field
                placeholder="Nome igual ao cartão"
                autoCapitalize="characters"
                disabled={isEdit}
                value={cardHolderName}
                onChangeText={(value) => setCardHolderName(value)}
              />
              <Space n={2} />
            </React.Fragment>
            <Line>
              <FlexItem>
                <Subtitle2>CPF/CNPJ do titular</Subtitle2>
                <Space n={1} />
                <Input
                  field
                  placeholder="XXX.XXX.XXX-XX"
                  value={cardDocument}
                  format={(value) => {
                    value = value.replace(/(\.|\/|\-)/g, '');
                    if (value.length <= 11)
                      return value.replace(
                        /(\d{3})(\d{3})(\d{3})(\d{2})/g,
                        '$1.$2.$3-$4'
                      );
                    return value.replace(
                      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
                      '$1.$2.$3/$4-$5'
                    );
                  }}
                  maxLength={18}
                  keyboardType="number-pad"
                  disabled={isEdit}
                  onChangeText={(value) => setCardDocument(value)}
                />

                <Space n={2} />
              </FlexItem>
              <FlexItem />
            </Line>
          </ContentInput>
          <ContentButton>
            {isEdit ? (
              <Button
                onPress={() => deletePayment()}
                type="CallToAction-Outline-Flex"
              >
                Excluir
              </Button>
            ) : (
              <Button
                disabled={!enableButton() || loading}
                onPress={() => submit()}
                type="CallToAction-Light"
              >
                Salvar
              </Button>
            )}
          </ContentButton>
          <Bottom />
        </Content>
      </KeyboardAvoidingView>
    </ScreenPopup>
  );
};

function mapStateToProps({ user, payments }) {
  return {
    user,
    choseMode: !!payments.choseMode,
    loading: !!payments.loading,
    isEdit: !!payments.currentPaymentKey,
    currentPayment: payments.currentPaymentKey
      ? payments.paymentMethods.find((f) => f.key == payments.currentPaymentKey)
      : undefined,
  };
}

export default CreatePayment;
