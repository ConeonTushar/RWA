import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  StyleProp,
  ViewStyle,
  KeyboardTypeOptions,
} from 'react-native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';

export interface FloatingLabelInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
  prefix?: string;
  keyboardType?: KeyboardTypeOptions;
  containerStyle?: StyleProp<ViewStyle>;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  prefix,
  keyboardType = 'default',
  containerStyle,
}) => {
  return (
    <View style={[styles.wrapper, containerStyle]}>
      <View style={styles.labelBadge}>
        <Text style={styles.labelText}>{label}</Text>
      </View>
      <View
        style={[
          styles.inputBox,
          multiline ? styles.multilineBox : styles.singleLineBox,
        ]}
      >
        {prefix ? <Text style={styles.prefixText}>{prefix}</Text> : null}
        <TextInput
          style={[styles.input, multiline && styles.multilineInput]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.placeholder}
          multiline={multiline}
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );
};

export default FloatingLabelInput;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    position: 'relative',
    paddingTop: hp(1),
  },
  labelBadge: {
    position: 'absolute',
    top: 0,
    left: wp(3.5),
    zIndex: 2,
    backgroundColor: COLORS.white,
    paddingHorizontal: wp(1.5),
  },
  labelText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: wp(3.5),
    paddingHorizontal: wp(4),
    backgroundColor: COLORS.white,
  },
  singleLineBox: {
    height: hp(6),
  },
  multilineBox: {
    minHeight: hp(11.5),
    alignItems: 'flex-start',
    paddingVertical: hp(1.5),
  },
  prefixText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.textSecondary,
    marginRight: wp(1.5),
  },
  input: {
    flex: 1,
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
    paddingVertical: 0,
  },
  multilineInput: {
    textAlignVertical: 'top',
    minHeight: hp(8.5),
  },
});
