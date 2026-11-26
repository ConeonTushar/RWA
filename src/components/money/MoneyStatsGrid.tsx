import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';
import { MoneyStatItem } from './types';

export interface MoneyStatsGridProps {
  stats: MoneyStatItem[];
  onPressStat?: (item: MoneyStatItem) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const MoneyStatsGrid: React.FC<MoneyStatsGridProps> = ({
  stats,
  onPressStat,
  containerStyle,
}) => {
  const rows: MoneyStatItem[][] = [];
  for (let i = 0; i < stats.length; i += 2) {
    rows.push(stats.slice(i, i + 2));
  }

  return (
    <View style={[styles.gridContainer, containerStyle]}>
      {rows.map((row, rowIndex) => (
        <View
          key={`row-${rowIndex}`}
          style={[styles.row, rowIndex > 0 && styles.rowSpacing]}
        >
          {row.map((item, colIndex) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={onPressStat ? 0.75 : 1}
              onPress={() => onPressStat?.(item)}
              style={[styles.card, colIndex === 0 && styles.leftCardSpacing]}
            >
              <Text style={styles.labelText} numberOfLines={1}>
                {item.label}
              </Text>
              <Text style={styles.valueText}>{item.value}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

export default MoneyStatsGrid;

const styles = StyleSheet.create({
  gridContainer: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  rowSpacing: {
    marginTop: hp(1.4),
  },
  card: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: wp(4),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.6),
    borderWidth: 1,
    borderColor: COLORS.statCardBorder,
    shadowColor: COLORS.shadowBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    justifyContent: 'space-between',
    minHeight: hp(8.8),
  },
  leftCardSpacing: {
    marginRight: wp(3),
  },
  labelText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xxsmall,
    color: COLORS.textSecondary,
  },
  valueText: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.l1,
    color: COLORS.darkText,
    marginTop: hp(0.6),
    letterSpacing: -0.3,
  },
});
