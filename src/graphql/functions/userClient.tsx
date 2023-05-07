import client from '../client';
import { gql } from '@apollo/client';
import {
  MeQuery,
  EditBasicInfoMutation,
  UserInfoQuery,
  UserNotificationsQuery,
  RememberMeMutation,
  SetNotificationViewedMutation,
} from '../queries/user';

export async function editBasicInfo({
  name,
  lastname,
  preferenceName,
  birthday,
  cellphone,
  terms,
  gender,
  document,
}: {
  name: string;
  lastname: string;
  preferenceName: string;
  birthday: Date;
  cellphone: string;
  terms: boolean;
  gender: string;
  document: string;
}): Promise<boolean> {
  const { data } = await client.mutate<{ editBasicInfo: boolean }>({
    mutation: EditBasicInfoMutation,
    variables: {
      name,
      lastname,
      preferenceName,
      birthday,
      cellphone,
      terms,
      gender,
      document,
    },
  });

  return data.editBasicInfo;
}

export async function me(): Promise<any> {
  const { data } = await client.query<{ me: any }>({
    query: MeQuery,
  });

  return data.me;
}

export async function userInfo(): Promise<any> {
  const { data } = await client.query<{ user: any }>({
    query: UserInfoQuery,
  });

  return data.user;
}

export async function registerAccessLog(deviceId: string): Promise<boolean> {
  const { data } = await client.mutate<{ registerAccessLog: boolean }>({
    mutation: gql`
      mutation ($deviceId: String!) {
        registerAccessLog(deviceId: $deviceId)
      }
    `,
    variables: { deviceId },
    fetchPolicy: 'no-cache',
  });

  return data.registerAccessLog;
}

export async function userNotifications(): Promise<any> {
  const { data } = await client.query<{ user: any }>({
    query: UserNotificationsQuery,
    fetchPolicy: 'no-cache',
  });

  return data.user;
}

export async function setUserNotificationViewed(key: string): Promise<boolean> {
  const { data } = await client.mutate<{ setNotificationViewed: boolean }>({
    mutation: SetNotificationViewedMutation,
    variables: { key },
  });

  return data.setNotificationViewed;
}

export async function rememberMe(key: string): Promise<boolean> {
  const { data } = await client.mutate<{ rememberMe: boolean }>({
    mutation: RememberMeMutation,
    variables: { key },
  });

  return data.rememberMe;
}
