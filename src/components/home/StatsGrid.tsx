import React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { hp, wp } from '../../utils/helper';
import StatCard from './StatCard';

export interface StatData {
  id: string;
  title: string;
  value: string | number;
  subValue?: string;
  iconName?: string;
  onPress?: () => void;
}

export interface StatsGridProps {
  pendingApprovals?: string | number;
  openComplaints?: string | number;
  duesCollected?: string;
  duesTotal?: string;
  visitorsToday?: string | number;
  onPressPendingApprovals?: () => void;
  onPressOpenComplaints?: () => void;
  onPressDues?: () => void;
  onPressVisitors?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const StatsGrid: React.FC<StatsGridProps> = ({
  pendingApprovals = '08',
  openComplaints = '12',
  duesCollected = '₹8.4L',
  duesTotal = '₹10L total',
  visitorsToday = '24',
  onPressPendingApprovals,
  onPressOpenComplaints,
  onPressDues,
  onPressVisitors,
  containerStyle,
}) => {
  return (
    <View style={[styles.gridContainer, containerStyle]}>
      {/* Row 1 */}
      <View style={styles.row}>
        <StatCard
          title="Pending approvals"
          value={pendingApprovals}
          onPress={onPressPendingApprovals}
        />
        <View style={styles.gap} />
        <StatCard
          title="Open complaints"
          value={openComplaints}
          onPress={onPressOpenComplaints}
        />
      </View>

      {/* Row 2 */}
      <View style={styles.row}>
        <StatCard
          title="Dues collected"
          value={duesCollected}
          subValue={duesTotal}
          onPress={onPressDues}
        />
        <View style={styles.gap} />
        <StatCard
          title="Visitors today"
          value={visitorsToday}
          onPress={onPressVisitors}
        />
      </View>
    </View>
  );
};

export default StatsGrid;

const styles = StyleSheet.create({
  gridContainer: {
    width: '100%',
    gap: hp(1.2),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
    width: '100%',
  },
  gap: {
    width: wp(2.8),
  },
});
