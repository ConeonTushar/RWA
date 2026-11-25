import React from 'react';
import { StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';

export interface ApplicantSummaryCardProps {
  name: string;
  role: string;
  status?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const ApplicantSummaryCard: React.FC<ApplicantSummaryCardProps> = ({
  name,
  role,
  status = 'Applicant',
  containerStyle,
}) => {
  return (
    <View style={[styles.card, containerStyle]}>
      <LinearGradient
        colors={[COLORS.applicantMintStart, COLORS.applicantMintEnd]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Rounded square avatar placeholder */}
      <View style={styles.avatarPlaceholder} />

      {/* Text info */}
      <View style={styles.textContainer}>
        <Text style={styles.nameText} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.roleText} numberOfLines={1}>
          {role}
        </Text>
        <Text style={styles.statusText} numberOfLines={1}>
          {status}
        </Text>
      </View>
    </View>
  );
};

export default ApplicantSummaryCard;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp(4),
    borderWidth: 1.2,
    borderColor: COLORS.applicantMintBorder,
    overflow: 'hidden',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.8),
  },
  avatarPlaceholder: {
    width: wp(16),
    height: wp(16),
    borderRadius: wp(3.8),
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginRight: wp(3.5),
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  nameText: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
  },
  roleText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
    marginTop: hp(0.3),
  },
  statusText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
    marginTop: hp(0.2),
  },
});
