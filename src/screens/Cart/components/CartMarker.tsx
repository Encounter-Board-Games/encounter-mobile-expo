import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { currencyFormat } from '../../../utils/helpers';
import { translation } from '../../../texts/translations';
import { handleOpenCart } from '../../../store/actions/cart/cart';
import {
  Container,
  PriceContent,
  Price,
  PriceItem,
  Button,
  ButtonText,
} from './CartMarkerStyles';



const CartSummary: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<State, unknown, AnyAction>>();
  const {
    total = 0,
    time,
    products = [],
  }: Cart = useSelector((state: State) => state.cart);
  const countItems =
    products.length === 1 ? '1 item' : `${products.length} itens`;

  return (
    <Container>
      <PriceContent flex={1} style={{ flexFlow: 'row' }}>
        <Price>{currencyFormat(total)}</Price>
        {time && (
          <PriceItem>
            {translation('cart.minimezedText', { time, countItems })}
          </PriceItem>
        )}
      </PriceContent>
      <Button onPress={() => dispatch(handleOpenCart())}>
        <ButtonText>{translation('cart.openCart')}</ButtonText>
      </Button>
    </Container>
  );
};

export default CartSummary;
