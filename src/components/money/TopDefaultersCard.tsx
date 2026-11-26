import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp } from '../../utils/helper';

export interface DefaulterItem {
  id: string;
  flatNumber: string;
  amount: string;
}

export interface TopDefaultersCardProps {
  items: DefaulterItem[];
  onPressSeeAll?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

/**
 * Top defaulters list section for the Reports Summary screen.
 */
const TopDefaultersCard: React.FC<TopDefaultersCardProps> = ({
  items,
  onPressSeeAll,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>TOP DEFAULTERS</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={onPressSeeAll}>
          <Text style={styles.seeAllText}>see all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.list}>
        {items.map((item) => (
          <View key={item.id} style={styles.row}>
            <Text style={styles.flatText}>{item.flatNumber}</Text>
            <Text style={styles.amountText}>{item.amount}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default TopDefaultersCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1.2),
  },
  sectionTitle: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.xxsmall,
    color: COLORS.darkText,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  seeAllText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xxsmall,
    color: COLORS.textSecondary,
  },
  list: {
    gap: hp(1.3),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flatText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.textSecondary,
  },
  amountText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
  },
});
