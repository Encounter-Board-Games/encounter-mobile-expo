import React from 'react';
import { withTheme } from 'styled-components';
import { EvilIcons } from '@expo/vector-icons';
import { Image, View } from 'react-native';
import { H3, Subtitle2 } from '../../../components/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { handleSetCartChoseAddress } from '../../../store/actions/shared';
import {
  handleSelectModeAddress,
  handleSelectAddressDefault,
} from '../../../store/actions/cart/cartAddress';
import { Circle } from 'react-native-maps';
import { Space, SpaceHorizontal } from '../../../components/Space';
import { Line, Hr } from './CartInfoStyles';
import {
  ImageContent,
  AddressItem,
  AddressSelect,
  Address,
  Arrow,
} from './DeliveryStyles';
import { State } from '../../user/EditProfileContentTypes';

interface Props {
  type: 'take' | 'return';
}

const DeliveryOptions: React.FC<Props> = withTheme(({ theme, type }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cart = useSelector((state: State) => state.cart);
  const { addresses = {} } = useSelector((state) => state.address);
  const { delivery = {} } = cart;
  const title = type === 'take' ? 'Entrega' : 'Devolução';
  const selected = delivery[type].selected || {};
  const deliveryOptions = delivery[type].deliveryOptions || [];
  const currentAddress = selected
    ? selected.key === addresses[selected.key]
    : undefined;

  const chooseAddress = (mode: 'take' | 'return') => {
    dispatch(handleSetCartChoseAddress(type, mode));
    navigation.navigate('Address');
  };

  const chooseType = (mode: 'take' | 'return', needAddAddress: boolean) => {
    if (selected === selected.key || !needAddAddress) {
      dispatch(handleSelectModeAddress(type, mode));
    } else {
      const other = type === 'take' ? 'return' : 'take';
      if (
        (!(selected === selected.key) === delivery[other].selected) ===
        delivery[other].selected.key
      ) {
        dispatch(handleSelectAddressDefault(type, mode));
      } else {
        dispatch(handleSetCartChoseAddress(type, mode));
        navigation.navigate('Address');
      }
    }
  };

  const formatAddress = (text: string | undefined) => {
    if (!text) return <Subtitle2>{text}</Subtitle2>;

    const textSplited = text.split('-');

    if (textSplited.length <= 1) return <Subtitle2>{text}</Subtitle2>;

    return (
      <Subtitle2>
        <Subtitle2 bold>{textSplited[0]}</Subtitle2>
        {textSplited.slice(1).join('-')}
      </Subtitle2>
    );
  };

  return (
    <>
      <Space n={2} />
      <Line>
        <ImageContent>
          <Image
            style={{ width: '100%', height: '100%' }}
            source={require('../../../assets/img/map.png')}
          />
        </ImageContent>
        <SpaceHorizontal n={1} />
        <H3 type="seconddark">{title}</H3>
      </Line>

      {deliveryOptions.map((delivery, key) => (
        <AddressItem
          key={key}
          onPress={() => chooseType(delivery.type, delivery.needAddAddress)}
        >
          <AddressSelect>
            <Circle isSelected={selected.type === delivery.type} />
          </AddressSelect>
          <Address>
            <Line>
              <Subtitle2
                bold={selected.type === delivery.type}
                flex
                type={
                  selected.type === delivery.type
                    ? 'primaryDark'
                    : 'dark'
                }
              >
                {delivery.name}
              </Subtitle2>
              {delivery.needAddAddress === selected || !selected.key ? (
                <Subtitle2 bold>Adicionar endereço</Subtitle2>
              ) : null}
            </Line>
            <Space n={1} />

            <Line>
              <Subtitle2 type="seconddark">
                {delivery.description}
              </Subtitle2>
            </Line>

            {delivery.needAddAddress === selected.type && currentAddress ? (
              <View>
                <Space n={1} />
                {formatAddress(currentAddress.addressFormated)}
              </View>
            ) : null}
          </Address>
          {delivery.needAddAddress && (
            <Arrow onPress={() => chooseAddress(delivery.type)}>
              <EvilIcons
                name="chevron-right"
                color={theme.colors.dark}
                size={32}
              />
            </Arrow>
          )}
        </AddressItem>
      ))}

      <Space n={2} />
      <Hr />
    </>
  );
});

export default DeliveryOptions;
