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
import VectorIcon, { IconType } from '../elements/VectorIcon';

export interface QuickActionItem {
  id: string;
  label: string;
  iconName?: string;
  iconType?: IconType;
  onPress?: () => void;
}

export interface QuickActionsProps {
  title?: string;
  onPressPost?: () => void;
  onPressEmergency?: () => void;
  onPressApprove?: () => void;
  onPressRecord?: () => void;
  actions?: QuickActionItem[];
  containerStyle?: StyleProp<ViewStyle>;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  title = 'QUICK ACTIONS',
  onPressPost,
  onPressEmergency,
  onPressApprove,
  onPressRecord,
  actions,
  containerStyle,
}) => {
  const defaultActions: QuickActionItem[] = [
    {
      id: 'post',
      label: 'post',
      iconName: 'pencil-outline',
      iconType: 'MaterialCommunityIcons',
      onPress: onPressPost,
    },
    {
      id: 'emergency',
      label: 'emergency',
      iconName: 'alert-outline',
      iconType: 'MaterialCommunityIcons',
      onPress: onPressEmergency,
    },
    {
      id: 'approve',
      label: 'approve',
      iconName: 'check-circle-outline',
      iconType: 'MaterialCommunityIcons',
      onPress: onPressApprove,
    },
    {
      id: 'record',
      label: 'record',
      iconName: 'notebook-outline',
      iconType: 'MaterialCommunityIcons',
      onPress: onPressRecord,
    },
  ];

  const itemsToRender = actions || defaultActions;

  return (
    <View style={[styles.container, containerStyle]}>
      {title ? <Text style={styles.sectionTitle}>{title}</Text> : null}

      <View style={styles.actionsRow}>
        {itemsToRender.map(item => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.7}
            onPress={item.onPress}
            style={styles.actionBtn}
          >
            <View style={styles.circle}>
              {item.iconName && (
                <VectorIcon
                  type={item.iconType || 'MaterialCommunityIcons'}
                  name={item.iconName}
                  size={18}
                  color={COLORS.darkText}
                />
              )}
            </View>
            <Text style={styles.actionLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default QuickActions;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  sectionTitle: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.xxsmall,
    color: COLORS.textSecondary,
    letterSpacing: 0.9,
    textTransform: 'uppercase',
    marginBottom: hp(1.2),
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: wp(1),
  },
  actionBtn: {
    alignItems: 'center',
    width: wp(14),
  },
  circle: {
    width: wp(12.5),
    height: wp(12.5),
    borderRadius: wp(6.25),
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.shadowBlack,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  actionLabel: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.minTiny,
    color: COLORS.darkText,
    marginTop: hp(0.6),
    width: wp(20),
    textAlign: 'center',
  },
});
