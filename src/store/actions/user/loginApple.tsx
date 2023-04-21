import * as AppleAuthentication from "expo-apple-authentication";
import * as Crypto from "expo-crypto";
import { useState } from "react";

interface LoginProps {
  setLoginLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setAutocompleteRegister: React.Dispatch<
    React.SetStateAction<{ givenName: string; familyName: string }>
  >;
  handleUserData: (token: string) => Promise<void>;
  setIsCodeSent: React.Dispatch<React.SetStateAction<boolean>>;
}


export default function LoginApple({
  setLoginLoading,
  setAutocompleteRegister,
}: LoginProps) {
  const [error, setError] = useState("");

  async function handleAppleLogin() {
    try {
      setLoginLoading(true);
      const csrf = Math.random().toString(36).substring(2, 15);
      const nonce = Math.random().toString(36).substring(2, 10);
      const hashedNonce = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        nonce
      );
      const result = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
        state: csrf,
        nonce: hashedNonce,
      });

      const { fullName } = result;
      const { familyName, givenName } = fullName || {};
      if (givenName) setAutocompleteRegister({ givenName, familyName });
      handleSocialLogin("apple", result.identityToken);
    } catch (error) {
      console.log(error);
      setLoginLoading(false);
      if (error.code === "ERR_CANCELED") {
        setError("Login canceled");
      } else {
        setError("An error occurred");
      }
    }
  }

  return (
  <>
  {error && (
  <div className="error-message">{error}</div>
  )}
  <button onClick={handleAppleLogin}>Login with Apple</button>
  </>
  );
  }
function handleSocialLogin(arg0: string, identityToken: string) {
  throw new Error("Function not implemented.");
}

