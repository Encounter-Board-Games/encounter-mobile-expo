import { openPopupModal } from '../../info';
import { Linking } from 'react-native';
import { UserAction } from '../userTypes';
import { AppState } from '../../../../types/globals';

export function getState(): { user: any } {
  throw new Error('Function not implemented.');
}

export function handleNotFoundProductSuggestion() {
  return async (
    dispatch: (action: UserAction | ReturnType<typeof openPopupModal>) => void,
    getState: () => { app: AppState }
  ) => {
    const { app } = getState();
    const { about } = app; // remove the default value for about
    const phone = about?.phone;
    return await new Promise<string>((resolve) => {
      dispatch(
        openPopupModal('TEXT_MODAL', {
          callBack: (text: string) => {
            if (text && phone)
              // check if phone is defined
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
