import { openPopupModal } from '../../info';
import { toggleFavorite } from '../../../../graphql';
import { handleShowNotification } from '../../notification';
import { UserAction } from '../../../../types/storeTypes';
import { RootState } from '../../../../types/globals';
import { addUserFavorite, removeUserFavorite } from '../user';

interface UserInfo {
  favorites?: string[];
  // add other properties as needed
}

export function handleToggleLike(productId: string) {
  return async (
    dispatch: (action: UserAction) => void,
    getState: () => { user: RootState }
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
