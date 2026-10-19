import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigations/RootNavigator';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import { AuthProvider } from './src/contexts/AuthContext';
import BootSplash from 'react-native-bootsplash';
export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={MD3LightTheme}>
        <AuthProvider>
          <NavigationContainer
            onReady={async () => await BootSplash.hide({ fade: true })}
            theme={DefaultTheme}
          >
            <RootNavigator />
          </NavigationContainer>
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
