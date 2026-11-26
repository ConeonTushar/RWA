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

export interface MoneySearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onFilterPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const MoneySearchBar: React.FC<MoneySearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search name, flat or vehicle',
  onFilterPress,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <VectorIcon
        type="Feather"
        name="search"
        size={wp(4.8)}
        color={COLORS.darkText}
      />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textSecondary}
        style={styles.input}
        returnKeyType="search"
      />

      {onFilterPress ? (
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Filter flats"
          activeOpacity={0.7}
          onPress={onFilterPress}
          style={styles.filterBtn}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <VectorIcon
            type="Feather"
            name="sliders"
            size={wp(4.5)}
            color={COLORS.darkText}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default MoneySearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: wp(7),
    paddingHorizontal: wp(4),
    height: hp(5.6),
    width: '100%',
  },
  input: {
    flex: 1,
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
    marginLeft: wp(2.5),
    paddingVertical: 0,
  },
  filterBtn: {
    paddingLeft: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
