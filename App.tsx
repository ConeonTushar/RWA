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
import AppNavigator from './src/navigations/AppNavigator';

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
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppNavigator />
    </SafeAreaProvider>
  );
}

export default App;
