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

export interface MoneyFilterChipsProps {
  options: string[];
  activeOption: string;
  onSelectOption: (option: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const MoneyFilterChips: React.FC<MoneyFilterChipsProps> = ({
  options,
  activeOption,
  onSelectOption,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {options.map((option) => {
          const isActive = option === activeOption;
          return (
            <TouchableOpacity
              key={option}
              activeOpacity={0.75}
              onPress={() => onSelectOption(option)}
              style={[
                styles.chip,
                isActive ? styles.activeChip : styles.inactiveChip,
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  isActive ? styles.activeChipText : styles.inactiveChipText,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MoneyFilterChips;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(0.4),
  },
  chip: {
    paddingHorizontal: wp(4.2),
    paddingVertical: hp(0.8),
    borderRadius: wp(5),
    marginRight: wp(2),
  },
  activeChip: {
    backgroundColor: COLORS.approvalChipActiveBg,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inactiveChip: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  chipText: {
    fontSize: FONTSIZE.xsmall,
    fontFamily: FONTS.REGULAR_OUTFIT,
  },
  activeChipText: {
    color: COLORS.approvalChipActiveText,
    fontFamily: FONTS.MEDIUM_OUTFIT,
  },
  inactiveChipText: {
    color: COLORS.textSecondary,
  },
});
