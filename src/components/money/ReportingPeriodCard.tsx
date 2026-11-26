import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';
import VectorIcon from '../elements/VectorIcon';

export interface ReportingPeriodCardProps {
  label?: string;
  selectedPeriod: string;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const ReportingPeriodCard: React.FC<ReportingPeriodCardProps> = ({
  label = 'Reporting period',
  selectedPeriod,
  onPress,
  containerStyle,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.card, containerStyle]}
    >
      <LinearGradient
        colors={[COLORS.applicantMintStart, COLORS.applicantMintEnd]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.textColumn}>
        <Text style={styles.labelText}>{label}</Text>
        <Text style={styles.periodText}>{selectedPeriod}</Text>
      </View>

      <VectorIcon
        type="Feather"
        name="chevron-down"
        size={wp(5)}
        color={COLORS.darkText}
      />
    </TouchableOpacity>
  );
};

export default ReportingPeriodCard;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: COLORS.applicantMintBorder,
    overflow: 'hidden',
    paddingHorizontal: wp(4.5),
    paddingVertical: hp(1.6),
    backgroundColor: COLORS.white,
  },
  textColumn: {
    flex: 1,
    paddingRight: wp(2),
  },
  labelText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xxsmall,
    color: COLORS.textSecondary,
  },
  periodText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
    marginTop: hp(0.3),
  },
});
