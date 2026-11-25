import React from 'react';
import { StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';

export interface BookingConflictCardProps {
  title?: string;
  description?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const BookingConflictCard: React.FC<BookingConflictCardProps> = ({
  title = 'Booking conflict',
  description = 'Another booking overlaps this slot.',
  containerStyle,
}) => {
  return (
    <View style={[styles.card, containerStyle]}>
      {/* Top row: circle bullet placeholder + title */}
      <View style={styles.topRow}>
        <View style={styles.circlePlaceholder} />
        <Text style={styles.titleText}>{title}</Text>
      </View>

      {/* Description below */}
      <Text style={styles.descriptionText}>{description}</Text>
    </View>
  );
};

export default BookingConflictCard;

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
    alignItems: 'center',
  },
  circlePlaceholder: {
    width: wp(5.5),
    height: wp(5.5),
    borderRadius: wp(2.75),
    backgroundColor: COLORS.avatarBg,
    marginRight: wp(2.5),
  },
  titleText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.darkText,
  },
  descriptionText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
    marginTop: hp(0.8),
  },
});
