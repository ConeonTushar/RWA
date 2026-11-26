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

export interface ComplaintDetailHeaderProps {
  title?: string;
  onBackPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const ComplaintDetailHeader: React.FC<ComplaintDetailHeaderProps> = ({
  title = 'Complaint details',
  onBackPress,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Go back"
        activeOpacity={0.7}
        onPress={onBackPress}
        style={styles.backBtn}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <VectorIcon
          type="Feather"
          name="chevron-left"
          size={wp(6)}
          color={COLORS.darkText}
        />
      </TouchableOpacity>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
};

export default ComplaintDetailHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.2),
    width: '100%',
  },
  backBtn: {
    marginRight: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.l2,
    color: COLORS.darkText,
  },
});
