import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, { Easing, FadeIn, FadeInDown, FadeInLeft, FadeInRight, FadeInUp, FadeOut } from 'react-native-reanimated';

export enum FlyType {
  none = 'none',
  up = 'up',
  right = 'right',
  left = 'left',
  down = 'down',
}

export interface FlyInAnimationPropsType {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
  duration?: number;
  fly?: FlyType;
}

const FadeAnimation = ({ style, children, duration = 500, fly, ...props }: FlyInAnimationPropsType) => {
  let easing: any = Easing.bezier(0.4, 0, 0.22, 1);
  const exitDuration = duration / 3;

  let flyAction = FadeIn;

  if (fly === FlyType.up) {
    flyAction = FadeInUp;
  } else if (fly === FlyType.right) {
    flyAction = FadeInRight;
  } else if (fly === FlyType.left) {
    flyAction = FadeInLeft;
  } else if (fly === FlyType.down) {
    flyAction = FadeInDown;
  }

  return (
    <Animated.View
      style={style}
      {...props}
      entering={flyAction.duration(duration).easing(easing).delay(exitDuration)}
      exiting={FadeOut.duration(exitDuration).easing(easing)}
    >
      {children}
    </Animated.View>
  );
};

export default FadeAnimation;
