import React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle, Text } from 'react-native';
import { hp } from '../../utils/helper';
import RecentActivityItem, { ActivityItem } from './RecentActivityItem';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';

export interface RecentActivitySectionProps {
  title?: string;
  activities?: ActivityItem[];
  onItemPress?: (item: ActivityItem) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

export const DEFAULT_ACTIVITIES: ActivityItem[] = [
  {
    id: '1',
    title: 'Resident request approved',
    time: '10:30 AM',
    subtitle: 'Secretary · Flat A-302',
    iconName: 'check-circle-outline',
  },
  {
    id: '2',
    title: 'Payment received',
    time: '09:20 AM',
    subtitle: 'Treasurer · Flat C-101',
    iconName: 'currency-inr',
  },
  {
    id: '3',
    title: 'New complaint assigned',
    time: '09:20 AM',
    subtitle: 'Facility Manager · Lift',
    iconName: 'alert-circle-outline',
  },
];

const RecentActivitySection: React.FC<RecentActivitySectionProps> = ({
  title = 'RECENT ACTIVITY',
  activities = DEFAULT_ACTIVITIES,
  onItemPress,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {title ? <Text style={styles.sectionTitle}>{title}</Text> : null}
      {activities.map((item, index) => (
        <RecentActivityItem
          key={item.id}
          activity={item}
          showDivider={index < activities.length - 1}
          onPress={() => onItemPress?.(item)}
        />
      ))}
    </View>
  );
};

export default RecentActivitySection;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: hp(0.5),
  },
  sectionTitle: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.xxsmall,
    color: COLORS.textSecondary,
    letterSpacing: 0.9,
    textTransform: 'uppercase',
    marginBottom: hp(1.2),
  },
});
