import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';

export interface ReminderChannelOption {
  id: 'push' | 'sms' | 'whatsapp';
  label: string;
  enabled: boolean;
}

export interface ReminderChannelsCardProps {
  channels: ReminderChannelOption[];
  onToggleChannel: (id: ReminderChannelOption['id']) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

/**
 * Multi-channel toggle card (Push, SMS, WhatsApp) for Send Reminders.
 */
const ReminderChannelsCard: React.FC<ReminderChannelsCardProps> = ({
  channels,
  onToggleChannel,
  containerStyle,
}) => {
  return (
    <View style={[styles.wrapper, containerStyle]}>
      <Text style={styles.sectionLabel}>Channels*</Text>

      <View style={styles.card}>
        {channels.map((channel, index) => (
          <TouchableOpacity
            key={channel.id}
            activeOpacity={0.8}
            onPress={() => onToggleChannel(channel.id)}
            style={[
              styles.row,
              index < channels.length - 1 && styles.rowSpacing,
            ]}
          >
            <View style={styles.leftGroup}>
              <View style={styles.circleAvatar} />
              <Text style={styles.channelLabel}>{channel.label}</Text>
            </View>

            <View
              style={[
                styles.togglePill,
                channel.enabled ? styles.toggleOnBg : styles.toggleOffBg,
              ]}
            >
              <Text
                style={[
                  styles.toggleText,
                  channel.enabled ? styles.toggleOnText : styles.toggleOffText,
                ]}
              >
                {channel.enabled ? 'ON' : 'Off'}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ReminderChannelsCard;

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
    paddingVertical: hp(1.8),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowSpacing: {
    marginBottom: hp(1.6),
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  circleAvatar: {
    width: wp(7.5),
    height: wp(7.5),
    borderRadius: wp(3.75),
    backgroundColor: COLORS.avatarBg,
    marginRight: wp(3),
  },
  channelLabel: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
  },
  togglePill: {
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(0.45),
    borderRadius: wp(4),
    minWidth: wp(12),
    alignItems: 'center',
  },
  toggleOnBg: {
    backgroundColor: COLORS.approvalChipActiveBg,
  },
  toggleOffBg: {
    backgroundColor: COLORS.lightGrey,
  },
  toggleText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.xsmall,
  },
  toggleOnText: {
    color: COLORS.approvalChipActiveText,
  },
  toggleOffText: {
    color: COLORS.textSecondary,
  },
});
