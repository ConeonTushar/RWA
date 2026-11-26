import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';

export interface ExpenseCategoryStat {
  id: string;
  label: string;
  percentage: number;
}

export interface ExpenseCategoryBreakdownCardProps {
  categories: ExpenseCategoryStat[];
  containerStyle?: StyleProp<ViewStyle>;
}

/**
 * Horizontal progress bar breakdown of expenses by category.
 */
const ExpenseCategoryBreakdownCard: React.FC<
  ExpenseCategoryBreakdownCardProps
> = ({ categories, containerStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.sectionTitle}>Expenses By Category</Text>

      <View style={styles.list}>
        {categories.map((cat) => {
          const clamped = Math.max(0, Math.min(100, cat.percentage));
          return (
            <View key={cat.id} style={styles.item}>
              <View style={styles.labelRow}>
                <Text style={styles.labelText}>{cat.label}</Text>
                <Text style={styles.percentText}>{clamped}%</Text>
              </View>
              <View style={styles.track}>
                <View style={[styles.fill, { width: `${clamped}%` }]} />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default ExpenseCategoryBreakdownCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  sectionTitle: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.darkText,
    marginBottom: hp(1.6),
  },
  list: {
    gap: hp(1.6),
  },
  item: {
    width: '100%',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(0.6),
  },
  labelText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.darkText,
  },
  percentText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.darkText,
  },
  track: {
    width: '100%',
    height: hp(0.9),
    borderRadius: wp(2),
    backgroundColor: COLORS.greyMoon,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: wp(2),
    backgroundColor: COLORS.lightPrimary,
  },
});
