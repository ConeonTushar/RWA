import React from 'react';
import { StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';
import { ComplaintTimelineStep } from './types';

export interface ComplaintTimelineCardProps {
  steps: ComplaintTimelineStep[];
  containerStyle?: StyleProp<ViewStyle>;
}

const ComplaintTimelineCard: React.FC<ComplaintTimelineCardProps> = ({
  steps,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.sectionTitle}>Complaint Timeline</Text>

      <View style={styles.card}>
        {steps.map((item, index) => {
          const isLast = index === steps.length - 1;
          return (
            <View
              key={`${item.step}-${item.title}`}
              style={[styles.stepRow, !isLast && styles.stepRowSpacing]}
            >
              <View style={styles.stepCircle}>
                <Text style={styles.stepNumber}>{item.step}</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>{item.title}</Text>
                <Text style={styles.stepMeta}>
                  {item.timestamp} · {item.actor}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default ComplaintTimelineCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  sectionTitle: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
    marginBottom: hp(1.4),
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingHorizontal: wp(4.5),
    paddingVertical: hp(2),
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepRowSpacing: {
    marginBottom: hp(2),
  },
  stepCircle: {
    width: wp(8.5),
    height: wp(8.5),
    borderRadius: wp(4.25),
    borderWidth: 1,
    borderColor: COLORS.darkText,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3.5),
  },
  stepNumber: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.darkText,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.darkText,
  },
  stepMeta: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
    marginTop: hp(0.2),
  },
});
