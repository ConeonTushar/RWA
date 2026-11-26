import React from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';
import VectorIcon from '../elements/VectorIcon';

export interface MoreSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const MoreSearchBar: React.FC<MoreSearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search society tools...',
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <VectorIcon
        type="Feather"
        name="search"
        size={wp(4.2)}
        color={COLORS.textSecondary}
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.placeholder}
        style={styles.input}
        autoFocus
        returnKeyType="search"
      />
      {value.length > 0 && (
        <TouchableOpacity
          onPress={() => onChangeText('')}
          activeOpacity={0.7}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <VectorIcon
            type="Feather"
            name="x-circle"
            size={wp(4)}
            color={COLORS.mutedText}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MoreSearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGrey,
    borderRadius: hp(1.4),
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    paddingHorizontal: wp(3.5),
    height: hp(5.2),
    marginTop: hp(1),
  },
  input: {
    flex: 1,
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
    marginLeft: wp(2.5),
    paddingVertical: 0,
  },
});
