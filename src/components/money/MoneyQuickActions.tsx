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
import { DashedDivider } from './MoneyCommon';
import { MoneyQuickActionItem } from './types';

export interface MoneyQuickActionsProps {
  title?: string;
  actions: MoneyQuickActionItem[];
  containerStyle?: StyleProp<ViewStyle>;
}

const MoneyQuickActions: React.FC<MoneyQuickActionsProps> = ({
  title = 'QUICK ACTIONS',
  actions,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.sectionTitle}>{title}</Text>

      <View style={styles.listContainer}>
        {actions.map((item, index) => (
          <View key={item.id}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={item.onPress}
              style={styles.actionRow}
            >
              <View style={styles.iconCircle}>
                {item.iconName ? (
                  <VectorIcon
                    type="Feather"
                    name={item.iconName}
                    size={wp(4.5)}
                    color={COLORS.textSecondary}
                  />
                ) : null}
              </View>

              <View style={styles.textColumn}>
                <Text style={styles.actionTitle}>{item.title}</Text>
                <Text style={styles.actionSubtitle}>{item.subtitle}</Text>
              </View>

              <VectorIcon
                type="Feather"
                name="chevron-right"
                size={wp(4.8)}
                color={COLORS.darkText}
              />
            </TouchableOpacity>

            {index < actions.length - 1 && <DashedDivider />}
          </View>
        ))}
      </View>
    </View>
  );
};

export default MoneyQuickActions;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  sectionTitle: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.xxsmall,
    color: COLORS.darkText,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: hp(1),
  },
  listContainer: {
    width: '100%',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.8),
  },
  iconCircle: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(5.5),
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3.5),
  },
  textColumn: {
    flex: 1,
    paddingRight: wp(2),
  },
  actionTitle: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
  },
  actionSubtitle: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xxsmall,
    color: COLORS.textSecondary,
    marginTop: hp(0.25),
  },
});
