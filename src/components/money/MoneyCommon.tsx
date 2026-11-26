import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';
import VectorIcon from '../elements/VectorIcon';
import { FlatPaymentStatus } from './types';

export interface MoneyDetailHeaderProps {
  title: string;
  onBackPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

export const MoneyDetailHeader: React.FC<MoneyDetailHeaderProps> = ({
  title,
  onBackPress,
  containerStyle,
}) => {
  return (
    <View style={[styles.headerContainer, containerStyle]}>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Go back"
        activeOpacity={0.7}
        onPress={onBackPress}
        style={styles.backBtn}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <VectorIcon
          type="Feather"
          name="chevron-left"
          size={wp(5.5)}
          color={COLORS.darkText}
        />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

export interface FlatStatusBadgeProps {
  status: FlatPaymentStatus;
  containerStyle?: StyleProp<ViewStyle>;
}

export const FlatStatusBadge: React.FC<FlatStatusBadgeProps> = ({
  status,
  containerStyle,
}) => {
  const getStatusStyle = () => {
    switch (status) {
      case 'Paid':
        return {
          bg: COLORS.badgeGreenBg,
          text: COLORS.badgeGreenText,
          label: 'Paid',
        };
      case 'Due':
        return {
          bg: COLORS.approvalAmberBg,
          text: COLORS.approvalAmberText,
          label: 'Due',
        };
      case 'Part paid':
        return {
          bg: COLORS.badgeUrgentBg,
          text: COLORS.badgeUrgentText,
          label: 'Part Paid',
        };
      case 'Overdue':
        return {
          bg: COLORS.badgeUrgentBg,
          text: COLORS.badgeUrgentText,
          label: 'Overdue',
        };
      default:
        return {
          bg: COLORS.lightGrey,
          text: COLORS.textSecondary,
          label: status,
        };
    }
  };

  const { bg, text, label } = getStatusStyle();

  return (
    <View style={[styles.badge, { backgroundColor: bg }, containerStyle]}>
      <Text style={[styles.badgeText, { color: text }]}>{label}</Text>
    </View>
  );
};

export const DashedDivider: React.FC<{ style?: StyleProp<ViewStyle> }> = ({
  style,
}) => <View style={[styles.dashedDivider, style]} />;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.2),
    width: '100%',
  },
  backBtn: {
    marginRight: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.l2,
    color: COLORS.darkText,
  },
  badge: {
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.45),
    borderRadius: wp(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.xxsmall,
  },
  dashedDivider: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.dashedBorder,
    borderStyle: 'dashed',
  },
});
