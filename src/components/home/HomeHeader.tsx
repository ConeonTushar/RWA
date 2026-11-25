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

export interface HomeHeaderProps {
  greeting?: string;
  userName?: string;
  societyName?: string;
  onNotificationPress?: () => void;
  hasUnreadNotification?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({
  greeting = 'GOOD MORNING',
  userName = 'Welcome back, President',
  societyName = 'Green Valley Residency',
  onNotificationPress,
  hasUnreadNotification = false,
  containerStyle,
}) => {
  return (
    <View style={[styles.headerContainer, containerStyle]}>
      <View style={styles.textContainer}>
        <Text style={styles.greetingText}>{greeting}</Text>
        <Text style={styles.welcomeText}>{userName}</Text>
        <Text style={styles.societyText}>{societyName}</Text>
      </View>

      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Notifications"
        activeOpacity={0.7}
        onPress={onNotificationPress}
        style={styles.notificationBtn}
      >
        <VectorIcon
          type="Feather"
          name="bell"
          size={18}
          color={COLORS.darkText}
        />
        {hasUnreadNotification && <View style={styles.unreadDot} />}
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  textContainer: {
    flex: 1,
    paddingRight: wp(3),
  },
  greetingText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xxsmall,
    color: COLORS.textSecondary,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  welcomeText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
    marginTop: hp(0.2),
  },
  societyText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.minTiny,
    color: COLORS.textSecondary,
    marginTop: hp(0.2),
  },
  notificationBtn: {
    width: wp(8.5),
    height: wp(8.5),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: hp(0.2),
  },
  unreadDot: {
    position: 'absolute',
    top: hp(0.8),
    right: wp(2),
    width: wp(1.8),
    height: wp(1.8),
    borderRadius: wp(0.9),
    backgroundColor: COLORS.red,
  },
});
