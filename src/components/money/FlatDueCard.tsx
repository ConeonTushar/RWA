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
import { DashedDivider, FlatStatusBadge } from './MoneyCommon';
import { FlatDueItem } from './types';

export interface FlatDueCardProps {
  item: FlatDueItem;
  onPress?: () => void;
  showDivider?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

const FlatDueCard: React.FC<FlatDueCardProps> = ({
  item,
  onPress,
  showDivider = true,
  containerStyle,
}) => {
  return (
    <View style={containerStyle}>
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={onPress}
        style={styles.card}
      >
        {/* Top Row: Avatar placeholder, Flat & Resident Name, Status Badge */}
        <View style={styles.topRow}>
          <View style={styles.avatarPlaceholder} />

          <View style={styles.infoColumn}>
            <Text style={styles.flatNumber}>{item.flatNumber}</Text>
            <Text style={styles.residentName} numberOfLines={1}>
              {item.residentName}
            </Text>
          </View>

          <FlatStatusBadge status={item.status} />
        </View>

        {/* Middle Row: Amount due */}
        <View style={styles.amountRow}>
          <Text style={styles.amountLabel}>Amount due</Text>
          <Text style={styles.amountValue}>{item.amountDue}</Text>
        </View>

        {/* Bottom Label: Months outstanding */}
        <Text
          style={[
            styles.outstandingText,
            item.isOverdue && styles.outstandingTextOverdue,
          ]}
        >
          {item.outstandingLabel}
        </Text>
      </TouchableOpacity>

      {showDivider && <DashedDivider />}
    </View>
  );
};

export default FlatDueCard;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    paddingVertical: hp(2),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: wp(12.5),
    height: wp(12.5),
    borderRadius: wp(3.5),
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginRight: wp(3.5),
  },
  infoColumn: {
    flex: 1,
    paddingRight: wp(2),
  },
  flatNumber: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
  },
  residentName: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
    marginTop: hp(0.25),
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(1.8),
  },
  amountLabel: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
  },
  amountValue: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
  },
  outstandingText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xxsmall,
    color: COLORS.textSecondary,
    marginTop: hp(0.8),
  },
  outstandingTextOverdue: {
    color: COLORS.badgeUrgentText,
  },
});
