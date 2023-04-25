import React from 'react';
import MenuOption from '../../components/MenuOption';
import { useTheme } from 'styled-components/native';
import { Linking, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import * as Application from 'expo-application';
import * as IntentLauncher from 'expo-intent-launcher';
import * as ExpoLink from 'expo-linking';
import { handleLogout } from '../../store/actions/user/login';
import config from '../../config';
import storage from '../../utils/storage';
import ScreenPopup from '../../components/ScreenPopup';
import { Container, Logout } from './UserStyles';
import { RootState } from '../../types/globals';

interface MenuItem {
  title: string;
  description: string;
  onPress: () => void;
}

const UserSettingsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { policy = '', terms = '' } = useSelector(
    (state: RootState) => state.app.terms
  );
  const { isLogged = false } = useSelector((state: RootState) => state.user);
  const theme = useTheme();

  const openSettings = () => {
    if (Platform.OS === 'ios') {
      ExpoLink.openURL(`app-settings:`);
    } else {
      const bundleIdentifier = Application.applicationId;
      IntentLauncher.startActivityAsync(
        IntentLauncher.ACTION_APPLICATION_DETAILS_SETTINGS,
        {
          data: `package:${bundleIdentifier}`,
        }
      );
    }
  };

  const menuItems: MenuItem[] = [
    {
      title: 'Notificações',
      description:
        'Entre nas Configurações do seu dispositivo para ativar ou desativar.',
      onPress: openSettings,
    },
    {
      title: 'Termos e Condições',
      description: 'Você será direcionado para uma página web.',
      onPress: () => Linking.openURL(terms),
    },
    {
      title: 'Política de Privacidade',
      description: 'Você será direcionado para uma página web.',
      onPress: () => Linking.openURL(policy),
    },
  ];

  const handleClearStorage = () => {
    storage.clear();
  };

  return (
    <ScreenPopup withBorder title="Configurações">
      <Container>
        {menuItems.map((item, index) => (
          <MenuOption key={index} {...item} />
        ))}
        {config.cleanStorage && (
          <Logout onPress={handleClearStorage}>
            <Icons name="logout" color={theme.colors.darkColor} size={16} />
            <SpaceHorizontal n={1} />
            <Subtitle1>Limpar</Subtitle1>
          </Logout>
        )}
        {isLogged && (
          <Logout onPress={() => dispatch(handleLogout(true))}>
            <Icons name="logout" color={theme.colors.darkColor} size={16} />
            <SpaceHorizontal n={1} />
            <Subtitle1>Sair</Subtitle1>
          </Logout>
        )}
      </Container>
    </ScreenPopup>
  );
};

export default UserSettingsScreen;
