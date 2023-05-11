import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withTheme } from 'styled-components/native';
import { Subtitle2, H3 } from '../../../components/Typography';
import { Space, SpaceHorizontal, Bottom } from '../../../components/Space';
import ScreenPopup from '../../../components/ScreenPopup';
import { Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import {
  handleAddOrEditAddress,
  handleRemoveAddressConfirmModal,
} from '../../../store/actions/address/address';
import { View } from 'react-native-animatable';
import Icons from '../../../components/IconsComponent';
import {
  Content,
  ContainerInputs,
  Line,
  LineButtons,
  LineAddress,
  Column,
} from './AddAddressStyles';
import { RootState } from '../../../types/globals';
import { AddressState, CurrentLocation } from '../AddressTypes';
import { ButtonComponent } from '../../../components/Button/ButtonStyles';
import { CustomInput } from '../../user/EditProfileContentStyles';
import { Dispatch } from 'redux';

export interface Props {
  theme: Theme;
  navigation: {
    navigate: (route: string) => void;
    goBack: () => void;
  };
  dispatch: Dispatch;
  state: {
    name: string;
    complement: string;
    number: string;
    reference: string;
    cep: string;
  };
}

const AddAddress: React.FC<Props> = ({ theme, navigation }) => {
  const [state, setState] = useState<AddressState>({
    cep: '',
    number: '',
    complement: '',
    reference: '',
    name: '',
    isEdit: false,
  });

  const dispatch = useDispatch();
  const currentLocation = useSelector<RootState, CurrentLocation>(
    (state) => state.address.currentLocation
  );
  const choseAddressMode = useSelector<RootState, boolean>(
    (state) => !!state.address.choseAddressMode
  );

  useEffect(() => {
    if (currentLocation.cep) {
      setState((prevState) => ({ ...prevState, cep: currentLocation.cep }));
    }

    if (currentLocation.key) {
      const { name, complement, number, reference, cep } = currentLocation;

      setState((prevState) => ({
        ...prevState,
        name,
        complement,
        number,
        reference,
        cep,
        isEdit: true,
      }));
    }
  }, [currentLocation]);

  const enableButton = () => {
    const { number } = state;
    return number.length > 0;
  };

  const formatCep = (value: string) => {
    var numberPattern = /\d+/g;
    var valueToFormat =
      value.length !== 0
        ? value.match(numberPattern)?.join('').substring(0, 11) ?? value
        : value;

    if (valueToFormat.length >= 6) {
      setState((prevState) => ({
        ...prevState,
        cep: valueToFormat.substring(0, 5) + '-' + valueToFormat.substring(5),
      }));
    } else {
      setState((prevState) => ({ ...prevState, cep: valueToFormat }));
    }
  };

  const deleteAddress = () => {
    dispatch(handleRemoveAddressConfirmModal()).then(
      (r) => r && navigation.goBack()
    );
  };

  const saveInfo = () => {
    Keyboard.dismiss();

    const { name, complement, number, reference, cep } = state;
    dispatch(
      handleAddOrEditAddress(number, complement, reference, name, cep)
    ).then((result) => {
      if (result) {
        navigation.navigate('Address');
      }

      if (choseAddressMode) {
        navigation.goBack();
      }
    });
  };

  return (
    <ScreenPopup noScroll withBorder title={'Endereços'}>
      <KeyboardAvoidingView
        style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
        keyboardVerticalOffset={100}
      >
        <Content contentContainerStyle={{ flexGrow: 1 }}>
          <ContainerInputs>
            <LineAddress>
              <Icons
                name="location-pin"
                color={theme.colors.dark}
                size={24}
              />
              <SpaceHorizontal n={2} />
              <Column>
                <H3>{currentLocation.street}</H3>
                <Subtitle2>
                  {currentLocation.neighborhood} - {currentLocation.city}/
                  {currentLocation.state}
                </Subtitle2>
              </Column>
            </LineAddress>
            <Space n={4} />
            <Line>
              <ContainerInputs>
                <Subtitle2>CEP*</Subtitle2>
                <Space n={1} />
                <CustomInput
                  field
                  placeholder="CEP"
                  disabled={state.isEdit}
                  keyboardType="number-pad"
                  maxLength={9}
                  value={state.cep}
                  onChangeText={(value) => formatCep(value)}
                />
              </ContainerInputs>
              <SpaceHorizontal n={2} />

              <ContainerInputs>
                <Subtitle2>Número*</Subtitle2>
                <Space n={1} />
                <CustomInput
                  field
                  placeholder="Insira o número"
                  value={state.number}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, number: value }))
                  }
                />
              </ContainerInputs>
            </Line>
            <Space n={2} />
            <Subtitle2>Complemento</Subtitle2>
            <Space n={1} />
            <CustomInput
              field
              placeholder="Apto/Bloco/Casa"
              value={state.complement}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, complement: value }))
              }
            />
            <Space n={2} />
            <Line>
              <ContainerInputs>
                <Subtitle2>Ponto de referência</Subtitle2>
                <Space n={1} />
                <CustomInput
                  field
                  placeholder="Ponto de referência"
                  value={state.reference}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      reference: value,
                    }))
                  }
                />
              </ContainerInputs>
            </Line>
            <Space n={2} />

            <Line>
              <ContainerInputs>
                <Subtitle2>Nomear como</Subtitle2>
                <Space n={1} />
                <CustomInput
                  field
                  placeholder="Ex: casa, trabalho"
                  value={state.name}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, name: value }))
                  }
                />
                <Space n={2} />
              </ContainerInputs>
              <SpaceHorizontal n={2} />
              <ContainerInputs />
            </Line>
          </ContainerInputs>

          {state.isEdit ? (
            <LineButtons>
              <View style={{ flex: 1 }}>
                <ButtonComponent
                  onPress={() => deleteAddress()}
                  type="CallToAction-Outline-Flex"
                >
                  Excluir
                </ButtonComponent>
              </View>
              <SpaceHorizontal n={2} />
              <View style={{ flex: 1 }}>
                <ButtonComponent
                  disabled={!enableButton()}
                  onPress={() => saveInfo()}
                  type="CallToAction-Light-Small"
                >
                  Salvar
                </ButtonComponent>
              </View>
            </LineButtons>
          ) : (
            <ButtonComponent
              disabled={!enableButton()}
              onPress={() => saveInfo()}
              type="CallToAction-Light-Small"
            >
              Salvar
            </ButtonComponent>
          )}
          <Bottom />
        </Content>
      </KeyboardAvoidingView>
    </ScreenPopup>
  );
};

export default withTheme(AddAddress);
