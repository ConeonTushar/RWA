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

export interface ComplaintDetailActionButtonsProps {
  onAssign?: () => void;
  onUpdateStatus?: () => void;
  onEscalate?: () => void;
  onMergeDuplicate?: () => void;
  onCloseComplaint?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const ComplaintDetailActionButtons: React.FC<
  ComplaintDetailActionButtonsProps
> = ({
  onAssign,
  onUpdateStatus,
  onEscalate,
  onMergeDuplicate,
  onCloseComplaint,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.gridRow}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Assign"
          activeOpacity={0.75}
          onPress={onAssign}
          style={styles.secondaryButton}
        >
          <Text style={styles.secondaryText}>Assign</Text>
        </TouchableOpacity>

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Update status"
          activeOpacity={0.75}
          onPress={onUpdateStatus}
          style={styles.secondaryButton}
        >
          <Text style={styles.secondaryText}>Update status</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.gridRow}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Escalate"
          activeOpacity={0.75}
          onPress={onEscalate}
          style={styles.secondaryButton}
        >
          <Text style={styles.secondaryText}>Escalate</Text>
        </TouchableOpacity>

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Merge duplicate"
          activeOpacity={0.75}
          onPress={onMergeDuplicate}
          style={styles.secondaryButton}
        >
          <Text style={styles.secondaryText}>Merge duplicate</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Close complaint"
        activeOpacity={0.8}
        onPress={onCloseComplaint}
        style={styles.primaryButton}
      >
        <Text style={styles.primaryText}>Close complaint</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ComplaintDetailActionButtons;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: hp(1.3),
    marginTop: hp(2.5),
    paddingBottom: hp(4),
  },
  gridRow: {
    flexDirection: 'row',
    gap: wp(3),
  },
  secondaryButton: {
    flex: 1,
    height: hp(5.4),
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.darkBtn,
    borderRadius: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.darkText,
  },
  primaryButton: {
    width: '100%',
    height: hp(5.6),
    backgroundColor: COLORS.darkBtn,
    borderRadius: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(0.3),
  },
  primaryText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.white,
  },
});
