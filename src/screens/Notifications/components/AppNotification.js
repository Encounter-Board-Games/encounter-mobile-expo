import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleHideNotification, handleShowNotification } from "../../../store/actions/notification";
import { Animated, TouchableWithoutFeedback, Vibration } from "react-native";
import { Notifications } from "expo";
import { handleOpenNotification } from "../../../store/actions/shared";
import { handleLoadOrders } from "../../../store/actions/orders";
import { Container, Notification, Message } from "./AppNotificationStyles";

const AppNotification = () => {
  const [bottom, setBottom] = useState(new Animated.Value(-200));
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification || {});

  useEffect(() => {
    const id = Math.random();
    open(!!notification?.show);
    const subscription = Notifications.addListener(handleNotification);
  
    return () => {
      subscription.remove();
    };
  }, [notification?.show]);  

  const handleNotification = (notification) => {
    if (notification.data.action && notification.data.action.includes("order"))
      dispatch(handleLoadOrders());
    if (notification.origin === "received")
      dispatch(
        handleShowNotification({
          text: notification.data.body,
          action: notification.data.action,
          key: notification.data.key,
        })
      );
    if (notification.origin === "selected") {
      openNotification(
        notification.data ? notification.data.key : undefined,
        notification.data ? notification.data.action : undefined
      );
    }
  };

  const hideNotification = () => {
    dispatch(handleHideNotification());
    openNotification(
      notification.notificationKey,
      notification.notificationAction
    );
  };

  const openNotification = (key, action) => {
    if (key) dispatch(handleOpenNotification(key, action));
    else dispatch(handleHideNotification());
  };

  const open = (show) => {
    if (show) {
      setTimeout(() => Vibration.vibrate(), 400);
    }
    setShow(show);

    Animated.timing(bottom, {
      toValue: show ? 0 : -200,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  const type = notification?.type || "success";
  open(!!notification?.show);
  openNotification(
    notification?.notificationKey,
    notification?.notificationAction
  );

  return (
    <Animated.View
      type={type}
      style={{
        top: bottom,
        position: "absolute",
        left: 0,
        zIndex: 999,
        width: "100%",
      }}
    >
      <TouchableWithoutFeedback onPress={hideNotification}>
        <Container type={type}>
          <Notification type={type}>
            <Message type={type}>{notification.notificationText}</Message>
          </Notification>
        </Container>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

export default AppNotification;
