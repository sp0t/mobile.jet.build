import React, { useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import { useDispatch, useSelector } from 'react-redux';

import { isMountedRef, navigationRef } from './navigationUtils';
import { nativeStackConfig } from './nativeStackConfig';
import { RootState } from '../store/store';
import Routes from './routesNames';
import { Themes, useTheme } from '../theme';

import { renderHeader } from './header';
import renderModals from './modals';
import appStackNavigator from './appStackNavigator';
import { useProgress } from '../components/ProgressHud/ProgressContext';

// screens
import SignIn from '../screens/signIn';
import Home from '../screens/home';
import Project from '../screens/project';
import Files from '../screens/files';
import Reports from '../screens/reports';
import ReportDetails from '../screens/reports/details';
import Photos from '../screens/reports/photos';
import Drawings from '../screens/drawings';
import ManPower from '../screens/reports/manpower';
import DrawingDetails from '../screens/drawings/details';
import DrawingIssueFiles from '../screens/drawings/DrawingIssueFiles';

enableScreens();

const Stack = createStackNavigator();

export default function RootNavigation() {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state: RootState) => state.user);
  const { showProgress, hideProgress } = useProgress();
  const { colors, colorScheme } = useTheme();

  useEffect(() => {
    const mounted = async () => {
      isMountedRef.current = true;

      return () => (isMountedRef.current = false);
    };

    mounted();

    // get app state
    AppState.addEventListener('change', handleAppState);
  }, []);

  const handleAppState = (appState: AppStateStatus) => {
    if (appState === 'active') {
    }
  };

  return (
    <NavigationContainer ref={navigationRef} theme={colorScheme === Themes.LIGHT ? DefaultTheme : DarkTheme} {...nativeStackConfig}>
      <Stack.Navigator
        screenOptions={({ navigation }) => {
          return {
            ...renderHeader(navigation, colors),
          };
        }}
      >
        <Stack.Screen name={Routes.SignIn} component={SignIn} options={{ headerShown: false }} />
        <Stack.Screen name={Routes.Home} component={Home} options={{ headerShown: false }} />
        <Stack.Screen name={Routes.Project} component={Project} />
        <Stack.Screen name={Routes.Files} component={Files} />
        <Stack.Screen name={Routes.Reports} component={Reports} />
        <Stack.Screen name={Routes.ReportDetails} component={ReportDetails} />
        <Stack.Screen name={Routes.Photos} component={Photos} />
        <Stack.Screen name={Routes.Drawings} component={Drawings} />
        <Stack.Screen name={Routes.DrawingDetails} component={DrawingDetails} />
        <Stack.Screen name={Routes.ManPower} component={ManPower} />
        <Stack.Screen name={Routes.DrawingIssueFiles} component={DrawingIssueFiles} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
