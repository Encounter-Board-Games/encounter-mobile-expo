import {
  SET_NOTIFICATION,
  SHOW_NOTIFICATION,
} from '../store/actions/notification';
import { SET_USER_NOTIFICATION } from '../store/actions/user/notifications';

export interface EmailLoginProcessProps {
  type: string;
  email: string;
  isLogin: boolean;
}

export interface ErrorLoginProcessMessageProps {
  type: string;
  errorMessage: string;
  typeOfModal: any;
}

export interface IsChangePasswordProps {
  type: string;
  changePassword: boolean;
  code: string;
}

export interface IsCodeSentProps {
  type: string;
  isCodeSent: boolean;
  isForgot: boolean;
}

export interface LoginLoadingProps {
  type: string;
  typeOfModal?: any;
  payload?: any;
  loading: boolean;
}

export interface LoginPopupProps {
  type: string;
  show: boolean;
}

export interface LoginUserProps {
  type: string;
  user: any;
}

export interface NeedCompleteInfosProps {
  type: string;
  needCompleteInfos: boolean;
}

export interface Notification {
  id: string;
  message: string;
  isViewed: boolean;
}

export interface NotificationState {
  notifications: Notification[];
  type: string;
}

export interface SetNotification {
  type: 'SET_NOTIFICATION';
  notificationType: string;
  notificationText: string;
  notificationAction?: void;
  notificationKey?: string;
}

export interface SetNotificationAction {
  type: typeof SET_NOTIFICATION;
  notificationType: string;
  notificationText: string;
  notificationAction?: void;
  notificationKey?: string;
}

export interface ShowNotificationAction {
  type: typeof SHOW_NOTIFICATION;
  show: boolean;
}

export interface SetUserNotification {
  type: 'SET_USER_NOTIFICATION';
  notifications: Notification[];
}

export interface SetUserNotificationAction {
  type: typeof SET_USER_NOTIFICATION;
  notifications: Notification[];
}

export type NotificationActionTypes =
  | LoginLoadingProps
  | Notification
  | NotificationState
  | SetNotificationAction
  | SetUserNotificationAction
  | ShowNotificationAction;
