import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp } from '../../utils/helper';
import { DashedDivider } from './MoneyCommon';

export interface SelectedFlatSummaryProps {
  flatNumber: string;
  subtitle: string;
  outstandingAmount: string;
  containerStyle?: StyleProp<ViewStyle>;
}

/**
 * Displays the selected flat header block (flat number, tower/resident, and
 * outstanding amount) followed by a dashed divider.
 */
const SelectedFlatSummary: React.FC<SelectedFlatSummaryProps> = ({
  flatNumber,
  subtitle,
  outstandingAmount,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.sectionCaption}>Selected flat</Text>
      <Text style={styles.flatTitle}>{flatNumber}</Text>
      <Text style={styles.subtitleText}>{subtitle}</Text>

      <Text style={styles.amountCaption}>Outstanding amount</Text>
      <Text style={styles.amountValue}>{outstandingAmount}</Text>

      <DashedDivider style={styles.dividerSpacing} />
    </View>
  );
};

export default SelectedFlatSummary;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  sectionCaption: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.darkText,
    marginBottom: hp(0.4),
  },
  flatTitle: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.l1,
    color: COLORS.darkText,
  },
  subtitleText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
    marginTop: hp(0.25),
  },
  amountCaption: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
    marginTop: hp(1.8),
    marginBottom: hp(0.35),
  },
  amountValue: {
    fontFamily: FONTS.BOLD_OUTFIT,
    fontSize: FONTSIZE.l1,
    color: COLORS.darkText,
  },
  dividerSpacing: {
    marginTop: hp(2.2),
  },
});
