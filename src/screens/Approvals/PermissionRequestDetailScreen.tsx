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
  FeeAndDepositCard,
  ApprovalProgressCard,
  ApprovalDetailActionButtons,
  ApproveRequestModal,
} from '../../components/approvals';
import InputBox from '../../components/elements/InputBox';
import { SCREENPARAMS } from '../../navigations/types';
import {
  PERMISSION_REQUEST_DETAIL_SCREEN,
  REQUEST_MORE_INFO_SCREEN,
} from '../../navigations/url';

type RouteProps = RouteProp<
  SCREENPARAMS,
  typeof PERMISSION_REQUEST_DETAIL_SCREEN
>;

const PermissionRequestDetailScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProps>();

  const item = route.params?.item;
  const permissionTitle = item?.title || 'Renovation Permission';
  const flatNumber = item?.subtitle ? item.subtitle.split('·')[0].trim() : 'C-401';

  const [comment, setComment] = useState<string>('');
  const [isApproveModalVisible, setIsApproveModalVisible] = useState<boolean>(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleApprove = () => {
    setIsApproveModalVisible(true);
  };

  const handleConfirmApproval = () => {
    setIsApproveModalVisible(false);
    Alert.alert('Approved', `${permissionTitle} has been approved successfully.`, [
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
      title: 'Reject Permission',
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
        {/* Header */}
        <ResidentRequestHeader
          title="Permission request"
          onBackPress={handleBack}
        />

        {/* Big Title & Subtitle */}
        <View style={styles.headerTitleContainer}>
          <Text style={styles.mainTitleText}>{permissionTitle}</Text>
          <Text style={styles.mainSubtitleText}>
            Review the request and approval history before taking action.
          </Text>
        </View>

        {/* Section 1: Request Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Request Details</Text>
          <View style={styles.sectionBody}>
            <DetailKeyValueRow label="Request type" value="Renovation" />
            <DetailKeyValueRow label="Flat number" value={flatNumber} />
            <DetailKeyValueRow
              label="Start date"
              value="22 November 2026"
            />
            <DetailKeyValueRow
              label="End date"
              value="25 November 2026"
            />
          </View>
        </View>

        {/* Section 2: Request Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Request Description</Text>
          <Text style={styles.descriptionBodyText}>
            Interior renovation work including flooring and painting.
          </Text>
        </View>

        {/* Section 3: Fee And Deposit */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fee And Deposit</Text>
          <FeeAndDepositCard
            depositAmount="₹5,000"
            paymentStatus="Paid"
            containerStyle={styles.cardSpacing}
          />
        </View>

        {/* Section 4: Approval Progress */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Approval Progress</Text>
          <ApprovalProgressCard containerStyle={styles.cardSpacing} />
        </View>

        {/* Section 5: Comment (optional) */}
        <View style={styles.section}>
          <InputBox
            label="Comment (optional)"
            placeholder="Add a comment for other approvers"
            value={comment}
            onChangeText={setComment}
            multiline={true}
            numberOfLines={3}
            containerStyle={styles.commentInputContainer}
            inputContainerStyle={styles.commentInputField}
            inputStyle={styles.commentInputText}
          />
        </View>

        {/* Action Buttons: Approve, Reject & Ask for more info */}
        <ApprovalDetailActionButtons
          approveLabel="Approve"
          rejectLabel="Reject"
          askMoreInfoLabel="Ask for more information"
          onApprove={handleApprove}
          onReject={handleReject}
          onAskMoreInfo={handleAskMoreInfo}
        />
      </ScrollView>

      {/* Confirmation Modal for Approve Request */}
      <ApproveRequestModal
        visible={isApproveModalVisible}
        title="Approve permission request?"
        description={`You are approving ${permissionTitle} for Flat ${flatNumber}.`}
        subNote="The resident will receive access and a notification."
        onConfirm={handleConfirmApproval}
        onCancel={() => setIsApproveModalVisible(false)}
      />
    </View>
  );
};

export default PermissionRequestDetailScreen;

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
    marginBottom: hp(0.5),
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
  descriptionBodyText: {
    fontFamily: FONTS.REGULAR_OUTFIT,
    fontSize: FONTSIZE.minTiny,
    color: COLORS.darkText,
    lineHeight: FONTSIZE.minTiny * 1.5,
    marginTop: hp(0.2),
  },
  cardSpacing: {
    marginTop: hp(0.4),
  },
  commentInputContainer: {
    marginTop: hp(0.4),
    marginBottom: 0,
  },
  commentInputField: {
    minHeight: hp(10),
    alignItems: 'flex-start',
    paddingTop: hp(1),
  },
  commentInputText: {
    textAlignVertical: 'top',
    height: hp(8),
    fontSize: FONTSIZE.minTiny,
    fontFamily: FONTS.REGULAR_OUTFIT,
    color: COLORS.darkText,
  },
});
