import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LOGIN_SCREEN, OTP_SCREEN } from './url';
import { SCREENPARAMS } from './types';
import LoginScreen from '../screens/LoginScreen';
import OtpScreen from '../screens/OtpScreen';

const Stack = createNativeStackNavigator<SCREENPARAMS>();
const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={LOGIN_SCREEN}
        screenOptions={{ gestureEnabled: false }}
      >
        <Stack.Screen
          name={LOGIN_SCREEN}
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={OTP_SCREEN}
          component={OtpScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
