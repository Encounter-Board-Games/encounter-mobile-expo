/* eslint-disable prettier/prettier */
import { SET_USER_NOTIFICATION } from '../actions/user/notifications';
import { 
  SET_AUTO_COMPLETE_REGISTER,
  SET_LOGIN_USER,
  SET_USER_INFO, SET_USER_FAVORITES, 
  ADD_USER_FAVORITE, 
  REMOVE_USER_FAVORITE, 
  SET_PENDENCES, 
  SET_USER_REMEMBER_PRODUCTS, 
  ADD_USER_REMEMBER_PRODUCTS, 
  REMOVE_USER_REMEMBER_PRODUCTS, 
  SET_BACK_LOGIN_SCREEN_LOGIN_PROCESS,
  SET_EMAIL_LOGIN_PROCESS,
  SET_ERROR_LOGIN_PROCESS_MESSAGE,
  SET_IS_CHANGE_PASSWORD,
  SET_IS_CODE_SENT,
  SET_LOGIN_LOADING,
  SET_LOGOUT_USER,
  SHOW_LOGIN_POPUP
} from '../actions/user/user';
import { 
  SET_NEED_COMPLETE_INFOS,
  State,
  UserAction
} from '../../types/actionUserTypes';

export const initialState: RootState = {
  email: '',
  isRegister: false,
  isLogin: false,
  loading: false,
  isCodeSent: false,
  isForgot: false,
  isLogged: false,
  user: '',
  cart: undefined,
  products: []
};

export default function users(
  state: RootState = initialState,
  action: UserAction
): RootState {
  switch (action.type) {
  case SET_LOGIN_USER:
    return {
      ...state,
      isLogged: true,
      user: action.user,
      loginPopup: false,
    };
  case SET_AUTO_COMPLETE_REGISTER:
    return {
      ...state,
      autoCompleteRegister: {
        name: action.name,
        lastname: action.lastname,
      },
    };
  case SET_NEED_COMPLETE_INFOS:
    return {
      ...state,
      needCompleteInfos: action.needCompleteInfos,
    };
  case SET_LOGOUT_USER:
    return initialState;
  case SHOW_LOGIN_POPUP:
    return {
      ...state,
      loginPopup: action.loginPopup,
    };
  case SET_BACK_LOGIN_SCREEN_LOGIN_PROCESS:
    return {
      ...state,
      login: {
        ...state.login,
        isRegister: false,
        isLogin: false,
        errorMessage: undefined,
      },
    };
  case SET_LOGIN_LOADING:
    return {
      ...state,
      login: {
        ...state.login,
        loading: action.loading,
      },
    };
  case SET_EMAIL_LOGIN_PROCESS:
    return {
      ...state,
      login: {
        ...state.login,
        email: action.email,
        isRegister: action.isRegister,
        isLogin: action.isLogin,
      },
    };
  case SET_ERROR_LOGIN_PROCESS_MESSAGE:
    return {
      ...state,
      login: {
        ...state.login,
        errorMessage: action.errorMessage,
      },
    };
  case SET_IS_CODE_SENT:
    return {
      ...state,
      login: {
        ...state.login,
        isCodeSent: action.isCodeSent,
        isForgot: action.isForgot,
      },
    };
  case SET_IS_CHANGE_PASSWORD:
    return {
      ...state,
      login: {
        ...state.login,
        changePassword: action.changePassword,
        code: action.code,
      },
    };
  case SET_USER_INFO:
    return {
      ...state,
      userInfo: {
        ...action.userInfo,
      },
    };
  case SET_USER_FAVORITES:
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        favorites: action.favorites,
      },
    };
  case ADD_USER_FAVORITE:
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        favorites: [
          ...(state.userInfo.favorites ? state.userInfo.favorites : []),
          action.favorite,
        ],
      },
    };
  case REMOVE_USER_FAVORITE:
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        favorites: state.userInfo.favorites?.filter(
          (id) => id !== action.favorite
        )
      },
    };
  case SET_USER_NOTIFICATION:
    return {
      ...state,
      notifications:
          action.notifications && action.notifications.reverse
            ? action.notifications.reverse()
            : action.notifications,
    };
  case SET_PENDENCES:
    return {
      ...state,
      pendences: action.pendences,
    };
  case SET_USER_REMEMBER_PRODUCTS:
    return {
      ...state,
      rememberProductKeys: action.rememberProductKeys,
    };
  case ADD_USER_REMEMBER_PRODUCTS:
    return {
      ...state,
      rememberProductKeys: [
        ...(state.rememberProductKeys ? state.rememberProductKeys : []),
        action.key,
      ],
    };
  case REMOVE_USER_REMEMBER_PRODUCTS:
    return {
      ...state,
      rememberProductKeys: state.rememberProductKeys?.filter(
        (f) => f !== action.key
      ),
    };
  default:
    return state;
  }
}
