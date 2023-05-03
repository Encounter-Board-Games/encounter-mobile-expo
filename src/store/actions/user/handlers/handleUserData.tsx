import { UserInfo, Me } from '../../../../graphql';
import storage from '../../../../utils/storage';
import { setProducts } from '../../product';
import { arrayToObj } from '../../../../utils/helpers';
import { handleLoginCart } from '../../cart/cart';
import { setAdresses } from '../../address/address';
import { UserAction } from '../../../../types/userTypes';
import { handleAccessLog, handleLogout, setLogged } from '../login';
import { USER_TOKEN, setUserRememberProducts } from '../user';
import { setPendences, setFavorites } from './handleSetters';

export function handleUserData(token = null) {
  return async (dispatch: (action: UserAction) => void) => {
    try {
      if (token) await storage.setItem(USER_TOKEN, { token });
      handleAccessLog();
      const me = await Me();
      dispatch(setLogged(me.user, me.action, me.isLogged, me.loginPopup));
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
