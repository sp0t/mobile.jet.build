import React, { FC, useEffect, useState } from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import 'react-native-gesture-handler';

import { store } from './src/store/store';

import { MainThemeProvider } from './src/theme/ThemeContext';
import { ProgressProvider } from './src/components/ProgressHud/ProgressContext';

// Navigation
import RootNavigation from './src/routes';

let persistor = persistStore(store);

// LogBox.ignoreAllLogs();

const App: FC = () => {
  return (
    <MainThemeProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <SafeAreaProvider>
            <ProgressProvider>
              <RootNavigation />
            </ProgressProvider>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </MainThemeProvider>
  );
};

export default App;
