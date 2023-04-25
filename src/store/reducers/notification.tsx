/* eslint-disable indent */
// Define TypeScript interfaces for the RootState and actions
interface NotificationState {
  notificationText?: string;
  notificationAction?: string;
  notificationKey?: string;
  type?: string;
  show?: boolean;
}

type NotificationAction = {
  type: 'SET_NOTIFICATION' | 'SHOW_NOTIFICATION';
  notificationText?: string;
  notificationAction?: string;
  notificationKey?: string;
  notificationType?: string;
  show?: boolean;
};

export default function notification(
  state: NotificationState = {},
  action: NotificationAction
): NotificationState {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        ...state,
        notificationText: action.notificationText,
        notificationAction: action.notificationAction,
        notificationKey: action.notificationKey,
        type: action.notificationType,
      };
    case 'SHOW_NOTIFICATION':
      return {
        ...state,
        show: action.show,
      };

    default:
      return state;
  }
}
