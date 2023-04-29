import React from 'react';
import { Subtitle2 } from '../../../components/Typography';
import { Space, SpaceHorizontal } from '../../../components/Space';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { handleCheckOut } from '../../../store/actions/cart/cartCheckOut';
import { useNavigation } from '@react-navigation/native';
import Delivery from './Delivery';
import Payment from './Payment';
import { translation } from '../../../texts';
import config from '../../../config';
import { handleOpenCart } from '../../../store/actions/cart/cart';
import { Line } from './CartInfoStyles';
import { Cupom, Billing, Disclaimer, DisclaimerRenew } from './Helpers';
import { Content, SafeSpace } from './InfoModalStyles';
import { ButtonComponent } from '../../../components/Button/ButtonStyles';
import { CartState } from './CartTypes';

interface Cart {
  renew: boolean;
  products: any[];
  subtotal: number;
  delivery: any;
  sizes: any;
  deliveryTaxes?: number;
  total?: number;
  cupom?: any;
  time?: any;
  isLoading: boolean;
  payment?: any;
}

interface User {
  isLogged: boolean;
  pendences: any[];
}

const CartInfo: React.FC = () => {
  const cart: Cart = useSelector((state: CartState) => state.cart);
  const navigation = useNavigation();
  const { isLogged = false, pendences = [] }: User = useSelector(
    (state: any) => state.user
  );

  const {
    renew,
    products = [],
    subtotal = 0,
    delivery = {},
    sizes = {},
    deliveryTaxes = undefined,
    total = undefined,
    cupom = undefined,
    time = undefined,
    isLoading = false,
    payment = undefined,
  } = cart;
  const hasLeave = !!(delivery['leave'] === delivery['leave'].deliveryOptions);
  const dispatch = useDispatch();

  let button = {
    action: () =>
      dispatch(handleCheckOut()).then((r) => {
        if (r) navigation.navigate('Billing');
      }),
    text: translation('orders.orderAction'),
  };

  return (
    <View style={{ minHeight: '100%', paddingBottom: 16 }}>
      <Content style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {renew && <DisclaimerRenew time={time} />}
        {!renew && (
          <>
            {isLogged && config.rentTimeBox && (
              <Disclaimer products={products} time={time} />
            )}
            {isLogged && <Delivery type="take" />}

            {isLogged && hasLeave && <Delivery type="leave" />}

            {isLogged && <Cupom cupom={cupom} />}
          </>
        )}

        <Products renew={renew} />

        <Billing renew={renew} {...{ subtotal, deliveryTaxes, total, cupom }} />

        {isLogged && <Payment />}

        {!isLogged && config.rentTimeBox && (
          <React.Fragment>
            <Space n={2} />
            <Disclaimer products={products} time={time} />
          </React.Fragment>
        )}

        {!isLogged && <Space n={5} />}
      </Content>

      {!isLogged && (
        <React.Fragment>
          <Subtitle2 type={'secondDarkColor'} center>
            {translation('cart.notLogged')}
          </Subtitle2>
          <Space n={3} />
        </React.Fragment>
      )}
      <Line>
        {renew && (
          <>
            <ButtonComponent
              type="CallToAction-Outline"
              disabled={isLoading}
              onPress={() => dispatch(handleOpenCart(false))}
            >
              Cancelar
            </ButtonComponent>
            <SpaceHorizontal n={2} />
          </>
        )}
        <ButtonComponent
          flex
          type="CallToAction-Light"
          disabled={isLoading}
          onPress={button.action}
        >
          {button.text}
        </ButtonComponent>
      </Line>
      <SafeSpace />
    </View>
  );
};

export default CartInfo;
