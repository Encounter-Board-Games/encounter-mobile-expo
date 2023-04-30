import React from 'react';
import MenuOption from '../../components/MenuOption';
import ScreenPopup from '../../components/ScreenPopup';
import { useNavigation } from '@react-navigation/native';
import { Space } from '../../components/Space';
import { useSelector, useDispatch } from 'react-redux';
import InformationBox from '../../components/InformationBox';
import { handleReopenOnboarding } from '../../store/actions/onboarding';
import config from '../../config';
import { RootState } from '../../store/Store';
import { Container } from './UserStyles';
import { AppDispatch } from '../../store/Store';

export interface MenuItem {
  title: string;
  description: string;
  onPress: () => void;
}

export const EditProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { isLogged = false, pendences = [] } = useSelector(
    (state: RootState) => state.users
  );

  const hasPendences = pendences.length > 0;
  const menuItems: MenuItem[] = [
    {
      title: 'Dados Pessoais',
      description: 'Edite suas informações pessoais de cadastro',
      onPress: () => navigation.navigate('EditProfile'),
    },
  ];

  if (config.myPreferences) {
    menuItems.push({
      title: 'Minhas preferências',
      description: 'Edite suas preferências para melhorares recomendações.',
      onPress: () => {
        dispatch(handleReopenOnboarding());
        navigation.navigate('Home');
      },
    });
  }

  const handleCompleteProfile = () => {
    navigation.navigate('SelfUpload');
  };

  return (
    <ScreenPopup withBorder title="Editar Perfil">
      <Container>
        {hasPendences && (
          <>
            <Space n={1} />
            <InformationBox
              titleType="danger"
              title="Você possui documentos pendentes!"
              description={`Complete seu cadastro para começar a alugar.`}
              buttonText="Completar cadastro"
              onPressButton={handleCompleteProfile}
            />
            <Space n={3} />
          </>
        )}

        {menuItems.map((item, index) => (
          <MenuOption key={index} {...item} />
        ))}
      </Container>
    </ScreenPopup>
  );
};

export default EditProfileScreen;
