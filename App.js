import React from 'react';
import {
  StatusBar,
  useColorScheme,
} from 'react-native';

import Navigation from 'Test1/navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Navigation/>
    </SafeAreaProvider>
  );
};

export default App;
