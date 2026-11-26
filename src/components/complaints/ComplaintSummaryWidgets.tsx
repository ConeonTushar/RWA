import React from 'react';
import { StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';

export interface SummaryStatusBarItem {
  label: string;
  count: string | number;
  progress: number;
  color: string;
}

export interface ComplaintStatusBreakdownProps {
  title?: string;
  items: SummaryStatusBarItem[];
  containerStyle?: StyleProp<ViewStyle>;
}

export const ComplaintStatusBreakdown: React.FC<
  ComplaintStatusBreakdownProps
> = ({ title = 'Complaints By Status', items, containerStyle }) => {
  return (
    <View style={[styles.section, containerStyle]}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.barsList}>
        {items.map((item) => {
          const clamped = Math.max(0, Math.min(1, item.progress));
          return (
            <View key={item.label} style={styles.barItem}>
              <View style={styles.barHeader}>
                <Text style={styles.barLabel}>{item.label}</Text>
                <Text style={styles.barCount}>{item.count}</Text>
              </View>
              <View style={styles.track}>
                <View
                  style={[
                    styles.fill,
                    { width: `${clamped * 100}%`, backgroundColor: item.color },
                  ]}
                />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export interface SummaryBreakdownRow {
  label: string;
  value: string | number;
}

export interface ComplaintBreakdownCardProps {
  title: string;
  rows: SummaryBreakdownRow[];
  containerStyle?: StyleProp<ViewStyle>;
}

export const ComplaintBreakdownCard: React.FC<ComplaintBreakdownCardProps> = ({
  title,
  rows,
  containerStyle,
}) => {
  return (
    <View style={[styles.section, containerStyle]}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.card}>
        {rows.map((row, idx) => (
          <View
            key={row.label}
            style={[styles.kvRow, idx < rows.length - 1 && styles.kvRowSpacing]}
          >
            <Text style={styles.kvLabel}>{row.label}</Text>
            <Text style={styles.kvValue}>{row.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    width: '100%',
  },
  sectionTitle: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
    marginBottom: hp(1.4),
  },
  barsList: {
    gap: hp(1.6),
  },
  barItem: {
    width: '100%',
  },
  barHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(0.6),
  },
  barLabel: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.minTiny,
    color: COLORS.darkText,
  },
  barCount: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.minTiny,
    color: COLORS.darkText,
  },
  track: {
    width: '100%',
    height: hp(0.9),
    borderRadius: wp(2),
    backgroundColor: COLORS.grey,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: wp(2),
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingHorizontal: wp(4.5),
    paddingVertical: hp(1.8),
  },
  kvRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  kvRowSpacing: {
    marginBottom: hp(1.4),
  },
  kvLabel: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.minTiny,
    color: COLORS.textSecondary,
  },
  kvValue: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.minTiny,
    color: COLORS.darkText,
  },
});
