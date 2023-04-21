import { openPopupModal } from '../../info';
import { rememberMe } from '../../../../graphql';
import { handleShowNotification } from '../../notification';
import { Linking } from 'react-native';
import { UserAction } from '../userTypes';
import { AppState, UserState } from '../../../../types/globals';

const SET_USER_REMEMBER_PRODUCTS = 'SET_USER_REMEMBER_PRODUCTS';
const ADD_USER_REMEMBER_PRODUCTS = 'ADD_USER_REMEMBER_PRODUCTS';
const REMOVE_USER_REMEMBER_PRODUCTS = 'REMOVE_USER_REMEMBER_PRODUCTS';

export function setUserRememberProducts(rememberProductKeys: string[]) {
  return {
    type: SET_USER_REMEMBER_PRODUCTS,
    rememberProductKeys,
  };
}

export function addUserRememberProducts(rememberProductKey: string) {
  return {
    type: ADD_USER_REMEMBER_PRODUCTS,
    rememberProductKey,
  };
}

export function removeUserRememberProducts(rememberProductKey: string) {
  return {
    type: REMOVE_USER_REMEMBER_PRODUCTS,
    rememberProductKey,
  };
}

export function handleRememberProduct(key: string) {
  return (
    dispatch: (action: UserAction) => void,
    getState: () => { user: UserState }
  ) => {
    const { user } = getState();
    const { isLogged = false, rememberProductKeys = [] } = user;
    if (!isLogged) return dispatch(openPopupModal('LOGIN_POPUP'));
    rememberMe(key);
    if (!rememberProductKeys.includes(key)) {
      dispatch(handleShowNotification('Aviso adicionado!'));
      dispatch(addUserRememberProducts(key));
    } else {
      dispatch(handleShowNotification('Aviso removido!'));
      dispatch(removeUserRememberProducts(key));
    }
  };
}

export function handleNotFoundProductSuggestion() {
  return async (
    dispatch: (action: UserAction) => void,
    getState: () => { app: AppState }
  ) => {
    const { app } = getState();
    const { about = {} } = app;
    const { phone } = about;
    return await new Promise((resolve) => {
      dispatch(
        openPopupModal('TEXT_MODAL', {
          callBack: (text: string) => {
            if (text)
              Linking.openURL(
                'whatsapp://send?phone=' + phone + '&text=' + text
              );
            resolve(text);
          },
          title: 'Não encontrou o que procurava?',
          description: 'Conta para a gente o que estava faltando aqui!',
          confirmBtn: 'Enviar',
        })
      );
    });
  };
}
