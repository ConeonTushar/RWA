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

export interface LedgerActionRow {
  id: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
}

export interface LedgerActionsCardProps {
  actions: LedgerActionRow[];
  containerStyle?: StyleProp<ViewStyle>;
}

const LedgerActionsCard: React.FC<LedgerActionsCardProps> = ({
  actions,
  containerStyle,
}) => {
  return (
    <View style={[styles.card, containerStyle]}>
      {actions.map((action, index) => (
        <TouchableOpacity
          key={action.id}
          activeOpacity={0.7}
          onPress={action.onPress}
          style={[
            styles.row,
            index < actions.length - 1 && styles.rowSpacing,
          ]}
        >
          <View style={styles.textColumn}>
            <Text style={styles.title}>{action.title}</Text>
            {action.subtitle ? (
              <Text style={styles.subtitle}>{action.subtitle}</Text>
            ) : null}
          </View>

          <VectorIcon
            type="Feather"
            name="chevron-right"
            size={wp(4.8)}
            color={COLORS.darkText}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default LedgerActionsCard;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingHorizontal: wp(4.5),
    paddingVertical: hp(2),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(0.6),
  },
  rowSpacing: {
    marginBottom: hp(1.4),
  },
  textColumn: {
    flex: 1,
    paddingRight: wp(2),
  },
  title: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
  },
  subtitle: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xxsmall,
    color: COLORS.textSecondary,
    marginTop: hp(0.25),
  },
});
