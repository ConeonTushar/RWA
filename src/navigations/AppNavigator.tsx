import React, { useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Routes from './Routes';
import SplashScreen from '../screens/Onboarding/SplashScreen';
import { isAndroid } from '../utils/helper';

const AppNavigator = () => {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <SafeAreaView edges={['top']} style={appNavigatoStyle.viewContainer}>
      <Routes />
    </SafeAreaView>
  );
};

export const appNavigatoStyle = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: isAndroid ? 10 : StatusBar.currentHeight,
  },
});

export default AppNavigator;
