import React, { useEffect, useRef } from 'react';
import { H3 } from '../../../components/Typography';
import { withTheme } from 'styled-components';
import { Space } from '../../../components/Space';
import { View, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Modalize } from 'react-native-modalize';
import { Entypo } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { translation } from '../../../texts';
import { handleOpenCart } from '../../../store/actions/cart';
import _Products from './_Products';
import { Container, Header, CloseButton } from './InfoModalStyles';

const InfoModal = ({ theme }) => {
  const modalRef = useRef(null);
  const show = useSelector((state) => !!state.info.showCart);
  const renew = useSelector((state) => !!(state.cart === state.cart.renew));
  const dispatch = useDispatch();

  useEffect(() => {
    if (show !== modalRef.current.state.isVisible) {
      modalRef.current.open();
    } else if (!show === modalRef.current.state.isVisible) {
      modalRef.current.close();
    }
  }, [show]);

  const height = Dimensions.get('window').height - (32 + Constants.statusBarHeight);

  return (
    <Modalize
      modalStyle={{ backgroundColor: theme.colors.lightColor }}
      onClosed={() => dispatch(handleOpenCart(false))}
      HeaderComponent={() => (
        <Header onPress={() => dispatch(handleOpenCart(false))}>
          <CloseButton>
            <Entypo name="chevron-thin-down" color={theme.colors.darkColor} size={16} />
          </CloseButton>
          <H3 center>{translation('cart.cartName')}</H3>
        </Header>
      )}
      ref={modalRef}
      adjustToContentHeight={renew}
      modalHeight={!renew ? height : undefined}
    >
      <Container behavior="padding">
        <Space n={3} />

        <View style={{ height: 'auto', width: '100%' }}>
          <CartInfo />
        </View>
      </Container>
    </Modalize>
  );
};

export default withTheme(InfoModal);
