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

export interface ReminderTemplateOption {
  id: string;
  label: string;
  previewBody: string;
}

export interface ReminderTemplateCardProps {
  templates: ReminderTemplateOption[];
  selectedId: string;
  onSelect: (id: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

/**
 * Template selector card for the Send Reminders screen.
 */
const ReminderTemplateCard: React.FC<ReminderTemplateCardProps> = ({
  templates,
  selectedId,
  onSelect,
  containerStyle,
}) => {
  return (
    <View style={[styles.wrapper, containerStyle]}>
      <Text style={styles.sectionLabel}>Template*</Text>

      <View style={styles.card}>
        {templates.map((item, index) => {
          const isSelected = item.id === selectedId;
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.75}
              onPress={() => onSelect(item.id)}
              style={[
                styles.row,
                index < templates.length - 1 && styles.rowSpacing,
              ]}
            >
              <Text
                style={[styles.rowText, isSelected && styles.rowTextSelected]}
              >
                {item.label}
              </Text>
              {isSelected ? <View style={styles.activeDot} /> : null}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default ReminderTemplateCard;

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
  card: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingHorizontal: wp(4.5),
    paddingVertical: hp(1.8),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(0.6),
  },
  rowSpacing: {
    marginBottom: hp(0.8),
  },
  rowText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
  },
  rowTextSelected: {
    fontFamily: FONTS.SEMI_OUTFIT,
    color: COLORS.greenPrimary,
  },
  activeDot: {
    width: wp(2),
    height: wp(2),
    borderRadius: wp(1),
    backgroundColor: COLORS.registerGreen,
  },
});
