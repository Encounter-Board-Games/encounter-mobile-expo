import { openPopupModal } from "../info";
import {
  emailExists,
  UserInfo,
  Me,
  toggleFavorite,
  uploadDocument,
  forgotPassword,
  rememberMe,
  respondQuestion,
} from "../../../graphql";
import * as ImageManipulator from "expo-image-manipulator";
import storage from "../../../utils/storage";
import { setProducts } from "../product";
import { handleShowNotification } from "../notification";
import { arrayToObj } from "../../../utils/helpers";
import { handleLoginCart } from "../cart";
import { setAdresses } from "../address/address";
import { Linking } from "react-native";
import { 
  SetAutocompleteRegisterAction,
  UserAction
} from './userTypes'
import { handleAccessLog, handleLogout, setLoginLoading, setErroLoginProcessMessage } from "./login";
import { AppState, UserState } from "../../../types/globals";


const SET_PENDENCES = "SET_PENDENCES";
const SET_USER_REMEMBER_PRODUCTS = "SET_USER_REMEMBER_PRODUCTS";
const ADD_USER_REMEMBER_PRODUCTS = "ADD_USER_REMEMBER_PRODUCTS";
const REMOVE_USER_REMEMBER_PRODUCTS = "REMOVE_USER_REMEMBER_PRODUCTS";


export function setAutocompleteRegister(name: string, lastname: string): SetAutocompleteRegisterAction {
  return {
    type: 'SET_AUTO_COMPLETE_REGISTER',
    name,
    lastname,
  };
}

export function setUserInfo(user: any) {
  return {
    type: 'SET_USER_INFO',
    user,
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
  
export function addUserFavorite(productId: string) {
  return {
  type: 'ADD_USER_FAVORITE',
  productId,
  };
  }
  
  export function removeUserFavorite(productId: string) {
  return {
  type: 'REMOVE_USER_FAVORITE',
  productId,
  };
  }
  
  export function setFavorites(favorites: string[]) {
  return {
  type: 'SET_FAVORITES',
  favorites,
  };
  }
  
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
  
  const USER_TOKEN = "USER_TOKEN";

  export function handleUserData(token = null) {
    return async (dispatch: (action: UserAction) => void) => {
      try {
        if (token) await storage.setItem(USER_TOKEN, { token });
        handleAccessLog();
        const me = await Me();
        dispatch(setLogged(me.user, me.action));
        dispatch(handleLoginCart());

        const { user, pendences } = await UserInfo();

        dispatch(setPendences(pendences));
        const favorites = user.favorites.map((u) => u.key);
        const rememberProductKeys = user.rememberProductKeys;

        dispatch(setProducts(arrayToObj(user.favorites)));

        dispatch(setUserInfo(user));

        dispatch(setFavorites(favorites));
        dispatch(setAdresses(arrayToObj(user.address)));
        dispatch(setUserRememberProducts(rememberProductKeys));

        const products = arrayToObj(user.favorites);

        dispatch(setProducts(products));
      } catch (error) {
        dispatch(handleLogout());
      }
  };
}

export function handleEmailAlreadyExists(email: string) {
  return async (dispatch: (action: UserAction) => void) => {
    dispatch(setLoginLoading(true));
    const validateEmail = (email: string) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
    };

    if (!validateEmail(email)) {
      dispatch(setLoginLoading(false));
      return dispatch(setErroLoginProcessMessage("E-mail inválido"));
    }

    const isLogin = await emailExists(email);
    dispatch(setEmailLoginProcess(email, isLogin));
    dispatch(setLoginLoading(false));
  };
}

export function handleToggleLike(productId: string) {
  return async (dispatch: (action: UserAction) => void, getState: () => { user: UserState }) => {
    const { user } = getState();
    if (!user.isLogged) return dispatch(openPopupModal("LOGIN_POPUP"));
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
        dispatch(handleShowNotification("Adicionado aos Meus Favoritos."));
      else dispatch(handleShowNotification("Removido dos Meus Favoritos."));
    } catch (error) {
      if (isAdd) dispatch(removeUserFavorite(productId));
      else dispatch(addUserFavorite(productId));
    }
  };
}

