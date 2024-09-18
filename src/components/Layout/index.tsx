import React, { ReactNode } from 'react';
import { StyleProp, ScrollView, StyleSheet, View, ViewStyle, KeyboardAvoidingView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/elements';

import { devices, dimensions, images } from '../../styles';
import { android, ios } from '../../styles/devices';
import { Colors } from '../../styles/colors';
import { useTheme } from '../../theme';
import { useDimensions } from '../../hooks';

export enum BehaviorType {
  height = 'height',
  padding = 'padding',
  position = 'position',
}

export interface LayoutPropsType {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  noPadding?: boolean;
  noScroll?: boolean;
  showLogo?: boolean;
}

const Layout = ({ children, style, noPadding = false, noScroll = false, showLogo }: LayoutPropsType) => {
  const headerHeight = useHeaderHeight();
  const safeArea = useSafeAreaInsets();
  const { scaleHeight } = useDimensions();
  const { colors } = useTheme();
  const styles = stylesWithTheme(colors);

  const padding = {
    paddingHorizontal: dimensions.size.large,
    paddingTop: headerHeight ? dimensions.size.large : dimensions.size.large + safeArea.top,
    paddingBottom: dimensions.size.large + safeArea.bottom,
  };

  const height = (scaleHeight > devices.iPhone6Height ? scaleHeight : devices.iPhone6Height) - headerHeight;

  const layoutStyle = [!noPadding && padding, { height }, style];

  return (
    <KeyboardAvoidingView behavior={ios ? BehaviorType.padding : BehaviorType.height} enabled={true} style={styles.layout}>
      <ScrollView scrollEnabled={!noScroll} showsVerticalScrollIndicator={true} scrollEventThrottle={16}>
        <View style={[layoutStyle]}>{children}</View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Layout;

const stylesWithTheme = (colors: Colors) =>
  StyleSheet.create({
    layout: {
      flex: 1,
      backgroundColor: colors.black,
    },
  });
