import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';

export interface ConfirmRemindersModalProps {
  visible: boolean;
  flatCountText: string;
  recipientsLabel: string;
  channelsLabel: string;
  scheduleLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * Bottom-sheet confirmation modal before dispatching payment reminders.
 */
const ConfirmRemindersModal: React.FC<ConfirmRemindersModalProps> = ({
  visible,
  flatCountText,
  recipientsLabel,
  channelsLabel,
  scheduleLabel,
  onConfirm,
  onCancel,
}) => {
  const summaryRows = [
    { label: 'Recipients', value: recipientsLabel },
    { label: 'Channels', value: channelsLabel },
    { label: 'Schedule', value: scheduleLabel },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <Pressable style={styles.backdrop} onPress={onCancel} />

      <View style={styles.bottomSheetWrapper} pointerEvents="box-none">
        <View style={styles.sheetCard}>
          <View style={styles.headerRow}>
            <View style={styles.circleBadge} />
            <Text style={styles.headerTitle}>Confirm reminders</Text>
          </View>

          <Text style={styles.flatCountText}>{flatCountText}</Text>

          <View style={styles.detailsList}>
            {summaryRows.map((row) => (
              <View key={row.label} style={styles.detailRow}>
                <Text style={styles.detailLabel}>{row.label}</Text>
                <Text style={styles.detailValue}>{row.value}</Text>
              </View>
            ))}
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Confirm and send"
              activeOpacity={0.85}
              onPress={onConfirm}
              style={styles.confirmButton}
            >
              <Text style={styles.confirmButtonText}>Confirm and send</Text>
            </TouchableOpacity>

            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Cancel"
              activeOpacity={0.85}
              onPress={onCancel}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmRemindersModal;

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  bottomSheetWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheetCard: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: wp(6),
    borderTopRightRadius: wp(6),
    paddingHorizontal: wp(6),
    paddingTop: hp(3),
    paddingBottom: hp(4),
    shadowColor: COLORS.shadowBlack,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  circleBadge: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: COLORS.approvalChipActiveBg,
    marginRight: wp(3),
  },
  headerTitle: {
    flex: 1,
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.l1,
    color: COLORS.darkText,
  },
  flatCountText: {
    fontFamily: FONTS.BOLD_OUTFIT,
    fontSize: FONTSIZE.h2,
    color: COLORS.darkText,
    marginBottom: hp(1.6),
  },
  detailsList: {
    gap: hp(1.2),
    marginBottom: hp(3),
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.textSecondary,
  },
  detailValue: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
  },
  buttonsContainer: {
    width: '100%',
    gap: hp(1.4),
  },
  confirmButton: {
    width: '100%',
    height: hp(5.8),
    backgroundColor: COLORS.darkBtn,
    borderRadius: wp(3.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.white,
  },
  cancelButton: {
    width: '100%',
    height: hp(5.8),
    backgroundColor: COLORS.white,
    borderWidth: 1.2,
    borderColor: COLORS.darkBtn,
    borderRadius: wp(3.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
  },
});
