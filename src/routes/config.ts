import { CardStyleInterpolators } from '@react-navigation/stack';
import { Keyboard } from 'react-native';

import { colors, devices, fonts } from '../styles';
import { android, ios } from '../styles/devices';
import { onWillPop } from './nativeStackConfig';

const buildCoolModalConfig = (params: any) => ({
  allowsDragToDismiss: true,
  allowsTapToDismiss: true,
  backgroundColor: params.backgroundColor || colors.black,
  backgroundOpacity: params.backgroundOpacity || 0.7,
  blocksBackgroundTouches: true,
  cornerRadius:
    params.cornerRadius === 'device'
      ? android
        ? 30
        : 0.666 // 0.666 gets the screen corner radius internally
      : params.cornerRadius === 0
      ? 0
      : params.cornerRadius || 39,
  customStack: true,
  disableShortFormAfterTransitionToLongForm: params.disableShortFormAfterTransitionToLongForm || params?.type === 'token' || params?.type === 'uniswap',
  gestureEnabled: true,
  headerHeight: params.headerHeight || 25,
  ignoreBottomOffset: true,
  isShortFormEnabled: params.isShortFormEnabled || params?.type === 'token',
  longFormHeight: params.longFormHeight,
  onAppear: params.onAppear || null,
  scrollEnabled: params.scrollEnabled,
  single: params.single,
  springDamping: params.springDamping || 0.8,
  startFromShortForm: params.startFromShortForm || params?.type === 'token' || false,
  topOffset: params.topOffset === 0 ? 0 : params.topOffset,
  transitionDuration: params.transitionDuration || 0.35,

  cardStyle: {
    backgroundColor: 'transparent',
  },
  cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
  cardOverlayEnabled: false,
  headerShown: false,
  presentation: 'transparentModal',
});

export const changeWalletSheetConfig = {
  options: ({ route: { params = {} } }) => ({
    ...buildCoolModalConfig({
      ...params,
      springDamping: 1,
      transitionDuration: 0.25,
    }),
  }),
};

export const closeKeyboardOnClose = {
  listeners: {
    transitionEnd: ({ data: { closing } }: any) => {
      closing && android && Keyboard.dismiss();
    },
  },
};

export const nativeStackDefaultConfig = {
  allowsDragToDismiss: true,
  backgroundColor: colors.black,
  backgroundOpacity: 1,
  customStack: true,
  headerHeight: 0,
  ignoreBottomOffset: true,
  springDamping: 1,
  topOffset: 0,
  transitionDuration: 0.3,
};

export const nativeStackDefaultConfigWithoutStatusBar = {
  ...nativeStackDefaultConfig,
  onWillDismiss: () => {
    onWillPop();
  },
};

export const exchangeTabNavigatorConfig = {
  initialLayout: devices.dimensions,
  sceneContainerStyle: {
    backgroundColor: 'transparent',
  },
  springConfig: {
    damping: 30,
    mass: 1,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
    stiffness: 300,
  },
  swipeDistanceMinimum: 0,
  swipeVelocityImpact: 1,
  swipeVelocityScale: 1,
  tabBar: () => null,
  transparentCard: true,
};

const headerConfigOptions = {
  headerBackTitleStyle: {
    fontFamily: fonts.family.Inter,
    fontSize: fonts.size.large,
    fontWeight: fonts.weight.medium,
    letterSpacing: fonts.letterSpacing.roundedMedium,
  },
  headerLeftContainerStyle: {
    paddingLeft: 4,
  },
  headerRightContainerStyle: {
    paddingRight: 4,
  },
  ...(android && {
    headerRightContainerStyle: {
      paddingTop: 6,
    },
    headerTitleAlign: 'center',
  }),
  headerTitleStyle: {
    color: colors.black,
    fontFamily: fonts.family.Inter,
    fontSize: fonts.size.large,
    fontWeight: fonts.weight.heavy,
    letterSpacing: fonts.letterSpacing.roundedMedium,
  },
};
