import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';

export interface NotifyResidentCardProps {
  title?: string;
  subtitle?: string;
  enabled: boolean;
  onToggle: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const NotifyResidentCard: React.FC<NotifyResidentCardProps> = ({
  title = 'Notify the resident',
  subtitle = 'The resident will be notified about this assignment.',
  enabled,
  onToggle,
  containerStyle,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onToggle}
      style={[styles.card, containerStyle]}
    >
      <View style={styles.headerRow}>
        <Text style={styles.titleText}>{title}</Text>
        <View
          style={[
            styles.togglePill,
            enabled ? styles.toggleOnBg : styles.toggleOffBg,
          ]}
        >
          <Text
            style={[
              styles.toggleText,
              enabled ? styles.toggleOnText : styles.toggleOffText,
            ]}
          >
            {enabled ? 'ON' : 'OFF'}
          </Text>
        </View>
      </View>
      <Text style={styles.subtitleText}>{subtitle}</Text>
    </TouchableOpacity>
  );
};

export default NotifyResidentCard;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingHorizontal: wp(4.5),
    paddingVertical: hp(1.8),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
  },
  togglePill: {
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(0.45),
    borderRadius: wp(4),
  },
  toggleOnBg: {
    backgroundColor: COLORS.approvalChipActiveBg,
  },
  toggleOffBg: {
    backgroundColor: COLORS.lightGrey,
  },
  toggleText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.xsmall,
  },
  toggleOnText: {
    color: COLORS.approvalChipActiveText,
  },
  toggleOffText: {
    color: COLORS.textSecondary,
  },
  subtitleText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.darkText,
    marginTop: hp(0.9),
  },
});
