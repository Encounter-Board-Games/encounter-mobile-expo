import { useQuery, useMutation } from '@apollo/client';
import { getShelvesQuery, bannersQuery } from '../queries/shelves';
import {
  EmailIsRegisteryQuery,
  CreateAuthMutation,
  ConfirmCodeMutation,
  LoginMutation,
  confirmCodeResetPasswordMutation,
  resetPasswordMutation,
} from '../queries/user';
import { getFiltersQuery, getFilterQuery } from '../queries/filter';
import { gql } from 'apollo-boost';
import client from '../client';

export function useFilters() {
  const { data } = useQuery(getFiltersQuery);
  return data?.getFilters;
}

export function useFilter(key: string) {
  const { data } = useQuery(getFilterQuery, { variables: { key } });
  return data?.getFilter;
}

export function useShelves(filter: any) {
  const { data } = useQuery(getShelvesQuery, {
    variables: { ...filter },
    onError: console.log,
  });
  return data?.shelves;
}

export function useBanners() {
  const { data } = useQuery(bannersQuery);
  return data?.banners;
}

export async function emailExists(email: string) {
  const { data } = await client.query({
    query: EmailIsRegisteryQuery,
    variables: { email },
  });
  return data.emailIsRegistery;
}

export function useLogin() {
  const [login] = useMutation(LoginMutation);
  return (
    type: string,
    email: string,
    password: string,
    platform: string,
    os: string,
    notificationToken: string
  ) => {
    return login({
      variables: { type, email, password, platform, os, notificationToken },
    }).then((resp) => resp.data.login);
  };
}

export function useResetPassword() {
  const [resetPassword] = useMutation(resetPasswordMutation);
  return (
    email: string,
    newPassword: string,
    token: string,
    platform: string,
    os: string,
    notificationToken: string
  ) => {
    return resetPassword({
      variables: { email, newPassword, token, platform, os, notificationToken },
    }).then((resp) => resp.data.resetPassword);
  };
}

export function useConfirmCodeResetPassword() {
  const [confirmCodeResetPassword] = useMutation(
    confirmCodeResetPasswordMutation
  );
  return (code: string, email: string) => {
    return confirmCodeResetPassword({ variables: { email, code } }).then(
      (resp) => resp.data.confirmCodeResetPassword
    );
  };
}

export function useCreateAuth() {
  const [createAuth] = useMutation(CreateAuthMutation);
  return (
    type: string,
    email: string,
    password: string,
    platform: string,
    os: string,
    notificationToken: string
  ) => {
    return createAuth({
      variables: { type, email, password, platform, os, notificationToken },
    }).then((resp) => resp.data.createAuth);
  };
}

export function useSendErrors() {
  const [sendErrors] = useMutation(gql`
    mutation ($errors: String!) {
      logErrors(errors: $errors)
    }
  `);
  return (errors: string) => {
    return sendErrors({ variables: { errors } }).then(
      (resp) => resp.data.logErrors
    );
  };
}

export function useConfirmCode() {
  const [confirmCode] = useMutation(ConfirmCodeMutation);
  return (
    email: string,
    code: string,
    platform: string,
    os: string,
    notificationToken: string
  ) => {
    return confirmCode({
      variables: { email, code, platform, os, notificationToken },
    }).then((resp) => resp.data.confirmCode);
  };
}
