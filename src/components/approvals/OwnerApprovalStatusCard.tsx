import React from 'react';
import { StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';

export interface OwnerApprovalStatusCardProps {
  statusText?: string;
  badgeLabel?: string;
  description?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const OwnerApprovalStatusCard: React.FC<OwnerApprovalStatusCardProps> = ({
  statusText = 'Owner approval status',
  badgeLabel = 'Waiting for owner',
  description = 'Owner approval is required for tenant and family-member requests.',
  containerStyle,
}) => {
  return (
    <View style={[styles.card, containerStyle]}>
      {/* Top row with title and badge */}
      <View style={styles.topRow}>
        <Text style={styles.titleText}>{statusText}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badgeLabel}</Text>
        </View>
      </View>

      {/* Description below */}
      <Text style={styles.descriptionText}>{description}</Text>
    </View>
  );
};

export default OwnerApprovalStatusCard;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: wp(3.8),
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.4),
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.darkText,
  },
  badge: {
    backgroundColor: COLORS.ownerWaitingBg,
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.4),
    borderRadius: wp(3),
  },
  badgeText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.ownerWaitingText,
  },
  descriptionText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
    marginTop: hp(0.8),
    lineHeight: FONTSIZE.xsmall * 1.45,
  },
});
