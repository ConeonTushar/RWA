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
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp, textScale, vs } from '../../utils/helper';
import { IMAGES } from '../../assets/Images';
import { OTP_SCREEN } from '../../navigations/url';
import { SCREENPARAMS } from '../../navigations/types';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  SCREENPARAMS,
  typeof OTP_SCREEN
>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');

  const handleMobileChange = (text: string) => {
    // Only accept numeric input up to 10 digits
    const cleaned = text.replace(/[^0-9]/g, '').slice(0, 10);
    setMobileNumber(cleaned);
    if (error) {
      setError('');
    }
  };

  const handleContinue = () => {
    if (!mobileNumber || mobileNumber.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    // Navigate to OTP screen with mobile number
    navigation.navigate(OTP_SCREEN, { mobile: mobileNumber });
  };

  const handleTermsPress = () => {
    // Handle navigation to Terms & Conditions
  };

  const handlePrivacyPress = () => {
    // Handle navigation to Privacy Policy
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
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Top Section: Title & Graphic */}
          <View style={styles.topSection}>
            <Text style={styles.headerTitle}>
              Manage Your Society{'\n'}One App
            </Text>

            <Image
              source={IMAGES.societyIllustration}
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>

          {/* Bottom Section: Form & Actions */}
          <View style={styles.bottomSection}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Enter mobile number</Text>
              <Text style={styles.subtitle}>
                We’ll send you a one time password (OTP) to verify your number.
              </Text>
            </View>

            <InputBox
              value={mobileNumber}
              onChangeText={handleMobileChange}
              placeholder="97428 37482"
              placeholderTextColor={COLORS.placeholder}
              keyboardType="phone-pad"
              maxLength={10}
              leftIcon={<Text style={styles.countryCode}>+91</Text>}
              error={error}
              containerStyle={styles.inputContainerStyle}
              inputContainerStyle={styles.inputBoxStyle}
              inputStyle={styles.textInputStyle}
            />

            <TouchableOpacity
              style={styles.continueButton}
              activeOpacity={0.85}
              onPress={handleContinue}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>
              By continuing, you agree to our{' '}
              <Text style={styles.footerLink} onPress={handleTermsPress}>
                Terms & Conditions
              </Text>{' '}
              and{' '}
              <Text style={styles.footerLink} onPress={handlePrivacyPress}>
                Privacy Policy.
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

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
    alignItems: 'center',
    paddingTop: vs(70),
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: FONTS.BOLD_OUTFIT,
    fontSize: FONTSIZE.h4,
    color: COLORS.greenPrimary,
    textAlign: 'center',
    lineHeight: textScale(22),
    marginBottom: vs(12),
  },
  illustration: {
    width: wp(100),
    height: hp(50),
    alignSelf: 'center',
  },
  bottomSection: {
    width: '100%',
    paddingBottom: vs(8),
  },
  textContainer: {
    marginBottom: vs(14),
  },
  title: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
    marginBottom: vs(4),
  },
  subtitle: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
    lineHeight: textScale(15),
  },
  inputContainerStyle: {
    marginTop: 0,
    marginBottom: 0,
  },
  inputBoxStyle: {
    borderRadius: 14,
    borderWidth: 1.2,
    borderColor: COLORS.inputBorder,
    minHeight: vs(48),
    paddingHorizontal: wp(4),
    backgroundColor: COLORS.white,
  },
  countryCode: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.darkText,
    marginRight: wp(2),
    marginLeft: wp(0.5),
  },
  textInputStyle: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.darkText,
    paddingVertical: 0,
  },
  continueButton: {
    backgroundColor: COLORS.darkBtn,
    borderRadius: 14,
    height: vs(48),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: vs(20),
    marginBottom: vs(14),
  },
  continueButtonText: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.white,
  },
  footerText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xxsmall,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: textScale(13),
  },
  footerLink: {
    fontFamily: FONTS.SEMI_OUTFIT,
    color: COLORS.greenPrimary,
  },
});
