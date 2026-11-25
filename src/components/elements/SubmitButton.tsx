import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { vs } from '../../utils/helper';

export interface SubmitButtonProps {
  title?: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  activeOpacity?: number;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  title = 'Continue',
  onPress,
  disabled = false,
  loading = false,
  containerStyle,
  buttonStyle,
  textStyle,
  activeOpacity = 0.85,
}) => {
  return (
    <View style={[styles.bottomSection, containerStyle]}>
      <TouchableOpacity
        style={[
          styles.continueButton,
          disabled && styles.disabledButton,
          buttonStyle,
        ]}
        activeOpacity={activeOpacity}
        onPress={onPress}
        disabled={disabled || loading}
      >
        {loading ? (
          <ActivityIndicator color={COLORS.white} size="small" />
        ) : (
          <Text style={[styles.continueButtonText, textStyle]}>{title}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default SubmitButton;

const styles = StyleSheet.create({
  bottomSection: {
    width: '100%',
    paddingTop: vs(16),
  },
  continueButton: {
    backgroundColor: COLORS.darkBtn,
    borderRadius: 14,
    height: vs(48),
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  disabledButton: {
    opacity: 0.6,
  },
  continueButtonText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.white,
  },
});
