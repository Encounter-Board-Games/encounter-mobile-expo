import { openPopupModal } from '../../info';
import {
  emailExists,
  toggleFavorite,
  forgotPassword,
  respondQuestion,
} from '../../../../graphql';
import { handleShowNotification } from '../../notification';
import { SetAutocompleteRegisterAction, UserAction } from '../userTypes';
import { setLoginLoading, setErroLoginProcessMessage } from '../login';
import { UserState } from '../../../../types/globals';

export const SET_PENDENCES = 'SET_PENDENCES';

export function setAutocompleteRegister(
  name: string,
  lastname: string
): SetAutocompleteRegisterAction {
  return {
    type: 'SET_AUTO_COMPLETE_REGISTER',
    name,
    lastname,
  };
}

export function setLogged(user: any, action: string) {
  return {
    type: 'SET_LOGGED',
    user,
    action,
  };
}

export function setPendences(pendences: any) {
  return {
    type: SET_PENDENCES,
    pendences,
  };
}

export function setEmailLoginProcess(email: string, isLogin: boolean) {
  return {
    type: 'SET_EMAIL_LOGIN_PROCESS',
    email,
    isLogin,
  };
}

export function setIsCodeSent(isCodeSent: boolean, loginLoading: boolean) {
  return {
    type: 'SET_IS_CODE_SENT',
    isCodeSent,
    loginLoading,
  };
}

export function setFavorites(favorites: string[]) {
  return {
    type: 'SET_FAVORITES',
    favorites,
  };
}

export function handleEmailAlreadyExists(email: string) {
  return async (dispatch: (action: UserAction) => void) => {
    dispatch(setLoginLoading(true));
    const validateEmail = (email: string) => {
      var re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    };

    if (!validateEmail(email)) {
      dispatch(setLoginLoading(false));
      return dispatch(setErroLoginProcessMessage('E-mail inválido'));
    }

    const isLogin = await emailExists(email);
    dispatch(setEmailLoginProcess(email, isLogin));
    dispatch(setLoginLoading(false));
  };
}

export function handleToggleLike(productId: string) {
  return async (
    dispatch: (action: UserAction) => void,
    getState: () => { user: UserState }
  ) => {
    const { user } = getState();
    if (!user.isLogged) return dispatch(openPopupModal('LOGIN_POPUP'));
    const { userInfo = {} } = user;
    const { favorites = [] } = userInfo;
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
