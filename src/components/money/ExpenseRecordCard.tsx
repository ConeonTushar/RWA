import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';
import { DashedDivider } from './MoneyCommon';
import { ExpenseRecordItem, ExpenseStatus } from './types';

export interface ExpenseRecordCardProps {
  item: ExpenseRecordItem;
  showDivider?: boolean;
  onPress?: () => void;
}

const getStatusColors = (status: ExpenseStatus) => {
  switch (status) {
    case 'Approved':
      return { bg: COLORS.badgeGreenBg, text: COLORS.badgeGreenText };
    case 'Rejected':
      return { bg: COLORS.badgeUrgentBg, text: COLORS.badgeUrgentText };
    case 'Pending':
    default:
      return { bg: COLORS.badgeUrgentBg, text: COLORS.badgeUrgentText };
  }
};

/**
 * Single expense row for the Expenses Summary screen.
 */
const ExpenseRecordCard: React.FC<ExpenseRecordCardProps> = ({
  item,
  showDivider = false,
  onPress,
}) => {
  const statusStyle = getStatusColors(item.status);

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={onPress}
        style={styles.row}
      >
        <View style={styles.leftColumn}>
          <Text style={styles.titleText}>{item.title}</Text>
          <Text style={styles.subtitleText}>
            {item.category} · {item.billDate}
          </Text>
          <Text style={styles.amountText}>{item.amount}</Text>
        </View>

        <View style={[styles.badge, { backgroundColor: statusStyle.bg }]}>
          <Text style={[styles.badgeText, { color: statusStyle.text }]}>
            {item.status}
          </Text>
        </View>
      </TouchableOpacity>

      {showDivider ? <DashedDivider style={styles.divider} /> : null}
    </View>
  );
};

export default ExpenseRecordCard;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: hp(1.8),
  },
  leftColumn: {
    flex: 1,
    paddingRight: wp(3),
  },
  titleText: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
  },
  subtitleText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xxsmall,
    color: COLORS.textSecondary,
    marginTop: hp(0.4),
  },
  amountText: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
    marginTop: hp(0.9),
  },
  badge: {
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(0.45),
    borderRadius: wp(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.xxsmall,
  },
  divider: {
    marginVertical: hp(0.2),
  },
});
