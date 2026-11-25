import React from 'react';
import { StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';

export interface FeeAndDepositCardProps {
  depositAmount?: string;
  paymentStatus?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const FeeAndDepositCard: React.FC<FeeAndDepositCardProps> = ({
  depositAmount = '₹5,000',
  paymentStatus = 'Paid',
  containerStyle,
}) => {
  return (
    <View style={[styles.card, containerStyle]}>
      <View style={styles.row}>
        <Text style={styles.labelText}>Deposit</Text>
        <Text style={styles.valueText}>{depositAmount}</Text>
      </View>
      <View style={[styles.row, styles.secondRow]}>
        <Text style={styles.labelText}>Payment status</Text>
        <Text style={styles.statusPaidText}>{paymentStatus}</Text>
      </View>
    </View>
  );
};

export default FeeAndDepositCard;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: wp(3.8),
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.4),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(0.5),
  },
  secondRow: {
    marginTop: hp(0.4),
  },
  labelText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.minTiny,
    color: COLORS.textSecondary,
  },
  valueText: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.minTiny,
    color: COLORS.darkText,
  },
  statusPaidText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.minTiny,
    color: COLORS.registerGreen,
  },
});
