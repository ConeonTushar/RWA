import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Routes from './Routes';
import { isAndroid } from '../utils/helper';

const AppNavigator = () => {
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
