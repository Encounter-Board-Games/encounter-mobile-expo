import React from 'react';
import { withTheme } from 'styled-components';
import { Subtitle2, Subtitle1 } from '../../../components/Typography';
import { Space, SpaceHorizontal } from '../../../components/Space';
import { EvilIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { AddressBox, AddressBoxInfo } from './BoxAddressStyles';

const BoxAddress = ({ address, addressKey, onPress, choseAddressMode, theme }) => {
  if (!address) return null;
  return (
    <React.Fragment>
      <AddressBox onPress={() => onPress(addressKey)}>
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
    </React.Fragment>
  );
};

function mapStateToProps({ address }, { addressKey }) {
  return {
    address: address.adresses[addressKey],
  };
}

export default withTheme(connect(mapStateToProps)(BoxAddress));
