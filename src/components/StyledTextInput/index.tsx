import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { ColorValue, StyleProp, StyleSheet, TextInput, TextInputProps, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

import { colors, dimensions, fonts, images } from '../../styles';
import { Colors, buildRgba } from '../../styles/colors';
import { useTheme } from '../../theme';

import { FadeAnimation } from '../animations';
import PressAnimation from '../animations/PressAnimation';
import StyledImage from '../StyledImage';
import StyledText from '../StyledText';

export enum InputType {
  Default = 'default',
  Password = 'password',
}

interface Props extends TextInputProps {
  selectionColor?: ColorValue;
  style?: StyleProp<ViewStyle>;
  label?: string;
  prefix?: any;
  suffix?: any;
  type?: InputType;
  error?: any;
  helper?: any;
}

const StyledTextInput = forwardRef(
  ({ keyboardType = 'default', selectionColor = colors.primary, style, label, prefix, suffix, type, error, helper, ...props }: Props, ref) => {
    const { colors } = useTheme();
    const styles = stylesWithTheme(colors);

    const [isFocused, setFocused] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(type === InputType.Password);

    const internalInputRef = useRef<any>();

    useEffect(() => {
      if (error) {
        setFocused(false);
      }
    }, [error]);

    const borderColor = isFocused ? selectionColor : error ? colors.red : colors.lightGrey;

    const onBlur = () => {
      setFocused(false);
    };

    useImperativeHandle(ref, () => ({
      blur: () => {
        internalInputRef.current.blur();
      },
    }));

    const onFocus = () => {
      setFocused(true);
    };

    const onEyePress = () => {
      setSecureTextEntry(!secureTextEntry);
    };

    let textInputStyle: StyleProp<ViewStyle> = {};
    if (prefix) {
      textInputStyle = {
        paddingLeft: dimensions.size.smaller,
        paddingRight: dimensions.size.smedium,
      };
    }

    if (suffix || type === InputType.Password) {
      textInputStyle = {
        // paddingLeft: dimensions.size.tiny,
        paddingRight: dimensions.size.large,
      };
    }

    return (
      <View style={[styles.container, style]}>
        {label && (
          <StyledText smedium style={styles.label}>
            {label}
          </StyledText>
        )}

        <View style={[styles.content, { borderColor }]}>
          {prefix && prefix}

          <TextInput
            ref={internalInputRef}
            placeholderTextColor={colors.grey}
            underlineColorAndroid={colors.transparent}
            selectionColor={colors.dark}
            keyboardType={keyboardType}
            style={[styles.textInput, textInputStyle]}
            secureTextEntry={secureTextEntry}
            autoComplete={'off'}
            autoCapitalize={'none'}
            autoCorrect={false}
            onBlur={onBlur}
            onFocus={onFocus}
            {...props}
          />

          {suffix && <View style={styles.suffix}>{suffix}</View>}

          {type === InputType.Password && (
            <TouchableOpacity activeOpacity={1} style={styles.suffix} onPress={onEyePress}>
              <PressAnimation>
                <StyledImage source={secureTextEntry ? images.EyeHidden : images.EyeShow} style={styles.eyeIcon} />
              </PressAnimation>
            </TouchableOpacity>
          )}
        </View>

        {error ? (
          <FadeAnimation>
            <StyledText smaller red style={{ position: 'absolute', bottom: 0, marginBottom: -20, fontWeight: '400' }}>
              {error}
            </StyledText>
          </FadeAnimation>
        ) : null}

        {helper && helper}
      </View>
    );
  }
);

const stylesWithTheme = (colors: Colors) =>
  StyleSheet.create({
    container: {
      marginBottom: dimensions.size.medium,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      color: colors.primary,
      borderRadius: dimensions.borderRadius.macro,
      borderWidth: 1,
      paddingHorizontal: dimensions.size.smedium,
      minHeight: dimensions.height.Medium,
      backgroundColor: colors.white,

      shadowColor: buildRgba(colors.black, 1),
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 0,
    },
    textInput: {
      width: '100%',
      color: colors.dark,
      fontSize: fonts.size.lmedium,
      paddingVertical: dimensions.size.smaller,
    },
    label: {
      color: colors.blueGreyDark,
      marginBottom: dimensions.size.tiny,
    },
    suffix: {
      position: 'absolute',
      right: 0,
      marginRight: dimensions.size.smedium,
    },
    eyeIcon: {
      width: 20,
      height: 20,
      resizeMode: 'contain',
    },
  });

export default StyledTextInput;
