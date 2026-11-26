import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';

export type ReminderScheduleOption = 'now' | 'schedule';

export interface ReminderScheduleSelectorProps {
  selected: ReminderScheduleOption;
  onSelect: (option: ReminderScheduleOption) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

/**
 * Pill selector for choosing whether to send reminders immediately or schedule them.
 */
const ReminderScheduleSelector: React.FC<ReminderScheduleSelectorProps> = ({
  selected,
  onSelect,
  containerStyle,
}) => {
  const options: { id: ReminderScheduleOption; label: string }[] = [
    { id: 'now', label: 'Now' },
    { id: 'schedule', label: 'Schedule' },
  ];

  return (
    <View style={[styles.wrapper, containerStyle]}>
      <Text style={styles.sectionLabel}>Schedule*</Text>

      <View style={styles.pillRow}>
        {options.map((option) => {
          const isSelected = selected === option.id;
          return (
            <TouchableOpacity
              key={option.id}
              activeOpacity={0.8}
              onPress={() => onSelect(option.id)}
              style={[styles.pill, isSelected && styles.pillSelected]}
            >
              <Text
                style={[styles.pillText, isSelected && styles.pillTextSelected]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default ReminderScheduleSelector;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  sectionLabel: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.darkText,
    marginBottom: hp(1.1),
  },
  pillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2.5),
  },
  pill: {
    paddingHorizontal: wp(5.5),
    paddingVertical: hp(1),
    borderRadius: wp(6),
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillSelected: {
    borderColor: COLORS.registerGreen,
    backgroundColor: COLORS.badgeGreenBg,
  },
  pillText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
  },
  pillTextSelected: {
    color: COLORS.greenPrimary,
  },
});
