import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import { store } from './src/store/store';
import AppWrapper from './AppWrapper';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import theme from './src/theme/theme';
interface ExtendedTheme extends DefaultTheme {
  colors: DefaultTheme['colors'] & {
    tertiaryColor: string;
    backgroundColor: string;
    foregroundColor: string;
    accentColor: string;
    errorColor: string;
  };
}

interface ExtendedTheme extends DefaultTheme {
  colors: DefaultTheme['colors'] & {
    tertiaryColor: string;
    backgroundColor: string;
    foregroundColor: string;
    accentColor: string;
    errorColor: string;
  };
}

const extendedTheme: ExtendedTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    tertiaryColor: '#6D6E71',
    backgroundColor: '#414042',
    foregroundColor: '#0d3c54',
    accentColor: '#fda856',
    errorColor: '#E35959',
  },
};

const App: React.FC = () => {
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
      <ThemeProvider theme={extendedTheme}>
        <AppWrapper />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
