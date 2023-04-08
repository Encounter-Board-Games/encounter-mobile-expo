import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  handleHideNotification,
  handleShowNotification,
} from "../../../store/actions/notification";
import {
  Animated,
  TouchableWithoutFeedback,
  Vibration,
} from "react-native";
import { Notifications } from "expo";
import { handleOpenNotification } from "../../../store/actions/shared";
import { handleLoadOrders } from "../../../store/actions/orders";

const Container = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
    background:   #414042;
    padding-top: 8px;
    padding-bottom: 8px;
    border-radius: "8px";
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
`;
const Notification = styled.View`
    min-height: 20px;
    width: 100%
    align-items: center;
    justify-content: center;
`;

const Message = styled.Text`
    font-family: Nunito-Bold
    font-size: 14px;
    color:  #414042;
`;

class AppNotification extends Component {
  state = {
    bottom: new Animated.Value(-200),
    show: false,
  };

  componentDidMount() {
    this.id = Math.random();
    this.open(!!this.props.notification.show);
    Notifications.addListener((notification) =>
      this.handleNotification(notification)
    );
  }

  handleNotification = (notification) => {
    const { dispatch } = this.props;
    if (notification.data.action && notification.data.action.includes("order"))
      dispatch(handleLoadOrders());
    if (notification.origin == "received")
      dispatch(
        handleShowNotification({
          text: notification.data.body,
          action: notification.data.action,
          key: notification.data.key,
        })
      );
    if (notification.origin == "selected") {
      this.openNotification(
        notification.data ? notification.data.key : undefined,
        notification.data ? notification.data.action : undefined
      );
    }
  };

  hideNotification() {
    this.props.dispatch(handleHideNotification());

    this.openNotification(
      this.props.notification.notificationKey,
      this.props.notification.notificationAction
    );
  }

  openNotification(key, action) {
    if (key) this.props.dispatch(handleOpenNotification(key, action));
    else this.props.dispatch(handleHideNotification());
  }

  open(show) {
    if (show) {
      setTimeout(() => Vibration.vibrate(), 400);
    }
    this.show = show;
    this.setState({ show });

    Animated.timing(this.state.bottom, {
      toValue: show ? 0 : -200,
      duration: 400,
      useNativeDriver: false,
    }).start();
    // if (!show)
    //     this.timeout = setTimeout(() => this.setState({ bottom: -200 }), 500)
    // else
    //     this.setState({ bottom: 0 })
  }

  shouldComponentUpdate(prevProps, prevState, snapshot) {
    if (this.show !== !!prevProps.notification.show)
      this.open(!!prevProps.notification.show);
    // this.setState({ show: !!prevProps.user.loginPopup })
    return true;
  }

  render() {
    // bottom: ${72 + getBottomSpace()}px;
    const { notification, dispatch } = this.props;
    const { show, bottom } = this.state;

    // if(notification.show == undefined) return null
    const type = notification.type || "success";

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
        <TouchableWithoutFeedback onPress={() => this.hideNotification()}>
          <Container type={type}>
            <Notification type={type}>
              <Message type={type}>{notification.notificationText}</Message>
            </Notification>
          </Container>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
}

function mapStateToProps(state) {
  return {
    notification: state.notification,
  };
}

export default connect(mapStateToProps)(AppNotification);
