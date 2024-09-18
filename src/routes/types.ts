import { StackActionType } from '@react-navigation/native';

import Routes from './routesNames';
import { FilesResponse } from '../models/account';

export interface RouteParamsInterface {
  id?: string;
  isSignUp?: boolean;
  files?: FilesResponse;
  folder_pk?: number;
}

export interface HeaderRightInterface {
  navigation?: GenericNavigationProps;
  title?: string;
  routeName?: Routes;
}

export type NavigateProps = {
  (name: string, params?: unknown): void;
};

export type GenericNavigationProps = {
  navigate: NavigateProps;
  setOptions: (options: Partial<unknown>) => void;
  goBack: () => StackActionType;
  canGoBack: () => StackActionType;
};

export type RouteProps = {
  key: string;
  name: string;
  params: RouteParamsInterface;
};
