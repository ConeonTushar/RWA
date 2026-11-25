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
import VectorIcon from '../elements/VectorIcon';

export interface ApproveRequestModalProps {
  visible: boolean;
  applicantName?: string;
  roleName?: string;
  flatNumber?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ApproveRequestModal: React.FC<ApproveRequestModalProps> = ({
  visible,
  applicantName = 'Rahul Sharma',
  roleName = 'a family member',
  flatNumber = 'Flat B-204',
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      {/* Semi-transparent Backdrop */}
      <Pressable style={styles.backdrop} onPress={onCancel} />

      {/* Bottom Sheet Modal Container */}
      <View style={styles.bottomSheetWrapper} pointerEvents="box-none">
        <View style={styles.sheetCard}>
          {/* Header Row: Mint Circle Icon + Title */}
          <View style={styles.headerRow}>
            <View style={styles.circleIcon}>
              <VectorIcon
                type="Feather"
                name="check"
                size={wp(5)}
                color={COLORS.greenPrimary}
              />
            </View>
            <Text style={styles.headerTitle}>Approve resident request?</Text>
          </View>

          {/* Body Statement */}
          <Text style={styles.bodyText}>
            You are approving {applicantName} as {roleName} for {flatNumber}.
          </Text>

          {/* Informational Subtitle */}
          <Text style={styles.subNoteText}>
            The resident will receive access and a notification.
          </Text>

          {/* Action Buttons */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Confirm approval"
              activeOpacity={0.8}
              onPress={onConfirm}
              style={styles.confirmButton}
            >
              <Text style={styles.confirmButtonText}>Confirm approval</Text>
            </TouchableOpacity>

            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Cancel"
              activeOpacity={0.8}
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

export default ApproveRequestModal;

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
    paddingBottom: hp(4.5),
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
  circleIcon: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(5.5),
    backgroundColor: COLORS.approvalChipActiveBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3),
  },
  headerTitle: {
    flex: 1,
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.l1,
    color: COLORS.darkText,
  },
  bodyText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
    lineHeight: FONTSIZE.small * 1.45,
    marginBottom: hp(1.2),
  },
  subNoteText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
    marginBottom: hp(2.5),
  },
  buttonsContainer: {
    width: '100%',
    gap: hp(1.4),
  },
  confirmButton: {
    width: '100%',
    height: hp(5.6),
    backgroundColor: COLORS.darkBtn,
    borderRadius: wp(3.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.white,
  },
  cancelButton: {
    width: '100%',
    height: hp(5.6),
    backgroundColor: COLORS.white,
    borderWidth: 1.2,
    borderColor: COLORS.darkBtn,
    borderRadius: wp(3.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.darkText,
  },
});
