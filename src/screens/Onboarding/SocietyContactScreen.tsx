import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import InputBox from '../../components/elements/InputBox';
import SubmitButton from '../../components/elements/SubmitButton';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { wp, textScale, vs } from '../../utils/helper';
import { IMAGES } from '../../assets/Images';
import { SOCIETY_DOCUMENTS_SCREEN } from '../../navigations/url';
import { SCREENPARAMS } from '../../navigations/types';

type SocietyContactNavigationProp = NativeStackNavigationProp<
  SCREENPARAMS,
  typeof SOCIETY_DOCUMENTS_SCREEN
>;

const COMMON_OPEN_TIMES = [
  '08:00 AM',
  '08:30 AM',
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
];

const COMMON_CLOSE_TIMES = [
  '05:00 PM',
  '06:00 PM',
  '06:30 PM',
  '07:00 PM',
  '07:30 PM',
  '08:00 PM',
  '09:00 PM',
];

const PHONE_REGEX = /^[6-9]\d{9}$/;

const SAMPLE_LOGOS = [
  { id: '1', label: 'Green Palm', color: '#10B981', initial: '🌴' },
  { id: '2', label: 'Grand Residency', color: '#3B82F6', initial: '🏢' },
  { id: '3', label: 'Sunrise Heights', color: '#F59E0B', initial: '🌅' },
  { id: '4', label: 'Royal Gardens', color: '#8B5CF6', initial: '🏰' },
];

