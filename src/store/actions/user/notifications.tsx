/* eslint-disable prettier/prettier */
import { UserNotifications, SetUserNotificationViewed } from '../../../graphql';
import {
  NotificationActionTypes,
  NotificationState,
} from '../../../types/actionLoginTypes';
import storage from '../../../utils/storage';

export const SET_USER_NOTIFICATION = 'SET_USER_NOTIFICATION';

export function setUserNotification(notifications: Notification): NotificationActionTypes {
  return {
    type: 'SET_USER_NOTIFICATION',
    notifications,
  };
}

export function handleSetNotificationToken(token: { token: string }): any {
  return async (dispatch: any) => {
    await storage.setItem('NOTIFICATION_TOKEN', token);
    dispatch({ type: 'SET_NOTIFICATION_TOKEN', payload: token });
  };
}

export function handleLoadNotifications(): any {
  return async (dispatch: any, getState: any) => {
    const { user } = getState();
    const { isLogged = false } = user;

    if (!isLogged) {
      return;
    }

    try {
      const notifications = await UserNotifications();
      dispatch(setUserNotification(notifications));
    } catch (error) {
      console.error(error);
      dispatch(setUserNotification(null));
    }
  };
}

export function handleSetNotificationViewed(key: string): any {
  return async (dispatch: any, getState: any) => {
    const { user } = getState();
    const { isLogged = false } = user;

    if (!isLogged) {
      return;
    }

    const notifications = await SetUserNotificationViewed(key);
    dispatch(setUserNotification(notifications));
  };
}

const initialState: NotificationState = {
  notifications: null,
  type: 'SET_USER_NOTIFICATION'
};

export function notificationReducer(
  RootState = initialState,
  action: NotificationActionTypes
): NotificationState {
  switch (action.type) {
    case SET_USER_NOTIFICATION:
      return {
        ...state,
        notifications: action.notifications,
      };
    default:
      return state;
  }
}
