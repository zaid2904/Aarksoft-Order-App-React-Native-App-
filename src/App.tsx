import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS } from './constants/colors';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import { RootNavigator } from './navigation/RootNavigator';

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
w