import { forgotPassword } from '../../../../graphql';
import { handleShowNotification } from '../../notification';
import { UserAction } from '../../../../types/actionUserTypes';
import { setLoginLoading } from '../login';
import { RootState } from '../../../../types/globals';
import { setIsCodeSent } from './handleSetters';

export function handleForgotPassword() {
  return async (
    dispatch: (action: UserAction) => void,
    getState: () => { user: RootState }
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
