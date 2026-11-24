import React, { useRef, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS, FONTS, FONTSIZE } from '../utils/font';
import { hp, wp, textScale, vs } from '../utils/helper';
import { IMAGES } from '../assets/Images';
import { OTP_SCREEN } from '../navigations/url';
import { SCREENPARAMS } from '../navigations/types';

type OtpRouteProp = RouteProp<SCREENPARAMS, typeof OTP_SCREEN>;
type OtpNavigationProp = NativeStackNavigationProp<
  SCREENPARAMS,
  typeof OTP_SCREEN
>;

const OTP_LENGTH = 4;

const OtpScreen = () => {
  const navigation = useNavigation<OtpNavigationProp>();
  const route = useRoute<OtpRouteProp>();

  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const inputRefs = useRef<Array<any>>([]);

  const mobileNumber = route.params?.mobile;
  const maskedMobile = mobileNumber
    ? `+91 XXXXX XX${mobileNumber.slice(-3)}`
    : '+91 XXXXX XX989';

  const handleOtpChange = (text: string, index: number) => {
    setError('');
    // Handle paste of multiple digits
    if (text.length > 1) {
      const digits = text
        .replace(/[^0-9]/g, '')
        .slice(0, OTP_LENGTH)
        .split('');
      const newOtp = [...otp];
      digits.forEach((digit, i) => {
        if (i < OTP_LENGTH) {
          newOtp[i] = digit;
        }
      });
      setOtp(newOtp);
      const nextFocus = Math.min(digits.length, OTP_LENGTH - 1);
      inputRefs.current[nextFocus]?.focus();
      return;
    }

    const digit = text.replace(/[^0-9]/g, '');
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Auto-advance to next input if digit entered
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<{ key: string }>,
    index: number,
  ) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length < OTP_LENGTH) {
      setError('Please enter all 4 digits');
      return;
    }
    // Handle OTP verification success
  };

  const handleResend = () => {
    setOtp(['', '', '', '']);
    setError('');
    inputRefs.current[0]?.focus();
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
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
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

          {/* Top Illustration */}
          <View style={styles.illustrationContainer}>
            <Image
              source={IMAGES.otpIllustration}
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>

          {/* Bottom Form Section */}
          <View style={styles.bottomSection}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Verify OTP</Text>
              <Text style={styles.subtitle}>
                We’ve sent a 4-digit code to {maskedMobile}
              </Text>
            </View>

            {/* OTP Input Boxes */}
            <View style={styles.otpRow}>
              {otp.map((digit, index) => {
                const isFocused = focusedIndex === index;
                const isFilled = digit.length > 0;
                return (
                  <View
                    key={index}
                    style={[
                      styles.otpBox,
                      isFocused && styles.otpBoxFocused,
                      isFilled && styles.otpBoxFilled,
                      error ? styles.otpBoxError : undefined,
                    ]}
                  >
                    <TextInput
                      ref={ref => {
                        inputRefs.current[index] = ref;
                      }}
                      style={styles.otpInput}
                      value={digit}
                      onChangeText={text => handleOtpChange(text, index)}
                      onKeyPress={e => handleKeyPress(e, index)}
                      onFocus={() => setFocusedIndex(index)}
                      onBlur={() => setFocusedIndex(null)}
                      keyboardType="number-pad"
                      maxLength={1}
                      textAlign="center"
                      selectTextOnFocus
                    />
                  </View>
                );
              })}
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            {/* Resend Section */}
            <View style={styles.resendContainer}>
              <Text style={styles.resendQuestion}>
                Didn’t received the code?
              </Text>
              <TouchableOpacity
                onPress={handleResend}
                activeOpacity={0.7}
                style={styles.resendButton}
              >
                <Text style={styles.resendText}>Resend OTP</Text>
              </TouchableOpacity>
            </View>

            {/* Verify Button */}
            <TouchableOpacity
              style={styles.verifyButton}
              activeOpacity={0.85}
              onPress={handleVerify}
            >
              <Text style={styles.verifyButtonText}>Verify & Continue</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default OtpScreen;

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
  headerBar: {
    paddingTop: vs(8),
    paddingBottom: vs(4),
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
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: vs(8),
  },
  illustration: {
    width: wp(82),
    height: hp(32),
    alignSelf: 'center',
  },
  bottomSection: {
    width: '100%',
    paddingBottom: vs(12),
  },
  textContainer: {
    marginBottom: vs(20),
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
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: vs(16),
  },
  otpBox: {
    width: wp(18),
    height: wp(18),
    maxHeight: vs(64),
    maxWidth: vs(64),
    borderWidth: 1.2,
    borderColor: COLORS.inputBorder,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  otpBoxFocused: {
    borderColor: COLORS.darkText,
  },
  otpBoxFilled: {
    borderColor: COLORS.inputBorder,
  },
  otpBoxError: {
    borderColor: COLORS.red,
  },
  otpInput: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    fontFamily: FONTS.BOLD_OUTFIT,
    fontSize: FONTSIZE.h5,
    color: COLORS.darkText,
    padding: 0,
  },
  errorText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xxsmall,
    color: COLORS.red,
    textAlign: 'center',
    marginBottom: vs(8),
  },
  resendContainer: {
    alignItems: 'center',
    marginTop: vs(12),
    marginBottom: vs(20),
  },
  resendQuestion: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
    marginBottom: vs(6),
  },
  resendButton: {
    paddingVertical: vs(2),
    paddingHorizontal: wp(2),
  },
  resendText: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.darkText,
  },
  verifyButton: {
    backgroundColor: COLORS.darkBtn,
    borderRadius: 14,
    height: vs(48),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: vs(8),
    marginBottom: vs(8),
  },
  verifyButtonText: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.white,
  },
});
