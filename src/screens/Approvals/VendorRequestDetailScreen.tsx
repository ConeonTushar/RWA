import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  Platform,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { COLORS, FONTS, FONTSIZE } from '../../utils/font';
import { hp, wp } from '../../utils/helper';
import {
  ResidentRequestHeader,
  ApplicantSummaryCard,
  DetailKeyValueRow,
  SubmittedDocumentCard,
  ApprovalDetailActionButtons,
  ApproveRequestModal,
} from '../../components/approvals';
import VectorIcon from '../../components/elements/VectorIcon';
import { SCREENPARAMS } from '../../navigations/types';
import {
  VENDOR_REQUEST_DETAIL_SCREEN,
  REQUEST_MORE_INFO_SCREEN,
} from '../../navigations/url';

type RouteProps = RouteProp<
  SCREENPARAMS,
  typeof VENDOR_REQUEST_DETAIL_SCREEN
>;

const VendorRequestDetailScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProps>();

  const item = route.params?.item;

  const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);

  const vendorName = item?.title || 'CleanPro Services';
  const categoryName = 'Housekeeping and cleaning';

  const handleBack = () => {
    navigation.goBack();
  };

  const handleViewDoc = (docName: string) => {
    Alert.alert('Document Preview', `Opening ${docName} securely...`);
  };

  const handleEditTowers = () => {
    Alert.alert('Towers Requested', 'Select towers permitted for this vendor.');
  };

  const handleApprove = () => {
    setIsApproveModalVisible(true);
  };

  const handleConfirmApproval = () => {
    setIsApproveModalVisible(false);
    Alert.alert('Approved', `${vendorName} has been approved successfully.`, [
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
      title: 'Reject Vendor',
      buttonLabel: 'Reject',
    });
  };

  const handleAskDocs = () => {
    navigation.navigate(REQUEST_MORE_INFO_SCREEN, {
      item,
      mode: 'request_info',
      title: 'Request Documents',
      buttonLabel: 'Send',
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
          title="Vendor request"
          onBackPress={handleBack}
        />

        {/* Top Summary Card */}
        <ApplicantSummaryCard
          name={vendorName}
          role={categoryName}
          status="Registered vendor"
          containerStyle={styles.topCard}
        />

        {/* Section 1: Business Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Business Details</Text>
          <View style={styles.sectionBody}>
            <DetailKeyValueRow label="Business name" value={vendorName} />
            <DetailKeyValueRow label="Owner" value="Amit Verma" />
            <DetailKeyValueRow label="Categories" value="Housekeeping" />
            <DetailKeyValueRow label="Years in business" value="5 years" />
          </View>
        </View>

        {/* Section 2: Verification Documents */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Verification Documents</Text>
          <View style={styles.sectionBody}>
            <SubmittedDocumentCard
              title="ID Proof"
              subtitle="Tap to view securely"
              onViewPress={() => handleViewDoc('ID Proof')}
            />
            {/* Missing FSSAI licence row with peach badge */}
            <View style={styles.missingDocRow}>
              <View style={styles.circlePlaceholder} />
              <View style={styles.docInfo}>
                <Text style={styles.docTitle}>FSSAI licence</Text>
                <Text style={styles.docSubtitle}>Tap to view securely</Text>
              </View>
              <View style={styles.missingBadge}>
                <Text style={styles.missingBadgeText}>Missing</Text>
              </View>
            </View>
            <SubmittedDocumentCard
              title="Police verification"
              subtitle="Tap to view securely"
              onViewPress={() => handleViewDoc('Police verification')}
            />
            <SubmittedDocumentCard
              title="Shop licence"
              subtitle="Tap to view securely"
              onViewPress={() => handleViewDoc('Shop licence')}
            />
          </View>
        </View>

        {/* Section 3: Towers Requested */}
        <View style={styles.section}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>Towers Requested</Text>
            <TouchableOpacity
              onPress={handleEditTowers}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <VectorIcon
                type="Feather"
                name="edit-2"
                size={wp(4.2)}
                color={COLORS.darkText}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Section 4: Vendor Ratings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vendor Ratings</Text>
          <View style={styles.ratingRow}>
            <VectorIcon
              type="FontAwesome"
              name="star-o"
              size={wp(5.2)}
              color="#F59E0B"
              style={styles.starIcon}
            />
            <Text style={styles.ratingValueText}>
              4.8 <Text style={styles.ratingOutOfText}>/ 5</Text>
            </Text>
          </View>
          <Text style={styles.ratingSubtitleText}>
            Average rating from other societies
          </Text>
        </View>

        {/* Action Buttons */}
        <ApprovalDetailActionButtons
          approveLabel="Approve"
          rejectLabel="Reject"
          askMoreInfoLabel="Ask for documents"
          onApprove={handleApprove}
          onReject={handleReject}
          onAskMoreInfo={handleAskDocs}
        />
      </ScrollView>

      {/* Confirmation Modal for Approve Request */}
      <ApproveRequestModal
        visible={isApproveModalVisible}
        title="Approve vendor request?"
        description={`You are approving ${vendorName} for ${categoryName}.`}
        subNote="The vendor will receive access and a notification."
        onConfirm={handleConfirmApproval}
        onCancel={() => setIsApproveModalVisible(false)}
      />
    </View>
  );
};

export default VendorRequestDetailScreen;

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
  topCard: {
    marginTop: hp(1.5),
  },
  section: {
    marginTop: hp(2.2),
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
  missingDocRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1),
  },
  circlePlaceholder: {
    width: wp(9.5),
    height: wp(9.5),
    borderRadius: wp(4.75),
    backgroundColor: COLORS.avatarBg,
    marginRight: wp(3),
  },
  docInfo: {
    flex: 1,
  },
  docTitle: {
    fontFamily: FONTS.MEDIUM_OUTFIT,
    fontSize: FONTSIZE.tiny,
    color: COLORS.darkText,
  },
  docSubtitle: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
    marginTop: hp(0.2),
  },
  missingBadge: {
    backgroundColor: COLORS.ownerWaitingBg,
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.4),
    borderRadius: wp(3),
  },
  missingBadgeText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.ownerWaitingText,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(0.4),
  },
  starIcon: {
    marginRight: wp(2),
  },
  ratingValueText: {
    fontFamily: FONTS.SEMI_OUTFIT,
    fontSize: FONTSIZE.small,
    color: COLORS.darkText,
  },
  ratingOutOfText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.minTiny,
    color: COLORS.textSecondary,
  },
  ratingSubtitleText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.xsmall,
    color: COLORS.textSecondary,
    marginTop: hp(0.4),
  },
});
