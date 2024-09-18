import * as React from 'react';
import { Text, StyleSheet, TextProps, StyleProp, TextStyle } from 'react-native';

import { fonts } from '../../styles';
import { useTheme } from '../../theme';

interface Props extends TextProps {
  style?: StyleProp<TextStyle>;
  primary?: boolean;
  blueGreyDark?: boolean;
  blueGreyDark30?: boolean;
  grey?: boolean;
  white?: boolean;
  red?: boolean;
  green?: boolean;
  yellow?: boolean;
  alignCenter?: boolean;
  alignRight?: boolean;
  smaller?: boolean;
  smedium?: boolean;
  larger?: boolean;
  bold?: boolean;
}

const StyledText: React.FunctionComponent<Props> = ({
  style,
  primary,
  blueGreyDark,
  blueGreyDark30,
  white,
  grey,
  yellow,
  red,
  green,
  alignCenter,
  alignRight,
  smaller,
  smedium,
  larger,
  bold,
  ...props
}) => {
  const { colors } = useTheme();

  let fontSize = fonts.size.medium;

  let lineHeight = fonts.lineHeight.normal;

  let color = colors.black;

  let textAlign: any = 'left';

  let fontWeight: any = '500';

  if (smaller) {
    fontSize = fonts.size.smaller;
  } else if (smedium) {
    fontSize = fonts.size.smedium;
  } else if (larger) {
    fontSize = fonts.size.larger;
    lineHeight = fonts.lineHeight.looser;
  }

  if (primary) {
    color = colors.primary;
  } else if (blueGreyDark) {
    color = colors.blueGreyDark;
  } else if (blueGreyDark30) {
    color = colors.blueGreyDark30;
  } else if (white) {
    color = colors.white;
  } else if (grey) {
    color = colors.grey;
  } else if (red) {
    color = colors.red;
  } else if (green) {
    color = colors.green;
  } else if (yellow) {
    color = colors.yellow;
  }

  if (alignCenter) {
    textAlign = 'center';
  } else if (alignRight) {
    textAlign = 'right';
  }

  if (bold) {
    fontWeight = 'bold';
  }

  return <Text {...props} style={[styles.text, { fontSize }, { lineHeight }, { color }, { textAlign }, { fontWeight }, style]} />;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: fonts.family.Inter,
  },
});

export default StyledText;
