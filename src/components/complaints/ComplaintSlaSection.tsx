import React from 'react';
import { StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';
import { ComplaintSlaItem } from './types';

export interface ComplaintSlaSectionProps {
  metrics: ComplaintSlaItem[];
  containerStyle?: StyleProp<ViewStyle>;
}

const ComplaintSlaSection: React.FC<ComplaintSlaSectionProps> = ({
  metrics,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.sectionTitle}>SLA Progress</Text>

      {metrics.map((metric, index) => {
        const isOverdue = metric.statusVariant === 'overdue';
        const badgeBg = isOverdue
          ? COLORS.badgeUrgentBg
          : COLORS.approvalChipActiveBg;
        const badgeText = isOverdue
          ? COLORS.badgeUrgentText
          : COLORS.approvalChipActiveText;
        const barColor = isOverdue
          ? COLORS.badgeUrgentText
          : COLORS.badgeGreenText;
        const clampedProgress = Math.max(0, Math.min(1, metric.progress));

        return (
          <View key={metric.label}>
            <View style={styles.metricBlock}>
              <View style={styles.headerRow}>
                <Text style={styles.metricLabel}>{metric.label}</Text>
                <View style={[styles.statusBadge, { backgroundColor: badgeBg }]}>
                  <Text style={[styles.statusBadgeText, { color: badgeText }]}>
                    {metric.statusLabel}
                  </Text>
                </View>
              </View>

              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${clampedProgress * 100}%`,
                      backgroundColor: barColor,
                    },
                  ]}
                />
              </View>

              <Text
                style={[
                  styles.captionText,
                  isOverdue && styles.overdueCaptionText,
                ]}
              >
                {metric.caption}
              </Text>
            </View>

            {index < metrics.length - 1 && <View style={styles.dashedDivider} />}
          </View>
        );
      })}
    </View>
  );
};

export default ComplaintSlaSection;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  sectionTitle: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
    marginBottom: hp(1.5),
  },
  metricBlock: {
    paddingVertical: hp(0.6),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  metricLabel: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.minTiny,
    color: COLORS.darkText,
  },
  statusBadge: {
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(0.45),
    borderRadius: wp(4),
  },
  statusBadgeText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.xsmall,
  },
  progressTrack: {
    width: '100%',
    height: hp(0.9),
    backgroundColor: COLORS.lightGrey,
    borderRadius: wp(2),
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: wp(2),
  },
  captionText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
    marginTop: hp(0.8),
  },
  overdueCaptionText: {
    color: COLORS.badgeUrgentText,
  },
  dashedDivider: {
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.dashedBorder,
    marginVertical: hp(1.8),
  },
});
