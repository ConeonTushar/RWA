import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';

export interface FilterTabItem {
  id: string;
  label: string;
  count?: number;
}

export interface ApprovalFilterTabsProps {
  tabs: FilterTabItem[];
  activeTab: string;
  onSelectTab: (id: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const ApprovalFilterTabs: React.FC<ApprovalFilterTabsProps> = ({
  tabs,
  activeTab,
  onSelectTab,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          const displayLabel =
            tab.count !== undefined
              ? `${tab.label} (${tab.count.toString().padStart(2, '0')})`
              : tab.label;

          return (
            <TouchableOpacity
              key={tab.id}
              activeOpacity={0.75}
              onPress={() => onSelectTab(tab.id)}
              style={[
                styles.tabChip,
                isActive ? styles.activeTabChip : styles.inactiveTabChip,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  isActive ? styles.activeTabText : styles.inactiveTabText,
                ]}
              >
                {displayLabel}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ApprovalFilterTabs;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(0.5),
  },
  tabChip: {
    paddingHorizontal: wp(4.5),
    paddingVertical: hp(0.9),
    borderRadius: wp(5),
    marginRight: wp(2.5),
  },
  activeTabChip: {
    backgroundColor: COLORS.approvalChipActiveBg,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inactiveTabChip: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  tabText: {
    fontSize: FONTSIZE.xsmall,
  },
  activeTabText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    color: COLORS.approvalChipActiveText,
  },
  inactiveTabText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    color: COLORS.textSecondary,
  },
});
