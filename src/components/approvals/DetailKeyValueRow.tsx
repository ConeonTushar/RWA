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
import { hp } from '../../utils/helper';

export interface DetailKeyValueRowProps {
  label: string;
  value: string;
  valueColor?: string;
  isLink?: boolean;
  onLinkPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const DetailKeyValueRow: React.FC<DetailKeyValueRowProps> = ({
  label,
  value,
  valueColor = COLORS.darkText,
  isLink = false,
  onLinkPress,
  containerStyle,
}) => {
  return (
    <View style={[styles.row, containerStyle]}>
      <Text style={styles.labelText}>{label}</Text>

      {isLink ? (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onLinkPress}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={[styles.valueText, { color: valueColor }]}>{value}</Text>
        </TouchableOpacity>
      ) : (
        <Text style={[styles.valueText, { color: valueColor }]}>{value}</Text>
      )}
    </View>
  );
};

export default DetailKeyValueRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(0.9),
  },
  labelText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.minTiny,
    color: COLORS.textSecondary,
  },
  valueText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.minTiny,
  },
});
