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

export interface ApprovalHeaderProps {
  title?: string;
  subtitle?: string;
  onSearchPress?: () => void;
  onNotificationPress?: () => void;
  hasUnreadNotification?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

const ApprovalHeader: React.FC<ApprovalHeaderProps> = ({
  title = 'Approvals',
  subtitle = 'Review and take action on society requests.',
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
          accessibilityLabel="Search approvals"
          activeOpacity={0.7}
          onPress={onSearchPress}
          style={styles.iconBtn}
        >
          <VectorIcon
            type="Feather"
            name="search"
            size={wp(5.2)}
            color={COLORS.darkText}
          />
        </TouchableOpacity>

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Notifications"
          activeOpacity={0.7}
          onPress={onNotificationPress}
          style={[styles.iconBtn, styles.notificationBtn]}
        >
          <VectorIcon
            type="Feather"
            name="bell"
            size={wp(5.2)}
            color={COLORS.darkText}
          />
          {hasUnreadNotification && <View style={styles.unreadDot} />}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ApprovalHeader;

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
    paddingRight: wp(3),
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
    width: wp(8.5),
    height: wp(8.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBtn: {
    marginLeft: wp(1.5),
    position: 'relative',
  },
  unreadDot: {
    position: 'absolute',
    top: hp(0.6),
    right: wp(1.5),
    width: wp(2),
    height: wp(2),
    borderRadius: wp(1),
    backgroundColor: COLORS.red,
  },
});
