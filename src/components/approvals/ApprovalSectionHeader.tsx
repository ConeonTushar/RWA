import React from 'react';
import { StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp } from '../../utils/helper';

export interface ApprovalSectionHeaderProps {
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const ApprovalSectionHeader: React.FC<ApprovalSectionHeaderProps> = ({
  title,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.titleText}>{title.toUpperCase()}</Text>
    </View>
  );
};

export default ApprovalSectionHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: hp(0.8),
  },
  titleText: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.darkText,
    letterSpacing: 0.8,
  },
});
