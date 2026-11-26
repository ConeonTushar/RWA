/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  StatusBar,
  Text,
  TextInput,
  useColorScheme,
} from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import AppNavigator from './src/navigations/AppNavigator';
import Store from './src/stores/Store';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  (Text as any).defaultProps = {
    ...(Text as any).defaultProps,
    allowFontScaling: false,
  };
  (TextInput as any).defaultProps = {
    ...(TextInput as any).defaultProps,
    allowFontScaling: false,
  };
  return (
    <Provider store={Store}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppNavigator />
        <Toast />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
