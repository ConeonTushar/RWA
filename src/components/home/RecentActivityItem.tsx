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

export interface ActivityItem {
  id: string;
  title: string;
  time: string;
  subtitle: string;
  iconName?: string;
  iconType?: IconType;
  onPress?: () => void;
}

export interface RecentActivityItemProps {
  activity: ActivityItem;
  showDivider?: boolean;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const RecentActivityItem: React.FC<RecentActivityItemProps> = ({
  activity,
  showDivider = true,
  onPress,
  containerStyle,
}) => {
  const handlePress = onPress || activity.onPress;

  return (
    <View style={[styles.wrapper, containerStyle]}>
      <TouchableOpacity
        activeOpacity={handlePress ? 0.7 : 1}
        onPress={handlePress}
        style={styles.itemContainer}
      >
        {/* Left Circle Placeholder / Icon */}
        <View style={styles.circleAvatar}>
          {activity.iconName && (
            <VectorIcon
              type={activity.iconType || 'MaterialCommunityIcons'}
              name={activity.iconName}
              size={16}
              color={COLORS.textSecondary}
            />
          )}
        </View>

        {/* Center & Right Content */}
        <View style={styles.contentContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.titleText} numberOfLines={1}>
              {activity.title}
            </Text>
            <Text style={styles.timeText}>{activity.time}</Text>
          </View>
          <Text style={styles.subtitleText} numberOfLines={1}>
            {activity.subtitle}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Dashed line separator */}
      {showDivider && (
        <View style={styles.dashedLineContainer}>
          <View style={styles.dashedLine} />
        </View>
      )}
    </View>
  );
};

export default RecentActivityItem;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.1),
  },
  circleAvatar: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  contentContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(0.3),
  },
  titleText: {
    flex: 1,
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.darkText,
    paddingRight: wp(2),
  },
  timeText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
  },
  subtitleText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
  },
  dashedLineContainer: {
    height: 1,
    width: '100%',
    overflow: 'hidden',
    marginVertical: hp(0.4),
  },
  dashedLine: {
    height: 2,
    width: '100%',
    borderWidth: 2,
    borderColor: COLORS.cardBorder,
    borderStyle: 'dashed',
  },
});
