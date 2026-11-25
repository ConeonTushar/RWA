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

export interface ExpensesBannerCardProps {
  title?: string;
  subtitle?: string;
  count?: string | number;
  iconName?: string;
  iconType?: IconType;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const ExpensesBannerCard: React.FC<ExpensesBannerCardProps> = ({
  title = 'Expenses waiting for you',
  subtitle = 'Pending expense approvals',
  count = '03',
  iconName,
  iconType = 'MaterialCommunityIcons',
  onPress,
  containerStyle,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.container, containerStyle]}
    >
      {/* Top Row: [Solid White Circle + Title] on left, [Count '03'] on right */}
      <View style={styles.topRow}>
        <View style={styles.leftGroup}>
          <View style={styles.whiteCircle}>
            {iconName && (
              <VectorIcon
                type={iconType}
                name={iconName}
                size={14}
                color={COLORS.darkBtn}
              />
            )}
          </View>
          <Text style={styles.titleText}>{title}</Text>
        </View>

        <Text style={styles.countText}>{count}</Text>
      </View>

      {/* Bottom Row: Subtitle left-aligned under the white circle */}
      <Text style={styles.subtitleText}>{subtitle}</Text>
    </TouchableOpacity>
  );
};

export default ExpensesBannerCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.darkBtn,
    borderRadius: hp(2.5),
    paddingVertical: hp(1.8),
    paddingHorizontal: wp(5),
    width: '100%',
    shadowColor: COLORS.shadowBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: wp(2),
  },
  whiteCircle: {
    width: wp(6.8),
    height: wp(6.8),
    borderRadius: wp(3.4),
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(2.8),
  },
  titleText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.minSmall,
    color: COLORS.white,
  },
  countText: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.l2,
    color: COLORS.white,
    letterSpacing: -0.3,
  },
  subtitleText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.mutedText,
    marginTop: hp(0.8),
  },
});
