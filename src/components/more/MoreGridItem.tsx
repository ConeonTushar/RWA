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
import VectorIcon from '../elements/VectorIcon';
import { MoreMenuItem } from './types';

export interface MoreGridItemProps {
  item: MoreMenuItem;
  onPress?: (item: MoreMenuItem) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const MoreGridItem: React.FC<MoreGridItemProps> = ({
  item,
  onPress,
  containerStyle,
}) => {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={item.label}
      activeOpacity={0.72}
      onPress={() => onPress?.(item)}
      style={[styles.itemContainer, containerStyle]}
    >
      <View style={styles.circleWrapper}>
        <View style={styles.circle}>
          <VectorIcon
            type={item.iconType}
            name={item.iconName}
            size={wp(5.8)}
            color={item.iconColor || COLORS.darkText}
          />
        </View>
        {item.badgeCount !== undefined && item.badgeCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {item.badgeCount > 99 ? '99+' : item.badgeCount}
            </Text>
          </View>
        )}
      </View>

      <Text style={styles.label} numberOfLines={2}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );
};

export default MoreGridItem;

const styles = StyleSheet.create({
  itemContainer: {
    width: '33.33%',
    alignItems: 'center',
    paddingHorizontal: wp(1.5),
    marginBottom: hp(2.2),
  },
  circleWrapper: {
    position: 'relative',
  },
  circle: {
    width: wp(15.5),
    height: wp(15.5),
    borderRadius: wp(7.75),
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.shadowBlack,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  badge: {
    position: 'absolute',
    top: -hp(0.2),
    right: -wp(0.5),
    minWidth: wp(4.5),
    height: wp(4.5),
    borderRadius: wp(2.25),
    backgroundColor: COLORS.sosRed,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(1),
    borderWidth: 1.5,
    borderColor: COLORS.white,
  },
  badgeText: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.vtiny,
    color: COLORS.white,
  },
  label: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.minTiny,
    color: COLORS.darkText,
    textAlign: 'center',
    marginTop: hp(0.9),
    lineHeight: FONTSIZE.minTiny * 1.35,
  },
});
