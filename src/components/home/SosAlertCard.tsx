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
import VectorIcon, { IconType } from '../elements/VectorIcon';

export interface SosAlertCardProps {
  title?: string;
  description?: string;
  iconName?: string;
  iconType?: IconType;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  gradientColors?: string[];
}

const SosAlertCard: React.FC<SosAlertCardProps> = ({
  title = 'SOS FROM B-402',
  description = 'Emergency alert received. Tap to respond.',
  iconName,
  iconType = 'MaterialCommunityIcons',
  onPress,
  containerStyle,
  gradientColors = [
    COLORS.sosGradientStart,
    COLORS.sosGradientMid,
    COLORS.white,
    COLORS.white,
  ],
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.card, containerStyle]}
    >
      {/* Background Linear Gradient filling the card seamlessly */}
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Content */}
      <View style={styles.content}>
        {/* Top row: Red circle + Title */}
        <View style={styles.topRow}>
          <View style={styles.redCircle}>
            {iconName && (
              <VectorIcon
                type={iconType}
                name={iconName}
                size={14}
                color={COLORS.white}
              />
            )}
          </View>
          <Text style={styles.titleText}>{title}</Text>
        </View>

        {/* Bottom row: Description left-aligned under the red circle */}
        <Text style={styles.descText}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SosAlertCard;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: hp(2.5),
    borderWidth: 1,
    borderColor: COLORS.sosRed,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
  },
  content: {
    width: '100%',
    paddingVertical: hp(1.8),
    paddingHorizontal: wp(5),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  redCircle: {
    width: wp(7.2),
    height: wp(7.2),
    borderRadius: wp(3.6),
    backgroundColor: COLORS.sosCircle,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp(3.2),
  },
  titleText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.sosRed,
    letterSpacing: 0.4,
  },
  descText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.minTiny,
    color: COLORS.charcoalText,
    marginTop: hp(1),
  },
});
