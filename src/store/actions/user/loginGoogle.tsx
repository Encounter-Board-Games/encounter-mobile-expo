import React, { useState } from 'react';
import { startAsync, ResponseType } from 'expo-auth-session';
import config from '../../../../config';

interface LoginProps {
  setLoginLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setAutocompleteRegister: React.Dispatch<
    React.SetStateAction<{ givenName: string; familyName: string }>
  >;
  handleUserData: (token: string) => Promise<void>;
  setIsCodeSent: React.Dispatch<React.SetStateAction<boolean>>;
  handleSocialLogin: (arg0: string, accessToken: string) => void;
}

export default function LoginGoogle({
  setLoginLoading,
  handleSocialLogin,
}: LoginProps) {
  const [error, setError] = useState('');

  async function handleGoogleLogin() {
    try {
      setLoginLoading(true);
      const redirectUri = `${config.login.googleSignIn.redirectUrl}:/oauth2redirect/google`;
      const options = {
        responseType: ResponseType.Token,
        clientId: config.login.googleSignIn.web,
        redirectUri,
        scopes: ['openid', 'profile', 'email'],
        authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
      };
      const result = await startAsync(options);

      if (result.type === 'success') {
        const accessToken = result.authentication?.accessToken as any;
        handleSocialLogin('google', accessToken);
      } else {
        setLoginLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoginLoading(false);
      setError('An error occurred');
    }
  }

  return (
    <>
      {error && <div className="error-message">{error}</div>}
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </>
  );
}
