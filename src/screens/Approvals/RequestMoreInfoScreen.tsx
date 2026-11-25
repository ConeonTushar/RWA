import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  Platform,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';
import {
  ResidentRequestHeader,
  ApplicantSummaryCard,
} from '../../components/approvals';
import CustomDropdown, { DropdownItem } from '../../components/elements/CustomDropdown';
import InputBox from '../../components/elements/InputBox';
import VectorIcon from '../../components/elements/VectorIcon';
import { SCREENPARAMS } from '../../navigations/types';
import { REQUEST_MORE_INFO_SCREEN } from '../../navigations/url';

type RouteProps = RouteProp<SCREENPARAMS, typeof REQUEST_MORE_INFO_SCREEN>;

const REASON_OPTIONS: DropdownItem[] = [
  { id: 'incomplete_docs', name: 'Incomplete documentation' },
  { id: 'invalid_id', name: 'Invalid identity proof' },
  { id: 'expired_agreement', name: 'Rental agreement expired' },
  { id: 'owner_missing', name: 'Owner authorization missing' },
  { id: 'incorrect_details', name: 'Incorrect resident details' },
  { id: 'other', name: 'Other' },
];

const RequestMoreInfoScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProps>();

  const item = route.params?.item;
  const mode = route.params?.mode || 'request_info';
  const customTitle = route.params?.title || 'Request More Information';
  const buttonLabel =
    route.params?.buttonLabel || (mode === 'reject' ? 'Reject' : 'Send');

  const applicantName = item?.title || 'Rahul Sharma';
  const roleName = item?.detailText?.replace('Requested role: ', '') || 'Family member';
  const flatNumber = item?.subtitle ? item.subtitle.split('·')[0].trim() : 'Flat B-204';

  const [selectedReason, setSelectedReason] = useState<string | number | null>(
    null
  );
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSubmit = () => {
    if (!selectedReason) {
      setError('Please select a reason');
      return;
    }
    setError('');

    const reasonObj = REASON_OPTIONS.find((r) => r.id === selectedReason);

    if (mode === 'reject') {
      Alert.alert(
        'Request Rejected',
        `Request for ${applicantName} has been rejected.\nReason: ${reasonObj?.name}${
          message.trim() ? `\nMessage: ${message}` : ''
        }`,
        [
          {
            text: 'OK',
            onPress: () => {
              // Navigate back to approvals list
              navigation.popToTop();
            },
          },
        ]
      );
    } else {
      Alert.alert(
        'Information Requested',
        `Notification sent to ${applicantName}.\nReason: ${reasonObj?.name}${
          message.trim() ? `\nMessage: ${message}` : ''
        }`,
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
            },
          },
        ]
      );
    }
  };

  return (
    <View style={styles.screen}>
      <StatusBar
        barStyle="dark-content"
        {...(Platform.OS === 'android'
          ? { backgroundColor: COLORS.white }
          : {})}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with back navigation */}
        <ResidentRequestHeader
          title={customTitle}
          onBackPress={handleBack}
        />

        {/* Top applicant card */}
        <ApplicantSummaryCard
          name={applicantName}
          role={
            flatNumber.includes('·')
              ? flatNumber
              : `${flatNumber} · ${roleName}`
          }
          status="Applicant"
          containerStyle={styles.topCard}
        />

        {/* Form Fields: Select reason & Message */}
        <View style={styles.formContainer}>
          <CustomDropdown
            label="Select reason"
            required={true}
            data={REASON_OPTIONS}
            value={selectedReason}
            onChange={(val) => {
              setSelectedReason(val);
              if (error) setError('');
            }}
            placeholder="Select reason"
            error={error}
            rightIcon={
              <VectorIcon
                type="Feather"
                name="chevron-down"
                size={wp(4.8)}
                color={COLORS.darkText}
              />
            }
            containerStyle={styles.dropdownContainer}
          />

          <InputBox
            label="Message"
            placeholder="Tell them what to fix"
            value={message}
            onChangeText={setMessage}
            multiline={true}
            numberOfLines={4}
            containerStyle={styles.inputBoxContainer}
            inputContainerStyle={styles.multilineInputContainer}
            inputStyle={styles.multilineInput}
          />
        </View>

        {/* Bottom Action Button (Send / Reject) */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={buttonLabel}
            activeOpacity={0.8}
            onPress={handleSubmit}
            style={styles.submitButton}
          >
            <Text style={styles.submitButtonText}>{buttonLabel}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default RequestMoreInfoScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: wp(5),
    paddingTop: hp(1),
    paddingBottom: hp(4),
    justifyContent: 'space-between',
  },
  topCard: {
    marginTop: hp(1.5),
  },
  formContainer: {
    marginTop: hp(2.5),
    flex: 1,
  },
  dropdownContainer: {
    marginTop: hp(1),
    marginBottom: hp(2),
  },
  inputBoxContainer: {
    marginTop: hp(1),
    marginBottom: hp(2),
  },
  multilineInputContainer: {
    minHeight: hp(13),
    alignItems: 'flex-start',
    paddingTop: hp(1.2),
  },
  multilineInput: {
    textAlignVertical: 'top',
    height: hp(10),
    fontSize: FONTSIZE.minTiny,
    fontFamily: FONTS.REGULAR_OUTFIT,
    color: COLORS.darkText,
  },
  actionContainer: {
    width: '100%',
    paddingTop: hp(4),
  },
  submitButton: {
    width: '100%',
    height: hp(5.6),
    backgroundColor: COLORS.darkBtn,
    borderRadius: wp(3.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.white,
  },
});
