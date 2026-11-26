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

export interface SelectableGridOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface SelectableOptionGridProps {
  title: string;
  required?: boolean;
  options: SelectableGridOption[];
  selectedId: string;
  onSelect: (id: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

/**
 * Reusable 2-column grid of selectable option cards with circular icon badges.
 */
const SelectableOptionGrid: React.FC<SelectableOptionGridProps> = ({
  title,
  required = false,
  options,
  selectedId,
  onSelect,
  containerStyle,
}) => {
  return (
    <View style={[styles.wrapper, containerStyle]}>
      <Text style={styles.sectionLabel}>
        {title}
        {required ? '*' : ''}
      </Text>

      <View style={styles.grid}>
        {options.map((option) => {
          const isSelected = option.id === selectedId;
          return (
            <TouchableOpacity
              key={option.id}
              activeOpacity={0.8}
              onPress={() => onSelect(option.id)}
              style={[styles.card, isSelected && styles.cardSelected]}
            >
              <View
                style={[
                  styles.iconCircle,
                  isSelected && styles.iconCircleSelected,
                ]}
              >
                {option.icon}
              </View>
              <Text
                style={[
                  styles.optionLabel,
                  isSelected && styles.optionLabelSelected,
                ]}
                numberOfLines={2}
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

export default SelectableOptionGrid;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  sectionLabel: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.darkText,
    marginBottom: hp(1.2),
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: hp(1.4),
  },
  card: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: wp(3.5),
    borderWidth: 1,
    borderColor: COLORS.statCardBorder,
    paddingVertical: hp(1.8),
    paddingHorizontal: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.shadowBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  cardSelected: {
    borderColor: COLORS.registerGreen,
    backgroundColor: COLORS.badgeGreenBg,
  },
  iconCircle: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(4.5),
    backgroundColor: COLORS.avatarBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(0.9),
  },
  iconCircleSelected: {
    backgroundColor: COLORS.approvalChipActiveBg,
  },
  optionLabel: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.darkText,
    textAlign: 'center',
  },
  optionLabelSelected: {
    fontFamily: FONTS.SEMI_OUTFIT,
    color: COLORS.greenPrimary,
  },
});
