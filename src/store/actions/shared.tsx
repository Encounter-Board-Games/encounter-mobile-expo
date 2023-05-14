import { handleInitBanner, handleLoadShelves } from './shelves';
import {
  handleLoadOnboarding,
  setSelectFilterToggleOnboarding,
} from './onboarding';
import {
  handleLoadFilters,
  handleLoadAndOpenFilter,
} from './filters/handleFilters';
import { handleUserData } from './user/handlers/handleUserData';
import { handleSetNotificationViewed } from './user/notifications';
import { setChoseAddressMode } from './address/address';
import { cartSetDeliveryTypeOpened } from './cart/cartDelivery';
import { handleLoadDeliveryMethods } from './cart/cartLoadDeliveryMethods';
import { setChosePaymentMethodsMode } from './payments/payments';
import { handleLoadAppConfig, handleLoadNeedUpdateApp } from './app';
import { handleShowNotification } from './notification';
import { handleSetCurrentProduct } from './product';
import { Linking } from 'react-native';
import {
  setSelectFilterToggleDiscovery,
  handleLoadDiscovery,
} from './discovery';
import { handleSetQuickSearchs } from './quickSearch/quickSearch';
import { useSendErrors } from '../../graphql/functions/loginClient';

export const handleInitHome = () => async (dispatch: any) => {
  await Promise.all([
    dispatch(handleLoadShelves()),
    dispatch(handleInitBanner()),
  ]);
};

export const handleInitApp = () => async (dispatch: any) => {
  try {
    await Promise.all([
      dispatch(handleLoadNeedUpdateApp()),
      dispatch(handleLoadAppConfig()),
      dispatch(handleLoadOnboarding()),
      dispatch(handleLoadFilters()),
    ]);

    dispatch(handleUserData()).then((_: any) =>
      dispatch(handleSetQuickSearchs())
    );
    dispatch(handleLoadDeliveryMethods());
    dispatch(handleLoadDiscovery());
  } catch (error) {
    console.log(error);
    useSendErrors();
  }
};

export const handleSetCartChoseAddress =
  (type: any, deliveryTypeMode: any) => (dispatch: any) => {
    dispatch(cartSetDeliveryTypeOpened(type, deliveryTypeMode));
    dispatch(setChoseAddressMode(true));
  };

export const handleCloseCartChoseAddress =
  (type: any, deliveryTypeMode: any) => (dispatch: any) => {
    dispatch(cartSetDeliveryTypeOpened(type, deliveryTypeMode));
    dispatch(setChoseAddressMode(false));
  };

export const handleSetCartChosePayment = () => (dispatch: any) => {
  dispatch(setChosePaymentMethodsMode(true));
};

export const handleCloseSetCartChosePayment = () => (dispatch: any) => {
  dispatch(setChosePaymentMethodsMode(false));
};

let redirectFunction: any;

export const registerRedirectComponent = (callback: any) => {
  redirectFunction = callback;
};

function redirect(screen: any) {
  if (redirectFunction) redirectFunction(screen);
}

export const handleProcessActions = (action: any) => async (dispatch: any) => {
  if (!action) return;
  const type = action.split('#|#')[0];

  if (type === 'product') {
    dispatch(handleSetCurrentProduct(action.split('#|#')[1]));
    redirect('ProductDetails');
  }

  if (type === 'filter') {
    await dispatch(handleLoadAndOpenFilter(action.split('#|#')[1]));
    redirect('Busca');
  }

  if (type === 'external_link') {
    Linking.openURL(action.split('#|#')[1]).catch(() =>
      dispatch(handleShowNotification('Erro ao abrir link externo.', 'danger'))
    );
  }
};

export const handleOpenNotification =
  (key: any, action: any) => async (dispatch: any, getState: any) => {
    dispatch(handleSetNotificationViewed(key));
    dispatch(handleProcessActions(action));
  };

export const handleSelectFilterToggle =
  (type: any, e: any) => (dispatch: any, getState: any) => {
    const { discovery } = getState();
    const { open = false } = discovery;

    if (!open) dispatch(setSelectFilterToggleOnboarding(type, e));
    else dispatch(setSelectFilterToggleDiscovery(type, e));
  };
