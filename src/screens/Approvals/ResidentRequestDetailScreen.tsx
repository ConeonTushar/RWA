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
  ApplicantSummaryCard,
  DetailKeyValueRow,
  OwnerApprovalStatusCard,
  SubmittedDocumentCard,
  ApprovalDetailActionButtons,
  ApproveRequestModal,
} from '../../components/approvals';
import { SCREENPARAMS } from '../../navigations/types';
import {
  RESIDENT_REQUEST_DETAIL_SCREEN,
  REQUEST_MORE_INFO_SCREEN,
} from '../../navigations/url';

type RouteProps = RouteProp<
  SCREENPARAMS,
  typeof RESIDENT_REQUEST_DETAIL_SCREEN
>;

const ResidentRequestDetailScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProps>();

  const item = route.params?.item;

  const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);

  // Defaults matching the design mockup if not provided in params
  const applicantName = item?.title || 'Rahul Sharma';
  const roleName = item?.detailText?.replace('Requested role: ', '') || 'Family member';
  const flatNumber = item?.subtitle ? item.subtitle.split('·')[0].trim() : 'B-204';

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleRegisterPress = () => {
    Alert.alert('Flat Registration', `View registry details for Flat ${flatNumber}`);
  };

  const handleViewDocument = (documentTitle: string) => {
    Alert.alert('View Document', `Opening ${documentTitle} securely...`);
  };

  const handleApprove = () => {
    setIsApproveModalVisible(true);
  };

  const handleConfirmApproval = () => {
    setIsApproveModalVisible(false);
    Alert.alert('Success', `${applicantName} has been approved successfully.`, [
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
      title: 'Request More Information',
      buttonLabel: 'Reject',
    });
  };

  const handleAskMoreInfo = () => {
    navigation.navigate(REQUEST_MORE_INFO_SCREEN, {
      item,
      mode: 'request_info',
      title: 'Request More Information',
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
        {/* Back navigation header */}
        <ResidentRequestHeader
          title="Resident Request"
          onBackPress={handleBackPress}
        />

        {/* Top summary card with soft mint gradient */}
        <ApplicantSummaryCard
          name={applicantName}
          role={roleName}
          status="Applicant"
          containerStyle={styles.topCard}
        />

        {/* Section 1: Applicant Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Applicant Information</Text>
          <View style={styles.sectionBody}>
            <DetailKeyValueRow label="Full name" value={applicantName} />
            <DetailKeyValueRow
              label="Phone number"
              value="+91 98765 43210"
            />
            <DetailKeyValueRow label="Requested role" value={roleName} />
            <DetailKeyValueRow label="Flat number" value={flatNumber} />
          </View>
        </View>

        {/* Section 2: Flat Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Flat Information</Text>
          <View style={styles.sectionBody}>
            <DetailKeyValueRow
              label={`Flat ${flatNumber}`}
              value="Register"
              valueColor={COLORS.registerGreen}
              isLink={true}
              onLinkPress={handleRegisterPress}
            />
            <DetailKeyValueRow label="Current owner" value="Amit Sharma" />
            <DetailKeyValueRow label="Current tenants" value="1" />
          </View>
        </View>

        {/* Section 3: Owner Approval */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Owner Approval</Text>
          <OwnerApprovalStatusCard
            statusText="Owner approval status"
            badgeLabel="Waiting for owner"
            description="Owner approval is required for tenant and family-member requests."
            containerStyle={styles.ownerCard}
          />
        </View>

        {/* Section 4: Submitted Documents */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Submitted Documents</Text>
          <View style={styles.sectionBody}>
            <SubmittedDocumentCard
              title="ID Proof"
              subtitle="Tap to view securely"
              onViewPress={() => handleViewDocument('ID Proof')}
            />
            <SubmittedDocumentCard
              title="Rent agreement"
              subtitle="Tap to view securely"
              onViewPress={() => handleViewDocument('Rent agreement')}
            />
            <SubmittedDocumentCard
              title="Ownership proof"
              subtitle="Document availability depends on the requested resident role."
              isApplicable={false}
              notApplicableLabel="Not applicable"
            />
          </View>
        </View>

        {/* Action Buttons: Approve, Reject, Ask for more information */}
        <ApprovalDetailActionButtons
          onApprove={handleApprove}
          onReject={handleReject}
          onAskMoreInfo={handleAskMoreInfo}
        />
      </ScrollView>

      {/* Confirmation Modal for Approve Request */}
      <ApproveRequestModal
        visible={isApproveModalVisible}
        applicantName={applicantName}
        roleName={`a ${roleName}`}
        flatNumber={`Flat ${flatNumber}`}
        onConfirm={handleConfirmApproval}
        onCancel={() => setIsApproveModalVisible(false)}
      />
    </View>
  );
};

export default ResidentRequestDetailScreen;

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
    marginTop: hp(2.4),
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
  ownerCard: {
    marginTop: hp(0.4),
  },
});
