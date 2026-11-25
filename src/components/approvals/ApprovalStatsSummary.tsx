import React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { wp } from '../../utils/helper';
import ApprovalStatCard, { ApprovalStatCardItem } from './ApprovalStatCard';
import defaultStatsData from './approvalStatsData.json';

export interface ApprovalStatsSummaryProps {
  cards?: ApprovalStatCardItem[];
  pendingCount?: string | number;
  overdueCount?: string | number;
  onPendingPress?: () => void;
  onOverduePress?: () => void;
  onCardPress?: (card: ApprovalStatCardItem) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const ApprovalStatsSummary: React.FC<ApprovalStatsSummaryProps> = ({
  cards,
  pendingCount,
  overdueCount,
  onPendingPress,
  onOverduePress,
  onCardPress,
  containerStyle,
}) => {
  // Use provided cards array or fallback to dynamic JSON configuration
  const sourceCards = (cards || defaultStatsData) as ApprovalStatCardItem[];

  const statCards: ApprovalStatCardItem[] = sourceCards.map((item) => {
    let dynamicCount = item.count;
    if (item.id === 'pending' && pendingCount !== undefined) {
      dynamicCount = pendingCount;
    } else if (item.id === 'overdue' && overdueCount !== undefined) {
      dynamicCount = overdueCount;
    }
    return {
      ...item,
      count: dynamicCount,
    };
  });

  return (
    <View style={[styles.container, containerStyle]}>
      {statCards.map((card, index) => {
        const handlePress = () => {
          if (onCardPress) {
            onCardPress(card);
          } else if (card.id === 'pending' && onPendingPress) {
            onPendingPress();
          } else if (card.id === 'overdue' && onOverduePress) {
            onOverduePress();
          }
        };

        return (
          <React.Fragment key={card.id || index.toString()}>
            {index > 0 && <View style={styles.spacer} />}
            <ApprovalStatCard
              title={card.title}
              count={card.count}
              gradientColors={card.gradientColors}
              borderColor={card.borderColor}
              iconName={card.iconName}
              iconType={card.iconType}
              titleColor={card.titleColor}
              countColor={card.countColor}
              onPress={handlePress}
            />
          </React.Fragment>
        );
      })}
    </View>
  );
};

export default ApprovalStatsSummary;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  spacer: {
    width: wp(3),
  },
});
