export const SET_NOTIFICATION = 'SET_NOTIFICATION';
export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';

interface SetNotificationAction {
  type: typeof SET_NOTIFICATION;
  notificationType: string;
  notificationText: string;
  notificationAction?: () => void;
  notificationKey?: string;
}

interface ShowNotificationAction {
  type: typeof SHOW_NOTIFICATION;
  show: boolean;
}

export type NotificationActionTypes =
  | SetNotificationAction
  | ShowNotificationAction;

export function setNotification(
  notificationText: string,
  notificationType: string,
  notificationAction?: () => void,
  notificationKey?: string
): SetNotificationAction {
  return {
    type: SET_NOTIFICATION,
    notificationType,
    notificationText,
    notificationAction,
    notificationKey,
  };
}

export function showNotification(show: boolean): ShowNotificationAction {
  return {
    type: SHOW_NOTIFICATION,
    show,
  };
}

let showing: NodeJS.Timeout | undefined;

export function handleShowNotification(
  notification: string | { text: string; action?: () => void; key?: string },
  type: string = 'success',
  time: number = 3000
) {
  return async (dispatch: Function) => {
    let notificationText = '';
    let notificationAction;
    let notificationKey;

    if (typeof notification === 'string') {
      notificationText = notification;
    } else {
      notificationText = notification.text;
      notificationAction = notification.action;
      notificationKey = notification.key;
    }

    if (showing) {
      clearInterval(showing);

      dispatch(showNotification(false));
      await new Promise((resolve) => setTimeout(resolve, 300));
    }

    dispatch(
      setNotification(
        notificationText,
        type,
        notificationAction,
        notificationKey
      )
    );

    dispatch(showNotification(true));
    showing = setTimeout(() => {
      showing = undefined;
      dispatch(showNotification(false));
    }, time);
  };
}

export function handleHideNotification() {
  return (dispatch: Function) => {
    dispatch(showNotification(false));
  };
}
