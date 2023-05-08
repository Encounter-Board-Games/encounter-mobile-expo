import { openPopupModal } from '../info';
import config from '../../../config';
import { addProduct, handleOpenCart } from './cart';
import { handleApplyCupon, calcTotal } from './cartOrderPayment';
import {
  ProductOption,
  OptionsModalProps,
} from '../../../types/actionCartTypes';

export function handleAddProduct(productKey: string, options: ProductOption[]) {
  return (dispatch: Function, getState: Function) => {
    const chooseOption = (size: string) => {
      dispatch(addProduct(productKey, size));
      dispatch(handleOpenCart());

      dispatch(handleApplyCupon());
      dispatch(calcTotal());

      return true;
    };

    if (!config.chooseTagsAndCategories || options.length <= 1) {
      return Promise.resolve(chooseOption(''));
    }

    return new Promise<string | undefined>((resolve) => {
      dispatch(
        openPopupModal('OPTIONS_MODAL', {
          callBack: (option: string | undefined) => {
            if (option) {
              chooseOption(option);
            }
            resolve(option);
          },
          options,
          title: 'Escolha o tamanho:',
        } as OptionsModalProps)
      );
    });
  };
}
