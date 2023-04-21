import {
  createAuth,
  registerAccessLog,
  confirmCode,
  login as loginApi,
  forgotPassword,
  resetPassword,
  confirmCodeResetPassword,
} from '../../../graphql';
import * as Device from 'expo-device';
import storage from '../../../utils/storage';

import { handleShowNotification } from '../notification';
import { handleLogoutCart } from '../cart';
import { setIsCodeSent, handleUserData } from './handlers';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../Store';

export const SHOW_LOGIN_POPUP = 'SHOW_LOGIN_POPUP';
export const SET_LOGOUT_USER = 'SET_LOGOUT_USER';
export const SET_NEED_COMPLETE_INFOS = 'SET_NEED_COMPLETE_INFOS';
export const SET_LOGIN_USER = 'SET_LOGIN_USER';
export const SET_IS_CODE_SENT = 'SET_IS_CODE_SENT';
export const SET_IS_CHANGE_PASSWORD = 'SET_IS_CHANGE_PASSWORD';
export const SET_EMAIL_LOGIN_PROCESS = 'SET_EMAIL_LOGIN_PROCESS';
export const SET_LOGIN_LOADING = 'SET_LOGIN_LOADING';
export const SET_ERROR_LOGIN_PROCESS_MESSAGE =
  'SET_ERROR_LOGIN_PROCESS_MESSAGE';
export const SET_BACK_LOGIN_SCREEN_LOGIN_PROCESS =
  'SET_BACK_LOGIN_SCREEN_LOGIN_PROCESS';

const platform = Device.modelName;
const os = Device.osName;

export function hideLoginPopup(): { type: string; show: boolean } {
  return showLoginPopup(false);
}

export function openLoginPopup(): { type: string; show: boolean } {
  return showLoginPopup(true);
}

export function showLoginPopup(show: boolean): { type: string; show: boolean } {
  return {
    type: SHOW_LOGIN_POPUP,
    show,
  };
}

export function setLoginUser(user: any): { type: string; user: any } {
  return {
    type: SET_LOGIN_USER,
    user,
  };
}

export function setNeedCompleteInfos(needCompleteInfos: boolean): {
  type: string;
  needCompleteInfos: boolean;
} {
  return {
    type: SET_NEED_COMPLETE_INFOS,
    needCompleteInfos,
  };
}

export function setIsChangePassword(
  changePassword: boolean,
  code: string
): {
  type: string;
  changePassword: boolean;
  code: string;
} {
  return {
    type: SET_IS_CHANGE_PASSWORD,
    changePassword,
    code,
  };
}

export function setLoginLoading(loading: boolean): {
  type: string;
  loading: boolean;
  typeOfModal?: any;
} {
  return {
    type: SET_LOGIN_LOADING,
    loading,
    typeOfModal: undefined,
  };
}

export function setErroLoginProcessMessage(errorMessage: string): {
  type: string;
  errorMessage: string;
} {
  return {
    type: SET_ERROR_LOGIN_PROCESS_MESSAGE,
    errorMessage,
  };
}

export function handleSendPassword(password: string): any {
  return async (dispatch: any, getState: any) => {
    try {
      const { user } = getState();
      const { login = {} } = user;
      dispatch(setLoginLoading(true));
      let result;
      const token = await storage.getItem('NOTIFICATION_TOKEN');
      const notificationToken = token && token.token ? token.token : null;
      if (login.isForgot) {
        result = await resetPassword(
          login.email,
          password,
          login.code,
          platform,
          os,
          notificationToken
        );
      } else if (login.isLogin) {
        result = await loginApi(
          'password',
          login.email,
          password,
          platform,
          os,
          notificationToken
        );
      } else if (login.isRegister) {
        result = await createAuth(
          'password',
          login.email,
          password,
          platform,
          os,
          notificationToken
        );
      }
      dispatch(setLoginLoading(false));

      if (!result.success) {
        if (result.action === 'CONFIRM_EMAIL')
          dispatch(setIsCodeSent(true, true));
        if (login.isLogin)
          dispatch(setErroLoginProcessMessage('Senha incorreta'));
      } else {
        if (login.isForgot) dispatch(handleShowNotification('Senha alterada'));
        dispatch(handleUserData(result.token));
      }
    } catch (error) {
      console.log(error);
      dispatch(handleShowNotification('Ocorreu um erro', 'danger'));
      dispatch(setLoginLoading(false));
    }
  };
}

export function handleSendConfirmCode(code: string): any {
  return async (dispatch: any, getState: any) => {
    const { user } = getState();
    const { email, isForgot } = user.login;
    dispatch(setLoginLoading(true));
    const token = await storage.getItem('NOTIFICATION_TOKEN');
    const notificationToken = token && token.token ? token.token : null;
    const result = isForgot
      ? await confirmCodeResetPassword(code, email)
      : await confirmCode(email, code, platform, os, notificationToken);
    dispatch(setLoginLoading(false));
    if (!result.success) {
      dispatch(setErroLoginProcessMessage('Código incorreto'));
    } else {
      if (isForgot) {
        dispatch(setIsCodeSent(false, true));
        dispatch(setIsChangePassword(true, code));
      } else {
        dispatch(handleUserData(result.token));
      }
    }
  };
}

const USER_TOKEN = 'USER_TOKEN';

export function logout(): { type: string } {
  return {
    type: SET_LOGOUT_USER,
  };
}

export function setLogged(user: any, action: string): any {
  return (dispatch: any) => {
    dispatch(setLoginUser(user));
    dispatch(hideLoginPopup());
    if (action === 'NEED_COMPLETE_INFOS') dispatch(setNeedCompleteInfos(true));
  };
}

export function handleLogout(logoutBtn: boolean): any {
  return (dispatch: any) => {
    dispatch(logout());
    dispatch(handleLogoutCart());
    storage.setItem(USER_TOKEN, null);
    if (logoutBtn) dispatch(handleShowNotification('Até logo!'));
  };
}

export function handleHideErrorCode(): ThunkAction<
  void,
  RootState,
  unknown,
  any
  > {
  return (dispatch) => {
    dispatch(setErroLoginProcessMessage(''));
  };
}

export async function handleAccessLog(): Promise<void> {
  const uniqueId = await getUniqueDeviceId();
  registerAccessLog(uniqueId);
}

export function handleForgotPassword(): any {
  return async (dispatch: any, getState: any) => {
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
function getUniqueDeviceId() {
  throw new Error('Function not implemented.');
}
