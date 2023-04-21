import React from "react";
import { Button } from "react-native";
import * as Facebook from "expo-facebook";

interface LoginProps {
  setLoginLoading: React.Dispatch<React.SetStateAction<boolean>>;
  handleSocialLogin: (type: string, accessToken: string) => Promise<void>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

export function Login({ setLoginLoading, setError }: LoginProps) {
  async function handleFBLogin() {
    setLoginLoading(true);
    try {
      await Facebook.initializeAsync({
        appId: "<your-app-id>",
      });
      const { type } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });
      if (type === "success") {
  
      } else {
        setLoginLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoginLoading(false);
      setError("An error occurred");
    }
  }

  return (
    <>
      <Button title="Login with Facebook" onPress={handleFBLogin} />
    </>
  );
}
