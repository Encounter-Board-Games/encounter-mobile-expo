import React, { useState, useEffect } from "react";
import { View, StatusBar, Platform } from "react-native";
import styled, { ThemeProvider } from "styled-components";
import "react-native-gesture-handler";
import { Image } from "react-native-animatable";
import { Provider, useDispatch, useSelector } from "react-redux";
import * as Notifications from 'expo-notifications';
import * as Font from "expo-font";
import theme from "./src/styles/theme";
import MainNavigation from "./src/navigation/MainTabNavigator";
import Login from "./src/screens/Login/Login";
import InfoModal from "./src/screens/Info/InfoModal";
import Popup from "./src/screens/Info/Popup";
import NeedUpdate from "./src/screens/NeedUpdate/NeedUpdate";
import AppNotification from "./src/screens/Notifications/components/AppNotification";
import store from "./src/store";
import { handleInitApp } from "./src/store/actions/shared";
import { handleSetNotificationToken } from "./src/store/actions/user";
import config from "./config";
 

const Container = styled.View`
  flex: 1; background: #0e9577;
  padding-top: 14px;
`;

const LoadView = styled.View`
  background-color: #0e9577;
`;


function App () {
  const dispatch = useDispatch();
  const { update = undefined } = useSelector((state) => state.app);
  const [already, setAlready] = useState(false);

 
  async function askNotification () {
    const { status: existingStatus } = await Notifications.getPermissionsAsync(
      Notifications.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync(
          Notifications.NOTIFICATIONS
        );
        finalStatus = status;
    }

    if (finalStatus !== "granted") {
        return;
    }

    let token = await Notifications.getExpoPushTokenAsync();
    dispatch(handleSetNotificationToken(token));
};

  useEffect(() => {
    askNotification();
    dispatch(handleInitApp()).finally((_) => setAlready(true));
  }, []);

  if (update && update.show)
    return (
      <Container>
        <NeedUpdate />
      </Container>
    );

  if (!already)
    return (
      <LoadView>
        <Image
          resizeMode={"contain"}
          style={{ width: "100%", height: "100%" }}
          source={config.splash}
        />
      </LoadView>
    );

  return (
    <React.Fragment>
      <StatusBar barStyle={Platform.OS == "ios" ? "dark-content" : "light-content"}/>
      <MainNavigation />
      <InfoModal />
      <AppNotification />
      <Popup />
      <Login />
    </React.Fragment>
  );
};

export default () => {
  const [already, setAlready] = useState(false);
  
  useEffect(() => {
    Font.loadAsync({
      Nunito: require("./src/assets/fonts/Nunito-Regular.ttf"),
      "Nunito-Bold": require("./src/assets/fonts/Nunito-Bold.ttf"),
    }).then((_) => setAlready(true));
  }, []);

  if (!already) return <View></View>;

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  );
};
