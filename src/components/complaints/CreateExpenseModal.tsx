import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';

export interface CreateExpenseModalProps {
  visible: boolean;
  amount: string;
  onCreateExpense: () => void;
  onSkip: () => void;
}

const CreateExpenseModal: React.FC<CreateExpenseModalProps> = ({
  visible,
  amount,
  onCreateExpense,
  onSkip,
}) => {
  const formattedAmount = amount.trim() ? `₹${amount}` : '₹2,500';

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onSkip}
    >
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.headerRow}>
            <View style={styles.iconCircle} />
            <Text style={styles.titleText}>Create an expense?</Text>
          </View>

          <Text style={styles.amountText}>{formattedAmount}</Text>

          <Text style={styles.subtitleText}>
            Would you like to create an expense entry for this complaint?
          </Text>

          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Create expense"
            activeOpacity={0.8}
            onPress={onCreateExpense}
            style={styles.primaryBtn}
          >
            <Text style={styles.primaryBtnText}>Create expense</Text>
          </TouchableOpacity>

          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Skip for now"
            activeOpacity={0.8}
            onPress={onSkip}
            style={styles.secondaryBtn}
          >
            <Text style={styles.secondaryBtnText}>Skip for now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CreateExpenseModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 15, 17, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(5),
  },
  sheet: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: wp(5),
    paddingHorizontal: wp(5.5),
    paddingVertical: hp(3),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: COLORS.approvalChipActiveBg,
    marginRight: wp(3),
  },
  titleText: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.l1,
    color: COLORS.darkText,
  },
  amountText: {
    fontFamily: FONTS.BOLD_OUTFIT,
    fontSize: FONTSIZE.h3,
    color: COLORS.darkText,
    marginTop: hp(2),
  },
  subtitleText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.textSecondary,
    marginTop: hp(0.8),
    marginBottom: hp(2.5),
    lineHeight: FONTSIZE.tiny * 1.4,
  },
  primaryBtn: {
    width: '100%',
    height: hp(5.6),
    borderRadius: wp(3),
    backgroundColor: COLORS.darkBtn,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.white,
  },
  secondaryBtn: {
    width: '100%',
    height: hp(5.6),
    borderRadius: wp(3),
    borderWidth: 1,
    borderColor: COLORS.darkBtn,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(1.4),
  },
  secondaryBtnText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
  },
});
