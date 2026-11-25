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
import VectorIcon from '../elements/VectorIcon';

export interface SubmittedDocumentCardProps {
  title: string;
  subtitle?: string;
  isApplicable?: boolean;
  notApplicableLabel?: string;
  onViewPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const SubmittedDocumentCard: React.FC<SubmittedDocumentCardProps> = ({
  title,
  subtitle,
  isApplicable = true,
  notApplicableLabel = 'Not applicable',
  onViewPress,
  containerStyle,
}) => {
  if (!isApplicable) {
    return (
      <View style={[styles.nonApplicableContainer, containerStyle]}>
        <View style={styles.nonApplicableTopRow}>
          <Text style={styles.titleText}>{title}</Text>
          <View style={styles.notApplicableBadge}>
            <Text style={styles.notApplicableText}>{notApplicableLabel}</Text>
          </View>
        </View>
        {subtitle && <Text style={styles.disclaimerText}>{subtitle}</Text>}
      </View>
    );
  }

  return (
    <View style={[styles.itemContainer, containerStyle]}>
      {/* Circle placeholder avatar */}
      <View style={styles.circlePlaceholder} />

      {/* Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.titleText}>{title}</Text>
        {subtitle && <Text style={styles.subtitleText}>{subtitle}</Text>}
      </View>

      {/* Eye icon action */}
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel={`View ${title}`}
        activeOpacity={0.7}
        onPress={onViewPress}
        style={styles.eyeButton}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <VectorIcon
          type="Feather"
          name="eye"
          size={wp(4.8)}
          color={COLORS.darkText}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SubmittedDocumentCard;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1),
  },
  circlePlaceholder: {
    width: wp(9.5),
    height: wp(9.5),
    borderRadius: wp(4.75),
    backgroundColor: COLORS.avatarBg,
    marginRight: wp(3),
  },
  infoContainer: {
    flex: 1,
  },
  titleText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.darkText,
  },
  subtitleText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
    marginTop: hp(0.2),
  },
  eyeButton: {
    padding: wp(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  nonApplicableContainer: {
    paddingVertical: hp(1),
  },
  nonApplicableTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notApplicableBadge: {
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.35),
    borderRadius: wp(3),
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    backgroundColor: COLORS.white,
  },
  notApplicableText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
  },
  disclaimerText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
    marginTop: hp(0.4),
    lineHeight: FONTSIZE.xsmall * 1.45,
  },
});
