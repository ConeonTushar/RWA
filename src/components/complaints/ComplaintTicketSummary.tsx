import React from 'react';
import { StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp } from '../../utils/helper';

export interface ComplaintTicketSummaryProps {
  ticketId: string;
  title: string;
  subtitle: string;
  statusText?: string;
  statusColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const ComplaintTicketSummary: React.FC<ComplaintTicketSummaryProps> = ({
  ticketId,
  title,
  subtitle,
  statusText,
  statusColor = COLORS.badgeUrgentText,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.topRow}>
        <Text style={styles.ticketIdText}>{ticketId}</Text>
        {statusText ? (
          <Text style={[styles.statusText, { color: statusColor }]}>
            {statusText}
          </Text>
        ) : null}
      </View>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.subtitleText}>{subtitle}</Text>
    </View>
  );
};

export default ComplaintTicketSummary;

const styles = StyleSheet.create({
  container: {
    width: '100%',
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
  statusText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.xsmall,
  },
  titleText: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.l2,
    color: COLORS.darkText,
  },
  subtitleText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
    marginTop: hp(0.3),
  },
});
