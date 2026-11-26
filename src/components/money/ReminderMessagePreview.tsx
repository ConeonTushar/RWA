import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';

export interface ReminderMessagePreviewProps {
  message: string;
  containerStyle?: StyleProp<ViewStyle>;
}

/**
 * Read-only preview card showing the reminder message that will be sent.
 */
const ReminderMessagePreview: React.FC<ReminderMessagePreviewProps> = ({
  message,
  containerStyle,
}) => {
  return (
    <View style={[styles.wrapper, containerStyle]}>
      <Text style={styles.sectionLabel}>Message Preview</Text>
      <View style={styles.card}>
        <Text style={styles.previewText}>{message}</Text>
      </View>
    </View>
  );
};

export default ReminderMessagePreview;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  sectionLabel: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.darkText,
    marginBottom: hp(1.1),
  },
  card: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingHorizontal: wp(4.5),
    paddingVertical: hp(2),
  },
  previewText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.charcoalText,
    lineHeight: FONTSIZE.small * 1.5,
  },
});
