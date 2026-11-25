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

export interface ResidentRequestHeaderProps {
  title?: string;
  onBackPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const ResidentRequestHeader: React.FC<ResidentRequestHeaderProps> = ({
  title = 'Resident Request',
  onBackPress,
  containerStyle,
}) => {
  return (
    <View style={[styles.headerContainer, containerStyle]}>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Go back"
        activeOpacity={0.7}
        onPress={onBackPress}
        style={styles.backButton}
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

export default ResidentRequestHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: hp(1),
  },
  backButton: {
    paddingRight: wp(2.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
  },
});
