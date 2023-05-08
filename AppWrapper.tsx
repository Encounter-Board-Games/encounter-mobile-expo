/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';
import { Image } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import MainNavigation from './src/navigation/MainTabNavigator';
import Login from './src/screens/Login/Login';
import InfoModal from './src/screens/Info/InfoModal';
import Popup from './src/screens/Info/Popup';
import NeedUpdate from './src/screens/NeedUpdate/NeedUpdate';
import AppNotification from './src/screens/Notifications/components/AppNotification';
import { handleInitApp } from './src/store/actions/shared';
import { handleSetNotificationToken } from './src/store/actions/user/notifications';
import { Container, LoadView } from './src/styles/globalStyles';
import { useAppDispatch, useAppSelector } from './src/hooks/useTypedHooks';

const AppWrapper: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const { update } = useAppSelector((state) => state.app) ?? {
    update: { show: true },
  };
  const [already, setAlready] = useState(false);

  useEffect(() => {
    const askNotification = async () => {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== Permissions.PermissionStatus.GRANTED) {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }

      if (finalStatus !== Permissions.PermissionStatus.GRANTED) {
        return;
      }

      let { data: token } = await Notifications.getExpoPushTokenAsync();
      dispatch(handleSetNotificationToken({ token }));
    };

    askNotification();
    (async () => {
      await dispatch(handleInitApp());
      setAlready(true);
    })();
  }, [dispatch]);

  if (update?.show) {
    return (
      <Container>
        <NeedUpdate />
      </Container>
    );
  }

  if (!already) {
    return (
      <LoadView>
        <Image
          resizeMode="contain"
          style={{ width: '100%', height: '100%' }}
          source={require('./src/assets/splash.png')}
        />
      </LoadView>
    );
  }

  return (
    <>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
      />
      <MainNavigation />
      <InfoModal />
      <AppNotification />
      <Popup />
      <Login />
    </>
  );
});

export default AppWrapper;
