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
import { ComplaintItemData, ComplaintStatusVariant } from './types';

export interface ComplaintCardProps {
  item: ComplaintItemData;
  onPress?: (item: ComplaintItemData) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const getStatusBadgeColors = (variant: ComplaintStatusVariant) => {
  switch (variant) {
    case 'overdue':
      return {
        bg: COLORS.badgeUrgentBg,
        text: COLORS.badgeUrgentText,
      };
    case 'open':
      return {
        bg: COLORS.badgeWarningBg,
        text: COLORS.badgeWarningText,
      };
    case 'resolved':
    case 'in_progress':
    default:
      return {
        bg: COLORS.approvalChipActiveBg,
        text: COLORS.approvalChipActiveText,
      };
  }
};

const ComplaintCard: React.FC<ComplaintCardProps> = ({
  item,
  onPress,
  containerStyle,
}) => {
  const badgeColors = getStatusBadgeColors(item.statusVariant);

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => onPress?.(item)}
      style={[styles.card, containerStyle]}
    >
      {/* Top Row: Ticket ID & Overdue status */}
      <View style={styles.topRow}>
        <Text style={styles.ticketIdText}>{item.ticketId}</Text>
        {item.overdueLabel ? (
          <Text style={styles.overdueText}>{item.overdueLabel}</Text>
        ) : null}
      </View>

      {/* Title & Location */}
      <Text style={styles.titleText}>{item.title}</Text>
      <Text style={styles.subtitleText}>
        {item.category} · {item.location} · Flat {item.flat}
      </Text>

      {/* Assigned & Status Badge */}
      <View style={styles.middleRow}>
        <Text style={styles.assignedText}>Assigned: {item.assignedTo}</Text>
        <View style={[styles.statusBadge, { backgroundColor: badgeColors.bg }]}>
          <Text style={[styles.statusBadgeText, { color: badgeColors.text }]}>
            {item.statusLabel}
          </Text>
        </View>
      </View>

      {/* Footer Timestamp */}
      <Text style={styles.reportedText}>{item.reportedText}</Text>
    </TouchableOpacity>
  );
};

export default ComplaintCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingHorizontal: wp(4.2),
    paddingVertical: hp(1.8),
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(0.8),
  },
  ticketIdText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.darkText,
  },
  overdueText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.badgeUrgentText,
  },
  titleText: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
  },
  subtitleText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
    marginTop: hp(0.3),
  },
  middleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(1.4),
  },
  assignedText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.minTiny,
    color: COLORS.darkText,
    flex: 1,
    paddingRight: wp(2),
  },
  statusBadge: {
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(0.5),
    borderRadius: wp(4),
  },
  statusBadgeText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.xsmall,
  },
  reportedText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
    marginTop: hp(1),
  },
});
