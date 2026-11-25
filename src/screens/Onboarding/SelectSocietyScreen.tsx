import React, { useState } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { wp, textScale, vs } from '../../utils/helper';
import { IMAGES } from '../../assets/Images';
import { PROFILE_SCREEN, SOCIETY_BASICS_SCREEN } from '../../navigations/url';
import { SCREENPARAMS } from '../../navigations/types';
import SubmitButton from '../../components/elements/SubmitButton';

type SelectSocietyNavigationProp = NativeStackNavigationProp<
  SCREENPARAMS,
  typeof PROFILE_SCREEN
>;

type SocietyOptionType = 'register' | 'join';

interface SocietyOption {
  id: SocietyOptionType;
  title: string;
  description: string;
}

const SOCIETY_OPTIONS: SocietyOption[] = [
  {
    id: 'register',
    title: 'Register my society',
    description: 'Register a new society on CONEON.',
  },
  {
    id: 'join',
    title: 'Join my society as a committee member',
    description: 'Request access to a society already registered.',
  },
];

const SelectSocietyScreen = () => {
  const navigation = useNavigation<SelectSocietyNavigationProp>();
  const [selectedOption, setSelectedOption] =
    useState<SocietyOptionType>('register');

  const handleSelectOption = (id: SocietyOptionType) => {
    setSelectedOption(id);
  };

  const handleContinue = () => {
    if (selectedOption === 'register') {
      navigation.navigate(SOCIETY_BASICS_SCREEN as any);
    } else {
      navigation.navigate(PROFILE_SCREEN);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        {...(Platform.OS === 'android'
          ? { backgroundColor: COLORS.white }
          : {})}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Top Header & Content */}
        <View style={styles.topSection}>
          {/* Header Bar */}
          <View style={styles.headerBar}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              activeOpacity={0.7}
            >
              <Image
                source={IMAGES.backArrow}
                style={styles.backIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          {/* Title Section */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>Select your society</Text>
            <Text style={styles.subtitle}>
              Choose the society you want to manage
            </Text>
          </View>

          {/* Society Options */}
          <View style={styles.optionsContainer}>
            {SOCIETY_OPTIONS.map(option => {
              const isSelected = selectedOption === option.id;
              return (
                <TouchableOpacity
                  key={option.id}
                  style={[styles.card, isSelected && styles.cardSelected]}
                  activeOpacity={0.85}
                  onPress={() => handleSelectOption(option.id)}
                >
                  {/* Card Top Row: Placeholder icon & Selected badge */}
                  <View style={styles.cardHeaderRow}>
                    <View style={styles.iconPlaceholder} />

                    {isSelected && (
                      <View style={styles.selectedBadge}>
                        <Text style={styles.selectedBadgeText}>Selected</Text>
                      </View>
                    )}
                  </View>

                  {/* Card Body: Title & Description */}
                  <View style={styles.cardBody}>
                    <Text style={styles.cardTitle}>{option.title}</Text>
                    <Text style={styles.cardDescription}>
                      {option.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Bottom Button */}
        <SubmitButton onPress={handleContinue} />
      </ScrollView>
    </View>
  );
};

export default SelectSocietyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: wp(6),
    paddingBottom: vs(16),
  },
  topSection: {
    width: '100%',
  },
  headerBar: {
    paddingTop: vs(8),
    paddingBottom: vs(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: vs(36),
    height: vs(36),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backIcon: {
    width: vs(20),
    height: vs(20),
  },
  textContainer: {
    marginTop: vs(8),
    marginBottom: vs(20),
  },
  title: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.l2,
    color: COLORS.darkText,
    marginBottom: vs(4),
  },
  subtitle: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.minTiny,
    color: COLORS.textSecondary,
    lineHeight: textScale(15),
  },
  optionsContainer: {
    width: '100%',
  },
  card: {
    borderWidth: 1.2,
    borderColor: COLORS.inputBorder,
    borderRadius: 20,
    padding: wp(4.5),
    backgroundColor: COLORS.white,
    marginBottom: vs(16),
  },
  cardSelected: {
    borderColor: '#C7D2FE',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  iconPlaceholder: {
    width: vs(54),
    height: vs(54),
    borderRadius: 14,
    backgroundColor: COLORS.avatarBg,
  },
  selectedBadge: {
    backgroundColor: COLORS.badgeGreenBg,
    paddingHorizontal: wp(2.8),
    paddingVertical: vs(3),
    borderRadius: 14,
  },
  selectedBadgeText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.badgeGreenText,
  },
  cardBody: {
    marginTop: vs(14),
  },
  cardTitle: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.minSmall,
    color: COLORS.darkText,
    marginBottom: vs(3),
  },
  cardDescription: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
    lineHeight: textScale(14),
  },
});
