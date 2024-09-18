import { NativeSyntheticEvent, NativeTouchEvent, PressableProps, ViewProps } from 'react-native';

export type TransformOrigin = [number, number];
export type Direction = 'bottom' | 'left' | 'right' | 'top';

export interface BaseButtonAnimationProps extends Pick<ViewProps, 'onLayout' | 'style' | 'testID'>, Pick<PressableProps, 'onPress'> {
  activeOpacity?: number;
  disabled?: boolean;
  duration?: number;
  minLongPressDuration?: number;
  onPress?: (event?: NativeSyntheticEvent<NativeTouchEvent>) => void;
  onLongPress?: () => void;
  transformOrigin?: TransformOrigin | Direction;
  scaleTo?: number;
}

export function normalizeTransformOrigin(transformOrigin: TransformOrigin | string | undefined): TransformOrigin | undefined {
  if (Array.isArray(transformOrigin) && transformOrigin.length === 2) {
    return transformOrigin;
  }

  switch (transformOrigin) {
    case 'bottom':
      return [0.5, 1];
    case 'left':
      return [0, 0.5];
    case 'right':
      return [1, 0.5];
    case 'top':
      return [0.5, 1];
    default:
      return undefined;
  }
}
