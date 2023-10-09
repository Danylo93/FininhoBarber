import 'react-native-gesture-handler';

import {
	Roboto_400Regular,
	Roboto_700Bold,
	useFonts
} from '@expo-google-fonts/roboto'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';

import AppProvider from './hooks';

import Routes from './routes';
import defaultTheme from './styles/theme/default';
import { Loading } from './components/Loading';

const App: React.FC = () => {

  const [fontsLoaded] = useFonts({   Roboto_400Regular, Roboto_700Bold  })

  return (
    <ThemeProvider theme={defaultTheme}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
        <AppProvider>
          <View style={{ backgroundColor: '#312e38', flex: 1 }}>
            {fontsLoaded ? <Routes /> : <Loading />}
          </View>
        </AppProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
