import React from 'react';
import { ImageStyle, StyleProp, StyleSheet, TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { devices, dimensions } from '../../styles';
import { Colors, buildRgba } from '../../styles/colors';
import { useTheme } from '../../theme';

import StyledImage from '../StyledImage';
import StyledText from '../StyledText';

interface Props extends TouchableOpacityProps {
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  prefix?: any;
  suffix?: any;
  prefixStyle?: any;
  icon?: string;
  shadow?: boolean;
}

const StyledButton: React.FC<Props> = ({ disabled = false, style, title, titleStyle, prefix, suffix, prefixStyle, icon, shadow, ...props }) => {
  const { colors } = useTheme();
  const styles = stylesWithTheme(colors);

  return (
    <TouchableOpacity {...props} activeOpacity={1} disabled={disabled} style={[styles.container, shadow && styles.shadow, style, disabled && styles.disabled]}>
      {prefix && <StyledImage source={prefix} resizeMode='contain' style={[styles.prefixStyle, prefixStyle]} />}

      {title && title !== '' && (
        <StyledText numberOfLines={1} alignCenter white bold style={titleStyle}>
          {title}
        </StyledText>
      )}

      {/* {icon && <FontAwesome name={icon} color={colors.base.white} size={16} />} */}

      {suffix && <StyledImage source={suffix} resizeMode='contain' style={title ? styles.iconStyle : styles.iconBtnStyle} />}
    </TouchableOpacity>
  );
};

const stylesWithTheme = (colors: Colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      borderRadius: dimensions.borderRadius.macro,
      minHeight: dimensions.height.Medium,
      margin: 0,
      paddingHorizontal: dimensions.size.medium,
      maxWidth: devices.iphoneSEHeight,
    },
    disabled: {
      opacity: 0.2,
    },
    prefixStyle: {
      width: 24,
      height: 24,
      marginRight: dimensions.size.smaller + dimensions.size.micro,
    },
    iconBtnStyle: {
      width: 24,
      height: 24,
    },
    iconStyle: {
      width: 13,
      height: 13,
      marginLeft: dimensions.size.smaller + dimensions.size.micro,
    },
    shadow: {
      shadowColor: buildRgba(colors.black, 1),
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
  });

export default StyledButton;