const SocietyContactScreen = () => {
  const navigation = useNavigation<SocietyContactNavigationProp>();

  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [openTime, setOpenTime] = useState('');
  const [closeTime, setCloseTime] = useState('');
  const [selectedLogo, setSelectedLogo] = useState<string | null>(null);

  // Modals state
  const [timePickerTarget, setTimePickerTarget] = useState<
    'open' | 'close' | null
  >(null);
  const [customTimeInput, setCustomTimeInput] = useState('');
  const [logoModalVisible, setLogoModalVisible] = useState(false);

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
    const trimmedPhone = phone.trim();

    if (!trimmedPhone) {
      newErrors.phone = 'Please enter society office or helpline number';
    } else if (!PHONE_REGEX.test(trimmedPhone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validate()) {
      navigation.navigate(SOCIETY_DOCUMENTS_SCREEN);
    }
  };

  const openTimePicker = (target: 'open' | 'close') => {
    setTimePickerTarget(target);
    setCustomTimeInput(target === 'open' ? openTime : closeTime);
  };

  const handleSelectTime = (time: string) => {
    if (timePickerTarget === 'open') {
      setOpenTime(time);
    } else if (timePickerTarget === 'close') {
      setCloseTime(time);
    }
    setTimePickerTarget(null);
  };

  const renderAlarmClockIcon = () => (
    <View style={styles.clockContainer}>
      <View style={styles.clockBellLeft} />
      <View style={styles.clockBellRight} />
      <View style={styles.clockFace}>
        <View style={styles.clockCenterDot} />
        <View style={styles.clockHourHand} />
        <View style={styles.clockMinuteHand} />
      </View>
      <View style={styles.clockFootLeft} />
      <View style={styles.clockFootRight} />
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

            {/* Add Society Logo Card */}
            <TouchableOpacity
              style={styles.logoCard}
              activeOpacity={0.8}
              onPress={() => setLogoModalVisible(true)}
            >
              <View style={styles.logoPlaceholder}>
                {selectedLogo ? (
                  <Text style={styles.selectedLogoText}>{selectedLogo}</Text>
                ) : (
                  <View style={styles.logoDefaultShape} />
                )}
              </View>
              <Text style={styles.logoCardTitle}>
                {selectedLogo ? 'Change Society Logo' : 'Add Society Logo'}
              </Text>
            </TouchableOpacity>

            {/* Form Fields */}
            <View style={styles.formContainer}>
              <InputBox
                label="Society office or helpline number"
                required
                value={phone}
                onChangeText={text => {
                  const cleaned = text.replace(/[^0-9]/g, '').slice(0, 10);
                  setPhone(cleaned);
                  clearError('phone');
                }}
                placeholder="Enter phone number"
                placeholderTextColor={COLORS.placeholder}
                keyboardType="phone-pad"
                maxLength={10}
                error={errors.phone}
                containerStyle={styles.inputSpacing}
              />

              <InputBox
                label="Society email (optional)"
                value={email}
                onChangeText={text => {
                  setEmail(text);
                  clearError('email');
                }}
                placeholder="society@example.com"
                placeholderTextColor={COLORS.placeholder}
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email}
                containerStyle={styles.inputSpacing}
              />

              {/* Office hours - Open time */}
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => openTimePicker('open')}
              >
                <View pointerEvents="none">
                  <InputBox
                    label="Office hours"
                    value={openTime}
                    placeholder="Open time"
                    placeholderTextColor={COLORS.placeholder}
                    rightIcon={renderAlarmClockIcon()}
                    containerStyle={styles.inputSpacing}
                    editable={false}
                  />
                </View>
              </TouchableOpacity>

              {/* Office hours - Close time */}
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => openTimePicker('close')}
              >
                <View pointerEvents="none">
                  <InputBox
                    label="Office hours"
                    value={closeTime}
                    placeholder="Close time"
                    placeholderTextColor={COLORS.placeholder}
                    rightIcon={renderAlarmClockIcon()}
                    containerStyle={styles.inputSpacing}
                    editable={false}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Bottom Button */}
          <SubmitButton title="Continue" onPress={handleContinue} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Time Picker Modal */}
      <Modal
        visible={timePickerTarget !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setTimePickerTarget(null)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setTimePickerTarget(null)}
        />
        <View style={styles.modalCenteredView} pointerEvents="box-none">
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {timePickerTarget === 'open'
                  ? 'Select Open Time'
                  : 'Select Close Time'}
              </Text>
              <TouchableOpacity
                onPress={() => setTimePickerTarget(null)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text style={styles.modalCloseIcon}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSectionLabel}>Common hours:</Text>
            <View style={styles.timeOptionsGrid}>
              {(timePickerTarget === 'open'
                ? COMMON_OPEN_TIMES
                : COMMON_CLOSE_TIMES
              ).map(t => {
                const isSelected =
                  (timePickerTarget === 'open' ? openTime : closeTime) === t;
                return (
                  <TouchableOpacity
                    key={t}
                    style={[
                      styles.timeOptionPill,
                      isSelected && styles.timeOptionPillSelected,
                    ]}
                    onPress={() => handleSelectTime(t)}
                  >
                    <Text
                      style={[
                        styles.timeOptionText,
                        isSelected && styles.timeOptionTextSelected,
                      ]}
                    >
                      {t}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={[styles.modalSectionLabel, { marginTop: vs(12) }]}>
              Or type custom time:
            </Text>
            <View style={styles.customTimeRow}>
              <TextInput
                style={styles.customTimeInput}
                placeholder="e.g. 10:15 AM"
                placeholderTextColor={COLORS.placeholder}
                value={customTimeInput}
                onChangeText={setCustomTimeInput}
              />
              <TouchableOpacity
                style={styles.customTimeDoneBtn}
                onPress={() => {
                  if (customTimeInput.trim()) {
                    handleSelectTime(customTimeInput.trim());
                  }
                }}
              >
                <Text style={styles.customTimeDoneText}>Set</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Add Society Logo Modal */}
      <Modal
        visible={logoModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setLogoModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setLogoModalVisible(false)}
        />
        <View style={styles.modalCenteredView} pointerEvents="box-none">
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Society Logo</Text>
              <TouchableOpacity
                onPress={() => setLogoModalVisible(false)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text style={styles.modalCloseIcon}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSectionLabel}>
              Choose a placeholder logo or icon:
            </Text>
            <View style={styles.sampleLogosRow}>
              {SAMPLE_LOGOS.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.sampleLogoItem, { borderColor: item.color }]}
                  onPress={() => {
                    setSelectedLogo(item.initial);
                    setLogoModalVisible(false);
                  }}
                >
                  <Text style={styles.sampleLogoEmoji}>{item.initial}</Text>
                  <Text style={styles.sampleLogoLabel}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {selectedLogo && (
              <TouchableOpacity
                style={styles.removeLogoButton}
                onPress={() => {
                  setSelectedLogo(null);
                  setLogoModalVisible(false);
                }}
              >
                <Text style={styles.removeLogoText}>Remove Logo</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SocietyContactScreen;

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

  // Add Society Logo Card
  logoCard: {
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 16,
    paddingVertical: vs(28),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    marginTop: vs(4),
    marginBottom: vs(6),
  },
  logoPlaceholder: {
    width: vs(60),
    height: vs(60),
    borderRadius: 14,
    backgroundColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoDefaultShape: {
    width: vs(60),
    height: vs(60),
    borderRadius: 14,
    backgroundColor: '#D1D5DB',
  },
  selectedLogoText: {
    fontSize: 28,
  },
  logoCardTitle: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.minSmall,
    color: COLORS.darkText,
    marginTop: vs(12),
  },

  // Form Fields
  formContainer: {
    width: '100%',
    marginTop: vs(4),
  },
  inputSpacing: {
    marginBottom: vs(12),
  },

  // Alarm Clock Icon
  clockContainer: {
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  clockFace: {
    width: 17,
    height: 17,
    borderRadius: 8.5,
    borderWidth: 1.5,
    borderColor: COLORS.darkText,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clockBellLeft: {
    position: 'absolute',
    top: 1,
    left: 2,
    width: 5,
    height: 2.2,
    borderRadius: 1,
    backgroundColor: COLORS.darkText,
    transform: [{ rotate: '-45deg' }],
  },
  clockBellRight: {
    position: 'absolute',
    top: 1,
    right: 2,
    width: 5,
    height: 2.2,
    borderRadius: 1,
    backgroundColor: COLORS.darkText,
    transform: [{ rotate: '45deg' }],
  },
  clockCenterDot: {
    width: 2.2,
    height: 2.2,
    borderRadius: 1.1,
    backgroundColor: COLORS.darkText,
    position: 'absolute',
  },
  clockHourHand: {
    position: 'absolute',
    width: 1.4,
    height: 4.5,
    backgroundColor: COLORS.darkText,
    top: 3.5,
    left: 7.5,
    borderRadius: 0.7,
    transform: [{ rotate: '-45deg' }],
  },
  clockMinuteHand: {
    position: 'absolute',
    width: 1.4,
    height: 5,
    backgroundColor: COLORS.darkText,
    top: 3,
    left: 8,
    borderRadius: 0.7,
    transform: [{ rotate: '45deg' }],
  },
  clockFootLeft: {
    position: 'absolute',
    bottom: 0.5,
    left: 3,
    width: 3.5,
    height: 1.5,
    borderRadius: 0.75,
    backgroundColor: COLORS.darkText,
    transform: [{ rotate: '40deg' }],
  },
  clockFootRight: {
    position: 'absolute',
    bottom: 0.5,
    right: 3,
    width: 3.5,
    height: 1.5,
    borderRadius: 0.75,
    backgroundColor: COLORS.darkText,
    transform: [{ rotate: '-40deg' }],
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  modalCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(6),
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalCard: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: wp(5),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vs(12),
  },
  modalTitle: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
  },
  modalCloseIcon: {
    fontSize: 16,
    color: COLORS.textSecondary,
    padding: 4,
  },
  modalSectionLabel: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.minTiny,
    color: COLORS.textSecondary,
    marginBottom: vs(8),
  },
  timeOptionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeOptionPill: {
    paddingHorizontal: wp(3.5),
    paddingVertical: vs(7),
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    backgroundColor: COLORS.lightGrey,
  },
  timeOptionPillSelected: {
    backgroundColor: COLORS.darkBtn,
    borderColor: COLORS.darkBtn,
  },
  timeOptionText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.darkText,
  },
  timeOptionTextSelected: {
    color: COLORS.white,
  },
  customTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: vs(6),
  },
  customTimeInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 10,
    paddingHorizontal: wp(3),
    paddingVertical: vs(8),
    fontSize: FONTSIZE.minTiny,
    fontFamily: FONTS.REGULAR_OUTFIT,
    color: COLORS.darkText,
  },
  customTimeDoneBtn: {
    backgroundColor: COLORS.darkBtn,
    paddingHorizontal: wp(4),
    paddingVertical: vs(9),
    borderRadius: 10,
  },
  customTimeDoneText: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.minTiny,
    color: COLORS.white,
  },
  sampleLogosRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: vs(10),
  },
  sampleLogoItem: {
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 12,
    padding: wp(2.5),
    width: '22%',
    backgroundColor: COLORS.lightGrey,
  },
  sampleLogoEmoji: {
    fontSize: 24,
    marginBottom: vs(4),
  },
  sampleLogoLabel: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.vtiny,
    color: COLORS.darkText,
    textAlign: 'center',
  },
  removeLogoButton: {
    marginTop: vs(8),
    alignItems: 'center',
    paddingVertical: vs(6),
  },
  removeLogoText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.minTiny,
    color: COLORS.red,
  },
});
