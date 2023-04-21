import { ThunkAction } from 'redux-thunk';
import { handleInitBanner, handleLoadShelves } from './shelves/shelves';
import {
  handleLoadOnboarding,
  setSelectFilterToggleOnboarding,
} from './onboarding';
import { handleLoadFilters, handleLoadAndOpenFilter } from './filters/handleFilters';
import { handleUserData } from './user/handlers/handlerUserData';
import { cartSetDeliveryTypeOpened, handleLoadDeliveryMethods } from './cart';
import { handleLoadAppConfig, handleLoadNeedUpdateApp } from './app';
import { handleShowNotification } from './notification';
import { handleSetCurrentProduct } from './product';
import { Linking } from 'react-native';
import {
  setSelectFilterToggleDiscovery,
  handleLoadDiscovery,
} from './discovery';
import { sendErros } from '../../graphql';
import { RootState } from '../reducers';
import { setChoseAddressMode } from './address/address';
import { setChosePaymentMethodsMode } from './payments/payments';
import { handleSetQuickSearchs } from './quickSearch/quickSearch';
import { handleSetNotificationViewed } from './user/notifications';
import { Action } from 'redux';

export const handleInitHome = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => {
  return async (dispatch) => {
    await Promise.all([
      dispatch(handleLoadShelves()),
      dispatch(handleInitBanner()),
    ]);
  };
};

export const handleInitApp = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => {
  return async (dispatch) => {
    try {
      await Promise.all([
        dispatch(handleLoadNeedUpdateApp()),
        dispatch(handleLoadAppConfig()),
        dispatch(handleLoadOnboarding()),
        dispatch(handleLoadFilters()),
      ]);
      dispatch(handleUserData()).then((_) => dispatch(handleSetQuickSearchs()));
      dispatch(handleLoadDeliveryMethods());
      dispatch(handleLoadDiscovery());
    } catch (error) {
      console.log(error);
      sendErros(JSON.stringify(error));
    }
  };
};

export const handleSetCartChoseAddress = (
  type: string,
  deliveryTypeMode: string
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return (dispatch) => {
    dispatch(cartSetDeliveryTypeOpened(type, deliveryTypeMode));
    dispatch(setChoseAddressMode(true));
  };
};

export const handleCloseCartChoseAddress = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => {
  return (dispatch) => {
    dispatch(cartSetDeliveryTypeOpened(undefined));
    dispatch(setChoseAddressMode(false));
  };
};

export const handleSetCartChosePayment = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => {
  return (dispatch) => {
    dispatch(setChosePaymentMethodsMode(true));
  };
};

export const handleCloseSetCartChosePayment = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => {
  return (dispatch) => {
    dispatch(setChosePaymentMethodsMode(false));
  };
};

let redirectFunction: ((screen: string) => void) | undefined;
export const registerRedirectComponent = (
  callback: (screen: string) => void
): void => {
  redirectFunction = callback;
};

function redirect(screen: string) {
  if (redirectFunction) redirectFunction(screen);
}

export const handleProcessActions = (
  action: string | undefined
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    if (!action) return;
    const type = action.split('#|#')[0];

    if (type == 'product') {
      dispatch(handleSetCurrentProduct(action.split('#|#')[1]));
      redirect('ProductDetails');
    }
    if (type == 'order') {
      // dispatch(handleSetCurrentProduct(action.split("#|#")[1]))
      // redirect("Billing")
    }

    if (type == 'filter') {
      await dispatch(handleLoadAndOpenFilter(action.split('#|#')[1]));
      redirect('Busca');
    }

    if (type == 'external_link') {
      Linking.openURL(action.split('#|#')[1]).catch(() =>
        dispatch(
          handleShowNotification('Erro ao abrir link externo.', 'danger')
        )
      );
    }
  };
};

export const handleOpenNotification = (
  key: string,
  action: string | undefined
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch, getState) => {
    dispatch(handleSetNotificationViewed(key));
    dispatch(handleProcessActions(action));
  };
};

export const handleSelectFilterToggle = (
  type: string,
  e: boolean
): ThunkAction<void, RootState, unknown, Action<string>> => {
  return (dispatch, getState) => {
    const { discovery } = getState();
    const { open = false } = discovery;
    if (!open) dispatch(setSelectFilterToggleOnboarding(type, e));
    else dispatch(setSelectFilterToggleDiscovery(type, e));
  };
};
