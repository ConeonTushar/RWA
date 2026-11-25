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
import ApprovalStatusBadge, { BadgeVariant } from './ApprovalStatusBadge';

export interface ApprovalItemData {
  id: string;
  category: 'residents' | 'vendors' | 'permissions';
  title: string;
  subtitle: string;
  badgeLabel: string;
  badgeVariant?: BadgeVariant;
  detailText?: string;
  showDetailBullet?: boolean;
  submittedText?: string;
  onPress?: () => void;
}

export interface ApprovalRequestCardProps {
  item: ApprovalItemData;
  showDivider?: boolean;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const ApprovalRequestCard: React.FC<ApprovalRequestCardProps> = ({
  item,
  showDivider = true,
  onPress,
  containerStyle,
}) => {
  const handlePress = onPress || item.onPress;

  return (
    <View style={[styles.wrapper, containerStyle]}>
      <TouchableOpacity
        activeOpacity={handlePress ? 0.7 : 1}
        onPress={handlePress}
        style={styles.cardContainer}
      >
        {/* Top Info Row */}
        <View style={styles.topRow}>
          {/* Rounded Square Avatar / Placeholder */}
          <View style={styles.avatarPlaceholder} />

          {/* Title and Subtitle */}
          <View style={styles.headerInfo}>
            <Text style={styles.titleText} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.subtitleText} numberOfLines={1}>
              {item.subtitle}
            </Text>
          </View>

          {/* Status Badge */}
          <ApprovalStatusBadge
            label={item.badgeLabel}
            variant={item.badgeVariant || 'urgent'}
          />
        </View>

        {/* Detail Row (e.g. role with grey bullet, or approval status message) */}
        {item.detailText ? (
          <View style={styles.detailRow}>
            {item.showDetailBullet !== false && (
              <View style={styles.detailBullet} />
            )}
            <Text style={styles.detailText} numberOfLines={2}>
              {item.detailText}
            </Text>
          </View>
        ) : null}

        {/* Submitted Date / Timestamp */}
        {item.submittedText ? (
          <View style={styles.submittedRow}>
            <Text style={styles.submittedText}>{item.submittedText}</Text>
          </View>
        ) : null}
      </TouchableOpacity>

      {/* Dashed line separator */}
      {showDivider && (
        <View style={styles.dashedLineContainer}>
          <View style={styles.dashedLine} />
        </View>
      )}
    </View>
  );
};

export default ApprovalRequestCard;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  cardContainer: {
    paddingVertical: hp(1.4),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarPlaceholder: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(3.5),
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginRight: wp(3),
  },
  headerInfo: {
    flex: 1,
    paddingRight: wp(2),
  },
  titleText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.darkText,
    marginBottom: hp(0.2),
  },
  subtitleText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1),
  },
  detailBullet: {
    width: wp(3.8),
    height: wp(3.8),
    borderRadius: wp(1.9),
    backgroundColor: COLORS.avatarBg,
    marginRight: wp(2),
  },
  detailText: {
    flex: 1,
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.darkText,
  },
  submittedRow: {
    marginTop: hp(0.8),
  },
  submittedText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xxsmall,
    color: COLORS.textSecondary,
  },
  dashedLineContainer: {
    height: 1,
    width: '100%',
    overflow: 'hidden',
    marginTop: hp(1.2),
    marginBottom: hp(0.4),
  },
  dashedLine: {
    height: 2,
    width: '100%',
    borderWidth: 1.5,
    borderColor: COLORS.dashedBorder,
    borderStyle: 'dashed',
  },
});
