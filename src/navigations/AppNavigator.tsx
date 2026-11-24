import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import Routes from './Routes';

const AppNavigator = () => {
  return (
    <SafeAreaView style={appNavigatoStyle.viewContainer}>
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
