import React, { ReactNode, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TextInputProps,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';

export interface InputBoxProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: TextInputProps['keyboardType'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  multiline?: boolean;
  numberOfLines?: number;
  editable?: boolean;
  maxLength?: number;
  required?: boolean;
  inputStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  labelContainerStyle?: StyleProp<ViewStyle>;
  placeholderTextColor?: string;
}

const InputBox: React.FC<InputBoxProps> = ({
  label,
  value,
  onChangeText,
  placeholder = 'Enter here',
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  error,
  leftIcon,
  rightIcon,
  multiline = false,
  numberOfLines = 1,
  editable = true,
  maxLength,
  required = false,
  inputStyle,
  containerStyle,
  inputContainerStyle,
  labelStyle,
  labelContainerStyle,
  placeholderTextColor,
  onFocus,
  onBlur,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Floating Label */}
      {label && (
        <View style={[styles.labelContainer, labelContainerStyle]}>
          <Text
            style={[
              styles.label,
              isFocused && styles.labelFocused,
              labelStyle,
            ]}
          >
            {label}
            {required && <Text style={styles.required}> *</Text>}
          </Text>
        </View>
      )}

      {/* Input Container */}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          inputContainerStyle,
          error ? styles.errorBorder : undefined,
          multiline ? styles.multilineContainer : undefined,
        ]}
      >
        {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}

        <TextInput
          style={[
            styles.input,
            multiline ? styles.multilineInput : undefined,
            inputStyle,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor || COLORS.placeholder}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={editable}
          maxLength={maxLength}
          textAlignVertical={multiline ? 'top' : 'center'}
          onFocus={e => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={e => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          {...rest}
        />

        {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 12,
    marginBottom: 16,
    position: 'relative',
  },

  labelContainer: {
    position: 'absolute',
    top: -9,
    left: 20,
    zIndex: 2,
    backgroundColor: COLORS.white,
    paddingHorizontal: 6,
  },

  label: {
    fontSize: FONTSIZE.xsmall,
    fontFamily: FONTS.REGULAR_OUTFIT,
    color: COLORS.textSecondary,
  },

  labelFocused: {
    color: COLORS.darkText,
  },

  required: {
    color: COLORS.red,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: hp(1.4),
    paddingHorizontal: wp(4),
    backgroundColor: COLORS.white,
    minHeight: hp(6.2),
  },

  inputContainerFocused: {
    borderColor: COLORS.darkText,
  },

  input: {
    flex: 1,
    fontSize: FONTSIZE.minTiny,
    fontFamily: FONTS.REGULAR_OUTFIT,
    color: COLORS.darkText,
    paddingVertical: 10,
  },

  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },

  multilineContainer: {
    minHeight: 120,
    alignItems: 'flex-start',
  },

  multilineInput: {
    minHeight: 110,
    paddingTop: 15,
  },

  errorBorder: {
    borderColor: COLORS.red,
  },

  errorText: {
    color: COLORS.red,
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
});
