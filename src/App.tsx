import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { RootNavigator } from './navigation/RootNavigator';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import { COLORS } from './constants/colors';

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.primary} />
      <UserProvider>
        <CartProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </CartProvider>
      </UserProvider>
    </SafeAreaProvider>
  );
};

export default App;
