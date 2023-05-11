import { openPopupModal } from '../info';
import { createOrder, renewOrderM } from '../../../graphql';
import { addOrderAndSelect } from '../orders';
import { handleShowNotification } from '../notification';
import { translation } from '../../../texts/translations';
import config from '../../../../config';

export function handleCheckOut() {
  return async (dispatch: any, getState: any) => {
    try {
      dispatch(cartIsLoading(true));

      const { cart } = getState();
      const renew = cart.renew;
      let order = {};
      if (renew) {
        order = await renewOrderM(cart.renewOrderId, cart.payment);
      } else {
        const { delivery, products, total, payment, sizes, cupom } = cart;
        const { take, leave } = delivery;
        const hasLeave = !!(leave && leave.deliveryOptions);
        const cupomKey = cupom ? cupom.key : undefined;
        const productKeys = products;

        const takeDeliveryMethod = take.selected.type;
        const leaveDeliveryMethod = hasLeave ? leave.selected.type : undefined;

        const takeDeliveryAddressKey = take.selected.key;
        const leaveDeliveryAddressKey = hasLeave
          ? leave.selected.key
          : undefined;

        const totalSumCart = total;

        const productsNames = () => {
          if (!config.chooseTagsAndCategories) return [];

          const names = Object.keys(sizes)
            .filter((key) => !!sizes[key])
            .map((key) => ({ key, value: sizes[key] }));

          return names;
        };
        const productsName = productsNames();

        order = await createOrder(
          productKeys,
          payment,
          totalSumCart,
          cupomKey,
          takeDeliveryMethod,
          leaveDeliveryMethod,
          takeDeliveryAddressKey,
          leaveDeliveryAddressKey,
          productsName
        );
      }

      dispatch(cartIsLoading(false));
      if (!order.success) {
        if (order.message)
          dispatch(
            openPopupModal('INFO_POPUP', {
              title: 'Ops... 😔',
              text: order.message,
            })
          );
        return false;
      }
      // console.log(JSON.stringify(order.order, null,))
      dispatch(addOrderAndSelect(order.order));
      dispatch(clear());
      dispatch(handleOpenCart(false));
      if (renew) dispatch(handleShowNotification('Renovação realizada.'));
      else dispatch(handleShowNotification('Pedido realizado'));
      if (order.order)
        if (order.order.isFirst)
          dispatch(
            openPopupModal('INFO_POPUP', {
              title: translation('orders.firstOrder.title'),
              text: translation('orders.firstOrder.description'),
            })
          );

      return true;
    } catch (error) {
      dispatch(
        handleShowNotification(
          'Ops, ocorreu um erro. Tente novamente mais tarde.',
          'danger'
        )
      );
      console.log(error);
      dispatch(cartIsLoading(false));
    }
  };
}
