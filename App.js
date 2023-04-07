import React, { useState, useEffect } from "react";
import { View } from "react-native";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components/native";
import * as Font from "expo-font";
import theme from "./src/styles/theme";
import store from "./src/store/store";
import AppWrapper from "./AppWrapper";

export default function App() {

    const [already, setAlready] = useState(false);

    useEffect(() => {
      Font.loadAsync({
        Nunito: require("./src/assets/fonts/Nunito-Regular.ttf"),
        "Nunito-Bold": require("./src/assets/fonts/Nunito-Bold.ttf"),
      }).then((_) => setAlready(true));
    }, []);
  
    if (!already) return <View></View>;
    return (
       <Provider store={store}>
            <ThemeProvider theme={theme}>
                <AppWrapper /> 
            </ThemeProvider>
        </Provider>
    );
}
