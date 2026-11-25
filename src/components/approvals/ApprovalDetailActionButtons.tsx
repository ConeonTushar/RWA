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

export interface ApprovalDetailActionButtonsProps {
  onApprove?: () => void;
  onReject?: () => void;
  onAskMoreInfo?: () => void;
  approveLabel?: string;
  rejectLabel?: string;
  askMoreInfoLabel?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const ApprovalDetailActionButtons: React.FC<ApprovalDetailActionButtonsProps> = ({
  onApprove,
  onReject,
  onAskMoreInfo,
  approveLabel = 'Approve',
  rejectLabel = 'Reject',
  askMoreInfoLabel = 'Ask for more information',
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {/* Primary Approve Button */}
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel={approveLabel}
        activeOpacity={0.8}
        onPress={onApprove}
        style={styles.approveButton}
      >
        <Text style={styles.approveText}>{approveLabel}</Text>
      </TouchableOpacity>

      {/* Secondary Reject Button */}
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel={rejectLabel}
        activeOpacity={0.8}
        onPress={onReject}
        style={styles.rejectButton}
      >
        <Text style={styles.rejectText}>{rejectLabel}</Text>
      </TouchableOpacity>

      {/* Tertiary Action Link */}
      {onAskMoreInfo && (
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={askMoreInfoLabel}
          activeOpacity={0.7}
          onPress={onAskMoreInfo}
          style={styles.askButton}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={styles.askText}>{askMoreInfoLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ApprovalDetailActionButtons;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: hp(1.4),
    marginTop: hp(2.5),
    paddingBottom: hp(4),
  },
  approveButton: {
    width: '100%',
    height: hp(5.6),
    backgroundColor: COLORS.darkBtn,
    borderRadius: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  approveText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.white,
  },
  rejectButton: {
    width: '100%',
    height: hp(5.6),
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.darkBtn,
    borderRadius: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  rejectText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.darkText,
  },
  askButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(0.6),
  },
  askText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.darkText,
  },
});
