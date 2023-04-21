import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Subtitle2, Subtitle1 } from '../../../components/Typography';
import { Space, SpaceHorizontal } from '../../../components/Space';
import { EvilIcons } from '@expo/vector-icons';
import { setAddressSelected } from '../../../store/actions/address/address';
import { AddressBox, AddressBoxInfo } from './BoxAddressStyles';

const BoxAddress = ({ addressKey, choseAddressMode }) => {
  const dispatch = useDispatch();
  const address = useSelector(state => state.address.adresses[addressKey]);

  const handlePress = () => {
    dispatch(setAddressSelected(addressKey));
  };

  if (!address) return null;

  return (
    <AddressBox onPress={handlePress}>
      <AddressBoxInfo>
        <Subtitle1>{address.nameFormated}</Subtitle1>
        <Space n={0} />
        <Subtitle2 type="secondDarkColor">{address.addressFormated}</Subtitle2>
        <Subtitle2 type="secondDarkColor">{address.complement}</Subtitle2>
      </AddressBoxInfo>
      <SpaceHorizontal n={2} />
      {!choseAddressMode && (
        <EvilIcons
          name="chevron-right"
          color={theme.colors.darkColor}
          size={theme.sizes.icons}
        />
      )}
    </AddressBox>
  );
};

export default BoxAddress;
