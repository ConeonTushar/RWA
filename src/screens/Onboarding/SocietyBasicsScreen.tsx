import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
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
import InputBox from '../../components/elements/InputBox';
import CustomDropdown, {
  DropdownItem,
} from '../../components/elements/CustomDropdown';
import SubmitButton from '../../components/elements/SubmitButton';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { wp, textScale, vs } from '../../utils/helper';
import { IMAGES } from '../../assets/Images';
import { SOCIETY_ADDRESS_SCREEN } from '../../navigations/url';
import { SCREENPARAMS } from '../../navigations/types';

type SocietyBasicsNavigationProp = NativeStackNavigationProp<
  SCREENPARAMS,
  typeof SOCIETY_ADDRESS_SCREEN
>;

const SOCIETY_TYPES: DropdownItem[] = [
  { id: 'chs', name: 'Cooperative Housing Society (CHS)' },
  { id: 'aoa', name: 'Apartment Owners Association (AOA)' },
  { id: 'rwa', name: 'Resident Welfare Association (RWA)' },
  { id: 'gated', name: 'Gated Community / Township' },
  { id: 'villa', name: 'Villa Community' },
  { id: 'mixed', name: 'Commercial / Mixed Development' },
];

const REGISTRATION_TYPES: DropdownItem[] = [
  { id: 'act_1860', name: 'Societies Registration Act, 1860' },
  { id: 'cooperative', name: 'State Cooperative Societies Act' },
  { id: 'apartment', name: 'Apartment Ownership Act' },
  { id: 'companies', name: 'Companies Act (Section 8)' },
  { id: 'trust', name: 'Public Charitable Trust' },
  { id: 'unregistered', name: 'Not Registered / In Process' },
];

const REGISTERING_AUTHORITIES: DropdownItem[] = [
  { id: 'registrar', name: 'Registrar of Societies' },
  { id: 'deputy_registrar', name: 'Deputy / Assistant Registrar' },
  { id: 'sub_registrar', name: 'Sub-Registrar Office' },
  { id: 'municipal', name: 'Municipal Corporation' },
  { id: 'housing_board', name: 'State Housing Board / Authority' },
];

const CURRENT_YEAR = 2026;
const YEARS: DropdownItem[] = Array.from({ length: 65 }, (_, i) => {
  const y = (CURRENT_YEAR - i).toString();
  return { id: y, name: y };
});

const SocietyBasicsScreen = () => {
  const navigation = useNavigation<SocietyBasicsNavigationProp>();

  const [societyName, setSocietyName] = useState('');
  const [societyType, setSocietyType] = useState<string | number | null>(null);
  const [registrationType, setRegistrationType] = useState<
    string | number | null
  >(null);
  const [registeringAuthority, setRegisteringAuthority] = useState<
    string | number | null
  >(null);
  const [yearFormed, setYearFormed] = useState<string | number | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const clearError = (key: string) => {
    if (errors[key]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!societyName.trim()) {
      newErrors.societyName = 'Please enter society name';
    }
    if (!societyType) {
      newErrors.societyType = 'Please select society type';
    }
    if (!registrationType) {
      newErrors.registrationType = 'Please select registration type';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validate()) {
      navigation.navigate(SOCIETY_ADDRESS_SCREEN);
    }
  };

  const renderCalendarIcon = () => (
    <View style={styles.calendarIconWrapper}>
      <View style={styles.calendarRingsRow}>
        <View style={styles.calendarRing} />
        <View style={styles.calendarRing} />
      </View>
      <View style={styles.calendarCard}>
        <View style={styles.calendarHeaderStripe} />
        <View style={styles.calendarGridRow}>
          <View style={styles.calendarMiniDot} />
          <View style={styles.calendarMiniDot} />
          <View style={styles.calendarMiniDot} />
        </View>
        <View style={styles.calendarGridRow}>
          <View style={styles.calendarMiniDot} />
          <View style={styles.calendarMiniDot} />
          <View style={styles.calendarMiniDot} />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        {...(Platform.OS === 'android'
          ? { backgroundColor: COLORS.white }
          : {})}
      />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? vs(10) : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Top Section */}
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

            {/* Title & Subtitle */}
            <View style={styles.textContainer}>
              <Text style={styles.title}>Society basics</Text>
              <Text style={styles.subtitle}>
                Let's start with the basic information about your society.
              </Text>
            </View>

            {/* Form Fields */}
            <View style={styles.formContainer}>
              <InputBox
                label="Society name"
                required
                value={societyName}
                onChangeText={text => {
                  setSocietyName(text);
                  clearError('societyName');
                }}
                placeholder="For example"
                placeholderTextColor={COLORS.placeholder}
                error={errors.societyName}
                containerStyle={styles.inputSpacing}
              />

              <CustomDropdown
                label="Society type"
                required
                data={SOCIETY_TYPES}
                value={societyType}
                onChange={val => {
                  setSocietyType(val);
                  clearError('societyType');
                }}
                placeholder="Select type"
                error={errors.societyType}
                containerStyle={styles.inputSpacing}
              />

              <CustomDropdown
                label="How is your society registered?"
                required
                data={REGISTRATION_TYPES}
                value={registrationType}
                onChange={val => {
                  setRegistrationType(val);
                  clearError('registrationType');
                }}
                placeholder="Select registration type"
                error={errors.registrationType}
                containerStyle={styles.inputSpacing}
              />

              <CustomDropdown
                label="Registering authority (optional)"
                data={REGISTERING_AUTHORITIES}
                value={registeringAuthority}
                onChange={val => setRegisteringAuthority(val)}
                placeholder="Enter registering authority"
                containerStyle={styles.inputSpacing}
              />

              <CustomDropdown
                label="Year formed (optional)"
                data={YEARS}
                value={yearFormed}
                onChange={val => setYearFormed(val)}
                placeholder="Select year"
                rightIcon={renderCalendarIcon()}
                containerStyle={styles.inputSpacing}
              />
            </View>
          </View>

          {/* Bottom Button */}
          <SubmitButton title="Continue" onPress={handleContinue} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SocietyBasicsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  keyboardView: {
    flex: 1,
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
    marginBottom: vs(16),
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
  formContainer: {
    width: '100%',
    marginTop: vs(8),
  },
  inputSpacing: {
    marginBottom: vs(16),
  },
  calendarIconWrapper: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarRingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 14,
    marginBottom: -2,
    zIndex: 2,
  },
  calendarRing: {
    width: 2,
    height: 4,
    backgroundColor: COLORS.darkText,
    borderRadius: 1,
  },
  calendarCard: {
    width: 18,
    height: 16,
    borderWidth: 1.4,
    borderColor: COLORS.darkText,
    borderRadius: 3,
    backgroundColor: COLORS.white,
    overflow: 'hidden',
  },
  calendarHeaderStripe: {
    width: '100%',
    height: 3,
    backgroundColor: COLORS.darkText,
  },
  calendarGridRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 1,
    marginTop: 1.5,
  },
  calendarMiniDot: {
    width: 1.8,
    height: 1.8,
    backgroundColor: COLORS.darkText,
    borderRadius: 0.9,
  },
});
