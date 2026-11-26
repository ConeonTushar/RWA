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
import VectorIcon from '../elements/VectorIcon';

export interface SupportingDocumentRowProps {
  fileName: string;
  subtitle?: string;
  onPressView?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

/**
 * Displays an attached invoice / supporting document row with a preview action.
 */
const SupportingDocumentRow: React.FC<SupportingDocumentRowProps> = ({
  fileName,
  subtitle = 'Supporting invoice',
  onPressView,
  containerStyle,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPressView}
      style={[styles.row, containerStyle]}
    >
      <View style={styles.avatarCircle} />
      <View style={styles.textColumn}>
        <Text style={styles.fileNameText} numberOfLines={1}>
          {fileName}
        </Text>
        <Text style={styles.subtitleText}>{subtitle}</Text>
      </View>
      <VectorIcon
        type="Feather"
        name="eye"
        size={wp(5)}
        color={COLORS.darkText}
      />
    </TouchableOpacity>
  );
};

export default SupportingDocumentRow;

const styles = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(0.8),
  },
  avatarCircle: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: COLORS.avatarBg,
    marginRight: wp(3.2),
  },
  textColumn: {
    flex: 1,
    paddingRight: wp(2),
  },
  fileNameText: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
  },
  subtitleText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
    marginTop: hp(0.25),
  },
});
