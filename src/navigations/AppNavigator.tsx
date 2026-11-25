import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Routes from './Routes';

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
    paddingTop: StatusBar.currentHeight,
  },
});

export default AppNavigator;
