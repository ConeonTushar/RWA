import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';

export interface DropdownItem {
  id: string | number;
  name: string;
}

export interface CustomDropdownProps {
  label?: string;
  data: DropdownItem[];
  value: string | number | null;
  onChange: (val: any) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  rightIcon?: React.ReactNode;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  data,
  value,
  onChange,
  placeholder = 'Select option',
  error,
  required = false,
  containerStyle,
  style,
  rightIcon,
}) => {
  const [open, setOpen] = useState(false);

  const selectedItem = data?.find(item => item.id === value);

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Floating Label */}
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>
            {label}
            {required && <Text style={styles.required}> *</Text>}
          </Text>
        </View>
      )}

      {/* Dropdown Selector */}
      <TouchableOpacity
        style={[styles.selector, style, error ? styles.errorBorder : undefined]}
        activeOpacity={0.8}
        onPress={() => setOpen(true)}
      >
        <Text
          style={[styles.selectorText, !selectedItem && styles.placeholderText]}
        >
          {selectedItem ? selectedItem.name : placeholder}
        </Text>

        {rightIcon ? rightIcon : <Text style={styles.chevron}>▼</Text>}
      </TouchableOpacity>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Modal Picker */}
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setOpen(false)} />

        <View style={styles.centeredView} pointerEvents="box-none">
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {label ? `Select ${label}` : 'Select Option'}
              </Text>
              <TouchableOpacity
                onPress={() => setOpen(false)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={data}
              keyExtractor={item => item.id.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                const isSelected = item.id === value;
                return (
                  <TouchableOpacity
                    style={[styles.item, isSelected && styles.itemSelected]}
                    activeOpacity={0.7}
                    onPress={() => {
                      onChange(item.id);
                      setOpen(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.itemText,
                        isSelected && styles.itemTextSelected,
                      ]}
                    >
                      {item.name}
                    </Text>
                    {isSelected && (
                      <View style={styles.checkmark}>
                        <Text style={styles.checkmarkText}>✓</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 12,
    marginBottom: 16,
    position: 'relative',
  },
  labelContainer: {
    position: 'absolute',
    top: -9,
    left: 20,
    zIndex: 2,
    backgroundColor: COLORS.white,
    paddingHorizontal: 6,
  },
  label: {
    fontSize: FONTSIZE.xsmall,
    fontFamily: FONTS.REGULAR_OUTFIT,
    color: COLORS.textSecondary,
  },
  required: {
    color: COLORS.red,
  },
  selector: {
    minHeight: hp(6.2),
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: hp(1.4),
    paddingHorizontal: wp(4),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
  },
  selectorText: {
    fontSize: FONTSIZE.minTiny,
    fontFamily: FONTS.REGULAR_OUTFIT,
    color: COLORS.darkText,
  },
  placeholderText: {
    color: COLORS.placeholder,
  },
  chevron: {
    fontSize: 9,
    color: COLORS.darkText,
    marginRight: 4,
  },
  errorBorder: {
    borderColor: COLORS.red,
  },
  errorText: {
    color: COLORS.red,
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  centeredView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    padding: wp(6),
  },
  modalContent: {
    width: '100%',
    maxHeight: '65%',
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: wp(5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.inputBorder,
    marginBottom: 6,
  },
  modalTitle: {
    fontSize: FONTSIZE.tiny,
    fontFamily: FONTS.MEDIUM_OUTFIT,
    color: COLORS.darkText,
  },
  closeText: {
    fontSize: FONTSIZE.small,
    color: COLORS.textSecondary,
    paddingHorizontal: 4,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 6,
    borderBottomWidth: 0.8,
    borderBottomColor: '#F3F4F6',
  },
  itemSelected: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  itemText: {
    fontSize: FONTSIZE.minTiny,
    fontFamily: FONTS.REGULAR_OUTFIT,
    color: COLORS.darkText,
  },
  itemTextSelected: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    color: COLORS.darkText,
  },
  checkmark: {
    paddingRight: 6,
  },
  checkmarkText: {
    fontSize: FONTSIZE.small,
    color: COLORS.badgeGreenText,
  },
});
