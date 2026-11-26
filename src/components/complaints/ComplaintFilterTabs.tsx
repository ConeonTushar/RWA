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

export interface ComplaintFilterTabItem {
  id: string;
  label: string;
}

export interface ComplaintFilterTabsProps {
  tabs: ComplaintFilterTabItem[];
  activeTab: string;
  onSelectTab: (id: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const ComplaintFilterTabs: React.FC<ComplaintFilterTabsProps> = ({
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
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ComplaintFilterTabs;

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
    paddingHorizontal: wp(5),
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
    fontFamily: FONTS.REGULAR_OUTFIT,
  },
  activeTabText: {
    color: COLORS.approvalChipActiveText,
    fontFamily: FONTS.MEDIUM_OUTFIT,
  },
  inactiveTabText: {
    color: COLORS.textSecondary,
  },
});
