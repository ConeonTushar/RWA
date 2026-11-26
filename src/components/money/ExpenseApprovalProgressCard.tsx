import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';

export interface ApprovalProgressStep {
  id: string;
  title: string;
  subtitle: string;
  badgeText?: string;
  badgeTone?: 'approved' | 'pending';
}

export interface ExpenseApprovalProgressCardProps {
  steps: ApprovalProgressStep[];
  containerStyle?: StyleProp<ViewStyle>;
}

/**
 * Multi-step approval progress card for Expense Approval.
 */
const ExpenseApprovalProgressCard: React.FC<
  ExpenseApprovalProgressCardProps
> = ({ steps, containerStyle }) => {
  return (
    <View style={[styles.card, containerStyle]}>
      {steps.map((step, index) => {
        const isApproved = step.badgeTone === 'approved';
        return (
          <View
            key={step.id}
            style={[styles.stepRow, index < steps.length - 1 && styles.stepGap]}
          >
            <View style={styles.circleAvatar} />
            <View style={styles.textCol}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepSubtitle}>{step.subtitle}</Text>
            </View>
            {step.badgeText ? (
              <View
                style={[
                  styles.badge,
                  isApproved ? styles.approvedBg : styles.pendingBg,
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    isApproved ? styles.approvedText : styles.pendingText,
                  ]}
                >
                  {step.badgeText}
                </Text>
              </View>
            ) : null}
          </View>
        );
      })}
    </View>
  );
};

export default ExpenseApprovalProgressCard;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingHorizontal: wp(4.5),
    paddingVertical: hp(2),
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepGap: {
    marginBottom: hp(2),
  },
  circleAvatar: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(4.5),
    backgroundColor: COLORS.avatarBg,
    marginRight: wp(3),
  },
  textCol: {
    flex: 1,
    paddingRight: wp(2),
  },
  stepTitle: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
  },
  stepSubtitle: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xxsmall,
    color: COLORS.textSecondary,
    marginTop: hp(0.25),
    lineHeight: FONTSIZE.xxsmall * 1.4,
  },
  badge: {
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.4),
    borderRadius: wp(4),
  },
  approvedBg: {
    backgroundColor: COLORS.badgeGreenBg,
  },
  pendingBg: {
    backgroundColor: COLORS.badgeUrgentBg,
  },
  badgeText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.xxsmall,
  },
  approvedText: {
    color: COLORS.badgeGreenText,
  },
  pendingText: {
    color: COLORS.badgeUrgentText,
  },
});
