import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Easing, interpolate, useAnimatedStyle, useSharedValue, withSpring, WithSpringConfig, withTiming } from 'react-native-reanimated';

const springConfig: WithSpringConfig = {
  damping: 35,
  stiffness: 5500,
  velocity: -1000,
};

export default function useAnimation() {
  const isFocused = useIsFocused();

  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setHidden(!isFocused);
  }, [isFocused]);

  const handleSetHidden = (value: boolean) => {
    setHidden(value);
  };

  const hiddenAnimation = useSharedValue(hidden ? 0 : 1);

  useLayoutEffect(() => {
    hiddenAnimation.value = withTiming(hidden ? 0 : 1, {
      duration: 300,
      easing: Easing.out(Easing.ease),
    });
  }, [hidden, hiddenAnimation]);

  const topToBottom = useAnimatedStyle(() => {
    const translateY = interpolate(hiddenAnimation.value, [0, 1], [-60, 0], 'extend');
    return {
      opacity: hiddenAnimation.value,
      transform: [{ translateY }],
    };
  });

  const bottomToTop = useAnimatedStyle(() => {
    const translateY = interpolate(hiddenAnimation.value, [0, 1], [60, 0], 'extend');
    return {
      opacity: hiddenAnimation.value,
      transform: [{ translateY }],
    };
  });

  const rightToLeft = useAnimatedStyle(() => {
    const translateY = interpolate(hiddenAnimation.value, [0, 1], [0, 0], 'extend');
    return {
      opacity: hiddenAnimation.value,
      transform: [{ translateY }],
    };
  });

  // shake animation
  const shakeAnimation = useSharedValue<number>(0);
  const onShake = useCallback(() => {
    shakeAnimation.value = -10;
    shakeAnimation.value = withSpring(0, springConfig);
  }, [shakeAnimation]);

  return { shakeAnimation, onShake, topToBottom, bottomToTop, rightToLeft, handleSetHidden };
}
