import { openPopupModal } from '../../info';
import {
  toggleFavorite,
  forgotPassword,
  respondQuestion,
} from '../../../../graphql';
import { handleShowNotification } from '../../notification';
import { UserAction } from '../userTypes';
import { setLoginLoading } from '../login';
import { UserState } from '../../../../types/globals';
import { addUserFavorite, removeUserFavorite } from './handlerUser';
import { setIsCodeSent } from './handlersSetters';

interface UserInfo {
  favorites?: string[];
  // add other properties as needed
}

export const SET_PENDENCES = 'SET_PENDENCES';

export function handleToggleLike(productId: string) {
  return async (
    dispatch: (action: UserAction) => void,
    getState: () => { user: UserState }
  ) => {
    const { user } = getState();
    if (!user.isLogged) return dispatch(openPopupModal('LOGIN_POPUP'));
    const { userInfo = {} } = user;
    const { favorites = [] } = userInfo as UserInfo;
    const isAdd = !favorites.includes(productId);
    if (isAdd) {
      dispatch(addUserFavorite(productId));
    } else {
      dispatch(removeUserFavorite(productId));
    }
    try {
      await toggleFavorite(productId);
      if (isAdd)
        dispatch(handleShowNotification('Adicionado aos Meus Favoritos.'));
      else dispatch(handleShowNotification('Removido dos Meus Favoritos.'));
    } catch (error) {
      if (isAdd) dispatch(removeUserFavorite(productId));
      else dispatch(addUserFavorite(productId));
    }
  };
}

export function handleForgotPassword() {
  return async (
    dispatch: (action: UserAction) => void,
    getState: () => { user: UserState }
  ) => {
    const { user } = getState();
    const { login = {} } = user;
    dispatch(setLoginLoading(true));
    const result = await forgotPassword(login.email);
    if (result.success) {
      dispatch(setIsCodeSent(true, true));
    } else {
      dispatch(
        handleShowNotification('Ocorreu um erro. Tente novamente.', 'danger')
      );
    }
    dispatch(setLoginLoading(false));
  };
}

export function handleRespondQuestion(value: string) {
  return async (dispatch: (action: UserAction) => void) => {
    const deviceID = await getUniqueDeviceId();
    const response = await respondQuestion(deviceID, value);
    dispatch({ type: 'RESPOND_QUESTION', payload: response });
  };
}

function getUniqueDeviceId() {
  throw new Error('Function not implemented.');
}