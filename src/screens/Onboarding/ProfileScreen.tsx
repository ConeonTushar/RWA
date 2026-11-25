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
import CustomDropdown, { DropdownItem } from '../../components/elements/CustomDropdown';
import SubmitButton from '../../components/elements/SubmitButton';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { wp, textScale, vs } from '../../utils/helper';
import { IMAGES } from '../../assets/Images';
import { SCREENPARAMS } from '../../navigations/types';

type ProfileScreenNavigationProp = NativeStackNavigationProp<SCREENPARAMS>;

const ROLE_OPTIONS: DropdownItem[] = [
  { id: 'resident', name: 'Resident / Flat Owner' },
  { id: 'tenant', name: 'Tenant' },
  { id: 'committee_member', name: 'Committee Member' },
  { id: 'secretary', name: 'Society Secretary' },
  { id: 'treasurer', name: 'Treasurer' },
];

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<string | number | null>(null);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [roleError, setRoleError] = useState('');

  const handleFullNameChange = (text: string) => {
    setFullName(text);
    if (nameError) {
      setNameError('');
    }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (emailError) {
      setEmailError('');
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (!fullName.trim()) {
      setNameError('Please enter your full name');
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError('Please enter your email address');
      isValid = false;
    } else if (!emailRegex.test(email.trim())) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    if (!role) {
      setRoleError('Please select your role');
      isValid = false;
    }

    return isValid;
  };

  const handleContinue = () => {
    if (!validateForm()) {
      return;
    }

    // Handle profile completion or navigate to next destination
  };

  const handleProfilePhotoPress = () => {
    // Placeholder for profile image picker
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
              <Text style={styles.title}>Tell Us About Yourself</Text>
              <Text style={styles.subtitle}>
                Add your details to complete your resident profile.
              </Text>
            </View>

            {/* Profile Photo Avatar Section */}
            <View style={styles.avatarSection}>
              <TouchableOpacity
                style={styles.avatarPlaceholder}
                activeOpacity={0.8}
                onPress={handleProfilePhotoPress}
              />
              <Text style={styles.avatarLabel}>Profile photo</Text>
            </View>

            {/* Form Inputs */}
            <View style={styles.formContainer}>
              <InputBox
                label="Full Name"
                value={fullName}
                onChangeText={handleFullNameChange}
                placeholder="Enter your full name"
                placeholderTextColor={COLORS.placeholder}
                autoCapitalize="words"
                error={nameError}
                containerStyle={styles.inputSpacing}
              />

              <InputBox
                label="Email Address"
                value={email}
                onChangeText={handleEmailChange}
                placeholder="Enter your email address"
                placeholderTextColor={COLORS.placeholder}
                keyboardType="email-address"
                autoCapitalize="none"
                error={emailError}
                containerStyle={styles.inputSpacing}
              />

              <CustomDropdown
                label="Role"
                data={ROLE_OPTIONS}
                value={role}
                onChange={val => {
                  setRole(val);
                  if (roleError) {
                    setRoleError('');
                  }
                }}
                placeholder="Select your role"
                error={roleError}
                containerStyle={styles.inputSpacing}
              />
            </View>
          </View>

          {/* Bottom Button */}
          <SubmitButton onPress={handleContinue} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ProfileScreen;

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
  avatarSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: vs(16),
    marginBottom: vs(24),
  },
  avatarPlaceholder: {
    width: vs(96),
    height: vs(96),
    borderRadius: vs(48),
    backgroundColor: COLORS.avatarBg,
  },
  avatarLabel: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.darkText,
    marginTop: vs(8),
  },
  formContainer: {
    width: '100%',
    marginTop: vs(8),
  },
  inputSpacing: {
    marginBottom: vs(18),
  },
});
