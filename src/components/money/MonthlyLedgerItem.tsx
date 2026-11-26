import React from 'react';
import { StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp } from '../../utils/helper';
import { DashedDivider, FlatStatusBadge } from './MoneyCommon';
import { MonthlyLedgerEntry } from './types';

export interface MonthlyLedgerItemProps {
  entry: MonthlyLedgerEntry;
  showDivider?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

const MonthlyLedgerItem: React.FC<MonthlyLedgerItemProps> = ({
  entry,
  showDivider = true,
  containerStyle,
}) => {
  return (
    <View style={containerStyle}>
      <View style={styles.container}>
        {/* Month Header + Status Pill */}
        <View style={styles.headerRow}>
          <Text style={styles.monthTitle}>{entry.month}</Text>
          <FlatStatusBadge status={entry.status} />
        </View>

        {/* Maintenance Charge */}
        <View style={styles.lineRow}>
          <Text style={styles.lineLabel}>Maintenance charge</Text>
          <Text style={styles.chargeAmount}>{entry.maintenanceCharge}</Text>
        </View>

        {/* Payment Received */}
        <View style={styles.lineRow}>
          <Text style={styles.lineLabel}>Payment received</Text>
          <Text style={styles.paymentAmount}>{entry.paymentReceived}</Text>
        </View>

        {/* Month Balance */}
        <Text style={styles.balanceLabel}>{entry.balanceLabel}</Text>
        <Text style={styles.balanceValue}>{entry.balanceAmount}</Text>
      </View>

      {showDivider && <DashedDivider />}
    </View>
  );
};

export default MonthlyLedgerItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: hp(2),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1.5),
  },
  monthTitle: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
  },
  lineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  lineLabel: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
  },
  chargeAmount: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.badgeUrgentText,
  },
  paymentAmount: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.badgeGreenText,
  },
  balanceLabel: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.xxsmall,
    color: COLORS.darkText,
    marginTop: hp(0.6),
  },
  balanceValue: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.l1,
    color: COLORS.darkText,
    marginTop: hp(0.4),
  },
});
