import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { BlurView } from '@react-native-community/blur';

import { dimensions, fonts } from '../../styles';
import { Colors, buildRgba } from '../../styles/colors';
import { useTheme } from '../../theme';

import StyledText from '../StyledText';

interface Props {
  message?: any;
}

const ProgressHud: React.FC<Props> = ({ message = '' }) => {
  const { colors } = useTheme();
  const styles = stylesWithTheme(colors);

  return (
    // <BlurView blurType='light' blurAmount={10} style={styles.container}>
    <View style={styles.container}>
      <View style={styles.content}>
        <ActivityIndicator color={colors.primary} />

        {message !== '' && <StyledText style={styles.message}>{message}</StyledText>}
      </View>
    </View>
    // </BlurView>
  );
};

const stylesWithTheme = (colors: Colors) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      padding: dimensions.size.smaller,
      backgroundColor: buildRgba(colors.primary, 0.2),
    },

    content: {
      backgroundColor: colors.lighterGrey,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: dimensions.borderRadius.medium,
      padding: dimensions.size.smedium,
    },

    message: {
      color: colors.dark,
      marginTop: dimensions.size.smedium,
    },
  });

export default ProgressHud;
