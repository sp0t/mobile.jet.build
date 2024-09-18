import chroma from 'chroma-js';

import { memoFn } from '../utils/memoFn';
import { currentColors } from '../theme';

export type Colors = ReturnType<typeof getColorsByTheme>;

export const buildRgba = memoFn((color: string, alpha = 1) => `rgba(${chroma(color).rgb()},${alpha})`);

const isHex = (color = '') => color.length >= 3 && color.charAt(0) === '#';
const isRGB = memoFn((color: string = '') => color.toLowerCase().substring(0, 3) === 'rgb');

const darkModeColors = {
  primary: '#4472C4',
  secondary: '#FFCD34',
  appleBlue: '#0E76FD',
  black: '#000000',
  blueGreyDark: '#374151',
  blueGreyDark04: '#222326',
  blueGreyDark20: '#3A3D45',
  blueGreyDark30: '#535353',
  blueGreyDark40: '#B1B3BA',
  blueGreyDark50: '#9ca3af',
  blueGreyDark60: '#898D97',
  blueGreyDark80: '#636875',
  blueGreyDarker: '#0F0F11',
  blueGreyDarkLight: '#F3F4F5',
  brightRed: '#FF7171',
  dark: '#101010',
  darkGrey: '#222126',
  darkModeDark: '#404656',
  green: '#2CCC00',
  grey: '#9a9a9a',
  grey10: '#FAFBFB',
  grey20: '#B2B1B4',
  grey30: '#C3C8CD',
  grey40: '#333333',
  lighterGrey: '#F7F7F7',
  lightestGrey: '#E9EBEF',
  lightGrey: '#d1d5db',
  orange: '#F46E38',
  pink: '#FF54BB',
  purple: '#735CFF',
  red: '#B91C1C',
  shadow: '#25292E',
  transparent: 'transparent',
  white: '#FFFFFF',
  yellow: '#FFD657',
};

const getColorsByTheme = (darkMode?: boolean) => {
  let base = {
    primary: '#4472C4',
    secondary: '#FFCD34',
    appleBlue: '#0E76FD',
    black: '#000000',
    blueGreyDark: '#374151',
    blueGreyDark04: '#222326',
    blueGreyDark20: '#3A3D45',
    blueGreyDark30: '#535353',
    blueGreyDark40: '#B1B3BA',
    blueGreyDark50: '#9ca3af',
    blueGreyDark60: '#898D97',
    blueGreyDark80: '#636875',
    blueGreyDarker: '#0F0F11',
    blueGreyDarkLight: '#F3F4F5',
    brightRed: '#FF7171',
    dark: '#101010',
    darkGrey: '#222126',
    darkModeDark: '#404656',
    green: '#2CCC00',
    grey: '#9a9a9a',
    grey10: '#FAFBFB',
    grey20: '#B2B1B4',
    grey30: '#C3C8CD',
    grey40: '#333333',
    lighterGrey: '#F7F7F7',
    lightestGrey: '#E9EBEF',
    lightGrey: '#d1d5db',
    orange: '#F46E38',
    pink: '#FF54BB',
    purple: '#735CFF',
    red: '#B91C1C',
    shadow: '#25292E',
    transparent: 'transparent',
    white: '#FFFFFF',
    yellow: '#FFD657',
  };

  const isColorLight = memoFn((targetColor: string) => chroma(targetColor ?? base.white).luminance() > 0.5);

  const getTextColorForBackground = (targetColor: string, textColors?: { dark: string; light: string }) => {
    const dark = textColors?.dark ?? base.black;
    const light = textColors?.light ?? base.white;

    return isColorLight(targetColor) ? dark : light;
  };

  const isColorDark = memoFn((targetColor: string) => {
    return chroma.contrast(targetColor, darkModeColors.white) < 1.5 || chroma(targetColor ?? base.white).luminance() < 0.11;
  });

  const brighten = memoFn((targetColor: string) => chroma(targetColor).brighten(2).saturate(0.3).hex());

  const transparent = {
    whiteTransparent: buildRgba(base.white, 0.8),
  };

  if (darkMode) {
    base = {
      ...base,
      ...darkModeColors,
    };
  }

  return {
    alpha: buildRgba,
    brighten,
    getTextColorForBackground,
    isColorDark,
    isColorLight,
    ...base,
    ...transparent,
  };
};

export const darkModeThemeColors = getColorsByTheme(true);
export const lightModeThemeColors = getColorsByTheme(false);
const colors = currentColors.themedColors ?? lightModeThemeColors;

currentColors.themedColors = lightModeThemeColors;

export default {
  ...colors,
  darkModeColors,
  darkModeThemeColors,
  lightModeThemeColors,
};
