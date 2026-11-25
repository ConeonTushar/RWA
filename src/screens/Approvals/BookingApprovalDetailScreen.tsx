import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  Platform,
  Alert,
  Text,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';
import {
  ResidentRequestHeader,
  DetailKeyValueRow,
  BookingConflictCard,
  ApprovalDetailActionButtons,
  ApproveRequestModal,
} from '../../components/approvals';
import { SCREENPARAMS } from '../../navigations/types';
import {
  BOOKING_APPROVAL_DETAIL_SCREEN,
  REQUEST_MORE_INFO_SCREEN,
} from '../../navigations/url';

type RouteProps = RouteProp<
  SCREENPARAMS,
  typeof BOOKING_APPROVAL_DETAIL_SCREEN
>;

const BookingApprovalDetailScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProps>();

  const item = route.params?.item;
  const bookingTitle = item?.title || 'Clubhouse Booking';

  const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleApprove = () => {
    setIsApproveModalVisible(true);
  };

  const handleConfirmApproval = () => {
    setIsApproveModalVisible(false);
    Alert.alert('Approved', `${bookingTitle} has been approved successfully.`, [
      {
        text: 'OK',
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  const handleReject = () => {
    navigation.navigate(REQUEST_MORE_INFO_SCREEN, {
      item,
      mode: 'reject',
      title: 'Reject Booking',
      buttonLabel: 'Reject',
    });
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
        {/* Header */}
        <ResidentRequestHeader
          title="Booking approval"
          onBackPress={handleBack}
        />

        {/* Big Title & Subtitle */}
        <View style={styles.headerTitleContainer}>
          <Text style={styles.mainTitleText}>{bookingTitle}</Text>
          <Text style={styles.mainSubtitleText}>
            Review the booking details before making a decision.
          </Text>
        </View>

        {/* Centered Amenity Placeholder Card */}
        <View style={styles.amenityCenterContainer}>
          <View style={styles.amenityAvatar} />
          <Text style={styles.amenityLabel}>Clubhouse</Text>
        </View>

        {/* Section 1: Booking Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Booking Details</Text>
          <View style={styles.sectionBody}>
            <DetailKeyValueRow label="Amenity" value="Clubhouse" />
            <DetailKeyValueRow label="Date" value="22 November 2026" />
            <DetailKeyValueRow
              label="Time slot"
              value="06:00 PM – 09:00 PM"
            />
            <DetailKeyValueRow label="Flat" value="A-302" />
            <DetailKeyValueRow
              label="Purpose"
              value="Birthday celebration"
            />
            <DetailKeyValueRow label="Guests" value="30" />
          </View>
        </View>

        {/* Section 2: Booking conflict card */}
        <View style={styles.section}>
          <BookingConflictCard containerStyle={styles.conflictCard} />
        </View>

        {/* Action Buttons: Approve & Reject */}
        <ApprovalDetailActionButtons
          approveLabel="Approve"
          rejectLabel="Reject"
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </ScrollView>

      {/* Confirmation Modal for Approve Request */}
      <ApproveRequestModal
        visible={isApproveModalVisible}
        title="Approve booking request?"
        description={`You are approving ${bookingTitle} for Flat A-302.`}
        subNote="The resident will receive a booking confirmation notification."
        onConfirm={handleConfirmApproval}
        onCancel={() => setIsApproveModalVisible(false)}
      />
    </View>
  );
};

export default BookingApprovalDetailScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    paddingHorizontal: wp(5),
    paddingTop: hp(1),
    paddingBottom: hp(4),
  },
  headerTitleContainer: {
    marginTop: hp(1.5),
    marginBottom: hp(1.5),
  },
  mainTitleText: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.l1,
    color: COLORS.darkText,
  },
  mainSubtitleText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
    marginTop: hp(0.4),
    lineHeight: FONTSIZE.xsmall * 1.45,
  },
  amenityCenterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp(2),
  },
  amenityAvatar: {
    width: wp(16),
    height: wp(16),
    borderRadius: wp(4.5),
    backgroundColor: COLORS.avatarBg,
    marginBottom: hp(1),
  },
  amenityLabel: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.darkText,
  },
  section: {
    marginTop: hp(2),
  },
  sectionTitle: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.minSmall,
    color: COLORS.darkText,
    marginBottom: hp(0.6),
  },
  sectionBody: {
    width: '100%',
  },
  conflictCard: {
    marginTop: hp(0.4),
  },
});
