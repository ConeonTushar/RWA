import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';
import VectorIcon, { IconType } from '../elements/VectorIcon';

export interface ApprovalStatCardItem {
  id: string;
  title: string;
  count: string | number;
  borderColor?: string;
  gradientColors?: string[];
  iconName?: string;
  iconType?: IconType;
  titleColor?: string;
  countColor?: string;
}

export interface ApprovalStatCardProps {
  title: string;
  count: string | number;
  gradientColors?: string[];
  borderColor?: string;
  titleColor?: string;
  countColor?: string;
  iconName?: string;
  iconType?: IconType;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  countStyle?: StyleProp<TextStyle>;
}

const DEFAULT_GRADIENT = [COLORS.white, COLORS.lightGrey];

const ApprovalStatCard: React.FC<ApprovalStatCardProps> = ({
  title,
  count,
  gradientColors = DEFAULT_GRADIENT,
  borderColor = COLORS.cardBorder,
  titleColor = COLORS.darkText,
  countColor = COLORS.darkText,
  iconName,
  iconType = 'MaterialCommunityIcons',
  onPress,
  containerStyle,
  titleStyle,
  countStyle,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.75 : 1}
      onPress={onPress}
      style={[styles.card, { borderColor }, containerStyle]}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Top row: Circle placeholder or icon + title */}
      <View style={styles.topRow}>
        <View style={styles.circlePlaceholder}>
          {iconName && (
            <VectorIcon
              type={iconType}
              name={iconName}
              size={wp(3)}
              color={COLORS.textSecondary}
            />
          )}
        </View>
        <Text
          style={[styles.titleText, { color: titleColor }, titleStyle]}
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>

      {/* Bottom row: Big count number */}
      <View style={styles.countRow}>
        <Text style={[styles.countText, { color: countColor }, countStyle]}>
          {count}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ApprovalStatCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: hp(10),
    borderRadius: wp(4.5),
    borderWidth: 1.2,
    overflow: 'hidden',
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(1.2),
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circlePlaceholder: {
    width: wp(5.5),
    height: wp(5.5),
    borderRadius: wp(2.75),
    backgroundColor: COLORS.avatarBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(2),
  },
  titleText: {
    flex: 1,
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.darkText,
  },
  countRow: {
    marginTop: hp(0.5),
  },
  countText: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.l2,
    color: COLORS.darkText,
    lineHeight: FONTSIZE.l2 * 1.15,
  },
});
