import React from 'react';
import { StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';
import { DashedDivider, FlatStatusBadge } from './MoneyCommon';
import { FlatPaymentStatus } from './types';

export interface FlatLedgerSummaryCardProps {
  flatNumber: string;
  residentName: string;
  status: FlatPaymentStatus;
  outstandingBalance: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const FlatLedgerSummaryCard: React.FC<FlatLedgerSummaryCardProps> = ({
  flatNumber,
  residentName,
  status,
  outstandingBalance,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.topRow}>
        <View style={styles.avatarPlaceholder} />

        <View style={styles.infoColumn}>
          <Text style={styles.flatNumber}>{flatNumber}</Text>
          <Text style={styles.residentName} numberOfLines={1}>
            {residentName}
          </Text>
        </View>

        <FlatStatusBadge status={status} />
      </View>

      <Text style={styles.balanceLabel}>Outstanding balance</Text>
      <Text style={styles.balanceAmount}>{outstandingBalance}</Text>

      <DashedDivider style={styles.divider} />
    </View>
  );
};

export default FlatLedgerSummaryCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: hp(0.8),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: wp(12.5),
    height: wp(12.5),
    borderRadius: wp(3.5),
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginRight: wp(3.5),
  },
  infoColumn: {
    flex: 1,
    paddingRight: wp(2),
  },
  flatNumber: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
  },
  residentName: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
    marginTop: hp(0.25),
  },
  balanceLabel: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xxsmall,
    color: COLORS.textSecondary,
    marginTop: hp(2),
  },
  balanceAmount: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.h4,
    color: COLORS.darkText,
    marginTop: hp(0.4),
    letterSpacing: -0.3,
  },
  divider: {
    marginTop: hp(2.2),
  },
});