export function handleUploadSelfDocument(image: { uri: string }) {
  return async (dispatch: (action: UserAction) => void, getState: () => { user: UserState }) => {
    const { user } = getState();
    const { pendences = [] } = user;
    const SELF_WITH_DOCUMENT = "SELF_WITH_DOCUMENT";
    const resizedPhoto = await ImageManipulator.manipulateAsync(
    image.uri,
    [{ resize: { width: 300 } }], // resize to width of 300 and preserve aspect ratio
    { compress: 0.7, format: "jpeg" }
    );
    const { filename } = await upload(resizedPhoto.uri);
    const result = await uploadDocument(filename, SELF_WITH_DOCUMENT);
    if (result.success) {
      dispatch(setPendences(pendences.filter((c) => c !== SELF_WITH_DOCUMENT)));
    }
  };
}

export async function upload(uri: string) {
  let fileType = uri.substring(uri.lastIndexOf(".") + 1);
  let formData = new FormData();

  /*formData.append("image", {
    uri,
    name: photo.${fileType},
    type: Image/${fileType},
  });*/

  let options = {
    method: "POST",
    body: FormData,
    headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
    },
  };
  try {
    return await fetch(API_URI + "/upload", options).then((response) =>
    response.json()
    );
  } catch (error) {
    console.log(error);
  }
}

export function handleUploadImage(file: any) {
  return async (dispatch: (action: UserAction) => void) => {
    try {
      const formData = new FormData();
      const url = process.env.REACT_APP_API + "/upload";
      formData.append("image", file);
      const response = await fetch(url, {
        method: "POST",
        headers: {},
        body: formData,
      });

      const { filename } = await response.json();
      dispatch({ type: 'UPLOAD_IMAGE_SUCCESS', payload: filename });
      return filename;
    } catch (error) {
      dispatch({ type: 'UPLOAD_IMAGE_FAILURE', payload: error });
      return false;
    }
  };
}

export function handleForgotPassword() {
  return async (dispatch: (action: UserAction) => void, getState: () => { user: UserState }) => {
    const { user } = getState();
    const { login = {} } = user;
    dispatch(setLoginLoading(true));
    const result = await forgotPassword(login.email);
    if (result.success) {
      dispatch(setIsCodeSent(true, true));
    } else {
      dispatch(
        handleShowNotification("Ocorreu um erro. Tente novamente.", "danger")
      );
    }
    dispatch(setLoginLoading(false));
  };
}

export function handleRememberProduct(key: string) {
  return (dispatch: (action: UserAction) => void, getState: () => { user: UserState }) => {
    const { user } = getState();
    const { isLogged = false, rememberProductKeys = [] } = user;
    if (!isLogged) return dispatch(openPopupModal("LOGIN_POPUP"));
    rememberMe(key);
    if (!rememberProductKeys.includes(key)) {
      dispatch(handleShowNotification("Aviso adicionado!"));
      dispatch(addUserRememberProducts(key));
    } else {
      dispatch(handleShowNotification("Aviso removido!"));
      dispatch(removeUserRememberProducts(key));
    }
  };
}
export function handleNotFoundProductSuggestion() {
  return async (dispatch: (action: UserAction) => void, getState: () => { app: AppState }) => {
    const { app } = getState();
    const { about = {} } = app;
    const { phone } = about;
    return await new Promise((resolve) => {
      dispatch(
        openPopupModal("TEXT_MODAL", {
          callBack: (text: string) => {
            if (text)
              Linking.openURL(
                "whatsapp://send?phone=" + phone + "&text=" + text
              );
            resolve(text);
          },
          title: "Não encontrou o que procurava?",
          description: "Conta para a gente o que estava faltando aqui!",
          confirmBtn: "Enviar",
        })
      );
    });
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
  throw new Error("Function not implemented.");
}
