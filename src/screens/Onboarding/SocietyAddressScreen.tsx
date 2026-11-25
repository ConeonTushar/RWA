import React, { useState } from 'react';
import {
  Alert,
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
import { SOCIETY_STRUCTURE_SCREEN } from '../../navigations/url';
import { SCREENPARAMS } from '../../navigations/types';

type SocietyAddressNavigationProp = NativeStackNavigationProp<
  SCREENPARAMS,
  typeof SOCIETY_STRUCTURE_SCREEN
>;

const CITIES: DropdownItem[] = [
  { id: 'pune', name: 'Pune' },
  { id: 'mumbai', name: 'Mumbai' },
  { id: 'bengaluru', name: 'Bengaluru' },
  { id: 'hyderabad', name: 'Hyderabad' },
  { id: 'delhi', name: 'Delhi NCR' },
  { id: 'chennai', name: 'Chennai' },
  { id: 'ahmedabad', name: 'Ahmedabad' },
  { id: 'kolkata', name: 'Kolkata' },
  { id: 'jaipur', name: 'Jaipur' },
];

const STATES: DropdownItem[] = [
  { id: 'maharashtra', name: 'Maharashtra' },
  { id: 'karnataka', name: 'Karnataka' },
  { id: 'telangana', name: 'Telangana' },
  { id: 'delhi', name: 'Delhi' },
  { id: 'tamil_nadu', name: 'Tamil Nadu' },
  { id: 'gujarat', name: 'Gujarat' },
  { id: 'rajasthan', name: 'Rajasthan' },
  { id: 'uttar_pradesh', name: 'Uttar Pradesh' },
  { id: 'west_bengal', name: 'West Bengal' },
];

const SocietyAddressScreen = () => {
  const navigation = useNavigation<SocietyAddressNavigationProp>();

  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState<string | number | null>(null);
  const [state, setState] = useState<string | number | null>(null);
  const [pinCode, setPinCode] = useState('411001');

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
    if (!addressLine1.trim()) {
      newErrors.addressLine1 = 'Please enter address line 1';
    }
    if (!city) {
      newErrors.city = 'Please select city';
    }
    if (!state) {
      newErrors.state = 'Please select state';
    }
    if (!pinCode.trim()) {
      newErrors.pinCode = 'Please enter PIN code';
    } else if (!/^\d{6}$/.test(pinCode.trim())) {
      newErrors.pinCode = 'Please enter a valid 6-digit PIN code';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validate()) {
      navigation.navigate(SOCIETY_STRUCTURE_SCREEN);
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
                label="Address line 1"
                required
                value={addressLine1}
                onChangeText={text => {
                  setAddressLine1(text);
                  clearError('addressLine1');
                }}
                placeholder="Street, area"
                placeholderTextColor={COLORS.placeholder}
                error={errors.addressLine1}
                containerStyle={styles.inputSpacing}
              />

              <InputBox
                label="Address line 2 (optional)"
                value={addressLine2}
                onChangeText={setAddressLine2}
                placeholder="Building, sector, locality"
                placeholderTextColor={COLORS.placeholder}
                containerStyle={styles.inputSpacing}
              />

              <InputBox
                label="Landmark (optional)"
                value={landmark}
                onChangeText={setLandmark}
                placeholder="Nearby landmark"
                placeholderTextColor={COLORS.placeholder}
                containerStyle={styles.inputSpacing}
              />

              <CustomDropdown
                label="City"
                required
                data={CITIES}
                value={city}
                onChange={val => {
                  setCity(val);
                  clearError('city');
                }}
                placeholder="Search city"
                error={errors.city}
                containerStyle={styles.inputSpacing}
              />

              <CustomDropdown
                label="State"
                required
                data={STATES}
                value={state}
                onChange={val => {
                  setState(val);
                  clearError('state');
                }}
                placeholder="Select state"
                error={errors.state}
                containerStyle={styles.inputSpacing}
              />

              <InputBox
                label="Pin code"
                required
                value={pinCode}
                onChangeText={text => {
                  setPinCode(text);
                  clearError('pinCode');
                }}
                placeholder="411001"
                placeholderTextColor={COLORS.placeholder}
                keyboardType="numeric"
                maxLength={6}
                error={errors.pinCode}
                containerStyle={styles.inputSpacing}
              />

              {/* Pin Your Society Location Card */}
              <View style={styles.locationSection}>
                <Text style={styles.sectionHeader}>
                  Pin Your Society Location
                </Text>
                <TouchableOpacity
                  style={styles.mapLocationBox}
                  activeOpacity={0.8}
                  onPress={() =>
                    Alert.alert('Map Location', 'Map picker will be launched.')
                  }
                >
                  <Text style={styles.mapLocationText}>
                    Select Location On Map
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Bottom Button */}
          <SubmitButton title="Continue" onPress={handleContinue} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SocietyAddressScreen;

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
  locationSection: {
    marginTop: vs(4),
    marginBottom: vs(16),
  },
  sectionHeader: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.darkText,
    marginBottom: vs(8),
  },
  mapLocationBox: {
    width: '100%',
    height: vs(88),
    backgroundColor: '#D9D9D9',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapLocationText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.darkText,
  },
});
