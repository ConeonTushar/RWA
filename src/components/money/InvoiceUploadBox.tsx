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

export interface InvoiceUploadBoxProps {
  label?: string;
  required?: boolean;
  fileName?: string;
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

/**
 * Upload box for attaching a bill or invoice on the Add Expense screen.
 */
const InvoiceUploadBox: React.FC<InvoiceUploadBoxProps> = ({
  label = 'Invoice / Bill',
  required = true,
  fileName,
  onPress,
  containerStyle,
}) => {
  return (
    <View style={[styles.wrapper, containerStyle]}>
      <Text style={styles.sectionLabel}>
        {label}
        {required ? ' *' : ''}
      </Text>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles.uploadBox}
      >
        <VectorIcon
          type="Feather"
          name="upload"
          size={wp(5.5)}
          color={COLORS.darkText}
        />
        <Text style={styles.primaryText}>
          {fileName ? fileName : 'Add bill or invoice'}
        </Text>
        <Text style={styles.secondaryText}>Recommended under 10 mb</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InvoiceUploadBox;

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
  uploadBox: {
    width: '100%',
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    backgroundColor: COLORS.white,
    paddingVertical: hp(2.4),
    paddingHorizontal: wp(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.darkText,
    marginTop: hp(0.9),
  },
  secondaryText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xxsmall,
    color: COLORS.textSecondary,
    marginTop: hp(0.35),
  },
});
