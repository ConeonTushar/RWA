import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';

export interface MiniStatBox {
  id: string;
  value: string;
  label: string;
}

export interface ComplaintsMiniStatsRowProps {
  title?: string;
  items: MiniStatBox[];
  containerStyle?: StyleProp<ViewStyle>;
}

/**
 * 3-column mini stat cards for Complaints overview on Reports Summary.
 */
const ComplaintsMiniStatsRow: React.FC<ComplaintsMiniStatsRowProps> = ({
  title = 'Complaints',
  items,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.sectionTitle}>{title}</Text>

      <View style={styles.row}>
        {items.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.valueText}>{item.value}</Text>
            <Text style={styles.labelText} numberOfLines={1}>
              {item.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ComplaintsMiniStatsRow;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  sectionTitle: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.darkText,
    marginBottom: hp(1.4),
  },
  row: {
    flexDirection: 'row',
    gap: wp(2.8),
  },
  card: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: wp(3.5),
    borderWidth: 1,
    borderColor: COLORS.statCardBorder,
    paddingVertical: hp(1.6),
    paddingHorizontal: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.shadowBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  valueText: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.l1,
    color: COLORS.darkText,
  },
  labelText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xxsmall,
    color: COLORS.textSecondary,
    marginTop: hp(0.4),
  },
});
