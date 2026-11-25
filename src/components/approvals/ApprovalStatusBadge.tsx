import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';

export type BadgeVariant = 'urgent' | 'warning' | 'success' | 'default';

export interface ApprovalStatusBadgeProps {
  label: string;
  variant?: BadgeVariant;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const ApprovalStatusBadge: React.FC<ApprovalStatusBadgeProps> = ({
  label,
  variant = 'urgent',
  containerStyle,
  textStyle,
}) => {
  const getBadgeColors = () => {
    switch (variant) {
      case 'urgent':
        return {
          bg: COLORS.badgeUrgentBg,
          text: COLORS.badgeUrgentText,
        };
      case 'warning':
        return {
          bg: COLORS.approvalAmberBg,
          text: COLORS.approvalAmberText,
        };
      case 'success':
        return {
          bg: COLORS.badgeGreenBg,
          text: COLORS.badgeGreenText,
        };
      default:
        return {
          bg: COLORS.lightGrey,
          text: COLORS.textSecondary,
        };
    }
  };

  const colors = getBadgeColors();

  return (
    <View
      style={[
        styles.badgeContainer,
        { backgroundColor: colors.bg },
        containerStyle,
      ]}
    >
      <Text style={[styles.badgeText, { color: colors.text }, textStyle]}>
        {label}
      </Text>
    </View>
  );
};

export default ApprovalStatusBadge;

const styles = StyleSheet.create({
  badgeContainer: {
    paddingHorizontal: wp(2.8),
    paddingVertical: hp(0.55),
    borderRadius: wp(4),
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xxsmall,
    letterSpacing: 0.1,
  },
});
