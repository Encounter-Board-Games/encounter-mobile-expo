import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../types/globals';
import { Action } from 'redux';
import { openPopupModal } from '../info';
import { translation } from '../../../texts/translations';
import { handleRemoveProduct } from './cart';
import { handleApplyCupon } from './cartOrderPayment';

export const handleRemoveProductConfirmModal = (
  productKey: string
): ThunkAction<Promise<boolean>, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    return await new Promise<boolean>((resolve) => {
      dispatch(
        openPopupModal('CONFIRM_MODAL', {
          callBack: (r: boolean) => {
            if (r) {
              dispatch(handleRemoveProduct(productKey));
              dispatch(handleApplyCupon());
            }
            resolve(r);
          },
          confirmBtn: 'Sim',
          title: translation('cart.cartRemove'),
        })
      );
    });
  };
};
