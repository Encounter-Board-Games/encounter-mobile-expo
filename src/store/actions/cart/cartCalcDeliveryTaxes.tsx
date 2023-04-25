import { deliveryTaxes } from '../../../graphql';
import { cartIsLoading } from './cart';
import { setDeliveryTaxes } from './cartDelivery';
import { calcTotal } from './cartOrderPayment';

export function handleCalcDeliveryTaxes() {
  return async (dispatch: Function, getState: Function) => {
    const { cart = {}, user = {}, address = {} } = getState();
    const { delivery = {} } = cart;
    const { adresses = {} } = address;

    const { take = {}, leave = undefined } = delivery;
    const hasLeave = !!(leave && leave.deliveryOptions);

    if (
      take.selected &&
      take.selected.type &&
      (!hasLeave || (leave.selected && leave.selected.type))
    ) {
      dispatch(cartIsLoading(true));

      const total = await deliveryTaxes(
        take.selected.type,
        hasLeave ? leave.selected.type : undefined,
        adresses[take.selected.key]?.cep,
        hasLeave && adresses[leave.selected.key]?.cep
      );

      dispatch(cartIsLoading(false));
      dispatch(setDeliveryTaxes(total));
    } else {
      dispatch(setDeliveryTaxes(0));
    }

    dispatch(calcTotal());
  };
}
