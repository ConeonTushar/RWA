import React from 'react';
import { StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';

export interface ApproverProgressItem {
  id: string;
  title: string;
  time: string;
  status: 'Approved' | 'Waiting' | 'Rejected';
}

export interface ApprovalProgressCardProps {
  approvers?: ApproverProgressItem[];
  containerStyle?: StyleProp<ViewStyle>;
}

const DEFAULT_APPROVERS: ApproverProgressItem[] = [
  {
    id: 'sec',
    title: 'Secretary',
    time: '18 Nov · 11:20 AM',
    status: 'Approved',
  },
  {
    id: 'com',
    title: 'Committee',
    time: '18 Nov · 11:20 AM',
    status: 'Approved',
  },
  {
    id: 'pres',
    title: 'President',
    time: '18 Nov · 11:20 AM',
    status: 'Waiting',
  },
];

const ApprovalProgressCard: React.FC<ApprovalProgressCardProps> = ({
  approvers = DEFAULT_APPROVERS,
  containerStyle,
}) => {
  return (
    <View style={[styles.card, containerStyle]}>
      {approvers.map((item, index) => {
        const isApproved = item.status === 'Approved';

        return (
          <View
            key={item.id}
            style={[
              styles.approverRow,
              index > 0 && styles.rowBorder,
            ]}
          >
            {/* Avatar circle */}
            <View style={styles.avatarPlaceholder} />

            {/* Info */}
            <View style={styles.infoContainer}>
              <Text style={styles.titleText}>{item.title}</Text>
              <Text style={styles.timeText}>{item.time}</Text>
            </View>

            {/* Status Badge */}
            <View
              style={[
                styles.badge,
                isApproved ? styles.badgeApproved : styles.badgeWaiting,
              ]}
            >
              <Text
                style={[
                  styles.badgeText,
                  isApproved
                    ? styles.badgeApprovedText
                    : styles.badgeWaitingText,
                ]}
              >
                {item.status}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default ApprovalProgressCard;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: wp(3.8),
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(0.6),
  },
  approverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.1),
  },
  rowBorder: {
    borderTopWidth: 1,
    borderTopColor: COLORS.statCardBorder,
  },
  avatarPlaceholder: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(4.5),
    backgroundColor: COLORS.avatarBg,
    marginRight: wp(3),
  },
  infoContainer: {
    flex: 1,
  },
  titleText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.darkText,
  },
  timeText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
    marginTop: hp(0.2),
  },
  badge: {
    paddingHorizontal: wp(2.8),
    paddingVertical: hp(0.4),
    borderRadius: wp(3),
  },
  badgeApproved: {
    backgroundColor: COLORS.badgeGreenBg,
  },
  badgeWaiting: {
    backgroundColor: COLORS.ownerWaitingBg,
  },
  badgeText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
  },
  badgeApprovedText: {
    color: COLORS.badgeGreenText,
  },
  badgeWaitingText: {
    color: COLORS.ownerWaitingText,
  },
});
