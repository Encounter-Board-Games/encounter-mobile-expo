import { emailExists } from '../../../../graphql';
import {
  SetLoginLoading,
  SetErroLoginProcessMessage,
  SetEmailLoginProcess,
} from '../../../../types/storeTypes';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

interface HandleEmailAlreadyExistsProps {
  email: string;
}

const useHandleEmailAlreadyExists = ({
  email,
}: HandleEmailAlreadyExistsProps) => {
  const dispatch = useDispatch();

  const validateEmail = useCallback((email: string) => {
    var re =
      // eslint-disable-next-line max-len
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }, []);

  const setEmailLoginProcess = useCallback(
    (email: string, isLogin: boolean): SetEmailLoginProcess => {
      return {
        type: 'SET_EMAIL_LOGIN_PROCESS',
        email,
        isLogin,
      };
    },
    []
  );

  const setLoginLoading = useCallback(
    (loading: boolean, typeOfModal?: any): SetLoginLoading => {
      return {
        type: 'SET_LOGIN_LOADING',
        loading,
        typeOfModal,
      };
    },
    []
  );

  const setErroLoginProcessMessage = useCallback(
    (errorMessage: string, typeOfModal?: any): SetErroLoginProcessMessage => {
      return {
        type: 'SET_ERROR_LOGIN_PROCESS_MESSAGE',
        errorMessage,
        typeOfModal,
      };
    },
    []
  );

  const handleEmailExists = useCallback(async () => {
    dispatch(setLoginLoading(true));
    if (!validateEmail(email)) {
      dispatch(setLoginLoading(false));
      return dispatch(setErroLoginProcessMessage('E-mail inválido'));
    }

    try {
      const isLogin = await emailExists(email);
      dispatch(setEmailLoginProcess(email, isLogin));
    } catch (err) {
      console.log('Error:', err);
      dispatch(setErroLoginProcessMessage('Erro ao verificar e-mail'));
    }
    dispatch(setLoginLoading(false));
  }, [
    dispatch,
    email,
    setLoginLoading,
    setErroLoginProcessMessage,
    setEmailLoginProcess,
    validateEmail,
  ]);

  return handleEmailExists;
};

export default useHandleEmailAlreadyExists;
