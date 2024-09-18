import { createRef } from 'react';
import { createNavigationContainerRef, StackActions } from '@react-navigation/native';

import Routes from './routesNames';

export const navigationRef = createNavigationContainerRef();
export const isMountedRef: any = createRef();

interface NavigateProps {
  (name: Routes, params: Record<string, unknown>): void;
}

export const navigate: NavigateProps = (name, params) => {
  if (isMountedRef.current && navigationRef.current) {
    navigationRef.current.navigate(name, params);
  } else {
  }
};

export const navigatePop = (): void => {
  if (isMountedRef.current && navigationRef.current) {
    navigationRef.current?.dispatch(StackActions.pop());
  } else {
  }
};

export const popToTop = (): void => {
  if (isMountedRef.current && navigationRef.current) {
    navigationRef.current?.dispatch(StackActions.popToTop());
  } else {
  }
};
