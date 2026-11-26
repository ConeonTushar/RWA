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

export interface AudienceOption {
  id: 'selected_flats' | 'all_overdue';
  title: string;
  subtitle: string;
  linkText?: string;
}

export interface ReminderAudienceSelectorProps {
  options: AudienceOption[];
  selectedId: AudienceOption['id'];
  onSelect: (id: AudienceOption['id']) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

/**
 * Audience selector cards for the Send Reminders screen.
 */
const ReminderAudienceSelector: React.FC<ReminderAudienceSelectorProps> = ({
  options,
  selectedId,
  onSelect,
  containerStyle,
}) => {
  return (
    <View style={[styles.wrapper, containerStyle]}>
      <Text style={styles.sectionLabel}>Audience*</Text>

      <View style={styles.list}>
        {options.map((option) => {
          const isSelected = option.id === selectedId;
          return (
            <TouchableOpacity
              key={option.id}
              activeOpacity={0.8}
              onPress={() => onSelect(option.id)}
              style={[styles.card, isSelected && styles.cardSelected]}
            >
              <Text style={styles.cardTitle}>{option.title}</Text>
              <Text style={styles.cardSubtitle}>{option.subtitle}</Text>
              {option.linkText ? (
                <Text style={styles.linkText}>{option.linkText}</Text>
              ) : null}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default ReminderAudienceSelector;

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
  list: {
    gap: hp(1.2),
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
  cardSelected: {
    borderColor: COLORS.registerGreen,
    backgroundColor: COLORS.badgeGreenBg,
  },
  cardTitle: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
  },
  cardSubtitle: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
    marginTop: hp(0.45),
  },
  linkText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.lightPrimary,
    marginTop: hp(0.8),
  },
});
