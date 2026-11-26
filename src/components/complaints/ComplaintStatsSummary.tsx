import React from 'react';
import { StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';

export interface ComplaintStatCardProps {
  count: string | number;
  label: string;
  isAlert?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

const ComplaintStatCard: React.FC<ComplaintStatCardProps> = ({
  count,
  label,
  isAlert = false,
  containerStyle,
}) => {
  const formattedCount =
    typeof count === 'number' ? count.toString().padStart(2, '0') : count;

  return (
    <View style={[styles.card, containerStyle]}>
      <Text
        style={[
          styles.countText,
          { color: isAlert ? COLORS.red : COLORS.darkText },
        ]}
      >
        {formattedCount}
      </Text>
      <Text style={styles.labelText}>{label}</Text>
    </View>
  );
};

export interface ComplaintStatsSummaryProps {
  openCount?: number;
  inProgressCount?: number;
  overdueCount?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

export const ComplaintStatsSummary: React.FC<ComplaintStatsSummaryProps> = ({
  openCount = 3,
  inProgressCount = 2,
  overdueCount = 1,
  containerStyle,
}) => {
  return (
    <View style={[styles.summaryRow, containerStyle]}>
      <ComplaintStatCard count={openCount} label="Open" />
      <ComplaintStatCard count={inProgressCount} label="In Progress" />
      <ComplaintStatCard count={overdueCount} label="Overdue" isAlert />
    </View>
  );
};

export default ComplaintStatCard;

const styles = StyleSheet.create({
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: wp(3),
    width: '100%',
  },
  card: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingVertical: hp(2),
    paddingHorizontal: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.h4,
    lineHeight: FONTSIZE.h4 * 1.2,
  },
  labelText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
    marginTop: hp(0.4),
  },
});
