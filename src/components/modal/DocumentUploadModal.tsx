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
import { wp, vs } from '../../utils/helper';

export interface DocumentUploadModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  hasUploaded?: boolean;
  onSelectDocument: () => void;
  onTakePhoto?: () => void;
  onRemove?: () => void;
}

const DocumentUploadModal: React.FC<DocumentUploadModalProps> = ({
  visible,
  onClose,
  title = 'Upload Document',
  hasUploaded = false,
  onSelectDocument,
  onTakePhoto,
  onRemove,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose} />
      <View style={styles.modalCenteredView} pointerEvents="box-none">
        <View style={styles.modalCard}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle} numberOfLines={1}>
              {title}
            </Text>
            <TouchableOpacity
              onPress={onClose}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.modalCloseIcon}>✕</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.uploadOptionRow}
            activeOpacity={0.7}
            onPress={onSelectDocument}
          >
            <View style={styles.uploadOptionIconBox}>
              <Text style={styles.uploadOptionIcon}>📁</Text>
            </View>
            <View style={styles.uploadOptionInfo}>
              <Text style={styles.uploadOptionTitle}>Select Document / File</Text>
              <Text style={styles.uploadOptionSub}>PDF, PNG, JPG up to 10MB</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.uploadOptionRow}
            activeOpacity={0.7}
            onPress={onTakePhoto || onSelectDocument}
          >
            <View style={styles.uploadOptionIconBox}>
              <Text style={styles.uploadOptionIcon}>📷</Text>
            </View>
            <View style={styles.uploadOptionInfo}>
              <Text style={styles.uploadOptionTitle}>Take Photo / Camera</Text>
              <Text style={styles.uploadOptionSub}>Use camera to scan document</Text>
            </View>
          </TouchableOpacity>

          {hasUploaded && onRemove && (
            <TouchableOpacity
              style={styles.modalRemoveBtn}
              activeOpacity={0.7}
              onPress={onRemove}
            >
              <Text style={styles.modalRemoveText}>Remove Document</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default DocumentUploadModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  modalCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(6),
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalCard: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: wp(5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vs(16),
  },
  modalTitle: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
    flex: 1,
  },
  modalCloseIcon: {
    fontSize: 16,
    color: COLORS.textSecondary,
    padding: 4,
  },
  uploadOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: vs(12),
    paddingHorizontal: wp(3),
    borderRadius: 12,
    backgroundColor: COLORS.lightGrey,
    marginBottom: vs(10),
  },
  uploadOptionIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3),
  },
  uploadOptionIcon: {
    fontSize: 18,
  },
  uploadOptionInfo: {
    flex: 1,
  },
  uploadOptionTitle: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.darkText,
  },
  uploadOptionSub: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  modalRemoveBtn: {
    marginTop: vs(6),
    alignItems: 'center',
    paddingVertical: vs(8),
  },
  modalRemoveText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.minTiny,
    color: COLORS.red,
  },
});
