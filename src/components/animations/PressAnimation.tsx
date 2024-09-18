import React, { PropsWithChildren, useCallback, useContext, useMemo } from 'react';
import { processColor, requireNativeComponent, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { createNativeWrapper, NativeViewGestureHandlerGestureEvent, RawButtonProps } from 'react-native-gesture-handler';
import { PureNativeButton } from 'react-native-gesture-handler/src/components/GestureButtons';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Animated, {
  AnimateProps,
  Easing,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { ScaleButtonContext } from './ScaleButtonZoomable';
import { BaseButtonAnimationProps, normalizeTransformOrigin } from './types';
import { HapticFeedbackType } from '../../utils/haptics';
import { useLongPressEvents } from '../../hooks';
import { ios } from '../../styles/devices';

interface BaseProps extends BaseButtonAnimationProps {
  backgroundColor?: string;
  borderRadius?: number;
  contentContainerStyle?: StyleProp<ViewStyle>;
  isLongPress?: boolean;
  onLongPressEnded?: () => void;
  overflowMargin?: number;
  reanimatedButton?: boolean;
  shouldLongPressHoldPress?: boolean;
  skipTopMargin?: boolean;
  wrapperStyle?: StyleProp<ViewStyle>;
  hapticType?: HapticFeedbackType;
  enableHapticFeedback?: boolean;
}

type Props = PropsWithChildren<BaseProps>;

const AnimatedRawButton = createNativeWrapper<AnimateProps<PropsWithChildren<RawButtonProps>>>(Animated.createAnimatedComponent(PureNativeButton), {
  shouldActivateOnStart: true,
  shouldCancelWhenOutside: true,
});

const OVERFLOW_MARGIN = 5;

const transparentColor = processColor('transparent');

const ScaleButton = ({
  children,
  contentContainerStyle,
  duration,
  minLongPressDuration,
  onLongPress,
  onPress,
  overflowMargin = OVERFLOW_MARGIN,
  scaleTo = 0.86,
  wrapperStyle,
  testID,
}: PropsWithChildren<Props>) => {
  const parentScale = useContext(ScaleButtonContext);
  const childScale = useSharedValue(1);
  let scale: any = parentScale || childScale;
  const hasScaledDown = useSharedValue(0);
  const scaleTraversed = useDerivedValue(() => {
    const value = withTiming(scale.value, {
      duration,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    if (parentScale) {
      return 1;
    } else {
      return value;
    }
  });
  const sz = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scaleTraversed.value,
        },
      ],
    };
  });

  const { handleCancel, handlePress, handleStartPress } = useLongPressEvents({
    minLongPressDuration,
    onLongPress,
    onPress,
  });

  const gestureHandler = useAnimatedGestureHandler<NativeViewGestureHandlerGestureEvent>({
    onActive: () => {
      runOnJS(handleStartPress)();
      if (hasScaledDown.value === 0) {
        scale.value = scaleTo;
      }
      hasScaledDown.value = 1;
    },
    onCancel: () => {
      scale.value = 1;
      hasScaledDown.value = 0;
      runOnJS(handleCancel)();
    },
    onEnd: () => {
      hasScaledDown.value = 0;
      scale.value = 1;
      runOnJS(handlePress)();
    },
    onFail: () => {
      runOnJS(handleCancel)();
    },
  });

  return (
    <View style={[sx.overflow, wrapperStyle]} testID={testID}>
      <View style={{ margin: -overflowMargin }}>
        {ios ? (
          <AnimatedRawButton hitSlop={-overflowMargin} onGestureEvent={gestureHandler} rippleColor={transparentColor} style={sx.overflow}>
            <View style={sx.transparentBackground}>
              <View style={{ padding: overflowMargin }}>
                <Animated.View style={[sz, contentContainerStyle]}>{children}</Animated.View>
              </View>
            </View>
          </AnimatedRawButton>
        ) : (
          <TouchableOpacity activeOpacity={0.9} style={sx.overflow} onPress={onPress}>
            <View style={sx.transparentBackground}>
              <View style={{ padding: overflowMargin }}>
                <Animated.View style={[sz, contentContainerStyle]}>{children}</Animated.View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const PressAnimation = ({
  backgroundColor = 'transparent',
  borderRadius = 0,
  children,
  contentContainerStyle,
  disabled,
  duration = 160,
  minLongPressDuration = 500,
  onLayout,
  onLongPress,
  onLongPressEnded,
  shouldLongPressHoldPress,
  onPress,
  overflowMargin = OVERFLOW_MARGIN,
  reanimatedButton,
  scaleTo = 0.86,
  skipTopMargin,
  style,
  testID,
  transformOrigin,
  wrapperStyle,
  hapticType = 'selection',
  enableHapticFeedback = true,
}: Props) => {
  const normalizedTransformOrigin = useMemo(() => normalizeTransformOrigin(transformOrigin), [transformOrigin]);

  const ButtonElement = ScaleButton;
  return disabled ? (
    <View onLayout={onLayout} style={[sx.overflow, style, { opacity: 0.5 }]}>
      {children}
    </View>
  ) : (
    <ButtonElement
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
      contentContainerStyle={contentContainerStyle}
      duration={duration}
      enableHapticFeedback={enableHapticFeedback}
      hapticType={hapticType}
      isLongPress={!!onLongPress}
      minLongPressDuration={minLongPressDuration}
      onLayout={onLayout}
      onLongPress={onLongPress}
      onLongPressEnded={onLongPressEnded}
      onPress={onPress}
      overflowMargin={overflowMargin}
      scaleTo={scaleTo}
      shouldLongPressHoldPress={shouldLongPressHoldPress}
      skipTopMargin={skipTopMargin}
      testID={testID}
      transformOrigin={normalizedTransformOrigin}
      wrapperStyle={wrapperStyle}
    >
      <View pointerEvents='box-only' style={[sx.overflow, style]}>
        {children}
      </View>
    </ButtonElement>
  );
};

export default PressAnimation;

const sx = StyleSheet.create({
  overflow: {
    overflow: 'visible',
  },
  transparentBackground: {
    backgroundColor: 'transparent',
  },
});
