import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import { store } from './src/store/store';
import theme from './src/styles/theme';
import App from './App';

const AppWrapper: React.FC = () => {
  const [already, setAlready] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      Nunito: require('./src/assets/fonts/Nunito-Regular.ttf'),
      'Nunito-Bold': require('./src/assets/fonts/Nunito-Bold.ttf'),
    }).then(() => setAlready(true));
  }, []);

  if (!already) {
    return <View />;
  }

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  );
};

export default AppWrapper;
