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
import VectorIcon from '../elements/VectorIcon';

export interface ComplaintsHeaderProps {
  title?: string;
  subtitle?: string;
  onAnalyticsPress?: () => void;
  onSearchPress?: () => void;
  onNotificationPress?: () => void;
  hasUnreadNotification?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

const ComplaintsHeader: React.FC<ComplaintsHeaderProps> = ({
  title = 'Complaints & Issues',
  subtitle = 'Track and manage society complaints.',
  onAnalyticsPress,
  onSearchPress,
  onNotificationPress,
  hasUnreadNotification = false,
  containerStyle,
}) => {
  return (
    <View style={[styles.headerContainer, containerStyle]}>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.subtitleText}>{subtitle}</Text>
      </View>

      <View style={styles.actionButtonsRow}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Complaint analytics"
          activeOpacity={0.7}
          onPress={onAnalyticsPress}
          style={styles.iconBtn}
        >
          <VectorIcon
            type="Ionicons"
            name="stats-chart"
            size={wp(4.8)}
            color={COLORS.darkText}
          />
        </TouchableOpacity>

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Search complaints"
          activeOpacity={0.7}
          onPress={onSearchPress}
          style={[styles.iconBtn, styles.spacedBtn]}
        >
          <VectorIcon
            type="Feather"
            name="search"
            size={wp(5)}
            color={COLORS.darkText}
          />
        </TouchableOpacity>

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Notifications"
          activeOpacity={0.7}
          onPress={onNotificationPress}
          style={[styles.iconBtn, styles.spacedBtn, styles.notificationBtn]}
        >
          <VectorIcon
            type="Feather"
            name="bell"
            size={wp(5)}
            color={COLORS.darkText}
          />
          {hasUnreadNotification && <View style={styles.unreadDot} />}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ComplaintsHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    paddingVertical: hp(0.8),
  },
  textContainer: {
    flex: 1,
    paddingRight: wp(2),
  },
  titleText: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.l2,
    color: COLORS.darkText,
    letterSpacing: -0.2,
  },
  subtitleText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
    marginTop: hp(0.3),
  },
  actionButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(0.2),
  },
  iconBtn: {
    width: wp(8),
    height: wp(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacedBtn: {
    marginLeft: wp(1),
  },
  notificationBtn: {
    position: 'relative',
  },
  unreadDot: {
    position: 'absolute',
    top: hp(0.5),
    right: wp(1.3),
    width: wp(2),
    height: wp(2),
    borderRadius: wp(1),
    backgroundColor: COLORS.red,
  },
});
