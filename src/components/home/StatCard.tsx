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
import VectorIcon, { IconType } from '../elements/VectorIcon';

export interface StatCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  iconName?: string;
  iconType?: IconType;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subValue,
  iconName,
  iconType = 'MaterialCommunityIcons',
  onPress,
  containerStyle,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.75 : 1}
      onPress={onPress}
      style={[styles.card, containerStyle]}
    >
      {/* Top row: Circle placeholder/icon + Label */}
      <View style={styles.topRow}>
        <View style={styles.circlePlaceholder}>
          {iconName && (
            <VectorIcon
              type={iconType}
              name={iconName}
              size={12}
              color={COLORS.textSecondary}
            />
          )}
        </View>
        <Text style={styles.titleText} numberOfLines={1}>
          {title}
        </Text>
      </View>

      {/* Bottom row: Primary stat value + optional subValue */}
      <View style={styles.valueRow}>
        <Text style={styles.valueText}>{value}</Text>
        {subValue ? <Text style={styles.subValueText}> {subValue}</Text> : null}
      </View>
    </TouchableOpacity>
  );
};

export default StatCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: hp(1.8),
    padding: wp(3.5),
    borderWidth: 1,
    borderColor: COLORS.statCardBorder,
    shadowColor: COLORS.shadowBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    minHeight: hp(9.5),
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circlePlaceholder: {
    width: wp(5),
    height: wp(5),
    borderRadius: wp(2.75),
    backgroundColor: COLORS.avatarBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(2),
  },
  titleText: {
    flex: 1,
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.statTitleText,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: hp(0.8),
  },
  valueText: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
    letterSpacing: -0.3,
  },
  subValueText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
    marginLeft: wp(1),
  },
});
