import React, { useEffect, useRef } from 'react';
import { H3 } from '../../../components/Typography';
import { withTheme } from 'styled-components/native';
import { Space } from '../../../components/Space';
import { View, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Modalize } from 'react-native-modalize';
import { Entypo } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { translation } from '../../../texts';
import { handleOpenCart } from '../../../store/actions/cart/cart';
import ProductsComponent from './ProductsComponent';
import { Container, Header, CloseButton } from './InfoModalStyles';
import { useTheme } from '@react-navigation/native';
import { Theme } from '../../../styles/themeTypes';

interface InfoModalProps {
  theme: Theme;
}

const HeaderComponent: React.FC<{ onPress: () => void }> = ({ onPress }) => {
  const { colors } = useTheme();
  return (
    <Header onPress={onPress}>
      <CloseButton>
        <Entypo name="chevron-thin-down" color={colors.darkColor} size={16} />
      </CloseButton>
      <H3 center>{translation('cart.cartName')}</H3>
    </Header>
  );
};

const InfoModal: React.FC<InfoModalProps> = ({ theme }) => {
  const modalRef = useRef<Modalize>(null);
  const show = useSelector((state: any) => !!state.info.showCart);
  const renew = useSelector((state: any) => state.cart === state.cart.renew);
  const dispatch = useDispatch();

  useEffect(() => {
    if (show !== modalRef.current?.state.isVisible) {
      modalRef.current?.open();
    } else if (!show === modalRef.current?.state.isVisible) {
      modalRef.current?.close();
    }
  }, [show]);

  const height =
    Dimensions.get('window').height - (32 + Constants.statusBarHeight);

  return (
    <Modalize
      modalStyle={{ backgroundColor: theme.colors.lightColor }}
      onClosed={() => dispatch(handleOpenCart(false))}
      HeaderComponent={
        <HeaderComponent onPress={() => dispatch(handleOpenCart(false))} />
      }
      ref={modalRef}
      adjustToContentHeight={renew}
      modalHeight={!renew ? height : undefined}
    >
      <Container behavior="padding">
        <Space n={3} />

        <View style={{ height: 'auto', width: '100%' }}>
          <ProductsComponent />
        </View>
      </Container>
    </Modalize>
  );
};

export default withTheme(InfoModal);
