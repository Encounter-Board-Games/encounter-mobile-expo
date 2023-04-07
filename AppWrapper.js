import React, { useState, useEffect } from "react";
import { StatusBar, Platform } from "react-native";
import "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "react-native-animatable";

import * as Notifications from 'expo-notifications';

import { Container, LoadView} from "./AppStyle";
import config from "./src/config";
import MainNavigation from "./src/navigation/MainTabNavigator";

import Login from "./src/screens/Login/Login";
import InfoModal from "./src/screens/Info/InfoModal";
import Popup from "./src/screens/Info/Popup";
import AppNotification from "./src/screens/Notifications/components/AppNotification";
import NeedUpdate from "./src/screens/NeedUpdate/NeedUpdate";

import { handleInitApp } from "./src/store/actions/shared";
import { handleSetNotificationToken } from "./src/store/actions/user";

export default function AppWrapper() {

    const dispatch = useDispatch();
    const { update } = useSelector((state) => state.app) || {};
    const [already, setAlready] = useState(false);

    const askNotification = async () => {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();

        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
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
                    resizeMode={"contain"}
                    style={{ width: "100%", height: "100%" }}
                    source={config.splash}
                />
            </LoadView>
        );
    }

    return (
        <React.Fragment>
            <StatusBar
                barStyle={Platform.OS == "ios" ? "dark-content" : "light-content"}
            />
            <MainNavigation />
            <InfoModal />
            <AppNotification />
            <Popup />
            <Login />
        </React.Fragment>
    );
}
