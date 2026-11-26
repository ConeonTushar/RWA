import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp } from '../../utils/helper';
import { DashedDivider } from './MoneyCommon';

export interface ExpenseApprovalSummaryProps {
  amount: string;
  title: string;
  submittedDate: string;
  containerStyle?: StyleProp<ViewStyle>;
}

/**
 * Top amount and title summary header for Expense Approval.
 */
const ExpenseApprovalSummary: React.FC<ExpenseApprovalSummaryProps> = ({
  amount,
  title,
  submittedDate,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.caption}>Expense amount</Text>
      <Text style={styles.amountText}>{amount}</Text>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.submittedText}>Submitted on {submittedDate}</Text>
      <DashedDivider style={styles.divider} />
    </View>
  );
};

export default ExpenseApprovalSummary;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  caption: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
  },
  amountText: {
    fontFamily: FONTS.BOLD_OUTFIT,
    fontSize: FONTSIZE.h4,
    color: COLORS.darkText,
    marginTop: hp(0.4),
  },
  titleText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
    marginTop: hp(0.5),
  },
  submittedText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
    marginTop: hp(0.3),
  },
  divider: {
    marginTop: hp(2.2),
  },
});
