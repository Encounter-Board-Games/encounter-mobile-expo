import React from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { Placeholder, PlaceholderLine, Fade } from 'rn-placeholder';
import MenuOption from '../../components/MenuOption';
import Screen from '../../components/ScreenComponent';
import Button from '../../components/Button/Button';
import { H3, Subtitle2 } from '../../components/Typography';
import { Space, SpaceHorizontal } from '../../components/Space';
import { openLoginPopup } from '../../store/actions/user/login';
import { openPopupModal } from '../../store/actions/info';
import { translation } from '../../texts/index';
import config from '../../config';
import {
  Container,
  MenuItem,
  MenuItemHeader,
  MenuItemText,
  MenuItemImage,
  Line,
  UserImage,
} from './SettingsStyles';

interface ThemeProps {
  theme: any;
}

const Settings = (props: ThemeProps) => {
  const navigation = useNavigation();
  const {
    isLogged = false,
    userInfo = {},
    pendences = [],
    user = {},
  } = useSelector((state: any) => state.user);
  const { about = {} } = useSelector((state: any) => state.app);
  const dispatch = useDispatch();
  const hasPendences = pendences.length > 0;

  const isLoggedContent = () => (
    <MenuOption onPress={() => navigation.navigate('User')} title={''}>
      <UserImage>
        <Image
          borderRadius={128}
          style={{ width: '100%', height: '100%' }}
          resizeMode={'cover'}
          source={
            user.image
              ? { uri: user.image }
              : require('../../assets/img/profile.png')
          }
        />
      </UserImage>
      <MenuItemText>
        {userInfo.preferenceName && userInfo.preferenceName !== '' ? (
          <H3>{userInfo.preferenceName}</H3>
        ) : (
          <Placeholder Animation={Fade}>
            <PlaceholderLine noMargin width={40} height={20} />
          </Placeholder>
        )}
        <Space n={0} />
        <Line>
          <Subtitle2 type="secondDarkColor">Editar perfil</Subtitle2>
          <SpaceHorizontal n={1} />
          {hasPendences && (
            <Ionicons
              color={props.theme.colors.danger}
              size={16}
              name="ios-alert"
            />
          )}
        </Line>
      </MenuItemText>
    </MenuOption>
  );
  const isNotLoggedContent = () => (
    <MenuItem>
      <MenuItemHeader>
        <MenuItemText>
          <H3>Você ainda não está na sua conta.</H3>
          <Space n={1} />
          <Subtitle2 type="secondDarkColor">
            {translation('settings.notLogged')}
          </Subtitle2>
        </MenuItemText>
        <MenuItemImage>
          <Image
            resizeMode={'contain'}
            style={{ width: '100%', height: '100%' }}
            source={config.notLoggedImg}
          />
        </MenuItemImage>
      </MenuItemHeader>
      <Button
        type="CallToAction-Outline"
        width={'100%'}
        onPress={() => dispatch(openLoginPopup())}
      >
        Entrar ou cadastrar
      </Button>
    </MenuItem>
  );

  const menuItems = [
    {
      icon: 'bell',
      title: 'Notificações',
      description: 'Minha central de notificações',
      onPress: () => navigation.navigate('Notifications'),
    },
    {
      icon: 'tag',
      title: 'Cupons',
      description: 'Meus cupons de desconto',
      onPress: () => navigation.navigate('Cupons'),
    },
    {
      icon: 'credit-card',
      title: 'Formas de pagamento',
      description: 'Meus cartões cadastrados',
      onPress: () => navigation.navigate('Payments'),
    },
    {
      icon: 'location-pin',
      title: 'Endereços',
      description: 'Meus endereços cadastrados',
      onPress: () => navigation.navigate('Address'),
    },
    {
      icon: 'question',
      title: 'Sobre' + (about.nameAbout || ''),
      hideArrow: true,
      onPress: () => navigation.navigate('About'),
    },
    {
      icon: 'settings',
      title: 'Configurações',
      hideArrow: true,
      onPress: () => navigation.navigate('UserSettings'),
    },
    {
      icon: 'question',
      title: translation('help', { name: about.nameAbout }),
      hideArrow: true,
      onPress: () => dispatch(openPopupModal('WPP_POPUP')),
    },
  ];

  return (
    <Screen>
      <Container>
        {isLogged ? isLoggedContent() : isNotLoggedContent()}
        {menuItems.map((item, index) => (
          <MenuOption key={index} {...item} />
        ))}
      </Container>
    </Screen>
  );
};

export default Settings;
